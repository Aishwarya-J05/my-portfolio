import { useState, useEffect, useRef } from "react";
import myPhoto from "./aishwarya.png";

/* ══════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════ */
function Cursor() {
  const ring = useRef(null);
  const dot  = useRef(null);
  const pos  = useRef({ x: 0, y: 0 });
  const tgt  = useRef({ x: 0, y: 0 });
  const [big, setBig] = useState(false);

  useEffect(() => {
    const mv  = (e) => { tgt.current = { x: e.clientX, y: e.clientY }; };
    const ov  = (e) => { if (e.target.closest("a,button,.tilt-card,.gallery-item,.wave-hover")) setBig(true); };
    const out = ()  => setBig(false);
    window.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", ov);
    document.addEventListener("mouseout",  out);
    let raf;
    const loop = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.11;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.11;
      if (ring.current) ring.current.style.transform = `translate(${pos.current.x - (big ? 30 : 20)}px,${pos.current.y - (big ? 30 : 20)}px)`;
      if (dot.current)  dot.current.style.transform  = `translate(${tgt.current.x - 4}px,${tgt.current.y - 4}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", ov);
      document.removeEventListener("mouseout",  out);
      cancelAnimationFrame(raf);
    };
  }, [big]);

  return (
    <>
      <div ref={ring} style={{ position:"fixed",top:0,left:0,width:big?60:40,height:big?60:40,border:"1.5px solid rgba(255,255,255,0.65)",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"difference",transition:"width 0.25s,height 0.25s" }} />
      <div ref={dot}  style={{ position:"fixed",top:0,left:0,width:8,height:8,background:"white",borderRadius:"50%",pointerEvents:"none",zIndex:10000,mixBlendMode:"difference" }} />
    </>
  );
}

/* ══════════════════════════════════════════
   SUBTLE ALWAYS-VISIBLE GRID + TINY HOVER GLOW
══════════════════════════════════════════ */
function GlowGrid() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    const CELL   = 70;
    const BASE_OPACITY  = 0.07;   // always-visible grid opacity
    const GLOW_EXTRA    = 0.055;  // tiny extra opacity on hover (very subtle)
    const GLOW_RADIUS   = 140;    // how far the hover effect reaches
    let W, H, cols, rows, raf;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      cols = Math.ceil(W / CELL) + 2;
      rows = Math.ceil(H / CELL) + 2;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // vertical lines
      for (let c = 0; c < cols; c++) {
        const x    = c * CELL;
        const dx   = mx - x;
        const glow = Math.max(0, 1 - Math.abs(dx) / GLOW_RADIUS);
        const op   = BASE_OPACITY + glow * GLOW_EXTRA;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.strokeStyle = `rgba(255,255,255,${op})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      // horizontal lines
      for (let r = 0; r < rows; r++) {
        const y    = r * CELL;
        const dy   = my - y;
        const glow = Math.max(0, 1 - Math.abs(dy) / GLOW_RADIUS);
        const op   = BASE_OPACITY + glow * GLOW_EXTRA;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.strokeStyle = `rgba(255,255,255,${op})`;
        ctx.lineWidth   = 0.5;
        ctx.stroke();
      }

      // tiny dot at nearest intersection only
      const nearX = Math.round(mx / CELL) * CELL;
      const nearY = Math.round(my / CELL) * CELL;
      const dist  = Math.sqrt((mx - nearX) ** 2 + (my - nearY) ** 2);
      if (dist < CELL) {
        const t = Math.max(0, 1 - dist / CELL);
        ctx.beginPath();
        ctx.arc(nearX, nearY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${t * 0.35})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }} />;
}

/* ══════════════════════════════════════════
   NEON WAVY LINES
══════════════════════════════════════════ */
function NeonWaves() {
  const svgRef   = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const frameRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const WAVES = [
    { color:"#7c3aed", freq:0.012, amp:38, speed:0.0008, phase:0,   opacity:0.07, width:1.5, yBase:0.25 },
    { color:"#4f46e5", freq:0.010, amp:52, speed:0.0006, phase:1.2, opacity:0.06, width:1.2, yBase:0.38 },
    { color:"#06b6d4", freq:0.014, amp:30, speed:0.0010, phase:2.4, opacity:0.05, width:1.0, yBase:0.50 },
    { color:"#a855f7", freq:0.009, amp:60, speed:0.0007, phase:0.8, opacity:0.07, width:1.8, yBase:0.62 },
    { color:"#3b82f6", freq:0.013, amp:44, speed:0.0009, phase:3.1, opacity:0.05, width:1.0, yBase:0.72 },
    { color:"#8b5cf6", freq:0.011, amp:36, speed:0.0011, phase:1.8, opacity:0.06, width:1.3, yBase:0.82 },
    { color:"#22d3ee", freq:0.015, amp:28, speed:0.0013, phase:0.4, opacity:0.04, width:0.9, yBase:0.18 },
    { color:"#6366f1", freq:0.008, amp:70, speed:0.0005, phase:2.0, opacity:0.08, width:2.0, yBase:0.55 },
  ];

  useEffect(() => {
    const mv = (e) => {
      const r = svgRef.current?.closest("section")?.getBoundingClientRect();
      if (!r) return;
      mouseRef.current = { x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height };
    };
    window.addEventListener("mousemove", mv);

    const tick = (ts) => {
      if (!svgRef.current) { frameRef.current = requestAnimationFrame(tick); return; }
      const W  = svgRef.current.clientWidth  || 1440;
      const H  = svgRef.current.clientHeight || 900;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      svgRef.current.querySelectorAll("path.wave").forEach((path, i) => {
        const w = WAVES[i]; const t = ts * w.speed; const pts = [];
        for (let s = 0; s <= 120; s++) {
          const x   = (s / 120) * W;
          const inf = Math.sin((mx - s / 120) * Math.PI) * 22;
          const y   = H * w.yBase
            + Math.sin(x * w.freq + t + w.phase) * w.amp
            + Math.sin(x * w.freq * 0.5 + t * 1.3 + w.phase) * (w.amp * 0.4)
            + inf * (1 - Math.abs(my - w.yBase));
          pts.push(s === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`);
        }
        path.setAttribute("d", pts.join(" "));
      });
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(frameRef.current); };
  }, []);

  return (
    <div className="wave-hover" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }}>
      <svg ref={svgRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"all" }}>
        <defs>
          {WAVES.map((w, i) => (
            <filter key={i} id={`glow${i}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation={hovered ? "6" : "3"} result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          ))}
        </defs>
        {WAVES.map((w, i) => (
          <path key={i} className="wave" stroke={w.color} fill="none"
            strokeWidth={hovered ? w.width * 2.5 : w.width}
            opacity={hovered ? Math.min(w.opacity * 4, 0.55) : w.opacity}
            filter={`url(#glow${i})`}
            style={{ transition:"stroke-width 0.6s ease,opacity 0.6s ease" }} />
        ))}
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAGNETIC BUTTON
══════════════════════════════════════════ */
function Mag({ children, className, href, style, onClick, target, rel, download }) {
  const ref = useRef(null);
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform  = `translate(${(e.clientX - r.left - r.width / 2) * 0.3}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
    ref.current.style.transition = "transform 0.1s";
  };
  const lv = () => { ref.current.style.transform = "translate(0,0)"; ref.current.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)"; };
  const Tag = href ? "a" : "button";
  return (
    <Tag ref={ref} href={href} onClick={onClick} className={className}
      target={target} rel={rel} download={download}
      onMouseMove={mv} onMouseLeave={lv}
      style={{ display:"inline-block", cursor:"pointer", ...style }}>
      {children}
    </Tag>
  );
}

/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
function Reveal({ children, delay = 0, y = 50 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"translateY(0)":`translateY(${y}px)`, transition:`opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms,transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   ZOOM-POP REVEAL
══════════════════════════════════════════ */
function ZoomReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity:vis?1:0, transform:vis?"scale(1) translateY(0)":"scale(0.88) translateY(40px)", transition:`opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms,transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   MARQUEE
══════════════════════════════════════════ */
function Marquee({ items, speed = 30, reverse = false }) {
  const arr = [...items, ...items, ...items];
  return (
    <div style={{ overflow:"hidden", display:"flex" }}>
      <div style={{ display:"flex", gap:40, animation:`${reverse ? "mR" : "mF"} ${speed}s linear infinite`, willChange:"transform" }}>
        {arr.map((it, i) => (
          <span key={i} style={{ fontSize:13, fontWeight:600, opacity:0.42, letterSpacing:2.5, textTransform:"uppercase", whiteSpace:"nowrap", fontFamily:"'Syne',sans-serif" }}>
            {it} <span style={{ marginLeft:22, opacity:0.45 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TILT CARD
══════════════════════════════════════════ */
function Tilt({ children, style, className, onMouseEnter, onMouseLeave }) {
  const ref   = useRef(null);
  const shine = useRef(null);
  const mv = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.03)`;
    if (shine.current) shine.current.style.background = `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%,rgba(255,255,255,0.11) 0%,transparent 65%)`;
  };
  const lv = (e) => {
    ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)";
    if (shine.current) shine.current.style.background = "transparent";
    onMouseLeave && onMouseLeave(e);
  };
  return (
    <div ref={ref} onMouseMove={mv} onMouseLeave={lv} onMouseEnter={onMouseEnter}
      className={`tilt-card ${className || ""}`}
      style={{ transition:"transform 0.15s ease", position:"relative", ...style }}>
      <div ref={shine} style={{ position:"absolute", inset:0, borderRadius:"inherit", pointerEvents:"none", zIndex:2, transition:"background 0.1s" }} />
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════
   ROTATING BADGE
══════════════════════════════════════════ */
function RotBadge({ text = "• AVAILABLE • ", sz = 130 }) {
  const chars = text.split("");
  const step  = 360 / chars.length;
  return (
    <div style={{ width:sz, height:sz, position:"relative", animation:"spin 14s linear infinite" }}>
      {chars.map((ch, i) => (
        <span key={i} style={{ position:"absolute", top:"50%", left:"50%", transform:`rotate(${i * step}deg) translateY(${-(sz / 2 - 10)}px)`, transformOrigin:"0 0", fontSize:8, fontWeight:700, letterSpacing:1, color:"rgba(255,255,255,0.62)" }}>{ch}</span>
      ))}
      <div style={{ position:"absolute", inset:"22%", borderRadius:"50%", background:"linear-gradient(135deg,rgba(255,255,255,0.11),rgba(255,255,255,0.03))", backdropFilter:"blur(8px)", border:"1px solid rgba(255,255,255,0.16)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>✦</div>
    </div>
  );
}

/* ══════════════════════════════════════════
   AUTO-SCROLL GALLERY
══════════════════════════════════════════ */
const gallerySlides = [
  { id:1, label:"SteelSense AI",     sub:"Computer Vision · YOLOv8 · Flask · Docker",  color:"rgba(99,102,241,0.18)", emoji:"🔬", link:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai" },
  { id:2, label:"ArXiv RAG Chatbot", sub:"NLP · LangChain · FAISS · Streamlit",         color:"rgba(168,85,247,0.16)", emoji:"🤖", link:"https://github.com/Aishwarya-J05" },
  { id:3, label:"BurnoutIQ",         sub:"ML Pipeline · Scikit-learn · Streamlit",      color:"rgba(59,130,246,0.16)", emoji:"📊", link:"https://burnoutiq.streamlit.app" },
];

function AutoGallery() {
  const trackRef  = useRef(null);
  const pausedRef = useRef(false);
  const posRef    = useRef(0);
  const CARD_W = 340, GAP = 24, SPEED = 0.6;
  const slides = [...gallerySlides, ...gallerySlides, ...gallerySlides];
  const totalW = gallerySlides.length * (CARD_W + GAP);

  useEffect(() => {
    let raf;
    const tick = () => {
      if (!pausedRef.current) {
        posRef.current += SPEED;
        if (posRef.current >= totalW) posRef.current -= totalW;
        if (trackRef.current) trackRef.current.style.transform = `translateX(${-posRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalW]);

  return (
    <div style={{ overflow:"hidden", width:"100%", position:"relative" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}>
      <div style={{ position:"absolute", left:0, top:0, bottom:0, width:140, background:"linear-gradient(to right,#050508,transparent)", zIndex:10, pointerEvents:"none" }} />
      <div style={{ position:"absolute", right:0, top:0, bottom:0, width:140, background:"linear-gradient(to left,#050508,transparent)", zIndex:10, pointerEvents:"none" }} />
      <div ref={trackRef} style={{ display:"flex", gap:GAP, willChange:"transform", padding:"16px 0" }}>
        {slides.map((s, i) => (
          <a key={i} href={s.link} target="_blank" rel="noopener noreferrer"
            className="gallery-item"
            style={{ flexShrink:0, width:CARD_W, borderRadius:22, background:s.color, border:"1px solid rgba(255,255,255,0.1)", backdropFilter:"blur(16px)", overflow:"hidden", cursor:"pointer", transition:"transform 0.35s cubic-bezier(0.23,1,0.32,1),box-shadow 0.35s", textDecoration:"none", color:"inherit", display:"block" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04) translateY(-6px)"; e.currentTarget.style.boxShadow = "0 28px 60px rgba(0,0,0,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1) translateY(0)";       e.currentTarget.style.boxShadow = "none"; }}>
            <div style={{ width:"100%", height:200, background:"rgba(0,0,0,0.25)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, position:"relative", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize:52 }}>{s.emoji}</div>
              <div style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", opacity:0.4 }}>Add Screenshot</div>
              <span style={{ position:"absolute", top:14, right:14, fontFamily:"'Syne',sans-serif", fontSize:12, fontWeight:800, opacity:0.3, letterSpacing:2 }}>0{s.id}</span>
              <span style={{ position:"absolute", top:14, left:14, fontSize:18, opacity:0.5 }}>↗</span>
            </div>
            <div style={{ padding:"20px 24px" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, marginBottom:6 }}>{s.label}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.48)", letterSpacing:0.5 }}>{s.sub}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   PROJECT CARD  — description + links visible, click image for modal
══════════════════════════════════════════ */
function PCard({ num, tag, sub, title, desc, impact, delay, link, ghLink, stack, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <ZoomReveal delay={delay}>
      <Tilt
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderRadius:24, background:hov?"rgba(255,255,255,0.08)":"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.09)", backdropFilter:"blur(24px)", padding:36, transition:"background 0.3s,box-shadow 0.4s", display:"flex", flexDirection:"column", gap:20, boxShadow:hov?"0 30px 80px rgba(0,0,0,0.5),0 0 0 1px rgba(255,255,255,0.12)":"0 4px 24px rgba(0,0,0,0.2)" }}>

        {/* Clickable image area → opens modal */}
        <div onClick={onOpen} style={{ borderRadius:16, aspectRatio:"16/9", background:"rgba(255,255,255,0.025)", border:`2px dashed ${hov?"rgba(255,255,255,0.28)":"rgba(255,255,255,0.09)"}`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, position:"relative", overflow:"hidden", transition:"border-color 0.3s", cursor:"pointer" }}>
          <div style={{ fontSize:30, opacity:0.4 }}>📷</div>
          <span style={{ fontSize:11, letterSpacing:2, textTransform:"uppercase", opacity:0.3 }}>Add Project Image</span>
          <div style={{ position:"absolute", inset:0, background:hov?"linear-gradient(135deg,rgba(99,102,241,0.13),rgba(168,85,247,0.07))":"transparent", transition:"background 0.4s" }} />
          <span style={{ position:"absolute", top:14, left:14, fontSize:11, fontWeight:700, letterSpacing:3, color:"rgba(255,255,255,0.28)", textTransform:"uppercase" }}>{num}</span>
          <div style={{ position:"absolute", top:12, right:12, padding:"4px 10px", borderRadius:20, background:"rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.15)", fontSize:10, color:"rgba(255,255,255,0.65)", letterSpacing:1, opacity:hov?1:0, transition:"opacity 0.3s", textTransform:"uppercase" }}>View Details ↗</div>
        </div>

        {/* Tags */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <span style={{ padding:"4px 14px", borderRadius:100, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.11)", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"rgba(255,255,255,0.52)" }}>{tag}</span>
          {sub && <span style={{ padding:"4px 14px", borderRadius:100, background:"rgba(99,102,241,0.13)", border:"1px solid rgba(99,102,241,0.28)", fontSize:11, fontWeight:600, letterSpacing:2, textTransform:"uppercase", color:"#c4b5fd" }}>{sub}</span>}
        </div>

        {/* Title + Description — always visible */}
        <div>
          <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:700, lineHeight:1.3, marginBottom:10 }}>{title}</h3>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.48)", lineHeight:1.85 }}>{desc}</p>
        </div>

        {/* Impact — always visible */}
        {impact && (
          <div style={{ padding:"11px 15px", borderRadius:12, background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.18)", fontSize:13, color:"rgba(196,181,253,0.88)", lineHeight:1.6 }}>
            <strong style={{ color:"#c4b5fd" }}>Impact: </strong>{impact}
          </div>
        )}

        {/* Links row — always visible */}
        <div style={{ display:"flex", gap:10, marginTop:"auto", paddingTop:4, flexWrap:"wrap" }}>
          <a href={link} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:"#050508", textDecoration:"none", padding:"9px 20px", borderRadius:100, background:"white", transition:"all 0.25s" }}
            onMouseEnter={e => { e.currentTarget.style.transform="scale(1.05)"; e.currentTarget.style.boxShadow="0 0 24px rgba(255,255,255,0.22)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="none"; }}>
            🚀 Live Demo
          </a>
          {ghLink && (
            <a href={ghLink} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:"white", textDecoration:"none", padding:"8px 20px", borderRadius:100, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.18)", transition:"all 0.25s" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.14)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.07)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.18)"; }}>
              ⚡ GitHub
            </a>
          )}
          <button onClick={onOpen}
            style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600, color:"rgba(196,181,253,0.85)", background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.22)", padding:"8px 18px", borderRadius:100, cursor:"pointer", transition:"all 0.25s", fontFamily:"inherit" }}
            onMouseEnter={e => { e.currentTarget.style.background="rgba(99,102,241,0.18)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="rgba(99,102,241,0.08)"; }}>
            More Info ›
          </button>
        </div>
      </Tilt>
    </ZoomReveal>
  );
}

/* ══════════════════════════════════════════
   TECH STACK
══════════════════════════════════════════ */
const stackGroups = [
  { label:"Deep Learning",    color:"rgba(238,76,44,0.12)",  border:"rgba(238,76,44,0.25)",  items:[{name:"PyTorch",icon:"🔥",desc:"Primary DL framework"},{name:"TensorFlow",icon:"🧠",desc:"Model deployment"},{name:"CNNs",icon:"🏗️",desc:"Arch design"},{name:"YOLOv8",icon:"👁️",desc:"Object detection"}] },
  { label:"NLP & RAG",        color:"rgba(99,102,241,0.12)", border:"rgba(99,102,241,0.25)", items:[{name:"LangChain",icon:"⛓️",desc:"RAG pipelines"},{name:"FAISS",icon:"🗂️",desc:"Vector search"},{name:"Transformers",icon:"🤗",desc:"HuggingFace"},{name:"Streamlit",icon:"🌊",desc:"ML apps"}] },
  { label:"MLOps & Backend",  color:"rgba(16,185,129,0.12)", border:"rgba(16,185,129,0.25)", items:[{name:"Docker",icon:"🐳",desc:"Containerization"},{name:"FastAPI",icon:"⚡",desc:"API serving"},{name:"Flask",icon:"🌶️",desc:"Web backend"},{name:"Supabase",icon:"🟢",desc:"Database + auth"}] },
  { label:"Data & Analytics", color:"rgba(245,158,11,0.12)", border:"rgba(245,158,11,0.25)", items:[{name:"Python",icon:"🐍",desc:"Core language"},{name:"Pandas",icon:"🐼",desc:"Data wrangling"},{name:"NumPy",icon:"🔢",desc:"Numerical ops"},{name:"Power BI",icon:"📊",desc:"Dashboards"}] },
];

function StackCard({ group, delay }) {
  return (
    <ZoomReveal delay={delay}>
      <div style={{ borderRadius:20, background:group.color, border:`1px solid ${group.border}`, backdropFilter:"blur(16px)", padding:"28px 28px 24px", height:"100%" }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:2.5, textTransform:"uppercase", color:"rgba(255,255,255,0.45)", marginBottom:20 }}>{group.label}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {group.items.map((it, i) => (
            <ZoomReveal key={it.name} delay={delay + i * 60}>
              <div style={{ padding:"14px 16px", borderRadius:14, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", gap:12, cursor:"default", transition:"all 0.3s cubic-bezier(0.23,1,0.32,1)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "scale(1.06) translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.transform = "scale(1) translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <span style={{ fontSize:26 }}>{it.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:600, lineHeight:1.2 }}>{it.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginTop:2 }}>{it.desc}</div>
                </div>
              </div>
            </ZoomReveal>
          ))}
        </div>
      </div>
    </ZoomReveal>
  );
}

/* ══════════════════════════════════════════
   EXPERIENCE ROWS  (expandable)
══════════════════════════════════════════ */
const experiences = [
  {
    role:"Artificial Intelligence Intern",
    co:"GlowLogics Solutions",
    period:"2024",
    tag:"AI",
    bullets:[
      "Developed and evaluated supervised learning models — classification and regression pipelines using Scikit-learn and Python, contributing to internal ML proof-of-concept initiatives.",
      "Applied unsupervised learning techniques including K-Means clustering and PCA-based dimensionality reduction to extract patterns from unlabelled datasets.",
      "Built and trained deep learning models using PyTorch, covering feed-forward networks and CNNs for image classification tasks.",
      "Gained end-to-end ML workflow experience: data preprocessing, feature engineering, model training, cross-validation, and performance evaluation using standard metrics.",
    ],
  },
  {
    role:"SteelSense AI — Lead Engineer",
    co:"Self-initiated · YOLOv8 + Flask + Docker · HuggingFace",
    period:"2024",
    tag:"CV",
    bullets:[
      "Engineered a real-time steel surface defect detection system using YOLOv8 — classifies 6 defect types with confidence scoring and severity analysis.",
      "Built a production REST API with Flask; integrated Gemini Vision API for intelligent defect explanation and Supabase for persistent inspection record storage.",
      "Containerized the full application with Docker and deployed on Hugging Face Spaces — publicly live and accessible.",
    ],
  },
  {
    role:"AI Workplace Burnout Risk Predictor",
    co:"End-to-end ML · Deployed on Streamlit",
    period:"2024",
    tag:"ML",
    bullets:[
      "Built end-to-end ML pipeline predicting employee burnout risk and productivity scores from workplace and AI adoption data.",
      "Trained and compared SVM, Random Forest, and Naive Bayes models; selected best performer via F1-Score and RMSLE — serialized with Joblib for production use.",
      "Deployed as an interactive Streamlit dashboard, live on Streamlit Cloud.",
    ],
  },
  {
    role:"PyTorch Deep Learning Projects",
    co:"CNN · Transfer Learning · ResNet",
    period:"2024",
    tag:"DL",
    bullets:[
      "Implemented custom CNN architectures, full training loops with validation, early stopping, and model checkpointing from scratch using PyTorch.",
      "Applied transfer learning with ResNet for image classification; covered autograd, gradient descent, loss functions, and dropout in depth.",
    ],
  },
];

function ExperienceRows() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div>
      {experiences.map((e, i) => (
        <Reveal key={e.role} delay={i * 70}>
          <div>
            <div
              className="erow"
              style={{ cursor:"pointer" }}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <span style={{ fontSize:12,color:"rgba(255,255,255,0.28)",minWidth:64,fontFamily:"'Syne',sans-serif" }}>{e.period}</span>
              <div style={{ padding:"4px 12px",borderRadius:7,background:"rgba(99,102,241,0.12)",border:"1px solid rgba(99,102,241,0.26)",fontSize:10,fontWeight:700,letterSpacing:2,color:"#c4b5fd",textAlign:"center",textTransform:"uppercase",flexShrink:0 }}>{e.tag}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontWeight:600,fontSize:17,marginBottom:3 }}>{e.role}</div>
                <div style={{ fontSize:13,color:"rgba(255,255,255,0.36)" }}>{e.co}</div>
              </div>
              <span style={{ fontSize:18,opacity:0.4,transition:"transform 0.3s",transform:openIdx===i?"rotate(90deg)":"rotate(0deg)",display:"inline-block" }}>›</span>
            </div>
            {/* Expandable description */}
            <div style={{
              maxHeight: openIdx === i ? 400 : 0,
              overflow: "hidden",
              transition: "max-height 0.5s cubic-bezier(0.16,1,0.3,1)",
            }}>
              <div style={{ padding:"18px 0 24px 76px", borderBottom:"1px solid rgba(255,255,255,0.055)" }}>
                {e.bullets.map((b, j) => (
                  <div key={j} style={{ display:"flex",gap:12,marginBottom:10,alignItems:"flex-start" }}>
                    <div style={{ width:5,height:5,borderRadius:"50%",background:"linear-gradient(135deg,#a78bfa,#60a5fa)",flexShrink:0,marginTop:7 }} />
                    <p style={{ fontSize:14,color:"rgba(255,255,255,0.5)",lineHeight:1.75,fontWeight:300 }}>{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════
   PROJECT MODAL
══════════════════════════════════════════ */
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const esc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{ position:"fixed",inset:0,zIndex:5000,background:"rgba(0,0,0,0.75)",backdropFilter:"blur(12px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px" }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{ background:"rgba(10,10,18,0.98)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:28,padding:"44px 48px",maxWidth:680,width:"100%",maxHeight:"85vh",overflowY:"auto",position:"relative",boxShadow:"0 40px 120px rgba(0,0,0,0.8)" }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position:"absolute",top:20,right:24,background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:"50%",width:36,height:36,color:"white",fontSize:18,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.14)"}
          onMouseLeave={e => e.currentTarget.style.background="rgba(255,255,255,0.07)"}>
          ✕
        </button>

        {/* Tags */}
        <div style={{ display:"flex",gap:10,marginBottom:22,flexWrap:"wrap" }}>
          <span style={{ padding:"4px 14px",borderRadius:100,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.11)",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.5)" }}>{project.tag}</span>
          {project.sub && <span style={{ padding:"4px 14px",borderRadius:100,background:"rgba(99,102,241,0.13)",border:"1px solid rgba(99,102,241,0.28)",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#c4b5fd" }}>{project.sub}</span>}
          <span style={{ padding:"4px 14px",borderRadius:100,background:"rgba(74,222,128,0.08)",border:"1px solid rgba(74,222,128,0.22)",fontSize:11,fontWeight:600,letterSpacing:2,textTransform:"uppercase",color:"#4ade80" }}>Live ✦</span>
        </div>

        <h2 style={{ fontFamily:"'Syne',sans-serif",fontSize:28,fontWeight:800,lineHeight:1.2,marginBottom:18,letterSpacing:-0.5 }}>{project.title}</h2>
        <p style={{ fontSize:15,color:"rgba(255,255,255,0.5)",lineHeight:1.85,marginBottom:24,fontWeight:300 }}>{project.desc}</p>

        {project.impact && (
          <div style={{ padding:"14px 18px",borderRadius:14,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",fontSize:14,color:"rgba(196,181,253,0.9)",lineHeight:1.6,marginBottom:28 }}>
            <strong style={{ color:"#c4b5fd" }}>Impact: </strong>{project.impact}
          </div>
        )}

        {project.stack && (
          <div style={{ marginBottom:32 }}>
            <div style={{ fontSize:11,letterSpacing:2.5,textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:14 }}>Tech Stack</div>
            <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
              {project.stack.map(s => (
                <span key={s} style={{ padding:"6px 14px",borderRadius:8,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",fontSize:12,color:"rgba(255,255,255,0.65)" }}>{s}</span>
              ))}
            </div>
          </div>
        )}

        <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
          <a href={project.link} target="_blank" rel="noopener noreferrer"
            style={{ padding:"13px 28px",borderRadius:100,background:"white",color:"#050508",fontWeight:700,fontSize:13,textDecoration:"none",transition:"all 0.25s",display:"inline-block" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>
            Live Demo ↗
          </a>
          {project.ghLink && (
            <a href={project.ghLink} target="_blank" rel="noopener noreferrer"
              style={{ padding:"12px 26px",borderRadius:100,background:"transparent",color:"white",fontWeight:600,fontSize:13,border:"1px solid rgba(255,255,255,0.2)",textDecoration:"none",transition:"all 0.25s",display:"inline-block" }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.45)"; }}
              onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(255,255,255,0.2)"; }}>
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN
══════════════════════════════════════════ */
export default function Portfolio() {
  const [scroll, setScroll] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const fn = () => setScroll(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navAlpha = Math.min(scroll / 80, 1);
  const PDF = "/Aishwarya_Joshi_Resume.pdf";

  const mq1 = ["Deep Learning","Computer Vision","AI Engineer","PyTorch","NLP","RAG Systems","YOLOv8","Neural Networks"];
  const mq2 = ["PyTorch","YOLOv8","LangChain","FAISS","FastAPI","Docker","Streamlit","OpenCV","TensorFlow"];

  const projects = [
    {
      num:"01", tag:"Computer Vision", sub:"YOLOv8",
      title:"SteelSense AI — Industrial Defect Detection",
      desc:"End-to-end steel surface defect detection using YOLOv8, Gemini Vision API, Flask backend, and Supabase for real-time defect logging and analytics.",
      impact:"94%+ accuracy on industrial defect classification with sub-100ms inference time.",
      stack:["Python","YOLOv8","PyTorch","Flask","Gemini Vision API","Supabase","Docker","Hugging Face"],
      link:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai",
      ghLink:"https://github.com/Aishwarya-J05",
    },
    {
      num:"02", tag:"ML Pipeline", sub:"Scikit-learn",
      title:"AI Workplace Burnout Risk Predictor",
      desc:"End-to-end ML pipeline predicting employee burnout risk and productivity scores from workplace and AI adoption data. Features comprehensive EDA, feature engineering, and model benchmarking.",
      impact:"Random Forest selected via F1-Score & RMSLE — deployed as interactive Streamlit dashboard, live on Streamlit Cloud.",
      stack:["Python","Pandas","Scikit-learn","SVM","Random Forest","Naive Bayes","Streamlit","Joblib"],
      link:"https://burnoutiq.streamlit.app",
      ghLink:"https://github.com/Aishwarya-J05",
    },
    {
      num:"03", tag:"Deep Learning", sub:"PyTorch",
      title:"PyTorch Deep Learning Projects",
      desc:"Core deep learning components implemented from scratch — custom CNN architectures, full training loops with validation, early stopping, model checkpointing, dropout, and transfer learning with ResNet.",
      impact:"Covers autograd, gradient descent, loss functions, and full transfer learning pipeline — foundational for production deep learning systems.",
      stack:["Python","PyTorch","CNN","ResNet","Transfer Learning","MNIST","NumPy"],
      link:"https://github.com/Aishwarya-J05",
      ghLink:"https://github.com/Aishwarya-J05",
    },
    {
      num:"04", tag:"Computer Vision", sub:"YOLOv8 + Docker",
      title:"SteelSense AI — Production Deployment",
      desc:"Containerized the full SteelSense AI application with Docker and deployed on Hugging Face Spaces. Integrates Gemini Vision API for intelligent defect explanation and Supabase for persistent inspection records with analytics.",
      impact:"Publicly live and accessible — demonstrates complete MLOps cycle from model training to containerized cloud deployment.",
      stack:["Docker","Hugging Face Spaces","Flask","Supabase","Gemini Vision API","REST API"],
      link:"https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai",
      ghLink:"https://github.com/Aishwarya-J05",
    },
  ];

  return (
    <div style={{ background:"#050508", color:"#f0f0f5", fontFamily:"'DM Sans','Inter',sans-serif", minHeight:"100vh", overflowX:"hidden" }}>
      {/* PROJECT MODAL */}
      {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');
        *{margin:0;padding:0;box-sizing:border-box} html{scroll-behavior:smooth} body{cursor:none}
        a{color:inherit;text-decoration:none}
        ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:#050508} ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.16);border-radius:100px}
        @keyframes mF{from{transform:translateX(0)}to{transform:translateX(-33.33%)}}
        @keyframes mR{from{transform:translateX(-33.33%)}to{transform:translateX(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes gShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        .nl{font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;opacity:0.42;transition:opacity 0.2s;position:relative;cursor:pointer}
        .nl:hover{opacity:1}
        .nl::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:white;transition:width 0.3s cubic-bezier(0.23,1,0.32,1)}
        .nl:hover::after{width:100%}
        .ht{font-family:'Syne',sans-serif;font-size:clamp(48px,8.5vw,116px);font-weight:800;line-height:0.92;letter-spacing:-3px}
        .st{font-family:'Syne',sans-serif;font-size:clamp(34px,5vw,68px);font-weight:800;letter-spacing:-2px;line-height:1.02}
        .glow{background:linear-gradient(130deg,#fff 0%,rgba(255,255,255,0.52) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .acc{background:linear-gradient(130deg,#a78bfa,#60a5fa,#f472b6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-size:200%;animation:gShift 5s ease infinite}
        .bp{padding:16px 38px;border-radius:100px;background:white;color:#050508;font-weight:700;font-size:13px;letter-spacing:0.5px;border:none;cursor:pointer;transition:all 0.3s;display:inline-block;font-family:inherit}
        .bp:hover{transform:scale(1.06);box-shadow:0 0 52px rgba(255,255,255,0.26)}
        .bg2{padding:15px 36px;border-radius:100px;background:transparent;color:white;font-weight:600;font-size:13px;letter-spacing:0.5px;border:1px solid rgba(255,255,255,0.2);cursor:pointer;transition:all 0.3s;display:inline-block;font-family:inherit}
        .bg2:hover{background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.48)}
        .resume-btn{padding:10px 22px;border-radius:100px;background:linear-gradient(130deg,rgba(167,139,250,0.18),rgba(96,165,250,0.18));border:1px solid rgba(167,139,250,0.35);color:white;font-size:12px;font-weight:700;letter-spacing:1px;cursor:pointer;transition:all 0.3s;display:inline-flex;align-items:center;gap:8px;font-family:inherit;text-decoration:none}
        .resume-btn:hover{background:linear-gradient(130deg,rgba(167,139,250,0.32),rgba(96,165,250,0.32));border-color:rgba(167,139,250,0.65);box-shadow:0 0 28px rgba(167,139,250,0.25)}
        .erow{display:flex;align-items:center;gap:22px;padding:26px 0;border-bottom:1px solid rgba(255,255,255,0.055);transition:all 0.3s;cursor:default}
        .erow:hover{padding-left:10px;border-color:rgba(255,255,255,0.18)}
        .pp{border-radius:24px;background:linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01));border:2px dashed rgba(255,255,255,0.11);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;opacity:0.58}
      `}</style>

      {/* Glowing interactive grid */}
      <GlowGrid />

      {/* Noise */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:998,opacity:0.018,backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      {/* Orbs */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-15%",left:"-8%",width:700,height:700,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 70%)",filter:"blur(60px)",animation:"floatY 9s ease-in-out infinite" }} />
        <div style={{ position:"absolute",top:"35%",right:"-12%",width:560,height:560,borderRadius:"50%",background:"radial-gradient(circle,rgba(168,85,247,0.09) 0%,transparent 70%)",filter:"blur(80px)",animation:"floatY 11s ease-in-out infinite 2s" }} />
        <div style={{ position:"absolute",bottom:"5%",left:"25%",width:460,height:460,borderRadius:"50%",background:"radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)",filter:"blur(60px)",animation:"floatY 13s ease-in-out infinite 4s" }} />
      </div>

      <Cursor />

      {/* ══ NAV ══ */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"20px 64px",display:"flex",alignItems:"center",justifyContent:"space-between",background:`rgba(5,5,8,${navAlpha*0.9})`,backdropFilter:scroll>20?"blur(22px)":"none",borderBottom:`1px solid rgba(255,255,255,${scroll>20?0.055:0})`,transition:"all 0.4s" }}>
        <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:20,letterSpacing:-0.5 }}>
          <span className="acc">AI</span><span style={{ opacity:0.9 }}>shwarya.</span>
        </div>
        <div style={{ display:"flex",gap:36,alignItems:"center" }}>
          {["Work","About","Skills","Contact"].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`} className="nl">{s}</a>
          ))}
          {/* Resume button — opens PDF in new tab */}
          <a href={PDF} target="_blank" rel="noopener noreferrer" className="resume-btn">
            <span>📄</span> Resume
          </a>
          <Mag className="bg2" style={{ padding:"10px 22px",fontSize:11 }} href="mailto:aishwaryajoshi554@gmail.com">Hire Me ↗</Mag>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",padding:"0 64px",paddingTop:120,overflow:"hidden" }}>
        <NeonWaves />
        <div style={{ position:"absolute",top:150,right:80,zIndex:10 }}>
          <RotBadge text="• AVAILABLE JUNE 2026 • AI / ML ENGINEER • OPEN TO WORK • " sz={148} />
        </div>

        <div style={{ position:"relative",zIndex:5,maxWidth:900,width:"100%",margin:"0 auto" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,marginBottom:44,padding:"8px 20px 8px 12px",borderRadius:100,background:"rgba(255,255,255,0.055)",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(12px)",animation:"fadeUp 0.8s ease 0.1s both" }}>
            <div style={{ width:8,height:8,borderRadius:"50%",background:"#4ade80",animation:"pulse 2s infinite",boxShadow:"0 0 10px rgba(74,222,128,0.6)" }} />
            <span style={{ fontSize:11,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600,color:"rgba(255,255,255,0.62)" }}>Open to Opportunities · Graduating June 2026</span>
          </div>

          <div style={{ animation:"fadeUp 0.9s ease 0.3s both" }}>
            <h1 className="ht"><span className="glow">Building</span></h1>
            <h1 className="ht"><span className="acc">Intelligent</span></h1>
            <h1 className="ht" style={{ marginBottom:40 }}><span className="glow">Systems.</span></h1>
          </div>

          <div style={{ animation:"fadeUp 0.9s ease 0.5s both" }}>
            <p style={{ fontSize:18,color:"rgba(255,255,255,0.46)",lineHeight:1.85,maxWidth:560,marginBottom:48,fontWeight:300 }}>
              AI/ML Engineer specializing in <strong style={{ color:"rgba(255,255,255,0.82)",fontWeight:500 }}>Deep Learning</strong> & <strong style={{ color:"rgba(255,255,255,0.82)",fontWeight:500 }}>Computer Vision</strong>. Turning raw research into production-ready systems.
            </p>
            <div style={{ display:"flex",gap:16,flexWrap:"wrap",marginBottom:64 }}>
              <Mag className="bp" href="#work">View My Work</Mag>
              <Mag className="bg2" href="mailto:aishwaryajoshi554@gmail.com">aishwaryajoshi554@gmail.com ↗</Mag>
            </div>
          </div>

          <div style={{ display:"flex",gap:56,animation:"fadeUp 0.9s ease 0.7s both",flexWrap:"wrap" }}>
            {[["3+","Projects Live"],["5+","Frameworks"],["9.41","CGPA · VTU"],["B.E","Final Year"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily:"'Syne',sans-serif",fontSize:40,fontWeight:800,lineHeight:1,background:"linear-gradient(130deg,#fff,rgba(255,255,255,0.45))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>{n}</div>
                <div style={{ fontSize:11,color:"rgba(255,255,255,0.36)",letterSpacing:2,textTransform:"uppercase",marginTop:6 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position:"absolute",bottom:44,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8,opacity:0.36,animation:"fadeUp 1s ease 1.1s both",zIndex:5 }}>
          <span style={{ fontSize:10,letterSpacing:3,textTransform:"uppercase" }}>Scroll</span>
          <div style={{ width:1,height:44,background:"white",animation:"pulse 2s infinite" }} />
        </div>
      </section>

      {/* MARQUEE 1 */}
      <div style={{ padding:"34px 0",borderTop:"1px solid rgba(255,255,255,0.05)",borderBottom:"1px solid rgba(255,255,255,0.05)",position:"relative",zIndex:1 }}>
        <Marquee items={mq1} speed={32} />
      </div>

      {/* ══ ABOUT ══ */}
      <section id="about" style={{ padding:"140px 64px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:90,alignItems:"center" }}>
          <div>
            <Reveal>
              <p style={{ fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:20 }}>About Me</p>
              <h2 className="st" style={{ marginBottom:32 }}>Not just models.<br /><span className="acc">Impact.</span></h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ fontSize:17,color:"rgba(255,255,255,0.48)",lineHeight:1.85,marginBottom:20,fontWeight:300 }}>
                I'm Aishwarya, a final-year B.Tech (ECE) student at VTU with a 9.41 CGPA. I build production-ready AI systems — from real-time defect detection to RAG chatbots that actually understand research papers.
              </p>
              <p style={{ fontSize:17,color:"rgba(255,255,255,0.48)",lineHeight:1.85,marginBottom:40,fontWeight:300 }}>
                Every project I ship is containerized, deployed, and publicly accessible. Not notebook-grade — production-grade.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div style={{ display:"flex",gap:14,flexWrap:"wrap" }}>
                <Mag className="bp"  href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer" style={{ fontSize:12,padding:"12px 28px" }}>GitHub ↗</Mag>
                <Mag className="bg2" href="https://linkedin.com/in/aishwaryajoshiaiml" target="_blank" rel="noopener noreferrer" style={{ fontSize:12,padding:"12px 28px" }}>LinkedIn ↗</Mag>
                <Mag className="bg2" href="https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai" target="_blank" rel="noopener noreferrer" style={{ fontSize:12,padding:"12px 28px" }}>HuggingFace ↗</Mag>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div style={{ position:"relative" }}>
              <img
  src={myPhoto}
  alt="Aishwarya Joshi"
  style={{
    width: "100%",
    aspectRatio: "4/5",
    borderRadius: 28,
    objectFit: "cover",
    objectPosition: "center top",
    display: "block",
    border: "1px solid rgba(255,255,255,0.08)"
  }}
/>
              <Tilt style={{ position:"absolute",bottom:28,right:-36,padding:"20px 22px",borderRadius:18,background:"rgba(5,5,8,0.92)",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(22px)",width:220 }}>
                <div style={{ fontSize:10,color:"rgba(255,255,255,0.36)",marginBottom:12,letterSpacing:2,textTransform:"uppercase" }}>Core Skills</div>
                {["Computer Vision","Deep Learning","LLM / RAG"].map(s => (
                  <div key={s} style={{ display:"flex",alignItems:"center",gap:9,marginBottom:9 }}>
                    <div style={{ width:6,height:6,borderRadius:"50%",background:"linear-gradient(135deg,#a78bfa,#60a5fa)",flexShrink:0 }} />
                    <span style={{ fontSize:13,fontWeight:500 }}>{s}</span>
                  </div>
                ))}
              </Tilt>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ WORK ══ */}
      <section id="work" style={{ padding:"120px 64px",position:"relative",zIndex:1,background:"rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth:1200,margin:"0 auto" }}>
          <Reveal>
            <p style={{ fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:18 }}>Selected Projects</p>
            <h2 className="st" style={{ marginBottom:14 }}>Work that<br /><span className="acc">matters.</span></h2>
            <p style={{ fontSize:16,color:"rgba(255,255,255,0.38)",marginBottom:70,maxWidth:480,fontWeight:300 }}>Live demo & GitHub on every card. Click the image for full details.</p>
          </Reveal>
          <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24 }}>
            {projects.map((p, i) => <PCard key={p.num} {...p} delay={i * 100} onOpen={() => setActiveProject(p)} />)}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section style={{ padding:"100px 0 80px",position:"relative",zIndex:1,overflow:"hidden" }}>
        <div style={{ padding:"0 64px 48px" }}>
          <Reveal>
            <p style={{ fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:16 }}>Visual Gallery</p>
            <h2 className="st">Project <span className="acc">Visuals.</span></h2>
            <p style={{ fontSize:14,color:"rgba(255,255,255,0.3)",marginTop:12,fontWeight:300 }}>Hover to pause · Click to open project</p>
          </Reveal>
        </div>
        <AutoGallery />
      </section>

      {/* MARQUEE 2 */}
      <div style={{ padding:"30px 0",borderTop:"1px solid rgba(255,255,255,0.048)",borderBottom:"1px solid rgba(255,255,255,0.048)",position:"relative",zIndex:1,overflow:"hidden" }}>
        <Marquee items={mq2} speed={22} reverse />
      </div>

      {/* ══ SKILLS ══ */}
      <section id="skills" style={{ padding:"120px 64px",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1 }}>
        <Reveal>
          <p style={{ fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:18 }}>Tech Stack</p>
          <h2 className="st" style={{ marginBottom:56 }}>The <span className="acc">stack.</span></h2>
        </Reveal>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:20 }}>
          {stackGroups.map((g, i) => <StackCard key={g.label} group={g} delay={i * 100} />)}
        </div>

        <div style={{ marginTop:110 }}>
          <Reveal>
            <h2 className="st" style={{ marginBottom:44 }}>Experience<span className="acc">.</span></h2>
          </Reveal>
          <ExperienceRows />
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section id="contact" style={{ padding:"140px 64px 100px",position:"relative",zIndex:1,overflow:"hidden" }}>
        <div style={{ maxWidth:860,margin:"0 auto",textAlign:"center",position:"relative" }}>
          <div style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:"clamp(80px,16vw,220px)",lineHeight:1,color:"rgba(255,255,255,0.016)",whiteSpace:"nowrap",userSelect:"none",letterSpacing:-10,pointerEvents:"none" }}>HELLO</div>

          <Reveal>
            <p style={{ fontSize:11,letterSpacing:4,textTransform:"uppercase",color:"rgba(255,255,255,0.36)",marginBottom:20 }}>Get In Touch</p>
            <h2 className="st" style={{ marginBottom:22 }}>Let's build<br /><span className="acc">together.</span></h2>
            <p style={{ fontSize:18,color:"rgba(255,255,255,0.4)",marginBottom:20,fontWeight:300,lineHeight:1.7 }}>Open to AI/ML engineer roles and internships.</p>
            <a href="mailto:aishwaryajoshi554@gmail.com"
              style={{ display:"inline-block",fontSize:22,fontWeight:700,fontFamily:"'Syne',sans-serif",background:"linear-gradient(130deg,#a78bfa,#60a5fa,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundSize:"200%",animation:"gShift 5s ease infinite",marginBottom:56,letterSpacing:-0.5 }}>
              aishwaryajoshi554@gmail.com ↗
            </a>
          </Reveal>

          <Reveal delay={100}>
            <div style={{ display:"flex",gap:14,justifyContent:"center",marginBottom:70,flexWrap:"wrap" }}>
              <Mag className="bp" href="mailto:aishwaryajoshi554@gmail.com" style={{ fontSize:15,padding:"18px 44px" }}>✉ Send Email</Mag>
              <Mag className="bg2" href="https://linkedin.com/in/aishwaryajoshiaiml" target="_blank" rel="noopener noreferrer">LinkedIn ↗</Mag>
              <Mag className="bg2" href="https://github.com/Aishwarya-J05" target="_blank" rel="noopener noreferrer">GitHub ↗</Mag>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div style={{ display:"flex",justifyContent:"center",marginBottom:60 }}>
              <RotBadge text="• CONNECT WITH ME • HIRE ME • LET'S COLLABORATE • " sz={180} />
            </div>
          </Reveal>

          <Reveal delay={300}>
            <Tilt style={{ borderRadius:24,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",backdropFilter:"blur(24px)",padding:"40px 48px",display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:32,textAlign:"left" }}>
              {[
                { label:"Email",    val:"aishwaryajoshi554@gmail.com", icon:"✉",  href:"mailto:aishwaryajoshi554@gmail.com" },
                { label:"LinkedIn", val:"/aishwaryajoshiaiml",         icon:"🔗", href:"https://linkedin.com/in/aishwaryajoshiaiml" },
                { label:"GitHub",   val:"/Aishwarya-J05",              icon:"⚡", href:"https://github.com/Aishwarya-J05" },
              ].map(c => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",color:"inherit" }}>
                  <div style={{ fontSize:24,marginBottom:10 }}>{c.icon}</div>
                  <div style={{ fontSize:10,letterSpacing:2,textTransform:"uppercase",color:"rgba(255,255,255,0.34)",marginBottom:6 }}>{c.label}</div>
                  <div style={{ fontSize:13,fontWeight:500,color:"rgba(255,255,255,0.74)",wordBreak:"break-all" }}>{c.val}</div>
                </a>
              ))}
            </Tilt>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ padding:"32px 64px",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative",zIndex:1,flexWrap:"wrap",gap:16 }}>
        <div style={{ fontFamily:"'Syne',sans-serif",fontWeight:800,fontSize:18 }}><span className="acc">AI</span><span>shwarya.</span></div>
        <div style={{ fontSize:12,color:"rgba(255,255,255,0.26)",letterSpacing:1 }}>Designed & Built by Aishwarya Joshi · 2025</div>
        <div style={{ display:"flex",gap:16,alignItems:"center" }}>
          {[["GitHub","https://github.com/Aishwarya-J05"],["LinkedIn","https://linkedin.com/in/aishwaryajoshiaiml"],["HuggingFace","https://huggingface.co/spaces/AishwaryaNJ/steelsense-ai"]].map(([s, h]) => (
            <a key={s} href={h} target="_blank" rel="noopener noreferrer" className="nl" style={{ fontSize:11 }}>{s}</a>
          ))}
          {/* Download resume in footer */}
          <a href={PDF} download="Aishwarya_Joshi_Resume.pdf"
            style={{ padding:"8px 18px",borderRadius:100,background:"rgba(167,139,250,0.12)",border:"1px solid rgba(167,139,250,0.3)",fontSize:11,fontWeight:700,color:"#c4b5fd",letterSpacing:1,cursor:"pointer",transition:"all 0.3s",textDecoration:"none" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(167,139,250,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(167,139,250,0.12)"; }}>
            ↓ Download CV
          </a>
        </div>
      </footer>
    </div>
  );
}
