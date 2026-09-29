export const NEBULAE = [
  { cx:18,cy:24,w:55,h:44,color:"rgba(72,48,96,0.14)",blur:104 },
  { cx:64,cy:11,w:44,h:36,color:"rgba(34,70,78,0.12)",blur:90 },
  { cx:88,cy:47,w:34,h:46,color:"rgba(92,67,36,0.11)",blur:98 },
  { cx:28,cy:73,w:42,h:34,color:"rgba(48,76,62,0.11)",blur:92 },
  { cx:73,cy:80,w:38,h:30,color:"rgba(70,48,92,0.11)",blur:96 },
  { cx:50,cy:50,w:64,h:52,color:"rgba(112,92,40,0.045)",blur:150 },
];

export const STAR_COLORS_ARR = [
  "#F4EBD0","#E8DAB8","#D8C79A","#C8AE78","#E7E6F0",
  "#D0D3DE","#BCC7D2","#B8ADCA","#A79BB9","#F7F4EC",
];

export interface Particle {
  x:number;
  y:number;
  vx:number;
  vy:number;
  size:number;
  baseOp:number;
  phase:number;
  speed:number;
  ci:number;
  depth:number;
}

export function mkParticles(w:number,h:number):Particle[] {
  return Array.from({length:1320},()=>{
    const depth = Math.random();
    const r=Math.random();
    const size =
      r < 0.8
        ? 0.22 + Math.random() * 0.42
        : r < 0.96
          ? 0.64 + Math.random() * 0.64
          : 1.3 + Math.random() * 1.15;

    const drift = 0.004 + depth * 0.01;

    return {
      x:Math.random()*w,
      y:Math.random()*h,
      vx:(Math.random()-.5)*drift,
      vy:(Math.random()-.5)*drift,
      size,
      baseOp:
        size < .7
          ? .035 + Math.random()*.16
          : size < 1.3
            ? .13 + Math.random()*.3
            : .28 + Math.random()*.38,
      phase:Math.random()*Math.PI*2,
      speed:.00016+Math.random()*.00038,
      ci:Math.floor(Math.random()*STAR_COLORS_ARR.length),
      depth,
    };
  });
}

export const STAR_RGB_ARR = STAR_COLORS_ARR.map(
  h =>
    [
      parseInt(h.slice(1,3),16),
      parseInt(h.slice(3,5),16),
      parseInt(h.slice(5,7),16),
    ] as [number,number,number],
);
