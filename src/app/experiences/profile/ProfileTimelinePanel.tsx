import {
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

type VisualKind =
  | "exploration"
  | "oracle"
  | "globality"
  | "consulting"
  | "sovereign";

interface TimelineEra {
  year: string;
  title: string;
  description: string;
  imageLabel: string;
  visual: VisualKind;
}

const timeline: TimelineEra[] = [
  {
    year: "2014",
    title: "Early Exploration",
    description:
      "Design foundations, education technology, and early product thinking. Curiosity led the way as I explored problems worth solving and the impact design could make.",
    imageLabel: "FOUNDATIONS / EARLY SYSTEMS",
    visual: "exploration",
  },
  {
    year: "2015–2019",
    title: "Oracle",
    description:
      "Interactive systems, design platforms, and scalable visual language. I helped shape enterprise experiences and built systems that improved consistency across teams.",
    imageLabel: "ENTERPRISE INTERACTION SYSTEMS",
    visual: "oracle",
  },
  {
    year: "2019–2023",
    title: "Globality",
    description:
      "Enterprise AI, procurement workflows, and product design at scale. The work centered on human–AI collaboration, decision support, and clarity inside complex systems.",
    imageLabel: "AI PROCUREMENT NETWORK",
    visual: "globality",
  },
  {
    year: "2023–2024",
    title: "Consulting",
    description:
      "Helping organizations clarify complex product and AI problems. This period sharpened my ability to move between strategy, systems, interaction, and implementation.",
    imageLabel: "STRATEGY / SYSTEM MAPPING",
    visual: "consulting",
  },
  {
    year: "2024–Now",
    title: "Sovereign Design",
    description:
      "Building frameworks for human–AI collaboration and future systems. The focus is design integrity, human agency, explainability, and new interaction architectures.",
    imageLabel: "SOVEREIGN SYSTEMS",
    visual: "sovereign",
  },
];

export default function ProfileTimelinePanel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    moved: false,
  });
  const [dragging, setDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const scroller = scrollerRef.current;
    if (!scroller) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
      moved: false,
    };

    scroller.setPointerCapture(event.pointerId);
    setDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || dragRef.current.pointerId !== event.pointerId) return;

    const delta = event.clientX - dragRef.current.startX;
    if (Math.abs(delta) > 3) {
      dragRef.current.moved = true;
      setHasDragged(true);
    }

    scroller.scrollLeft = dragRef.current.startScrollLeft - delta;
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    if (!scroller || dragRef.current.pointerId !== event.pointerId) return;

    if (scroller.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    dragRef.current.pointerId = -1;
    setDragging(false);
  };

  const preventDragClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragRef.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    dragRef.current.moved = false;
  };

  return (
    <div style={{ position: "relative", minHeight: "100%" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 28,
          top: 18,
          zIndex: 3,
          fontFamily: "'DM Mono', monospace",
          fontSize: 9,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(232,200,109,0.48)",
          opacity: hasDragged ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: "none",
        }}
      >
        Drag to travel
      </div>
    <div
      ref={scrollerRef}
      role="region"
      aria-label="Career journey timeline. Drag horizontally or use the scrollbar to explore."
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={() => setDragging(false)}
      onClickCapture={preventDragClick}
      style={{
        overflowX: "auto",
        overflowY: "visible",
        overscrollBehaviorX: "contain",
        scrollSnapType: dragging ? "none" : "x proximity",
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(232,200,109,0.38) transparent",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: dragging ? "none" : "auto",
        WebkitUserSelect: dragging ? "none" : "auto",
        touchAction: "pan-y",
      }}
    >
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: "minmax(340px, 1fr)",
          minWidth: "max-content",
          padding: "46px 28px 42px",
        }}
      >
        {timeline.map((era, index) => (
          <article
            key={era.year}
            style={{
              position: "relative",
              minWidth: 340,
              scrollSnapAlign: "start",
              padding: "26px 20px 22px",
              opacity: index === 2 ? 1 : 0.72,
              transition: "opacity 280ms ease",
              borderLeft:
                index === 0
                  ? "none"
                  : "1px solid rgba(232,200,109,0.16)",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: index === 0 ? 19 : -5,
                top: 0,
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "#E8C86D",
                boxShadow:
                  "0 0 16px rgba(232,200,109,0.76), 0 0 36px rgba(232,200,109,0.28)",
              }}
            />

            <ArchiveVisual era={era} />
            <div style={yearStyle}>{era.year}</div>
            <h3 style={titleStyle}>{era.title}</h3>
            <p style={descriptionStyle}>{era.description}</p>
          </article>
        ))}
      </div>
    </div>
    </div>
  );
}

function ArchiveVisual({ era }: { era: TimelineEra }) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 9",
        overflow: "hidden",
        border: "1px solid rgba(232,200,109,0.32)",
        background: getVisualBackground(era.visual),
        boxShadow:
          "inset 0 0 34px rgba(0,0,0,0.62), 0 0 22px rgba(232,200,109,0.06)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(232,200,109,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(232,200,109,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.55,
        }}
      />

      <VisualGlyph visual={era.visual} />

      <div
        style={{
          position: "absolute",
          left: 12,
          right: 12,
          bottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 8,
            letterSpacing: "0.14em",
            color: "rgba(232,200,109,0.72)",
          }}
        >
          {era.imageLabel}
        </span>

        <span
          aria-hidden="true"
          style={{
            width: 42,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(232,200,109,0.8), transparent)",
          }}
        />
      </div>
    </div>
  );
}

function VisualGlyph({ visual }: { visual: VisualKind }) {
  if (visual === "oracle") {
    return (
      <div
        style={{
          position: "absolute",
          inset: "18% 9% 22%",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: 8,
        }}
      >
        {Array.from({ length: 6 }).map((_, index) => (
          <span
            key={index}
            style={{
              border: "1px solid rgba(232,200,109,0.22)",
              background:
                index === 0
                  ? "rgba(232,200,109,0.08)"
                  : "rgba(8,12,18,0.42)",
            }}
          />
        ))}
      </div>
    );
  }

  if (visual === "globality") {
    const points = [
      [38, 108],
      [92, 54],
      [142, 112],
      [198, 44],
      [254, 98],
      [288, 52],
    ];

    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 320 180"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {points.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            {index < points.length - 1 && (
              <line
                x1={x}
                y1={y}
                x2={points[index + 1][0]}
                y2={points[index + 1][1]}
                stroke="rgba(232,200,109,0.38)"
                strokeWidth="1"
              />
            )}
            <circle
              cx={x}
              cy={y}
              r={index === 2 ? 7 : 4}
              fill="rgba(232,200,109,0.92)"
            />
          </g>
        ))}
        <path
          d="M0 144 C78 124 132 154 196 132 C254 112 282 128 320 110 L320 180 L0 180 Z"
          fill="rgba(18,41,58,0.72)"
        />
      </svg>
    );
  }

  if (visual === "consulting") {
    return (
      <>
        <span
          style={{
            position: "absolute",
            left: "14%",
            top: "22%",
            width: "46%",
            height: "48%",
            border: "1px solid rgba(232,200,109,0.28)",
            transform: "rotate(-4deg)",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: "12%",
            top: "30%",
            width: "34%",
            height: "40%",
            border: "1px dashed rgba(232,200,109,0.34)",
            transform: "rotate(5deg)",
          }}
        />
      </>
    );
  }

  if (visual === "sovereign") {
    return (
      <>
        {[104, 70, 38].map((size) => (
          <span
            key={size}
            style={{
              ...orbitalRing,
              width: size,
              height: size,
              left: "50%",
              top: "48%",
            }}
          />
        ))}
        <span style={{ ...glowNode, left: "50%", top: "48%", width: 12, height: 12 }} />
      </>
    );
  }

  return (
    <>
      <span style={{ ...orbitalRing, width: 96, height: 96, left: "21%", top: "48%" }} />
      <span style={{ ...orbitalRing, width: 54, height: 54, left: "21%", top: "48%" }} />
      <span style={{ ...glowNode, left: "21%", top: "48%" }} />
      <span style={{ ...deskLine, left: "8%", right: "8%", bottom: "28%" }} />
      <span style={{ ...deskLine, left: "18%", width: "34%", bottom: "20%" }} />
    </>
  );
}

function getVisualBackground(visual: VisualKind) {
  const backgrounds: Record<VisualKind, string> = {
    exploration:
      "radial-gradient(circle at 22% 46%, rgba(232,200,109,0.18), transparent 30%), linear-gradient(145deg, rgba(22,20,18,0.96), rgba(4,8,12,0.98))",
    oracle:
      "radial-gradient(circle at 50% 52%, rgba(76,102,120,0.2), transparent 46%), linear-gradient(145deg, rgba(10,16,22,0.98), rgba(3,7,11,0.98))",
    globality:
      "radial-gradient(circle at 60% 38%, rgba(40,82,118,0.3), transparent 44%), linear-gradient(155deg, rgba(6,15,24,0.98), rgba(3,8,13,0.98))",
    consulting:
      "radial-gradient(circle at 52% 44%, rgba(232,200,109,0.11), transparent 42%), linear-gradient(145deg, rgba(18,16,15,0.98), rgba(5,8,11,0.98))",
    sovereign:
      "radial-gradient(circle at 50% 45%, rgba(232,200,109,0.24), transparent 34%), linear-gradient(145deg, rgba(8,14,24,0.98), rgba(3,7,12,0.98))",
  };

  return backgrounds[visual];
}

const yearStyle: CSSProperties = {
  marginTop: 18,
  fontFamily: "'DM Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.16em",
  color: "rgba(232,200,109,0.78)",
  textTransform: "uppercase",
};

const titleStyle: CSSProperties = {
  margin: "10px 0 0",
  fontFamily: "'EB Garamond', serif",
  fontSize: 27,
  lineHeight: 1.12,
  fontWeight: 500,
  color: "rgba(247,239,218,0.94)",
};

const descriptionStyle: CSSProperties = {
  margin: "13px 0 0",
  maxWidth: 330,
  whiteSpace: "normal",
  overflowWrap: "anywhere",
  fontFamily: "'EB Garamond', serif",
  fontSize: 17,
  lineHeight: 1.55,
  color: "rgba(245,235,210,0.72)",
};

const orbitalRing: CSSProperties = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  border: "1px solid rgba(232,200,109,0.28)",
};

const glowNode: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  width: 10,
  height: 10,
  transform: "translate(-50%, -50%)",
  borderRadius: "50%",
  background: "#E8C86D",
  boxShadow:
    "0 0 18px rgba(232,200,109,0.82), 0 0 42px rgba(232,200,109,0.32)",
};

const deskLine: CSSProperties = {
  position: "absolute",
  height: 1,
  background:
    "linear-gradient(90deg, transparent, rgba(232,200,109,0.32), transparent)",
};
