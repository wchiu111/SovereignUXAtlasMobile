import { useState } from "react";
import { CHECKLIST, PATTERNS } from "./behavioralDecisionDesignData";

const FAILURES = [
  ["Recommendation presented as fact", "Evidence and reasoning are visible"],
  ["Hidden assumptions", "Interpretation is transparent"],
  ["Overconfident language", "Recommendation strength is proportional"],
  ["Missing correction path", "Correction and override are easy"],
  ["User becomes passive", "Human retains judgment and authority"],
];

export default function BehavioralToolkit() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <section style={{ ...panel, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        <div style={{ padding: 22, borderRight: "1px solid rgba(245,235,210,.08)" }}>
          <div style={{ ...eyebrow, color: "#E07A66" }}>Common failure modes</div>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {FAILURES.map(([failure]) => (
              <div key={failure} style={row}>
                <span style={{ color: "#E07A66" }}>×</span><span>{failure}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: 22 }}>
          <div style={{ ...eyebrow, color: "#65D69A" }}>With behavioral design</div>
          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {FAILURES.map(([, success]) => (
              <div key={success} style={row}>
                <span style={{ color: "#65D69A" }}>✓</span><span>{success}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={panel}>
        <div style={{ padding: "20px 22px 8px" }}>
          <div style={{ ...eyebrow, color: "rgba(170,150,230,.80)" }}>Design patterns</div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ minWidth: 720 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1.2fr 1fr", padding: "10px 22px", borderTop: "1px solid rgba(245,235,210,.06)", borderBottom: "1px solid rgba(245,235,210,.06)", fontFamily: "'DM Mono',monospace", fontSize: 7.5, letterSpacing: ".18em", color: "rgba(245,235,210,.34)", textTransform: "uppercase" }}>
              <span>Pattern</span><span>Purpose</span><span>When to use</span>
            </div>
            {PATTERNS.map(([pattern, purpose, when]) => (
              <div key={pattern} style={{ display: "grid", gridTemplateColumns: "1.15fr 1.2fr 1fr", padding: "12px 22px", borderBottom: "1px solid rgba(245,235,210,.05)", fontFamily: "'EB Garamond',serif", fontSize: 12.5, lineHeight: 1.4, color: "rgba(245,235,210,.64)" }}>
                <span style={{ color: "rgba(245,235,210,.82)" }}>{pattern}</span><span>{purpose}</span><span>{when}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ ...panel, padding: 22 }}>
        <div style={{ ...eyebrow, color: "#65D69A" }}>Implementation checklist</div>
        <p style={{ margin: "10px 0 18px", fontFamily: "'EB Garamond',serif", fontSize: 13.5, lineHeight: 1.5, color: "rgba(245,235,210,.48)" }}>
          Use this as a reflection aid, not a score. Uncheckable items are signals to revisit the design.
        </p>
        <div style={{ display: "grid", gap: 10 }}>
          {CHECKLIST.map((item, index) => (
            <label key={item} style={{ display: "grid", gridTemplateColumns: "18px 1fr", gap: 10, alignItems: "start", cursor: "pointer", fontFamily: "'EB Garamond',serif", fontSize: 13.5, lineHeight: 1.45, color: checked[index] ? "rgba(245,235,210,.78)" : "rgba(245,235,210,.58)" }}>
              <input
                type="checkbox"
                checked={Boolean(checked[index])}
                onChange={(event) => setChecked((current) => ({ ...current, [index]: event.target.checked }))}
                style={{ marginTop: 2, accentColor: "#65D69A" }}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
        <div style={{ marginTop: 18, padding: "11px 13px", border: "1px solid rgba(200,169,110,.18)", fontFamily: "'EB Garamond',serif", fontSize: 12.5, lineHeight: 1.45, color: "rgba(200,169,110,.68)" }}>
          If any item cannot be checked, revisit the design rather than treating the checklist as complete.
        </div>
      </section>
    </div>
  );
}

const panel = {
  border: "1px solid rgba(200,180,130,0.09)",
  background: "rgba(255,255,255,0.012)",
};

const eyebrow = {
  fontFamily: "'DM Mono',monospace",
  fontSize: 8,
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
};

const row = {
  display: "grid",
  gridTemplateColumns: "18px 1fr",
  gap: 9,
  fontFamily: "'EB Garamond',serif",
  fontSize: 13,
  lineHeight: 1.45,
  color: "rgba(245,235,210,.62)",
};
