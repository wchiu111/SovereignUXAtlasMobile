export type AtlasPreviewId =
  | "sovereign-design"
  | "case-studies"
  | "experiments"
  | "frameworks";

export interface AtlasPreviewDefinition {
  id: AtlasPreviewId;
  title: string;
  eyebrow: string;
  paragraphs: string[];
  color: string;
}

export const ATLAS_PREVIEW_CONTENT: Record<AtlasPreviewId, AtlasPreviewDefinition> = {
  "sovereign-design": {
    id: "sovereign-design",
    title: "Sovereign Design",
    eyebrow: "Every constellation begins here.",
    color: "#E8C86D",
    paragraphs: [
      "Before there are products, there are principles.",
      "The Atlas is a collection of projects, experiments, and frameworks, but they all emerge from the same philosophy: technology should strengthen human judgment, not replace it.",
      "We design systems that people can understand, question, and trust. Everything beyond this point is an exploration of that belief.",
    ],
  },
  "case-studies": {
    id: "case-studies",
    title: "Case Studies",
    eyebrow: "See how decisions became outcomes.",
    color: "#8CC8EE",
    paragraphs: [
      "Each case study traces a project through its context, constraints, design decisions, evidence, and results.",
      "Enter a system to understand not only what was created, but why it took the form it did.",
    ],
  },
  experiments: {
    id: "experiments",
    title: "Experiments",
    eyebrow: "Questions are placed under pressure here.",
    color: "#B394E8",
    paragraphs: [
      "These explorations test assumptions about AI, behavior, trust, authority, and interaction.",
      "Some produce answers. Others reveal better questions—and the conditions conventional design methods overlook.",
    ],
  },
  frameworks: {
    id: "frameworks",
    title: "Frameworks",
    eyebrow: "Principles become reusable structures.",
    color: "#6ED7A0",
    paragraphs: [
      "These systems organize recurring patterns across design, AI, governance, and human judgment.",
      "They are not fixed recipes, but lenses for understanding complexity and making more deliberate decisions.",
    ],
  },
};
