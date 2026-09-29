import { useMemo } from "react";
import type { ProfileDustParticle } from "./profileScene.types";

export default function ProfileDustLayer() {
  const particles = useMemo<ProfileDustParticle[]>(() => {
    return Array.from({ length: 24 }, (_, index) => ({
      id: index,
      x: 4 + Math.random() * 92,
      y: 28 + Math.random() * 68,
      size: 0.7 + Math.random() * 1.7,
      opacity: 0.035 + Math.random() * 0.12,
      duration: 22000 + Math.random() * 32000,
      delay: Math.random() * -30000,
      driftX: 18 + Math.random() * 48,
      driftY: -(34 + Math.random() * 70),
    }));
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            position: "absolute",
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `rgba(245,222,178,${particle.opacity})`,
            boxShadow: `0 0 ${particle.size * 4}px rgba(245,222,178,${particle.opacity * 0.72})`,
            animation: `profileDustDrift ${particle.duration}ms linear ${particle.delay}ms infinite`,
            ['--dust-x' as string]: `${particle.driftX}px`,
            ['--dust-y' as string]: `${particle.driftY}px`,
          }}
        />
      ))}
    </div>
  );
}