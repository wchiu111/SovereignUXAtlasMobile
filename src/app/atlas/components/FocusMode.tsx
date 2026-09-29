import type { FocusContent, StarSystem } from "../../types/atlas";

interface FocusModeProps {
  data: FocusContent; system: StarSystem;
  onExit: () => void; activeSection: number; onSection: (i: number) => void;
}

export default function FocusMode({ data, system, onExit, activeSection, onSection }: FocusModeProps) {
  const sec = data.sections[activeSection];
  return (
    <div className="absolute inset-0 z-40 flex" style={{ background:"#03030A" }}>
      <nav style={{ width:"220px", flexShrink:0,
        borderRight:"1px solid rgba(200,169,110,0.08)",
        background:"rgba(3,3,8,0.95)", display:"flex",
        flexDirection:"column", padding:"28px 0", overflowY:"auto" }}>
        <button onClick={onExit} style={{
          display:"flex", alignItems:"center", gap:"8px",
          padding:"0 24px 20px",
          fontFamily:"'DM Mono',monospace", fontSize:"7px",
          letterSpacing:"0.24em", color:"rgba(200,169,110,0.38)",
          background:"none", border:"none", cursor:"pointer",
        }}>← {system.label}</button>

        <div style={{ borderTop:"1px solid rgba(200,169,110,0.07)", paddingTop:"20px" }}>
          <div style={{ padding:"0 24px 16px" }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"6px",
              letterSpacing:"0.34em", color:system.color, textTransform:"uppercase",
              marginBottom:"6px" }}>{system.label}</div>
            <div style={{ fontFamily:"'EB Garamond',serif", fontSize:"15px",
              lineHeight:1.15, color:"#F0E4C4", letterSpacing:"0.02em" }}>
              {data.headline}</div>
          </div>
          <div style={{ borderTop:"1px solid rgba(200,169,110,0.07)", marginBottom:"16px" }}/>

          {data.sections.map((s, i) => (
            <button key={s.id} onClick={() => onSection(i)} style={{
              display:"block", width:"100%", textAlign:"left",
              padding:"9px 24px",
              fontFamily:"'DM Mono',monospace", fontSize:"7px",
              letterSpacing:"0.22em", textTransform:"uppercase",
              color: i===activeSection ? system.color : "rgba(200,169,110,0.35)",
              background: i===activeSection ? `${system.color}0C` : "transparent",
              borderTop:"none", borderRight:"none", borderBottom:"none",
              borderLeft: i===activeSection ? `2px solid ${system.color}60` : "2px solid transparent",
              cursor:"pointer", transition:"all 0.2s",
            }}>
              <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"6px",
                opacity:0.5, marginRight:"6px" }}>
                {String(i+1).padStart(2,"0")}
              </span>{s.label}
            </button>
          ))}
        </div>

        <div style={{ marginTop:"auto", padding:"20px 24px 0",
          display:"flex", justifyContent:"space-between" }}>
          <button onClick={() => onSection(Math.max(0,activeSection-1))}
            disabled={activeSection===0}
            style={{ fontFamily:"'DM Mono',monospace", fontSize:"7px",
              letterSpacing:"0.2em",
              color:activeSection===0?"rgba(200,169,110,0.15)":"rgba(200,169,110,0.45)",
              background:"none", border:"none", cursor:activeSection===0?"default":"pointer" }}>
            ← PREV</button>
          <button onClick={() => onSection(Math.min(data.sections.length-1,activeSection+1))}
            disabled={activeSection===data.sections.length-1}
            style={{ fontFamily:"'DM Mono',monospace", fontSize:"7px",
              letterSpacing:"0.2em",
              color:activeSection===data.sections.length-1?"rgba(200,169,110,0.15)":"rgba(200,169,110,0.45)",
              background:"none", border:"none",
              cursor:activeSection===data.sections.length-1?"default":"pointer" }}>
            NEXT →</button>
        </div>
      </nav>

      <main style={{ flex:1, overflowY:"auto", padding:"52px 64px 80px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"32px" }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"7px",
            letterSpacing:"0.30em", color:system.color, opacity:0.7 }}>
            {String(activeSection+1).padStart(2,"0")} / {String(data.sections.length).padStart(2,"0")}
          </span>
          <div style={{ flex:1, height:"1px", background:"rgba(200,169,110,0.07)" }}/>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:"7px",
            letterSpacing:"0.22em", color:"rgba(200,169,110,0.25)" }}>
            {sec.label.toUpperCase()}
          </span>
        </div>

        <div style={{ fontFamily:"'EB Garamond',serif", fontSize:"38px",
          lineHeight:1.05, color:"#F0E4C4", letterSpacing:"0.01em",
          marginBottom:"12px", maxWidth:"680px" }}>
          {activeSection===0 ? data.headline : sec.label}
        </div>
        {activeSection===0 && (
          <div style={{ fontFamily:"'EB Garamond',serif", fontStyle:"italic",
            fontSize:"16px", lineHeight:1.6, color:"rgba(200,169,110,0.55)",
            marginBottom:"36px", maxWidth:"620px" }}>{data.subheadline}</div>
        )}
        <div style={{ borderTop:"1px solid rgba(200,169,110,0.08)", marginBottom:"36px" }}/>

        <div style={{ maxWidth:"680px" }}>
          {sec.content.split("\n\n").map((para,i) => (
            <p key={i} style={{ fontFamily:"'EB Garamond',serif",
              fontSize:"16px", lineHeight:1.85,
              color:"rgba(232,219,178,0.82)", marginBottom:"22px",
              whiteSpace:"pre-line" }}>{para}</p>
          ))}
          {sec.insight && (
            <div style={{ background:"rgba(200,169,110,0.06)",
              borderLeft:`3px solid ${system.color}50`,
              padding:"18px 22px", marginTop:"32px" }}>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:"6.5px",
                letterSpacing:"0.32em", color:system.color, opacity:0.7, marginBottom:"10px" }}>
                KEY INSIGHT</div>
              <div style={{ fontFamily:"'EB Garamond',serif", fontStyle:"italic",
                fontSize:"16px", lineHeight:1.68, color:"rgba(240,228,196,0.92)" }}>
                {sec.insight}</div>
            </div>
          )}
        </div>

        <div style={{ display:"flex", gap:"6px", marginTop:"52px" }}>
          {data.sections.map((_,i) => (
            <button key={i} onClick={() => onSection(i)} style={{
              width:i===activeSection?"24px":"6px", height:"6px",
              background:i===activeSection ? system.color : `${system.color}30`,
              border:"none", cursor:"pointer", padding:0,
              transition:"all 0.3s", borderRadius:"3px",
            }}/>
          ))}
        </div>
      </main>
    </div>
  );
}
