"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

interface Revelation {
  text: string
  index: number
}

interface PreviewTeaserProps {
  revelations: Revelation[]
}

export default function PreviewTeaser({ revelations }: PreviewTeaserProps) {
  const [revealedIndex, setRevealedIndex] = useState(-1)
  const [blurAmount, setBlurAmount] = useState(10)

  useEffect(() => {
    // Reveal first revelation after 1 second
    const timer1 = setTimeout(() => {
      setRevealedIndex(0)
      setBlurAmount(0)
    }, 1000)

    // Reveal second after 3 seconds
    const timer2 = setTimeout(() => {
      setRevealedIndex(1)
    }, 3000)

    // Reveal third after 5 seconds
    const timer3 = setTimeout(() => {
      setRevealedIndex(2)
    }, 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 p-6 backdrop-blur-sm space-y-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">👁️</span>
        <h3 className="text-lg font-bold text-white">Preview — Here's a glimpse of what's inside...</h3>
      </div>

      <div className="space-y-3">
        {revelations.map((revelation, index) => (
          <AnimatePresence key={revelation.index}>
            {revealedIndex >= index && (
              <motion.div
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ 
                  opacity: 1, 
                  filter: `blur(${revealedIndex === index ? blurAmount : 0}px)`,
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1,
                  delay: index * 0.3 
                }}
                className="relative p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-3 pr-20">
                  <span className="text-purple-400 font-bold text-sm mt-1 shrink-0">
                    #{revelation.index}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {revelation.text}
                  </p>
                </div>
                {index < revealedIndex && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-sm"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring", stiffness: 500 }}
                      className="text-purple-400 text-xs"
                    >
                      ✓
                    </motion.span>
                    <span className="text-purple-300 text-xs font-medium">
                      Revealed
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: revealedIndex >= 0 ? 1 : 0 }}
        className="text-xs text-gray-500 text-center pt-2 border-t border-white/10"
      >
        ... and {47 - revelations.length} more revelations waiting inside
      </motion.p>
    </motion.div>
  )
}

