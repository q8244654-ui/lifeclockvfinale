import Stripe from "stripe"
import { NextResponse } from "next/server"
import { createCheckoutSessionSchema } from "@/lib/validators/stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const priceId = process.env.LIFECLOCK_PRICE_ID

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY")
}
if (!priceId) {
  throw new Error("Missing LIFECLOCK_PRICE_ID")
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-10-29.clover",
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { referralCode, email, firstName, lastName } = createCheckoutSessionSchema.parse(body)

    const origin = request.headers.get("origin") || request.headers.get("referer") || ""
    const baseUrl = origin || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/generating`,
      cancel_url: `${baseUrl}/result`,
      customer_email: email || undefined,
      // Apple Pay and Google Pay are automatically enabled when payment_method_types includes "card"
      // They will appear as payment options if enabled in Stripe Dashboard and supported by the device
      payment_method_types: ["card"],
      payment_method_options: {
        card: {
          request_three_d_secure: "automatic",
        },
      },
      payment_intent_data: {
        metadata: {
          referral_code: referralCode || "",
          referred_email: email || "",
        },
      },
      metadata: {
        referral_code: referralCode || "",
        referred_email: email || "",
      },
    })

    return NextResponse.json({ url: session.url })
  } catch {
    return NextResponse.json({ error: "Unable to create checkout session" }, { status: 500 })
  }
}


