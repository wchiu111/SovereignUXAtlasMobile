import { useEffect, useRef } from "react";
import { SYSTEMS, SYSTEM_MAP } from "../../data/atlasSystems";
import { planetLocalPos, sysOrbitPos } from "../../utils/atlasGeometry";
import { STAR_RGB_ARR, type Particle } from "../../utils/atlasParticles";
import type { ViewLevel } from "../../types/atlas";

export const SYSTEM_FOCUS_SCALE: Record<string, number> = {
  frameworks: 2,
  "case-studies": 1.95,
  experiments: 1.55,
};

type CameraState = {
  scale: number;
  tx: number;
  ty: number;
};

interface UseAtlasAnimationArgs {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  zoomableRef: React.RefObject<HTMLDivElement | null>;
  particlesRef: React.MutableRefObject<Particle[]>;
  dimsRef: React.MutableRefObject<{ w: number; h: number }>;
  levelRef: React.MutableRefObject<ViewLevel>;
  activeSystemRef: React.MutableRefObject<string | null>;
  activePlanetRef: React.MutableRefObject<string | null>;
  isFollowingRef: React.MutableRefObject<boolean>;
  cameraRef: React.MutableRefObject<CameraState>;
  active?: boolean;
}

export function useAtlasAnimation({
  canvasRef,
  zoomableRef,
  particlesRef,
  dimsRef,
  levelRef,
  activeSystemRef,
  activePlanetRef,
  isFollowingRef,
  cameraRef,
  active = true,
}: UseAtlasAnimationArgs) {
  const systemGroupRefs = useRef<Map<string, SVGGElement>>(new Map());
  const planetGroupRefs = useRef<Map<string, SVGGElement>>(new Map());
  const outerGlowRefs = useRef<Map<string, SVGCircleElement>>(new Map());
  const planetLineRefs = useRef<Map<string, SVGLineElement>>(new Map());
  const rafRef = useRef<number>(0);
  const elapsedRef = useRef(0);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      elapsedRef.current = elapsed;
      const { w, h } = dimsRef.current;
      const nexusX = w * 0.5;
      const nexusY = h * 0.48;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particlesRef.current) {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x += canvas.width;
        if (particle.x > canvas.width) particle.x -= canvas.width;
        if (particle.y < 0) particle.y += canvas.height;
        if (particle.y > canvas.height) particle.y -= canvas.height;

        const breathe =
          Math.sin(elapsed * particle.speed + particle.phase) *
          (0.035 + particle.depth * 0.045);

        const opacity = Math.max(
          0.012,
          Math.min(0.72, particle.baseOp + breathe),
        );

        const [r, g, b] = STAR_RGB_ARR[particle.ci];

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
        ctx.fill();

        if (particle.size > 1.35) {
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            particle.size * 4.3,
          );
          gradient.addColorStop(
            0,
            `rgba(${r},${g},${b},${opacity * 0.18})`,
          );
          gradient.addColorStop(1, "rgba(0,0,0,0)");

          ctx.beginPath();
          ctx.arc(
            particle.x,
            particle.y,
            particle.size * 4.3,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }

      SYSTEMS.forEach((system) => {
        const systemPosition = sysOrbitPos(system, elapsed, nexusX, nexusY);
        const systemElement = systemGroupRefs.current.get(system.id);

        if (systemElement) {
          systemElement.setAttribute(
            "transform",
            `translate(${systemPosition.x},${systemPosition.y}) scale(${systemPosition.scale})`,
          );
        }

        const pulse =
          0.5 + 0.5 * Math.sin(elapsed * system.pulseSpeed + system.pulsePhase);

        const outerGlow = outerGlowRefs.current.get(system.id);
        if (outerGlow) {
          outerGlow.setAttribute("opacity", String(0.022 + pulse * 0.038));
        }

        system.planets.forEach((planet) => {
          const planetPosition = planetLocalPos(planet, elapsed);
          const planetElement = planetGroupRefs.current.get(planet.id);

          if (planetElement) {
            planetElement.setAttribute(
              "transform",
              `translate(${planetPosition.x},${planetPosition.y}) scale(${planetPosition.scale})`,
            );
          }

          const planetLine = planetLineRefs.current.get(planet.id);
          if (planetLine) {
            planetLine.setAttribute("x2", String(planetPosition.x));
            planetLine.setAttribute("y2", String(planetPosition.y));
          }
        });
      });

      if (isFollowingRef.current && zoomableRef.current) {
        const systemId = activeSystemRef.current;
        const planetId = activePlanetRef.current;
        const currentLevel = levelRef.current;

        if (systemId && currentLevel >= 1) {
          const system = SYSTEM_MAP[systemId];
          const systemPosition = sysOrbitPos(system, elapsed, nexusX, nexusY);

          let targetScale: number | null = null;
          let targetTx: number | null = null;
          let targetTy: number | null = null;

          if (currentLevel === 2 && planetId) {
            const planet = system.planets.find(item => item.id === planetId);

            if (planet) {
              const planetPosition = planetLocalPos(planet, elapsed);
              const worldX =
                systemPosition.x + planetPosition.x * systemPosition.scale;
              const worldY =
                systemPosition.y + planetPosition.y * systemPosition.scale;

              targetScale = 5.5;
              targetTx = w / 2 - worldX * targetScale;
              targetTy = h / 2 - worldY * targetScale;
            }
          } else if (currentLevel === 1) {
            targetScale = SYSTEM_FOCUS_SCALE[systemId] ?? 1.3;
            targetTx = w / 2 - systemPosition.x * targetScale;
            targetTy = h / 2 - systemPosition.y * targetScale;
          }

          if (
            targetScale !== null &&
            targetTx !== null &&
            targetTy !== null
          ) {
            const current = cameraRef.current;
            const followEase = 0.075;
            const nextScale =
              current.scale + (targetScale - current.scale) * followEase;
            const nextTx = current.tx + (targetTx - current.tx) * followEase;
            const nextTy = current.ty + (targetTy - current.ty) * followEase;

            cameraRef.current = {
              scale: nextScale,
              tx: nextTx,
              ty: nextTy,
            };

            zoomableRef.current.style.transition = "none";
            zoomableRef.current.style.transform =
              `translate(${nextTx}px,${nextTy}px) scale(${nextScale})`;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [
    activePlanetRef,
    activeSystemRef,
    canvasRef,
    dimsRef,
    isFollowingRef,
    cameraRef,
    levelRef,
    particlesRef,
    zoomableRef,
    active,
  ]);

  return {
    systemGroupRefs,
    planetGroupRefs,
    outerGlowRefs,
    planetLineRefs,
    elapsedRef,
  };
}
