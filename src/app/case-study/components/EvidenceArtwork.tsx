import type { EvidenceItem } from "../types/caseStudy";

export function EvidenceThumbnail({
  type,
  color,
  image,
  alt,
  imageFit = "contain",
}: {
  type: string;
  color: string;
  image?: string;
  alt?: string;
  imageFit?: "contain" | "cover";
}) {
  if (image) {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "#0A0B10" }}
      >
        <img
          src={image}
          alt={alt ?? ""}
          loading="lazy"
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: imageFit,
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>
    );
  }

  const c = color;
  const dim = "0 0 200 130";
  const bg = "rgba(8,10,20,0.9)";

  if (type === "Research Finding") return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      {[0,1,2,3,4].map(i => (
        <rect key={i} x="24" y={22+i*18} width={[130,100,118,85,108][i]} height="3" rx="1.5"
          fill={c} fillOpacity={i===0?0.85:i===1?0.40:0.25}/>
      ))}
      <rect x="14" y="18" width="6" height="6" rx="1" fill={c} fillOpacity="0.6"/>
      <rect x="14" y="36" width="6" height="6" rx="1" fill={c} fillOpacity="0.3"/>
      <rect x="14" y="54" width="6" height="6" rx="1" fill={c} fillOpacity="0.3"/>
      <rect x="14" y="72" width="6" height="6" rx="1" fill={c} fillOpacity="0.2"/>
      <rect x="14" y="90" width="6" height="6" rx="1" fill={c} fillOpacity="0.2"/>
    </svg>
  );

  if (type === "Data Visualization") return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      <line x1="24" y1="15" x2="24" y2="100" stroke={c} strokeOpacity="0.25" strokeWidth="1"/>
      <line x1="24" y1="100" x2="185" y2="100" stroke={c} strokeOpacity="0.25" strokeWidth="1"/>
      {[
        { x:40, h:55, o:0.85 }, { x:65, h:35, o:0.50 }, { x:90, h:70, o:0.85 },
        { x:115, h:45, o:0.50 }, { x:140, h:80, o:0.85 }, { x:165, h:30, o:0.40 },
      ].map((b, i) => (
        <rect key={i} x={b.x} y={100-b.h} width="18" height={b.h} rx="2"
          fill={c} fillOpacity={b.o}/>
      ))}
    </svg>
  );

  if (type === "Diagram") return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      <circle cx="100" cy="65" r="20" fill="none" stroke={c} strokeOpacity="0.7" strokeWidth="1.5"/>
      <circle cx="40"  cy="40" r="12" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1"/>
      <circle cx="160" cy="40" r="12" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1"/>
      <circle cx="40"  cy="90" r="12" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1"/>
      <circle cx="160" cy="90" r="12" fill="none" stroke={c} strokeOpacity="0.4" strokeWidth="1"/>
      <line x1="52" y1="43" x2="81" y2="55" stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="148" y1="43" x2="119" y2="55" stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="52" y1="87" x2="81" y2="75" stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
      <line x1="148" y1="87" x2="119" y2="75" stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
      <circle cx="100" cy="65" r="5" fill={c} fillOpacity="0.8"/>
    </svg>
  );

  if (type === "Design Exploration") return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      <rect x="12" y="12" width="100" height="70" rx="4" fill={c} fillOpacity="0.08"
        stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
      <rect x="12" y="12" width="100" height="14" rx="4" fill={c} fillOpacity="0.15"/>
      <rect x="20" y="34" width="60" height="3" rx="1.5" fill={c} fillOpacity="0.5"/>
      <rect x="20" y="43" width="80" height="2" rx="1" fill={c} fillOpacity="0.25"/>
      <rect x="20" y="51" width="70" height="2" rx="1" fill={c} fillOpacity="0.25"/>
      <rect x="20" y="59" width="55" height="8" rx="2" fill={c} fillOpacity="0.35"/>
      <rect x="36" y="28" width="100" height="70" rx="4" fill={c} fillOpacity="0.06"
        stroke={c} strokeOpacity="0.2" strokeWidth="1"/>
      <rect x="60" y="44" width="100" height="70" rx="4" fill={c} fillOpacity="0.05"
        stroke={c} strokeOpacity="0.15" strokeWidth="1"/>
    </svg>
  );

  if (type === "UI Component") return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      <rect x="16" y="16" width="168" height="98" rx="6" fill="none"
        stroke={c} strokeOpacity="0.3" strokeWidth="1"/>
      <rect x="16" y="16" width="168" height="20" rx="6" fill={c} fillOpacity="0.12"/>
      <rect x="24" y="24" width="40" height="4" rx="2" fill={c} fillOpacity="0.6"/>
      <rect x="24" y="46" width="140" height="3" rx="1.5" fill={c} fillOpacity="0.35"/>
      <rect x="24" y="55" width="120" height="3" rx="1.5" fill={c} fillOpacity="0.20"/>
      <rect x="24" y="64" width="130" height="3" rx="1.5" fill={c} fillOpacity="0.20"/>
      <rect x="24" y="80" width="55" height="18" rx="3" fill={c} fillOpacity="0.50"/>
      <rect x="90" y="80" width="55" height="18" rx="3" fill="none"
        stroke={c} strokeOpacity="0.40" strokeWidth="1"/>
    </svg>
  );

  if (type === "Interaction Pattern") return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      <rect x="14" y="50" width="40" height="28" rx="4" fill="none"
        stroke={c} strokeOpacity="0.5" strokeWidth="1"/>
      <rect x="80" y="50" width="40" height="28" rx="4" fill={c} fillOpacity="0.15"
        stroke={c} strokeOpacity="0.5" strokeWidth="1"/>
      <rect x="146" y="50" width="40" height="28" rx="4" fill="none"
        stroke={c} strokeOpacity="0.5" strokeWidth="1"/>
      <line x1="54" y1="64" x2="78" y2="64" stroke={c} strokeOpacity="0.5" strokeWidth="1"/>
      <polygon points="76,61 80,64 76,67" fill={c} fillOpacity="0.5"/>
      <line x1="120" y1="64" x2="144" y2="64" stroke={c} strokeOpacity="0.5" strokeWidth="1"/>
      <polygon points="142,61 146,64 142,67" fill={c} fillOpacity="0.5"/>
      <rect x="20" y="62" width="28" height="4" rx="2" fill={c} fillOpacity="0.3"/>
      <rect x="86" y="62" width="28" height="4" rx="2" fill={c} fillOpacity="0.7"/>
      <rect x="152" y="62" width="28" height="4" rx="2" fill={c} fillOpacity="0.3"/>
    </svg>
  );

  // Documentation
  return (
    <svg viewBox={dim} className="w-full h-full">
      <rect width="200" height="130" fill={bg}/>
      <rect x="16" y="14" width="168" height="100" rx="4" fill={c} fillOpacity="0.04"
        stroke={c} strokeOpacity="0.20" strokeWidth="1"/>
      {[0,1,2,3,4].map(i => (
        <g key={i}>
          <rect x="26" y={26+i*16} width="6" height="6" rx="1" fill={c} fillOpacity={i===0?0.7:0.3}/>
          <rect x="38" y={28+i*16} width={[110,90,100,80,95][i]} height="3" rx="1.5"
            fill={c} fillOpacity={i===0?0.55:0.20}/>
          {i===0 && <rect x="38" y="34" width="80" height="2" rx="1" fill={c} fillOpacity="0.15"/>}
        </g>
      ))}
    </svg>
  );
}

// Large evidence viewer SVG
export function EvidenceLargeView({ item, color }: { item: EvidenceItem; color: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center"
      style={{ background:"#0A0B10" }}>
      <div style={{ width:"100%", height:"100%", position:"relative" }}>
        <EvidenceThumbnail
          type={item.type}
          color={color}
          image={item.image}
          alt={item.alt}
          imageFit={item.imageFit}
        />
      </div>
    </div>
  );
}

// ─── Left Navigation ───────────────────────────────────────────────────────