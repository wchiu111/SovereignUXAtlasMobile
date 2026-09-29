import sovereignUxCodex from "../../../../imports/case-studies/sovereign-atlas/01-content/01-sovereign-ux-codex.png";
import foundEcho from "../../../../imports/case-studies/sovereign-atlas/01-content/02-found-echo.png";
import searchVibeCoded from "../../../../imports/case-studies/sovereign-atlas/01-content/03-search-vibe-coded.png";
import spatialConcept from "../../../../imports/case-studies/sovereign-atlas/02-problem/01-spatial-concept.png";
import overviewDrawer from "../../../../imports/case-studies/sovereign-atlas/02-problem/02-overview-drawer.png";
import v12 from "../../../../imports/case-studies/sovereign-atlas/03-approach/v12.png";
import v12Drawer from "../../../../imports/case-studies/sovereign-atlas/03-approach/v12-drawer.png";
import v42FocusMode from "../../../../imports/case-studies/sovereign-atlas/03-approach/v42-focus-mode.png";
import v55Search from "../../../../imports/case-studies/sovereign-atlas/03-approach/v55-search.png";
import v60AiAssist from "../../../../imports/case-studies/sovereign-atlas/03-approach/v60-ai-assist.png";
import v83Intro from "../../../../imports/case-studies/sovereign-atlas/03-approach/v83-intro.png";
import v101Observatory from "../../../../imports/case-studies/sovereign-atlas/03-approach/v101-observatory.png";
import v129Hud from "../../../../imports/case-studies/sovereign-atlas/03-approach/v129-HUD.png";
import v147SystemPreview from "../../../../imports/case-studies/sovereign-atlas/03-approach/v147-system-preview.png";
import skillsLearned from "../../../../imports/case-studies/sovereign-atlas/04-lessons/skills-learned.png";

import type { SovereignAtlasSectionId } from "./sovereignAtlasReadingScaffold";

export interface MobileEvidenceItem {
  id: string;
  sectionId: SovereignAtlasSectionId;
  insertAfterParagraph: number;
  image: string;
  imageFit: "contain" | "cover";
  alt: string;
  number: string;
  title: string;
  type: string;
  description: string;
  caption: string;
}

export const SOVEREIGN_ATLAS_EVIDENCE: readonly MobileEvidenceItem[] = [
  {
    id: "sovereign-ux-codex",
    sectionId: "context",
    insertAfterParagraph: 5,
    image: sovereignUxCodex,
    imageFit: "contain",
    alt: "The original Sovereign UX Codex document",
    number: "01",
    title: "The Sovereign UX Codex",
    type: "Origin",
    description:
      "The original Codex existed as one continuously growing body of frameworks, observations, experiments, and unfinished thinking.",
    caption: "Atlas began as documentation—not software.",
  },
  {
    id: "found-echo",
    sectionId: "context",
    insertAfterParagraph: 5,
    image: foundEcho,
    imageFit: "contain",
    alt: "The Echo section inside the Sovereign UX Codex",
    number: "02",
    title: "Finding Echo",
    type: "Reflection",
    description:
      "Echo became the section I returned to most often because it held the thoughts that were still forming rather than the ideas that were already complete.",
    caption:
      "The goal was not to revisit finished work. It was to reconnect with ideas that were still evolving.",
  },
  {
    id: "first-search-concept",
    sectionId: "context",
    insertAfterParagraph: 9,
    image: searchVibeCoded,
    imageFit: "contain",
    alt: "Early search concept for the Sovereign UX Codex",
    number: "03",
    title: "The First Search Concept",
    type: "Initial Prototype",
    description:
      "The earliest concept explored a simple way to search the growing Codex and return directly to a known section.",
    caption:
      "The project initially focused on retrieval. Exploration was not part of the plan yet.",
  },
  {
    id: "first-spatial-concept",
    sectionId: "problem",
    insertAfterParagraph: 5,
    image: spatialConcept,
    imageFit: "contain",
    alt: "First spatial concept for Sovereign Atlas",
    number: "01",
    title: "The First Spatial Concept",
    type: "Conceptual Pivot",
    description:
      "The first spatial prototype replaced a linear document structure with a navigable field of related ideas.",
    caption:
      "The moment knowledge became spatial, the project stopped being only about search.",
  },
  {
    id: "overview-drawer",
    sectionId: "problem",
    insertAfterParagraph: 6,
    image: overviewDrawer,
    imageFit: "contain",
    alt: "Early Sovereign Atlas overview drawer",
    number: "02",
    title: "Context Through Navigation",
    type: "Interaction Exploration",
    description:
      "Once ideas became explorable objects, the interface needed a way to explain what had been discovered without removing the user from the larger system.",
    caption:
      "Discovery created curiosity. The drawer began turning that curiosity into understanding.",
  },
  {
    id: "v12-first-spatial-system",
    sectionId: "approach",
    insertAfterParagraph: 1,
    image: v12,
    imageFit: "contain",
    alt: "Sovereign Atlas version 12 spatial system",
    number: "01",
    title: "v12 — First Spatial System",
    type: "Evolution",
    description:
      "The early constellation established the central idea that knowledge could be represented as a navigable environment.",
    caption:
      "The first question was simple: could ideas feel like places instead of pages?",
  },
  {
    id: "v12-context-drawer",
    sectionId: "approach",
    insertAfterParagraph: 2,
    image: v12Drawer,
    imageFit: "contain",
    alt: "Sovereign Atlas version 12 contextual drawer",
    number: "02",
    title: "v12 — Adding Explanation",
    type: "Evolution",
    description:
      "A contextual drawer introduced narrative information alongside the spatial system without replacing it with a conventional page.",
    caption:
      "Once discovery worked, the next question was how to explain what had been found.",
  },
  {
    id: "v42-focus-mode",
    sectionId: "approach",
    insertAfterParagraph: 3,
    image: v42FocusMode,
    imageFit: "contain",
    alt: "Sovereign Atlas version 42 Focus Mode",
    number: "03",
    title: "v42 — Focus Mode",
    type: "Interaction Model",
    description:
      "Focus Mode created a deeper reading state while preserving a visible relationship to the larger constellation.",
    caption:
      "The system needed depth without making the user feel as though they had left the map.",
  },
  {
    id: "v55-search",
    sectionId: "approach",
    insertAfterParagraph: 3,
    image: v55Search,
    imageFit: "contain",
    alt: "Sovereign Atlas version 55 search experience",
    number: "04",
    title: "v55 — Search Returns",
    type: "Navigation System",
    description:
      "Search returned as a complementary capability for moments when users already knew what they wanted to locate.",
    caption:
      "The original idea was not discarded. It found its place inside a broader system of exploration.",
  },
  {
    id: "v60-ai-assist",
    sectionId: "approach",
    insertAfterParagraph: 3,
    image: v60AiAssist,
    imageFit: "contain",
    alt: "Sovereign Atlas version 60 AI assistance",
    number: "05",
    title: "v60 — AI Assistance",
    type: "Conversational Layer",
    description:
      "The knowledge system became conversational, allowing readers to ask questions grounded in its documented projects and frameworks.",
    caption:
      "Atlas began shifting from a place that exposed knowledge into a system people could actively question.",
  },
  {
    id: "v83-arrival",
    sectionId: "approach",
    insertAfterParagraph: 4,
    image: v83Intro,
    imageFit: "contain",
    alt: "Sovereign Atlas version 83 arrival experience",
    number: "06",
    title: "v83 — Arrival",
    type: "Onboarding",
    description:
      "An intentional entry sequence introduced the atmosphere and interaction model before asking people to navigate the full system.",
    caption:
      "An unfamiliar interface needed to teach people how to enter before asking them to explore.",
  },
  {
    id: "v101-observatory",
    sectionId: "approach",
    insertAfterParagraph: 5,
    image: v101Observatory,
    imageFit: "contain",
    alt: "Sovereign Atlas version 101 Observatory profile experience",
    number: "07",
    title: "v101 — The Observatory",
    type: "Experience Expansion",
    description:
      "The profile evolved from a conventional biography into an explorable environment using the same spatial language as the rest of Atlas.",
    caption:
      "The portfolio stopped feeling like several pages and began feeling like one coherent place.",
  },
  {
    id: "v129-hud-system",
    sectionId: "approach",
    insertAfterParagraph: 5,
    image: v129Hud,
    imageFit: "contain",
    alt: "Sovereign Atlas version 129 HUD interface",
    number: "08",
    title: "v129 — HUD System",
    type: "Information Density",
    description:
      "HUD panels introduced more structured content, timelines, and visual evidence without abandoning the environmental interface language.",
    caption:
      "The next challenge was increasing density without losing clarity, atmosphere, or spatial continuity.",
  },
  {
    id: "v147-system-preview",
    sectionId: "approach",
    insertAfterParagraph: 8,
    image: v147SystemPreview,
    imageFit: "contain",
    alt: "Sovereign Atlas version 147 system preview",
    number: "09",
    title: "v147 — A Complete System",
    type: "Current State",
    description:
      "Atlas now connects case studies, experiments, frameworks, profile content, search, evidence, and AI-assisted exploration within one application.",
    caption:
      "What began as a way to find one section of a document became the architecture for the entire portfolio.",
  },
  {
    id: "skills-unlocked-along-the-way",
    sectionId: "lessons",
    insertAfterParagraph: 5,
    image: skillsLearned,
    imageFit: "contain",
    alt: "Learning curve showing skills acquired while building Sovereign Atlas",
    number: "01",
    title: "Skills Unlocked Along the Way",
    type: "Learning Curve",
    description:
      "A map of the technical and systems capabilities Atlas required as the project expanded beyond the limits of its original prototype.",
    caption: "These skills were not on the roadmap. Atlas required them.",
  },
] as const;

export function evidenceForSection(sectionId: SovereignAtlasSectionId) {
  return SOVEREIGN_ATLAS_EVIDENCE.filter(
    (item) => item.sectionId === sectionId,
  );
}
