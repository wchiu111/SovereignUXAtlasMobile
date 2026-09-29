import { useState } from "react";
import type { AtlasStellarType } from "../content/types";
import { resolveStellarColor } from "../atlas/constellation/stellarPalette";

export const PROJECT_DRAWER_WIDTH = 420;

interface SystemLike {
  id: string;
  label: string;
  color: string;
}

interface PlanetLike {
  id: string;
  label: string;
  what: string;
  why: string;
  researchFocus: string;
  keyDiscovery: string;
  signatureStellarType?: AtlasStellarType;
  tags?: string[];
}

interface AtlasProjectIntelligenceDrawerProps {
  open: boolean;
  system: SystemLike;
  planet: PlanetLike;
}

type AtlasMessage = {
  id: string;
  question: string;
  answer: string;
};

export default function AtlasProjectIntelligenceDrawer({
  open,
  system,
  planet,
}: AtlasProjectIntelligenceDrawerProps) {
  const [mode, setMode] = useState<"overview" | "response">("overview");
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<AtlasMessage[]>([]);

  const handleSubmit = () => {
    const clean = query.trim();
    if (!clean) return;

    const nextMessage: AtlasMessage = {
      id: crypto.randomUUID(),
      question: clean,
      answer: getAtlasResponse(planet),
    };

    setMessages((prev) => [...prev, nextMessage]);
    setQuery("");
    setMode("response");
  };

  return (
    <aside
      className="absolute top-0 right-0 bottom-0 z-30 overflow-hidden"
      style={{
        width: `${PROJECT_DRAWER_WIDTH}px`,
        background:
          "linear-gradient(180deg, rgba(4,4,10,0.985) 0%, rgba(4,5,11,0.97) 100%)",
        borderLeft: "1px solid rgba(138,174,200,0.14)",
        boxShadow: "-24px 0 80px rgba(0,0,0,0.38)",
        backdropFilter: "blur(36px)",
        transform: open ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
        color: "#F4EBD0",
      }}
    >
      <div
        style={{
          display: "flex",
          width: `${PROJECT_DRAWER_WIDTH * 2}px`,
          height: "100%",
          transform:
            mode === "response"
              ? `translateX(-${PROJECT_DRAWER_WIDTH}px)`
              : "translateX(0)",
          transition: "transform 0.55s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <OverviewLayer
          system={system}
          planet={planet}
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
        />

        <ResponseLayer
          system={system}
          planet={planet}
          messages={messages}
          query={query}
          setQuery={setQuery}
          onSubmit={handleSubmit}
          onBack={() => setMode("overview")}
        />
      </div>
    </aside>
  );
}

function DrawerHeader({ system }: { system: SystemLike }) {
  return (
    <div style={{ marginBottom: 26 }}>
      <div style={labelStyle(system.color)}>Overview</div>
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.34em",
          color: system.color,
          textTransform: "uppercase",
          marginTop: 6,
        }}
      >
        {system.label}
      </div>
    </div>
  );
}

const STELLAR_TYPE_LABELS: Record<AtlasStellarType, string> = {
  purpose: "Purpose",
  strategy: "Strategy",
  agentic: "Agentic",
  judgment: "Judgment",
  risk: "Risk",
  relational: "Relational",
};

const STELLAR_TYPE_EXPLANATIONS: Record<AtlasStellarType, string> = {
  purpose:
    "Gold marks purpose: ideas concerned with intent, direction, and the conditions governing downstream decisions.",
  strategy:
    "Ivory marks strategy: ideas that translate intent into policy, constraints, and operating logic.",
  agentic:
    "Blue marks agentic behavior: ideas concerned with delegated action, execution, and machine decision-making.",
  judgment:
    "Orange marks judgment: ideas concerned with human interpretation, oversight, and consequential review.",
  risk:
    "Red marks risk: ideas concerned with harm, drift, failure, and protective intervention.",
  relational:
    "Purple marks relational context: ideas concerned with interaction, interpretation, and shared meaning.",
};

function SemanticTags({
  system,
  planet,
}: {
  system: SystemLike;
  planet: PlanetLike;
}) {
  const stellarType = planet.signatureStellarType;
  if (!stellarType && !planet.tags?.length) return null;

  const stellarColor = resolveStellarColor(stellarType, system.color);

  return (
    <div
      aria-label="Framework characteristics"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 7,
        marginTop: -10,
        marginBottom: 27,
      }}
    >
      {stellarType && (
        <span
          title={STELLAR_TYPE_EXPLANATIONS[stellarType]}
          aria-label={STELLAR_TYPE_EXPLANATIONS[stellarType]}
          style={semanticChipStyle(stellarColor)}
        >
          <span
            aria-hidden="true"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: stellarColor,
              boxShadow: `0 0 9px ${stellarColor}`,
            }}
          />
          {STELLAR_TYPE_LABELS[stellarType]}
        </span>
      )}

      {planet.tags?.slice(0, 3).map((tag) => (
        <span key={tag} style={facetChipStyle}>
          {tag}
        </span>
      ))}
    </div>
  );
}

function InfoBlock({
  label,
  text,
  accent = "#C8A96E",
}: {
  label: string;
  text: string;
  accent?: string;
}) {
  return (
    <section style={infoBlockStyle}>
      <div style={labelStyle(accent)}>{label}</div>
      <div style={bodyStyle}>{text}</div>
    </section>
  );
}

function getAtlasResponse(planet: PlanetLike) {
  return `${planet.label} began as an exploration rather than a validated product outcome.

The project focused on this question: ${planet.researchFocus}

The most important boundary was recognizing that simulated research could help shape the hypothesis, but it could not replace evidence from real users. ${planet.keyDiscovery}`;
}

function OverviewLayer({
  system,
  planet,
  query,
  setQuery,
  onSubmit,
}: {
  system: SystemLike;
  planet: PlanetLike;
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <div style={layerStyle}>
      <div style={scrollLayerStyle}>
        <DrawerHeader system={system} />
        <SemanticTags system={system} planet={planet} />

        <h1 style={titleStyle}>{planet.label}</h1>
        <p style={introStyle}>{planet.what}</p>

        <div style={sectionDividerStyle} />

        <InfoBlock label="Why It Started" text={planet.why} />
        <InfoBlock label="Research Focus" text={planet.researchFocus} />

        <div style={keyDiscoveryStyle(system.color)}>
          <div style={labelStyle(system.color)}>Key Discovery</div>
          <div>{planet.keyDiscovery}</div>
        </div>
      </div>

      <AskFooter
        system={system}
        query={query}
        setQuery={setQuery}
        onSubmit={onSubmit}
        placeholder="Ask Atlas about this project..."
      />
    </div>
  );
}

function ResponseLayer({
  system,
  planet,
  messages,
  query,
  setQuery,
  onSubmit,
  onBack,
}: {
  system: SystemLike;
  planet: PlanetLike;
  messages: AtlasMessage[];
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div style={layerStyle}>
      <div style={scrollLayerStyle}>
        <button onClick={onBack} style={backButtonStyle}>
          ← Return to {planet.label} Overview
        </button>

        <DrawerHeader system={system} />
        <h1 style={{ ...titleStyle, fontSize: 30 }}>{planet.label}</h1>

        {messages.map((message) => (
          <div key={message.id} style={{ marginBottom: 40 }}>
            <div style={questionBoxStyle}>
              <div style={labelStyle(system.color)}>You Asked</div>
              <div>{message.question}</div>
            </div>

            <div style={labelStyle(system.color)}>Atlas Response</div>
            <p style={responseStyle}>{message.answer}</p>

            <div style={labelStyle(system.color)}>Key Signals</div>
            <ul style={signalListStyle}>
              <li>Research preceded interface decisions</li>
              <li>AI supported inquiry rather than replacing evidence</li>
              <li>Decision authority remained with the adjuster</li>
              <li>The project stopped before simulated feedback became a claim</li>
            </ul>

            <div style={labelStyle(system.color)}>Related Evidence</div>
            <div style={evidenceCardStyle}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10 }}>
                06 · Lessons
              </div>
              <div style={{ marginTop: 7, opacity: 0.74 }}>
                Exploration can shape a hypothesis. Validation still requires real people.
              </div>
            </div>

            <div style={labelStyle(system.color)}>Next Steps</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["Show research", "Open decisions", "Read limitations"].map(
                (item) => (
                  <button key={item} style={chipStyle}>
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        ))}
      </div>

      <AskFooter
        system={system}
        query={query}
        setQuery={setQuery}
        onSubmit={onSubmit}
        placeholder="Follow-up question..."
      />
    </div>
  );
}

function AskFooter({
  system,
  query,
  setQuery,
  onSubmit,
  placeholder,
}: {
  system: SystemLike;
  query: string;
  setQuery: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
}) {
  return (
    <div style={footerStyle}>
      <div style={askBoxStyle}>
        <span style={{ color: system.color }}>✦</span>
        <input
          value={query}
          placeholder={placeholder}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSubmit();
          }}
          style={inputStyle}
        />
        <button
          aria-label="Submit question"
          onClick={onSubmit}
          style={onSubmitStyle(system.color)}
        >
          ↑
        </button>
      </div>

      <div style={groundingStyle}>
        ♢ Responses are grounded in this case study and its documented limitations.
      </div>
    </div>
  );
}

const titleStyle = {
  fontFamily: "'EB Garamond', serif",
  fontSize: 40,
  lineHeight: 0.98,
  color: "#F4EBD0",
  margin: "0 0 16px",
  maxWidth: 330,
};

const introStyle = {
  fontFamily: "'EB Garamond', serif",
  fontSize: 17,
  lineHeight: 1.58,
  color: "rgba(214,181,112,0.9)",
  margin: 0,
};

const bodyStyle = {
  fontFamily: "'EB Garamond', serif",
  fontSize: 15.5,
  lineHeight: 1.75,
  color: "rgba(245,235,210,0.86)",
};

const responseStyle = {
  ...bodyStyle,
  whiteSpace: "pre-line" as const,
  margin: "0 0 30px",
};

const labelStyle = (color: string) => ({
  fontFamily: "'DM Mono', monospace",
  fontSize: 9,
  letterSpacing: "0.32em",
  color,
  opacity: 0.78,
  textTransform: "uppercase" as const,
  marginBottom: 10,
});

const infoBlockStyle = {
  marginTop: 27,
  paddingTop: 2,
};

const keyDiscoveryStyle = (color: string) => ({
  marginTop: 30,
  padding: "19px 20px 20px",
  background: "linear-gradient(90deg, rgba(255,255,255,0.045), rgba(255,255,255,0.018))",
  borderLeft: `2px solid ${color}`,
  borderTop: "1px solid rgba(255,255,255,0.045)",
  borderBottom: "1px solid rgba(255,255,255,0.035)",
  fontFamily: "'EB Garamond', serif",
  fontSize: 15.5,
  lineHeight: 1.72,
  color: "rgba(245,235,210,0.9)",
});

const sectionDividerStyle = {
  width: 52,
  height: 1,
  marginTop: 25,
  background: "linear-gradient(90deg, rgba(200,169,110,0.7), transparent)",
};

const questionBoxStyle = {
  padding: 17,
  border: "1px solid rgba(138,174,200,0.16)",
  background: "rgba(138,174,200,0.06)",
  borderRadius: 8,
  marginBottom: 28,
  fontFamily: "'EB Garamond', serif",
  fontSize: 15,
};

const evidenceCardStyle = {
  padding: 15,
  border: "1px solid rgba(138,174,200,0.16)",
  background: "rgba(138,174,200,0.07)",
  borderRadius: 8,
  marginBottom: 25,
  fontFamily: "'EB Garamond', serif",
  fontSize: 13.5,
};

const chipStyle = {
  padding: "9px 11px",
  borderRadius: 8,
  border: "1px solid rgba(245,235,210,0.12)",
  background: "rgba(255,255,255,0.035)",
  color: "rgba(245,235,210,0.8)",
  fontFamily: "'EB Garamond', serif",
  fontSize: 13,
  cursor: "pointer",
};

const semanticChipStyle = (color: string) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  minHeight: 25,
  padding: "5px 9px",
  borderRadius: 999,
  border: `1px solid ${color}66`,
  background: `${color}12`,
  color,
  fontFamily: "'DM Mono', monospace",
  fontSize: 8,
  lineHeight: 1,
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  cursor: "help",
});

const facetChipStyle = {
  display: "inline-flex",
  alignItems: "center",
  minHeight: 25,
  padding: "5px 9px",
  borderRadius: 999,
  border: "1px solid rgba(245,235,210,0.12)",
  background: "rgba(255,255,255,0.025)",
  color: "rgba(245,235,210,0.56)",
  fontFamily: "'DM Mono', monospace",
  fontSize: 8,
  lineHeight: 1,
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
};

const askBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(232,200,109,0.32)",
  background: "rgba(8,10,16,0.96)",
  boxShadow: "0 0 24px rgba(232,200,109,0.07)",
};

const inputStyle = {
  flex: 1,
  minWidth: 0,
  background: "transparent",
  border: "none",
  outline: "none",
  color: "#F4EBD0",
  fontFamily: "'EB Garamond', serif",
  fontSize: 14,
};

const onSubmitStyle = (color: string) => ({
  width: 30,
  height: 30,
  flexShrink: 0,
  borderRadius: "50%",
  border: "none",
  background: color,
  color: "#05050A",
  cursor: "pointer",
  fontSize: 18,
});

const groundingStyle = {
  marginTop: 14,
  fontFamily: "'EB Garamond', serif",
  fontSize: 12,
  lineHeight: 1.45,
  color: "rgba(245,235,210,0.45)",
};

const layerStyle = {
  width: `${PROJECT_DRAWER_WIDTH}px`,
  height: "100%",
  display: "flex",
  flexDirection: "column" as const,
  flexShrink: 0,
};

const scrollLayerStyle = {
  padding: "29px 30px 34px",
  overflowY: "auto" as const,
  flex: 1,
  scrollbarWidth: "thin" as const,
  scrollbarColor: "rgba(200,169,110,0.22) transparent",
};

const footerStyle = {
  padding: "17px 22px 22px",
  borderTop: "1px solid rgba(255,255,255,0.04)",
  background: "linear-gradient(180deg, rgba(4,4,10,0.7), rgba(4,4,10,0.98) 24%)",
};

const backButtonStyle = {
  background: "transparent",
  border: "none",
  color: "rgba(138,174,200,0.9)",
  fontFamily: "'EB Garamond', serif",
  fontSize: 14,
  cursor: "pointer",
  padding: 0,
  marginBottom: 24,
};

const signalListStyle = {
  margin: "0 0 27px",
  paddingLeft: 18,
  fontFamily: "'EB Garamond', serif",
  fontSize: 14,
  lineHeight: 1.7,
  color: "rgba(245,235,210,0.84)",
};
