export interface EvidenceItem {
  id: string;
  number: string;
  title: string;
  type: string;
  description: string;
  caption: string;
  image?: string;
  alt?: string;
  imageFit?: "contain" | "cover";
}

export interface Section {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  body: string[];
  keyInsight: string;
  readingTime: number;
  evidence: EvidenceItem[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  year: number;
  role: string;
  sections: Section[];
}