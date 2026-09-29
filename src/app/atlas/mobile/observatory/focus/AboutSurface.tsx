import wilsonProfilePhoto from "@/imports/profile/wilson-chiu-profile.png";
import { T } from "../../components/mobileShared";
import { OBSERVATORY_CONTENT } from "../config/observatoryContent";

const BLUE = "#6AA7FF";

function ListItem({ children }: { children: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "8px minmax(0,1fr)",
        gap: 11,
        alignItems: "start",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 5,
          height: 5,
          marginTop: 7,
          transform: "rotate(45deg)",
          background: BLUE,
          boxShadow: "0 0 9px rgba(106,167,255,0.40)",
        }}
      />
      <span
        style={{
          fontFamily: T.serif,
          fontSize: 15,
          lineHeight: 1.5,
          color: T.body,
          opacity: 0.84,
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default function AboutSurface() {
  const content = OBSERVATORY_CONTENT.about;

  return (
    <div
      style={{
        padding:
          "32px 24px calc(72px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <section
        style={{
          display: "grid",
          justifyItems: "center",
          textAlign: "center",
          paddingBottom: 30,
          borderBottom: "0.5px solid rgba(106,167,255,0.18)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: 122,
            height: 122,
            display: "grid",
            placeItems: "center",
          }}
        >
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "0.75px solid rgba(106,167,255,0.22)",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              inset: 10,
              borderRadius: "50%",
              border: "0.5px dashed rgba(106,167,255,0.18)",
            }}
          />
          <img
            src={wilsonProfilePhoto}
            alt="Wilson Chiu"
            draggable={false}
            style={{
              width: 96,
              height: 96,
              objectFit: "cover",
              borderRadius: "50%",
              border: "0.75px solid rgba(106,167,255,0.58)",
            }}
          />
        </div>

        <div
          style={{
            marginTop: 20,
            fontFamily: T.mono,
            fontSize: 7.5,
            letterSpacing: "0.17em",
            textTransform: "uppercase",
            color: BLUE,
            opacity: 0.82,
          }}
        >
          {content.eyebrow}
        </div>

        <h2
          style={{
            margin: "12px 0 0",
            maxWidth: 330,
            fontFamily: T.serif,
            fontSize: 29,
            lineHeight: 1.08,
            fontWeight: 600,
            color: "#F0E9D8",
          }}
        >
          {content.headline}
        </h2>

        <p
          style={{
            margin: "18px 0 0",
            maxWidth: 330,
            fontFamily: T.serif,
            fontSize: 15,
            lineHeight: 1.62,
            color: T.body,
            opacity: 0.76,
          }}
        >
          {content.body}
        </p>

        <div
          style={{
            marginTop: 17,
            fontFamily: T.mono,
            fontSize: 7,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: BLUE,
            opacity: 0.54,
          }}
        >
          {content.location}
        </div>
      </section>

      <section style={{ paddingTop: 28 }}>
        <SectionHeader number="01" title="Principles" />

        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {content.principles.map((principle) => (
            <ListItem key={principle}>{principle}</ListItem>
          ))}
        </div>

        <div
          aria-hidden
          style={{
            position: "relative",
            height: 118,
            marginTop: 24,
          }}
        >
          {[84, 58, 32].map((size, index) => (
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
                border: `0.5px ${
                  index === 1 ? "dashed" : "solid"
                } rgba(106,167,255,${0.16 + index * 0.06})`,
              }}
            />
          ))}
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 7,
              height: 7,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: BLUE,
              boxShadow: "0 0 16px rgba(106,167,255,0.60)",
            }}
          />
        </div>
      </section>

      <section
        style={{
          marginTop: 10,
          paddingTop: 28,
          borderTop: "0.5px solid rgba(106,167,255,0.18)",
        }}
      >
        <SectionHeader number="02" title="Current focus" />

        <div style={{ display: "grid", gap: 14, marginTop: 18 }}>
          {content.focusAreas.map((area) => (
            <ListItem key={area}>{area}</ListItem>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
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
        gap: 9,
        alignItems: "baseline",
        fontFamily: T.mono,
        fontSize: 8,
        letterSpacing: "0.17em",
        textTransform: "uppercase",
        color: BLUE,
      }}
    >
      <span style={{ opacity: 0.50 }}>{number}</span>
      <span style={{ opacity: 0.88 }}>{title}</span>
    </div>
  );
}
