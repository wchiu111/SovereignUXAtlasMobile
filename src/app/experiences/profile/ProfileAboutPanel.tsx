import type { CSSProperties, ReactNode } from "react";
import wilsonProfilePhoto from "../../../imports/profile/wilson-chiu-profile.png";
import AboutFocusRadar from "./AboutFocusRadar";
import AboutPrinciplesGraph from "./AboutPrinciplesGraph";

const BLUE = "#6AA7FF";

const principles = [
  "Clarity over complexity",
  "Systems before screens",
  "Understand before designing",
  "Evidence over opinion",
  "AI augments judgment",
];

const focusAreas = [
  "AI-native interfaces",
  "Human–AI collaboration",
  "Design integrity",
  "Knowledge systems",
  "Interaction architecture",
];

export default function ProfileAboutPanel() {
  return (
    <div
      style={{
        display: "grid",
        gap: 30,
        minHeight: "100%",
        padding: "34px 36px 44px",
        boxSizing: "border-box",
      }}
    >
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "180px minmax(0, 1fr)",
          alignItems: "center",
          gap: 34,
          paddingBottom: 30,
          borderBottom: "1px solid rgba(106,167,255,0.18)",
        }}
      >
        <BlueprintPortrait />

        <div style={{ maxWidth: 640 }}>
          <div style={eyebrowStyle}>Product designer · Design engineer</div>
          <h3
            style={{
              margin: "12px 0 0",
              fontFamily: "'EB Garamond', serif",
              fontSize: 38,
              lineHeight: 1.04,
              fontWeight: 500,
              color: "rgba(247,242,229,0.98)",
            }}
          >
            I design systems that help people make better decisions alongside AI.
          </h3>
          <p
            style={{
              margin: "18px 0 0",
              maxWidth: 590,
              fontFamily: "'EB Garamond', serif",
              fontSize: 18,
              lineHeight: 1.55,
              color: "rgba(235,242,255,0.7)",
            }}
          >
            My work moves between product design, interaction architecture,
            systems thinking, and implementation. The goal is not simply to make
            an interface clearer, but to make the behavior around it more
            understandable and trustworthy.
          </p>
          <div
            style={{
              marginTop: 18,
              fontFamily: "'DM Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(106,167,255,0.64)",
            }}
          >
            San Francisco Bay Area
          </div>
        </div>
      </section>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.9fr)",
          gap: 38,
        }}
      >
        <QuietBlock index="01" title="Principles">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(210px, 0.72fr)",
              alignItems: "center",
              gap: 22,
            }}
          >
            <div style={{ display: "grid", gap: 15 }}>
              {principles.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </div>
            <AboutPrinciplesGraph />
          </div>
        </QuietBlock>

        <QuietBlock index="02" title="Current focus">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(190px, 0.8fr)",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ display: "grid", gap: 13 }}>
              {focusAreas.map((item) => (
                <ListItem key={item}>{item}</ListItem>
              ))}
            </div>
            <AboutFocusRadar />
          </div>
        </QuietBlock>
      </div>
    </div>
  );
}

function BlueprintPortrait() {
  return (
    <div
      style={{
        position: "relative",
        width: 170,
        height: 170,
        display: "grid",
        placeItems: "center",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 3,
          borderRadius: "50%",
          border: "1px solid rgba(106,167,255,0.24)",
        }}
      />
      <div
        style={{
          position: "relative",
          width: 138,
          height: 138,
          borderRadius: "50%",
          overflow: "hidden",
          border: "1px solid rgba(106,167,255,0.62)",
        }}
      >
        <img
          src={wilsonProfilePhoto}
          alt="Wilson Chiu"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            userSelect: "none",
          }}
        />
      </div>
    </div>
  );
}

function QuietBlock({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      style={{
        minHeight: 0,
        paddingTop: 20,
        borderTop: "1px solid rgba(106,167,255,0.18)",
      }}
    >
      <h3 style={sectionStyle}>
        <span style={{ opacity: 0.64 }}>{index}</span>
        <span>{title}</span>
      </h3>
      {children}
    </section>
  );
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "10px minmax(0, 1fr)",
        alignItems: "center",
        gap: 11,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          transform: "rotate(45deg)",
          background: BLUE,
          boxShadow: "0 0 10px rgba(106,167,255,0.42)",
        }}
      />
      <span style={bodyStyle}>{children}</span>
    </div>
  );
}

const eyebrowStyle: CSSProperties = {
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(106,167,255,0.82)",
};

const sectionStyle: CSSProperties = {
  display: "flex",
  gap: 10,
  margin: "0 0 22px",
  fontFamily: "'DM Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(106,167,255,0.84)",
};

const bodyStyle: CSSProperties = {
  fontFamily: "'EB Garamond', serif",
  fontSize: 16,
  lineHeight: 1.4,
  color: "rgba(235,242,255,0.78)",
};
