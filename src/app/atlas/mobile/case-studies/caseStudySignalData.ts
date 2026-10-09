import agenticInsurance from "../../../content/case-studies/agentic-insurance";
import globality from "../../../content/case-studies/globality";
import oracle from "../../../content/case-studies/oracle";
import sovereignAtlas from "../../../content/case-studies/sovereign-atlas";
import type { AtlasEntry } from "../../../content/types";
import type { MobileCaseStudyProjectId } from "../reading/mobileReadingTypes";
import type { AtlasSignalDescriptor } from "../signals/AtlasSignalRow";

const SOURCE = {
  "agentic-insurance": agenticInsurance,
  globality,
  oracle,
  "sovereign-atlas": sovereignAtlas,
} as const satisfies Record<MobileCaseStudyProjectId, AtlasEntry>;

function signalId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export function caseStudySignalsFor(
  id: MobileCaseStudyProjectId,
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
