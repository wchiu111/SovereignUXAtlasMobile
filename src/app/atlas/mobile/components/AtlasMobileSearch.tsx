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
} from "./atlasMobileSearchIndex";

interface AtlasMobileSearchProps {
  onNavigate: (destination: AtlasMobileSearchDestination) => void;
  onExpandedChange?: (expanded: boolean) => void;
}

export default function AtlasMobileSearch({
  onNavigate,
  onExpandedChange,
}: AtlasMobileSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(
    () => searchAtlasMobile(query),
    [query],
  );
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    onExpandedChange?.(hasQuery);
  }, [hasQuery, onExpandedChange]);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function choosePrompt(queryValue: string) {
    setQuery(queryValue);
    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true });
    });
  }

  function activateResult(index: number) {
    const result = results[index];
    if (!result) return;

    inputRef.current?.blur();
    onNavigate(result.destination);
  }

  return (
    <div
      role="search"
      aria-label="Search the Sovereign Atlas"
      style={{
        height: "100%",
        boxSizing: "border-box",
        padding:
          "30px 24px calc(22px + env(safe-area-inset-bottom, 0px))",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          minHeight: 48,
          display: "grid",
          gridTemplateColumns: "20px 1fr 40px",
          gap: 8,
          alignItems: "center",
          borderBottom: "1px solid rgba(232,200,109,0.52)",
          boxShadow: hasQuery
            ? "0 10px 28px -20px rgba(232,200,109,0.62)"
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
          type="search"
          role="combobox"
          aria-label="Search the Sovereign Atlas"
          aria-expanded={hasQuery}
          aria-controls="atlas-mobile-search-results"
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 && results[activeIndex]
              ? `atlas-mobile-result-${results[activeIndex].id}`
              : undefined
          }
          placeholder="What would you like to explore today?"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" && results.length) {
              event.preventDefault();
              setActiveIndex((index) =>
                index < 0 ? 0 : (index + 1) % results.length,
              );
              return;
            }

            if (event.key === "ArrowUp" && results.length) {
              event.preventDefault();
              setActiveIndex((index) =>
                index <= 0 ? results.length - 1 : index - 1,
              );
              return;
            }

            if (event.key === "Enter" && results.length) {
              event.preventDefault();
              activateResult(activeIndex >= 0 ? activeIndex : 0);
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
          }}
        />

        <button
          type="button"
          aria-label="Clear Atlas search"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus({ preventScroll: true });
          }}
          style={{
            width: 40,
            height: 44,
            border: "none",
            background: "transparent",
            color: T.body,
            opacity: hasQuery ? 0.56 : 0,
            pointerEvents: hasQuery ? "auto" : "none",
            fontFamily: T.serif,
            fontSize: 20,
            cursor: "pointer",
            transition: "opacity 160ms ease",
          }}
        >
          ×
        </button>
      </div>

      <div
        id="atlas-mobile-search-results"
        role={hasQuery ? "listbox" : undefined}
        style={{
          marginTop: 12,
          maxHeight:
            "calc(100% - 62px - env(safe-area-inset-bottom, 0px))",
          overflowY: "auto",
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          border: "1px solid rgba(232,200,109,0.14)",
          borderRadius: 12,
          background: "rgba(6,7,12,0.68)",
          boxShadow: "0 18px 52px rgba(0,0,0,0.18)",
        }}
      >
        {!hasQuery ? (
          <div
            aria-label="Guided Atlas searches"
            style={{ padding: "6px 16px" }}
          >
            {ATLAS_MOBILE_GUIDED_PROMPTS.map((prompt, index) => (
              <button
                key={prompt.label}
                type="button"
                onClick={() => choosePrompt(prompt.query)}
                style={{
                  width: "100%",
                  minHeight: 47,
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
                  padding: "8px 0",
                  color: T.body,
                  fontFamily: T.serif,
                  fontSize: 14.5,
                  lineHeight: 1.3,
                  textAlign: "left",
                  cursor: "pointer",
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
          <div style={{ padding: 4 }}>
            {results.map((result, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={result.id}
                  id={`atlas-mobile-result-${result.id}`}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onPointerEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => activateResult(index)}
                  style={{
                    width: "100%",
                    minHeight: 82,
                    display: "grid",
                    gridTemplateColumns: "minmax(0,1fr) 22px",
                    alignItems: "center",
                    gap: 12,
                    border: "1px solid",
                    borderColor: active
                      ? "rgba(232,200,109,0.18)"
                      : "transparent",
                    borderBottomColor:
                      !active && index < results.length - 1
                        ? "rgba(232,200,109,0.09)"
                        : active
                        ? "rgba(232,200,109,0.18)"
                        : "transparent",
                    borderRadius: active ? 9 : 0,
                    background: active
                      ? "rgba(15,16,23,0.92)"
                      : "transparent",
                    padding: "12px 14px",
                    color: T.gold,
                    textAlign: "left",
                    cursor: "pointer",
                    transition:
                      "background 160ms ease, border-color 160ms ease",
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
                        opacity: 0.92,
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
                        opacity: 0.72,
                      }}
                    >
                      {result.description}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    style={{
                      color: T.identityGold,
                      fontFamily: T.mono,
                      fontSize: 15,
                      opacity: active ? 0.95 : 0.58,
                      transform: active
                        ? "translateX(2px)"
                        : "translateX(0)",
                      transition:
                        "opacity 160ms ease, transform 160ms ease",
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
              padding: "22px 18px 24px",
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
