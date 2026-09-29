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
    };

    // Star positions are normalized to the environmental viewport.
    // The field therefore fills the device without changing the Atlas scene geometry.
    const stars: Star[] = Array.from({ length: 360 }, () => ({
      nx:    Math.random(),
      ny:    Math.random(),
      r:     Math.pow(Math.random(), 2.8) * 1.5 + 0.18,
      base:  Math.random() * 0.55 + 0.08,
      phase: Math.random() * Math.PI * 2,
      spd:   Math.random() * 0.0009 + 0.0002,
      gold:  Math.random() < 0.30,
    }));

    let cssWidth = W;
    let cssHeight = H;
    let raf = 0;
    let t = 0;

    function syncCanvasSize() {
      const rect = canvas.getBoundingClientRect();
      cssWidth = Math.max(1, rect.width);
      cssHeight = Math.max(1, rect.height);

      // Keep the canvas crisp without allowing very high DPR devices
      // to multiply the starfield backing store excessively.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixelWidth = Math.max(1, Math.round(cssWidth * dpr));
      const pixelHeight = Math.max(1, Math.round(cssHeight * dpr));

      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }

      // Continue drawing in CSS-pixel coordinates.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawFrame(time: number) {
      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.fillStyle = T.bg;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      // Map the original atmosphere anchors proportionally into the
      // environmental viewport. At 390×844 these resolve exactly to
      // the original authored values.
      const scaleX = cssWidth / W;
      const scaleY = cssHeight / H;
      const radiusScale = Math.min(scaleX, scaleY);

      const nexusX = NEXUS.x * scaleX;
      const nexusY = NEXUS.y * scaleY;
      const ng = ctx.createRadialGradient(
        nexusX,
        nexusY,
        0,
        nexusX,
        nexusY,
        310 * radiusScale,
      );
      ng.addColorStop(0,    "rgba(138,174,200,0.042)");
      ng.addColorStop(0.30, "rgba(166,139,212,0.028)");
      ng.addColorStop(0.60, "rgba(106,184,138,0.014)");
      ng.addColorStop(1,    "transparent");
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
      fg.addColorStop(0, "rgba(106,184,138,0.032)");
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
      ug.addColorStop(0,   "rgba(166,139,212,0.022)");
      ug.addColorStop(0.5, "rgba(138,174,200,0.014)");
      ug.addColorStop(1,   "transparent");
      ctx.fillStyle = ug;
      ctx.fillRect(0, 0, cssWidth, cssHeight);

      for (const s of stars) {
        const tw = reduceMotion
          ? 0
          : Math.sin(time * s.spd + s.phase) * 0.22;
        const opacity = Math.max(0.04, Math.min(0.88, s.base + tw));

        ctx.beginPath();
        ctx.arc(
          s.nx * cssWidth,
          s.ny * cssHeight,
          s.r,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = s.gold
          ? `rgba(232,213,163,${opacity})`
          : `rgba(210,218,232,${opacity * 0.72})`;
        ctx.fill();
      }
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

    function draw() {
      t += 16;
      drawFrame(t);
      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
