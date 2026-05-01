    const { useEffect, useRef, useState } = React;
    /* ── TYPE CHAT PAGE ── */
    const UIUC_RESOURCES = {
      /* ── CRISIS (level 1) ── */
      crisis:       { level:1, icon:'🆘', title:'988 Crisis Line',          sub:'Immediate support · 24/7',             tagline:"Real people, any time. You don't need to be 'in danger' — struggling is enough.",                                                                    tags:['24/7','Free','Anonymous'],                     detail:'Call or text — always available',                              phone:'988',              color:'#dc2626' },
      text741:      { level:1, icon:'📱', title:'Crisis Text Line',          sub:'Text HOME to 741741',                  tagline:'Prefer typing? Text a trained crisis counselor — free, confidential, any time.',                                                                    tags:['24/7','Free','Text-based'],                    detail:'24/7 · free · confidential',                                   phone:'741741',           color:'#2563eb' },
      rosecrance:   { level:1, icon:'🌙', title:'After-Hours Crisis',        sub:'Rosecrance Line · 24/7',               tagline:'For mental health emergencies when the Counseling Center is closed — connects to a local clinician, not a call center.',                            tags:['24/7','Local clinician','After-hours'],         detail:'When the Counseling Center is closed',                         phone:'(815) 720-4953',   color:'#dc2626' },
      trevorLine:   { level:1, icon:'🏳️‍🌈', title:'Trevor Lifeline',       sub:'LGBTQ+ crisis support · 24/7',         tagline:'Trained counselors for LGBTQ+ young people in crisis — call, or text START to 678-678.',                                                            tags:['24/7','LGBTQ+','Free'],                        detail:'Call or text START to 678-678',                                phone:'(866) 488-7386',   color:'#7c3aed' },
      transLifeline:{ level:1, icon:'⚧️',  title:'Trans Lifeline',           sub:'Trans-led peer support',               tagline:'Run by and for trans people — peer crisis support any time, no judgment.',                                                                          tags:['24/7','Trans-led','Free'],                     detail:'Peer support hotline',                                         phone:'(877) 565-8860',   color:'#8b5cf6' },
      races:        { level:1, icon:'💜', title:'RACES Hotline',             sub:'Sexual assault & stalking',            tagline:'24/7 confidential support for survivors of sexual assault, dating violence, and stalking.',                                                          tags:['24/7','Free','Confidential'],                  detail:'Sexual assault & stalking crisis line',                        phone:'(217) 384-4444',   color:'#be185d' },
      reach:        { level:2, icon:'🚔', title:'REACH Crisis Response',     sub:'Campus police · non-emergency',        tagline:"UIUC's campus crisis response team — for mental health crises that need in-person support, without a full police response.",                        tags:['On-campus','Non-emergency','Crisis response'],  detail:'Non-emergency campus crisis line',                             phone:'(217) 333-1216',   color:'#374151' },
      /* ── COUNSELING (level 2-3) ── */
      caps:         { level:2, icon:'🏛️', title:'CAPS Counseling',          sub:'Free counseling for UIUC students',    tagline:'Individual therapy, group counseling & urgent same-day appointments. Walk-ins OK for urgent needs during business hours.',                           tags:['Free','Confidential','Walk-ins OK'],            detail:'Rm 206 Turner Student Services · M/T/F 8–5 · W/Th 8–7',      phone:'(217) 333-3704',   color:'#3b82f6' },
      letsTalk:     { level:2, icon:'💬', title:"Let's Talk",               sub:'Free 15-min counselor consult',        tagline:'A free, informal 15-minute consultation with a counselor embedded in your college — schedule online, no paperwork, not recorded.',                  tags:['Free','15 min','No commitment'],                detail:'Schedule online · counselors in each college',                 phone:'(217) 333-3704',   color:'#7c3aed' },
      embeddedCounseling:{ level:3, icon:'🎓', title:'Embedded Counselors', sub:'Counselor within your college or dorm',tagline:'Licensed counselors placed inside specific colleges and residence halls — email them directly to schedule, easier than calling.',                    tags:['Free','College-based','Easy access'],           detail:'Email your college\'s embedded counselor',                     phone:'(217) 333-3704',   color:'#6366f1' },
      groupCounseling:{ level:3, icon:'👥', title:'Group Counseling (CAPS)',  sub:'Therapy groups on campus',            tagline:'Structured therapy groups for anxiety, social skills, grief, identity, relationships, and more — often more powerful than individual therapy.',       tags:['Free','Therapist-led','Ongoing support'],       detail:'Rm 206 Turner Student Services · referral required',           phone:'(217) 333-3704',   color:'#0ea5e9' },
      mckinley:     { level:3, icon:'🏥', title:'McKinley Mental Health',    sub:'Psychiatry, meds & brief therapy',    tagline:'Psychiatric evaluation, medication management, and short-term therapy from a full clinical team including psychiatrists and psychologists.',            tags:['Free','Psychiatry','On-campus'],                detail:'1109 S. Lincoln Ave · M–F 8am–5pm',                           phone:'(217) 333-2700',   color:'#059669' },
      griefSupport: { level:3, icon:'🕊️', title:'Grief & Loss Support',    sub:'CAPS specialized counseling',          tagline:'CAPS offers individual sessions and support groups specifically designed for loss of any kind — no timeline, no pressure.',                              tags:['Free','Grief-focused','Groups available'],      detail:'Rm 206 Turner Student Services · by appointment',              phone:'(217) 333-3704',   color:'#6b7280' },
      /* ── PEER & SELF-HELP (level 3-4) ── */
      resilience:   { level:3, icon:'🤝', title:'Resilience @ UIUC',        sub:'Peer wellness coaching',               tagline:'Student peer coaches who have been through similar experiences — free, casual, student-led sessions.',                                                tags:['Free','Peer-led','Student coaches'],            detail:'Free student-led sessions · book online',                      phone:'(217) 333-3704',   color:'#d97706' },
      talkCampus:   { level:4, icon:'📲', title:'TalkCampus',               sub:'24/7 peer support app',                tagline:'Connect anonymously with students around the world who understand what you\'re going through — free app, available any time.',                      tags:['Free','Anonymous','24/7 app'],                  detail:'iOS & Android · counselingcenter.illinois.edu',                phone:null,               color:'#0891b2' },
      welltrack:    { level:4, icon:'📊', title:'WellTrack Boost',           sub:'Self-guided mental health app',        tagline:'Free CBT-based app for UIUC students: mood tracking, self-help modules, progress monitoring. Available on web and mobile.',                         tags:['Free','Self-paced','CBT-based'],                detail:'Free for all UIUC students · counselingcenter.illinois.edu',   phone:null,               color:'#16a34a' },
      breathing:    { level:4, icon:'🌬️', title:'Breathing Exercise',       sub:'4-7-8 technique · 2 min',             tagline:"Inhale 4s, hold 7s, exhale 8s. Activates your body's calm response — try it right now.",                                                          tags:['Do it now','2 minutes','Science-backed'],       detail:'Inhale 4s · Hold 7s · Exhale 8s',                             phone:null,               color:'#0891b2' },
      workshops:    { level:4, icon:'🛠️', title:'CAPS Skill Workshops',    sub:'Test anxiety, perfectionism & more',   tagline:'Free mini-courses: test anxiety, perfectionism, time management, social skills, body image. Drop in any time — no ongoing commitment.',               tags:['Free','Drop-in','Skill-building'],              detail:'counselingcenter.illinois.edu · no appointment needed',        phone:'(217) 333-3704',   color:'#7c3aed' },
      /* ── ACADEMIC / ADVOCACY (level 3) ── */
      odos:         { level:3, icon:'📋', title:'Dean of Students',          sub:'Academic extensions & advocacy',       tagline:'Incomplete grades, extensions, and academic accommodations when stress, health, or life events hit your coursework.',                                 tags:['Extensions','Accommodations','Advocacy'],       detail:'Turner Student Services Bldg',                                 phone:'(217) 333-0050',   color:'#be185d' },
      financialWellness:{ level:4, icon:'💰', title:'Financial Wellness',   sub:'Money stress & emergency aid',         tagline:'Financial stress is one of the most common reasons students struggle. Free counseling plus access to emergency funds and aid you might not know about.',tags:['Free','Emergency funds','Aid navigation'],     detail:'Turner Student Services Bldg',                                 phone:'(217) 333-0050',   color:'#16a34a' },
      /* ── IDENTITY / COMMUNITY (level 3) ── */
      safeZone:     { level:3, icon:'🌈', title:'SafeZone @ UIUC',          sub:'LGBTQ+ support & community',           tagline:'Affirming counseling referrals, support groups, and community resources for LGBTQ+ students — recognized LGBTQ+ affirming healthcare.',              tags:['LGBTQ+ affirming','Free','Confidential'],       detail:'Illini Union Rm 284 · 519 E. Green St',                        phone:'(217) 333-3704',   color:'#8b5cf6' },
      communityAdvocacy:{ level:3, icon:'✊', title:'Multicultural Affairs', sub:'Identity, belonging & advocacy',       tagline:'Support for students navigating racial, cultural, and first-gen identities — community, advocacy, and a place to belong.',                           tags:['Free','Identity-affirming','Community'],        detail:'1040 Illinois Union',                                          phone:'(217) 333-1095',   color:'#f59e0b' },
      intlStudent:  { level:3, icon:'🌍', title:'International Student Support',sub:'Cultural adjustment & counseling', tagline:'Navigating a new country, language, and system is hard. ISSS offers guidance for academic, cultural, and emotional challenges.',                     tags:['Free','International','Cultural support'],      detail:'Turner Student Services Bldg',                                 phone:'(217) 333-1303',   color:'#0ea5e9' },
    };

    /* Inject _key into each resource for canBook checks */
    Object.keys(UIUC_RESOURCES).forEach(k => { UIUC_RESOURCES[k]._key = k; });
    const BOOKABLE_KEYS = new Set(['caps','letsTalk','mckinley','resilience']);

    function ResourceCard({ res, SF, onBook }) {
      const BADGE = { 1:['URGENT','#dc2626','rgba(254,226,226,0.95)'], 2:['START HERE','#7c3aed','rgba(237,233,254,0.95)'], 3:['RECOMMENDED','#059669','rgba(209,250,229,0.95)'], 4:['HELPFUL','#0891b2','rgba(224,242,254,0.95)'] };
      const [bLabel, bText, bBg] = BADGE[res.level] || BADGE[3];
      const canBook = onBook && res._key && BOOKABLE_KEYS.has(res._key);
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.96)', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 14px rgba(20,20,19,0.09)', border:'1px solid rgba(20,20,19,0.06)', display:'flex' }}>
          <div style={{ width:3, background:res.color, flexShrink:0 }} />
          <div style={{ flex:1, padding:'11px 13px' }}>
            {/* Header: icon + title + priority badge */}
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
            {/* Tagline */}
            {res.tagline && (
              <p style={{ margin:'7px 0 7px', fontSize:11.5, color:'rgba(20,20,19,0.56)', fontFamily:SF, lineHeight:1.45 }}>{res.tagline}</p>
            )}
            {/* Attribute chips */}
            {res.tags && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:8 }}>
                {res.tags.map(t => (
                  <div key={t} style={{ background:`${res.color}14`, border:`1px solid ${res.color}30`, borderRadius:99, padding:'3px 9px' }}>
                    <span style={{ fontSize:10.5, fontWeight:700, color:res.color, fontFamily:SF }}>{t}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Footer: location + book + call buttons */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
              <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.1px', lineHeight:1.4, flex:1 }}>{res.detail}</p>
              <div style={{ display:'flex', gap:6, flexShrink:0 }}>
                {canBook && (
                  <div onClick={onBook} style={{ display:'flex', alignItems:'center', gap:4, background:`${res.color}15`, borderRadius:99, padding:'5px 10px', cursor:'pointer', border:`1px solid ${res.color}30` }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={res.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span style={{ fontSize:10.5, fontWeight:700, color:res.color, fontFamily:SF, whiteSpace:'nowrap' }}>Book</span>
                  </div>
                )}
                {res.phone && (
                  <div style={{ display:'flex', alignItems:'center', gap:4, background:res.color, borderRadius:99, padding:'5px 11px', cursor:'pointer', boxShadow:`0 2px 8px ${res.color}44` }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                    <span style={{ fontSize:11, fontWeight:700, color:'white', fontFamily:SF, whiteSpace:'nowrap' }}>{res.phone}</span>
                  </div>
                )}
              </div>
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

    function ScaleWidget({ label, onAnswer, answered, SF, width }) {
      const [sel, setSel] = useState(null);
      const [hov, setHov] = useState(null);
      const opts = [
        {v:1, e:'😌', l:'Mild',         color:'#4ade80', bg:'rgba(74,222,128,0.10)'},
        {v:2, e:'😕', l:'Noticeable',   color:'#a3e635', bg:'rgba(163,230,53,0.10)'},
        {v:3, e:'😟', l:'Moderate',     color:'#facc15', bg:'rgba(250,204,21,0.10)'},
        {v:4, e:'😣', l:'Intense',      color:'#fb923c', bg:'rgba(251,146,60,0.10)'},
        {v:5, e:'😰', l:'Overwhelming', color:'#f87171', bg:'rgba(248,113,113,0.10)'},
      ];
      if (answered) {
        const f = opts.find(o => o.l === answered);
        return (
          <div style={{ marginLeft:36, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'5px 13px', border:'1px solid rgba(130,90,220,0.18)', animation:'msgIn 0.25s ease-out' }}>
            <span style={{ fontSize:12, color:'rgba(110,65,200,0.9)', fontFamily:SF, fontWeight:700 }}>✓ {f?.e} {answered}</span>
          </div>
        );
      }
      const containerWidth = width || 'min(92%, 360px)';
      return (
        <div style={{ marginLeft:36, width:containerWidth, background:'rgba(255,255,255,0.97)', borderRadius:16, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 2px 12px rgba(20,20,19,0.07)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'11px 13px 13px' }}>
            <p style={{ margin:'0 0 10px', fontSize:10, fontWeight:700, color:'rgba(20,20,19,0.35)', fontFamily:SF, letterSpacing:'0.6px', textTransform:'uppercase' }}>{label || 'How intense does it feel?'}</p>
            <div style={{ display:'flex', gap:6 }}>
              {opts.map(o => {
                const isActive = sel === o.v;
                const isHov = hov === o.v && !sel;
                return (
                  <div key={o.v}
                    onClick={() => { setSel(o.v); setTimeout(() => onAnswer(o.l), 220); }}
                    onMouseEnter={() => setHov(o.v)}
                    onMouseLeave={() => setHov(null)}
                    style={{
                      flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5,
                      padding:'9px 3px 8px',
                      borderRadius:12,
                      border:`1.5px solid ${isActive ? o.color : isHov ? o.color+'88' : 'rgba(20,20,19,0.07)'}`,
                      background: isActive ? o.bg : isHov ? o.bg+'80' : 'rgba(20,20,19,0.015)',
                      cursor:'pointer',
                      transition:'all 0.18s ease',
                      transform: isActive ? 'scale(1.06)' : isHov ? 'scale(1.03)' : 'scale(1)',
                      boxShadow: isActive ? `0 2px 8px ${o.color}44` : 'none',
                    }}>
                    <span style={{ fontSize:24, lineHeight:1, filter: isActive ? 'none' : isHov ? 'none' : 'grayscale(20%)' }}>{o.e}</span>
                    <span style={{ fontSize:8.5, fontWeight:700, color: isActive ? o.color.replace(')',',0.9)').replace('rgb','rgba') : 'rgba(20,20,19,0.38)', fontFamily:SF, textAlign:'center', lineHeight:1.2, letterSpacing:'0.2px' }}>{o.l}</span>
                  </div>
                );
              })}
            </div>
            {/* intensity bar */}
            <div style={{ marginTop:8, height:3, borderRadius:99, background:'linear-gradient(to right, #4ade80, #a3e635, #facc15, #fb923c, #f87171)', opacity: sel ? 1 : 0.25, transition:'opacity 0.3s' }} />
          </div>
        </div>
      );
    }

    /* ══════════════════════════════════════════
       INTAKE ASSESSMENT — therapist matching flow
       ══════════════════════════════════════════ */

    const THERAPISTS = [
      { id:'sarah_chen',   name:'Dr. Sarah Chen',    title:'Licensed Psychologist · PhD',       initials:'SC', color:'#a78bfa', specializations:['anxiety','depression','identity','academic','stress'],       approach:'balanced',    gender:'woman',    cultural:['Asian American'],                        bio:'Integrates CBT and mindfulness with genuine warmth. Known for making you feel heard from session one.',        availability:'Tue & Thu · Afternoons',       wait:'~1 week' },
      { id:'marcus_j',     name:'Marcus Johnson',     title:'Licensed Clinical Social Worker',   initials:'MJ', color:'#34d399', specializations:['stress','grief','relationship','identity','financial'],       approach:'exploratory', gender:'man',      cultural:['Black/African American','First-gen'],    bio:'Creates space to untangle complex feelings without rushing. Open, exploratory, judgment-free.',                availability:'Mon & Wed · Morning & Evening', wait:'~2 weeks' },
      { id:'maya_rod',     name:'Maya Rodriguez',     title:'Licensed Professional Counselor',   initials:'MR', color:'#fb923c', specializations:['anxiety','sleep','academic','relationship','stress'],         approach:'structured',  gender:'woman',    cultural:['Latina/Hispanic'],                       bio:'Practical and goal-oriented. Gives you real tools and strategies you can use between sessions.',               availability:'Mon & Fri · Mornings',          wait:'~1 week' },
      { id:'alex_kim',     name:'Alex Kim',            title:'Licensed Clinical Psychologist',    initials:'AK', color:'#60a5fa', specializations:['identity','anxiety','depression','lgbtq'],                   approach:'balanced',    gender:'nonbinary',cultural:['Asian American','LGBTQ+ affirming'],    bio:'Specializes in identity and LGBTQ+ concerns. Creates a deeply affirming, non-judgmental space.',              availability:'Tue & Thu · All day',           wait:'~2 weeks' },
      { id:'emeka_ok',     name:'Dr. Emeka Okafor',   title:'Psychiatrist & Therapist',          initials:'EO', color:'#e879f9', specializations:['depression','anxiety','sleep','academic','stress'],           approach:'structured',  gender:'man',      cultural:['African/Nigerian American'],             bio:'Dual-trained in psychiatry and therapy. Can address medication needs alongside talk therapy in one place.',   availability:'Wed & Fri · All day',           wait:'~3 weeks' },
      { id:'priya_sh',     name:'Priya Sharma',        title:'Licensed Counseling Psychologist',  initials:'PS', color:'#fb7185', specializations:['stress','grief','identity','relationship','depression'],      approach:'balanced',    gender:'woman',    cultural:['South Asian','International student exp.'],bio:'Specializes in life transitions and cultural identity. Warm, relational approach with practical tools.',       availability:'Mon, Wed & Fri · Afternoons',   wait:'~1 week' },
    ];

    const CONCERN_MAP = {
      'Anxiety & worry':'anxiety', 'Low mood / depression':'depression', 'Stress & overwhelm':'stress',
      'Loneliness':'identity', 'Grief or loss':'grief', 'Relationship issues':'relationship',
      'Trauma':'anxiety', 'Identity & belonging':'identity', 'Academic pressure':'academic',
      'Sleep problems':'sleep', 'LGBTQ+ concerns':'lgbtq', 'Financial stress':'financial',
    };

    const APPROACH_MAP = {
      'Structured & practical (CBT / tools)':'structured',
      'Open & exploratory (just talk)':'exploratory',
      'A mix of both':'balanced',
    };

    function matchTherapists(intakeData) {
      const { concerns, genderPref, approachPref } = intakeData;
      const concernKeys = (concerns || '').split(' · ').map(c => CONCERN_MAP[c.trim()]).filter(Boolean);
      const approachKey = APPROACH_MAP[approachPref];
      return THERAPISTS.map(t => {
        let score = 0;
        score += concernKeys.filter(k => t.specializations.includes(k)).length * 3;
        if (!genderPref || genderPref === 'No preference') score += 1;
        else if ((genderPref === 'Woman' && t.gender === 'woman') || (genderPref === 'Man' && t.gender === 'man') || (genderPref === 'Non-binary' && t.gender === 'nonbinary')) score += 3;
        if (approachKey) { if (t.approach === approachKey) score += 2; else if (t.approach === 'balanced') score += 1; } else score += 1;
        return { ...t, score };
      }).sort((a, b) => b.score - a.score).slice(0, 3);
    }

    function TherapistMatchWidget({ matches, SF }) {
      const [requested, setRequested] = useState(null);
      const APPROACH_LABEL = { structured:'Structured & tools', exploratory:'Open & exploratory', balanced:'Mixed approach' };
      const APPROACH_COLOR = { structured:'#3b82f6', exploratory:'#7c3aed', balanced:'#059669' };
      return (
        <div style={{ marginLeft:36, maxWidth:'92%', display:'flex', flexDirection:'column', gap:10, animation:'msgIn 0.28s ease-out' }}>
          {matches.map((t, idx) => (
            <div key={t.id} style={{ borderRadius:16, border:`1.5px solid ${requested===t.id ? '#9b6ef3' : 'rgba(20,20,19,0.08)'}`, overflow:'hidden', boxShadow:'0 2px 12px rgba(20,20,19,0.07)', background: requested===t.id ? 'rgba(155,110,243,0.03)' : 'white', transition:'all 0.2s' }}>
              {/* Avatar + name + badge */}
              <div style={{ padding:'12px 14px 8px', display:'flex', alignItems:'center', gap:11 }}>
                <div style={{ width:44, height:44, borderRadius:22, background:t.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 2px 10px ${t.color}55` }}>
                  <span style={{ fontSize:15, fontWeight:800, color:'white', fontFamily:SF }}>{t.initials}</span>
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6, flexWrap:'wrap' }}>
                    <p style={{ margin:0, fontSize:13.5, fontWeight:800, color:'#141413', fontFamily:SF }}>{t.name}</p>
                    {idx === 0 && (
                      <div style={{ background:'linear-gradient(135deg,#9b6ef3,#7c5cfc)', borderRadius:99, padding:'2px 8px', flexShrink:0 }}>
                        <span style={{ fontSize:9, fontWeight:800, color:'white', fontFamily:SF, letterSpacing:'0.3px' }}>BEST MATCH</span>
                      </div>
                    )}
                  </div>
                  <p style={{ margin:'2px 0 0', fontSize:10.5, color:'rgba(20,20,19,0.42)', fontFamily:SF }}>{t.title}</p>
                </div>
              </div>
              {/* Bio */}
              <div style={{ padding:'0 14px 9px' }}>
                <p style={{ margin:0, fontSize:11.5, color:'rgba(20,20,19,0.60)', fontFamily:SF, lineHeight:1.45 }}>{t.bio}</p>
              </div>
              {/* Specialty + approach tags */}
              <div style={{ padding:'0 14px 10px', display:'flex', flexWrap:'wrap', gap:5 }}>
                {t.specializations.slice(0, 3).map(spec => (
                  <div key={spec} style={{ background:'rgba(124,92,252,0.08)', borderRadius:99, padding:'3px 9px', border:'1px solid rgba(124,92,252,0.16)' }}>
                    <span style={{ fontSize:10, fontWeight:700, color:'#7c5cfc', fontFamily:SF, textTransform:'capitalize' }}>{spec}</span>
                  </div>
                ))}
                <div style={{ background:`${APPROACH_COLOR[t.approach]}14`, borderRadius:99, padding:'3px 9px', border:`1px solid ${APPROACH_COLOR[t.approach]}28` }}>
                  <span style={{ fontSize:10, fontWeight:700, color:APPROACH_COLOR[t.approach], fontFamily:SF }}>{APPROACH_LABEL[t.approach]}</span>
                </div>
              </div>
              {/* Footer: availability + CTA */}
              <div style={{ padding:'9px 14px 12px', borderTop:'1px solid rgba(20,20,19,0.05)', display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
                <div>
                  <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.44)', fontFamily:SF }}><span style={{ color:'#22c55e', fontWeight:700 }}>●</span> {t.availability}</p>
                  <p style={{ margin:'2px 0 0', fontSize:10, color:'rgba(20,20,19,0.34)', fontFamily:SF }}>Estimated wait: {t.wait}</p>
                </div>
                <div onClick={() => setRequested(t.id)} style={{ background: requested===t.id ? 'linear-gradient(135deg,#4ade80,#22c55e)' : 'linear-gradient(135deg,#9b6ef3,#7c5cfc)', borderRadius:11, padding:'9px 15px', cursor:'pointer', boxShadow:`0 3px 10px ${requested===t.id ? 'rgba(74,222,128,0.35)' : 'rgba(124,92,252,0.32)'}`, flexShrink:0, transition:'all 0.25s' }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'white', fontFamily:SF, whiteSpace:'nowrap' }}>
                    {requested===t.id ? '✓ Requested' : 'Request Session'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    function TypeChatPage({ onBack, userName, initialTopic, moodContext, bookingMode, preService }) {
      const SF = 'Sofia Sans,sans-serif';
      const R = UIUC_RESOURCES;
      const [input, setInput] = useState('');

      /* ── Mood-aware opening helpers ── */
      const getMoodOpening = (ctx) => {
        if (!ctx) return `Hey ${userName} 💙 No pressure, no judgment — I'm just here to listen. What's going on for you today?`;
        const { emotion, contexts = [], note } = ctx;
        const ctxStr = contexts.length ? ` — especially around ${contexts.slice(0,2).join(' & ')}` : '';
        const noteStr = note ? ` You wrote: "${note}".` : '';
        if (emotion === 'Anxious') return `Hey ${userName} 💙 I saw you just logged feeling anxious${ctxStr}.${noteStr} That's exhausting to carry. I'm here — take your time, what's been going on?`;
        if (emotion === 'Angry')   return `Hey ${userName} 💙 I saw you're feeling angry${ctxStr}.${noteStr} That's completely valid. Want to talk about what's been getting to you?`;
        if (emotion === 'Sad')     return `Hey ${userName} 💜 I can see things feel pretty heavy right now${ctxStr}.${noteStr} You don't have to explain everything. I'm just here — what's been weighing on you?`;
        if (emotion === 'Exhausted') return `Hey ${userName} 💜 You logged feeling exhausted${ctxStr}.${noteStr} Running on empty is real. What's been draining you most?`;
        if (emotion === 'Boring')  return `Hey ${userName} 😊 Sounds like a "meh" kind of day${ctxStr}.${noteStr} Sometimes those are the hardest to name. What's underneath it?`;
        if (['Good','Happy','Grateful'].includes(emotion)) return `Hey ${userName} ✨ You're feeling ${emotion.toLowerCase()} today${ctxStr}!${noteStr} Love that — what's been going well? Reflecting on good things helps them stick.`;
        return `Hey ${userName} 💙 Thanks for checking in. I'm here to listen — what's on your mind?`;
      };
      const getMoodChips = (ctx) => {
        if (!ctx) return ["I've been anxious","I'm overwhelmed","I can't sleep","Something happened","I feel alone","I just need to vent"];
        const { emotion } = ctx;
        if (emotion === 'Anxious')   return ["It's been building for a while","Something specific triggered it","I just can't switch off","I don't know where it's coming from"];
        if (emotion === 'Sad')       return ["A lot is weighing on me","I've been low for a while","I just needed to say it out loud","I'm not sure what I need"];
        if (emotion === 'Angry')     return ["Something really got to me","It's been piling up","I'm frustrated with myself","I just needed to vent"];
        if (emotion === 'Exhausted') return ["I've been running on empty","I can't keep up with everything","I just have no energy left","I need a break but can't take one"];
        if (emotion === 'Boring')    return ["Just feeling flat today","Nothing feels meaningful right now","I'm restless but can't focus","Not sure what I need"];
        if (['Good','Happy','Grateful'].includes(emotion)) return ["Things have been going well","I wanted to share something","I'm feeling hopeful","Just checking in 💜"];
        return ["I've been anxious","I'm overwhelmed","Something happened","I just need to vent"];
      };

      /* ── Intake / therapist-matching state ── */
      const [intakeData, setIntakeData] = useState({ concerns:null, duration:null, severity:null, therapyHistory:null, pastHelpful:null, goals:null, genderPref:null, approachPref:null });
      const pendingIntakeField = useRef(null);
      const SCALE_EMOJI = { Mild:'😌', Noticeable:'😕', Moderate:'😟', Intense:'😣', Overwhelming:'😰' };

      const getIntakeOpening = () => {
        if (preService) return `Hi ${userName} 💜 Before we connect you with the right therapist, I'd love to learn a little about what you're going through. It only takes about 2 minutes — the more you share, the better your match. What's been weighing on you lately?`;
        return `Hi ${userName} 💜 I'm here to help you find the right therapist for what you're going through. This takes about 2 minutes — the more you share, the better your match. Let's start: what's been weighing on you lately?`;
      };

      const getIntakeInitialMessages = () => [
        { from:'ai', text: getIntakeOpening() },
        { type:'widget', _wt:'intake-tags', id:'intake-concerns', intakeField:'concerns',
          label:"What are you looking for support with? (pick any that apply)",
          options:['Anxiety & worry','Low mood / depression','Stress & overwhelm','Loneliness','Grief or loss','Relationship issues','Trauma','Identity & belonging','Academic pressure','Sleep problems','LGBTQ+ concerns','Financial stress','Not sure yet'] },
      ];

      const [messages, setMessages] = useState(
        bookingMode ? getIntakeInitialMessages() : [{ from:'ai', text: getMoodOpening(moodContext) }]
      );
      const [typing, setTyping] = useState(false);
      const [chips, setChips] = useState(bookingMode ? [] : getMoodChips(moodContext));
      const [turn, setTurn] = useState(0);
      const [lastIntent, setLastIntent] = useState(null);
      const [widgetAnswers, setWidgetAnswers] = useState({});
      const widgetCount = useRef(0);
      const messagesRef = useRef(null);
      const didAutoSend = useRef(false);

      const advanceIntake = (field, value) => {
        setWidgetAnswers(prev => ({ ...prev, [`intake-${field}`]: value }));
        const updated = { ...intakeData, [field]: value };
        setIntakeData(updated);
        pendingIntakeField.current = null;

        if (field === 'concerns') {
          const displayVal = value.split(' · ').join(', ');
          setMessages(m => [...m,
            { from:'user', text: displayVal },
            { from:'ai', text:`Thank you for sharing that 💜 How long has this been affecting your daily life?` },
            { type:'widget', _wt:'intake-duration', id:'intake-duration' },
          ]);
          setChips([]);
        } else if (field === 'duration') {
          setMessages(m => [...m,
            { from:'user', text: value },
            { from:'ai', text:`I hear you. On a typical day, how intense does it feel?` },
            { type:'widget', _wt:'intake-severity', id:'intake-severity' },
          ]);
          setChips([]);
        } else if (field === 'severity') {
          setMessages(m => [...m,
            { from:'user', text:`${SCALE_EMOJI[value] || ''} ${value}` },
            { from:'ai', text:`Got it. Have you worked with a therapist or counselor before?` },
          ]);
          setChips(["Yes, I have","No, this would be my first time","Briefly, once or twice"]);
          pendingIntakeField.current = 'therapyHistory';
        } else if (field === 'therapyHistory') {
          const hadTherapy = value !== "No, this would be my first time";
          if (hadTherapy) {
            setMessages(m => [...m,
              { from:'user', text: value },
              { from:'ai', text:`That's helpful to know. What felt most useful in those sessions?` },
              { type:'widget', _wt:'intake-tags', id:'intake-pastHelpful', intakeField:'pastHelpful',
                label:'What helped most?',
                options:["Just being heard","Practical coping tools","Understanding my patterns","Processing specific events","Homework & exercises","Nothing really clicked"] },
            ]);
          } else {
            setMessages(m => [...m,
              { from:'user', text: value },
              { from:'ai', text:`That's totally fine — everyone starts somewhere 💙 What are you hoping to get from therapy?` },
              { type:'widget', _wt:'intake-tags', id:'intake-goals', intakeField:'goals',
                label:"What are you hoping for?",
                options:["Learn practical coping tools","Process feelings in depth","Work on specific goals","Understand myself better","Improve my relationships","Just consistent support","Not sure yet"] },
            ]);
          }
          setChips([]);
        } else if (field === 'pastHelpful') {
          setMessages(m => [...m,
            { from:'user', text: value.split(' · ').join(', ') },
            { from:'ai', text:`That's really helpful. What are you hoping to get from therapy this time?` },
            { type:'widget', _wt:'intake-tags', id:'intake-goals', intakeField:'goals',
              label:"What are you hoping for?",
              options:["Learn practical coping tools","Process feelings in depth","Work on specific goals","Understand myself better","Improve my relationships","Just consistent support","Not sure yet"] },
          ]);
          setChips([]);
        } else if (field === 'goals') {
          setMessages(m => [...m,
            { from:'user', text: value.split(' · ').join(', ') },
            { from:'ai', text:`Almost there — just a couple of quick preferences. Do you have a gender preference for your therapist?` },
          ]);
          setChips(["No preference","Woman","Man","Non-binary"]);
          pendingIntakeField.current = 'genderPref';
        } else if (field === 'genderPref') {
          setMessages(m => [...m,
            { from:'user', text: value },
            { from:'ai', text:`And what kind of therapy style feels right for you?` },
          ]);
          setChips(["Structured & practical (CBT / tools)","Open & exploratory (just talk)","A mix of both","Not sure"]);
          pendingIntakeField.current = 'approachPref';
        } else if (field === 'approachPref') {
          const matches = matchTherapists({ ...updated });
          setMessages(m => [...m,
            { from:'user', text: value },
            { from:'ai', text:`Based on everything you've shared, here are your top matches 💜 Each has been selected for how well they fit what you're looking for.` },
            { type:'widget', _wt:'intake-match', id:'intake-match', matches },
          ]);
          setChips(["Tell me more about one of them","I have more questions","Thanks, I'll reach out directly"]);
        }
      };

      const AI_AVATAR = (
        <div style={{ width:26, height:26, borderRadius:13, background:'linear-gradient(145deg,#c4a8f8,#9b72e8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginBottom:2, boxShadow:'0 2px 8px rgba(140,100,220,0.32)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" fill="rgba(255,255,255,0.9)" stroke="none"/>
          </svg>
        </div>
      );

      /* Phase 1 — listen, empathise, ask a follow-up (no resources yet) */
      const LISTEN = {
        crisis:      { text: `I'm really glad you said something, ${userName} — that took courage 💙 Can you tell me a little more about where you're at right now? Even just a few words.`, chips: ["I'm having really dark thoughts","I'm not in immediate danger","I just needed to tell someone","I honestly don't know how to explain it"] },
        anxiety:     { text: `Anxiety is relentless like that — it basically turns up the volume on everything 😮‍💨 How long has this been showing up for you, ${userName}?`, widget:{ type:'duration' }, chips: ["It's been building for a while","Something specific happened","It just hit me out of nowhere","Honestly, I don't know"] },
        overwhelmed: { text: `Ugh, that "everything at once" feeling is so real 😩 You're not falling apart, ${userName} — you're just carrying a lot. What's taking up the most headspace right now?`, widget:{ type:'tags', label:"What's weighing on you most?", options:["Exams & deadlines","Coursework load","Friendship issues","Romantic stress","Family pressure","Finances","Identity & belonging","Everything at once","Can't even pinpoint it"] }, chips: ["School and deadlines","Literally everything at once","My social life is a mess","I just can't sleep"] },
        lonely:      { text: `Feeling lonely in a place full of people is honestly one of the hardest things 💙 How does it show up for you, ${userName}?`, widget:{ type:'tags', label:"How does it show up?", options:["Missing real connection","No one truly gets me","Drifted from friends","New here, know no one","Left out of things","Surrounded by people but alone","Just numb inside","Cultural or identity disconnect"] }, chips: ["I miss feeling close to people","No one really gets me","I've drifted from my friends","I just moved here and know no one"] },
        sleep:       { text: `Sleep deprivation makes literally everything harder — your brain, your mood, your whole outlook 😴 What's been getting in the way, ${userName}?`, widget:{ type:'tags', label:"What gets in the way?", options:["Mind racing at night","Anxiety before bed","Doom-scrolling too late","Irregular schedule","Waking up in the night","Nightmares","Just can't wind down","Stress about finances or family"] }, chips: ["My mind won't shut off","I'm stressed about too many things","My sleep schedule is just broken","I feel anxious before bed"] },
        academic:    { text: `Academic pressure has this way of piling up fast and getting heavy 📚 Are you feeling behind, ${userName}, or is it more about dreading something specific ahead?`, widget:{ type:'tags', label:"What's the pressure about?", options:["Behind on coursework","Scared of failing","A specific exam","A difficult professor","Can't focus at all","Lost motivation","Imposter syndrome","Financial pressure too","Juggling too much"] }, chips: ["I'm so far behind","I'm scared of failing","I can't focus at all","I just don't care about anything anymore"] },
        grief:       { text: `I'm so sorry, ${userName} 🕊️ Loss is one of the hardest things to carry — and it shows up in so many different ways. How has it been hitting you lately?`, widget:{ type:'tags', label:"How has it been showing up?", options:["Waves of sadness","Hard to concentrate","Feeling numb or empty","Withdrawing from people","Guilt or regret","Physical exhaustion","Random moments of grief","Anger mixed in"] }, chips: ["It hits me at random moments","I feel numb most of the time","I've been withdrawing from people","I don't know how to process it"] },
        relationship:{ text: `Relationship stress hits differently — it's personal and it follows you everywhere 💙 What's been weighing on you most in this, ${userName}?`, widget:{ type:'tags', label:"What's at the core?", options:["Conflict with someone close","A breakup or distance","Trust was broken","I feel unseen or unheard","Loneliness in the relationship","Family tension","Friendship falling apart","Not sure how to repair it"] }, chips: ["There's been a lot of conflict","Someone hurt me","I feel really disconnected","I don't know how to fix it"] },
        financial:   { text: `Financial stress is incredibly real and incredibly draining — it touches everything 💙 What's been weighing on you most, ${userName}?`, widget:{ type:'tags', label:"What's the biggest pressure?", options:["Tuition & fees","Rent or housing","Food insecurity","Running out of aid","Can't focus on school","Shame or embarrassment","Supporting family too","Not sure what help exists"] }, chips: ["I'm running low on funds","I'm not sure what help is available","It's affecting my ability to focus","I'm stressed about next semester"] },
        identity:    { text: `Navigating identity and belonging — especially at a big university — can feel really isolating 💙 What's been on your mind, ${userName}?`, widget:{ type:'tags', label:"What's at the heart of it?", options:["Feeling like I don't belong","Cultural or racial identity","LGBTQ+ identity","First-gen college experience","Religious or values conflict","Pressure from family","Feeling unseen on campus","Imposter syndrome"] }, chips: ["I feel like I don't fit in here","My identity feels invisible","Family and campus feel worlds apart","I'm figuring out who I am"] },
        resources:   { text: `Of course — happy to share what UIUC has 💙 Before I do, ${userName}, can I ask what's going on? Even just a word or two helps me point you to the right place.`, widget:{ type:'tags', label:"What's going on?", options:["Anxiety or stress","Feeling overwhelmed","Loneliness","Sleep issues","Academic pressure","Financial stress","A crisis","Identity & belonging","Not sure"] }, chips: ["I'm feeling anxious","I'm overwhelmed","I might need to talk to someone","It's a crisis"] },
        caps:        { text: `CAPS is really worth knowing about 💜 Before I share the details — what kind of support are you hoping to find, ${userName}?`, widget:{ type:'tags', label:"What are you hoping for?", options:["Someone to talk to","Ongoing therapy","A one-time check-in","Medication support","Not sure yet","Something urgent"] }, chips: ["I want to book an appointment","I'm not sure if I need therapy","I want to talk to someone first","It feels urgent"] },
        better:      { text: `That genuinely makes me happy to hear 💜 What shifted for you, ${userName} — even just a little?`, chips: ["I talked to someone","Things just got a bit lighter","I needed to vent and it helped","I'm not sure, but thanks"] },
        default:     { text: `I hear you, ${userName} — thank you for trusting me with that 💙 How intense does this get for you on a day-to-day basis?`, widget:{ type:'scale' }, chips: ["It affects my sleep","It's hard to focus on anything","I isolate myself","I just feel really numb"] },
      };

      /* Phase 2 — dig deeper, one specific follow-up before resources */
      const DEEPEN = {
        crisis:      { text: `I hear you — and I'm not going anywhere 💙 You don't need perfect words, ${userName}. Right now in this moment — are you somewhere safe?`, chips: ["Yes, I'm safe right now","I'm home but struggling","I'm not sure how I feel","I need help right now"] },
        anxiety:     { text: `I'm curious 🤔 — when it hits, ${userName}, does it tend to live more in your head (thoughts spiraling, imagining worst-case), or does it get physical too, like tightness in your chest or that restless can't-sit-still feeling?`, widget:{ type:'tags', label:'Where does it show up?', options:["Racing, looping thoughts","Tight chest or shallow breath","Restless — can't sit still","Hard to focus on anything","Sudden dread for no reason","Trouble sleeping too","All of the above, honestly"] }, chips: ["Mostly in my head — thoughts spiral","Physical — chest, stomach, restless","Both at the same time","It's hard to put into words"] },
        overwhelmed: { text: `Makes sense 😔 When everything piles up — do you tend to shut down and go quiet, ${userName}, or does it come out more as anxious restlessness, where you can't stop thinking but also can't start anything?`, chips: ["I shut down and go numb","I get anxious and can't settle","Both, depending on the day","I honestly don't know anymore"] },
        lonely:      { text: `I hear you, ${userName} 💙 Is there someone specific you wish you felt closer to, or is it more of a general ache — like something important is just... missing?`, chips: ["There is someone specific","More of a general feeling","I've kind of stopped trying","I'm not sure what I even need"] },
        sleep:       { text: `When you're lying there and can't sleep, ${userName} — what tends to take over? 😔 A specific worry going in circles, or more like your brain just refuses to switch off?`, chips: ["A specific worry I can't shake","Replaying things from the day","Nothing specific — mind just races","More physical — body just can't relax"] },
        academic:    { text: `That weight is real 📚 When you imagine things not going well, ${userName} — what's the part that scares you most?`, chips: ["Failing a class or exam","Disappointing my family","Losing a scholarship or opportunity","I just can't see a way forward"] },
        grief:       { text: `Grief doesn't follow a schedule — it shows up when you least expect it 🕊️ Has it been feeling more heavy and numb lately, ${userName}, or more like sharp waves that catch you off guard?`, chips: ["More like a constant weight","It hits me in waves","Some days are fine, then it floods back","I've been trying not to feel it"] },
        relationship:{ text: `That kind of stress is so hard to carry 💙 When you think about this relationship, ${userName} — is there a part of you that still hopes things can shift, or does it feel more like you're trying to figure out how to let go?`, chips: ["I still hope things can change","I think I need to let go","I'm somewhere in the middle","I just need to process it"] },
        financial:   { text: `That's a heavy thing to be managing on top of everything else 💙 Has it been affecting your focus or your sleep, ${userName}, or is it more of a low-level background anxiety that doesn't fully go away?`, chips: ["It's affecting my focus a lot","More of a background stress","It wakes me up at night","All of the above, honestly"] },
        identity:    { text: `That kind of disconnect is really real 💙 Is it something that's been building for a while, ${userName}, or did something specific happen recently that brought it to the surface?`, chips: ["It's been building for a long time","Something specific happened recently","It comes and goes","I'm not sure when it started"] },
        resources:   { text: `Of course 💙 Before I share — is there something specific going on, ${userName}, or are you more just exploring what's out there?`, chips: ["Something specific is going on","I just want to know my options","It's for a friend actually","I think I might need therapy"] },
        caps:        { text: `That's a good step to be thinking about 💜 What's drawing you toward CAPS, ${userName} — has something been happening, or is it more of a 'just in case' feeling?`, chips: ["Something has been going on","I've been struggling for a while","More of a 'just in case'","I'd rather start with Let's Talk"] },
        better:      { text: `That genuinely makes me happy to hear 💜 Do you feel like you have enough support around you to keep feeling that way, ${userName} — or is it still a bit fragile?`, chips: ["I think I do have support","It feels a bit fragile","Not sure — it could shift","I just needed to get it out"] },
        default:     { text: `I want to make sure I really understand, ${userName} 💙 When you're in the middle of it — does it feel more like a heavy weight (numb, sad, withdrawn), or more like anxious restlessness you can't shake?`, widget:{ type:'tags', label:'How does it tend to feel?', options:["Heavy, numb, withdrawn","Anxious and restless","Sad, like something is missing","Angry or frustrated","Empty — like nothing matters","It shifts all the time"] }, chips: ["Heavy and numb","Anxious and on edge","Sad and withdrawn","It shifts constantly"] },
      };

      /* Phase 3 — gentle resource suggestion, personalized based on intensity */
      const buildSupport = (intensity) => {
        const isHigh = ['Intense','Overwhelming'].includes(intensity);
        return {
          crisis:      { text: `Thank you for telling me that, ${userName} 💙 Right now, this very second, there are real people ready to talk — no wait, no judgment, completely confidential. Please reach out — you deserve that support.`, resources:[R.crisis, R.text741, R.rosecrance, R.reach], chips:["How do I call 988?","Tell me about CAPS","I'm not sure I'm ready yet"] },
          anxiety:     { text: `What you're describing is real — and exhausting 😮‍💨 ${isHigh ? `At this level, ${userName}, you deserve real support — ` : `${userName}, `}CAPS offers free therapy and urgent same-day appointments. The breathing exercise can also help right now while you decide what feels right.`, resources: isHigh ? [R.caps, R.letsTalk, R.breathing, R.welltrack, R.workshops] : [R.caps, R.letsTalk, R.breathing, R.welltrack], chips:["How do I book CAPS?","What is Let's Talk?","Show me the breathing exercise"] },
          overwhelmed: { text: `That's a lot to be carrying alone, ${userName} 😔 ${isHigh ? `When it gets this heavy, real support makes a real difference — ` : ``}CAPS counselors specialize in exactly this. Let's Talk is a no-appointment option if you just need to talk to someone soon. And if any of this is hitting your coursework, the Dean of Students can help too.`, resources: isHigh ? [R.caps, R.letsTalk, R.embeddedCounseling, R.odos, R.welltrack] : [R.caps, R.letsTalk, R.odos, R.welltrack], chips:["What is Let's Talk?","I need an academic extension","How do I reach CAPS?"] },
          lonely:      { text: `Connection is a real need, not a luxury, ${userName} 💙 Resilience pairs you with a peer coach who's been through similar things — it's free and student-led. TalkCampus lets you connect anonymously any time. And CAPS group counseling can be powerful for exactly this feeling.`, resources:[R.resilience, R.talkCampus, R.groupCounseling, R.caps], chips:["Tell me more about Resilience","What is TalkCampus?","I'd rather talk to a counselor"] },
          sleep:       { text: `Sleep and mental health are so deeply connected, ${userName} 😴 McKinley's mental health clinic can help with the clinical side — psychiatry, medication if needed. CAPS can work with the anxiety or stress underneath. And the breathing exercise is worth trying tonight.`, resources:[R.mckinley, R.caps, R.breathing, R.welltrack], chips:["How do I reach McKinley?","I think it's anxiety underneath","Show me the breathing exercise"] },
          academic:    { text: `That weight is valid — and you don't have to push through it alone, ${userName} 📚 The Dean of Students can buy you time with extensions and accommodations. CAPS workshops on test anxiety and perfectionism are free and no-commitment. And if finances are part of the pressure, there's help for that too.`, resources:[R.odos, R.workshops, R.caps, R.financialWellness], chips:["I need an accommodation","Tell me about CAPS workshops","What is financial wellness counseling?"] },
          grief:       { text: `Grief deserves real support, ${userName} 🕊️ CAPS has counselors who specialize in loss — individual sessions and group support. There's no timeline for this. The WellTrack app also has self-paced modules specifically for grief and loss.`, resources:[R.griefSupport, R.groupCounseling, R.caps, R.welltrack], chips:["Tell me about grief support at CAPS","What is group counseling like?","Where do I start?"] },
          relationship:{ text: `Relationship pain is real and it deserves real support, ${userName} 💙 CAPS counselors are trained in exactly this — and sometimes talking it through with someone neutral helps you see things clearly. Group counseling is another powerful option for relationship patterns.`, resources:[R.caps, R.letsTalk, R.groupCounseling, R.resilience], chips:["How do I book CAPS?","What is Let's Talk?","Tell me about group counseling"] },
          financial:   { text: `Financial stress is one of the most common — and least talked about — reasons students struggle, ${userName} 💙 There are emergency funds and aid options you might not know exist. And the Dean of Students can help with academic flexibility while you stabilize.`, resources:[R.financialWellness, R.odos, R.caps, R.letsTalk], chips:["Tell me about emergency funds","I need an academic extension","I want to talk to someone about this"] },
          identity:    { text: `You belong here, ${userName} 💙 There are people at UIUC who understand exactly what it's like to navigate identity in this environment — Multicultural Affairs, SafeZone for LGBTQ+ students, and International Student Support. CAPS is also LGBTQ+ affirming.`, resources:[R.communityAdvocacy, R.safeZone, R.intlStudent, R.caps], chips:["Tell me about Multicultural Affairs","What is SafeZone?","I'd like to talk to a counselor"] },
          resources:   { text: `Here are the main options at UIUC, ${userName} 💙 All free, all confidential — no insurance, no paperwork required to get started.`, resources:[R.caps, R.letsTalk, R.mckinley, R.resilience, R.welltrack, R.talkCampus], chips:["I need crisis support now","Tell me about Let's Talk","How do I book CAPS?"] },
          caps:        { text: `CAPS is free for all UIUC students — no insurance needed, ${userName} 💜 You can call or schedule online. Let's Talk is even easier: schedule a free 15-minute consultation with a counselor embedded in your college. McKinley is another option if you need psychiatric support or medication.`, resources:[R.caps, R.letsTalk, R.embeddedCounseling, R.mckinley], chips:["What's the difference between CAPS and McKinley?","I need crisis support","Thanks, I feel better"] },
          better:      { text: `I'm really glad to hear that, ${userName} 💜 Checking in with yourself like this matters more than people realise. Come back any time — even just to talk. The WellTrack app is also great for keeping tabs on how you're doing day to day.`, resources:[R.welltrack, R.talkCampus], chips:["Show me UIUC resources","One more thing…","Take care, bye!"] },
          default:     { text: `I hear you, ${userName} 💙 You've been holding a lot. There are people at UIUC trained for exactly this — free, confidential, no insurance needed. You don't have to figure it out alone.`, resources: isHigh ? [R.caps, R.letsTalk, R.crisis, R.rosecrance, R.welltrack] : [R.caps, R.letsTalk, R.resilience, R.welltrack], chips:["Show me all UIUC resources","I'd like to talk to someone","I just needed to vent, thanks"] },
        };
      };

      const detectIntent = (text) => {
        const t = text.toLowerCase();
        if (/crisis|suicid|hurt.{0,6}self|end (my|it all)|can't (go on|take it)|emergency|dark thought|not (want|safe|okay)/.test(t)) return 'crisis';
        if (/anx(ious|iety)|panic|nervous|worried|fear|dread|can't (calm|breathe|switch off)/.test(t)) return 'anxiety';
        if (/overwhelm|burnout|burnt.?out|too much|can't cope|breaking down|white.?knuckl|everything at once/.test(t)) return 'overwhelmed';
        if (/lone(ly|liness)|alone|isolated|no.{0,5}friend|disconnect|no one gets|don't belong/.test(t)) return 'lonely';
        if (/sleep|insomnia|can't sleep|up all night|racing mind|tired all (the )?time/.test(t)) return 'sleep';
        if (/academi|grade|exam|fail|study|class|professor|assignment|deadline|extension|imposter/.test(t)) return 'academic';
        if (/grief|griev|lost (someone|my|a)|death|died|miss (him|her|them)|mourning/.test(t)) return 'grief';
        if (/relationship|partner|boyfriend|girlfriend|breakup|broke up|conflict|fight|toxic|trust/.test(t)) return 'relationship';
        if (/financ|money|rent|tuition|afford|broke|aid|scholarship|food|housing/.test(t)) return 'financial';
        if (/identity|belong|race|racial|lgbtq|queer|trans|first.?gen|cultural|religion|faith|family pressure/.test(t)) return 'identity';
        if (/resource|what.{0,10}(help|option|available)|uiuc|counseling|therapist|professional/.test(t)) return 'resources';
        if (/caps|counseling center|let.?s talk|mckinley/.test(t)) return 'caps';
        if (/\b(better|good|great|thank|helped?|feel better|lighter)\b/.test(t)) return 'better';
        return 'default';
      };

      const answerWidget = (id, text) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: text }));
        sendMessage(text);
      };

      const sendMessage = (textOverride) => {
        const text = (textOverride || input).trim();
        if (!text) return;

        /* Intercept chip responses for intake flow steps */
        if (intakeAlreadyStarted.current && pendingIntakeField.current) {
          const field = pendingIntakeField.current;
          pendingIntakeField.current = null;
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
        // Use recorded intensity to personalize resource phase
        const intensity = Object.values(widgetAnswers).find(v =>
          ['Mild','Noticeable','Moderate','Intense','Overwhelming'].includes(v)
        );
        const SUPPORT = buildSupport(intensity);
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
            ...(resp.resources || []).map(res => {
              const resKey = Object.entries(R).find(([,v]) => v === res)?.[0];
              return { type:'resource', res, resKey };
            }),
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
        if (initialTopic && !didAutoSend.current) {
          didAutoSend.current = true;
          const t = setTimeout(() => sendMessage(initialTopic), 700);
          return () => clearTimeout(t);
        }
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      /* Called directly when user clicks Book on a resource card mid-chat */
      const intakeAlreadyStarted = useRef(bookingMode);
      const startIntakeInline = () => {
        if (intakeAlreadyStarted.current) return;
        intakeAlreadyStarted.current = true;
        pendingIntakeField.current = 'concerns';
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages(m => [
            ...m,
            { from:'ai', text: getIntakeOpening() },
            { type:'widget', _wt:'intake-tags', id:'intake-concerns-' + Date.now(), intakeField:'concerns',
              label:"What are you looking for support with? (pick any that apply)",
              options:['Anxiety & worry','Low mood / depression','Stress & overwhelm','Loneliness','Grief or loss','Relationship issues','Trauma','Identity & belonging','Academic pressure','Sleep problems','LGBTQ+ concerns','Financial stress','Not sure yet'] },
          ]);
          setChips([]);
        }, 700);
      };

      const ID = 'Inter Display,sans-serif';
      return (
        <div
          style={{ position:'absolute', inset:0, zIndex:400, display:'flex', flexDirection:'column', overflow:'hidden', background:'white' }}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          {/* Header — solid white bg so orb disappears cleanly behind it when scrolled */}
          <div style={{ position:'relative', zIndex:15, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'52px 20px 12px', background:'white' }}>
            <div onClick={onBack} style={{ background:'white', borderRadius:99, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', padding:'9px 20px', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 0 0 0 rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:SF }}>{bookingMode ? 'Find a Therapist' : 'AI Chat'}</span>
            </div>
            <div style={{ background:'white', borderRadius:99, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              {/* 3-dot menu — inline SVG */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="4" r="1.4" fill="#141413"/>
                <circle cx="9" cy="9" r="1.4" fill="#141413"/>
                <circle cx="9" cy="14" r="1.4" fill="#141413"/>
              </svg>
            </div>
          </div>

          {/* Messages — orb is first child so it scrolls away naturally */}
          <div ref={messagesRef} style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4, paddingTop:0, paddingLeft:0, paddingRight:0, background:'white' }}>

            {/* Orb section — scrolls with content, disappears as conversation grows */}
            <div style={{ flexShrink:0, position:'relative', height:220, overflow:'hidden', pointerEvents:'none', background:'white' }}>
              {/* Pattern centered on orb ball (ball center ≈ 98px from section top) */}
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%) translateY(-20px)', width:342.922, height:335 }}>
                <img alt="" src={imgAiPattern} style={{ width:'100%', height:'100%', display:'block' }} />
              </div>
              {/* Orb 155px wrapper — horizontally centered */}
              <div style={{ position:'absolute', top:10, left:'calc(50% - 77.5px)', width:155, height:155 }}>
                <div style={{ position:'absolute', top:18.5, left:18.5, width:117.5, height:117.5, borderRadius:58.75, background:'rgba(255,255,255,0.72)', border:'2px solid rgba(255,255,255,0.5)', boxShadow:'0 64px 250px 0 #ef8c5a, 0 24px 54px 0 rgba(255,255,255,0.10), 0 3px 120px 0 #ccebff', overflow:'hidden' }}>
                  <div style={{ position:'absolute', top:-1.24, left:-1.24, width:115.984, height:115.984, background:'rgba(255,255,255,0.28)' }} />
                  <div style={{ position:'absolute', top:22, left:8, width:102.242, height:75.127, overflow:'visible' }}>
                    <img alt="" src={imgAiMaskGroup} style={{ position:'absolute', top:'-29.16%', left:'-21.43%', width:'142.86%', height:'158.32%', display:'block', maxWidth:'none' }} />
                  </div>
                  <div style={{ position:'absolute', top:5.76, left:8.17, width:53.065, height:43.968, filter:'blur(3.79px)', background:'radial-gradient(circle at center, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.6) 45%, transparent 100%)' }} />
                  <div style={{ position:'absolute', top:94.01, left:75.18, width:25.774, height:13.645, filter:'blur(2.274px)', background:'radial-gradient(circle at center, rgba(255,255,255,0.6) 0%, transparent 100%)' }} />
                  <div style={{ position:'absolute', top:-1.24, left:-1.24, width:115.984, height:115.984, borderRadius:57.992, background:'linear-gradient(145deg, rgba(255,255,255,0.22) 6.17%, rgba(255,255,255,0) 45.62%)' }} />
                </div>
              </div>
              {/* Fade to white at bottom */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:90, background:'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.9) 60%, white 90%)' }} />
            </div>

            <div style={{ paddingLeft:20, paddingRight:20, display:'flex', flexDirection:'column', gap:4 }}>
            {messages.map((msg, i) => {
              const prevFrom = i > 0 ? messages[i-1].from : null;
              const nextMsg = messages[i+1];
              const isLastInGroup = !nextMsg || nextMsg.from !== msg.from || nextMsg.type === 'resource';
              const isFirstInGroup = prevFrom !== msg.from;
              const gap = (msg.type === 'resource' || (prevFrom && messages[i-1]?.type === 'resource')) ? 3 : (isFirstInGroup ? 14 : 4);
              return (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: msg.from==='user' ? 'flex-end' : 'flex-start', marginTop: gap, animation:'msgIn 0.28s ease-out both' }}>
                  {msg.from === 'ai' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:6, maxWidth:'88%' }}>
                      {isFirstInGroup && (
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          {/* Brutalism X logo — inline SVG, never expires */}
                          <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0 }}>
                            <rect width="21" height="21" rx="5" fill="#7C5CFC"/>
                            <path d="M6 6L15 15M15 6L6 15" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                          </svg>
                          <span style={{ fontSize:14, fontWeight:500, color:'#0d0d12', fontFamily:ID, letterSpacing:-0.14, lineHeight:1.25 }}>Answer</span>
                        </div>
                      )}
                      <p style={{ margin:0, fontSize:12, lineHeight:1.4, color:'#37394a', fontFamily:SF, fontWeight:500 }}>{msg.text}</p>
                    </div>
                  )}
                  {msg.from === 'user' && (
                    <div style={{ display:'flex', alignItems:'flex-end', paddingRight:8 }}>
                      <div style={{ background:'white', borderRadius:16, padding:10, boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 1px 3px rgba(3,7,18,0.03)', maxWidth:257, marginRight:-8, overflow:'hidden', flexShrink:0 }}>
                        <p style={{ margin:0, fontSize:12, lineHeight:1.25, color:'#0d0d12', fontFamily:ID }}>{msg.text}</p>
                      </div>
                      <div style={{ width:12.5, height:9.652, flexShrink:0, marginRight:-8, marginBottom:6 }}>
                        {/* Speech bubble tail — inline SVG */}
                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display:'block', width:'100%', height:'100%' }}>
                          <path d="M0.5 9.652 C3.5 9.652 12.5 9.652 12.5 1 L12.5 9.652 Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                  )}
                  {msg.type === 'resource' && <ResourceCard res={msg.res} SF={SF} onBook={BOOKABLE_KEYS.has(msg.res?._key) ? startIntakeInline : null} />}
                  {msg.type === 'widget' && (
                    msg._wt === 'intake-tags'     ? <TagWidget     options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake(msg.intakeField, v)} SF={SF} /> :
                    msg._wt === 'intake-duration' ? <DurationWidget answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake('duration', v)} SF={SF} /> :
                    msg._wt === 'intake-severity' ? <ScaleWidget    label="How intense does it feel on a typical day?" answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake('severity', v)} SF={SF} /> :
                    msg._wt === 'intake-match'    ? <TherapistMatchWidget matches={msg.matches} SF={SF} /> :
                    msg._wt === 'tags'  ? <TagWidget  options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                    msg._wt === 'scale' ? <ScaleWidget label={msg.label}   answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                                          <DurationWidget                  answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} />
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:14, alignSelf:'flex-start', maxWidth:'88%' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink:0 }}>
                    <rect width="21" height="21" rx="5" fill="#7C5CFC"/>
                    <path d="M6 6L15 15M15 6L6 15" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
                  </svg>
                  <span style={{ fontSize:14, fontWeight:500, color:'#0d0d12', fontFamily:ID, letterSpacing:-0.14 }}>Answer</span>
                </div>
                <div style={{ display:'flex', gap:4, alignItems:'center', paddingLeft:2 }}>
                  {[0, 0.2, 0.4].map(d => (
                    <div key={d} style={{ width:5, height:5, borderRadius:'50%', background:'rgba(55,57,74,0.4)', animation:`typingDot 1s ease-in-out ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div style={{ height:8, flexShrink:0 }} />
            </div>{/* end padded messages wrapper */}
          </div>

          {/* Chips + input panel */}
          <div style={{ position:'relative', zIndex:3, flexShrink:0, background:'white' }}>
            <div style={{ padding:'10px 16px 0', display:'flex', gap:6, overflowX:'auto' }}>
              {chips.map(s => (
                <div key={s} onClick={() => sendMessage(s)} style={{ background:'white', border:'1px solid rgba(0,0,0,0.08)', borderRadius:99, padding:'6px 13px', cursor:'pointer', flexShrink:0, boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
                  <span style={{ color:'rgba(20,20,19,0.65)', fontSize:12, fontFamily:SF, fontWeight:600, whiteSpace:'nowrap' }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'8px 18px 34px', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ flex:1, background:'white', borderRadius:8, padding:'9px 12px', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 1px 3px rgba(3,7,18,0.03)', display:'flex', alignItems:'center', border:'none' }}>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask me anything..."
                  rows={1}
                  style={{ display:'block', width:'100%', border:'none', outline:'none', background:'transparent', fontFamily:ID, fontSize:12, color:'#0d0d12', resize:'none', lineHeight:1.2, maxHeight:88, overflowY:'auto' }}
                />
              </div>
              <div style={{ width:28, height:28, borderRadius:99, background:'#f6f8fa', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', boxShadow:'0 0 0 0.7px rgba(3,7,18,0.06),0 8px 16px rgba(3,7,18,0.08)' }}>
                {/* Mic icon — inline SVG */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4.5" y="1" width="5" height="7" rx="2.5" fill="#141413"/>
                  <path d="M2 7a5 5 0 0 0 10 0" stroke="#141413" strokeWidth="1.4" strokeLinecap="round"/>
                  <line x1="7" y1="12" x2="7" y2="14" stroke="#141413" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <div onClick={() => sendMessage()} style={{ width:28, height:28, borderRadius:24, background:'#0d0d12', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', boxShadow:'0 0 0 0.7px rgba(3,7,18,0.06),0 8px 16px rgba(3,7,18,0.08)' }}>
                {/* Send icon — inline SVG arrow */}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
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

