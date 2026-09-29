import { T } from "../../components/mobileShared";
import { STELLAR_PALETTE } from "../../../constellation/stellarPalette";
import aiEvaluation from "../../../../content/experiments/ai-evaluation";
import authorityDrift from "../../../../content/experiments/authority-drift";
import designPhilosophy from "../../../../content/experiments/design-philosophy";
import gestaltPrinciples from "../../../../content/experiments/gestalt-principles";
import thinkLikeADesigner from "../../../../content/experiments/think-like-a-designer";
import type {
  AtlasEntry,
  AtlasEntryEvidence,
  AtlasEntrySection,
} from "../../../../content/types";
import type { MobileExperimentId } from "../experimentsTypes";
import type {
  ConstellationEvidence,
  ConstellationItem,
  ConstellationParentDefinition,
  ConstellationSection,
} from "../template/constellationTypes";

export const EXPERIMENTS_COLLECTION = {
  id: "experiments",
  title: "EXPERIMENTS",
  countLabel: "5 EXPERIMENTS",
  color: T.experiments,
  headline: "Use experiments to make hidden design assumptions observable.",
  body:
    "These studies compare AI behavior, perceptual reasoning, authority, reflection, and evaluation through controlled design conditions.",
  invitation:
    "Select an experiment to inspect the question, the conditions, the evidence, and what the comparison reveals.",
} as const satisfies Omit<
  ConstellationParentDefinition<"experiments">,
  "x" | "y"
>;

function evidenceFromSource(
  evidence: AtlasEntryEvidence,
): ConstellationEvidence {
  return {
    id: evidence.id,
    image: evidence.image,
    imageFit: evidence.imageFit ?? "contain",
    alt: evidence.alt ?? evidence.title,
    number: evidence.number,
    title: evidence.title,
    type: evidence.type,
    description: evidence.description,
    caption: evidence.caption,
  };
}

function sectionFromSource(
  section: AtlasEntrySection,
): ConstellationSection {
  return {
    id: section.id,
    label: section.label.toUpperCase(),
    short: section.label.toUpperCase(),
    subtitle: section.subtitle ?? "",
    readingTime: section.readingTime ?? 1,
    content: section.content,
    insight: section.insight ?? "",
    evidence: section.evidence?.map(evidenceFromSource),
  };
}

function sectionsFromSource(
  entry: AtlasEntry,
): readonly ConstellationSection[] {
  return (entry.sections ?? []).map(sectionFromSource);
}

const SOURCE = {
  "ai-evaluation": aiEvaluation,
  "authority-drift": authorityDrift,
  "design-philosophy": designPhilosophy,
  "gestalt-principles": gestaltPrinciples,
  "think-like-a-designer": thinkLikeADesigner,
} as const;

function item(
  id: MobileExperimentId,
  {
    labelLines,
    color,
    meta,
    breathDelay,
  }: {
    labelLines: readonly string[];
    color: string;
    meta: string;
    breathDelay: number;
  },
): ConstellationItem<MobileExperimentId> {
  const source = SOURCE[id];

  return {
    id,
    title: source.title,
    subtitle: source.subtitle,
    labelLines,
    color,
    meta,
    breathDelay,
    overview: source.overview,
    sections: sectionsFromSource(source),
  };
}

export const MOBILE_EXPERIMENTS: readonly ConstellationItem<MobileExperimentId>[] = [
  item("ai-evaluation", {
    labelLines: ["AI", "EVALUATION"],
    color: STELLAR_PALETTE.relational,
    meta: "EXPERIMENT 1 OF 5",
    breathDelay: 0,
  }),
  item("authority-drift", {
    labelLines: ["AUTHORITY", "DRIFT"],
    color: STELLAR_PALETTE.risk,
    meta: "EXPERIMENT 2 OF 5",
    breathDelay: 0.7,
  }),
  item("design-philosophy", {
    labelLines: ["DESIGN", "PHILOSOPHY"],
    color: STELLAR_PALETTE.judgment,
    meta: "EXPERIMENT 3 OF 5",
    breathDelay: 1.4,
  }),
  item("gestalt-principles", {
    labelLines: ["GESTALT", "PRINCIPLES"],
    color: STELLAR_PALETTE.relational,
    meta: "EXPERIMENT 4 OF 5",
    breathDelay: 2.1,
  }),
  item("think-like-a-designer", {
    labelLines: ["THINK LIKE", "A DESIGNER"],
    color: STELLAR_PALETTE.agentic,
    meta: "EXPERIMENT 5 OF 5",
    breathDelay: 2.8,
  }),
];

export function mobileExperimentFor(id: MobileExperimentId) {
  return (
    MOBILE_EXPERIMENTS.find((experiment) => experiment.id === id) ??
    MOBILE_EXPERIMENTS[0]
  );
}

export const DEFAULT_MOBILE_EXPERIMENT_ID: MobileExperimentId =
  "ai-evaluation";
