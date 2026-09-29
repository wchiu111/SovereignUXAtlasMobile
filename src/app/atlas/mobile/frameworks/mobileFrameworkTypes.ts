export type MobileFrameworkId =
  | "authority-gradient"
  | "behavioral-architecture"
  | "relational-ai-literacy"
  | "presence-navigation"
  | "regenerative-systems";

export type MobileFrameworkStatus = "ready" | "overview-only";

export interface MobileFrameworkOverview {
  what: string;
  why: string;
  researchFocus: string;
  keyDiscovery: string;
}

export interface MobileFrameworkSection {
  id: string;
  label: string;
  short: string;
  subtitle: string;
  readingTime: number;
  content: string;
  insight: string;
}

export interface MobileFrameworkEvidence {
  id: string;
  sectionId: string;
  image: string;
  imageFit: "contain" | "cover";
  alt: string;
  number: string;
  title: string;
  type: string;
  description: string;
  caption: string;
}

export interface MobileFrameworkDocument {
  id: MobileFrameworkId;
  title: string;
  subtitle: string;
  tags: readonly string[];
  status: MobileFrameworkStatus;
  overview: MobileFrameworkOverview;
  sequenceLabel: string;
  sections: readonly MobileFrameworkSection[];
  evidence: readonly MobileFrameworkEvidence[];
}
