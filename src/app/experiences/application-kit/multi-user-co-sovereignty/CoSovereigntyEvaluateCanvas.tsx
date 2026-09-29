import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CO_SOVEREIGNTY_STAGES,
  type CoSovereigntyStageId,
} from "./coSovereigntyData";

type NoteState = Partial<Record<CoSovereigntyStageId, string>>;

export default function CoSovereigntyEvaluateCanvas() {
  const reducedMotion = useReducedMotion();
  const [notes, setNotes] = useState<NoteState>({});
  const [openStage, setOpenStage] = useState<CoSovereigntyStageId | null>(null);

  const exportText = useMemo(() => {
    const lines = [
      "# Multi-User & Co-Sovereignty — Interface Evaluation",
      "",
      "Use these questions to inspect whether an AI experience recognizes legitimate differences in need, authority, and consequence.",
      "",
    ];
    CO_SOVEREIGNTY_STAGES.forEach((stage, index) => {
      lines.push(`## ${String(index + 1).padStart(2, "0")} ${stage.title}`);
      stage.evaluate.forEach((question) => lines.push(`- [ ] ${question}`));
      const note = notes[stage.id]?.trim();
      if (note) lines.push("", "### Notes", note);
      lines.push("");
    });
    return lines.join("\n");
  }, [notes]);

  const exportChecklist = () => {
    const blob = new Blob([exportText], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "co-sovereignty-evaluation.md";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return <motion.div initial={reducedMotion?{opacity:0}:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:reducedMotion ? .16 : .5,ease:[.16,1,.3,1]}} style={{width:"min(1180px,100%)",margin:"0 auto"}}>
    <div style={{textAlign:"center",marginBottom:26}}>
      <div style={{fontFamily:"'EB Garamond',serif",fontSize:"clamp(29px,2.1vw,36px)",color:"rgba(255,248,230,.95)"}}>Evaluate shared authority</div>
      <div style={{margin:"8px auto 0",maxWidth:760,fontFamily:"'EB Garamond',serif",fontSize:"clamp(16px,1.1vw,18px)",lineHeight:1.55,color:"rgba(245,235,210,.62)"}}>Use these questions to inspect whether an AI experience recognizes legitimate differences in need, authority, and consequence. Apply them to any shared workflow, recommendation, approval, or decision.</div>
    </div>

    <section style={{border:"1px solid rgba(245,235,210,.10)",background:"linear-gradient(180deg,rgba(8,11,18,.80),rgba(4,7,12,.72))",backdropFilter:"blur(14px)"}}>
      {CO_SOVEREIGNTY_STAGES.map((stage,index)=>{const open=openStage===stage.id;return <div key={stage.id} style={{display:"grid",gridTemplateColumns:"42px 48px 190px minmax(0,1fr) 112px",gap:12,alignItems:"center",minHeight:92,padding:"14px 16px",borderTop:index===0?"none":"1px solid rgba(245,235,210,.07)"}}>
        <div style={{fontFamily:"'DM Mono',monospace",fontSize:15,color:stage.color}}>{String(index+1).padStart(2,"0")}</div>
        <div style={{width:40,height:40,borderRadius:"50%",display:"grid",placeItems:"center",border:`1px solid ${stage.color}55`,background:`${stage.color}0C`,boxShadow:`0 0 22px ${stage.color}14`}}><span style={{width:10,height:10,borderRadius:"50%",background:stage.color,boxShadow:`0 0 12px ${stage.color}`}}/></div>
        <div><div style={{fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".12em",textTransform:"uppercase",color:stage.color}}>{stage.title}</div><div style={{marginTop:5,fontFamily:"'EB Garamond',serif",fontSize:14.5,lineHeight:1.35,color:"rgba(245,235,210,.54)"}}>{stage.summary}</div></div>
        <div style={{display:"grid",gap:8}}>{stage.evaluate.map(question=><label key={question} style={{display:"grid",gridTemplateColumns:"18px 1fr",gap:9,alignItems:"start",fontFamily:"'EB Garamond',serif",fontSize:14.5,lineHeight:1.35,color:"rgba(245,235,210,.72)"}}><input type="checkbox" style={{margin:0,width:16,height:16,accentColor:stage.color}}/><span>{question}</span></label>)}</div>
        <button type="button" onClick={()=>setOpenStage(open?null:stage.id)} style={{width:"100%",minHeight:38,border:`1px solid ${stage.color}65`,background:open?`${stage.color}0E`:"rgba(3,4,9,.16)",color:stage.color,fontFamily:"'EB Garamond',serif",fontSize:14,cursor:"pointer"}}>{open?"Close notes":"Add notes"}</button>
        {open&&<textarea value={notes[stage.id]??""} onChange={event=>setNotes(current=>({...current,[stage.id]:event.target.value}))} placeholder="Capture observations, screenshots, or examples…" style={{gridColumn:"4 / 6",width:"100%",minHeight:84,boxSizing:"border-box",resize:"vertical",padding:12,border:`1px solid ${stage.color}3A`,background:"rgba(3,5,10,.72)",color:"rgba(255,248,230,.82)",fontFamily:"'EB Garamond',serif",fontSize:14,lineHeight:1.4,outline:"none"}}/>}
      </div>})}

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:18,padding:"14px 16px",borderTop:"1px solid rgba(245,235,210,.08)"}}>
        <button type="button" onClick={exportChecklist} style={actionButton}>⇩ &nbsp; Export checklist</button>
        <button type="button" onClick={()=>{setNotes({});setOpenStage(null)}} style={actionButton}>↻ &nbsp; Start a new evaluation</button>
      </div>
    </section>
  </motion.div>;
}

const actionButton={minHeight:42,padding:"0 14px",border:"1px solid rgba(245,235,210,.12)",background:"rgba(3,4,9,.16)",color:"rgba(245,235,210,.72)",fontFamily:"'EB Garamond',serif",fontSize:14.5,cursor:"pointer"};
