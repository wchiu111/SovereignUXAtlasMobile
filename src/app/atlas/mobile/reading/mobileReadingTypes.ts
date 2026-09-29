export type MobileCaseStudyProjectId =
  | "agentic-insurance"
  | "globality"
  | "oracle"
  | "sovereign-atlas";

export interface MobileReadingSectionData {
  id: string;
  number: string;
  label: string;
  subtitle: string;
  readingTime: number;
  paragraphs: readonly string[];
  insight: string;
}

export interface MobileEvidenceItem {
  id: string;
  sectionId: string;
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

export interface MobileCaseStudyReadingDocument {
  id: MobileCaseStudyProjectId;
  title: string;
  ariaLabel: string;
  sections: readonly MobileReadingSectionData[];
  evidence: readonly MobileEvidenceItem[];
}
