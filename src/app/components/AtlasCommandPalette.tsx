import { useEffect, useMemo, useRef, useState } from "react";

type ResultKind = "system" | "case-study" | "framework" | "experiment" | "observatory";
type InteractionMethod = "mouse" | "keyboard" | "touch";

export interface AtlasSearchAnalyticsEvent {
  name: "atlas_search_opened" | "atlas_query_submitted" | "atlas_result_selected" | "atlas_no_results";
  properties: { queryLength?: number; resultCount?: number; selectedResultType?: ResultKind; selectedPosition?: number; interactionMethod?: InteractionMethod; topic?: string };
}

interface AtlasCommandPaletteProps {
  onOpenChange?: (open: boolean) => void;
  onPreviewDestination?: (destinationId: string | null) => void;
  onNavigate?: (destinationId: string) => void;
  onAnalyticsEvent?: (event: AtlasSearchAnalyticsEvent) => void;
}

interface AtlasResult {
  id: string; title: string; kind: ResultKind; type: string; parent: string;
  description: string; keywords: string[]; aliases?: string[];
}

const RESULTS: AtlasResult[] = [
  { id: "case-studies", title: "Case Studies", kind: "system", type: "SYSTEM", parent: "SOVEREIGN ATLAS", description: "Real-world product work, decisions, and outcomes.", keywords: ["case studies", "projects", "portfolio", "work", "strongest"] },
  { id: "agentic-insurance", title: "Agentic Insurance", kind: "case-study", type: "CASE STUDY", parent: "CASE STUDIES", description: "AI-assisted claims research with preserved human authority.", keywords: ["insurance", "claims", "adjuster", "agentic", "human authority"] },
  { id: "globality", title: "Globality", kind: "case-study", type: "CASE STUDY", parent: "CASE STUDIES", description: "Enterprise procurement redesigned around clarity and decisions.", keywords: ["globality", "procurement", "enterprise", "nlp"] },
  { id: "oracle", title: "Oracle Higher Education", kind: "case-study", type: "CASE STUDY", parent: "CASE STUDIES", description: "A complex higher-education journey made easier to understand.", keywords: ["oracle", "education", "higher education", "information architecture"] },
  { id: "sovereign-atlas", title: "Sovereign Atlas", kind: "case-study", type: "CASE STUDY", parent: "CASE STUDIES", description: "How a search concept became a navigable knowledge system.", keywords: ["atlas", "sovereign atlas", "portfolio", "search"] },
  { id: "frameworks", title: "Frameworks", kind: "system", type: "SYSTEM", parent: "DESIGN METHODS", description: "Understand how Wilson approaches AI, trust, and systems.", keywords: ["frameworks", "methods", "methodology", "ai design"] },
  { id: "sovereign-ux", title: "Sovereign UX", kind: "framework", type: "FRAMEWORK", parent: "DESIGN METHODS", description: "Designing for consent, reflection, and human authority.", keywords: ["sovereign ux", "consent", "reflection", "authority", "trust"] },
  { id: "behavioral-architecture", title: "Behavioral Architecture", kind: "framework", type: "FRAMEWORK", parent: "DESIGN METHODS", description: "Structures that preserve trustworthy AI behavior.", keywords: ["behavioral architecture", "governance", "constraints", "trust", "model behavior"] },
  { id: "authority-gradient", title: "Decision Rights", kind: "framework", type: "FRAMEWORK", parent: "DESIGN METHODS", description: "Defines who may decide, approve, redirect, or intervene.", keywords: ["decision rights", "authority gradient", "authority", "approval", "intervention"] },
  { id: "regenerative-systems", title: "Regenerative Systems", kind: "framework", type: "FRAMEWORK", parent: "DESIGN METHODS", description: "Detects drift, preserves critical relationships, and verifies system integrity through change.", keywords: ["regenerative systems", "drift", "preservation", "system integrity", "structural invariants", "regeneration"] },
  { id: "relational-ai-literacy", title: "Relational AI Literacy", kind: "framework", type: "FRAMEWORK", parent: "DESIGN METHODS", description: "Moves human-AI interaction from prompt execution toward reflective, grounded participation.", keywords: ["relational AI literacy", "human AI interaction", "presence", "recursion", "calibration", "co-creation", "echo", "encoded cognition", "professional cognition", "prompting as product thinking", "marketing vs UX"] },
  { id: "model-design", title: "Model Design", kind: "framework", type: "FRAMEWORK", parent: "DESIGN METHODS", description: "A framework for shaping AI behavior through product design.", keywords: ["model design", "ai behavior", "system behavior"] },
  { id: "experiments", title: "Experiments", kind: "system", type: "SYSTEM", parent: "ACTIVE EXPLORATIONS", description: "Browse questions about AI behavior and interaction.", keywords: ["experiments", "research", "explorations", "lab"] },
  { id: "authority-drift", title: "Authority Drift", kind: "experiment", type: "EXPERIMENT", parent: "ACTIVE EXPLORATIONS", description: "How decision authority gradually shifts from human to system.", keywords: ["authority drift", "drift", "human decision", "ai decision"] },
  { id: "mirror-test", title: "Mirror Test", kind: "experiment", type: "EXPERIMENT", parent: "ACTIVE EXPLORATIONS", description: "Testing whether system behavior remains aligned under pressure.", keywords: ["mirror test", "evaluation", "alignment", "trust"] },
  { id: "about-wilson", title: "About Wilson", kind: "observatory", type: "OBSERVATORY", parent: "PROFILE", description: "Explore Wilson’s background, journey, and philosophy.", keywords: ["wilson", "about", "profile", "background", "journey", "philosophy"] },
];

const GUIDED_PROMPTS = ["Show me the strongest case studies", "Explain Authority Drift", "Explore AI Design Frameworks", "Tell me about Wilson"];
const GUIDED_DESTINATIONS = ["case-studies", "authority-drift", "frameworks", "about-wilson"];
const RESULT_COLORS: Record<ResultKind, string> = { system: "#E8C86D", "case-study": "#798BDF", framework: "#63C391", experiment: "#A68BD4", observatory: "#E8C86D" };

function normalize(value: string) { return value.toLowerCase().replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim(); }
function searchTerms(value: string) {
  return normalize(value).replace(/^(show me|explain|explore|tell me about|find|open|browse)\s+/, "").split(" ").filter((term) => term.length > 2 && !["the", "strongest", "design"].includes(term));
}
function scoreResult(result: AtlasResult, query: string) {
  const clean = normalize(query); const title = normalize(result.title); const aliases = (result.aliases ?? []).map(normalize);
  const fields = [title, normalize(result.type), normalize(result.parent), normalize(result.description), ...result.keywords.map(normalize), ...aliases];
  let score = title === clean ? 140 : aliases.includes(clean) ? 125 : title.includes(clean) ? 90 : 0;
  for (const term of searchTerms(query)) { if (title.includes(term)) score += 34; if (fields.some((field) => field.includes(term))) score += 14; }
  if (/strongest|portfolio|project/.test(clean) && result.id === "case-studies") score += 65;
  if (/framework|method/.test(clean) && result.id === "frameworks") score += 65;
  if (/wilson|profile|about/.test(clean) && result.id === "about-wilson") score += 65;
  return score;
}
function topicFor(result: AtlasResult) {
  if (result.kind === "case-study") return "case-studies"; if (result.kind === "framework") return "frameworks";
  if (result.kind === "experiment") return "experiments"; if (result.kind === "observatory") return "biography"; return result.id;
}

export default function AtlasCommandPalette({ onOpenChange, onPreviewDestination, onNavigate, onAnalyticsEvent }: AtlasCommandPaletteProps) {
  const [query, setQuery] = useState(""); const [isOpen, setIsOpen] = useState(false); const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null); const inputRef = useRef<HTMLInputElement | null>(null);
  const visibleResults = useMemo(() => !query.trim() ? [] : RESULTS.map((result) => ({ result, score: scoreResult(result, query) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title)).slice(0, 4).map(({ result }) => result), [query]);

  const setOpen = (next: boolean) => { setIsOpen(next); onOpenChange?.(next); if (!next) { setActiveIndex(-1); onPreviewDestination?.(null); } };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null; const typing = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.key === "/" && !typing) || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k")) { event.preventDefault(); inputRef.current?.focus(); setOpen(true); }
      if (event.key === "Escape" && isOpen) { event.preventDefault(); setOpen(false); inputRef.current?.blur(); }
    };
    window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => { if (isOpen && rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", onPointerDown); return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  useEffect(() => { onPreviewDestination?.(activeIndex >= 0 ? visibleResults[activeIndex]?.id ?? null : null); }, [activeIndex, visibleResults, onPreviewDestination]);
  useEffect(() => { if (query.trim() && visibleResults.length === 0) onAnalyticsEvent?.({ name: "atlas_no_results", properties: { queryLength: query.trim().length, resultCount: 0 } }); }, [query, visibleResults.length, onAnalyticsEvent]);

  const navigate = (result: AtlasResult, method: InteractionMethod) => {
    onAnalyticsEvent?.({ name: "atlas_result_selected", properties: { queryLength: query.trim().length, resultCount: visibleResults.length, selectedResultType: result.kind, selectedPosition: Math.max(0, visibleResults.findIndex((item) => item.id === result.id)) + 1, interactionMethod: method, topic: topicFor(result) } });
    setOpen(false); setQuery(""); onNavigate?.(result.id);
  };
  const choosePrompt = (prompt: string, destinationId: string) => { setQuery(prompt); setActiveIndex(-1); onPreviewDestination?.(destinationId); inputRef.current?.focus(); };
  const activeDescendant = activeIndex >= 0 && visibleResults[activeIndex] ? `atlas-result-${visibleResults[activeIndex].id}` : undefined;

  return (
    <div ref={rootRef} className="atlas-search-v2" style={{ position: "absolute", top: 30, left: "50%", transform: "translateX(-50%)", zIndex: 1000, width: "min(45vw, 470px)", minWidth: 360, pointerEvents: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 40, borderBottom: `1px solid ${isOpen ? "rgba(232,200,109,0.78)" : "rgba(232,200,109,0.46)"}`, boxShadow: isOpen ? "0 10px 22px -17px rgba(232,200,109,0.72)" : "none", transition: "border-color 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)" }}>
        <span aria-hidden="true" style={{ color: "#E8C86D", fontSize: 17, lineHeight: 1, opacity: isOpen ? 1 : 0.72 }}>✦</span>
        <input ref={inputRef} value={query} role="combobox" aria-label="Search the Sovereign Atlas" aria-expanded={isOpen} aria-controls="atlas-search-results" aria-autocomplete="list" aria-activedescendant={activeDescendant} placeholder="What would you like to explore today?"
          onFocus={() => { if (!isOpen) onAnalyticsEvent?.({ name: "atlas_search_opened", properties: { interactionMethod: "keyboard" } }); setOpen(true); }} onClick={() => setOpen(true)} onChange={(event) => { setQuery(event.currentTarget.value); setActiveIndex(-1); setOpen(true); }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && visibleResults.length) { event.preventDefault(); setActiveIndex((index) => index < 0 ? 0 : (index + 1) % visibleResults.length); }
            else if (event.key === "ArrowUp" && visibleResults.length) { event.preventDefault(); setActiveIndex((index) => index <= 0 ? visibleResults.length - 1 : index - 1); }
            else if (event.key === "Enter" && visibleResults.length) { event.preventDefault(); navigate(visibleResults[activeIndex >= 0 ? activeIndex : 0], "keyboard"); }
          }}
          style={{ flex: 1, minWidth: 0, height: 40, padding: 0, border: 0, outline: 0, background: "transparent", color: "#F4EBD0", caretColor: "#E8C86D", fontFamily: "'EB Garamond', Georgia, serif", fontSize: 16, lineHeight: 1.2 }} />
        {query && <button type="button" aria-label="Clear Atlas search" onClick={() => { setQuery(""); setActiveIndex(-1); inputRef.current?.focus(); }} style={{ width: 44, height: 44, marginRight: -10, border: 0, background: "transparent", color: "rgba(244,235,208,0.48)", cursor: "pointer", fontSize: 18 }}>×</button>}
      </div>

      {isOpen && <div id="atlas-search-results" role={query.trim() ? "listbox" : undefined} className="atlas-search-panel" style={{ marginTop: 12, overflow: "hidden", border: "1px solid rgba(232,200,109,0.18)", borderRadius: 12, background: "rgba(8,8,14,0.86)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", boxShadow: "0 18px 52px rgba(0,0,0,0.24)", animation: "atlasSearchReveal 120ms ease-out" }}>
        {!query.trim() ? <div aria-label="Guided Atlas paths" style={{ padding: "8px 16px" }}>
          {GUIDED_PROMPTS.map((prompt, index) => <button key={prompt} type="button" onClick={() => choosePrompt(prompt, GUIDED_DESTINATIONS[index])} onMouseEnter={() => onPreviewDestination?.(GUIDED_DESTINATIONS[index])} onMouseLeave={() => onPreviewDestination?.(null)} style={{ width: "100%", minHeight: 44, padding: "10px 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, border: 0, boxShadow: index < GUIDED_PROMPTS.length - 1 ? "inset 0 -1px rgba(232,200,109,0.10)" : "none", background: "transparent", color: "rgba(244,235,208,0.74)", fontFamily: "'EB Garamond', Georgia, serif", fontSize: 15, textAlign: "left", cursor: "pointer" }}><span>{prompt}</span><span aria-hidden="true" style={{ color: "rgba(232,200,109,0.58)" }}>→</span></button>)}
        </div> : visibleResults.length ? <div style={{ padding: 4 }}>
          {visibleResults.map((result, index) => { const active = index === activeIndex; const accent = RESULT_COLORS[result.kind]; const cardBorder = active ? "rgba(232,200,109,0.20)" : "transparent"; return <button key={result.id} id={`atlas-result-${result.id}`} role="option" aria-selected={active} type="button" onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => navigate(result, "mouse")} style={{ width: "100%", minHeight: 84, display: "grid", gridTemplateColumns: "minmax(0,1fr) 24px", alignItems: "center", gap: 16, padding: "14px 16px", borderWidth: 1, borderStyle: "solid", borderTopColor: cardBorder, borderRightColor: cardBorder, borderBottomColor: !active && index < visibleResults.length - 1 ? "rgba(232,200,109,0.10)" : cardBorder, borderLeftColor: cardBorder, borderRadius: active ? 9 : 0, background: active ? "rgba(13,13,21,0.92)" : "transparent", color: "#F4EBD0", textAlign: "left", cursor: "pointer", boxShadow: active ? "0 0 24px rgba(232,200,109,0.05)" : "none", transition: "background 180ms ease-out, border-color 180ms ease-out, box-shadow 180ms ease-out" }}>
            <span style={{ minWidth: 0 }}><span style={{ display: "block", marginBottom: 4, fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18, lineHeight: 1.1, color: active && index === 0 ? "#FFF0BE" : "#F4EBD0" }}>{result.title}</span><span style={{ display: "block", marginBottom: 7, color: accent, fontFamily: "'DM Mono', ui-monospace, monospace", fontSize: 9, lineHeight: 1.25, letterSpacing: "0.15em" }}>{result.type} · {result.parent}</span><span style={{ display: "block", color: "rgba(244,235,208,0.68)", fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.4 }}>{result.description}</span></span>
            <span aria-hidden="true" style={{ color: "#E8C86D", fontFamily: "'EB Garamond', Georgia, serif", fontSize: 20, opacity: active ? 1 : 0.64, transform: active ? "translateX(2px)" : "none", transition: "opacity 180ms ease-out, transform 180ms ease-out" }}>→</span>
          </button>; })}
        </div> : <div role="status" style={{ padding: "24px 20px 26px" }}><div style={{ marginBottom: 6, color: "#F4EBD0", fontFamily: "'EB Garamond', Georgia, serif", fontSize: 18 }}>No path found.</div><div style={{ color: "rgba(244,235,208,0.56)", fontFamily: "Inter, sans-serif", fontSize: 12, lineHeight: 1.5 }}>Try a project, framework, experiment, or “About Wilson.”</div></div>}
      </div>}
      <style>{`@keyframes atlasSearchReveal{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:translateY(0)}}.atlas-search-panel button:focus-visible{outline:1px solid rgba(232,200,109,.62)!important;outline-offset:-2px}@media(max-width:767px){.atlas-search-v2{position:fixed!important;top:20px!important;width:calc(100vw - 32px)!important;min-width:0!important}.atlas-search-panel{max-height:calc(100dvh - 88px);overflow-y:auto!important}#atlas-search-results button[role="option"]{min-height:96px!important;padding:16px!important}}@media(prefers-reduced-motion:reduce){.atlas-search-v2 *{animation:none!important;transition-duration:.01ms!important}}`}</style>
    </div>
  );
}
