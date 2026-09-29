export type SovereignAtlasSectionId =
  | "context"
  | "problem"
  | "approach"
  | "outcomes"
  | "lessons";

export interface SovereignAtlasReadingSection {
  id: SovereignAtlasSectionId;
  number: string;
  label: string;
  subtitle: string;
  readingTime: number;
  paragraphs: string[];
  insight: string;
}

export const SOVEREIGN_ATLAS_READING = {
  title: "SOVEREIGN ATLAS",
  subtitle:
    "A navigable knowledge system that began as a search feature and evolved through curiosity, constraint, and continuous building.",
  sections: [
    {
      id: "context",
      number: "01",
      label: "THE BEGINNING",
      subtitle: "It Started with Echo",
      readingTime: 3,
      paragraphs: [
        "Atlas did not begin as a portfolio.",
        "It began as a document.",
        "For months I had been writing the Sovereign UX Codex—a growing collection of frameworks, observations, experiments, and unfinished thoughts about UX, AI, and systems thinking. Unlike a traditional design document, the Codex was not written from beginning to end. It expanded naturally as new ideas appeared.",
        "Over time, I noticed something about my own behavior.",
        "I was not returning to the finished frameworks as often as I expected. I kept returning to one section called Echo.",
        "Echo became the place where I reflected on ordinary observations, questions, and ideas that did not yet belong anywhere else. Some stayed small. Others became frameworks, design principles, or new experiments.",
        "As the Codex continued to grow, finding Echo became increasingly difficult.",
        "I was not trying to reinvent documentation. I simply wanted a faster way to return to the place where I spent most of my thinking.",
        "The obvious solution seemed straightforward:",
        "Add search.",
        "That small usability problem became the first question Atlas tried to answer.",
      ],
      insight:
        "The first problem was not organizing knowledge. It was finding the place where new ideas were still emerging.",
    },
    {
      id: "problem",
      number: "02",
      label: "THE PIVOT",
      subtitle: "When Search Stopped Being Enough",
      readingTime: 3,
      paragraphs: [
        "Search could retrieve Echo instantly but the more I thought about it, the more I realized search assumes something important:",
        "You already know what you are looking for.",
        "Reflection rarely works that way. Many of the ideas inside the Codex did not emerge because I searched for them. They emerged because I encountered something unexpected nearby.",
        "A framework reminded me of an observation. An observation led to a question. A question eventually became an entirely new project.",
        "Those connections were not visible through keywords. They lived in the relationships between ideas. That realization changed the project. The challenge was no longer finding information. It was preserving discovery.",
        "Instead of asking how to search the Codex, I began asking whether the Codex should remain a document at all. Could knowledge become spatial? Could relationships become visible? Could navigation become part of the thinking process?",
        "The moment the content became spatial, Atlas stopped being a search feature and became an experiment in how knowledge could be explored.",
      ],
      insight:
        "Search retrieves known destinations. Exploration reveals unexpected relationships.",
    },
    {
      id: "approach",
      number: "03",
      label: "EMERGENCE",
      subtitle: "One Question Led to Another",
      readingTime: 6,
      paragraphs: [
        "Looking back, Atlas was never designed through a conventional roadmap. There was no finished specification describing the final system. Every version answered the question I had at that moment, and every answer exposed a more interesting problem underneath.",
        "The earliest constellation tested whether ideas could feel like places instead of pages. Once that worked, the next question became context. How could someone understand what a node meant without leaving the space they were exploring?",
        "The drawer answered part of that question, but deeper content introduced another one: how could someone move from the whole system into one subject without losing their sense of place?",
        "That led to Focus Mode. Search later returned, not because the spatial idea had failed, but because retrieval still mattered. It became one method of navigation inside a larger exploratory system. AI assistance created another shift. Atlas could move beyond exposing information and begin responding to questions grounded in the work itself.",
        "As the interaction model became less familiar, the project needed an intentional arrival sequence. The system could no longer assume people would immediately understand how to move through it.",
        "The Observatory extended the same spatial language into the profile experience. HUD panels increased information density. Case studies evolved into investigative reading environments built around narrative and evidence.",
        "The technical process changed at the same time.",
        "After using the available Figma Make tokens in only a few days, the original tool could no longer support the pace or complexity of the work. Instead of stopping, I began learning the capabilities the next version required: React, TypeScript, component architecture, state management, GitHub, animation, and performance.",
        "Atlas did not become a design-engineering project because I planned it that way. It became one because the questions kept exceeding the tools and skills I started with.",
      ],
      insight:
        "Atlas evolved by following curiosity instead of following a specification.",
    },
    {
      id: "outcomes",
      number: "04",
      label: "TRANSFORMATION",
      subtitle: "A Portfolio Became a Knowledge System",
      readingTime: 4,
      paragraphs: [
        "Atlas transformed far beyond its original purpose. What began as a search feature became an application for exploring relationships between ideas, projects, experiments, and frameworks.",
        "The portfolio now supports several distinct ways of understanding the work. Spatial overview through constellations, focused reading through project systems, evidence-based investigation inside case studies, direct retrieval through search, conversational exploration through AI assistance and personal context through the Observatory.",
        "The project also changed how I work.",
        "I learned React, TypeScript, GitHub, component architecture, state management, animation, performance optimization, and design engineering because each new version required something the previous version could not support. Those skills were not separate from the design process. They changed the questions I was able to ask.",
        "Understanding components changed how I thought about reusable interaction patterns. Understanding state changed how I thought about continuity and context. Understanding performance changed how I thought about atmosphere, motion, and restraint. Understanding architecture changed how I thought about whether the system could continue growing without collapsing under its own complexity.",
        "Atlas also changed the purpose of the portfolio itself.",
        "Traditional portfolios present finished work in sequence. Atlas allows readers to scan, investigate, compare evidence, move backward, ask questions, and construct their own understanding.",
        "The interface does not only claim that I think in systems. It lets people experience one.",
      ],
      insight:
        "The most valuable outcome was not the portfolio itself. It was building a system capable of evolving alongside my own thinking.",
    },
    {
      id: "lessons",
      number: "05",
      label: "REFLECTION",
      subtitle: "The Project Changed Me More Than I Changed It",
      readingTime: 4,
      paragraphs: [
        "When I first began building Atlas, I thought I was adding search to a document. Looking back now, that feels almost insignificant. Every meaningful change happened because the previous version reached a limit.",
        "Sometimes the limit was conceptual. Sometimes it was technical. Sometimes it was simply the limit of my own understanding.",
        "Atlas taught me that exploration is not the opposite of structure. Structure can emerge through exploration when the work is continuously reflected on, tested, and reorganized. It also taught me that building software changes the way designers think.",
        "Technical decisions are design decisions. Component boundaries affect how ideas can grow. State architecture affects whether context survives interaction. Performance affects whether motion feels meaningful or obstructive. A design system affects whether many experiments still feel like they belong to the same world.",
        "The skills I learned were never listed in an initial project plan. Atlas demanded them one question at a time. That may be the clearest description of the entire process:",
        "Atlas kept asking more of me than I knew how to do, so I learned whatever the next version required.",
        "The project is still unfinished because the thinking is still unfinished. There is no final version—only the current state of understanding.",
      ],
      insight:
        "Atlas was not built to prove an idea. It was built by following one question until it naturally became the next.",
    },
  ] satisfies SovereignAtlasReadingSection[],
} as const;
