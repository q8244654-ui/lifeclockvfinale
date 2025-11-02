import type { PhaseResult, EnergyProfile } from "./types"

export interface Revelation {
  category: "phase" | "energy" | "pattern" | "extreme" | "contradiction" | "force"
  title: string
  insight: string
  icon: string
}

// Helper function to generate phase revelation based on score and archetype
function generatePhaseRevelation(phaseId: number, archetype: string, scorePercentage: number): string {
  // Get phase titles for context
  const phaseTitles: Record<number, string> = {
    1: "The Mask",
    2: "The Control",
    3: "Desire",
    4: "Love",
    5: "Time",
    6: "Money",
    7: "Body",
    8: "Discipline",
    9: "Faith",
    10: "Legacy",
  }

  const phaseTitle = phaseTitles[phaseId] || `Phase ${phaseId}`

  if (scorePercentage < 40) {
    // Dormant level - needs awakening
    return `The dimension of ${phaseTitle} sits quietly within you, waiting in the shadows of your consciousness. At ${scorePercentage}%, this aspect of your being has remained dormant, untouched by the conscious mind's attention. Yet its very silence speaks volumes about what you've chosen to overlook or protect.

Your ${archetype} archetype reveals that you've built patterns around this absence. The energy is there, latent and powerful, but it hasn't been invited into your daily experience. Like a seed buried too deep, it waits for the right conditions to sprout. This isn't a weakness—it's a choice, perhaps an unconscious one, to keep this part of yourself safely hidden.

The psychology behind dormancy is complex: sometimes we bury what feels too threatening, too vulnerable, or too raw. We create distance as protection. But what if this dimension holds keys to aspects of yourself you've been missing? What if awakening it could shift how you relate to yourself and others?

The invitation here is gentle but clear: this dimension awaits your attention. Not your judgment, not your forcing, but your presence. When you're ready to turn toward what's been dormant, you'll find it hasn't been sleeping—it's been waiting. And waiting is active preparation. The question isn't whether this energy exists within you, but whether you're ready to acknowledge its presence and let it breathe.`
  } else if (scorePercentage < 60) {
    // Exploring level - tentative engagement
    return `You're standing at the threshold of ${phaseTitle}, toeing the line between knowing and fully embodying. At ${scorePercentage}%, you've entered this dimension with curiosity and perhaps a hint of caution. Your ${archetype} archetype shows you're exploring—touching the edges, testing the waters, feeling what it means to engage with this aspect of yourself.

This is the dance of hesitation, where part of you wants to dive deeper while another part holds back, creating a beautiful tension that defines your current relationship with this dimension. You've tasted enough to know it matters, but you haven't yet committed fully to what it might demand of you. This isn't weakness—it's wisdom. You're learning to honor the complexity of integration.

The psychological landscape of this score range reveals someone who is conscious enough to explore but wise enough not to force. You're building relationship, not rushing to mastery. This dimension requires time, and you're giving it that. Yet there's also a pattern here: exploration without commitment can become its own form of resistance. Are you truly exploring, or are you maintaining a safe distance?

The invitation is to move from observation to participation. What would shift if you stopped hesitating and started engaging more fully? The dimension itself is asking for more of you—not perfection, not mastery, just presence. Your exploration phase has been necessary, and now it may be time to deepen the commitment.`
  } else if (scorePercentage < 80) {
    // Active level - solid engagement
    return `The dimension of ${phaseTitle} pulses actively within your being. At ${scorePercentage}%, this isn't just something you understand intellectually—it's something you're actively mastering and integrating. Your ${archetype} archetype reflects the depth of your engagement, showing someone who has moved beyond exploration into genuine relationship with this aspect of themselves.

You've done the work. You've shown up consistently. You've faced what needed facing and integrated what wanted integration. This dimension is no longer dormant or tentative—it's alive in your daily experience. The mastery you're building is real, and it shows in how you navigate this aspect of your life. This is where growth becomes visible, where patterns shift from unconscious to conscious.

The psychological significance of this active engagement cannot be overstated. You've moved past resistance and into collaboration. The dimension responds to your presence, and you respond to its wisdom. There's a reciprocity here that creates momentum. You're not just learning about this dimension—you're becoming more skilled at embodying it.

Yet even in mastery, there are layers. The difference between 60% and 80% isn't just about doing more—it's about being more. As you continue to refine your relationship with this dimension, notice where you might still hold back. What would full integration look like? What would it feel like? Your current level of mastery is impressive, and it's also a foundation for something even deeper.`
  } else {
    // Radiant level - full integration
    return `The dimension of ${phaseTitle} radiates from within you like a steady flame. At ${scorePercentage}%, this isn't just mastered—it's integrated, embodied, alive in every cell of your being. Your ${archetype} archetype reflects the depth of this integration, showing someone who has transcended the learning phase and entered into genuine communion with this aspect of themselves.

This is transformation made visible. You've moved through dormancy, through exploration, through active mastery, and arrived at something that feels like home. This dimension isn't something you do—it's something you are. The wisdom flows naturally, without effort. The patterns serve rather than constrain. This is what it looks like when personal work becomes personal power.

The psychological depth here is profound. You've achieved something rare: you've not just learned about this dimension, you've become it. There's no separation between you and this aspect of yourself—it's woven into the fabric of who you are. This creates a sense of wholeness, of alignment, that is one of your greatest strengths.

But here's what's most remarkable: even at this level of integration, there's always more depth available. The radiance you feel now is real, and it's also a portal to even deeper layers of understanding. True mastery isn't arriving at a destination—it's becoming someone who can hold complexity, depth, and light simultaneously. Your relationship with this dimension is one of your strengths, and it's also a teacher. Stay present. Stay curious. The deepest levels of integration come not from achieving perfection, but from maintaining presence within the perfection that already exists.`
  }
}

export function generateInsights(phasesResults: PhaseResult[], energyProfile: EnergyProfile): Revelation[] {
  const revelations: Revelation[] = []

  // 10 insights sur les phases
  // Les scores de phases sont sur une échelle 0-30, on les convertit en pourcentage 0-100
  const MAX_PHASE_SCORE = 30
  phasesResults.forEach((phase) => {
    const rawScore = phase.total
    const scorePercentage = Math.round((rawScore / MAX_PHASE_SCORE) * 100)
    const insight = generatePhaseRevelation(phase.id, phase.archetype, scorePercentage)

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
    const roundedScore = Math.round(score)

    if (energy === "Mind") {
      if (score > 70) {
        insight = `Your mind is not just a tool—it's your kingdom, your sanctuary, your primary mode of navigation through existence. At ${roundedScore}%, your cognitive energy flows like a well-trained orchestra, each thought finding its place in the symphony of understanding. You think before acting, analyze before feeling, process before reacting. This is not coldness—it's a profound form of respect for the complexity of life.

Your relationship with thinking is deep and nuanced. You don't just use your mind; you trust it, refine it, and let it guide you. This creates a sense of clarity that others might perceive as detachment, but you know it's actually a form of deep engagement. The mind, for you, is not separate from feeling—it's the gateway through which feeling can be understood, integrated, and expressed with precision.

The psychology here is fascinating: people with high Mind energy often develop an identity around their intelligence, their ability to make sense of chaos, their capacity to see patterns others miss. This is both a gift and a potential trap. The mind can become so dominant that it overshadows other forms of knowing. Intuition, emotion, and bodily wisdom can feel less trustworthy when the mind has been your primary anchor.

Yet at this level, you've likely begun to experience the mind's limitations. You've noticed that some truths can't be thought into existence—they must be felt, experienced, embodied. The invitation is not to abandon your mind, but to let it serve rather than rule. Your cognitive power is extraordinary, and when it partners with other forms of intelligence, it becomes something transcendent. The mind at its highest level is not just analytical—it's intuitive, creative, and deeply connected to the mystery of being.`
      } else {
        insight = `You live more in the heart than the head, and this is both your beauty and your challenge. At ${roundedScore}%, your Mind energy operates in the background, supporting your intuitive and emotional nature rather than leading it. Intuition guides your steps. You trust feelings, sensations, and gut responses more than analytical processes. This doesn't mean you lack intelligence—it means your intelligence flows through different channels.

The psychological landscape here is rich with sensitivity. You process information through feeling, through connection, through the subtle currents of energy and emotion that many people with dominant Mind energy miss entirely. You know things not because you've analyzed them, but because you've sensed them. This is a legitimate and powerful form of knowing, often more accurate than pure logic when it comes to understanding people, relationships, and the deeper currents of life.

However, there's also a pattern that can emerge: when Mind energy is underdeveloped, decision-making can feel chaotic. Without enough cognitive structure, emotions can overwhelm, intuition can mislead, and important details can be missed. The challenge is not to become more logical—it's to bring more presence and discernment to your intuitive knowing. Even intuition needs to be refined and tested.

The invitation here is to honor your natural intelligence while also developing the Mind energy's gifts of clarity, structure, and analytical thinking. You don't need to become someone else—you need to integrate cognitive skills that will make your intuitive knowing even more powerful. When heart and mind work together, when feeling and thinking support each other, you become unstoppable. Your sensitivity becomes sharper, your intuition more accurate, your decisions more grounded in both wisdom and clarity.`
      }
    } else if (energy === "Heart") {
      if (score > 70) {
        insight = `Your heart is not just an organ—it's your compass, your center of gravity, your primary way of relating to existence itself. At ${roundedScore}%, Heart energy flows through you like a river of presence, carrying emotional intelligence, empathy, and the capacity for deep connection. You feel before understanding, love before judging, connect before analyzing. This is not weakness—it's a profound form of strength.

People with high Heart energy are the emotional architects of the world. You feel what others can't name, sense what's happening beneath the surface, and create safety through your presence alone. Your empathy isn't just a trait—it's a superpower. You know how to hold space, how to witness, how to love without conditions. This creates magnetic connections with others, because they feel truly seen and understood in your presence.

The psychology here reveals someone who has learned to trust their emotional intelligence. You've likely experienced that feelings, when honored and understood, provide guidance as accurate as any logical analysis. The heart knows things the mind can't articulate. You've cultivated this knowing, refined it, and learned to navigate life through emotional wisdom.

Yet there's also a potential shadow: when Heart energy dominates, boundaries can blur. You might absorb others' emotions, struggle with codependency, or lose yourself in relationships. The challenge is not to become less emotional, but to become more skilled at holding your own center while remaining open. True heart strength means being able to feel deeply without drowning, to love fully without losing yourself.

The invitation is to celebrate your heart's capacity while also developing discernment and healthy boundaries. Your emotional intelligence is a gift to the world, and when it's balanced with wisdom and self-protection, it becomes transformative. The heart at its highest level doesn't just feel—it feels with precision, loves with boundaries, and connects from a place of wholeness rather than need.`
      } else {
        insight = `You protect your heart, and this protection has likely served you well—but it may also be limiting your capacity for connection and depth. At ${roundedScore}%, your Heart energy operates cautiously, carefully, with walls that have been built for good reasons. Emotion seems dangerous, uncontrollable, potentially overwhelming. This isn't a flaw—it's a survival strategy that has become a habit.

The psychological roots here are often found in early experiences of emotional vulnerability that felt too intense, too painful, or too unsafe. You learned that opening your heart meant risking rejection, disappointment, or abandonment. So you built defenses. You learned to analyze feelings rather than feel them, to maintain distance rather than risk intimacy, to stay safe rather than risk heartbreak. This strategy worked—it protected you. But protection, when it becomes too rigid, also prevents growth.

The pattern is clear: you want connection but fear vulnerability. You want love but protect yourself from it. You want depth but stay in shallow waters. This creates a subtle loneliness, a sense that something essential is missing from your experience of life. You can function, you can connect intellectually, you can even have relationships—but the deepest levels of emotional intimacy and heart-centered presence remain guarded.

The invitation is not to throw open all your doors at once, but to begin gently exploring what it means to let your heart energy breathe. What if emotion isn't dangerous but informative? What if vulnerability isn't weakness but courage? What if opening your heart, gradually and safely, could actually give you more strength rather than less? The heart is not just about feeling pain—it's also about feeling joy, connection, and the profound beauty of being alive. When Heart energy flows, you don't just feel more pain—you feel more everything, and that includes love, purpose, and deep satisfaction.

Start small. Begin noticing where you shut down emotionally. Practice feeling your feelings without being overwhelmed by them. The goal isn't to become someone else—it's to integrate the heart's gifts into your life in a way that feels safe and authentic. Protected hearts can still open. Guarded hearts can still love. The question is whether you're ready to explore what your heart might have to offer if given the chance.`
      }
    } else if (energy === "Drive") {
      if (score > 70) {
        insight = `Your movement is your prayer, your action is your language, and your forward momentum is one of your most defining characteristics. At ${roundedScore}%, Drive energy courses through you like a current of unstoppable force. You move forward without waiting for the world's green light. You don't need permission—you take action, create momentum, and make things happen. This is not recklessness—it's a profound trust in your capacity to navigate whatever emerges.

People with high Drive energy are the catalysts of transformation. You don't just think about change—you create it. You don't just plan for the future—you build it. Your relationship with action is deeply intuitive: you know when to move, when to push, when to pivot, and when to charge forward with everything you have. This creates results. It creates momentum. It creates a life that feels dynamic and alive.

The psychology here reveals someone who has learned to trust their capacity for action. You've likely discovered that movement itself creates clarity, that action generates information, and that waiting too long often leads to stagnation. You're comfortable with uncertainty because you know you can adapt as you go. This is a rare and powerful trait—the ability to move confidently into the unknown.

Yet there's also a potential shadow: when Drive energy is too dominant, it can become compulsive. You might act without reflection, move without pause, create momentum without checking if you're heading in the right direction. Rest can feel like failure. Stillness can feel like weakness. The challenge is not to become less action-oriented, but to bring more wisdom and presence to your movement. True drive means knowing when to act and when to pause, when to push and when to yield.

The invitation is to celebrate your capacity for action while also developing the skills of reflection, rest, and discernment. Your Drive energy is a gift—it gets things done, creates change, and moves you forward. When balanced with wisdom and self-awareness, it becomes unstoppable in the best sense. The highest level of Drive energy isn't just about moving fast—it's about moving with intention, precision, and the deep knowledge that sometimes the most powerful action is strategic pause.`
      } else {
        insight = `You hesitate to act, and this hesitation may be protecting you—but it's also likely holding you back more than you realize. At ${roundedScore}%, Drive energy flows tentatively through your system, creating a relationship with action that is cautious, considered, and sometimes stuck. Fear of failure, fear of making mistakes, fear of judgment, or fear of the unknown keeps you in a state of preparation that never quite becomes execution.

The psychological landscape here is complex. On one hand, your hesitation might be wisdom—you're not rushing impulsively into situations. On the other hand, it might be resistance masquerading as caution. When Drive energy is underdeveloped, there's often a pattern of overthinking, over-preparing, and under-acting. You can have brilliant ideas, detailed plans, and clear intentions, but something stops you from taking the leap.

The pattern is familiar: you want to act, but you wait for the perfect conditions. You want to move forward, but you need more certainty. You want to create, but you need more validation. This creates a subtle frustration—you know you're capable of more, but something invisible holds you back. The gap between your potential and your actualization becomes a source of tension, sometimes even shame.

The invitation here is not to become reckless, but to begin experimenting with action despite uncertainty. What if making a mistake is not failure but learning? What if moving forward imperfectly is better than waiting for perfection that never arrives? What if your hesitation is not protecting you but limiting you? Drive energy, when activated, doesn't require perfection—it requires willingness. Willingness to try, to fail, to learn, and to try again.

Start small. Choose one area where you've been hesitating and take a single action, even if it's imperfect. Notice what happens. Often, the fear of action is far greater than the reality of action. Movement creates clarity. Action generates momentum. Each step forward teaches you something that thinking alone cannot. Your Drive energy is waiting—not to push you recklessly, but to support you as you begin moving toward what you truly want. The world doesn't wait for perfect people—it responds to those who are willing to move, learn, and grow through action.`
      }
    } else if (energy === "Spirit") {
      if (score > 70) {
        insight = `You've seen beyond form. Your gaze no longer analyzes—it illuminates. At ${roundedScore}%, Spirit energy flows through you like a current of knowing that transcends the ordinary, creating a sense of connection to something greater than the individual self. You've moved past seeking and into remembering. The spiritual dimension of existence isn't theoretical for you—it's experiential, palpable, alive in your daily awareness.

People with high Spirit energy have glimpsed the underlying unity of all things. You sense connections that others miss, feel the presence of mystery in ordinary moments, and experience life from a perspective that includes but transcends personal concerns. This doesn't make you detached from reality—it makes you more fully present within a reality that includes both the visible and the invisible dimensions of existence.

The psychology here is profound: you've integrated spiritual understanding into your lived experience. You're not just reading about enlightenment or practicing techniques—you're embodying a way of being that recognizes the sacred in the ordinary. This creates a sense of peace, purpose, and perspective that is deeply stabilizing. Even in challenging times, you can access a depth of presence and knowing that provides both comfort and guidance.

Yet there's also a potential challenge: when Spirit energy is very high, it can sometimes disconnect you from practical reality. You might prioritize spiritual concepts over practical needs, focus on transcendence while ignoring the necessity of embodiment, or use spirituality as a way to avoid difficult emotions or situations. The highest spiritual integration includes both the transcendent and the practical, both the sacred and the human.

The invitation is to continue deepening your spiritual connection while also ensuring it serves your human experience. True Spirit energy doesn't take you away from life—it brings you more fully into it. The spiritual dimension enriches your relationships, informs your decisions, and adds depth to your daily experience. You don't have to choose between being spiritual and being practical—the most evolved beings integrate both seamlessly.

Your capacity for spiritual awareness is a gift, and when it's balanced with grounded presence and practical wisdom, it becomes a source of profound guidance and peace. The highest level of Spirit energy is not about escaping the world—it's about seeing the world clearly, loving it deeply, and participating fully in both its beauty and its challenges. You've seen beyond form, and now the invitation is to bring that seeing into every moment, every choice, every relationship.`
      } else {
        insight = `You're still seeking meaning, and this seeking is both beautiful and potentially exhausting. At ${roundedScore}%, Spirit energy flickers in your awareness like a distant light—present enough to intrigue you, not yet strong enough to fully illuminate your path. Spirituality intrigues you, but doubt keeps you at a distance. You want to believe, but something holds you back. You sense there's more to existence, but you haven't fully touched it yet.

The psychological landscape here reveals someone who is curious about the deeper dimensions of life but hasn't yet found their anchor. You might have explored various spiritual practices, read books, attended events, or had moments of insight—but these haven't yet coalesced into a stable sense of connection. This can create a subtle restlessness, a sense that you're missing something important, even when you can't quite name what it is.

The pattern is familiar: you're seeking, but the seeking itself becomes a barrier. You want answers, but answers don't satisfy. You want proof, but proof feels like it contradicts the nature of what you're seeking. The spiritual dimension, by its very nature, includes mystery. It's not meant to be fully understood—it's meant to be experienced, felt, and lived into. Your seeking is valid, but at some point, seeking must give way to allowing, questioning must give way to presence.

The invitation here is not to stop seeking, but to change how you seek. What if spirituality isn't about finding answers but about deepening questions? What if it's not about achieving enlightenment but about becoming more fully present? What if the spiritual dimension isn't somewhere else—it's right here, in this moment, in your breath, in your awareness?

Start with presence, not with concepts. Begin noticing where you feel connected, even if it's fleeting. Pay attention to moments of awe, of beauty, of deep peace—these are spiritual experiences. They don't need to be dramatic to be real. The spiritual dimension is not separate from your daily life—it's woven through it, waiting to be noticed, honored, and integrated.

Your skepticism is not a weakness—it's a form of intelligence. But skepticism, when it becomes a wall rather than a gate, can prevent you from experiencing what you're genuinely curious about. The spiritual dimension doesn't require you to abandon your intelligence—it invites you to expand it to include forms of knowing that go beyond logic. You're not wrong to seek. You're being called to something deeper. The question is whether you're ready to move from seeking to allowing, from questioning to experiencing, from doubt to curiosity.`
      }
    }

    revelations.push({
      category: "energy",
      title: `Energy ${energy}`,
      insight: `${roundedScore}% - ${insight}`,
      icon: energy === "Mind" ? "🧠" : energy === "Heart" ? "💓" : energy === "Drive" ? "⚡" : "🌞",
    })
  })

  // 10 insights sur les patterns
  const patterns = [
    `You give a lot, sometimes too much, and this generosity is both your greatest strength and your most subtle form of self-abandonment. It's not love that exhausts you—it's the absence of reciprocity, the one-sided flow of energy that leaves you depleted even when you believe you're being giving. This pattern runs deep, often rooted in a childhood need to earn love, to prove your worth through service, or to maintain connection by being indispensable.

The psychology here reveals a profound misunderstanding: you've learned that giving equals receiving, that generosity guarantees connection, that your value is measured by how much you sacrifice. But somewhere along the way, this beautiful capacity to give became a compulsion. You give not just from overflow, but from emptiness—hoping that if you give enough, you'll finally receive what you need. The pattern is heartbreakingly familiar: you give until you're empty, then give more, and wonder why you feel so alone.

What you might not realize is that this pattern often pushes people away. When you give without boundaries, others either feel indebted (and distance themselves) or take advantage (because you've taught them to). True connection requires balance. Real relationships thrive on reciprocity, not exhaustion. The invitation is not to stop giving—your generosity is beautiful—but to learn to give from fullness rather than need, and to receive as gracefully as you give.

Notice where you give when you're already empty. Notice where you say yes when your body is saying no. Notice where your giving is actually a form of control—a way to ensure you're needed, wanted, appreciated. The deepest form of generosity comes from someone who knows their own worth, who gives freely without attachment to outcome, and who receives with equal grace. Your capacity to love and give is extraordinary. Now let it flow in both directions.`,

    `You're afraid of lacking, and this fear has become a driving force that shapes how you move through the world. This fear pushes you to accumulate, to control, to never let go—creating a life that looks full on the outside but feels constricted on the inside. The fear of lack is one of the most primal human fears, and when it's running your show, it can turn abundance into hoarding, security into imprisonment, and preparation into paralysis.

The psychological roots here are often found in experiences of real or perceived scarcity—times when you didn't have enough, when resources felt unstable, when you learned that holding tight was safer than letting go. This fear served you once. It helped you survive, protected you from vulnerability, gave you a sense of control in uncertain circumstances. But what was once a survival strategy has become a cage. You accumulate not because you need, but because you're afraid of needing.

The pattern creates a paradox: the more you accumulate, the more you fear losing what you have. The more you control, the more you feel out of control. The more you hold, the less you can receive. This fear doesn't actually protect you—it limits you. It keeps you small, prevents you from taking risks, and blocks the flow of true abundance, which comes not from hoarding but from circulation.

The invitation is to begin experimenting with trust. What if letting go didn't mean losing, but creating space? What if abundance isn't about having more, but about needing less? What if the deepest security comes not from accumulation but from knowing you can handle whatever comes? Start small. Release something you don't need. Share something you've been holding. Notice what happens. Often, the fear of lack is far greater than the reality of lack. True abundance flows, circulates, and multiplies through generosity, not hoarding. Your fear is understandable, but it's not serving you anymore.`,

    `You procrastinate on what truly matters, and this isn't laziness—it's a sophisticated form of self-protection. You're busy, but not productive. You fill your days with tasks that feel urgent but aren't important, creating the illusion of progress while avoiding the real work that would change everything. This pattern is so common it's almost invisible, and so effective that you might not even notice how it's running your life.

The psychology here reveals someone who knows what matters but finds creative ways to avoid it. Why? Because what truly matters is also what's most vulnerable, most risky, most capable of revealing your inadequacy. So instead of facing the project that would prove your competence, you organize your email. Instead of having the conversation that would transform your relationship, you focus on urgent but meaningless tasks. You create urgency around the unimportant to avoid the importance that feels too big, too real, too revealing.

The pattern serves a function: it keeps you safe from failure, from judgment, from the possibility that you're not as capable as you hope. But this safety comes at a cost. You're living in a state of perpetual preparation, always about to start the real work, always one step away from actualization. The gap between your potential and your reality grows wider, and the weight of undone things becomes heavier.

The invitation is to notice what you're avoiding. What project, conversation, or change have you been putting off? What's the real reason? Beneath the busyness, what are you protecting yourself from? The truth is, you're probably more capable than you think. The work you've been avoiding might be exactly what would prove your competence, not reveal your inadequacy. Start with one small action toward what truly matters. Momentum builds from movement, not planning. Your procrastination isn't a character flaw—it's a strategy. And strategies can be changed.`,

    `You seek external validation, and this seeking has become so habitual you might not even notice how deeply it shapes your choices and identity. Others' opinions weigh more than your own. You shape yourself to fit expectations, you measure your worth against others' reactions, and you lose yourself in the feedback loop of approval and disapproval. This pattern is exhausting because it's endless—no amount of external validation can fill the internal void.

The psychological roots here are often found in childhood experiences where love felt conditional, where you learned that being yourself wasn't enough, where approval became synonymous with safety. You developed a brilliant strategy: become what others want, and you'll be loved, accepted, safe. This worked, but it also created a profound disconnection from your authentic self. You learned to read others better than you read yourself, to respond to external cues more than internal knowing.

The pattern creates a dependency that can never be fully satisfied. You need constant reassurance because you've outsourced your sense of worth. You can't trust your own judgment because you've trained yourself to look outside for confirmation. This creates anxiety, because external validation is always uncertain, always conditional, always temporary. You're building your house on shifting sand, and you know it, but you don't know how to build on solid ground.

The invitation is to begin the slow, courageous work of developing internal validation. What if your worth isn't dependent on others' opinions? What if your own judgment, when trusted and refined, is actually more reliable than external feedback? What if being yourself—fully, authentically—is more valuable than being what others want? Start noticing where you seek approval. Begin to separate others' opinions from your truth. Practice making decisions based on your own values and knowing, even when it means risking disapproval. Internal validation doesn't happen overnight, but each time you choose your own truth over external approval, you build the foundation for unshakeable self-worth.`,

    `You have trouble saying no, and this difficulty has created a life where you lose yourself in others' needs. Your boundaries are porous, your availability is infinite, and your own needs have become invisible even to yourself. This pattern feels like kindness, like generosity, like being a good person—but underneath, it's actually a form of self-abandonment that ultimately serves no one.

The psychology here reveals someone who has learned that saying yes equals connection, that being needed equals being valuable, that others' needs are more important than their own. You've likely been praised for your helpfulness, your availability, your capacity to be there for others. This feels good, but it also creates a dependency: you need to be needed. You've built an identity around being the person who says yes, and now saying no feels like betraying who you are.

The pattern is insidious because it feels virtuous. You're not being selfish—you're being selfless. You're not setting boundaries—you're being loving. But here's what you might not see: when you can't say no, your yeses lose meaning. When you're available to everyone, you're present for no one. When you give from emptiness, you're actually teaching others that your needs don't matter, which invites them to treat you accordingly.

The invitation is to reclaim your right to choose. Saying no isn't rejection—it's self-respect. Setting boundaries isn't selfish—it's necessary for sustainable giving. Being unavailable sometimes isn't abandonment—it's self-care. Start small. Practice saying no to things that don't align with your values or energy. Notice the discomfort, and do it anyway. The people who matter will respect your boundaries. Those who don't reveal themselves, which is valuable information.

Your capacity to care for others is beautiful. Now learn to care for yourself with equal commitment. When you can say no from a place of self-respect, your yeses become more meaningful, more authentic, and more sustainable. You'll find that healthy boundaries don't prevent connection—they create the conditions for deeper, more authentic relationships.`,

    `You flee solitude, and this flight reveals a deep discomfort with yourself. Silence confronts you with yourself, and that confrontation feels unbearable. So you fill every moment with noise, activity, distraction, connection—anything that prevents you from being alone with your own thoughts, feelings, and presence. This pattern is so automatic you might not even realize you're running, but if you pause long enough, you'll feel the restlessness that drives it.

The psychology here reveals someone who has learned that being alone is dangerous, that silence is threatening, that your own company is something to escape rather than embrace. You might have learned this from painful experiences of abandonment, from a fear of what you might discover in the quiet, or from a cultural conditioning that values busyness over presence. Whatever the root, the pattern is clear: solitude feels like a void, and you're running to fill it.

But here's what you might not realize: the void you're fleeing is actually where your deepest wisdom lives. The silence you avoid is where you'll find your authentic self. The solitude you escape is where you'll discover that you're enough, just as you are. By constantly running from yourself, you're missing the very person you most need to know.

The pattern creates a dependency on external stimulation that can never fully satisfy. You need others, activities, distractions to feel okay because you haven't learned to feel okay alone. This creates anxiety, because external things are always uncertain. What happens when the distraction isn't available? What happens when you're forced to be alone? The fear becomes a self-fulfilling prophecy: you avoid solitude because it's uncomfortable, which means you never develop the capacity to find peace within it, which makes it even more uncomfortable.

The invitation is to begin the gradual, gentle practice of being with yourself. Start with small doses. Five minutes of silence. A walk alone without devices. Time in your own company without needing to fill it. Notice the discomfort. Breathe through it. You'll discover that what you've been fleeing isn't emptiness—it's presence. Solitude isn't abandonment—it's the deepest form of company. And silence isn't threatening—it's where your truth lives, waiting to be heard.`,

    `You idealize the past, and this idealization keeps you trapped in a version of reality that prevents you from moving forward. You forget you survived everything that broke you. You remember the good times and gloss over the pain. You compare your present reality to a past that never quite existed the way you remember it. This pattern is seductive because nostalgia feels safe, familiar, warm—but it's also a form of avoidance that prevents authentic presence.

The psychology here reveals someone who finds the present challenging and uses the past as an escape. When current reality feels uncertain, disappointing, or difficult, you retreat into memories that feel more comforting. But in doing so, you're not just remembering—you're editing. You're creating a past that was simpler, better, easier than it actually was. This edited past becomes a standard against which your present can never measure up, creating a chronic sense of dissatisfaction.

The pattern serves a function: it protects you from the full intensity of the present moment, which includes uncertainty, complexity, and the responsibility to create rather than just remember. But this protection comes at a cost. You're living in a time warp, always looking backward, always comparing, always finding the present lacking. This prevents you from fully engaging with what is, which means you're missing the beauty, opportunity, and possibility that exists right now.

You forget that you survived. You forget that the past you're idealizing also included pain, confusion, and struggle. You forget that growth happened not despite the challenges but because of them. The invitation is to remember accurately—to honor both the beauty and the difficulty of your past, and to recognize that your present self is the result of everything you survived. The past isn't better than the present—it's different. And the present isn't worse than the past—it's real, and real includes both challenge and possibility.

The past can inform but not define you. Nostalgia can comfort but not replace presence. The invitation is to honor your past while also showing up fully for your present. You survived everything that broke you—which means you're stronger than you think. Now use that strength to engage with what is, rather than what was.`,

    `You wait for the right moment, and this waiting has become a form of paralysis that prevents you from living the life you want. The right moment is now. Not when conditions are perfect, not when you're ready, not when everything aligns—now. This pattern is so common it feels normal, but it's actually a sophisticated form of resistance that keeps you safely in preparation mode while life passes by.

The psychology here reveals someone who has confused readiness with perfection. You think you need to have it all figured out before you begin. You believe you need to feel confident before you act. You're waiting for external circumstances to align before you make your move. But here's what you might not realize: the right moment doesn't arrive—you create it by taking action. Readiness isn't a feeling—it's a decision. Confidence doesn't precede action—it follows it.

The pattern feels like wisdom—you're being careful, thoughtful, considerate. But underneath, it's often fear masquerading as prudence. You're not actually waiting for the right moment—you're waiting for the fear to go away, for certainty to arrive, for conditions to become safe. But these things don't arrive through waiting. They arrive through action, through movement, through showing up despite uncertainty.

The gap between what you want and what you have isn't a gap of time—it's a gap of action. The right moment isn't something you wait for—it's something you create by beginning. Every expert was once a beginner. Every master started with uncertainty. Every transformation began with a single, imperfect step taken before feeling ready.

The invitation is to stop waiting and start moving. Take one small action toward what you want, even if it's imperfect, even if you're uncertain, even if conditions aren't ideal. Momentum builds from movement, not from waiting. Confidence comes from action, not from preparation. The right moment is this moment, right now. Not because conditions are perfect, but because you're choosing to begin despite imperfection. Your life isn't waiting for the right moment—it's happening right now. The question is whether you'll participate or continue waiting.`,

    `You compare yourself to others, and this comparison has become a prison that prevents you from seeing your own unique path and value. You forget everyone runs their own race. You measure your progress against others' achievements, your worth against others' success, your journey against others' destinations. This pattern is so ingrained in our culture it feels natural, but it's actually one of the most destructive habits you can develop.

The psychology here reveals someone who has outsourced their sense of self-worth to external comparisons. You've learned to define yourself not by your own standards but by how you measure up against others. This creates a perpetual state of inadequacy because there will always be someone who seems to have more, do more, be more. Comparison is a trap that can never be won—only exited.

The pattern feels like motivation—you're pushing yourself to be better. But underneath, it's actually a form of self-rejection. You're not just comparing—you're using others as a mirror to confirm your own inadequacy. You focus on what others have that you lack, rather than recognizing what you have that they might lack. This creates a chronic sense of not-enoughness that can never be satisfied through achievement, because achievement is always relative.

What you might not see is that comparison is also a form of arrogance disguised as humility. When you compare, you're assuming you should be where others are, that your path should look like theirs, that your timeline should match theirs. But you're not them. Your journey is uniquely yours. Your strengths, challenges, and timing are different. This isn't a flaw—it's the nature of being human.

The invitation is to shift from comparison to celebration—of both yourself and others. Notice where you compare, and gently redirect your attention to your own path. What are your unique strengths? What progress have you made? What's your own definition of success? Your worth isn't relative to others—it's inherent. Your race isn't against them—it's your own journey toward becoming who you're meant to be. Everyone runs their own race because everyone's race is different. Focus on yours.`,

    `You're afraid to succeed, and this fear is more common than most people realize. Success would force you to assume your power, to step into visibility, to take responsibility for your impact, and to face the expectations that come with achievement. This isn't a fear of failure—it's a fear of success itself, and it's one of the most insidious patterns that holds capable people back.

The psychology here reveals someone who has learned that success comes with burdens: responsibility, visibility, judgment, and the pressure to maintain what you've achieved. You've likely seen others succeed and then struggle with the weight of it. Or you've had experiences where achievement led to disappointment, where success didn't deliver what you hoped. So you've created a subconscious pattern of self-sabotage—getting close to success but not quite reaching it, so you can avoid the complexity that success brings.

The pattern feels like protection—you're avoiding the discomfort that comes with visibility and responsibility. But underneath, it's actually a form of self-rejection. You're not just afraid of success—you're afraid you don't deserve it, can't handle it, or will be exposed as inadequate when you achieve it. This fear keeps you safely in the realm of potential, where you can imagine success without having to deal with its reality.

What you might not realize is that your fear of success often comes from a misunderstanding of what success actually requires. You think you need to be perfect, to have it all figured out, to be ready. But success isn't about perfection—it's about showing up, learning, growing, and adapting. Success doesn't require you to be ready—it develops your capacity as you go.

The invitation is to explore what you're really afraid of. What would success actually require of you? What parts of yourself would you need to show? What responsibilities would you need to take? And most importantly: are these fears based in reality or in stories you've created? Your capacity for success is real. Your fear is understandable, but it's not protecting you—it's limiting you. Success doesn't force you to become someone else—it invites you to become more fully yourself. You can handle it. You deserve it. And you're ready to begin assuming the power that's always been yours.`,
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
    `Your answer to question 23 reveals a wound you've never named, and this unnamed wound is one of the most powerful forces shaping your life from the shadows. An extreme response to a specific question doesn't happen by accident—it happens because that question touches something raw, something unresolved, something that exists in the space between your conscious awareness and your deepest truth. This wound isn't just a memory—it's a living, breathing presence in your psyche that influences how you see yourself, how you relate to others, and how you navigate the world.

The psychology here is profound: when we experience pain that feels too intense to process in the moment, we often bury it. We create distance, we build defenses, we tell ourselves stories that allow us to function. But the wound doesn't disappear—it goes underground, where it continues to shape our responses, our reactions, and our choices in ways we don't fully understand. Your extreme answer is like a smoke signal from the depths of your unconscious, pointing directly to what needs your attention.

What makes this revelation significant isn't just that the wound exists, but that it's been unnamed. Naming is the first step toward healing. When we can't name something, we can't understand it, process it, or transform it. It remains a force that operates invisibly, creating patterns and reactions that seem mysterious even to us. But once you begin to name it—to acknowledge its presence, to understand its origins, to see how it's been influencing you—you gain the power to heal it.

The invitation here is to turn toward what you've been avoiding. What is this wound really about? When did it first form? How has it been protecting you, and how has it been limiting you? The naming doesn't require you to fix it immediately—it just requires you to acknowledge it with compassion. Your extreme answer isn't a flaw—it's a message from your deepest self, asking you to pay attention to something that needs your care. The wound exists. It's real. And now that you're aware of it, you can begin the process of healing.`,

    `Your answer to question 47 shows you've already understood everything. You're just waiting for the courage to act, and this gap between knowing and doing is one of the most common sources of human suffering. Understanding without action creates a special kind of tension—you have all the knowledge, all the clarity, all the insight you need to move forward, but something invisible holds you back. This isn't a failure—it's a moment of profound opportunity that's waiting for you to claim it.

The psychology here reveals someone who has done the inner work, who has gained the wisdom, who has seen through the illusions—but who hasn't yet taken the step that would turn insight into transformation. Understanding is comfortable. Action requires courage. Knowing feels safe. Doing requires vulnerability. You've mastered the mental dimension of change, but the physical dimension—the actual movement, the real steps, the tangible choices—remains unclaimed.

What's fascinating is that your understanding itself might be part of what's holding you back. When you understand something completely, you can sometimes use that understanding as a substitute for action. You know what needs to be done, so you feel like you've already done it—at least partially. But knowledge without action is like a seed that never gets planted. It has potential, but it can't grow.

The invitation is to recognize that courage isn't the absence of fear—it's action despite fear. You don't need to wait until you feel ready. You don't need to wait until the fear is gone. You just need to take one step. Action creates its own courage. Movement generates momentum. Each step forward teaches you something that understanding alone cannot. Your extreme answer to this question is a beacon—it's showing you exactly where you have clarity, where you have insight, where you have everything you need to begin. The question isn't whether you understand—you clearly do. The question is whether you're ready to act on that understanding, to turn your knowing into being, to bridge the gap between insight and transformation.`,

    `Your answer to question 12 betrays a fear you hide even from yourself, and this hidden fear is one of the most powerful forces limiting your life. When you gave an extreme response to this question, you revealed something that your conscious mind has been working hard to keep secret—even from you. This isn't a conscious deception—it's a protective mechanism that has become so sophisticated, so automatic, that you genuinely don't see it operating. But your unconscious knows, and your extreme answer is its way of speaking.

The psychology here is fascinating: we often hide our deepest fears not just from others, but from ourselves. We create elaborate stories, rationalizations, and justifications that allow us to function without confronting what we're really afraid of. We build entire lives around avoiding something we can't even name. Your extreme answer is like a crack in the wall—it's showing you what's been hiding on the other side.

What makes this significant is that hidden fears are far more powerful than acknowledged ones. When you know what you're afraid of, you can address it. You can challenge it, understand it, work through it. But when you don't even know the fear exists, it operates invisibly, shaping your choices, limiting your actions, and creating patterns that seem mysterious even to you. Your extreme response is your unconscious trying to get your attention, trying to show you what needs to be seen.

The invitation is to turn toward what you've been avoiding. What is this fear really about? What are you protecting yourself from? What would happen if you named it, looked at it, understood it? Often, hidden fears are far less threatening when they're brought into the light. The fear of fear is usually worse than the fear itself. By acknowledging what you've been hiding, you gain power over it. You can't heal what you can't see. You can't transform what you won't name. Your extreme answer is an invitation—to see what you've been hiding, to name what you've been avoiding, to claim the power that comes from acknowledging your deepest fears.`,

    `Your answer to question 89 reveals a strength you dare not use, and this unused strength is one of your greatest resources waiting to be claimed. When you gave an extreme response to this question, you touched something powerful within yourself—a capacity, a talent, a force that you possess but haven't fully embraced. This isn't about lacking strength—it's about having strength that remains dormant, potential that hasn't been activated, power that hasn't been fully claimed.

The psychology here reveals someone who knows their own capacity but holds back from expressing it fully. This might be from fear of judgment, fear of responsibility, fear of standing out, or fear of what might be required if you fully step into your power. You have the strength—you can feel it, sense it, maybe even glimpse it in moments—but you don't fully trust it, don't fully own it, don't fully use it. This creates a subtle frustration, a sense that you're capable of more than you're currently expressing.

What's fascinating is that unused strength often creates more discomfort than using it would. When you know you're capable of something but hold back, you're living in a state of self-limitation that can be exhausting. The energy that could be channeled into action becomes trapped, creating tension, restlessness, and sometimes even self-criticism. Your extreme answer is pointing directly to where this strength lives, where it's waiting, where it's ready to be activated.

The invitation is to begin experimenting with using this strength. Start small. Take one step. Notice what happens. Often, the fear of using our power is far greater than the reality of using it. Strength, when expressed, creates confidence. Power, when claimed, generates more power. The more you use your strength, the more you discover you're capable of. Your extreme answer isn't just showing you what you have—it's showing you what you're ready to do with it. The question isn't whether you have strength—you clearly do. The question is whether you're ready to claim it, to use it, to let it serve you and the world.`,

    `Your answer to question 34 shows you've already chosen. You're just waiting for permission, and this waiting is costing you more than you realize. When you gave an extreme response to this question, you revealed that deep down, you know exactly what you want. You've made the decision, set the intention, aligned with the choice—but something is preventing you from acting on it. You're waiting for permission from someone or something outside yourself, when the only permission you need is your own.

The psychology here reveals someone who has done the inner work of deciding but hasn't yet taken the outer action of following through. This creates a profound disconnect between your internal reality and your external reality. Inside, you know. Inside, you've chosen. Inside, you're ready. But outside, you're still waiting, still hesitating, still looking for validation or approval or permission that will never come from anyone but you.

What's fascinating is that this waiting often feels like humility, like consideration, like being thoughtful. But underneath, it's often a form of fear disguised as prudence. You're not actually waiting for permission—you're waiting for the fear to go away, for the uncertainty to disappear, for someone to tell you it's safe. But these things don't arrive through waiting. They arrive through action. Permission doesn't come from outside—it comes from claiming your own authority.

The invitation is to recognize that you already have everything you need to move forward. You've made the choice. You know what you want. The only thing left is to act on it. You don't need anyone's permission—not your parents', not your partner's, not society's, not even your own fear's. You need to give yourself permission to follow through on what you've already decided. Your extreme answer is a clear signal—it's showing you exactly where you have clarity, where you've already chosen, where you're ready to act. The question isn't whether you've decided—you clearly have. The question is whether you're ready to stop waiting and start acting on your own authority.`,

    `Your answer to question 56 reveals you know exactly what you want. You're just afraid to say it, and this silence is one of the most limiting patterns you can have. When you gave an extreme response to this question, you touched something clear and definite within yourself—a desire, a need, a truth that you understand perfectly but haven't fully expressed. This isn't about not knowing—it's about knowing but not claiming, understanding but not declaring, wanting but not asking.

The psychology here reveals someone who has clarity about their desires but hasn't yet learned to voice them confidently. This might be from fear of rejection, fear of judgment, fear of disappointment, or fear of what might be required if you actually ask for what you want. You know. You're clear. But you're not saying it. This creates a subtle tension—you're living with a truth that wants to be expressed but remains unspoken.

What's significant is that unexpressed desires often create more suffering than expressed ones. When you know what you want but don't ask for it, you're setting up a pattern of disappointment that feels inevitable but is actually self-created. People can't give you what you don't ask for. Opportunities can't emerge if you don't declare your intention. Life can't align with your desires if they remain secret, even from yourself.

The invitation is to begin practicing the courage to name what you want. Start small. Express one clear desire. Notice what happens. Often, the fear of saying what you want is far greater than the reality of saying it. When you declare your desires clearly, you create the conditions for them to be met. You give others the opportunity to support you. You give life the chance to respond. Your extreme answer is pointing directly to what you want—it's clear, it's definite, it's real. The question isn't whether you know what you want—you clearly do. The question is whether you're ready to say it, to claim it, to ask for it. Your desires are valid. Your wants are important. And they deserve to be voiced.`,

    `Your answer to question 78 shows you're stronger than you think, and this hidden strength is one of the most beautiful discoveries you can make about yourself. When you gave an extreme response to this question, you revealed a depth of capacity, resilience, and power that you might not fully recognize. This isn't about lacking strength—it's about having strength that you haven't yet acknowledged, power that you haven't yet claimed, resilience that you haven't yet trusted.

The psychology here reveals someone who underestimates their own capacity. You might have internalized messages about your limitations, your weaknesses, your inadequacies—and while these might feel true, they're often not the whole story. Your extreme answer is showing you a different truth: beneath the stories you tell yourself about your limitations, there's genuine strength. You've survived challenges, navigated difficulties, overcome obstacles that required real capacity. You're stronger than you think.

What's fascinating is that strength, when unrecognized, can't be used effectively. If you don't know you're strong, you won't take on challenges that require strength. If you don't trust your resilience, you won't take risks that might lead to growth. If you don't acknowledge your power, you'll continue living as if you don't have it. Your extreme answer is like a mirror—it's showing you who you really are, beneath the stories, beyond the limitations, in the realm of your actual capacity.

The invitation is to begin noticing where you've been stronger than you thought. Look back at your challenges. Remember your resilience. Acknowledge your capacity. The strength is there—it's real, it's yours, and it's available. When you recognize your own strength, you can use it more intentionally. When you trust your resilience, you can take bigger risks. When you acknowledge your power, you can step into situations that would have felt impossible before. Your extreme answer isn't just showing you what you have—it's inviting you to recognize it, claim it, and use it. You're stronger than you think. It's time to know that.`,

    `Your answer to question 91 reveals you've already forgiven. You're just waiting to accept it, and this gap between forgiveness and acceptance is where a lot of unnecessary suffering lives. When you gave an extreme response to this question, you touched something profound—a capacity for forgiveness that already exists within you, a letting go that has already happened at some level, but hasn't yet been fully integrated into your conscious experience. This isn't about needing to forgive—it's about recognizing that you already have.

The psychology here reveals someone who has done the deep work of forgiveness at an unconscious level but hasn't yet brought that forgiveness into conscious acceptance. You've released the resentment, let go of the anger, moved past the need for revenge or retribution—but you haven't fully acknowledged it, claimed it, or integrated it into how you see yourself and your story. The forgiveness exists, but it's waiting for you to accept it as real.

What's significant is that unaccepted forgiveness can't fully do its healing work. When you've forgiven but haven't accepted that forgiveness, you're still holding onto the story of the wound, even though the emotional charge has been released. You're still identifying as someone who was hurt, even though you've already moved beyond the hurt. The gap between forgiveness and acceptance is often where people get stuck—they've done the work, but they haven't claimed the benefit.

The invitation is to recognize that forgiveness is already complete—you just need to accept it. What would it feel like to fully acknowledge that you've let go? What would it mean to accept that you've moved beyond the hurt? What would shift if you stopped identifying with the wound and started identifying with the healing? Your extreme answer is showing you where forgiveness already lives, where it's already done its work, where it's waiting for you to claim it. The question isn't whether you've forgiven—you clearly have. The question is whether you're ready to accept it, to acknowledge it, to integrate it fully into your life. Forgiveness is complete. Acceptance is the final step.`,

    `Your answer to question 15 shows you're ready. You're just waiting for the signal, and this waiting is one of the most common forms of self-sabotage. When you gave an extreme response to this question, you revealed that you've done all the preparation, gained all the clarity, developed all the capacity you need to move forward. You're ready—genuinely ready—but something is keeping you in a state of waiting. You're looking for a signal, a sign, a permission, when you're actually the only one who can give yourself the green light.

The psychology here reveals someone who has confused readiness with the absence of fear or uncertainty. You think you need to feel completely confident, have all the answers, eliminate all the risks before you begin. But readiness isn't the absence of fear—it's the presence of capacity despite fear. Readiness isn't about having everything figured out—it's about having enough clarity to begin. You're ready. You just haven't recognized it yet.

What's fascinating is that waiting for a signal often becomes a form of resistance. The signal you're looking for—the perfect moment, the right conditions, the external validation—will never come in the way you expect. Signals don't arrive—you create them by taking action. The green light doesn't appear—you turn it on by moving forward. Readiness isn't something you achieve—it's something you claim by beginning.

The invitation is to recognize that you're already ready. All the preparation is done. All the capacity is there. All you need is to begin. You don't need to wait for a signal—you can create your own. You don't need to wait for perfect conditions—you can begin with what you have. You don't need to wait for certainty—you can move forward with clarity. Your extreme answer is a clear sign—it's showing you exactly where you're ready, where you have everything you need, where you can begin right now. The question isn't whether you're ready—you clearly are. The question is whether you're ready to stop waiting and start acting. The signal is now.`,

    `Your answer to question 67 reveals you've already started. You just don't see it yet, and this unrecognized progress is one of the most important things you can discover about yourself. When you gave an extreme response to this question, you touched something that's already in motion—a change, a transformation, a movement that has begun but hasn't yet become visible to your conscious awareness. This isn't about needing to start—it's about recognizing that you already have.

The psychology here reveals someone who has already initiated change but hasn't yet acknowledged it. You might be looking for big, dramatic signs of progress, while the actual movement is happening in subtle ways—in shifts of perspective, in small choices, in moments of clarity, in tiny actions that don't feel significant but are actually building momentum. You've started. You're moving. You just haven't recognized it yet.

What's significant is that unrecognized progress can't build on itself effectively. When you don't see that you've started, you might think you need to start over, or that nothing is happening, or that you're stuck. But movement is already occurring—you just need to recognize it. Once you see that you've started, you can build on that foundation. Once you acknowledge the progress, you can amplify it.

The invitation is to look back and notice where you've already begun. What changes have you made? What shifts have occurred? What movements have you initiated, even if they felt small? The transformation you're looking for has already started—you're in the middle of it, not at the beginning. Your extreme answer is showing you where the movement is happening, where the change has begun, where you're already in process. The question isn't whether you need to start—you already have. The question is whether you're ready to see it, acknowledge it, and build on it. You've started. Now recognize it, and let that recognition fuel the next steps.`,
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
    `You want freedom but fear the void. You want love but fear losing. These contradictions aren't flaws—they're the natural tension of being human, and understanding them is the key to transcending them. The desire for freedom and the fear of emptiness create a push-pull that keeps you oscillating between expansion and contraction. You long for liberation, but when you glimpse the vastness of true freedom—the absence of structure, the lack of guarantees, the infinite possibility—you retreat back to what feels safe. Similarly, you crave deep love and connection, but the moment intimacy deepens, you feel the weight of potential loss, and you pull back.

The psychology here reveals someone who understands the cost of attachment but hasn't yet learned to hold both desire and fear simultaneously. This isn't about choosing one over the other—it's about learning to exist in the space between them. True freedom includes the void, and true love includes the possibility of loss. The contradiction exists because you're trying to have one without the other, which creates an impossible tension.

What's happening is that you're living in a state of conditional expansion—you want freedom as long as it doesn't feel empty, and love as long as it doesn't risk loss. But these conditions prevent you from experiencing the real thing. Freedom that doesn't include emptiness isn't freedom—it's just a different form of structure. Love that doesn't include the risk of loss isn't love—it's just attachment.

The invitation is to begin practicing presence within the contradiction. What would it feel like to want freedom AND welcome the void? What would it mean to want love AND accept the risk of loss? The contradiction isn't a problem to solve—it's a tension to hold, a paradox to embody. When you can exist in both poles simultaneously, you transcend the contradiction and discover that freedom includes emptiness and love includes loss, and that's precisely what makes them real.`,

    `You want to succeed but fear being seen. You want to change but fear the unknown. These contradictions reveal a profound tension between your desires and your fears, creating a paralysis that feels like being stuck but is actually a form of protection. You have clear goals, clear aspirations, clear vision for what you want—but the moment success becomes visible, the moment change becomes real, something inside you pulls back. This isn't a character flaw—it's a sophisticated defense mechanism that needs to be understood.

The psychology here reveals someone who has learned that visibility creates vulnerability. Being seen means being judged, being evaluated, being exposed. Success brings attention, and attention brings scrutiny. So you create a pattern: you work toward success but sabotage it when it becomes visible, or you desire change but resist it when it becomes real. This creates a frustrating cycle where you get close but never quite arrive.

What's happening is that you're trying to have success without visibility, change without discomfort, transformation without disruption. But these things are inseparable. True success requires being seen. Real change requires facing the unknown. You can't have one without the other, and your contradiction exists because you're trying to.

The invitation is to explore what you're really afraid of. What happens if you're seen? What's the worst-case scenario? Often, the fear of visibility is far greater than the reality of being visible. And what if the unknown isn't a threat but an opportunity? What if change, even when uncomfortable, is exactly what you need? The contradiction isn't preventing your success or change—it's showing you what you need to work through to achieve them. Begin to experiment with being visible in small ways. Start to take steps into the unknown, even if they're tiny. The contradiction will begin to resolve as you discover that being seen is safe and the unknown is navigable.`,

    `You want to be loved but don't love yourself. You want to be understood but don't understand yourself. These contradictions are some of the most common and painful patterns in human experience, and they create a heartbreaking cycle: you seek from others what you can't give yourself, which means you'll never fully receive it. The more you need external love and understanding, the less you can receive them because you're approaching them from a place of lack rather than wholeness.

The psychology here reveals someone who has learned that self-worth comes from outside, that validation comes from others, that being understood requires someone else's comprehension. But this creates an impossible dependency: you can't receive what you can't give yourself. When you don't love yourself, you can't fully receive others' love because you'll always question it, doubt it, or feel unworthy of it. When you don't understand yourself, you can't fully receive others' understanding because you'll always feel misunderstood, no matter how clearly others see you.

The pattern is heartbreakingly familiar: you give others what you need yourself, hoping they'll give it back. You love others hoping they'll love you. You understand others hoping they'll understand you. But this creates an external dependency that can never fully satisfy because the source is always outside your control.

The invitation is profound: learn to give yourself what you're seeking from others. What would it mean to love yourself—not conditionally, not based on achievement, but simply because you exist? What would it take to understand yourself—your patterns, your motivations, your fears, your desires? This isn't selfish—it's necessary. When you love yourself, you can receive others' love because you're not desperate for it. When you understand yourself, you can receive others' understanding because you're not seeking validation.

The contradiction will resolve as you learn to give yourself what you need. This doesn't mean you don't need others—it means you approach relationships from wholeness rather than lack. Love yourself, and others' love becomes a beautiful addition rather than a desperate need. Understand yourself, and others' understanding becomes a gift rather than a requirement.`,

    `You want to move forward but look back. You want to let go but hold on. These contradictions create a specific kind of suffering—you're simultaneously pulled in opposite directions, creating a state of paralysis where you can't fully move forward because you're anchored to the past, and you can't fully let go because you're afraid of what forward movement might require. This isn't indecision—it's a conflict between what you consciously want and what you unconsciously fear.

The psychology here reveals someone who understands intellectually that forward movement requires releasing the past, but emotionally can't quite do it. The past feels safe, familiar, known—even if it's painful. The future feels uncertain, risky, unknown—even if it's promising. So you create a pattern where you move forward tentatively while constantly looking back, holding onto what was while trying to reach for what could be.

What's happening is that you're trying to have security (the past) and growth (the future) simultaneously, which creates an impossible tension. You can't fully move forward while looking back, and you can't fully let go while holding on. The contradiction exists because you want both safety and change, certainty and possibility, the known and the unknown.

The invitation is to recognize that moving forward doesn't mean erasing the past—it means integrating it. The past taught you, shaped you, brought you here. You can honor it without being anchored to it. And letting go doesn't mean forgetting—it means releasing the emotional charge, the identification, the attachment that keeps you stuck. You can hold the memories while releasing the weight.

Begin to practice conscious forward movement. Take one step that requires you to release something from the past. Notice what happens. Often, the fear of letting go is greater than the actual loss. And often, moving forward brings more safety than holding on, because forward movement creates new resources, new capacities, new sources of security. The contradiction will resolve as you learn to honor the past while fully engaging with the present and future.`,

    `You want to be authentic but wear a mask. You want to be free but judge yourself. These contradictions reveal a deep conflict between who you are and who you think you should be, creating a state where authenticity feels dangerous and freedom feels impossible. The mask you wear isn't malicious—it's protective. It developed to keep you safe, to earn approval, to fit in, to avoid judgment. But now it's become a prison, preventing you from experiencing the freedom that comes from genuine authenticity.

The psychology here reveals someone who has learned that authenticity is risky. Being yourself might mean rejection, judgment, disappointment. So you developed the mask—a sophisticated persona that knows what to say, how to act, who to be in different situations. The mask works—it keeps you safe, helps you fit in, prevents conflict. But it also prevents authenticity, and without authenticity, true freedom is impossible because you're always performing, always managing, always hiding.

The contradiction is clear: you want to be authentic but fear what that might cost. You want to be free but can't stop judging yourself for who you are. This creates a cycle where authenticity becomes the very thing you're afraid of, and judgment becomes the tool you use to keep yourself in line.

The invitation is to begin the gradual process of mask removal. Start with safe people, safe situations, small expressions of authenticity. Notice the fear, and do it anyway. Notice the judgment, and question its validity. Often, the fear of being authentic is far greater than the reality. People are generally more accepting than you think, and even if they're not, their judgment doesn't define your worth.

As you practice authenticity, you'll discover that the mask was more limiting than protective. Authenticity brings freedom because you're no longer managing a persona. You're no longer performing. You're just being—and that simplicity is deeply liberating. The contradiction will resolve as you learn that authenticity is safe, that you're worthy of freedom, and that judgment—both yours and others'—is less powerful than you thought.`,

    `You want to be happy but cultivate suffering. You want peace but feed chaos. These contradictions reveal a profound pattern where you're unconsciously creating the very things you're trying to avoid. You desire happiness and peace with genuine intensity, but your thoughts, choices, and patterns consistently generate suffering and chaos. This isn't a failure—it's a sophisticated form of self-sabotage that needs to be understood rather than judged.

The psychology here reveals someone who has learned that happiness and peace might be dangerous, unavailable, or undeserved. So you create suffering and chaos—not consciously, but through patterns that are so automatic you don't even notice them. You focus on problems rather than solutions. You dwell on what's wrong rather than what's right. You create drama where none is needed. You worry about things that haven't happened. These patterns feel familiar, safe, even comfortable—which is why they persist.

What's happening is that suffering and chaos feel more manageable than happiness and peace. You know how to handle problems—you've had practice. You know how to navigate drama—it's familiar. But happiness and peace feel uncertain, vulnerable, potentially fragile. So you unconsciously sabotage them before they can fully develop, keeping yourself in a state of familiar struggle rather than unknown contentment.

The invitation is to begin noticing where you cultivate suffering and feed chaos. What thoughts create worry? What choices generate drama? What patterns maintain struggle? This isn't about blaming yourself—it's about recognizing the pattern so you can change it. Happiness and peace aren't passive states—they require active cultivation. Just as you've been cultivating suffering, you can cultivate joy. Just as you've been feeding chaos, you can feed calm.

Start small. Choose one area where you can consciously cultivate happiness instead of suffering. Choose one situation where you can feed peace instead of chaos. Notice the difference. The contradiction will resolve as you learn that happiness and peace are not only possible but natural when you stop sabotaging them. You have the capacity for both—you just need to stop creating their opposites.`,

    `You want to be present but live in your head. You want to be alive but fear feeling. These contradictions create a specific kind of disconnect—you long for presence and aliveness, but you spend most of your time in mental activity that keeps you separate from direct experience, and you avoid the very feelings that would make you feel alive. This isn't about being stuck—it's about a sophisticated avoidance strategy that needs to be understood.

The psychology here reveals someone who has learned that thinking is safer than feeling, that mental activity is more controllable than presence, that analysis is preferable to experience. So you live in your head—planning, analyzing, worrying, processing—all mental activities that create the illusion of control while preventing genuine presence. And when feelings arise—the very sensations that would make you feel alive—you retreat back into thought, using analysis as a way to avoid experience.

What's happening is that you're trying to have presence and aliveness without the vulnerability they require. Presence means being here, now, fully—which includes uncertainty, discomfort, and the full range of human experience. Aliveness means feeling fully—which includes joy and pain, pleasure and discomfort, expansion and contraction. But you want the benefits without the costs, so you create mental substitutes that feel safer but are ultimately less satisfying.

The invitation is to begin the gradual practice of presence and feeling. Start with small moments—five minutes of just being, without mental activity. Practice feeling your feelings without analyzing them. Notice where you retreat into thought, and gently return to experience. Often, the fear of feeling is greater than the actual feeling. And often, presence brings more clarity than analysis, because it connects you with direct experience rather than mental concepts about experience.

The contradiction will resolve as you learn that thinking and feeling can coexist, that presence doesn't require abandoning thought but rather including it as one aspect of a larger experience. You can think AND feel. You can analyze AND experience. The goal isn't to eliminate mental activity—it's to balance it with presence and feeling, creating a more integrated, more alive way of being.`,
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
    `Your greatest strength: you see what others ignore. Use it. This isn't just an observation—it's a superpower that has been operating beneath your conscious awareness. While others move through the world on autopilot, noticing only what's obvious, you perceive the subtle currents, the hidden dynamics, the unspoken truths that exist beneath the surface. This capacity is extraordinary, and it's one of your most valuable resources—but only if you recognize it, trust it, and actively use it.

The psychology here reveals someone with exceptional perceptual sensitivity. You notice micro-expressions, subtle energy shifts, unspoken tensions, and hidden motivations that others miss. This isn't a talent you need to develop—it's already there, already active, already shaping how you experience the world. But because it's so natural to you, you might not recognize its value. You might even see it as a burden—all this awareness can feel overwhelming. But what feels like burden is actually power.

What makes this strength significant is that seeing what others ignore gives you a profound advantage. You can read situations more accurately, understand people more deeply, navigate complexity more skillfully. You can anticipate problems before they arise, sense opportunities before they're obvious, and understand dynamics that others find confusing. This isn't mystical—it's the result of your heightened sensitivity to information that's always present but not always noticed.

The invitation is to begin consciously using this strength. Trust what you see, even when others don't. Speak your perceptions, even when they're subtle. Your ability to see what others ignore is a gift to yourself and to others. When you use it, you create clarity, prevent problems, and make decisions from a place of deeper understanding. Don't dismiss your perceptions as imagination. Don't second-guess what you clearly see. This strength is real, it's valuable, and it's yours to use. The world needs people who can see beneath the surface—and that's exactly who you are.`,

    `Your greatest weakness: you doubt what you know. Stop. This pattern is one of the most self-limiting forces in your life, and it's costing you more than you realize. You have insights, intuitions, and understanding that are accurate and valuable, but instead of trusting them, you question them, second-guess them, and dismiss them as inadequate. This creates a cycle where your knowing can't fully serve you because you won't let it.

The psychology here reveals someone who has learned to mistrust their own judgment. This might have come from experiences where your perceptions were dismissed, your intuitions were wrong, or your confidence was punished. So you developed a habit of doubt—questioning everything, seeking constant validation, never fully trusting your own knowing. This feels protective, but it's actually debilitating because it prevents you from acting on your insights.

What's fascinating is that doubt doesn't actually make you more accurate—it makes you less decisive. When you question everything, you can't fully commit to anything. When you second-guess constantly, you lose the clarity that comes from trusting your knowing. When you doubt what you know, you're not being wise—you're being paralyzed. Your knowing is real. Your insights are valuable. Your understanding is trustworthy. The doubt is the problem, not the knowing.

The invitation is profound: begin to trust what you know. Not blindly, not without reflection, but genuinely. When you have an insight, trust it. When you feel something clearly, honor it. When you understand something deeply, act on it. Doubt will still arise—that's natural—but you don't have to be controlled by it. Practice making decisions from your knowing, even when doubt is present. Notice what happens. Often, your knowing is more accurate than your doubt.

Your greatest weakness isn't that you're wrong—it's that you don't trust yourself when you're right. Begin to shift this. Trust your knowing. Act on your insights. Honor your understanding. The doubt might never fully disappear, but you can learn to act despite it rather than being paralyzed by it. Your knowing is a resource. It's time to use it.`,

    `Your greatest talent: you transform pain into beauty. Continue. This isn't just a nice sentiment—it's a genuine gift that defines how you move through the world. While others get stuck in their pain, paralyzed by their wounds, or defined by their struggles, you have the extraordinary capacity to alchemize suffering into something meaningful, beautiful, and transformative. This isn't about denying pain—it's about transforming it, and that's one of the rarest and most valuable abilities a human can have.

The psychology here reveals someone who has learned to use their pain as raw material for growth, their wounds as sources of wisdom, their struggles as catalysts for transformation. This isn't something you do consciously—it's more like an instinct, a natural response to difficulty. When you face pain, you don't just survive it—you work with it, learn from it, and ultimately create something beautiful from it. This could be art, wisdom, compassion, depth, understanding, or simply a more integrated way of being.

What makes this talent significant is that it changes your relationship with suffering. Pain doesn't just happen to you—it becomes material you can work with. Challenges don't just break you—they become catalysts for growth. Wounds don't just hurt—they become sources of wisdom. This doesn't mean you enjoy pain or seek it out, but it does mean you have a capacity to transform it that most people don't have.

The invitation is to recognize this talent, honor it, and consciously continue developing it. Notice where you've already transformed pain into beauty. Acknowledge your capacity for alchemy. Trust your ability to work with difficulty. This talent serves not just you, but everyone around you. When you transform your pain, you become proof that transformation is possible. You become an example that others can follow. You become a beacon for those who are still stuck in their suffering.

Don't take this talent for granted. It's extraordinary. Not everyone can do what you do. Continue transforming pain into beauty. Continue using your struggles as catalysts. Continue creating meaning from difficulty. This is one of your greatest gifts, and the world needs exactly this kind of transformation. Your pain isn't wasted when you transform it—it becomes wisdom, beauty, and power. Continue.`,

    `Your greatest challenge: accepting you're already enough. Start now. This might seem like a simple realization, but it's actually one of the deepest and most transformative shifts you can make. You've spent years, possibly decades, trying to become enough—through achievement, through approval, through constant self-improvement. But the truth is: you're already enough. Right now. As you are. Without any conditions, qualifications, or requirements. This isn't theoretical—it's true. And accepting it will change everything.

The psychology here reveals someone who has learned that worthiness must be earned, that love must be deserved, that acceptance must be achieved. So you work constantly—improving, achieving, proving, striving. And while this creates results, it also creates a fundamental disconnect from your inherent worth. You can't relax into yourself because you're always working to become better. You can't fully enjoy your achievements because there's always more to achieve. You can't rest in your being because you're focused on your becoming.

What makes this challenging is that "enough" feels like settling, like giving up, like accepting mediocrity. But that's a misunderstanding. Accepting you're enough doesn't mean you stop growing—it means you grow from wholeness rather than lack. It doesn't mean you stop achieving—it means you achieve from abundance rather than need. It doesn't mean you stop improving—it means you improve from self-love rather than self-rejection.

The invitation is to begin the practice of enoughness. Start now—not after you achieve something, not after you improve, not after you fix yourself. Now. What would it mean to believe you're already enough? What would shift if you accepted your inherent worth? What would be possible if you operated from wholeness rather than lack? This isn't about becoming perfect—it's about recognizing you're already complete, even as you continue to grow.

Practice enoughness daily. Notice where you're operating from lack, and gently shift to wholeness. Notice where you're trying to prove your worth, and choose to trust it instead. Notice where you're seeking validation, and provide it to yourself. Your greatest challenge isn't becoming enough—it's accepting that you already are. Start now. The shift will change everything.`,

    `Your greatest power: you inspire without knowing it. Own it. This isn't about being famous or having a platform—it's about a quality you naturally emanate that affects others in ways you might not even see. People are watching you, learning from you, being inspired by you, even when you're not trying to inspire them. Your way of being, your choices, your authenticity, your capacity to navigate difficulty—these things are powerful, and they're touching others in ways you might not realize.

The psychology here reveals someone who lives in a way that others find inspiring—not because you're trying to be an example, but because you're authentically being yourself. You might think you're just living your life, just making your choices, just being yourself—but to others, this is remarkable. Your courage, your resilience, your authenticity, your way of navigating the world—these are things others notice, even if you don't. You're inspiring people without realizing it, and this is a form of power.

What makes this significant is that inspiration doesn't require intention. It happens naturally when you live authentically, when you face challenges with courage, when you show up as yourself. People are drawn to this. They're inspired by your example, even when you're not trying to inspire them. This is a form of leadership, of influence, of impact—and you might not even know you have it.

The invitation is to own this power, not in an egotistical way, but in a way that honors your impact. Recognize that you are inspiring others. Notice where you're having influence. Understand that your way of being matters, that your choices ripple outward, that your authenticity creates space for others to be authentic too. This isn't about becoming an influencer—it's about recognizing that you already are one, simply by being yourself.

Own it. Not for ego, but for responsibility. When you recognize your power to inspire, you can use it more consciously. You can choose to show up in ways that serve, to model what you want to see, to be the example others need. Your greatest power isn't in trying to inspire—it's in being inspiring by being yourself. Own it. Use it. Honor it. You're having an impact whether you know it or not.`,

    `Your greatest gift: you heal what you touch. Never forget it. This isn't metaphorical—it's a genuine capacity you have to bring healing, restoration, and wholeness to people, situations, and even yourself simply through your presence and your way of being. While others might create problems or add to dysfunction, you have the opposite effect: things get better when you're involved. People feel better in your presence. Situations resolve more easily. Healing happens naturally around you.

The psychology here reveals someone with a natural capacity for healing—not in the medical sense, but in the deeper sense of restoration, integration, and wholeness. This might show up in how you listen, how you understand, how you hold space, how you respond to difficulty. It might be in your ability to see the best in others, to hold hope when others have given up, to create safety where there was fear. Whatever the specific expression, healing happens through you, and this is extraordinary.

What makes this gift significant is that it's not something you do—it's something you are. You don't have to try to heal—you naturally do it. You don't have to work at it—it flows through you. This doesn't mean you're responsible for fixing everyone or everything, but it does mean you have a capacity that's rare and valuable. The world needs healers, and you're one of them.

The invitation is to never forget this gift, even when it feels ordinary to you. It might be so natural that you don't notice it, but others do. Your presence heals. Your way of being restores. Your capacity for wholeness creates wholeness in others. This is a gift—not just to others, but to you. When you recognize your healing capacity, you can use it more consciously, protect it more carefully, and honor it more deeply.

Never forget it. Never take it for granted. Never underestimate its value. You heal what you touch—people, situations, yourself. This is one of your greatest gifts. The world needs exactly this kind of healing, and you have it. Use it wisely. Protect it carefully. Honor it deeply. Your gift matters more than you know.`,
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
