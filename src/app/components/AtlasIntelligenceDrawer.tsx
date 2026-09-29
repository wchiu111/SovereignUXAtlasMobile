interface AtlasIntelligenceDrawerProps {
  open: boolean;
}

const TOP_RESULT = {
  title: "Globality",
  type: "Case Study",
  meta: "Enterprise AI · Procurement",
};

const RESULTS = [
  { title: "Authority Drift", type: "Experiment" },
  { title: "Mirror Test", type: "Framework" },
  { title: "Trust Signals", type: "Framework" },
];

const SUGGESTED = [
  "Compare Oracle and Globality",
  "Browse AI case studies",
  "Show design systems work",
];

const RECENT = ["Globality", "Authority Drift", "Mirror Test"];

export default function AtlasIntelligenceDrawer({
  open,
}: AtlasIntelligenceDrawerProps) {
  return (
  <aside
    onWheel={(e) => {
    e.stopPropagation();
  }}
    style={{
      position: "absolute",
      top: 84,
      left: "50%",
      width: "820px",
      height: "min(660px, calc(100vh - 120px))",
      zIndex: 900,
      transform: open
        ? "translateX(-50%) translateY(0) scale(1)"
        : "translateX(-50%) translateY(-10px) scale(0.98)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "auto" : "none",
      transition:
        "opacity 0.22s ease, transform 0.32s cubic-bezier(0.22,1,0.36,1)",
      background: "rgba(8,10,16,0.94)",
      border: "1px solid rgba(232,200,109,0.18)",
      borderRadius: "18px",
      backdropFilter: "blur(28px)",
      boxShadow:
        "0 24px 80px rgba(0,0,0,0.55), 0 0 42px rgba(232,200,109,0.08)",
      color: "#F4EBD0",
      overflowX: "hidden",
      overflowY: "auto",
      overscrollBehavior: "contain",
    }}
  >
    <div style={{ padding: "18px" }}>
      <SectionTitle label="Top Result" />

      <ResultCard
        title={TOP_RESULT.title}
        type={TOP_RESULT.type}
        meta={TOP_RESULT.meta}
        emphasized
      />

      <SectionTitle label="Results" />

      {RESULTS.map((item) => (
        <ResultCard key={item.title} title={item.title} type={item.type} />
      ))}

      <SectionTitle label="Suggested Paths" />

      {SUGGESTED.map((item) => (
        <SimpleRow key={item} label={item} />
      ))}

      <SectionTitle label="Recent" />

      {RECENT.map((item) => (
        <SimpleRow key={item} label={item} muted />
      ))}
    </div>
  </aside>
);
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div
      style={{
        marginTop: "24px",
        marginBottom: "10px",
        fontFamily: "'DM Mono', monospace",
        fontSize: "9px",
        letterSpacing: "0.24em",
        color: "rgba(232,200,109,0.45)",
        textTransform: "uppercase",
      }}
    >
      {label}
    </div>
  );
}

function ResultCard({
  title,
  type,
  meta,
  emphasized = false,
}: {
  title: string;
  type: string;
  meta?: string;
  emphasized?: boolean;
}) {
  return (
    <button
      style={{
        width: "100%",
        padding: "14px",
        marginBottom: "8px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: emphasized
          ? "rgba(232,200,109,0.10)"
          : "rgba(255,255,255,0.025)",
        border: emphasized
          ? "1px solid rgba(232,200,109,0.28)"
          : "1px solid rgba(232,200,109,0.10)",
        borderRadius: "12px",
        color: "#F4EBD0",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span>
        <div
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: "16px",
            marginBottom: "2px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "8px",
            letterSpacing: "0.16em",
            color: "rgba(245,235,210,0.42)",
            textTransform: "uppercase",
          }}
        >
          {type}
          {meta ? ` · ${meta}` : ""}
        </div>
      </span>

      <span style={{ color: "#E8C86D", opacity: 0.65 }}>→</span>
    </button>
  );
}

function SimpleRow({
  label,
  muted = false,
  active = false,
  onClick,
}: {
  label: string;
  muted?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px 14px",
        marginBottom: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: active
          ? "rgba(232,200,109,0.12)"
          : "transparent",
        border: "none",
        borderRadius: "10px",
        color: muted ? "rgba(245,235,210,0.50)" : "rgba(245,235,210,0.78)",
        fontFamily: "'EB Garamond', serif",
        fontSize: "14px",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <span>{label}</span>
      <span style={{ color: "#E8C86D", opacity: muted ? 0.35 : 0.55 }}>→</span>
    </button>
  );
}