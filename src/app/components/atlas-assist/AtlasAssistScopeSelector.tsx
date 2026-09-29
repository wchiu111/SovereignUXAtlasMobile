import type { AtlasAssistMode, AtlasAssistScope } from "../../types/atlasAssist";

const SCOPE_LABELS: Record<AtlasAssistScope, string> = {
  section: "This section",
  project: "This project",
  atlas: "Entire Atlas",
};

export default function AtlasAssistScopeSelector({
  mode,
  scope,
  onChange,
}: {
  mode: AtlasAssistMode;
  scope: AtlasAssistScope;
  onChange: (scope: AtlasAssistScope) => void;
}) {
  const scopes: AtlasAssistScope[] = mode === "focused"
    ? ["section", "project", "atlas"]
    : ["project", "atlas"];

  return (
    <fieldset className="atlas-assist-scope">
      <legend>CURRENT SCOPE</legend>
      <div className="atlas-assist-scope__options">
        {scopes.map((item) => (
          <label key={item} data-active={scope === item || undefined}>
            <input
              type="radio"
              name={`atlas-assist-scope-${mode}`}
              value={item}
              checked={scope === item}
              onChange={() => onChange(item)}
            />
            <span aria-hidden="true" className="atlas-assist-scope__marker" />
            <span>{SCOPE_LABELS[item]}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
