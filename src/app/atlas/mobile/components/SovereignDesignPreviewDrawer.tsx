import { createPortal } from "react-dom";
import {
  useEffect,
  useRef,
  useState,
} from "react";

import { ATLAS_PREVIEW_CONTENT } from "../../components/AtlasPreviewContent";
import AtlasOverviewDrawer from "../overview/AtlasOverviewDrawer";
import {
  ATLAS_OVERVIEW_DRAWER_CLOSE_DURATION,
  ATLAS_OVERVIEW_REDUCED_DRAWER_DURATION,
} from "../overview/atlasOverviewMotion";
import { T } from "./mobileShared";

type DrawerPhase = "opening" | "open" | "closing";

export default function SovereignDesignPreviewDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const content = ATLAS_PREVIEW_CONTENT["sovereign-design"];
  const [phase, setPhase] = useState<DrawerPhase>("opening");
  const [reducedMotion, setReducedMotion] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const openRafRef = useRef<number | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  useEffect(() => {
    if (!open) return;

    setPhase("opening");
    openRafRef.current = requestAnimationFrame(() => {
      openRafRef.current = requestAnimationFrame(() => {
        setPhase("open");
        openRafRef.current = null;
      });
    });

    return () => {
      if (openRafRef.current !== null) {
        cancelAnimationFrame(openRafRef.current);
        openRafRef.current = null;
      }
    };
  }, [open]);

  function requestClose() {
    if (phase === "closing") return;

    setPhase("closing");

    const duration = reducedMotion
      ? ATLAS_OVERVIEW_REDUCED_DRAWER_DURATION
      : ATLAS_OVERVIEW_DRAWER_CLOSE_DURATION;

    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null;
      onClose();
    }, duration);
  }

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      requestClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
      if (openRafRef.current !== null) {
        cancelAnimationFrame(openRafRef.current);
      }
    };
  }, []);

  if (!open || typeof document === "undefined") return null;

  const entered = phase === "open";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sovereign Design"
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: "50%",
        width: "min(100%, 430px)",
        transform: "translateX(-50%)",
        zIndex: 110,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        svg[data-sovereign-design-focus="true"] [data-system-id] {
          opacity: 0.42 !important;
          transition: opacity 220ms ease !important;
        }

        svg[data-sovereign-design-focus="true"] > path {
          opacity: 0.045 !important;
          transition: opacity 220ms ease !important;
        }

        svg[data-sovereign-design-focus="true"] > line {
          opacity: 0.010 !important;
          transition: opacity 220ms ease !important;
        }
      `}</style>

      <button
        type="button"
        aria-label="Close Sovereign Design preview"
        onClick={requestClose}
        disabled={phase === "closing"}
        style={{
          position: "absolute",
          inset: 0,
          border: "none",
          padding: 0,
          pointerEvents: phase === "closing" ? "none" : "auto",
          cursor: "default",
          background:
            "radial-gradient(circle at 50% 45%, rgba(5,5,10,0.015) 0 78px, rgba(5,5,10,0.10) 126px, rgba(5,5,10,0.34) 58%, rgba(5,5,10,0.52) 100%)",
          opacity: entered ? 1 : 0,
          transition: reducedMotion
            ? "opacity 1ms linear"
            : "opacity 240ms ease",
          WebkitTapHighlightColor: "transparent",
        }}
      />

      {/*
        The preview is intentionally scrim-dismiss only. There is no visible
        < ATLAS control because this is a temporary focus state on the landing
        constellation, not a navigated child level.
      */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      >
        <AtlasOverviewDrawer
          title={content.title.toUpperCase()}
          titleColor={content.color}
          titleLetterSpacing="0.10em"
          color={content.color}
          phase={phase}
          arrivalVisible={entered}
          reducedMotion={reducedMotion}
          closeDurationMs={ATLAS_OVERVIEW_DRAWER_CLOSE_DURATION}
          reducedDurationMs={ATLAS_OVERVIEW_REDUCED_DRAWER_DURATION}
          compact
        >
          <div
            style={{
              fontFamily: T.serif,
              fontSize: 15,
              fontWeight: 600,
              color: T.identityGold,
              lineHeight: 1.35,
              marginBottom: 14,
            }}
          >
            {content.eyebrow}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {content.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                style={{
                  margin: 0,
                  fontFamily: T.serif,
                  fontSize: 13.5,
                  lineHeight: 1.56,
                  color: "#F0E9D8",
                  opacity: index === 0 ? 0.90 : 0.80,
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AtlasOverviewDrawer>
      </div>
    </div>,
    document.body,
  );
}
