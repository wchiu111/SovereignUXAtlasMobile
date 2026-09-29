export default function AtlasEnvironmentHeader() {
  return (
    <header
      style={{
        position: "fixed",
        left: 20,
        top: 20,
        zIndex: 24,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono',monospace",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: "rgba(232,200,109,0.9)",
        }}
      >
        The Sovereign Atlas
      </div>

      <div
        style={{
          marginTop: 8,
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontFamily: "'DM Mono',monospace",
          fontSize: 8,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "rgba(244,235,208,0.38)",
        }}
      >
        <span>Atlas environment</span>
        <span aria-hidden="true">·</span>
        <span>Online</span>
      </div>
    </header>
  );
}
