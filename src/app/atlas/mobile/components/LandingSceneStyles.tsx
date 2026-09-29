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

        @keyframes atlasParentCoreAvailableBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.32;
          }
          50% {
            transform: scale(1.026);
            opacity: 0.74;
          }
        }

        @keyframes atlasAvailableHaloBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.92;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }

        @keyframes atlasAvailableCoreBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.96;
          }
          50% {
            transform: scale(1.018);
            opacity: 1;
          }
        }

        @keyframes atlasSelectedHaloBreath {
          0%, 100% {
            transform: scale(1);
            opacity: 0.90;
          }
          50% {
            transform: scale(1.035);
            opacity: 1;
          }
        }

        @keyframes atlasSelectedCoreBreath {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.010);
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

        .atlas-halo-available,
        .atlas-halo-selected,
        .atlas-core-available,
        .atlas-core-selected,
        .atlas-selection-pulse,
        .atlas-parent-core-selected {
          transform-box: fill-box;
          transform-origin: center;
          will-change: transform, opacity;
        }

        .atlas-halo-available {
          animation: atlasAvailableHaloBreath 4.2s ease-in-out infinite;
        }

        .atlas-core-available {
          animation: atlasAvailableCoreBreath 4.2s ease-in-out infinite;
        }

        .atlas-halo-selected {
          animation: atlasSelectedHaloBreath 5.8s ease-in-out infinite;
        }

        .atlas-core-selected {
          animation: atlasSelectedCoreBreath 5.8s ease-in-out infinite;
        }

        .atlas-selection-pulse {
          animation: atlasSelectionPulse 420ms cubic-bezier(0.22,1,0.36,1) both;
        }

        .atlas-parent-core-selected {
          animation: atlasCoreBreath 6.2s ease-in-out infinite;
        }

        .atlas-parent-core-available {
          transform-box: fill-box;
          transform-origin: center;
          animation: atlasParentCoreAvailableBreath 5.2s ease-in-out infinite;
          will-change: transform, opacity;
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
          .atlas-halo-available,
          .atlas-halo-selected,
          .atlas-core-available,
          .atlas-core-selected,
          .atlas-selection-pulse,
          .atlas-parent-core-selected,
          .atlas-parent-core-available,
          .atlas-node-brightness-parent,
          .atlas-node-brightness-sibling {
            animation: none !important;
            transform: none !important;
          }
        }
`}
    </style>
  );
}
