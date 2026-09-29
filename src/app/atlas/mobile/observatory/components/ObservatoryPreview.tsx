import { T } from "../../components/mobileShared";
import AtlasOverviewDrawer from "../../overview/AtlasOverviewDrawer";
import type { ObservatoryHotspotDefinition } from "../observatoryTypes";

export default function ObservatoryPreview({
  hotspot,
  onExplore,
}: {
  hotspot: ObservatoryHotspotDefinition;
  onExplore: () => void;
}) {
  return (
    <div
      aria-label={`${hotspot.label} preview`}
      data-observatory-interactive="true"
      onPointerDown={(event) => event.stopPropagation()}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 18,
        pointerEvents: "none",
        animation:
          "observatoryMobilePreviewIn 320ms cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      <AtlasOverviewDrawer
        title={hotspot.label}
        titleColor={hotspot.color}
        color={hotspot.color}
        countLabel={hotspot.eyebrow.toUpperCase()}
        phase="open"
        arrivalVisible
        reducedMotion={false}
        closeDurationMs={320}
        reducedDurationMs={160}
        compact
        footer={
          <button
            type="button"
            onClick={onExplore}
            aria-label={
              hotspot.id === "atlas"
                ? "Enter Atlas"
                : `Explore ${hotspot.label}`
            }
            className="observatory-mobile-focusable"
            style={{
              minHeight: 52,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              background: "transparent",
              padding: "0 12px",
              fontFamily: T.mono,
              fontSize: 12.5,
              letterSpacing: "0.14em",
              color: hotspot.color,
              opacity: 0.98,
              cursor: "pointer",
              borderRadius: 3,
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            {hotspot.id === "atlas" ? "ENTER ATLAS →" : "EXPLORE →"}
          </button>
        }
      >
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 14.5,
            color: "#F0E9D8",
            opacity: 0.90,
            lineHeight: 1.56,
            margin: 0,
          }}
        >
          {hotspot.description}
        </div>
      </AtlasOverviewDrawer>
    </div>
  );
}
