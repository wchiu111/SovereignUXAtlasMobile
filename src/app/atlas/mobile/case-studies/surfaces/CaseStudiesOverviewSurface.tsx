import { T } from "../../components/mobileShared";
import { CASE_STUDY_FOCUS_ITEMS } from "../caseStudyData";

export default function CaseStudiesOverviewSurface({
  item,
}: {
  item: (typeof CASE_STUDY_FOCUS_ITEMS)[number];
}) {
  const sections = [
    { label: "WHAT", body: item.overview.what },
    { label: "WHY", body: item.overview.why },
    { label: "RESEARCH FOCUS", body: item.overview.researchFocus },
    { label: "KEY DISCOVERY", body: item.overview.keyDiscovery },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: "auto",
        bottom: 0,
        height: "min(382px, 48dvh)",
        left: 0,
        right: 0,
        boxSizing: "border-box",
        borderTop: `1px solid ${item.id === "case-studies" ? T.caseStudies : item.color}44`,
        background: "rgba(5,5,10,0.94)",
        backdropFilter: "blur(26px)",
        WebkitBackdropFilter: "blur(26px)",
        padding: "20px 28px calc(28px + env(safe-area-inset-bottom, 0px))",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 21.5,
            fontWeight: 600,
            letterSpacing: "0.10em",
            color: T.caseStudies,
            opacity: 0.98,
            lineHeight: 1.1,
          }}
        >
          {item.label}
        </div>
        <div
          style={{
            flexShrink: 0,
            fontFamily: T.mono,
            fontSize: 9,
            letterSpacing: "0.14em",
            color: T.accentGold,
            opacity: 0.80,
          }}
        >
          {item.meta}
        </div>
      </div>

      <div
        style={{
          height: 0.5,
          background: "rgba(138,174,200,0.14)",
          marginBottom: 16,
        }}
      />

      {sections.map(({ label, body }) => (
        <div key={label} style={{ marginBottom: label === "KEY DISCOVERY" ? 22 : 20 }}>
          <div
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              letterSpacing: "0.18em",
              color: T.accentGold,
              opacity: 0.76,
              marginBottom: 7,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 14.5,
              color: T.body,
              opacity: 0.9,
              lineHeight: 1.62,
            }}
          >
            {body}
          </div>
        </div>
      ))}
    </div>
  );
}
