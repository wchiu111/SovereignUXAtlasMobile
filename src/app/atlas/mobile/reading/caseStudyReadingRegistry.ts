import { SOVEREIGN_ATLAS_READING } from "./sovereignAtlasReadingScaffold";
import { SOVEREIGN_ATLAS_EVIDENCE } from "./sovereignAtlasEvidence";
import { AGENTIC_INSURANCE_READING } from "./agenticInsuranceReadingScaffold";
import { AGENTIC_INSURANCE_EVIDENCE } from "./agenticInsuranceEvidence";
import { GLOBALITY_READING } from "./globalityReadingScaffold";
import { GLOBALITY_EVIDENCE } from "./globalityEvidence";
import { ORACLE_READING } from "./oracleReadingScaffold";
import { ORACLE_EVIDENCE } from "./oracleEvidence";
import type {
  MobileCaseStudyProjectId,
  MobileCaseStudyReadingDocument,
} from "./mobileReadingTypes";

const SOVEREIGN_ATLAS_DOCUMENT: MobileCaseStudyReadingDocument = {
  id: "sovereign-atlas",
  title: SOVEREIGN_ATLAS_READING.title,
  ariaLabel: "Sovereign Atlas case study",
  sections: SOVEREIGN_ATLAS_READING.sections,
  evidence: SOVEREIGN_ATLAS_EVIDENCE,
};

const AGENTIC_INSURANCE_DOCUMENT: MobileCaseStudyReadingDocument = {
  id: "agentic-insurance",
  title: AGENTIC_INSURANCE_READING.title,
  ariaLabel: "Agentic Insurance case study",
  sections: AGENTIC_INSURANCE_READING.sections,
  evidence: AGENTIC_INSURANCE_EVIDENCE,
};

const GLOBALITY_DOCUMENT: MobileCaseStudyReadingDocument = {
  id: "globality",
  title: GLOBALITY_READING.title,
  ariaLabel: "Globality case study",
  sections: GLOBALITY_READING.sections,
  evidence: GLOBALITY_EVIDENCE,
};

const ORACLE_DOCUMENT: MobileCaseStudyReadingDocument = {
  id: "oracle",
  title: ORACLE_READING.title,
  ariaLabel: "Oracle case study",
  sections: ORACLE_READING.sections,
  evidence: ORACLE_EVIDENCE,
};

export function mobileCaseStudyDocumentFor(
  projectId: MobileCaseStudyProjectId | null,
): MobileCaseStudyReadingDocument {
  if (projectId === "agentic-insurance") return AGENTIC_INSURANCE_DOCUMENT;
  if (projectId === "globality") return GLOBALITY_DOCUMENT;
  if (projectId === "oracle") return ORACLE_DOCUMENT;

  return SOVEREIGN_ATLAS_DOCUMENT;
}
