import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PROFILE_STAGE, type ProfileStageMetrics, type StagePoint } from "./profileStage";

interface ProfileStageContextValue extends ProfileStageMetrics {
  stageWidth: number;
  stageHeight: number;
  stageToScreen: (point: StagePoint) => StagePoint;
  screenToStage: (point: StagePoint) => StagePoint;
  stageStyle: React.CSSProperties;
}

const ProfileStageContext = createContext<ProfileStageContextValue | null>(null);

interface ProfileStageProviderProps {
  children: ReactNode;
  focused?: boolean;
  focusPoint?: StagePoint | null;
  hovered?: boolean;
  hoverPoint?: StagePoint | null;
}

export function ProfileStageProvider({
  children,
  focused = false,
  focusPoint = null,
  hovered = false,
  hoverPoint = null,
}: ProfileStageProviderProps) {
  const [viewport, setViewport] = useState(() => ({
    width: typeof window === "undefined" ? PROFILE_STAGE.width : window.innerWidth,
    height: typeof window === "undefined" ? PROFILE_STAGE.height : window.innerHeight,
  }));
  useEffect(() => {
    const update = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const value = useMemo<ProfileStageContextValue>(() => {
    const coverScale = Math.max(
      viewport.width / PROFILE_STAGE.width,
      viewport.height / PROFILE_STAGE.height,
    );

    const zoom = focused ? 1.055 : 1.025;
    const scale = coverScale * zoom;

    const baseOffsetX = (viewport.width - PROFILE_STAGE.width * scale) / 2;
    const baseOffsetY = (viewport.height - PROFILE_STAGE.height * scale) / 2;

    const target = focused ? focusPoint : null;
    const strength = focused ? 0.065 : 0;
    const targetShiftX = target
      ? (PROFILE_STAGE.width / 2 - target.x) * scale * strength
      : 0;
    const targetShiftY = target
      ? (PROFILE_STAGE.height / 2 - target.y) * scale * strength
      : 0;

    const offsetX = baseOffsetX + targetShiftX;
    const offsetY = baseOffsetY + targetShiftY;

    const stageToScreen = (point: StagePoint): StagePoint => ({
      x: offsetX + point.x * scale,
      y: offsetY + point.y * scale,
    });

    const screenToStage = (point: StagePoint): StagePoint => ({
      x: (point.x - offsetX) / scale,
      y: (point.y - offsetY) / scale,
    });

    return {
      viewportWidth: viewport.width,
      viewportHeight: viewport.height,
      stageWidth: PROFILE_STAGE.width,
      stageHeight: PROFILE_STAGE.height,
      scale,
      offsetX,
      offsetY,
      stageToScreen,
      screenToStage,
      stageStyle: {
        position: "absolute",
        left: 0,
        top: 0,
        width: PROFILE_STAGE.width,
        height: PROFILE_STAGE.height,
        transformOrigin: "0 0",
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale})`,
        transition:
          "transform 720ms cubic-bezier(0.22,1,0.36,1)",
        willChange: "transform",
      },
    };
  }, [
    focusPoint,
    focused,
    hoverPoint,
    hovered,
    viewport.height,
    viewport.width,
  ]);

  return (
    <ProfileStageContext.Provider value={value}>
      {children}
    </ProfileStageContext.Provider>
  );
}

export function useProfileStage() {
  const context = useContext(ProfileStageContext);

  if (!context) {
    throw new Error("useProfileStage must be used inside ProfileStageProvider");
  }

  return context;
}
