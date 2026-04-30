    const { useCallback, useEffect, useRef, useState } = React;
    /* ── LOG MOOD PAGE ── */
    const getWaveBars = (mood, peakShift = 0) => {
      const p = mood==='Grateful'
        ? { peak:'#f0a040', c1:'#f5be78', c2:'#f8d0a0', c3:'#fae0c0', c4:'#fcedd8' }
        : mood==='Happy'
        ? { peak:'#e8c010', c1:'#f0d050', c2:'#f5df80', c3:'#f8eaaa', c4:'#fbf3cc' }
        : mood==='Good'
        ? { peak:'#7dd87c', c1:'#a8e0a7', c2:'#bee8bd', c3:'#d0f0cf', c4:'#e4f8e3' }
        : mood==='Exhausted'
        ? { peak:'#b4a0e8', c1:'#ccc0ef', c2:'#d8cef5', c3:'#e4dcfa', c4:'#f0ecfd' }
        : mood==='Angry'
        ? { peak:'#ff7070', c1:'#ffaaaa', c2:'#ffc0c0', c3:'#ffd5d5', c4:'#ffe8e8' }
        : mood==='Boring'
        ? { peak:'#40c8c0', c1:'#80d8d4', c2:'#a8e6e2', c3:'#c0efec', c4:'#d8f5f4' }
        : mood==='Anxious'
        ? { peak:'#ff82aa', c1:'#ffaac2', c2:'#ffbfd0', c3:'#ffd5e0', c4:'#ffe8f0' }
        : { peak:'#91e4fb', c1:'#c7ecf7', c2:'#daf6ff', c3:'#e4f9ff', c4:'#eafaff' };
      const hs = [43,43,43,43,43,43,43,52,62,73,84,95,103,112,130,112,103,95,84,73,62,52,43,43,43,43,43,43,43];
      const cs = ['white','white','white','white',p.c4,p.c4,p.c4,p.c4,p.c3,p.c3,p.c3,p.c2,p.c2,p.c1,p.peak,p.c1,p.c2,p.c2,p.c3,p.c3,p.c3,p.c4,p.c4,p.c4,p.c4,'white','white','white','white'];
      const n = hs.length;
      return hs.map((_, i) => {
        const src = Math.max(0, Math.min(n - 1, i - peakShift));
        return { h: hs[src], c: cs[src] };
      });
    };
    const LOG_MOOD_OPTIONS = ['Angry','Exhausted','Sad','Anxious','Boring','Good','Happy','Grateful'];

    function LogMoodPage({ onBack, onSave, initialData }) {
      const [selected, setSelected] = useState(initialData ? (initialData.mood.charAt(0).toUpperCase() + initialData.mood.slice(1)) : 'Good');
      const [prevMood, setPrevMood]  = useState(null);   // slides out
      const [slideDir, setSlideDir]  = useState(null);   // 'left' | 'right'
      const [dragX, setDragX]        = useState(0);      // real-time drag offset for wave
      const dragRef  = useRef({ startX:0, dragging:false });
      const timerRef = useRef(null);
      const [showTellMore, setShowTellMore] = useState(!!initialData);
      const [reason, setReason] = useState('');
      const [note, setNote]     = useState(initialData?.note || '');
      const [activities, setActivities]   = useState(initialData?.activities || []);
      const [companions, setCompanions]   = useState(initialData?.companions || []);
      const [location, setLocation]       = useState(initialData?.location || []);
      const [bodyParts, setBodyParts]     = useState(initialData?.bodyParts || []);

      const toggleTag = (arr, setArr, val) =>
        arr.includes(val) ? setArr(arr.filter(v => v !== val)) : setArr([...arr, val]);

      const switchMood = (mood) => {
        if (mood === selected) return;
        setDragX(0);
        const oldIdx = LOG_MOOD_OPTIONS.indexOf(selected);
        const newIdx = LOG_MOOD_OPTIONS.indexOf(mood);
        if (timerRef.current) clearTimeout(timerRef.current);
        setPrevMood(selected);
        setSlideDir(newIdx > oldIdx ? 'left' : 'right');
        setSelected(mood);
        timerRef.current = setTimeout(() => setPrevMood(null), 420);
      };

      /* ── Per-mood helpers ── */
      const moodBgFilter = (id) =>
        id==='Grateful'  ? 'hue-rotate(-200deg) saturate(1.1) brightness(1.1)'  :
        id==='Happy'     ? 'hue-rotate(-180deg) saturate(1.1) brightness(1.12)' :
        id==='Good'      ? 'hue-rotate(-120deg) saturate(1.3) brightness(1.15)' :
        id==='Sad'       ? 'hue-rotate(0deg)'   :
        id==='Angry'     ? 'hue-rotate(140deg) saturate(1.4) brightness(1.05)' :
        id==='Boring'    ? 'hue-rotate(-50deg) saturate(1.2) brightness(1.12)' :
        id==='Anxious'   ? 'hue-rotate(320deg) saturate(0.9) brightness(1.08)' :
        'hue-rotate(30deg) saturate(0.55) brightness(1.05)';

      /* Solid fallback color — always opaque even if images fail to load */
      const moodBgColor = (id) =>
        id==='Grateful'  ? '#fde4c0' : id==='Happy'    ? '#fef5a0' :
        id==='Good'      ? '#aadf6a' : id==='Sad'      ? '#c2e4f5' :
        id==='Angry'     ? '#ffd0d0' : id==='Boring'   ? '#c0ecea' :
        id==='Anxious'   ? '#ffd0e8' : '#d8c8f5';

      const renderSlot = (moodId) => {
        const mg = moodId==='Good', ms = moodId==='Sad',
              mh = moodId==='Happy', mgr = moodId==='Grateful',
              man = moodId==='Angry', mex = moodId==='Exhausted', mbr = moodId==='Boring',
              max = moodId==='Anxious';
        const ci = mh ? imgHappyChar : mgr ? imgGratefulChar : mg ? imgGoodChar :
                   man ? imgAngryChar : mex ? imgExhaustedChar : mbr ? '' : max ? imgAnxiousChar : imgLogCloudChar;
        const cf = mg || mh || mgr || man || mex || mbr || max ? 'none' : !ms ? 'saturate(0.2) brightness(0.85) hue-rotate(250deg)' : 'none';
        const ca = mh  ? 'cloudHappy 2s ease-in-out infinite' :
                   mgr ? 'cloudGrateful 5s ease-in-out infinite' :
                   man ? 'cloudAngry 1.5s ease-in-out infinite' :
                   mbr ? 'cloudBoring 7s ease-in-out infinite' :
                   mex ? 'cloudExhausted 5s ease-in-out infinite' :
                   max ? 'cloudAngry 2.5s ease-in-out infinite' :
                   ms  ? 'cloudSad 3s ease-in-out infinite' : 'cloudSad 3s ease-in-out infinite';
        const ec = mg ? '#141413' : ms ? '#58c2ff' : (!mh && !mgr && !man && !mex && !mbr && !max) ? '#9090b0' : null;
        const esy = !ms && !mg && !mh && !mgr && !man && !mex && !mbr && !max ? 0.45 : 1;
        const bi = mg ? imgGoodBubble : imgLogBubble;
        const bws = mgr
          ? { background:'linear-gradient(-1.89deg,rgb(240,180,100) 30%,rgb(220,120,40) 110%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : mh
          ? { background:'linear-gradient(-1.89deg,rgb(250,220,60) 30%,rgb(200,160,0) 110%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : mg
          ? { background:'linear-gradient(-1.89deg,rgb(164,217,156) 36.791%,rgb(109,189,44) 107.79%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : man
          ? { background:'linear-gradient(-1.89deg,rgb(255,90,70) 30%,rgb(210,30,10) 110%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : mex
          ? { background:'linear-gradient(-1.89deg,rgb(180,120,255) 30%,rgb(120,50,210) 110%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : mbr
          ? { background:'linear-gradient(-1.89deg,rgb(30,185,175) 30%,rgb(10,145,135) 110%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : max
          ? { background:'linear-gradient(-1.89deg,rgb(255,130,170) 30%,rgb(210,60,110) 110%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }
          : ms ? { color:'#47d9ff' } : { color:'#a090d0' };
        return (
          <>
            {/* Bubble — auto-sizes to any mood name */}
            <div style={{ position:'absolute', left:'50%', transform:'translateX(-50%)', top:100, display:'flex', flexDirection:'column', alignItems:'center', zIndex:2 }}>
              <div style={{
                background:'rgba(255,255,255,0.84)',
                backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
                borderRadius:22, padding:'12px 24px',
                boxShadow:'0 2px 16px rgba(0,0,0,0.08)',
                border:'1px solid rgba(255,255,255,0.65)',
                whiteSpace:'nowrap',
              }}>
                <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:24, color:'black', letterSpacing:'0.3px', margin:0 }}>
                  {'I feel '}<span style={bws}>{moodId}</span>{' !'}
                </p>
              </div>
              {/* Tail triangle */}
              <div style={{
                width:0, height:0,
                borderLeft:'10px solid transparent',
                borderRight:'10px solid transparent',
                borderTop:'13px solid rgba(255,255,255,0.84)',
                marginTop:-1,
              }} />
            </div>
            {/* Character */}
            <div style={{ position:'absolute', left:'50%', marginLeft:-143.5, top: mgr ? 220 : man ? 215 : mh ? 205 : 195, width:287, height:287 }}>
              <div style={{ position:'relative', width:'100%', height:'100%', filter:cf, animation:ca }}>
                {ci && <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={ci} onError={e=>e.target.style.display='none'} />}
                {mbr && <>
                  <img alt="" style={{ position:'absolute', top:0, bottom:0, left:0, right:'75%', width:'25%', height:'100%', display:'block' }} src={imgBoringChar1} onError={e=>e.target.style.display='none'} />
                  <img alt="" style={{ position:'absolute', top:0, bottom:0, left:'24.99%', right:'50%', width:'25.01%', height:'100%', display:'block' }} src={imgBoringChar2} onError={e=>e.target.style.display='none'} />
                  <img alt="" style={{ position:'absolute', top:0, bottom:0, left:'50%', right:'24.99%', width:'25.01%', height:'100%', display:'block' }} src={imgBoringChar1} onError={e=>e.target.style.display='none'} />
                  <img alt="" style={{ position:'absolute', top:0, bottom:0, left:'75%', right:0, width:'25%', height:'100%', display:'block' }} src={imgBoringChar2} onError={e=>e.target.style.display='none'} />
                </>}
                {mg && <>
                  {/* Mouth layer — static, full height so smile isn't clipped */}
                  <div style={{ position:'absolute', height:56, left:97, top:131, width:92, clipPath:'inset(43% 0 0 0)' }}>
                    <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgGoodFace} onError={e=>e.target.style.display='none'} />
                  </div>
                  {/* Eyes layer — blinks, top portion only */}
                  <div style={{ position:'absolute', height:56, left:97, top:131, width:92, clipPath:'inset(0 0 57% 0)',
                    transformOrigin:'center top', animation:'faceBlink 4s ease-in-out 0.5s infinite' }}>
                    <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgGoodFace} onError={e=>e.target.style.display='none'} />
                  </div>
                </>}
                {mh && <>
                  {/* Left eye – outer container % → inner image with negative inset */}
                  <div style={{ position:'absolute', top:'35.54%', right:'56.79%', bottom:'55.75%', left:'36.24%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgHappyFaceL} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Right eye – mirrored */}
                  <div style={{ position:'absolute', top:'35.54%', right:'36.24%', bottom:'55.75%', left:'56.79%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%', transform:'scaleX(-1)' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgHappyFaceR} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Mouth */}
                  <div style={{ position:'absolute', top:'46.34%', right:'43.9%', bottom:'45.47%', left:'44.25%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-25.53%', right:'-13.01%', bottom:'-25.53%', left:'-13.01%' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgHappyFaceM} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                </>}
                {mgr && <>
                  {/* Open eye (left) */}
                  <div style={{ position:'absolute', top:'35.82%', right:'52.25%', bottom:'52.84%', left:'36.68%' }}>
                    <img alt="" style={{ position:'absolute', display:'block', inset:0, width:'100%', height:'100%' }} src={imgGratefulFaceB} onError={e=>e.target.style.display='none'} />
                  </div>
                  {/* Winking eye (right, mirrored) */}
                  <div style={{ position:'absolute', top:'37.59%', right:'39.1%', bottom:'53.55%', left:'53.98%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%', transform:'scaleX(-1)' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgGratefulFaceC} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Mouth (rotated 180° + mirrored) */}
                  <div style={{ position:'absolute', top:'48.58%', right:'41.18%', bottom:'42.2%', left:'40.83%' }}>
                    <img alt="" style={{ position:'absolute', display:'block', inset:0, width:'100%', height:'100%', transform:'rotate(180deg) scaleX(-1)' }} src={imgGratefulFaceA} onError={e=>e.target.style.display='none'} />
                  </div>
                </>}
                {man && <>
                  {/* Angry eyebrows */}
                  <div style={{ position:'absolute', top:'32.18%', right:'35.6%', bottom:'52.35%', left:'35.89%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-7.92%', right:'-12.22%', bottom:'0%', left:'-12.22%' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgAngryFaceA} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Angry nose/mouth */}
                  <div style={{ position:'absolute', top:'48.1%', right:'45.6%', bottom:'42.2%', left:'46.0%' }}>
                    <img alt="" style={{ position:'absolute', display:'block', inset:0, width:'100%', height:'100%' }} src={imgAngryFaceB} onError={e=>e.target.style.display='none'} />
                  </div>
                </>}
                {mex && <>
                  {/* Left X-eye – stroke A */}
                  <div style={{ position:'absolute', top:'34.5%', left:'34.5%', right:'55.1%', bottom:'56.3%', overflow:'visible' }}>
                    <div style={{ position:'absolute', inset:'-29.85% -26.67%' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgExhaustedEyeA} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Left X-eye – stroke B */}
                  <div style={{ position:'absolute', top:'34.5%', left:'34.5%', right:'55.1%', bottom:'56.3%', overflow:'visible' }}>
                    <div style={{ position:'absolute', inset:'-29.85% -26.67%', transform:'rotate(180deg) scaleY(-1)' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgExhaustedEyeB} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Right X-eye – stroke A */}
                  <div style={{ position:'absolute', top:'34.5%', left:'55.5%', right:'34.1%', bottom:'56.3%', overflow:'visible' }}>
                    <div style={{ position:'absolute', inset:'-29.85% -26.67%' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgExhaustedEyeA} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Right X-eye – stroke B */}
                  <div style={{ position:'absolute', top:'34.5%', left:'55.5%', right:'34.1%', bottom:'56.3%', overflow:'visible' }}>
                    <div style={{ position:'absolute', inset:'-29.85% -26.67%', transform:'rotate(180deg) scaleY(-1)' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgExhaustedEyeB} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Wavy mouth – left half */}
                  <div style={{ position:'absolute', top:'50.2%', left:'36.2%', right:'49.8%', bottom:'45.6%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-52.64%', right:'-15.87%', bottom:'-52.64%', left:'-15.88%' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgExhaustedMthA} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                  {/* Wavy mouth – right half */}
                  <div style={{ position:'absolute', top:'50.2%', left:'50.2%', right:'35.9%', bottom:'45.6%', overflow:'visible' }}>
                    <div style={{ position:'absolute', top:'-52.64%', right:'-15.87%', bottom:'-52.64%', left:'-15.88%', transform:'rotate(180deg) scaleY(-1)' }}>
                      <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgExhaustedMthB} onError={e=>e.target.style.display='none'} />
                    </div>
                  </div>
                </>}
                {mbr && <>
                  {/* Left eye — Vector 21.svg inline, exact Figma coords */}
                  <svg style={{ position:'absolute', left:108, top:113, width:31, height:20, overflow:'visible' }} viewBox="0 0 32 20" fill="none">
                    <path d="M7.50195 12.2736L23.8186 7.50196" stroke="black" strokeWidth="15" strokeLinecap="round"/>
                  </svg>
                  {/* Right eye — Vector 32.svg inline, exact Figma coords */}
                  <svg style={{ position:'absolute', left:156, top:113, width:31, height:20, overflow:'visible' }} viewBox="0 0 32 20" fill="none">
                    <path d="M23.8186 12.2736L7.50199 7.50196" stroke="black" strokeWidth="15" strokeLinecap="round"/>
                  </svg>
                  {/* Mouth frown line — exact Figma coords */}
                  <div style={{ position:'absolute', left:116, top:137, width:51, height:19 }}>
                    <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgBoringMthA} onError={e=>e.target.style.display='none'} />
                  </div>
                  {/* Mouth accent blob — exact Figma coords */}
                  <div style={{ position:'absolute', left:159, top:132, width:20, height:34 }}>
                    <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgBoringMthB} onError={e=>e.target.style.display='none'} />
                  </div>
                </>}
                {!mg && !mh && !mgr && ec && <>
                  <div style={{ position:'absolute', background:ec, height:11, left:183, borderRadius:20, top:133, width:21, transform:`scaleY(${esy})`, transformOrigin:'center', animation:'eyeIdle 4s ease-in-out 0.3s infinite' }} />
                  <div style={{ position:'absolute', background:ec, height:11, left:82,  borderRadius:20, top:133, width:21, transform:`scaleY(${esy})`, transformOrigin:'center', animation:'eyeIdle 4s ease-in-out 0.5s infinite' }} />
                </>}
                {ms && <>
                  <div style={{ position:'absolute', width:5, height:9, borderRadius:'50% 50% 50% 50% / 40% 40% 60% 60%', background:'#58c2ff', left:89,  top:148, animation:'tearFall 2s ease-in 0s   infinite' }} />
                  <div style={{ position:'absolute', width:5, height:9, borderRadius:'50% 50% 50% 50% / 40% 40% 60% 60%', background:'#58c2ff', left:89,  top:148, animation:'tearFall 2s ease-in 1s   infinite' }} />
                  <div style={{ position:'absolute', width:5, height:9, borderRadius:'50% 50% 50% 50% / 40% 40% 60% 60%', background:'#58c2ff', left:192, top:148, animation:'tearFall 2s ease-in 0.5s infinite' }} />
                  <div style={{ position:'absolute', width:5, height:9, borderRadius:'50% 50% 50% 50% / 40% 40% 60% 60%', background:'#58c2ff', left:192, top:148, animation:'tearFall 2s ease-in 1.5s infinite' }} />
                </>}
                {max && <>
                  {/* Face overlay (eyes + mouth + sweat drop) from Figma node 52:397 */}
                  <div style={{ position:'absolute', left:0, top:0, width:'26.1%', height:'32.1%' }}>
                    <img alt="" style={{ display:'block', width:'100%', height:'100%' }} src={imgAnxiousFace} onError={e=>e.target.style.display='none'} />
                  </div>
                </>}
              </div>
            </div>
          </>
        );
      };

      /* Drag/swipe — attach a non-passive touchmove to block browser scroll */
      const waveRef = useRef(null);
      useEffect(() => {
        const el = waveRef.current;
        if (!el) return;
        const prevent = (e) => { if (dragRef.current.dragging) e.preventDefault(); };
        el.addEventListener('touchmove', prevent, { passive: false });
        return () => el.removeEventListener('touchmove', prevent);
      }, []);

      const onDragStart = (e) => {
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        dragRef.current = { startX: x, dragging: true };
      };
      const onDragMove  = (e) => {
        if (!dragRef.current.dragging) return;
        const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
        const dx = x - dragRef.current.startX;
        setDragX(Math.max(-90, Math.min(90, dx)));
        if (Math.abs(dx) > 48) {
          const idx = LOG_MOOD_OPTIONS.indexOf(selected);
          if (dx < 0 && idx < LOG_MOOD_OPTIONS.length - 1) switchMood(LOG_MOOD_OPTIONS[idx + 1]);
          else if (dx > 0 && idx > 0) switchMood(LOG_MOOD_OPTIONS[idx - 1]);
          dragRef.current.dragging = false;
        }
      };
      const onDragEnd = () => { dragRef.current.dragging = false; setDragX(0); };

      const isGood = selected==='Good', isSad = selected==='Sad',
            isHappy = selected==='Happy', isGrateful = selected==='Grateful',
            isAngry = selected==='Angry', isExhausted = selected==='Exhausted',
            isBoring = selected==='Boring', isAnxious = selected==='Anxious';
      const pillShadow = isGrateful ? '#f0a040' : isHappy ? '#e8c010' :
                         isGood ? '#90d870' : isSad ? '#91e4fb' :
                         isAngry ? '#ff7070' : isBoring ? '#40c8c0' :
                         isExhausted ? '#b4a0e8' : isAnxious ? '#ff82aa' : '#b090e8';
      const sheetBg = isGrateful ? '#fff8f0' : isHappy ? '#fffdf0' :
                      isGood ? '#f4fbee' : isSad ? '#eef8ff' :
                      isAngry ? '#fff4f4' : isBoring ? '#edfaf9' :
                      isExhausted ? '#f5f0ff' : isAnxious ? '#fff0f5' : '#faf7f5';
      const inAnim  = slideDir==='left'  ? 'slideFromRight 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both' :
                      slideDir==='right' ? 'slideFromLeft  0.4s cubic-bezier(0.25,0.46,0.45,0.94) both' : 'none';
      const outAnim = slideDir==='left'  ? 'slideOutToLeft  0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards' :
                      slideDir==='right' ? 'slideOutToRight 0.4s cubic-bezier(0.25,0.46,0.45,0.94) forwards' : 'none';

      return (
        <div style={{ position:'absolute', inset:0, zIndex:200, borderRadius:'inherit', backgroundColor: moodBgColor(selected) }}>

          {/* ── Background: mood color + ellipses ── */}
          <div style={{ position:'absolute', inset:0, backgroundColor: moodBgColor(selected), overflow:'hidden', borderRadius:'inherit' }}>
            {/* Ellipse 1 – filter applied here, not on parent */}
            <div style={{ position:'absolute', height:638, left:-38, top:81, width:476,
              filter: moodBgFilter(selected) }}>
              <div style={{ position:'absolute', top:'-55.87%', right:'-74.98%', bottom:'-55.87%', left:'-74.98%' }}>
                <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgLogEllipse1} onError={e=>e.target.style.display='none'} />
              </div>
            </div>
            {/* Ellipse 5 – filter applied on the inner rotate div, outside the color-burn container */}
            <div style={{ position:'absolute', display:'flex', height:1136, alignItems:'center', justifyContent:'center', left:-306, mixBlendMode:'color-burn', top:-25, width:1136 }}>
              <div style={{ transform:'rotate(145.14deg)',
                filter: moodBgFilter(selected) }}>
                <div style={{ height:816, position:'relative', width:816 }}>
                  <div style={{ position:'absolute', top:'-6.56%', right:'-6.55%', bottom:'-6.56%', left:'-6.55%' }}>
                    <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgLogEllipse5} onError={e=>e.target.style.display='none'} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sliding zone: overflow:hidden clips characters during transition ── */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:500, overflow:'hidden' }}>
            {/* Previous mood slides OUT */}
            {prevMood && (
              <div key={'out-'+prevMood} style={{ position:'absolute', inset:0, animation:outAnim, willChange:'transform' }}>
                {renderSlot(prevMood)}
              </div>
            )}
            {/* Current mood slides IN */}
            <div key={'in-'+selected} style={{ position:'absolute', inset:0, animation: prevMood ? inAnim : 'none', willChange:'transform' }}>
              {renderSlot(selected)}
            </div>
          </div>

          {/* ── Bottom sheet ── */}
          <div style={{ position:'absolute', background:sheetBg, height:390, left:0, overflow:'hidden', borderRadius:50, top:454, width:390, transition:'background 0.35s ease' }}>
            {/* Waveform — drag to switch */}
            <div ref={waveRef}
              onMouseDown={onDragStart} onMouseMove={onDragMove} onMouseUp={onDragEnd} onMouseLeave={onDragEnd}
              onTouchStart={onDragStart} onTouchMove={onDragMove} onTouchEnd={onDragEnd}
              style={{ position:'absolute', display:'flex', gap:7, alignItems:'flex-end', left:10, top:175, height:130, cursor:'ew-resize', userSelect:'none', touchAction:'none' }}>
              {getWaveBars(selected, Math.round(dragX / 13)).map((bar,i) => (
                <div key={i} style={{ background:bar.c, height:bar.h, borderRadius:20, flexShrink:0, width:6, transition: dragX===0 ? 'height 0.3s ease, background 0.3s ease' : 'none' }} />
              ))}
            </div>
            {/* Title + pills + dots */}
            <div style={{ position:'absolute', left:0, right:0, top:27 }}>
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, lineHeight:'normal', fontSize:30, color:'black', textAlign:'center', letterSpacing:'0.3px', width:320, margin:'0 auto' }}>
                How do you feel right now?
              </p>
              {(() => {
                  const idx = LOG_MOOD_OPTIONS.indexOf(selected);
                  // Always keep selected pill in the center slot; use null for ghost spacers at edges
                  const slots = [
                    idx > 0 ? LOG_MOOD_OPTIONS[idx - 1] : null,
                    selected,
                    idx < LOG_MOOD_OPTIONS.length - 1 ? LOG_MOOD_OPTIONS[idx + 1] : null,
                  ];
                  return (
                  <div style={{ display:'flex', gap:12, alignItems:'center', justifyContent:'center', marginTop:24 }}>
                  {slots.map((mood, i) => {
                    /* uniform pill width so the row is always visually symmetric */
                    const pillStyle = { width:112, height:36, flexShrink:0, borderRadius:20 };
                    if (!mood) return <div key={'ghost-'+i} style={{ ...pillStyle, visibility:'hidden' }} />;
                    const isSel = mood===selected;
                    const tint = isSel ? (
                      mood==='Grateful'  ? '#fdecd8' : mood==='Happy'    ? '#fef9d0' :
                      mood==='Good'      ? '#e8f8df' : mood==='Sad'      ? '#daf4fd' :
                      mood==='Angry'     ? '#ffe8e8' : mood==='Boring'   ? '#d5f5f4' :
                      mood==='Exhausted' ? '#eedeff' : mood==='Anxious' ? '#ffe4ef' : '#ede8fa') : 'white';
                    return (
                    <div key={mood} onClick={() => switchMood(mood)}
                      style={{ ...pillStyle, background:tint,
                        border:`1px solid ${isSel ? pillShadow+'99' : 'rgba(20,20,19,0.07)'}`,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        boxShadow: isSel ? `0 2px 10.6px 0 ${pillShadow}` : '0 2px 10.6px 0 #d0d0d0',
                        cursor:'pointer', userSelect:'none', transition:'all 0.2s ease' }}>
                      <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:14, color:'black', letterSpacing:'-0.2px', whiteSpace:'nowrap' }}>{mood}</p>
                    </div>
                    );
                  })}
                  </div>
                  );
                })()}
              </div>
            {/* Submit */}
            <div onClick={() => { setShowTellMore(true); }}
              style={{ position:'absolute', background: isGrateful?'#d87830':isHappy?'#c8a000':isGood?'#5cb85c':isSad?'#3ab4dc':isAngry?'#e04040':isBoring?'#30b8b0':isExhausted?'#8050c8':isAnxious?'#d84080':'#9070cc', height:45, left:19, borderRadius:20, top:328, width:352, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', transition:'background 0.3s ease' }}>
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:16, color:'white', letterSpacing:'-0.2px' }}>Log Mood</p>
            </div>
          </div>

          {/* ── Back button ── */}
          <div onClick={onBack}
            style={{ position:'absolute', left:20, top:56, zIndex:10,
              background:'rgba(255,255,255,0.82)',
              backdropFilter:'blur(10px)', borderRadius:20, padding:'7px 14px', cursor:'pointer',
              border:'1px solid rgba(20,20,19,0.10)',
              boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
            <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:13, color:'#141413', letterSpacing:'-0.1px' }}>← Back</p>
          </div>

          <StatusBar />
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', borderRadius:'inherit', boxShadow:'inset 0px 1px 0px 0px rgba(255,255,255,0.12)' }} />

          {showTellMore && (() => {
            const accentColor = isGrateful?'#d87830':isHappy?'#c8a000':isGood?'#5cb85c':isSad?'#3ab4dc':isAngry?'#e04040':isBoring?'#30b8b0':isExhausted?'#8050c8':isAnxious?'#d84080':'#9070cc';
            const accentLight = isGrateful?'rgba(216,120,48,0.12)':isHappy?'rgba(200,160,0,0.12)':isGood?'rgba(92,184,92,0.12)':isSad?'rgba(58,180,220,0.12)':isAngry?'rgba(224,64,64,0.12)':isBoring?'rgba(48,184,176,0.12)':isExhausted?'rgba(128,80,200,0.12)':isAnxious?'rgba(216,64,128,0.12)':'rgba(144,112,204,0.12)';

            const TagChip = ({ label, selected, onToggle }) => (
              <div onClick={onToggle} style={{ display:'inline-flex', alignItems:'center', gap:6, background: selected ? accentColor : 'white', border: `1px solid ${selected ? accentColor : 'rgba(20,20,19,0.10)'}`, borderRadius:999, padding:'5px 13px', cursor:'pointer', flexShrink:0, transition:'all 0.15s' }}>
                <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:13, color: selected ? 'white' : '#141413', margin:0, whiteSpace:'nowrap' }}>{label}</p>
              </div>
            );

            const AddChip = () => (
              <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', background:'rgba(20,20,19,0.06)', border:'1px solid rgba(20,20,19,0.10)', borderRadius:999, width:34, height:34, cursor:'pointer', flexShrink:0 }}>
                <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:18, color:'#696969', margin:0, lineHeight:1 }}>+</p>
              </div>
            );

            const SectionLabel = ({ text }) => (
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:600, fontSize:11, color:'#969696', margin:'0 0 8px', letterSpacing:'0.6px', textTransform:'uppercase' }}>{text}</p>
            );

            const TagRow = ({ tags, state, setter }) => (
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center' }}>
                <AddChip />
                {tags.map(t => <TagChip key={t} label={t} selected={state.includes(t)} onToggle={() => toggleTag(state, setter, t)} />)}
              </div>
            );

            const tellGradient =
              isGrateful ? 'linear-gradient(160deg,#f8d090 0%,#fef0d0 100%)' :
              isHappy    ? 'linear-gradient(160deg,#f8ec80 0%,#fef8d0 100%)' :
              isGood     ? 'linear-gradient(160deg,#c8f0c0 0%,#e8f8e0 100%)' :
              isSad      ? 'linear-gradient(160deg,#b8dff8 0%,#d8f0ff 100%)' :
              isAngry    ? 'linear-gradient(160deg,#f8b0b0 0%,#fee8e8 100%)' :
              isBoring   ? 'linear-gradient(160deg,#80e0d8 0%,#c0f0ec 100%)' :
              isExhausted? 'linear-gradient(160deg,#d0c0f0 0%,#ece0ff 100%)' :
                           'linear-gradient(160deg,#b8e8f8 0%,#d8f0ff 100%)';

            return (
              <div style={{ position:'absolute', inset:0, zIndex:300, borderRadius:'inherit', background:'rgba(250,247,245,0.99)', overflow:'hidden', display:'flex', flexDirection:'column' }}>

                {/* Mood-gradient header */}
                <div style={{ flexShrink:0, position:'relative', background: tellGradient, paddingBottom:22 }}>
                  <StatusBar />
                  {/* Back button */}
                  <div onClick={() => setShowTellMore(false)}
                    style={{ position:'absolute', left:20, top:56, zIndex:10, background:'rgba(255,255,255,0.72)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', borderRadius:20, padding:'7px 14px', cursor:'pointer', border:'1px solid rgba(255,255,255,0.55)', boxShadow:'0 2px 8px rgba(0,0,0,0.07)' }}>
                    <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:13, color:'#141413', letterSpacing:'-0.1px', margin:0 }}>← Back</p>
                  </div>
                  {/* Character + title row — marginTop clears StatusBar (36px) + Back button (34px) + gap */}
                  <div style={{ display:'flex', alignItems:'center', gap:14, paddingLeft:24, paddingRight:24, marginTop:100 }}>
                    <div style={{ width:72, height:72, position:'relative', flexShrink:0 }}
                      dangerouslySetInnerHTML={{ __html: buildIconHTML(selected) }} />
                    <div style={{ flex:1 }}>
                      <div style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:11, fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', color:'rgba(20,20,19,0.40)', marginBottom:5 }}>TELL US MORE</div>
                      <div style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:26, fontWeight:700, color:'#141413', letterSpacing:'-0.4px', lineHeight:1.1 }}>
                        I feel <span style={{ color:accentColor }}>{selected}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scrollable form content */}
                <div style={{ flex:1, overflowY:'scroll', WebkitOverflowScrolling:'touch', minHeight:0 }}>
                  <div style={{ padding:'20px 22px 24px', display:'flex', flexDirection:'column', gap:24, boxSizing:'border-box' }}>

                    {/* What are you doing */}
                    <div>
                      <SectionLabel text="What are you doing?" />
                      <TagRow tags={['Eating','Hanging Out','Fitness','Hobbies','Resting','Driving']} state={activities} setter={setActivities} />
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:'rgba(20,20,19,0.07)', flexShrink:0 }} />

                    {/* Who are you with */}
                    <div>
                      <SectionLabel text="Who are you with?" />
                      <TagRow tags={['By Myself','Friends','Family','Co-Workers','Pets']} state={companions} setter={setCompanions} />
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:'rgba(20,20,19,0.07)', flexShrink:0 }} />

                    {/* Where are you */}
                    <div>
                      <SectionLabel text="Where are you?" />
                      <TagRow tags={['Home','Work','School','Commuting','Outside']} state={location} setter={setLocation} />
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:'rgba(20,20,19,0.07)', flexShrink:0 }} />

                    {/* Body sensations */}
                    <div>
                      <SectionLabel text="Where do you feel it?" />
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        {['Head','Chest','Stomach','Shoulders','Arms','Legs'].map(part => (
                          <TagChip key={part} label={part} selected={bodyParts.includes(part)} onToggle={() => toggleTag(bodyParts, setBodyParts, part)} />
                        ))}
                      </div>
                    </div>

                    {/* How does it feel */}
                    <div>
                      <SectionLabel text="How does it feel?" />
                      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                        {['Tight','Heavy','Shaky','Numb','Warm','Cold','Tense'].map(s => (
                          <TagChip key={s} label={s} selected={bodyParts.includes(s)} onToggle={() => toggleTag(bodyParts, setBodyParts, s)} />
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:'rgba(20,20,19,0.07)', flexShrink:0 }} />

                    {/* Notes */}
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      <SectionLabel text="Add a note" />
                      <textarea
                        value={note}
                        onChange={e => setNote(e.target.value)}
                        placeholder="Write your thoughts..."
                        style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:14, color:'#141413', background:'white', border:'1px solid rgba(20,20,19,0.08)', borderRadius:16, padding:'14px 16px', outline:'none', width:'100%', boxSizing:'border-box', resize:'none', height:100 }}
                      />
                    </div>

                    </div>
                </div>

                {/* Sticky footer save button */}
                <div style={{ flexShrink:0, padding:'12px 20px 20px', background:'rgba(250,247,245,0.97)', borderTop:'1px solid rgba(20,20,19,0.06)', backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)' }}>
                  <div
                    onClick={() => { onSave(selected, { activities, companions, location, bodyParts, note }); onBack(); }}
                    style={{ background:accentColor, height:52, borderRadius:26, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 20px ${accentLight}` }}>
                    <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:600, fontSize:16, color:'white', letterSpacing:'-0.2px', margin:0 }}>Complete check-in ✓</p>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>
      );
    }

