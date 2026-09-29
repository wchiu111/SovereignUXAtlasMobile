import { useMemo, useState } from "react";
import {
  PROFILE_HOTSPOTS,
  ProfileEnvironment,
  ProfileFocusLayer,
  ProfileHotspot,
  ProfileStageProvider,
  type ProfileHotspotDefinition,
  type ProfileHotspotId,
} from "./profile";

interface ProfileExperienceProps {
  onReturnToAtlas: () => void;
}

export default function ProfileExperience({
  onReturnToAtlas,
}: ProfileExperienceProps) {
  const [hovered, setHovered] = useState<ProfileHotspotId | null>(null);
  const [focus, setFocus] = useState<ProfileHotspotId | null>(null);
  const [closingFocus, setClosingFocus] = useState(false);

  const activeHotspot = useMemo(
    () => PROFILE_HOTSPOTS.find((hotspot) => hotspot.id === focus) ?? null,
    [focus],
  );

  const hoveredHotspot = useMemo(
    () => PROFILE_HOTSPOTS.find((hotspot) => hotspot.id === hovered) ?? null,
    [hovered],
  );

  const handleSelect = (hotspot: ProfileHotspotDefinition) => {
    if (hotspot.id === "atlas") {
      onReturnToAtlas();
      return;
    }

    if (hotspot.id === "contact") {
      setClosingFocus(false);
      setFocus("contact");
      return;
    }

    setClosingFocus(false);
    setFocus(hotspot.id);
  };

  const closeFocus = () => {
    if (!focus || closingFocus) return;

    setClosingFocus(true);

    window.setTimeout(() => {
      setFocus(null);
      setClosingFocus(false);
    }, 720);
  };

  return (
    <main
      aria-label="Wilson Chiu profile observatory"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        background: "#040509",
        color: "#F4EBD0",
        isolation: "isolate",
      }}
    >
      <ProfileStageProvider
        focused={Boolean(activeHotspot)}
        focusPoint={activeHotspot}
        hovered={Boolean(hoveredHotspot)}
        hoverPoint={hoveredHotspot}
      >
        <ProfileEnvironment hovered={hovered}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 7,
              opacity: focus ? 0.34 : 1,
              pointerEvents: focus ? "none" : "auto",
              transition: "opacity 320ms ease",
            }}
          >
            {PROFILE_HOTSPOTS.map((hotspot) => (
              <ProfileHotspot
                key={hotspot.id}
                hotspot={hotspot}
                active={hovered === hotspot.id}
                subdued={Boolean(hovered && hovered !== hotspot.id)}
                onHover={setHovered}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </ProfileEnvironment>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "rgba(3,4,8,0.96)",
          animation: "profileWake 1900ms cubic-bezier(0.22,1,0.36,1) forwards",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "absolute",
          top: 24,
          left: 28,
          right: 28,
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          fontFamily: "'DM Mono', monospace",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          opacity: 0,
          animation: "profileChromeIn 700ms ease-out 1500ms forwards",
        }}
      >
        <div>
          <div style={{ fontSize: 10, color: "rgba(232,200,109,0.82)" }}>
            The Sovereign Atlas
          </div>
          <div style={{ marginTop: 5, fontSize: 8, color: "rgba(245,235,210,0.38)" }}>
            Profile environment · Online
          </div>
        </div>

      </header>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 25,
          zIndex: 6,
          transform: "translateX(-50%)",
          fontFamily: "'DM Mono', monospace",
          fontSize: 8,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(232,200,109,0.38)",
          opacity: focus ? 0 : 1,
          animation: "profileHintIn 850ms ease-out 2300ms forwards",
          transition: "opacity 240ms ease",
        }}
      >
        Explore the room
      </div>

      <ProfileFocusLayer
        focus={focus}
        hotspot={activeHotspot}
        closing={closingFocus}
        onClose={closeFocus}
      />
      </ProfileStageProvider>

      <style>{`
        @keyframes profileWake {
          0% { opacity: 1; }
          28% { opacity: 0.92; }
          100% { opacity: 0; }
        }

        @keyframes profileChromeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes profileHintIn {
          from { opacity: 0; transform: translate(-50%, 8px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }



        @keyframes profileUnifiedNodeIdle {
          0%, 100% { opacity: 0.72; transform: translate(-50%, -50%) scale(0.94); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }

        @keyframes profileUnifiedFieldBreathe {
          0%, 100% { opacity: 0.82; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.045); }
        }

        @keyframes profileAtlasOrbitRing {
          0%, 100% { opacity: 0.46; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 0.96; transform: translate(-50%, -50%) scale(1.045); }
        }

        @keyframes profileAtlasSatelliteOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes profileSharedRadarPulse {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.55); }
          28% { opacity: 0.95; }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }

        @keyframes profileRadarSweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes profileAboutOrbitBreathe {
          0%, 100% { opacity: 0.44; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
        }

        @keyframes profileAboutSatelliteOrbit {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes profileAboutNodePulse {
          0%, 100% { opacity: 0.52; transform: translateX(-50%) scale(0.78); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.28); }
        }

        @keyframes profilePhilosophyLineDraw {
          from { stroke-dashoffset: 1; opacity: 0; }
          to { stroke-dashoffset: 0; opacity: 1; }
        }

        @keyframes profilePhilosophyNodeReveal {
          from { opacity: 0; transform: scale(0.2); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes profilePhilosophyNodeBreathe {
          0%, 100% { opacity: 0.62; transform: scale(0.92); }
          50% { opacity: 1; transform: scale(1.18); }
        }

        @keyframes profilePhilosophyHalo {
          0%, 100% { opacity: 0.22; transform: scale(0.78); }
          50% { opacity: 0.72; transform: scale(1.16); }
        }

        @keyframes profileConstructionPoint {
          0%, 100% { opacity: 0.34; transform: scale(0.78); }
          50% { opacity: 1; transform: scale(1.34); }
        }

        @keyframes profileHumanBlueprintScan {
          0%, 100% { opacity: 0.18; transform: translate(-50%, -58px) scaleX(0.66); }
          50% { opacity: 0.94; transform: translate(-50%, 58px) scaleX(1); }
        }

        @keyframes profileHumanConstructionFrame {
          from { opacity: 0; transform: scaleY(0.36); transform-origin: center; }
          to { opacity: 0.72; transform: scaleY(1); }
        }

        @keyframes profileLibraryReadLine {
          0%, 100% { opacity: 0.18; transform: translate(-54px, -50%); }
          50% { opacity: 1; transform: translate(54px, -50%); }
        }

        @keyframes profileLibraryShelfScan {
          0%, 100% { opacity: 0.18; transform: translateX(-18px) scaleX(0.6); }
          50% { opacity: 1; transform: translateX(18px) scaleX(1); }
        }

        @keyframes profilePresenceBreath {
          0%, 100% { opacity: 0.72; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.045); }
        }
        @keyframes profileLibraryGlow {
          0%, 100% { opacity: 0.72; transform: translate(-50%, -50%) scale(0.97); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.04); }
        }
        @keyframes profileBookSequence {
          0%, 100% { opacity: 0.48; filter: brightness(0.9); transform: translateY(0); }
          48% { opacity: 1; filter: brightness(1.8); transform: translateY(-4px); }
        }
        @keyframes profilePresenceField {
          0%, 100% { opacity: 0.52; transform: scale(0.985); }
          50% { opacity: 0.94; transform: scale(1.025); }
        }
        @keyframes profilePresenceScan {
          0%, 100% { opacity: 0; transform: translateY(220px) scaleX(0.5); }
          28% { opacity: 0.92; }
          58% { opacity: 0.72; transform: translateY(0) scaleX(1); }
          82% { opacity: 0; transform: translateY(-160px) scaleX(0.7); }
        }
        @keyframes profileLibraryField {
          0%, 100% { opacity: 0.48; filter: brightness(0.92); }
          50% { opacity: 1; filter: brightness(1.35); }
        }

        @keyframes profileAboutPrinciplePulse {
          0%, 100% {
            opacity: 0.48;
            transform: rotate(45deg) scale(0.82);
            filter: brightness(0.82);
          }
          50% {
            opacity: 1;
            transform: rotate(45deg) scale(1.2);
            filter: brightness(1.7);
          }
        }

        @keyframes profileAboutHudAssemble {
          0% { opacity: 0; transform: translateY(18px) scale(0.94); clip-path: inset(48% 42% 48% 42%); }
          52% { opacity: 0.84; clip-path: inset(8% 4% 8% 4%); }
          100% { opacity: 1; transform: translateY(0) scale(1); clip-path: inset(0); }
        }

        @keyframes profilePhilosophyMapFlow {
          0%, 100% {
            opacity: 0.54;
            stroke-dashoffset: 0;
          }
          50% {
            opacity: 1;
            stroke-dashoffset: -24;
          }
        }

        @keyframes profilePhilosophyNodeTwinkle {
          0%, 100% {
            opacity: 0.38;
            transform: scale(0.82);
          }
          50% {
            opacity: 1;
            transform: scale(1.28);
          }
        }

        @keyframes profilePhilosophyBeliefPulse {
          0%, 100% {
            opacity: 0.44;
            transform: rotate(45deg) scale(0.82);
            filter: brightness(0.82);
          }
          50% {
            opacity: 1;
            transform: rotate(45deg) scale(1.18);
            filter: brightness(1.7);
          }
        }

        @keyframes profilePhilosophyStatementPulse {
          0%, 100% {
            opacity: 0.45;
            transform: translate(-50%,-50%) rotate(45deg) scale(0.84);
            filter: brightness(0.9);
          }
          50% {
            opacity: 1;
            transform: translate(-50%,-50%) rotate(45deg) scale(1.22);
            filter: brightness(1.8);
          }
        }

        @keyframes profilePhilosophyHudStack {
          0% { opacity: 0; transform: translateX(28px) scale(0.94); clip-path: inset(0 0 0 92%); }
          48% { opacity: 0.82; transform: translateX(8px) scale(0.985); clip-path: inset(0 0 0 12%); }
          100% { opacity: 1; transform: translateX(0) scale(1); clip-path: inset(0); }
        }

        @keyframes profileHotspotBloom {
          0%, 100% {
            opacity: 0.84;
            transform: translate(-50%, -50%) scale(0.96);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }

        @keyframes profileObjectIdleGlow {
          0%, 100% {
            opacity: 0.38;
            transform: scale(0.98);
          }
          50% {
            opacity: 0.62;
            transform: scale(1.025);
          }
        }

        @keyframes profileHotspotIdle {
          0%, 100% { opacity: 0.58; transform: translate(-50%, -50%) scale(0.94); }
          50% { opacity: 0.88; transform: translate(-50%, -50%) scale(1.04); }
        }

        @keyframes profileHotspotActive {
          0%, 100% { opacity: 0.72; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.06); }
        }

        @keyframes profileFocusVeilIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }


        @keyframes profileProjectionLineIn {
          from { transform: rotate(var(--projection-angle, 0deg)) scaleX(0); opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes profileProjectionEmitterIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes profileProjectionEmitterOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -50%) scale(0.55); }
        }

        @keyframes profileProjectionTargetIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.35); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }


        @keyframes profileArchiveHudUnfold {
          0% {
            opacity: 0;
            transform: translateY(28px) scaleX(0.82) scaleY(0.18);
            clip-path: inset(78% 16% 0 16%);
          }
          42% {
            opacity: 0.76;
            transform: translateY(10px) scaleX(0.96) scaleY(0.58);
            clip-path: inset(34% 4% 0 4%);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            clip-path: inset(0);
          }
        }

        @keyframes profileContactHudPowerOn {
          0% {
            opacity: 0;
            transform: translateX(16px) scaleX(0.04);
            filter: brightness(2.4);
          }
          28% {
            opacity: 0.92;
            transform: translateX(7px) scaleX(0.72);
            filter: brightness(1.8);
          }
          54% {
            opacity: 0.72;
            transform: translateX(2px) scaleX(1.015);
            filter: brightness(1.28);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scaleX(1);
            filter: brightness(1);
          }
        }

        @keyframes profileArchiveScan {
          from { transform: translateY(-15%); opacity: 0; }
          12% { opacity: 0.22; }
          88% { opacity: 0.22; }
          to { transform: translateY(1100%); opacity: 0; }
        }

        @keyframes profileRoomBreath {
          0%, 100% {
            opacity: 0.28;
            filter: brightness(0.99);
          }
          50% {
            opacity: 0.64;
            filter: brightness(1.025);
          }
        }

        @keyframes profileHudShellIn {
          from { opacity: 0; transform: translateY(28px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes profileHudShellCenteredIn {
          from { opacity: 0; transform: translateX(-50%) translateY(28px) scale(0.985); }
          to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }

        @keyframes profileHudCornerIn {
          from { opacity: 0; transform: scale(0.55); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes profileHudEdgeXIn {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }

        @keyframes profileHudEdgeYIn {
          from { opacity: 0; transform: scaleY(0); }
          to { opacity: 1; transform: scaleY(1); }
        }

        @keyframes profileHudGridIn {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes profileHudContentIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes profileHudScan {
          from { transform: translateY(-10%); }
          to { transform: translateY(1200%); }
        }

        @keyframes profileConstantStarDrift {
          0%, 100% {
            opacity: 0.48;
            transform: scale(0.94);
            filter: brightness(0.92);
          }
          50% {
            opacity: 0.78;
            transform: scale(1.05);
            filter: brightness(1.18);
          }
        }

        @keyframes profileLivingStarPulse {
          0%, 100% {
            opacity: 0.42;
            transform: scale(0.82);
            filter: brightness(0.82);
          }
          44% {
            opacity: 1;
            transform: scale(1.42);
            filter: brightness(1.9);
          }
          62% {
            opacity: 0.72;
            transform: scale(1.08);
            filter: brightness(1.3);
          }
        }

        @keyframes profileHeroStarFlare {
          0%, 72%, 100% {
            opacity: 0.62;
            transform: scale(0.9);
            filter: brightness(1);
          }
          78% {
            opacity: 1;
            transform: scale(1.22);
            filter: brightness(1.85);
          }
          81% {
            opacity: 1;
            transform: scale(1.7);
            filter: brightness(2.6);
          }
          86% {
            opacity: 0.78;
            transform: scale(1.05);
            filter: brightness(1.3);
          }
        }

        @keyframes profileConstellationBreathe {
          0%, 100% {
            opacity: 0.48;
            stroke-dashoffset: 0;
          }
          50% {
            opacity: 0.9;
            stroke-dashoffset: -24;
          }
        }

        @keyframes profileConstellationSignal {
          0%, 72% {
            opacity: 0;
            stroke-dashoffset: 1;
          }
          76% {
            opacity: 0.94;
          }
          92% {
            opacity: 0.8;
            stroke-dashoffset: -0.12;
          }
          100% {
            opacity: 0;
            stroke-dashoffset: -0.22;
          }
        }

        @keyframes profileConstellationNode {
          0%, 100% { opacity: 0.24; transform: scale(0.78); }
          50% { opacity: 1; transform: scale(1.42); }
        }

        @keyframes profileLightBreathe {
          0%, 100% { opacity: 0.58; transform: translate(-50%, -50%) scale(0.96); }
          50% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.05); }
        }

        @keyframes profileLampFlicker {
          0%, 45%, 47%, 71%, 73%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.98); }
          46% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.03); }
          46.35% { opacity: 0.52; transform: translate(-50%, -50%) scale(0.96); }
          46.8% { opacity: 0.84; transform: translate(-50%, -50%) scale(1.01); }
          72% { opacity: 0.61; transform: translate(-50%, -50%) scale(0.97); }
          72.35% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.035); }
        }

        @keyframes profileConsolePulse {
          0%, 100% { opacity: 0.32; filter: brightness(0.8); }
          50% { opacity: 0.62; filter: brightness(1.3); }
        }

        @keyframes profileDustDrift {
          from { transform: translate3d(0, 0, 0); opacity: 0; }
          12% { opacity: 1; }
          82% { opacity: 0.7; }
          to { transform: translate3d(var(--dust-x), var(--dust-y), 0); opacity: 0; }
        }

        @keyframes profileGlassBreath {
          0%, 100% { opacity: 0.42; transform: scale(0.99); }
          50% { opacity: 0.68; transform: scale(1.015); }
        }

        @keyframes profileScanDrift {
          from { background-position-y: 0; }
          to { background-position-y: 120px; }
        }


        @keyframes profileNotebookGlyphScan {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -8px) rotate(-5deg) scaleX(0.72); }
          50% { opacity: 1; transform: translate(-50%, 8px) rotate(-5deg) scaleX(1); }
        }

        @keyframes profileConsoleGlyphPulse {
          0% { opacity: 0.86; transform: translate(-50%, -50%) scale(0.68); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.18); }
        }

        @keyframes profileAtlasHalo {
          0%, 100% {
            opacity: 0.48;
            transform: translate(-50%, -50%) scale(0.96);
          }
          50% {
            opacity: 0.88;
            transform: translate(-50%, -50%) scale(1.045);
          }
        }

        @keyframes profileAtlasArc {
          from {
            opacity: 0.20;
            transform: translate(-50%, -50%) rotate(0deg);
          }
          50% {
            opacity: 0.42;
          }
          to {
            opacity: 0.20;
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes profileAtlasFieldWake {
          0%, 100% {
            opacity: 0.42;
            transform: scale(0.985);
          }
          50% {
            opacity: 0.82;
            transform: scale(1.02);
          }
        }


        @keyframes profileAtlasPathPulseA {
          0%, 14% {
            stroke-dashoffset: 1;
            opacity: 0;
          }
          34%, 66% {
            stroke-dashoffset: 0;
            opacity: 0.92;
          }
          86%, 100% {
            stroke-dashoffset: -1;
            opacity: 0;
          }
        }

        @keyframes profileAtlasPathPulseB {
          0%, 22% {
            stroke-dashoffset: 1;
            opacity: 0;
          }
          42%, 72% {
            stroke-dashoffset: 0;
            opacity: 0.82;
          }
          90%, 100% {
            stroke-dashoffset: -1;
            opacity: 0;
          }
        }

        @keyframes profileAtlasPathPulseC {
          0%, 30% {
            stroke-dashoffset: 1;
            opacity: 0;
          }
          50%, 78% {
            stroke-dashoffset: 0;
            opacity: 0.74;
          }
          94%, 100% {
            stroke-dashoffset: -1;
            opacity: 0;
          }
        }

        @keyframes profileAtlasNodeReveal {
          0%, 100% {
            opacity: 0.28;
            transform: translate(-50%, -50%) scale(0.76);
          }
          46% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.34);
          }
          68% {
            opacity: 0.62;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        @keyframes profileNotebookWarmth {
          0%, 100% { opacity: 0.55; transform: scale(0.98); }
          50% { opacity: 0.96; transform: scale(1.03); }
        }

        @keyframes profileNotebookScan {
          0%, 100% { opacity: 0.18; transform: translateX(-20%) scaleX(0.45); }
          50% { opacity: 0.9; transform: translateX(24%) scaleX(1); }
        }

        @keyframes profileConsoleWake {
          0%, 100% { opacity: 0.46; filter: brightness(0.88); }
          50% { opacity: 0.96; filter: brightness(1.35); }
        }

        @keyframes profileConsoleLed {
          0%, 100% { opacity: 0.28; transform: scale(0.78); }
          50% { opacity: 1; transform: scale(1.22); }
        }

        @keyframes profileConsoleSignal {
          0% { opacity: 0.72; transform: translate(-50%, -50%) scale(0.42); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.22); }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 1ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }

        @media (max-width: 900px) {
          [role="dialog"] section {
            left: 18px !important;
            right: 18px !important;
            width: auto !important;
            transform: none !important;
          }
        }

        @media (max-width: 720px) {
          header {
            top: 18px !important;
            left: 18px !important;
            right: 18px !important;
            align-items: flex-start !important;
          }

        }
      `}</style>
    </main>
  );
}