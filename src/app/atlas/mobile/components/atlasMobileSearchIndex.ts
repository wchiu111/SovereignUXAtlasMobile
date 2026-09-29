import { T } from "./mobileShared";
import type { MobileCaseStudyProjectId } from "../reading/mobileReadingTypes";
import type { MobileFrameworkId } from "../frameworks/mobileFrameworkTypes";
import type { MobileExperimentId } from "../experiments/experimentsTypes";
import type { ObservatoryPanelId } from "../observatory/observatoryTypes";

export type AtlasMobileSearchDestination =
  | {
      kind: "case-studies";
      id: "case-studies" | MobileCaseStudyProjectId;
    }
  | {
      kind: "frameworks";
      id: "frameworks" | MobileFrameworkId;
    }
  | {
      kind: "experiments";
      id: "experiments" | MobileExperimentId;
    }
  | {
      kind: "observatory";
      id: "observatory" | ObservatoryPanelId;
    };

export type AtlasMobileSearchResultKind =
  | "system"
  | "case-study"
  | "framework"
  | "experiment"
  | "observatory";

export interface AtlasMobileSearchResult {
  id: string;
  title: string;
  type: string;
  parent: string;
  kind: AtlasMobileSearchResultKind;
  description: string;
  keywords: readonly string[];
  color: string;
  destination: AtlasMobileSearchDestination;
}

export interface AtlasMobileGuidedPrompt {
  label: string;
  query: string;
}

export const ATLAS_MOBILE_GUIDED_PROMPTS: readonly AtlasMobileGuidedPrompt[] = [
  {
    label: "Show me the strongest case studies",
    query: "strongest case studies",
  },
  {
    label: "Explore Authority Drift",
    query: "Authority Drift",
  },
  {
    label: "Explore AI Design Frameworks",
    query: "AI Design Frameworks",
  },
  {
    label: "Tell me about Wilson",
    query: "About Wilson",
  },
];

export const ATLAS_MOBILE_SEARCH_RESULTS: readonly AtlasMobileSearchResult[] = [
  {
    id: "case-studies",
    title: "Case Studies",
    type: "SYSTEM",
    parent: "SOVEREIGN ATLAS",
    kind: "system",
    description: "Real product work, design decisions, and outcomes.",
    keywords: ["case studies", "projects", "portfolio", "strongest", "work"],
    color: T.caseStudies,
    destination: { kind: "case-studies", id: "case-studies" },
  },
  {
    id: "agentic-insurance",
    title: "Agentic Insurance",
    type: "CASE STUDY",
    parent: "CASE STUDIES",
    kind: "case-study",
    description: "AI-assisted claims exploration with preserved human authority.",
    keywords: ["insurance", "claims", "adjuster", "agentic", "human authority"],
    color: T.caseStudies,
    destination: { kind: "case-studies", id: "agentic-insurance" },
  },
  {
    id: "globality",
    title: "Globality",
    type: "CASE STUDY",
    parent: "CASE STUDIES",
    kind: "case-study",
    description: "Enterprise procurement redesigned around orientation and decisions.",
    keywords: ["globality", "procurement", "enterprise", "workflow", "nlp"],
    color: T.caseStudies,
    destination: { kind: "case-studies", id: "globality" },
  },
  {
    id: "oracle",
    title: "Oracle",
    type: "CASE STUDY",
    parent: "CASE STUDIES",
    kind: "case-study",
    description: "A complex higher-education product story made easier to understand.",
    keywords: ["oracle", "higher education", "education", "information architecture"],
    color: T.caseStudies,
    destination: { kind: "case-studies", id: "oracle" },
  },
  {
    id: "sovereign-atlas",
    title: "Sovereign Atlas",
    type: "CASE STUDY",
    parent: "CASE STUDIES",
    kind: "case-study",
    description: "How a search concept evolved into a navigable knowledge system.",
    keywords: ["sovereign atlas", "atlas", "portfolio", "search", "knowledge system"],
    color: T.caseStudies,
    destination: { kind: "case-studies", id: "sovereign-atlas" },
  },

  {
    id: "frameworks",
    title: "Frameworks",
    type: "SYSTEM",
    parent: "SOVEREIGN ATLAS",
    kind: "system",
    description: "Methods for AI behavior, trust, authority, and resilient systems.",
    keywords: ["frameworks", "ai design frameworks", "methods", "design methods", "ai design"],
    color: T.frameworks,
    destination: { kind: "frameworks", id: "frameworks" },
  },
  {
    id: "authority-gradient",
    title: "Authority Gradient",
    type: "FRAMEWORK",
    parent: "FRAMEWORKS",
    kind: "framework",
    description: "A model for how system recommendations change with decision authority.",
    keywords: ["authority gradient", "decision rights", "authority", "recommendation"],
    color: T.frameworks,
    destination: { kind: "frameworks", id: "authority-gradient" },
  },
  {
    id: "behavioral-architecture",
    title: "Behavioral Architecture",
    type: "FRAMEWORK",
    parent: "FRAMEWORKS",
    kind: "framework",
    description: "Structures that preserve trustworthy AI behavior through change.",
    keywords: ["behavioral architecture", "governance", "constraints", "model behavior", "trust"],
    color: T.frameworks,
    destination: { kind: "frameworks", id: "behavioral-architecture" },
  },
  {
    id: "relational-ai-literacy",
    title: "Relational AI Literacy",
    type: "FRAMEWORK",
    parent: "FRAMEWORKS",
    kind: "framework",
    description: "A reflective model for grounded participation with AI systems.",
    keywords: ["relational ai literacy", "ai literacy", "human ai", "reflection", "presence"],
    color: T.frameworks,
    destination: { kind: "frameworks", id: "relational-ai-literacy" },
  },
  {
    id: "presence-navigation",
    title: "Presence Navigation",
    type: "FRAMEWORK",
    parent: "FRAMEWORKS",
    kind: "framework",
    description: "Navigation designed around orientation, context, and presence.",
    keywords: ["presence navigation", "navigation", "orientation", "context"],
    color: T.frameworks,
    destination: { kind: "frameworks", id: "presence-navigation" },
  },
  {
    id: "regenerative-systems",
    title: "Regenerative Systems",
    type: "FRAMEWORK",
    parent: "FRAMEWORKS",
    kind: "framework",
    description: "Detect drift, preserve critical relationships, and verify system integrity.",
    keywords: ["regenerative systems", "drift", "system integrity", "invariants", "regeneration"],
    color: T.frameworks,
    destination: { kind: "frameworks", id: "regenerative-systems" },
  },

  {
    id: "experiments",
    title: "Experiments",
    type: "SYSTEM",
    parent: "SOVEREIGN ATLAS",
    kind: "system",
    description: "Controlled explorations of AI behavior, perception, and authority.",
    keywords: ["experiments", "research", "explorations", "lab"],
    color: T.experiments,
    destination: { kind: "experiments", id: "experiments" },
  },
  {
    id: "authority-drift",
    title: "Authority Drift",
    type: "EXPERIMENT",
    parent: "EXPERIMENTS",
    kind: "experiment",
    description: "An exploration of how decision authority shifts from human to system.",
    keywords: ["authority drift", "authority", "drift", "human decision", "ai decision"],
    color: T.experiments,
    destination: { kind: "experiments", id: "authority-drift" },
  },
  {
    id: "ai-evaluation",
    title: "AI Evaluation",
    type: "EXPERIMENT",
    parent: "EXPERIMENTS",
    kind: "experiment",
    description: "Comparing AI behavior through explicit design conditions.",
    keywords: ["ai evaluation", "evaluation", "ai behavior", "comparison"],
    color: T.experiments,
    destination: { kind: "experiments", id: "ai-evaluation" },
  },
  {
    id: "design-philosophy",
    title: "Design Philosophy",
    type: "EXPERIMENT",
    parent: "EXPERIMENTS",
    kind: "experiment",
    description: "Making design assumptions visible through comparative exploration.",
    keywords: ["design philosophy", "philosophy", "design assumptions"],
    color: T.experiments,
    destination: { kind: "experiments", id: "design-philosophy" },
  },
  {
    id: "gestalt-principles",
    title: "Gestalt Principles",
    type: "EXPERIMENT",
    parent: "EXPERIMENTS",
    kind: "experiment",
    description: "Testing perceptual reasoning through foundational visual principles.",
    keywords: ["gestalt principles", "gestalt", "perception", "visual reasoning"],
    color: T.experiments,
    destination: { kind: "experiments", id: "gestalt-principles" },
  },
  {
    id: "think-like-a-designer",
    title: "Think Like a Designer",
    type: "EXPERIMENT",
    parent: "EXPERIMENTS",
    kind: "experiment",
    description: "Exploring how design judgment changes the shape of a solution.",
    keywords: ["think like a designer", "designer", "judgment", "design thinking"],
    color: T.experiments,
    destination: { kind: "experiments", id: "think-like-a-designer" },
  },

  {
    id: "observatory",
    title: "Observatory",
    type: "OBSERVATORY",
    parent: "PROFILE",
    kind: "observatory",
    description: "Enter the profile archive and choose a destination.",
    keywords: ["observatory", "profile", "archive"],
    color: T.identityGold,
    destination: { kind: "observatory", id: "observatory" },
  },
  {
    id: "about-wilson",
    title: "About Wilson",
    type: "OBSERVATORY",
    parent: "PROFILE",
    kind: "observatory",
    description: "Identity, values, approach, and how Wilson thinks and builds.",
    keywords: ["wilson", "about wilson", "about", "profile", "background"],
    color: "#6FA8FF",
    destination: { kind: "observatory", id: "about" },
  },
  {
    id: "journey",
    title: "Journey",
    type: "OBSERVATORY",
    parent: "PROFILE",
    kind: "observatory",
    description: "Trace the path from early exploration to Sovereign Design.",
    keywords: ["journey", "career", "timeline", "experience"],
    color: "#E0A63B",
    destination: { kind: "observatory", id: "journey" },
  },
  {
    id: "philosophy",
    title: "Philosophy",
    type: "OBSERVATORY",
    parent: "PROFILE",
    kind: "observatory",
    description: "Principles, influences, and beliefs that shape the work.",
    keywords: ["philosophy", "principles", "beliefs", "influences"],
    color: "#8D5BE8",
    destination: { kind: "observatory", id: "philosophy" },
  },
  {
    id: "first-contact",
    title: "First Contact",
    type: "OBSERVATORY",
    parent: "PROFILE",
    kind: "observatory",
    description: "Open a channel and begin a conversation.",
    keywords: ["first contact", "contact", "email", "conversation"],
    color: "#1EBE9A",
    destination: { kind: "observatory", id: "contact" },
  },
];

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function searchTerms(value: string) {
  return normalize(value)
    .replace(
      /^(show me|explain|explore|tell me about|tell me|find|open|browse)\s+/,
      "",
    )
    .split(" ")
    .filter(
      (term) =>
        term.length > 2 &&
        !["the", "strongest", "design"].includes(term),
    );
}

function scoreResult(result: AtlasMobileSearchResult, query: string) {
  const clean = normalize(query);
  const title = normalize(result.title);
  const fields = [
    title,
    normalize(result.type),
    normalize(result.parent),
    normalize(result.description),
    ...result.keywords.map(normalize),
  ];

  let score =
    title === clean
      ? 140
      : title.includes(clean)
      ? 90
      : 0;

  for (const term of searchTerms(query)) {
    if (title.includes(term)) score += 34;
    if (fields.some((field) => field.includes(term))) score += 14;
  }

  if (
    /strongest|portfolio|project|case stud/.test(clean) &&
    result.id === "case-studies"
  ) {
    score += 70;
  }

  if (
    /framework|method|ai design/.test(clean) &&
    result.id === "frameworks"
  ) {
    score += 70;
  }

  if (
    /wilson|profile|about/.test(clean) &&
    result.id === "about-wilson"
  ) {
    score += 70;
  }

  if (/authority drift/.test(clean) && result.id === "authority-drift") {
    score += 80;
  }

  return score;
}

export function searchAtlasMobile(query: string) {
  if (!query.trim()) return [];

  return ATLAS_MOBILE_SEARCH_RESULTS
    .map((result) => ({
      result,
      score: scoreResult(result, query),
    }))
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.result.title.localeCompare(b.result.title),
    )
    .slice(0, 4)
    .map(({ result }) => result);
}
