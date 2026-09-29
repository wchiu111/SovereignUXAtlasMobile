export default function LandingSceneStyles() {
  return (
    <style>{`
        @keyframes atlasNodeBrightnessFromParent {
          0%, 100% {
            opacity: 0.50;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes atlasNodeBrightnessFromSibling {
          0%, 100% {
            opacity: 0.34;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes atlasProjectAtmosphereBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.56;
          }
          44% {
            transform: scale(1.10);
            opacity: 0.96;
          }
          72% {
            transform: scale(1.035);
            opacity: 0.72;
          }
        }

        @keyframes atlasProjectInnerBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.80;
          }
          50% {
            transform: scale(1.045);
            opacity: 1;
          }
          76% {
            transform: scale(1.014);
            opacity: 0.88;
          }
        }

        @keyframes atlasProjectCoreBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.96;
          }
          48% {
            transform: scale(1.018);
            opacity: 1;
          }
          74% {
            transform: scale(1.007);
            opacity: 0.985;
          }
        }

        @keyframes atlasCaseStudiesAtmosphereBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.50;
          }
          46% {
            transform: scale(1.045);
            opacity: 0.92;
          }
          72% {
            transform: scale(1.016);
            opacity: 0.66;
          }
        }

        @keyframes atlasCaseStudiesRingBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.74;
          }
          52% {
            transform: scale(1.020);
            opacity: 1;
          }
          78% {
            transform: scale(1.008);
            opacity: 0.86;
          }
        }

        @keyframes atlasCaseStudiesCoreBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.96;
          }
          50% {
            transform: scale(1.012);
            opacity: 1;
          }
          76% {
            transform: scale(1.004);
            opacity: 0.985;
          }
        }

        @keyframes atlasSelectionPulse {
          0% {
            transform: scale(1);
            opacity: 0.92;
          }
          38% {
            transform: scale(1.16);
            opacity: 1;
          }
          100% {
            transform: scale(1.04);
            opacity: 1;
          }
        }

        @keyframes atlasCoreBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.96;
          }
          50% {
            transform: scale(1.012);
            opacity: 1;
          }
        }

        /* ── Atlas landing: living constellation ───────────────────── */

        @keyframes atlasLandingSystemAtmosphereBreath {
          0%, 100% {
            transform: scale(0.96);
            filter: brightness(0.92);
          }
          44% {
            transform: scale(1.12);
            filter: brightness(1.24);
          }
          72% {
            transform: scale(1.035);
            filter: brightness(1.08);
          }
        }

        @keyframes atlasLandingSystemRingBreath {
          0%, 100% {
            transform: scale(0.98);
            filter: brightness(0.94);
          }
          50% {
            transform: scale(1.055);
            filter: brightness(1.22);
          }
          78% {
            transform: scale(1.015);
            filter: brightness(1.07);
          }
        }

        @keyframes atlasLandingSystemCoreBreath {
          0%, 100% {
            transform: scale(0.985);
            filter: brightness(0.94);
          }
          48% {
            transform: scale(1.055);
            filter: brightness(1.30);
          }
          76% {
            transform: scale(1.014);
            filter: brightness(1.08);
          }
        }

        @keyframes atlasLandingSatelliteDriftA {
          0%, 100% { transform: translate(0px, 0px); }
          35% { transform: translate(3.4px, -2.6px); }
          72% { transform: translate(-1.8px, 2.4px); }
        }

        @keyframes atlasLandingSatelliteDriftB {
          0%, 100% { transform: translate(0px, 0px); }
          38% { transform: translate(-3.0px, -1.8px); }
          74% { transform: translate(2.4px, 3.0px); }
        }

        @keyframes atlasLandingSatelliteDriftC {
          0%, 100% { transform: translate(0px, 0px); }
          42% { transform: translate(2.1px, 3.3px); }
          78% { transform: translate(-3.2px, -1.4px); }
        }

        @keyframes atlasLandingSatelliteDriftD {
          0%, 100% { transform: translate(0px, 0px); }
          33% { transform: translate(-2.2px, 2.6px); }
          70% { transform: translate(3.0px, -2.8px); }
        }

        @keyframes atlasLandingNexusFieldBreath {
          0%, 100% {
            transform: scale(0.93);
            opacity: 0.56;
          }
          48% {
            transform: scale(1.12);
            opacity: 1;
          }
          76% {
            transform: scale(1.035);
            opacity: 0.78;
          }
        }

        @keyframes atlasLandingNexusRingBreath {
          0%, 100% {
            transform: scale(0.98);
            filter: brightness(0.95);
          }
          52% {
            transform: scale(1.045);
            filter: brightness(1.20);
          }
        }

        @keyframes atlasLandingNexusCoreBreath {
          0%, 100% {
            transform: scale(0.985);
            filter: brightness(0.94);
          }
          50% {
            transform: scale(1.05);
            filter: brightness(1.28);
          }
          78% {
            transform: scale(1.014);
            filter: brightness(1.08);
          }
        }

        @keyframes atlasLandingOrbitFlow {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -88; }
        }

        .atlas-project-atmosphere,
        .atlas-project-inner,
        .atlas-project-core,
        .atlas-case-studies-atmosphere,
        .atlas-case-studies-rings,
        .atlas-case-studies-core,
        .atlas-selection-pulse,
        .atlas-parent-core-selected,
        .atlas-landing-system-atmosphere,
        .atlas-landing-system-rings,
        .atlas-landing-system-core,
        .atlas-landing-satellite-drift,
        .atlas-landing-nexus-field,
        .atlas-landing-nexus-rings,
        .atlas-landing-nexus-core {
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform, opacity, filter;
        }

        .atlas-project-atmosphere {
          animation-name: atlasProjectAtmosphereBreath;
          animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
          animation-iteration-count: infinite;
        }

        .atlas-project-inner {
          animation-name: atlasProjectInnerBreath;
          animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
          animation-iteration-count: infinite;
        }

        .atlas-project-core {
          animation-name: atlasProjectCoreBreath;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .atlas-case-studies-atmosphere {
          animation: atlasCaseStudiesAtmosphereBreath 8s cubic-bezier(0.37, 0, 0.63, 1) infinite;
        }

        .atlas-case-studies-rings {
          animation: atlasCaseStudiesRingBreath 7.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        .atlas-case-studies-core {
          animation: atlasCaseStudiesCoreBreath 8.6s ease-in-out infinite;
        }

        .atlas-selection-pulse {
          animation: atlasSelectionPulse 420ms cubic-bezier(0.22,1,0.36,1) both;
        }

        .atlas-parent-core-selected {
          animation: atlasCoreBreath 6.2s ease-in-out infinite;
        }

        .atlas-landing-system-atmosphere {
          animation-name: atlasLandingSystemAtmosphereBreath;
          animation-timing-function: cubic-bezier(0.37,0,0.63,1);
          animation-iteration-count: infinite;
        }

        .atlas-landing-system-rings {
          animation-name: atlasLandingSystemRingBreath;
          animation-timing-function: cubic-bezier(0.45,0,0.55,1);
          animation-iteration-count: infinite;
        }

        .atlas-landing-system-core {
          animation-name: atlasLandingSystemCoreBreath;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .atlas-landing-satellite-drift-a {
          animation-name: atlasLandingSatelliteDriftA;
        }

        .atlas-landing-satellite-drift-b {
          animation-name: atlasLandingSatelliteDriftB;
        }

        .atlas-landing-satellite-drift-c {
          animation-name: atlasLandingSatelliteDriftC;
        }

        .atlas-landing-satellite-drift-d {
          animation-name: atlasLandingSatelliteDriftD;
        }

        .atlas-landing-satellite-drift {
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .atlas-landing-nexus-field {
          animation: atlasLandingNexusFieldBreath 9.6s cubic-bezier(0.37,0,0.63,1) -3.2s infinite;
        }

        .atlas-landing-nexus-rings {
          animation: atlasLandingNexusRingBreath 8.8s cubic-bezier(0.45,0,0.55,1) -1.8s infinite;
        }

        .atlas-landing-nexus-core {
          animation: atlasLandingNexusCoreBreath 9.4s ease-in-out -4.1s infinite;
        }

        /*
         * Target the existing top-level Atlas relationship paths directly.
         * This keeps the pass replacement-only: LandingScene.tsx does not
         * need a patch or a wholesale replacement.
         */
        svg[aria-hidden] > path[stroke-dasharray="4.5 7"] {
          animation-name: atlasLandingOrbitFlow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-duration: 24s;
          will-change: stroke-dashoffset;
        }

        svg[aria-hidden] > path[stroke-dasharray="4.5 7"]:nth-of-type(1) {
          animation-duration: 20s;
          animation-delay: -6s;
        }

        svg[aria-hidden] > path[stroke-dasharray="4.5 7"]:nth-of-type(2) {
          animation-duration: 24s;
          animation-delay: -18s;
          animation-direction: reverse;
        }

        svg[aria-hidden] > path[stroke-dasharray="4.5 7"]:nth-of-type(3) {
          animation-duration: 30s;
          animation-delay: -11s;
        }

        .atlas-ambient-paused {
          animation-play-state: paused !important;
        }

        .atlas-node-brightness-parent {
          animation: atlasNodeBrightnessFromParent 4.2s ease-in-out infinite;
          will-change: opacity;
        }

        .atlas-node-brightness-sibling {
          animation: atlasNodeBrightnessFromSibling 4.2s ease-in-out infinite;
          will-change: opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .atlas-project-atmosphere,
          .atlas-project-inner,
          .atlas-project-core,
          .atlas-case-studies-atmosphere,
          .atlas-case-studies-rings,
          .atlas-case-studies-core,
          .atlas-selection-pulse,
          .atlas-parent-core-selected,
          .atlas-node-brightness-parent,
          .atlas-node-brightness-sibling,
          .atlas-landing-system-atmosphere,
          .atlas-landing-system-rings,
          .atlas-landing-system-core,
          .atlas-landing-satellite-drift,
          .atlas-landing-nexus-field,
          .atlas-landing-nexus-rings,
          .atlas-landing-nexus-core,
          svg[aria-hidden] > path[stroke-dasharray="4.5 7"] {
            animation: none !important;
            transform: none !important;
            filter: none !important;
          }
        }
`}</style>
  );
}
