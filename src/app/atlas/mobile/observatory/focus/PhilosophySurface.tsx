import { T } from "../../components/mobileShared";
import { OBSERVATORY_CONTENT } from "../config/observatoryContent";

const VIOLET = "#A879FF";

function SectionTitle({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        fontFamily: T.mono,
        fontSize: 8,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: VIOLET,
      }}
    >
      <span style={{ opacity: 0.48 }}>{number}</span>
      <span style={{ opacity: 0.88 }}>{title}</span>
    </div>
  );
}

export default function PhilosophySurface() {
  const content = OBSERVATORY_CONTENT.philosophy;

  return (
    <div
      style={{
        padding:
          "30px 22px calc(76px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <section>
        <SectionTitle number="01" title="Design beliefs" />

        <div
          style={{
            position: "relative",
            display: "grid",
            gap: 0,
            marginTop: 20,
          }}
        >
          {content.beliefs.map((belief, index) => (
            <div
              key={belief}
              style={{
                display: "grid",
                gridTemplateColumns: "30px minmax(0,1fr)",
                alignItems: "start",
                gap: 10,
                padding: "13px 0",
                borderTop:
                  index === 0
                    ? "0.5px solid rgba(168,121,255,0.18)"
                    : "none",
                borderBottom:
                  "0.5px solid rgba(168,121,255,0.12)",
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: 24,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 11,
                    width: 6,
                    height: 6,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    background: VIOLET,
                    boxShadow:
                      "0 0 10px rgba(168,121,255,0.58)",
                  }}
                />
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 12,
                    top: 11,
                    width: 19,
                    height: 19,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    border:
                      "0.5px solid rgba(168,121,255,0.24)",
                  }}
                />
              </div>

              <div
                style={{
                  fontFamily: T.serif,
                  fontSize: 15,
                  lineHeight: 1.48,
                  color: T.body,
                  opacity: 0.84,
                }}
              >
                {belief}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: 34,
          paddingTop: 28,
          borderTop: "0.5px solid rgba(168,121,255,0.18)",
        }}
      >
        <SectionTitle number="02" title="Design model" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,minmax(0,1fr))",
            gap: 8,
            marginTop: 18,
          }}
        >
          {content.modelSteps.map((step, index) => (
            <div
              key={step}
              style={{
                minHeight: 54,
                padding: "11px 12px",
                border: "0.5px solid rgba(168,121,255,0.20)",
                background: "rgba(168,121,255,0.035)",
              }}
            >
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 6.5,
                  letterSpacing: "0.13em",
                  color: VIOLET,
                  opacity: 0.52,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  marginTop: 7,
                  fontFamily: T.serif,
                  fontSize: 15,
                  color: "#F0E9D8",
                  opacity: 0.88,
                }}
              >
                {step}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 14,
            textAlign: "center",
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.13em",
            color: VIOLET,
            opacity: 0.58,
          }}
        >
          {content.modelFooter}
        </div>
      </section>

      <section
        style={{
          marginTop: 34,
          paddingTop: 28,
          borderTop: "0.5px solid rgba(168,121,255,0.18)",
        }}
      >
        <SectionTitle number="03" title="Influences" />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {content.influences.map((influence) => (
            <span
              key={influence}
              style={{
                padding: "8px 9px",
                border: "0.5px solid rgba(168,121,255,0.22)",
                background: "rgba(168,121,255,0.035)",
                fontFamily: T.mono,
                fontSize: 6.75,
                letterSpacing: "0.10em",
                color: T.body,
                opacity: 0.72,
              }}
            >
              {influence.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: 34,
          paddingTop: 28,
          borderTop: "0.5px solid rgba(168,121,255,0.18)",
        }}
      >
        <SectionTitle number="04" title="Current exploration" />

        <div
          aria-hidden
          style={{
            position: "relative",
            height: 176,
            marginTop: 18,
          }}
        >
          {[68, 48, 28].map((size) => (
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
                border: "0.5px solid rgba(168,121,255,0.22)",
              }}
            />
          ))}
          {content.explorations.map((label, index) => {
            const angle = (index / content.explorations.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 34;
            const y = 50 + Math.sin(angle) * 36;
            return (
              <span
                key={label}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  maxWidth: 102,
                  fontFamily: T.mono,
                  fontSize: 6.25,
                  lineHeight: 1.25,
                  letterSpacing: "0.08em",
                  textAlign: "center",
                  color: T.body,
                  opacity: 0.68,
                }}
              >
                {label.toUpperCase()}
              </span>
            );
          })}
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 7,
              height: 7,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: VIOLET,
              boxShadow: "0 0 14px rgba(168,121,255,0.58)",
            }}
          />
        </div>

        <p
          style={{
            margin: "10px 0 0",
            fontFamily: T.serif,
            fontSize: 15,
            lineHeight: 1.62,
            color: T.body,
            opacity: 0.78,
          }}
        >
          {content.explorationBody}
        </p>
      </section>

      <blockquote
        style={{
          margin: "34px 0 0",
          padding: "18px 18px 18px 20px",
          border: "0.5px solid rgba(168,121,255,0.24)",
          borderLeft: "1.5px solid rgba(168,121,255,0.58)",
          background:
            "linear-gradient(90deg, rgba(168,121,255,0.05), transparent)",
          fontFamily: T.serif,
          fontSize: 17,
          lineHeight: 1.48,
          color: "#F0E9D8",
          opacity: 0.88,
        }}
      >
        “{content.closingStatement}”
      </blockquote>
    </div>
  );
}
