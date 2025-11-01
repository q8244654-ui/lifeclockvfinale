"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { computeLifeClockFinalReport } from "@/lib/compute-life-clock-final-report"
import { analyzeHiddenForces } from "@/lib/analyze-forces"
import { generateInsights } from "@/lib/generate-insights"
import { createClient } from "@/lib/supabase/client"
import ForcesCachees from "@/components/forces-cachees"
import Revelations from "@/components/revelations"
import ChartsSection from "@/components/charts-section"
import PDFExportButton from "@/components/pdf-export-button"
import ShareSection from "@/components/share-section"
import ReferralSection from "@/components/referral-section"
import SocialProofCounter from "@/components/social-proof-counter"
import type { PhaseResult } from "@/lib/types"
import { getLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS } from "@/lib/constants"

export default function ReportPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [finalReport, setFinalReport] = useState<any>(null)
  const [phaseResults, setPhaseResults] = useState<PhaseResult[]>([])
  const [forces, setForces] = useState<any>(null)
  const [revelations, setRevelations] = useState<any[]>([])
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const storedResults = getLocalStorage<PhaseResult[]>(STORAGE_KEYS.PHASES_RESULTS) || 
                          getLocalStorage<PhaseResult[]>(STORAGE_KEYS.ALL_RESULTS)
    const storedOnboarding = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)

    if (!storedResults) {
      router.push("/")
      return
    }

    setPhaseResults(storedResults)

    const report = computeLifeClockFinalReport(storedResults)
    setFinalReport(report)

    const hiddenForces = analyzeHiddenForces(storedResults)
    setForces(hiddenForces)

    const insights = generateInsights(storedResults, report.profile)
    setRevelations(insights)

    if (storedOnboarding) {
      setUserName(storedOnboarding.name || "")
      setUserEmail(storedOnboarding.email || "")
    }

    saveReportToSupabase(storedResults, report, hiddenForces, insights, storedOnboarding)

    setLoading(false)
  }, [router])

  const saveReportToSupabase = async (
    results: PhaseResult[],
    report: any,
    hiddenForces: any,
    insights: any[],
    onboardingData: any,
  ) => {
    try {
      const supabase = createClient()

      if (!onboardingData) return

      const onboarding = onboardingData

      const reportData = {
        email: onboarding.email,
        name: onboarding.name,
        age: onboarding.age,
        gender: onboarding.gender,
        life_index: report.lifeIndex.lifeIndex,
        stage: report.lifeIndex.stage,
        dominant_energy: report.profile.dominantEnergy,
        phase_results: results,
        hidden_forces: hiddenForces,
        insights: insights,
        full_report: report,
      }

      await supabase.from("reports").insert(reportData)
      // Report saving is silent - errors don't affect UX as data is in localStorage
    } catch {
      // Silent error handling - report data is available in localStorage
    }
  }

  if (loading || !finalReport) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-[#0D1117] to-[#111827]">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-white text-lg"
        >
          Generating your report...
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D1117] to-[#111827] text-white">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your LifeClock Report
          </h1>
          <p className="text-gray-400 text-lg">The transfer is confirmed. You just opened a portal.</p>
        </motion.div>

        {/* Life Index & Archetype */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm text-center space-y-4"
        >
          <div className="text-6xl font-bold text-blue-400">{finalReport.lifeIndex.lifeIndex}/100</div>
          <div className="text-xl text-gray-300">{finalReport.lifeIndex.stage}</div>
          <div className="text-sm text-gray-500">This isn't your age. It's your inner maturity.</div>
          <div className="pt-4 border-t border-white/10">
            <div className="text-2xl font-semibold text-white">{finalReport.profile.dominantEnergy}</div>
            <div className="text-sm text-gray-400">Your dominant energy</div>
          </div>
        </motion.div>

        {/* Forces Cachées */}
        {forces && <ForcesCachees forces={forces} />}

        {/* Charts */}
        <ChartsSection energyProfile={finalReport.profile} lifeCurve={finalReport.lifeCurve} />

        {/* Revelations */}
        <Revelations revelations={revelations} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SocialProofCounter />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <PDFExportButton userName={userName} finalReport={finalReport} forces={forces} revelations={revelations} />
        </motion.div>

        <ShareSection archetype={finalReport.profile.dominantEnergy} lifeIndex={finalReport.lifeIndex.lifeIndex} />

        {userEmail && <ReferralSection userEmail={userEmail} />}

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4 py-12"
        >
          <p className="text-2xl font-semibold text-white italic">"Time is no longer counted. It belongs to you."</p>
          <p className="text-gray-400 text-sm">Come back to consult this report whenever you need it. It awaits you.</p>
        </motion.div>
      </div>
    </div>
  )
}
