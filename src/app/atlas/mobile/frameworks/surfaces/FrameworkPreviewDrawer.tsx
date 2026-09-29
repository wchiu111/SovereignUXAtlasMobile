import { T } from "../../components/mobileShared";
import AtlasOverviewDrawer from "../../overview/AtlasOverviewDrawer";
import {
  FRAMEWORKS_COLLECTION_OVERVIEW,
  type FrameworkFocusItem,
} from "../frameworkOverviewData";

export default function FrameworkPreviewDrawer({
  item,
  phase,
  onExplore,
  arrivalVisible = true,
  reducedMotion = false,
  closeDurationMs,
  reducedDurationMs,
}: {
  item: FrameworkFocusItem | null;
  phase: "open" | "closing" | "opening";
  onExplore: () => void;
  arrivalVisible?: boolean;
  reducedMotion?: boolean;
  closeDurationMs: number;
  reducedDurationMs: number;
}) {
  const isParent = item === null;

  return (
    <AtlasOverviewDrawer
      title={isParent ? FRAMEWORKS_COLLECTION_OVERVIEW.title : item.title}
      color={T.frameworks}
      countLabel={
        isParent ? FRAMEWORKS_COLLECTION_OVERVIEW.meta : undefined
      }
      phase={phase}
      arrivalVisible={arrivalVisible}
      reducedMotion={reducedMotion}
      closeDurationMs={closeDurationMs}
      reducedDurationMs={reducedDurationMs}
      footer={
        !isParent ? (
          <button
            type="button"
            onClick={onExplore}
            aria-label={`Explore ${item.title}`}
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
              color: T.frameworks,
              opacity: 0.98,
              cursor: "pointer",
              borderRadius: 3,
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
            }}
          >
            EXPLORE →
          </button>
        ) : undefined
      }
    >
      {isParent ? (
        <>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 15,
              fontWeight: 600,
              color: T.identityGold,
              lineHeight: 1.35,
              marginBottom: 14,
            }}
          >
            {FRAMEWORKS_COLLECTION_OVERVIEW.headline}
          </div>

          <div
            style={{
              fontFamily: T.serif,
              fontSize: 13,
              color: T.body,
              opacity: 0.90,
              lineHeight: 1.5,
              marginBottom: 12,
            }}
          >
            {FRAMEWORKS_COLLECTION_OVERVIEW.body}
          </div>

          <div
            style={{
              fontFamily: T.serif,
              fontSize: 13,
              color: T.body,
              opacity: 0.86,
              lineHeight: 1.48,
            }}
          >
            {FRAMEWORKS_COLLECTION_OVERVIEW.invitation}
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
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
            {item.overview.what}
          </div>

          <div
            style={{
              fontFamily: T.serif,
              fontSize: 14.5,
              color: "#F0E9D8",
              opacity: 0.84,
              lineHeight: 1.56,
              margin: 0,
            }}
          >
            {item.overview.why}
          </div>
        </div>
      )}
    </AtlasOverviewDrawer>
  );
}
