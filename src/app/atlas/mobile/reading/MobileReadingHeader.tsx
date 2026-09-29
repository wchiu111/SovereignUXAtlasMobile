import MobileBackControl from "../components/MobileBackControl";
import { MOBILE_CONTENT_INSET, T } from "../components/mobileShared";

export default function MobileReadingHeader({
  title,
  onBack,
  elevated = false,
}: {
  title: string;
  onBack: () => void;
  elevated?: boolean;
}) {
  return (
    <header
      className="mobile-reading-header"
      style={{
        minHeight: 62,
        padding:
          `max(0px, env(safe-area-inset-top)) ${MOBILE_CONTENT_INSET} 0`,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        background: elevated ? "rgba(5,5,10,0.985)" : "rgba(5,5,10,0.94)",
        backdropFilter: "blur(22px)",
        WebkitBackdropFilter: "blur(22px)",
        borderBottom: "0.5px solid rgba(232,213,163,0.09)",
        transition: "background 220ms ease, border-color 220ms ease",
      }}
    >
      <MobileBackControl
        label={title}
        onBack={onBack}
        ariaLabel={`Return from ${title}`}
        className="mobile-reading-focusable"
      />

      <div
        aria-hidden
        style={{
          minWidth: 44,
          minHeight: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: T.mono,
          fontSize: 9,
          letterSpacing: "0.12em",
          color: T.body,
          opacity: 0.30,
        }}
      >
        · · ·
      </div>
    </header>
  );
}
