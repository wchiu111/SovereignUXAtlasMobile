import type { AtlasEvidenceCanvas } from "../../content/types";

export interface ReadingEvidenceItem {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  caption: string;
  image?: string;
  alt?: string;
  imageFit?: "contain" | "cover";
  canvas?: AtlasEvidenceCanvas;
}

export interface ReadingSection {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  body: string[];
  keyInsight: string;
  readingTime: number;
  evidence: ReadingEvidenceItem[];
  accentStellarType?: import("../../content/types").AtlasStellarType;
}

export interface ReadingDocument {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  meta: string;
  sequenceLabel?: string;
  railLabel: string;
  artifactLabel: string;
  emptyRailMessage?: string;
  sections: ReadingSection[];
}
