export type ObservatoryDestinationId =
  | "journey"
  | "contact"
  | "about"
  | "philosophy"
  | "atlas";

export type ObservatoryPanelId = Exclude<
  ObservatoryDestinationId,
  "atlas"
>;

export interface ObservatoryCameraTarget {
  translateX: number;
  translateY: number;
  scale: number;
}

export interface ObservatoryHotspotDefinition {
  id: ObservatoryDestinationId;
  label: string;
  eyebrow: string;
  description: string;
  color: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  align: "left" | "center" | "right";
  camera: ObservatoryCameraTarget;
}

export interface ObservatoryTimelineEra {
  year: string;
  title: string;
  description: string;
  imageLabel: string;
}

export interface ObservatoryContentModel {
  about: {
    eyebrow: string;
    headline: string;
    body: string;
    location: string;
    principles: readonly string[];
    focusAreas: readonly string[];
  };
  journey: {
    eras: readonly ObservatoryTimelineEra[];
  };
  philosophy: {
    beliefs: readonly string[];
    modelSteps: readonly string[];
    modelFooter: string;
    influences: readonly string[];
    explorations: readonly string[];
    explorationBody: string;
    closingStatement: string;
  };
  contact: {
    intro: string;
    replyNote: string;
  };
}
