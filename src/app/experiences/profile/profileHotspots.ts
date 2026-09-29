import type { StagePoint } from "./profileStage";

export type ProfileHotspotId =
  | "atlas"
  | "timeline"
  | "contact"
  | "about"
  | "philosophy";

export type ProfileHotspotKind =
  | "constellation"
  | "notebook"
  | "console"
  | "silhouette"
  | "books";

export interface ProfileHotspotDefinition extends StagePoint {
  id: ProfileHotspotId;
  kind: ProfileHotspotKind;
  label: string;
  eyebrow: string;
  description: string;
  color: string;
  align?: "left" | "center" | "right";
  labelOffsetX?: number;
  labelOffsetY?: number;
}

export const PROFILE_HOTSPOTS: ProfileHotspotDefinition[] = [
  {
    id: "atlas",
    kind: "constellation",
    eyebrow: "Knowledge system",
    label: "Enter Atlas",
    description: "Explore case studies, experiments, and frameworks.",
    x: 872,
    y: 238,
    color: "#D4AF37",
    align: "center",
    labelOffsetY: 16,
  },
  {
    id: "timeline",
    kind: "notebook",
    eyebrow: "Profile archive",
    label: "Journey Timeline",
    description: "Trace the path from early exploration to Sovereign Design.",
    x: 246,
    y: 774,
    color: "#FFB14A",
    align: "left",
    labelOffsetX: 16,
    labelOffsetY: -8,
  },
  {
    id: "contact",
    kind: "console",
    eyebrow: "Communication console",
    label: "First Contact",
    description: "Open a channel and begin a conversation.",
    x: 809,
    y: 754,
    color: "#33D1A1",
    align: "center",
    labelOffsetY: -6,
  },
  {
    id: "about",
    kind: "silhouette",
    eyebrow: "Designer profile",
    label: "About Wilson",
    description: "Identity, values, approach, and how I think and build.",
    x: 650,
    y: 560,
    color: "#6AA7FF",
    align: "right",
    labelOffsetX: -82,
    labelOffsetY: -10,
  },
  {
    id: "philosophy",
    kind: "books",
    eyebrow: "Reference library",
    label: "Philosophy",
    description: "The principles, influences, and beliefs that shape the work.",
    x: 1250,
    y: 725,
    color: "#A879FF",
    align: "right",
    labelOffsetX: -34,
    labelOffsetY: -4,
  },
];
