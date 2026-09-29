interface AtlasNexusProps {
  x: number;
  y: number;
  level: number;
  hovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}

export default function AtlasNexus({
  x,
  y,
  level,
  hovered,
  onHoverChange,
}: AtlasNexusProps) {
  return (
    <g
      opacity={level === 0 ? 1 : 0.25}
      style={{ transition: "opacity 0.5s" }}
    >
      {[
        { r: 27, dur: "92s", f: "0", t: "360", d: "5 12", op: hovered ? 0.32 : 0.16, sw: 0.52 },
        { r: 68, dur: "132s", f: "360", t: "0", d: "3 16", op: hovered ? 0.2 : 0.09, sw: 0.42 },
        { r: 96, dur: "184s", f: "0", t: "360", d: "8 24", op: hovered ? 0.11 : 0.045, sw: 0.32 },
        { r: 130, dur: "238s", f: "360", t: "0", d: "2 22", op: hovered ? 0.07 : 0.026, sw: 0.24 },
      ].map(({ r, dur, f, t, d, op, sw }, index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={hovered ? r * 1.04 : r}
          fill="none"
          stroke="#E8C86D"
          strokeWidth={sw}
          strokeOpacity={op}
          strokeDasharray={d}
          style={{
            transition:
              "r 0.45s cubic-bezier(0.16,1,0.3,1), stroke-opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from={`${f} ${x} ${y}`}
            to={`${t} ${x} ${y}`}
            dur={dur}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      <circle
        cx={x}
        cy={y}
        r={hovered ? 60 : 33}
        fill="#E8C86D"
        opacity={hovered ? 0.12 : 0.055}
        style={{
          transition:
            "r 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <circle
        cx={x}
        cy={y}
        r={hovered ? 31 : 17}
        fill="#E8C86D"
        opacity={hovered ? 0.28 : 0.18}
        filter="url(#glow-nexus)"
        style={{
          transition:
            "r 0.42s cubic-bezier(0.16,1,0.3,1), opacity 0.42s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <circle
        cx={x}
        cy={y}
        r={hovered ? 43 : 28}
        fill="none"
        stroke="#E8C86D"
        strokeWidth="0.6"
        strokeDasharray="4 9"
        strokeOpacity={hovered ? 0.4 : 0}
        style={{
          transition:
            "r 0.35s cubic-bezier(0.16,1,0.3,1), stroke-opacity 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      <circle
        cx={x}
        cy={y}
        r={hovered ? 10.5 : 8}
        fill="#E8C86D"
        filter="url(#glow-nexus)"
        style={{
          transition: "r 0.3s cubic-bezier(0.16,1,0.3,1)",
          cursor: "pointer",
        }}
      />

      <text
        x={x}
        y={y - 42}
        textAnchor="middle"
        fontSize="14"
        fontFamily="'EB Garamond',serif"
        fontWeight={600}
        fill="#E8C86D"
        letterSpacing="2.5"
        opacity={hovered ? 0.94 : 0.48}
        style={{
          transition: "opacity 0.3s ease-out",
          pointerEvents: "none",
        }}
      >
        SOVEREIGN DESIGN
      </text>

      <circle
        cx={x}
        cy={y}
        r={70}
        fill="transparent"
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onClick={event => event.stopPropagation()}
        style={{ cursor: "crosshair" }}
      />
    </g>
  );
}
