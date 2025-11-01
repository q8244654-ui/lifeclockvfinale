"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"
import { GUARANTEE } from "@/lib/constants"
import { useState } from "react"

export default function GuaranteeSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative rounded-xl border border-amber-500/20 p-6 backdrop-blur-sm space-y-5 overflow-hidden"
      style={{
        background: "linear-gradient(to bottom right, rgba(245, 158, 11, 0.1), rgba(234, 179, 8, 0.1), rgba(245, 158, 11, 0.1))",
      }}
    >
      {/* Halo lumineux animé au survol */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.3 : 0.1,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(251, 191, 36, 0.2) 0%, transparent 70%)",
        }}
      />

      {/* Contenu */}
      <div className="relative z-10 space-y-5">
        {/* Icône et titre */}
        <div className="flex items-start gap-4">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="w-14 h-14 rounded-full flex items-center justify-center border border-amber-500/30 shrink-0"
            style={{
              background: "linear-gradient(to bottom right, rgba(245, 158, 11, 0.2), rgba(234, 179, 8, 0.2))",
            }}
          >
            <Clock className="w-7 h-7 text-amber-400" />
          </motion.div>
          <div className="flex-1 pt-1">
            <h3 className="text-lg font-bold text-white mb-1">{GUARANTEE.MARKETING_TEXT}</h3>
          </div>
        </div>

        {/* Hook émotionnel */}
        <p className="text-lg font-medium text-white/95 leading-relaxed">
          {GUARANTEE.HOOK}
        </p>

        {/* Promesse */}
        <p className="text-gray-200 leading-relaxed">
          {GUARANTEE.PROMISE}
        </p>

        {/* Garantie de remboursement */}
        <p className="text-gray-300 leading-relaxed">
          {GUARANTEE.REFUND}
        </p>

        {/* Process simplifié */}
        <div className="space-y-1 pt-1">
          <p className="text-sm text-gray-300/90 font-medium">
            {GUARANTEE.PROCESS}
          </p>
        </div>

        {/* Signature émotionnelle */}
        <p className="text-amber-300/90 italic pt-2 border-t border-amber-500/20">
          {GUARANTEE.SIGNATURE}
        </p>

        {/* Note légale discrète */}
        <p className="text-xs text-gray-500 pt-1">
          Terms apply. See refund policy for details.
        </p>
      </div>
    </motion.div>
  )
}

