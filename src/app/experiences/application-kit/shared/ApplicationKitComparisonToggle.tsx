type ComparisonMode = "without" | "with";

interface ApplicationKitComparisonToggleProps {
  mode: ComparisonMode;
  onChange: (mode: ComparisonMode) => void;
  accentColor: string;
}

const MODES: Array<{ id: ComparisonMode; label: string }> = [
  { id: "without", label: "Without framework" },
  { id: "with", label: "With framework" },
];

export default function ApplicationKitComparisonToggle({
  mode,
  onChange,
  accentColor,
}: ApplicationKitComparisonToggleProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
      <div
        role="group"
        aria-label="Framework comparison"
        style={{
          display: "inline-flex",
          border: "1px solid rgba(245,235,210,.10)",
        }}
      >
        {MODES.map(({ id, label }) => {
          const active = mode === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              aria-pressed={active}
              style={{
                minWidth: 158,
                minHeight: 46,
                padding: "0 16px",
                border: 0,
                borderRight:
                  id === "without"
                    ? "1px solid rgba(245,235,210,.10)"
                    : 0,
                background: active ? `${accentColor}12` : "transparent",
                color: active
                  ? "rgba(255,248,230,.94)"
                  : "rgba(245,235,210,.46)",
                fontFamily: "'DM Mono',monospace",
                fontSize: 9,
                letterSpacing: ".13em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
