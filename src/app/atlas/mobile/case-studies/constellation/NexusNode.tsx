import { FADE, NEXUS, T } from "../../components/mobileShared";

export default function NexusNode({ op }: { op: number }) {
  return (
    <g
      style={{
        transform: `translate(${NEXUS.x}px,${NEXUS.y}px)`,
        opacity: op,
        transition: FADE,
      }}
    >
      <g className="atlas-landing-nexus-field">
        <circle
          r={118}
          fill={T.identityGold}
          opacity={0.030}
          style={{ filter: "blur(8px)" }}
        />
        <circle
          r={82}
          fill={T.identityGold}
          opacity={0.048}
          style={{ filter: "blur(4px)" }}
        />
      </g>

      <g className="atlas-landing-nexus-rings">
        <circle r={130} fill="none" stroke={T.identityGold} strokeWidth={0.3} opacity={0.045} />
        <circle r={96}  fill="none" stroke={T.identityGold} strokeWidth={0.4} opacity={0.075} />
        <circle r={68}  fill="none" stroke={T.identityGold} strokeWidth={0.5} opacity={0.11}  />
        <circle r={27}  fill="none" stroke={T.identityGold} strokeWidth={0.8} opacity={0.17} />
      </g>

      <g className="atlas-landing-nexus-core">
        <circle r={60} fill="rgba(232,213,163,0.028)" />
        <circle r={33} fill="rgba(232,213,163,0.065)" />
        <circle r={17} fill="rgba(232,213,163,0.12)" />
        <circle
          r={8}
          fill={T.identityGold}
          style={{
            filter:
              "drop-shadow(0 0 8px rgba(232,200,109,0.64)) drop-shadow(0 0 20px rgba(232,200,109,0.22))",
          }}
        />
      </g>

      <text
        y={-46}
        textAnchor="middle"
        fontFamily={T.serif}
        fontSize={10.5}
        fontWeight={600}
        letterSpacing="0.22em"
        fill={T.accentGold}
        opacity={0.78}
      >
        SOVEREIGN DESIGN
      </text>
    </g>
  );
}
