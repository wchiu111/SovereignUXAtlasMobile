import { useMemo } from "react";
import type { ProfileStar } from "./profileScene.types";

const STAR_COUNT = 78;

export default function ProfileStarLayer() {
  const stars = useMemo<ProfileStar[]>(() => {
    return Array.from({ length: STAR_COUNT }, (_, index) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random());
      const centerX = 50;
      const centerY = 36;
      const rx = 37;
      const ry = 35;

      const hero = index % 13 === 0;
      const living = !hero && index % 3 === 0;
      const tier: ProfileStar["tier"] = hero
        ? "hero"
        : living
          ? "living"
          : "constant";

      return {
        id: index,
        x: centerX + Math.cos(angle) * radius * rx,
        y: centerY + Math.sin(angle) * radius * ry,
        size: hero
          ? 2.8 + Math.random() * 2.2
          : living
            ? 1.25 + Math.random() * 1.45
            : 0.7 + Math.random() * 1.05,
        opacity: hero
          ? 0.82 + Math.random() * 0.16
          : living
            ? 0.56 + Math.random() * 0.28
            : 0.4 + Math.random() * 0.22,
        duration: hero
          ? 9200 + Math.random() * 6200
          : living
            ? 3200 + Math.random() * 5200
            : 6200 + Math.random() * 6400,
        delay: Math.random() * 6200,
        warmth: Math.random(),
        tier,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "screen",
        maskImage:
          "radial-gradient(ellipse 43% 49% at 50% 36%, #000 0 80%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 43% 49% at 50% 36%, #000 0 80%, transparent 100%)",
      }}
    >
      {stars.map((star) => {
        const color =
          star.warmth > 0.78
            ? "244,204,116"
            : star.warmth < 0.12
              ? "190,220,255"
              : "242,244,255";

        const animation =
          star.tier === "hero"
            ? "profileHeroStarFlare"
            : star.tier === "living"
              ? "profileLivingStarPulse"
              : "profileConstantStarDrift";

        const glowMultiplier =
          star.tier === "hero" ? 11 : star.tier === "living" ? 8 : 5;

        return (
          <span
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background: `rgba(${color},${star.opacity})`,
              boxShadow:
                star.tier === "hero"
                  ? `0 0 ${star.size * 5}px rgba(${color},0.98),
                     0 0 ${star.size * 12}px rgba(${color},0.62),
                     0 0 ${star.size * 24}px rgba(${color},0.20)`
                  : `0 0 ${star.size * glowMultiplier}px rgba(${color},${Math.min(
                      star.opacity * 0.82,
                      0.82,
                    )})`,
              animation: `${animation} ${star.duration}ms ease-in-out ${star.delay}ms infinite`,
              willChange: "opacity, transform, filter",
            }}
          />
        );
      })}
    </div>
  );
}
