    /* ── MOOD LOG CARD ── */
    function MoodLogCard({ count }) {
      const E = { w:17, h:17, br:8.5 };
      const emptyBox = (key, extra={}) => (
        <div key={key} style={{ background:'white', border:'1px solid rgba(20,20,19,0.12)', borderRadius:E.br, flexShrink:0, width:E.w, height:E.h, ...extra }} />
      );
      const emptyBoxE3 = (key, extra={}) => (
        <div key={key} style={{ background:'white', border:'1px solid #e3e3e3', borderRadius:E.br, flexShrink:0, width:E.w, height:E.h, ...extra }} />
      );

      return (
        <div style={{ position:'absolute', background:'rgba(252,251,250,0.92)', border:'1px solid rgba(20,20,19,0.07)', height:165, left:0, overflow:'hidden', borderRadius:20, boxShadow:'0 4px 24px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.08)', top:0, width:168 }}>
          {/* Original gradient halo */}
          <div style={{ position:'absolute', height:298.667, left:-1, top:-122, width:168 }}>
            <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgGradientHalo} onError={e => e.target.style.display='none'} />
          </div>
          {/* Fluid blob overlay — same palette as halo, morphing shapes */}
          <div style={{ position:'absolute', inset:0, overflow:'hidden', borderRadius:20, pointerEvents:'none', filter:'blur(18px)' }}>
            <div className="fluid-blob1" style={{ position:'absolute', width:110, height:110, background:'rgba(190,235,140,0.5)', top:-20, left:-10 }} />
            <div className="fluid-blob2" style={{ position:'absolute', width:100, height:100, background:'rgba(255,210,140,0.45)', top:50, left:70 }} />
            <div className="fluid-blob3" style={{ position:'absolute', width:90,  height:90,  background:'rgba(255,190,180,0.45)', top:90, left:20 }} />
          </div>
          {/* Header */}
          <div style={{ position:'absolute', height:28, left:13, top:14, width:140 }}>
            <div style={{ position:'absolute', display:'flex', height:17, alignItems:'flex-start', left:-0.24, top:9, width:56 }}>
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, lineHeight:'17.5px', flexShrink:0, color:'#141413', fontSize:14, letterSpacing:'-0.28px', whiteSpace:'nowrap' }}>Mood Log</p>
            </div>
            <div style={{ position:'absolute', left:111.79, width:28, height:28, top:0 }}>
              <p style={{ transform:'translateX(-100%)', position:'absolute', fontFamily:'Sofia Sans,sans-serif', fontWeight:400, lineHeight:0, left:28.79, color:'#141413', fontSize:0, textAlign:'right', top:0, letterSpacing:'-0.56px', whiteSpace:'nowrap' }}>
                <span style={{ lineHeight:'28px', fontSize:28 }}>{count}</span>
                <span style={{ lineHeight:'9px', color:'#696969', fontSize:9, letterSpacing:'0.2px' }}>/30</span>
              </p>
            </div>
          </div>
          {/* Grid */}
          <div style={{ position:'absolute', height:99, left:13, top:52, width:140 }}>
            {/* Row 1: 7 empty */}
            <div style={{ position:'absolute', display:'flex', gap:4, alignItems:'center', left:0, top:0 }}>
              {[0,1,2,3,4,5,6].map(i => emptyBox(i))}
            </div>
            {/* Row 2: mixed faces */}
            <div style={{ position:'absolute', display:'flex', alignItems:'center', justifyContent:'space-between', left:0, top:18.01, width:143 }}>
              <GoodFaceCell />
              <SadFaceCell />
              <GoodFaceCell />
              <VectorFace />
              {emptyBox('r2e1', { border:'1px solid #e3e3e3' })}
              <VectorFace />
              {emptyBox('r2e2', { border:'1px solid #e3e3e3' })}
            </div>
            {/* Row 3: 7 empty */}
            <div style={{ position:'absolute', display:'flex', gap:4, alignItems:'center', left:0, top:41 }}>
              {[0,1,2,3,4,5,6].map(i => emptyBox(i))}
            </div>
            {/* Row 4: individually placed */}
            {emptyBoxE3('r4a', { position:'absolute', left:0, top:61.5 })}
            {emptyBoxE3('r4b', { position:'absolute', left:20.5, top:61.5 })}
            <VectorFace style={{ position:'absolute', left:41, top:61.5 }} />
            <div style={{ position:'absolute', left:61.5, top:61.5 }}><GoodFaceCell /></div>
            {emptyBoxE3('r4c', { position:'absolute', left:82, top:61.5 })}
            <div style={{ position:'absolute', left:102.5, top:61.5 }}><GoodFaceCell /></div>
            {emptyBoxE3('r4d', { position:'absolute', left:123, top:61.5 })}
            {/* Row 5 */}
            {emptyBoxE3('r5a', { position:'absolute', left:0, top:82 })}
            {emptyBoxE3('r5b', { position:'absolute', left:20.5, top:82 })}
          </div>
        </div>
      );
    }

    /* ── URGENT SUPPORT CARD ── */
    function UrgentCard() {
      const tags = ['Crisis Line','Talk Now','988 Hotline','CAPS Counseling','Peer Support','Breathing','Journaling Prompt'];
      const Tag = ({ text }) => (
        <div style={{ background:'rgba(255,255,255,0.72)', border:'1px solid rgba(20,20,19,0.08)', display:'inline-flex', alignItems:'center', padding:'5px 10px', borderRadius:20, flexShrink:0 }}>
          <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:11, color:'#141413', whiteSpace:'nowrap', margin:0 }}>{text}</p>
        </div>
      );
      return (
        <div style={{ position:'absolute', height:165, left:178, overflow:'hidden', borderRadius:20, top:0, width:168 }}>
          {/* Gradient mesh — restored original */}
          <div style={{ position:'absolute', height:311.111, left:-7, overflow:'hidden', top:-69, width:175, backgroundImage:'linear-gradient(127.12deg, rgb(254,255,210) 32.456%, rgb(136,216,205) 52.164%, rgb(154,217,208) 70.728%, rgb(165,213,161) 91.019%, rgb(224,200,109) 101.92%)' }}>
            <div style={{ position:'absolute', height:375.934, left:-51, top:-26, width:258.85 }}>
              <div style={{ position:'absolute', top:'-1.81%', right:'-2.63%', bottom:'-4.79%', left:'-2.63%' }}>
                <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgGroup24} onError={e=>e.target.style.display='none'} />
              </div>
            </div>
          </div>
          {/* Title */}
          <p style={{ position:'absolute', fontFamily:'Sofia Sans,sans-serif', fontWeight:600, fontSize:14, color:'#141413', top:18, left:16, margin:0, letterSpacing:'-0.28px' }}>Urgent Support</p>
          {/* Arrow */}
          <div style={{ position:'absolute', right:12, top:14, width:28, height:28, background:'rgba(255,255,255,0.7)', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ fontSize:13, color:'#141413' }}>↗</span>
          </div>
          {/* Marquee rows */}
          <div style={{ position:'absolute', top:52, left:0, right:0, bottom:0, display:'flex', flexDirection:'column', gap:8, justifyContent:'center', overflow:'hidden' }}>
            {/* Row 1 */}
            <div style={{ overflow:'hidden' }}>
              <div className="marquee-track">
                {[...tags, ...tags].map((t,i) => <Tag key={i} text={t} />)}
              </div>
            </div>
            {/* Row 2 — opposite direction */}
            <div style={{ overflow:'hidden' }}>
              <div className="marquee-track" style={{ animationDirection:'reverse', animationDuration:'18s' }}>
                {[...tags.slice(3), ...tags.slice(0,3), ...tags.slice(3), ...tags.slice(0,3)].map((t,i) => <Tag key={i} text={t} />)}
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ── CALM MODE CARD ── */
    function CalmModeCard() {
      return (
        <div style={{ border:'1px solid rgba(20,20,19,0.07)', height:141, overflow:'hidden', position:'relative', borderRadius:20, boxShadow:'0 4px 24px rgba(0,0,0,0.04), 0 24px 48px rgba(0,0,0,0.08)', flexShrink:0, width:346 }}>
          {/* Background flow image */}
          <div style={{ position:'absolute', height:246.044, left:-1, top:-22.99, width:346 }}>
            <img alt="" style={{ position:'absolute', inset:0, maxWidth:'none', objectFit:'cover', pointerEvents:'none', width:'100%', height:'100%', filter:'brightness(1.35) saturate(1.1)' }} src={imgMesshu} onError={e=>{e.target.style.display='none';e.target.parentNode.style.background='linear-gradient(135deg,#f8e8d8 0%,#f0d8e8 30%,#d8d0f0 60%,#c8e0f0 80%)';}} />
          </div>
          {/* White fade right */}
          <div style={{ position:'absolute', height:142, left:161, top:-1.99, width:184, backgroundImage:'linear-gradient(263.75deg, rgb(255,255,255) 3.8943%, rgba(255,255,255,0) 94.555%)' }} />
          {/* "Calm Mode" title */}
          <p style={{ transform:'translateX(-50%)', position:'absolute', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, lineHeight:'22px', left:46.5, fontSize:14, color:'black', textAlign:'center', top:22.01, whiteSpace:'nowrap' }}>Calm Mode</p>
          {/* "10" large number */}
          <p style={{ transform:'translateX(-50%)', position:'absolute', fontFamily:'Sofia Sans,sans-serif', fontWeight:400, lineHeight:'38px', left:33.5, color:'#141413', fontSize:38, textAlign:'center', top:84.01, letterSpacing:'-0.76px', whiteSpace:'nowrap' }}>10</p>
          {/* Hourglass */}
          <div style={{ position:'absolute', left:53, width:16, height:16, top:98.01 }}>
            <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgHourglass} onError={e=>e.target.style.display='none'} />
          </div>
          {/* Ambient tag */}
          <div style={{ position:'absolute', background:'#f1f7ff', display:'flex', height:20, alignItems:'center', justifyContent:'center', left:13, overflow:'hidden', padding:'3px 7px', borderRadius:20, top:49.01 }}>
            <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:400, lineHeight:'22px', flexShrink:0, fontSize:10, color:'black', whiteSpace:'nowrap' }}>Ambient</p>
          </div>
          {/* 10 mins tag */}
          <div style={{ position:'absolute', background:'#f1f7ff', display:'flex', height:20, alignItems:'center', justifyContent:'center', left:73, overflow:'hidden', padding:'3px 7px', borderRadius:20, top:49.01 }}>
            <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:400, lineHeight:'22px', flexShrink:0, fontSize:10, color:'black', whiteSpace:'nowrap' }}>10 mins</p>
          </div>
          {/* Waveform bars */}
          <div style={{ position:'absolute', filter:'blur(2px)', display:'flex', gap:8, alignItems:'flex-end', left:147, top:65.01 }}>
            {WAVES.map((h, i) => (
              <div key={i} style={{ background:'white', height:h, borderRadius:20, flexShrink:0, width:2 }} />
            ))}
          </div>
          {/* Play button */}
          <div style={{ position:'absolute', left:300, width:29, height:29, top:18.01 }}>
            <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgFrame31} onError={e=>{e.target.style.display='none';const p=e.target.parentNode;p.style.background='rgba(255,255,255,0.85)';p.style.borderRadius='50%';p.style.display='flex';p.style.alignItems='center';p.style.justifyContent='center';p.style.fontSize='12px';p.innerHTML='▶';}} />
          </div>
        </div>
      );
    }
