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
      const isToday = label === 'TODAY';
      const m = (mood || '').toLowerCase();

      /* Pick sticker zone based on mood */
      const stickerZone = !mood ? <EmptyStickerZone /> : (() => {
        switch (m) {
          case 'good':      return <GoodStickerZone />;
          case 'sad':       return <SadStickerZone />;
          case 'happy':     return <HappyStickerZone />;
          case 'excited':   return <ExcitedStickerZone />;
          case 'grateful':  return <GratefulStickerZone />;
          case 'anxious':   return <AnxiousStickerZone />;
          case 'exhausted':
          case 'tired':     return <ExhaustedStickerZone />;
          case 'boring':    return <BoringStickerZone />;
          case 'angry':     return <AngryStickerZone />;
          default:          return <CssFolderSticker mood={m} label={m.slice(0,5)} />;
        }
      })();

      return (
        <div onClick={onClick} style={{
          background: isToday ? 'rgba(255,255,255,0.96)' : 'rgba(255,255,255,0.88)',
          border: isToday ? '1.5px solid rgba(90,170,24,0.45)' : '1px solid rgba(20,20,19,0.08)',
          boxShadow: isToday
            ? '0px 4px 16px rgba(90,170,24,0.18), 0 0 0 4px rgba(90,170,24,0.08)'
            : '0px 4px 12px rgba(0,0,0,0.04)',
          height:92, borderRadius:20, flexShrink:0, width:64,
          cursor: onClick ? 'pointer' : 'default', position:'relative'
        }}>
          <div style={{ display:'flex', flexDirection:'column', gap:4, alignItems:'center', justifyContent:'flex-end', paddingBottom:11, paddingTop:1, paddingLeft:1, paddingRight:1, width:'100%', height:'100%', boxSizing:'border-box', backgroundClip:'padding-box' }}>
            <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:600, lineHeight:'normal', flexShrink:0, fontSize:15, color:'black', letterSpacing:'-0.3px', textAlign:'center', whiteSpace:'nowrap', margin:0 }}>{label}</p>
            {stickerZone}
          </div>
        </div>
      );
    }

    /* ── TODAY PHYSICS CARD ── */
    /* Maps mood label → character image src from Log Mood page */
    const moodCharSrc = m => {
      switch ((m || '').toLowerCase()) {
        case 'good':      return imgGoodChar;
        case 'happy':     return imgHappyChar;
        case 'grateful':  return imgGratefulChar;
        case 'angry':     return imgAngryChar;
        case 'exhausted': return imgExhaustedChar;
        case 'boring':    return imgBoringChar1;
        case 'anxious':   return imgAnxiousChar;
        case 'sad':
        default:          return imgLogCloudChar;
      }
    };

    const buildIconHTML = (moodLabel) => {
      const s = (moodLabel || '').toLowerCase();
      const base = (src) => `<img alt="" src="${src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block">`;

      if (s === 'sad') return base(imgLogCloudChar); // face baked in

      if (s === 'good') return `
        ${base(imgGoodChar)}
        <div style="position:absolute;left:33.8%;top:45.6%;width:32.1%;height:19.5%;clip-path:inset(43% 0 0 0);overflow:visible">
          <img alt="" src="${imgGoodFace}" style="display:block;width:100%;height:100%">
        </div>
        <div style="position:absolute;left:33.8%;top:45.6%;width:32.1%;height:19.5%;clip-path:inset(0 0 57% 0);overflow:visible">
          <img alt="" src="${imgGoodFace}" style="display:block;width:100%;height:100%">
        </div>`;

      if (s === 'happy') return `
        ${base(imgHappyChar)}
        <div style="position:absolute;top:35.54%;right:56.79%;bottom:55.75%;left:36.24%;overflow:visible">
          <div style="position:absolute;top:-30%;right:-28.63%;bottom:-30%;left:-37.51%">
            <img alt="" src="${imgHappyFaceL}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:35.54%;right:36.24%;bottom:55.75%;left:56.79%;overflow:visible">
          <div style="position:absolute;top:-30%;right:-28.63%;bottom:-30%;left:-37.51%;transform:scaleX(-1)">
            <img alt="" src="${imgHappyFaceR}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:46.34%;right:43.9%;bottom:45.47%;left:44.25%;overflow:visible">
          <div style="position:absolute;top:-25.53%;right:-13.01%;bottom:-25.53%;left:-13.01%">
            <img alt="" src="${imgHappyFaceM}" style="display:block;width:100%;height:100%">
          </div>
        </div>`;

      if (s === 'grateful') return `
        ${base(imgGratefulChar)}
        <div style="position:absolute;top:35.82%;right:52.25%;bottom:52.84%;left:36.68%">
          <img alt="" src="${imgGratefulFaceB}" style="position:absolute;inset:0;display:block;width:100%;height:100%">
        </div>
        <div style="position:absolute;top:37.59%;right:39.1%;bottom:53.55%;left:53.98%;overflow:visible">
          <div style="position:absolute;top:-30%;right:-28.63%;bottom:-30%;left:-37.51%;transform:scaleX(-1)">
            <img alt="" src="${imgGratefulFaceC}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:48.58%;right:41.18%;bottom:42.2%;left:40.83%">
          <img alt="" src="${imgGratefulFaceA}" style="position:absolute;inset:0;display:block;width:100%;height:100%;transform:rotate(180deg) scaleX(-1)">
        </div>`;

      if (s === 'angry') return `
        ${base(imgAngryChar)}
        <div style="position:absolute;top:32.18%;right:35.6%;bottom:52.35%;left:35.89%;overflow:visible">
          <div style="position:absolute;top:-7.92%;right:-12.22%;bottom:0%;left:-12.22%">
            <img alt="" src="${imgAngryFaceA}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:48.1%;right:45.6%;bottom:42.2%;left:46.0%">
          <img alt="" src="${imgAngryFaceB}" style="position:absolute;inset:0;display:block;width:100%;height:100%">
        </div>`;

      if (s === 'exhausted') return `
        ${base(imgExhaustedChar)}
        <div style="position:absolute;top:34.5%;left:34.5%;right:55.1%;bottom:56.3%;overflow:visible">
          <div style="position:absolute;inset:-29.85% -26.67%">
            <img alt="" src="${imgExhaustedEyeA}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:34.5%;left:34.5%;right:55.1%;bottom:56.3%;overflow:visible">
          <div style="position:absolute;inset:-29.85% -26.67%;transform:rotate(180deg) scaleY(-1)">
            <img alt="" src="${imgExhaustedEyeB}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:34.5%;left:55.5%;right:34.1%;bottom:56.3%;overflow:visible">
          <div style="position:absolute;inset:-29.85% -26.67%">
            <img alt="" src="${imgExhaustedEyeA}" style="display:block;width:100%;height:100%">
          </div>
        </div>
        <div style="position:absolute;top:34.5%;left:55.5%;right:34.1%;bottom:56.3%;overflow:visible">
          <div style="position:absolute;inset:-29.85% -26.67%;transform:rotate(180deg) scaleY(-1)">
            <img alt="" src="${imgExhaustedEyeB}" style="display:block;width:100%;height:100%">
          </div>
        </div>`;

      if (s === 'boring') return `
        <img alt="" src="${imgBoringChar1}" style="position:absolute;top:0;bottom:0;left:0;right:75%;width:25%;height:100%;display:block;object-fit:cover">
        <img alt="" src="${imgBoringChar2}" style="position:absolute;top:0;bottom:0;left:24.99%;right:50%;width:25.01%;height:100%;display:block;object-fit:cover">
        <img alt="" src="${imgBoringChar1}" style="position:absolute;top:0;bottom:0;left:50%;right:24.99%;width:25.01%;height:100%;display:block;object-fit:cover">
        <img alt="" src="${imgBoringChar2}" style="position:absolute;top:0;bottom:0;left:75%;right:0;width:25%;height:100%;display:block;object-fit:cover">
        <svg style="position:absolute;left:37.6%;top:39.4%;width:10.8%;height:7%;overflow:visible" viewBox="0 0 32 20" fill="none">
          <path d="M7.50195 12.2736L23.8186 7.50196" stroke="black" stroke-width="15" stroke-linecap="round"/>
        </svg>
        <svg style="position:absolute;left:54.4%;top:39.4%;width:10.8%;height:7%;overflow:visible" viewBox="0 0 32 20" fill="none">
          <path d="M23.8186 12.2736L7.50199 7.50196" stroke="black" stroke-width="15" stroke-linecap="round"/>
        </svg>
        <img alt="" src="${imgBoringMthA}" style="position:absolute;left:40.4%;top:47.7%;width:17.8%;height:6.6%;display:block">
        <img alt="" src="${imgBoringMthB}" style="position:absolute;left:55.4%;top:46%;width:7%;height:11.8%;display:block">`;

      if (s === 'anxious') return `
        ${base(imgAnxiousChar)}
        <div style="position:absolute;left:0;top:0;width:26.1%;height:32.1%;">
          <img alt="" src="${imgAnxiousFace}" style="display:block;width:100%;height:100%">
        </div>`;

      return base(imgLogCloudChar); // fallback
    };

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

