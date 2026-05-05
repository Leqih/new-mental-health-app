    const { useCallback, useEffect, useRef, useState } = React;

    /* ── STATUS BAR ── */
    function StatusBar() {
      const [time, setTime] = useState(() => {
        const n = new Date(); return `${n.getHours()}:${String(n.getMinutes()).padStart(2,'0')}`;
      });
      useEffect(() => {
        const id = setInterval(() => {
          const n = new Date(); setTime(`${n.getHours()}:${String(n.getMinutes()).padStart(2,'0')}`);
        }, 30000);
        return () => clearInterval(id);
      }, []);
      return (
        <div style={{ position:'absolute', top:14, left:0, right:0, display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0 28px', zIndex:10 }}>
          <span style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:600, fontSize:15, color:'rgba(20,20,19,0.78)', letterSpacing:'-0.3px' }}>{time}</span>
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            <svg width="17" height="11" viewBox="0 0 17 11" fill="rgba(20,20,19,0.68)">
              <rect x="0" y="7" width="3" height="4" rx=".5"/><rect x="4.5" y="5" width="3" height="6" rx=".5"/>
              <rect x="9" y="2.5" width="3" height="8.5" rx=".5"/><rect x="13.5" y="0" width="3" height="11" rx=".5" opacity=".35"/>
            </svg>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="none" stroke="rgba(20,20,19,0.68)" strokeWidth="1.5" strokeLinecap="round">
              <path d="M8 9h.01"/><path d="M5.5 7a3.5 3.5 0 015 0"/><path d="M3 4.5a7 7 0 0110 0"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
              <rect x=".5" y=".5" width="21" height="11" rx="3" stroke="rgba(20,20,19,0.68)" strokeWidth="1"/>
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="rgba(20,20,19,0.68)"/>
              <path d="M22.5 4v4a1.5 1.5 0 000-4z" fill="rgba(20,20,19,0.68)"/>
            </svg>
          </div>
        </div>
      );
    }

    /* ── CHECK-IN SHEET ── */
    function CheckinSheet({ onClose, onSave }) {
      const [sel, setSel]   = useState(null);
      const [tags, setTags] = useState([]);
      const [note, setNote] = useState('');
      const togTag = t => setTags(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
      return (
        <div style={{ position:'absolute', inset:0, zIndex:300, background:'rgba(0,0,0,0.32)', backdropFilter:'blur(4px)', display:'flex', alignItems:'flex-end' }}
          onClick={e => e.target===e.currentTarget && onClose()}>
          <div style={{ width:'100%', padding:'20px 24px 48px', background:'rgba(250,247,245,0.98)', borderRadius:'28px 28px 0 0', boxShadow:'0 -4px 32px rgba(0,0,0,0.10)', animation:'slideUp .38s cubic-bezier(.32,.72,0,1)' }}>
            <div style={{ width:36, height:4, background:'rgba(20,20,19,0.20)', borderRadius:2, margin:'0 auto 20px' }}/>
            <div style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:28, fontWeight:600, color:'#141413', marginBottom:4 }}>How are you feeling?</div>
            <div style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:12, color:'rgba(20,20,19,0.55)', marginBottom:22 }}>A quick check-in — no pressure.</div>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:22 }}>
              {MOODS.map(m => (
                <button key={m.val}
                  style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:6, padding:'10px 6px', borderRadius:16, border:`2px solid ${sel?.val===m.val?'rgba(255,255,255,0.80)':'transparent'}`, cursor:'pointer', background:sel?.val===m.val?'rgba(255,255,255,0.55)':'transparent', transition:'all .2s', minWidth:56, fontFamily:'Sofia Sans,sans-serif' }}
                  onClick={() => setSel(m)}>
                  <span style={{ fontSize:28 }}>{m.emoji}</span>
                  <span style={{ fontSize:10, fontWeight:500, color:'rgba(20,20,19,0.60)' }}>{m.label}</span>
                </button>
              ))}
            </div>
            <div style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:11, fontWeight:600, letterSpacing:'.6px', textTransform:'uppercase', color:'rgba(20,20,19,0.40)', marginBottom:9 }}>What's on your mind?</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:18 }}>
              {TAGS.map(t => (
                <button key={t}
                  style={{ padding:'6px 13px', borderRadius:20, border:`1px solid ${tags.includes(t)?'transparent':'rgba(20,20,19,0.20)'}`, background:tags.includes(t)?'rgba(20,20,19,0.76)':'transparent', fontFamily:'Sofia Sans,sans-serif', fontSize:12, color:tags.includes(t)?'rgba(255,255,255,0.92)':'rgba(20,20,19,0.65)', cursor:'pointer', transition:'all .2s' }}
                  onClick={() => togTag(t)}>{t}</button>
              ))}
            </div>
            <textarea rows={2} placeholder="Optional note to yourself…" value={note} onChange={e=>setNote(e.target.value)}
              style={{ width:'100%', background:'rgba(255,255,255,0.36)', border:'1px solid rgba(255,255,255,0.55)', borderRadius:14, padding:'11px 14px', fontFamily:'Sofia Sans,sans-serif', fontSize:13, color:'#141413', resize:'none', outline:'none', marginBottom:18 }} />
            <button disabled={!sel} onClick={() => { if(sel){onSave({mood:sel,tags,note});onClose();} }}
              style={{ width:'100%', padding:16, background:'rgba(20,20,19,0.80)', color:'rgba(255,255,255,0.94)', border:'none', borderRadius:20, fontFamily:'Sofia Sans,sans-serif', fontSize:15, fontWeight:500, cursor:sel?'pointer':'not-allowed', opacity:sel?1:0.4, letterSpacing:'.2px' }}>
              Save Check-in
            </button>
          </div>
        </div>
      );
    }

    /* ── WEEK DAY CARD — pixel-perfect from Figma 191-2586 ── */
function DayCard({ label, mood, onClick }) {
  const isGood  = mood === 'good';
  const isSad   = mood === 'sad';

  return (
    <div onClick={onClick} style={{
      background:'rgba(255,255,255,0.88)',
      border:'1px solid rgba(20,20,19,0.08)',
      boxShadow:'0px 4px 12px rgba(0,0,0,0.04)',
      height:92, borderRadius:20, flexShrink:0, width:64,
      cursor: onClick ? 'pointer' : 'default', position:'relative'
    }}>
          <div style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'center', justifyContent:'flex-end', paddingBottom:11, paddingTop:1, paddingLeft:1, paddingRight:1, width:'100%', height:'100%', boxSizing:'border-box', backgroundClip:'padding-box' }}>
            <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:600, lineHeight:'normal', flexShrink:0, fontSize:15, color:'black', letterSpacing:'-0.3px', textAlign:'center', whiteSpace:'nowrap', margin:0 }}>{label}</p>
            {isGood ? <GoodStickerZone /> : isSad ? <SadStickerZone /> : <EmptyStickerZone />}
          </div>
        </div>
      );
    }

    /* ── MOOD CHARACTER SVGs — self-contained, no external URLs ── */
    const moodCharSVG = (mood) => {
      const s = (mood || '').toLowerCase();
      const cloud = (c1, c2, face) => {
        const rid = Math.random().toString(36).slice(2,6);
        return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%"><defs><radialGradient id="g${rid}" cx="42%" cy="32%" r="68%"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></radialGradient></defs><circle cx="36" cy="56" r="24" fill="url(#g${rid})"/><circle cx="52" cy="44" r="28" fill="url(#g${rid})"/><circle cx="68" cy="56" r="22" fill="url(#g${rid})"/><rect x="19" y="56" width="62" height="22" rx="11" fill="url(#g${rid})"/><ellipse cx="46" cy="33" rx="9" ry="5" fill="white" opacity="0.38"/>${face}</svg>`;
      };
      if (s === 'good')      return cloud('#edfae8','#80d070', `<circle cx="42" cy="58" r="4" fill="#1a2a1a"/><circle cx="60" cy="58" r="4" fill="#1a2a1a"/><path d="M40 67 Q51 75 62 67" stroke="#1a2a1a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
      if (s === 'happy')     return cloud('#fdf8cc','#e8c810', `<path d="M37 55 Q41 51 45 55" stroke="#2a2000" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M57 55 Q61 51 65 55" stroke="#2a2000" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M38 65 Q51 76 64 65" stroke="#2a2000" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M38 65 Q51 76 64 65 L64 70 Q51 80 38 70 Z" fill="#e05030" opacity="0.8"/>`);
      if (s === 'grateful')  return cloud('#fef3e0','#f0a840', `<circle cx="42" cy="58" r="4.2" fill="#3a1a00"/><circle cx="60" cy="58" r="4.2" fill="#3a1a00"/><path d="M40 68 Q51 75 62 68" stroke="#3a1a00" stroke-width="2.8" fill="none" stroke-linecap="round"/><path d="M26 40 L28 35 L30 40 L35 38 L31 41 L33 46 L28 43 L23 46 L25 41 L21 38 Z" fill="#ff9020" opacity="0.9"/>`);
      if (s === 'angry')     return cloud('#ffe8e8','#f06060', `<path d="M36 51 L42 46 L47 51" stroke="#3a0000" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M55 51 L61 46 L66 51" stroke="#3a0000" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="42" cy="57" r="4" fill="#3a0000"/><circle cx="60" cy="57" r="4" fill="#3a0000"/><path d="M40 67 Q51 63 62 67" stroke="#3a0000" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
      if (s === 'exhausted') return cloud('#f0ecff','#a888d0', `<path d="M37 53 L45 61 M45 53 L37 61" stroke="#1a0a3a" stroke-width="2.8" stroke-linecap="round"/><path d="M57 53 L65 61 M65 53 L57 61" stroke="#1a0a3a" stroke-width="2.8" stroke-linecap="round"/><path d="M39 70 Q43 66 47 69 Q51 72 55 68 Q59 64 63 68" stroke="#1a0a3a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
      if (s === 'boring')    return cloud('#e0f8f6','#48b8b2', `<line x1="38" y1="56" x2="46" y2="56" stroke="#002a28" stroke-width="2.5" stroke-linecap="round"/><line x1="56" y1="56" x2="64" y2="56" stroke="#002a28" stroke-width="2.5" stroke-linecap="round"/><path d="M40 67 Q51 64 62 67" stroke="#002a28" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
      if (s === 'anxious')   return cloud('#ffe8f4','#f06090', `<circle cx="42" cy="57" r="5" fill="#2a001a"/><circle cx="60" cy="57" r="5" fill="#2a001a"/><path d="M39 68 Q43 65 47 68 Q51 71 55 68 Q59 65 63 68" stroke="#2a001a" stroke-width="2.5" fill="none" stroke-linecap="round"/>`);
      return cloud('#e8f5ff','#70c0f0', `<circle cx="42" cy="58" r="4" fill="#1a1a3a"/><circle cx="60" cy="58" r="4" fill="#1a1a3a"/><path d="M40 70 Q51 63 62 70" stroke="#1a1a3a" stroke-width="2.8" fill="none" stroke-linecap="round"/><ellipse cx="38" cy="66" rx="2.2" ry="3.5" fill="#50b8f0" opacity="0.85"/>`);
    };

    /* ── TODAY PHYSICS CARD ── */
    const moodCharSrc = m => `data:image/svg+xml,${encodeURIComponent(moodCharSVG(m))}`;

    const buildIconHTML = (moodLabel) => window.buildIconHTML ? window.buildIconHTML(moodLabel) : moodCharSVG(moodLabel);

    function TodayPhysicsCard({ dateStr, moods, onMoodClick }) {
      const containerRef = useRef(null);
      const phyRef = useRef({ engine:null, runner:null, bodies:[], elems:[], spawned:0, rafId:null });
      const W = 346, H = 94;

      const spawnIcon = useCallback((moodLabel, entryIndex, onMoodClick) => {
        const phy = phyRef.current;
        if (!phy.engine || !containerRef.current || !window.Matter) return;
        const { Bodies, Composite, Body } = window.Matter;
        const r = 19;
        const x = 30 + Math.random() * (W - 60);
        const body = Bodies.circle(x, -r - 5, r, {
          restitution: 0.65, friction: 0.04, frictionAir: 0.012, density: 0.002
        });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
        Composite.add(phy.engine.world, body);
        const el = document.createElement('div');
        const hasClick = typeof onMoodClick === 'function';
        el.style.cssText = `position:absolute;width:${r*2}px;height:${r*2}px;pointer-events:${hasClick ? 'auto' : 'none'};will-change:transform;cursor:${hasClick ? 'pointer' : 'default'};`;
        el.innerHTML = buildIconHTML(moodLabel);
        if (hasClick) el.addEventListener('click', () => onMoodClick(entryIndex));
        containerRef.current.appendChild(el);
        phy.bodies.push(body);
        phy.elems.push(el);
        phy.spawned++;
      }, []);

      /* Setup engine once */
      useEffect(() => {
        const container = containerRef.current;
        if (!container || !window.Matter) return;
        const { Engine, Bodies, Composite, Runner } = window.Matter;

        const engine = Engine.create({ gravity: { x: 0, y: 1.2 } });
        phyRef.current.engine = engine;

        /* Walls */
        const wall = (x,y,w,h) => Bodies.rectangle(x,y,w,h,{ isStatic:true, restitution:0.5, friction:0.05 });
        Composite.add(engine.world, [
          wall(W/2, H+26, W+100, 52),
          wall(W/2, -26,  W+100, 52),
          wall(-26, H/2,  52, H+100),
          wall(W+26, H/2, 52, H+100),
        ]);

        const runner = Runner.create();
        phyRef.current.runner = runner;
        Runner.run(runner, engine);

        /* RAF DOM sync — reads from phyRef so it always sees latest bodies */
        const tick = () => {
          const phy = phyRef.current;
          phy.bodies.forEach((b, i) => {
            const el = phy.elems[i];
            if (!el) return;
            const r = parseInt(el.style.width) / 2;
            el.style.left      = (b.position.x - r) + 'px';
            el.style.top       = (b.position.y - r) + 'px';
            el.style.transform = 'rotate(' + b.angle + 'rad)';
          });
          phy.rafId = requestAnimationFrame(tick);
        };
        phyRef.current.rafId = requestAnimationFrame(tick);

        /* Device tilt → gravity */
        const onOrient = (e) => {
          const g  = (e.gamma ?? 0);
          const b2 = (e.beta  ?? 45);
          engine.gravity.x = (g / 45) * 1.8;
          engine.gravity.y = Math.max(-0.5, Math.min(2, (b2 - 45) / 45 * 1.5 + 0.3));
        };
        const setupOrient = () => window.addEventListener('deviceorientation', onOrient);
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
          const tapHandler = () => {
            DeviceOrientationEvent.requestPermission().then(s => {
              if (s === 'granted') setupOrient();
            }).catch(()=>{});
            container.removeEventListener('click', tapHandler);
          };
          container.addEventListener('click', tapHandler);
        } else {
          setupOrient();
        }

        /* Mouse tilt for desktop demo */
        const onMouse = (e) => {
          const rect = container.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top  + rect.height / 2;
          engine.gravity.x = ((e.clientX - cx) / (window.innerWidth  / 2)) * 1.8;
          engine.gravity.y = ((e.clientY - cy) / (window.innerHeight / 2)) * 1.5 + 0.4;
        };
        window.addEventListener('mousemove', onMouse);

        return () => {
          cancelAnimationFrame(phyRef.current.rafId);
          Runner.stop(runner);
          window.removeEventListener('deviceorientation', onOrient);
          window.removeEventListener('mousemove', onMouse);
        };
      }, []);

      /* Spawn icons — handles both initial load and newly logged moods */
      useEffect(() => {
        const phy = phyRef.current;
        if (!phy.engine) return;
        const startIdx = phy.spawned;
        const toSpawn = moods.slice(startIdx);
        toSpawn.forEach((m, i) => setTimeout(() => spawnIcon(m, startIdx + i, onMoodClick), i * 150));
      }, [moods.length]);

      return (
        <div style={{ background:'rgba(60,60,60,0.92)', border:'1px solid rgba(20,20,19,0.07)', height:H, borderRadius:20, boxShadow:'0 4px 24px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.08)', flexShrink:0, width:W, position:'relative', overflow:'hidden' }}>
          <p style={{ position:'absolute', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, lineHeight:'17.5px', left:13, fontSize:14, color:'white', top:11, letterSpacing:'-0.28px', whiteSpace:'nowrap', zIndex:2 }}>Today – {dateStr}</p>
          {/* Physics icon container — icons are imperatively appended here */}
          <div ref={containerRef} style={{ position:'absolute', inset:0, zIndex:1 }} />
        </div>
      );
    }
