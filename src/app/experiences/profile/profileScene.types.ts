export interface ProfileStar {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  warmth: number;
  tier: "constant" | "living" | "hero";
}

export interface ProfileDustParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

export interface ProfileParallax {
  x: number;
  y: number;
}
