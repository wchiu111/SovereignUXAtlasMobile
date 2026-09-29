import { useRef } from "react";

import { T, ANIM } from "../../components/mobileShared";
import { CASE_STUDY_FOCUS_ITEMS } from "../caseStudyData";

export default function CaseStudyProjectFocus({
  activeIndex,
  onSelect,
  onSwipe,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  onSwipe: (direction: -1 | 1) => void;
}) {
  const dragStartX = useRef<number | null>(null);
  const active = CASE_STUDY_FOCUS_ITEMS[activeIndex];
  const len = CASE_STUDY_FOCUS_ITEMS.length;

  function handlePointerDown(event: React.PointerEvent<SVGGElement>) {
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerUp(event: React.PointerEvent<SVGGElement>) {
    if (dragStartX.current == null) return;
    const dx = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(dx) < 28) return;
    onSwipe(dx < 0 ? 1 : -1);
  }

  const previous = CASE_STUDY_FOCUS_ITEMS[(activeIndex - 1 + len) % len];
  const next = CASE_STUDY_FOCUS_ITEMS[(activeIndex + 1) % len];

  return (
    <g
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ touchAction: "pan-y" }}
    >
      <text
        x={195}
        y={118}
        textAnchor="middle"
        fontFamily={T.mono}
        fontSize={10.5}
        letterSpacing="0.15em"
        fill={active.color}
        opacity={0.98}
      >
        {active.label}
      </text>

      {[
        { item: previous, x: -2, offset: -1 },
        { item: active, x: 195, offset: 0 },
        { item: next, x: 392, offset: 1 },
      ].map(({ item, x, offset }) => {
        const isActive = offset === 0;
        return (
          <g
            key={`${item.id}-${offset}`}
            style={{
              transform: `translate(${x}px,250px)`,
              transition: ANIM,
              cursor: "pointer",
            }}
            onClick={() => {
              if (isActive) {
                if (activeIndex > 0) onSelect(activeIndex);
                return;
              }
              onSwipe(offset < 0 ? -1 : 1);
            }}
          >
            <circle
              r={isActive ? 72 : 32}
              fill={item.color}
              opacity={isActive ? 0.11 : 0.05}
            />
            <circle
              r={isActive ? 45 : 18}
              fill={item.color}
              opacity={isActive ? 0.22 : 0.12}
            />
            <circle
              r={isActive ? 54 : 22}
              fill="none"
              stroke={item.color}
              strokeWidth={0.55}
              strokeDasharray={isActive ? "3 6" : undefined}
              opacity={isActive ? 0.34 : 0.22}
            />
            <circle
              r={isActive ? 15 : 7}
              fill={item.color}
              opacity={isActive ? 1 : 0.9}
            />
            {!isActive && (
              <text
                x={offset < 0 ? 18 : -18}
                y={3}
                textAnchor={offset < 0 ? "start" : "end"}
                fontFamily={T.mono}
                fontSize={8}
                letterSpacing="0.08em"
                fill={item.color}
                opacity={0.78}
              >
                {item.label}
              </text>
            )}
            <circle r={isActive ? 34 : 30} fill="transparent" pointerEvents="all" />
          </g>
        );
      })}

      <g transform="translate(195,352)">
        {CASE_STUDY_FOCUS_ITEMS.map((item, i) => (
          <circle
            key={item.id}
            cx={(i - 2) * 14}
            cy={0}
            r={i === activeIndex ? 3.2 : 2.5}
            fill={T.caseStudies}
            opacity={i === activeIndex ? 0.95 : 0.34}
          />
        ))}
      </g>
    </g>
  );
}
