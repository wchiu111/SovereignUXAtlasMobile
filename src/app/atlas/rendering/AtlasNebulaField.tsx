import { useEffect, useState, type CSSProperties } from "react";

type HazeField = {
  id: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  blur: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
};

type DensityLobe = {
  id: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  blur: number;
  rotate: number;
};

type DustCavity = {
  id: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  opacity: number;
  blur: number;
  rotate: number;
};

type Filament = {
  id: string;
  cx: number;
  cy: number;
  width: number;
  height: number;
  color: string;
  opacity: number;
  blur: number;
  rotate: number;
  duration: number;
  delay: number;
};

const HAZE_FIELDS: HazeField[] = [
  // Frameworks — muted green/teal, broad and asymmetric.
  { id: "frameworks", cx: 19, cy: 42, width: 50, height: 58, color: "76, 118, 98", opacity: 0.12, blur: 96, driftX: 18, driftY: -12, duration: 96, delay: -18 },
  // Case Studies — cool blue-grey.
  { id: "case-studies", cx: 84, cy: 38, width: 46, height: 56, color: "88, 128, 151", opacity: 0.11, blur: 104, driftX: -14, driftY: 10, duration: 108, delay: -44 },
  // Experiments — restrained violet.
  { id: "experiments", cx: 52, cy: 76, width: 54, height: 42, color: "104, 82, 132", opacity: 0.11, blur: 112, driftX: 12, driftY: -8, duration: 118, delay: -61 },
  // Sovereign Design — warm nucleus haze, deliberately quiet.
  { id: "sovereign", cx: 50, cy: 48, width: 34, height: 34, color: "139, 113, 63", opacity: 0.07, blur: 124, driftX: -8, driftY: 6, duration: 126, delay: -30 },
  // Neutral atmospheric band to connect the scene into one field.
  { id: "neutral-band", cx: 49, cy: 48, width: 112, height: 22, color: "112, 115, 128", opacity: 0.05, blur: 86, driftX: 10, driftY: 4, duration: 134, delay: -76 },
];

const DENSITY_LOBES: DensityLobe[] = [
  { id: "f-1", cx: 10, cy: 39, width: 28, height: 22, color: "72, 120, 101", opacity: 0.11, blur: 64, rotate: -14 },
  { id: "f-2", cx: 24, cy: 48, width: 34, height: 18, color: "63, 101, 87", opacity: 0.09, blur: 70, rotate: 18 },
  { id: "f-3", cx: 31, cy: 33, width: 24, height: 28, color: "77, 96, 102", opacity: 0.07, blur: 72, rotate: 30 },
  { id: "c-1", cx: 77, cy: 31, width: 30, height: 20, color: "80, 118, 146", opacity: 0.10, blur: 66, rotate: 12 },
  { id: "c-2", cx: 90, cy: 44, width: 28, height: 28, color: "73, 105, 130", opacity: 0.08, blur: 74, rotate: -22 },
  { id: "c-3", cx: 80, cy: 52, width: 24, height: 18, color: "97, 110, 131", opacity: 0.06, blur: 70, rotate: 28 },
  { id: "e-1", cx: 39, cy: 74, width: 32, height: 18, color: "92, 70, 123", opacity: 0.10, blur: 68, rotate: -10 },
  { id: "e-2", cx: 58, cy: 82, width: 34, height: 20, color: "106, 84, 136", opacity: 0.09, blur: 72, rotate: 16 },
  { id: "e-3", cx: 67, cy: 70, width: 24, height: 24, color: "83, 76, 111", opacity: 0.06, blur: 76, rotate: -30 },
  { id: "s-1", cx: 47, cy: 47, width: 18, height: 12, color: "144, 116, 66", opacity: 0.07, blur: 58, rotate: 6 },
  { id: "s-2", cx: 54, cy: 51, width: 16, height: 14, color: "125, 103, 64", opacity: 0.05, blur: 62, rotate: -22 },
];

const DUST_CAVITIES: DustCavity[] = [
  { id: "void-west", cx: 28, cy: 43, width: 22, height: 28, opacity: 0.22, blur: 82, rotate: 18 },
  { id: "void-east", cx: 74, cy: 42, width: 20, height: 32, opacity: 0.20, blur: 88, rotate: -16 },
  { id: "void-south", cx: 51, cy: 70, width: 28, height: 16, opacity: 0.16, blur: 76, rotate: 4 },
  { id: "void-north", cx: 48, cy: 20, width: 34, height: 12, opacity: 0.12, blur: 74, rotate: -6 },
  { id: "void-center", cx: 50, cy: 48, width: 22, height: 22, opacity: 0.16, blur: 90, rotate: 0 },
];

const FILAMENTS: Filament[] = [
  { id: "filament-a", cx: 28, cy: 30, width: 66, height: 3.2, color: "126, 137, 146", opacity: 0.075, blur: 18, rotate: 24, duration: 122, delay: -28 },
  { id: "filament-b", cx: 61, cy: 62, width: 74, height: 3.8, color: "120, 107, 139", opacity: 0.07, blur: 21, rotate: -17, duration: 138, delay: -73 },
  { id: "filament-c", cx: 67, cy: 29, width: 52, height: 2.8, color: "110, 132, 141", opacity: 0.06, blur: 17, rotate: -34, duration: 148, delay: -52 },
  { id: "filament-d", cx: 38, cy: 70, width: 46, height: 2.6, color: "111, 130, 113", opacity: 0.055, blur: 16, rotate: 37, duration: 156, delay: -94 },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

export default function AtlasNebulaField() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ isolation: "isolate" }}
    >
      <style>{`
        @keyframes atlasNebulaDrift {
          0%, 100% { transform: translate3d(var(--base-x), var(--base-y), 0) scale(1); }
          50% { transform: translate3d(calc(var(--base-x) + var(--drift-x)), calc(var(--base-y) + var(--drift-y)), 0) scale(1.035); }
        }
        @keyframes atlasFilamentDrift {
          0%, 100% { transform: translate(-50%, -50%) rotate(var(--rotation)) translateX(-6px); opacity: var(--opacity); }
          50% { transform: translate(-50%, -50%) rotate(var(--rotation)) translateX(8px); opacity: var(--opacity); }
        }
      `}</style>

      {/* Broad atmospheric haze — the semantic color is environmental, never structural. */}
      <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 0.82 }}>
        {HAZE_FIELDS.map((field) => (
          <div
            key={field.id}
            className="absolute will-change-transform"
            style={{
              left: `${field.cx}%`,
              top: `${field.cy}%`,
              width: `${field.width}%`,
              height: `${field.height}%`,
              borderRadius: "50%",
              background: `radial-gradient(ellipse at 50% 50%, rgba(${field.color}, ${field.opacity}) 0%, rgba(${field.color}, ${field.opacity * 0.58}) 34%, rgba(${field.color}, ${field.opacity * 0.18}) 62%, transparent 78%)`,
              filter: `blur(${field.blur}px)`,
              transform: "translate(-50%, -50%)",
              animation: reducedMotion
                ? "none"
                : `atlasNebulaDrift ${field.duration}s ease-in-out ${field.delay}s infinite`,
              ["--base-x" as string]: "-50%",
              ["--base-y" as string]: "-50%",
              ["--drift-x" as string]: `${field.driftX}px`,
              ["--drift-y" as string]: `${field.driftY}px`,
            } as CSSProperties & Record<string, string>}
          />
        ))}
      </div>

      {/* Irregular gas density — overlapping lobes break the perfect radial-gradient silhouette. */}
      <div className="absolute inset-0" style={{ mixBlendMode: "screen", opacity: 0.78 }}>
        {DENSITY_LOBES.map((lobe) => (
          <div
            key={lobe.id}
            className="absolute"
            style={{
              left: `${lobe.cx}%`,
              top: `${lobe.cy}%`,
              width: `${lobe.width}%`,
              height: `${lobe.height}%`,
              borderRadius: "46% 54% 57% 43% / 58% 42% 56% 44%",
              transform: `translate(-50%, -50%) rotate(${lobe.rotate}deg)`,
              background: `radial-gradient(ellipse at 42% 52%, rgba(${lobe.color}, ${lobe.opacity}) 0%, rgba(${lobe.color}, ${lobe.opacity * 0.62}) 32%, rgba(${lobe.color}, ${lobe.opacity * 0.14}) 68%, transparent 82%)`,
              filter: `blur(${lobe.blur}px)`,
            }}
          />
        ))}
      </div>

      {/* Dark dust cavities — subtractive atmosphere that makes stars feel embedded. */}
      <div className="absolute inset-0" style={{ mixBlendMode: "multiply" }}>
        {DUST_CAVITIES.map((cavity) => (
          <div
            key={cavity.id}
            className="absolute"
            style={{
              left: `${cavity.cx}%`,
              top: `${cavity.cy}%`,
              width: `${cavity.width}%`,
              height: `${cavity.height}%`,
              borderRadius: "48% 52% 44% 56% / 60% 46% 54% 40%",
              transform: `translate(-50%, -50%) rotate(${cavity.rotate}deg)`,
              background: `radial-gradient(ellipse, rgba(1, 2, 6, ${cavity.opacity}) 0%, rgba(1, 2, 6, ${cavity.opacity * 0.64}) 44%, transparent 78%)`,
              filter: `blur(${cavity.blur}px)`,
            }}
          />
        ))}
      </div>

      {/* Fine dust filaments — thin, low-contrast strands that connect the field. */}
      <div className="absolute inset-0" style={{ mixBlendMode: "screen" }}>
        {FILAMENTS.map((filament) => (
          <div
            key={filament.id}
            className="absolute"
            style={{
              left: `${filament.cx}%`,
              top: `${filament.cy}%`,
              width: `${filament.width}%`,
              height: `${filament.height}%`,
              borderRadius: "999px",
              background: `linear-gradient(90deg, transparent 0%, rgba(${filament.color}, ${filament.opacity * 0.38}) 16%, rgba(${filament.color}, ${filament.opacity}) 46%, rgba(${filament.color}, ${filament.opacity * 0.52}) 72%, transparent 100%)`,
              filter: `blur(${filament.blur}px)`,
              transform: `translate(-50%, -50%) rotate(${filament.rotate}deg)`,
              opacity: filament.opacity,
              animation: reducedMotion
                ? "none"
                : `atlasFilamentDrift ${filament.duration}s ease-in-out ${filament.delay}s infinite`,
              ["--rotation" as string]: `${filament.rotate}deg`,
              ["--opacity" as string]: `${filament.opacity}`,
            } as CSSProperties & Record<string, string>}
          />
        ))}
      </div>

      {/* Extremely fine field texture. SVG turbulence keeps this procedural and asset-free. */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{ opacity: 0.12, mixBlendMode: "screen" }}
      >
        <defs>
          <filter id="atlas-nebula-noise" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="3"
              seed="17"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0.45 0 0 0 0.08  0 0.48 0 0 0.09  0 0 0.58 0 0.14  0 0 0 0.22 0"
            />
          </filter>
          <radialGradient id="atlas-noise-mask" cx="50%" cy="48%" r="76%">
            <stop offset="0%" stopColor="white" stopOpacity="0.72" />
            <stop offset="70%" stopColor="white" stopOpacity="0.38" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="atlas-noise-falloff">
            <rect width="100" height="100" fill="url(#atlas-noise-mask)" />
          </mask>
        </defs>
        <rect
          width="100"
          height="100"
          filter="url(#atlas-nebula-noise)"
          mask="url(#atlas-noise-falloff)"
        />
      </svg>

      {/* Edge restraint: atmosphere should disappear before it competes with UI. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, transparent 0%, transparent 54%, rgba(2,2,7,0.16) 78%, rgba(2,2,7,0.44) 100%)",
        }}
      />
    </div>
  );
}
