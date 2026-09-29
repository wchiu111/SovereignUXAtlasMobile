const paths = [
  "M145 130 L250 176 L344 118 L438 202 L542 146",
  "M228 294 L318 238 L404 326 L506 260 L620 322",
  "M506 260 L596 188 L706 236 L790 162",
  "M344 118 L404 326",
  "M620 322 L716 390 L812 322",
];

const nodes = [
  [145, 130], [250, 176], [344, 118], [438, 202], [542, 146],
  [228, 294], [318, 238], [404, 326], [506, 260], [620, 322],
  [596, 188], [706, 236], [790, 162], [716, 390], [812, 322],
];

export default function ProfileConstellationLayer() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 960 520"
      preserveAspectRatio="xMidYMid meet"
      style={{
        position: "absolute",
        left: 190,
        top: 10,
        width: 1205,
        height: 655,
        overflow: "visible",
        pointerEvents: "none",
        opacity: 0.68,
        filter: "drop-shadow(0 0 9px rgba(232,200,109,0.16))",
        mixBlendMode: "screen",
      }}
    >
      <defs>
        <linearGradient id="profileConstellationStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(232,200,109,0.10)" />
          <stop offset="0.5" stopColor="rgba(232,200,109,0.62)" />
          <stop offset="1" stopColor="rgba(232,200,109,0.10)" />
        </linearGradient>

        <linearGradient id="profileConstellationSignal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="rgba(255,224,148,0)" />
          <stop offset="0.48" stopColor="rgba(255,224,148,0.96)" />
          <stop offset="0.56" stopColor="rgba(255,246,218,1)" />
          <stop offset="1" stopColor="rgba(255,224,148,0)" />
        </linearGradient>
      </defs>

      {paths.map((path, index) => (
        <g key={path}>
          <path
            d={path}
            fill="none"
            stroke="url(#profileConstellationStroke)"
            strokeWidth="1.15"
            strokeDasharray="2 10"
            style={{
              animation: `profileConstellationBreathe ${
                8 + index * 1.7
              }s ease-in-out ${index * -1.4}s infinite`,
            }}
          />

          <path
            d={path}
            fill="none"
            stroke="url(#profileConstellationSignal)"
            strokeWidth="1.8"
            strokeLinecap="round"
            pathLength="1"
            strokeDasharray="0.08 0.92"
            style={{
              opacity: 0,
              filter: "drop-shadow(0 0 5px rgba(255,224,148,0.68))",
              animation: `profileConstellationSignal ${
                13 + index * 2.2
              }s linear ${index * -3.1}s infinite`,
            }}
          />
        </g>
      ))}

      {nodes.map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r={index % 5 === 0 ? 2.5 : 2}
            fill="rgba(255,244,215,0.82)"
            style={{
              filter: "drop-shadow(0 0 4px rgba(244,211,133,0.82))",
            }}
          />
          <circle
            cx={cx}
            cy={cy}
            r={index % 5 === 0 ? 10 : 8}
            fill="none"
            stroke="rgba(232,200,109,0.30)"
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              animation: `profileConstellationNode ${
                4.2 + (index % 5) * 0.72
              }s ease-in-out ${index * 0.31}s infinite`,
            }}
          />
        </g>
      ))}
    </svg>
  );
}
