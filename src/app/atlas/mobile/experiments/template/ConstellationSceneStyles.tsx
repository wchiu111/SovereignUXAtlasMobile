export default function ConstellationSceneStyles() {
  return (
    <style>{`
      @keyframes atlasTemplateNodeAtmosphereBreath {
        0%, 100% { transform: scale(1); opacity: 0.56; }
        44% { transform: scale(1.10); opacity: 0.96; }
        72% { transform: scale(1.035); opacity: 0.72; }
      }

      @keyframes atlasTemplateNodeInnerBreath {
        0%, 100% { transform: scale(1); opacity: 0.80; }
        50% { transform: scale(1.045); opacity: 1; }
        76% { transform: scale(1.014); opacity: 0.88; }
      }

      @keyframes atlasTemplateNodeCoreBreath {
        0%, 100% { transform: scale(1); opacity: 0.96; }
        48% { transform: scale(1.018); opacity: 1; }
        74% { transform: scale(1.007); opacity: 0.985; }
      }

      @keyframes atlasTemplateParentAtmosphereBreath {
        0%, 100% { transform: scale(1); opacity: 0.50; }
        46% { transform: scale(1.045); opacity: 0.92; }
        72% { transform: scale(1.016); opacity: 0.66; }
      }

      @keyframes atlasTemplateParentRingBreath {
        0%, 100% { transform: scale(1); opacity: 0.74; }
        52% { transform: scale(1.020); opacity: 1; }
        78% { transform: scale(1.008); opacity: 0.86; }
      }

      @keyframes atlasTemplateParentCoreBreath {
        0%, 100% { transform: scale(1); opacity: 0.96; }
        50% { transform: scale(1.012); opacity: 1; }
        76% { transform: scale(1.004); opacity: 0.985; }
      }

      @keyframes atlasTemplateSelectionPulse {
        0% { transform: scale(1); opacity: 0.92; }
        38% { transform: scale(1.16); opacity: 1; }
        100% { transform: scale(1.04); opacity: 1; }
      }

      .atlas-template-node-atmosphere,
      .atlas-template-node-inner,
      .atlas-template-node-core,
      .atlas-template-parent-atmosphere,
      .atlas-template-parent-rings,
      .atlas-template-parent-core,
      .atlas-template-selection-pulse {
        transform-box: fill-box;
        transform-origin: center;
        will-change: transform, opacity;
      }

      .atlas-template-node-atmosphere {
        animation-name: atlasTemplateNodeAtmosphereBreath;
        animation-timing-function: cubic-bezier(0.37,0,0.63,1);
        animation-iteration-count: infinite;
      }

      .atlas-template-node-inner {
        animation-name: atlasTemplateNodeInnerBreath;
        animation-timing-function: cubic-bezier(0.45,0,0.55,1);
        animation-iteration-count: infinite;
      }

      .atlas-template-node-core {
        animation-name: atlasTemplateNodeCoreBreath;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
      }

      .atlas-template-parent-atmosphere {
        animation: atlasTemplateParentAtmosphereBreath 8s cubic-bezier(0.37,0,0.63,1) infinite;
      }

      .atlas-template-parent-rings {
        animation: atlasTemplateParentRingBreath 7.2s cubic-bezier(0.45,0,0.55,1) infinite;
      }

      .atlas-template-parent-core {
        animation: atlasTemplateParentCoreBreath 8.6s ease-in-out infinite;
      }

      .atlas-template-selection-pulse {
        animation: atlasTemplateSelectionPulse 420ms cubic-bezier(0.22,1,0.36,1) both;
      }

      @media (prefers-reduced-motion: reduce) {
        .atlas-template-node-atmosphere,
        .atlas-template-node-inner,
        .atlas-template-node-core,
        .atlas-template-parent-atmosphere,
        .atlas-template-parent-rings,
        .atlas-template-parent-core,
        .atlas-template-selection-pulse {
          animation: none !important;
          transform: none !important;
        }
      }
    `}</style>
  );
}
