import { T } from "../components/mobileShared";

/**
 * Authored Case Studies content model for the mobile Atlas.
 *
 * Refactor Pass 1 only moves static data out of LandingScene.
 * Values and ordering are intentionally unchanged.
 */
export const CASE_STUDY_PROJECTS = [
  {
    id: "agentic-insurance",
    label: "AGENTIC INSURANCE",
    color: "#D4916A",
    overview: {
      what: "A self-directed exploration of how AI-assisted tools might support claim adjusters and customers during complex insurance decisions.",
      why: "The project started from a fully agentic assumption, but deeper domain research exposed how legal constraints, professional expertise, and accountability changed where AI should stop and human judgment should begin.",
      researchFocus: "I studied claim-adjuster workflows, evidence review, jurisdictional constraints, and the boundary between AI synthesis and consequential human decision-making.",
      keyDiscovery: "AI could gather, compare, explain, and recommend without owning the final decision. In high-stakes workflows, capability does not automatically grant authority.",
    },
  },
  {
    id: "globality",
    label: "GLOBALITY",
    color: "#F4EBD0",
    overview: {
      what: "A navigation and workflow redesign spanning Globality’s home experience, project portfolio, and in-project workspace.",
      why: "The platform contained powerful procurement and AI capabilities, but users repeatedly had to reconstruct where they were, what had changed, and what action mattered next.",
      researchFocus: "How navigation, dashboards, and contextual AI could respond to the user’s current work state while preserving clarity across a complex procurement journey.",
      keyDiscovery: "Users do not experience enterprise products as a collection of pages. They experience changing states of work—and the interface must preserve orientation between them.",
    },
  },
  {
    id: "oracle",
    label: "ORACLE",
    color: "#A68BD4",
    overview: {
      what: "A Higher Education microsite that organized Oracle’s cloud products into a clearer narrative and interactive product experience.",
      why: "Visitors needed to understand how a broad and uneven product portfolio connected to their institution’s goals without absorbing every technical detail at once.",
      researchFocus: "Information hierarchy, content variability, progressive disclosure, responsive behavior, and visual storytelling across an enterprise product ecosystem.",
      keyDiscovery: "People did not need every product detail at once. A shared hierarchy and progressive disclosure could reveal complexity as it became relevant without forcing unlike products into the same content model.",
    },
  },
  {
    id: "sovereign-atlas",
    label: "SOVEREIGN ATLAS",
    color: "#E8C86D",
    overview: {
      what: "The Atlas itself—a spatial, evidence-driven portfolio connecting UX, AI literacy, systems thinking, and design engineering.",
      why: "It began as a faster way to find Echo inside the Sovereign UX Codex, then evolved into a larger question about how people discover and connect knowledge.",
      researchFocus: "Can exploration produce a different kind of understanding than search? What happens when navigation becomes part of the learning experience?",
      keyDiscovery: "Atlas was not built from a roadmap. It emerged through a chain of questions in which every solution revealed a more interesting problem underneath.",
    },
  },
] as const;

export const CASE_STUDY_COLORS = CASE_STUDY_PROJECTS.map(
  (project) => project.color,
);

export const CASE_STUDIES_OVERVIEW = {
  what: "A portfolio of four product design engagements. Real constraints, real stakeholders, and decisions made under genuine uncertainty and time pressure.",
  why: "Design is consequential. Choices made in ambiguous situations shape outcomes more than technical execution. Process over artifacts.",
  researchFocus: "How design authority is established and maintained across situations where requirements are incomplete, stakeholders disagree, and constraints shift.",
  keyDiscovery: "Sustainable design authority emerges from clarity about process — not confidence in output. The decisions are the artifact.",
} as const;

export const CASE_STUDY_FOCUS_ITEMS = [
  {
    id: "case-studies",
    label: "CASE STUDIES",
    color: T.caseStudies,
    meta: "4 PROJECTS",
    overview: CASE_STUDIES_OVERVIEW,
  },
  ...CASE_STUDY_PROJECTS.map((project, index) => ({
    ...project,
    meta: `PROJECT ${index + 1} OF 4`,
  })),
] as const;
