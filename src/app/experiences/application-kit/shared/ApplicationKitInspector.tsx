import type { CSSProperties } from "react";

export interface ApplicationKitInspectorStage<T extends string> {
  id: T;
  title: string;
  summary: string;
  color: string;
}

interface ApplicationKitInspectorProps<T extends string> {
  stages: ApplicationKitInspectorStage<T>[];
  active: boolean;
  focusId: T | null;
  onFocusChange: (id: T | null) => void;
  footer?: string;
}

export default function ApplicationKitInspector<T extends string>({
  stages,
  active,
  focusId,
  onFocusChange,
  footer = "Hover a principle to see how it changes this interface.",
}: ApplicationKitInspectorProps<T>) {
  return (
    <aside
      style={{
        ...styles.panel,
        opacity: active ? 1 : 0.2,
        pointerEvents: active ? "auto" : "none",
      }}
    >
      <div style={styles.title}>What changed?</div>

      <div style={styles.list}>
        {stages.map((stage, index) => {
          const focused = stage.id === focusId;

          return (
            <button
              key={stage.id}
              type="button"
              onMouseEnter={() => onFocusChange(stage.id)}
              onMouseLeave={() => onFocusChange(null)}
              onFocus={() => onFocusChange(stage.id)}
              onBlur={() => onFocusChange(null)}
              onClick={() =>
                onFocusChange(focused ? null : stage.id)
              }
              style={{
                ...styles.stage,
                background: focused ? `${stage.color}08` : "transparent",
              }}
            >
              <span
                style={{
                  ...styles.number,
                  color: stage.color,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span style={styles.name}>{stage.title}</span>

              <span
                style={{
                  ...styles.summary,
                  maxHeight: focused ? 56 : 0,
                  marginTop: focused ? 6 : 0,
                  opacity: focused ? 1 : 0,
                }}
              >
                {stage.summary}
              </span>
            </button>
          );
        })}
      </div>

      <div style={styles.footer}>{footer}</div>
    </aside>
  );
}

const styles: Record<string, CSSProperties> = {
  panel: {
    padding: "20px 18px",
    border: "1px solid rgba(245,235,210,.10)",
    background: "rgba(4,7,12,.76)",
    transition: "opacity .35s cubic-bezier(.16,1,.3,1)",
  },
  title: {
    paddingBottom: 14,
    marginBottom: 6,
    borderBottom: "1px solid rgba(245,235,210,.08)",
    fontFamily: "'DM Mono',monospace",
    fontSize: 8,
    letterSpacing: ".16em",
    textTransform: "uppercase",
    color: "rgba(200,180,130,.66)",
  },
  list: {
    display: "grid",
  },
  stage: {
    display: "grid",
    gridTemplateColumns: "32px minmax(0,1fr)",
    columnGap: 10,
    minHeight: 48,
    padding: "10px 6px",
    border: 0,
    color: "inherit",
    textAlign: "left",
    cursor: "pointer",
  },
  number: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".10em",
  },
  name: {
    fontFamily: "'DM Mono',monospace",
    fontSize: 8.5,
    letterSpacing: ".10em",
    textTransform: "uppercase",
    color: "rgba(245,235,210,.78)",
  },
  summary: {
    gridColumn: "2",
    overflow: "hidden",
    fontFamily: "'EB Garamond',serif",
    fontSize: 13.5,
    lineHeight: 1.38,
    color: "rgba(245,235,210,.58)",
    transition:
      "opacity .22s ease,max-height .22s ease,margin-top .22s ease",
  },
  footer: {
    marginTop: 12,
    paddingTop: 14,
    borderTop: "1px solid rgba(245,235,210,.08)",
    fontFamily: "'EB Garamond',serif",
    fontSize: 13,
    lineHeight: 1.45,
    color: "rgba(245,235,210,.38)",
  },
};
