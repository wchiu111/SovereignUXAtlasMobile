import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Planet, StarSystem } from "../../types/atlas";
import { buildAtlasConceptPreview } from "./AtlasConceptPreviewContent";

interface AtlasConceptPreviewProps {
  system: StarSystem;
  planet: Planet;
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

const CARD_WIDTH = 430;
const CARD_GUTTER = 28;
const ANCHOR_GAP = 82;
const ESTIMATED_CARD_HEIGHT = 360;
const SAFE_TOP = 84;
const SAFE_BOTTOM = 72;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function sentenceCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function AtlasConceptPreview({
  system,
  planet,
  x,
  y,
  viewportWidth,
  viewportHeight,
}: AtlasConceptPreviewProps) {
  const content = buildAtlasConceptPreview(system, planet);
  const compact = viewportWidth < 760;
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [cardHeight, setCardHeight] = useState(ESTIMATED_CARD_HEIGHT);

  useLayoutEffect(() => {
    const nextHeight = cardRef.current?.getBoundingClientRect().height;
    if (nextHeight && Math.abs(nextHeight - cardHeight) > 1) {
      setCardHeight(nextHeight);
    }
  }, [content.id, content.metaItems.length, viewportWidth, cardHeight]);

  const renderedWidth = compact
    ? Math.min(CARD_WIDTH, viewportWidth - CARD_GUTTER * 2)
    : CARD_WIDTH;

  const rightCandidate = x + ANCHOR_GAP;
  const leftCandidate = x - renderedWidth - ANCHOR_GAP;
  const canPlaceRight =
    rightCandidate + renderedWidth <= viewportWidth - CARD_GUTTER;
  const canPlaceLeft = leftCandidate >= CARD_GUTTER;

  const left = compact
    ? Math.max(CARD_GUTTER, (viewportWidth - renderedWidth) / 2)
    : canPlaceRight
      ? rightCandidate
      : canPlaceLeft
        ? leftCandidate
        : clamp(
            x < viewportWidth / 2 ? rightCandidate : leftCandidate,
            CARD_GUTTER,
            viewportWidth - renderedWidth - CARD_GUTTER,
          );

  const maxTop = Math.max(
    SAFE_TOP,
    viewportHeight - cardHeight - SAFE_BOTTOM,
  );

  const top = compact
    ? clamp(
        viewportHeight - cardHeight - SAFE_BOTTOM,
        SAFE_TOP,
        maxTop,
      )
    : clamp(
        y - cardHeight * 0.46,
        SAFE_TOP,
        maxTop,
      );

  return (
    <motion.aside
      ref={cardRef}
      key={content.id}
      initial={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 8, scale: 0.985 }
      }
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 5, scale: 0.99 }
      }
      transition={{
        duration: reduceMotion ? 0.12 : 0.26,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed z-30 pointer-events-none"
      style={{
        left,
        top,
        width: renderedWidth,
        maxWidth: CARD_WIDTH,
        padding: "30px 34px 32px",
        background: "rgba(6,7,12,0.955)",
        border: `1px solid color-mix(in srgb, ${content.color} 34%, transparent)`,
        borderRadius: 16,
        backdropFilter: "blur(26px)",
        boxShadow:
          `0 28px 96px rgba(0,0,0,0.54), 0 0 54px color-mix(in srgb, ${content.color} 9%, transparent), inset 0 1px 0 rgba(255,255,255,0.025)`,
        color: "#F4EBD0",
        overflow: "hidden",
        maxHeight: `calc(100vh - ${SAFE_TOP + SAFE_BOTTOM}px)`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          backgroundImage:
            `linear-gradient(${content.color}14 1px, transparent 1px), linear-gradient(90deg, ${content.color}0D 1px, transparent 1px)`,
          backgroundSize: "42px 42px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.78), rgba(0,0,0,0.08) 70%, transparent)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: content.color,
            marginBottom: 15,
          }}
        >
          {content.eyebrow}
        </div>

        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 27,
            lineHeight: 1.08,
            fontWeight: 400,
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: content.color,
            marginBottom: 18,
          }}
        >
          {content.title}
        </div>

        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 15,
            lineHeight: 1.58,
            fontWeight: 400,
            color: "rgba(245,235,210,0.84)",
          }}
        >
          {content.description}
        </div>

        {content.metaItems.length > 0 && (
          <>
            <div
              style={{
                height: 1,
                margin: "26px 0 20px",
                background: "linear-gradient(90deg, rgba(255,255,255,0.12), transparent)",
              }}
            />

            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: 8,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: `color-mix(in srgb, ${content.color} 82%, white 18%)`,
                marginBottom: 13,
              }}
            >
              {content.metaLabel}
            </div>

            <div
              style={{
                display: "grid",
                gap: 12,
              }}
            >
              {content.metaItems.map((item) => (
                <div
                  key={item}
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
                      background: content.color,
                      border: "1px solid rgba(255,255,255,0.24)",
                      boxShadow: `0 0 8px ${content.color}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "'EB Garamond', serif",
                      fontSize: 14,
                      lineHeight: 1.3,
                      color: "rgba(245,235,210,0.82)",
                    }}
                  >
                    {sentenceCase(item)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.aside>
  );
}
