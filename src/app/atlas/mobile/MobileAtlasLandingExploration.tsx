/**
 * MobileAtlasLandingExploration
 *
 * DESIGN PROTOTYPE ONLY — disposable scaffolding, not production code.
 * Does not modify any existing Atlas components.
 *
 * Nine states across two depth levels:
 *   A — ATLAS ARRIVAL                   Full atlas, all systems at rest
 *   B — CASE STUDIES ACTIVATED          CS moves to center, constellation awakens
 *   C — CASE STUDIES OVERVIEW · INITIAL CS centered, Overview surface appears
 *   D — CASE STUDIES OVERVIEW · SCROLLED
 *   ─── Project depth ─────────────────────────────────────────────
 *   E — CASE STUDIES FOCUS MODE         4-project portrait constellation
 *   F — AGENTIC INSURANCE ACTIVATED     Project moves to spatial focus
 *   G — AGENTIC INSURANCE OVERVIEW      Bottom-origin project overview
 *   H — AGENTIC INSURANCE READING MODE  Single-column reading + evidence entry
 *   I — EVIDENCE VIEWER                 Focused evidence inspection
 */

import { useEffect, useRef, useState, type RefObject } from "react";
import evidenceImg from "../../../imports/case-studies/agentic-insurance/03-approach/3-adjusters-claim-overview.png";
import baEvidenceImg from "../../../imports/frameworks/behavioral-architecture/01-governance/behavioral-architecture.jpg";

// ─── Frame ─────────────────────────────────────────────────────────────────
const W = 390;
const H = 844;

// ─── Design tokens ──────────────────────────────────────────────────────────
const T = {
  bg:          "#05050A",
  gold:        "#E8D5A3",
  caseStudies: "#8AAEC8",
  experiments: "#9B8AC4",
  frameworks:  "#6AB88A",
  mono:        "'DM Mono', monospace",
  serif:       "'EB Garamond', Georgia, serif",
} as const;

// ─── Animation ──────────────────────────────────────────────────────────────
const EASE = "cubic-bezier(0.16,1,0.3,1)";
const DUR  = "0.95s";
const ANIM = `transform ${DUR} ${EASE}`;
const FADE = `opacity 0.75s ease`;

// ─── Portrait composition (A–D) ─────────────────────────────────────────────
const NEXUS   = { x: 195, y: 355 };
const BASE_R  = 18;
const EX_POS  = { x: 298, y: 178 };
const FW_POS  = { x: 195, y: 565 };
const ORBIT_R = 36;

// ─── Modes ──────────────────────────────────────────────────────────────────
const MODES = [
  "arrival", "activate", "overview", "scrolled",             // A B C D
  "focus", "activated", "project-overview", "reading", "evidence", // E F G H I
  "fw-focus", "fw-activated", "fw-overview", "fw-deeper", "fw-canvas", // J K L M N
] as const;
type Mode = (typeof MODES)[number];

type LandingMode   = "arrival" | "activate" | "overview" | "scrolled";
type ProjectMode   = "focus" | "activated" | "project-overview" | "reading" | "evidence";
type FrameworkMode = "fw-focus" | "fw-activated" | "fw-overview" | "fw-deeper" | "fw-canvas";

const LANDING_MODES:   readonly string[] = ["arrival", "activate", "overview", "scrolled"];
const PROJECT_MODES:   readonly string[] = ["focus", "activated", "project-overview", "reading", "evidence"];
const FRAMEWORK_MODES: readonly string[] = ["fw-focus", "fw-activated", "fw-overview", "fw-deeper", "fw-canvas"];

const MODE_LABELS: Record<Mode, string> = {
  arrival:           "A — Atlas Arrival",
  activate:          "B — Case Studies Activated",
  overview:          "C — Case Studies Overview · Initial",
  scrolled:          "D — Case Studies Overview · Scrolled",
  focus:             "E — Case Studies Focus Mode",
  activated:         "F — Agentic Insurance Activated",
  "project-overview":"G — Agentic Insurance Overview · Initial",
  reading:           "H — Agentic Insurance Reading Mode",
  evidence:          "I — Evidence Viewer",
  "fw-focus":        "J — Frameworks Focus Mode",
  "fw-activated":    "K — Behavioral Architecture Activated",
  "fw-overview":     "L — Behavioral Architecture Overview",
  "fw-deeper":       "M — Behavioral Architecture · Deeper View",
  "fw-canvas":       "N — Framework Canvas / Evidence",
};

const MODE_KEY: Record<Mode, string> = {
  arrival: "A", activate: "B", overview: "C", scrolled: "D",
  focus: "E", activated: "F", "project-overview": "G", reading: "H", evidence: "I",
  "fw-focus": "J", "fw-activated": "K", "fw-overview": "L", "fw-deeper": "M", "fw-canvas": "N",
};

// ─── Landing-level config (A–D) ─────────────────────────────────────────────
const CS_FOCUS: Record<LandingMode, { x: number; y: number; orbitR: number; opacity: number }> = {
  arrival:  { x: 95,  y: 178, orbitR: 36, opacity: 1    },
  activate: { x: 195, y: 250, orbitR: 72, opacity: 1    },
  overview: { x: 195, y: 215, orbitR: 62, opacity: 1    },
  scrolled: { x: 195, y: 82,  orbitR: 24, opacity: 0.45 },
};

const CTX_OP: Record<LandingMode, number> = {
  arrival:  1,    activate: 0.10,
  overview: 0.10, scrolled: 0.07,
};

const NEXUS_OP: Record<LandingMode, number> = {
  arrival:  1,    activate: 0.16,
  overview: 0.14, scrolled: 0.08,
};

const CS_ARC_OP: Record<LandingMode, number> = {
  arrival:  0.20, activate: 0,
  overview: 0,    scrolled: 0,
};

const CTX_ARC_OP: Record<LandingMode, number> = {
  arrival:  0.20, activate: 0.04,
  overview: 0.04, scrolled: 0.02,
};

// ─── Project-level config (E–I) ─────────────────────────────────────────────
// Agentic Insurance node state per project mode
const AI_STATE: Record<ProjectMode, { x: number; y: number; orbitR: number; opacity: number }> = {
  focus:             { x: 95,  y: 210, orbitR: 28, opacity: 1    },
  activated:         { x: 195, y: 248, orbitR: 58, opacity: 1    },
  "project-overview":{ x: 195, y: 232, orbitR: 52, opacity: 1    },
  reading:           { x: 195, y: 82,  orbitR: 22, opacity: 0.38 },
  evidence:          { x: 195, y: 82,  orbitR: 22, opacity: 0.20 },
};

// Sibling project opacity (Globality, Oracle, Sovereign Atlas)
const SIBLING_OP: Record<ProjectMode, number> = {
  focus:             1,    activated:         0.10,
  "project-overview":0.10, reading:           0.06,
  evidence:          0.04,
};

// Quiet CS parent indicator at constellation center
const CS_PARENT_OP: Record<ProjectMode, number> = {
  focus:             0.22, activated:         0.11,
  "project-overview":0.08, reading:           0.05,
  evidence:          0.03,
};

// Section star visibility (appear only when AI is in focused states)
const SECTION_STAR_OP: Record<ProjectMode, number> = {
  focus:             0,    activated:         1,
  "project-overview":0.88, reading:           0,
  evidence:          0,
};

// ─── Framework-level config (J–N) ────────────────────────────────────────────
// Model Design / Behavioral Architecture node state per framework mode
const MD_STATE: Record<FrameworkMode, { x: number; y: number; orbitR: number; opacity: number }> = {
  "fw-focus":     { x: 293, y: 220, orbitR: 26, opacity: 1    },
  "fw-activated": { x: 195, y: 248, orbitR: 56, opacity: 1    },
  "fw-overview":  { x: 195, y: 232, orbitR: 50, opacity: 1    },
  "fw-deeper":    { x: 195, y: 82,  orbitR: 22, opacity: 0.38 },
  "fw-canvas":    { x: 195, y: 82,  orbitR: 22, opacity: 0.20 },
};

// Sibling framework opacity (the other 5 when MD is focused)
const FW_SIBLING_OP: Record<FrameworkMode, number> = {
  "fw-focus":     1,    "fw-activated": 0.10,
  "fw-overview":  0.10, "fw-deeper":    0.06,
  "fw-canvas":    0.04,
};

// Quiet Frameworks parent anchor opacity
const FW_PARENT_OP: Record<FrameworkMode, number> = {
  "fw-focus":     0.20, "fw-activated": 0.10,
  "fw-overview":  0.08, "fw-deeper":    0.05,
  "fw-canvas":    0.03,
};

// Behavioral Architecture layer stars opacity (appear around MD node when activated)
const LAYER_STAR_OP: Record<FrameworkMode, number> = {
  "fw-focus":     0,    "fw-activated": 0.95,
  "fw-overview":  0.82, "fw-deeper":    0,
  "fw-canvas":    0,
};

// Portrait-authored positions for 6 Frameworks nodes (J–N)
interface FwDef { id: string; label: string; x: number; y: number; }
const FW_FRAMEWORKS: FwDef[] = [
  { id: "authority-gradient",     label: "AUTHORITY GRADIENT",     x: 90,  y: 192 },
  { id: "model-design",           label: "MODEL DESIGN",           x: 293, y: 220 },
  { id: "relational-ai-literacy", label: "RELATIONAL AI LITERACY", x: 90,  y: 360 },
  { id: "presence-navigation",    label: "PRESENCE NAVIGATION",    x: 292, y: 372 },
  { id: "regenerative-systems",   label: "REGENERATIVE SYSTEMS",   x: 118, y: 512 },
  { id: "application-kit",        label: "APPLICATION KIT",        x: 270, y: 510 },
];

// Geometric center of the 6 framework nodes — Frameworks parent anchor
const FW_CTR = { x: 192, y: 358 };

// Behavioral Architecture internal layers (from model-design.ts overviewStars angles)
const BA_LAYERS = [
  { id: "governance",            label: "GOVERNANCE",            short: "G", deg: -160 },
  { id: "constraints",           label: "CONSTRAINTS",           short: "C", deg: -128 },
  { id: "behavioral-integrity",  label: "BEHAVIORAL INTEGRITY",  short: "I", deg:  -93 },
  { id: "regenerative-capacity", label: "REGENERATIVE CAPACITY", short: "R", deg:  -30 },
];

// ─── Data ───────────────────────────────────────────────────────────────────
interface Planet { angle: number; label: string; }
interface SystemDef { id: string; label: string; color: string; orbitPath: string; planets: Planet[]; }

const SYSTEMS: SystemDef[] = [
  {
    id: "case-studies", label: "CASE STUDIES", color: T.caseStudies,
    orbitPath: "M 395 100 C 300 10 170 60 95 178 C 20 296 -40 540 -60 960",
    planets: [
      { angle: -85, label: "AGENTIC INSURANCE" },
      { angle:   5, label: "GLOBALITY" },
      { angle:  95, label: "ORACLE" },
      { angle: 185, label: "SOVEREIGN ATLAS" },
    ],
  },
  {
    id: "experiments", label: "EXPERIMENTS", color: T.experiments,
    orbitPath: "M -5 100 C 90 10 220 60 298 178 C 370 296 430 540 450 960",
    planets: [
      { angle: -95, label: "AI EVALUATION" },
      { angle: -23, label: "AUTHORITY DRIFT" },
      { angle:  55, label: "DESIGN PHILOSOPHY" },
      { angle: 133, label: "GESTALT PRINCIPLES" },
      { angle: 211, label: "THINK LIKE A DESIGNER" },
    ],
  },
  {
    id: "frameworks", label: "FRAMEWORKS", color: T.frameworks,
    orbitPath: "M -60 430 C 40 520 140 565 195 565 C 250 565 350 520 450 430",
    planets: [
      { angle: -100, label: "AUTHORITY GRADIENT" },
      { angle:  -28, label: "RELATIONAL AI LITERACY" },
      { angle:   44, label: "MODEL DESIGN" },
      { angle:  116, label: "APPLICATION KIT" },
      { angle:  188, label: "REGENERATIVE SYSTEMS" },
      { angle:  260, label: "PRESENCE NAVIGATION" },
    ],
  },
];

// Portrait-authored positions for 4 Case Studies projects (state E–I)
interface ProjectDef { id: string; label: string; x: number; y: number; }
const CS_PROJECTS: ProjectDef[] = [
  { id: "agentic-insurance", label: "AGENTIC INSURANCE", x: 95,  y: 210 },
  { id: "globality",         label: "GLOBALITY",         x: 290, y: 200 },
  { id: "oracle",            label: "ORACLE",             x: 288, y: 418 },
  { id: "sovereign-atlas",   label: "SOVEREIGN ATLAS",    x: 100, y: 422 },
];

// Geometric center of the 4 project nodes — CS parent anchor
const CS_CTR = { x: 193, y: 312 };

// Section stars orbiting the AI node (angles from agentic-insurance desktop data)
const AI_SECTIONS = [
  { id: "context",   label: "CONTEXT",   deg: -145 },
  { id: "problem",   label: "PROBLEM",   deg:  -96 },
  { id: "approach",  label: "APPROACH",  deg:  -38 },
  { id: "decisions", label: "DECISIONS", deg:   18 },
  { id: "outcomes",  label: "OUTCOMES",  deg:   72 },
  { id: "lessons",   label: "LESSONS",   deg:  145 },
];

// ─── Starfield canvas hook ───────────────────────────────────────────────────
function useStarfield(ref: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = W;
    canvas.height = H;

    type Star = { x: number; y: number; r: number; base: number; phase: number; spd: number; gold: boolean; };
    const stars: Star[] = Array.from({ length: 360 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.pow(Math.random(), 2.8) * 1.5 + 0.18,
      base:  Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.0009 + 0.0002,
      gold:  Math.random() < 0.30,
    }));

    let raf: number;
    let t = 0;
    function draw() {
      t += 16;
      ctx!.clearRect(0, 0, W, H);
      ctx!.fillStyle = T.bg;
      ctx!.fillRect(0, 0, W, H);

      const ng = ctx!.createRadialGradient(NEXUS.x, NEXUS.y, 0, NEXUS.x, NEXUS.y, 310);
      ng.addColorStop(0,    "rgba(138,174,200,0.042)");
      ng.addColorStop(0.30, "rgba(155,138,200,0.028)");
      ng.addColorStop(0.60, "rgba(106,184,138,0.014)");
      ng.addColorStop(1,    "transparent");
      ctx!.fillStyle = ng;
      ctx!.fillRect(0, 0, W, H);

      const fg = ctx!.createRadialGradient(195, 590, 0, 195, 590, 190);
      fg.addColorStop(0, "rgba(106,184,138,0.032)");
      fg.addColorStop(1, "transparent");
      ctx!.fillStyle = fg;
      ctx!.fillRect(0, 0, W, H);

      const ug = ctx!.createRadialGradient(195, 155, 0, 195, 155, 200);
      ug.addColorStop(0,   "rgba(155,138,200,0.022)");
      ug.addColorStop(0.5, "rgba(138,174,200,0.014)");
      ug.addColorStop(1,   "transparent");
      ctx!.fillStyle = ug;
      ctx!.fillRect(0, 0, W, H);

      for (const s of stars) {
        const tw = Math.sin(t * s.spd + s.phase) * 0.22;
        const o  = Math.max(0.04, Math.min(0.88, s.base + tw));
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = s.gold
          ? `rgba(232,213,163,${o})`
          : `rgba(210,218,232,${o * 0.72})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}

// ─── SVG: Nexus ─────────────────────────────────────────────────────────────
function NexusNode({ op }: { op: number }) {
  return (
    <g style={{ transform: `translate(${NEXUS.x}px,${NEXUS.y}px)`, opacity: op, transition: FADE }}>
      <circle r={130} fill="none" stroke={T.gold} strokeWidth={0.3} opacity={0.045} />
      <circle r={96}  fill="none" stroke={T.gold} strokeWidth={0.4} opacity={0.075} />
      <circle r={68}  fill="none" stroke={T.gold} strokeWidth={0.5} opacity={0.11}  />
      <circle r={60}  fill="rgba(232,213,163,0.028)" />
      <circle r={33}  fill="rgba(232,213,163,0.065)" />
      <circle r={27}  fill="none" stroke={T.gold} strokeWidth={0.8} opacity={0.17} />
      <circle r={17}  fill="rgba(232,213,163,0.12)" />
      <circle r={8}   fill={T.gold} />
      <text y={-46} textAnchor="middle" fontFamily={T.mono} fontSize={7.5}
        letterSpacing="0.22em" fill={T.gold} opacity={0.42}>
        SOVEREIGN DESIGN
      </text>
    </g>
  );
}

// ─── SVG: Planet cluster ─────────────────────────────────────────────────────
function PlanetCluster({
  planets, orbitR, color, awakened, dimmed,
}: {
  planets: Planet[]; orbitR: number; color: string; awakened: boolean; dimmed: boolean;
}) {
  const ringScale  = orbitR / 36;
  const showLabels = awakened && orbitR >= 44;

  return (
    <g>
      <g style={{ transform: `scale(${ringScale})`, transition: ANIM }}>
        <circle r={36} fill="none" stroke={color} strokeWidth={0.4} strokeDasharray="2.5 5"
          opacity={dimmed ? 0.04 : awakened ? 0.22 : 0.09}
          style={{ transition: FADE }}
        />
      </g>
      {planets.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const lpx = Math.cos(rad) * orbitR;
        const lpy = Math.sin(rad) * orbitR;
        const ldx = Math.cos(rad);
        const ldy = Math.sin(rad);
        const ta  = ldx > 0.28 ? "start" : ldx < -0.28 ? "end" : "middle";
        const db  = ldy > 0.28 ? "hanging" : ldy < -0.28 ? "auto" : "middle";
        return (
          <g key={i} style={{ transform: `translate(${lpx}px,${lpy}px)`, transition: ANIM }}>
            <circle r={awakened ? 9.5 : 5.5} fill={color}
              opacity={dimmed ? 0.03 : awakened ? 0.16 : 0.07}
              style={{ transition: FADE }} />
            <circle r={awakened ? 3 : 1.7} fill={color}
              opacity={dimmed ? 0.18 : awakened ? 1 : 0.52}
              style={{ transition: FADE }} />
            {showLabels && (
              <text x={ldx * 7.5} y={ldy * 7.5}
                textAnchor={ta} dominantBaseline={db}
                fontFamily={T.mono} fontSize={4.8} fill={color} opacity={0.72}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

// ─── SVG: System node ────────────────────────────────────────────────────────
function SystemNode({
  sys, cx, cy, orbitR, awakened, dimmed, showLabel,
}: {
  sys: SystemDef; cx: number; cy: number; orbitR: number;
  awakened: boolean; dimmed: boolean; showLabel: boolean;
}) {
  const atmoR  = awakened ? BASE_R * 1.45 : BASE_R * 0.82;
  const outerR = awakened ? BASE_R * 3.2  : BASE_R * 1.9;
  const coreR  = awakened ? BASE_R * 0.52 : BASE_R * 0.36;

  return (
    <g style={{ transform: `translate(${cx}px,${cy}px)`, transition: ANIM }}>
      <PlanetCluster planets={sys.planets} orbitR={orbitR}
        color={sys.color} awakened={awakened} dimmed={dimmed} />
      <circle r={outerR} fill={sys.color}
        opacity={awakened ? 0.08 : 0.032} style={{ transition: FADE }} />
      <circle r={atmoR}  fill={sys.color}
        opacity={awakened ? 0.18 : 0.082} style={{ transition: FADE }} />
      <circle r={28} fill="none" stroke={sys.color} strokeWidth={0.5}
        opacity={awakened ? 0.32 : 0.13} style={{ transition: FADE }} />
      <circle r={42} fill="none" stroke={sys.color} strokeWidth={0.3}
        opacity={awakened ? 0.18 : 0.07} style={{ transition: FADE }} />
      <circle r={coreR} fill={sys.color}
        opacity={awakened ? 1 : 0.88} style={{ transition: FADE }} />
      {showLabel && (
        <text y={BASE_R * 2.2 + 14} textAnchor="middle"
          fontFamily={T.mono} fontSize={8} letterSpacing="0.14em"
          fill={sys.color} opacity={0.38}>
          {sys.label}
        </text>
      )}
    </g>
  );
}

// ─── SVG: CS parent anchor (project constellation center) ────────────────────
function CSParentNode({ op }: { op: number }) {
  const c = T.caseStudies;
  return (
    <g style={{ transform: `translate(${CS_CTR.x}px,${CS_CTR.y}px)`, opacity: op, transition: FADE }}>
      <circle r={68} fill="none" stroke={c} strokeWidth={0.3} opacity={0.06} />
      <circle r={44} fill="none" stroke={c} strokeWidth={0.35} opacity={0.09} />
      <circle r={26} fill="none" stroke={c} strokeWidth={0.4} opacity={0.12} />
      <circle r={10} fill={c} opacity={0.42} />
      <circle r={4}  fill={c} opacity={0.85} />
      <text y={26} textAnchor="middle" fontFamily={T.mono} fontSize={6.5}
        letterSpacing="0.2em" fill={c} opacity={0.35}>
        CASE STUDIES
      </text>
    </g>
  );
}

// ─── SVG: Project node ───────────────────────────────────────────────────────
function ProjectNode({
  label, cx, cy, awakened, dimmed, showLabel, onClick,
}: {
  label: string; cx: number; cy: number;
  awakened: boolean; dimmed: boolean; showLabel: boolean;
  onClick?: () => void;
}) {
  const c      = T.caseStudies;
  const coreR  = awakened ? 8  : 5;
  const innerR = awakened ? 22 : 14;
  const outerR = awakened ? 38 : 22;

  return (
    <g style={{ transform: `translate(${cx}px,${cy}px)`, transition: ANIM }}>
      {/* 44×44 touch target */}
      <circle r={22} fill="transparent" onClick={onClick} style={{ cursor: "pointer" }} />
      <circle r={outerR} fill={c}
        opacity={dimmed ? 0.02 : awakened ? 0.10 : 0.05}
        style={{ transition: FADE }} />
      <circle r={innerR} fill={c}
        opacity={dimmed ? 0.04 : awakened ? 0.20 : 0.11}
        style={{ transition: FADE }} />
      <circle r={awakened ? 28 : 18} fill="none" stroke={c} strokeWidth={0.45}
        opacity={dimmed ? 0.03 : awakened ? 0.28 : 0.10}
        style={{ transition: FADE }} />
      <circle r={coreR} fill={c}
        opacity={dimmed ? 0.20 : 1}
        style={{ transition: FADE }} />
      {showLabel && (
        <text y={coreR + 16} textAnchor="middle"
          fontFamily={T.mono} fontSize={7.5} letterSpacing="0.14em"
          fill={c} opacity={dimmed ? 0.14 : 0.55}
          style={{ transition: FADE }}>
          {label}
        </text>
      )}
    </g>
  );
}

// ─── SVG: Section stars (orbit around AI node) ───────────────────────────────
function SectionStars({
  aiX, aiY, radius, opacity,
}: {
  aiX: number; aiY: number; radius: number; opacity: number;
}) {
  const c = T.caseStudies;
  return (
    <g style={{ opacity, transition: FADE }}>
      {/* Dashed orbit ring */}
      <circle cx={aiX} cy={aiY} r={radius} fill="none"
        stroke={c} strokeWidth={0.4} strokeDasharray="2.5 5.5" opacity={0.18} />

      {AI_SECTIONS.map((sec) => {
        const rad = (sec.deg * Math.PI) / 180;
        const sx  = aiX + Math.cos(rad) * radius;
        const sy  = aiY + Math.sin(rad) * radius;
        const ldx = Math.cos(rad);
        const ldy = Math.sin(rad);
        const ta  = ldx > 0.28 ? "start" : ldx < -0.28 ? "end" : "middle";
        const db  = ldy > 0.28 ? "hanging" : ldy < -0.28 ? "auto" : "middle";
        const isApproach = sec.id === "approach";

        return (
          <g key={sec.id} style={{ transform: `translate(${sx}px,${sy}px)`, transition: ANIM }}>
            {/* Line from AI center */}
            <line
              x1={-Math.cos(rad) * (radius - 6)} y1={-Math.sin(rad) * (radius - 6)}
              x2={0} y2={0}
              stroke={c} strokeWidth={0.3} opacity={0.12}
            />
            <circle r={isApproach ? 3.5 : 2} fill={c}
              opacity={isApproach ? 1 : 0.55} />
            <circle r={isApproach ? 9 : 5.5} fill={c}
              opacity={isApproach ? 0.16 : 0.06} />
            <text x={ldx * 7} y={ldy * 7}
              textAnchor={ta} dominantBaseline={db}
              fontFamily={T.mono} fontSize={5} letterSpacing="0.12em"
              fill={c} opacity={isApproach ? 0.80 : 0.40}>
              {sec.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Constellation connections (state E) ─────────────────────────────────────
function ConstellationConnections({ op }: { op: number }) {
  const c = T.caseStudies;
  const [ai, gl, or_, sa] = CS_PROJECTS;
  return (
    <g style={{ opacity: op, transition: FADE }}>
      {/* Outer rectangle edges */}
      <line x1={ai.x} y1={ai.y} x2={gl.x} y2={gl.y} stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.16} />
      <line x1={gl.x} y1={gl.y} x2={or_.x} y2={or_.y} stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.14} />
      <line x1={or_.x} y1={or_.y} x2={sa.x} y2={sa.y} stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.16} />
      <line x1={sa.x} y1={sa.y} x2={ai.x} y2={ai.y} stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.14} />
      {/* Cross diagonal */}
      <line x1={gl.x} y1={gl.y} x2={sa.x} y2={sa.y} stroke={c} strokeWidth={0.25} strokeDasharray="2 10" opacity={0.07} />
      {/* Radial lines toward center */}
      {CS_PROJECTS.map((p) => (
        <line key={p.id}
          x1={p.x} y1={p.y} x2={CS_CTR.x} y2={CS_CTR.y}
          stroke={c} strokeWidth={0.25} opacity={0.05} />
      ))}
    </g>
  );
}

// ─── Overview: Initial (State C) ─────────────────────────────────────────────
function OverviewInitial({ onExplore }: { onExplore: () => void }) {
  const c = T.caseStudies;
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      borderTop: `0.5px solid rgba(138,174,200,0.22)`,
      background: "rgba(5,5,10,0.91)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      padding: "20px 28px 52px",
      boxSizing: "border-box",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: "0.24em", color: c, opacity: 0.9 }}>
          CASE STUDIES
        </div>
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, opacity: 0.55 }} />
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.18em", color: T.gold, opacity: 0.40, marginBottom: 14 }}>
        4 PROJECTS
      </div>
      <div style={{ height: 0.5, background: "rgba(232,213,163,0.10)", marginBottom: 14 }} />
      <div style={{ fontFamily: T.serif, fontSize: 14, color: T.gold, opacity: 0.64, lineHeight: 1.58, marginBottom: 20 }}>
        Real-world product work, decisions, and outcomes.
      </div>
      <div onClick={onExplore} style={{
        fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.18em", color: c, opacity: 0.88, cursor: "pointer",
      }}>
        EXPLORE →
      </div>
    </div>
  );
}

// ─── Overview: Scrolled (State D) ────────────────────────────────────────────
function OverviewScrolled({ onExplore }: { onExplore: () => void }) {
  const c = T.caseStudies;

  const projects = [
    { name: "AGENTIC INSURANCE",  desc: "Exploring where AI could support insurance claim decisions — and where human authority had to remain." },
    { name: "GLOBALITY",          desc: "Redesigning an AI-assisted procurement platform around orientation, work states, and next decisions." },
    { name: "ORACLE",             desc: "Enterprise software product strategy and positioning under real organizational constraints." },
    { name: "SOVEREIGN ATLAS",    desc: "This navigational system — its design, structure, and the decisions made in building it." },
  ];

  return (
    <div style={{
      position: "absolute",
      top: 0, bottom: 0, left: 0, right: 0,
      background: `linear-gradient(
        to bottom,
        rgba(5,5,10,0.22) 0px,
        rgba(5,5,10,0.62) 70px,
        rgba(5,5,10,0.92) 140px,
        rgba(5,5,10,0.97) 200px
      )`,
      overflowY: "auto",
      overflowX: "hidden",
      boxSizing: "border-box",
    }}>
      <div style={{ height: 130 }} />
      <div style={{
        padding: "0 28px", marginBottom: 6,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.22em", color: c, opacity: 0.50 }}>
          CASE STUDIES
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.16em", color: T.gold, opacity: 0.28 }}>
          4 PROJECTS
        </div>
      </div>
      <div style={{ margin: "0 28px 24px", height: 0.5, background: "rgba(232,213,163,0.09)" }} />
      <div style={{ padding: "0 28px" }}>
        {[
          { label: "WHAT",           body: "A portfolio of four product design engagements. Real constraints, real stakeholders, and decisions made under genuine uncertainty and time pressure." },
          { label: "WHY",            body: "Design is consequential. Choices made in ambiguous situations shape outcomes more than technical execution. Process over artifacts." },
          { label: "RESEARCH FOCUS", body: "How design authority is established and maintained across situations where requirements are incomplete, stakeholders disagree, and constraints shift." },
          { label: "KEY DISCOVERY",  body: "Sustainable design authority emerges from clarity about process — not confidence in output. The decisions are the artifact." },
        ].map(({ label, body }) => (
          <div key={label} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.20em", color: T.gold, opacity: 0.36, marginBottom: 7 }}>
              {label}
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 13.5, color: T.gold, opacity: 0.66, lineHeight: 1.62 }}>
              {body}
            </div>
          </div>
        ))}
      </div>
      <div style={{ margin: "6px 28px 22px", height: 0.5, background: "rgba(232,213,163,0.09)" }} />
      <div style={{ padding: "0 28px" }}>
        <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.20em", color: T.gold, opacity: 0.30, marginBottom: 18 }}>
          CONTAINED PROJECTS
        </div>
        {projects.map((p, i) => (
          <div key={p.name} style={{
            display: "flex", gap: 12, alignItems: "flex-start",
            marginBottom: i < projects.length - 1 ? 18 : 0,
            paddingBottom: i < projects.length - 1 ? 18 : 0,
            borderBottom: i < projects.length - 1 ? "0.5px solid rgba(232,213,163,0.07)" : "none",
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: c, opacity: 0.60, marginTop: 5, flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em", color: c, opacity: 0.78, marginBottom: 4 }}>
                {p.name}
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 12.5, color: T.gold, opacity: 0.52, lineHeight: 1.56 }}>
                {p.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: "28px 28px 60px", borderTop: "0.5px solid rgba(138,174,200,0.12)", marginTop: 28 }}>
        <div onClick={onExplore} style={{
          fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.18em", color: c, opacity: 0.86, cursor: "pointer",
        }}>
          EXPLORE →
        </div>
      </div>
    </div>
  );
}

// ─── Focus: Top bar (E–G) ────────────────────────────────────────────────────
function FocusTopBar({ onBack }: { onBack: () => void }) {
  const c = T.caseStudies;
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      padding: "22px 22px 0",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      pointerEvents: "none",
    }}>
      <div onClick={onBack} style={{
        display: "flex", alignItems: "center", gap: 6,
        pointerEvents: "auto", cursor: "pointer", minHeight: 44,
      }}>
        <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", color: T.gold, opacity: 0.40 }}>
          ‹ OVERVIEW
        </span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", color: c, opacity: 0.62 }}>
        CASE STUDIES
      </div>
    </div>
  );
}

// ─── Project overview surface (State G) ──────────────────────────────────────
function ProjectOverviewSurface({ onExplore }: { onExplore: () => void }) {
  const c = T.caseStudies;
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      boxSizing: "border-box",
      borderTop: `0.5px solid rgba(138,174,200,0.24)`,
      background: "rgba(5,5,10,0.92)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      padding: "22px 28px 52px",
    }}>
      {/* Identity row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 3 }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.20em", color: c, opacity: 0.92 }}>
          AGENTIC INSURANCE
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.16em", color: T.gold, opacity: 0.28, marginTop: 2 }}>
          CASE STUDY
        </div>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.16em", color: T.gold, opacity: 0.30, marginBottom: 14 }}>
        2024 · PRODUCT DESIGNER
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["HUMAN AUTHORITY", "AI SUPPORT"].map((tag) => (
          <div key={tag} style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.16em",
            color: c, opacity: 0.62,
            border: `0.5px solid rgba(138,174,200,0.28)`,
            borderRadius: 2, padding: "3px 8px",
          }}>
            {tag}
          </div>
        ))}
      </div>

      <div style={{ height: 0.5, background: "rgba(232,213,163,0.09)", marginBottom: 16 }} />

      {/* WHAT */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.20em", color: T.gold, opacity: 0.32, marginBottom: 6 }}>
          WHAT
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 13, color: T.gold, opacity: 0.60, lineHeight: 1.60 }}>
          A self-directed exploration of how AI-assisted tools might support claim adjusters and customers during complex insurance decisions.
        </div>
      </div>

      {/* Sections preview */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {["CONTEXT", "PROBLEM", "APPROACH", "DECISIONS", "OUTCOMES", "LESSONS"].map((sec, i) => (
          <div key={sec} style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.14em",
            color: c, opacity: 0.38,
          }}>
            {String(i + 1).padStart(2, "0")} {sec}
            {i < 5 && <span style={{ opacity: 0.4, marginLeft: 8 }}>·</span>}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div onClick={onExplore} style={{
        fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.18em",
        color: c, opacity: 0.88, cursor: "pointer",
      }}>
        EXPLORE →
      </div>
    </div>
  );
}

// ─── Reading surface (State H) ───────────────────────────────────────────────
function ReadingSurface({ onEvidence, onBack }: { onEvidence: () => void; onBack: () => void }) {
  const c = T.caseStudies;
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
      background: `linear-gradient(
        to bottom,
        rgba(5,5,10,0.18) 0px,
        rgba(5,5,10,0.72) 80px,
        rgba(5,5,10,0.95) 160px,
        rgba(5,5,10,0.98) 220px
      )`,
      boxSizing: "border-box",
    }}>
      {/* Reading top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "22px 22px 0",
        display: "flex", justifyContent: "space-between", alignItems: "flex-start",
      }}>
        <div onClick={onBack} style={{
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em",
          color: T.gold, opacity: 0.36, cursor: "pointer", minHeight: 44,
          display: "flex", alignItems: "center",
        }}>
          ‹ OVERVIEW
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", color: c, opacity: 0.72 }}>
            AGENTIC INSURANCE
          </div>
          <div
            onClick={() => setShowPicker((v) => !v)}
            style={{
              fontFamily: T.mono, fontSize: 7, letterSpacing: "0.16em",
              color: T.gold, opacity: 0.38, marginTop: 3, cursor: "pointer",
            }}
          >
            · · ·
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: "absolute", top: 100, bottom: 0, left: 0, right: 0,
        overflowY: "auto", padding: "0 28px 80px", boxSizing: "border-box",
      }}>
        {/* Section indicator */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          marginBottom: 18, paddingBottom: 14,
          borderBottom: "0.5px solid rgba(138,174,200,0.14)",
        }}>
          <div
            onClick={() => setShowPicker((v) => !v)}
            style={{
              fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em", color: c, opacity: 0.72, cursor: "pointer",
            }}
          >
            03 / 06 · APPROACH
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 7, color: T.gold, opacity: 0.28 }}>
            ↕
          </div>
        </div>

        {/* Section title */}
        <div style={{ fontFamily: T.serif, fontSize: 22, color: T.gold, opacity: 0.82, lineHeight: 1.30, marginBottom: 8 }}>
          Using AI to investigate the role, not impersonate validation
        </div>
        <div style={{ height: 0.5, background: "rgba(232,213,163,0.10)", marginBottom: 20 }} />

        {/* Body paragraphs — real content */}
        {[
          "I used public research, job descriptions, workflow documentation, industry material, and AI-assisted role simulation to build a more complete picture of the claim-adjuster experience.",
          "The AI-generated persona was not treated as a substitute for a real person. It was used as a research instrument — a way to ask more specific questions about the role, pressure-test assumptions, and identify areas I needed to investigate further.",
          "From that research, I mapped a customer and adjuster journey and explored where AI-assisted tools might support the process.",
        ].map((para, i) => (
          <div key={i} style={{
            fontFamily: T.serif, fontSize: 14, color: T.gold, opacity: 0.64,
            lineHeight: 1.68, marginBottom: 18,
          }}>
            {para}
          </div>
        ))}

        {/* Evidence block */}
        <div
          onClick={onEvidence}
          style={{
            borderRadius: 4,
            border: `0.5px solid rgba(138,174,200,0.22)`,
            overflow: "hidden",
            marginBottom: 22,
            cursor: "pointer",
          }}
        >
          <img
            src={evidenceImg}
            alt="Adjuster Claims Overview"
            style={{ width: "100%", height: 110, objectFit: "cover", display: "block", opacity: 0.85 }}
          />
          <div style={{ background: "rgba(5,5,10,0.85)", padding: "10px 14px 12px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.16em", color: c, opacity: 0.72 }}>
                03 · ADJUSTER CLAIMS OVERVIEW
              </div>
              <div style={{ fontFamily: T.mono, fontSize: 7, color: c, opacity: 0.42 }}>→ INSPECT</div>
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.12em", color: T.gold, opacity: 0.30 }}>
              UI CONCEPT
            </div>
          </div>
        </div>

        {/* Continuation */}
        <div style={{ fontFamily: T.serif, fontSize: 14, color: T.gold, opacity: 0.60, lineHeight: 1.68, marginBottom: 18 }}>
          The concepts focused on areas such as summarizing claim information, identifying missing or conflicting evidence,
          surfacing jurisdictional or policy considerations, explaining why a case may require escalation, helping the adjuster
          compare possible next steps, and preserving a clear record of how a decision was reached.
        </div>

        {/* Insight */}
        <div style={{
          borderLeft: `1.5px solid rgba(138,174,200,0.30)`,
          paddingLeft: 16, marginBottom: 8,
        }}>
          <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.18em", color: c, opacity: 0.45, marginBottom: 8 }}>
            SECTION INSIGHT
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 14.5, color: T.gold, opacity: 0.72, lineHeight: 1.60, fontStyle: "italic" }}>
            "AI was most useful when it helped me ask better questions about an unfamiliar role — not when it pretended to be the final source of truth."
          </div>
        </div>
      </div>

      {/* Section picker overlay */}
      {showPicker && (
        <div
          onClick={() => setShowPicker(false)}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            background: "rgba(5,5,10,0.96)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            borderTop: `0.5px solid rgba(138,174,200,0.22)`,
            padding: "16px 0 48px",
            boxSizing: "border-box",
          }}
        >
          <div style={{
            fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.22em",
            color: T.gold, opacity: 0.28, padding: "0 28px", marginBottom: 12,
          }}>
            SECTIONS
          </div>
          {[
            ["01", "CONTEXT"],
            ["02", "PROBLEM"],
            ["03", "APPROACH"],
            ["04", "DECISIONS"],
            ["05", "OUTCOMES"],
            ["06", "LESSONS"],
          ].map(([num, name]) => (
            <div
              key={num}
              onClick={() => setShowPicker(false)}
              style={{
                padding: "13px 28px",
                display: "flex", alignItems: "center", gap: 16,
                borderBottom: `0.5px solid rgba(138,174,200,0.07)`,
                cursor: "pointer",
              }}
            >
              <div style={{ fontFamily: T.mono, fontSize: 8, color: c, opacity: 0.35, minWidth: 20 }}>
                {num}
              </div>
              <div style={{
                fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.16em",
                color: name === "APPROACH" ? c : T.gold,
                opacity: name === "APPROACH" ? 0.90 : 0.44,
              }}>
                {name}
              </div>
              {name === "APPROACH" && (
                <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: c, opacity: 0.7 }} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Evidence viewer (State I) ───────────────────────────────────────────────
function EvidenceViewer({ onClose }: { onClose: () => void }) {
  const c = T.caseStudies;
  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
      background: "rgba(5,5,10,0.97)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Evidence top bar */}
      <div style={{
        padding: "22px 22px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
        borderBottom: `0.5px solid rgba(138,174,200,0.12)`,
      }}>
        <div onClick={onClose} style={{
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em",
          color: T.gold, opacity: 0.36, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 6,
          minHeight: 44, paddingRight: 12,
        }}>
          ‹ APPROACH
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.16em", color: c, opacity: 0.55 }}>
            03 · ADJUSTER CLAIMS OVERVIEW
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.14em", color: T.gold, opacity: 0.28, marginTop: 2 }}>
            UI CONCEPT
          </div>
        </div>
      </div>

      {/* Evidence image — full width, allow inspection height */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 60px" }}>
        <img
          src={evidenceImg}
          alt="Adjuster Claims Overview — a unified claims workspace supporting triage and faster orientation"
          style={{ width: "100%", display: "block", maxHeight: 520, objectFit: "contain" }}
        />

        {/* Pinch affordance */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          padding: "10px 0 18px",
          borderBottom: `0.5px solid rgba(138,174,200,0.10)`,
        }}>
          <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.18em", color: T.gold, opacity: 0.22 }}>
            PINCH TO INSPECT
          </div>
        </div>

        {/* Caption */}
        <div style={{ padding: "18px 28px 0" }}>
          <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.16em", color: c, opacity: 0.38, marginBottom: 8 }}>
            CAPTION
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 13, color: T.gold, opacity: 0.54, lineHeight: 1.64 }}>
            A unified claims workspace intended to support triage, workload awareness, and faster orientation before the adjuster begins deeper analysis.
          </div>
        </div>

        {/* Spatial context */}
        <div style={{
          margin: "18px 28px 0",
          padding: "12px 0",
          borderTop: `0.5px solid rgba(232,213,163,0.07)`,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: c, opacity: 0.45 }} />
          <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.16em", color: c, opacity: 0.35 }}>
            AGENTIC INSURANCE · 03 APPROACH
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SVG: Frameworks parent anchor ───────────────────────────────────────────
function FWParentNode({ op }: { op: number }) {
  const c = T.frameworks;
  return (
    <g style={{ transform: `translate(${FW_CTR.x}px,${FW_CTR.y}px)`, opacity: op, transition: FADE }}>
      <circle r={72} fill="none" stroke={c} strokeWidth={0.3} opacity={0.05} />
      <circle r={48} fill="none" stroke={c} strokeWidth={0.35} opacity={0.08} />
      <circle r={28} fill="none" stroke={c} strokeWidth={0.4} opacity={0.12} />
      <circle r={10} fill={c} opacity={0.40} />
      <circle r={4}  fill={c} opacity={0.80} />
      <text y={26} textAnchor="middle" fontFamily={T.mono} fontSize={6.5}
        letterSpacing="0.2em" fill={c} opacity={0.32}>
        FRAMEWORKS
      </text>
    </g>
  );
}

// ─── SVG: Framework node (in J–N constellation) ──────────────────────────────
function FrameworkNode({
  label, cx, cy, awakened, onClick,
}: {
  label: string; cx: number; cy: number;
  awakened: boolean; onClick?: () => void;
}) {
  const c = T.frameworks;
  const coreR  = awakened ? 8  : 5;
  const innerR = awakened ? 20 : 13;
  const outerR = awakened ? 36 : 20;

  return (
    <g style={{ transform: `translate(${cx}px,${cy}px)`, transition: ANIM }}>
      <circle r={22} fill="transparent" onClick={onClick} style={{ cursor: "pointer" }} />
      <circle r={outerR} fill={c} opacity={awakened ? 0.09 : 0.04}  style={{ transition: FADE }} />
      <circle r={innerR} fill={c} opacity={awakened ? 0.19 : 0.10}  style={{ transition: FADE }} />
      <circle r={awakened ? 26 : 16} fill="none" stroke={c} strokeWidth={0.5}
        opacity={awakened ? 0.30 : 0.09} style={{ transition: FADE }} />
      <circle r={coreR} fill={c} style={{ transition: FADE }} />
      <text y={coreR + 16} textAnchor="middle"
        fontFamily={T.mono} fontSize={7.5} letterSpacing="0.13em"
        fill={c} opacity={0.52} style={{ transition: FADE }}>
        {label}
      </text>
    </g>
  );
}

// ─── SVG: Frameworks constellation connections (J) ────────────────────────────
function FwConstellationConnections({ op }: { op: number }) {
  const c = T.frameworks;
  const [ag, md, ral, pn, rs, ak] = FW_FRAMEWORKS;
  return (
    <g style={{ opacity: op, transition: FADE }}>
      {/* Horizontal pairs */}
      <line x1={ag.x} y1={ag.y}  x2={md.x}  y2={md.y}  stroke={c} strokeWidth={0.32} strokeDasharray="3 7" opacity={0.16} />
      <line x1={ral.x} y1={ral.y} x2={pn.x} y2={pn.y} stroke={c} strokeWidth={0.32} strokeDasharray="3 7" opacity={0.14} />
      <line x1={rs.x}  y1={rs.y}  x2={ak.x}  y2={ak.y}  stroke={c} strokeWidth={0.32} strokeDasharray="3 7" opacity={0.16} />
      {/* Vertical connections — left column */}
      <line x1={ag.x} y1={ag.y}  x2={ral.x} y2={ral.y} stroke={c} strokeWidth={0.28} strokeDasharray="2 9" opacity={0.10} />
      <line x1={ral.x} y1={ral.y} x2={rs.x}  y2={rs.y}  stroke={c} strokeWidth={0.28} strokeDasharray="2 9" opacity={0.10} />
      {/* Vertical connections — right column */}
      <line x1={md.x} y1={md.y}  x2={pn.x}  y2={pn.y}  stroke={c} strokeWidth={0.28} strokeDasharray="2 9" opacity={0.09} />
      {/* Cross diagonal — regenerative systems ↔ model design (shared concept) */}
      <line x1={rs.x} y1={rs.y}  x2={md.x}  y2={md.y}  stroke={c} strokeWidth={0.22} strokeDasharray="1.5 11" opacity={0.06} />
      {/* Radial lines toward center */}
      {FW_FRAMEWORKS.map((f) => (
        <line key={f.id} x1={f.x} y1={f.y} x2={FW_CTR.x} y2={FW_CTR.y} stroke={c} strokeWidth={0.22} opacity={0.04} />
      ))}
    </g>
  );
}

// ─── SVG: Behavioral Architecture layer stars ─────────────────────────────────
function LayerStars({
  mdX, mdY, radius, opacity,
}: {
  mdX: number; mdY: number; radius: number; opacity: number;
}) {
  const c = T.frameworks;
  return (
    <g style={{ opacity, transition: FADE }}>
      {/* Partial arc orbit (130° sweep, upper-left cluster) */}
      <path
        d={(() => {
          const startDeg = -160;
          const endDeg   =  -30;
          const sx = mdX + radius * Math.cos((startDeg * Math.PI) / 180);
          const sy = mdY + radius * Math.sin((startDeg * Math.PI) / 180);
          const ex = mdX + radius * Math.cos((endDeg   * Math.PI) / 180);
          const ey = mdY + radius * Math.sin((endDeg   * Math.PI) / 180);
          return `M ${sx} ${sy} A ${radius} ${radius} 0 0 1 ${ex} ${ey}`;
        })()}
        fill="none" stroke={c} strokeWidth={0.4} strokeDasharray="2.5 5.5" opacity={0.18}
      />
      {BA_LAYERS.map((layer) => {
        const rad = (layer.deg * Math.PI) / 180;
        const lx  = mdX + Math.cos(rad) * radius;
        const ly  = mdY + Math.sin(rad) * radius;
        const ldx = Math.cos(rad);
        const ldy = Math.sin(rad);
        const ta  = ldx > 0.28 ? "start" : ldx < -0.28 ? "end" : "middle";
        const db  = ldy > 0.28 ? "hanging" : ldy < -0.28 ? "auto" : "middle";

        return (
          <g key={layer.id} style={{ transform: `translate(${lx}px,${ly}px)`, transition: ANIM }}>
            <line
              x1={-Math.cos(rad) * (radius - 6)} y1={-Math.sin(rad) * (radius - 6)}
              x2={0} y2={0}
              stroke={c} strokeWidth={0.3} opacity={0.12}
            />
            <circle r={2.5} fill={c} opacity={0.65} />
            <circle r={8}   fill={c} opacity={0.09} />
            <text x={ldx * 7} y={ldy * 7}
              textAnchor={ta} dominantBaseline={db}
              fontFamily={T.mono} fontSize={5} letterSpacing="0.12em"
              fill={c} opacity={0.52}>
              {layer.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// ─── Focus: Frameworks top bar (J–L) ─────────────────────────────────────────
function FWFocusTopBar({ onBack }: { onBack: () => void }) {
  const c = T.frameworks;
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0,
      padding: "22px 22px 0",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      pointerEvents: "none",
    }}>
      <div onClick={onBack} style={{
        display: "flex", alignItems: "center",
        pointerEvents: "auto", cursor: "pointer", minHeight: 44,
      }}>
        <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", color: T.gold, opacity: 0.38 }}>
          ‹ ATLAS
        </span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", color: c, opacity: 0.62 }}>
        FRAMEWORKS
      </div>
    </div>
  );
}

// ─── Behavioral Architecture overview surface (State L) ───────────────────────
function BehavioralOverviewSurface({ onExplore }: { onExplore: () => void }) {
  const c = T.frameworks;
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      boxSizing: "border-box",
      borderTop: `0.5px solid rgba(106,184,138,0.24)`,
      background: "rgba(5,5,10,0.92)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
      padding: "22px 28px 52px",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 3 }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.20em", color: c, opacity: 0.92 }}>
          BEHAVIORAL ARCHITECTURE
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.14em", color: T.gold, opacity: 0.28, marginTop: 2 }}>
          FRAMEWORK
        </div>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.16em", color: T.gold, opacity: 0.30, marginBottom: 14 }}>
        CORE FRAMEWORK · SYSTEM CHARACTER
      </div>

      {/* Layers */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {BA_LAYERS.map((layer) => (
          <div key={layer.id} style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.14em",
            color: c, opacity: 0.55,
            border: `0.5px solid rgba(106,184,138,0.26)`,
            borderRadius: 2, padding: "3px 8px",
          }}>
            {layer.label}
          </div>
        ))}
      </div>

      <div style={{ height: 0.5, background: "rgba(232,213,163,0.09)", marginBottom: 16 }} />

      {[
        {
          label: "WHAT",
          body: "A framework for designing the structures around an AI model that give its behavior a stable, trustworthy shape.",
        },
        {
          label: "KEY DISCOVERY",
          body: "Trustworthy behavior does not come from the model alone. It emerges from the architecture governing what the system may do, how its behavior is evaluated, and how it recovers when alignment begins to drift.",
        },
      ].map(({ label, body }) => (
        <div key={label} style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.20em", color: T.gold, opacity: 0.30, marginBottom: 6 }}>
            {label}
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 13, color: T.gold, opacity: 0.58, lineHeight: 1.60 }}>
            {body}
          </div>
        </div>
      ))}

      <div onClick={onExplore} style={{
        fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.18em",
        color: c, opacity: 0.88, cursor: "pointer", marginTop: 6,
      }}>
        EXPLORE →
      </div>
    </div>
  );
}

// ─── Behavioral Architecture deeper view (State M) ────────────────────────────
function BehavioralDeeperView({ onCanvas, onBack }: { onCanvas: () => void; onBack: () => void }) {
  const c = T.frameworks;
  const [active, setActive] = useState<string>("governance");

  const layers: { id: string; label: string; short: string; subtitle: string; content: string; insight: string; hasEvidence: boolean; }[] = [
    {
      id: "governance", label: "GOVERNANCE", short: "G",
      subtitle: "Who has the authority to shape and redirect behavior.",
      content: "Governance defines who may establish the system's purpose, change its operating rules, evaluate its behavior, and intervene when it begins to drift. It turns responsibility into an explicit structure instead of leaving it distributed across product decisions, model settings, and informal team assumptions.\n\nThis is related to Authority Gradient, but it asks a different question. Authority Gradient locates where meaningful human authority should remain. Governance determines how that authority is exercised: who can redirect the system, which changes require review, what conditions trigger escalation, and where accountability ultimately sits.",
      insight: "If no one can clearly explain who may change or stop the system, its behavior is already being governed by something else.",
      hasEvidence: true,
    },
    {
      id: "constraints", label: "CONSTRAINTS", short: "C",
      subtitle: "Why trustworthy systems require deliberate limits.",
      content: "Constraints define what the system may do, what it must not do, and which conditions require confirmation, refusal, or escalation. They include capability boundaries, prohibited actions, confidence thresholds, required evidence, and clear statements about the limits of the system's role.\n\nConstraints are often treated as restrictions added after capability has been designed. In Behavioral Architecture, they are part of the system's identity. A system becomes more understandable when users can anticipate where it will act, where it will pause, and where human judgment must re-enter.",
      insight: "A system without meaningful constraints does not have greater intelligence. It has less definition.",
      hasEvidence: false,
    },
    {
      id: "behavioral-integrity", label: "BEHAVIORAL INTEGRITY", short: "I",
      subtitle: "Whether the system behaves like the system it claims to be.",
      content: "Behavioral Integrity examines whether the system's actual conduct remains consistent with its stated purpose and operating boundaries across different users, contexts, and levels of pressure. It compares what the system promises with what it repeatedly does.\n\nTeams must observe authority creep, assumption disclosure, boundary violations, inconsistent refusals, changes introduced by updates, and differences between routine and high-risk behavior. A system may remain accurate while becoming less transparent, more forceful, or harder to redirect.",
      insight: "Alignment is not proven by what the system says about itself. It is revealed through repeated behavior.",
      hasEvidence: false,
    },
    {
      id: "regenerative-capacity", label: "REGENERATIVE CAPACITY", short: "R",
      subtitle: "How the system returns when alignment begins to drift.",
      content: "Regenerative Capacity determines what happens after behavioral integrity begins to fail. It includes detecting the affected layer, containing harmful behavior, restoring prior boundaries, correcting memory or context, and re-entering safely after a failure.\n\nRecovery should not quietly rewrite the system's purpose in order to make a failure disappear. It should preserve a record of what changed, clarify which intervention restored alignment, and escalate when the system cannot repair itself within its legitimate authority.",
      insight: "A trustworthy system is not one that never fails. It is one that can recover without hiding the failure or repeating its cause.",
      hasEvidence: false,
    },
  ];

  const current = layers.find((l) => l.id === active) ?? layers[0];

  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
      background: `linear-gradient(
        to bottom,
        rgba(5,5,10,0.15) 0px,
        rgba(5,5,10,0.72) 80px,
        rgba(5,5,10,0.96) 160px,
        rgba(5,5,10,0.99) 220px
      )`,
      boxSizing: "border-box",
    }}>
      {/* Top bar */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0,
        padding: "22px 22px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div onClick={onBack} style={{
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em",
          color: T.gold, opacity: 0.36, cursor: "pointer",
          display: "flex", alignItems: "center", minHeight: 44,
        }}>
          ‹ OVERVIEW
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.16em", color: c, opacity: 0.68 }}>
          BEHAVIORAL ARCHITECTURE
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{
        position: "absolute", top: 100, bottom: 0, left: 0, right: 0,
        overflowY: "auto", boxSizing: "border-box",
      }}>
        {/* Layer cycle navigator — spatial, not tabs */}
        <div style={{
          padding: "0 22px 16px",
          borderBottom: `0.5px solid rgba(106,184,138,0.12)`,
          marginBottom: 20,
        }}>
          <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.18em", color: T.gold, opacity: 0.26, marginBottom: 10 }}>
            BEHAVIORAL LOOP
          </div>
          {/* SVG mini-constellation of 4 layers */}
          <svg viewBox="0 0 340 96" width="100%" style={{ overflow: "visible", display: "block" }}>
            {/* Connection arrows */}
            {[
              { from: 0, to: 1, label: "extends" },
              { from: 1, to: 2, label: "guards"  },
              { from: 2, to: 3, label: "evidences"},
            ].map(({ from, to }) => {
              const positions = [
                { x: 20,  y: 48 },   // governance
                { x: 113, y: 24 },   // constraints
                { x: 220, y: 24 },   // behavioral integrity
                { x: 316, y: 48 },   // regenerative capacity
              ];
              const p1 = positions[from];
              const p2 = positions[to];
              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;
              return (
                <g key={`${from}-${to}`}>
                  <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke={c} strokeWidth={0.5} opacity={0.18} />
                  <text x={mx} y={my - 4} textAnchor="middle" fontFamily={T.mono} fontSize={4} fill={c} opacity={0.25}>→</text>
                </g>
              );
            })}
            {/* Return loop arc */}
            <path d="M 316 48 C 340 75 340 90 195 90 C 50 90 0 75 20 48"
              fill="none" stroke={c} strokeWidth={0.4} strokeDasharray="2 5" opacity={0.14} />
            <text x={195} y={86} textAnchor="middle" fontFamily={T.mono} fontSize={4} fill={c} opacity={0.20}>↩ LOOP</text>

            {/* Layer nodes */}
            {layers.map((layer, i) => {
              const px = [20, 113, 220, 316][i];
              const py = [48, 24, 24, 48][i];
              const isActive = layer.id === active;
              return (
                <g key={layer.id} onClick={() => setActive(layer.id)} style={{ cursor: "pointer" }}>
                  <circle cx={px} cy={py} r={16} fill="transparent" />
                  <circle cx={px} cy={py} r={isActive ? 8 : 5}
                    fill={c} opacity={isActive ? 1 : 0.28} />
                  <circle cx={px} cy={py} r={isActive ? 16 : 10}
                    fill={c} opacity={isActive ? 0.12 : 0.04} />
                  <text x={px} y={py + (i === 0 || i === 3 ? 22 : -14)}
                    textAnchor="middle" fontFamily={T.mono} fontSize={5.5}
                    letterSpacing="0.10em" fill={c}
                    opacity={isActive ? 0.88 : 0.36}>
                    {layer.short} {layer.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active layer content */}
        <div style={{ padding: "0 28px 80px" }}>
          <div style={{ fontFamily: T.serif, fontSize: 21, color: T.gold, opacity: 0.80, lineHeight: 1.30, marginBottom: 6 }}>
            {current.subtitle}
          </div>
          <div style={{ height: 0.5, background: "rgba(232,213,163,0.10)", marginBottom: 18 }} />

          {current.content.split("\n\n").map((para, i) => (
            <div key={i} style={{
              fontFamily: T.serif, fontSize: 13.5, color: T.gold, opacity: 0.62,
              lineHeight: 1.68, marginBottom: 16,
            }}>
              {para}
            </div>
          ))}

          {/* Layer insight */}
          <div style={{
            borderLeft: `1.5px solid rgba(106,184,138,0.30)`,
            paddingLeft: 16, marginBottom: 22,
          }}>
            <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.18em", color: c, opacity: 0.42, marginBottom: 8 }}>
              LAYER INSIGHT
            </div>
            <div style={{ fontFamily: T.serif, fontSize: 14, color: T.gold, opacity: 0.68, lineHeight: 1.58, fontStyle: "italic" }}>
              "{current.insight}"
            </div>
          </div>

          {/* Evidence entry — only for Governance layer */}
          {current.hasEvidence && (
            <div
              onClick={onCanvas}
              style={{
                borderRadius: 4,
                border: `0.5px solid rgba(106,184,138,0.22)`,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <img
                src={baEvidenceImg}
                alt="Behavioral Architecture — AI system with visible governance, constraints, integrity, and recovery layers"
                style={{ width: "100%", height: 110, objectFit: "cover", display: "block", opacity: 0.82 }}
              />
              <div style={{ background: "rgba(5,5,10,0.88)", padding: "10px 14px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.14em", color: c, opacity: 0.70 }}>
                    02 · BEHAVIORAL ARCHITECTURE
                  </div>
                  <div style={{ fontFamily: T.mono, fontSize: 7, color: c, opacity: 0.40 }}>→ INSPECT</div>
                </div>
                <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.12em", color: T.gold, opacity: 0.28 }}>
                  INTERACTIVE EXAMPLE · GOVERNANCE
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Framework canvas / evidence viewer (State N) ─────────────────────────────
function FrameworkCanvas({ onClose }: { onClose: () => void }) {
  const c = T.frameworks;
  return (
    <div style={{
      position: "absolute", top: 0, bottom: 0, left: 0, right: 0,
      background: "rgba(5,5,10,0.98)",
      backdropFilter: "blur(24px)",
      WebkitBackdropFilter: "blur(24px)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Top bar */}
      <div style={{
        padding: "22px 22px 14px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexShrink: 0,
        borderBottom: `0.5px solid rgba(106,184,138,0.12)`,
      }}>
        <div onClick={onClose} style={{
          fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.18em",
          color: T.gold, opacity: 0.36, cursor: "pointer",
          display: "flex", alignItems: "center", minHeight: 44, paddingRight: 12,
        }}>
          ‹ GOVERNANCE
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: T.mono, fontSize: 8, letterSpacing: "0.14em", color: c, opacity: 0.55 }}>
            02 · BEHAVIORAL ARCHITECTURE
          </div>
          <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.12em", color: T.gold, opacity: 0.26, marginTop: 2 }}>
            INTERACTIVE EXAMPLE
          </div>
        </div>
      </div>

      {/* Evidence image */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 0 60px" }}>
        <img
          src={baEvidenceImg}
          alt="AI coding assistant showing behavioral layers: governance, constraints, behavioral integrity, and regenerative capacity — making the trust architecture visible before asking the person to review the output"
          style={{ width: "100%", display: "block", objectFit: "contain" }}
        />

        {/* Pinch affordance */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "10px 0 18px",
          borderBottom: `0.5px solid rgba(106,184,138,0.10)`,
        }}>
          <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.18em", color: T.gold, opacity: 0.20 }}>
            PINCH TO INSPECT
          </div>
        </div>

        {/* Caption */}
        <div style={{ padding: "18px 28px 0" }}>
          <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.16em", color: c, opacity: 0.36, marginBottom: 8 }}>
            CAPTION
          </div>
          <div style={{ fontFamily: T.serif, fontSize: 13, color: T.gold, opacity: 0.52, lineHeight: 1.64 }}>
            The interface makes the behavioral system surrounding the AI visible before asking the person to trust its output.
            Trust shifts from the artifact to the governed, bounded, observable, and recoverable process that produced it.
          </div>
        </div>

        {/* Layer breadcrumb */}
        <div style={{
          margin: "18px 28px 0",
          padding: "12px 0",
          borderTop: `0.5px solid rgba(232,213,163,0.07)`,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: c, opacity: 0.45 }} />
          <div style={{ fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.14em", color: c, opacity: 0.32 }}>
            BEHAVIORAL ARCHITECTURE · GOVERNANCE · 01 TRADITIONAL AI vs 02 BEHAVIORAL ARCHITECTURE
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main exploration component ──────────────────────────────────────────────
export default function MobileAtlasLandingExploration() {
  // String state prevents HMR from silently preserving an obsolete mode value.
  const [rawMode, setRawMode] = useState<string>("arrival");

  // If rawMode is stale (e.g. renamed mode from a previous build), default safely.
  const mode: Mode = (MODES as readonly string[]).includes(rawMode)
    ? (rawMode as Mode)
    : "arrival";

  const setMode = (m: Mode) => setRawMode(m);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarfield(canvasRef);

  // Depth classification
  const isLanding  = (LANDING_MODES  as readonly string[]).includes(mode);
  const isProject  = (PROJECT_MODES  as readonly string[]).includes(mode);
  const isFramework = (FRAMEWORK_MODES as readonly string[]).includes(mode);

  // Landing-mode aliases (safe because we only use these when isLanding)
  const lm: LandingMode = isLanding ? (mode as LandingMode) : "arrival";
  const csState   = CS_FOCUS[lm];
  const ctxOp     = CTX_OP[lm];
  const nexusOp   = NEXUS_OP[lm];
  const isActive  = mode !== "arrival";

  // Project-mode aliases (safe because we only use these when isProject)
  const pm: ProjectMode = isProject ? (mode as ProjectMode) : "focus";
  const aiState    = AI_STATE[pm];
  const sibOp      = SIBLING_OP[pm];
  const csParentOp = CS_PARENT_OP[pm];
  const secStarOp  = SECTION_STAR_OP[pm];

  // Framework-mode aliases (safe because we only use these when isFramework)
  const fm: FrameworkMode = isFramework ? (mode as FrameworkMode) : "fw-focus";
  const mdState     = MD_STATE[fm];
  const fwSibOp     = FW_SIBLING_OP[fm];
  const fwParentOp  = FW_PARENT_OP[fm];
  const layerStarOp = LAYER_STAR_OP[fm];

  const cs = SYSTEMS[0];
  const ex = SYSTEMS[1];
  const fw = SYSTEMS[2];

  const LANDING_ROW:   LandingMode[]   = ["arrival", "activate", "overview", "scrolled"];
  const PROJECT_ROW:   ProjectMode[]   = ["focus", "activated", "project-overview", "reading", "evidence"];
  const FRAMEWORK_ROW: FrameworkMode[] = ["fw-focus", "fw-activated", "fw-overview", "fw-deeper", "fw-canvas"];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080810",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24,
      padding: "48px 24px 60px",
      fontFamily: T.mono,
    }}>
      {/* Header */}
      <div style={{ color: "rgba(232,213,163,0.32)", fontSize: 9, letterSpacing: "0.32em" }}>
        SOVEREIGN ATLAS · MOBILE EXPLORATION · 390 × 844
      </div>

      {/* State selector — two rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {/* Row 1: A–D (Landing) */}
        <div style={{ display: "flex", gap: 2 }}>
          <div style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.22em",
            color: "rgba(232,213,163,0.22)", padding: "9px 10px 9px 0",
            display: "flex", alignItems: "center",
          }}>
            LANDING
          </div>
          <div style={{
            display: "flex", gap: 2,
            background: "rgba(232,213,163,0.05)", borderRadius: 4, padding: 2,
          }}>
            {LANDING_ROW.map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                background: mode === m ? "rgba(232,213,163,0.11)" : "transparent",
                border: "none",
                color: mode === m ? "rgba(232,213,163,0.88)" : "rgba(232,213,163,0.30)",
                fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.24em",
                padding: "9px 16px", cursor: "pointer", borderRadius: 3,
                transition: "all 0.22s ease",
              }}>
                {MODE_KEY[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: E–I (Project depth) */}
        <div style={{ display: "flex", gap: 2 }}>
          <div style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.22em",
            color: "rgba(138,174,200,0.28)", padding: "9px 10px 9px 0",
            display: "flex", alignItems: "center",
          }}>
            FOCUS
          </div>
          <div style={{
            display: "flex", gap: 2,
            background: "rgba(138,174,200,0.06)", borderRadius: 4, padding: 2,
          }}>
            {PROJECT_ROW.map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                background: mode === m ? "rgba(138,174,200,0.14)" : "transparent",
                border: "none",
                color: mode === m ? "rgba(138,174,200,0.90)" : "rgba(138,174,200,0.34)",
                fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.24em",
                padding: "9px 14px", cursor: "pointer", borderRadius: 3,
                transition: "all 0.22s ease",
              }}>
                {MODE_KEY[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: J–N (Frameworks depth) */}
        <div style={{ display: "flex", gap: 2 }}>
          <div style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.22em",
            color: "rgba(106,184,138,0.32)", padding: "9px 10px 9px 0",
            display: "flex", alignItems: "center",
          }}>
            FRAMES
          </div>
          <div style={{
            display: "flex", gap: 2,
            background: "rgba(106,184,138,0.06)", borderRadius: 4, padding: 2,
          }}>
            {FRAMEWORK_ROW.map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                background: mode === m ? "rgba(106,184,138,0.15)" : "transparent",
                border: "none",
                color: mode === m ? "rgba(106,184,138,0.92)" : "rgba(106,184,138,0.36)",
                fontFamily: T.mono, fontSize: 8.5, letterSpacing: "0.24em",
                padding: "9px 14px", cursor: "pointer", borderRadius: 3,
                transition: "all 0.22s ease",
              }}>
                {MODE_KEY[m]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Phone frame ───────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", width: W, height: H,
        overflow: "hidden", borderRadius: 48,
        border: "1.5px solid rgba(232,213,163,0.10)",
        boxShadow:
          "0 0 0 6px rgba(5,5,10,0.9), " +
          "0 0 80px rgba(138,174,200,0.055), " +
          "0 40px 120px rgba(0,0,0,0.85)",
        background: T.bg, flexShrink: 0,
      }}>
        {/* Starfield — always running */}
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: W, height: H, display: "block" }} />

        {/* ── Landing SVG (A–D) ─────────────────────────────────────────── */}
        {isLanding && (
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
            style={{ position: "absolute", inset: 0 }} aria-hidden>
            {/* Radial lines from nexus */}
            {[22, 67, 112, 157, 202, 247, 292, 337].map((deg) => {
              const r = (deg * Math.PI) / 180;
              return (
                <line key={deg}
                  x1={NEXUS.x} y1={NEXUS.y}
                  x2={NEXUS.x + Math.cos(r) * 295}
                  y2={NEXUS.y + Math.sin(r) * 295}
                  stroke={T.gold} strokeWidth={0.28}
                  opacity={isActive ? 0.014 : 0.036}
                  style={{ transition: FADE }}
                />
              );
            })}
            {/* Orbit arcs */}
            <path d={cs.orbitPath} fill="none" stroke={cs.color} strokeWidth={0.55}
              strokeDasharray="4.5 7" opacity={CS_ARC_OP[lm]} style={{ transition: FADE }} />
            <path d={ex.orbitPath} fill="none" stroke={ex.color} strokeWidth={0.55}
              strokeDasharray="4.5 7" opacity={CTX_ARC_OP[lm]} style={{ transition: FADE }} />
            <path d={fw.orbitPath} fill="none" stroke={fw.color} strokeWidth={0.55}
              strokeDasharray="4.5 7" opacity={CTX_ARC_OP[lm]} style={{ transition: FADE }} />
            {/* Nexus */}
            <NexusNode op={nexusOp} />
            {/* Experiments */}
            <g style={{ opacity: ctxOp, transition: FADE }}>
              <SystemNode sys={ex} cx={EX_POS.x} cy={EX_POS.y} orbitR={ORBIT_R}
                awakened={false} dimmed={isActive} showLabel={!isActive} />
            </g>
            {/* Frameworks */}
            <g style={{ opacity: ctxOp, transition: FADE }}>
              <SystemNode sys={fw} cx={FW_POS.x} cy={FW_POS.y} orbitR={ORBIT_R}
                awakened={false} dimmed={isActive} showLabel={!isActive} />
            </g>
            {/* Case Studies */}
            <g style={{ opacity: csState.opacity, transition: FADE }}>
              <SystemNode
                sys={cs}
                cx={csState.x} cy={csState.y} orbitR={csState.orbitR}
                awakened={isActive}
                dimmed={false}
                showLabel={mode === "arrival"}
              />
            </g>
          </svg>
        )}

        {/* ── Project SVG (E–I) ─────────────────────────────────────────── */}
        {isProject && (
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
            style={{ position: "absolute", inset: 0 }} aria-hidden>
            {/* Very faint radial lines — spatial ancestry */}
            {[22, 112, 202, 292].map((deg) => {
              const r = (deg * Math.PI) / 180;
              return (
                <line key={deg}
                  x1={CS_CTR.x} y1={CS_CTR.y}
                  x2={CS_CTR.x + Math.cos(r) * 260}
                  y2={CS_CTR.y + Math.sin(r) * 260}
                  stroke={T.gold} strokeWidth={0.22}
                  opacity={0.018}
                />
              );
            })}

            {/* Constellation connecting lines (fade when a project is activated) */}
            <ConstellationConnections
              op={["focus"].includes(mode) ? 1 : mode === "activated" || mode === "project-overview" ? 0.15 : 0.04}
            />

            {/* CS parent anchor */}
            <CSParentNode op={csParentOp} />

            {/* Section stars around AI node */}
            <SectionStars
              aiX={aiState.x} aiY={aiState.y}
              radius={mode === "activated" ? 56 : 50}
              opacity={secStarOp}
            />

            {/* Project nodes — siblings (GL, OR, SA), fade when AI activates */}
            <g style={{ opacity: sibOp, transition: FADE }}>
              {CS_PROJECTS.slice(1).map((p) => (
                <ProjectNode
                  key={p.id}
                  label={p.label}
                  cx={p.x} cy={p.y}
                  awakened={false}
                  dimmed={false}
                  showLabel={true}
                />
              ))}
            </g>

            {/* Agentic Insurance — dominant, animated */}
            <g style={{ opacity: aiState.opacity, transition: FADE }}>
              <ProjectNode
                label="AGENTIC INSURANCE"
                cx={aiState.x} cy={aiState.y}
                awakened={mode !== "focus"}
                dimmed={false}
                showLabel={mode === "focus" || mode === "activated"}
                onClick={() => {
                  if (mode === "focus") setMode("activated");
                }}
              />
            </g>
          </svg>
        )}

        {/* ── Framework SVG (J–N) ──────────────────────────────────────── */}
        {isFramework && (
          <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
            style={{ position: "absolute", inset: 0 }} aria-hidden>
            {/* Faint radial lines emanating from FW_CTR */}
            {[0, 60, 120, 180, 240, 300].map((deg) => {
              const r = (deg * Math.PI) / 180;
              return (
                <line key={deg}
                  x1={FW_CTR.x} y1={FW_CTR.y}
                  x2={FW_CTR.x + Math.cos(r) * 320}
                  y2={FW_CTR.y + Math.sin(r) * 320}
                  stroke={T.frameworks} strokeWidth={0.18} opacity={0.035}
                />
              );
            })}

            {/* Constellation connections */}
            <FwConstellationConnections op={mode === "fw-focus" ? 1 : mode === "fw-activated" ? 0.22 : 0.08} />

            {/* Frameworks parent anchor */}
            <FWParentNode op={fwParentOp} />

            {/* Layer stars (orbit around MD node) */}
            <LayerStars
              mdX={mdState.x} mdY={mdState.y}
              radius={mdState.orbitR + 42}
              opacity={layerStarOp}
            />

            {/* Sibling framework nodes */}
            <g style={{ opacity: fwSibOp, transition: FADE }}>
              {FW_FRAMEWORKS.filter((f) => f.id !== "model-design").map((f) => (
                <FrameworkNode
                  key={f.id}
                  label={f.label}
                  cx={f.x} cy={f.y}
                  awakened={false}
                />
              ))}
            </g>

            {/* Model Design / Behavioral Architecture — the dominant node */}
            <g style={{ opacity: mdState.opacity, transition: FADE }}>
              <FrameworkNode
                label="MODEL DESIGN"
                cx={mdState.x} cy={mdState.y}
                awakened={mode !== "fw-focus"}
                onClick={() => {
                  if (mode === "fw-focus")     setMode("fw-activated");
                  if (mode === "fw-activated") setMode("fw-overview");
                }}
              />
            </g>
          </svg>
        )}

        {/* ── Landing header chrome (A–D) ───────────────────────────────── */}
        {isLanding && (
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            padding: "22px 22px 0",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
            pointerEvents: "none",
          }}>
            <div>
              <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", color: T.gold, opacity: 0.50 }}>
                THE SOVEREIGN ATLAS
              </div>
              <div style={{ fontFamily: T.serif, fontSize: 13, color: T.gold, opacity: 0.32, marginTop: 3 }}>
                Three systems in orbit
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "6px 10px", minWidth: 44, minHeight: 44, justifyContent: "center",
              border: "0.5px solid rgba(232,213,163,0.18)", borderRadius: 3,
              pointerEvents: "auto", cursor: "pointer",
            }}>
              <svg width={11} height={11} viewBox="0 0 11 11" fill="none">
                <circle cx={4.5} cy={4.5} r={3.2} stroke={T.gold} strokeWidth={0.85} opacity={0.52} />
                <line x1={7} y1={7} x2={10} y2={10} stroke={T.gold} strokeWidth={0.85} opacity={0.52} />
              </svg>
              <span style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.2em", color: T.gold, opacity: 0.50 }}>
                SEARCH
              </span>
            </div>
          </div>
        )}

        {/* ── Focus top bar (E–G) ───────────────────────────────────────── */}
        {isProject && mode !== "reading" && mode !== "evidence" && (
          <FocusTopBar onBack={() => setMode("scrolled")} />
        )}

        {/* ── Frameworks top bar (J–L) ──────────────────────────────────── */}
        {isFramework && mode !== "fw-deeper" && mode !== "fw-canvas" && (
          <FWFocusTopBar onBack={() => setMode("scrolled")} />
        )}

        {/* ── Observatory entry — arrival only ──────────────────────────── */}
        {isLanding && (
          <div style={{
            position: "absolute", bottom: 58, left: 0, right: 0,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
            pointerEvents: "none",
            opacity: mode === "arrival" ? 1 : 0,
            transition: FADE,
          }}>
            <div style={{ width: 0.5, height: 18, background: "rgba(232,213,163,0.18)" }} />
            <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.24em", color: T.gold, opacity: 0.28 }}>
              ENTER OBSERVATORY
            </div>
          </div>
        )}

        {/* ── Landing overlay surfaces (C, D) ──────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: mode === "overview" ? "auto" : "none",
          opacity: mode === "overview" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <OverviewInitial onExplore={() => setMode("focus")} />
        </div>
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: mode === "scrolled" ? "auto" : "none",
          opacity: mode === "scrolled" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <OverviewScrolled onExplore={() => setMode("focus")} />
        </div>

        {/* ── Project overlay: G — Project Overview ─────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: mode === "project-overview" ? "auto" : "none",
          opacity: mode === "project-overview" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <ProjectOverviewSurface onExplore={() => setMode("reading")} />
        </div>

        {/* ── Project overlay: H — Reading Mode ─────────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: mode === "reading" ? "auto" : "none",
          opacity: mode === "reading" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <ReadingSurface
            onEvidence={() => setMode("evidence")}
            onBack={() => setMode("project-overview")}
          />
        </div>

        {/* ── Project overlay: I — Evidence Viewer ──────────────────────── */}
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: mode === "evidence" ? "auto" : "none",
          opacity: mode === "evidence" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <EvidenceViewer onClose={() => setMode("reading")} />
        </div>

        {/* ── Framework overlay: L — Behavioral Architecture Overview ──── */}
        <div style={{
          position: "absolute", inset: 0,
          pointerEvents: mode === "fw-overview" ? "auto" : "none",
          opacity: mode === "fw-overview" ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}>
          <BehavioralOverviewSurface onExplore={() => setMode("fw-deeper")} />
        </div>

        {/* ── Framework overlay: M — Behavioral Architecture Deeper View ─ */}
        {mode === "fw-deeper" && (
          <BehavioralDeeperView
            onCanvas={() => setMode("fw-canvas")}
            onBack={() => setMode("fw-overview")}
          />
        )}

        {/* ── Framework overlay: N — Framework Canvas / Evidence ─────────  */}
        {mode === "fw-canvas" && (
          <FrameworkCanvas onClose={() => setMode("fw-deeper")} />
        )}
      </div>
      {/* ── End phone frame ─────────────────────────────────────────────────── */}

      {/* State label */}
      <div style={{ color: "rgba(232,213,163,0.28)", fontSize: 8.5, letterSpacing: "0.22em", textAlign: "center" }}>
        {MODE_LABELS[mode]}
      </div>

      {/* Prototype note */}
      <div style={{ color: "rgba(232,213,163,0.14)", fontSize: 8, letterSpacing: "0.14em", textAlign: "center", lineHeight: 1.7 }}>
        DESIGN PROTOTYPE · Phase 1–2 · Not wired into production Atlas
      </div>
    </div>
  );
}
