import { defineAtlasEntry } from "../defineAtlasEntry";

import sovereignUxCodex from "../../../imports/case-studies/sovereign-atlas/01-content/01-sovereign-ux-codex.png";
import foundEcho from "../../../imports/case-studies/sovereign-atlas/01-content/02-found-echo.png";
import searchVibeCoded from "../../../imports/case-studies/sovereign-atlas/01-content/03-search-vibe-coded.png";
import spatialConcept from "../../../imports/case-studies/sovereign-atlas/02-problem/01-spatial-concept.png";
import overviewDrawer from "../../../imports/case-studies/sovereign-atlas/02-problem/02-overview-drawer.png";
import v12 from "../../../imports/case-studies/sovereign-atlas/03-approach/v12.png";
import v12Drawer from "../../../imports/case-studies/sovereign-atlas/03-approach/v12-drawer.png";
import v42FocusMode from "../../../imports/case-studies/sovereign-atlas/03-approach/v42-focus-mode.png";
import v55Search from "../../../imports/case-studies/sovereign-atlas/03-approach/v55-search.png";
import v60AiAssist from "../../../imports/case-studies/sovereign-atlas/03-approach/v60-ai-assist.png";
import v83Intro from "../../../imports/case-studies/sovereign-atlas/03-approach/v83-intro.png";
import v101Observatory from "../../../imports/case-studies/sovereign-atlas/03-approach/v101-observatory.png";
import v129Hud from "../../../imports/case-studies/sovereign-atlas/03-approach/v129-HUD.png";
import v147SystemPreview from "../../../imports/case-studies/sovereign-atlas/03-approach/v147-system-preview.png";
import skillsLearned from "../../../imports/case-studies/sovereign-atlas/04-lessons/skills-learned.png";

const focus = {
  headline: "Sovereign Atlas",
  subheadline:
    "A navigable knowledge system that began as a search feature and evolved through curiosity, constraint, and continuous building.",
  sections: [
    {
      id: "context",
      label: "The Beginning",
      accentStellarType: "relational",
      subtitle: "It Started with Echo",
      readingTime: 3,
      content: `Atlas did not begin as a portfolio.

It began as a document.

For months I had been writing the Sovereign UX Codex—a growing collection of frameworks, observations, experiments, and unfinished thoughts about UX, AI, and systems thinking. Unlike a traditional design document, the Codex was not written from beginning to end. It expanded naturally as new ideas appeared.

Over time, I noticed something about my own behavior.

I was not returning to the finished frameworks as often as I expected. I kept returning to one section called Echo.

Echo became the place where I reflected on ordinary observations, questions, and ideas that did not yet belong anywhere else. Some stayed small. Others became frameworks, design principles, or new experiments.

As the Codex continued to grow, finding Echo became increasingly difficult.

I was not trying to reinvent documentation. I simply wanted a faster way to return to the place where I spent most of my thinking.

The obvious solution seemed straightforward:

Add search.

That small usability problem became the first question Atlas tried to answer.`,
      insight:
        "The first problem was not organizing knowledge. It was finding the place where new ideas were still emerging.",
      evidence: [
        {
          id: "sovereign-ux-codex",
          image: sovereignUxCodex,
          alt: "The original Sovereign UX Codex document",
          imageFit: "contain",
          number: "01",
          title: "The Sovereign UX Codex",
          type: "Origin",
          description:
            "The original Codex existed as one continuously growing body of frameworks, observations, experiments, and unfinished thinking.",
          caption: "Atlas began as documentation—not software.",
        },
        {
          id: "found-echo",
          image: foundEcho,
          alt: "The Echo section inside the Sovereign UX Codex",
          imageFit: "contain",
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
          image: searchVibeCoded,
          alt: "Early search concept for the Sovereign UX Codex",
          imageFit: "contain",
          number: "03",
          title: "The First Search Concept",
          type: "Initial Prototype",
          description:
            "The earliest concept explored a simple way to search the growing Codex and return directly to a known section.",
          caption:
            "The project initially focused on retrieval. Exploration was not part of the plan yet.",
        },
      ],
    },
    {
      id: "problem",
      label: "The Pivot",
      accentStellarType: "risk",
      subtitle: "When Search Stopped Being Enough",
      readingTime: 3,
      content: `Search could retrieve Echo instantly.

But the more I thought about it, the more I realized search assumes something important:

You already know what you are looking for.

Reflection rarely works that way.

Many of the ideas inside the Codex did not emerge because I searched for them. They emerged because I encountered something unexpected nearby.

A framework reminded me of an observation.

An observation led to a question.

A question eventually became an entirely new project.

Those connections were not visible through keywords. They lived in the relationships between ideas.

That realization changed the project.

The challenge was no longer finding information. It was preserving discovery.

Instead of asking how to search the Codex, I began asking whether the Codex should remain a document at all.

Could knowledge become spatial?

Could relationships become visible?

Could navigation become part of the thinking process?

The moment the content became spatial, Atlas stopped being a search feature and became an experiment in how knowledge could be explored.`,
      insight:
        "Search retrieves known destinations. Exploration reveals unexpected relationships.",
      evidence: [
        {
          id: "first-spatial-concept",
          image: spatialConcept,
          alt: "First spatial concept for Sovereign Atlas",
          imageFit: "contain",
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
          image: overviewDrawer,
          alt: "Early Sovereign Atlas overview drawer",
          imageFit: "contain",
          number: "02",
          title: "Context Through Navigation",
          type: "Interaction Exploration",
          description:
            "Once ideas became explorable objects, the interface needed a way to explain what had been discovered without removing the user from the larger system.",
          caption:
            "Discovery created curiosity. The drawer began turning that curiosity into understanding.",
        },
      ],
    },
    {
      id: "approach",
      label: "Emergence",
      accentStellarType: "strategy",
      subtitle: "One Question Led to Another",
      readingTime: 6,
      content: `Looking back, Atlas was never designed through a conventional roadmap.

There was no finished specification describing the final system.

Every version answered the question I had at that moment, and every answer exposed a more interesting problem underneath.

The earliest constellation tested whether ideas could feel like places instead of pages.

Once that worked, the next question became context. How could someone understand what a node meant without leaving the space they were exploring?

The drawer answered part of that question, but deeper content introduced another one: how could someone move from the whole system into one subject without losing their sense of place?

That led to Focus Mode.

Search later returned, not because the spatial idea had failed, but because retrieval still mattered. It became one method of navigation inside a larger exploratory system.

AI assistance created another shift. Atlas could move beyond exposing information and begin responding to questions grounded in the work itself.

As the interaction model became less familiar, the project needed an intentional arrival sequence. The system could no longer assume people would immediately understand how to move through it.

The Observatory extended the same spatial language into the profile experience. HUD panels increased information density. Case studies evolved into investigative reading environments built around narrative and evidence.

The technical process changed at the same time.

After using the available Figma Make tokens in only a few days, the original tool could no longer support the pace or complexity of the work. Instead of stopping, I began learning the capabilities the next version required: React, TypeScript, component architecture, state management, GitHub, animation, and performance.

Atlas did not become a design-engineering project because I planned it that way.

It became one because the questions kept exceeding the tools and skills I started with.`,
      insight:
        "Atlas evolved by following curiosity instead of following a specification.",
      evidence: [
        {
          id: "v12-first-spatial-system",
          image: v12,
          alt: "Sovereign Atlas version 12 spatial system",
          imageFit: "contain",
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
          image: v12Drawer,
          alt: "Sovereign Atlas version 12 contextual drawer",
          imageFit: "contain",
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
          image: v42FocusMode,
          alt: "Sovereign Atlas version 42 Focus Mode",
          imageFit: "contain",
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
          image: v55Search,
          alt: "Sovereign Atlas version 55 search experience",
          imageFit: "contain",
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
          image: v60AiAssist,
          alt: "Sovereign Atlas version 60 AI assistance",
          imageFit: "contain",
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
          image: v83Intro,
          alt: "Sovereign Atlas version 83 arrival experience",
          imageFit: "contain",
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
          image: v101Observatory,
          alt: "Sovereign Atlas version 101 Observatory profile experience",
          imageFit: "contain",
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
          image: v129Hud,
          alt: "Sovereign Atlas version 129 HUD interface",
          imageFit: "contain",
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
          image: v147SystemPreview,
          alt: "Sovereign Atlas version 147 system preview",
          imageFit: "contain",
          number: "09",
          title: "v147 — A Complete System",
          type: "Current State",
          description:
            "Atlas now connects case studies, experiments, frameworks, profile content, search, evidence, and AI-assisted exploration within one application.",
          caption:
            "What began as a way to find one section of a document became the architecture for the entire portfolio.",
        },
      ],
    },
    {
      id: "outcomes",
      label: "Transformation",
      accentStellarType: "agentic",
      subtitle: "A Portfolio Became a Knowledge System",
      readingTime: 4,
      content: `Atlas transformed far beyond its original purpose.

What began as a search feature became an application for exploring relationships between ideas, projects, experiments, and frameworks.

The portfolio now supports several distinct ways of understanding the work:

• spatial overview through constellations
• focused reading through project systems
• evidence-based investigation inside case studies
• direct retrieval through search
• conversational exploration through AI assistance
• personal context through the Observatory

The project also changed how I work.

I learned React, TypeScript, GitHub, component architecture, state management, animation, performance optimization, and design engineering because each new version required something the previous version could not support.

Those skills were not separate from the design process. They changed the questions I was able to ask.

Understanding components changed how I thought about reusable interaction patterns.

Understanding state changed how I thought about continuity and context.

Understanding performance changed how I thought about atmosphere, motion, and restraint.

Understanding architecture changed how I thought about whether the system could continue growing without collapsing under its own complexity.

Atlas also changed the purpose of the portfolio itself.

Traditional portfolios present finished work in sequence. Atlas allows readers to scan, investigate, compare evidence, move backward, ask questions, and construct their own understanding.

The interface does not only claim that I think in systems.

It lets people experience one.`,
      insight:
        "The most valuable outcome was not the portfolio itself. It was building a system capable of evolving alongside my own thinking.",
      evidence: [],
    },
    {
      id: "lessons",
      label: "Reflection",
      accentStellarType: "purpose",
      subtitle: "The Project Changed Me More Than I Changed It",
      readingTime: 4,
      content: `When I first began building Atlas, I thought I was adding search to a document.

Looking back now, that feels almost insignificant.

Every meaningful change happened because the previous version reached a limit.

Sometimes the limit was conceptual.

Sometimes it was technical.

Sometimes it was simply the limit of my own understanding.

Atlas taught me that exploration is not the opposite of structure. Structure can emerge through exploration when the work is continuously reflected on, tested, and reorganized.

It also taught me that building software changes the way designers think.

Technical decisions are design decisions.

Component boundaries affect how ideas can grow.

State architecture affects whether context survives interaction.

Performance affects whether motion feels meaningful or obstructive.

A design system affects whether many experiments still feel like they belong to the same world.

The skills I learned were never listed in an initial project plan. Atlas demanded them one question at a time.

That may be the clearest description of the entire process:

Atlas kept asking more of me than I knew how to do, so I learned whatever the next version required.

The project is still unfinished because the thinking is still unfinished.

There is no final version—only the current state of understanding.`,
      insight:
        "Atlas was not built to prove an idea. It was built by following one question until it naturally became the next.",
      evidence: [
        {
          id: "skills-unlocked-along-the-way",
          image: skillsLearned,
          alt: "Learning curve showing skills acquired while building Sovereign Atlas",
          imageFit: "contain",
          number: "01",
          title: "Skills Unlocked Along the Way",
          type: "Learning Curve",
          description:
            "A map of the technical and systems capabilities Atlas required as the project expanded beyond the limits of its original prototype.",
          caption: "These skills were not on the roadmap. Atlas required them.",
        },
      ],
    },
  ],
};

export default defineAtlasEntry({
  id: "sovereign-atlas-cs",
  category: "case-study",
  signatureStellarType: "purpose",
  title: "SOVEREIGN ATLAS",
  subtitle:
    "A navigable knowledge system that began as a search feature and evolved through curiosity, constraint, and continuous building.",
  tags: ["SYSTEMS THINKING", "DESIGN RESEARCH"],
  overview: {
    what:
      "The Atlas itself—a spatial, evidence-driven portfolio connecting UX, AI literacy, systems thinking, and design engineering.",
    why:
      "It began as a faster way to find Echo inside the Sovereign UX Codex, then evolved into a larger question about how people discover and connect knowledge.",
    researchFocus:
      "Can exploration produce a different kind of understanding than search? What happens when navigation becomes part of the learning experience?",
    keyDiscovery:
      "Atlas was not built from a roadmap. It emerged through a chain of questions in which every solution revealed a more interesting problem underneath.",
  },
  orbit: {
    angle: -130,
    radius: 115,
    speed: 1.10e-4,
    starPrefix: "sa",
  },
  overviewStars: [
    {
      id: "context",
      label: "THE BEGINNING",
      angle: -166,
      x: -1,
      y: -0.25,
      scale: 0.98,
      stellarType: "relational",
      intensity: "balanced",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "problem",
      label: "THE PIVOT",
      angle: -110,
      x: -0.35,
      y: -0.98,
      scale: 1.08,
      stellarType: "risk",
      intensity: "bright",
      labelPosition: { side: "top", offset: 30 },
    },
    {
      id: "approach",
      label: "EMERGENCE",
      angle: -39,
      x: 0.72,
      y: -0.58,
      scale: 1.16,
      stellarType: "strategy",
      intensity: "bright",
      labelPosition: { side: "right", offset: 31 },
    },
    {
      id: "outcomes",
      label: "TRANSFORMATION",
      angle: 34,
      x: 0.72,
      y: 0.48,
      scale: 1.08,
      stellarType: "agentic",
      intensity: "bright",
      labelPosition: { side: "right", offset: 31 },
    },
    {
      id: "lessons",
      label: "REFLECTION",
      angle: 126,
      x: -0.65,
      y: 0.86,
      scale: 1,
      stellarType: "purpose",
      intensity: "bright",
      labelPosition: { side: "left", offset: 30 },
    },
  ],
  constellation: {
    showCenterConnections: false,
    connections: [
      { from: "context", to: "problem", strength: "primary" },
      { from: "problem", to: "approach", strength: "primary" },
      { from: "approach", to: "outcomes", strength: "primary" },
      { from: "outcomes", to: "lessons", strength: "primary" },
      { from: "lessons", to: "context", strength: "secondary" },
    ],
  },
  caseStudyId: "sovereign-atlas-cs",
  focus,
  sections: focus.sections,
});
