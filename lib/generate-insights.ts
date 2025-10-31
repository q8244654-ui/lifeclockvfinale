import type { PhaseResult, EnergyProfile } from "./types"

export interface Revelation {
  category: "phase" | "energy" | "pattern" | "extreme" | "contradiction" | "force"
  title: string
  insight: string
  icon: string
}

export function generateInsights(phasesResults: PhaseResult[], energyProfile: EnergyProfile): Revelation[] {
  const revelations: Revelation[] = []

  // 10 insights sur les phases
  phasesResults.forEach((phase) => {
    const score = phase.total
    let insight = ""

    if (score < 40) {
      insight = `Phase ${phase.id} (${phase.archetype}): ${score}/100 - This dimension is dormant. It awaits your attention.`
    } else if (score < 60) {
      insight = `Phase ${phase.id} (${phase.archetype}): ${score}/100 - You're exploring this dimension, but still hesitating.`
    } else if (score < 80) {
      insight = `Phase ${phase.id} (${phase.archetype}): ${score}/100 - This dimension is active. You're mastering it better and better.`
    } else {
      insight = `Phase ${phase.id} (${phase.archetype}): ${score}/100 - This dimension radiates within you. It's one of your strengths.`
    }

    revelations.push({
      category: "phase",
      title: `Phase ${phase.id}: ${phase.archetype}`,
      insight,
      icon: "🔮",
    })
  })

  // 4 insights sur les énergies
  Object.entries(energyProfile.averages).forEach(([energy, score]) => {
    let insight = ""
    if (energy === "Mind") {
      insight =
        score > 70
          ? "Your mind is your kingdom. You think before acting, analyze before feeling."
          : "You live more in the heart than the head. Intuition guides your steps."
    } else if (energy === "Heart") {
      insight =
        score > 70
          ? "Your heart is your compass. You feel before understanding, love before judging."
          : "You protect your heart. Emotion seems dangerous, uncontrollable."
    } else if (energy === "Drive") {
      insight =
        score > 70
          ? "Your movement is your prayer. You move forward without waiting for the world's green light."
          : "You hesitate to act. Fear of failure holds you back more than you think."
    } else if (energy === "Spirit") {
      insight =
        score > 70
          ? "You've seen beyond form. Your gaze no longer analyzes, it illuminates."
          : "You're still seeking meaning. Spirituality intrigues you but you doubt."
    }

    revelations.push({
      category: "energy",
      title: `Energy ${energy}`,
      insight: `${Math.round(score)}% - ${insight}`,
      icon: energy === "Mind" ? "🧠" : energy === "Heart" ? "💓" : energy === "Drive" ? "⚡" : "🌞",
    })
  })

  // 10 insights sur les patterns
  const patterns = [
    "You give a lot, sometimes too much. It's not love that exhausts you, it's the absence of reciprocity.",
    "You're afraid of lacking. This fear pushes you to accumulate, control, never let go.",
    "You procrastinate on what truly matters. You're busy, but not productive.",
    "You seek external validation. Others' opinions weigh more than your own.",
    "You have trouble saying no. You lose yourself in others' needs.",
    "You flee solitude. Silence confronts you with yourself.",
    "You idealize the past. You forget you survived everything that broke you.",
    "You wait for the right moment. But the right moment is now.",
    "You compare yourself to others. You forget everyone runs their own race.",
    "You're afraid to succeed. Success would force you to assume your power.",
  ]

  patterns.slice(0, 10).forEach((pattern, index) => {
    revelations.push({
      category: "pattern",
      title: `Pattern ${index + 1}`,
      insight: pattern,
      icon: "🔍",
    })
  })

  // 10 insights sur les réponses extrêmes
  const extremes = [
    "Your answer to question 23 reveals a wound you've never named.",
    "Your answer to question 47 shows you've already understood everything. You're just waiting for the courage to act.",
    "Your answer to question 12 betrays a fear you hide even from yourself.",
    "Your answer to question 89 reveals a strength you dare not use.",
    "Your answer to question 34 shows you've already chosen. You're just waiting for permission.",
    "Your answer to question 56 reveals you know exactly what you want. You're just afraid to say it.",
    "Your answer to question 78 shows you're stronger than you think.",
    "Your answer to question 91 reveals you've already forgiven. You're just waiting to accept it.",
    "Your answer to question 15 shows you're ready. You're just waiting for the signal.",
    "Your answer to question 67 reveals you've already started. You just don't see it yet.",
  ]

  extremes.forEach((extreme, index) => {
    revelations.push({
      category: "extreme",
      title: `Extreme response ${index + 1}`,
      insight: extreme,
      icon: "⚠️",
    })
  })

  // 7 insights sur les contradictions
  const contradictions = [
    "You want freedom but fear the void. You want love but fear losing.",
    "You want to succeed but fear being seen. You want to change but fear the unknown.",
    "You want to be loved but don't love yourself. You want to be understood but don't understand yourself.",
    "You want to move forward but look back. You want to let go but hold on.",
    "You want to be authentic but wear a mask. You want to be free but judge yourself.",
    "You want to be happy but cultivate suffering. You want peace but feed chaos.",
    "You want to be present but live in your head. You want to be alive but fear feeling.",
  ]

  contradictions.forEach((contradiction, index) => {
    revelations.push({
      category: "contradiction",
      title: `Contradiction ${index + 1}`,
      insight: contradiction,
      icon: "⚖️",
    })
  })

  // 6 insights sur les forces cachées
  const forces = [
    "Your greatest strength: you see what others ignore. Use it.",
    "Your greatest weakness: you doubt what you know. Stop.",
    "Your greatest talent: you transform pain into beauty. Continue.",
    "Your greatest challenge: accepting you're already enough. Start now.",
    "Your greatest power: you inspire without knowing it. Own it.",
    "Your greatest gift: you heal what you touch. Never forget it.",
  ]

  forces.forEach((force, index) => {
    revelations.push({
      category: "force",
      title: `Hidden force ${index + 1}`,
      insight: force,
      icon: "💎",
    })
  })

  return revelations
}
