import type { ProfileHotspotId } from "./profileHotspots";
import type { StagePoint } from "./profileStage";

export interface ProfileHudRect {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const fitToViewport = (
  preferredWidth: number,
  preferredHeight: number,
  viewportWidth: number,
  viewportHeight: number,
  horizontalMargin: number,
  topMargin: number,
  bottomMargin: number,
) => ({
  width: Math.min(preferredWidth, viewportWidth - horizontalMargin * 2),
  height: Math.min(
    preferredHeight,
    viewportHeight - topMargin - bottomMargin,
  ),
});

export function getProfileHudRect(
  id: ProfileHotspotId,
  viewportWidth: number,
  viewportHeight: number,
): ProfileHudRect {
  const mobile = viewportWidth < 900;
  const compactHeight = viewportHeight < 760;

  if (id === "timeline") {
  const horizontalMargin = mobile ? 18 : 42;
  const topMargin = mobile ? 70 : 76;
  const bottomMargin = mobile ? 22 : 34;

  const { width, height } = fitToViewport(
    1340,
    860,
    viewportWidth,
    viewportHeight,
    horizontalMargin,
    topMargin,
    bottomMargin,
  );

  const left = mobile
    ? horizontalMargin
    : clamp(
        viewportWidth * 0.035,
        horizontalMargin,
        viewportWidth - width - horizontalMargin,
      );

  const top = topMargin;

  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}

  if (id === "about") {
    const horizontalMargin = mobile ? 18 : 42;
    const topMargin = mobile ? 70 : 76;
    const bottomMargin = mobile ? 22 : 34;

    const { width, height } = fitToViewport(
      1340,
      860,
      viewportWidth,
      viewportHeight,
      horizontalMargin,
      topMargin,
      bottomMargin,
    );

    const left = mobile
      ? horizontalMargin
      : clamp(
          viewportWidth * 0.035,
          horizontalMargin,
          viewportWidth - width - horizontalMargin,
        );
    const top = topMargin;

    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
    };
  }

  if (id === "philosophy") {
    const horizontalMargin = mobile ? 18 : 42;
    const topMargin = mobile ? 70 : 76;
    const bottomMargin = mobile ? 22 : 34;

    const { width, height } = fitToViewport(
      1220,
      860,
      viewportWidth,
      viewportHeight,
      horizontalMargin,
      topMargin,
      bottomMargin,
    );

    const left = mobile
      ? horizontalMargin
      : viewportWidth - width - horizontalMargin;
    const top = topMargin;

    return {
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
    };
  }

  const horizontalMargin = mobile ? 18 : 44;
  const topMargin = mobile ? 70 : 76;
  const bottomMargin = mobile ? 22 : 34;

  const { width, height } = fitToViewport(
    1080,
    820,
    viewportWidth,
    viewportHeight,
    horizontalMargin,
    topMargin,
    bottomMargin,
  );

  const left = mobile
    ? horizontalMargin
    : viewportWidth - width - horizontalMargin;
  const top = Math.max(topMargin, viewportHeight - bottomMargin - height);

  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
  };
}


export function isPointInsideHud(
  point: StagePoint,
  rect: ProfileHudRect,
  inset = 0,
) {
  return (
    point.x >= rect.left + inset &&
    point.x <= rect.right - inset &&
    point.y >= rect.top + inset &&
    point.y <= rect.bottom - inset
  );
}

export function getNearestHudEdgePoint(
  rect: ProfileHudRect,
  point: StagePoint,
  inset = 18,
): StagePoint {
  const candidates = [
    {
      x: rect.left,
      y: clamp(point.y, rect.top + inset, rect.bottom - inset),
    },
    {
      x: rect.right,
      y: clamp(point.y, rect.top + inset, rect.bottom - inset),
    },
    {
      x: clamp(point.x, rect.left + inset, rect.right - inset),
      y: rect.top,
    },
    {
      x: clamp(point.x, rect.left + inset, rect.right - inset),
      y: rect.bottom,
    },
  ];

  return candidates.reduce((nearest, candidate) => {
    const nearestDistance =
      (nearest.x - point.x) ** 2 + (nearest.y - point.y) ** 2;
    const candidateDistance =
      (candidate.x - point.x) ** 2 + (candidate.y - point.y) ** 2;

    return candidateDistance < nearestDistance ? candidate : nearest;
  });
}

export function getProfileHudAttachment(
  id: ProfileHotspotId,
  rect: ProfileHudRect,
  origin: StagePoint,
): StagePoint {
  if (id === "timeline") {
    return {
      x: clamp(origin.x, rect.left + 42, rect.right - 42),
      y: rect.bottom,
    };
  }

  return {
    x: rect.left,
    y: clamp(origin.y, rect.top + 58, rect.bottom - 58),
  };
}
