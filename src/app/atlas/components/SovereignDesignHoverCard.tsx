import { motion } from "motion/react";
import SovereignOriginBanner from "./SovereignOriginBanner";

interface SovereignDesignHoverCardProps {
  x: number;
  y: number;
}

export default function SovereignDesignHoverCard({
  x,
  y,
}: SovereignDesignHoverCardProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 10, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.99 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute z-30 pointer-events-none"
      style={{
        left: `${x + 110}px`,
        top: `${y - 224}px`,
        width: "430px",
        padding: "26px 28px 30px",
        background:
          "linear-gradient(180deg, rgba(8,8,14,0.9) 0%, rgba(7,7,13,0.95) 46%, rgba(7,7,13,0.97) 100%)",
        border: "1px solid rgba(232, 200, 109, 0.24)",
        borderRadius: "16px",
        backdropFilter: "blur(26px)",
        boxShadow:
          "0 28px 96px rgba(0,0,0,0.52), 0 0 52px rgba(232,200,109,0.09), inset 0 1px 0 rgba(255,255,255,0.025)",
        color: "#F4EBD0",
        overflow: "hidden",
      }}
    >
      <SovereignOriginBanner />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'EB Garamond',serif",
          fontSize: "22px",
          letterSpacing: "0.16em",
          color: "#E8C86D",
          textTransform: "uppercase",
          marginBottom: "14px",
        }}
      >
        Sovereign Design
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'EB Garamond',serif",
          fontSize: "16px",
          lineHeight: 1.55,
          color: "rgba(245,235,210,0.9)",
          marginBottom: "18px",
          fontWeight: 500,
        }}
      >
        Every constellation begins here.
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "'EB Garamond',serif",
          fontSize: "14px",
          lineHeight: 1.75,
          color: "rgba(245,235,210,0.75)",
        }}
      >
        <p style={{ margin: "0 0 14px" }}>
          Before there are products, there are principles.
        </p>

        <p style={{ margin: "0 0 14px" }}>
          The Atlas is a collection of projects, experiments, and frameworks,
          but they all emerge from the same philosophy: technology should
          strengthen human judgment, not replace it.
        </p>

        <p style={{ margin: 0 }}>
          We design systems that people can understand, question, and trust.
          Everything beyond this point is an exploration of that belief.
        </p>
      </div>
    </motion.aside>
  );
}
