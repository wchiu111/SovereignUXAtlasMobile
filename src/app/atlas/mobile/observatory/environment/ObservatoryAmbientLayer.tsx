const stars = [
  [34,116,1.25,0.0],[68,94,0.9,1.4],[118,135,0.8,3.2],[152,83,1.1,2.2],
  [201,112,0.9,0.8],[242,76,0.8,4.1],[282,126,1.2,1.9],[334,102,0.9,3.5],
  [366,146,0.8,0.5],[46,225,0.8,2.8],[188,220,0.7,1.1],[274,206,0.9,4.7],
  [352,232,0.8,3.0],[22,474,0.9,2.0],[368,512,0.8,4.2],[66,636,0.7,1.7],
  [326,618,0.8,3.8],[96,178,0.65,4.9],[310,184,0.65,2.6],[143,254,0.75,0.9],
  [236,286,0.65,3.6],[74,356,0.65,1.8],[346,348,0.75,4.4],[210,408,0.65,2.1],
  [166,318,0.65,3.4],[297,320,0.75,1.2],[112,522,0.65,4.0],[274,540,0.75,2.4],
] as const;

export default function ObservatoryAmbientLayer({
  paused = false,
}: {
  paused?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes observatoryMobileStarBreathe {
          0%,100% { opacity:.18; transform:scale(.72); }
          44% { opacity:.94; transform:scale(1.28); }
          70% { opacity:.42; transform:scale(.94); }
        }

        @keyframes observatoryMobileFieldBreathe {
          0%,100% { opacity:.30; transform:scale(.98); }
          50% { opacity:.72; transform:scale(1.035); }
        }

        @keyframes observatoryMobileDustDrift {
          from { transform:translate3d(-4px,20px,0); opacity:.07; }
          50% { opacity:.22; }
          to { transform:translate3d(5px,-24px,0); opacity:.05; }
        }

        @keyframes observatoryMobileOrbitClockwise {
          from { transform:rotate(0deg); }
          to { transform:rotate(360deg); }
        }

        @keyframes observatoryMobileOrbitCounter {
          from { transform:rotate(0deg); }
          to { transform:rotate(-360deg); }
        }

        @keyframes observatoryMobileNebulaDriftA {
          0%,100% { transform:translate3d(-12px,0,0) scale(.98); opacity:.16; }
          50% { transform:translate3d(14px,-9px,0) scale(1.05); opacity:.38; }
        }

        @keyframes observatoryMobileNebulaDriftB {
          0%,100% { transform:translate3d(10px,8px,0) scale(1.02); opacity:.10; }
          50% { transform:translate3d(-18px,-6px,0) scale(.96); opacity:.30; }
        }

        @keyframes observatoryMobileFloorSweep {
          0%,100% { transform:translate3d(-50%,-50%,0) scale(.92); opacity:.08; }
          46% { transform:translate3d(-50%,-50%,0) scale(1.09); opacity:.32; }
          72% { opacity:.16; }
        }

        @keyframes observatoryMobileVerticalPulse {
          0%,100% { opacity:.04; transform:scaleY(.86); }
          50% { opacity:.28; transform:scaleY(1.06); }
        }

        @keyframes observatoryMobileMeteor {
          0%,74%,100% { opacity:0; transform:translate3d(-24px,16px,0); }
          79% { opacity:.52; }
          88% { opacity:.10; transform:translate3d(92px,-54px,0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .observatory-mobile-ambient-animated {
            animation:none !important;
          }
        }
      `}</style>

      {/* Upper-space breathing field. */}
      <div
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          left:195,
          top:174,
          width:350,
          height:286,
          transform:"translate(-50%, -50%)",
          borderRadius:"50%",
          background:
            "radial-gradient(circle, rgba(123,151,218,0.12), rgba(67,84,145,0.045) 45%, transparent 73%)",
          mixBlendMode:"screen",
          filter:"blur(5px)",
          animation:
            "observatoryMobileFieldBreathe 10.8s ease-in-out infinite",
          animationPlayState:paused?"paused":"running",
        }}
      />

      {/* Slow nebula/parallax layers — intentionally broader than dust speckles. */}
      <div
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          left:-62,
          top:118,
          width:320,
          height:260,
          borderRadius:"50%",
          background:
            "radial-gradient(ellipse, rgba(98,119,187,0.18), rgba(77,65,133,0.07) 48%, transparent 72%)",
          mixBlendMode:"screen",
          filter:"blur(34px)",
          animation:
            "observatoryMobileNebulaDriftA 18s ease-in-out -4.5s infinite",
          animationPlayState:paused?"paused":"running",
        }}
      />

      <div
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          right:-92,
          top:220,
          width:310,
          height:300,
          borderRadius:"50%",
          background:
            "radial-gradient(ellipse, rgba(111,93,177,0.16), rgba(64,92,149,0.06) 50%, transparent 74%)",
          mixBlendMode:"screen",
          filter:"blur(38px)",
          animation:
            "observatoryMobileNebulaDriftB 22s ease-in-out -8s infinite",
          animationPlayState:paused?"paused":"running",
        }}
      />

      {/* Slow moving observatory/orbital geometry. */}
      <svg
        viewBox="0 0 390 844"
        width="390"
        height="844"
        style={{
          position:"absolute",
          inset:0,
          overflow:"visible",
        }}
      >
        <g
          className="observatory-mobile-ambient-animated"
          style={{
            transformOrigin:"195px 151px",
            animation:
              "observatoryMobileOrbitClockwise 46s linear infinite",
            animationPlayState:paused?"paused":"running",
          }}
        >
          <ellipse
            cx="195"
            cy="151"
            rx="136"
            ry="63"
            fill="none"
            stroke="rgba(232,200,109,0.22)"
            strokeWidth="0.65"
            strokeDasharray="2 9"
          />
          <circle
            cx="325"
            cy="135"
            r="2.4"
            fill="rgba(232,200,109,0.78)"
            style={{ filter:"drop-shadow(0 0 4px rgba(232,200,109,.55))" }}
          />
        </g>

        <g
          className="observatory-mobile-ambient-animated"
          style={{
            transformOrigin:"195px 151px",
            animation:
              "observatoryMobileOrbitCounter 63s linear infinite",
            animationPlayState:paused?"paused":"running",
          }}
        >
          <ellipse
            cx="195"
            cy="151"
            rx="94"
            ry="44"
            fill="none"
            stroke="rgba(173,195,238,0.18)"
            strokeWidth="0.55"
            strokeDasharray="2 10"
          />
          <circle
            cx="110"
            cy="166"
            r="1.9"
            fill="rgba(194,211,243,0.72)"
            style={{ filter:"drop-shadow(0 0 4px rgba(176,196,232,.48))" }}
          />
        </g>
      </svg>

      {stars.map(([x,y,size,delay], index) => (
        <span
          key={`${x}-${y}`}
          className="observatory-mobile-ambient-animated"
          style={{
            position:"absolute",
            left:x,
            top:y,
            width:size,
            height:size,
            borderRadius:"50%",
            background:
              index%4===0
                ? "rgba(232,200,109,0.96)"
                : "rgba(226,234,250,0.88)",
            boxShadow:
              index%4===0
                ? "0 0 7px rgba(232,200,109,0.48)"
                : "0 0 6px rgba(176,196,232,0.40)",
            animation:`observatoryMobileStarBreathe ${
              4.2+(index%5)*0.62
            }s ease-in-out -${delay}s infinite`,
            animationPlayState:paused?"paused":"running",
          }}
        />
      ))}

      {/* Dust remains, but is now supporting motion rather than carrying it. */}
      <div
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          inset:"12% 6% 14%",
          opacity:.28,
          backgroundImage:
            "radial-gradient(circle, rgba(235,220,180,0.62) 0 0.75px, transparent 0.85px)",
          backgroundSize:"29px 35px",
          maskImage:
            "linear-gradient(180deg, rgba(0,0,0,0.92), rgba(0,0,0,0.18) 80%, transparent)",
          animation:
            "observatoryMobileDustDrift 14s linear infinite alternate",
          animationPlayState:paused?"paused":"running",
        }}
      />

      {/* Vertical light axis gives the central observatory aperture a living pulse. */}
      <span
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          left:"50%",
          top:214,
          width:1,
          height:410,
          transformOrigin:"50% 0%",
          background:
            "linear-gradient(180deg, transparent, rgba(181,201,241,0.26) 24%, rgba(232,200,109,0.24) 62%, transparent)",
          boxShadow:"0 0 10px rgba(164,188,235,0.16)",
          animation:
            "observatoryMobileVerticalPulse 8.4s ease-in-out -1.8s infinite",
          animationPlayState:paused?"paused":"running",
        }}
      />

      {/* A broad floor pulse makes the lower room visibly breathe. */}
      <span
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          left:"50%",
          top:584,
          width:250,
          height:74,
          borderRadius:"50%",
          border:"0.75px solid rgba(160,188,239,0.16)",
          boxShadow:
            "0 0 28px rgba(126,158,221,0.09), inset 0 0 24px rgba(232,200,109,0.035)",
          animation:
            "observatoryMobileFloorSweep 9.8s ease-in-out -3.1s infinite",
          animationPlayState:paused?"paused":"running",
        }}
      />

      <span
        className="observatory-mobile-ambient-animated"
        style={{
          position:"absolute",
          left:112,
          top:218,
          width:98,
          height:0.9,
          transform:"rotate(-27deg)",
          transformOrigin:"left center",
          background:
            "linear-gradient(90deg, transparent, rgba(220,230,251,0.70), transparent)",
          filter:"blur(0.15px)",
          animation:
            "observatoryMobileMeteor 12.5s ease-in-out -4.8s infinite",
          animationPlayState:paused?"paused":"running",
        }}
      />
    </div>
  );
}
