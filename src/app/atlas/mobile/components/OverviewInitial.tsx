import { T } from "../../components/mobileShared";

export default function OverviewInitial({ onExplore }: { onExplore: () => void }) {
  const c = T.caseStudies;
  return (
    <div
      style={{
        position: "absolute",
        top: 462,
        bottom: 0,
        left: 0,
        right: 0,
        boxSizing: "border-box",
        borderTop: `0.5px solid rgba(138,174,200,0.28)`,
        background: "rgba(5,5,10,0.94)",
        backdropFilter: "blur(26px)",
        WebkitBackdropFilter: "blur(26px)",
        padding: "22px 28px 28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <div
          style={{
            fontFamily: T.serif,
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: c,
            opacity: 0.96,
          }}
        >
          CASE STUDIES
        </div>
      </div>

      <div
        style={{
          fontFamily: T.mono,
          fontSize: 8,
          letterSpacing: "0.18em",
          color: T.accentGold,
          opacity: 0.82,
          marginBottom: 14,
        }}
      >
        4 PROJECTS
      </div>

      <div
        style={{
          height: 0.5,
          background: "rgba(232,213,163,0.12)",
          marginBottom: 15,
        }}
      />

      <div
        style={{
          fontFamily: T.serif,
          fontSize: 16,
          fontWeight: 600,
          color: T.identityGold,
          opacity: 0.94,
          lineHeight: 1.36,
          marginBottom: 12,
        }}
      >
        See how decisions became outcomes.
      </div>

      <div
        style={{
          fontFamily: T.serif,
          fontSize: 13,
          color: T.body,
          opacity: 0.86,
          lineHeight: 1.48,
          marginBottom: 10,
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
        Enter a system to understand not only what was created, but why it took
        the form it did.
      </div>

      <div
        style={{
          marginTop: "auto",
          paddingTop: 15,
          borderTop: "0.5px solid rgba(138,174,200,0.12)",
        }}
      >
        <div
          onClick={onExplore}
          style={{
            minHeight: 44,
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            paddingRight: 18,
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.18em",
            color: c,
            opacity: 0.96,
            cursor: "pointer",
          }}
        >
          EXPLORE →
        </div>
      </div>
    </div>
  );
}
