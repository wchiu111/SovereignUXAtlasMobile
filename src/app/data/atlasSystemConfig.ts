import type { AtlasCategory } from "../content";

export interface AtlasSystemConfig {
  id: string;
  category: AtlasCategory;
  label: string;
  subtitle: string;
  color: string;
  size: number;

  // Authored placement. These values preserve the existing Atlas composition.
  orbitA: number;
  orbitB: number;
  orbitOffsetX: number;
  orbitOffsetY: number;
  orbitRotation: number;
  orbitTilt: number;
  orbitDepth: number;
  orbitPhase0: number;

  // Retained for compatibility with the current StarSystem type. The new
  // gravitational drift model does not use this as the system travel speed.
  orbitSpeed: number;

  // Local gravitational drift around the authored position.
  driftRadiusX: number;
  driftRadiusY: number;
  driftDurationMs: number;
  driftDirection: 1 | -1;
  driftPhase: number;
  driftAngleOffset: number;

  pulseSpeed: number;
  pulsePhase: number;
}

const degrees = (value: number) => (value * Math.PI) / 180;

export const ATLAS_SYSTEM_CONFIGS: AtlasSystemConfig[] = [
  {
    id: "case-studies", category: "case-study", label: "CASE STUDIES",
    subtitle: "Real-world product work, decisions, and outcomes.",
    color: "#8AAEC8", size: 4.5,
    orbitA: 326, orbitB: 210,
    orbitOffsetX: 22, orbitOffsetY: -18,
    orbitRotation: 0.12, orbitTilt: 0.72, orbitDepth: 18,
    orbitPhase0: -0.42, orbitSpeed: 0,
    driftRadiusX: 16, driftRadiusY: 7,
    driftDurationMs: 148_000,
    driftDirection: 1,
    driftPhase: 0.35,
    driftAngleOffset: degrees(-4),
    pulseSpeed: 0.00082, pulsePhase: 0,
  },
  {
    id: "experiments", category: "experiment", label: "EXPERIMENTS",
    subtitle: "Active research and discovery through structured investigation.",
    color: "#9B8AC8", size: 4.5,
    orbitA: 276, orbitB: 244,
    orbitOffsetX: -6, orbitOffsetY: 24,
    orbitRotation: -0.08, orbitTilt: 0.84, orbitDepth: 48,
    orbitPhase0: Math.PI / 2 + 0.16, orbitSpeed: 0,
    driftRadiusX: 13, driftRadiusY: 8,
    driftDurationMs: 171_000,
    driftDirection: -1,
    driftPhase: 2.15,
    driftAngleOffset: degrees(5),
    pulseSpeed: 0.00070, pulsePhase: 2.1,
  },
  {
    id: "frameworks", category: "framework", label: "FRAMEWORKS",
    subtitle: "Reusable thinking, mental models, and intellectual frameworks.",
    color: "#6AB88A", size: 4.5,
    orbitA: 354, orbitB: 184,
    orbitOffsetX: -28, orbitOffsetY: -10,
    orbitRotation: -0.18, orbitTilt: 0.64, orbitDepth: -24,
    orbitPhase0: Math.PI + 0.46, orbitSpeed: 0,
    driftRadiusX: 18, driftRadiusY: 5,
    driftDurationMs: 126_000,
    driftDirection: 1,
    driftPhase: 4.4,
    driftAngleOffset: degrees(-2),
    pulseSpeed: 0.00090, pulsePhase: 4.2,
  },
];
