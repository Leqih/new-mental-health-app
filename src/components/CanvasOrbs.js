    const { useEffect, useRef, useState } = React;
    /* ── GRAINIENT CANVAS BACKGROUND ── */
    function GrainientBg({ c1='#FF9FFC', c2='#5227FF', c3='#B497CF', speed=0.25, sat=1 }) {
      const cvs = useRef(null);
      useEffect(() => {
        const canvas = cvs.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        let t = 0, raf;
        const hr = h => [parseInt(h.slice(1,3),16), parseInt(h.slice(3,5),16), parseInt(h.slice(5,7),16)];
        /* static grain texture */
        const gc = document.createElement('canvas'); gc.width = gc.height = 256;
        const gx = gc.getContext('2d');
        const gd = gx.createImageData(256,256);
        for (let i = 0; i < gd.data.length; i+=4) {
          const v = Math.random()*255|0;
          gd.data[i] = gd.data[i+1] = gd.data[i+2] = v; gd.data[i+3] = 26;
        }
        gx.putImageData(gd, 0, 0);
        const draw = () => {
          t += speed * 0.012;
          const blobs = [
            { x:W*(0.55+0.30*Math.sin(t)),           y:H*(0.25+0.20*Math.cos(t*0.65)),  r:W*0.85, c:hr(c1) },
            { x:W*(0.15+0.30*Math.cos(t*0.72)),      y:H*(0.75+0.18*Math.sin(t*0.82)),  r:W*0.75, c:hr(c2) },
            { x:W*(0.82+0.16*Math.sin(t*1.18)),      y:H*(0.50+0.26*Math.cos(t*0.52)),  r:W*0.65, c:hr(c3) },
            { x:W*(0.40+0.22*Math.cos(t*0.95)),      y:H*(0.15+0.12*Math.sin(t*1.30)),  r:W*0.50, c:hr(c2) },
          ];
          const [r1,g1,b1] = hr(c1); const [r2,g2,b2] = hr(c2);
          ctx.fillStyle = `rgb(${(r1+r2)>>1},${(g1+g2)>>1},${(b1+b2)>>1})`;
          ctx.fillRect(0,0,W,H);
          for (const b of blobs) {
            const grd = ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
            grd.addColorStop(0, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0.88)`);
            grd.addColorStop(1, `rgba(${b.c[0]},${b.c[1]},${b.c[2]},0)`);
            ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);
          }
          /* grain overlay */
          ctx.save();
          ctx.globalCompositeOperation = 'overlay';
          ctx.fillStyle = ctx.createPattern(gc,'repeat');
          ctx.fillRect(0,0,W,H);
          ctx.restore();
          raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
      }, [c1,c2,c3]);
      return (
        <div style={{ position:'absolute', inset:0, overflow:'hidden' }}>
          <canvas ref={cvs} width={430} height={920} style={{ position:'absolute', top:'-4%', left:'-5%', width:'110%', height:'108%', display:'block', filter:`url(#gw) contrast(1.2) brightness(1.12) saturate(${sat})` }} />
        </div>
      );
    }

    /* ── ORB CANVAS BLOB ── */
    function OrbCanvas() {
      const cvs = useRef(null);
      useEffect(() => {
        const canvas = cvs.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        let t = 0, raf;
        const N = 7;
        const animate = () => {
          ctx.clearRect(0, 0, W, H);
          t += 0.018;
          const cx = W * 0.5, cy = H * 0.5;
          const baseR = W * 0.36;
          const pts = [];
          for (let i = 0; i < N; i++) {
            const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
            const r = baseR * (1 + 0.28 * Math.sin(t * 0.9 + i * 1.3) + 0.14 * Math.cos(t * 1.4 + i * 2.1) + 0.08 * Math.sin(t * 2.1 + i * 0.7));
            pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
          }
          ctx.beginPath();
          for (let i = 0; i < N; i++) {
            const p0 = pts[(i - 1 + N) % N];
            const p1 = pts[i];
            const p2 = pts[(i + 1) % N];
            const p3 = pts[(i + 2) % N];
            const ten = 0.42;
            const cp1x = p1.x + (p2.x - p0.x) * ten / 3;
            const cp1y = p1.y + (p2.y - p0.y) * ten / 3;
            const cp2x = p2.x - (p3.x - p1.x) * ten / 3;
            const cp2y = p2.y - (p3.y - p1.y) * ten / 3;
            if (i === 0) ctx.moveTo(p1.x, p1.y);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
          }
          ctx.closePath();
          const grd = ctx.createRadialGradient(cx - W*0.06, cy - H*0.06, 0, cx, cy, baseR * 1.6);
          grd.addColorStop(0,    'rgba(48,  40, 230, 1)');
          grd.addColorStop(0.18, 'rgba(70,  60, 245, 0.98)');
          grd.addColorStop(0.38, 'rgba(90, 100, 255, 0.90)');
          grd.addColorStop(0.58, 'rgba(130, 160, 255, 0.68)');
          grd.addColorStop(0.78, 'rgba(175, 210, 255, 0.35)');
          grd.addColorStop(1,    'rgba(210, 230, 255, 0)');
          ctx.fillStyle = grd;
          ctx.fill();
          raf = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(raf);
      }, []);
      return React.createElement('canvas', {
        ref: cvs, width: 155, height: 155,
        style: { position:'absolute', inset:0, width:'100%', height:'100%', filter:'blur(5px)' }
      });
    }

    /* ── VOICE ORB (green-blue, for talk mode) ── */
    function VoiceOrbCanvas() {
      const cvs = useRef(null);
      useEffect(() => {
        const canvas = cvs.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const W = canvas.width, H = canvas.height;
        let t = 0, raf;
        const N = 8;
        const animate = () => {
          ctx.clearRect(0, 0, W, H);
          t += 0.016;
          const cx = W * 0.5, cy = H * 0.5;
          const baseR = W * 0.34;
          const pts = [];
          for (let i = 0; i < N; i++) {
            const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
            const r = baseR * (1 + 0.24 * Math.sin(t * 0.85 + i * 1.2) + 0.11 * Math.cos(t * 1.3 + i * 2.0) + 0.07 * Math.sin(t * 2.1 + i * 0.8));
            pts.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
          }
          ctx.beginPath();
          for (let i = 0; i < N; i++) {
            const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
            const ten = 0.42;
            const cp1x = p1.x + (p2.x - p0.x) * ten / 3, cp1y = p1.y + (p2.y - p0.y) * ten / 3;
            const cp2x = p2.x - (p3.x - p1.x) * ten / 3, cp2y = p2.y - (p3.y - p1.y) * ten / 3;
            if (i === 0) ctx.moveTo(p1.x, p1.y);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
          }
          ctx.closePath();
          const grd = ctx.createRadialGradient(cx - W*0.06, cy - H*0.08, 0, cx, cy, baseR * 1.5);
          grd.addColorStop(0,    'rgba(120, 255, 180, 0.98)');
          grd.addColorStop(0.22, 'rgba(40,  220, 200, 0.92)');
          grd.addColorStop(0.45, 'rgba(0,   170, 255, 0.80)');
          grd.addColorStop(0.68, 'rgba(60,  100, 255, 0.50)');
          grd.addColorStop(0.88, 'rgba(80,  60,  220, 0.20)');
          grd.addColorStop(1,    'rgba(60,  40,  180, 0)');
          ctx.fillStyle = grd;
          ctx.fill();
          raf = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(raf);
      }, []);
      return React.createElement('canvas', {
        ref: cvs, width: 200, height: 200,
        style: { position:'absolute', inset:0, width:'100%', height:'100%', filter:'blur(4px)' }
      });
    }

    /* ── VOICE MODE OVERLAY — light style, same orb ── */
    function VoiceModeOverlay({ onClose }) {
      const [dots, setDots] = useState('');
      const [micMuted, setMicMuted] = useState(false);
      const [toast, setToast] = useState('');
      useEffect(() => {
        const id = setInterval(() => setDots(d => d.length >= 3 ? '' : d + '.'), 520);
        return () => clearInterval(id);
      }, []);
      const toggleMic = () => {
        const next = !micMuted;
        setMicMuted(next);
        setToast(next ? 'Microphone muted' : 'Microphone unmuted');
        setTimeout(() => setToast(''), 2200);
      };
      return (
        <div style={{ position:'absolute', inset:0, zIndex:150, background:'linear-gradient(175deg, #f4eeff 0%, #e8dfff 35%, #ede6ff 70%, #f0ecff 100%)', display:'flex', flexDirection:'column', alignItems:'center', userSelect:'none' }}>

          {/* Top bar — same white card style as AI Chat */}
          <div style={{ width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center', padding:'54px 20px 0' }}>
            <div style={{ width:36 }} />
            <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', padding:'7px 20px', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 2px 8px rgba(20,20,19,0.05)' }}>
              <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Voice Session</span>
            </div>
            <div onClick={onClose} style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', width:36, height:36, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 2px 8px rgba(20,20,19,0.05)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#141413" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </div>
          </div>

          {/* Same orb, bigger (210px) to signal active listening */}
          <div style={{ position:'relative', width:210, height:210, marginTop:66, flexShrink:0 }}>
            {[0, 1.4, 2.8].map((delay, i) => (
              <div key={i} style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(160,130,230,0.18)', animation:`orbRipple 3.6s ease-out ${delay}s infinite`, pointerEvents:'none' }} />
            ))}
            <div style={{ position:'absolute', inset:-36, borderRadius:'50%', background:'radial-gradient(circle, rgba(150,120,240,0.20) 0%, rgba(160,130,255,0.08) 55%, transparent 72%)', animation:'orbBreath 4s ease-in-out infinite', pointerEvents:'none' }} />
            <div style={{ width:210, height:210, borderRadius:'50%', background:'rgba(255,255,255,0.75)', backdropFilter:'blur(24px) saturate(1.2)', WebkitBackdropFilter:'blur(24px) saturate(1.2)', border:'1px solid rgba(255,255,255,0.92)', boxShadow:'0 10px 50px rgba(110,80,220,0.16), 0 2px 0 rgba(255,255,255,0.95) inset', overflow:'hidden', position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.22)', pointerEvents:'none' }} />
              <OrbCanvas />
              <div style={{ position:'absolute', top:'6%', left:'8%', width:'46%', height:'38%', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.55) 45%, transparent 100%)', filter:'blur(5px)', pointerEvents:'none' }} />
              <div style={{ position:'absolute', bottom:'6%', right:'12%', width:'22%', height:'12%', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 100%)', filter:'blur(3px)', pointerEvents:'none' }} />
              <div style={{ position:'absolute', inset:0, borderRadius:'inherit', background:'linear-gradient(145deg, rgba(255,255,255,0.20) 0%, transparent 45%)', pointerEvents:'none' }} />
            </div>
          </div>

          {/* Toast notification */}
          {toast !== '' && (
            <div style={{ position:'absolute', top:130, left:'50%', transform:'translateX(-50%)', background:'rgba(20,20,19,0.78)', backdropFilter:'blur(12px)', borderRadius:22, padding:'9px 18px', zIndex:10, whiteSpace:'nowrap', boxShadow:'0 4px 20px rgba(20,20,19,0.15)' }}>
              <span style={{ color:'white', fontSize:13, fontWeight:600, fontFamily:'Sofia Sans,sans-serif' }}>{toast}</span>
            </div>
          )}

          {/* Listening label */}
          <p style={{ color:'rgba(20,20,19,0.4)', fontSize:14, fontWeight:600, margin:'16px 0 0', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.4px', minWidth:90, textAlign:'center' }}>{micMuted ? 'Muted' : `Listening${dots}`}</p>

          {/* Transcript */}
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 36px', textAlign:'center' }}>
            <p style={{ color:'#141413', fontSize:22, fontWeight:700, lineHeight:1.45, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.4px', margin:0 }}>I've been feeling really<br/>stressed about work lately...</p>
          </div>

          {/* Bottom controls — home card style */}
          <div style={{ width:'100%', padding:'0 22px 48px', display:'flex', alignItems:'center', gap:10 }}>
            <div onClick={onClose} style={{ flex:1, background:'rgba(255,255,255,0.90)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:22, padding:'15px 0', display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer', boxShadow:'0 4px 20px rgba(20,20,19,0.06)' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.45)" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
              <span style={{ color:'rgba(20,20,19,0.55)', fontSize:13, fontFamily:'Sofia Sans,sans-serif', fontWeight:600 }}>Switch to keyboard</span>
            </div>
            <div onClick={toggleMic} style={{ width:52, height:52, borderRadius:26, background: micMuted ? 'rgba(20,20,19,0.88)' : 'rgba(255,255,255,0.92)', border:'1px solid rgba(20,20,19,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, boxShadow:'0 4px 20px rgba(20,20,19,0.10)', transition:'background 0.2s' }}>
              {micMuted ? (
                /* Muted — white mic-off on dark bg */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="1" y1="1" x2="23" y2="23"/>
                  <path d="M9 9v3a3 3 0 005.12 2.12M15 9.34V4a3 3 0 00-5.94-.6"/>
                  <path d="M17 16.95A7 7 0 015 12v-2m14 0v2a7 7 0 01-.11 1.23"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              ) : (
                /* Active — dark mic on white bg */
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.75)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="rgba(20,20,19,0.75)"/>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                  <line x1="12" y1="19" x2="12" y2="23"/>
                  <line x1="8" y1="23" x2="16" y2="23"/>
                </svg>
              )}
            </div>
          </div>
        </div>
      );
    }

