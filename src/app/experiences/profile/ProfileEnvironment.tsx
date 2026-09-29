import type { ReactNode } from "react";
import observatoryBackground from "@/assets/observatory-profile.png";
import ProfileAmbientLights from "./ProfileAmbientLights";
import ProfileConstellationLayer from "./ProfileConstellationLayer";
import ProfileDustLayer from "./ProfileDustLayer";
import ProfileStarLayer from "./ProfileStarLayer";
import ProfileObjectReactions from "./ProfileObjectReactions";
import type { ProfileHotspotId } from "./profileHotspots";
import { useProfileStage } from "./useProfileStage";

interface ProfileEnvironmentProps {
  hovered?: ProfileHotspotId | null;
  children?: ReactNode;
}

export default function ProfileEnvironment({
  hovered = null,
  children,
}: ProfileEnvironmentProps) {
  const { stageStyle } = useProfileStage();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
      }}
    >
      <div style={stageStyle}>
        <img
          src={observatoryBackground}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "fill",
            filter: "brightness(0.82) saturate(0.96) contrast(1.02)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(2,3,7,0.045), rgba(2,3,7,0.00) 44%, rgba(2,3,7,0.065) 100%)",
          }}
        />

        <ProfileConstellationLayer />
        <ProfileStarLayer />
        <ProfileAmbientLights />
        <ProfileDustLayer />
        <ProfileObjectReactions active={hovered} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(255,220,154,0.018), rgba(116,201,155,0.012))",
            mixBlendMode: "screen",
            animation: "profileRoomBreath 12s ease-in-out infinite",
          }}
        />


        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 730px 476px at 793px 367px, rgba(80,117,140,0.035), transparent 72%)",
            animation: "profileGlassBreath 16s ease-in-out infinite",
            mixBlendMode: "screen",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 790px 520px at 793px 417px, transparent 34%, rgba(2,3,7,0.10) 68%, rgba(2,3,7,0.48) 112%), linear-gradient(180deg, rgba(3,4,8,0.06), rgba(3,4,8,0.22))",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.055,
            backgroundImage:
              "repeating-linear-gradient(180deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 4px)",
            mixBlendMode: "soft-light",
            animation: "profileScanDrift 16s linear infinite",
          }}
        />

        {children}
      </div>
    </div>
  );
}
