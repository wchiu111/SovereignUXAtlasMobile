import { useEffect, useRef, useState } from "react";
import type { ProfileParallax } from "./profileScene.types";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function useProfileParallax(maxX = 4, maxY = 3) {
  const [parallax, setParallax] = useState<ProfileParallax>({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<ProfileParallax>({ x: 0, y: 0 });
  const currentRef = useRef<ProfileParallax>({ x: 0, y: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY);
    if (reducedMotion.matches) return;

    const animate = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const next = {
        x: current.x + (target.x - current.x) * 0.055,
        y: current.y + (target.y - current.y) * 0.055,
      };

      currentRef.current = next;
      setParallax(next);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;
      targetRef.current = {
        x: normalizedX * maxX * 2,
        y: normalizedY * maxY * 2,
      };
    };

    const handlePointerLeave = () => {
      targetRef.current = { x: 0, y: 0 };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [maxX, maxY]);

  return parallax;
}
