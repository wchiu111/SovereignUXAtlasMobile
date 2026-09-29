import type { ObservatoryHotspotDefinition } from "../observatoryTypes";

/**
 * Portrait-authored interaction coordinates for the 390 × 844 mobile stage.
 *
 * Labels use a shared 30px vertical gap below their node centers.
 * About Wilson established the spacing reference for the Observatory system.
 */
export const OBSERVATORY_HOTSPOTS: readonly ObservatoryHotspotDefinition[] = [
  {
    id: "journey",
    label: "JOURNEY",
    eyebrow: "Profile archive",
    description: "Trace the path from early exploration to Sovereign Design.",
    color: "#FFB14A",
    x: 79,
    y: 313,
    labelX: 70,
    labelY: 343,
    align: "left",
    camera: {
      translateX: 22,
      translateY: 18,
      scale: 1.09,
    },
  },
  {
    id: "contact",
    label: "FIRST CONTACT",
    eyebrow: "Communication console",
    description: "Open a channel and begin a conversation.",
    color: "#33D1A1",
    x: 116,
    y: 435,
    labelX: 116,
    labelY: 465,
    align: "center",
    camera: {
      translateX: 18,
      translateY: -8,
      scale: 1.085,
    },
  },
  {
    id: "about",
    label: "ABOUT WILSON",
    eyebrow: "Designer profile",
    description: "Identity, values, approach, and how I think and build.",
    color: "#6AA7FF",
    x: 195,
    y: 582,
    labelX: 195,
    labelY: 612,
    align: "center",
    camera: {
      translateX: 0,
      translateY: -32,
      scale: 1.075,
    },
  },
  {
    id: "philosophy",
    label: "PHILOSOPHY",
    eyebrow: "Reference library",
    description: "The principles, influences, and beliefs that shape the work.",
    color: "#A879FF",
    x: 316,
    y: 443,
    labelX: 274,
    labelY: 473,
    align: "left",
    camera: {
      translateX: -20,
      translateY: -8,
      scale: 1.09,
    },
  },
  {
    id: "atlas",
    label: "ENTER ATLAS",
    eyebrow: "Knowledge system",
    description: "Explore case studies, experiments, and frameworks.",
    color: "#D4AF37",
    x: 196,
    y: 256,
    labelX: 196,
    labelY: 286,
    align: "center",
    camera: {
      translateX: -24,
      translateY: 14,
      scale: 1.10,
    },
  },
] as const;

export function observatoryHotspotFor(id: string | null) {
  return (
    OBSERVATORY_HOTSPOTS.find((hotspot) => hotspot.id === id) ??
    null
  );
}
