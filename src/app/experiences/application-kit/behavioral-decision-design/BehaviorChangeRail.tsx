import type { BehavioralStageId } from "./behavioralDecisionDesignData";
import { APPLY_CHANGE_NOTES } from "./behavioralDecisionDesignData";

interface Props {
  active: BehavioralStageId | null;
  onActiveChange: (id: BehavioralStageId | null) => void;
}

const STAGE_COLORS: Record<BehavioralStageId, string> = {
  interpret: "rgba(139,188,221,.92)",
  separate: "rgba(216,186,79,.92)",
  frame: "rgba(226,220,201,.88)",
  recommend: "rgba(221,146,81,.94)",
  confirm: "rgba(220,93,87,.94)",
  act: "rgba(178,141,227,.94)",
};

export default function BehaviorChangeRail({
  active,
  onActiveChange,
}: Props) {
  return (
    <aside
      style={{
        alignSelf: "start",
        width: "100%",
        padding: "22px 18px 18px",
        border: "1px solid rgba(245,235,210,.08)",
        background:
          "linear-gradient(180deg, rgba(7,10,17,.78), rgba(4,7,12,.68))",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 9,
          letterSpacing: ".17em",
          textTransform: "uppercase",
          color: "rgba(200,180,130,.62)",
          marginBottom: 18,
        }}
      >
        What changed?
      </div>

      <div style={{ display: "grid", gap: 4 }}>
        {APPLY_CHANGE_NOTES.map((item, index) => {
          const color = STAGE_COLORS[item.id];

          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => onActiveChange(item.id)}
              onMouseLeave={() => onActiveChange(null)}
              onFocus={() => onActiveChange(item.id)}
              onBlur={() => onActiveChange(null)}
              style={{
                display: "grid",
                gridTemplateColumns: "32px 118px minmax(0, 1fr)",
                columnGap: 10,
                alignItems: "start",
                minHeight: 76,
                padding: "12px 8px",
                border: "1px solid transparent",
                background:
                  active === item.id
                    ? "rgba(245,235,210,.045)"
                    : "transparent",
                color: "inherit",
                textAlign: "left",
                cursor: "default",
                transition: "background .25s ease",
              }}
            >
              <span
                style={{
                  paddingTop: 1,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  lineHeight: 1.45,
                  color,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                style={{
                  paddingTop: 1,
                  fontFamily: "'DM Mono',monospace",
                  fontSize: 9,
                  lineHeight: 1.45,
                  letterSpacing: ".1em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  color:
                    active === item.id
                      ? color
                      : "rgba(245,235,210,.72)",
                }}
              >
                {item.id}
              </span>

              <span
                style={{
                  maxWidth: 190,
                  fontFamily: "'EB Garamond',serif",
                  fontSize: 14.5,
                  lineHeight: 1.42,
                  color:
                    active === item.id
                      ? "rgba(255,248,230,.84)"
                      : "rgba(245,235,210,.58)",
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 14,
          paddingTop: 15,
          borderTop: "1px solid rgba(245,235,210,.07)",
          fontFamily: "'EB Garamond',serif",
          fontSize: 13.5,
          lineHeight: 1.45,
          color: "rgba(245,235,210,.38)",
        }}
      >
        Hover over a principle to focus on how it changes the interface.
      </div>
    </aside>
  );
}
