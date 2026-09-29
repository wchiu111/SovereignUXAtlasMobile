export { default as ProfileEnvironment } from "./ProfileEnvironment";
export { default as ProfileAmbientLights } from "./ProfileAmbientLights";
export { default as ProfileConstellationLayer } from "./ProfileConstellationLayer";
export { default as ProfileDustLayer } from "./ProfileDustLayer";
export { default as ProfileFocusLayer } from "./ProfileFocusLayer";
export { default as ProfileHotspot } from "./ProfileHotspot";
export { default as ProfileObjectReactions } from "./ProfileObjectReactions";
export { default as ProfileProjectionLine } from "./ProfileProjectionLine";
export { default as ProfileHudFrame } from "./ProfileHudFrame";
export { default as ProfileStarLayer } from "./ProfileStarLayer";
export { default as useProfileParallax } from "./useProfileParallax";
export { PROFILE_HOTSPOTS } from "./profileHotspots";
export type {
  ProfileHotspotDefinition,
  ProfileHotspotId,
  ProfileHotspotKind,
} from "./profileHotspots";
export type {
  ProfileDustParticle,
  ProfileParallax,
  ProfileStar,
} from "./profileScene.types";

export { ProfileStageProvider, useProfileStage } from "./useProfileStage";
export { PROFILE_STAGE, PROFILE_HUD_ANCHORS } from "./profileStage";
export type { ProfileStageMetrics, StagePoint } from "./profileStage";

export { getProfileHudAttachment, getProfileHudRect } from "./profileHudLayout";
export type { ProfileHudRect } from "./profileHudLayout";

export { default as ProfileAboutPanel } from "./ProfileAboutPanel";
export { default as ProfilePhilosophyPanel } from "./ProfilePhilosophyPanel";
export { default as ProfileTimelinePanel } from "./ProfileTimelinePanel";
export { default as ProfileContactPanel } from "./ProfileContactPanel";
