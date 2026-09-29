import { T } from "../../components/mobileShared";
import { CASE_STUDY_FOCUS_ITEMS } from "../caseStudyData";
import AtlasOverviewDrawer from "../../overview/AtlasOverviewDrawer";

export default function ProjectPreviewDrawer({
  item,
  phase,
  onExplore,
  arrivalVisible = true,
  reducedMotion = false,
  closeDurationMs,
  reducedDurationMs,
}: {
  item: (typeof CASE_STUDY_FOCUS_ITEMS)[number];
  phase: "open" | "closing" | "opening";
  onExplore: () => void;
  arrivalVisible?: boolean;
  reducedMotion?: boolean;
  closeDurationMs: number;
  reducedDurationMs: number;
}) {
  const isCaseStudies = item.id === "case-studies";
  const color = isCaseStudies ? T.caseStudies : item.color;

  return (
    <AtlasOverviewDrawer
      title={item.label}
      titleColor={T.caseStudies}
      color={color}
      countLabel={isCaseStudies ? "4 PROJECTS" : undefined}
      phase={phase}
      arrivalVisible={arrivalVisible}
      reducedMotion={reducedMotion}
      closeDurationMs={closeDurationMs}
      reducedDurationMs={reducedDurationMs}
      footer={
        !isCaseStudies ? (
          <button
            type="button"
            onClick={onExplore}
            aria-label={`Explore ${item.label}`}
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
              color: T.caseStudies,
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
      {isCaseStudies ? (
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
            See how decisions became outcomes.
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
            Each case study traces a project through its context, constraints,
            design decisions, evidence, and results.
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
            Enter a system to understand not only what was created, but why it
            took the form it did.
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
