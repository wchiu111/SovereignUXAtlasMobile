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

        .atlas-project-atmosphere,
        .atlas-project-inner,
        .atlas-project-core,
        .atlas-case-studies-atmosphere,
        .atlas-case-studies-rings,
        .atlas-case-studies-core,
        .atlas-selection-pulse,
        .atlas-parent-core-selected {
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform, opacity;
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
          .atlas-node-brightness-sibling {
            animation: none !important;
            transform: none !important;
          }
        }
`}</style>
  );
}
