import { BEHAVIORAL_ARCHITECTURE } from "./behavioralArchitecture";
import { AUTHORITY_GRADIENT } from "./authorityGradient";
import { RELATIONAL_AI_LITERACY } from "./relationalAiLiteracy";
import { PRESENCE_NAVIGATION } from "./presenceNavigation";
import { REGENERATIVE_SYSTEMS } from "./regenerativeSystems";
import type {
  MobileFrameworkDocument,
  MobileFrameworkId,
} from "./mobileFrameworkTypes";

export const MOBILE_FRAMEWORKS: readonly MobileFrameworkDocument[] = [
  AUTHORITY_GRADIENT,
  BEHAVIORAL_ARCHITECTURE,
  RELATIONAL_AI_LITERACY,
  PRESENCE_NAVIGATION,
  REGENERATIVE_SYSTEMS,
];

export const DEFAULT_MOBILE_FRAMEWORK_ID: MobileFrameworkId =
  "behavioral-architecture";

export function mobileFrameworkFor(
  id: MobileFrameworkId | null,
): MobileFrameworkDocument {
  return (
    MOBILE_FRAMEWORKS.find((framework) => framework.id === id) ??
    BEHAVIORAL_ARCHITECTURE
  );
}
