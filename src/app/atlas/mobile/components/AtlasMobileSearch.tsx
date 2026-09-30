import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { T } from "./mobileShared";
import {
  ATLAS_MOBILE_GUIDED_PROMPTS,
  searchAtlasMobile,
  type AtlasMobileSearchDestination,
  type AtlasMobileSearchResult,
} from "./atlasMobileSearchIndex";

interface AtlasMobileSearchProps {
  onNavigate: (destination: AtlasMobileSearchDestination) => void;
  onExpandedChange?: (expanded: boolean) => void;
}

const COMMIT_RESOLVE_MS = 290;

function colorWithAlpha(color: string, alpha: number) {
  const match = color.match(/^#([0-9a-f]{6})$/i);
  if (!match) return `rgba(232,200,109,${alpha})`;

  const value = Number.parseInt(match[1], 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;

  return `rgba(${r},${g},${b},${alpha})`;
}

function resultWash(
  result: AtlasMobileSearchResult,
  strength: number,
) {
  return `linear-gradient(
    90deg,
    ${colorWithAlpha(result.color, strength)} 0%,
    ${colorWithAlpha(result.color, strength * 0.86)} 28%,
    ${colorWithAlpha(result.color, strength * 0.46)} 64%,
    ${colorWithAlpha(result.color, 0)} 100%
  )`;
}

export default function AtlasMobileSearch({
  onNavigate,
  onExpandedChange,
}: AtlasMobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const commitTimerRef = useRef<number | null>(null);

  const [query, setQuery] = useState("");
  const [keyboardIndex, setKeyboardIndex] = useState(-1);
  const [selectedResultId, setSelectedResultId] =
    useState<string | null>(null);
  const [pressedResultId, setPressedResultId] =
    useState<string | null>(null);
  const [committingResultId, setCommittingResultId] =
    useState<string | null>(null);

  const results = useMemo(
    () => searchAtlasMobile(query),
    [query],
  );
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    onExpandedChange?.(hasQuery);
  }, [hasQuery, onExpandedChange]);

  useEffect(() => {
    if (commitTimerRef.current !== null) {
      window.clearTimeout(commitTimerRef.current);
      commitTimerRef.current = null;
    }

    setKeyboardIndex(-1);
    setSelectedResultId(null);
    setPressedResultId(null);
    setCommittingResultId(null);
  }, [query]);

  useEffect(() => {
    return () => {
      if (commitTimerRef.current !== null) {
        window.clearTimeout(commitTimerRef.current);
      }
    };
  }, []);

  function choosePrompt(queryValue: string) {
    setQuery(queryValue);

    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
  }

  function commitResult(result: AtlasMobileSearchResult) {
    if (committingResultId) return;

    inputRef.current?.blur();
    setPressedResultId(null);
    setSelectedResultId(result.id);
    setCommittingResultId(result.id);

    commitTimerRef.current = window.setTimeout(() => {
      onNavigate(result.destination);
      commitTimerRef.current = null;
    }, COMMIT_RESOLVE_MS);
  }

  function activateResult(index: number) {
    const result = results[index];
    if (!result || committingResultId) return;

    setKeyboardIndex(index);

    if (selectedResultId === result.id) {
      commitResult(result);
      return;
    }

    // First completed touch/activation establishes intent.
    setSelectedResultId(result.id);
  }

  function clearQuery() {
    setQuery("");
    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
  }

  return (
    <div
      role="search"
      aria-label="Search the Sovereign Atlas"
      style={{
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        padding:
          "24px 24px calc(32px + env(safe-area-inset-bottom, 0px))",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          minHeight: 48,
          display: "grid",
          gridTemplateColumns: "20px minmax(0,1fr) 40px",
          gap: 8,
          alignItems: "center",
          borderBottom: "1px solid rgba(232,200,109,0.52)",
          boxShadow: hasQuery
            ? "0 10px 28px -20px rgba(232,200,109,0.50)"
            : "none",
          transition:
            "border-color 180ms ease, box-shadow 180ms ease",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            color: T.identityGold,
            fontFamily: T.serif,
            fontSize: 18,
            lineHeight: 1,
            opacity: 0.95,
            transform: "translateY(-1px)",
          }}
        >
          ✦
        </span>

        <input
          ref={inputRef}
          value={query}
          type="text"
          inputMode="search"
          enterKeyHint="search"
          role="combobox"
          aria-label="Search the Sovereign Atlas"
          aria-expanded={hasQuery}
          aria-controls="atlas-mobile-search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            keyboardIndex >= 0 && results[keyboardIndex]
              ? `atlas-mobile-result-${results[keyboardIndex].id}`
              : undefined
          }
          placeholder="What would you like to explore today?"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && results.length) {
              event.preventDefault();
              setKeyboardIndex((index) =>
                index < 0 ? 0 : (index + 1) % results.length,
              );
              return;
            }

            if (event.key === "ArrowUp" && results.length) {
              event.preventDefault();
              setKeyboardIndex((index) =>
                index <= 0 ? results.length - 1 : index - 1,
              );
              return;
            }

            if (event.key === "Enter" && results.length) {
              event.preventDefault();

              const selectedIndex =
                selectedResultId !== null
                  ? results.findIndex(
                      (result) => result.id === selectedResultId,
                    )
                  : -1;
              const targetIndex =
                keyboardIndex >= 0
                  ? keyboardIndex
                  : selectedIndex >= 0
                  ? selectedIndex
                  : 0;

              activateResult(targetIndex);
            }
          }}
          style={{
            minWidth: 0,
            width: "100%",
            height: 46,
            border: "none",
            outline: "none",
            background: "transparent",
            color: T.gold,
            caretColor: T.identityGold,
            fontFamily: T.serif,
            fontSize: 16,
            lineHeight: 1.25,
            padding: 0,
            WebkitAppearance: "none",
            appearance: "none",
          }}
        />

        <button
          type="button"
          aria-label="Clear Atlas search"
          onClick={clearQuery}
          style={{
            width: 40,
            height: 44,
            border: "none",
            background: "transparent",
            color: T.identityGold,
            opacity: hasQuery ? 0.68 : 0,
            pointerEvents: hasQuery ? "auto" : "none",
            fontFamily: T.serif,
            fontSize: 21,
            cursor: "pointer",
            transition: "opacity 160ms ease",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ×
        </button>
      </div>

      <div
        id="atlas-mobile-search-results"
        role={hasQuery ? "listbox" : undefined}
        style={{
          flex: "1 1 auto",
          minHeight: 0,
          marginTop: 14,
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {!hasQuery ? (
          <div aria-label="Guided Atlas searches">
            {ATLAS_MOBILE_GUIDED_PROMPTS.map((prompt, index) => (
              <button
                key={prompt.label}
                type="button"
                onClick={() => choosePrompt(prompt.query)}
                style={{
                  width: "100%",
                  minHeight: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  border: "none",
                  borderBottom:
                    index <
                    ATLAS_MOBILE_GUIDED_PROMPTS.length - 1
                      ? "0.5px solid rgba(232,200,109,0.11)"
                      : "none",
                  background: "transparent",
                  padding: "8px 2px",
                  color: T.body,
                  fontFamily: T.serif,
                  fontSize: 14.5,
                  lineHeight: 1.3,
                  textAlign: "left",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span>{prompt.label}</span>
                <span
                  aria-hidden="true"
                  style={{
                    color: T.identityGold,
                    opacity: 0.70,
                    fontFamily: T.mono,
                    fontSize: 13,
                  }}
                >
                  →
                </span>
              </button>
            ))}
          </div>
        ) : results.length ? (
          <div>
            {results.map((result, index) => {
              const selected =
                selectedResultId === result.id;
              const pressed =
                pressedResultId === result.id;
              const committing =
                committingResultId === result.id;
              const keyboardFocused =
                keyboardIndex === index &&
                selectedResultId === null;
              const anotherSelected =
                selectedResultId !== null && !selected;
              const anotherCommitting =
                committingResultId !== null && !committing;

              const opacity = anotherCommitting
                ? 0.30
                : anotherSelected
                ? 0.68
                : 1;

              const background = committing
                ? resultWash(result, 0.19)
                : selected
                ? resultWash(result, 0.125)
                : pressed
                ? resultWash(result, 0.055)
                : keyboardFocused
                ? "rgba(232,200,109,0.035)"
                : "transparent";

              return (
                <button
                  key={result.id}
                  id={`atlas-mobile-result-${result.id}`}
                  type="button"
                  role="option"
                  aria-selected={selected || committing}
                  aria-label={
                    selected
                      ? `${result.title}. Selected. Activate again to open.`
                      : `${result.title}. Select result.`
                  }
                  onPointerDown={() => {
                    if (!committingResultId) {
                      setPressedResultId(result.id);
                    }
                  }}
                  onPointerUp={() => {
                    if (pressedResultId === result.id) {
                      setPressedResultId(null);
                    }
                  }}
                  onPointerCancel={() => {
                    if (pressedResultId === result.id) {
                      setPressedResultId(null);
                    }
                  }}
                  onPointerLeave={() => {
                    if (pressedResultId === result.id) {
                      setPressedResultId(null);
                    }
                  }}
                  onFocus={() => setKeyboardIndex(index)}
                  onClick={() => activateResult(index)}
                  style={{
                    width: "100%",
                    minHeight: 80,
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) 28px",
                    alignItems: "center",
                    gap: 12,
                    border: "none",
                    borderBottom:
                      index < results.length - 1
                        ? "0.5px solid rgba(232,200,109,0.10)"
                        : "none",
                    borderRadius: 0,
                    outline: "none",
                    background,
                    boxSizing: "border-box",
                    padding: "10px 8px 10px 12px",
                    color: T.gold,
                    textAlign: "left",
                    cursor: "pointer",
                    opacity,
                    transform: pressed
                      ? "scale(0.997) translateY(0.5px)"
                      : "scale(1) translateY(0)",
                    transformOrigin: "center",
                    pointerEvents:
                      committingResultId !== null
                        ? "none"
                        : "auto",
                    transition:
                      committingResultId !== null
                        ? "background 260ms cubic-bezier(0.16,1,0.3,1), opacity 260ms ease, transform 160ms ease"
                        : "background 180ms ease, opacity 180ms ease, transform 120ms ease",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span style={{ minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        marginBottom: 3,
                        color: T.gold,
                        fontFamily: T.serif,
                        fontSize: 17.5,
                        lineHeight: 1.08,
                        opacity:
                          selected || committing ? 1 : 0.92,
                        transition: "opacity 180ms ease",
                      }}
                    >
                      {result.title}
                    </span>

                    <span
                      style={{
                        display: "block",
                        marginBottom: 5,
                        color: result.color,
                        fontFamily: T.mono,
                        fontSize: 8,
                        lineHeight: 1.25,
                        letterSpacing: "0.13em",
                        opacity:
                          selected || committing ? 1 : 0.82,
                        transition: "opacity 180ms ease",
                      }}
                    >
                      {result.type} · {result.parent}
                    </span>

                    <span
                      style={{
                        display: "block",
                        color: T.body,
                        fontFamily: T.serif,
                        fontSize: 12.5,
                        lineHeight: 1.35,
                        opacity:
                          selected || committing ? 0.88 : 0.66,
                        transition: "opacity 180ms ease",
                      }}
                    >
                      {result.description}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    style={{
                      width: 28,
                      height: 28,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 999,
                      color: T.identityGold,
                      background: committing
                        ? colorWithAlpha(result.color, 0.14)
                        : selected
                        ? colorWithAlpha(result.color, 0.085)
                        : "transparent",
                      boxShadow: committing
                        ? `0 0 18px ${colorWithAlpha(result.color, 0.16)}`
                        : selected
                        ? `0 0 12px ${colorWithAlpha(result.color, 0.08)}`
                        : "none",
                      fontFamily: T.mono,
                      fontSize: 15,
                      opacity:
                        committing
                          ? 1
                          : selected
                          ? 0.98
                          : pressed
                          ? 0.86
                          : 0.58,
                      transform:
                        committing
                          ? "translateX(6px)"
                          : selected
                          ? "translateX(2px)"
                          : pressed
                          ? "translateX(3px)"
                          : "translateX(0)",
                      transition:
                        committingResultId !== null
                          ? "background 260ms ease, box-shadow 260ms ease, opacity 260ms ease, transform 260ms cubic-bezier(0.16,1,0.3,1)"
                          : "background 160ms ease, box-shadow 160ms ease, opacity 160ms ease, transform 160ms ease",
                    }}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div
            role="status"
            style={{
              padding: "18px 2px 22px",
            }}
          >
            <div
              style={{
                color: T.gold,
                fontFamily: T.serif,
                fontSize: 17,
                marginBottom: 5,
              }}
            >
              No path found.
            </div>
            <div
              style={{
                color: T.body,
                fontFamily: T.serif,
                fontSize: 12.5,
                lineHeight: 1.45,
                opacity: 0.62,
              }}
            >
              Try a case study, framework, experiment, or profile destination.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
