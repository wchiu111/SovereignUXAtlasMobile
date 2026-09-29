import type { CaseStudy } from "../types/caseStudy";

export const AGENTIC_INSURANCE: CaseStudy = {
  id: "agentic-insurance",
  title: "Agentic Insurance",
  subtitle: "Replacing underwriting complexity with AI-native trust architecture",
  client: "Insurance Platform",
  year: 2024,
  role: "Product Designer",
  sections: [
    {
      id: "context",
      slug: "context",
      number: "01",
      title: "Context",
      subtitle: "Entering a market where speed reads as suspicion",
      readingTime: 4,
      body: [
        "The insurance industry has resisted transformation for more than two centuries. Its slow, paper-heavy process — built around human underwriters managing adversarial information asymmetry — was never designed for speed. Users learned to equate waiting with care.",
        "When we entered this space with an agentic AI system capable of generating accurate quotes in under four minutes, we immediately encountered a structural problem: speed itself had become a liability signal. A rapid quote felt cheap. An eleven-day wait felt thorough.",
        "The challenge was not to make our AI faster or more accurate. It was to make its thoroughness visible — to design a system that demonstrated care through the quality of its attention, not the length of its process.",
      ],
      keyInsight: "Trust is not a feature that can be shipped. It is a structural condition that must be designed into every layer of the interaction — from the first screen to the final quote.",
      evidence: [
        { id: "market-trust-landscape", number: "01", title: "Market Trust Landscape", type: "Research Finding", description: "Mapping user mental models across seven insurance touchpoints revealed systematic distrust of automated recommendations.", caption: "User trust disposition scores plotted against perceived automation level across the insurance journey." },
        { id: "speed-trust-inversion", number: "02", title: "Speed–Trust Inversion", type: "Diagram", description: "The inverse relationship between perceived response time and user trust scores in high-stakes decision domains.", caption: "Trust score degradation as quote generation time decreases below 30 minutes in user testing sessions." },
      ],
    },
    {
      id: "problem",
      slug: "problem",
      number: "02",
      title: "The Problem",
      subtitle: "Speed without trust produces abandonment, not adoption",
      readingTime: 4,
      body: [
        "Our initial user research surfaced a counterintuitive finding. When presented with an AI-generated quote in under four minutes versus a human-reviewed quote delivered in two weeks, users rated the human quote as more trustworthy — not because they had verified its accuracy, but because the investment of time felt like evidence of care.",
        "This is the Speed–Trust Inversion: the faster a high-stakes system responds, the less legitimate its output feels. Users were using processing time as a proxy for thoroughness. Our speed advantage had become a trust deficit.",
        "We needed to solve a perception problem, not a capability problem. Our AI was more accurate than the human baseline. But accuracy was invisible. The emotional signal that users were using to evaluate quality — time — was the one variable our system had optimized away.",
      ],
      keyInsight: "Users weren't evaluating our output. They were evaluating whether the system had taken them seriously. Accuracy without felt attention produces skepticism.",
      evidence: [
        { id: "abandonment-pattern-analysis", number: "01", title: "Abandonment Pattern Analysis", type: "Data Visualization", description: "Completion rates dropped 41% when quote generation fell below three minutes, regardless of quote accuracy scores.", caption: "Funnel drop-off rates correlated against generation time across 2,400 user sessions in A/B testing." },
        { id: "driver-adjuster-trust-needs", number: "02", title: "Driver–Adjuster Trust Needs", type: "Research Finding", description: "Interview transcripts revealing the three core conditions users required before accepting an automated recommendation.", caption: "Synthesized from 28 contextual interviews across five insurance markets." },
      ],
    },
    {
      id: "approach",
      slug: "approach",
      number: "03",
      title: "Approach",
      subtitle: "Designing for felt recognition before technical accuracy",
      readingTime: 5,
      body: [
        "Our solution was counterintuitive: we did not hide the AI's speed. Instead, we made its investigation process visible. Rather than showing a loading screen, we showed the AI working — naming each data source it was consulting, each edge case it was considering, each factor that shaped the final number.",
        "We called this Felt Recognition — the design principle that users trust systems that demonstrate they have actually paid attention to their specific situation. We stopped trying to explain the AI. We started showing that it was listening.",
        "Every section of the quote output was redesigned as a demonstration of comprehension. Unusual details the user had mentioned appeared in the AI's reasoning. Confidence ranges replaced point estimates. The investigation process became the product, not an internal system detail.",
      ],
      keyInsight: "The highest-ROI change was showing users what the AI was doing, not what the AI was capable of. Trust comes from demonstrated attention, not declared competence.",
      evidence: [
        { id: "early-interface-concept", number: "01", title: "Early Interface Concept", type: "Design Exploration", description: "The first interface explorations that surfaced the agent investigation process rather than concealing it behind a loading state.", caption: "Prototype screens from the first week of concepting, before user testing informed the final approach." },
        { id: "felt-recognition-framework", number: "02", title: "Felt Recognition Framework", type: "Diagram", description: "A framework mapping the three conditions required for users to experience felt recognition in AI-mediated decisions.", caption: "Framework developed from synthesis of 28 interviews and refined through two rounds of co-design sessions." },
        { id: "agent-investigation-display", number: "03", title: "Agent Investigation Display", type: "UI Component", description: "The UI component that made the agentic investigation process visible in real time during quote generation.", caption: "Final production component showing live agent status, data sources consulted, and confidence indicators." },
      ],
    },
    {
      id: "key-decisions",
      slug: "key-decisions",
      number: "04",
      title: "Key Decisions",
      subtitle: "Three structural choices that changed the trust architecture",
      readingTime: 6,
      body: [
        "Three decisions shaped the final design, each one counterintuitive from a conversion-optimization standpoint. Collectively, they transformed the experience from a form-filling process into a visible demonstration of competence.",
        "First: Uncertainty as Signal. We displayed AI confidence ranges rather than single-point estimates. This felt risky — admitting uncertainty seemed like exposing weakness. But users interpreted explicit confidence ranges as sophistication, not failure. Systems that claim perfect certainty feel fraudulent in high-stakes contexts.",
        "Second: Agent Transparency. We made the data-gathering agents visible, naming what each agent was investigating and why. Users who could see the investigation process accepted the final quote at 2.4× the rate of the control group. Third: Human Review Optionality. We kept a human review option — not because users typically needed it, but because its presence changed how the AI option felt. The choice made the AI trustworthy rather than coercive.",
      ],
      keyInsight: "The most powerful trust-building feature was one users almost never used: the option to escalate to a human reviewer. Its presence changed the meaning of choosing the AI.",
      evidence: [
        { id: "decision-why-how", number: "01", title: "Decision → Why → How", type: "Interaction Pattern", description: "The recommendation interface became a doorway into reasoning rather than a final answer, with each decision surfacing its evidence.", caption: "Interaction flow documentation showing how users navigate from recommendation to supporting rationale." },
        { id: "confidence-range-display", number: "02", title: "Confidence Range Display", type: "UI Component", description: "The UI pattern that replaced point estimates with calibrated uncertainty ranges, increasing perceived accuracy despite showing less precision.", caption: "Component spec showing confidence bands, range labels, and the underlying probability model." },
        { id: "human-escalation-flow", number: "03", title: "Human Escalation Flow", type: "Interaction Pattern", description: "The escalation pathway that preserved user autonomy while making the AI option feel trustworthy rather than terminal.", caption: "User flow showing the escalation trigger, handoff state, and continuity of quote context across the transition." },
      ],
    },
    {
      id: "outcomes",
      slug: "outcomes",
      number: "05",
      title: "Outcomes",
      subtitle: "Faster, more trusted, more complete",
      readingTime: 4,
      body: [
        "Quote generation time fell from an industry average of eleven days to under four minutes. This was expected — it was the premise of the system. What was not expected was that user trust scores would exceed those of the traditional process.",
        "Across matched user groups, the agentic system produced trust scores 23 percentage points higher than the control group using the traditional underwriting process. Policy completion rates were 31% higher. Users who completed policies through the AI system also reported higher understanding of their coverage — a proxy for decision quality.",
        "The feature with the highest measured impact on trust was not the AI's accuracy, not the speed, and not the confidence displays. It was the agent investigation panel — the component that showed users what the AI was examining during quote generation. It cost approximately two days of engineering effort and moved trust scores by 18 points.",
      ],
      keyInsight: "The interface change with the highest ROI was making the AI's investigation process visible. Users who could see the AI's attention trusted its conclusions.",
      evidence: [
        { id: "trust-score-lift-analysis", number: "01", title: "Trust Score Lift Analysis", type: "Data Visualization", description: "Pre/post trust score comparison across five user segments, showing consistent lift across age, claim history, and vehicle type.", caption: "Trust scores measured using validated 7-item scale administered at quote completion and 30 days post-purchase." },
        { id: "completion-rate-funnel", number: "02", title: "Completion Rate Funnel", type: "Data Visualization", description: "The completion funnel comparison between traditional process and agentic system, showing 31% improvement across all stages.", caption: "Funnel analysis across 6,200 sessions in pilot deployment, matched against 8-week historical baseline." },
        { id: "coverage-understanding-index", number: "03", title: "Coverage Understanding Index", type: "Research Finding", description: "Users who completed policies through the AI system demonstrated significantly higher understanding of their coverage terms.", caption: "Post-purchase comprehension testing administered at 7 and 30 days, showing durable understanding gains." },
      ],
    },
    {
      id: "lessons",
      slug: "lessons",
      number: "06",
      title: "Lessons",
      subtitle: "What this project changed about how we design AI systems",
      readingTime: 4,
      body: [
        "The deepest lesson from this project: in high-stakes domains, users are not primarily evaluating AI accuracy. They are evaluating whether the AI treated them as an intelligent adult who deserves to understand what is happening to them. Accuracy is necessary but not sufficient.",
        "The design failure mode to avoid is treating trust as a calibration problem. It is not. Trust in AI is a relationship problem — it depends on the quality of attention a system demonstrates, its willingness to show uncertainty, and whether it preserves the user's sense of agency throughout the decision.",
        "The pattern that transfers most broadly: in any domain where users have been treated adversarially by incumbent systems, an AI that demonstrates genuine attention to their specific situation will outperform any AI optimized purely for accuracy or speed. The competition is not other AI systems. The competition is the accumulated skepticism produced by decades of systems that did not actually care.",
      ],
      keyInsight: "Trust in AI is not a technical problem. It is a design problem about the quality of attention an AI appears to give. The interface is not decoration — it is the relationship.",
      evidence: [
        { id: "ai-trust-design-principles", number: "01", title: "AI Trust Design Principles", type: "Documentation", description: "Seven principles extracted from this engagement that now inform AI product design decisions across the portfolio.", caption: "Living document updated after each AI product engagement, currently at revision 4." },
      ],
    },
  ],
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "agentic-insurance": AGENTIC_INSURANCE,
  "agentic-insurance-cs": AGENTIC_INSURANCE,
  "sovereign-atlas-cs": { ...AGENTIC_INSURANCE, id: "sovereign-atlas-cs" },
  "globality": { ...AGENTIC_INSURANCE, title: "Globality", subtitle: "AI-powered B2B procurement matching", id: "globality" },
  "oracle": { ...AGENTIC_INSURANCE, title: "Oracle", subtitle: "Enterprise data platform for non-technical users", id: "oracle" },
};

// ─── Evidence Thumbnail SVG ────────────────────────────────────────────────
