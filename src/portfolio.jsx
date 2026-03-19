import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
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
      font-size:3.6rem;
      line-height:1.1; letter-spacing:-0.01em;
    }
    .heading-section {
      font-family:var(--font-head); font-weight:800;
      font-size:2.4rem;
      line-height:1.18; letter-spacing:-0.01em;
    }
    @media(max-width:1024px) {
      .heading-display { font-size:2.8rem; }
      .heading-section { font-size:2rem; }
    }
    @media(max-width:768px) {
      .heading-display { font-size:2.2rem; }
      .heading-section { font-size:1.7rem; }
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
      position:fixed; inset:0; pointer-events:none; z-index:1;
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

    /* ── Responsive ── */
    @media(max-width:1280px) {
      .all-projects-grid { grid-template-columns:repeat(3,1fr) !important; }
    }
    @media(max-width:1024px) {
      .responsive-grid    { grid-template-columns:1fr 1fr !important; }
      .about-layout       { grid-template-columns:1fr !important; gap:48px !important; }
      .skills-exp-grid    { grid-template-columns:1fr !important; }
      .top-projects-grid  { grid-template-columns:1fr !important; }
      .all-projects-grid  { grid-template-columns:repeat(2,1fr) !important; }
      .hero-grid          { grid-template-columns:1fr !important; gap:40px !important; }
      .terminal-col       { display:none !important; }
      section             { padding:80px 40px !important; }
      .nav-links          { display:none !important; }
      .mobile-menu-btn    { display:flex !important; }
    }
    @media(max-width:768px) {
      .responsive-grid    { grid-template-columns:1fr !important; }
      .all-projects-grid  { grid-template-columns:1fr 1fr !important; }
      .edu-grid           { grid-template-columns:1fr !important; }
      section             { padding:64px 20px !important; }
      .heading-display    { font-size:2.2rem !important; }
      .heading-section    { font-size:1.7rem !important; }
      .contact-links-grid { grid-template-columns:1fr 1fr !important; }
      .footer-inner       { flex-direction:column !important; gap:20px !important; text-align:center; }
      .exp-grid           { grid-template-columns:1fr !important; }
    }
    @media(max-width:480px) {
      .all-projects-grid  { grid-template-columns:1fr !important; }
      .contact-links-grid { grid-template-columns:1fr !important; }
      section             { padding:56px 16px !important; }
      .heading-display    { font-size:1.9rem !important; }
      .heading-section    { font-size:1.5rem !important; }
      nav                 { padding:0 16px !important; }
    }

    /* Prevent stretching */
    section { max-width:100%; overflow-x:hidden; }
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
        <h2 style={{ fontFamily:"var(--font-head)",fontSize:"2.2rem",fontWeight:800,lineHeight:1.1,marginBottom:20 }}>{project.title}</h2>
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
    <section id="skills" style={{ padding:"160px 64px", position:"relative" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
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
    <section id="experience" style={{ padding:"160px 64px",position:"relative",background:"rgba(255,255,255,0.01)",borderTop:"1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth:1100,margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:16 }}>Journey</p>
          <h2 className="heading-section" style={{ marginBottom:60 }}>
            Engineering <span className="text-accent">Experience.</span>
          </h2>
        </Reveal>

        <div className="exp-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:48,alignItems:"start" }}>
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
              <h3 style={{ fontFamily:"var(--font-head)",fontSize:"1.8rem",fontWeight:800,lineHeight:1.15,marginBottom:8 }}>{EXPERIENCES[openIdx].role}</h3>
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
    <section id="contact" style={{ padding:"200px 64px",position:"relative",overflow:"hidden" }}>
      {/* Big background word */}
      <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"10rem",fontFamily:"var(--font-head)",fontWeight:800,color:"rgba(255,255,255,0.018)",pointerEvents:"none",whiteSpace:"nowrap",letterSpacing:-10,userSelect:"none" }}>CONNECT</div>

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
              style={{ display:"inline-block",fontSize:"1.5rem",fontFamily:"var(--font-head)",fontWeight:800,
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
          <div className="contact-links-grid" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:18,marginBottom:56 }}>
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
   ★ TERMINAL BLOCK — animated typewriter hero right panel
========================================================== */
const TERMINAL_LINES = [
  { delay:0,    type:"comment",  text:"# SteelSense AI — defect detection" },
  { delay:600,  type:"import",   text:"import torch, cv2" },
  { delay:900,  type:"import",   text:"from ultralytics import YOLO" },
  { delay:1300, type:"blank",    text:"" },
  { delay:1500, type:"code",     text:"model = YOLO('steelsense_v2.pt')" },
  { delay:2000, type:"code",     text:"results = model.predict(frame," },
  { delay:2300, type:"code",     text:"    conf=0.72, device='cuda')" },
  { delay:2800, type:"blank",    text:"" },
  { delay:3000, type:"comment",  text:"# Live defect output ↓" },
  { delay:3400, type:"output",   text:"✦ defects_found : 2" },
  { delay:3700, type:"output",   text:"✦ type          : ['scratch','pit']" },
  { delay:4000, type:"output",   text:"✦ confidence    : [0.94, 0.88]" },
  { delay:4300, type:"output",   text:"✦ inference_ms  : 87ms" },
  { delay:4700, type:"blank",    text:"" },
  { delay:4900, type:"success",  text:"✔ Deployed · HuggingFace Spaces" },
];

const LINE_COLORS = {
  comment: "rgba(127,176,105,0.85)",
  import:  "#60a5fa",
  code:    "#f0f0f5",
  output:  "#a78bfa",
  success: "#4ade80",
  blank:   "transparent",
};

function TerminalBlock() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [started, setStarted] = useState(false);
  const [cursor, setCursor] = useState(true);
  const ref = useRef(null);

  // start once in viewport
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    TERMINAL_LINES.forEach((_, i) => {
      setTimeout(() => setVisibleLines(v => Math.max(v, i + 1)),
        TERMINAL_LINES[i].delay);
    });
  }, [started]);

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={ref} style={{
      background:"rgba(8,8,14,0.92)",
      border:"1px solid rgba(255,255,255,0.1)",
      borderRadius:20,
      overflow:"hidden",
      boxShadow:"0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.08)",
      fontFamily:"'Fira Code','Courier New',monospace",
      fontSize:13,
      lineHeight:1.7,
      backdropFilter:"blur(20px)",
    }}>
      {/* Window chrome */}
      <div style={{ padding:"14px 20px", background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:10 }}>
        {["#ff5f57","#ffbd2e","#28c840"].map(c => (
          <div key={c} style={{ width:12, height:12, borderRadius:"50%", background:c, opacity:0.85 }}/>
        ))}
        <span style={{ marginLeft:12, fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:1 }}>
          steelsense_ai.py — python3
        </span>
        <div style={{ marginLeft:"auto", display:"flex", gap:6 }}>
          {["PyTorch","YOLO","Flask"].map(t => (
            <span key={t} style={{ fontSize:10, padding:"2px 8px", borderRadius:4, background:"rgba(167,139,250,0.12)", color:"#c4b5fd", letterSpacing:0.5 }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Code body */}
      <div style={{ padding:"22px 28px", minHeight:320 }}>
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            color: LINE_COLORS[line.type] || "#f0f0f5",
            marginBottom: line.type === "blank" ? 8 : 2,
            display:"flex",
            alignItems:"baseline",
            gap:12,
            animation:"fadeSlideIn 0.25s ease both",
          }}>
            {/* Line number */}
            <span style={{ color:"rgba(255,255,255,0.18)", fontSize:11, minWidth:20, textAlign:"right", userSelect:"none" }}>
              {line.type !== "blank" ? i + 1 : ""}
            </span>
            {/* Content */}
            <span>{line.text}
              {/* blinking cursor on last line */}
              {i === visibleLines - 1 && (
                <span style={{ display:"inline-block", width:8, height:14, background: cursor ? "rgba(255,255,255,0.7)" : "transparent", marginLeft:2, verticalAlign:"middle", transition:"background 0.1s" }}/>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div style={{ padding:"10px 28px", background:"rgba(167,139,250,0.08)", borderTop:"1px solid rgba(255,255,255,0.06)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", gap:16 }}>
          <span style={{ fontSize:11, color:"#4ade80" }}>● RUNNING</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>Python 3.11</span>
        </div>
        <div style={{ display:"flex", gap:12 }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>UTF-8</span>
          <span style={{ fontSize:11, color:"#a78bfa" }}>CUDA:0</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   ★ EDUCATION SECTION
========================================================== */
const EDUCATION = [
  {
    degree: "Bachelor of Engineering",
    field:  "Electronics & Communication Engineering",
    school: "Tontadarya College of Engineering, Gadag",
    board:  "Visvesvaraya Technological University (VTU)",
    year:   "2022 – 2026",
    grade:  "9.41 CGPA",
    gradeLabel: "Up to 7th Semester",
    status: "Final Year",
    icon:   "🎓",
    color:  "#a78bfa",
    highlights: ["Specialization in AI/ML", "Consistent academic excellence", "Active project builder throughout degree"],
  },
  {
    degree: "Pre-University Course (PUC)",
    field:  "PCMS — Physics, Chemistry, Maths, Statistics",
    school: "Smt. Vidya P Hanchinmani PU College, Dharwad",
    board:  "Karnataka State Board",
    year:   "2020 – 2022",
    grade:  "89%",
    gradeLabel: "Karnataka State Board",
    status: "Completed",
    icon:   "📚",
    color:  "#60a5fa",
    highlights: ["Strong foundation in Mathematics & Sciences", "Consistent high scorer"],
  },
];

function EducationSection() {
  return (
    <section id="education" style={{ padding:"160px 64px", position:"relative", background:"rgba(255,255,255,0.008)", borderTop:"1px solid rgba(255,255,255,0.03)" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <Reveal>
          <p style={{ fontSize:12, letterSpacing:4, textTransform:"uppercase", color:"rgba(255,255,255,0.36)", marginBottom:16 }}>Academic Background</p>
          <h2 className="heading-section" style={{ marginBottom:60 }}>
            Education<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <div className="edu-grid responsive-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28 }}>
          {EDUCATION.map((ed, i) => (
            <Reveal key={ed.degree} delay={i * 150}>
              <Tilt style={{
                borderRadius:24,
                background:`linear-gradient(135deg,${ed.color}10,rgba(255,255,255,0.02))`,
                border:`1px solid ${ed.color}28`,
                padding:40,
                height:"100%",
                backdropFilter:"blur(20px)",
                position:"relative",
                overflow:"hidden",
              }}>
                {/* bg orb */}
                <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle,${ed.color}18,transparent 70%)`, filter:"blur(40px)", pointerEvents:"none" }}/>

                {/* Header */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:28, gap:16 }}>
                  <div style={{ fontSize:42 }}>{ed.icon}</div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"var(--font-head)", fontSize:28, fontWeight:800, color:"white", lineHeight:1 }}>{ed.grade}</div>
                    <div style={{ fontSize:11, color:ed.color, letterSpacing:1.5, textTransform:"uppercase", marginTop:6 }}>{ed.gradeLabel}</div>
                  </div>
                </div>

                {/* Degree */}
                <div style={{ marginBottom:20 }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"4px 12px", borderRadius:100, background:`${ed.color}18`, border:`1px solid ${ed.color}33`, marginBottom:14 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:ed.color }}/>
                    <span style={{ fontSize:11, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:ed.color }}>{ed.status}</span>
                  </div>
                  <h3 style={{ fontFamily:"var(--font-head)", fontSize:20, fontWeight:800, lineHeight:1.25, marginBottom:6 }}>{ed.degree}</h3>
                  <p style={{ fontSize:14, color:ed.color, fontWeight:600, marginBottom:10 }}>{ed.field}</p>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>{ed.school}</p>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", marginTop:4 }}>{ed.board}</p>
                </div>

                {/* Year badge */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, padding:"12px 16px", background:"rgba(255,255,255,0.03)", borderRadius:12, border:"1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", letterSpacing:1 }}>Duration</span>
                  <span style={{ fontSize:13, fontWeight:700, fontFamily:"var(--font-head)", color:"white" }}>{ed.year}</span>
                </div>

                {/* Highlights */}
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {ed.highlights.map((h, j) => (
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:ed.color, flexShrink:0, boxShadow:`0 0 6px ${ed.color}` }}/>
                      <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)", fontWeight:300 }}>{h}</span>
                    </div>
                  ))}
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   MOBILE NAV — hamburger drawer
========================================================== */
function MobileNav({ PDF }) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const NAV_ITEMS = [
    ["Top Projects","top-projects"],
    ["About","about"],
    ["Skills","skills"],
    ["Education","education"],
    ["Experience","experience"],
    ["All Projects","all-projects"],
    ["Contact","contact"],
  ];

  const close = () => setOpen(false);

  const portal = typeof document !== "undefined" ? document.body : null;

  return (
    <>
      {/* Hamburger button — only visible on mobile via CSS */}
      <button
        onClick={()=>setOpen(o=>!o)}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
        style={{
          display:"none", flexDirection:"column", justifyContent:"center",
          gap:5, padding:"8px 4px", background:"transparent", border:"none",
          cursor:"pointer", zIndex:99999, flexShrink:0,
        }}>
        {[0,1,2].map(i=>(
          <span key={i} style={{
            display:"block", width:24, height:2, background:"white",
            borderRadius:2, transition:"all 0.3s cubic-bezier(0.23,1,0.32,1)",
            transformOrigin:"center",
            transform: open
              ? i===0 ? "translateY(7px) rotate(45deg)"
              : i===1 ? "scaleX(0)"
              : "translateY(-7px) rotate(-45deg)"
              : "none",
            opacity: open && i===1 ? 0 : 1,
          }}/>
        ))}
      </button>

      {/* Portal — renders directly on document.body, escapes ALL stacking contexts */}
      {portal && ReactDOM.createPortal(
        <>
          {/* Full-screen solid overlay */}
          <div
            onClick={close}
            style={{
              position:"fixed", inset:0,
              background:"rgba(2,2,6,0.97)",
              zIndex:999990,
              opacity: open ? 1 : 0,
              pointerEvents: open ? "all" : "none",
              transition:"opacity 0.35s ease",
            }}
          />

          {/* Drawer panel */}
          <div style={{
            position:"fixed", top:0, right:0, bottom:0, width:300,
            background:"#0a0a10",
            borderLeft:"1px solid rgba(255,255,255,0.1)",
            zIndex:999999,
            transform: open ? "translateX(0)" : "translateX(100%)",
            transition:"transform 0.4s cubic-bezier(0.23,1,0.32,1)",
            display:"flex", flexDirection:"column",
            padding:"72px 28px 40px",
            overflowY:"auto",
          }}>
            {/* Close X */}
            <button onClick={close} style={{ position:"absolute",top:18,right:20,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.14)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>✕</button>

            {/* Logo */}
            <div style={{ fontFamily:"var(--font-head)",fontWeight:800,fontSize:20,marginBottom:36 }}>
              <span style={{ background:"linear-gradient(130deg,#a78bfa,#60a5fa,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text" }}>AI</span>
              <span style={{ color:"white" }}>shwarya.</span>
            </div>

            {/* Nav links */}
            {NAV_ITEMS.map(([label,id],i)=>(
              <a key={id} href={`#${id}`} onClick={close}
                style={{ fontSize:14,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"rgba(255,255,255,0.6)",textDecoration:"none",padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,0.06)",transition:"color 0.2s, padding-left 0.2s",animation:open?`fadeSlideIn 0.4s cubic-bezier(0.16,1,0.3,1) ${i*50}ms both`:"none" }}
                onMouseEnter={e=>{ e.currentTarget.style.color="white"; e.currentTarget.style.paddingLeft="8px"; }}
                onMouseLeave={e=>{ e.currentTarget.style.color="rgba(255,255,255,0.6)"; e.currentTarget.style.paddingLeft="0"; }}>
                {label}
              </a>
            ))}

            <a href={PDF} target="_blank" rel="noopener noreferrer" onClick={close}
              style={{ fontSize:14,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"#a78bfa",textDecoration:"none",padding:"16px 0",borderBottom:"1px solid rgba(255,255,255,0.06)",transition:"color 0.2s" }}>
              Resume ↗
            </a>

            <a href="mailto:aishwaryajoshi554@gmail.com" onClick={close}
              style={{ display:"block",padding:"15px 0",borderRadius:100,background:"white",color:"#050508",fontWeight:700,fontSize:13,letterSpacing:1,textTransform:"uppercase",textAlign:"center",textDecoration:"none",marginTop:28 }}>
              ✉ Hire Me
            </a>
          </div>
        </>,
        portal
      )}
    </>
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

  /* ── TOP 3 featured projects ── */
  const topProjects = [
    {
      title:"SteelSense AI",tag:"Computer Vision",sub:"YOLOv8 · Flask · Docker",
      desc:"End-to-end industrial steel surface defect detection system. YOLOv8 fine-tuned on steel surface dataset for real-time bounding-box detection across 6 defect types. Gemini Vision API generates natural-language defect explanations; Supabase stores persistent inspection records.",
      impact:"94%+ classification accuracy with sub-100ms inference time — deployed live on Hugging Face Spaces.",
      stack:["Python","PyTorch","YOLOv8","Flask","Gemini Vision API","Supabase","Docker","HuggingFace"],
      link:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai",
      ghLink:"https://github.com/Aishwarya-J05",
      badge:"🔬 Live",badgeColor:"#a78bfa",
    },
    {
      title:"ArXiv RAG Chatbot",tag:"NLP / RAG",sub:"LangChain · FAISS · Vercel",
      desc:"Retrieval-Augmented Generation system that ingests dense ArXiv AI research papers, indexes them with FAISS vector search, and answers queries with source-grounded, citation-accurate responses using LangChain and an LLM backend.",
      impact:"Deployed on Vercel — reduces research synthesis time dramatically across 1000+ papers with exact citations.",
      stack:["Python","LangChain","FAISS","HuggingFace Embeddings","LLMs","Vercel"],
      link:"https://rag-ar-xiv-chatbot.vercel.app/",
      ghLink:"https://github.com/Aishwarya-J05",
      badge:"🤖 Live",badgeColor:"#60a5fa",
    },
    {
      title:"BurnoutIQ",tag:"Machine Learning",sub:"Scikit-learn · Streamlit",
      desc:"Full end-to-end predictive ML pipeline evaluating employee burnout risk and productivity scores from workplace habits and AI adoption metrics. Comprehensive EDA, feature engineering, and multi-model benchmarking.",
      impact:"Best model (Random Forest) selected via F1-Score & RMSLE, serialized with Joblib — live on Streamlit Cloud.",
      stack:["Python","Pandas","Scikit-learn","SVM","Random Forest","Naive Bayes","Joblib","Streamlit"],
      link:"https://burnoutiq.streamlit.app",
      ghLink:"https://github.com/Aishwarya-J05",
      badge:"📊 Live",badgeColor:"#34d399",
    },
  ];

  /* ── All projects grid ── */
  const allProjects = [
    {
      title:"SteelSense AI",
      tag:"Computer Vision",color:"#a78bfa",icon:"🔬",
      desc:"Real-time YOLOv8 steel defect detection with Gemini Vision API, Flask REST API, Supabase, and Docker. Deployed on Hugging Face Spaces.",
      stack:["PyTorch","YOLOv8","Flask","Docker","Supabase"],
      link:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai",
      ghLink:"https://github.com/Aishwarya-J05",
      live:true,
    },
    {
      title:"ArXiv RAG Chatbot",
      tag:"NLP / RAG",color:"#60a5fa",icon:"🤖",
      desc:"LangChain + FAISS retrieval-augmented chatbot for ArXiv AI papers. Source-grounded responses with exact citations. Deployed on Vercel.",
      stack:["LangChain","FAISS","HuggingFace","LLMs","Vercel"],
      link:"https://rag-ar-xiv-chatbot.vercel.app/",
      ghLink:"https://github.com/Aishwarya-J05",
      live:true,
    },
    {
      title:"BurnoutIQ",
      tag:"Machine Learning",color:"#34d399",icon:"📊",
      desc:"Employee burnout risk predictor — full ML pipeline with SVM, Random Forest, Naive Bayes. Deployed as interactive Streamlit dashboard.",
      stack:["Scikit-learn","Pandas","Random Forest","Streamlit"],
      link:"https://burnoutiq.streamlit.app",
      ghLink:"https://github.com/Aishwarya-J05",
      live:true,
    },
    {
      title:"AI Assistant Usage in Student Life",
      tag:"Data Analytics",color:"#fbbf24",icon:"📈",
      desc:"Data analytics project exploring how students use AI tools — EDA, trend analysis, visualizations using Pandas, Matplotlib, and Seaborn on real survey data.",
      stack:["Python","Pandas","Matplotlib","Seaborn","Jupyter"],
      link:"https://github.com/Aishwarya-J05/Ai-assistant-usage-in-student-life",
      ghLink:"https://github.com/Aishwarya-J05/Ai-assistant-usage-in-student-life",
      live:false,
    },
    {
      title:"MNIST CNN Image Classifier",
      tag:"Deep Learning",color:"#f472b6",icon:"🧠",
      desc:"CNN image classifier built from scratch on the MNIST dataset using PyTorch — custom architecture with training loops, validation, and accuracy tracking.",
      stack:["PyTorch","CNN","MNIST","NumPy"],
      link:"https://github.com/Aishwarya-J05/Image-classifier",
      ghLink:"https://github.com/Aishwarya-J05/Image-classifier",
      live:false,
    },
    {
      title:"Vehicle Price Prediction",
      tag:"Machine Learning",color:"#fb923c",icon:"🚗",
      desc:"ML regression pipeline predicting vehicle prices from features like mileage, brand, and year. Feature engineering, model comparison, and hyperparameter tuning.",
      stack:["Python","Scikit-learn","Pandas","Regression","EDA"],
      link:"https://github.com/Aishwarya-J05/vehicle-price-prediction",
      ghLink:"https://github.com/Aishwarya-J05/vehicle-price-prediction",
      live:false,
    },
    {
      title:"Karnataka Districts Game",
      tag:"Python / Game",color:"#a3e635",icon:"🗺️",
      desc:"Interactive Python quiz game testing knowledge of Karnataka districts — built with Python, fun CLI interface, score tracking, and replay logic.",
      stack:["Python","CLI","Game Logic"],
      link:"https://github.com/Aishwarya-J05/karnataka-districts-game",
      ghLink:"https://github.com/Aishwarya-J05/karnataka-districts-game",
      live:false,
    },
    {
      title:"PyTorch Deep Learning Projects",
      tag:"Deep Learning",color:"#c4b5fd",icon:"🔥",
      desc:"Core deep learning implemented from scratch — custom CNNs, training loops with validation, early stopping, checkpointing, and transfer learning with ResNet.",
      stack:["PyTorch","CNNs","ResNet","Transfer Learning"],
      link:"https://github.com/Aishwarya-J05",
      ghLink:"https://github.com/Aishwarya-J05",
      live:false,
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
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,background:navBlur?"rgba(5,5,8,0.92)":"transparent",backdropFilter:navBlur?"blur(20px)":"none",borderBottom:navBlur?"1px solid rgba(255,255,255,0.05)":"1px solid transparent",transition:"all 0.4s" }}>
        <div style={{ width:"100%",padding:"0 40px",height:60,display:"flex",justifyContent:"space-between",alignItems:"center" }}>

          {/* Logo */}
          <a href="#" style={{ fontFamily:"var(--font-head)",fontWeight:800,fontSize:18,letterSpacing:-0.5,flexShrink:0,textDecoration:"none",color:"inherit" }}>
            <span className="text-accent">AI</span><span>shwarya.</span>
          </a>

          {/* Desktop links */}
          <div className="nav-links" style={{ display:"flex",gap:18,alignItems:"center",flexWrap:"nowrap" }}>
            {[["Top Projects","top-projects"],["About","about"],["Skills","skills"],["Education","education"],["Experience","experience"],["All Projects","all-projects"],["Contact","contact"]].map(([label,id])=>(
              <a key={id} href={`#${id}`} style={{ fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",opacity:0.55,transition:"opacity 0.2s",whiteSpace:"nowrap",color:"inherit",textDecoration:"none",position:"relative" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                onMouseLeave={e=>e.currentTarget.style.opacity="0.55"}>
                {label}
              </a>
            ))}
            <a href={PDF} target="_blank" rel="noopener noreferrer"
              style={{ fontSize:10,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:"var(--accent)",opacity:0.9,whiteSpace:"nowrap",textDecoration:"none",transition:"opacity 0.2s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="1"}
              onMouseLeave={e=>e.currentTarget.style.opacity="0.9"}>
              Resume
            </a>
            <a href="mailto:aishwaryajoshi554@gmail.com"
              style={{ padding:"8px 18px",borderRadius:100,background:"white",color:"#050508",fontWeight:700,fontSize:10,letterSpacing:1,textTransform:"uppercase",textDecoration:"none",whiteSpace:"nowrap",transition:"all 0.3s",flexShrink:0 }}
              onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 6px 20px rgba(255,255,255,0.2)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <MobileNav PDF={PDF}/>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", position:"relative", padding:"120px 64px 80px", overflow:"hidden" }}>
        <NeonWaves/>

        <div className="hero-grid" style={{ position:"relative", width:"100%", maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }}>
          {/* LEFT — text content */}
          <div style={{ animation:"revealUp 1s cubic-bezier(0.16,1,0.3,1) both" }}>
            {/* Status pill */}
            <div style={{ display:"inline-flex", alignItems:"center", gap:12, padding:"8px 20px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:100, marginBottom:36 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#4ade80", boxShadow:"0 0 12px rgba(74,222,128,0.8)", animation:"pulseSoft 2s infinite" }}/>
              <span style={{ fontSize:12, fontWeight:700, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.7)" }}>Graduating June 2026 · Open to Work</span>
            </div>

            <h1 className="heading-display text-gradient" style={{ marginBottom:8 }}>Building</h1>
            <h1 className="heading-display text-accent"   style={{ marginBottom:8 }}>Intelligent</h1>
            <h1 className="heading-display text-gradient" style={{ marginBottom:32 }}>Systems.</h1>

            <p style={{ fontSize:15, color:"rgba(255,255,255,0.52)", lineHeight:1.9, marginBottom:14, fontWeight:300 }}>
              I'm <strong style={{ color:"rgba(255,255,255,0.82)", fontWeight:500 }}>Aishwarya Joshi</strong> — an AI/ML Engineer specializing in <strong style={{ color:"rgba(255,255,255,0.82)", fontWeight:500 }}>Deep Learning</strong>, <strong style={{ color:"rgba(255,255,255,0.82)", fontWeight:500 }}>Computer Vision</strong>, and <strong style={{ color:"rgba(255,255,255,0.82)", fontWeight:500 }}>NLP & RAG systems</strong>.
            </p>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.42)", lineHeight:1.9, marginBottom:14, fontWeight:300 }}>
              I don't just train models — I engineer end-to-end systems that are containerized, deployed, and publicly accessible. From real-time industrial defect detection with YOLOv8 to RAG chatbots built with LangChain and FAISS.
            </p>
            <p style={{ fontSize:15, color:"rgba(255,255,255,0.35)", lineHeight:1.9, marginBottom:40, fontWeight:300 }}>
              Final-year B.E ECE at VTU · CGPA 9.41 · Seeking AI/ML engineer roles for 2026.
            </p>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              <Mag href="#work" className="btn-primary">Explore Work</Mag>
              <Mag href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub ↗</Mag>
              <Mag href="mailto:aishwaryajoshi554@gmail.com" className="btn-secondary">Say Hello ↗</Mag>
            </div>
          </div>

          {/* RIGHT — terminal */}
          <div className="terminal-col" style={{ animation:"revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.3s both" }}>
            <TerminalBlock/>
            {/* small stat strip below terminal */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginTop:16 }}>
              {[
                { val:"3+",    label:"Projects Live" },
                { val:"9.41",  label:"CGPA · VTU" },
                { val:"6+",    label:"Frameworks" },
              ].map(s => (
                <div key={s.label} style={{ padding:"14px 16px", borderRadius:14, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", textAlign:"center" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:800, color:"white" }}>{s.val}</div>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", letterSpacing:1.5, textTransform:"uppercase", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:10, opacity:0.4, animation:"revealUp 1s ease 1.2s both" }}>
          <span style={{ fontSize:10, letterSpacing:4, textTransform:"uppercase", fontFamily:"var(--font-head)" }}>Scroll</span>
          <div style={{ width:1, height:36, background:"linear-gradient(to bottom,white,transparent)" }}/>
        </div>
      </section>

      <Marquee items={mqTop} speed={50}/>

      {/* ══ TOP PROJECTS — 3 featured cards ══ */}
      <section id="top-projects" style={{ padding:"160px 64px", position:"relative" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:12 }}>Featured Work</p>
            <h2 className="heading-section" style={{ marginBottom:16 }}>
              Top <span className="text-accent">Projects.</span>
            </h2>
            <p style={{ fontSize:15,color:"rgba(255,255,255,0.38)",fontWeight:300,marginBottom:72,maxWidth:520 }}>
              Three production-grade systems — deployed, live, and publicly accessible.
            </p>
          </Reveal>
          <div className="top-projects-grid responsive-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:28 }}>
            {topProjects.map((p,i)=>(
              <Reveal key={p.title} delay={i*120}>
                <Tilt style={{ background:"rgba(12,12,18,0.7)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:24, padding:32, display:"flex", flexDirection:"column", gap:20, height:"100%", backdropFilter:"blur(20px)", position:"relative", overflow:"hidden" }}>
                  {/* accent orb */}
                  <div style={{ position:"absolute",top:-50,right:-50,width:180,height:180,borderRadius:"50%",background:`radial-gradient(circle,${p.badgeColor}18,transparent 70%)`,filter:"blur(40px)",pointerEvents:"none" }}/>

                  {/* live badge */}
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"4px 12px",borderRadius:100,background:`${p.badgeColor}18`,border:`1px solid ${p.badgeColor}33`,color:p.badgeColor }}>{p.badge}</span>
                    <span style={{ fontSize:11,color:"rgba(255,255,255,0.3)",letterSpacing:1,textTransform:"uppercase" }}>{p.sub}</span>
                  </div>

                  <div>
                    <span style={{ fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.35)",display:"block",marginBottom:8 }}>{p.tag}</span>
                    <h3 style={{ fontFamily:"var(--font-head)", fontSize:22, fontWeight:800, lineHeight:1.2, marginBottom:12 }}>{p.title}</h3>
                    <p style={{ fontSize:14, color:"rgba(255,255,255,0.48)", lineHeight:1.75, fontWeight:300 }}>{p.desc}</p>
                  </div>

                  <div style={{ padding:"12px 14px", background:"rgba(255,255,255,0.02)", borderLeft:`2px solid ${p.badgeColor}`, borderRadius:"0 10px 10px 0", fontSize:13, color:"rgba(255,255,255,0.65)", lineHeight:1.6 }}>
                    <strong style={{ color:p.badgeColor }}>Impact: </strong>{p.impact}
                  </div>

                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {p.stack.slice(0,4).map(s=>(
                      <span key={s} style={{ fontSize:11, padding:"4px 10px", borderRadius:6, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.55)" }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ display:"flex", gap:10, marginTop:"auto" }}>
                    <a href={p.link} target="_blank" rel="noopener noreferrer"
                      onClick={e=>e.stopPropagation()}
                      style={{ flex:1, padding:"10px 0", borderRadius:100, background:"white", color:"#050508", fontWeight:700, fontSize:12, textAlign:"center", textDecoration:"none", transition:"all 0.3s", letterSpacing:0.5 }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(255,255,255,0.2)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                      Live Demo ↗
                    </a>
                    <a href={p.ghLink} target="_blank" rel="noopener noreferrer"
                      onClick={e=>e.stopPropagation()}
                      style={{ padding:"10px 18px", borderRadius:100, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.14)", color:"rgba(255,255,255,0.8)", fontSize:12, fontWeight:600, textDecoration:"none", transition:"all 0.3s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.12)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; }}>
                      GitHub
                    </a>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={mqBot} speed={40} reverse/>

      {/* ABOUT */}
      <section id="about" style={{ padding:"160px 64px",position:"relative" }}>
        <div className="about-layout" style={{ maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1.2fr 0.8fr",gap:100,alignItems:"center" }}>
          <Reveal>
            <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:16 }}>About Me</p>
            <h2 className="heading-section" style={{ marginBottom:40 }}>Not just models.<br/><span className="text-accent">Systems.</span></h2>
            <div style={{ display:"flex",flexDirection:"column",gap:24,fontSize:16,color:"rgba(255,255,255,0.55)",lineHeight:1.85,fontWeight:300 }}>
              <p>I'm Aishwarya, a final-year B.E (ECE) student at VTU with a 9.41 CGPA. I bridge the gap between theoretical machine learning and scalable engineering.</p>
              <p>Many build notebooks. I build applications. Every project I ship is containerized, deployed, and publicly accessible — from real-time defect detection to RAG chatbots that understand dense research papers.</p>
            </div>
            <div style={{ display:"flex",gap:16,flexWrap:"wrap",marginTop:44 }}>
              <Mag href={PDF} target="_blank" rel="noopener noreferrer" className="btn-primary">View Resume</Mag>
              <Mag href="https://linkedin.com/in/aishwaryajoshiaiml" target="_blank" rel="noopener noreferrer" className="btn-secondary">LinkedIn ↗</Mag>
              <Mag href="https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai" target="_blank" rel="noopener noreferrer" className="btn-secondary">HuggingFace ↗</Mag>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <Tilt style={{ borderRadius:32,padding:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)" }}>
              <img src={myPhoto} alt="Aishwarya Joshi" style={{ width:"100%",aspectRatio:"4/5",objectFit:"cover",objectPosition:"center top",borderRadius:24,display:"block" }}/>
              <div style={{ position:"absolute",bottom:-20,left:-20,padding:"20px 24px",background:"rgba(10,10,15,0.95)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:18 }}>
                <div style={{ fontFamily:"var(--font-head)",fontSize:36,fontWeight:800,lineHeight:1 }}>9.41</div>
                <div style={{ fontSize:11,textTransform:"uppercase",letterSpacing:2,color:"var(--accent)",marginTop:6 }}>CGPA · VTU</div>
              </div>
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* TECH STACK */}
      <StackSection/>

      {/* EDUCATION */}
      <EducationSection/>

      {/* EXPERIENCE */}
      <ExperienceSection/>

      {/* ══ ALL PROJECTS ══ */}
      <section id="all-projects" style={{ padding:"160px 64px", position:"relative", background:"rgba(255,255,255,0.008)", borderTop:"1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:12,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:12 }}>Full Portfolio</p>
            <h2 className="heading-section" style={{ marginBottom:16 }}>
              All <span className="text-accent">Projects.</span>
            </h2>
            <p style={{ fontSize:15,color:"rgba(255,255,255,0.38)",fontWeight:300,marginBottom:72,maxWidth:520 }}>
              Every project I've built — from production AI systems to exploratory data science and Python experiments.
            </p>
          </Reveal>

          <div className="all-projects-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {allProjects.map((p,i)=>(
              <Reveal key={p.title} delay={i*70}>
                <div
                  style={{ borderRadius:20, background:"rgba(10,10,16,0.7)", border:`1px solid ${p.color}22`, padding:28, display:"flex", flexDirection:"column", gap:16, height:"100%", backdropFilter:"blur(16px)", transition:"all 0.35s cubic-bezier(0.23,1,0.32,1)", cursor:"default", position:"relative", overflow:"hidden" }}
                  onMouseEnter={e=>{ e.currentTarget.style.border=`1px solid ${p.color}55`; e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow=`0 20px 50px rgba(0,0,0,0.4),0 0 0 1px ${p.color}22`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.border=`1px solid ${p.color}22`; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>

                  {/* top orb */}
                  <div style={{ position:"absolute",top:-30,right:-30,width:100,height:100,borderRadius:"50%",background:`radial-gradient(circle,${p.color}20,transparent 70%)`,filter:"blur(20px)",pointerEvents:"none" }}/>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:28 }}>{p.icon}</span>
                    {p.live && (
                      <span style={{ fontSize:9,fontWeight:700,letterSpacing:2,textTransform:"uppercase",padding:"3px 8px",borderRadius:100,background:`${p.color}18`,border:`1px solid ${p.color}44`,color:p.color }}>LIVE</span>
                    )}
                  </div>

                  <div>
                    <span style={{ fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:p.color,display:"block",marginBottom:6 }}>{p.tag}</span>
                    <h4 style={{ fontFamily:"var(--font-head)", fontSize:16, fontWeight:800, lineHeight:1.3, marginBottom:8 }}>{p.title}</h4>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.42)", lineHeight:1.7, fontWeight:300 }}>{p.desc}</p>
                  </div>

                  <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                    {p.stack.slice(0,3).map(s=>(
                      <span key={s} style={{ fontSize:10, padding:"3px 8px", borderRadius:5, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.45)" }}>{s}</span>
                    ))}
                  </div>

                  <div style={{ display:"flex", gap:8, marginTop:"auto" }}>
                    {p.live ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer"
                        style={{ flex:1, padding:"8px 0", borderRadius:100, background:p.color, color:"#050508", fontWeight:700, fontSize:11, textAlign:"center", textDecoration:"none", transition:"all 0.25s", letterSpacing:0.5 }}
                        onMouseEnter={e=>e.currentTarget.style.opacity="0.85"}
                        onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                        Live ↗
                      </a>
                    ) : (
                      <a href={p.link} target="_blank" rel="noopener noreferrer"
                        style={{ flex:1, padding:"8px 0", borderRadius:100, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.7)", fontWeight:600, fontSize:11, textAlign:"center", textDecoration:"none", transition:"all 0.25s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
                        onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}>
                        GitHub ↗
                      </a>
                    )}
                    <a href={p.ghLink} target="_blank" rel="noopener noreferrer"
                      style={{ padding:"8px 12px", borderRadius:100, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.5)", fontSize:11, textDecoration:"none", transition:"all 0.25s" }}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.1)"}
                      onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.04)"}>
                      ⚡
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* GitHub CTA */}
          <Reveal delay={200}>
            <div style={{ textAlign:"center", marginTop:56 }}>
              <Mag href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ padding:"14px 36px", fontSize:13 }}>
                View All on GitHub ↗
              </Mag>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT — standalone section */}
      <ContactSection/>

      {/* FOOTER */}
      <footer style={{ padding:"40px 40px",borderTop:"1px solid rgba(255,255,255,0.05)",position:"relative" }}>
        <div className="footer-inner" style={{ display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20 }}>
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
        </div>
      </footer>
    </>
  );
}