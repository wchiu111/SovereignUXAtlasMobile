import { T } from "../../components/mobileShared";
import { OBSERVATORY_CONTENT } from "../config/observatoryContent";

const AMBER = "#FFB14A";

function EraGlyph({ index }: { index: number }) {
  if (index === 1) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gridTemplateRows: "repeat(2,1fr)",
          gap: 5,
          height: "100%",
          padding: 16,
          boxSizing: "border-box",
        }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            style={{
              border: "0.5px solid rgba(255,177,74,0.24)",
              background:
                i === 0
                  ? "rgba(255,177,74,0.08)"
                  : "rgba(9,13,20,0.46)",
            }}
          />
        ))}
      </div>
    );
  }

  if (index === 2) {
    return (
      <svg
        viewBox="0 0 280 120"
        aria-hidden
        style={{ width: "100%", height: "100%" }}
      >
        <path
          d="M24 82 L74 38 L120 76 L171 30 L218 70 L258 42"
          fill="none"
          stroke="rgba(255,177,74,0.42)"
          strokeWidth="1"
        />
        {[24, 74, 120, 171, 218, 258].map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={[82, 38, 76, 30, 70, 42][i]}
            r={i === 2 ? 5 : 3}
            fill="rgba(255,177,74,0.86)"
          />
        ))}
      </svg>
    );
  }

  if (index === 4) {
    return (
      <div
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        {[74, 48, 24].map((size) => (
          <span
            key={size}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: size,
              height: size,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              border: "0.5px solid rgba(255,177,74,0.28)",
            }}
          />
        ))}
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 8,
            height: 8,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: AMBER,
            boxShadow: "0 0 15px rgba(255,177,74,0.52)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: "12%",
          right: "12%",
          top: "50%",
          height: 0.5,
          background:
            "linear-gradient(90deg, transparent, rgba(255,177,74,0.48), transparent)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: index === 0 ? "28%" : "40%",
          top: "50%",
          width: 58,
          height: 58,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "0.5px solid rgba(255,177,74,0.30)",
        }}
      />
    </div>
  );
}

export default function JourneySurface() {
  const eras = OBSERVATORY_CONTENT.journey.eras;

  return (
    <div
      style={{
        position: "relative",
        padding:
          "30px 22px calc(76px + env(safe-area-inset-bottom, 0px)) 32px",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 33,
          top: 38,
          bottom: 74,
          width: 0.5,
          background:
            "linear-gradient(180deg, rgba(255,177,74,0.54), rgba(255,177,74,0.12))",
        }}
      />

      {eras.map((era, index) => (
        <article
          key={era.year}
          style={{
            position: "relative",
            padding: "0 0 42px 28px",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: -4,
              top: 3,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: AMBER,
              boxShadow:
                "0 0 10px rgba(255,177,74,0.62), 0 0 22px rgba(255,177,74,0.22)",
            }}
          />

          <div
            style={{
              fontFamily: T.mono,
              fontSize: 8,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: AMBER,
              opacity: 0.82,
            }}
          >
            {era.year}
          </div>

          <h2
            style={{
              margin: "7px 0 0",
              fontFamily: T.serif,
              fontSize: 26,
              lineHeight: 1.08,
              fontWeight: 600,
              color: "#F0E9D8",
            }}
          >
            {era.title}
          </h2>

          <div
            style={{
              position: "relative",
              height: 116,
              marginTop: 16,
              overflow: "hidden",
              border: "0.5px solid rgba(255,177,74,0.25)",
              borderRadius: 3,
              background:
                "radial-gradient(circle at 50% 48%, rgba(255,177,74,0.10), transparent 46%), linear-gradient(145deg, rgba(12,13,17,0.95), rgba(4,8,13,0.98))",
            }}
          >
            <EraGlyph index={index} />
            <div
              style={{
                position: "absolute",
                left: 10,
                bottom: 9,
                fontFamily: T.mono,
                fontSize: 6.5,
                letterSpacing: "0.12em",
                color: AMBER,
                opacity: 0.58,
              }}
            >
              {era.imageLabel}
            </div>
          </div>

          <p
            style={{
              margin: "15px 0 0",
              fontFamily: T.serif,
              fontSize: 15,
              lineHeight: 1.62,
              color: T.body,
              opacity: 0.78,
            }}
          >
            {era.description}
          </p>
        </article>
      ))}
    </div>
  );
}
