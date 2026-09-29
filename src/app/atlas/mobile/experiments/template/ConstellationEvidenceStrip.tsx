import { T } from "../../components/mobileShared";
import type { ConstellationEvidence } from "./constellationTypes";

export default function ConstellationEvidenceStrip({
  evidence,
  domainColor,
  itemId,
  sectionId,
  onInspect,
}: {
  evidence: readonly ConstellationEvidence[];
  domainColor: string;
  itemId: string;
  sectionId: string;
  onInspect: (index: number, triggerId: string) => void;
}) {
  const multiple = evidence.length > 1;

  return (
    <div
      role="region"
      aria-label={`${evidence.length} evidence ${
        evidence.length === 1 ? "artifact" : "artifacts"
      }`}
      style={{ margin: "30px 0 28px" }}
    >
      <style>{`
        .atlas-template-evidence-strip {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .atlas-template-evidence-strip::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 11,
        }}
      >
        <div
          style={{
            fontFamily: T.mono,
            fontSize: 7.5,
            letterSpacing: "0.18em",
            color: domainColor,
            opacity: 0.78,
          }}
        >
          EVIDENCE · {String(evidence.length).padStart(2, "0")}{" "}
          {evidence.length === 1 ? "ARTIFACT" : "ARTIFACTS"}
        </div>

        {multiple && (
          <div
            aria-hidden
            style={{
              fontFamily: T.mono,
              fontSize: 6.5,
              letterSpacing: "0.14em",
              color: T.body,
              opacity: 0.32,
            }}
          >
            SWIPE TO COMPARE
          </div>
        )}
      </div>

      <div
        className="atlas-template-evidence-strip"
        style={{
          display: "flex",
          gap: 12,
          overflowX: multiple ? "auto" : "visible",
          overflowY: "hidden",
          scrollSnapType: multiple ? "x mandatory" : undefined,
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          paddingBottom: multiple ? 4 : 0,
        }}
      >
        {evidence.map((item, index) => {
          const triggerId =
            `evidence-${itemId}-${sectionId}-${item.id}`.replace(
              /[^a-zA-Z0-9-_]/g,
              "-",
            );

          return (
            <button
              id={triggerId}
              key={item.id}
              type="button"
              className="mobile-reading-focusable"
              onClick={() => onInspect(index, triggerId)}
              aria-label={`Inspect evidence ${item.number}: ${item.title}`}
              style={{
                flex: multiple ? "0 0 88%" : "1 1 auto",
                width: multiple ? "88%" : "100%",
                scrollSnapAlign: "start",
                overflow: "hidden",
                padding: 0,
                borderRadius: 5,
                border: `0.5px solid ${domainColor}33`,
                background: "rgba(7,7,13,0.82)",
                textAlign: "left",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                style={{
                  width: "100%",
                  minHeight: "clamp(148px, 42vw, 180px)",
                  maxHeight: 220,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  background: "rgba(3,3,8,0.98)",
                  borderBottom: `0.5px solid ${domainColor}1F`,
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    style={{
                      width: "100%",
                      maxHeight: 220,
                      objectFit: item.imageFit,
                      display: "block",
                      opacity: 0.94,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      fontFamily: T.mono,
                      fontSize: 7,
                      letterSpacing: "0.16em",
                      color: T.body,
                      opacity: 0.34,
                    }}
                  >
                    ARTIFACT IMAGE UNAVAILABLE
                  </div>
                )}
              </div>

              <div style={{ padding: "13px 14px 15px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 10,
                    marginBottom: 7,
                  }}
                >
                  <div
                    style={{
                      minWidth: 0,
                      fontFamily: T.mono,
                      fontSize: "clamp(7.5px, 2vw, 8px)",
                      letterSpacing: "0.13em",
                      lineHeight: 1.45,
                      color: "#F0E9D8",
                      opacity: 0.91,
                    }}
                  >
                    {item.number} · {item.title.toUpperCase()}
                  </div>

                  <div
                    aria-hidden
                    style={{
                      flex: "0 0 auto",
                      fontFamily: T.mono,
                      fontSize: 7,
                      letterSpacing: "0.12em",
                      color: domainColor,
                      opacity: 0.84,
                    }}
                  >
                    INSPECT →
                  </div>
                </div>

                <div
                  style={{
                    marginBottom: 8,
                    fontFamily: T.mono,
                    fontSize: 6.5,
                    letterSpacing: "0.13em",
                    color: T.accentGold,
                    opacity: 0.58,
                  }}
                >
                  {item.type.toUpperCase()}
                </div>

                <div
                  style={{
                    fontFamily: T.serif,
                    fontSize: "clamp(12.75px, 3.45vw, 13.75px)",
                    lineHeight: 1.5,
                    color: "#F0E9D8",
                    opacity: 0.80,
                  }}
                >
                  {item.caption}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
