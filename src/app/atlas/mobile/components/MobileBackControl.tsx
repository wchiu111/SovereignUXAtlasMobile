import { T } from "./mobileShared";

type MobileBackControlProps = {
  label: string;
  onBack: () => void;
  ariaLabel?: string;
  interactive?: boolean;
  className?: string;
};

export default function MobileBackControl({
  label,
  onBack,
  ariaLabel,
  interactive = true,
  className,
}: MobileBackControlProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      aria-label={ariaLabel ?? `Back to ${label}`}
      className={className}
      disabled={!interactive}
      style={{
        minHeight: 44,
        minWidth: 44,
        maxWidth: "calc(100% - 52px)",
        display: "flex",
        alignItems: "center",
        gap: 7,
        border: "none",
        background: "transparent",
        padding: 0,
        fontFamily: T.mono,
        color: T.body,
        cursor: interactive ? "pointer" : "default",
        borderRadius: 3,
        opacity: interactive ? 1 : 0.72,
        pointerEvents: interactive ? "auto" : "none",
        WebkitTapHighlightColor: "transparent",
        touchAction: "manipulation",
      }}
    >
      <span
        aria-hidden
        style={{
          fontFamily: T.mono,
          fontSize: 12,
          opacity: 0.76,
          flexShrink: 0,
          position: "relative",
          top: -1,
        }}
      >
        ‹
      </span>
      <span
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          fontFamily: T.mono,
          fontSize: "clamp(9px, 2.45vw, 9.5px)",
          letterSpacing: "0.15em",
          color: T.body,
          opacity: 0.82,
        }}
      >
        {label}
      </span>
    </button>
  );
}
