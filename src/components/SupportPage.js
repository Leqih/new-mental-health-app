    const { useRef, useState } = React;
    /* ── SUPPORT PAGE ── */
    function SupportPage({ onBack, userName }) {
      const [section, setSection] = useState(0);
      const [voiceMode, setVoiceMode] = useState(false);
      const [typeChat, setTypeChat] = useState(false);
      const [chatTopic, setChatTopic] = useState(null);
      const touchStartY = useRef(null);
      const mouseStartY = useRef(null);
      const SECTIONS = ['AI Chat', 'Peer Support', 'Resource Center'];

      const goNext = () => setSection(s => Math.min(s + 1, 2));
      const goPrev = () => setSection(s => Math.max(s - 1, 0));

      const onTouchStart = e => { touchStartY.current = e.touches[0].clientY; };
      const onTouchEnd = e => {
        if (touchStartY.current === null) return;
        const dy = touchStartY.current - e.changedTouches[0].clientY;
        if (dy > 55) goNext(); else if (dy < -55) goPrev();
        touchStartY.current = null;
      };
      const onMouseDown = e => { mouseStartY.current = e.clientY; };
      const onMouseUp = e => {
        if (mouseStartY.current === null) return;
        const dy = mouseStartY.current - e.clientY;
        if (dy > 55) goNext(); else if (dy < -55) goPrev();
        mouseStartY.current = null;
      };

      /* ── peers data ── */
      const PEERS = [
        { name:'Maya R.',  tag:'Anxiety',   status:'Online now',      color:'#f4a7a7', initial:'M' },
        { name:'Jordan K.',tag:'Stress',    status:'Active 3m ago',   color:'#a7c4f4', initial:'J' },
        { name:'Sam L.',   tag:'Loss',      status:'Active 12m ago',  color:'#a7f4c4', initial:'S' },
        { name:'Riley T.', tag:'Depression',status:'Active 1h ago',   color:'#f4d6a7', initial:'R' },
      ];

      /* ── resources ── */
      const RESOURCES = [
        { icon:'📞', title:'988 Lifeline',      sub:'Call or text 988 anytime',         bg:'#fff1f1', accent:'#e05555' },
        { icon:'💬', title:'Crisis Text Line',  sub:'Text HOME to 741741',              bg:'#f1f6ff', accent:'#4a7ce8' },
        { icon:'🏥', title:'CAPS Counseling',   sub:'Campus counseling services',       bg:'#f1fff4', accent:'#3cb872' },
        { icon:'🌬️', title:'Breathing Exercise',sub:'4-7-8 guided breath session',     bg:'#f5f1ff', accent:'#8b5cf6' },
        { icon:'📓', title:'Journaling Prompts',sub:'Reflective prompts to process',    bg:'#fffbf1', accent:'#d97706' },
        { icon:'🤝', title:'Support Groups',    sub:'Find community near you',          bg:'#fff1fa', accent:'#c026d3' },
      ];

      return (
        <div
          style={{ position:'absolute', inset:0, zIndex: (voiceMode || typeChat) ? 350 : 200, overflow:'hidden', userSelect:'none', cursor: voiceMode ? 'default' : 'grab' }}
          onTouchStart={e => { if (!voiceMode) onTouchStart(e); }}
          onTouchEnd={e => { if (!voiceMode) onTouchEnd(e); }}
          onMouseDown={e => { if (!voiceMode) onMouseDown(e); }}
          onMouseUp={e => { if (!voiceMode) onMouseUp(e); }}
        >
          {/* Voice mode overlay */}
          {voiceMode && <VoiceModeOverlay onClose={() => setVoiceMode(false)} />}
          {/* Type chat overlay */}
          {typeChat && <TypeChatPage onBack={() => { setTypeChat(false); setChatTopic(null); }} userName={userName} initialTopic={chatTopic} />}
          {/* Shared warp filter — one instance, referenced by all GrainientBg canvases */}
          <svg style={{ position:'absolute', width:0, height:0, overflow:'hidden' }}>
            <defs>
              <filter id="gw" x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency="0.013 0.009" numOctaves="2" seed="7" result="noise"/>
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
            </defs>
          </svg>
          {/* Sliding container */}
          <div style={{
            position:'absolute', top:0, left:0, width:390, height:844*3,
            transform:`translateY(${-section * 844}px)`,
            transition:'transform 0.48s cubic-bezier(0.4,0,0.2,1)',
          }}>

            {/* ══ SECTION 0 — AI CHAT ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              <GrainientBg c1='#EDE5FF' c2='#C0AFF5' c3='#F2EEFF' speed={0.28} sat={0.38} />
              {/* Subtle bottom fade — light not dark */}
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(240,235,255,0.45) 100%)', pointerEvents:'none', zIndex:1 }} />

              {/* Top bar — home-style clean */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:5 }}>
                <div style={{ width:36 }} />
                <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', padding:'7px 20px', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 2px 8px rgba(20,20,19,0.05)' }}>
                  <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>AI Chat</span>
                </div>
                <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', width:36, height:36, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 2px 8px rgba(20,20,19,0.05)' }}>
                  <span style={{ color:'#141413', fontSize:13, letterSpacing:'1px' }}>···</span>
                </div>
              </div>

              {/* Orb */}
              <div style={{ position:'absolute', top:102, left:0, right:0, display:'flex', justifyContent:'center', zIndex:2 }}>
                <div style={{ position:'relative', width:155, height:155 }}>
                  {[0, 1.3, 2.6].map((delay, i) => (
                    <div key={i} style={{ position:'absolute', inset:0, borderRadius:'50%', border:'1px solid rgba(160,130,230,0.18)', animation:`orbRipple 3.9s ease-out ${delay}s infinite`, pointerEvents:'none' }} />
                  ))}
                  <div style={{ position:'absolute', inset:-28, borderRadius:'50%', background:'radial-gradient(circle, rgba(160,130,240,0.16) 0%, transparent 68%)', animation:'orbBreath 5s ease-in-out infinite', pointerEvents:'none' }} />
                  <div style={{ width:155, height:155, borderRadius:'50%', background:'rgba(255,255,255,0.72)', backdropFilter:'blur(22px) saturate(1.2)', WebkitBackdropFilter:'blur(22px) saturate(1.2)', border:'1px solid rgba(255,255,255,0.9)', boxShadow:'0 8px 40px rgba(120,90,220,0.12), 0 2px 0 rgba(255,255,255,0.9) inset', overflow:'hidden', position:'relative', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.28)', pointerEvents:'none' }} />
                    <OrbCanvas />
                    <div style={{ position:'absolute', top:'6%', left:'8%', width:'46%', height:'38%', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 45%, transparent 100%)', filter:'blur(5px)', pointerEvents:'none' }} />
                    <div style={{ position:'absolute', bottom:'6%', right:'12%', width:'22%', height:'12%', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 100%)', filter:'blur(3px)', pointerEvents:'none' }} />
                    <div style={{ position:'absolute', inset:0, borderRadius:'inherit', background:'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 45%)', pointerEvents:'none' }} />
                  </div>
                </div>
              </div>

              {/* Greeting */}
              <div style={{ position:'absolute', top:265, left:28, right:28, zIndex:2 }}>
                <p style={{ color:'rgba(20,20,19,0.42)', fontSize:13, fontWeight:600, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.2px' }}>Hey, {userName} 👋</p>
                <p style={{ color:'#141413', fontSize:26, fontWeight:800, lineHeight:1.22, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.5px', margin:'0 0 14px' }}>Where should<br/>we start today?</p>
                {/* Topic cards — horizontal swipe row */}
                <div style={{ position:'relative' }}>
                <div style={{ display:'flex', gap:10, overflowX:'auto', marginLeft:-28, marginRight:-28, paddingLeft:28, paddingRight:28, scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }}>
                  <style>{`.topic-scroll::-webkit-scrollbar{display:none}`}</style>
                  {[
                    { emoji:'😮‍💨', label:"I'm anxious",    tease:"What's keeping you on edge?",           color:'#9b72f5', bg:'rgba(155,114,245,0.09)', border:'rgba(155,114,245,0.22)', intent:"I've been feeling really anxious lately" },
                    { emoji:'🫂',  label:"I feel lonely",   tease:"Tell me what connection feels missing",  color:'#60a5fa', bg:'rgba(96,165,250,0.09)',  border:'rgba(96,165,250,0.22)',  intent:"I feel really lonely" },
                    { emoji:'🌀',  label:"I'm overwhelmed", tease:"Too much on your plate?",                color:'#f472b6', bg:'rgba(244,114,182,0.09)', border:'rgba(244,114,182,0.22)', intent:"I'm feeling overwhelmed by everything" },
                    { emoji:'💬',  label:"Need to vent",    tease:"No filters, no judgment — just talk",    color:'#34d399', bg:'rgba(52,211,153,0.09)',  border:'rgba(52,211,153,0.22)',  intent:"I just need to vent about something" },
                  ].map(t => (
                    <div key={t.label}
                      onClick={() => { setChatTopic(t.intent); setTypeChat(true); }}
                      style={{ flexShrink:0, width:150, background:t.bg, border:`1.5px solid ${t.border}`, borderRadius:18, padding:'14px 13px 15px', cursor:'pointer', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', boxShadow:'0 2px 14px rgba(20,20,19,0.06)', display:'flex', flexDirection:'column', gap:6 }}>
                      <span style={{ fontSize:24 }}>{t.emoji}</span>
                      <p style={{ margin:0, fontSize:14, fontWeight:800, color:'#141413', fontFamily:'Sofia Sans,sans-serif', lineHeight:1.2, letterSpacing:'-0.2px' }}>{t.label}</p>
                      <p style={{ margin:0, fontSize:11.5, color:'rgba(20,20,19,0.48)', fontFamily:'Sofia Sans,sans-serif', lineHeight:1.4 }}>{t.tease}</p>
                      <div style={{ marginTop:2, height:2.5, width:22, borderRadius:99, background:t.color, opacity:0.7 }} />
                    </div>
                  ))}
                  {/* trailing spacer so last card doesn't get clipped */}
                  <div style={{ flexShrink:0, width:4 }} />
                </div>
                {/* left fade to white */}
                <div style={{ position:'absolute', top:0, left:-28, bottom:0, width:56, background:'linear-gradient(to left, transparent, rgba(245,242,255,0.96))', pointerEvents:'none', zIndex:1 }} />
                {/* right fade to white */}
                <div style={{ position:'absolute', top:0, right:-28, bottom:0, width:56, background:'linear-gradient(to right, transparent, rgba(245,242,255,0.96))', pointerEvents:'none', zIndex:1 }} />
                </div>
              </div>

              {/* Last session card — home card style */}
              <div style={{ position:'absolute', bottom:190, left:28, right:28, zIndex:2 }}>
                <div style={{ background:'rgba(255,255,255,0.90)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:20, padding:'12px 16px', display:'flex', alignItems:'center', gap:12, boxShadow:'0 4px 24px rgba(20,20,19,0.06), 0 24px 48px rgba(20,20,19,0.04)' }}>
                  <div style={{ width:32, height:32, borderRadius:16, background:'linear-gradient(135deg,#c8b4f8,#a890e8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:0, fontSize:11, fontWeight:700, color:'rgba(20,20,19,0.4)', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.5px', textTransform:'uppercase' }}>Continue last session</p>
                    <p style={{ margin:'2px 0 0', fontSize:13, fontWeight:600, color:'#141413', fontFamily:'Sofia Sans,sans-serif' }}>Managing stress at work</p>
                  </div>
                  <div style={{ width:28, height:28, borderRadius:14, background:'rgba(20,20,19,0.05)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.4)" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
              </div>

              {/* Type / Talk — home card style */}
              <div style={{ position:'absolute', bottom:106, left:28, right:28, zIndex:2 }}>
                <div style={{ display:'flex', borderRadius:28, overflow:'hidden', background:'rgba(255,255,255,0.90)', border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 4px 24px rgba(20,20,19,0.07), 0 24px 48px rgba(20,20,19,0.05)' }}>
                  {/* Type */}
                  <div onClick={() => setTypeChat(true)} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, padding:'18px 0', cursor:'pointer', borderRight:'1px solid rgba(20,20,19,0.06)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.4)" strokeWidth="1.8" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    <span style={{ color:'rgba(20,20,19,0.4)', fontSize:12, fontFamily:'Sofia Sans,sans-serif', fontWeight:600, letterSpacing:'0.3px' }}>Type</span>
                  </div>
                  {/* Talk — accent */}
                  <div onClick={() => setVoiceMode(true)} style={{ flex:1.4, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6, padding:'18px 0', cursor:'pointer', background:'linear-gradient(135deg, rgba(180,155,248,0.14) 0%, rgba(150,120,240,0.08) 100%)' }}>
                    <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
                      <rect x="0"  y="7" width="3" height="4"  rx="1.5" fill="rgba(110,80,200,0.4)"/>
                      <rect x="5"  y="4" width="3" height="10" rx="1.5" fill="rgba(110,80,200,0.6)"/>
                      <rect x="10" y="1" width="3" height="16" rx="1.5" fill="rgba(110,80,200,0.85)"/>
                      <rect x="15" y="4" width="3" height="10" rx="1.5" fill="rgba(110,80,200,0.6)"/>
                      <rect x="20" y="7" width="3" height="4"  rx="1.5" fill="rgba(110,80,200,0.4)"/>
                      <rect x="23" y="6" width="3" height="6"  rx="1.5" fill="rgba(110,80,200,0.28)"/>
                    </svg>
                    <span style={{ color:'rgba(100,70,200,0.9)', fontSize:12, fontFamily:'Sofia Sans,sans-serif', fontWeight:700, letterSpacing:'0.3px' }}>Talk</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ══ SECTION 1 — PEER SUPPORT ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              <GrainientBg c1='#B8E8D0' c2='#78C8A8' c3='#D8F4E8' speed={0.22} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(60,28,20,0.18) 100%)', pointerEvents:'none', zIndex:1 }} />

              {/* Top bar */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:5 }}>
                <div onClick={onBack} style={{ background:'rgba(255,237,229,0.72)', backdropFilter:'blur(12px)', width:36, height:36, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(20,20,19,0.06)' }}>
                  <span style={{ color:'#141413', fontSize:20, lineHeight:1, marginTop:-1 }}>‹</span>
                </div>
                <div style={{ background:'rgba(255,237,229,0.72)', backdropFilter:'blur(12px)', padding:'6px 16px', borderRadius:20, border:'1px solid rgba(20,20,19,0.06)' }}>
                  <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Peer Support</span>
                </div>
                <div style={{ width:36 }} />
              </div>

              {/* Header */}
              <div style={{ position:'absolute', top:120, left:28, right:28, zIndex:2 }}>
                <p style={{ color:'rgba(20,20,19,0.45)', fontSize:13, fontWeight:600, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.5px', textTransform:'uppercase' }}>Community</p>
                <p style={{ color:'#141413', fontSize:24, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', margin:0 }}>Connect with peers<br/>who truly get it</p>
              </div>

              {/* Peer cards */}
              <div style={{ position:'absolute', top:225, left:22, right:22, display:'flex', flexDirection:'column', gap:10, zIndex:2 }}>
                {PEERS.map(({ name, tag, status, color, initial }) => (
                  <div key={name} style={{ background:'rgba(255,237,229,0.72)', backdropFilter:'blur(14px)', borderRadius:18, padding:'12px 16px', display:'flex', alignItems:'center', gap:14, border:'1px solid rgba(20,20,19,0.06)', boxShadow:'0 2px 12px rgba(20,20,19,0.05)' }}>
                    <div style={{ width:44, height:44, borderRadius:22, background:color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span style={{ fontSize:17, fontWeight:700, color:'rgba(20,20,19,0.6)', fontFamily:'Sofia Sans,sans-serif' }}>{initial}</span>
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontSize:14, fontWeight:700, color:'#141413', fontFamily:'Sofia Sans,sans-serif' }}>{name}</span>
                        <span style={{ background:'rgba(20,20,19,0.07)', padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:600, color:'rgba(20,20,19,0.55)', fontFamily:'Sofia Sans,sans-serif' }}>{tag}</span>
                      </div>
                      <span style={{ fontSize:12, color:'rgba(20,20,19,0.4)', fontFamily:'Sofia Sans,sans-serif' }}>{status}</span>
                    </div>
                    <div style={{ width:32, height:32, borderRadius:16, background:'rgba(20,20,19,0.06)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.45)" strokeWidth="2.5" strokeLinecap="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{ position:'absolute', bottom:115, left:28, right:28, zIndex:2 }}>
                <div style={{ background:'#141413', borderRadius:18, padding:'16px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:'0 8px 24px rgba(20,20,19,0.18)' }}>
                  <div>
                    <p style={{ color:'white', fontWeight:700, fontSize:15, margin:'0 0 2px', fontFamily:'Sofia Sans,sans-serif' }}>Find a Match</p>
                    <p style={{ color:'rgba(255,255,255,0.55)', fontSize:12, margin:0, fontFamily:'Sofia Sans,sans-serif' }}>3 peers available now</p>
                  </div>
                  <div style={{ width:36, height:36, borderRadius:18, background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ══ SECTION 2 — RESOURCE CENTER ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              <GrainientBg c1='#C8D8FF' c2='#88A8F0' c3='#D8E8FF' speed={0.20} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(60,28,20,0.18) 100%)', pointerEvents:'none', zIndex:1 }} />

              {/* Top bar */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:5 }}>
                <div onClick={onBack} style={{ background:'rgba(255,237,229,0.72)', backdropFilter:'blur(12px)', width:36, height:36, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(20,20,19,0.06)' }}>
                  <span style={{ color:'#141413', fontSize:20, lineHeight:1, marginTop:-1 }}>‹</span>
                </div>
                <div style={{ background:'rgba(255,237,229,0.72)', backdropFilter:'blur(12px)', padding:'6px 16px', borderRadius:20, border:'1px solid rgba(20,20,19,0.06)' }}>
                  <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Resource Center</span>
                </div>
                <div style={{ width:36 }} />
              </div>

              {/* Header */}
              <div style={{ position:'absolute', top:120, left:28, right:28, zIndex:2 }}>
                <p style={{ color:'rgba(20,20,19,0.45)', fontSize:13, fontWeight:600, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.5px', textTransform:'uppercase' }}>Support Tools</p>
                <p style={{ color:'#141413', fontSize:24, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', margin:0 }}>Resources whenever<br/>you need them</p>
              </div>

              {/* Resource grid */}
              <div style={{ position:'absolute', top:225, left:22, right:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, zIndex:2 }}>
                {RESOURCES.map(({ icon, title, sub, accent }) => (
                  <div key={title} style={{ background:'rgba(255,237,229,0.72)', backdropFilter:'blur(14px)', borderRadius:18, padding:'14px 14px', cursor:'pointer', border:'1px solid rgba(20,20,19,0.06)', boxShadow:'0 2px 10px rgba(20,20,19,0.05)', minHeight:90 }}>
                    <div style={{ fontSize:22, marginBottom:7 }}>{icon}</div>
                    <p style={{ fontSize:13, fontWeight:700, color:'#141413', margin:'0 0 3px', fontFamily:'Sofia Sans,sans-serif', lineHeight:1.2 }}>{title}</p>
                    <p style={{ fontSize:10.5, color:'rgba(20,20,19,0.45)', margin:0, fontFamily:'Sofia Sans,sans-serif', lineHeight:1.35 }}>{sub}</p>
                    <div style={{ marginTop:8, display:'inline-block', background:accent, height:2.5, width:24, borderRadius:99 }} />
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end sliding container */}

          {/* Section indicator — right edge */}
          <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:7, zIndex:210, pointerEvents:'none' }}>
            {SECTIONS.map((_, i) => (
              <div key={i} style={{
                width:4,
                height: i === section ? 26 : 8,
                background: i === section ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.38)',
                borderRadius:99,
                transition:'all 0.32s ease',
                filter: i === section ? 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' : 'none',
              }} />
            ))}
          </div>

          {/* Swipe hint — sits in the right-center, out of the way */}
          {section === 0 && !voiceMode && (
            <div style={{ position:'absolute', right:14, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:4, zIndex:210, pointerEvents:'none', opacity:0.7 }}>
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M5 1v12M1 9l4 4 4-4" stroke="rgba(20,20,19,0.45)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ color:'rgba(20,20,19,0.4)', fontSize:9, fontFamily:'Sofia Sans,sans-serif', fontWeight:600, letterSpacing:'0.5px', writingMode:'vertical-rl', textOrientation:'mixed' }}>SWIPE</span>
            </div>
          )}
        </div>
      );
    }

