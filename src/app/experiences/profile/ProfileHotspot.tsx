import { useEffect, useRef, useState } from "react";

import type {
  ProfileHotspotDefinition,
  ProfileHotspotKind,
} from "./profileHotspots";

interface ProfileHotspotProps {
  hotspot: ProfileHotspotDefinition;
  active: boolean;
  subdued: boolean;
  onHover: (id: ProfileHotspotDefinition["id"] | null) => void;
  onSelect: (hotspot: ProfileHotspotDefinition) => void;
}

export default function ProfileHotspot({
  hotspot,
  active,
  subdued,
  onHover,
  onSelect,
}: ProfileHotspotProps) {
  const [visualPhase, setVisualPhase] = useState<
    "idle" | "active" | "settling"
  >(active ? "active" : "idle");
  const settleTimer = useRef<number | null>(null);
  const previousActive = useRef(active);

  useEffect(() => {
    if (settleTimer.current !== null) {
      window.clearTimeout(settleTimer.current);
      settleTimer.current = null;
    }

    if (active) {
      setVisualPhase("active");
    } else if (previousActive.current) {
      setVisualPhase("settling");
      settleTimer.current = window.setTimeout(() => {
        setVisualPhase("idle");
        settleTimer.current = null;
      }, 360);
    } else {
      setVisualPhase("idle");
    }

    previousActive.current = active;

    return () => {
      if (settleTimer.current !== null) {
        window.clearTimeout(settleTimer.current);
        settleTimer.current = null;
      }
    };
  }, [active]);

  const alignTransform =
    hotspot.align === "left"
      ? "translateX(0)"
      : hotspot.align === "right"
        ? "translateX(-100%)"
        : "translateX(-50%)";

  return (
    <button
      type="button"
      aria-label={`${hotspot.label}. ${hotspot.description}`}
      onMouseEnter={() => onHover(hotspot.id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(hotspot.id)}
      onBlur={() => onHover(null)}
      onClick={() => onSelect(hotspot)}
      style={{
        position: "absolute",
        left: hotspot.x,
        top: hotspot.y,
        zIndex: 8,
        width: 132,
        height: 132,
        transform: "translate(-50%, -50%)",
        padding: 0,
        border: 0,
        borderRadius: "50%",
        background: "transparent",
        cursor: "pointer",
        opacity: subdued ? 0.22 : 1,
        transition: "opacity 300ms ease",
      }}
    >
      <style>{`
        @keyframes profileIdleNodeTwinkle {
          0%, 100% {
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1);
          }
          16% {
            opacity: 0.38;
            transform: translate(-50%, -50%) scale(1.06);
          }
          43% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(var(--node-halo-peak));
          }
          56% {
            opacity: 0.78;
            transform: translate(-50%, -50%) scale(1.18);
          }
          79% {
            opacity: 0.32;
            transform: translate(-50%, -50%) scale(1.02);
          }
        }

        @keyframes profileIdleCoreTwinkle {
          0%, 100% {
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1);
          }
          18% {
            opacity: 0.42;
            transform: translate(-50%, -50%) scale(1.06);
          }
          44% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(var(--node-core-peak));
          }
          58% {
            opacity: 0.74;
            transform: translate(-50%, -50%) scale(1.22);
          }
          82% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1.02);
          }
        }
          18% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1.06);
            filter: brightness(0.96);
          }
          44% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(var(--node-core-peak));
            filter: brightness(2);
          }
          58% {
            opacity: 0.72;
            transform: translate(-50%, -50%) scale(1.22);
            filter: brightness(1.34);
          }
          82% {
            opacity: 0.28;
            transform: translate(-50%, -50%) scale(1.02);
            filter: brightness(0.8);
          }
        }

        @keyframes profilePhilosophyPathReveal {
          0% {
            opacity: 0;
            stroke-dashoffset: 1;
          }
          100% {
            opacity: 0.92;
            stroke-dashoffset: 0;
          }
        }

        @keyframes profilePhilosophySecondaryPathReveal {
          0% {
            opacity: 0;
            stroke-dashoffset: 1;
          }
          100% {
            opacity: 0.42;
            stroke-dashoffset: 0;
          }
        }

        @keyframes profilePhilosophyHoverNodeReveal {
          0% {
            opacity: 0;
            transform: scale(0.2);
          }
          65% {
            opacity: 1;
            transform: scale(1.18);
          }
          100% {
            opacity: 0.92;
            transform: scale(1);
          }
        }

        @keyframes profilePhilosophyHoverNodeTwinkle {
          0%, 100% {
            opacity: 0.42;
            transform: scale(0.86);
          }
          50% {
            opacity: 1;
            transform: scale(1.22);
          }
        }

        @keyframes profilePhilosophyNetworkBreath {
          0%, 100% {
            opacity: 0.72;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.025);
          }
        }

      `}</style>

      <UnifiedNodeSystem
        id={hotspot.id}
        kind={hotspot.kind}
        phase={visualPhase}
        color={hotspot.color}
      />

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: active ? 101 : 88,
          width: 1,
          height: active ? 34 : 0,
          opacity: active ? 0.84 : 0,
          background: `linear-gradient(${hotspot.color}E8, ${hotspot.color}00)`,
          boxShadow: active ? `0 0 10px ${hotspot.color}5C` : "none",
          transition:
            "height 360ms cubic-bezier(0.22,1,0.36,1) 120ms, opacity 220ms ease 100ms, top 320ms ease",
        }}
      />

      <span
        style={{
          position: "absolute",
          left: `calc(50% + ${hotspot.labelOffsetX ?? 0}px)`,
          top: 139 + (hotspot.labelOffsetY ?? 0),
          width: 340,
          padding: "0 10px",
          transform: `${alignTransform} translateY(${active ? "0" : "10px"})`,
          opacity: active ? 1 : 0,
          pointerEvents: "none",
          textAlign:
            hotspot.align === "left"
              ? "left"
              : hotspot.align === "right"
                ? "right"
                : "center",
          transition:
            "opacity 260ms ease 230ms, transform 420ms cubic-bezier(0.22,1,0.36,1) 180ms",
        }}
      >
        <span
          style={{
            display: "block",
            fontFamily: "'DM Mono', monospace",
            fontSize: 9,
            lineHeight: 1.45,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: `${hotspot.color}F2`,
            textShadow: `0 0 16px ${hotspot.color}62, 0 4px 18px rgba(0,0,0,0.94)`,
          }}
        >
          {hotspot.eyebrow}
        </span>

        <span
          style={{
            display: "block",
            marginTop: 8,
            fontFamily: "'DM Mono', monospace",
            fontSize: 16,
            lineHeight: 1.24,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(255,248,229,0.99)",
            textShadow:
              "0 0 20px rgba(245,235,210,0.22), 0 4px 20px rgba(0,0,0,0.96)",
          }}
        >
          {hotspot.label}
        </span>

        <span
          style={{
            display: "block",
            maxHeight: active ? 82 : 0,
            marginTop: active ? 11 : 0,
            overflow: "hidden",
            fontFamily: "'EB Garamond', serif",
            fontSize: 19,
            lineHeight: 1.38,
            color: "rgba(255,248,229,0.86)",
            textShadow: "0 4px 20px rgba(0,0,0,0.98)",
            transition:
              "max-height 360ms ease 280ms, margin-top 300ms ease 260ms",
          }}
        >
          {hotspot.description}
        </span>
      </span>
    </button>
  );
}

const NODE_TWINKLE: Record<
  ProfileHotspotDefinition["id"],
  {
    duration: number;
    delay: number;
    haloPeak: number;
    corePeak: number;
  }
> = {
  atlas: {
    duration: 5200,
    delay: -900,
    haloPeak: 1.65,
    corePeak: 1.85,
  },
  timeline: {
    duration: 6900,
    delay: -2400,
    haloPeak: 2.34,
    corePeak: 2.52,
  },
  contact: {
    duration: 4700,
    delay: -1850,
    haloPeak: 1.48,
    corePeak: 1.68,
  },
  about: {
    duration: 7600,
    delay: -3250,
    haloPeak: 1.26,
    corePeak: 1.42,
  },
  philosophy: {
    duration: 5900,
    delay: -3050,
    haloPeak: 1.76,
    corePeak: 1.96,
  },
};

function UnifiedNodeSystem({
  id,
  kind,
  phase,
  color,
}: {
  id: ProfileHotspotDefinition["id"];
  kind: ProfileHotspotKind;
  phase: "idle" | "active" | "settling";
  color: string;
}) {
  const twinkle = NODE_TWINKLE[id];
  const active = phase === "active";
  const idle = phase === "idle";
  const settling = phase === "settling";

  return (
    <>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: active ? 116 : 38,
          height: active ? 116 : 38,
          transform: settling
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%)",
          borderRadius: "50%",
          border: `1px solid ${color}${active ? "70" : "42"}`,
          background: active
            ? `radial-gradient(circle, ${color}24 0%, ${color}0C 44%, transparent 74%)`
            : `radial-gradient(circle, ${color}18 0%, transparent 72%)`,
          boxShadow: active
            ? `0 0 42px ${color}4E, 0 0 96px ${color}22`
            : `0 0 18px ${color}8A, 0 0 42px ${color}42, 0 0 76px ${color}1C`,
          opacity: active ? 1 : settling ? 0.42 : 0.9,
          filter: "brightness(1)",
          transition:
            "width 440ms cubic-bezier(0.22,1,0.36,1), height 440ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease, transform 320ms ease, border-color 240ms ease, box-shadow 240ms ease",
          ["--node-halo-peak" as string]: twinkle.haloPeak,
          animation: active
            ? "profileUnifiedFieldBreathe 3000ms ease-in-out infinite"
            : idle
              ? `profileIdleNodeTwinkle ${twinkle.duration}ms cubic-bezier(0.42,0,0.2,1) ${twinkle.delay}ms infinite`
              : "none",
          willChange: "opacity, transform",
        }}
      />

      {active && <ActiveSystem kind={kind} color={color} />}

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: active ? 16 : 10,
          height: active ? 16 : 10,
          transform: settling
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%)",
          borderRadius: "50%",
          background: color,
          boxShadow: active
            ? `0 0 28px ${color}, 0 0 72px ${color}C8`
            : `0 0 16px ${color}, 0 0 38px ${color}B8, 0 0 68px ${color}4A`,
          opacity: active ? 1 : settling ? 0.48 : 1,
          filter: "brightness(1)",
          transition:
            "width 260ms ease, height 260ms ease, box-shadow 260ms ease, opacity 320ms ease, transform 320ms ease",
          ["--node-core-peak" as string]: twinkle.corePeak,
          animation: active
            ? "none"
            : idle
              ? `profileIdleCoreTwinkle ${twinkle.duration}ms cubic-bezier(0.42,0,0.2,1) ${twinkle.delay - 90}ms infinite`
              : "none",
          willChange: "opacity, transform",
        }}
      />
    </>
  );
}

function ActiveSystem({
  kind,
  color,
}: {
  kind: ProfileHotspotKind;
  color: string;
}) {
  if (kind === "books") {
    return <PhilosophyConstellation color={color} />;
  }

  if (kind === "silhouette") {
    return <AboutOrbitalSystem color={color} />;
  }

  if (kind === "notebook" || kind === "console") {
    return <RadarSystem color={color} />;
  }

  return <AtlasSystem color={color} />;
}

function AtlasSystem({ color }: { color: string }) {
  const satellites = [
    { radius: 38, angle: -28, size: 7, delay: 0 },
    { radius: 48, angle: 54, size: 6, delay: 180 },
    { radius: 56, angle: 142, size: 5, delay: 340 },
    { radius: 44, angle: 216, size: 6, delay: 480 },
  ];

  return (
    <>
      {[34, 58, 84].map((size, index) => (
        <span
          key={size}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: `1px solid ${color}${index === 0 ? "9A" : "58"}`,
            opacity: 0.88 - index * 0.16,
            animation: `profileAtlasOrbitRing ${4600 + index * 900}ms ease-in-out ${index * 120}ms infinite`,
          }}
        />
      ))}

      {satellites.map((satellite, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: satellite.radius * 2,
            height: satellite.radius * 2,
            transform: `translate(-50%, -50%) rotate(${satellite.angle}deg)`,
            animation: `profileAtlasSatelliteOrbit ${6200 + index * 850}ms linear ${satellite.delay}ms infinite`,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: -satellite.size / 2,
              width: satellite.size,
              height: satellite.size,
              transform: "translateX(-50%)",
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 12px ${color}, 0 0 24px ${color}70`,
            }}
          />
        </span>
      ))}
    </>
  );
}

function RadarSystem({ color }: { color: string }) {
  return (
    <>
      {[34, 58, 84].map((size, index) => (
        <span
          key={size}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: `1.5px solid ${color}${index === 0 ? "D0" : "76"}`,
            opacity: 0.98 - index * 0.18,
            boxShadow: index === 0 ? `0 0 18px ${color}58` : "none",
            animation: `profileSharedRadarPulse ${1700 + index * 340}ms ease-out ${index * 130}ms infinite`,
          }}
        />
      ))}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 104,
          height: 1,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(
            90deg,
            transparent,
            ${color}B8 30%,
            ${color} 50%,
            ${color}B8 70%,
            transparent
          )`,
          opacity: 0.78,
          boxShadow: `0 0 10px ${color}40`,
        }}
      />
    </>
  );
}

function AboutOrbitalSystem({ color }: { color: string }) {
  const nodes = [
    { radius: 44, angle: 12, size: 7, delay: 0 },
    { radius: 50, angle: 78, size: 6, delay: 160 },
    { radius: 39, angle: 154, size: 5, delay: 300 },
    { radius: 54, angle: 226, size: 6, delay: 450 },
    { radius: 34, angle: 304, size: 5, delay: 620 },
  ];

  return (
    <>
      {[40, 68, 96].map((size, index) => (
        <span
          key={size}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: size,
            height: size,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            border: `1px solid ${color}${index === 0 ? "B0" : "62"}`,
            opacity: 0.9 - index * 0.18,
            animation: `profileAboutOrbitBreathe ${3600 + index * 700}ms ease-in-out ${index * 150}ms infinite`,
          }}
        />
      ))}

      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 126,
          height: 1,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(90deg, transparent, ${color}70, transparent)`,
          opacity: 0.62,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1,
          height: 126,
          transform: "translate(-50%, -50%)",
          background: `linear-gradient(180deg, transparent, ${color}70, transparent)`,
          opacity: 0.62,
        }}
      />

      {nodes.map((node, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: node.radius * 2,
            height: node.radius * 2,
            transform: `translate(-50%, -50%) rotate(${node.angle}deg)`,
            animation: `profileAboutSatelliteOrbit ${7200 + index * 780}ms linear ${node.delay}ms infinite`,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: -node.size / 2,
              width: node.size,
              height: node.size,
              transform: "translateX(-50%)",
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 12px ${color}, 0 0 24px ${color}68`,
              animation: `profileAboutNodePulse 2200ms ease-in-out ${index * 180}ms infinite`,
            }}
          />
        </span>
      ))}
    </>
  );
}

function PhilosophyConstellation({ color }: { color: string }) {
  const nodes = [
    { x: 18, y: 66, r: 4.5, delay: 220 },
    { x: 62, y: 44, r: 5.5, delay: 340 },
    { x: 108, y: 26, r: 6, delay: 480 },
    { x: 154, y: 62, r: 10, delay: 620, primary: true },
    { x: 204, y: 36, r: 5.5, delay: 760 },
    { x: 252, y: 68, r: 5, delay: 900 },
    { x: 296, y: 42, r: 4.5, delay: 1020 },
  ] as const;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 314 120"
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: 314,
        height: 120,
        transform: "translate(-50%, -50%)",
        overflow: "visible",
        filter: `drop-shadow(0 0 8px ${color}52)`,
        animation:
          "profilePhilosophyNetworkBreath 5600ms ease-in-out 1300ms infinite",
      }}
    >
      <path
        d="M18 66 C40 72 44 46 62 44 C84 42 86 22 108 26 C130 30 132 60 154 62 C178 64 184 28 204 36 C226 44 230 74 252 68 C272 62 278 34 296 42"
        fill="none"
        stroke={`${color}D0`}
        strokeWidth="1.15"
        pathLength="1"
        strokeDasharray="1"
        style={{
          filter: `drop-shadow(0 0 5px ${color}72)`,
          animation:
            "profilePhilosophyPathReveal 980ms cubic-bezier(0.22,1,0.36,1) 120ms both",
        }}
      />

      <path
        d="M18 66 C56 112 102 78 154 62 C204 46 242 10 296 42"
        fill="none"
        stroke={`${color}72`}
        strokeWidth="0.9"
        pathLength="1"
        strokeDasharray="0.03 0.035"
        style={{
          animation:
            "profilePhilosophySecondaryPathReveal 1180ms cubic-bezier(0.22,1,0.36,1) 380ms both",
        }}
      />

      <path
        d="M62 44 C96 94 122 10 154 62 C182 108 216 12 252 68"
        fill="none"
        stroke={`${color}66`}
        strokeWidth="0.8"
        pathLength="1"
        strokeDasharray="0.05 0.045"
        style={{
          animation:
            "profilePhilosophySecondaryPathReveal 1320ms cubic-bezier(0.22,1,0.36,1) 540ms both",
        }}
      />

      <circle
        cx="154"
        cy="62"
        r="30"
        fill="none"
        stroke={`${color}30`}
        strokeWidth="1"
        strokeDasharray="3 6"
        style={{
          transformOrigin: "154px 62px",
          animation: "profilePhilosophyHalo 4200ms ease-in-out infinite",
        }}
      />

      <circle
        cx="154"
        cy="62"
        r="18"
        fill="none"
        stroke={`${color}44`}
        strokeWidth="1"
        style={{
          transformOrigin: "154px 62px",
          animation:
            "profilePhilosophyHalo 3200ms ease-in-out 180ms infinite",
        }}
      />

      {nodes.map((node, index) => (
        <g
          key={`${node.x}-${node.y}`}
          style={{
            transformOrigin: `${node.x}px ${node.y}px`,
            animation: `profilePhilosophyHoverNodeReveal 620ms cubic-bezier(0.22,1,0.36,1) ${node.delay}ms both`,
          }}
        >
          <circle
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill={color}
            style={{
              filter: node.primary
                ? `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 26px ${color}B0)`
                : `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 15px ${color}78)`,
              transformOrigin: `${node.x}px ${node.y}px`,
              animation: `profilePhilosophyHoverNodeTwinkle ${
                2600 + index * 280
              }ms ease-in-out ${1200 + index * 140}ms infinite`,
            }}
          />

          {!node.primary && (
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r + 5}
              fill="none"
              stroke={`${color}2E`}
              strokeWidth="1"
            />
          )}
        </g>
      ))}
    </svg>
  );
}
