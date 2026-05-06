    const { useEffect, useRef, useState } = React;
    /* ── WEEKLY BUBBLES (physics — same engine as TodayPhysicsCard) ── */
    function WeeklyBubblesChart({ pts }) {
      const containerRef   = useRef(null);
      const [selected, setSelected] = useState(null); // { mood, cnt, pct }
      // Expose setter on a container-keyed map so imperative DOM handlers can reach it
      const instanceId = useRef('wbc_' + Math.random().toString(36).slice(2));
      window.__wbcSetSel = window.__wbcSetSel || {};
      window.__wbcCurSel = window.__wbcCurSel || {};
      window.__wbcSetSel[instanceId.current] = (v) => { window.__wbcCurSel[instanceId.current] = v; setSelected(v); };

      /* Accent colors per mood for the info pill */
      const MOOD_COLOR = {
        good:'#a8dc78', happy:'#fde76a', excited:'#fde76a', grateful:'#f5c26a',
        sad:'#7abcee', anxious:'#f07898', boring:'#68dcd0', angry:'#f08070',
      };

      useEffect(() => {
        const container = containerRef.current;
        if (!container || !pts || pts.length === 0) return;

        /* Count moods, compute bubble radii */
        const counts = {};
        pts.forEach(p => { if (p.mood) counts[p.mood] = (counts[p.mood] || 0) + 1; });
        const totalCnt  = Object.values(counts).reduce((a,b) => a+b, 0);
        const maxCount  = Math.max(...Object.values(counts), 1);
        const bubbleData = Object.entries(counts).map(([mood, cnt]) => ({
          label: mood, r: Math.round(20 + (cnt / maxCount) * 32), cnt
        }));

        const id = instanceId.current;
        const setSel = (v) => window.__wbcSetSel[id] && window.__wbcSetSel[id](v);

        /* Click on container bg → dismiss selection */
        const onBgClick = (e) => { if (e.target === container) setSel(null); };
        container.addEventListener('click', onBgClick);

        const W = container.clientWidth || 346;
        const H = container.clientHeight || 240;
        const { Engine, Runner, Bodies, Body, World } = Matter;

        /* Physics engine — same params as TodayPhysicsCard */
        const engine = Engine.create({ gravity: { x:0, y:1.2 } });
        const wall = (x,y,w,h) => Bodies.rectangle(x,y,w,h,{ isStatic:true, restitution:0.5, friction:0.05 });
        World.add(engine.world, [
          wall(W/2, H+26, W+100, 52),
          wall(W/2, -26,  W+100, 52),
          wall(-26, H/2,  52, H+100),
          wall(W+26, H/2, 52, H+100),
        ]);

        /* Bubble body HTML — Figma mood shapes only, without facial features */
        const bubbleBodyHTML = (mood) => {
          const s = mood.toLowerCase();
          const img = (src, style = '') => `<img alt="" src="${src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;pointer-events:none;${style}">`;
          if (s === 'boring') return `
            <img alt="" src="${imgBoringChar1}" style="position:absolute;top:0;bottom:0;left:0;right:75%;width:25%;height:100%;display:block;object-fit:cover;pointer-events:none">
            <img alt="" src="${imgBoringChar2}" style="position:absolute;top:0;bottom:0;left:24.99%;right:50%;width:25.01%;height:100%;display:block;object-fit:cover;pointer-events:none">
            <img alt="" src="${imgBoringChar1}" style="position:absolute;top:0;bottom:0;left:50%;right:24.99%;width:25.01%;height:100%;display:block;object-fit:cover;pointer-events:none">
            <img alt="" src="${imgBoringChar2}" style="position:absolute;top:0;bottom:0;left:75%;right:0;width:25%;height:100%;display:block;object-fit:cover;pointer-events:none">`;
          if (s === 'sad') {
            const mask = `url(${imgLogCloudChar}) center/contain no-repeat`;
            return `<div style="position:absolute;inset:0;background:linear-gradient(160deg,#b6dcff,#7fb7f0);-webkit-mask:${mask};mask:${mask};pointer-events:none"></div>`;
          }
          if (s === 'anxious') {
            return img(imgWeeklyAnxiousFigma, 'transform:scale(1.04);');
          }
          const src =
            s === 'good' ? imgLogGoodBody :
            s === 'happy' ? imgLogHappyBody :
            s === 'excited' ? imgLogGratefulBody :
            s === 'grateful' ? imgLogGratefulBody :
            s === 'angry' ? imgLogAngryBody :
            imgLogExhaustedBody;
          return img(src);
        };

        /* Spawn bubbles from top-inside the container, staggered */
        const bodies = [], elems = [];
        bubbleData.forEach(({ label, r, cnt }, idx) => {
          setTimeout(() => {
            const x = r + Math.random() * (W - r * 2);
            const body = Bodies.circle(x, r + 5, r, {
              restitution: 0.65, friction: 0.04, frictionAir: 0.012, density: 0.002,
              inertia: Infinity, inverseInertia: 0  // lock rotation so text stays upright
            });
            World.add(engine.world, body);
            const d = r * 2;
            const fs = r >= 40 ? 13 : r >= 28 ? 11 : 9;
            const el = document.createElement('div');
            el.style.cssText = `position:absolute;width:${d}px;height:${d}px;cursor:pointer;user-select:none;will-change:transform;`;
            el.innerHTML = `
              <div style="position:relative;width:100%;height:100%;">
                ${bubbleBodyHTML(label)}
                <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Sofia Sans',sans-serif;font-weight:700;color:#141413;text-align:center;font-size:${fs}px;line-height:1;padding:0 6px;pointer-events:none;">${label}</span>
              </div>`;
            el.onclick = (e) => {
              e.stopPropagation();
              const cur = window.__wbcSetSel[id] && window.__wbcCurSel && window.__wbcCurSel[id];
              if (cur && cur.mood === label) { setSel(null); }
              else { setSel({ mood: label, cnt, pct: Math.round(cnt / totalCnt * 100) }); }
            };
            container.appendChild(el);
            bodies.push(body);
            elems.push({ el, r });
          }, idx * 120);
        });

        /* RAF DOM sync — position + rotation, same as TodayPhysicsCard */
        const runner = Runner.create();
        Runner.run(runner, engine);
        let rafId;
        const tick = () => {
          bodies.forEach((b, i) => {
            const { el, r } = elems[i];
            if (!el) return;
            el.style.left = (b.position.x - r) + 'px';
            el.style.top  = (b.position.y - r) + 'px';
            // no rotation — keeps label text upright and readable
          });
          rafId = requestAnimationFrame(tick);
        };
        tick();

        /* Device tilt → gravity — same formula as TodayPhysicsCard */
        const onOrient = (e) => {
          const g  = (e.gamma ?? 0);
          const b2 = (e.beta  ?? 45);
          engine.gravity.x = (g / 45) * 1.8;
          engine.gravity.y = Math.max(-0.5, Math.min(2, (b2 - 45) / 45 * 1.5 + 0.3));
        };
        const setupOrient = () => window.addEventListener('deviceorientation', onOrient);
        if (typeof DeviceOrientationEvent !== 'undefined' &&
            typeof DeviceOrientationEvent.requestPermission === 'function') {
          const tapH = () => {
            DeviceOrientationEvent.requestPermission().then(s => {
              if (s === 'granted') setupOrient();
            }).catch(()=>{});
            container.removeEventListener('click', tapH);
          };
          container.addEventListener('click', tapH);
        } else {
          setupOrient();
        }

        /* Mouse tilt — use phone frame as reference so gravity stays sensible */
        const onMouse = (e) => {
          const frame = container.closest('.phone-frame') || document.body;
          const fr = frame.getBoundingClientRect();
          const cx = fr.left + fr.width  / 2;
          const cy = fr.top  + fr.height / 2;
          engine.gravity.x = ((e.clientX - cx) / (fr.width  / 2)) * 1.5;
          engine.gravity.y = ((e.clientY - cy) / (fr.height / 2)) * 1.5 + 0.3;
        };
        window.addEventListener('mousemove', onMouse);

        return () => {
          cancelAnimationFrame(rafId);
          container.removeEventListener('click', onBgClick);
          window.removeEventListener('deviceorientation', onOrient);
          window.removeEventListener('mousemove', onMouse);
          Runner.stop(runner);
          World.clear(engine.world);
          Engine.clear(engine);
          elems.forEach(({ el }) => el.parentNode && el.parentNode.removeChild(el));
          delete window.__wbcSetSel[id];
        };
      }, []);

      const accent = selected ? (MOOD_COLOR[(selected.mood||'').toLowerCase()] || '#e0e0e0') : '#e0e0e0';

      return (
        <div style={{ position:'relative', height:190, overflow:'hidden', margin:'0 -4px' }}>
          {/* Physics bubble canvas */}
          <div ref={containerRef} style={{ position:'absolute', inset:0 }} />

          {/* Info pill — appears at top when a bubble is tapped */}
          {selected && (
            <div style={{ position:'absolute', top:10, left:0, right:0, display:'flex', justifyContent:'center', pointerEvents:'none', zIndex:10 }}>
              <div style={{
                display:'flex', alignItems:'center', gap:8,
                background:'rgba(255,255,255,0.92)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
                borderRadius:20, padding:'7px 14px',
                boxShadow:'0 2px 14px rgba(0,0,0,0.1)', border:'1px solid rgba(0,0,0,0.06)'
              }}>
                {/* Colored dot */}
                <div style={{ width:10, height:10, borderRadius:'50%', background:accent, flexShrink:0 }} />
                <span style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:700, fontSize:13, color:'#141413' }}>
                  {selected.mood}
                </span>
                <span style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:12, color:'#666' }}>
                  {selected.cnt}× this week
                </span>
                {/* Proportion bar */}
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <div style={{ width:48, height:5, borderRadius:3, background:'rgba(0,0,0,0.08)', overflow:'hidden' }}>
                    <div style={{ width:`${selected.pct}%`, height:'100%', borderRadius:3, background:accent }} />
                  </div>
                  <span style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:600, fontSize:11, color:'#888' }}>
                    {selected.pct}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
