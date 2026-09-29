import { useEffect, useRef } from "react";
import { T } from "../../components/mobileShared";
import type { ConstellationSection } from "./constellationTypes";

export default function ConstellationSectionRail({
  sections,
  activeId,
  color,
  ariaLabel,
  onSelect,
}: {
  sections: readonly ConstellationSection[];
  activeId: string;
  color: string;
  ariaLabel: string;
  onSelect: (id: string) => void;
}) {
  const buttonRefs = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeId);
    activeButton?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeId]);

  return (
    <nav
      aria-label={ariaLabel}
      style={{
        minHeight: 52,
        background: "rgba(5,5,10,0.97)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderBottom: `0.5px solid ${color}22`,
      }}
    >
      <div
        style={{
          minHeight: 52,
          overflowX: "auto",
          overflowY: "hidden",
          display: "flex",
          alignItems: "stretch",
          gap: "clamp(20px, 6vw, 26px)",
          padding: "0 clamp(18px, 5.5vw, 24px)",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
          scrollSnapType: "x proximity",
        }}
      >
        {sections.map((section, index) => {
          const active = section.id === activeId;
          const number = String(index + 1).padStart(2, "0");

          return (
            <button
              key={section.id}
              ref={(node) => {
                if (node) buttonRefs.current.set(section.id, node);
                else buttonRefs.current.delete(section.id);
              }}
              type="button"
              onClick={() => onSelect(section.id)}
              aria-current={active ? "location" : undefined}
              className="mobile-reading-focusable"
              style={{
                position: "relative",
                flex: "0 0 auto",
                minHeight: 44,
                border: "none",
                borderRadius: 2,
                background: "transparent",
                padding: "0 0 2px",
                fontFamily: T.mono,
                fontSize: "clamp(9px, 2.4vw, 9.5px)",
                letterSpacing: "0.14em",
                opacity: active ? 0.98 : 0.52,
                cursor: "pointer",
                whiteSpace: "nowrap",
                scrollSnapAlign: "center",
              }}
            >
              <span
                aria-hidden
                style={{
                  marginRight: 7,
                  color: active ? color : T.accentGold,
                  opacity: active ? 0.96 : 0.58,
                }}
              >
                {number}
              </span>

              <span
                style={{
                  color: active ? "#F0E9D8" : T.accentGold,
                  opacity: active ? 0.96 : 0.68,
                }}
              >
                {section.short ?? section.label}
              </span>

              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  height: 1,
                  background: color,
                  transform: `scaleX(${active ? 1 : 0})`,
                  transformOrigin: "left center",
                  transition: "transform 220ms ease, opacity 220ms ease",
                  opacity: active ? 0.86 : 0,
                }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
