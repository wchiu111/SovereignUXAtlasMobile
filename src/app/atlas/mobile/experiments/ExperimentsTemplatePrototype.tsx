import { useLayoutEffect, useRef, useState } from "react";
import {
  H,
  T,
  W,
  useStarfield,
} from "../components/mobileShared";
import ExperimentsScene from "./ExperimentsScene";
import {
  DEFAULT_MOBILE_EXPERIMENT_ID,
} from "./config/experimentsContent";
import type { MobileExperimentId } from "./experimentsTypes";

export default function ExperimentsTemplatePrototype() {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const runtimeViewportRef = useRef<HTMLDivElement>(null);
  useStarfield(canvasRef);

  const [sceneScale, setSceneScale] = useState(1);
  const [viewportUiTarget, setViewportUiTarget] =
    useState<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<
    "overview" | "reading" | "exited"
  >("overview");
  const [activeExperimentId, setActiveExperimentId] =
    useState<MobileExperimentId>(
      DEFAULT_MOBILE_EXPERIMENT_ID,
    );
  const [returnExperimentId, setReturnExperimentId] =
    useState<MobileExperimentId | null>(null);

  useLayoutEffect(() => {
    const viewport = runtimeViewportRef.current;
    if (!viewport) return;

    const updateSceneScale = () => {
      const width = viewport.clientWidth;
      const height = viewport.clientHeight;
      if (width <= 0 || height <= 0) return;

      const maxPresentationScale = 430 / W;
      setSceneScale(
        Math.min(
          width / W,
          height / H,
          maxPresentationScale,
        ),
      );
    };

    updateSceneScale();
    window.addEventListener("resize", updateSceneScale);
    return () =>
      window.removeEventListener("resize", updateSceneScale);
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        width: "100%",
        background: T.bg,
        fontFamily: T.mono,
      }}
    >
      <div
        ref={runtimeViewportRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
          background: T.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            width: W,
            height: H,
            overflow: "hidden",
            background: "transparent",
            flexShrink: 0,
            transform: `scale(${sceneScale})`,
            transformOrigin: "center center",
          }}
        >
          {mode === "overview" && (
            <ExperimentsScene
              state="experiments-focus"
              activeExperimentId={activeExperimentId}
              returnExperimentId={returnExperimentId}
              viewportUiTarget={viewportUiTarget}
              onSelectExperiment={setActiveExperimentId}
              onExplore={(id) => {
                setActiveExperimentId(id);
                setReturnExperimentId(null);
                setMode("reading");
              }}
              onReturnExperimentComplete={() =>
                setReturnExperimentId(null)
              }
              onBack={() => setMode("exited")}
            />
          )}

          {mode === "exited" && (
            <button
              type="button"
              onClick={() => {
                setReturnExperimentId(null);
                setMode("overview");
              }}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: 230,
                minHeight: 54,
                border: `0.5px solid ${T.experiments}55`,
                background: "rgba(5,5,10,0.88)",
                color: T.experiments,
                fontFamily: T.mono,
                fontSize: 10,
                letterSpacing: "0.16em",
                cursor: "pointer",
              }}
            >
              ENTER EXPERIMENTS TEMPLATE →
            </button>
          )}
        </div>

        <div
          ref={(node) => setViewportUiTarget(node)}
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "min(100%, 430px)",
            transform: "translateX(-50%)",
            zIndex: 20,
            pointerEvents: "none",
            overflow: "hidden",
          }}
        />

        {mode === "reading" && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 30,
              overflow: "hidden",
              pointerEvents: "auto",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                left: "50%",
                width: "min(100%, 430px)",
                transform: "translateX(-50%)",
                overflow: "hidden",
              }}
            >
              <ExperimentsScene
                state="experiment-reading"
                activeExperimentId={activeExperimentId}
                onBack={() => {
                  setReturnExperimentId(activeExperimentId);
                  setMode("overview");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
