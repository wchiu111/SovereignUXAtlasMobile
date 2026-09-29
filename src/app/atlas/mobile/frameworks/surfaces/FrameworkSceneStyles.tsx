export default function FrameworkSceneStyles() {
  return (
    <style>{`
      @keyframes frameworkNodeAtmosphereBreath {
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

      @keyframes frameworkNodeInnerBreath {
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

      @keyframes frameworkNodeCoreBreath {
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

      @keyframes frameworkParentAtmosphereBreath {
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

      @keyframes frameworkParentRingBreath {
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

      @keyframes frameworkParentCoreBreath {
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

      @keyframes frameworkSelectionPulse {
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

      .framework-node-atmosphere,
      .framework-node-inner,
      .framework-node-core,
      .framework-parent-atmosphere,
      .framework-parent-rings,
      .framework-parent-core,
      .framework-selection-pulse {
        transform-box: fill-box;
        transform-origin: center;
        will-change: transform, opacity;
      }

      .framework-node-atmosphere {
        animation-name: frameworkNodeAtmosphereBreath;
        animation-timing-function: cubic-bezier(0.37, 0, 0.63, 1);
        animation-iteration-count: infinite;
      }

      .framework-node-inner {
        animation-name: frameworkNodeInnerBreath;
        animation-timing-function: cubic-bezier(0.45, 0, 0.55, 1);
        animation-iteration-count: infinite;
      }

      .framework-node-core {
        animation-name: frameworkNodeCoreBreath;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }

      .framework-parent-atmosphere {
        animation: frameworkParentAtmosphereBreath 8s cubic-bezier(0.37, 0, 0.63, 1) infinite;
      }

      .framework-parent-rings {
        animation: frameworkParentRingBreath 7.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
      }

      .framework-parent-core {
        animation: frameworkParentCoreBreath 8.6s ease-in-out infinite;
      }

      .framework-selection-pulse {
        animation: frameworkSelectionPulse 420ms cubic-bezier(0.22,1,0.36,1) both;
      }

      .framework-ambient-paused {
        animation-play-state: paused !important;
      }

      @media (prefers-reduced-motion: reduce) {
        .framework-node-atmosphere,
        .framework-node-inner,
        .framework-node-core,
        .framework-parent-atmosphere,
        .framework-parent-rings,
        .framework-parent-core,
        .framework-selection-pulse {
          animation: none !important;
          transform: none !important;
          opacity: 1;
        }
      }
    `}</style>
  );
}
