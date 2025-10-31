import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { rateLimit } from "@/lib/rate-limit"

export const dynamic = "force-dynamic"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}
if (!webhookSecret) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET")
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2025-10-29.clover" })

export async function POST(request: Request) {
  // Rate limiting for webhook endpoint
  const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
  const limitResult = rateLimit(`webhook:${clientIp}`, {
    maxTokens: 20, // Allow 20 requests
    refillRate: 0.5, // Refill at 0.5 tokens/second (1 every 2 seconds)
    windowMs: 60000,
  })

  if (!limitResult.allowed) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: {
        "Retry-After": Math.ceil((limitResult.resetAt - Date.now()) / 1000).toString(),
      },
    })
  }

  const rawBody = await request.text()
  const signature = request.headers.get("stripe-signature") as string

  if (!signature) {
    return new NextResponse("Missing stripe-signature header", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret!)
  } catch {
    // Invalid signature - return 400 so Stripe can retry
    return new NextResponse("Bad signature", { status: 400 })
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const metadata = session.metadata || {}
      const referralCode = metadata["referral_code"] || ""
      const referredEmail = metadata["referred_email"] || ""

      const supabase = await createClient()

      if (referralCode && referredEmail) {
        await supabase
          .from("referrals")
          .update({ status: "completed", completed_at: new Date().toISOString() })
          .eq("referrer_code", referralCode)
          .eq("referred_email", referredEmail)
        // Silent error handling - referral update failures don't block webhook success
      }

      // Track payment completion event in conversions table
      try {
        await supabase.from("conversions").insert({
          event_type: "payment_complete",
          email: referredEmail || null,
          session_id: `stripe_${session.id}`,
        })
        // Silent error handling - conversion tracking failures don't block webhook success
      } catch {
        // Silent error handling for conversion tracking
      }
    }
  } catch {
    // Return 500 so Stripe knows to retry the webhook
    return new NextResponse("Webhook error", { status: 500 })
  }

  return NextResponse.json({ received: true })
}


