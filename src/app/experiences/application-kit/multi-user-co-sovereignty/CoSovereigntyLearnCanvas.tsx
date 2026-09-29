import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type {
  CoSovereigntyStage,
  CoSovereigntyStageId,
} from "./coSovereigntyData";

interface Props {
  stages: CoSovereigntyStage[];
  activeStageId: CoSovereigntyStageId;
  onCommitStage: (id: CoSovereigntyStageId) => void;
  onApply: () => void;
  moduleColor: string;
}

const FIELD = 1155;
const CORE_SIZE = 505;
const CENTER = { x: 165, y: 1060 };
const OUTER_RADIUS = 700;
const INNER_RADIUS = 505;
const ORDER: CoSovereigntyStageId[] = [
  "roles", "needs", "decision-rights", "conflict",
  "negotiation", "trade-offs", "resolution",
];
const GEOMETRY: Record<CoSovereigntyStageId,{ orbit:"outer"|"inner"; angle:number; width:number }> = {
  roles:{orbit:"outer",angle:-95,width:215},
  needs:{orbit:"outer",angle:-80,width:215},
  "decision-rights":{orbit:"outer",angle:-63,width:225},
  conflict:{orbit:"outer",angle:-46,width:210},
  negotiation:{orbit:"inner",angle:-79,width:220},
  "trade-offs":{orbit:"inner",angle:-51,width:220},
  resolution:{orbit:"inner",angle:-20,width:220},
};
const pct=(v:number)=>`${(v/FIELD)*100}%`;
function pointOnOrbit(orbit:"outer"|"inner",angle:number){
  const r=orbit==="outer"?OUTER_RADIUS:INNER_RADIUS;
  const rad=(angle*Math.PI)/180;
  return {x:CENTER.x+Math.cos(rad)*r,y:CENTER.y+Math.sin(rad)*r};
}

export default function CoSovereigntyLearnCanvas({stages,activeStageId,onCommitStage,onApply,moduleColor}:Props){
  const reducedMotion=useReducedMotion();
  const [hovered,setHovered]=useState<CoSovereigntyStageId|null>(null);
  const [orbitHovered,setOrbitHovered]=useState<"outer"|"inner"|null>(null);
  const active=stages.find(s=>s.id===activeStageId)??stages[0];
  const index=ORDER.indexOf(activeStageId);
  const next=index>=0&&index<ORDER.length-1?stages.find(s=>s.id===ORDER[index+1]):undefined;
  const outerActive=orbitHovered==="outer"||["roles","needs","decision-rights","conflict"].includes(hovered??"");
  const innerActive=orbitHovered==="inner"||["negotiation","trade-offs","resolution"].includes(hovered??"");
  const outer=stages.slice(0,4), inner=stages.slice(4);

  return <div style={{position:"relative",width:"100%",minHeight:"calc(100dvh - 150px)",overflow:"visible"}}>
    <div style={{position:"absolute",left:0,bottom:0,width:"clamp(760px,72vw,1155px)",height:"clamp(760px,72vw,1155px)",pointerEvents:"none"}}>
      <div aria-hidden="true" style={{position:"absolute",left:pct(CENTER.x-CORE_SIZE/2),top:pct(CENTER.y-CORE_SIZE/2),width:pct(CORE_SIZE),height:pct(CORE_SIZE),minWidth:350,minHeight:350,maxWidth:CORE_SIZE,maxHeight:CORE_SIZE,borderRadius:"50%",background:`radial-gradient(circle at 42% 34%,${moduleColor}E6 0%,${moduleColor}C2 31%,${moduleColor}94 62%,${moduleColor}66 100%)`,boxShadow:`0 0 156px ${moduleColor}24,0 0 358px ${moduleColor}12`}}/>
      <svg viewBox={`0 0 ${FIELD} ${FIELD}`} preserveAspectRatio="xMinYMin meet" style={{position:"absolute",inset:0,width:"100%",height:"100%",overflow:"visible",pointerEvents:"none"}}>
        <defs>
          <linearGradient id="cosov-outer" x1="80" y1="120" x2="690" y2="450" gradientUnits="userSpaceOnUse">
            {outer.map((s,i)=><stop key={s.id} offset={`${(i/Math.max(1,outer.length-1))*100}%`} stopColor={s.color} stopOpacity=".86"/>)}
          </linearGradient>
          <linearGradient id="cosov-inner" x1="260" y1="360" x2="650" y2="720" gradientUnits="userSpaceOnUse">
            {inner.map((s,i)=><stop key={s.id} offset={`${(i/Math.max(1,inner.length-1))*100}%`} stopColor={s.color} stopOpacity=".86"/>)}
          </linearGradient>
          <filter id="cosov-glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <circle cx={CENTER.x} cy={CENTER.y} r={OUTER_RADIUS} fill="none" stroke="rgba(255,255,255,.29)" strokeWidth="2.6"/>
        <motion.circle cx={CENTER.x} cy={CENTER.y} r={OUTER_RADIUS} fill="none" stroke="url(#cosov-outer)" strokeWidth={outerActive?3.4:2.6} animate={{opacity:outerActive ? .96 : 0}} transition={{duration:reducedMotion ? .16 : .46,ease:[.16,1,.3,1]}} filter={outerActive&&!reducedMotion?"url(#cosov-glow)":undefined}/>
        <circle cx={CENTER.x} cy={CENTER.y} r={INNER_RADIUS} fill="none" stroke="rgba(184,140,235,.33)" strokeWidth="2.6"/>
        <motion.circle cx={CENTER.x} cy={CENTER.y} r={INNER_RADIUS} fill="none" stroke="url(#cosov-inner)" strokeWidth={innerActive?3.4:2.6} animate={{opacity:innerActive ? .96 : 0}} transition={{duration:reducedMotion ? .16 : .46,ease:[.16,1,.3,1]}} filter={innerActive&&!reducedMotion?"url(#cosov-glow)":undefined}/>
        <circle cx={CENTER.x} cy={CENTER.y} r={OUTER_RADIUS} fill="none" stroke="transparent" strokeWidth="22" pointerEvents="stroke" onMouseEnter={()=>setOrbitHovered("outer")} onMouseLeave={()=>setOrbitHovered(null)} style={{cursor:"pointer"}}/>
        <circle cx={CENTER.x} cy={CENTER.y} r={INNER_RADIUS} fill="none" stroke="transparent" strokeWidth="22" pointerEvents="stroke" onMouseEnter={()=>setOrbitHovered("inner")} onMouseLeave={()=>setOrbitHovered(null)} style={{cursor:"pointer"}}/>
      </svg>

      {stages.map(stage=>{const g=GEOMETRY[stage.id],p=pointOnOrbit(g.orbit,g.angle),isActive=stage.id===activeStageId,isHover=stage.id===hovered,silent=!isActive&&!isHover;return <motion.button key={stage.id} type="button" onClick={()=>onCommitStage(stage.id)} onMouseEnter={()=>setHovered(stage.id)} onMouseLeave={()=>setHovered(null)} initial={reducedMotion?{opacity:0}:{opacity:0,scale:.96}} animate={{opacity:isActive?1:isHover ? .74 : .24,scale:isActive?1.05:isHover?1.02:1}} transition={{duration:reducedMotion ? .16 : .5,ease:[.16,1,.3,1]}} style={{position:"absolute",left:pct(p.x),top:pct(p.y),width:pct(g.width),minWidth:isActive?220:185,maxWidth:isActive?270:230,padding:0,border:0,background:"transparent",color:"#F4EBD0",textAlign:"left",cursor:"pointer",pointerEvents:"auto"}}>
        <span style={{display:"grid",gridTemplateColumns:isActive?"49px 1fr":"46px 1fr",gap:isActive?14:13,alignItems:"center"}}>
          <span style={{display:"grid",placeItems:"center",width:isActive?49:46,height:isActive?49:46,borderRadius:"50%",border:`1px solid ${silent?"rgba(245,235,210,.20)":stage.color}`,background:silent?"rgba(245,235,210,.02)":`${stage.color}${isActive?"1F":"10"}`,boxShadow:isActive||isHover?`0 0 31px ${stage.color}38`:"none"}}><span style={{width:isActive?9:8,height:isActive?9:8,borderRadius:"50%",background:silent?"rgba(245,235,210,.25)":stage.color,boxShadow:isActive||isHover?`0 0 13px ${stage.color}`:"none"}}/></span>
          <span><span style={{display:"block",fontFamily:"'DM Mono',monospace",fontSize:isActive?12.7:12.1,lineHeight:1.5,letterSpacing:".115em",textTransform:"uppercase",whiteSpace:"nowrap",color:isActive?"rgba(255,248,230,.98)":"rgba(245,235,210,.68)"}}>{stage.title}</span>{isActive&&<span style={{display:"block",marginTop:5.5,maxWidth:175,fontFamily:"'EB Garamond',serif",fontSize:15.5,lineHeight:1.45,color:"rgba(245,235,210,.78)"}}>{stage.summary}</span>}</span>
        </span>
      </motion.button>})}
    </div>

    <div style={{position:"absolute",top:34,right:"clamp(2px,4vw,74px)",width:"min(395px,31vw)",minWidth:350}}>
      <div style={{padding:"23px 22px 21px",border:"1px solid rgba(245,235,210,.11)",background:"linear-gradient(180deg,rgba(8,11,18,.93),rgba(4,7,12,.90))",backdropFilter:"blur(14px)"}}>
        <div style={mono(active.color)}>{active.title}</div>
        <Label>What you’re seeing</Label><Copy>{active.annotation.what}</Copy>
        <Label>Why it matters</Label><Copy>{active.annotation.why}</Copy>
        <Label>Sovereign principle</Label><Copy>{active.annotation.principle}</Copy>
      </div>
      {next?<button type="button" onClick={()=>onCommitStage(next.id)} style={{width:"100%",minHeight:54,marginTop:14,padding:"0 18px",border:"1px solid rgba(137,185,220,.36)",background:"rgba(4,7,12,.80)",color:"rgba(185,218,240,.94)",textAlign:"left",fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".16em",textTransform:"uppercase",cursor:"pointer"}}>Next step &nbsp;→&nbsp; {next.title}</button>:<div style={{marginTop:14,padding:"20px 20px 19px",border:`1px solid ${moduleColor}55`,background:"linear-gradient(135deg,rgba(13,10,18,.92),rgba(8,8,12,.88))"}}><div style={{fontFamily:"'EB Garamond',serif",fontSize:21,color:"rgba(233,198,113,.95)"}}>Ready to see it in practice?</div><div style={{marginTop:7,fontFamily:"'EB Garamond',serif",fontSize:15,lineHeight:1.45,color:"rgba(245,235,210,.62)"}}>Compare the same shared decision with and without Co-Sovereignty.</div><button type="button" onClick={onApply} style={{width:"100%",minHeight:48,marginTop:16,border:`1px solid ${moduleColor}88`,background:moduleColor,color:"#08070C",fontFamily:"'DM Mono',monospace",fontSize:9.5,letterSpacing:".12em",textTransform:"uppercase",cursor:"pointer"}}>Learn how to apply this framework →</button></div>}
    </div>
  </div>;
}

function Label({children}:{children:React.ReactNode}){return <div style={{marginTop:17,fontFamily:"'DM Mono',monospace",fontSize:8.5,letterSpacing:".17em",textTransform:"uppercase",color:"rgba(200,180,130,.64)"}}>{children}</div>}
function Copy({children}:{children:React.ReactNode}){return <div style={{marginTop:7,fontFamily:"'EB Garamond',serif",fontSize:17,lineHeight:1.5,color:"rgba(245,235,210,.82)"}}>{children}</div>}
function mono(color:string){return {fontFamily:"'DM Mono',monospace",fontSize:10,letterSpacing:".15em",textTransform:"uppercase" as const,color}}
