import React, { useState, useEffect, useRef } from "react";
import myPhoto from "./aishwarya.png";

/* ==========================================================
   GLOBAL STYLES
========================================================== */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

    :root {
      --bg: #050508;
      --text: #f0f0f5;
      --accent: #a78bfa;
      --accent2: #60a5fa;
      --accent3: #f472b6;
      --font-head: 'Syne', sans-serif;
      --font-body: 'DM Sans', sans-serif;
    }

    * { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body {
      background:var(--bg); color:var(--text);
      font-family:var(--font-body); min-height:100vh;
      overflow-x:hidden; cursor:none;
      -webkit-font-smoothing:antialiased;
    }

    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:var(--bg); }
    ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.15); border-radius:4px; }

    a { color:inherit; text-decoration:none; }

    .heading-display {
      font-family:var(--font-head); font-weight:800;
      font-size:clamp(3rem,7vw,6.5rem);
      line-height:0.95; letter-spacing:-0.04em;
    }
    .heading-section {
      font-family:var(--font-head); font-weight:800;
      font-size:clamp(2.5rem,5vw,4.5rem);
      line-height:1.05; letter-spacing:-0.03em;
    }
    .text-gradient {
      background:linear-gradient(130deg,#fff 0%,rgba(255,255,255,0.6) 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .text-accent {
      background:linear-gradient(130deg,var(--accent),var(--accent2),var(--accent3));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      background-size:200%; animation:bgShift 5s ease infinite;
    }
    .noise-bg {
      position:fixed; inset:0; pointer-events:none; z-index:999;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E");
      mix-blend-mode:overlay; opacity:0.18;
    }
    .nav-link {
      font-size:13px; font-weight:600; letter-spacing:2px; text-transform:uppercase;
      opacity:0.5; transition:opacity 0.3s; position:relative; cursor:pointer;
    }
    .nav-link:hover { opacity:1; }
    .nav-link::after {
      content:''; position:absolute; bottom:-4px; right:0; width:0; height:1px;
      background:white; transition:width 0.4s cubic-bezier(0.23,1,0.32,1); left:auto;
    }
    .nav-link:hover::after { width:100%; left:0; right:auto; }

    .btn-primary {
      padding:14px 34px; border-radius:100px; background:white; color:var(--bg);
      font-weight:700; font-size:13px; letter-spacing:0.5px; border:none; cursor:pointer;
      display:inline-flex; align-items:center; justify-content:center; font-family:inherit;
      transition:all 0.4s cubic-bezier(0.23,1,0.32,1); text-transform:uppercase;
    }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 10px 40px rgba(255,255,255,0.25); }

    .btn-secondary {
      padding:13px 32px; border-radius:100px; background:transparent; color:white;
      font-weight:600; font-size:13px; letter-spacing:0.5px; border:1px solid rgba(255,255,255,0.15);
      cursor:pointer; transition:all 0.4s cubic-bezier(0.23,1,0.32,1);
      display:inline-flex; align-items:center; justify-content:center; font-family:inherit; text-transform:uppercase;
    }
    .btn-secondary:hover { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.4); transform:translateY(-2px); }

    @keyframes bgShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes mLeft   { from{transform:translateX(0)} to{transform:translateX(-33.33%)} }
    @keyframes mRight  { from{transform:translateX(-33.33%)} to{transform:translateX(0)} }
    @keyframes spin    { to{transform:rotate(360deg)} }
    @keyframes floatOrb { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-40px) scale(1.05)} }
    @keyframes pulseSoft { 0%,100%{opacity:0.3} 50%{opacity:1} }
    @keyframes revealUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
    @keyframes skillBarFill { from{width:0} to{width:var(--w)} }
    @keyframes orbFloat {
      0%  { transform:translate(0,0)   scale(1); }
      33% { transform:translate(30px,-20px) scale(1.05); }
      66% { transform:translate(-20px,15px)  scale(0.97); }
      100%{ transform:translate(0,0)   scale(1); }
    }
    @keyframes orbFloat2 {
      0%  { transform:translate(0,0)   scale(1); }
      33% { transform:translate(-25px,20px)  scale(1.03); }
      66% { transform:translate(20px,-15px) scale(0.98); }
      100%{ transform:translate(0,0)   scale(1); }
    }
    @keyframes shimmer {
      0%  { transform:translateX(-100%) skewX(-15deg); }
      100%{ transform:translateX(300%)  skewX(-15deg); }
    }
    @keyframes fadeSlideIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
    @keyframes contactOrb  { 0%,100%{transform:scale(1) translate(0,0)} 50%{transform:scale(1.1) translate(20px,-15px)} }

    @media(max-width:1024px) {
      .responsive-grid { grid-template-columns:1fr !important; }
      .about-layout    { grid-template-columns:1fr !important; gap:60px !important; }
      section          { padding:100px 32px !important; }
      .skills-exp-grid { grid-template-columns:1fr !important; }
    }
    @media(max-width:768px) {
      .nav-links { display:none !important; }
      section    { padding:80px 24px !important; }
    }
  `}</style>
);

/* ==========================================================
   CURSOR
========================================================== */
function Cursor() {
  const ring = useRef(null);
  const dot  = useRef(null);
  const pos  = useRef({ x:0, y:0 });
  const tgt  = useRef({ x:0, y:0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const mv  = (e) => { tgt.current = { x:e.clientX, y:e.clientY }; };
    const ov  = (e) => { if (e.target.closest("a,button,.interactive")) setHovered(true); };
    const out = ()  => setHovered(false);
    window.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", ov);
    document.addEventListener("mouseout",  out);
    let raf;
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.15;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x-(hovered?36:24)}px,${pos.current.y-(hovered?36:24)}px) scale(${hovered?1.2:1})`;
        ring.current.style.borderColor = hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)";
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${tgt.current.x-4}px,${tgt.current.y-4}px)`;
        dot.current.style.opacity   = hovered ? 0 : 1;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove",mv); document.removeEventListener("mouseover",ov); document.removeEventListener("mouseout",out); cancelAnimationFrame(raf); };
  }, [hovered]);

  return (
    <>
      <div ref={ring} style={{ position:"fixed",top:0,left:0,width:48,height:48,border:"1.5px solid rgba(255,255,255,0.3)",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference",transition:"border-color 0.3s" }} />
      <div ref={dot}  style={{ position:"fixed",top:0,left:0,width:8,height:8,background:"white",borderRadius:"50%",pointerEvents:"none",zIndex:10000,mixBlendMode:"difference",transition:"opacity 0.2s" }} />
    </>
  );
}

/* ==========================================================
   GLOW GRID
========================================================== */
function GlowGrid() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x:-9999, y:-9999 });
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const CELL   = 80;
    let W, H, cols, rows, raf;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.ceil(W/CELL)+2; rows = Math.ceil(H/CELL)+2;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseRef.current = { x:e.clientX, y:e.clientY }; });
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      const {x:mx,y:my} = mouseRef.current;
      ctx.lineWidth = 0.5;
      for (let c=0;c<cols;c++) {
        const x=c*CELL, d=Math.max(0,1-Math.abs(mx-x)/280);
        ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H);
        ctx.strokeStyle=`rgba(255,255,255,${0.04+d*0.055})`; ctx.stroke();
      }
      for (let r=0;r<rows;r++) {
        const y=r*CELL, d=Math.max(0,1-Math.abs(my-y)/280);
        ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y);
        ctx.strokeStyle=`rgba(255,255,255,${0.04+d*0.055})`; ctx.stroke();
      }
      const nx=Math.round(mx/CELL)*CELL, ny=Math.round(my/CELL)*CELL;
      const dd=Math.sqrt((mx-nx)**2+(my-ny)**2);
      if (dd<CELL*1.5) {
        const t=Math.max(0,1-dd/(CELL*1.5));
        ctx.beginPath(); ctx.arc(nx,ny,2,0,Math.PI*2); ctx.fillStyle=`rgba(167,139,250,${t*0.6})`; ctx.fill();
        ctx.beginPath(); ctx.arc(nx,ny,12*t,0,Math.PI*2); ctx.fillStyle=`rgba(167,139,250,${t*0.15})`; ctx.fill();
      }
      raf=requestAnimationFrame(draw);
    };
    raf=requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize",resize); cancelAnimationFrame(raf); };
  },[]);
  return <canvas ref={canvasRef} style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0 }} />;
}

/* ==========================================================
   NEON WAVES
========================================================== */
function NeonWaves() {
  const svgRef   = useRef(null);
  const mouseRef = useRef({ x:0.5, y:0.5 });
  const ptY      = useRef({ x:0.5, y:0.5 });
  const frameRef = useRef(null);
  const WAVES = [
    {color:"#7c3aed",freq:0.008,amp:40,speed:0.0007,phase:0,  opacity:0.08,width:2,  yBase:0.3},
    {color:"#4f46e5",freq:0.012,amp:50,speed:0.0005,phase:1.5,opacity:0.06,width:1.5,yBase:0.45},
    {color:"#06b6d4",freq:0.010,amp:35,speed:0.0009,phase:2.2,opacity:0.07,width:1.8,yBase:0.6},
    {color:"#a855f7",freq:0.014,amp:55,speed:0.0006,phase:0.8,opacity:0.05,width:1.2,yBase:0.75},
    {color:"#3b82f6",freq:0.009,amp:45,speed:0.0008,phase:3.1,opacity:0.06,width:1.6,yBase:0.2},
  ];
  useEffect(() => {
    const mv=(e)=>{ mouseRef.current={x:e.clientX/window.innerWidth,y:e.clientY/window.innerHeight}; };
    window.addEventListener("mousemove",mv);
    const tick=(ts)=>{
      if(!svgRef.current){frameRef.current=requestAnimationFrame(tick);return;}
      const W=svgRef.current.clientWidth||window.innerWidth;
      const H=svgRef.current.clientHeight||window.innerHeight;
      ptY.current.x+=(mouseRef.current.x-ptY.current.x)*0.05;
      ptY.current.y+=(mouseRef.current.y-ptY.current.y)*0.05;
      const mx=ptY.current.x, my=ptY.current.y;
      svgRef.current.querySelectorAll("path.wave").forEach((path,i)=>{
        const w=WAVES[i], t=ts*w.speed, pts=[];
        for(let s=0;s<=150;s++){
          const x=(s/150)*W, nx=s/150;
          const inf=Math.sin((mx-nx)*Math.PI)*40;
          const distY=Math.abs(my-w.yBase);
          const fac=Math.max(0,1-distY*2);
          const y=H*w.yBase+Math.sin(x*w.freq+t+w.phase)*w.amp+Math.cos(x*w.freq*0.5-t*1.5)*(w.amp*0.3)+(inf*fac);
          pts.push(s===0?`M${x.toFixed(1)},${y.toFixed(1)}`:`L${x.toFixed(1)},${y.toFixed(1)}`);
        }
        path.setAttribute("d",pts.join(" "));
      });
      frameRef.current=requestAnimationFrame(tick);
    };
    frameRef.current=requestAnimationFrame(tick);
    return ()=>{ window.removeEventListener("mousemove",mv); cancelAnimationFrame(frameRef.current); };
  },[]);
  return (
    <div style={{ position:"absolute",inset:0,zIndex:1,pointerEvents:"none",overflow:"hidden" }}>
      <svg ref={svgRef} style={{ width:"100%",height:"100%" }}>
        <defs>
          {WAVES.map((_,i)=>(
            <filter key={i} id={`ng${i}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
        </defs>
        {WAVES.map((w,i)=>(
          <path key={i} className="wave" stroke={w.color} fill="none"
            strokeWidth={w.width} opacity={w.opacity} filter={`url(#ng${i})`}/>
        ))}
      </svg>
      <div style={{ position:"absolute",top:0,left:0,right:0,height:"30%",background:"linear-gradient(to bottom,#050508,transparent)" }}/>
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:"30%",background:"linear-gradient(to top,#050508,transparent)" }}/>
    </div>
  );
}

/* ==========================================================
   MAGNETIC BUTTON
========================================================== */
function Mag({ children, className, href, style, onClick, target, rel, download }) {
  const ref = useRef(null);
  const mv  = (e) => {
    const r=ref.current.getBoundingClientRect();
    ref.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)*0.35}px,${(e.clientY-r.top-r.height/2)*0.35}px)`;
    ref.current.style.transition="transform 0.1s ease-out";
  };
  const lv = () => { ref.current.style.transform="translate(0,0)"; ref.current.style.transition="transform 0.6s cubic-bezier(0.23,1,0.32,1)"; };
  const Tag = href ? "a" : "button";
  return (
    <Tag ref={ref} href={href} onClick={onClick} className={`interactive ${className||""}`}
      target={target} rel={rel} download={download}
      onMouseMove={mv} onMouseLeave={lv}
      style={{ display:"inline-block",cursor:"pointer",...style }}>
      {children}
    </Tag>
  );
}

/* ==========================================================
   REVEAL + TILT
========================================================== */
function Reveal({ children, delay=0, threshold=0.12 }) {
  const ref=useRef(null);
  const [vis,setVis]=useState(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{threshold});
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[threshold]);
  return (
    <div ref={ref} style={{ opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(50px)",transition:`all 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function Tilt({ children, style, className }) {
  const ref  =useRef(null);
  const shine=useRef(null);
  const mv=(e)=>{
    if(!ref.current) return;
    const r=ref.current.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    ref.current.style.transform=`perspective(1000px) rotateX(${-y*8}deg) rotateY(${x*8}deg) scale3d(1.02,1.02,1.02)`;
    if(shine.current){ shine.current.style.opacity=1; shine.current.style.background=`radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%,rgba(255,255,255,0.1) 0%,transparent 60%)`; }
  };
  const lv=()=>{
    if(!ref.current) return;
    ref.current.style.transform="perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    if(shine.current) shine.current.style.opacity=0;
  };
  return (
    <div ref={ref} onMouseMove={mv} onMouseLeave={lv} className={`interactive tilt-card ${className||""}`}
      style={{ transition:"transform 0.4s cubic-bezier(0.23,1,0.32,1)",position:"relative",...style }}>
      <div ref={shine} style={{ position:"absolute",inset:0,borderRadius:"inherit",pointerEvents:"none",zIndex:10,opacity:0,transition:"opacity 0.4s" }}/>
      {children}
    </div>
  );
}

function RotBadge({ text="• AVAILABLE •", size=140 }) {
  const chars=text.split(""), step=360/chars.length;
  return (
    <div className="interactive" style={{ width:size,height:size,position:"relative",animation:"spin 15s linear infinite" }}>
      {chars.map((ch,i)=>(
        <span key={i} style={{ position:"absolute",top:"50%",left:"50%",transform:`translate(-50%,-50%) rotate(${i*step}deg) translateY(${-(size/2-12)}px)`,fontSize:10,fontWeight:700,letterSpacing:2,color:"rgba(255,255,255,0.7)",fontFamily:"var(--font-head)" }}>{ch}</span>
      ))}
      <div style={{ position:"absolute",inset:"25%",borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,255,255,0.1),rgba(255,255,255,0.02))",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24 }}>✧</div>
    </div>
  );
}

function Marquee({ items, speed=40, reverse=false }) {
  const arr=[...items,...items,...items,...items];
  return (
    <div style={{ overflow:"hidden",display:"flex",width:"100%",background:"rgba(255,255,255,0.02)",borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)",padding:"24px 0" }}>
      <div style={{ display:"flex",gap:60,animation:`${reverse?"mRight":"mLeft"} ${speed}s linear infinite`,willChange:"transform" }}>
        {arr.map((it,i)=>(
          <span key={i} style={{ fontSize:14,fontWeight:700,opacity:0.6,letterSpacing:3,textTransform:"uppercase",whiteSpace:"nowrap",fontFamily:"var(--font-head)",display:"flex",alignItems:"center",gap:60 }}>
            {it} <span style={{ opacity:0.5,color:"var(--accent)" }}>✧</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================
   PROJECT CARD + MODAL
========================================================== */
function ProjectCard({ project, index, onOpen }) {
  return (
    <Reveal delay={index*150}>
      <Tilt style={{ background:"rgba(15,15,20,0.6)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:24,padding:32,display:"flex",flexDirection:"column",gap:24,height:"100%",backdropFilter:"blur(20px)" }}>
        <div onClick={()=>onOpen(project)} style={{ aspectRatio:"16/9",borderRadius:16,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)",position:"relative",overflow:"hidden",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div style={{ fontSize:40,opacity:0.2 }}>📷</div>
          <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)",opacity:0.6 }}/>
          <div style={{ position:"absolute",bottom:16,right:16,padding:"8px 16px",background:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",borderRadius:100,fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",color:"white",border:"1px solid rgba(255,255,255,0.2)" }}>View Details ↗</div>
          <div style={{ position:"absolute",top:16,left:16,fontSize:12,fontWeight:800,fontFamily:"var(--font-head)",color:"rgba(255,255,255,0.4)" }}>0{index+1}</div>
        </div>
        <div style={{ flex:1,display:"flex",flexDirection:"column" }}>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:16 }}>
            <span style={{ padding:"4px 12px",background:"rgba(167,139,250,0.1)",color:"#c4b5fd",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",borderRadius:100,border:"1px solid rgba(167,139,250,0.2)" }}>{project.tag}</span>
            <span style={{ padding:"4px 12px",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.6)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",borderRadius:100 }}>{project.sub}</span>
          </div>
          <h3 style={{ fontFamily:"var(--font-head)",fontSize:24,fontWeight:800,lineHeight:1.2,marginBottom:12 }}>{project.title}</h3>
          <p style={{ fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.6,marginBottom:20,fontWeight:300 }}>{project.desc}</p>
          <div style={{ padding:"12px 16px",background:"rgba(255,255,255,0.02)",borderLeft:"2px solid var(--accent)",borderRadius:"0 8px 8px 0",fontSize:13,color:"rgba(255,255,255,0.7)",fontStyle:"italic",marginBottom:28 }}>
            <strong style={{ color:"white",fontStyle:"normal" }}>Impact: </strong>{project.impact}
          </div>
          <div style={{ display:"flex",gap:12,marginTop:"auto",flexWrap:"wrap" }}>
            {project.link&&<a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-primary interactive" style={{ padding:"10px 24px",fontSize:12 }}>Live Demo ↗</a>}
            {project.ghLink&&<a href={project.ghLink} target="_blank" rel="noopener noreferrer" className="btn-secondary interactive" style={{ padding:"10px 24px",fontSize:12 }}>GitHub ↗</a>}
          </div>
        </div>
      </Tilt>
    </Reveal>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(()=>{
    const esc=(e)=>{ if(e.key==="Escape") onClose(); };
    window.addEventListener("keydown",esc);
    document.body.style.overflow="hidden";
    return ()=>{ window.removeEventListener("keydown",esc); document.body.style.overflow=""; };
  },[onClose]);
  return (
    <div style={{ position:"fixed",inset:0,zIndex:10000,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
      <div className="interactive" onClick={onClose} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,0.8)",backdropFilter:"blur(16px)",cursor:"pointer" }}/>
      <div style={{ position:"relative",zIndex:1,background:"#0c0c11",border:"1px solid rgba(255,255,255,0.1)",borderRadius:24,maxWidth:800,width:"100%",maxHeight:"90vh",overflowY:"auto",padding:48,boxShadow:"0 40px 100px rgba(0,0,0,0.8)",animation:"revealUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
        <button className="interactive" onClick={onClose} style={{ position:"absolute",top:24,right:24,width:40,height:40,borderRadius:"50%",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",color:"white",fontSize:20,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center" }} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"} onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}>✕</button>
        <div style={{ display:"flex",gap:12,marginBottom:24,flexWrap:"wrap" }}>
          <span style={{ padding:"6px 16px",background:"rgba(167,139,250,0.15)",color:"#c4b5fd",fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",borderRadius:100 }}>{project.tag}</span>
          <span style={{ padding:"6px 16px",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,letterSpacing:1,textTransform:"uppercase",borderRadius:100 }}>{project.sub}</span>
        </div>
        <h2 style={{ fontFamily:"var(--font-head)",fontSize:"clamp(2rem,4vw,3rem)",fontWeight:800,lineHeight:1.1,marginBottom:20 }}>{project.title}</h2>
        <p style={{ fontSize:16,color:"rgba(255,255,255,0.6)",lineHeight:1.8,marginBottom:32,fontWeight:300 }}>{project.desc}</p>
        <div style={{ padding:24,background:"rgba(167,139,250,0.05)",border:"1px solid rgba(167,139,250,0.15)",borderRadius:16,marginBottom:40 }}>
          <h4 style={{ fontFamily:"var(--font-head)",fontSize:14,textTransform:"uppercase",letterSpacing:2,color:"#a78bfa",marginBottom:12 }}>Metrics & Impact</h4>
          <p style={{ fontSize:15,color:"white",lineHeight:1.6 }}>{project.impact}</p>
        </div>
        <div style={{ marginBottom:40 }}>
          <h4 style={{ fontFamily:"var(--font-head)",fontSize:12,textTransform:"uppercase",letterSpacing:2,color:"rgba(255,255,255,0.4)",marginBottom:16 }}>Technologies</h4>
          <div style={{ display:"flex",gap:10,flexWrap:"wrap" }}>
            {project.stack.map(s=><span key={s} style={{ padding:"8px 16px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:8,fontSize:13,color:"rgba(255,255,255,0.8)" }}>{s}</span>)}
          </div>
        </div>
        <div style={{ display:"flex",gap:16,borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:32 }}>
          {project.link&&<Mag className="btn-primary" href={project.link} target="_blank" rel="noopener noreferrer">View Live ↗</Mag>}
          {project.ghLink&&<Mag className="btn-secondary" href={project.ghLink} target="_blank" rel="noopener noreferrer">Source Code ↗</Mag>}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   ★ ANIMATED TECH STACK — icon-based chips
   Icons via https://cdn.simpleicons.org/<slug>/<hex>
========================================================== */
const STACK_GROUPS = [
  {
    id:"dl", label:"Deep Learning & CV",
    color:"rgba(167,139,250,0.12)", border:"rgba(167,139,250,0.25)", accent:"#a78bfa", icon:"🧠",
    skills:[
      { name:"PyTorch",          note:"Primary DL framework",   logo:"https://cdn.simpleicons.org/pytorch/EE4C2C" },
      { name:"TensorFlow",       note:"Model deployment",       logo:"https://cdn.simpleicons.org/tensorflow/FF6F00" },
      { name:"YOLOv8",           note:"Object detection",       logo:"https://cdn.simpleicons.org/yolo/00FFFF" },
      { name:"OpenCV",           note:"Computer vision",        logo:"https://cdn.simpleicons.org/opencv/5C3EE8" },
      { name:"CNNs / ResNet",    note:"Architecture design",    logo:"https://cdn.simpleicons.org/pytorch/EE4C2C" },
      { name:"HuggingFace",      note:"Model hub & transformers",logo:"https://cdn.simpleicons.org/huggingface/FFD21E" },
    ],
  },
  {
    id:"nlp", label:"NLP & RAG",
    color:"rgba(96,165,250,0.12)", border:"rgba(96,165,250,0.25)", accent:"#60a5fa", icon:"⛓️",
    skills:[
      { name:"LangChain",        note:"RAG pipelines",          logo:"https://cdn.simpleicons.org/langchain/1C3C3C" },
      { name:"FAISS",            note:"Vector search",          logo:"https://cdn.simpleicons.org/meta/0081FB" },
      { name:"HuggingFace",      note:"Transformers / Hub",     logo:"https://cdn.simpleicons.org/huggingface/FFD21E" },
      { name:"Streamlit",        note:"ML app deployment",      logo:"https://cdn.simpleicons.org/streamlit/FF4B4B" },
      { name:"Google Gemini",    note:"Multimodal LLM API",     logo:"https://cdn.simpleicons.org/googlegemini/8E75B2" },
      { name:"OpenAI",           note:"GPT integration",        logo:"https://cdn.simpleicons.org/openai/412991" },
    ],
  },
  {
    id:"ml", label:"Machine Learning",
    color:"rgba(52,211,153,0.10)", border:"rgba(52,211,153,0.22)", accent:"#34d399", icon:"⚙️",
    skills:[
      { name:"Scikit-learn",     note:"ML swiss army knife",    logo:"https://cdn.simpleicons.org/scikitlearn/F7931E" },
      { name:"Random Forest",    note:"Ensemble methods",       logo:"https://cdn.simpleicons.org/scikitlearn/F7931E" },
      { name:"SVM / KNN",        note:"Classification",         logo:"https://cdn.simpleicons.org/scikitlearn/F7931E" },
      { name:"Logistic Reg",     note:"Regression & classification", logo:"https://cdn.simpleicons.org/scikitlearn/F7931E" },
      { name:"Decision Trees",   note:"Interpretable ML",       logo:"https://cdn.simpleicons.org/scikitlearn/F7931E" },
      { name:"XGBoost",          note:"Gradient boosting",      logo:"https://cdn.simpleicons.org/xgboost/189FDD" },
    ],
  },
  {
    id:"ds", label:"Data Science & Analytics",
    color:"rgba(251,191,36,0.10)", border:"rgba(251,191,36,0.22)", accent:"#fbbf24", icon:"📊",
    skills:[
      { name:"NumPy",            note:"Numerical ops",          logo:"https://cdn.simpleicons.org/numpy/013243" },
      { name:"Pandas",           note:"EDA & data cleaning",    logo:"https://cdn.simpleicons.org/pandas/150458" },
      { name:"Matplotlib",       note:"Data visualization",     logo:"https://cdn.simpleicons.org/matplotlib/11557C" },
      { name:"Seaborn",          note:"Statistical plots",      logo:"https://cdn.simpleicons.org/python/3776AB" },
      { name:"Power BI",         note:"Business dashboards",    logo:"https://cdn.simpleicons.org/powerbi/F2C811" },
      { name:"Jupyter Notebook", note:"Research & experimentation", logo:"https://cdn.simpleicons.org/jupyter/F37626" },
    ],
  },
  {
    id:"mlops", label:"MLOps & Backend",
    color:"rgba(244,114,182,0.10)", border:"rgba(244,114,182,0.22)", accent:"#f472b6", icon:"🐳",
    skills:[
      { name:"Docker",           note:"Containerization",       logo:"https://cdn.simpleicons.org/docker/2496ED" },
      { name:"Flask",            note:"Web backend / API",      logo:"https://cdn.simpleicons.org/flask/FFFFFF" },
      { name:"FastAPI",          note:"High-perf API serving",  logo:"https://cdn.simpleicons.org/fastapi/009688" },
      { name:"Supabase",         note:"Database + auth",        logo:"https://cdn.simpleicons.org/supabase/3ECF8E" },
      { name:"Hugging Face Spaces", note:"Model hosting",       logo:"https://cdn.simpleicons.org/huggingface/FFD21E" },
      { name:"Joblib",           note:"Model serialization",    logo:"https://cdn.simpleicons.org/python/3776AB" },
    ],
  },
  {
    id:"tools", label:"Languages & Tools",
    color:"rgba(167,139,250,0.08)", border:"rgba(167,139,250,0.18)", accent:"#c4b5fd", icon:"🛠️",
    skills:[
      { name:"Python",           note:"Core language",          logo:"https://cdn.simpleicons.org/python/3776AB" },
      { name:"SQL",              note:"Data queries",           logo:"https://cdn.simpleicons.org/mysql/4479A1" },
      { name:"Git & GitHub",     note:"Version control",        logo:"https://cdn.simpleicons.org/github/FFFFFF" },
      { name:"Google Colab",     note:"Cloud notebooks",        logo:"https://cdn.simpleicons.org/googlecolab/F9AB00" },
      { name:"VS Code",          note:"Primary IDE",            logo:"https://cdn.simpleicons.org/visualstudiocode/007ACC" },
      { name:"Streamlit",        note:"ML app deployment",      logo:"https://cdn.simpleicons.org/streamlit/FF4B4B" },
    ],
  },
];

/* SkillChip — icon + name + note, no bar, no percentage */
function SkillChip({ name, note, logo, accent, delay }) {
  const [hov, setHov] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(()=>{
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVis(true); },{ threshold:0.1 });
    if(ref.current) obs.observe(ref.current);
    return ()=>obs.disconnect();
  },[]);

  // derive a single-letter fallback from name
  const fallbackLetter = name.charAt(0).toUpperCase();

  return (
    <div ref={ref}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:"flex", alignItems:"center", gap:14,
        padding:"14px 18px", borderRadius:16,
        background: hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
        transition:"all 0.35s cubic-bezier(0.23,1,0.32,1)",
        cursor:"default",
        transform: vis ? (hov ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)") : "translateY(16px) scale(0.95)",
        opacity: vis ? 1 : 0,
        transitionDelay: vis ? `${delay}ms` : "0ms",
        boxShadow: hov ? `0 8px 28px rgba(0,0,0,0.35), 0 0 0 1px ${accent}33` : "none",
      }}>

      {/* Logo or fallback */}
      <div style={{
        width:38, height:38, borderRadius:10, flexShrink:0,
        background: imgErr ? `${accent}22` : "rgba(255,255,255,0.06)",
        border:`1px solid ${hov ? accent+"44" : "rgba(255,255,255,0.08)"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        overflow:"hidden", transition:"border-color 0.3s",
        padding: imgErr ? 0 : 6,
      }}>
        {imgErr ? (
          <span style={{ fontSize:16, fontWeight:800, color:accent, fontFamily:"var(--font-head)" }}>{fallbackLetter}</span>
        ) : (
          <img
            src={logo}
            alt={name}
            onError={()=>setImgErr(true)}
            style={{ width:"100%", height:"100%", objectFit:"contain", filter: hov ? "none" : "brightness(0.85)" }}
          />
        )}
      </div>

      {/* Text */}
      <div style={{ minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:700, color: hov ? "white" : "rgba(255,255,255,0.85)", transition:"color 0.3s", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{name}</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.36)", marginTop:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{note}</div>
      </div>
    </div>
  );
}

function StackSection() {
  const [activeTab, setActiveTab] = useState("dl");
  const active = STACK_GROUPS.find(g=>g.id===activeTab);

  return (
    <section id="skills" style={{ padding:"160px 64px", position:"relative", zIndex:2 }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontSize:12, letterSpacing:4, textTransform:"uppercase", color:"rgba(255,255,255,0.36)", marginBottom:16 }}>Arsenal</p>
          <h2 className="heading-section" style={{ marginBottom:16 }}>
            Tech <span className="text-accent">Stack.</span>
          </h2>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.4)", fontWeight:300, marginBottom:56, maxWidth:520 }}>
            Tools I've used to build, train, and ship production AI systems.
          </p>
        </Reveal>

        {/* Tab pills */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:48 }}>
          {STACK_GROUPS.map(g=>(
            <button key={g.id} onClick={()=>setActiveTab(g.id)}
              style={{
                padding:"10px 22px", borderRadius:100, fontSize:12, fontWeight:700,
                letterSpacing:1, textTransform:"uppercase", cursor:"pointer",
                fontFamily:"var(--font-head)", border:"none",
                background: activeTab===g.id ? g.accent : "rgba(255,255,255,0.05)",
                color:      activeTab===g.id ? "#050508" : "rgba(255,255,255,0.55)",
                boxShadow:  activeTab===g.id ? `0 0 28px ${g.accent}55` : "none",
                transition:"all 0.3s cubic-bezier(0.23,1,0.32,1)",
                transform:  activeTab===g.id ? "scale(1.06)" : "scale(1)",
              }}>
              {g.icon} {g.label}
            </button>
          ))}
        </div>

        {/* Active panel */}
        <div key={activeTab} style={{
          background:`linear-gradient(135deg,${active.color},rgba(255,255,255,0.02))`,
          border:`1px solid ${active.border}`,
          borderRadius:28, padding:48, backdropFilter:"blur(24px)",
          animation:"fadeSlideIn 0.45s cubic-bezier(0.16,1,0.3,1)",
          position:"relative", overflow:"hidden",
        }}>
          {/* bg orb */}
          <div style={{ position:"absolute", top:-80, right:-80, width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle,${active.accent}22,transparent 70%)`, filter:"blur(60px)", pointerEvents:"none" }}/>

          {/* Panel header */}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:36 }}>
            <span style={{ fontSize:36 }}>{active.icon}</span>
            <div>
              <h3 style={{ fontFamily:"var(--font-head)", fontSize:26, fontWeight:800, color:active.accent }}>{active.label}</h3>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginTop:4 }}>{active.skills.length} tools</p>
            </div>
          </div>

          {/* Chip grid — 3 columns for wider feel */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {active.skills.map((s,i)=>(
              <SkillChip key={s.name} {...s} accent={active.accent} delay={i*60} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   ★ ANIMATED EXPERIENCE TIMELINE
========================================================== */
const EXPERIENCES = [
  {
    period:"2024",
    role:"Artificial Intelligence Intern",
    co:"GlowLogics Solutions",
    type:"Internship",
    color:"#a78bfa",
    bullets:[
      "Developed supervised learning pipelines — classification & regression using Scikit-learn and Python for internal ML proof-of-concept projects.",
      "Applied unsupervised techniques: K-Means clustering and PCA-based dimensionality reduction to extract patterns from unlabelled datasets.",
      "Built and trained deep learning models using PyTorch — feed-forward networks and CNNs for image classification tasks.",
      "End-to-end ML workflow: data preprocessing, feature engineering, cross-validation, and performance evaluation (ROC-AUC, F1-Score).",
    ],
  },
  {
    period:"2024",
    role:"Lead ML Engineer",
    co:"SteelSense AI",
    type:"Project",
    color:"#60a5fa",
    bullets:[
      "Engineered real-time steel surface defect detection using YOLOv8 — classifies 6 defect types with confidence scoring.",
      "Built production REST API with Flask; integrated Gemini Vision API for intelligent defect explanation.",
      "Containerized with Docker and deployed on Hugging Face Spaces — publicly live and accessible.",
    ],
  },
  {
    period:"2024",
    role:"ML Engineer",
    co:"BurnoutIQ Predictor",
    type:"Project",
    color:"#34d399",
    bullets:[
      "End-to-end ML pipeline predicting employee burnout risk from workplace and AI adoption data.",
      "Evaluated SVM, Random Forest, and Naive Bayes — selected best model via F1-Score & RMSLE, serialized with Joblib.",
      "Deployed as an interactive Streamlit dashboard on Streamlit Cloud.",
    ],
  },
  {
    period:"2024",
    role:"Deep Learning Researcher",
    co:"PyTorch DL Projects",
    type:"Research",
    color:"#f472b6",
    bullets:[
      "Implemented CNN architectures, training loops with validation, early stopping, and model checkpointing from scratch.",
      "Applied transfer learning with ResNet for image classification; studied autograd, gradient descent, and loss functions in depth.",
    ],
  },
];

function ExperienceSection() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="experience" style={{ padding:"160px 64px",position:"relative",zIndex:2,background:"rgba(255,255,255,0.01)",borderTop:"1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth:1200,margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:16 }}>Journey</p>
          <h2 className="heading-section" style={{ marginBottom:60 }}>
            Engineering <span className="text-accent">Experience.</span>
          </h2>
        </Reveal>

        <div style={{ display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:48,alignItems:"start" }} className="skills-exp-grid">
          {/* Left — timeline list */}
          <div style={{ display:"flex",flexDirection:"column",gap:4 }}>
            {EXPERIENCES.map((e,i)=>(
              <Reveal key={i} delay={i*80}>
                <div onClick={()=>setOpenIdx(i)}
                  style={{
                    padding:"24px 28px",borderRadius:20,cursor:"pointer",position:"relative",
                    background: openIdx===i ? `linear-gradient(135deg,${e.color}18,rgba(255,255,255,0.04))` : "rgba(255,255,255,0.02)",
                    border: openIdx===i ? `1px solid ${e.color}44` : "1px solid rgba(255,255,255,0.06)",
                    transition:"all 0.4s cubic-bezier(0.23,1,0.32,1)",
                    transform: openIdx===i ? "translateX(6px)" : "translateX(0)",
                    marginBottom:8,
                  }}>
                  {/* Active indicator bar */}
                  {openIdx===i && (
                    <div style={{ position:"absolute",left:0,top:"20%",bottom:"20%",width:3,borderRadius:100,background:e.color,boxShadow:`0 0 12px ${e.color}88` }}/>
                  )}
                  <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:6 }}>
                    <span style={{ fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:e.color,
                      padding:"3px 10px",borderRadius:100,background:`${e.color}18`,border:`1px solid ${e.color}33` }}>
                      {e.type}
                    </span>
                    <span style={{ fontSize:12,color:"rgba(255,255,255,0.3)" }}>{e.period}</span>
                  </div>
                  <h4 style={{ fontFamily:"var(--font-head)",fontSize:18,fontWeight:700,color:openIdx===i?"white":"rgba(255,255,255,0.7)",transition:"color 0.3s",marginBottom:4 }}>{e.role}</h4>
                  <p style={{ fontSize:13,color:openIdx===i?e.color:"rgba(255,255,255,0.35)",transition:"color 0.3s",fontWeight:500 }}>{e.co}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right — detail panel */}
          <div key={openIdx} style={{
            background:`linear-gradient(135deg,${EXPERIENCES[openIdx].color}14,rgba(255,255,255,0.02))`,
            border:`1px solid ${EXPERIENCES[openIdx].color}33`,
            borderRadius:28,padding:44,backdropFilter:"blur(24px)",
            animation:"fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1)",
            position:"sticky",top:120,
          }}>
            {/* Header */}
            <div style={{ marginBottom:32 }}>
              <div style={{ display:"inline-flex",alignItems:"center",gap:10,padding:"6px 16px",borderRadius:100,background:`${EXPERIENCES[openIdx].color}18`,border:`1px solid ${EXPERIENCES[openIdx].color}33`,marginBottom:20 }}>
                <div style={{ width:8,height:8,borderRadius:"50%",background:EXPERIENCES[openIdx].color,boxShadow:`0 0 10px ${EXPERIENCES[openIdx].color}` }}/>
                <span style={{ fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:EXPERIENCES[openIdx].color }}>{EXPERIENCES[openIdx].type} · {EXPERIENCES[openIdx].period}</span>
              </div>
              <h3 style={{ fontFamily:"var(--font-head)",fontSize:"clamp(1.5rem,3vw,2.2rem)",fontWeight:800,lineHeight:1.15,marginBottom:8 }}>{EXPERIENCES[openIdx].role}</h3>
              <p style={{ fontSize:15,color:EXPERIENCES[openIdx].color,fontWeight:600,letterSpacing:0.5 }}>{EXPERIENCES[openIdx].co}</p>
            </div>

            {/* Bullets */}
            <div style={{ display:"flex",flexDirection:"column",gap:16 }}>
              {EXPERIENCES[openIdx].bullets.map((b,j)=>(
                <div key={j} style={{ display:"flex",gap:16,alignItems:"flex-start",padding:"16px 20px",background:"rgba(255,255,255,0.03)",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",
                  animation:`fadeSlideIn 0.5s cubic-bezier(0.16,1,0.3,1) ${j*80}ms both` }}>
                  <div style={{ width:6,height:6,borderRadius:"50%",background:EXPERIENCES[openIdx].color,flexShrink:0,marginTop:7,boxShadow:`0 0 8px ${EXPERIENCES[openIdx].color}` }}/>
                  <p style={{ fontSize:14,color:"rgba(255,255,255,0.65)",lineHeight:1.8,fontWeight:300 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   ★ CONTACT SECTION — standalone, full links
========================================================== */
function ContactSection() {
  const links = [
    { label:"Email",       val:"aishwaryajoshi554@gmail.com", icon:"✉", href:"mailto:aishwaryajoshi554@gmail.com", color:"#a78bfa" },
    { label:"LinkedIn",    val:"/aishwaryajoshiaiml",         icon:"🔗", href:"https://linkedin.com/in/aishwaryajoshiaiml",                     color:"#60a5fa" },
    { label:"GitHub",      val:"/Aishwarya-J05",              icon:"⚡", href:"https://github.com/Aishwarya-J05",                               color:"#f472b6" },
    { label:"HuggingFace", val:"/AishwaryaNJ",                icon:"🤗", href:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai",         color:"#fbbf24" },
  ];

  return (
    <section id="contact" style={{ padding:"200px 64px",position:"relative",zIndex:2,overflow:"hidden" }}>
      {/* Big background word */}
      <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"clamp(6rem,18vw,14rem)",fontFamily:"var(--font-head)",fontWeight:800,color:"rgba(255,255,255,0.018)",pointerEvents:"none",whiteSpace:"nowrap",letterSpacing:-10,userSelect:"none" }}>CONNECT</div>

      {/* Decorative orbs */}
      <div style={{ position:"absolute",top:"20%",left:"5%",width:350,height:350,borderRadius:"50%",background:"radial-gradient(circle,rgba(167,139,250,0.1),transparent 70%)",filter:"blur(80px)",animation:"contactOrb 10s ease-in-out infinite",pointerEvents:"none" }}/>
      <div style={{ position:"absolute",bottom:"15%",right:"5%",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(96,165,250,0.08),transparent 70%)",filter:"blur(80px)",animation:"contactOrb 14s ease-in-out infinite reverse",pointerEvents:"none" }}/>

      <div style={{ maxWidth:900,margin:"0 auto",position:"relative",zIndex:1 }}>
        <Reveal>
          <div style={{ display:"flex",justifyContent:"center",marginBottom:40 }}>
            <RotBadge text="• OPEN FOR ROLES • LET'S COLLABORATE • " size={120}/>
          </div>
          <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",textAlign:"center",marginBottom:20 }}>Get In Touch</p>
          <h2 className="heading-section" style={{ textAlign:"center",marginBottom:24 }}>
            Ready to engineer<br/>the <span className="text-accent">future.</span>
          </h2>
          <p style={{ fontSize:18,color:"rgba(255,255,255,0.45)",textAlign:"center",fontWeight:300,lineHeight:1.7,marginBottom:20 }}>
            Actively seeking AI/ML engineer roles & internships for 2026.
          </p>

          {/* Big email link */}
          <div style={{ textAlign:"center",marginBottom:72 }}>
            <a href="mailto:aishwaryajoshi554@gmail.com"
              style={{ display:"inline-block",fontSize:"clamp(1rem,3.5vw,2rem)",fontFamily:"var(--font-head)",fontWeight:800,
                background:"linear-gradient(130deg,#a78bfa,#60a5fa,#f472b6)",
                WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
                backgroundSize:"200%",animation:"bgShift 5s ease infinite",
                letterSpacing:-0.5,borderBottom:"2px solid rgba(167,139,250,0.3)",paddingBottom:6,
                transition:"border-color 0.3s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(167,139,250,0.8)"}
              onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(167,139,250,0.3)"}>
              aishwaryajoshi554@gmail.com ↗
            </a>
          </div>

          {/* 4 link cards */}
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:56 }}>
            {links.map((lk,i)=>(
              <Reveal key={lk.label} delay={i*80}>
                <a href={lk.href} target={lk.href.startsWith("mailto")?"_self":"_blank"} rel="noopener noreferrer"
                  style={{ display:"block",textDecoration:"none" }}>
                  <Tilt style={{
                    padding:"28px 32px",borderRadius:22,
                    background:`linear-gradient(135deg,${lk.color}0f,rgba(255,255,255,0.02))`,
                    border:`1px solid ${lk.color}33`,backdropFilter:"blur(16px)",
                    transition:"all 0.35s cubic-bezier(0.23,1,0.32,1)",cursor:"pointer",
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${lk.color}66`; e.currentTarget.style.boxShadow=`0 20px 60px ${lk.color}22`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor=`${lk.color}33`; e.currentTarget.style.boxShadow="none"; }}>
                    <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 }}>
                      <span style={{ fontSize:30 }}>{lk.icon}</span>
                      <span style={{ fontSize:20,color:"rgba(255,255,255,0.25)",transition:"color 0.3s" }}>↗</span>
                    </div>
                    <div style={{ fontSize:11,letterSpacing:2.5,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:8 }}>{lk.label}</div>
                    <div style={{ fontSize:14,fontWeight:600,color:"rgba(255,255,255,0.82)",wordBreak:"break-all" }}>{lk.val}</div>
                    <div style={{ marginTop:16,height:2,borderRadius:100,background:`linear-gradient(90deg,${lk.color},transparent)`,opacity:0.5 }}/>
                  </Tilt>
                </a>
              </Reveal>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display:"flex",justifyContent:"center",gap:16,flexWrap:"wrap" }}>
            <Mag href="mailto:aishwaryajoshi554@gmail.com" className="btn-primary" style={{ padding:"16px 44px",fontSize:14 }}>✉ Send Email</Mag>
            <Mag href="https://linkedin.com/in/aishwaryajoshiaiml" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding:"16px 40px" }}>LinkedIn ↗</Mag>
            <Mag href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding:"16px 40px" }}>GitHub ↗</Mag>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ==========================================================
   MAIN
========================================================== */
export default function Portfolio() {
  const [scroll,setScroll]=useState(0);
  const [activeProject,setActiveProject]=useState(null);

  useEffect(()=>{
    const fn=()=>setScroll(window.scrollY);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const navBlur = scroll>50;
  const PDF     = "/Aishwarya_Joshi_Resume.pdf";

  const mqTop = ["Artificial Intelligence","Computer Vision","Deep Learning","NLP","RAG Systems","Data Science"];
  const mqBot = ["Python","PyTorch","YOLOv8","Docker","Scikit-learn","LangChain","FAISS","Pandas"];

  const projects = [
    {
      title:"SteelSense AI",tag:"Computer Vision",sub:"YOLOv8",
      desc:"End-to-end industrial steel surface defect detection. YOLOv8 for real-time bounding box detection, integrated with Gemini Vision API for natural language defect explanation and Supabase for persistent inspection records.",
      impact:"94%+ classification accuracy with sub-100ms inference time for high-speed manufacturing environments.",
      stack:["Python","PyTorch","YOLOv8","Flask","Gemini Vision API","Supabase","Docker","HuggingFace"],
      link:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai",ghLink:"https://github.com/Aishwarya-J05",
    },
    {
      title:"ArXiv RAG Chatbot",tag:"NLP / RAG",sub:"LangChain",
      desc:"Intelligent retrieval-augmented generation system designed to parse, index, and converse with dense ArXiv research papers. FAISS vector store for semantic search with source-grounded responses.",
      impact:"Reduces research synthesis time dramatically by extracting exact citations from 1000+ AI papers.",
      stack:["Python","LangChain","FAISS","HuggingFace Embeddings","Streamlit","LLMs"],
      link:"https://github.com/Aishwarya-J05",ghLink:"https://github.com/Aishwarya-J05",
    },
    {
      title:"BurnoutIQ",tag:"Machine Learning",sub:"Scikit-learn",
      desc:"Full predictive pipeline evaluating employee burnout risk and productivity scores from workplace and AI adoption metrics. Trained and compared SVM, Random Forest, and Naive Bayes models.",
      impact:"Automates workforce analytics — deployed highest F1-Score model as live interactive Streamlit dashboard.",
      stack:["Python","Pandas","Scikit-learn","SVM","Random Forest","Joblib","Streamlit"],
      link:"https://burnoutiq.streamlit.app",ghLink:"https://github.com/Aishwarya-J05",
    },
    {
      title:"Foundations of DL",tag:"Deep Learning",sub:"PyTorch",
      desc:"Core deep learning mechanics from scratch — custom CNN architectures, full training & validation loops, early stopping, model checkpointing, dropout, and transfer learning with ResNet.",
      impact:"Demonstrates foundational architectural understanding rather than relying solely on high-level APIs.",
      stack:["PyTorch","CNNs","ResNet","Transfer Learning","NumPy"],
      link:"https://github.com/Aishwarya-J05",ghLink:"https://github.com/Aishwarya-J05",
    },
  ];

  return (
    <>
      <GlobalStyles/>
      <GlowGrid/>
      <div className="noise-bg"/>
      <Cursor/>

      {/* Orbs */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-10%",right:"10%",width:"50vw",height:"50vw",background:"radial-gradient(circle,rgba(96,165,250,0.06),transparent 70%)",borderRadius:"50%",filter:"blur(80px)",animation:"floatOrb 12s ease-in-out infinite" }}/>
        <div style={{ position:"absolute",bottom:"-10%",left:"0%",width:"40vw",height:"40vw",background:"radial-gradient(circle,rgba(167,139,250,0.06),transparent 70%)",borderRadius:"50%",filter:"blur(80px)",animation:"floatOrb 15s ease-in-out infinite reverse" }}/>
      </div>

      {activeProject && <ProjectModal project={activeProject} onClose={()=>setActiveProject(null)}/>}

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"24px 64px",display:"flex",justifyContent:"space-between",alignItems:"center",background:navBlur?"rgba(5,5,8,0.85)":"transparent",backdropFilter:navBlur?"blur(20px)":"none",borderBottom:navBlur?"1px solid rgba(255,255,255,0.05)":"1px solid transparent",transition:"all 0.4s" }}>
        <div style={{ fontFamily:"var(--font-head)",fontWeight:800,fontSize:22,letterSpacing:-1 }}>
          <span className="text-accent">AI</span><span>shwarya.</span>
        </div>
        <div className="nav-links" style={{ display:"flex",gap:32,alignItems:"center" }}>
          {["Work","About","Skills","Experience","Contact"].map(s=>(
            <a key={s} href={`#${s.toLowerCase()}`} className="nav-link">{s}</a>
          ))}
          <a href={PDF} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color:"var(--accent)",opacity:0.8 }}>Resume</a>
          <Mag href="#contact" className="btn-primary" style={{ padding:"10px 24px",fontSize:12,marginLeft:16 }}>Available For Hire</Mag>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",padding:"0 64px" }}>
        <NeonWaves/>
        <div style={{ position:"absolute",top:"25%",right:"10%",zIndex:10 }}>
          <RotBadge text="• AI ENGINEER • AVAILABLE 2026 • " size={160}/>
        </div>
        <div style={{ position:"relative",zIndex:5,maxWidth:1000,width:"100%",margin:"0 auto",marginTop:"10vh" }}>
          <div style={{ animation:"revealUp 1s cubic-bezier(0.16,1,0.3,1) both" }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:12,padding:"8px 20px",background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:100,marginBottom:40 }}>
              <div style={{ width:8,height:8,borderRadius:"50%",background:"#4ade80",boxShadow:"0 0 12px rgba(74,222,128,0.8)",animation:"pulseSoft 2s infinite" }}/>
              <span style={{ fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.7)" }}>Graduating June 2026 · Open to Work</span>
            </div>
            <h1 className="heading-display text-gradient" style={{ marginBottom:12 }}>Building</h1>
            <h1 className="heading-display text-accent"    style={{ marginBottom:12 }}>Intelligent</h1>
            <h1 className="heading-display text-gradient"  style={{ marginBottom:40 }}>Systems.</h1>
            <p style={{ fontSize:"clamp(1.1rem,2vw,1.4rem)",color:"rgba(255,255,255,0.5)",lineHeight:1.8,maxWidth:660,marginBottom:48,fontWeight:300 }}>
              AI/ML Engineer specializing in Deep Learning & Computer Vision. I engineer robust models and deploy them into accessible, production-ready systems.
            </p>
            <div style={{ display:"flex",gap:20,flexWrap:"wrap" }}>
              <Mag href="#work"      className="btn-primary">Explore Work</Mag>
              <Mag href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub ↗</Mag>
            </div>
          </div>
        </div>
        <div style={{ position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:12,opacity:0.5,animation:"revealUp 1s ease 1s both" }}>
          <span style={{ fontSize:10,letterSpacing:4,textTransform:"uppercase",fontFamily:"var(--font-head)" }}>Scroll</span>
          <div style={{ width:1,height:40,background:"linear-gradient(to bottom,white,transparent)" }}/>
        </div>
      </section>

      <Marquee items={mqTop} speed={50}/>

      {/* WORK */}
      <section id="work" style={{ padding:"160px 64px",position:"relative",zIndex:2 }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:16 }}>Selected Projects</p>
            <h2 className="heading-section" style={{ marginBottom:80 }}>
              Work that <span className="text-accent">matters.</span>
            </h2>
          </Reveal>
          <div className="responsive-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:32 }}>
            {projects.map((p,i)=><ProjectCard key={p.title} project={p} index={i} onOpen={setActiveProject}/>)}
          </div>
        </div>
      </section>

      <Marquee items={mqBot} speed={40} reverse/>

      {/* ABOUT */}
      <section id="about" style={{ padding:"160px 64px",position:"relative",zIndex:2 }}>
        <div className="about-layout" style={{ maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:100,alignItems:"center" }}>
          <Reveal>
            <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:16 }}>About Me</p>
            <h2 className="heading-section" style={{ marginBottom:40 }}>Not just models.<br/><span className="text-accent">Systems.</span></h2>
            <div style={{ display:"flex",flexDirection:"column",gap:24,fontSize:17,color:"rgba(255,255,255,0.55)",lineHeight:1.85,fontWeight:300 }}>
              <p>I'm Aishwarya, a final-year B.Tech (ECE) student at VTU with a 9.41 CGPA. I bridge the gap between theoretical machine learning and scalable engineering.</p>
              <p>Many build notebooks. I build applications. Every project I ship is containerized, deployed, and publicly accessible — from real-time defect detection to RAG chatbots that understand dense research papers.</p>
            </div>
            <div style={{ display:"flex",gap:20,flexWrap:"wrap",marginTop:48 }}>
              <Mag href={PDF} target="_blank" rel="noopener noreferrer" className="btn-primary">View Resume</Mag>
              <Mag href="https://linkedin.com/in/aishwaryajoshiaiml" target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn ↗</Mag>
              <Mag href="https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai" target="_blank" rel="noopener noreferrer" className="btn-secondary">HuggingFace ↗</Mag>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Tilt style={{ borderRadius:32,padding:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)" }}>
              <img src={myPhoto} alt="Aishwarya Joshi" style={{ width:"100%",aspectRatio:"4/5",objectFit:"cover",objectPosition:"center top",borderRadius:24,display:"block" }}/>
              <div style={{ position:"absolute",bottom:-20,left:-20,padding:"24px",background:"rgba(10,10,15,0.95)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20 }}>
                <div style={{ fontFamily:"var(--font-head)",fontSize:40,fontWeight:800,lineHeight:1 }}>9.41</div>
                <div style={{ fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--accent)",marginTop:8 }}>CGPA · VTU</div>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* TECH STACK — animated tabs */}
      <StackSection/>

      {/* EXPERIENCE — interactive timeline */}
      <ExperienceSection/>

      {/* CONTACT — standalone section */}
      <ContactSection/>

      {/* FOOTER */}
      <footer style={{ padding:"40px 64px",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24,position:"relative",zIndex:10 }}>
        <div style={{ fontFamily:"var(--font-head)",fontSize:20,fontWeight:800 }}>
          <span className="text-accent">AI</span>shwarya.
        </div>
        <div style={{ fontSize:13,color:"rgba(255,255,255,0.4)",letterSpacing:1 }}>© 2026 · Crafted with Intent.</div>
        <div style={{ display:"flex",gap:24,alignItems:"center" }}>
          <a href={PDF} target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize:11 }}>Resume PDF</a>
          <a href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize:11 }}>GitHub</a>
          <a href="https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ fontSize:11 }}>HuggingFace</a>
          <a href={PDF} download="Aishwarya_Joshi_Resume.pdf"
            style={{ padding:"8px 18px",borderRadius:100,background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",fontSize:11,fontWeight:700,color:"#c4b5fd",letterSpacing:1,textDecoration:"none",transition:"all 0.3s" }}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(167,139,250,0.25)"}
            onMouseLeave={e=>e.currentTarget.style.background="rgba(167,139,250,0.12)"}>
            ↓ Download CV
          </a>
        </div>
      </footer>
    </>
  );
}