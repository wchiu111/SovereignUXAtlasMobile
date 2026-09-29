/**
 * Mobile Atlas Prototype — Shared constants, types, hook.
 * DESIGN PROTOTYPE ONLY — does not modify desktop Atlas.
 */

import { useEffect, type RefObject } from "react";
import { FRAMEWORK_SYSTEM_PLANETS } from "../frameworks/frameworkTopology";

/**
 * Canonical authored coordinate space for the mobile Atlas.
 *
 * These values still behave exactly as they did before this pass.
 * Pass 1 only names their role explicitly; runtime responsiveness comes later.
 */
export const REFERENCE_W = 390;
export const REFERENCE_H = 844;

// Backward-compatible aliases preserve every existing consumer unchanged.
export const W = REFERENCE_W;
export const H = REFERENCE_H;

export const T = {
  bg:          "#05050A",
  gold:        "#E8D5A3",
  body:        "#D4C490",
  accentGold:  "#C8A96E",
  identityGold:"#E8C86D",
  muted:       "#6A5F4A",
  caseStudies: "#8AAEC8",
  experiments: "#A68BD4",
  frameworks:  "#6AB88A",
  mono:        "'DM Mono', monospace",
  serif:       "'EB Garamond', Georgia, serif",
} as const;

export const EASE = "cubic-bezier(0.16,1,0.3,1)";
export const DUR  = "0.52s";
export const ANIM = `transform ${DUR} ${EASE}`;
export const FADE = `opacity 0.32s ease`;

// Shared authored-content frame for mobile narrative surfaces.
// Spatial constellations remain full-canvas; chrome and authored content use this inset.
export const MOBILE_CONTENT_INSET = "clamp(24px, 7.2vw, 30px)";
export const MOBILE_CHROME_MIN_HEIGHT = 62;
export const MOBILE_NARRATIVE_SURFACE_TOP = 24;
export const MOBILE_NARRATIVE_SURFACE_BOTTOM = 28;

export const NEXUS   = { x: 195, y: 355 };
export const BASE_R  = 18;
export const EX_POS  = { x: 298, y: 178 };
export const FW_POS  = { x: 195, y: 565 };
export const ORBIT_R = 36;

export type MobileState =
  | "atlas-landing"
  | "system-awakened"
  | "system-overview"
  | "project-reading"
  | "frameworks-focus"
  | "framework-reading"
  | "framework-evidence";

export const MOBILE_STATES: readonly MobileState[] = [
  "atlas-landing", "system-awakened", "system-overview",
  "project-reading",
  "frameworks-focus", "framework-reading", "framework-evidence",
];

export interface Planet { angle: number; label: string; color?: string; }
export interface SystemDef {
  id: string; label: string; color: string;
  orbitPath: string; planets: Planet[];
}

export const SYSTEMS: SystemDef[] = [
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
    planets: [...FRAMEWORK_SYSTEM_PLANETS],
  },
];

export function useStarfield(ref: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Star = {
      nx: number;
      ny: number;
      r: number;
      base: number;
      phase: number;
      spd: number;
      gold: boolean;
      hero: boolean;
    };

    // Stable for the lifetime of the mounted Atlas. The existing field remains
    // spatially quiet; Pass 2 adds atmosphere around it rather than moving the map.
    const stars: Star[] = Array.from({ length: 360 }, (_, index) => ({
      nx:    Math.random(),
      ny:    Math.random(),
      r:     Math.pow(Math.random(), 2.8) * 1.5 + 0.18,
      base:  Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.0009 + 0.0002,
      gold:  Math.random() < 0.30,
      hero:  index % 47 === 0,
    }));

    let cssWidth = W;
    let cssHeight = H;
    let raf = 0;

    function syncCanvasSize() {
      const rect = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, rect.width);
      cssHeight = Math.max(1, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(cssWidth * dpr));
      const pixelHeight = Math.max(1, Math.round(cssHeight * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawNebula(
      x: number,
      y: number,
      radius: number,
      inner: string,
      middle: string,
    ) {
      const gradient = ctx.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        radius,
      );
      gradient.addColorStop(0, inner);
      gradient.addColorStop(0.48, middle);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, cssWidth, cssHeight);
    }

    function drawSignalStreak(
      time: number,
      cycleMs: number,
      phaseOffset: number,
      startNX: number,
      startNY: number,
      endNX: number,
      endNY: number,
      gold: boolean,
    ) {
      if (reduceMotion) return;

      const phase =
        ((time + phaseOffset) % cycleMs) / cycleMs;

      // A signal is present for only a small portion of the cycle.
      const windowStart = 0.79;
      const windowEnd = 0.86;
      if (phase < windowStart || phase > windowEnd) return;

      const local =
        (phase - windowStart) / (windowEnd - windowStart);
      const alpha = Math.sin(local * Math.PI) * 0.30;

      const x1 = startNX * cssWidth;
      const y1 = startNY * cssHeight;
      const x2 = endNX * cssWidth;
      const y2 = endNY * cssHeight;
      const dx = x2 - x1;
      const dy = y2 - y1;

      // Reveal a short moving segment rather than a full static line.
      const headT = Math.min(1, local * 1.18);
      const tailT = Math.max(0, headT - 0.22);
      const sx = x1 + dx * tailT;
      const sy = y1 + dy * tailT;
      const ex = x1 + dx * headT;
      const ey = y1 + dy * headT;

      const lineGradient = ctx.createLinearGradient(
        sx,
        sy,
        ex,
        ey,
      );
      lineGradient.addColorStop(0, "transparent");
      lineGradient.addColorStop(
        0.72,
        gold
          ? `rgba(232,213,163,${alpha * 0.38})`
          : `rgba(174,201,239,${alpha * 0.34})`,
      );
      lineGradient.addColorStop(
        1,
        gold
          ? `rgba(255,231,166,${alpha})`
          : `rgba(207,225,255,${alpha})`,
      );

      ctx.save();
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 0.8;
      ctx.shadowBlur = 7;
      ctx.shadowColor = gold
        ? `rgba(232,213,163,${alpha * 0.72})`
        : `rgba(161,194,236,${alpha * 0.62})`;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();
      ctx.restore();
    }

    function drawFrame(time: number) {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      const scaleX = cssWidth / W;
      const scaleY = cssHeight / H;
      const radiusScale = Math.min(scaleX, scaleY);
      const seconds = time * 0.001;

      /*
       * Pass 2 ambient depth.
       *
       * These fields drift only a few viewport pixels over long periods.
       * They create parallax/depth without moving any authored constellation
       * geometry or labels.
       */
      const driftAX = reduceMotion
        ? 0
        : Math.sin(seconds / 12.8) * 14 * scaleX;
      const driftAY = reduceMotion
        ? 0
        : Math.cos(seconds / 16.4) * 9 * scaleY;
      const driftBX = reduceMotion
        ? 0
        : Math.cos(seconds / 15.8) * 18 * scaleX;
      const driftBY = reduceMotion
        ? 0
        : Math.sin(seconds / 19.5) * 11 * scaleY;
      const driftCX = reduceMotion
        ? 0
        : Math.sin(seconds / 18.5) * 10 * scaleX;
      const driftCY = reduceMotion
        ? 0
        : Math.cos(seconds / 14.2) * 13 * scaleY;

      ctx.save();
      ctx.globalCompositeOperation = "screen";

      drawNebula(
        cssWidth * 0.16 + driftAX,
        cssHeight * 0.30 + driftAY,
        250 * radiusScale,
        "rgba(76,118,179,0.030)",
        "rgba(69,90,151,0.014)",
      );

      drawNebula(
        cssWidth * 0.86 + driftBX,
        cssHeight * 0.23 + driftBY,
        225 * radiusScale,
        "rgba(122,91,177,0.027)",
        "rgba(87,71,142,0.012)",
      );

      drawNebula(
        cssWidth * 0.50 + driftCX,
        cssHeight * 0.68 + driftCY,
        235 * radiusScale,
        "rgba(70,143,116,0.020)",
        "rgba(54,105,88,0.009)",
      );

      ctx.restore();

      // Existing Atlas atmosphere, now given a restrained breathing envelope.
      const nexusX = NEXUS.x * scaleX;
      const nexusY = NEXUS.y * scaleY;
      const nexusBreath = reduceMotion
        ? 1
        : 0.88 + Math.sin(seconds / 4.8) * 0.12;
      const ng = ctx.createRadialGradient(
        nexusX,
        nexusY,
        0,
        nexusX,
        nexusY,
        310 * radiusScale,
      );
      ng.addColorStop(
        0,
        `rgba(138,174,200,${0.038 + nexusBreath * 0.008})`,
      );
      ng.addColorStop(
        0.30,
        `rgba(166,139,212,${0.024 + nexusBreath * 0.006})`,
      );
      ng.addColorStop(
        0.60,
        `rgba(106,184,138,${0.012 + nexusBreath * 0.004})`,
      );
      ng.addColorStop(1, "transparent");
      ctx.fillStyle = ng;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      const frameworkX = 195 * scaleX;
      const frameworkY = 590 * scaleY;
      const fg = ctx.createRadialGradient(
        frameworkX,
        frameworkY,
        0,
        frameworkX,
        frameworkY,
        190 * radiusScale,
      );
      fg.addColorStop(0, "rgba(106,184,138,0.030)");
      fg.addColorStop(1, "transparent");
      ctx.fillStyle = fg;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      const upperX = 195 * scaleX;
      const upperY = 155 * scaleY;
      const ug = ctx.createRadialGradient(
        upperX,
        upperY,
        0,
        upperX,
        upperY,
        200 * radiusScale,
      );
      ug.addColorStop(0, "rgba(166,139,212,0.020)");
      ug.addColorStop(0.5, "rgba(138,174,200,0.013)");
      ug.addColorStop(1, "transparent");
      ctx.fillStyle = ug;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Star field: same spatial pattern, but with slightly richer depth and
      // a few restrained "hero" stars that resolve briefly.
      for (const s of stars) {
        const wave = reduceMotion
          ? 0
          : Math.sin(time * s.spd + s.phase);
        const tw = wave * 0.22;
        const opacity = Math.max(
          0.04,
          Math.min(0.88, s.base + tw),
        );
        const radius = s.hero
          ? s.r * (reduceMotion ? 1 : 1 + Math.max(0, wave) * 0.18)
          : s.r;

        ctx.beginPath();
        ctx.arc(
          s.nx * cssWidth,
          s.ny * cssHeight,
          radius,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = s.gold
          ? `rgba(232,213,163,${opacity})`
          : `rgba(210,218,232,${opacity * 0.72})`;
        ctx.fill();

        if (s.hero && opacity > 0.58) {
          const x = s.nx * cssWidth;
          const y = s.ny * cssHeight;
          const flare = (opacity - 0.58) / 0.30;
          ctx.save();
          ctx.strokeStyle = s.gold
            ? `rgba(232,213,163,${flare * 0.14})`
            : `rgba(199,217,247,${flare * 0.12})`;
          ctx.lineWidth = 0.45;
          ctx.beginPath();
          ctx.moveTo(x - 4.5, y);
          ctx.lineTo(x + 4.5, y);
          ctx.moveTo(x, y - 4.5);
          ctx.lineTo(x, y + 4.5);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Rare signal events — enough to reward observation, not enough to
      // compete with navigation.
      drawSignalStreak(
        time,
        23000,
        0,
        0.08,
        0.34,
        0.34,
        0.22,
        true,
      );
      drawSignalStreak(
        time,
        31000,
        11700,
        0.70,
        0.58,
        0.92,
        0.47,
        false,
      );

      // Soft depth treatment keeps the edges quieter and the center navigable.
      const depth = ctx.createRadialGradient(
        cssWidth * 0.5,
        cssHeight * 0.46,
        Math.min(cssWidth, cssHeight) * 0.18,
        cssWidth * 0.5,
        cssHeight * 0.46,
        Math.max(cssWidth, cssHeight) * 0.72,
      );
      depth.addColorStop(0, "transparent");
      depth.addColorStop(0.72, "rgba(2,3,8,0.015)");
      depth.addColorStop(1, "rgba(2,3,8,0.11)");
      ctx.fillStyle = depth;
      ctx.fillRect(0, 0, cssWidth, cssHeight);
    }

    function handleResize() {
      syncCanvasSize();
      if (reduceMotion) drawFrame(0);
    }

    syncCanvasSize();
    window.addEventListener("resize", handleResize);

    if (reduceMotion) {
      drawFrame(0);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

    function draw(time: number) {
      drawFrame(time);
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
