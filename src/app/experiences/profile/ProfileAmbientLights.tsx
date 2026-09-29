interface AmbientGlowProps {
  x: number;
  y: number;
  width: number;
  height?: number;
  color: string;
  delay?: number;
  duration?: number;
  flicker?: boolean;
}

function AmbientGlow({
  x,
  y,
  width,
  height = width,
  color,
  delay = 0,
  duration = 9000,
  flicker = false,
}: AmbientGlowProps) {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        mixBlendMode: "screen",
        filter: "blur(2px)",
        animation: `profileLightBreathe ${duration}ms ease-in-out ${delay}ms infinite`,
        pointerEvents: "none",
      }}
    />
  );
}

export default function ProfileAmbientLights() {
  return (
    <div
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <AmbientGlow x={170} y={627} width={230} color="rgba(244,174,73,0.22)" duration={11400} flicker />
      <AmbientGlow x={1194} y={613} width={190} color="rgba(244,174,73,0.17)" delay={1800} duration={13800} flicker />
      <AmbientGlow x={1470} y={587} width={160} color="rgba(239,160,57,0.13)" delay={4600} duration={15100} flicker />
      <AmbientGlow x={864} y={728} width={260} height={120} color="rgba(99,197,142,0.075)" delay={900} duration={8200} />
      <AmbientGlow x={718} y={732} width={190} height={100} color="rgba(232,200,109,0.07)" delay={2500} duration={9600} />

      <div
        style={{
          position: "absolute",
          left: 619,
          top: 746,
          width: 413,
          height: 38,
          opacity: 0.55,
          background:
            "repeating-linear-gradient(90deg, transparent 0 29px, rgba(232,200,109,0.16) 30px 31px, transparent 32px 58px)",
          filter: "blur(0.5px)",
          animation: "profileConsolePulse 7.5s ease-in-out infinite",
        }}
      />
    </div>
  );
}
