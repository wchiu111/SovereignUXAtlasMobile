/**
 * CaseStudiesScene — case-studies-focus | project-awakened | project-overview
 * CS project constellation + Agentic Insurance overview surface.
 */

import type { MobileState } from "../components/mobileShared";
import { T, ANIM, FADE, W, H } from "../components/mobileShared";

// ── CS data ───────────────────────────────────────────────────────────────────
interface ProjectDef { id: string; label: string; x: number; y: number; }

const CS_PROJECTS: ProjectDef[] = [
  { id: "agentic-insurance", label: "AGENTIC INSURANCE", x: 95,  y: 210 },
  { id: "globality",         label: "GLOBALITY",         x: 290, y: 200 },
  { id: "oracle",            label: "ORACLE",             x: 288, y: 418 },
  { id: "sovereign-atlas",   label: "SOVEREIGN ATLAS",    x: 100, y: 422 },
];

const CS_CTR = { x: 193, y: 312 };

const AI_SECTIONS = [
  { id: "context",   label: "CONTEXT",   deg: -145 },
  { id: "problem",   label: "PROBLEM",   deg:  -96 },
  { id: "approach",  label: "APPROACH",  deg:  -38 },
  { id: "decisions", label: "DECISIONS", deg:   18 },
  { id: "outcomes",  label: "OUTCOMES",  deg:   72 },
  { id: "lessons",   label: "LESSONS",   deg:  145 },
];

// ── Visual config keyed by semantic state ─────────────────────────────────────
type CSState = "case-studies-focus" | "project-awakened" | "project-overview";

const AI_STATE: Record<CSState, { x: number; y: number; orbitR: number; opacity: number }> = {
  "case-studies-focus": { x: 95,  y: 210, orbitR: 28, opacity: 1    },
  "project-awakened":   { x: 195, y: 248, orbitR: 58, opacity: 1    },
  "project-overview":   { x: 195, y: 232, orbitR: 52, opacity: 1    },
};

const SIBLING_OP: Record<CSState, number> = {
  "case-studies-focus": 1, "project-awakened": 0.10, "project-overview": 0.10,
};

const CS_PARENT_OP: Record<CSState, number> = {
  "case-studies-focus": 0.22, "project-awakened": 0.11, "project-overview": 0.08,
};

const SECTION_STAR_OP: Record<CSState, number> = {
  "case-studies-focus": 0, "project-awakened": 1, "project-overview": 0.88,
};

const CONN_OP: Record<CSState, number> = {
  "case-studies-focus": 1, "project-awakened": 0.15, "project-overview": 0.15,
};

// ── SVG: CS parent anchor ─────────────────────────────────────────────────────
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
        letterSpacing="0.2em" fill={c} opacity={0.66}>
        CASE STUDIES
      </text>
    </g>
  );
}

// ── SVG: Project node ─────────────────────────────────────────────────────────
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
    <g
      onClick={onClick}
      style={{
        transform: `translate(${cx}px,${cy}px)`,
        transition: ANIM,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <circle r={outerR} fill={c}
        opacity={dimmed ? 0.02 : awakened ? 0.10 : 0.05}
        pointerEvents="none"
        style={{ transition: FADE }} />
      <circle r={innerR} fill={c}
        opacity={dimmed ? 0.04 : awakened ? 0.20 : 0.11}
        pointerEvents="none"
        style={{ transition: FADE }} />
      <circle r={awakened ? 28 : 18} fill="none" stroke={c} strokeWidth={0.45}
        opacity={dimmed ? 0.03 : awakened ? 0.28 : 0.10}
        pointerEvents="none"
        style={{ transition: FADE }} />
      <circle r={coreR} fill={c}
        opacity={dimmed ? 0.20 : 1}
        pointerEvents="none"
        style={{ transition: FADE }} />
      {showLabel && (
        <text y={coreR + 16} textAnchor="middle"
          fontFamily={T.mono} fontSize={7.5} letterSpacing="0.14em"
          fill={c} opacity={dimmed ? 0.14 : 0.55}
          pointerEvents="none"
          style={{ transition: FADE }}>
          {label}
        </text>
      )}
      {/* 44px minimum touch target sits above decorative SVG layers. */}
      {onClick && <circle r={22} fill="transparent" pointerEvents="all" />}
    </g>
  );
}

// ── SVG: Section stars orbiting AI node ──────────────────────────────────────
function SectionStars({
  aiX, aiY, radius, opacity,
}: {
  aiX: number; aiY: number; radius: number; opacity: number;
}) {
  const c = T.caseStudies;
  return (
    <g style={{ opacity, transition: FADE }}>
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
            <line
              x1={-Math.cos(rad) * (radius - 6)} y1={-Math.sin(rad) * (radius - 6)}
              x2={0} y2={0}
              stroke={c} strokeWidth={0.3} opacity={0.12}
            />
            <circle r={isApproach ? 3.5 : 2} fill={c} opacity={isApproach ? 1 : 0.55} />
            <circle r={isApproach ? 9 : 5.5} fill={c} opacity={isApproach ? 0.16 : 0.06} />
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

// ── SVG: Constellation connections ───────────────────────────────────────────
function ConstellationConnections({ op }: { op: number }) {
  const c = T.caseStudies;
  const [ai, gl, or_, sa] = CS_PROJECTS;
  return (
    <g style={{ opacity: op, transition: FADE }}>
      <line x1={ai.x} y1={ai.y} x2={gl.x}  y2={gl.y}  stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.16} />
      <line x1={gl.x} y1={gl.y} x2={or_.x} y2={or_.y} stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.14} />
      <line x1={or_.x} y1={or_.y} x2={sa.x} y2={sa.y} stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.16} />
      <line x1={sa.x} y1={sa.y} x2={ai.x}  y2={ai.y}  stroke={c} strokeWidth={0.35} strokeDasharray="3 7" opacity={0.14} />
      <line x1={gl.x} y1={gl.y} x2={sa.x}  y2={sa.y}  stroke={c} strokeWidth={0.25} strokeDasharray="2 10" opacity={0.07} />
      {CS_PROJECTS.map((p) => (
        <line key={p.id}
          x1={p.x} y1={p.y} x2={CS_CTR.x} y2={CS_CTR.y}
          stroke={c} strokeWidth={0.25} opacity={0.05} />
      ))}
    </g>
  );
}

// ── Focus top bar ─────────────────────────────────────────────────────────────
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
        <span style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.18em", color: T.body, opacity: 0.72 }}>
          ‹ OVERVIEW
        </span>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 9, letterSpacing: "0.22em", color: c, opacity: 0.78 }}>
        CASE STUDIES
      </div>
    </div>
  );
}

// ── Project overview surface ──────────────────────────────────────────────────
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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 3 }}>
        <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: "0.20em", color: c, opacity: 0.92 }}>
          AGENTIC INSURANCE
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.16em", color: T.body, opacity: 0.68, marginTop: 2 }}>
          CASE STUDY
        </div>
      </div>
      <div style={{ fontFamily: T.mono, fontSize: 7.5, letterSpacing: "0.16em", color: T.body, opacity: 0.68, marginBottom: 14 }}>
        2024 · PRODUCT DESIGNER
      </div>
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
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontFamily: T.mono, fontSize: 7, letterSpacing: "0.20em", color: T.accentGold, opacity: 0.72, marginBottom: 6 }}>
          WHAT
        </div>
        <div style={{ fontFamily: T.serif, fontSize: 13, color: T.body, opacity: 0.84, lineHeight: 1.60 }}>
          A self-directed exploration of how AI-assisted tools might support claim adjusters and customers during complex insurance decisions.
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {["CONTEXT", "PROBLEM", "APPROACH", "DECISIONS", "OUTCOMES", "LESSONS"].map((sec, i) => (
          <div key={sec} style={{
            fontFamily: T.mono, fontSize: 6.5, letterSpacing: "0.14em",
            color: c, opacity: 0.68,
          }}>
            {String(i + 1).padStart(2, "0")} {sec}
            {i < 5 && <span style={{ opacity: 0.4, marginLeft: 8 }}>·</span>}
          </div>
        ))}
      </div>
      <div onClick={onExplore} style={{
        minHeight: 44,
        display: "flex",
        alignItems: "center",
        width: "fit-content",
        paddingRight: 16,
        fontFamily: T.mono, fontSize: 9.5, letterSpacing: "0.18em",
        color: c, opacity: 0.88, cursor: "pointer",
      }}>
        EXPLORE →
      </div>
    </div>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────
interface CaseStudiesSceneProps {
  state: CSState;
  onSelectProject: () => void;   // tap AI in focus → project-awakened
  onProjectOverview: () => void; // tap AI in awakened → project-overview
  onExplore: () => void;         // project-overview EXPLORE → project-reading
  onBack: () => void;            // → system-overview
}

export default function CaseStudiesScene({
  state,
  onSelectProject,
  onProjectOverview,
  onExplore,
  onBack,
}: CaseStudiesSceneProps) {
  const aiState   = AI_STATE[state];
  const sibOp     = SIBLING_OP[state];
  const parentOp  = CS_PARENT_OP[state];
  const secStarOp = SECTION_STAR_OP[state];
  const connOp    = CONN_OP[state];

  return (
    <>
      {/* ── CS constellation SVG ── */}
      <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H}
        style={{ position: "absolute", inset: 0 }} aria-hidden>
        {/* Very faint radial ancestry lines */}
        {[22, 112, 202, 292].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={CS_CTR.x} y1={CS_CTR.y}
              x2={CS_CTR.x + Math.cos(r) * 260}
              y2={CS_CTR.y + Math.sin(r) * 260}
              stroke={T.gold} strokeWidth={0.22} opacity={0.018}
            />
          );
        })}

        <ConstellationConnections op={connOp} />
        <CSParentNode op={parentOp} />

        <SectionStars
          aiX={aiState.x} aiY={aiState.y}
          radius={state === "project-awakened" ? 56 : 50}
          opacity={secStarOp}
        />

        {/* Sibling projects */}
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

        {/* Agentic Insurance — dominant node */}
        <g style={{ opacity: aiState.opacity, transition: FADE }}>
          <ProjectNode
            label="AGENTIC INSURANCE"
            cx={aiState.x} cy={aiState.y}
            awakened={state !== "case-studies-focus"}
            dimmed={false}
            showLabel={state === "case-studies-focus" || state === "project-awakened"}
            onClick={() => {
              if (state === "case-studies-focus") onSelectProject();
              if (state === "project-awakened")   onProjectOverview();
            }}
          />
        </g>
      </svg>

      {/* ── Focus top bar ── */}
      <FocusTopBar onBack={onBack} />

      {/* ── Project overview panel (project-overview) ── */}
      {state === "project-overview" && (
        <ProjectOverviewSurface onExplore={onExplore} />
      )}
    </>
  );
}
