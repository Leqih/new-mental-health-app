    const { useEffect, useRef, useState } = React;
    /* ── TYPE CHAT PAGE ── */
    const BOOKABLE_KEYS = new Set(['caps','letsTalk','mckinley','resilience']);
    const UIUC_RESOURCES = {
      caps:      { level:2, icon:'🏛️', title:'CAPS Counseling',    sub:'Free counseling for UIUC students',   tagline:'Professional counselors for anxiety, depression, stress & life transitions.',  tags:['Free','Confidential','Walk-ins OK'],           detail:'610 E. John St · M–F 8am–5pm',     phone:'(217) 333-3704', color:'#3b82f6' },
      letsTalk:  { level:2, icon:'💬', title:"Let's Talk",          sub:'Free 15-min drop-in, no appointment', tagline:'Drop in for a free 15-min chat — no appointment, no commitment, no paperwork.',  tags:['Free','No appointment','15 min'],              detail:'Multiple campus locations',         phone:'(217) 333-3704', color:'#7c3aed' },
      mckinley:  { level:3, icon:'🏥', title:'McKinley Health',     sub:'Mental health & physical care',       tagline:'UIUC student health combining mental and physical support under one roof.',         tags:['Free','Mental + physical','On-campus'],        detail:'1109 S. Lincoln Ave',               phone:'(217) 333-2700', color:'#059669' },
      crisis:    { level:1, icon:'🆘', title:'988 Crisis Line',     sub:'Immediate support, 24/7',             tagline:"Real people, any time. You don't need to be 'in danger' — struggling is enough.",  tags:['24/7','Free','Anonymous'],                    detail:'Call or text — always available',   phone:'988',            color:'#dc2626' },
      text741:   { level:1, icon:'📱', title:'Crisis Text Line',    sub:'Text HOME to 741741',                 tagline:'Prefer typing? Text a trained crisis counselor — free, confidential, any time.',   tags:['24/7','Free','Text-based'],                   detail:'24/7 · free · confidential',        phone:'741741',         color:'#2563eb' },
      resilience:{ level:3, icon:'🤝', title:'Resilience @ UIUC',  sub:'Peer wellness coaching',              tagline:'Student peer coaches who have been through similar experiences — casual & free.',   tags:['Free','Peer-led','Student coaches'],           detail:'Free, student-led sessions',        phone:'(217) 333-3704', color:'#d97706' },
      breathing: { level:4, icon:'🌬️', title:'Breathing Exercise', sub:'4-7-8 technique · 2 min',            tagline:'Inhale 4s, hold 7s, exhale 8s. Activates your body\'s calm response — try it now.', tags:['Do it now','2 minutes','Science-backed'],      detail:'Inhale 4s · Hold 7s · Exhale 8s',  phone:null,             color:'#0891b2' },
      odos:      { level:3, icon:'🎓', title:'Dean of Students',    sub:'Academic & personal advocacy',        tagline:'Extensions, incomplete grades & accommodations when stress hits your coursework.',   tags:['Extensions','Accommodations','Advocacy'],     detail:'Turner Student Services Bldg',      phone:'(217) 333-0050', color:'#be185d' },
    };
    /* Inject _key into each resource for Book button bookability check */
    Object.keys(UIUC_RESOURCES).forEach(k => { UIUC_RESOURCES[k]._key = k; });

    function ResourceCard({ res, SF, onBook }) {
      const canBook = onBook && BOOKABLE_KEYS.has(res._key);
      const BADGE = { 1:['URGENT','#dc2626','rgba(254,226,226,0.95)'], 2:['START HERE','#7c3aed','rgba(237,233,254,0.95)'], 3:['RECOMMENDED','#059669','rgba(209,250,229,0.95)'], 4:['HELPFUL','#0891b2','rgba(224,242,254,0.95)'] };
      const [bLabel, bText, bBg] = BADGE[res.level] || BADGE[3];
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.96)', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 14px rgba(20,20,19,0.09)', border:'1px solid rgba(20,20,19,0.06)', display:'flex' }}>
          <div style={{ width:3, background:res.color, flexShrink:0 }} />
          <div style={{ flex:1, padding:'11px 13px' }}>
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                <div style={{ width:32, height:32, borderRadius:10, background:`${res.color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:16, lineHeight:1 }}>{res.icon}</span>
                </div>
                <div>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF, letterSpacing:'-0.2px', lineHeight:1.3 }}>{res.title}</p>
                  <p style={{ margin:0, fontSize:10.5, color:'rgba(20,20,19,0.44)', fontFamily:SF, lineHeight:1.3 }}>{res.sub}</p>
                </div>
              </div>
              <div style={{ flexShrink:0, background:bBg, borderRadius:99, padding:'3px 8px', marginTop:1 }}>
                <span style={{ fontSize:9, fontWeight:800, color:bText, fontFamily:SF, letterSpacing:'0.5px' }}>{bLabel}</span>
              </div>
            </div>
            {res.tagline && (
              <p style={{ margin:'7px 0 7px', fontSize:11.5, color:'rgba(20,20,19,0.56)', fontFamily:SF, lineHeight:1.45 }}>{res.tagline}</p>
            )}
            {res.tags && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:8 }}>
                {res.tags.map(t => (
                  <div key={t} style={{ background:`${res.color}14`, border:`1px solid ${res.color}30`, borderRadius:99, padding:'3px 9px' }}>
                    <span style={{ fontSize:10.5, fontWeight:700, color:res.color, fontFamily:SF }}>{t}</span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
              <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.1px', lineHeight:1.4 }}>{res.detail}</p>
              <div style={{ display:'flex', gap:6, flexShrink:0, alignItems:'center' }}>
              {canBook && (
                <div onClick={onBook} style={{ display:'flex', alignItems:'center', gap:4, background:`${res.color}15`, borderRadius:99, padding:'5px 10px', cursor:'pointer', border:`1px solid ${res.color}30` }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={res.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span style={{ fontSize:10.5, fontWeight:700, color:res.color, fontFamily:SF, whiteSpace:'nowrap' }}>Book</span>
                </div>
              )}
              {res.phone && (
                <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:4, background:res.color, borderRadius:99, padding:'5px 11px', cursor:'pointer', boxShadow:`0 2px 8px ${res.color}44` }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  <span style={{ fontSize:11, fontWeight:700, color:'white', fontFamily:SF, whiteSpace:'nowrap' }}>{res.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    /* ── INLINE WIDGETS ── */
    function DurationWidget({ onAnswer, answered, SF }) {
      const [sel, setSel] = useState(null);
      const opts = ['Just today','A few days','About a week','2–3 weeks','Over a month','A long time'];
      if (answered) return (
        <div style={{ marginLeft:36, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'5px 13px', border:'1px solid rgba(130,90,220,0.18)', animation:'msgIn 0.25s ease-out' }}>
          <span style={{ fontSize:12, color:'rgba(110,65,200,0.9)', fontFamily:SF, fontWeight:700 }}>✓ {answered}</span>
        </div>
      );
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.95)', borderRadius:14, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 1px 8px rgba(20,20,19,0.06)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'10px 12px' }}>
            <p style={{ margin:'0 0 9px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>How long?</p>
            <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:2 }}>
              {opts.map(o => (
                <div key={o} onClick={() => { setSel(o); setTimeout(() => onAnswer(o), 220); }}
                  style={{ flexShrink:0, padding:'7px 13px', borderRadius:99, border:`1.5px solid ${sel===o?'#9b6ef3':'rgba(20,20,19,0.12)'}`, background:sel===o?'#9b6ef3':'transparent', cursor:'pointer', transition:'all 0.16s' }}>
                  <span style={{ fontSize:12.5, fontWeight:600, color:sel===o?'white':'rgba(20,20,19,0.65)', fontFamily:SF, whiteSpace:'nowrap' }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    function TagWidget({ options, label, onAnswer, answered, SF }) {
      const [picks, setPicks] = useState([]);
      const toggle = t => setPicks(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
      if (answered) return (
        <div style={{ marginLeft:36, display:'flex', flexWrap:'wrap', gap:5, maxWidth:'86%', animation:'msgIn 0.25s ease-out' }}>
          {answered.split(' · ').map(t => (
            <div key={t} style={{ background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'4px 10px', border:'1px solid rgba(130,90,220,0.18)' }}>
              <span style={{ fontSize:11.5, color:'rgba(110,65,200,0.85)', fontFamily:SF, fontWeight:700 }}>✓ {t}</span>
            </div>
          ))}
        </div>
      );
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.95)', borderRadius:14, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 1px 8px rgba(20,20,19,0.06)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'10px 12px' }}>
            <p style={{ margin:'0 0 9px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>{label || 'Pick any that apply'}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
              {options.map(t => (
                <div key={t} onClick={() => toggle(t)}
                  style={{ padding:'6px 12px', borderRadius:99, border:`1.5px solid ${picks.includes(t)?'#9b6ef3':'rgba(20,20,19,0.11)'}`, background:picks.includes(t)?'rgba(155,110,243,0.1)':'transparent', cursor:'pointer', transition:'all 0.15s' }}>
                  <span style={{ fontSize:12.5, fontWeight:600, color:picks.includes(t)?'#7b4fd4':'rgba(20,20,19,0.62)', fontFamily:SF }}>{t}</span>
                </div>
              ))}
            </div>
            {picks.length > 0 && (
              <div onClick={() => onAnswer(picks.join(' · '))}
                style={{ display:'inline-flex', alignItems:'center', gap:5, background:'linear-gradient(135deg,#9b6ef3,#7b4fd4)', borderRadius:99, padding:'7px 16px', cursor:'pointer', boxShadow:'0 2px 8px rgba(120,70,220,0.28)' }}>
                <span style={{ fontSize:12.5, fontWeight:700, color:'white', fontFamily:SF }}>Done  →</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    function ScaleWidget({ label, onAnswer, answered, SF }) {
      const [sel, setSel] = useState(null);
      const opts = [{v:1,e:'😌',l:'Mild'},{v:2,e:'😕',l:'Noticeable'},{v:3,e:'😟',l:'Moderate'},{v:4,e:'😣',l:'Intense'},{v:5,e:'😰',l:'Overwhelming'}];
      if (answered) {
        const f = opts.find(o => o.l === answered);
        return (
          <div style={{ marginLeft:36, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'5px 13px', border:'1px solid rgba(130,90,220,0.18)', animation:'msgIn 0.25s ease-out' }}>
            <span style={{ fontSize:12, color:'rgba(110,65,200,0.9)', fontFamily:SF, fontWeight:700 }}>✓ {f?.e} {answered}</span>
          </div>
        );
      }
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.95)', borderRadius:14, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 1px 8px rgba(20,20,19,0.06)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'10px 12px' }}>
            <p style={{ margin:'0 0 9px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>{label || 'How intense does it feel?'}</p>
            <div style={{ display:'flex', gap:5 }}>
              {opts.map(o => (
                <div key={o.v} onClick={() => { setSel(o.v); setTimeout(() => onAnswer(o.l), 220); }}
                  style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'8px 2px', borderRadius:12, border:`1.5px solid ${sel===o.v?'#9b6ef3':'rgba(20,20,19,0.08)'}`, background:sel===o.v?'rgba(155,110,243,0.12)':'transparent', cursor:'pointer', transition:'all 0.15s' }}>
                  <span style={{ fontSize:22 }}>{o.e}</span>
                  <span style={{ fontSize:9, fontWeight:600, color:'rgba(20,20,19,0.42)', fontFamily:SF, textAlign:'center', lineHeight:1.2 }}>{o.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* ── THERAPIST MATCHING ── */
    const THERAPISTS = [
      { id:'sarah_chen',    name:'Dr. Sarah Chen',    title:'Licensed Psychologist · PhD',      initials:'SC', color:'#a78bfa',
        specializations:['anxiety','depression','identity','academic','stress'],        approach:'balanced',    gender:'woman',
        bio:'Integrates CBT and mindfulness for anxiety, depression, and identity work.',
        availability:'Tue & Thu · Afternoons', wait:'~1 week' },
      { id:'marcus_johnson',name:'Marcus Johnson',    title:'Licensed Clinical Social Worker',  initials:'MJ', color:'#60a5fa',
        specializations:['trauma','relationship','academic','stress','depression'],     approach:'talk',        gender:'man',
        bio:'Specializes in trauma-informed care and relationship challenges.',
        availability:'Mon & Wed · Mornings',   wait:'~2 weeks' },
      { id:'maya_rodriguez',name:'Maya Rodriguez',    title:'Licensed Professional Counselor',  initials:'MR', color:'#34d399',
        specializations:['anxiety','sleep','stress','lgbtq','identity'],               approach:'mindfulness', gender:'woman',
        bio:'Mindfulness-based approach for anxiety, LGBTQ+ concerns, and life transitions.',
        availability:'Wed & Fri · Flexible',   wait:'~1 week' },
      { id:'alex_kim',      name:'Alex Kim',          title:'Licensed Marriage & Family Therapist', initials:'AK', color:'#fbbf24',
        specializations:['relationship','academic','identity','grief','lgbtq'],        approach:'structured',  gender:'nonbinary',
        bio:'Works with LGBTQ+ students on relationships, academic stress, and identity.',
        availability:'Tue & Thu · Evenings',   wait:'~3 weeks' },
      { id:'emeka_okafor',  name:'Dr. Emeka Okafor',  title:'Licensed Psychologist · PsyD',     initials:'EO', color:'#f87171',
        specializations:['depression','trauma','financial','identity','grief'],        approach:'talk',        gender:'man',
        bio:'Deep expertise in depression, trauma, and cross-cultural identity issues.',
        availability:'Mon & Fri · Afternoons', wait:'~2 weeks' },
      { id:'priya_sharma',  name:'Priya Sharma',      title:'Licensed Counselor · MA',           initials:'PS', color:'#e879f9',
        specializations:['anxiety','academic','financial','stress','sleep'],           approach:'structured',  gender:'woman',
        bio:'CBT-focused counselor for academic pressure, anxiety, and life stress.',
        availability:'Mon–Wed · Mornings',     wait:'~1 week' },
    ];

    const CONCERN_MAP = {
      'Anxiety & worry':       'anxiety',
      'Low mood / depression': 'depression',
      'Stress & overwhelm':    'stress',
      'Loneliness':            'identity',
      'Grief or loss':         'grief',
      'Relationship issues':   'relationship',
      'Trauma':                'trauma',
      'Identity & belonging':  'identity',
      'Academic pressure':     'academic',
      'Sleep problems':        'sleep',
      'LGBTQ+ concerns':       'lgbtq',
      'Financial stress':      'financial',
    };

    const APPROACH_MAP = {
      'CBT (practical tools & homework)': 'structured',
      'Talk therapy (open conversation)': 'talk',
      'Mindfulness-based':               'mindfulness',
      'Structured + goal-focused':       'structured',
      'Not sure — open to anything':     null,
    };

    function matchTherapists(intakeData) {
      const { concerns, genderPref, approachPref } = intakeData;
      const concernKeys = (concerns || '').split(' · ').map(c => CONCERN_MAP[c.trim()]).filter(Boolean);
      const approachKey = APPROACH_MAP[approachPref] || null;
      const genderRaw = (genderPref || '').toLowerCase();
      const genderKey = genderRaw === 'no preference' ? null
        : genderRaw.includes('non-binary') ? 'nonbinary'
        : genderRaw.includes('woman') ? 'woman'
        : genderRaw.includes('man') ? 'man'
        : null;
      return THERAPISTS.map(t => {
        let score = 0;
        score += concernKeys.filter(k => t.specializations.includes(k)).length * 3;
        if (genderKey && t.gender === genderKey) score += 3;
        if (approachKey && t.approach === approachKey) score += 2;
        if (t.approach === 'balanced') score += 1;
        return { ...t, score };
      }).sort((a, b) => b.score - a.score).slice(0, 3);
    }

    function TherapistMatchWidget({ matches, SF }) {
      return (
        <div style={{ marginLeft:36, maxWidth:'92%', display:'flex', flexDirection:'column', gap:10, animation:'msgIn 0.28s ease-out' }}>
          {matches.map((t, i) => (
            <div key={t.id} style={{ background:'rgba(255,255,255,0.97)', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 14px rgba(20,20,19,0.09)', border:'1px solid rgba(20,20,19,0.06)', display:'flex' }}>
              <div style={{ width:3, background:t.color, flexShrink:0 }} />
              <div style={{ flex:1, padding:'12px 13px' }}>
                {/* Header row */}
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:7 }}>
                  <div style={{ width:38, height:38, borderRadius:19, background:`${t.color}1a`, border:`2px solid ${t.color}40`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontSize:13, fontWeight:800, color:t.color, fontFamily:SF }}>{t.initials}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                      <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF, letterSpacing:'-0.2px' }}>{t.name}</p>
                      {i === 0 && (
                        <div style={{ background:'rgba(155,110,243,0.13)', borderRadius:99, padding:'2px 7px', border:'1px solid rgba(155,110,243,0.26)' }}>
                          <span style={{ fontSize:9, fontWeight:800, color:'#7b4fd4', fontFamily:SF, letterSpacing:'0.3px' }}>BEST MATCH</span>
                        </div>
                      )}
                    </div>
                    <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.42)', fontFamily:SF, lineHeight:1.3 }}>{t.title}</p>
                  </div>
                </div>
                {/* Bio */}
                <p style={{ margin:'0 0 8px', fontSize:11, color:'rgba(20,20,19,0.54)', fontFamily:SF, lineHeight:1.45 }}>{t.bio}</p>
                {/* Specialization chips */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:4, marginBottom:9 }}>
                  {t.specializations.slice(0,4).map(s => (
                    <div key={s} style={{ background:`${t.color}14`, border:`1px solid ${t.color}2e`, borderRadius:99, padding:'2px 8px' }}>
                      <span style={{ fontSize:9.5, fontWeight:700, color:t.color, fontFamily:SF, textTransform:'capitalize' }}>{s}</span>
                    </div>
                  ))}
                </div>
                {/* Footer */}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                  <div>
                    <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.36)', fontFamily:SF, lineHeight:1.5 }}>{t.availability}</p>
                    <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.36)', fontFamily:SF, lineHeight:1.5 }}>Wait: {t.wait}</p>
                  </div>
                  <div style={{ background:`linear-gradient(135deg,${t.color},${t.color}cc)`, borderRadius:99, padding:'6px 14px', cursor:'pointer', boxShadow:`0 2px 8px ${t.color}40`, flexShrink:0 }}>
                    <span style={{ fontSize:11, fontWeight:700, color:'white', fontFamily:SF }}>Request Session</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    function TypeChatPage({ onBack, userName, initialTopic, bookingMode }) {
      const SF = 'Sofia Sans,sans-serif';
      const R = UIUC_RESOURCES;
      const [input, setInput] = useState('');
      const [messages, setMessages] = useState(
        bookingMode
          ? [{ from:'ai', text:`Hi ${userName} 💙 I'll help you find the right therapist. Let's start with what's been on your mind — pick everything that applies.` }]
          : [{ from:'ai', text:`Hey ${userName} 💙 No pressure, no judgment — I'm just here to listen. What's going on for you today?` }]
      );
      const [typing, setTyping] = useState(false);
      const [chips, setChips] = useState(
        bookingMode
          ? []
          : ["I've been anxious","I'm overwhelmed","I can't sleep","Something happened","I feel alone","I just need to vent"]
      );
      const [turn, setTurn] = useState(0);
      const [lastIntent, setLastIntent] = useState(null);
      const [widgetAnswers, setWidgetAnswers] = useState({});
      const intakeDataRef = useRef({});
      const widgetCount = useRef(0);
      const messagesRef = useRef(null);
      const didAutoSend = useRef(false);
      const pendingIntakeField = useRef(bookingMode ? 'concerns' : null);

      const AI_AVATAR = (
        <div style={{ width:26, height:26, borderRadius:13, background:'linear-gradient(145deg,#c4a8f8,#9b72e8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginBottom:2, boxShadow:'0 2px 8px rgba(140,100,220,0.32)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" fill="rgba(255,255,255,0.9)" stroke="none"/>
          </svg>
        </div>
      );

      /* Phase 1 — listen, empathise, ask a follow-up (no resources yet) */
      const LISTEN = {
        crisis:      { text: "I'm really glad you said something — that took courage 💙 Can you tell me a little more about where you're at right now? Even just a few words.", chips: ["I'm having really dark thoughts","I'm not in immediate danger","I just needed to tell someone","I honestly don't know how to explain it"] },
        anxiety:     { text: "Anxiety is relentless like that — it basically turns up the volume on everything 😮‍💨 How long has this been showing up for you?", widget:{ type:'duration' }, chips: ["It's been building for a while","Something specific happened","It just hit me out of nowhere","Honestly, I don't know"] },
        overwhelmed: { text: "Ugh, that \"everything at once\" feeling is so real 😩 You're not falling apart — you're just carrying a lot. What's taking up the most headspace right now?", widget:{ type:'tags', label:"What's weighing on you most?", options:["Exams & deadlines","Coursework load","Friendship issues","Romantic stress","Family pressure","Finances","Everything at once","Can't even pinpoint it"] }, chips: ["School and deadlines","Literally everything at once","My social life is a mess","I just can't sleep"] },
        lonely:      { text: "Feeling lonely in a place full of people is honestly one of the hardest things 💙 How does it show up for you?", widget:{ type:'tags', label:"How does it show up?", options:["Missing real connection","No one truly gets me","Drifted from friends","New here, know no one","Left out of things","Surrounded by people but alone","Just numb inside"] }, chips: ["I miss feeling close to people","No one really gets me","I've drifted from my friends","I just moved here and know no one"] },
        sleep:       { text: "Sleep deprivation makes literally everything harder — your brain, your mood, your whole outlook 😴 What's been getting in the way?", widget:{ type:'tags', label:"What gets in the way?", options:["Mind racing at night","Anxiety before bed","Doom-scrolling too late","Irregular schedule","Waking up in the night","Nightmares","Just can't wind down"] }, chips: ["My mind won't shut off","I'm stressed about too many things","My sleep schedule is just broken","I feel anxious before bed"] },
        academic:    { text: "Academic pressure has this way of piling up fast and getting heavy 📚 Are you feeling behind, or is it more about dreading something specific ahead?", widget:{ type:'tags', label:"What's the pressure about?", options:["Behind on coursework","Scared of failing","A specific exam","A difficult professor","Can't focus at all","Lost motivation","Imposter syndrome","Juggling too much"] }, chips: ["I'm so far behind","I'm scared of failing","I can't focus at all","I just don't care about anything anymore"] },
        resources:   { text: "Of course — happy to share what UIUC has 💙 Before I do, can I ask what's going on? Even just a word or two helps me point you to the right place.", widget:{ type:'tags', label:"What's going on?", options:["Anxiety","Feeling overwhelmed","Loneliness","Sleep issues","Academic stress","A crisis","Not sure"] }, chips: ["I'm feeling anxious","I'm overwhelmed","I might need to talk to someone","It's a crisis"] },
        caps:        { text: "CAPS is really worth knowing about 💜 Before I share the details — what kind of support are you hoping to find?", widget:{ type:'tags', label:"What are you hoping for?", options:["Someone to talk to","Ongoing therapy","A one-time check-in","Medication support","Not sure yet","Something urgent"] }, chips: ["I want to book an appointment","I'm not sure if I need therapy","I want to talk to someone first","It feels urgent"] },
        better:      { text: "That genuinely makes me happy to hear 💜 What shifted for you — even just a little?", chips: ["I talked to someone","Things just got a bit lighter","I needed to vent and it helped","I'm not sure, but thanks"] },
        default:     { text: "I hear you — thank you for trusting me with that 💙 How intense does this get for you on a day-to-day basis?", widget:{ type:'scale' }, chips: ["It affects my sleep","It's hard to focus on anything","I isolate myself","I just feel really numb"] },
      };

      /* Phase 2 — dig deeper, one specific follow-up before resources */
      const DEEPEN = {
        crisis:      { text: "I hear you — and I'm not going anywhere 💙 You don't need perfect words. Right now in this moment — are you somewhere safe?", chips: ["Yes, I'm safe right now","I'm home but struggling","I'm not sure how I feel","I need help right now"] },
        anxiety:     { text: "I'm curious 🤔 — when it hits, does it tend to live more in your head (thoughts spiraling, imagining worst-case), or does it get physical too, like tightness in your chest or that restless can't-sit-still feeling?", widget:{ type:'tags', label:'Where does it show up?', options:["Racing, looping thoughts","Tight chest or shallow breath","Restless — can't sit still","Hard to focus on anything","Sudden dread for no reason","All of the above, honestly"] }, chips: ["Mostly in my head — thoughts spiral","Physical — chest, stomach, restless","Both at the same time","It's hard to put into words"] },
        overwhelmed: { text: "Makes sense 😔 When everything piles up — do you tend to shut down and go quiet, or does it come out more as anxious restlessness, where you can't stop thinking but also can't start anything?", chips: ["I shut down and go numb","I get anxious and can't settle","Both, depending on the day","I honestly don't know anymore"] },
        lonely:      { text: "I hear you 💙 Is there someone specific you wish you felt closer to, or is it more of a general ache — like something important is just... missing?", chips: ["There is someone specific","More of a general feeling","I've kind of stopped trying","I'm not sure what I even need"] },
        sleep:       { text: "When you're lying there and can't sleep — what tends to take over? 😔 A specific worry going in circles, or more like your brain just refuses to switch off?", chips: ["A specific worry I can't shake","Replaying things from the day","Nothing specific — mind just races","More physical — body just can't relax"] },
        academic:    { text: "That weight is real 📚 When you imagine things not going well — what's the part that scares you most?", chips: ["Failing a class or exam","Disappointing my family","Losing a scholarship or opportunity","I just can't see a way forward"] },
        resources:   { text: "Of course 💙 Before I share — is there something specific going on, or are you more just exploring what's out there?", chips: ["Something specific is going on","I just want to know my options","It's for a friend actually","I think I might need therapy"] },
        caps:        { text: "That's a good step to be thinking about 💜 What's drawing you toward CAPS — has something been happening, or is it more of a 'just in case' feeling?", chips: ["Something has been going on","I've been struggling for a while","More of a 'just in case'","I'd rather start with Let's Talk"] },
        better:      { text: "That genuinely makes me happy to hear 💜 Do you feel like you have enough support around you to keep feeling that way — or is it still a bit fragile?", chips: ["I think I do have support","It feels a bit fragile","Not sure — it could shift","I just needed to get it out"] },
        default:     { text: "I want to make sure I really understand 💙 When you're in the middle of it — does it feel more like a heavy weight (numb, sad, withdrawn), or more like anxious restlessness you can't shake?", widget:{ type:'tags', label:'How does it tend to feel?', options:["Heavy, numb, withdrawn","Anxious and restless","Sad, like something is missing","Angry or frustrated","Empty — like nothing matters","It shifts all the time"] }, chips: ["Heavy and numb","Anxious and on edge","Sad and withdrawn","It shifts constantly"] },
      };

      /* Phase 3 — gentle resource suggestion, woven naturally */
      const SUPPORT = {
        crisis:      { text: "Thank you for telling me that 💙 Right now, this very second, there are real people ready to talk — no wait, no judgment, completely confidential. Please reach out — you deserve that support.", resources:[R.crisis, R.text741, R.caps], chips:["How do I call 988?","Tell me about CAPS","I'm not sure I'm ready yet"] },
        anxiety:     { text: "What you're describing is real — and exhausting 😮‍💨 You deserve actual support, not just tips. CAPS is free and confidential, Let's Talk is a no-appointment drop-in if you want to ease in, and there's also a quick breathing technique that can help right now.", resources:[R.caps, R.letsTalk, R.breathing], chips:["How do I book CAPS?","What is Let's Talk exactly?","Try the breathing exercise with me"] },
        overwhelmed: { text: "That's a lot to be carrying alone 😔 CAPS has counselors who specialize in exactly what you're describing — and Let's Talk is a walk-in option if you just need to talk to a real person soon. You don't have to keep white-knuckling it.", resources:[R.caps, R.letsTalk, R.odos], chips:["What is Let's Talk?","I need an academic extension","How do I reach CAPS?"] },
        lonely:      { text: "Connection is a real need, not a luxury 💙 UIUC's Resilience program pairs you with a peer coach who's genuinely been through similar things — and it's free. Sometimes talking to someone who truly *gets it* makes all the difference.", resources:[R.resilience, R.caps, R.letsTalk], chips:["Tell me more about Resilience","I'd rather talk to a counselor","Where do I start?"] },
        sleep:       { text: "Sleep and mental health are so deeply connected 😴 McKinley can help with the physical side, and CAPS can work with you on what's underneath — whether it's anxiety, stress, or something else. You don't have to figure it out alone.", resources:[R.mckinley, R.caps, R.breathing], chips:["How do I reach McKinley?","I think it's anxiety","Show me the breathing exercise"] },
        academic:    { text: "That weight is valid — and you don't have to push through it alone 📚 The Dean of Students can help with extensions and accommodations, and CAPS is there for the emotional side of academic stress too.", resources:[R.odos, R.caps, R.letsTalk], chips:["I need an accommodation","I want to talk to someone","What is CAPS?"] },
        resources:   { text: "Here are the main options at UIUC 💙 All free, all confidential — no insurance needed, and you can reach out any time.", resources:[R.caps, R.letsTalk, R.mckinley, R.resilience], chips:["I need crisis support now","Tell me about Let's Talk","How do I book CAPS?"] },
        caps:        { text: "CAPS is free for all UIUC students — no insurance needed 💜 You can call to schedule or just show up for a same-day consult. Let's Talk is even easier: no appointment, just walk in for a free 15-minute chat.", resources:[R.caps, R.letsTalk], chips:["Where is the Let's Talk drop-in?","I need crisis support","Thanks, I feel better"] },
        better:      { text: "I'm really glad to hear that 💜 Checking in with yourself like this matters more than people realise. Come back any time — even just to talk.", resources:[], chips:["Show me UIUC resources","One more thing…","Take care, bye!"] },
        default:     { text: "I hear you 💙 You've been holding a lot. There are people at UIUC trained for exactly this — free, confidential, no insurance needed. You don't have to figure it out alone.", resources:[R.caps, R.letsTalk], chips:["Show me all UIUC resources","I'd like to talk to someone","I just needed to vent, thanks"] },
      };

      const detectIntent = (text) => {
        const t = text.toLowerCase();
        if (/crisis|suicid|hurt.{0,6}self|end (my|it all)|can't (go on|take it)|emergency|dark thought/.test(t)) return 'crisis';
        if (/anx(ious|iety)|panic|nervous|worried|fear|dread/.test(t)) return 'anxiety';
        if (/overwhelm|burnout|burnt.?out|too much|can't cope|breaking down|white.?knuckl/.test(t)) return 'overwhelmed';
        if (/lone(ly|liness)|alone|isolated|no.{0,5}friend|disconnect|no one gets/.test(t)) return 'lonely';
        if (/sleep|insomnia|can't sleep|up all night|racing mind/.test(t)) return 'sleep';
        if (/academi|grade|exam|fail|study|class|professor|assignment|deadline|extension/.test(t)) return 'academic';
        if (/resource|what.{0,10}(help|option|available)|uiuc|counseling|therapist|professional/.test(t)) return 'resources';
        if (/caps|counseling center|let.?s talk|mckinley/.test(t)) return 'caps';
        if (/\b(better|good|great|thank|helped?|feel better|lighter)\b/.test(t)) return 'better';
        return 'default';
      };

      const answerWidget = (id, text) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: text }));
        sendMessage(text);
      };

      /* Called when user clicks Book on a resource card mid-chat */
      const intakeStarted = useRef(bookingMode);
      const startIntakeFromBook = () => {
        if (intakeStarted.current) return;
        intakeStarted.current = true;
        pendingIntakeField.current = 'concerns';
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages(m => [...m,
            { from:'ai', text:`Let me help you find the right therapist, ${userName} 💙 First — what's been on your mind? Pick everything that applies.` },
            { type:'widget', id:`w${widgetCount.current++}`, _wt:'tags', label:"What's been on your mind?",
              options:['Anxiety & worry','Low mood / depression','Stress & overwhelm','Loneliness','Grief or loss','Relationship issues','Trauma','Identity & belonging','Academic pressure','Sleep problems','LGBTQ+ concerns','Financial stress'] },
          ]);
          setChips([]);
        }, 700);
      };

      /* Drives step-by-step intake flow */
      const advanceIntake = (field, value) => {
        intakeDataRef.current = { ...intakeDataRef.current, [field]: value };
        const updated = intakeDataRef.current;
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          if (field === 'concerns') {
            pendingIntakeField.current = 'duration';
            setMessages(m => [...m,
              { from:'ai', text:'Thanks for sharing that 💙 How long have you been dealing with this?' },
              { type:'widget', id:`w${widgetCount.current++}`, _wt:'duration' },
            ]);
            setChips([]);
          } else if (field === 'duration') {
            pendingIntakeField.current = 'severity';
            setMessages(m => [...m,
              { from:'ai', text:'I hear you. On a typical day, how intense does it feel?' },
              { type:'widget', id:`w${widgetCount.current++}`, _wt:'scale', label:'Day-to-day intensity' },
            ]);
            setChips([]);
          } else if (field === 'severity') {
            pendingIntakeField.current = 'therapyHistory';
            setMessages(m => [...m,
              { from:'ai', text:'Have you worked with a therapist before?' },
            ]);
            setChips(["Yes, currently seeing one","Yes, in the past","No — this would be my first time","Not sure"]);
          } else if (field === 'therapyHistory') {
            pendingIntakeField.current = 'goals';
            const prompt = /yes/i.test(value)
              ? "Good to know 💜 What are you hoping to work on in therapy this time?"
              : "That's completely fine — everyone starts somewhere 💙 What are you hoping therapy will help with?";
            setMessages(m => [...m,
              { from:'ai', text: prompt },
              { type:'widget', id:`w${widgetCount.current++}`, _wt:'tags', label:'Your goals',
                options:['Manage anxiety or stress','Work through depression','Build better relationships','Understand myself better','Process a difficult experience','Improve sleep','Build confidence','General emotional support'] },
            ]);
            setChips([]);
          } else if (field === 'goals') {
            pendingIntakeField.current = 'genderPref';
            setMessages(m => [...m,
              { from:'ai', text:"Do you have a preference for your therapist's gender? There's no wrong answer — just what feels most comfortable." },
            ]);
            setChips(["No preference","Woman therapist","Man therapist","Non-binary therapist"]);
          } else if (field === 'genderPref') {
            pendingIntakeField.current = 'approachPref';
            setMessages(m => [...m,
              { from:'ai', text:"One last question — what therapy style feels most like you? If you're not sure, that's completely fine." },
            ]);
            setChips(['CBT (practical tools & homework)','Talk therapy (open conversation)','Mindfulness-based','Structured + goal-focused','Not sure — open to anything']);
          } else if (field === 'approachPref') {
            const matches = matchTherapists(updated);
            setMessages(m => [...m,
              { from:'ai', text:`Based on everything you've shared, here are your top matches, ${userName} 💙 All are licensed and available to UIUC students.` },
              { type:'widget', id:`w${widgetCount.current++}`, _wt:'match', matches },
            ]);
            setChips(['How do I book an appointment?','Can I see all therapists?','Tell me about CAPS instead']);
          }
        }, 1100);
      };

      const sendMessage = (textOverride) => {
        const text = (textOverride || input).trim();
        if (!text) return;

        /* Intercept intake step responses */
        if (intakeStarted.current && pendingIntakeField.current) {
          const field = pendingIntakeField.current;
          pendingIntakeField.current = null;
          setMessages(m => [...m, { from:'user', text }]);
          setInput('');
          setChips([]);
          advanceIntake(field, text);
          return;
        }

        const newTurn = turn + 1;
        setTurn(newTurn);
        setMessages(m => [...m, { from:'user', text }]);
        setInput('');
        setTyping(true);
        const intent = detectIntent(text);
        const isCrisis = intent === 'crisis';
        const wantsResources = /resource|caps|counseling|help.{0,10}now|urgent|let.?s talk/.test(text.toLowerCase());
        const useSupport = isCrisis || wantsResources || newTurn >= 3;
        const useDeepen  = !useSupport && newTurn === 2;
        const threadIntent = (useDeepen || useSupport) ? (lastIntent || intent) : intent;
        setLastIntent(intent);
        const resp = useSupport ? (SUPPORT[threadIntent] || SUPPORT.default)
                   : useDeepen  ? (DEEPEN[threadIntent]  || DEEPEN.default)
                   : (LISTEN[intent] || LISTEN.default);
        const delay = text.length < 20 ? 900 : 1500;
        setTimeout(() => {
          setTyping(false);
          const widgetMsg = (!useSupport && resp.widget)
            ? [{ type:'widget', id:`w${widgetCount.current++}`, _wt: resp.widget.type, options: resp.widget.options, label: resp.widget.label }]
            : [];
          setMessages(m => [
            ...m,
            { from:'ai', text: resp.text },
            ...widgetMsg,
            ...(resp.resources || []).map(res => ({ type:'resource', res })),
          ]);
          setChips(resp.chips);
        }, delay);
      };

      useEffect(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, [messages, typing]);

      useEffect(() => {
        if (bookingMode) {
          /* Append the initial concerns TagWidget right after first AI message */
          setMessages(m => [...m,
            { type:'widget', id:`w${widgetCount.current++}`, _wt:'tags', label:"What's been on your mind?",
              options:['Anxiety & worry','Low mood / depression','Stress & overwhelm','Loneliness','Grief or loss','Relationship issues','Trauma','Identity & belonging','Academic pressure','Sleep problems','LGBTQ+ concerns','Financial stress'] },
          ]);
        } else if (initialTopic && !didAutoSend.current) {
          didAutoSend.current = true;
          const t = setTimeout(() => sendMessage(initialTopic), 700);
          return () => clearTimeout(t);
        }
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      return (
        <div
          style={{ position:'absolute', inset:0, zIndex:400, display:'flex', flexDirection:'column', overflow:'hidden' }}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          <GrainientBg c1='#EDE5FF' c2='#C0AFF5' c3='#F2EEFF' speed={0.28} sat={0.38} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 55%, rgba(240,235,255,0.5) 100%)', pointerEvents:'none', zIndex:1 }} />

          {/* Top bar */}
          <div style={{ position:'relative', zIndex:5, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'52px 20px 12px' }}>
            <div onClick={onBack} style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', width:36, height:36, borderRadius:18, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 2px 8px rgba(20,20,19,0.05)' }}>
              <span style={{ color:'#141413', fontSize:20, lineHeight:1, marginTop:-1 }}>‹</span>
            </div>
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
              <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', padding:'7px 20px', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 2px 8px rgba(20,20,19,0.05)' }}>
                <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:SF }}>
                  {bookingMode ? 'Find a Therapist' : 'AI Chat'}
                </span>
              </div>
              <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:6, height:6, borderRadius:3, background:'#22c55e', boxShadow:'0 0 6px rgba(34,197,94,0.8)' }} />
                <span style={{ fontSize:11, fontWeight:600, color:'rgba(20,20,19,0.45)', fontFamily:SF }}>
                  {bookingMode ? 'Confidential · UIUC Licensed Therapists' : 'Online · UIUC resources ready'}
                </span>
              </div>
            </div>
            <div style={{ width:36 }} />
          </div>

          {/* Messages */}
          <div ref={messagesRef} style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', padding:'2px 18px 0', display:'flex', flexDirection:'column', gap:4 }}>

            {/* Disclaimer */}
            <div style={{ alignSelf:'center', background:'rgba(255,255,255,0.60)', border:'1px solid rgba(20,20,19,0.06)', borderRadius:99, padding:'5px 14px', margin:'6px 0 10px' }}>
              <span style={{ fontSize:10.5, color:'rgba(20,20,19,0.40)', fontFamily:SF, fontWeight:500, letterSpacing:'0.1px' }}>🔒 What you share stays between us · here to listen, not judge</span>
            </div>

            {messages.map((msg, i) => {
              const prevFrom = i > 0 ? messages[i-1].from : null;
              const nextMsg = messages[i+1];
              const isLastInGroup = !nextMsg || nextMsg.from !== msg.from || nextMsg.type === 'resource';
              const isFirstInGroup = prevFrom !== msg.from;
              const gap = (msg.type === 'resource' || (prevFrom && messages[i-1]?.type === 'resource')) ? 3 : (isFirstInGroup ? 10 : 3);
              return (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: msg.from==='user' ? 'flex-end' : 'flex-start', marginTop: gap, animation:'msgIn 0.28s ease-out both' }}>
                  {msg.from === 'ai' && (
                    <div style={{ display:'flex', alignItems:'flex-end', gap:7 }}>
                      {isLastInGroup ? AI_AVATAR : <div style={{ width:26, flexShrink:0 }} />}
                      <div style={{ maxWidth:'76%', background:'rgba(255,255,255,0.94)', border:'1px solid rgba(20,20,19,0.055)', borderRadius: isFirstInGroup ? '18px 18px 18px 4px' : '4px 18px 18px 4px', padding:'10px 14px', boxShadow:'0 1px 8px rgba(20,20,19,0.055)' }}>
                        <p style={{ margin:0, fontSize:14, lineHeight:1.52, color:'#141413', fontFamily:SF, fontWeight:500 }}>{msg.text}</p>
                      </div>
                    </div>
                  )}
                  {msg.from === 'user' && (
                    <div style={{ maxWidth:'76%', background:'linear-gradient(145deg,#9d72f5,#7a4fd3)', borderRadius: isFirstInGroup ? '18px 18px 4px 18px' : '18px 4px 4px 18px', padding:'10px 14px', boxShadow:'0 2px 10px rgba(110,65,210,0.28)' }}>
                      <p style={{ margin:0, fontSize:14, lineHeight:1.52, color:'white', fontFamily:SF, fontWeight:500 }}>{msg.text}</p>
                    </div>
                  )}
                  {msg.type === 'resource' && <ResourceCard res={msg.res} SF={SF} onBook={BOOKABLE_KEYS.has(msg.res?._key) ? startIntakeFromBook : null} />}
                  {msg.type === 'widget' && (
                    msg._wt === 'match'    ? <TherapistMatchWidget matches={msg.matches} SF={SF} /> :
                    msg._wt === 'tags'     ? <TagWidget  options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                    msg._wt === 'scale'    ? <ScaleWidget label={msg.label}   answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                                             <DurationWidget                  answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} />
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display:'flex', alignItems:'flex-end', gap:7, marginTop:10 }}>
                {AI_AVATAR}
                <div style={{ background:'rgba(255,255,255,0.94)', border:'1px solid rgba(20,20,19,0.055)', borderRadius:'18px 18px 18px 4px', padding:'11px 16px', boxShadow:'0 1px 8px rgba(20,20,19,0.055)', display:'flex', gap:4, alignItems:'center' }}>
                  {[0, 0.2, 0.4].map(d => (
                    <div key={d} style={{ width:5, height:5, borderRadius:'50%', background:'rgba(110,80,200,0.5)', animation:`typingDot 1s ease-in-out ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div style={{ height:8, flexShrink:0 }} />
          </div>

          {/* Chips + input frosted panel */}
          <div style={{ position:'relative', zIndex:3, flexShrink:0, background:'rgba(245,242,255,0.82)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', borderTop:'1px solid rgba(255,255,255,0.6)' }}>
            {/* Chips row */}
            {chips.length > 0 && (
              <div style={{ padding:'10px 16px 0', display:'flex', gap:6, overflowX:'auto' }}>
                {chips.map(s => (
                  <div key={s} onClick={() => sendMessage(s)} style={{ background:'rgba(255,255,255,0.90)', border:'1px solid rgba(150,110,240,0.18)', borderRadius:99, padding:'6px 13px', cursor:'pointer', flexShrink:0, boxShadow:'0 1px 4px rgba(20,20,19,0.04)' }}>
                    <span style={{ color:'rgba(80,50,160,0.82)', fontSize:12, fontFamily:SF, fontWeight:600, whiteSpace:'nowrap' }}>{s}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Input row */}
            <div style={{ padding: chips.length > 0 ? '8px 14px 28px' : '12px 14px 28px', display:'flex', alignItems:'flex-end', gap:9 }}>
              <div style={{ flex:1, background:'rgba(255,255,255,0.95)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:20, padding:'9px 15px', boxShadow:'0 1px 6px rgba(20,20,19,0.05)' }}>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Share what's on your mind…"
                  rows={1}
                  style={{ display:'block', width:'100%', border:'none', outline:'none', background:'transparent', fontFamily:SF, fontSize:13.5, color:'#141413', resize:'none', lineHeight:1.45, maxHeight:88, overflowY:'auto' }}
                />
              </div>
              <div
                onClick={() => sendMessage()}
                style={{ width:42, height:42, borderRadius:21, background: input.trim() ? 'linear-gradient(145deg,#9d72f5,#7a4fd3)' : 'rgba(20,20,19,0.09)', display:'flex', alignItems:'center', justifyContent:'center', cursor: input.trim() ? 'pointer' : 'default', flexShrink:0, transition:'all 0.18s', boxShadow: input.trim() ? '0 3px 12px rgba(110,65,210,0.38)' : 'none' }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={input.trim() ? 'white' : 'rgba(20,20,19,0.28)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes typingDot {
              0%,60%,100%{transform:translateY(0);opacity:0.4}
              30%{transform:translateY(-3px);opacity:1}
            }
            @keyframes msgIn {
              from{opacity:0;transform:translateY(6px)}
              to{opacity:1;transform:translateY(0)}
            }
          `}</style>
        </div>
      );
    }
