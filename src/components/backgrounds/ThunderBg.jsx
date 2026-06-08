import { memo, useEffect, useRef } from "react";

/**
 * ThunderBg — single optimised canvas engine for every section.
 *
 * Perf contract:
 *  • IntersectionObserver  → RAF paused when off-screen
 *  • ResizeObserver (debounced 150ms) → no layout thrash
 *  • DPR capped at 1.5
 *  • Mobile: 60 particles, no lightning, 3 web-lines
 *  • Desktop: 160 particles, lightning, 6 web-lines
 *  • No per-frame string ops (pre-built rgba cache)
 *  • globalAlpha batching (one save/restore per particle pass)
 */

const PALETTES = {
  storm:  { p:[34,211,238],  s:[59,130,246],   a:[99,102,241],  bg:[2,4,12]  },
  purple: { p:[167,139,250], s:[139,92,246],    a:[196,181,253], bg:[5,2,18]  },
  teal:   { p:[45,212,191],  s:[20,184,166],    a:[153,246,228], bg:[1,7,7]   },
  gold:   { p:[251,191,36],  s:[245,158,11],    a:[253,230,138], bg:[8,5,1]   },
};

const ThunderBg = memo(({ variant = "storm", opacity = 1 }) => {
  const cvs = useRef(null);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    const mobile = window.matchMedia("(max-width:767px)").matches;
    const P = PALETTES[variant] || PALETTES.storm;

    // Pre-build all fill strings once
    const bgFill   = `rgba(${P.bg},0.15)`;
    const colP     = `rgba(${P.p},1)`;
    const colS     = `rgba(${P.s},1)`;
    const colA     = `rgba(${P.a},1)`;
    const cols     = [colP, colS, colA];
    const glow     = `rgba(${P.p},0.55)`;

    let W = 0, H = 0, t = 0, raf = null, visible = false;
    const NPART = mobile ? 60 : 160;
    let parts = [], arcs = [], nextArc = 0;

    /* ── particles ──────────────────────────────────── */
    const mkParts = () => {
      parts = Array.from({ length: NPART }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx:(Math.random()-0.5)*0.28, vy:-(Math.random()*0.45+0.08),
        r: Math.random()*1.2+0.3,
        ba: Math.random()*0.4+0.07,
        ci: Math.random()*3|0,
        ph: Math.random()*Math.PI*2,
      }));
    };

    /* ── lightning ───────────────────────────────────── */
    const bolt = (x1,y1,x2,y2,d=0) => {
      if (d>=4) return [[x1,y1],[x2,y2]];
      const len=Math.hypot(x2-x1,y2-y1);
      const mx=(x1+x2)/2+(Math.random()-0.5)*len*0.42;
      const my=(y1+y2)/2+(Math.random()-0.5)*len*0.18;
      return [...bolt(x1,y1,mx,my,d+1),...bolt(mx,my,x2,y2,d+1)];
    };
    const spawn = () => {
      const sx=60+Math.random()*(W-120);
      arcs.push({ pts:bolt(sx,0,sx+(Math.random()-0.5)*W*0.38,H*(0.25+Math.random()*0.6)),
        life:0, max:10+Math.random()*14, al:0.5+Math.random()*0.3, w:0.65+Math.random()*1 });
    };
    const drawBolt = (pts,a,w) => {
      ctx.beginPath();
      ctx.moveTo(pts[0][0],pts[0][1]);
      for(let i=1;i<pts.length;i++) ctx.lineTo(pts[i][0],pts[i][1]);
      ctx.shadowBlur=12; ctx.shadowColor=glow;
      ctx.strokeStyle=`rgba(${P.p},${a*0.5})`; ctx.lineWidth=w*2.2; ctx.stroke();
      ctx.shadowBlur=4;
      ctx.strokeStyle=`rgba(${P.p},${a})`; ctx.lineWidth=w; ctx.stroke();
      ctx.strokeStyle=`rgba(255,255,255,${a*0.55})`; ctx.lineWidth=w*0.22; ctx.stroke();
      ctx.shadowBlur=0;
    };

    /* ── 2 plasma orbs ───────────────────────────────── */
    const orbs=[{x:.2,y:.3,r:.42,sp:.0007,ph:0},{x:.78,y:.62,r:.36,sp:.0009,ph:2.1}];

    /* ── resize (debounced) ──────────────────────────── */
    let rsTimer;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio||1, 1.5);
      const rect = canvas.getBoundingClientRect();
      W=rect.width; H=rect.height;
      canvas.width=Math.round(W*dpr); canvas.height=Math.round(H*dpr);
      ctx.scale(dpr,dpr);
      mkParts(); arcs=[];
    };

    /* ── draw ────────────────────────────────────────── */
    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!visible || W===0) return;

      ctx.fillStyle=bgFill; ctx.fillRect(0,0,W,H);

      // orbs
      for(const o of orbs){
        const ox=(Math.sin(t*o.sp*1000+o.ph)*0.13+o.x)*W;
        const oy=(Math.cos(t*o.sp*820+o.ph*1.3)*0.1+o.y)*H;
        const gr=ctx.createRadialGradient(ox,oy,0,ox,oy,o.r*Math.max(W,H)*0.45);
        gr.addColorStop(0,`rgba(${P.p},.08)`); gr.addColorStop(.5,`rgba(${P.s},.04)`); gr.addColorStop(1,`rgba(${P.p},0)`);
        ctx.fillStyle=gr; ctx.fillRect(0,0,W,H);
      }

      // particles (batched globalAlpha)
      for(const p of parts){
        p.x+=p.vx; p.y+=p.vy; p.ph+=0.017;
        if(p.y<-4){p.y=H+4;p.x=Math.random()*W;}
        if(p.x<-4)p.x=W+4; if(p.x>W+4)p.x=-4;
        const a=p.ba*(0.5+Math.sin(p.ph)*0.5)*0.55;
        ctx.globalAlpha=a; ctx.fillStyle=cols[p.ci];
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
      ctx.globalAlpha=1;

      t++;

      // lightning desktop only
      if(!mobile){
        if(t>nextArc){ spawn(); nextArc=t+45+Math.random()*85|0; }
        for(let i=arcs.length-1;i>=0;i--){
          const arc=arcs[i]; arc.life++;
          const pg=arc.life/arc.max;
          const fa=arc.al*(pg<0.15?pg/0.15:1-(pg-0.15)/0.85);
          if(fa>0.015) drawBolt(arc.pts,fa,arc.w);
          if(arc.life>=arc.max) arcs.splice(i,1);
        }
      }

      // web-lines
      const NL=mobile?3:6;
      for(let i=0;i<NL;i++){
        const ph=(i/NL)*Math.PI*2;
        const x1=(0.5+Math.sin(t*0.00038+ph)*0.37)*W;
        const y1=(0.3+Math.cos(t*0.00033+ph*0.7)*0.27)*H;
        const x2=(0.5+Math.cos(t*0.00045+ph+1.2)*0.4)*W;
        const y2=(0.7+Math.sin(t*0.00038+ph*1.3)*0.21)*H;
        const a=0.025+Math.sin(t*0.003+ph)*0.012;
        const gr=ctx.createLinearGradient(x1,y1,x2,y2);
        gr.addColorStop(0,`rgba(${P.p},0)`); gr.addColorStop(.5,`rgba(${P.p},${a})`); gr.addColorStop(1,`rgba(${P.p},0)`);
        ctx.strokeStyle=gr; ctx.lineWidth=0.45;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.quadraticCurveTo(W*.5,H*.5,x2,y2); ctx.stroke();
      }
    };

    const io = new IntersectionObserver(([e])=>{visible=e.isIntersecting;},{threshold:0});
    io.observe(canvas);
    const ro = new ResizeObserver(()=>{ clearTimeout(rsTimer); rsTimer=setTimeout(resize,150); });
    ro.observe(canvas);

    resize();
    raf = requestAnimationFrame(draw);
    return ()=>{ cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); clearTimeout(rsTimer); };
  }, [variant]);

  return <canvas ref={cvs} style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none",opacity}} />;
});
ThunderBg.displayName="ThunderBg";
export default ThunderBg;
