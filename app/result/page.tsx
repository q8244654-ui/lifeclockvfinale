"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import ChatMessage from "@/components/chat-message"
import { computeLifeClockFinalReport } from "@/lib/compute-life-clock-final-report"
import type { PhaseResult } from "@/lib/types"
import { useAudio } from "@/hooks/use-audio"
import { useAutoScroll } from "@/hooks/use-auto-scroll"
import { getLocalStorage, setLocalStorage } from "@/hooks/use-local-storage"
import { STORAGE_KEYS, SOUNDS } from "@/lib/constants"
import { t, getTranslation } from "@/lib/i18n"

interface Message {
  id: number
  role: "assistant" | "user"
  text: string
  messageType?: "normal" | "motivation" | "revelation" | "introspection"
}

type MessageSpeed = "action" | "normal" | "introspection" | "revelation"

const getTypingDelay = (speed: MessageSpeed): number => {
  const delays = {
    action: 1000,
    normal: 1500,
    introspection: 2000,
    revelation: 2300,
  }
  return delays[speed]
}

export default function ResultPage() {
  const router = useRouter()
  const [finalReport, setFinalReport] = useState<any>(null)
  const [phasesResults, setPhasesResults] = useState<PhaseResult[]>([])
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [showChoices, setShowChoices] = useState(false)
  const [currentStep, setCurrentStep] = useState("start")
  const [timeLeft, setTimeLeft] = useState(15 * 60)
  const [isTyping, setIsTyping] = useState(false)
  const [userName, setUserName] = useState("")
  const [userGender, setUserGender] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { playSound, playRevelation, playMotivation } = useAudio()
  const { scrollContainerRef } = useAutoScroll({ messages, isTyping })

  useEffect(() => {
    const userData = getLocalStorage<any>(STORAGE_KEYS.USER)
    const phasesResultsData = getLocalStorage<PhaseResult[]>(STORAGE_KEYS.PHASES_RESULTS)

    if (!userData || !phasesResultsData) {
      router.push("/")
      return
    }

    try {
      const { firstName, gender } = userData
      setUserName(firstName || "")
      setUserGender(gender || "")

      const onboarding = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
      if (onboarding?.email) {
        setUserEmail(onboarding.email)
      }

      setPhasesResults(phasesResultsData)

      const report = computeLifeClockFinalReport(phasesResultsData)
      setFinalReport(report)
      setLoading(false)
    } catch {
      // Silent error handling - redirect to home on data load failure
      router.push("/")
    }
  }, [router])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])


  useEffect(() => {
    if (finalReport && messages.length === 0) {
      startConversation()
    }
  }, [finalReport])


  const showTyping = (duration: number) => {
    setIsTyping(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsTyping(false)
        resolve(true)
      }, duration)
    })
  }

  const addMessage = (
    role: "assistant" | "user",
    text: string,
    messageType?: "normal" | "motivation" | "revelation" | "introspection",
  ) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, text, messageType }])
    if (role === "assistant") {
      if (messageType === "revelation") {
        playRevelation()
      } else if (messageType === "motivation") {
        playMotivation()
      } else {
        playSound(SOUNDS.TAP)
      }
    }
  }

  const getPersonalizedInsight = () => {
    if (!phasesResults || phasesResults.length === 0) return null

    const sortedPhases = [...phasesResults].sort((a, b) => b.total - a.total)
    const highestPhase = sortedPhases[0]
    const lowestPhase = sortedPhases[sortedPhases.length - 1]

    const insights: Record<number, { high: string; low: string }> = {
      1: {
        high: "You look at yourself. But the mirror reflects a stranger.",
        low: "You flee your own gaze. The mirror waits.",
      },
      2: {
        high: "You control everything. Except what truly matters.",
        low: "You've let go of the reins. But who's driving now?",
      },
      3: {
        high: "Your desires burn. But you hide them under ash.",
        low: "You've extinguished the fire. But the embers still glow.",
      },
      4: {
        high: "You love like drowning. Magnificently. Dangerously.",
        low: "Your heart has closed. It waits for someone to knock again.",
      },
      5: {
        high: "Time devours you. You run. But towards what?",
        low: "You ignore the clock. But it doesn't forget you.",
      },
      6: {
        high: "Money possesses you more than you possess it.",
        low: "You despise gold. It's just another cage.",
      },
      7: {
        high: "Your body screams. But you only hear silence.",
        low: "You've left your temple. It awaits your return.",
      },
      8: {
        high: "Your discipline is armor. But against what?",
        low: "You flee structure. Or are you just afraid to hold on?",
      },
      9: {
        high: "You've touched the eternal. Few achieve this.",
        low: "You seek the light. But you're looking in the shadows.",
      },
      10: {
        high: "Your legacy obsesses you. You want to carve your name in time.",
        low: "You don't think about tomorrow. But tomorrow thinks about you.",
      },
    }

    return {
      high: insights[highestPhase.id]?.high || "Your answers reveal the invisible.",
      low: insights[lowestPhase.id]?.low || "A shadow you refuse to name.",
      highPhaseId: highestPhase.id,
      lowPhaseId: lowestPhase.id,
    }
  }

  const startConversation = async () => {
    const insight = getPersonalizedInsight()

    // MYSTERY (0-15s) - Immediate hook
    await showTyping(getTypingDelay("action"))
    addMessage("assistant", getTranslation('conversation.result.start.userName', 'en').replace('{userName}', userName))

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", t('conversation.result.start.stillHere', 'en') as string)

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.start.questions', 'en') as string, "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.start.dontKnow', 'en') as string, "revelation")

    // REVELATION (15-35s) - Personalized teasing
    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", t('conversation.result.start.forExample', 'en') as string)

    if (insight) {
      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", insight.high, "revelation")

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.start.andAlso', 'en') as string, "introspection")

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", insight.low, "revelation")
    }

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.start.surface', 'en') as string)

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.start.reportContains', 'en') as string, "motivation")

    await showTyping(getTypingDelay("normal"))
    addMessage(
      "assistant",
      getTranslation('conversation.result.start.archetype', 'en')
        .replace('{archetype}', getArchetypeName(finalReport.archetype))
        .replace('{emoji}', getArchetypeEmoji(finalReport.archetype))
    )

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", getTranslation('conversation.result.start.score', 'en').replace('{score}', finalReport.lifeIndex.lifeIndex.toString()))

    // CONFRONTATION (35-55s) - Triple revelation at climax
    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.start.mostImportantly', 'en') as string, "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.start.threeForces', 'en') as string, "revelation")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.start.shadow', 'en') as string)

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.start.fear', 'en') as string)

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.start.power', 'en') as string)

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.start.allInReport', 'en') as string, "revelation")

    // CHOICE (55-70s) - Moment of truth
    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", getTranslation('conversation.result.start.twoPaths', 'en').replace('{userName}', userName), "motivation")

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", t('conversation.result.start.firstPath', 'en') as string)

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.start.secondPath', 'en') as string, "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.start.fleeOrFace', 'en') as string, "revelation")

    // Show CTA at peak intensity
    setCurrentStep("main-cta")
    setShowChoices(true)
  }

  const handleMainCTA = async () => {
    addMessage("user", t('conversation.result.mainCTA.userWants', 'en') as string)
    setShowChoices(false)

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.mainCTA.goodChoice', 'en') as string, "motivation")

    await showTyping(getTypingDelay("normal"))
    addMessage("assistant", t('conversation.result.mainCTA.revelations', 'en') as string)

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.mainCTA.therapy', 'en') as string, "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", getTranslation('conversation.result.mainCTA.expires', 'en').replace('{time}', formatTime(timeLeft)), "revelation")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.mainCTA.ready', 'en') as string)

    // Create Stripe checkout session server-side then redirect to checkout URL
    try {
      const referralCode = getLocalStorage<string>(STORAGE_KEYS.REFERRAL_CODE) || ""
      const onboarding = getLocalStorage<any>(STORAGE_KEYS.ONBOARDING)
      
      // Extract firstName and lastName from name
      let firstName = ""
      let lastName = ""
      if (onboarding?.name) {
        const nameParts = onboarding.name.trim().split(/\s+/)
        firstName = nameParts[0] || ""
        lastName = nameParts.slice(1).join(" ") || ""
      }
      
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          referralCode, 
          email: userEmail,
          firstName,
          lastName,
        }),
      })

      if (!response.ok) throw new Error("Failed to create checkout session")
      const data = await response.json()
      if (data?.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch {
      // Silent error handling for Stripe checkout - user will see the error on Stripe's side
    }
  }

  const handleRefuse = async () => {
    addMessage("user", t('conversation.result.refuse.userRefuses', 'en') as string)
    setShowChoices(false)
    setCurrentStep("objection")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", t('conversation.result.refuse.wait', 'en') as string)

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.refuse.whyHesitate', 'en') as string, "introspection")

    setShowChoices(true)
  }

  const handleObjection = async (type: string) => {
    setShowChoices(false)

    if (type === "price") {
      addMessage("user", t('conversation.result.objection.price.user', 'en') as string)

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.price.mirror', 'en') as string, "introspection")

      await showTyping(getTypingDelay("normal"))
      addMessage("assistant", t('conversation.result.objection.price.cost', 'en') as string)

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", t('conversation.result.objection.price.invested', 'en') as string, "revelation")

      await showTyping(getTypingDelay("action"))
      addMessage("assistant", t('conversation.result.objection.price.souls', 'en') as string, "motivation")
    } else if (type === "worth") {
      addMessage("user", t('conversation.result.objection.worth.user', 'en') as string)

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.worth.afraid', 'en') as string, "introspection")

      await showTyping(getTypingDelay("normal"))
      addMessage("assistant", t('conversation.result.objection.worth.notPDF', 'en') as string)

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", t('conversation.result.objection.worth.clarity', 'en') as string, "revelation")

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.worth.neverKnow', 'en') as string, "introspection")
    } else if (type === "time") {
      addMessage("user", t('conversation.result.objection.time.user', 'en') as string)

      await showTyping(getTypingDelay("introspection"))
      addMessage("assistant", t('conversation.result.objection.time.precisely', 'en') as string, "introspection")

      await showTyping(getTypingDelay("normal"))
      addMessage("assistant", t('conversation.result.objection.time.change', 'en') as string)

      await showTyping(getTypingDelay("revelation"))
      addMessage("assistant", t('conversation.result.objection.time.captures', 'en') as string, "revelation")

      await showTyping(getTypingDelay("action"))
      addMessage("assistant", t('conversation.result.objection.time.gone', 'en') as string)
    }

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", getTranslation('conversation.result.objection.ready', 'en').replace('{userName}', userName), "motivation")

    setCurrentStep("main-cta")
    setShowChoices(true)
  }

  const handleFinalRefuse = async () => {
    addMessage("user", t('conversation.result.finalRefuse.user', 'en') as string)
    setShowChoices(false)

    // Save intent for future retargeting
    setLocalStorage(STORAGE_KEYS.INTENT, {
      refused: true,
      timestamp: Date.now(),
      userName,
    })

    await showTyping(getTypingDelay("introspection"))
    addMessage("assistant", t('conversation.result.finalRefuse.notReady', 'en') as string, "introspection")

    await showTyping(getTypingDelay("revelation"))
    addMessage("assistant", t('conversation.result.finalRefuse.timeWaits', 'en') as string, "revelation")

    await showTyping(getTypingDelay("action"))
    addMessage("assistant", getTranslation('conversation.result.finalRefuse.seeYou', 'en').replace('{userName}', userName))

    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  const getArchetypeName = (archetype: string) => {
    const names: Record<string, string> = {
      Mind: "The Architect",
      Heart: "The Empath",
      Drive: "The Creator",
      Spirit: "The Sage",
    }
    return names[archetype] || archetype
  }

  const getArchetypeEmoji = (archetype: string) => {
    const emojis: Record<string, string> = {
      Mind: "🧠",
      Heart: "💓",
      Drive: "⚡",
      Spirit: "🌞",
    }
    return emojis[archetype] || "✨"
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const getProgressColor = () => {
    if (timeLeft > 600) return "bg-green-500"
    if (timeLeft > 300) return "bg-yellow-500"
    if (timeLeft > 120) return "bg-orange-500"
    return "bg-red-500"
  }

  const progressPercentage = (timeLeft / 900) * 100

  if (loading || !finalReport) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="h-12 w-12 rounded-full border-4 border-purple-500 border-t-transparent"
          />
          <p className="text-lg text-gray-400">Analysis in progress...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col bg-black">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-40 border-b border-gray-800/50 bg-black/95 backdrop-blur-md"
      >
        <div className="px-4 py-3 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image src="/favicon.png" alt="LifeClock" width={40} height={40} className="w-10 h-10 object-contain" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Your report expires in</span>
              <span className={`text-xs font-medium ${timeLeft < 300 ? "text-red-400" : "text-gray-400"}`}>
                {formatTime(timeLeft)}
              </span>
            </div>

            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${getProgressColor()} ${timeLeft < 300 ? "animate-pulse" : ""}`}
                style={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 relative z-10"
        style={{ willChange: "transform", contain: "layout paint" }}
      >
        <div className="mx-auto max-w-md space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              text={message.text}
              messageType={message.messageType}
              delay={0}
            />
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-gray-400"
            >
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>


      <AnimatePresence>
        {showChoices && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-t border-white/10 bg-gradient-to-t from-black via-black/95 to-transparent p-4 pb-8"
          >
            <div className="mx-auto max-w-md flex flex-col gap-3">
              {currentStep === "main-cta" && (
                <>
                  <motion.button
                    onClick={handleMainCTA}
                    className="relative rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%] px-6 py-4 text-center font-bold text-white shadow-lg shadow-purple-500/50 overflow-hidden"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      boxShadow: [
                        "0 10px 40px rgba(168, 85, 247, 0.4)",
                        "0 10px 60px rgba(236, 72, 153, 0.6)",
                        "0 10px 40px rgba(168, 85, 247, 0.4)",
                      ],
                    }}
                    transition={{
                      backgroundPosition: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">🔮 {t('conversation.result.mainCTA.userWants', 'en') as string} — $47</span>
                  </motion.button>
                  <button
                    onClick={handleRefuse}
                    className="text-sm text-gray-500 hover:text-gray-400 transition-colors"
                  >
                    {t('conversation.result.refuse.userRefuses', 'en') as string}
                  </button>
                </>
              )}

              {currentStep === "objection" && (
                <>
                  <motion.button
                    onClick={() => handleObjection("price")}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-center font-medium text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('conversation.result.objection.price.user', 'en') as string}
                  </motion.button>
                  <motion.button
                    onClick={() => handleObjection("worth")}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-center font-medium text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('conversation.result.objection.worth.user', 'en') as string}
                  </motion.button>
                  <motion.button
                    onClick={() => handleObjection("time")}
                    className="rounded-2xl bg-white/10 px-6 py-3 text-center font-medium text-white hover:bg-white/20 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('conversation.result.objection.time.user', 'en') as string}
                  </motion.button>
                  <button
                    onClick={handleFinalRefuse}
                    className="text-xs text-gray-600 hover:text-gray-500 transition-colors mt-2"
                  >
                    {t('conversation.result.finalRefuse.user', 'en') as string}
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
