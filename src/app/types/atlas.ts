import type {
  AtlasConnectionStrength,
  AtlasStarIntensity,
  AtlasStarLabelPosition,
  AtlasStellarType,
} from "../content/types";

export interface StarNode {
  id: string;
  label: string;
  angle: number;
  x?: number;
  y?: number;
  scale?: number;
  stellarType?: AtlasStellarType;
  intensity?: AtlasStarIntensity;
  labelPosition?: AtlasStarLabelPosition;
}

export interface ConstellationConnection {
  from: string;
  to: string;
  strength: AtlasConnectionStrength;
}

export interface Planet {
  id: string; label: string;
  angle: number;
  orbitR: number;
  orbitSpeed: number;
  orbitPlane: number;
  orbitOffsetX: number;
  orbitOffsetY: number;
  stars: StarNode[];
  signatureStellarType?: AtlasStellarType;
  tags?: string[];
  constellationConnections?: ConstellationConnection[];
  showCenterConnections?: boolean;
  what: string; why: string; researchFocus: string; keyDiscovery: string;
}

export interface StarSystem {
  id: string; label: string; subtitle: string; color: string;
  size: number;
  orbitA: number; orbitB: number;
  orbitOffsetX: number; orbitOffsetY: number;
  orbitRotation: number;
  orbitTilt: number;
  orbitDepth: number;
  orbitPhase0: number;
  orbitSpeed: number;
  driftRadiusX: number;
  driftRadiusY: number;
  driftDurationMs: number;
  driftDirection: 1 | -1;
  driftPhase: number;
  driftAngleOffset: number;
  pulseSpeed: number; pulsePhase: number;
  planets: Planet[];
}

export interface FocusSection { id: string; label: string; content: string; insight?: string; }
export interface FocusContent { headline: string; subheadline: string; sections: FocusSection[]; }
export interface ZoomState { scale: number; tx: number; ty: number; }
export type ViewLevel = 0 | 1 | 2 | 3;

export interface FocusTransition {
  index: number;
  label: string;
  x: number;
  y: number;
  color: string;
}
