import type { Planet, StarNode, StarSystem } from "../types/atlas";
import { STAR_ORBIT_R } from "../data/atlasSystems";

const ATLAS_PERSPECTIVE = 1280;
const GRAVITATIONAL_BIAS = (27 * Math.PI) / 180;

export interface ProjectedOrbitPosition {
  x: number;
  y: number;
  scale: number;
  depth: number;
}

/**
 * Keeps each constellation near its authored position while applying a shallow,
 * deterministic elliptical drift oriented around the Sovereign Design nexus.
 *
 * The authored layout is derived from orbitPhase0. Time only affects the small
 * local drift, so constellations no longer circle the entire canvas.
 */
export function sysOrbitPos(
  sys: StarSystem,
  elapsed: number,
  nexX: number,
  nexY: number,
): ProjectedOrbitPosition {
  // Preserve the composition authored by the original orbital configuration.
  const authoredEllipseX = Math.cos(sys.orbitPhase0) * sys.orbitA;
  const authoredEllipseY = Math.sin(sys.orbitPhase0) * sys.orbitB;

  const cosRotation = Math.cos(sys.orbitRotation);
  const sinRotation = Math.sin(sys.orbitRotation);
  const authoredX = authoredEllipseX * cosRotation - authoredEllipseY * sinRotation;
  const authoredY = authoredEllipseX * sinRotation + authoredEllipseY * cosRotation;

  const authoredProjectedY = authoredY * Math.cos(sys.orbitTilt);
  const authoredDepth = sys.orbitDepth + authoredY * Math.sin(sys.orbitTilt);
  const authoredScale = ATLAS_PERSPECTIVE / (ATLAS_PERSPECTIVE - authoredDepth);

  const anchorX = nexX + sys.orbitOffsetX + authoredX * authoredScale;
  const anchorY = nexY + sys.orbitOffsetY + authoredProjectedY * authoredScale;

  // Orient the local ellipse relative to the nexus, then add the Sovereign 27° bias.
  const radialAngle = Math.atan2(anchorY - nexY, anchorX - nexX);
  const driftAngle = radialAngle + GRAVITATIONAL_BIAS + sys.driftAngleOffset;
  const driftPhase =
    sys.driftPhase +
    sys.driftDirection * (elapsed / sys.driftDurationMs) * Math.PI * 2;

  const localX = Math.cos(driftPhase) * sys.driftRadiusX;
  const localY = Math.sin(driftPhase) * sys.driftRadiusY;
  const driftX = localX * Math.cos(driftAngle) - localY * Math.sin(driftAngle);
  const driftY = localX * Math.sin(driftAngle) + localY * Math.cos(driftAngle);

  return {
    x: anchorX + driftX,
    y: anchorY + driftY,
    scale: authoredScale,
    depth: authoredDepth,
  };
}

export function systemOrbitPath(
  sys: StarSystem,
  nexX: number,
  nexY: number,
  steps = 160,
) {
  const points: string[] = [];

  for (let index = 0; index <= steps; index += 1) {
    const elapsed = (index / steps) * sys.driftDurationMs;
    const point = sysOrbitPos(sys, elapsed, nexX, nexY);
    points.push(`${index === 0 ? "M" : "L"}${point.x.toFixed(2)},${point.y.toFixed(2)}`);
  }

  return `${points.join(" ")} Z`;
}

export interface ProjectedPlanetPosition {
  x: number;
  y: number;
  scale: number;
  depth: number;
}

const LOCAL_PLANET_PERSPECTIVE = 720;
const LOCAL_ORBIT_TILT = 0.22;

export function planetLocalPos(planet: Planet, elapsed: number): ProjectedPlanetPosition {
  const phase = (planet.angle * Math.PI / 180) + elapsed * planet.orbitSpeed;
  const orbitX = Math.cos(phase) * planet.orbitR;
  const orbitY = Math.sin(phase) * planet.orbitR;

  const orbitalDepth = orbitY * Math.sin(LOCAL_ORBIT_TILT);
  const depth = planet.orbitPlane * 34 + orbitalDepth;
  const scale = LOCAL_PLANET_PERSPECTIVE / (LOCAL_PLANET_PERSPECTIVE - depth);

  return {
    x: planet.orbitOffsetX + orbitX * scale,
    y: planet.orbitOffsetY + orbitY * Math.cos(LOCAL_ORBIT_TILT) * scale,
    scale,
    depth,
  };
}

export function starLocalPos(star: StarNode) {
  const rad = star.angle * Math.PI / 180;
  return { x: Math.cos(rad) * STAR_ORBIT_R, y: Math.sin(rad) * STAR_ORBIT_R };
}
