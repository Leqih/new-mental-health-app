    const { useRef, useState } = React;

    /* ── CHAT HISTORY SIDEBAR ── */
    const CHAT_SIDEBAR_ICON_SEARCH = 'https://www.figma.com/api/mcp/asset/94a3b85e-f910-4850-8871-e5de092b6d76';
    const CHAT_SIDEBAR_ICON_PLUS   = 'https://www.figma.com/api/mcp/asset/1eb42fef-10b7-4d3d-ad36-87e4d27e7e53';
    const CHAT_SIDEBAR_ICON_CHAT   = 'https://www.figma.com/api/mcp/asset/31f34602-fbd0-4447-9685-a7d3a7b7156f';
    const CHAT_SIDEBAR_ICON_VOICE  = 'https://www.figma.com/api/mcp/asset/ad3e0d13-d99e-4154-b919-2da9e7dc7034';
    const CHAT_SIDEBAR_ICON_MSG    = 'https://www.figma.com/api/mcp/asset/0306a7ba-71c3-46f3-9d9e-62404309513e';

    const CHAT_HISTORY = {
      Today: [
        'Help me write a fantasy story opening involving a cursed forest...',
        'Can you explain how to calculate compound interest?',
        'Make a workout plan for a beginner aiming to lose weight',
      ],
      Yesterday: [
        'Write a humorous dialogue between a sarcastic AI assistant...',
        'What are the best practices for designing call-to-action buttons?',
        'Generate a series of motivational quotes focused on overcoming...',
      ],
      'Previous 7 Days': [
        'Explain the concept of quantum computing in simple terms...',
        'What are the best practices for designing call-to-action buttons?',
        'Write a short story about a young apprentice in a magical forest...',
      ],
    };

    function ChatSidebar({ open, onClose }) {
      const [tab, setTab] = useState('Chat');
      const W = 314;
      return (
        <React.Fragment>
          <div
            onClick={onClose}
            style={{
              position: 'absolute', inset: 0, zIndex: 500,
              background: 'rgba(0,0,0,0.38)',
              opacity: open ? 1 : 0,
              pointerEvents: open ? 'auto' : 'none',
              transition: 'opacity 0.32s ease',
            }}
          />
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: W,
            background: 'white',
            zIndex: 510,
            transform: open ? 'translateX(0)' : `translateX(-${W}px)`,
            transition: 'transform 0.34s cubic-bezier(0.4,0,0.2,1)',
            display: 'flex', flexDirection: 'column',
            overflowY: 'auto',
            paddingTop: 50, paddingBottom: 67, paddingLeft: 16, paddingRight: 16,
            gap: 32,
            boxShadow: open ? '4px 0 32px rgba(0,0,0,0.14)' : 'none',
          }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexShrink: 0 }}>
              <div style={{ flex: 1, height: 38, borderRadius: 999, background: 'white', boxShadow: '0 0 0 1px rgba(3,7,18,0.05), 0 8px 16px rgba(3,7,18,0.08)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 10, overflow: 'hidden' }}>
                <div style={{ width: 14, height: 14, position: 'relative', flexShrink: 0 }}>
                  <img alt="" src={CHAT_SIDEBAR_ICON_SEARCH} style={{ position: 'absolute', inset: '8.33%', display: 'block', width: '83.34%', height: '83.34%' }} />
                </div>
                <span style={{ fontSize: 12, color: '#808898', fontFamily: 'Sofia Sans,sans-serif', letterSpacing: '-0.084px', lineHeight: 1, whiteSpace: 'nowrap' }}>Search</span>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: 99, background: '#0d0d12', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer', boxShadow: 'inset 0 1.5px 1.2px rgba(255,255,255,0.12)' }}>
                <div style={{ width: 14, height: 14, position: 'relative', overflow: 'hidden' }}>
                  <img alt="" src={CHAT_SIDEBAR_ICON_PLUS} style={{ position: 'absolute', inset: '20.83%', display: 'block', width: '58.34%', height: '58.34%' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flexShrink: 0 }}>
              <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid #d0d5dd', width: '100%' }}>
                {['Chat', 'Voice'].map(t => {
                  const active = tab === t;
                  return (
                    <div key={t} onClick={() => setTab(t)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: 12, paddingLeft: 8, paddingRight: 8, borderBottom: active ? '2px solid #37394a' : '2px solid transparent', cursor: 'pointer', position: 'relative', top: 1, boxShadow: active ? 'inset 0 -2px 2px rgba(0,0,0,0.08)' : 'none' }}>
                      <div style={{ display: 'flex', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 14, height: 14, position: 'relative', flexShrink: 0 }}>
                          <img alt="" src={t === 'Chat' ? CHAT_SIDEBAR_ICON_CHAT : CHAT_SIDEBAR_ICON_VOICE} style={{ position: 'absolute', inset: t === 'Chat' ? '8.33% 8.33% 6.42% 8.33%' : '8.33%', display: 'block', width: '100%', height: '100%', maxWidth: 'none' }} />
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 500, color: active ? '#37394a' : '#808898', fontFamily: 'Sofia Sans,sans-serif', letterSpacing: '-0.14px', lineHeight: 1.25, whiteSpace: 'nowrap' }}>{t}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {Object.entries(CHAT_HISTORY).map(([label, items]) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <p style={{ margin: 0, fontSize: 12, color: '#a3acb9', fontFamily: 'Sofia Sans,sans-serif', letterSpacing: '-0.12px', lineHeight: 1.2 }}>{label}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {items.map((text, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, height: 38, background: '#f6f8fa', borderRadius: 8, padding: '0 8px', boxShadow: '0 0 0 1px rgba(3,7,18,0.05), 0 1px 2px -1px rgba(3,7,18,0.08)', cursor: 'pointer', overflow: 'hidden' }}>
                        <div style={{ width: 14, height: 14, position: 'relative', flexShrink: 0 }}>
                          <img alt="" src={CHAT_SIDEBAR_ICON_MSG} style={{ position: 'absolute', inset: '12.5% 12.5% 10.58% 12.5%', display: 'block', width: '77%', height: '77%', maxWidth: 'none' }} />
                        </div>
                        <span style={{ flex: 1, minWidth: 0, fontSize: 11, fontWeight: 500, color: '#37394a', fontFamily: 'Sofia Sans,sans-serif', letterSpacing: '-0.11px', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      );
    }

    /* ── SUPPORT PAGE ── */
    function SupportPage({ onBack, userName }) {
      const [section, setSection] = useState(0);
      const [voiceMode, setVoiceMode] = useState(false);
      const [typeChat, setTypeChat] = useState(false);
      const [chatTopic, setChatTopic] = useState(null);
      const [sidebarOpen, setSidebarOpen] = useState(false);
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
        { icon:'📞', title:'988 Lifeline',      sub:'Call or text 988 anytime',         accent:'#e05555' },
        { icon:'💬', title:'Crisis Text Line',  sub:'Text HOME to 741741',              accent:'#4a7ce8' },
        { icon:'🏥', title:'CAPS Counseling',   sub:'Campus counseling services',       accent:'#3cb872' },
        { icon:'🌬️', title:'Breathing Exercise',sub:'4-7-8 guided breath session',     accent:'#8b5cf6' },
        { icon:'📓', title:'Journaling Prompts',sub:'Reflective prompts to process',    accent:'#d97706' },
        { icon:'🤝', title:'Support Groups',    sub:'Find community near you',          accent:'#c026d3' },
      ];

      return (
        <div
          style={{ position:'absolute', inset:0, zIndex: sidebarOpen ? 400 : (voiceMode || typeChat) ? 350 : 200, overflow:'hidden', userSelect:'none', cursor: voiceMode ? 'default' : 'grab' }}
          onTouchStart={e => { if (!voiceMode) onTouchStart(e); }}
          onTouchEnd={e => { if (!voiceMode) onTouchEnd(e); }}
          onMouseDown={e => { if (!voiceMode) onMouseDown(e); }}
          onMouseUp={e => { if (!voiceMode) onMouseUp(e); }}
        >
          {/* Voice mode overlay */}
          {voiceMode && <VoiceModeOverlay onClose={() => setVoiceMode(false)} />}
          {/* Type chat overlay */}
          {typeChat && <TypeChatPage onBack={() => { setTypeChat(false); setChatTopic(null); }} userName={userName} initialTopic={chatTopic} />}
          {/* Shared warp filter */}
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

            {/* ══ SECTION 0 — AI CHAT (Figma 269:1749 pixel-accurate) ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              {/* White canvas background */}
              <div style={{ position:'absolute', inset:0, background:'#ffffff' }} />
              {/* Warm bloom top-center */}
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 55% at 50% 8%, rgba(255,235,220,0.60) 0%, transparent 65%)' }} />
              {/* Cool bloom bottom-right */}
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 45% at 85% 85%, rgba(220,210,255,0.28) 0%, transparent 65%)' }} />

              {/* Left edge — blur layer + gradient layer separate (avoids mask+blur artifacts) */}
              {/* Start below header (top:100) so header buttons are never covered */}
              <div style={{ position:'absolute', top:100, left:0, width:80, height:'calc(100% - 100px)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', WebkitMaskImage:'linear-gradient(to right, black 0%, transparent 100%)', maskImage:'linear-gradient(to right, black 0%, transparent 100%)', zIndex:10, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, left:0, width:80, height:'calc(100% - 100px)', background:'linear-gradient(to right, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 100%)', zIndex:11, pointerEvents:'none' }} />
              {/* Right edge — blur layer + gradient layer separate */}
              <div style={{ position:'absolute', top:100, right:0, width:80, height:'calc(100% - 100px)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', WebkitMaskImage:'linear-gradient(to left, black 0%, transparent 100%)', maskImage:'linear-gradient(to left, black 0%, transparent 100%)', zIndex:10, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, right:0, width:80, height:'calc(100% - 100px)', background:'linear-gradient(to left, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 100%)', zIndex:11, pointerEvents:'none' }} />

              {/* ── Header (top:52 per Figma) ── */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:15 }}>
                {/* History button — opens chat history sidebar */}
                <div onClick={() => setSidebarOpen(true)} style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:99, padding:10, display:'inline-flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', flexShrink:0 }}>
                  {/* Chat history / sidebar icon */}
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="1" width="14" height="2" rx="1" fill="#141413"/>
                    <rect x="0.5" y="6" width="9" height="2" rx="1" fill="#141413"/>
                    <rect x="0.5" y="11" width="11" height="2" rx="1" fill="#141413"/>
                  </svg>
                </div>
                {/* Title pill */}
                <div style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', width:83, height:35, borderRadius:22, position:'relative', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', flexShrink:0 }}>
                  <span style={{ position:'absolute', left:20, top:9, color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', whiteSpace:'nowrap' }}>AI Chat</span>
                </div>
                {/* Dots menu */}
                <div style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', width:36, height:36, borderRadius:99, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', overflow:'hidden', cursor:'pointer', flexShrink:0 }}>
                  <div style={{ width:18, height:18, position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:'16.67%', bottom:'16.67%', left:'45.83%', right:'45.83%' }}>
                      <div style={{ position:'absolute', top:'-6.25%', bottom:'-6.25%', left:'-50%', right:'-50%' }}>
                        <img alt="" src={imgAiIcon} style={{ display:'block', width:'100%', height:'100%', maxWidth:'none' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Orb area (top:102) ── */}
              <div style={{ position:'absolute', top:102, left:0, right:0, height:155, zIndex:2 }}>
                {/* Pattern: 342.922×335, centered */}
                <div style={{ position:'absolute', top:'calc(50% - 0.5px)', left:'calc(50% + 0.46px)', transform:'translate(-50%,-50%)', width:342.922, height:335, pointerEvents:'none' }}>
                  <img alt="" src={imgAiPattern} style={{ width:'100%', height:'100%', display:'block' }} />
                </div>
                {/* Orb 155px wrapper: left:117.5 = (390-155)/2 */}
                <div style={{ position:'absolute', left:117.5, top:0, width:155, height:155 }}>
                  {/* Inner orb: 117.5px at offset 18.5px */}
                  <div style={{ position:'absolute', top:18.5, left:18.5, width:117.5, height:117.5, borderRadius:58.75, background:'rgba(255,255,255,0.72)', border:'2px solid rgba(255,255,255,0.5)', boxShadow:'0 64px 250px 0 #ef8c5a, 0 24px 54px 0 rgba(255,255,255,0.10), 0 3px 120px 0 #ccebff', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:-1.24, left:-1.24, width:115.984, height:115.984, background:'rgba(255,255,255,0.28)' }} />
                    {/* MaskGroup: 102.242×75.127 at left:8 top:22 */}
                    <div style={{ position:'absolute', top:22, left:8, width:102.242, height:75.127, overflow:'visible' }}>
                      <img alt="" src={imgAiMaskGroup} style={{ position:'absolute', top:'-29.16%', left:'-21.43%', width:'142.86%', height:'158.32%', display:'block', maxWidth:'none' }} />
                    </div>
                    {/* Top-left highlight */}
                    <div style={{ position:'absolute', top:5.76, left:8.17, width:53.065, height:43.968, filter:'blur(3.79px)', background:'radial-gradient(circle at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 45%, transparent 100%)' }} />
                    {/* Bottom-right highlight */}
                    <div style={{ position:'absolute', top:94.01, left:75.18, width:25.774, height:13.645, filter:'blur(2.274px)', background:'radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, transparent 100%)' }} />
                    {/* Glass rim */}
                    <div style={{ position:'absolute', top:-1.24, left:-1.24, width:115.984, height:115.984, borderRadius:57.992, background:'linear-gradient(145deg, rgba(255,255,255,0.22) 6.17%, rgba(255,255,255,0) 45.62%)' }} />
                  </div>
                </div>
              </div>

              {/* ── Greeting text — above gradient overlays ── */}
              <div style={{ position:'absolute', top:265, left:28, right:28, zIndex:15 }}>
                <div style={{ height:21, position:'relative' }}>
                  <p style={{ position:'absolute', top:4, left:0, margin:0, color:'rgba(20,20,19,0.42)', fontSize:13, fontWeight:600, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.2px', whiteSpace:'nowrap' }}>Hey, {userName} 👋</p>
                </div>
                <div style={{ height:9 }} />
                <div style={{ height:62, position:'relative' }}>
                  <div style={{ position:'absolute', top:-1, left:0, right:0 }}>
                    <p style={{ margin:0, color:'#141413', fontSize:26, fontWeight:800, lineHeight:'31.72px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.5px' }}>Where should</p>
                    <p style={{ margin:0, color:'#141413', fontSize:26, fontWeight:800, lineHeight:'31.72px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.5px' }}>we start today?</p>
                  </div>
                </div>
              </div>

              {/* ── Card carousel — below gradient overlays ── */}
              <div style={{ position:'absolute', top:366, left:0, right:0, zIndex:3 }}>
                <div style={{ display:'flex', gap:20, overflowX:'auto', paddingLeft:28, paddingRight:28, paddingBottom:320, marginBottom:-300, scrollbarWidth:'none', msOverflowStyle:'none' }} className="hide-scrollbar">

                  {/* Card 1 — I'm anxious: p-20, inner 136×163, border-2 */}
                  <div onClick={() => { setChatTopic("I've been feeling really anxious lately"); setTypeChat(true); }} style={{ position:'relative', width:176, flexShrink:0, borderRadius:22, overflow:'hidden', border:'2px solid rgba(255,255,255,0.5)', boxShadow:'0 64px 250px 0 rgba(239,140,90,0.6)', cursor:'pointer' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(163.155deg,#6700e5 4.94%,#ff7e2d 89.60%)' }} />
                    <div style={{ position:'absolute', inset:0, boxShadow:'inset 0 24px 54px rgba(255,255,255,0.10), inset 0 3px 120px #ccebff', pointerEvents:'none' }} />
                    <div style={{ position:'relative', padding:20, height:203 }}>
                      <div style={{ height:163, width:136, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between' }}>
                        <div style={{ width:50, height:50, position:'relative', flexShrink:0 }}>
                          <img alt="" src={imgAiBrutalism28} style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:20, alignSelf:'stretch' }}>
                          <p style={{ margin:0, color:'white', fontSize:15, fontWeight:800, letterSpacing:'-0.3px', lineHeight:'17.25px', fontFamily:'Sofia Sans,sans-serif', whiteSpace:'nowrap' }}>I'm anxious</p>
                          <p style={{ margin:0, color:'white', fontSize:10, fontWeight:400, lineHeight:'15px', fontFamily:'Sofia Sans,sans-serif', width:136 }}>The first sign is never obvious. It's quiet, then everything at once.</p>
                        </div>
                        <div style={{ alignSelf:'stretch', display:'flex', justifyContent:'flex-end' }}>
                          <p style={{ margin:0, color:'white', fontSize:11, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', textDecoration:'underline solid white', whiteSpace:'nowrap' }}>Start talking ↗</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 — I feel lonely: w-176 h-203, py-18, inner 136×163 */}
                  <div onClick={() => { setChatTopic("I feel really lonely"); setTypeChat(true); }} style={{ position:'relative', width:176, height:203, flexShrink:0, borderRadius:22, overflow:'hidden', border:'2px solid rgba(255,255,255,0.5)', boxShadow:'0 64px 120px 0 rgba(135,108,254,0.3)', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(163.155deg,#0099e5 4.94%,#622dff 89.60%)' }} />
                    <div style={{ position:'absolute', inset:0, boxShadow:'inset 0 24px 54px rgba(255,255,255,0.10), inset 0 3px 120px #ccebff', pointerEvents:'none' }} />
                    <div style={{ position:'relative', height:163, width:136, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between' }}>
                      <div style={{ width:50, height:50, position:'relative', flexShrink:0 }}>
                        <img alt="" src={imgAiBrutalism13} style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                      </div>
                      <div style={{ display:'flex', flexDirection:'column', gap:20, alignSelf:'stretch' }}>
                        <p style={{ margin:0, color:'white', fontSize:15, fontWeight:800, letterSpacing:'-0.3px', lineHeight:'17.25px', fontFamily:'Sofia Sans,sans-serif', whiteSpace:'nowrap' }}>I feel lonely</p>
                        <p style={{ margin:0, color:'white', fontSize:10, fontWeight:400, lineHeight:'15px', fontFamily:'Sofia Sans,sans-serif', width:136 }}>Some feelings don't need a reason. They just need to be heard.</p>
                      </div>
                      <div style={{ alignSelf:'stretch', display:'flex', justifyContent:'flex-end' }}>
                        <p style={{ margin:0, color:'white', fontSize:11, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', textDecoration:'underline solid white', whiteSpace:'nowrap' }}>Start talking ↗</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 — I'm overwhelmed: w-176 h-203, flex-1 inner 136×167 */}
                  <div onClick={() => { setChatTopic("I'm feeling overwhelmed by everything"); setTypeChat(true); }} style={{ position:'relative', width:176, height:203, flexShrink:0, borderRadius:22, overflow:'hidden', border:'1px solid rgba(255,255,255,0.5)', boxShadow:'0 64px 120px 0 rgba(108,254,162,0.3)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(163.155deg,#f8b841 4.94%,#2dff73 89.60%)' }} />
                    <div style={{ position:'absolute', inset:0, boxShadow:'inset 0 24px 54px rgba(255,255,255,0.10), inset 0 3px 120px #ccebff', pointerEvents:'none' }} />
                    <div style={{ position:'relative', flex:'1 0 0', width:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <div style={{ height:167, width:136, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between' }}>
                        <div style={{ width:50, height:50, position:'relative', overflow:'hidden', flexShrink:0 }}>
                          <div style={{ position:'absolute', top:'16.39%', bottom:'16.39%', left:'15.46%', right:'15.46%' }}>
                            <img alt="" src={imgAiGroup} style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                          </div>
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:20, alignSelf:'stretch' }}>
                          <p style={{ margin:0, color:'white', fontSize:15, fontWeight:800, letterSpacing:'-0.3px', lineHeight:'17.25px', fontFamily:'Sofia Sans,sans-serif', whiteSpace:'nowrap' }}>I'm overwhelmed</p>
                          <p style={{ margin:0, color:'white', fontSize:10, fontWeight:400, lineHeight:'15px', fontFamily:'Sofia Sans,sans-serif', width:136 }}>When everything piles up at once. You don't have to hold it alone.</p>
                        </div>
                        <div style={{ alignSelf:'stretch', display:'flex', justifyContent:'flex-end' }}>
                          <p style={{ margin:0, color:'white', fontSize:11, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', textDecoration:'underline solid white', whiteSpace:'nowrap' }}>Start talking ↗</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 — I need to vent: w-176 h-203, inner w-150 h-167 */}
                  <div onClick={() => { setChatTopic("I just need to vent about something"); setTypeChat(true); }} style={{ position:'relative', width:176, height:203, flexShrink:0, borderRadius:22, overflow:'hidden', border:'1px solid rgba(255,255,255,0.5)', boxShadow:'0 64px 250px 0 rgba(239,140,90,0.6)', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                    <div style={{ position:'absolute', inset:0, background:'linear-gradient(163.155deg,#f8b241 4.94%,#ff2d6c 89.60%)' }} />
                    <div style={{ position:'absolute', inset:0, boxShadow:'inset 0 24px 54px rgba(255,255,255,0.10), inset 0 3px 120px #ccebff', pointerEvents:'none' }} />
                    <div style={{ position:'relative', flex:'1 0 0', width:'100%', display:'flex', alignItems:'flex-end', justifyContent:'center' }}>
                      <div style={{ height:167, width:150, display:'flex', flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between' }}>
                        <div style={{ width:33.847, height:34.814, position:'relative', flexShrink:0 }}>
                          <img alt="" src={imgAiVector} style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                        </div>
                        <div style={{ display:'flex', flexDirection:'column', gap:20, alignSelf:'stretch' }}>
                          <p style={{ margin:0, color:'white', fontSize:15, fontWeight:800, letterSpacing:'-0.3px', lineHeight:'17.25px', fontFamily:'Sofia Sans,sans-serif', whiteSpace:'nowrap' }}>I need to vent</p>
                          <p style={{ margin:0, color:'white', fontSize:10, fontWeight:400, lineHeight:'15px', fontFamily:'Sofia Sans,sans-serif', width:136 }}>No agenda. No advice. Just space to let it out.</p>
                        </div>
                        <div style={{ alignSelf:'stretch', display:'flex', justifyContent:'flex-end' }}>
                          <p style={{ margin:0, color:'white', fontSize:11, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', textDecoration:'underline solid white', whiteSpace:'nowrap' }}>Start talking ↗</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ── Start Chat button (top:596.5 per Figma, centered) ── */}
              <div style={{ position:'absolute', top:597, left:0, right:0, display:'flex', justifyContent:'center', zIndex:4 }}>
                <div onClick={() => setTypeChat(true)} style={{ background:'white', display:'inline-flex', alignItems:'center', gap:4, padding:'8px 10px', borderRadius:99, boxShadow:'0 0 0 1px rgba(3,7,18,0.04), 0 2px 4px rgba(3,7,18,0.04)', cursor:'pointer', overflow:'hidden' }}>
                  <div style={{ width:14, height:14, position:'relative', overflow:'hidden', flexShrink:0 }}>
                    <div style={{ position:'absolute', top:'20.83%', bottom:'20.83%', left:'20.83%', right:'20.83%' }}>
                      <div style={{ position:'absolute', top:'-9.18%', bottom:'-9.18%', left:'-9.18%', right:'-9.18%' }}>
                        <img alt="" src={imgAiPlus} style={{ display:'block', width:'100%', height:'100%', maxWidth:'none' }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'center', paddingLeft:2, paddingRight:2 }}>
                    <span style={{ color:'black', fontSize:12, fontWeight:400, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.096px', lineHeight:1, whiteSpace:'nowrap' }}>Start Chat</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ══ SECTION 1 — PEER SUPPORT ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'#fff3ec' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 55% at 50% 10%, rgba(255,185,130,0.55) 0%, transparent 68%)' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 40% at 80% 80%, rgba(255,160,100,0.18) 0%, transparent 65%)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(60,28,20,0.12) 100%)', pointerEvents:'none', zIndex:1 }} />

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
                    <div style={{ width:32, height:32, borderRadius:16, background:'white', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
                      <img alt="" src={imgPeerChatBtn} style={{ width:14, height:14, display:'block', objectFit:'contain' }} />
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
                    <img alt="" src={imgPeerArrow} style={{ width:16, height:16, display:'block', objectFit:'contain' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ══ SECTION 2 — RESOURCE CENTER ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'#fff3ec' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 90% 55% at 50% 10%, rgba(255,185,130,0.55) 0%, transparent 68%)' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 40% at 20% 85%, rgba(255,160,100,0.18) 0%, transparent 65%)' }} />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(60,28,20,0.12) 100%)', pointerEvents:'none', zIndex:1 }} />

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

          {/* Chat history sidebar */}
          <ChatSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          {/* Section indicator — right edge; dark on white AI Chat bg, white on coloured sections */}
          <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:7, zIndex:210, pointerEvents:'none' }}>
            {SECTIONS.map((_, i) => {
              const onWhite = section === 0;
              const active  = i === section;
              return (
                <div key={i} style={{
                  width:4,
                  height: active ? 26 : 8,
                  background: active
                    ? (onWhite ? 'rgba(20,20,19,0.55)' : 'rgba(255,255,255,0.9)')
                    : (onWhite ? 'rgba(20,20,19,0.18)' : 'rgba(255,255,255,0.38)'),
                  borderRadius:99,
                  transition:'all 0.32s ease',
                  filter: active && !onWhite ? 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' : 'none',
                }} />
              );
            })}
          </div>
        </div>
      );
    }

