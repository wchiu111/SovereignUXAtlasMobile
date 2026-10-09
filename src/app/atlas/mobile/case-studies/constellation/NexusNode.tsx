import { useEffect, useRef, useState } from "react";

import SovereignDesignPreviewDrawer from "../../components/SovereignDesignPreviewDrawer";
import { FADE, NEXUS, T } from "../../components/mobileShared";

function effectiveOpacity(node: Element | null) {
  if (!node || typeof window === "undefined") return 0;

  let opacity = 1;
  let current: Element | null = node;

  while (current) {
    const parsed = Number.parseFloat(window.getComputedStyle(current).opacity);
    if (Number.isFinite(parsed)) opacity *= parsed;

    if (current === (node as SVGGraphicsElement).ownerSVGElement) break;
    current = current.parentElement;
  }

  return opacity;
}

export default function NexusNode({ op }: { op: number }) {
  const [selected, setSelected] = useState(false);
  const [contextVisible, setContextVisible] = useState(true);
  const rootRef = useRef<SVGGElement>(null);

  /*
   * LandingScene visually fades the nexus by changing opacity on ancestor
   * <g> elements. SVG opacity does not disable hit testing, so the hidden
   * nexus previously remained tappable underneath Case Studies.
   *
   * Observe those ancestor style changes and disable this node whenever its
   * effective rendered opacity drops below the interactive threshold.
   */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof MutationObserver === "undefined") return;

    const syncVisibility = () => {
      setContextVisible(effectiveOpacity(root) > 0.35);
    };

    syncVisibility();

    const observer = new MutationObserver(syncVisibility);
    let current: Element | null = root;

    while (current) {
      observer.observe(current, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });

      if (current === root.ownerSVGElement) break;
      current = current.parentElement;
    }

    return () => observer.disconnect();
  }, []);

  const interactive = op > 0.5 && contextVisible;

  useEffect(() => {
    if (!interactive && selected) {
      setSelected(false);
    }
  }, [interactive, selected]);

  useEffect(() => {
    const svg = rootRef.current?.ownerSVGElement;
    if (!svg) return;

    if (selected) {
      svg.setAttribute("data-sovereign-design-focus", "true");
    } else {
      svg.removeAttribute("data-sovereign-design-focus");
    }

    return () => {
      svg.removeAttribute("data-sovereign-design-focus");
    };
  }, [selected]);

  const activate = () => {
    if (!interactive || selected) return;
    setSelected(true);
  };

  return (
    <>
      <g
        ref={rootRef}
        role="button"
        tabIndex={interactive ? 0 : -1}
        aria-label="Sovereign Design"
        aria-pressed={selected}
        aria-disabled={!interactive}
        onClick={activate}
        onKeyDown={(event) => {
          if (
            interactive &&
            (event.key === "Enter" || event.key === " ")
          ) {
            event.preventDefault();
            activate();
          }
        }}
        style={{
          transform: `translate(${NEXUS.x}px,${NEXUS.y}px)`,
          opacity: op,
          transition: `${FADE}, filter 220ms ease`,
          cursor: interactive ? "pointer" : "default",
          pointerEvents: interactive ? "auto" : "none",
          outline: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <g
          style={{
            opacity: selected ? 1 : 0,
            transition: "opacity 220ms ease",
            pointerEvents: "none",
          }}
        >
          <circle
            r={144}
            fill={T.identityGold}
            opacity={0.020}
            style={{ filter: "blur(12px)" }}
          />
          <circle
            r={74}
            fill="none"
            stroke={T.identityGold}
            strokeWidth={0.55}
            opacity={0.12}
          />
        </g>

        <g className="atlas-landing-nexus-field">
          <circle
            r={118}
            fill={T.identityGold}
            opacity={selected ? 0.044 : 0.030}
            style={{
              filter: "blur(8px)",
              transition: "opacity 220ms ease",
            }}
          />
          <circle
            r={82}
            fill={T.identityGold}
            opacity={selected ? 0.070 : 0.048}
            style={{
              filter: "blur(4px)",
              transition: "opacity 220ms ease",
            }}
          />
        </g>

        <g className="atlas-landing-nexus-rings">
          <circle
            r={130}
            fill="none"
            stroke={T.identityGold}
            strokeWidth={selected ? 0.38 : 0.3}
            opacity={selected ? 0.075 : 0.045}
            style={{ transition: "opacity 220ms ease, stroke-width 220ms ease" }}
          />
          <circle
            r={96}
            fill="none"
            stroke={T.identityGold}
            strokeWidth={selected ? 0.5 : 0.4}
            opacity={selected ? 0.12 : 0.075}
            style={{ transition: "opacity 220ms ease, stroke-width 220ms ease" }}
          />
          <circle
            r={68}
            fill="none"
            stroke={T.identityGold}
            strokeWidth={selected ? 0.64 : 0.5}
            opacity={selected ? 0.18 : 0.11}
            style={{ transition: "opacity 220ms ease, stroke-width 220ms ease" }}
          />
          <circle
            r={27}
            fill="none"
            stroke={T.identityGold}
            strokeWidth={selected ? 0.95 : 0.8}
            opacity={selected ? 0.28 : 0.17}
            style={{ transition: "opacity 220ms ease, stroke-width 220ms ease" }}
          />
        </g>

        <g className="atlas-landing-nexus-core">
          <circle
            r={60}
            fill="rgba(232,213,163,0.028)"
            opacity={selected ? 1.25 : 1}
          />
          <circle
            r={33}
            fill="rgba(232,213,163,0.065)"
            opacity={selected ? 1.30 : 1}
          />
          <circle
            r={17}
            fill="rgba(232,213,163,0.12)"
            opacity={selected ? 1.35 : 1}
          />
          <circle
            r={selected ? 9 : 8}
            fill={T.identityGold}
            style={{
              transition: "r 220ms ease",
              filter: selected
                ? "drop-shadow(0 0 10px rgba(232,200,109,0.82)) drop-shadow(0 0 26px rgba(232,200,109,0.34))"
                : "drop-shadow(0 0 8px rgba(232,200,109,0.64)) drop-shadow(0 0 20px rgba(232,200,109,0.22))",
            }}
          />
        </g>

        <circle
          r={74}
          fill="transparent"
          pointerEvents="all"
        />

        <text
          y={-46}
          textAnchor="middle"
          fontFamily={T.serif}
          fontSize={10.5}
          fontWeight={600}
          letterSpacing="0.22em"
          fill={T.accentGold}
          opacity={selected ? 1 : 0.78}
          pointerEvents="none"
          style={{ transition: "opacity 220ms ease" }}
        >
          SOVEREIGN DESIGN
        </text>
      </g>

      <SovereignDesignPreviewDrawer
        open={selected}
        onClose={() => setSelected(false)}
      />
    </>
  );
}
