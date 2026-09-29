import { T } from "../components/mobileShared";
import type { MobileEvidenceItem } from "./mobileReadingTypes";

export default function MobileEvidenceBlock({
  evidence,
  onInspect,
}: {
  evidence: MobileEvidenceItem;
  onInspect: (item: MobileEvidenceItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onInspect(evidence)}
      aria-label={`Inspect evidence: ${evidence.title}`}
      className="mobile-reading-focusable mobile-evidence-block"
      style={{
        width: "100%",
        margin: "30px 0 32px",
        padding: 0,
        overflow: "hidden",
        borderRadius: 5,
        border: `0.5px solid ${T.caseStudies}33`,
        background: "rgba(7,7,13,0.80)",
        textAlign: "left",
        cursor: "pointer",
        transition:
          "border-color 180ms ease, background 180ms ease, transform 180ms ease",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "clamp(150px, 44vw, 180px)",
          maxHeight: 260,
          background: "rgba(3,3,8,0.96)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={evidence.image}
          alt={evidence.alt}
          style={{
            width: "100%",
            maxHeight: 260,
            objectFit: evidence.imageFit,
            display: "block",
            opacity: 0.93,
          }}
        />
      </div>

      <div style={{ padding: "14px 14px 16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 7,
          }}
        >
          <div
            style={{
              minWidth: 0,
              fontFamily: T.mono,
              fontSize: "clamp(7.5px, 2vw, 8px)",
              letterSpacing: "0.14em",
              color: "#F0E9D8",
              opacity: 0.90,
              lineHeight: 1.45,
            }}
          >
            {evidence.number} · {evidence.title.toUpperCase()}
          </div>
          <div
            aria-hidden
            style={{
              flexShrink: 0,
              fontFamily: T.mono,
              fontSize: 7.5,
              letterSpacing: "0.12em",
              color: T.caseStudies,
              opacity: 0.84,
            }}
          >
            INSPECT →
          </div>
        </div>

        <div
          style={{
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.13em",
            color: T.accentGold,
            opacity: 0.54,
            marginBottom: 9,
          }}
        >
          {evidence.type.toUpperCase()}
        </div>

        <div
          style={{
            fontFamily: T.serif,
            fontSize: "clamp(13px, 3.55vw, 14px)",
            lineHeight: 1.52,
            color: "#F0E9D8",
            opacity: 0.80,
          }}
        >
          {evidence.caption}
        </div>
      </div>
    </button>
  );
}
