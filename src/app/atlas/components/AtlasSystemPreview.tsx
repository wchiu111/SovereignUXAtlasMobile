import { motion } from "motion/react";
import AtlasPreviewAnimation from "./AtlasPreviewAnimation";
import {
  ATLAS_PREVIEW_CONTENT,
  type AtlasPreviewId,
} from "./AtlasPreviewContent";

interface AtlasSystemPreviewProps {
  previewId: AtlasPreviewId;
  x: number;
  y: number;
  viewportWidth: number;
  viewportHeight: number;
}

const CARD_WIDTH = 430;
const CARD_HEIGHT = 470;

export default function AtlasSystemPreview({
  previewId,
  x,
  y,
  viewportWidth,
  viewportHeight,
}: AtlasSystemPreviewProps) {
  const content = ATLAS_PREVIEW_CONTENT[previewId];
  const placeLeft = x + 92 + CARD_WIDTH > viewportWidth - 24;
  const left = placeLeft ? x - CARD_WIDTH - 92 : x + 92;
  const top = Math.min(
    Math.max(y - 205, 24),
    Math.max(24, viewportHeight - CARD_HEIGHT - 24),
  );

  return (
    <motion.aside
      key={previewId}
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.99 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="fixed z-30 pointer-events-none"
      style={{
        left,
        top,
        width: CARD_WIDTH,
        padding: "24px 28px 30px",
        background: "rgba(7,7,13,0.94)",
        border: `1px solid color-mix(in srgb, ${content.color} 28%, transparent)`,
        borderRadius: 16,
        backdropFilter: "blur(26px)",
        boxShadow:
          `0 28px 96px rgba(0,0,0,0.52), 0 0 52px color-mix(in srgb, ${content.color} 10%, transparent), inset 0 1px 0 rgba(255,255,255,0.025)`,
        color: "#F4EBD0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 124,
          margin: "-4px -8px 22px",
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(180deg, black 0%, black 78%, transparent 100%)",
          maskImage:
            "linear-gradient(180deg, black 0%, black 78%, transparent 100%)",
        }}
      >
        <AtlasPreviewAnimation previewId={previewId} />
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 22,
          letterSpacing: "0.16em",
          color: content.color,
          textTransform: "uppercase",
          marginBottom: 14,
        }}
      >
        {content.title}
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 16,
          lineHeight: 1.55,
          color: "rgba(245,235,210,0.9)",
          marginBottom: 18,
          fontWeight: 500,
          fontStyle: "normal",
        }}
      >
        {content.eyebrow}
      </div>

      <div
        style={{
          fontFamily: "'EB Garamond',serif",
          fontSize: 14,
          lineHeight: 1.75,
          color: "rgba(245,235,210,0.75)",
        }}
      >
        {content.paragraphs.map((paragraph, index) => (
          <p
            key={paragraph}
            style={{
              margin:
                index === content.paragraphs.length - 1
                  ? 0
                  : "0 0 14px",
            }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </motion.aside>
  );
}
