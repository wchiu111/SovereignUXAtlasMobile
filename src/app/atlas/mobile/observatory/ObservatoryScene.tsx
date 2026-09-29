import {
  useEffect,
  useMemo,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { T } from "../components/mobileShared";
import {
  OBSERVATORY_HOTSPOTS,
  observatoryHotspotFor,
} from "./config/observatoryHotspots";
import { OBSERVATORY_MOTION } from "./config/observatoryMotion";
import ObservatoryEnvironment from "./environment/ObservatoryEnvironment";
import ObservatoryObjectReactions from "./environment/ObservatoryObjectReactions";
import ObservatoryHeader from "./components/ObservatoryHeader";
import ObservatoryHotspot from "./components/ObservatoryHotspot";
import ObservatoryPreview from "./components/ObservatoryPreview";
import ObservatoryFocusShell from "./focus/ObservatoryFocusShell";
import AboutSurface from "./focus/AboutSurface";
import JourneySurface from "./focus/JourneySurface";
import PhilosophySurface from "./focus/PhilosophySurface";
import ContactSurface from "./focus/ContactSurface";
import type {
  ObservatoryDestinationId,
  ObservatoryPanelId,
} from "./observatoryTypes";

interface ObservatorySceneProps {
  onReturnToAtlas: () => void;
  presentationScale: number;
}

export default function ObservatoryScene({
  onReturnToAtlas,
  presentationScale,
}: ObservatorySceneProps) {
  const [selected, setSelected] =
    useState<ObservatoryDestinationId | null>(null);
  const [active, setActive] =
    useState<ObservatoryPanelId | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const selectedHotspot = useMemo(
    () => observatoryHotspotFor(selected),
    [selected],
  );
  const activeHotspot = useMemo(
    () => observatoryHotspotFor(active),
    [active],
  );

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      if (active) {
        event.preventDefault();
        setActive(null);
        requestAnimationFrame(() => {
          document
            .querySelector<HTMLElement>(
              `[data-observatory-hotspot="${active}"]`,
            )
            ?.focus({ preventScroll: true });
        });
        return;
      }

      if (selected) {
        event.preventDefault();
        setSelected(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, selected]);

  const camera =
    activeHotspot?.camera ?? {
      translateX: 0,
      translateY: 0,
      scale: 1,
    };

  function commit(id: ObservatoryDestinationId) {
    setHasInteracted(true);

    if (id === "atlas") {
      onReturnToAtlas();
      return;
    }

    setSelected(id);
    setActive(id);
  }

  function selectHotspot(id: ObservatoryDestinationId) {
    setHasInteracted(true);

    if (selected === id && active === null) {
      commit(id);
      return;
    }

    setSelected(id);
  }

  function closeFocus() {
    const previous = active;
    setActive(null);

    if (previous) {
      window.setTimeout(
        () => {
          document
            .querySelector<HTMLElement>(
              `[data-observatory-hotspot="${previous}"]`,
            )
            ?.focus({ preventScroll: true });
        },
        reducedMotion ? 0 : 320,
      );
    }
  }

  function handleRoomPointerDown(
    event: ReactPointerEvent<HTMLElement>,
  ) {
    if (active || !selected) return;

    const target = event.target as HTMLElement | null;
    if (!target) return;

    if (
      target.closest(
        '[data-observatory-hotspot], [data-observatory-interactive="true"], .observatory-mobile-focus-shell',
      )
    ) {
      return;
    }

    setSelected(null);
  }

  const environmentHotspot =
    activeHotspot ?? selectedHotspot;

  return (
    <main
      aria-label="Wilson Chiu Observatory"
      onPointerDown={handleRoomPointerDown}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#04060A",
        color: T.body,
      }}
    >
      <style>{`
        @keyframes observatoryMobileIdleCore {
          0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(0.90); }
          50% { opacity: 0.92; transform: translate(-50%, -50%) scale(1.08); }
        }

        @keyframes observatoryMobileSelectedCore {
          0%, 100% { opacity: 0.78; transform: translate(-50%, -50%) scale(0.92); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.12); }
        }

        @keyframes observatoryMobilePreviewIn {
          from { opacity: 0; transform: translateY(14px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes observatoryMobileFocusResolve {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes observatoryMobileFocusFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .observatory-mobile-focusable:focus-visible {
          outline: 1.5px solid rgba(232,200,109,0.92) !important;
          outline-offset: 3px;
        }

        .observatory-mobile-focus-shell * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .observatory-mobile-focus-shell *::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .observatory-mobile-focusable,
          .observatory-mobile-focus-shell,
          [data-observatory-hotspot] * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <ObservatoryEnvironment
        camera={camera}
        reducedMotion={reducedMotion}
        paused={active !== null}
        selected={Boolean(environmentHotspot)}
        presentationScale={presentationScale}
      >
        <ObservatoryObjectReactions
          hotspots={OBSERVATORY_HOTSPOTS}
          selectedId={selected}
          focusedId={active}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 8,
            opacity: active ? 0.14 : 1,
            transition:
              `opacity ${OBSERVATORY_MOTION.hotspotMs}ms ease`,
            pointerEvents: active ? "none" : "auto",
          }}
        >
          {OBSERVATORY_HOTSPOTS.map((hotspot) => (
            <ObservatoryHotspot
              key={hotspot.id}
              hotspot={hotspot}
              selected={selected === hotspot.id}
              subdued={
                Boolean(selected) && selected !== hotspot.id
              }
              disabled={active !== null}
              onSelect={() => selectHotspot(hotspot.id)}
            />
          ))}
        </div>
      </ObservatoryEnvironment>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 390,
          height: 844,
          zIndex: 10,
          transform: `translate(-50%, -50%) scale(${presentationScale})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <ObservatoryHeader quiet={active !== null} />

        {!active && selectedHotspot && (
          <ObservatoryPreview
            key={selectedHotspot.id}
            hotspot={selectedHotspot}
            onExplore={() => commit(selectedHotspot.id)}
          />
        )}

        {!active && !selected && !hasInteracted && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom:
                "calc(26px + env(safe-area-inset-bottom, 0px))",
              zIndex: 11,
              textAlign: "center",
              fontFamily: T.mono,
              fontSize: 10,
              letterSpacing: "0.18em",
              color: T.identityGold,
              opacity: 0.68,
            }}
          >
            TAP A DESTINATION
          </div>
        )}
      </div>

      {active && activeHotspot && (
        <ObservatoryFocusShell
          title={activeHotspot.label
            .toLowerCase()
            .replace(/\b\w/g, (letter) => letter.toUpperCase())}
          eyebrow={activeHotspot.eyebrow}
          color={activeHotspot.color}
          reducedMotion={reducedMotion}
          onBack={closeFocus}
        >
          {active === "about" && <AboutSurface />}
          {active === "journey" && <JourneySurface />}
          {active === "philosophy" && <PhilosophySurface />}
          {active === "contact" && <ContactSurface />}
        </ObservatoryFocusShell>
      )}
    </main>
  );
}
