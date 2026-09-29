import type { ReactNode } from "react";
import { T } from "../../components/mobileShared";

export default function ObservatoryFocusShell({
  title,
  eyebrow,
  color,
  reducedMotion,
  onBack,
  children,
}: {
  title: string;
  eyebrow: string;
  color: string;
  reducedMotion: boolean;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <section
      role="region"
      aria-label={title}
      className="observatory-mobile-focus-shell"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 30,
        overflow: "hidden",
        background:
          "linear-gradient(180deg, rgba(4,6,11,0.72), rgba(4,6,11,0.94) 118px, rgba(4,6,11,0.985) 260px)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        animation: reducedMotion
          ? "observatoryMobileFocusFade 160ms ease both"
          : "observatoryMobileFocusResolve 560ms cubic-bezier(0.16,1,0.3,1) 360ms both",
      }}
    >
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          minHeight:
            "calc(76px + env(safe-area-inset-top, 0px))",
          padding:
            "calc(14px + env(safe-area-inset-top, 0px)) 20px 12px",
          boxSizing: "border-box",
          zIndex: 3,
          background:
            "linear-gradient(180deg, rgba(4,6,11,0.97), rgba(4,6,11,0.78))",
          borderBottom: `0.5px solid ${color}2B`,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="observatory-mobile-focusable"
          style={{
            minHeight: 30,
            border: 0,
            background: "transparent",
            padding: 0,
            fontFamily: T.mono,
            fontSize: 8,
            letterSpacing: "0.16em",
            color: T.body,
            opacity: 0.74,
            cursor: "pointer",
          }}
        >
          ‹ OBSERVATORY
        </button>

        <div
          style={{
            marginTop: 7,
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 14,
          }}
        >
          <h1
            style={{
              margin: 0,
              minWidth: 0,
              fontFamily: T.serif,
              fontSize: 24,
              lineHeight: 1,
              fontWeight: 600,
              color: "#F0E9D8",
            }}
          >
            {title}
          </h1>

          <div
            style={{
              flex: "0 0 auto",
              maxWidth: 130,
              fontFamily: T.mono,
              fontSize: 6.5,
              lineHeight: 1.35,
              letterSpacing: "0.13em",
              textAlign: "right",
              textTransform: "uppercase",
              color,
              opacity: 0.70,
            }}
          >
            {eyebrow}
          </div>
        </div>
      </header>

      <div
        style={{
          position: "absolute",
          top: "calc(76px + env(safe-area-inset-top, 0px))",
          right: 0,
          bottom: 0,
          left: 0,
          overflowY: "auto",
          overflowX: "hidden",
          overscrollBehaviorY: "contain",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </div>
    </section>
  );
}
