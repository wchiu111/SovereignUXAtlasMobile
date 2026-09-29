import type { ObservatoryContentModel } from "../observatoryTypes";

/**
 * Mobile Observatory content source.
 *
 * The language and structure are adapted directly from the current Desktop
 * Profile Experience. Mobile changes presentation and choreography, not the
 * authored meaning.
 */
export const OBSERVATORY_CONTENT: ObservatoryContentModel = {
  about: {
    eyebrow: "Product designer · Design engineer",
    headline:
      "I design systems that help people make better decisions alongside AI.",
    body:
      "My work moves between product design, interaction architecture, systems thinking, and implementation. The goal is not simply to make an interface clearer, but to make the behavior around it more understandable and trustworthy.",
    location: "San Francisco Bay Area",
    principles: [
      "Clarity over complexity",
      "Systems before screens",
      "Understand before designing",
      "Evidence over opinion",
      "AI augments judgment",
    ],
    focusAreas: [
      "AI-native interfaces",
      "Human–AI collaboration",
      "Design integrity",
      "Knowledge systems",
      "Interaction architecture",
    ],
  },

  journey: {
    eras: [
      {
        year: "2014",
        title: "Early Exploration",
        description:
          "Design foundations, education technology, and early product thinking. Curiosity led the way as I explored problems worth solving and the impact design could make.",
        imageLabel: "FOUNDATIONS / EARLY SYSTEMS",
      },
      {
        year: "2015–2019",
        title: "Oracle",
        description:
          "Interactive systems, design platforms, and scalable visual language. I helped shape enterprise experiences and built systems that improved consistency across teams.",
        imageLabel: "ENTERPRISE INTERACTION SYSTEMS",
      },
      {
        year: "2019–2023",
        title: "Globality",
        description:
          "Enterprise AI, procurement workflows, and product design at scale. The work centered on human–AI collaboration, decision support, and clarity inside complex systems.",
        imageLabel: "AI PROCUREMENT NETWORK",
      },
      {
        year: "2023–2024",
        title: "Consulting",
        description:
          "Helping organizations clarify complex product and AI problems. This period sharpened my ability to move between strategy, systems, interaction, and implementation.",
        imageLabel: "STRATEGY / SYSTEM MAPPING",
      },
      {
        year: "2024–Now",
        title: "Sovereign Design",
        description:
          "Building frameworks for human–AI collaboration and future systems. The focus is design integrity, human agency, explainability, and new interaction architectures.",
        imageLabel: "SOVEREIGN SYSTEMS",
      },
    ],
  },

  philosophy: {
    beliefs: [
      "Design is understanding before execution.",
      "Systems are more important than screens.",
      "AI should increase human agency.",
      "Interfaces should reveal intent.",
      "Every interaction should earn trust.",
      "The best UX knows when to be invisible.",
    ],
    modelSteps: [
      "Observe",
      "Understand",
      "Structure",
      "Prototype",
      "Evaluate",
      "Reflect",
    ],
    modelFooter: "Iterate with intent. Reflect with honesty.",
    influences: [
      "Systems Thinking",
      "Interaction Design",
      "Behavioral Psychology",
      "AI Alignment",
      "Architecture",
      "Industrial Design",
      "Cartography",
      "Information Design",
      "Cognitive Science",
      "Minimalism",
    ],
    explorations: [
      "Human–AI Collaboration",
      "Design Integrity",
      "AI Evaluation Systems",
      "Explainability",
      "Presence",
      "Trust Calibration",
    ],
    explorationBody:
      "Focused on building design frameworks and evaluation systems that support human judgment, strengthen collaboration, and prepare us for the future of AI.",
    closingStatement:
      "I believe great design is less about creating perfect interfaces and more about building systems that help people think, decide, and collaborate with confidence.",
  },

  contact: {
    intro:
      "Share what you’re building, questioning, or trying to make clearer.",
    replyNote: "Replies are sent personally to the email provided.",
  },
} as const;
