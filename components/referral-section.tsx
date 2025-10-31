"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import { generateReferralCode } from "@/lib/generate-referral-code"

interface ReferralSectionProps {
  userEmail: string
}

export default function ReferralSection({ userEmail }: ReferralSectionProps) {
  const [referralCode, setReferralCode] = useState<string>("")
  const [referralLink, setReferralLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [stats, setStats] = useState({ pending: 0, completed: 0, earned: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeReferral()
  }, [userEmail])

  const initializeReferral = async () => {
    try {
      const supabase = createClient()

      // Check if user already has a referral code
      const { data: existingReferral } = await supabase
        .from("referrals")
        .select("referrer_code")
        .eq("referrer_email", userEmail)
        .limit(1)
        .single()

      let code = existingReferral?.referrer_code

      // If no code exists, generate one
      if (!code) {
        code = generateReferralCode(userEmail)

        // Create initial referral entry
        await supabase.from("referrals").insert({
          referrer_email: userEmail,
          referrer_code: code,
          status: "pending",
        })
      }

      setReferralCode(code)
      const link = `${window.location.origin}/onboarding?ref=${code}`
      setReferralLink(link)

      // Fetch referral stats
      const { data: referrals } = await supabase
        .from("referrals")
        .select("status, commission_amount")
        .eq("referrer_email", userEmail)
        .not("referred_email", "is", null)

      if (referrals) {
        const pending = referrals.filter((r) => r.status === "pending").length
        const completed = referrals.filter((r) => r.status === "completed" || r.status === "paid").length
        const earned = referrals
          .filter((r) => r.status === "completed" || r.status === "paid")
          .reduce((sum, r) => sum + (r.commission_amount || 0), 0)

        setStats({ pending, completed, earned })
      }

      setLoading(false)
    } catch (error) {
      console.error("[v0] Error initializing referral:", error)
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("[v0] Failed to copy:", error)
    }
  }

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center"
      >
        <div className="text-gray-400">Loading...</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 p-8 backdrop-blur-sm space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-white">Invite your friends</h2>
        <p className="text-gray-400">Earn $10 for each friend who discovers their LifeClock</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 rounded-xl bg-white/5">
          <div className="text-2xl font-bold text-blue-400">{stats.pending}</div>
          <div className="text-xs text-gray-400">Pending</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-white/5">
          <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
          <div className="text-xs text-gray-400">Completed</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-white/5">
          <div className="text-2xl font-bold text-yellow-400">${stats.earned}</div>
          <div className="text-xs text-gray-400">Earned</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-sm text-gray-400">Your unique link:</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white font-mono"
          />
          <motion.button
            onClick={copyToClipboard}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </motion.button>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-400">
        <div className="flex items-start gap-2">
          <span className="text-blue-400">1.</span>
          <span>Share your unique link with your friends</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-blue-400">2.</span>
          <span>They discover their LifeClock through your link</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="text-blue-400">3.</span>
          <span>You receive $10 when they purchase their complete report</span>
        </div>
      </div>
    </motion.div>
  )
}
