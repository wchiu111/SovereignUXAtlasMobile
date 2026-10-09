import aiEvaluation from "../../../content/experiments/ai-evaluation";
import authorityDrift from "../../../content/experiments/authority-drift";
import designPhilosophy from "../../../content/experiments/design-philosophy";
import gestaltPrinciples from "../../../content/experiments/gestalt-principles";
import thinkLikeADesigner from "../../../content/experiments/think-like-a-designer";
import type { AtlasEntry } from "../../../content/types";
import type { AtlasSignalDescriptor } from "../signals/AtlasSignalRow";
import type { MobileExperimentId } from "./experimentsTypes";

const SOURCE = {
  "ai-evaluation": aiEvaluation,
  "authority-drift": authorityDrift,
  "design-philosophy": designPhilosophy,
  "gestalt-principles": gestaltPrinciples,
  "think-like-a-designer": thinkLikeADesigner,
} as const satisfies Record<MobileExperimentId, AtlasEntry>;

function signalId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function experimentSignalsFor(
  id: MobileExperimentId,
): AtlasSignalDescriptor[] {
  const source = SOURCE[id];
  const identity = source.signatureStellarType?.toUpperCase();

  return [
    ...(identity
      ? [
          {
            id: `${id}-identity`,
            kind: "identity" as const,
            label: identity,
          },
        ]
      : []),
    ...(source.tags ?? []).map((tag) => ({
      id: `${id}-${signalId(tag)}`,
      kind: "concept" as const,
      label: tag,
    })),
  ];
}
