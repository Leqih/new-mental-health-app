    const { useEffect: useEffectSP, useRef, useState } = React;

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

    function PeerProfileOverlay({ peer, onBack, onDraftIntro }) {
      return (
        <div style={{ position:'absolute', inset:0, zIndex:620, background:'#ffffff', overflow:'hidden' }}>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 62% 38% at 50% 0%, rgba(222,220,255,0.72) 0%, rgba(255,255,255,0) 72%)' }} />
          <div style={{ position:'absolute', top:92, right:-38, width:210, height:210, borderRadius:'50%', background:'radial-gradient(circle, rgba(124,92,252,0.14) 0%, rgba(124,92,252,0.04) 42%, rgba(255,255,255,0) 78%)', filter:'blur(6px)' }} />
          <div style={{ position:'absolute', top:266, left:-54, width:180, height:180, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,190,154,0.18) 0%, rgba(255,255,255,0) 76%)', filter:'blur(10px)' }} />

          <div className="hide-scrollbar" style={{ position:'absolute', inset:0, overflowY:'auto', WebkitOverflowScrolling:'touch', paddingBottom:168 }}>
            <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:2 }}>
              <div onClick={onBack} style={{ background:'rgba(255,255,255,0.92)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:99, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', flexShrink:0 }}>
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L1 7L7 13" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{ background:'rgba(255,255,255,0.92)', border:'1px solid rgba(20,20,19,0.07)', padding:'9px 18px', borderRadius:22, boxShadow:'0 2px 4px rgba(3,7,18,0.04)' }}>
                <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Peer Profile</span>
              </div>
              <div style={{ width:34 }} />
            </div>

            <div style={{ padding:'116px 24px 0', position:'relative', zIndex:1 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center' }}>
                <div style={{ width:106, height:106, borderRadius:53, background:peer.color, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 22px 48px rgba(20,20,19,0.10), inset 0 1px 0 rgba(255,255,255,0.44)', position:'relative' }}>
                  <span style={{ fontSize:38, fontWeight:800, color:'rgba(20,20,19,0.42)', fontFamily:'Sofia Sans,sans-serif' }}>{peer.initial}</span>
                  <div style={{ position:'absolute', right:8, bottom:8, width:18, height:18, borderRadius:9, background:peer.status === 'Online now' ? '#2ecc71' : '#c7cbd4', border:'3px solid white' }} />
                </div>
                <div style={{ marginTop:18, display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', justifyContent:'center' }}>
                  <h1 style={{ margin:0, color:'#141413', fontSize:30, fontWeight:800, lineHeight:1, letterSpacing:'-0.8px', fontFamily:'Sofia Sans,sans-serif' }}>{peer.name}</h1>
                  <span style={{ background:'rgba(124,92,252,0.11)', padding:'6px 12px', borderRadius:999, fontSize:11, fontWeight:700, color:'#7C5CFC', fontFamily:'Sofia Sans,sans-serif' }}>{peer.tag}</span>
                </div>
                <p style={{ margin:'10px 0 0', color:peer.status === 'Online now' ? '#22b66f' : 'rgba(20,20,19,0.48)', fontSize:14, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.12px' }}>{peer.status}</p>
                <p style={{ margin:'7px 0 0', color:'rgba(20,20,19,0.56)', fontSize:13, fontWeight:600, fontFamily:'Sofia Sans,sans-serif' }}>{peer.subtitle}</p>
              </div>

              <div style={{ marginTop:28, background:'rgba(255,255,255,0.86)', border:'1px solid rgba(20,20,19,0.06)', borderRadius:26, padding:'20px 18px', boxShadow:'0 18px 38px rgba(20,20,19,0.06)' }}>
                <p style={{ margin:'0 0 10px', color:'rgba(20,20,19,0.42)', fontSize:11, fontWeight:800, letterSpacing:'1.2px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>About</p>
                <p style={{ margin:0, color:'#141413', fontSize:17, lineHeight:1.45, fontWeight:600, letterSpacing:'-0.24px', fontFamily:'Sofia Sans,sans-serif' }}>{peer.about}</p>
              </div>

              <div style={{ marginTop:14, display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:10 }}>
                <div style={{ background:'rgba(255,255,255,0.9)', border:'1px solid rgba(20,20,19,0.05)', borderRadius:20, padding:'14px 12px', boxShadow:'0 8px 18px rgba(20,20,19,0.04)' }}>
                  <p style={{ margin:'0 0 7px', color:'rgba(20,20,19,0.36)', fontSize:10, fontWeight:800, letterSpacing:'1px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>Response</p>
                  <p style={{ margin:0, color:'#141413', fontSize:14, fontWeight:800, lineHeight:1.2, fontFamily:'Sofia Sans,sans-serif' }}>{peer.responseTime}</p>
                </div>
                <div style={{ background:'rgba(255,255,255,0.9)', border:'1px solid rgba(20,20,19,0.05)', borderRadius:20, padding:'14px 12px', boxShadow:'0 8px 18px rgba(20,20,19,0.04)' }}>
                  <p style={{ margin:'0 0 7px', color:'rgba(20,20,19,0.36)', fontSize:10, fontWeight:800, letterSpacing:'1px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>Format</p>
                  <p style={{ margin:0, color:'#141413', fontSize:14, fontWeight:800, lineHeight:1.2, fontFamily:'Sofia Sans,sans-serif' }}>{peer.format}</p>
                </div>
                <div style={{ background:'rgba(255,255,255,0.9)', border:'1px solid rgba(20,20,19,0.05)', borderRadius:20, padding:'14px 12px', boxShadow:'0 8px 18px rgba(20,20,19,0.04)' }}>
                  <p style={{ margin:'0 0 7px', color:'rgba(20,20,19,0.36)', fontSize:10, fontWeight:800, letterSpacing:'1px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>Energy</p>
                  <p style={{ margin:0, color:'#141413', fontSize:14, fontWeight:800, lineHeight:1.2, fontFamily:'Sofia Sans,sans-serif' }}>{peer.energy}</p>
                </div>
              </div>

              <div style={{ marginTop:18, display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ background:'linear-gradient(180deg, rgba(248,248,255,0.98), rgba(255,255,255,0.92))', border:'1px solid rgba(20,20,19,0.05)', borderRadius:24, padding:'18px 18px 16px', boxShadow:'0 10px 24px rgba(20,20,19,0.05)' }}>
                  <p style={{ margin:'0 0 12px', color:'rgba(20,20,19,0.42)', fontSize:11, fontWeight:800, letterSpacing:'1.1px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>Good Match For</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {peer.topics.map(topic => (
                      <span key={topic} style={{ display:'inline-flex', alignItems:'center', background:'rgba(124,92,252,0.09)', border:'1px solid rgba(124,92,252,0.12)', borderRadius:999, padding:'7px 11px', fontSize:12, fontWeight:700, color:'#6d53f6', fontFamily:'Sofia Sans,sans-serif' }}>{topic}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background:'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,248,252,0.94))', border:'1px solid rgba(20,20,19,0.05)', borderRadius:24, padding:'18px', boxShadow:'0 10px 24px rgba(20,20,19,0.05)' }}>
                  <p style={{ margin:'0 0 12px', color:'rgba(20,20,19,0.42)', fontSize:11, fontWeight:800, letterSpacing:'1.1px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>How {peer.name.split(' ')[0]} Shows Up</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {peer.style.map((item, index) => (
                      <div key={item} style={{ display:'flex', alignItems:'center', gap:10, background:index === 1 ? 'rgba(255,243,236,0.76)' : 'rgba(241,244,255,0.82)', borderRadius:18, padding:'11px 12px' }}>
                        <div style={{ width:8, height:8, borderRadius:4, background:index === 1 ? '#ff9b61' : '#8f78ff', flexShrink:0 }} />
                        <p style={{ margin:0, color:'#141413', fontSize:13, fontWeight:700, letterSpacing:'-0.12px', fontFamily:'Sofia Sans,sans-serif' }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background:'linear-gradient(180deg, rgba(20,20,19,0.95), rgba(38,49,72,0.98))', borderRadius:24, padding:'18px 18px 16px', boxShadow:'0 22px 48px rgba(20,20,19,0.18)' }}>
                  <p style={{ margin:'0 0 8px', color:'rgba(255,255,255,0.52)', fontSize:11, fontWeight:800, letterSpacing:'1.1px', textTransform:'uppercase', fontFamily:'Sofia Sans,sans-serif' }}>Conversation Fit</p>
                  <p style={{ margin:0, color:'white', fontSize:17, fontWeight:700, lineHeight:1.4, letterSpacing:'-0.24px', fontFamily:'Sofia Sans,sans-serif' }}>{peer.matchNote}</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ position:'absolute', left:20, right:20, bottom:26, zIndex:3 }}>
            <div style={{ background:'rgba(255,255,255,0.92)', border:'1px solid rgba(20,20,19,0.06)', borderRadius:28, padding:'14px 14px 12px', boxShadow:'0 22px 48px rgba(20,20,19,0.14), 0 0 0 1px rgba(255,255,255,0.72) inset', backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)' }}>
              <div onClick={() => onDraftIntro(peer)} style={{ background:'linear-gradient(180deg, rgba(25,37,58,0.96) 0%, rgba(20,20,19,0.98) 100%)', borderRadius:22, padding:'17px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:'0 18px 36px rgba(20,20,19,0.18)' }}>
                <div>
                  <p style={{ margin:'0 0 4px', color:'white', fontSize:17, fontWeight:800, letterSpacing:'-0.26px', fontFamily:'Sofia Sans,sans-serif' }}>Draft intro with {peer.name.split(' ')[0]}</p>
                  <p style={{ margin:0, color:'rgba(255,255,255,0.58)', fontSize:12.5, fontWeight:500, letterSpacing:'-0.08px', fontFamily:'Sofia Sans,sans-serif' }}>Open a guided first message instead of starting cold</p>
                </div>
                <div style={{ width:42, height:42, borderRadius:21, background:'rgba(255,255,255,0.10)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.14)' }}>
                  <img alt="" src={imgPeerArrow} style={{ width:18, height:18, display:'block' }} />
                </div>
              </div>
              <div onClick={onBack} style={{ marginTop:10, borderRadius:20, border:'1px solid rgba(20,20,19,0.08)', background:'rgba(248,248,252,0.96)', padding:'14px 16px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <span style={{ color:'#141413', fontSize:13, fontWeight:700, letterSpacing:'0.1px', fontFamily:'Sofia Sans,sans-serif' }}>Back to peer list</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ── SUPPORT PAGE ── */
    function SupportPage({ onBack, userName, moodContext }) {
      const [section, setSection] = useState(0);
      const [voiceMode, setVoiceMode] = useState(false);
      const [typeChat, setTypeChat] = useState(false);
      const [chatTopic, setChatTopic] = useState(null);
      const [chatMoodCtx, setChatMoodCtx] = useState(null);
      const [sidebarOpen, setSidebarOpen] = useState(false);
      const [bookingOpen, setBookingOpen] = useState(false);
      const [bookingService, setBookingService] = useState(null);
      const [isChatBookingMode, setIsChatBookingMode] = useState(false);
      const [activePeer, setActivePeer] = useState(null);
      const [chatPeer, setChatPeer] = useState(null);
      const [activeResourceFilter, setActiveResourceFilter] = useState('all');
      const moodOpenedRef = useRef(false);

      const openBooking = (serviceKey) => {
        setBookingService(serviceKey || null);
        setIsChatBookingMode(true);
        setChatTopic(null);
        setChatMoodCtx(null);
        setTypeChat(true);
      };

      const closeTypeChat = () => {
        setTypeChat(false);
        setChatTopic(null);
        setChatMoodCtx(null);
        setChatPeer(null);
        setBookingService(null);
        setIsChatBookingMode(false);
      };

      const openPeerProfile = (peer) => {
        setSidebarOpen(false);
        setActivePeer(peer);
      };

      const closePeerProfile = () => setActivePeer(null);

      const draftPeerIntro = (peer) => {
        setActivePeer(null);
        setChatMoodCtx(null);
        setChatPeer(null);
        setChatTopic(peer.introPrompt);
        setTypeChat(true);
      };

      const openPeerChat = (peer) => {
        setSidebarOpen(false);
        setActivePeer(null);
        setChatMoodCtx(null);
        setChatTopic(null);
        setBookingService(null);
        setIsChatBookingMode(false);
        setChatPeer(peer);
        setTypeChat(true);
      };

      /* Auto-open AI chat when navigated from mood log */
      useEffect(() => {
        if (moodContext && !moodOpenedRef.current) {
          moodOpenedRef.current = true;
          setChatMoodCtx(moodContext);
          setChatTopic(null);
          setTypeChat(true);
        }
      }, [moodContext]);
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
        {
          name:'Maya R.',
          tag:'Anxiety',
          status:'Online now',
          color:'#f4a7a7',
          initial:'M',
          subtitle:'Junior · Late-night overthinker',
          responseTime:'Under 10m',
          format:'Text first',
          energy:'Soft + steady',
          about:'Maya is good at slowing spirals down before they get loud. She prefers honest, short messages and tends to anchor the conversation with one feeling at a time.',
          topics:['Overthinking', 'Social anxiety', 'Night spirals'],
          style:['Grounding before advice', 'Short check-ins feel easier', 'Okay with messy first messages'],
          matchNote:'Best when you want someone who can meet anxious energy without rushing it or turning the moment into a fix-it session.',
          introPrompt:"Help me draft a first message to Maya about anxiety and overthinking. Keep it warm, short, and honest.",
        },
        {
          name:'Jordan K.',
          tag:'Stress',
          status:'Active 3m ago',
          color:'#a7c4f4',
          initial:'J',
          subtitle:'Senior · Deadline triage person',
          responseTime:'~20m',
          format:'Quick bursts',
          energy:'Practical calm',
          about:'Jordan is strongest when everything feels stacked at once. They help break big pressure into one next step and are especially good with school-work overwhelm.',
          topics:['Deadlines', 'Academic pressure', 'Burnout edge'],
          style:['Concrete next steps', 'Fast reality checks', 'Less small talk'],
          matchNote:'Best when you are overloaded and need help untangling what is urgent from what just feels urgent.',
          introPrompt:"Help me draft a first message to Jordan about stress and feeling behind. Make it concise and direct.",
        },
        {
          name:'Sam L.',
          tag:'Loss',
          status:'Active 12m ago',
          color:'#a7f4c4',
          initial:'S',
          subtitle:'Grad student · Gentle listener',
          responseTime:'~30m',
          format:'Longer replies',
          energy:'Quiet and warm',
          about:'Sam makes space for grief without trying to speed it up. They are a strong match if your feelings are heavy, hard to name, or changing by the hour.',
          topics:['Grief', 'Homesickness', 'Change fatigue'],
          style:['Reflective responses', 'No pressure to explain cleanly', 'Okay with silence'],
          matchNote:'Best when you want to be heard without being pushed toward silver linings or productivity.',
          introPrompt:"Help me draft a first message to Sam about grief or loss. Keep it gentle and not overly formal.",
        },
        {
          name:'Riley T.',
          tag:'Depression',
          status:'Active 1h ago',
          color:'#f4d6a7',
          initial:'R',
          subtitle:'Sophomore · Low-energy companion',
          responseTime:'~1h',
          format:'Slow-paced',
          energy:'Low-pressure',
          about:'Riley is best for flat days when even starting a sentence feels like work. They keep the pace slow, normalize low motivation, and do not expect polished check-ins.',
          topics:['Low motivation', 'Isolation', 'Heavy mornings'],
          style:['Tiny openers welcome', 'No-performance energy', 'Slow replies are okay'],
          matchNote:'Best when you need a low-demand conversation that feels safe even if you only have a few words.',
          introPrompt:"Help me draft a first message to Riley about depression and low energy. Keep it simple and low-pressure.",
        },
      ];

      /* ── resources ── */
      const RESOURCE_SECTIONS = [
        {
          title:'Start Here',
          kicker:'Immediate help',
          cards:[
            { icon:'📞', title:'988 Lifeline', sub:'Call or text 988 right away if you are in crisis or need immediate support.', meta:'24/7 national support', accent:'#ff6b6b', url:'https://988lifeline.org/', size:'hero', filter:'crisis', badge:'Immediate' },
            { icon:'🏛️', title:'Illinois Counseling Center', sub:'Primary campus counseling hub for same-day support, counseling, group care, and referrals.', meta:'217-333-3704', accent:'#3cb872', url:'https://counselingcenter.illinois.edu/', size:'wide', filter:'counseling', badge:'Core care' },
            { icon:'🚨', title:'Rosecrance Crisis Line', sub:'Local 24-hour crisis help for urgent moments after hours.', meta:'217-359-4141', accent:'#e05555', url:'https://wellness.illinois.edu/mental-health-resources', size:'standard', filter:'crisis', badge:'After hours' },
            { icon:'💬', title:'Crisis Text Line', sub:'Text HOME to 741741 if talking on the phone feels hard.', meta:'Text-based support', accent:'#5b8cff', url:'https://www.crisistextline.org/', size:'standard', filter:'crisis', badge:'Text support' },
          ],
        },
        {
          title:'Programs & Workshops',
          kicker:'Skill building',
          cards:[
            { icon:'🧠', title:'In Focus Workshops', sub:'A 4-week program for focus, procrastination, time management, and self-care.', meta:'Open to all Illinois students', accent:'#7c5cfc', url:'https://www.counselingcenter.illinois.edu/workshops/focus-workshops', size:'wide', filter:'workshops', badge:'Skill series' },
            { icon:'📚', title:'Tuesday @ 7 Workshops', sub:'Weekly workshops on wellness, mental health, and academic success.', meta:'Weekly in fall and spring', accent:'#8b5cf6', url:'https://www.counselingcenter.illinois.edu/get-involved/ccpprogram', size:'standard', filter:'workshops', badge:'Weekly' },
            { icon:'🌬️', title:'Stress Management Program', sub:'McKinley coaching, relaxation tools, and workshop programming.', meta:'217-333-2700', accent:'#f08c5a', url:'https://mckinley.illinois.edu/stress-management', size:'standard', filter:'workshops', badge:'Practice tools' },
            { icon:'🎤', title:'Outreach Workshops', sub:'Request class, residence hall, or RSO workshops on stress and relationships.', meta:'Counseling Center outreach', accent:'#11b5a4', url:'https://www.counselingcenter.illinois.edu/outreach', size:'standard', filter:'workshops', badge:'Group session' },
            { icon:'🧑‍🏫', title:'CCP Program', sub:'Peer outreach training and service-learning for students who want deeper involvement.', meta:'Semester-based program', accent:'#d97706', url:'https://www.counselingcenter.illinois.edu/get-involved/ccpprogram', size:'standard', filter:'workshops', badge:'Training path' },
          ],
        },
        {
          title:'Campus & Peer Support',
          kicker:'People and programs',
          cards:[
            { icon:'📱', title:'TalkCampus', sub:'Anonymous 24/7 peer support platform available to Illinois students.', meta:'Use your Illinois netID', accent:'#c026d3', url:'https://counselingcenter.illinois.edu/talkcampus', size:'wide', filter:'peer', badge:'Peer space' },
            { icon:'🗣️', title:"Let's Talk", sub:'15-minute informal consultation with an embedded counselor.', meta:'No fee, low-pressure start', accent:'#7c5cfc', url:'https://www.counselingcenter.illinois.edu/outreach/lets-talk', size:'standard', filter:'counseling', badge:'Drop-in' },
            { icon:'🏫', title:'Embedded Counselors', sub:'Meet with clinicians based in specific colleges, departments, and units.', meta:'By college or unit', accent:'#4a7ce8', url:'https://www.counselingcenter.illinois.edu/about/embedded-counseling-program', size:'standard', filter:'counseling', badge:'Embedded care' },
            { icon:'🫶', title:'Student Wellness Peers', sub:'Peer educators sharing wellness tools, programs, and healthy routines.', meta:'Students helping students', accent:'#14b8a6', url:'https://wellness.illinois.edu/student-wellness-peers', size:'standard', filter:'peer', badge:'Peer-led' },
            { icon:'🩺', title:'McKinley Mental Health', sub:'Evaluation, consultation, short-term psychotherapy, and acute assessment.', meta:'217-333-2700', accent:'#f08c5a', url:'https://mckinleyn.web.illinois.edu/mental-health', size:'standard', filter:'counseling', badge:'Clinical care' },
            { icon:'♿', title:'DRES Mental Health', sub:'Counseling and coordinated support for students working with DRES.', meta:'217-333-1970', accent:'#0ea5a4', url:'https://wellness.illinois.edu/get-help/mental-health-help', size:'standard', filter:'peer', badge:'Access support' },
          ],
        },
      ];

      const RESOURCE_FILTERS = [
        { id:'all', label:'All' },
        { id:'crisis', label:'Crisis' },
        { id:'counseling', label:'Counseling' },
        { id:'workshops', label:'Workshops' },
        { id:'peer', label:'Peer' },
      ];

      const openResource = (url) => window.open(url, '_blank', 'noopener,noreferrer');

      return (
        <div
          style={{ position:'absolute', inset:0, zIndex: sidebarOpen ? 400 : (voiceMode || typeChat || activePeer) ? 350 : 200, overflow:'hidden', userSelect:'none', cursor: voiceMode || typeChat || activePeer ? 'default' : 'grab' }}
          onTouchStart={e => { if (!voiceMode && !typeChat && !activePeer) onTouchStart(e); }}
          onTouchEnd={e => { if (!voiceMode && !typeChat && !activePeer) onTouchEnd(e); }}
          onMouseDown={e => { if (!voiceMode && !typeChat && !activePeer) onMouseDown(e); }}
          onMouseUp={e => { if (!voiceMode && !typeChat && !activePeer) onMouseUp(e); }}
        >
          {/* Voice mode overlay */}
          {voiceMode && <VoiceModeOverlay onClose={() => setVoiceMode(false)} />}
          {/* Type chat overlay */}
          {typeChat && <TypeChatPage onBack={closeTypeChat} userName={userName} initialTopic={chatMoodCtx ? null : chatTopic} moodContext={chatMoodCtx} onBook={openBooking} bookingMode={isChatBookingMode} preService={bookingService} peerChat={chatPeer} />}
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
                <div style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', width:36, height:36, borderRadius:99, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', cursor:'pointer', flexShrink:0 }}>
                  {/* 3-dot vertical menu — inline SVG */}
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="9" cy="4" r="1.4" fill="#141413"/>
                    <circle cx="9" cy="9" r="1.4" fill="#141413"/>
                    <circle cx="9" cy="14" r="1.4" fill="#141413"/>
                  </svg>
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

              {/* ── Start Chat button ── */}
              <div style={{ position:'absolute', top:620, left:0, right:0, display:'flex', justifyContent:'center', zIndex:4 }}>
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
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden', background:'#ffffff' }}>

              {/* Header — same pill style as AI Chat */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:15 }}>
                <div onClick={onBack} style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:99, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', flexShrink:0 }}>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', padding:'9px 20px', borderRadius:22, boxShadow:'0 2px 4px rgba(3,7,18,0.04)' }}>
                  <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Peer Support</span>
                </div>
                <div style={{ width:34 }} />
              </div>

              {/* Mini orb — smaller version of AI Chat orb, purple tint */}
              <div style={{ position:'absolute', top:108, left:0, right:0, display:'flex', justifyContent:'center', zIndex:2, pointerEvents:'none' }}>
                <div style={{ width:92, height:92, borderRadius:46, background:'rgba(255,255,255,0.72)', border:'1.5px solid rgba(255,255,255,0.55)', boxShadow:'0 28px 90px 0 rgba(124,92,252,0.34), 0 8px 28px 0 rgba(255,255,255,0.10), 0 2px 60px 0 #ccebff', overflow:'hidden', position:'relative' }}>
                  <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.28)' }} />
                  <div style={{ position:'absolute', top:'28%', left:'10%', width:'80%', height:'65%', overflow:'visible' }}>
                    <img alt="" src={imgAiMaskGroup} style={{ position:'absolute', top:'-30%', left:'-22%', width:'144%', height:'160%', display:'block', maxWidth:'none' }} />
                  </div>
                  <div style={{ position:'absolute', top:'5%', left:'8%', width:'45%', height:'40%', filter:'blur(3px)', background:'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 45%, transparent 100%)' }} />
                  <div style={{ position:'absolute', inset:0, borderRadius:40, background:'linear-gradient(145deg, rgba(255,255,255,0.22) 6%, rgba(255,255,255,0) 46%)' }} />
                </div>
              </div>

              {/* Section title */}
              <div style={{ position:'absolute', top:196, left:28, right:28, zIndex:2, display:'flex', flexDirection:'column', gap:8 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ width:7, height:7, borderRadius:99, background:'#fde047', boxShadow:'0 0 0 6px rgba(253,224,71,0.10)' }} />
                  <p style={{ color:'rgba(20,20,19,0.58)', fontSize:11, fontWeight:700, margin:0, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'1.12px', textTransform:'uppercase' }}>Community</p>
                </div>
                <div style={{ maxWidth:252 }}>
                  <p style={{ color:'#141413', fontSize:27, fontWeight:800, fontFamily:'Sofia Sans,sans-serif', margin:0, lineHeight:1.04, letterSpacing:'-0.7px' }}>Connect with peers</p>
                  <p style={{ color:'#141413', fontSize:27, fontWeight:800, fontFamily:'Sofia Sans,sans-serif', margin:0, lineHeight:1.04, letterSpacing:'-0.7px' }}>who truly get it</p>
                </div>
              </div>

              {/* Peer cards */}
              <div style={{ position:'absolute', top:286, left:22, right:22, display:'flex', flexDirection:'column', gap:12, zIndex:2 }}>
                {PEERS.map((peer) => {
                  const { name, tag, status, color, initial } = peer;
                  const isOnline = status === 'Online now';
                  return (
                    <div key={name} onClick={() => openPeerProfile(peer)} style={{ background:'rgba(255,255,255,0.84)', backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)', borderRadius:22, padding:'14px 16px', display:'flex', alignItems:'center', gap:14, border:'1px solid rgba(255,255,255,0.46)', boxShadow:'0 14px 32px rgba(20,20,19,0.06), inset 0 1px 0 rgba(255,255,255,0.38)', cursor:'pointer' }}>
                      {/* Avatar with online dot */}
                      <div style={{ position:'relative', flexShrink:0 }}>
                        <div style={{ width:48, height:48, borderRadius:24, background:color, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.38)' }}>
                          <span style={{ fontSize:18, fontWeight:800, color:'rgba(20,20,19,0.48)', fontFamily:'Sofia Sans,sans-serif' }}>{initial}</span>
                        </div>
                        {isOnline && <div style={{ position:'absolute', bottom:2, right:1, width:11, height:11, borderRadius:6, background:'#2ecc71', border:'2px solid white' }} />}
                      </div>
                      {/* Info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                          <span style={{ fontSize:15, fontWeight:800, color:'#141413', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.24px' }}>{name}</span>
                          <span style={{ background:'rgba(124,92,252,0.11)', padding:'4px 10px', borderRadius:99, fontSize:10.5, fontWeight:700, color:'#7C5CFC', fontFamily:'Sofia Sans,sans-serif', lineHeight:1 }}>{tag}</span>
                        </div>
                        <span style={{ fontSize:12.5, color: isOnline ? '#2ecc71' : 'rgba(20,20,19,0.38)', fontFamily:'Sofia Sans,sans-serif', fontWeight: isOnline ? 700 : 500, letterSpacing:'-0.08px' }}>{status}</span>
                      </div>
                      {/* Chat button */}
                      <div onClick={(e) => { e.stopPropagation(); openPeerChat(peer); }} style={{ width:38, height:38, borderRadius:19, background:'rgba(124,92,252,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.24)' }}>
                        <img alt="" src={imgPeerChatBtn} onClick={(e) => { e.stopPropagation(); openPeerChat(peer); }} style={{ width:17, height:17, display:'block', cursor:'pointer' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA — dark button with arrow inline SVG */}
              <div style={{ position:'absolute', bottom:122, left:28, right:28, zIndex:3 }}>
                <div style={{ background:'linear-gradient(180deg, rgba(25,37,58,0.96) 0%, rgba(20,20,19,0.98) 100%)', borderRadius:24, padding:'18px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:'0 22px 48px rgba(20,20,19,0.20), 0 0 0 1px rgba(255,255,255,0.05) inset' }}>
                  <div>
                    <p style={{ color:'white', fontWeight:800, fontSize:17, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.26px' }}>Find a Match</p>
                    <p style={{ color:'rgba(255,255,255,0.52)', fontSize:12.5, margin:0, fontFamily:'Sofia Sans,sans-serif', fontWeight:500, letterSpacing:'-0.08px' }}>3 peers available now</p>
                  </div>
                  <div style={{ width:42, height:42, borderRadius:21, background:'rgba(255,255,255,0.10)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.14)' }}>
                    <img alt="" src={imgPeerArrow} style={{ width:18, height:18, display:'block' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* ══ SECTION 2 — RESOURCE CENTER ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              {/* Background — decorative blooms stay behind content */}
              <div style={{ position:'absolute', inset:0, background:'#ffffff', zIndex:0 }} />
              <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', background:'radial-gradient(ellipse 70% 50% at 50% 5%, rgba(255,235,220,0.38) 0%, transparent 65%)' }} />
              <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', background:'radial-gradient(ellipse 55% 40% at 15% 88%, rgba(220,210,255,0.18) 0%, transparent 65%)' }} />
              {/* Edge atmosphere only — kept outside the readable content layer */}
              <div style={{ position:'absolute', top:108, left:0, width:44, height:'calc(100% - 108px)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', WebkitMaskImage:'linear-gradient(to right, black 0%, transparent 100%)', maskImage:'linear-gradient(to right, black 0%, transparent 100%)', opacity:0.42, zIndex:1, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:108, left:0, width:44, height:'calc(100% - 108px)', background:'linear-gradient(to right, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%)', zIndex:1, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:108, right:0, width:44, height:'calc(100% - 108px)', backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)', WebkitMaskImage:'linear-gradient(to left, black 0%, transparent 100%)', maskImage:'linear-gradient(to left, black 0%, transparent 100%)', opacity:0.42, zIndex:1, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:108, right:0, width:44, height:'calc(100% - 108px)', background:'linear-gradient(to left, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 100%)', zIndex:1, pointerEvents:'none' }} />

              {/* Header — centered pill only */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'center', zIndex:15 }}>
                <div style={{ background:'rgba(255,255,255,0.94)', border:'1px solid rgba(20,20,19,0.07)', padding:'9px 20px', borderRadius:22, boxShadow:'0 2px 4px rgba(3,7,18,0.04)' }}>
                  <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Resources</span>
                </div>
              </div>

              {/* Title + filters isolated from page bloom */}
              <div style={{ position:'absolute', top:104, left:16, right:16, height:154, zIndex:1, pointerEvents:'none' }}>
                <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.92)', borderRadius:34 }} />
                <div style={{ position:'absolute', inset:'-10px -8px', background:'rgba(255,255,255,0.42)', borderRadius:40, filter:'blur(14px)' }} />
              </div>

              {/* Section title */}
              <div style={{ position:'absolute', top:112, left:22, right:22, zIndex:2 }}>
                <div style={{ position:'relative', padding:'8px 12px 6px' }}>
                  <p style={{ color:'rgba(20,20,19,0.4)', fontSize:11, fontWeight:700, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'1px', textTransform:'uppercase' }}>Support Tools</p>
                  <p style={{ color:'#141413', fontSize:22, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', margin:0, lineHeight:1.25 }}>Resources whenever<br/>you need them</p>
                </div>
              </div>

              <div style={{ position:'absolute', top:214, left:22, right:22, zIndex:2 }}>
                <div className="hide-scrollbar" style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:2, scrollbarWidth:'none', msOverflowStyle:'none' }}>
                  {RESOURCE_FILTERS.map(({ id, label }) => {
                    const active = activeResourceFilter === id;
                    return (
                      <div
                        key={id}
                        onClick={() => setActiveResourceFilter(id)}
                        style={{
                          background: active ? '#141413' : 'rgba(255,255,255,0.84)',
                          color: active ? '#ffffff' : 'rgba(20,20,19,0.62)',
                          border: active ? '1px solid #141413' : '1px solid rgba(20,20,19,0.08)',
                          borderRadius:999,
                          padding:'8px 13px',
                          fontSize:11,
                          fontWeight:700,
                          fontFamily:'Sofia Sans,sans-serif',
                          letterSpacing:'0.2px',
                          cursor:'pointer',
                          flexShrink:0,
                          boxShadow: active ? '0 10px 22px rgba(20,20,19,0.12)' : '0 1px 4px rgba(20,20,19,0.04)',
                        }}
                      >
                        {label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Resource layout — hierarchical instead of flat */}
              <div
                className="hide-scrollbar"
                onTouchStart={(e) => e.stopPropagation()}
                onTouchEnd={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
                style={{ position:'absolute', top:258, left:22, right:18, bottom:106, overflowY:'auto', WebkitOverflowScrolling:'touch', scrollbarWidth:'none', msOverflowStyle:'none', zIndex:2, paddingRight:4 }}
              >
                <div style={{ display:'flex', flexDirection:'column', gap:18, paddingBottom:14 }}>
                  {RESOURCE_SECTIONS.map(({ title, kicker, cards }) => {
                    const filteredCards = activeResourceFilter === 'all'
                      ? cards
                      : cards.filter(card => card.filter === activeResourceFilter);
                    if (!filteredCards.length) return null;
                    return (
                    <div key={title} style={{ display:'flex', flexDirection:'column', gap:10 }}>
                      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', padding:'0 6px' }}>
                        <p style={{ margin:0, color:'#141413', fontSize:15, fontWeight:800, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'-0.2px' }}>{title}</p>
                        <p style={{ margin:0, color:'rgba(20,20,19,0.36)', fontSize:10.5, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', letterSpacing:'0.8px', textTransform:'uppercase' }}>{kicker}</p>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                        {filteredCards.map(({ icon, title: cardTitle, sub, meta, accent, url, size, badge }) => {
                          const isHero = size === 'hero';
                          const isWide = size === 'wide';
                          return (
                            <div
                              key={cardTitle}
                              onClick={() => openResource(url)}
                              style={{
                                gridColumn: isHero || isWide ? '1 / -1' : 'auto',
                                background: isHero ? 'linear-gradient(180deg, rgba(24,32,50,0.96) 0%, rgba(20,20,19,0.98) 100%)' : 'rgba(255,255,255,0.9)',
                                backdropFilter:'blur(14px)',
                                WebkitBackdropFilter:'blur(14px)',
                                borderRadius:isHero ? 24 : 18,
                                padding:isHero ? '18px 18px 16px' : '14px 14px 13px',
                                cursor:'pointer',
                                border:isHero ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(20,20,19,0.06)',
                                boxShadow:isHero ? '0 20px 42px rgba(20,20,19,0.18)' : '0 1px 8px rgba(20,20,19,0.05)',
                                minHeight:isHero ? 138 : isWide ? 126 : 118,
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:'space-between',
                                position:'relative',
                                overflow:'hidden',
                              }}
                            >
                              {isHero && <div style={{ position:'absolute', top:-34, right:-12, width:120, height:120, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 72%)' }} />}
                              <div>
                                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:isHero ? 10 : 7 }}>
                                  <div style={{ fontSize:isHero ? 26 : 22 }}>{icon}</div>
                                  <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:isHero ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,19,0.05)', borderRadius:999, padding:'6px 9px' }}>
                                    <span style={{ width:6, height:6, borderRadius:3, background:accent, display:'block' }} />
                                    <span style={{ color:isHero ? 'rgba(255,255,255,0.76)' : 'rgba(20,20,19,0.48)', fontSize:10, fontWeight:700, letterSpacing:'0.4px', fontFamily:'Sofia Sans,sans-serif', textTransform:'uppercase' }}>{badge}</span>
                                  </div>
                                </div>
                                <p style={{ fontSize:isHero ? 18 : 12.5, fontWeight:800, color:isHero ? '#ffffff' : '#141413', margin:'0 0 6px', fontFamily:'Sofia Sans,sans-serif', lineHeight:isHero ? 1.18 : 1.2, letterSpacing:isHero ? '-0.3px' : '0' }}>{cardTitle}</p>
                                <p style={{ fontSize:isHero ? 12.5 : 10.5, color:isHero ? 'rgba(255,255,255,0.66)' : 'rgba(20,20,19,0.52)', margin:0, fontFamily:'Sofia Sans,sans-serif', lineHeight:isHero ? 1.42 : 1.38 }}>{sub}</p>
                              </div>
                              <div style={{ marginTop:12, display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                                <div>
                                  <p style={{ fontSize:isHero ? 11 : 10, color:isHero ? 'rgba(255,255,255,0.5)' : 'rgba(20,20,19,0.34)', margin:'0 0 8px', fontFamily:'Sofia Sans,sans-serif', fontWeight:700, letterSpacing:'0.2px' }}>{meta}</p>
                                  <div style={{ display:'inline-block', background:accent, height:2.5, width:isHero ? 38 : 24, borderRadius:99 }} />
                                </div>
                                <div style={{ width:isHero ? 34 : 28, height:isHero ? 34 : 28, borderRadius:999, background:isHero ? 'rgba(255,255,255,0.1)' : 'rgba(20,20,19,0.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                                  <span style={{ color:isHero ? '#ffffff' : '#141413', fontSize:isHero ? 15 : 13, fontWeight:800, lineHeight:1 }}>↗</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>

          </div>{/* end sliding container */}

          {/* Chat history sidebar */}
          <ChatSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          {activePeer && <PeerProfileOverlay peer={activePeer} onBack={closePeerProfile} onDraftIntro={draftPeerIntro} />}

          {/* Section indicator — right edge; all sections are white-bg, always dark dots */}
          <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', display:'flex', flexDirection:'column', gap:7, zIndex:210, pointerEvents:'none' }}>
            {SECTIONS.map((_, i) => (
              <div key={i} style={{
                width:4,
                height: i === section ? 26 : 8,
                background: i === section ? 'rgba(20,20,19,0.55)' : 'rgba(20,20,19,0.16)',
                borderRadius:99,
                transition:'all 0.32s ease',
              }} />
            ))}
          </div>
        </div>
      );
    }
