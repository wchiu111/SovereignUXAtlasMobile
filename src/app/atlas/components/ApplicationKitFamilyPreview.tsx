import { motion } from "motion/react";
import type { AtlasModuleFamily } from "../../content/types";
import { resolveStellarColor } from "../constellation/stellarPalette";

interface ApplicationKitFamilyPreviewProps {
  family: AtlasModuleFamily;
  x: number;
  y: number;
  color: string;
  viewportWidth: number;
  viewportHeight: number;
}

const CARD_WIDTH = 342;
const ESTIMATED_CARD_HEIGHT = 270;
const NODE_CLEARANCE = 76;

export default function ApplicationKitFamilyPreview({
  family,
  x,
  y,
  color,
  viewportWidth,
  viewportHeight,
}: ApplicationKitFamilyPreviewProps) {
  const DRAWER_WIDTH = 420;
  const SAFE_RIGHT_EDGE = viewportWidth - DRAWER_WIDTH - 28;
  const placeLeft = x + NODE_CLEARANCE + CARD_WIDTH > SAFE_RIGHT_EDGE;
  const left = placeLeft
    ? Math.max(24, x - CARD_WIDTH - NODE_CLEARANCE)
    : Math.min(x + NODE_CLEARANCE, SAFE_RIGHT_EDGE - CARD_WIDTH);
  const top = Math.min(
    Math.max(24, y - ESTIMATED_CARD_HEIGHT * 0.44),
    Math.max(24, viewportHeight - ESTIMATED_CARD_HEIGHT - 24),
  );

  return (
    <motion.aside
      key={family.id}
      initial={{ opacity: 0, y: 8, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.99 }}
      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-30 pointer-events-none"
      style={{
        left,
        top,
        width: CARD_WIDTH,
        padding: "26px 28px 28px",
        background: "rgba(7,7,13,0.95)",
        border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`,
        borderRadius: 16,
        backdropFilter: "blur(24px)",
        boxShadow:
          `0 26px 88px rgba(0,0,0,0.5), 0 0 44px color-mix(in srgb, ${color} 9%, transparent), inset 0 1px 0 rgba(255,255,255,0.025)`,
        color: "#F4EBD0",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 21,
          lineHeight: 1.08,
          letterSpacing: "0.13em",
          color,
          textTransform: "uppercase",
          marginBottom: 15,
        }}
      >
        {family.title}
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 15,
          lineHeight: 1.58,
          color: "rgba(245,235,210,0.84)",
          marginBottom: 22,
        }}
      >
        {family.description}
      </div>

      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)",
          marginBottom: 18,
        }}
      />

      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 8,
          lineHeight: 1,
          letterSpacing: "0.22em",
          color: `color-mix(in srgb, ${color} 82%, white 18%)`,
          textTransform: "uppercase",
          marginBottom: 13,
        }}
      >
        {family.modules.length} modules
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {family.modules.map((module) => {
          const moduleColor = resolveStellarColor(module.stellarType, color);
          const moduleTitle = module.title
            .toLowerCase()
            .replace(/\b\w/g, (character) => character.toUpperCase());

          return (
            <div
              key={module.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: 9,
                  height: 9,
                  flex: "0 0 auto",
                  borderRadius: "50%",
                  background: moduleColor,
                  border: "1px solid rgba(255,255,255,0.24)",
                  boxShadow: `0 0 8px ${moduleColor}`,
                }}
              />

              <span
                style={{
                  fontFamily: "'EB Garamond',serif",
                  fontSize: 14,
                  lineHeight: 1.3,
                  color: "rgba(245,235,210,0.82)",
                }}
              >
                {moduleTitle}
              </span>
            </div>
          );
        })}
      </div>
    </motion.aside>
  );
}