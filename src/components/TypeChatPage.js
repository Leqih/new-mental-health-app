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
    const RESOURCE_SHORT_DETAIL = res => (res.detail || '').split('·')[0].trim();
    const THERAPIST_FIT_LINE = t => `Best for ${t.specializations.slice(0,2).map(s => s[0].toUpperCase() + s.slice(1)).join(' + ')}`;
    const CHAT_HOME_PALETTE = {
      ink:'#141413',
      body:'#4a4462',
      muted:'rgba(58,51,84,0.66)',
      purple:'#8a6cff',
      peach:'rgba(255,210,184,0.44)',
      blue:'rgba(191,225,255,0.22)',
      glass:'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.86))',
      glassBorder:'1px solid rgba(255,255,255,0.72)',
      cardShadow:'0 18px 42px rgba(255,183,143,0.12), 0 14px 30px rgba(168,145,255,0.12), 0 6px 16px rgba(20,20,19,0.04)',
      widgetGlow:'radial-gradient(circle at 50% 54%, rgba(255,255,255,0.92) 0%, rgba(246,216,255,0.8) 18%, rgba(255,202,171,0.62) 36%, rgba(181,212,255,0.46) 58%, rgba(255,255,255,0) 76%)',
      widgetGrid:'linear-gradient(90deg, rgba(140,122,255,0.06) 0, rgba(140,122,255,0.06) 1px, transparent 1px, transparent 18px), linear-gradient(180deg, rgba(140,122,255,0.06) 0, rgba(140,122,255,0.06) 1px, transparent 1px, transparent 18px)',
      widgetLine:'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,184,140,0.82) 14%, rgba(138,108,255,0.96) 52%, rgba(141,214,255,0.82) 88%, rgba(255,255,255,0) 100%)',
    };
    const FULL_CARD_GRADIENT = (accent) => `linear-gradient(160deg, rgba(20,17,29,0.98) 0%, ${accent}d8 18%, rgba(250,133,69,0.9) 54%, rgba(14,13,20,0.98) 100%)`;
    const FULL_CARD_ORB = (accent) => `radial-gradient(circle at 50% 54%, rgba(255,255,255,0.96) 0%, ${accent}50 18%, rgba(255,180,145,0.58) 38%, rgba(129,194,255,0.42) 58%, rgba(255,255,255,0) 78%)`;
    const FIGMA_RESOURCE_GRADIENT = 'linear-gradient(166.19deg, rgb(18, 18, 255) 4.94%, rgb(255, 167, 135) 89.6%)';
    const FIGMA_MULTI_GRADIENT = 'linear-gradient(167deg, #ff6912 4.94%, #af87ff 89.6%)';
    const FIGMA_DURATION_GRADIENT = 'linear-gradient(174deg, #2d49ff 4.94%, #6bd288 89.6%)';
    const FIGMA_DARK_BUBBLE = '#141413';
    const FIGMA_LIGHT_BUBBLE = '#f6f6f6';
    const FIGMA_HERO_PANEL = 'linear-gradient(180deg, #2f4f97 0%, #1f386f 100%)';
    const FIGMA_RESOURCE_BUTTON = '#3c3c3c';
    const STANDALONE_PANEL_STYLE = {
      background:'rgba(20,20,19,0.03)',
      border:'1px solid rgba(20,20,19,0.07)',
      borderRadius:20,
      padding:10,
    };
    const STANDALONE_FOOTER_TEXT_STYLE = {
      fontSize:10.5,
      fontWeight:700,
      color:'rgba(255,255,255,0.84)',
    };
    const standAloneOptionStyle = (active, extra = {}) => ({
      borderRadius:20,
      border:active ? '2px solid #141413' : '1px solid rgba(20,20,19,0.08)',
      background:active ? FIGMA_DARK_BUBBLE : 'rgba(248,248,252,0.96)',
      color:active ? 'white' : '#141413',
      cursor:'pointer',
      transition:'all 0.16s ease',
      boxShadow:active ? '0 10px 22px rgba(20,20,19,0.14)' : 'none',
      ...extra,
    });
    const multiSelectOptionStyle = (active, extra = {}) => ({
      borderRadius:22,
      border:active ? '1.5px solid rgba(110,80,230,0.26)' : '1px solid rgba(20,20,19,0.07)',
      background:active ? 'rgba(115,86,255,0.07)' : 'rgba(255,255,255,0.97)',
      color:'#141413',
      cursor:'pointer',
      transition:'all 0.15s ease',
      boxShadow:active ? '0 4px 14px rgba(110,80,230,0.10)' : 'none',
      ...extra,
    });
    const normalizeWidgetTitle = (value) => {
      if (!value) return '';
      const stripped = value.replace(/\s*\(pick any that apply\)\s*/i, '').trim();
      const letters = stripped.match(/[A-Za-z]/g) || [];
      if (letters.length && stripped === stripped.toUpperCase()) {
        const lowered = stripped.toLowerCase();
        return lowered.charAt(0).toUpperCase() + lowered.slice(1);
      }
      return stripped;
    };
    const RAIL_SOFT_PILL_STYLE = {
      background:'rgba(255,255,255,0.16)',
      border:'1px solid rgba(255,255,255,0.24)',
      borderRadius:99,
      padding:'5px 10px',
    };
    const RAIL_WHITE_PILL_STYLE = {
      background:'rgba(255,255,255,0.96)',
      borderRadius:20,
      padding:'8px 14px',
      display:'flex',
      justifyContent:'center',
    };
    const railPrimaryButtonStyle = (active) => ({
      display:'flex',
      alignItems:'center',
      justifyContent:'space-between',
      gap:12,
      background:active ? 'linear-gradient(135deg,#4ade80,#22c55e)' : FIGMA_RESOURCE_BUTTON,
      border:'1px solid rgba(255,255,255,0.5)',
      borderRadius:20,
      padding:'10px 14px',
      boxShadow:`0 10px 22px ${active ? 'rgba(74,222,128,0.24)' : 'rgba(20,20,19,0.12)'}`,
      opacity:1,
    });
    const RESOURCE_ACTION_COPY = {
      breathing: 'Try now',
      talkCampus: 'Open app',
      welltrack: 'Start tool',
      communityAdvocacy: 'Reach out',
      intlStudent: 'Get help',
      safeZone: 'Reach out',
      groupCounseling: 'Learn more',
      griefSupport: 'Learn more',
    };
    const widgetAnswerPillStyle = (SF) => ({
      display:'inline-flex',
      alignItems:'center',
      gap:6,
      background:'rgba(130,90,220,0.09)',
      borderRadius:99,
      padding:'5px 13px',
      border:'1px solid rgba(130,90,220,0.18)',
      fontSize:12,
      color:'rgba(110,65,200,0.9)',
      fontFamily:SF,
      fontWeight:700,
    });
    const widgetAnswerStyle = (SF) => ({
      marginLeft:36,
      animation:'msgIn 0.25s ease-out',
      ...widgetAnswerPillStyle(SF),
    });

    function WidgetShell({
      title,
      helper,
      badge,
      footer,
      children,
      SF,
      maxWidth='84%',
      bodyMaxHeight,
      bodyPadding='14px 20px 0',
      titleCaps=true,
      centerHeader=false,
      showLeadDot=true,
      gradient=FIGMA_MULTI_GRADIENT,
      headerPadding='18px 18px 14px',
      titleSize=15,
      titleLineHeight='17.25px',
      helperSize=11,
      helperLineHeight=1.35,
      badgePadding='7px 13px',
      badgeSize=10.5,
      headerMinHeight,
      footerPadding='12px 18px 16px',
    }) {
      return (
        <div style={{ marginLeft:36, width:maxWidth, maxWidth:'100%', background:'rgba(255,255,255,0.97)', borderRadius:22, overflow:'hidden', border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 18px 48px rgba(20,20,19,0.08), 0 4px 14px rgba(20,20,19,0.04)', animation:'msgIn 0.28s ease-out', position:'relative' }}>
          <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column' }}>
            <div style={{ padding:headerPadding, borderBottom:'1px solid rgba(20,20,19,0.07)' }}>
              <div style={{ position:'relative', minHeight:headerMinHeight || (centerHeader ? 50 : 'auto'), display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
                <div style={{ minWidth:0, flex:1, textAlign:centerHeader ? 'center' : 'left', paddingRight:centerHeader && badge ? 82 : 0 }}>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:centerHeader ? 'center' : 'flex-start', gap:7, marginBottom:helper ? 7 : 0 }}>
                    {showLeadDot && <div style={{ width:8, height:8, borderRadius:'50%', background:'#8a6cff', boxShadow:'0 0 0 5px rgba(138,108,255,0.12)' }} />}
                    <p style={{ margin:0, fontSize:titleSize, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:titleCaps ? '0.48px' : '-0.3px', textTransform:titleCaps ? 'uppercase' : 'none', lineHeight:titleLineHeight }}>{title}</p>
                  </div>
                  {helper && <p style={{ margin:0, fontSize:helperSize, color:'rgba(20,20,19,0.5)', fontFamily:SF, lineHeight:helperLineHeight }}>{helper}</p>}
                </div>
                {badge && (
                  <div style={{ background:'rgba(20,20,19,0.06)', borderRadius:20, padding:badgePadding, border:'1px solid rgba(20,20,19,0.08)', flexShrink:0, position:centerHeader ? 'absolute' : 'static', right:0, top:0 }}>
                    <span style={{ fontSize:badgeSize, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'0.28px' }}>{badge}</span>
                  </div>
                )}
              </div>
            </div>
            <div className={bodyMaxHeight ? 'hide-scrollbar' : undefined} style={{ padding:bodyPadding, maxHeight:bodyMaxHeight, overflowY:bodyMaxHeight ? 'auto' : 'visible', WebkitOverflowScrolling:'touch', position:'relative', scrollbarWidth:'none', msOverflowStyle:'none' }}>
              {children}
            </div>
            {footer && (
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, padding:footerPadding, marginTop:10, borderTop:'1px solid rgba(20,20,19,0.07)', background:'rgba(20,20,19,0.02)' }}>
                {footer}
              </div>
            )}
          </div>
        </div>
      );
    }

    /* ── Breathing Guide (4-7-8 technique) ── */
    function BreathingGuide({ SF }) {
      const PHASES = [
        { label:'Inhale', dur:4, scale:1.28 },
        { label:'Hold',   dur:7, scale:1.28 },
        { label:'Exhale', dur:8, scale:1.0  },
      ];
      const [running, setRunning]   = useState(false);
      const [phaseIdx, setPhaseIdx] = useState(0);
      const [tick, setTick]         = useState(0);
      const [cycles, setCycles]     = useState(0);
      const intervalRef             = useRef(null);
      const phase     = PHASES[phaseIdx];
      const remaining = phase.dur - tick;

      const stop = () => { clearInterval(intervalRef.current); setRunning(false); setPhaseIdx(0); setTick(0); };
      const start = () => {
        setPhaseIdx(0); setTick(0); setRunning(true);
        let pIdx = 0, t = 0;
        intervalRef.current = setInterval(() => {
          t++;
          setTick(t);
          if (t >= PHASES[pIdx].dur) {
            t = 0;
            pIdx = (pIdx + 1) % PHASES.length;
            if (pIdx === 0) setCycles(c => c + 1);
            setPhaseIdx(pIdx);
          }
        }, 1000);
      };
      useEffect(() => () => clearInterval(intervalRef.current), []);

      const progress  = running ? tick / phase.dur : 0;
      const circleR   = 72;
      const circum    = 2 * Math.PI * circleR;
      const dash      = circum * (1 - progress);
      const orbScale  = running ? phase.scale : 1;
      const transTime = running
        ? { Inhale:`${phase.dur}s`, Hold:'0.4s', Exhale:`${phase.dur}s` }[phase.label]
        : '0.5s';

      return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:0, paddingTop:12 }}>
          {/* Orb + ring */}
          <div style={{ position:'relative', width:196, height:196, display:'flex', alignItems:'center', justifyContent:'center' }}>
            {/* Soft outer glow halo */}
            <div style={{
              position:'absolute', inset:0, borderRadius:'50%',
              background:'radial-gradient(circle, rgba(255,255,255,0.28) 0%, transparent 70%)',
              transform:`scale(${running ? orbScale * 1.16 : 1.06})`,
              transition:`transform ${transTime} ease-in-out`,
              filter:'blur(12px)',
            }} />
            {/* SVG ring */}
            <svg width="196" height="196" style={{ position:'absolute', inset:0, transform:'rotate(-90deg)' }}>
              <circle cx="98" cy="98" r={circleR} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" />
              {running && (
                <circle cx="98" cy="98" r={circleR} fill="none"
                  stroke="rgba(255,255,255,0.82)" strokeWidth="2.5"
                  strokeDasharray={circum} strokeDashoffset={dash}
                  strokeLinecap="round"
                  style={{ transition:`stroke-dashoffset 1s linear` }} />
              )}
            </svg>
            {/* Orb — white glass ball on soft teal bg */}
            <div style={{
              width:116, height:116, borderRadius:'50%',
              background: running
                ? 'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.98) 0%, rgba(220,238,240,0.82) 38%, rgba(160,210,215,0.38) 70%, rgba(120,185,192,0.12) 100%)'
                : 'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.88) 0%, rgba(215,235,238,0.62) 42%, rgba(155,205,210,0.18) 100%)',
              transform:`scale(${orbScale})`,
              transition:`transform ${transTime} ease-in-out, background 0.5s ease`,
              boxShadow: running
                ? '0 0 44px rgba(255,255,255,0.32), 0 8px 28px rgba(100,175,185,0.22)'
                : '0 4px 20px rgba(100,170,180,0.14)',
              display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:1,
            }}>
              {running ? (
                <>
                  <span style={{ fontSize:28, fontWeight:900, color:'#3a6a72', fontFamily:SF, lineHeight:1 }}>{remaining}</span>
                  <span style={{ fontSize:10, fontWeight:700, color:'rgba(58,106,114,0.6)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>sec</span>
                </>
              ) : (
                <span style={{ fontSize:28, lineHeight:1 }}>🫧</span>
              )}
            </div>
          </div>

          {/* Phase label */}
          <div style={{ height:40, display:'flex', alignItems:'center', justifyContent:'center', marginTop:4 }}>
            {running ? (
              <p style={{ margin:0, fontSize:24, fontWeight:700, color:'rgba(255,255,255,0.9)', fontFamily:SF, letterSpacing:'-0.3px', textShadow:'0 1px 6px rgba(80,150,160,0.3)' }}>{phase.label}</p>
            ) : (
              <p style={{ margin:0, fontSize:13, fontWeight:500, color:'rgba(255,255,255,0.55)', fontFamily:SF }}>Tap start when you're ready</p>
            )}
          </div>

          {/* Steps */}
          <div style={{ display:'flex', gap:6, marginTop:8, marginBottom:20 }}>
            {PHASES.map((p, i) => {
              const active = running && phaseIdx === i;
              return (
                <div key={p.label} style={{ display:'flex', alignItems:'center', gap:5, background: active ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.14)', borderRadius:20, padding:'5px 12px', transition:'background 0.35s ease', border: active ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent' }}>
                  <div style={{ width:5, height:5, borderRadius:'50%', background: active ? '#3a6a72' : 'rgba(255,255,255,0.55)' }} />
                  <span style={{ fontSize:10.5, fontWeight:active ? 700 : 500, color: active ? '#3a6a72' : 'rgba(255,255,255,0.65)', fontFamily:SF, transition:'all 0.3s' }}>{p.label} {p.dur}s</span>
                </div>
              );
            })}
          </div>

          {/* Cycle badge */}
          {cycles > 0 && (
            <div style={{ background:'rgba(255,255,255,0.22)', borderRadius:99, padding:'4px 14px', marginBottom:10 }}>
              <span style={{ fontSize:11, fontWeight:600, color:'rgba(58,106,114,0.7)', fontFamily:SF }}>{cycles} {cycles === 1 ? 'cycle' : 'cycles'} completed</span>
            </div>
          )}

          {/* Start / Stop */}
          <div onClick={running ? stop : start} style={{
            background: running ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.88)',
            borderRadius:99, padding:'14px 52px',
            cursor:'pointer',
            border: running ? '1px solid rgba(255,255,255,0.38)' : 'none',
            transition:'all 0.25s ease',
            boxShadow: running ? 'none' : '0 4px 20px rgba(80,150,160,0.18)',
          }}>
            <span style={{ fontSize:14, fontWeight:800, color: running ? 'rgba(255,255,255,0.8)' : '#3a6a72', fontFamily:SF }}>{running ? 'Stop' : 'Start'}</span>
          </div>
        </div>
      );
    }

    /* ── Resource Detail Sheet ── */
    function ResourceDetailSheet({ res, SF, onClose, onBook }) {
      const canBook = onBook && res._key && BOOKABLE_KEYS.has(res._key);
      const hasCall = !!res.phone;
      const isBreathing  = res._key === 'breathing';
      const isApp = ['welltrack','talkCampus'].includes(res._key);

      const CARD_GRADIENTS = {
        caps:        'linear-gradient(155deg, #7864fc 0%, #a084ff 42%, #f5b8a0 100%)',
        letsTalk:    'linear-gradient(155deg, #5b8dff 0%, #90b4ff 48%, #d8edff 100%)',
        crisis:      'linear-gradient(155deg, #ff6060 0%, #ff9880 52%, #ffd4b0 100%)',
        text741:     'linear-gradient(155deg, #ff7070 0%, #ffaa88 52%, #ffe0c8 100%)',
        breathing:   'linear-gradient(155deg, #7890d0 0%, #80c0b0 50%, #c0e0c4 100%)',
        welltrack:   'linear-gradient(155deg, #e8621a 0%, #f59042 48%, #ffd080 100%)',
        talkCampus:  'linear-gradient(155deg, #0891b2 0%, #38bdf8 52%, #bae6fd 100%)',
        mckinley:    'linear-gradient(155deg, #059669 0%, #34d399 52%, #a7f3d0 100%)',
        resilience:  'linear-gradient(155deg, #d97706 0%, #fbbf24 52%, #fef3c7 100%)',
        griefSupport:'linear-gradient(155deg, #6b7280 0%, #9ca3af 52%, #f3f4f6 100%)',
        safeZone:    'linear-gradient(155deg, #8b5cf6 0%, #c084fc 52%, #f3e8ff 100%)',
        communityAdvocacy: 'linear-gradient(155deg, #f59e0b 0%, #fbbf24 52%, #fef3c7 100%)',
        financialWellness: 'linear-gradient(155deg, #16a34a 0%, #4ade80 52%, #d1fae5 100%)',
        odos:        'linear-gradient(155deg, #be185d 0%, #f472b6 52%, #fce7f3 100%)',
        workshops:   'linear-gradient(155deg, #7c3aed 0%, #a78bfa 52%, #ede9fe 100%)',
        rosecrance:  'linear-gradient(155deg, #dc2626 0%, #f87171 52%, #fee2e2 100%)',
        reach:       'linear-gradient(155deg, #374151 0%, #6b7280 52%, #f3f4f6 100%)',
      };
      const cardGrad = CARD_GRADIENTS[res._key] || 'linear-gradient(155deg, #8c6eff 0%, #b8a0ff 50%, #f0d0ff 100%)';
      const heroLabel = res._key === 'caps' ? 'Illinois Counseling Center' : res.title;

      const handleCTA = () => {
        if (canBook) { onClose(); onBook(); return; }
        if (hasCall) window.location.href = `tel:${res.phone}`;
      };

      const ctaLabel = canBook ? 'Start therapist matching ↗'
        : hasCall ? `Call ${res.phone} ↗`
        : isApp ? 'Get the app ↗'
        : null;

      return (
        <div style={{ position:'absolute', inset:0, zIndex:600, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(20,20,19,0.32)', backdropFilter:'blur(6px)', WebkitBackdropFilter:'blur(6px)' }} onClick={onClose} />
          <div style={{ position:'relative', zIndex:1, borderRadius:'28px 28px 0 0', overflow:'hidden', animation:'slideUp 0.32s cubic-bezier(.22,.8,.24,1)' }}>
            {/* Gradient header */}
            <div style={{ background:cardGrad, padding: isBreathing ? '28px 24px 32px' : '28px 24px 36px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 50%)', pointerEvents:'none' }} />
              {/* Drag handle */}
              <div style={{ width:36, height:4, borderRadius:2, background:'rgba(255,255,255,0.35)', margin:'0 auto 24px' }} />
              {/* Close */}
              <div onClick={onClose} style={{ position:'absolute', right:20, top:20, width:30, height:30, borderRadius:15, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
              </div>

              {!isBreathing ? (
                <div style={{ display:'flex', alignItems:'flex-start', gap:16 }}>
                  <div style={{ width:58, height:58, borderRadius:18, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)' }}>
                    <span style={{ fontSize:27, lineHeight:1 }}>{res.icon}</span>
                  </div>
                  <div style={{ flex:1, minWidth:0, paddingTop:4 }}>
                    <p style={{ margin:'0 0 4px', fontSize:19, fontWeight:800, color:'white', fontFamily:SF, letterSpacing:'-0.36px', lineHeight:1.18 }}>{heroLabel}</p>
                    <p style={{ margin:0, fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.68)', fontFamily:SF, lineHeight:1.4 }}>{res.sub}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ textAlign:'center', marginBottom:0 }}>
                    <p style={{ margin:'0 0 4px', fontSize:20, fontWeight:800, color:'rgba(255,255,255,0.95)', fontFamily:SF, letterSpacing:'-0.36px', textShadow:'0 1px 8px rgba(80,150,160,0.25)' }}>Breathing Exercise</p>
                    <p style={{ margin:0, fontSize:12, fontWeight:500, color:'rgba(255,255,255,0.62)', fontFamily:SF }}>4-7-8 technique · activates calm response</p>
                  </div>
                  <BreathingGuide SF={SF} />
                </>
              )}
            </div>

            {/* White content area */}
            {!isBreathing && (
              <div style={{ background:'#faf9f8', padding:'22px 24px', display:'flex', flexDirection:'column', gap:16 }}>
                {/* Tags */}
                {res.tags && res.tags.length > 0 && (
                  <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                    {res.tags.map(tag => (
                      <span key={tag} style={{ fontSize:10.5, fontWeight:700, color:'#5a4a7a', background:'rgba(138,108,255,0.09)', borderRadius:99, padding:'5px 11px', letterSpacing:'0.18px', fontFamily:SF }}>{tag}</span>
                    ))}
                  </div>
                )}
                {/* Tagline */}
                <p style={{ margin:0, fontSize:13.5, fontWeight:400, color:'rgba(20,20,19,0.72)', fontFamily:SF, lineHeight:1.58 }}>{res.tagline}</p>
                {/* Detail info */}
                {res.detail && (
                  <div style={{ display:'flex', alignItems:'center', gap:8, background:'rgba(20,20,19,0.04)', borderRadius:14, padding:'11px 14px' }}>
                    <span style={{ fontSize:15 }}>📍</span>
                    <span style={{ fontSize:12, fontWeight:600, color:'rgba(20,20,19,0.6)', fontFamily:SF, lineHeight:1.4 }}>{res.detail}</span>
                  </div>
                )}
                {/* CTA */}
                {ctaLabel && (
                  <div onClick={handleCTA} style={{ background:'#141413', borderRadius:99, padding:'14px 24px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', gap:8, marginTop:2 }}>
                    <span style={{ fontSize:13.5, fontWeight:800, color:'white', fontFamily:SF }}>{ctaLabel}</span>
                  </div>
                )}
                {/* Bottom safe area */}
                <div style={{ height:8 }} />
              </div>
            )}
            {/* Safe area for breathing */}
            {isBreathing && <div style={{ background:'#b8d8d4', height:28 }} />}
          </div>
        </div>
      );
    }

    function ResourceCard({ res, SF, onBook, onExpand, priorityIndex = 0, horizontal = false }) {
      const canBook = onBook && res._key && BOOKABLE_KEYS.has(res._key);
      const hasCall = !!res.phone;
      const primaryLabel = canBook ? 'Start matching' : (hasCall ? 'Call now' : (RESOURCE_ACTION_COPY[res._key] || 'Explore'));
      const heroLabel = res._key === 'caps' ? 'Illinois Counseling Center' : res.title;
      const CARD_GRADIENTS = {
        caps:        'linear-gradient(155deg, #7864fc 0%, #a084ff 42%, #f5b8a0 100%)',
        letsTalk:    'linear-gradient(155deg, #5b8dff 0%, #90b4ff 48%, #d8edff 100%)',
        crisis:      'linear-gradient(155deg, #ff6060 0%, #ff9880 52%, #ffd4b0 100%)',
        text741:     'linear-gradient(155deg, #ff7070 0%, #ffaa88 52%, #ffe0c8 100%)',
        breathing:   'linear-gradient(155deg, #7890d0 0%, #80c0b0 50%, #c0e0c4 100%)',
        welltrack:   'linear-gradient(155deg, #e8621a 0%, #f59042 48%, #ffd080 100%)',
        talkCampus:  'linear-gradient(155deg, #0891b2 0%, #38bdf8 52%, #bae6fd 100%)',
        mckinley:    'linear-gradient(155deg, #059669 0%, #34d399 52%, #a7f3d0 100%)',
        resilience:  'linear-gradient(155deg, #d97706 0%, #fbbf24 52%, #fef3c7 100%)',
        griefSupport:'linear-gradient(155deg, #6b7280 0%, #9ca3af 52%, #f3f4f6 100%)',
        safeZone:    'linear-gradient(155deg, #8b5cf6 0%, #c084fc 52%, #f3e8ff 100%)',
        communityAdvocacy: 'linear-gradient(155deg, #f59e0b 0%, #fbbf24 52%, #fef3c7 100%)',
        financialWellness: 'linear-gradient(155deg, #16a34a 0%, #4ade80 52%, #d1fae5 100%)',
        odos:        'linear-gradient(155deg, #be185d 0%, #f472b6 52%, #fce7f3 100%)',
        workshops:   'linear-gradient(155deg, #7c3aed 0%, #a78bfa 52%, #ede9fe 100%)',
        rosecrance:  'linear-gradient(155deg, #dc2626 0%, #f87171 52%, #fee2e2 100%)',
        reach:       'linear-gradient(155deg, #374151 0%, #6b7280 52%, #f3f4f6 100%)',
      };
      const cardGrad = CARD_GRADIENTS[res._key] || 'linear-gradient(155deg, #8c6eff 0%, #b8a0ff 50%, #f0d0ff 100%)';
      const handleAction = (e) => {
        e.stopPropagation();
        if (canBook) { onBook(); return; }
        if (hasCall) window.location.href = `tel:${res.phone}`;
      };
      return (
        <div onClick={() => onExpand && onExpand(res)} style={{ marginLeft:horizontal ? 0 : 36, width:horizontal ? 220 : undefined, minWidth:horizontal ? 220 : undefined, maxWidth:horizontal ? 220 : '86%', minHeight:horizontal ? 270 : undefined, background:cardGrad, borderRadius:22, display:'flex', flexDirection:'column', flexShrink:0, scrollSnapAlign:'start', position:'relative', overflow:'hidden', padding:'22px 20px 20px', cursor:'pointer' }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 42%)', pointerEvents:'none' }} />
          <span style={{ position:'absolute', right:14, top:12, fontSize:20, opacity:0.5, lineHeight:1 }}>✦</span>
          <div style={{ width:50, height:50, borderRadius:15, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, flexShrink:0, backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)' }}>
            <span style={{ fontSize:23, lineHeight:1 }}>{res.icon}</span>
          </div>
          <p style={{ margin:'0 0 6px', fontSize:15, fontWeight:800, color:'white', fontFamily:SF, lineHeight:1.2, letterSpacing:'-0.25px' }}>{heroLabel}</p>
          <p style={{ margin:0, fontSize:11, fontWeight:400, color:'rgba(255,255,255,0.72)', fontFamily:SF, lineHeight:1.5, flex:1, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{res.sub}</p>
          {(canBook || hasCall) ? (
            <div onClick={handleAction} style={{ marginTop:16, display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
              <span style={{ fontSize:12, fontWeight:700, color:'white', fontFamily:SF, textDecoration:'underline', textUnderlineOffset:3 }}>{primaryLabel}</span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.70)', lineHeight:1 }}>↗</span>
            </div>
          ) : (
            <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:5 }}>
              <span style={{ fontSize:11, fontWeight:600, color:'rgba(255,255,255,0.55)', fontFamily:SF }}>Tap to learn more</span>
            </div>
          )}
        </div>
      );
    }

    function ResourceRail({ resources, SF, onBook, onExpand }) {
      return (
        <div style={{ marginLeft:36, width:'calc(100% - 36px)', display:'flex', flexDirection:'column', gap:8, animation:'msgIn 0.28s ease-out' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
            <span style={{ fontSize:10, fontWeight:800, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.55px', textTransform:'uppercase' }}>Suggested support</span>
            <span style={{ fontSize:10, fontWeight:700, color:'rgba(111,94,255,0.72)', fontFamily:SF }}>Swipe across</span>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', paddingRight:18, paddingBottom:6, scrollSnapType:'x mandatory', scrollPaddingLeft:0, scrollbarWidth:'none', msOverflowStyle:'none' }}>
            {resources.map((item, idx) => (
              <ResourceCard key={`${item.res._key || item.res.title}-${idx}`} res={item.res} SF={SF} onBook={BOOKABLE_KEYS.has(item.res?._key) ? onBook : null} onExpand={onExpand} priorityIndex={item.priorityIndex || idx} horizontal />
            ))}
          </div>
        </div>
      );
    }

    /* ── INLINE WIDGETS ── */
    function DurationWidget({ onAnswer, answered, SF }) {
      const [sel, setSel] = useState(null);
      const durationRows = [
        [
          { label:'Just today', width:168, size:12 },
          { label:'A few days', width:94, size:12 },
          { label:'About a week', width:94, size:10 },
        ],
        [
          { label:'2–3 weeks', width:95, size:12 },
          { label:'Over a month', width:174, size:12 },
          { label:'A long time', width:94, size:10 },
        ],
      ];
      if (answered) return <div style={widgetAnswerStyle(SF)}>✓ {answered}</div>;
      return (
        <WidgetShell
          title="How long?"
          SF={SF}
          titleCaps={false}
          footer={null}
          centerHeader
          showLeadDot={false}
          gradient={FIGMA_DURATION_GRADIENT}
          headerPadding="16px 18px 10px"
          titleSize={13.5}
          titleLineHeight="15px"
          bodyPadding="12px 18px 14px"
        >
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0, 1fr))', gap:8 }}>
            {durationRows.flat().map((item) => {
              const active = sel === item.label;
              return (
                <div
                  key={item.label}
                  onClick={() => { setSel(item.label); setTimeout(() => onAnswer(item.label), 220); }}
                  style={{
                    minWidth:0,
                    minHeight:40,
                    padding:'9px 10px',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    textAlign:'center',
                    ...standAloneOptionStyle(active, { borderRadius:20 }),
                  }}
                >
                  <span style={{ fontSize:11.5, fontWeight:500, fontFamily:SF, lineHeight:'14px' }}>{item.label}</span>
                </div>
              );
            })}
          </div>
        </WidgetShell>
      );
    }

    function DurationSeverityDeck({ onComplete, answered, SF }) {
      const [page, setPage] = useState(0);
      const [duration, setDuration] = useState(null);
      const [severity, setSeverity] = useState(null);
      const touchStartX = useRef(null);
      const durationOptions = [
        'Just today',
        'A few days',
        'About a week',
        '2–3 weeks',
        'Over a month',
        'A long time',
      ];
      const severityOptions = [
        { label:'Mild', emoji:'😌' },
        { label:'Noticeable', emoji:'😕' },
        { label:'Moderate', emoji:'😟' },
        { label:'Intense', emoji:'😣' },
        { label:'Overwhelming', emoji:'😰' },
      ];
      const severityRows = [severityOptions.slice(0, 3), severityOptions.slice(3)];
      if (answered) {
        const [d, s] = answered.split(' · ');
        return (
          <div style={{ marginLeft:36, display:'flex', flexWrap:'wrap', gap:6, maxWidth:'86%', animation:'msgIn 0.25s ease-out' }}>
            <div style={widgetAnswerPillStyle(SF)}>✓ {d}</div>
            <div style={widgetAnswerPillStyle(SF)}>✓ {s}</div>
          </div>
        );
      }
      const handleTouchStart = (e) => {
        touchStartX.current = e.touches?.[0]?.clientX ?? null;
      };
      const handleTouchEnd = (e) => {
        if (touchStartX.current == null) return;
        const endX = e.changedTouches?.[0]?.clientX ?? touchStartX.current;
        const delta = endX - touchStartX.current;
        if (Math.abs(delta) > 40) {
          if (delta < 0 && page < 1) setPage(page + 1);
          if (delta > 0 && page > 0) setPage(page - 1);
        }
        touchStartX.current = null;
      };
      const finishIfReady = (nextDuration, nextSeverity) => {
        if (nextDuration && nextSeverity) {
          setTimeout(() => onComplete(nextDuration, nextSeverity), 220);
        }
      };
      return (
        <div
          style={{ marginLeft:36, width:'84%', maxWidth:'100%', overflow:'hidden', touchAction:'pan-y', animation:'msgIn 0.28s ease-out' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div style={{ display:'flex', width:'200%', transform:`translateX(-${page * 50}%)`, transition:'transform 0.28s ease' }}>
            <div style={{ width:'50%', paddingRight:8, boxSizing:'border-box' }}>
              <div style={{ background:'rgba(255,255,255,0.97)', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', overflow:'hidden', position:'relative', boxShadow:'0 18px 48px rgba(20,20,19,0.08), 0 4px 14px rgba(20,20,19,0.04)' }}>
                <div style={{ padding:'18px 18px 16px', position:'relative', zIndex:1 }}>
                  <div style={{ position:'relative', minHeight:24, marginBottom:14 }}>
                    <p style={{ margin:0, fontSize:15, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px', lineHeight:'17.25px', textAlign:'center' }}>How long?</p>
                    <div style={{ background:'rgba(20,20,19,0.06)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:20, padding:'7px 13px', flexShrink:0, position:'absolute', right:0, top:-2 }}>
                      <span style={{ fontSize:10.5, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'0.28px' }}>SWIPE</span>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:8 }}>
                    {['Just today','A few days','About a week','2–3 weeks','Over a month','A long time'].map(label => {
                      const active = duration === label;
                      return (
                        <div
                          key={label}
                          onClick={() => { setDuration(label); setPage(1); finishIfReady(label, severity); }}
                          style={{ minHeight:34, padding:'8px 6px', borderRadius:20, background:active ? FIGMA_DARK_BUBBLE : 'rgba(255,255,255,0.98)', color:active ? 'white' : '#141413', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', transition:'all 0.16s ease', boxShadow:active ? '0 8px 18px rgba(20,20,19,0.16)' : 'none' }}
                        >
                          <span style={{ fontSize:11.5, fontWeight:active ? 600 : 400, fontFamily:SF, lineHeight:'14px' }}>{label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop:'auto', paddingTop:14, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      {[0, 1].map((dot) => (
                        <div key={dot} onClick={() => setPage(dot)} style={{ width:dot === page ? 10 : 8, height:dot === page ? 10 : 8, borderRadius:'50%', background:dot === page ? '#141413' : 'rgba(20,20,19,0.18)', cursor:'pointer', transition:'all 0.16s ease' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width:'50%', paddingLeft:8, boxSizing:'border-box' }}>
              <div style={{ background:'rgba(255,255,255,0.97)', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', overflow:'hidden', position:'relative', boxShadow:'0 18px 48px rgba(20,20,19,0.08), 0 4px 14px rgba(20,20,19,0.04)' }}>
                <div style={{ padding:'18px 18px 16px', position:'relative', zIndex:1 }}>
                  <div style={{ position:'relative', minHeight:24, marginBottom:16 }}>
                    <p style={{ margin:0, fontSize:15, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px', lineHeight:'17.25px', textAlign:'center' }}>Intensity</p>
                    <div style={{ background:'rgba(20,20,19,0.06)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:20, padding:'7px 13px', flexShrink:0, position:'absolute', right:0, top:-2 }}>
                      <span style={{ fontSize:10.5, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'0.28px' }}>ONE TAP</span>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                    {severityRows.map((row, rowIdx) => (
                      <div key={rowIdx} style={{ display:'grid', gridTemplateColumns:`repeat(${row.length}, minmax(0, 1fr))`, gap:8 }}>
                        {row.map((item) => {
                          const active = severity === item.label;
                          return (
                            <div
                              key={item.label}
                              onClick={() => {
                                setSeverity(item.label);
                                finishIfReady(duration, item.label);
                              }}
                              style={{
                                minHeight:76,
                                padding:'9px 8px',
                                borderRadius:20,
                                background:active ? FIGMA_DARK_BUBBLE : 'rgba(255,255,255,0.96)',
                                color:active ? 'white' : '#141413',
                                display:'flex',
                                flexDirection:'column',
                                alignItems:'center',
                                justifyContent:'center',
                                gap:6,
                                cursor:'pointer',
                                transition:'all 0.16s ease',
                                boxShadow:active ? '0 8px 18px rgba(20,20,19,0.16)' : 'none',
                              }}
                            >
                              <span style={{ fontSize:26, lineHeight:1 }}>{item.emoji}</span>
                              <span style={{ fontSize:11, fontWeight:600, fontFamily:SF, lineHeight:'13px', textAlign:'center' }}>{item.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:'auto', paddingTop:14, display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:7 }}>
                      {[0, 1].map((dot) => (
                        <div key={dot} onClick={() => setPage(dot)} style={{ width:dot === page ? 10 : 8, height:dot === page ? 10 : 8, borderRadius:'50%', background:dot === page ? '#141413' : 'rgba(20,20,19,0.18)', cursor:'pointer', transition:'all 0.16s ease' }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    function AnxietySwipeDeck({ onComplete, answered, SF }) {
      const [page, setPage] = useState(0);
      const [duration, setDuration] = useState(null);
      const [picks, setPicks] = useState([]);
      const dragStartX = useRef(null);
      const deckRootRef = useRef(null);
      const [dragOffset, setDragOffset] = useState(0);
      const [isDragging, setIsDragging] = useState(false);
      const durationRows = [
        [
          { label:'Just today', width:168, size:12 },
          { label:'A few days', width:94, size:12 },
          { label:'About a week', width:94, size:10 },
        ],
        [
          { label:'2–3 weeks', width:95, size:12 },
          { label:'Over a month', width:174, size:12 },
          { label:'A long time', width:94, size:10 },
        ],
      ];
      const symptomOptions = [
        'Racing, looping thoughts',
        'Tight chest or shallow breath',
        "Restless — can't sit still",
        'Hard to focus on anything',
        'Sudden dread for no reason',
        'Trouble sleeping too',
      ];
      if (answered) {
        const [d, symptoms] = answered.split(' · ', 2);
        return (
          <div style={{ marginLeft:36, display:'flex', flexWrap:'wrap', gap:6, maxWidth:'86%', animation:'msgIn 0.25s ease-out' }}>
            <div style={widgetAnswerPillStyle(SF)}>✓ {d}</div>
            {symptoms && <div style={widgetAnswerPillStyle(SF)}>✓ {symptoms}</div>}
          </div>
        );
      }
      const SLIDE_GAP = 12;
      const CARD_HEIGHT = page === 0 ? 'min(54vh, 300px)' : 'min(55vh, 314px)';
      const handlePointerDown = (e) => {
        dragStartX.current = e.clientX;
        setIsDragging(true);
        setDragOffset(0);
      };
      const handlePointerMove = (e) => {
        if (dragStartX.current == null) return;
        const delta = e.clientX - dragStartX.current;
        setDragOffset(Math.max(-72, Math.min(72, delta)));
      };
      const finishDrag = (clientX) => {
        if (dragStartX.current == null) return;
        const delta = clientX - dragStartX.current;
        if (Math.abs(delta) > 40) {
          if (delta < 0 && page < 1) setPage(page + 1);
          if (delta > 0 && page > 0) setPage(page - 1);
        }
        dragStartX.current = null;
        setIsDragging(false);
        setDragOffset(0);
      };
      const handlePointerUp = (e) => {
        finishDrag(e.clientX);
      };
      const handlePointerCancel = () => {
        dragStartX.current = null;
        setIsDragging(false);
        setDragOffset(0);
      };
      const togglePick = (label) => {
        setPicks((prev) => prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]);
      };
      return (
        <div
          ref={deckRootRef}
          style={{ marginLeft:36, marginTop:10, width:'calc(100% - 36px)', maxWidth:342, overflow:'hidden', touchAction:'pan-y', animation:'msgIn 0.28s ease-out', userSelect:'none', transition:'margin-top 0.24s cubic-bezier(.22,.8,.24,1)' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onPointerLeave={(e) => { if (isDragging) finishDrag(e.clientX); }}
        >
          <div style={{ position:'relative', height:CARD_HEIGHT }}>
            <div style={{ position:'absolute', inset:0, transform:`translateX(calc(${page === 0 ? 0 : -100}% + ${page === 0 ? dragOffset : dragOffset - SLIDE_GAP}px))`, transition:isDragging ? 'none' : 'transform 0.32s cubic-bezier(.22,.8,.24,1)' }}>
              <div style={{ height:'100%', background:'rgba(255,255,255,0.97)', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', overflow:'hidden', position:'relative', boxShadow:'0 18px 48px rgba(20,20,19,0.08), 0 4px 14px rgba(20,20,19,0.04)' }}>
                <div style={{ padding:'18px 18px 16px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10, marginBottom:18 }}>
                    <div>
                      <p style={{ margin:0, fontSize:15, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px', lineHeight:'17.25px' }}>How long?</p>
                      <p style={{ margin:'6px 0 0', fontSize:11, color:'rgba(20,20,19,0.5)', fontFamily:SF, lineHeight:1.35 }}>Choose the closest fit.</p>
                    </div>
                    <div style={{ background:'rgba(20,20,19,0.06)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:20, padding:'7px 13px' }}>
                      <span style={{ fontSize:10.5, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'0.28px' }}>SWIPE</span>
                    </div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3, minmax(0,1fr))', gap:8 }}>
                    {durationRows.flat().map(item => {
                      const active = duration === item.label;
                      return (
                        <div
                          key={item.label}
                          onClick={() => { setDuration(item.label); setPage(1); }}
                          style={{ minHeight:34, padding:'8px 6px', borderRadius:20, background:active ? FIGMA_DARK_BUBBLE : 'rgba(255,255,255,0.98)', color:active ? 'white' : '#141413', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', transition:'all 0.16s ease', boxShadow:active ? '0 8px 18px rgba(20,20,19,0.16)' : 'none' }}
                        >
                          <span style={{ fontSize:11.5, fontWeight:active ? 600 : 400, fontFamily:SF, lineHeight:'14px' }}>{item.label}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ marginTop:'auto', paddingTop:18, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      {[0, 1].map((dot) => (
                        <div key={dot} onClick={() => setPage(dot)} style={{ width:dot === page ? 10 : 8, height:dot === page ? 10 : 8, borderRadius:'50%', background:dot === page ? '#141413' : 'rgba(20,20,19,0.18)', cursor:'pointer', transition:'all 0.16s ease' }} />
                      ))}
                    </div>
                    <span style={{ fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.45)', fontFamily:SF }}>Next: symptoms</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ position:'absolute', inset:0, transform:`translateX(calc(${page === 1 ? 0 : 100}% + ${page === 1 ? dragOffset : dragOffset + SLIDE_GAP}px))`, transition:isDragging ? 'none' : 'transform 0.32s cubic-bezier(.22,.8,.24,1)' }}>
              <div style={{ height:'100%', background:'rgba(255,255,255,0.97)', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', overflow:'hidden', position:'relative', boxShadow:'0 18px 48px rgba(20,20,19,0.08), 0 4px 14px rgba(20,20,19,0.04)' }}>
                <div style={{ padding:'14px 14px 12px', position:'relative', zIndex:1, display:'flex', flexDirection:'column', gap:10, height:'100%' }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:10 }}>
                    <div>
                      <p style={{ margin:0, fontSize:15, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px' }}>Where does it show up?</p>
                      <p style={{ margin:'6px 0 0', fontSize:11, color:'rgba(20,20,19,0.5)', fontFamily:SF, lineHeight:1.35 }}>Pick what fits.</p>
                    </div>
                    <div style={{ background:'rgba(20,20,19,0.06)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:20, padding:'7px 13px' }}>
                      <span style={{ fontSize:10.5, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'0.28px' }}>MULTI</span>
                    </div>
                  </div>
                  <div className="hide-scrollbar" style={{ display:'flex', flexDirection:'column', gap:10, flex:1, minHeight:0, overflowY:'auto', paddingRight:2, scrollbarWidth:'none', msOverflowStyle:'none' }}>
                    {symptomOptions.map((label) => {
                      const active = picks.includes(label);
                      return (
                        <div
                          key={label}
                          onClick={() => togglePick(label)}
                          style={{ background:active ? 'rgba(115,86,255,0.06)' : 'rgba(248,248,252,0.96)', border:active ? '1.5px solid rgba(110,80,230,0.26)' : '1px solid rgba(20,20,19,0.07)', borderRadius:20, padding:'9px 13px', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10, cursor:'pointer', transition:'all 0.16s ease' }}
                        >
                          <span style={{ fontSize:11.5, fontWeight:500, color:'#141413', fontFamily:SF, lineHeight:1.24, paddingRight:8 }}>{label}</span>
                          <div style={{ width:21, height:21, borderRadius:'50%', background:active ? 'linear-gradient(135deg,#8c6eff,#6040e0)' : 'transparent', border:active ? 'none' : '1.5px solid rgba(20,20,19,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s ease', boxShadow:active ? '0 2px 8px rgba(110,64,224,0.28)' : 'none' }}>
                            <span style={{ fontSize:10, lineHeight:1, color:active ? 'white' : 'transparent', fontWeight:700 }}>✓</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginTop:'auto' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      {[0, 1].map((dot) => (
                        <div key={dot} onClick={() => setPage(dot)} style={{ width:dot === page ? 10 : 8, height:dot === page ? 10 : 8, borderRadius:'50%', background:dot === page ? '#141413' : 'rgba(20,20,19,0.18)', cursor:'pointer', transition:'all 0.16s ease' }} />
                      ))}
                    </div>
                    <div
                      onClick={() => duration && picks.length && onComplete(duration, picks.join(' · '))}
                      style={{ display:'inline-flex', alignItems:'center', gap:8, background:duration && picks.length ? 'linear-gradient(135deg,#8c6eff,#6040e0)' : 'rgba(20,20,19,0.18)', border:'1px solid rgba(255,255,255,0.28)', borderRadius:20, padding:'8px 12px', cursor:duration && picks.length ? 'pointer' : 'default', opacity:duration && picks.length ? 1 : 0.58, transition:'all 0.18s ease', boxShadow:duration && picks.length ? '0 6px 18px rgba(110,64,224,0.30)' : 'none' }}
                    >
                      <span style={{ fontSize:11.5, fontWeight:600, color:'white', fontFamily:SF }}>Confirm</span>
                      <div style={{ width:21, height:21, borderRadius:'50%', background:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ fontSize:11, lineHeight:1, color:'#6040e0', fontWeight:700 }}>✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    function TagWidget({ options, label, onAnswer, answered, SF }) {
      const [picks, setPicks] = useState([]);
      const toggle = t => setPicks(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
      const hasInlineHelper = /\(pick any that apply\)/i.test(label || '');
      const titleText = normalizeWidgetTitle(label || 'Select what fits');
      const helperText = hasInlineHelper ? 'Choose any that apply.' : 'Choose any that apply.';
      if (answered) return (
        <div style={{ marginLeft:36, display:'flex', flexWrap:'wrap', gap:5, maxWidth:'86%', animation:'msgIn 0.25s ease-out' }}>
          {answered.split(' · ').map(t => (
            <div key={t} style={{ ...widgetAnswerPillStyle(SF), padding:'4px 10px' }}>✓ {t}</div>
          ))}
        </div>
      );
      return (
        <WidgetShell
          title={titleText}
          helper={helperText}
          badge="MULTI"
          SF={SF}
          titleCaps={true}
          centerHeader={false}
          showLeadDot={true}
          bodyMaxHeight={246}
          bodyPadding="12px 18px 0"
          headerPadding="14px 18px 11px"
          titleSize={12.5}
          titleLineHeight="15px"
          helperSize={10.5}
          helperLineHeight={1.25}
          badgePadding="6px 12px"
          badgeSize={10}
          headerMinHeight={44}
          footerPadding="10px 18px 14px"
          footer={(
            <>
              <span style={{ fontSize:11, fontWeight:700, color:'rgba(20,20,19,0.45)', fontFamily:SF }}>
                {picks.length ? `${picks.length} selected` : 'Select 1+'}
              </span>
              <div
                onClick={() => picks.length && onAnswer(picks.join(' · '))}
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:picks.length ? 'linear-gradient(135deg,#8c6eff,#6040e0)' : 'rgba(20,20,19,0.18)', border:'1px solid rgba(255,255,255,0.28)', borderRadius:20, padding:'7px 12px', cursor:picks.length ? 'pointer' : 'default', opacity:picks.length ? 1 : 0.58, transition:'all 0.18s ease', boxShadow:picks.length ? '0 6px 18px rgba(110,64,224,0.30)' : 'none' }}
              >
                <span style={{ fontSize:11.5, fontWeight:600, color:'white', fontFamily:SF }}>Confirm</span>
                <div style={{ width:21, height:21, borderRadius:'50%', background:'rgba(255,255,255,0.92)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:11, lineHeight:1, color:'#6040e0', fontWeight:700 }}>✓</span>
                </div>
              </div>
            </>
          )}
        >
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {options.map(t => {
              const active = picks.includes(t);
              return (
                <div
                  key={t}
                  onClick={() => toggle(t)}
                  style={{ padding:'8px 16px', minHeight:38, display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, ...multiSelectOptionStyle(active) }}
                >
                  <span style={{ fontSize:11.5, fontWeight:500, color:'#141413', fontFamily:SF, lineHeight:'14px', paddingRight:8 }}>{t}</span>
                  <div style={{ width:21, height:21, borderRadius:'50%', background:active ? 'linear-gradient(135deg,#8c6eff,#6040e0)' : 'transparent', border:active ? 'none' : '1.5px solid rgba(20,20,19,0.18)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all 0.15s ease', boxShadow:active ? '0 2px 8px rgba(110,64,224,0.28)' : 'none' }}>
                    <span style={{ fontSize:10, lineHeight:1, color:active ? 'white' : 'transparent', fontWeight:700 }}>✓</span>
                  </div>
                </div>
              );
            })}
          </div>
        </WidgetShell>
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
        return <div style={widgetAnswerStyle(SF)}>✓ {f?.e} {answered}</div>;
      }
      const containerWidth = width || 'min(92%, 360px)';
      return (
        <WidgetShell
          title="Intensity"
          SF={SF}
          titleCaps={false}
          maxWidth={containerWidth}
          footer={null}
          centerHeader
          showLeadDot={false}
          gradient="linear-gradient(160deg, #775fff 0%, #f0b8a0 58%, #4d556a 100%)"
          headerPadding="16px 18px 10px"
          titleSize={13.5}
          titleLineHeight="15px"
          bodyPadding="12px 18px 14px"
        >
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[opts.slice(0, 3), opts.slice(3)].map((row, rowIdx) => (
              <div key={rowIdx} style={{ display:'grid', gridTemplateColumns:`repeat(${row.length}, minmax(0, 1fr))`, gap:8 }}>
                {row.map(o => {
                  const isActive = sel === o.v;
                  const isHov = hov === o.v && !sel;
                  return (
                    <div key={o.v}
                      onClick={() => { setSel(o.v); setTimeout(() => onAnswer(o.l), 220); }}
                      onMouseEnter={() => setHov(o.v)}
                      onMouseLeave={() => setHov(null)}
                      style={{
                        minHeight:74,
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        justifyContent:'center',
                        gap:6,
                        padding:'8px 8px',
                        ...standAloneOptionStyle(isActive, {
                          border: isActive ? '1.5px solid rgba(20,20,19,0.82)' : isHov ? '1.5px solid rgba(255,255,255,0.72)' : '1px solid rgba(20,20,19,0.07)',
                          background: isActive ? FIGMA_DARK_BUBBLE : isHov ? 'rgba(255,255,255,0.98)' : 'rgba(248,248,252,0.96)',
                          borderRadius:20,
                        }),
                        transition:'all 0.18s ease',
                        transform: isActive ? 'scale(1.02)' : isHov ? 'scale(1.01)' : 'scale(1)',
                      }}>
                      <span style={{ fontSize:26, lineHeight:1, filter: isActive ? 'none' : isHov ? 'none' : 'grayscale(10%)' }}>{o.e}</span>
                      <span style={{ fontSize:10.5, fontWeight:700, color: isActive ? 'white' : 'rgba(20,20,19,0.66)', fontFamily:SF, textAlign:'center', lineHeight:1.18, letterSpacing:'0.08px' }}>{o.l}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </WidgetShell>
      );
    }

    function ChoiceWidget({ options, label, onAnswer, answered, SF, helper }) {
      const [sel, setSel] = useState(null);
      const twoCol = options.length >= 4;
      if (answered) return <div style={widgetAnswerStyle(SF)}>✓ {answered}</div>;
      return (
        <WidgetShell
          title={normalizeWidgetTitle(label || 'Choose one')}
          helper={helper || 'Pick one.'}
          badge="ONE TAP"
          SF={SF}
          titleCaps={true}
          footer={null}
          centerHeader={false}
          showLeadDot={true}
          bodyPadding="12px 18px 0"
          headerPadding="14px 18px 11px"
          titleSize={12.5}
          titleLineHeight="15px"
          helperSize={10.5}
          helperLineHeight={1.25}
          badgePadding="6px 12px"
          badgeSize={10}
          headerMinHeight={44}
        >
          <div style={{ ...STANDALONE_PANEL_STYLE, display:'grid', gridTemplateColumns: twoCol ? 'repeat(2, minmax(0, 1fr))' : '1fr', gap:8 }}>
            {options.map(o => (
              <div
                key={o}
                onClick={() => { setSel(o); setTimeout(() => onAnswer(o), 220); }}
                style={{
                  minHeight:twoCol ? 58 : 42,
                  padding:'8px 12px',
                  transition:'all 0.15s',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'space-between',
                  gap:12,
                  ...standAloneOptionStyle(sel===o),
                }}
              >
                <span style={{ fontSize:11.5, fontWeight:600, color:sel===o ? 'white' : 'rgba(20,20,19,0.78)', fontFamily:SF, lineHeight:'14px' }}>{o}</span>
                <div style={{ width:22, height:22, borderRadius:'50%', background:sel===o ? 'rgba(255,255,255,0.16)' : 'rgba(20,20,19,0.05)', border:`1px solid ${sel===o ? 'rgba(255,255,255,0.16)' : 'rgba(20,20,19,0.08)'}`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:12, fontWeight:900, color:sel===o ? 'white' : 'transparent', fontFamily:SF }}>✓</span>
                </div>
              </div>
            ))}
          </div>
        </WidgetShell>
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
      const [requestModal, setRequestModal] = useState(null);
      const APPROACH_LABEL = { structured:'Structured & tools', exploratory:'Open & exploratory', balanced:'Mixed approach' };
      return (
        <div style={{ marginLeft:36, width:'calc(100% - 36px)', display:'flex', flexDirection:'column', gap:8, animation:'msgIn 0.28s ease-out' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
            <span style={{ fontSize:10, fontWeight:800, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.55px', textTransform:'uppercase' }}>Top matches</span>
            <span style={{ fontSize:10, fontWeight:700, color:'rgba(111,94,255,0.72)', fontFamily:SF }}>Swipe across</span>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', paddingRight:18, paddingBottom:6, scrollSnapType:'x mandatory', scrollPaddingLeft:0, scrollbarWidth:'none', msOverflowStyle:'none' }}>
            {matches.map((t, idx) => {
              const THERAPIST_GRADS = [
                'linear-gradient(155deg, #7864fc 0%, #a084ff 42%, #f5b8a0 100%)',
                'linear-gradient(155deg, #5b8dff 0%, #90b4ff 48%, #d8edff 100%)',
                'linear-gradient(155deg, #22c77a 0%, #70e0b4 52%, #cdf5e4 100%)',
              ];
              const cardGrad = THERAPIST_GRADS[idx % THERAPIST_GRADS.length];
              return (
              <div key={t.id} style={{ width:260, minWidth:260, minHeight:340, background:cardGrad, borderRadius:22, padding:'20px 18px 18px', display:'flex', flexDirection:'column', flexShrink:0, scrollSnapAlign:'start', position:'relative', overflow:'hidden', transition:'all 0.2s ease' }}>
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 42%)', pointerEvents:'none' }} />
                <span style={{ position:'absolute', right:14, top:12, fontSize:20, opacity:0.5, lineHeight:1 }}>✦</span>
                {/* Badges */}
                <div style={{ display:'flex', gap:6, marginBottom:14 }}>
                  <span style={{ fontSize:9, fontWeight:800, color:'white', background:'rgba(255,255,255,0.22)', borderRadius:99, padding:'4px 9px', letterSpacing:'0.4px', textTransform:'uppercase', fontFamily:SF }}>{idx===0 ? 'Top pick' : 'Match'}</span>
                  <span style={{ fontSize:9, fontWeight:800, color:'white', background:'rgba(255,255,255,0.22)', borderRadius:99, padding:'4px 9px', letterSpacing:'0.4px', textTransform:'uppercase', fontFamily:SF }}>{idx===0 ? 'Best match' : 'Profile'}</span>
                </div>
                {/* Avatar */}
                <div style={{ width:50, height:50, borderRadius:'50%', background:'rgba(255,255,255,0.22)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:10, flexShrink:0 }}>
                  <span style={{ fontSize:18, fontWeight:800, color:'white', fontFamily:SF }}>{t.initials}</span>
                </div>
                {/* Name + title */}
                <p style={{ margin:'0 0 2px', fontSize:15, fontWeight:800, color:'white', fontFamily:SF, lineHeight:1.2 }}>{t.name}</p>
                <p style={{ margin:'0 0 12px', fontSize:10.5, color:'rgba(255,255,255,0.72)', fontFamily:SF, lineHeight:1.2 }}>{t.title}</p>
                {/* Why this fit */}
                <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.6)', letterSpacing:'0.5px', textTransform:'uppercase', fontFamily:SF }}>Why this fit</span>
                <p style={{ margin:'3px 0 4px', fontSize:13, fontWeight:800, color:'white', fontFamily:SF, lineHeight:1.2 }}>{THERAPIST_FIT_LINE(t)}</p>
                <p style={{ margin:'0 0 12px', fontSize:10.5, color:'rgba(255,255,255,0.72)', fontFamily:SF, lineHeight:1.4, flex:1, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{t.bio}</p>
                {/* Spec pills */}
                <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
                  {t.specializations.slice(0,2).map(spec => (
                    <span key={spec} style={{ fontSize:10.5, fontWeight:600, color:'white', background:'rgba(255,255,255,0.18)', borderRadius:99, padding:'5px 10px', fontFamily:SF, textTransform:'capitalize' }}>{spec}</span>
                  ))}
                  <span style={{ fontSize:10.5, fontWeight:600, color:'white', background:'rgba(255,255,255,0.18)', borderRadius:99, padding:'5px 10px', fontFamily:SF }}>{APPROACH_LABEL[t.approach]}</span>
                </div>
                {/* Avail + Wait */}
                <div style={{ display:'grid', gridTemplateColumns:'1fr 72px', gap:6, marginBottom:14 }}>
                  <div style={{ background:'rgba(255,255,255,0.14)', borderRadius:14, padding:'8px 10px' }}>
                    <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.3px', display:'block', fontFamily:SF }}>Availability</span>
                    <span style={{ fontSize:10.5, fontWeight:700, color:'white', fontFamily:SF, lineHeight:1.2, marginTop:3, display:'block' }}>{t.availability}</span>
                  </div>
                  <div style={{ background:'rgba(255,255,255,0.14)', borderRadius:14, padding:'8px 10px' }}>
                    <span style={{ fontSize:9, fontWeight:800, color:'rgba(255,255,255,0.6)', textTransform:'uppercase', letterSpacing:'0.3px', display:'block', fontFamily:SF }}>Wait</span>
                    <span style={{ fontSize:10.5, fontWeight:700, color:'white', fontFamily:SF, lineHeight:1.2, marginTop:3, display:'block' }}>{t.wait}</span>
                  </div>
                </div>
                {/* CTA */}
                <div onClick={() => { setRequested(t.id); setRequestModal({therapist:t, when:'Just now'}); }}
                  style={{ display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
                  <span style={{ fontSize:12, fontWeight:700, color:'white', fontFamily:SF, textDecoration:'underline', textUnderlineOffset:3 }}>{requested===t.id ? 'Requested ✓' : 'Request session'}</span>
                  {requested!==t.id && <span style={{ fontSize:12, color:'rgba(255,255,255,0.7)', lineHeight:1 }}>↗</span>}
                </div>
              </div>
              );
            })}
          </div>
          {requestModal && ReactDOM.createPortal(
            <div onClick={() => setRequestModal(null)} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(13,16,26,0.22)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'28px 18px', pointerEvents:'auto' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ width:'min(300px, calc(100vw - 36px))', maxWidth:'100%', background:'rgba(255,255,255,0.97)', borderRadius:30, boxShadow:'0 32px 80px rgba(20,20,19,0.20)', overflow:'hidden', position:'relative' }}>
                {/* Top accent band */}
                <div style={{ height:5, background:'linear-gradient(90deg, #39d89a, #6bb8ff)' }} />
                <div style={{ padding:'26px 22px 22px', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
                  {/* Checkmark */}
                  <div style={{ width:52, height:52, borderRadius:'50%', background:'linear-gradient(145deg, #39d89a, #20c777)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 28px rgba(34,197,94,0.26)' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12.5l5 5 9-9" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  {/* Title */}
                  <div style={{ textAlign:'center', display:'flex', flexDirection:'column', gap:4 }}>
                    <p style={{ margin:0, fontSize:19, fontWeight:800, color:'#141413', fontFamily:SF, lineHeight:1.08 }}>Request sent!</p>
                    <p style={{ margin:0, fontSize:12.5, color:'rgba(58,51,84,0.62)', fontFamily:SF, lineHeight:1.38 }}>We'll notify you when {requestModal.therapist.name.split(' ')[0]} responds</p>
                  </div>
                  {/* Therapist row */}
                  <div style={{ width:'100%', background:'rgba(20,20,19,0.04)', borderRadius:18, padding:'13px 14px', display:'flex', alignItems:'center', gap:11 }}>
                    <div style={{ width:40, height:40, borderRadius:'50%', background:'linear-gradient(145deg, rgba(52,79,171,0.88), rgba(32,48,109,0.98))', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span style={{ fontSize:15, fontWeight:800, color:'white', fontFamily:SF }}>{requestModal.therapist.initials}</span>
                    </div>
                    <div style={{ minWidth:0, flex:1 }}>
                      <p style={{ margin:0, fontSize:14, fontWeight:800, color:'#141413', fontFamily:SF, lineHeight:1.15 }}>{requestModal.therapist.name}</p>
                      <p style={{ margin:0, fontSize:11, color:'rgba(58,51,84,0.62)', fontFamily:SF, lineHeight:1.3 }}>{requestModal.therapist.title}</p>
                    </div>
                    <div style={{ background:'rgba(57,216,154,0.14)', borderRadius:10, padding:'5px 10px', flexShrink:0 }}>
                      <span style={{ fontSize:10.5, fontWeight:700, color:'#18a06a', fontFamily:SF }}>{requestModal.therapist.availability}</span>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div style={{ display:'flex', gap:9, width:'100%' }}>
                    <div onClick={() => setRequestModal(null)} style={{ flex:1, background:'#141413', borderRadius:16, padding:'13px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                      <span style={{ fontSize:13.5, fontWeight:700, color:'white', fontFamily:SF }}>Done</span>
                    </div>
                    <div onClick={() => setRequestModal(null)} style={{ flex:1, background:'rgba(20,20,19,0.06)', borderRadius:16, padding:'13px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                      <span style={{ fontSize:13.5, fontWeight:700, color:'#141413', fontFamily:SF }}>Keep browsing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
        </div>
      );
    }

    /* ── Mood Check-In Widget ── */
    function MoodCheckWidget({ SF, onSelect, answered }) {
      const moods = [
        { emoji:'😰', label:'Anxious',   bg:'#dbeafe', border:'rgba(147,197,253,0.8)' },
        { emoji:'😢', label:'Sad',       bg:'#ede9fe', border:'rgba(196,181,253,0.8)' },
        { emoji:'😩', label:'Exhausted', bg:'#f3e8ff', border:'rgba(216,180,254,0.8)' },
        { emoji:'😤', label:'Angry',     bg:'#fee2e2', border:'rgba(252,165,165,0.8)' },
        { emoji:'😐', label:'Meh',       bg:'#f1f5f9', border:'rgba(203,213,225,0.8)' },
        { emoji:'🙂', label:'Okay',      bg:'#dcfce7', border:'rgba(134,239,172,0.8)' },
        { emoji:'😊', label:'Good',      bg:'#d1fae5', border:'rgba(110,231,183,0.8)' },
        { emoji:'😄', label:'Happy',     bg:'#fef9c3', border:'rgba(253,224,71,0.7)' },
      ];
      if (answered) return <div style={widgetAnswerStyle(SF)}><span>Feeling {answered}</span></div>;
      return (
        <WidgetShell title="How are you feeling right now?" SF={SF} maxWidth="92%" titleCaps={false} titleSize={13} titleLineHeight="1.3" gradient={FIGMA_MULTI_GRADIENT} bodyPadding="12px 14px 16px">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
            {moods.map(m => (
              <button key={m.label} onClick={() => onSelect(m.label)} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:5, background:m.bg, border:`1.5px solid ${m.border}`, borderRadius:14, padding:'12px 4px 10px', cursor:'pointer', transition:'transform 0.15s ease', outline:'none' }}
                onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.94)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                onTouchStart={e => { e.currentTarget.style.transform = 'scale(0.94)'; }}
                onTouchEnd={e => { e.currentTarget.style.transform = 'scale(1)'; }}>
                <span style={{ fontSize:24, lineHeight:1 }}>{m.emoji}</span>
                <span style={{ fontFamily:SF, fontSize:10.5, fontWeight:700, color:'#141413', letterSpacing:'0.2px' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </WidgetShell>
      );
    }

    /* ── Grounding 5-4-3-2-1 Widget ── */
    function GroundingWidget({ SF, onComplete, answered }) {
      const [step, setStep] = React.useState(0);
      const steps = [
        { count:5, sense:'see',   icon:'👁️', color:'#dbeafe', darkColor:'#1d4ed8', prompt:'Look around slowly. Name 5 things you can see right now — any color, shape, or object.' },
        { count:4, sense:'touch', icon:'✋', color:'#d1fae5', darkColor:'#065f46', prompt:'Feel into your body. Notice 4 things you can physically touch or feel — texture, temperature, weight.' },
        { count:3, sense:'hear',  icon:'👂', color:'#ede9fe', darkColor:'#4c1d95', prompt:'Go quiet for a moment. What 3 sounds can you hear — near or far, loud or faint?' },
        { count:2, sense:'smell', icon:'🌿', color:'#fef9c3', darkColor:'#713f12', prompt:'Name 2 things you can smell right now — or two scents you genuinely love.' },
        { count:1, sense:'taste', icon:'🫧', color:'#fee2e2', darkColor:'#7f1d1d', prompt:'Notice just 1 thing you can taste, or the last taste you remember.' },
      ];
      if (answered) return <div style={widgetAnswerStyle(SF)}>✓ Grounding complete</div>;
      const cur = steps[step];
      const isLast = step === steps.length - 1;
      return (
        <WidgetShell title="5 · 4 · 3 · 2 · 1  Grounding" SF={SF} maxWidth="90%" gradient={FIGMA_MULTI_GRADIENT} bodyPadding="12px 16px 16px">
          <div style={{ display:'flex', gap:5, marginBottom:14 }}>
            {steps.map((s,i) => (
              <div key={i} style={{ flex:1, height:3, borderRadius:2, background: i <= step ? '#7c5cff' : 'rgba(20,20,19,0.1)', transition:'background 0.35s ease' }} />
            ))}
          </div>
          <div style={{ background:cur.color, borderRadius:16, padding:'16px 16px 14px', marginBottom:12 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
              <span style={{ fontSize:28, lineHeight:1 }}>{cur.icon}</span>
              <div>
                <p style={{ fontFamily:SF, fontSize:17, fontWeight:800, color:'#141413', margin:0, letterSpacing:'-0.3px' }}>
                  <span style={{ color:cur.darkColor }}>{cur.count}</span> things you can {cur.sense}
                </p>
                <p style={{ fontFamily:SF, fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.4)', margin:'2px 0 0', letterSpacing:'0.3px', textTransform:'uppercase' }}>
                  Step {step + 1} of {steps.length}
                </p>
              </div>
            </div>
            <p style={{ fontFamily:SF, fontSize:12.5, color:'rgba(20,20,19,0.72)', margin:0, lineHeight:1.55 }}>{cur.prompt}</p>
          </div>
          <button
            onClick={() => isLast ? onComplete() : setStep(s => s + 1)}
            style={{ width:'100%', background:'#141413', color:'white', border:'none', borderRadius:12, padding:'13px', fontFamily:SF, fontSize:13, fontWeight:700, cursor:'pointer', letterSpacing:'-0.1px' }}>
            {isLast ? 'I feel more grounded ✓' : `Found them — next →`}
          </button>
        </WidgetShell>
      );
    }

    /* ── Journal Prompt Widget ── */
    function JournalPromptWidget({ SF, onSubmit, answered }) {
      const PROMPTS = [
        "What's one thing you're carrying right now that you haven't said out loud yet?",
        "If your mood today had a color, what would it be — and why?",
        "What would feel like relief right now, even just a little?",
        "What's something kind you could say to yourself that you'd easily say to a friend in your shoes?",
        "What's one small moment today that actually felt okay — even briefly?",
        "What is your mind most reluctant to sit with right now?",
        "If you could change one thing about today, what would it be?",
      ];
      const [prompt] = React.useState(() => PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
      const [text, setText] = React.useState('');
      if (answered) return <div style={widgetAnswerStyle(SF)}>✓ Reflection shared</div>;
      const canSubmit = text.trim().length > 0;
      return (
        <WidgetShell title="Journal Prompt" SF={SF} maxWidth="91%" gradient={FIGMA_MULTI_GRADIENT} bodyPadding="12px 16px 16px">
          <div style={{ background:'rgba(122,90,248,0.07)', border:'1px solid rgba(122,90,248,0.16)', borderRadius:14, padding:'14px 15px', marginBottom:12 }}>
            <p style={{ fontFamily:SF, fontSize:13, fontWeight:600, color:'#4c32a8', margin:0, lineHeight:1.6, fontStyle:'italic' }}>"{prompt}"</p>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Write whatever comes to mind — there's no right answer here..."
            style={{ width:'100%', fontFamily:SF, fontSize:12.5, color:'#141413', background:'rgba(255,255,255,0.95)', border:'1px solid rgba(20,20,19,0.1)', borderRadius:12, padding:'11px 13px', outline:'none', resize:'none', minHeight:76, lineHeight:1.55, boxSizing:'border-box', display:'block' }}
          />
          <button
            onClick={() => canSubmit && onSubmit(text.trim())}
            style={{ width:'100%', marginTop:10, background: canSubmit ? '#141413' : 'rgba(20,20,19,0.1)', color: canSubmit ? 'white' : 'rgba(20,20,19,0.35)', border:'none', borderRadius:12, padding:'12px', fontFamily:SF, fontSize:13, fontWeight:700, cursor: canSubmit ? 'pointer' : 'default', transition:'all 0.2s ease' }}>
            Share with AI →
          </button>
        </WidgetShell>
      );
    }

    /* ── Thought Reframe Widget ── */
    function ThoughtReframeWidget({ SF, onComplete, answered }) {
      const [step, setStep] = React.useState(0);
      const [thought, setThought] = React.useState('');
      if (answered) return <div style={widgetAnswerStyle(SF)}>✓ Thought reframed</div>;
      const buildReframes = (t) => [
        `That thought — "${t}" — feels real and heavy. And also: it's a story your brain is telling you in a tough moment, not a permanent fact.`,
        `Ask yourself: what would you say to a close friend who had this exact thought? You'd probably be much kinder to them than you're being to yourself right now.`,
        `Even if part of it is true, one hard chapter doesn't define the whole story. You're in the middle of something — not at the end of it.`,
      ];
      if (step === 0) return (
        <WidgetShell title="Thought Reframe" SF={SF} maxWidth="91%" gradient={FIGMA_MULTI_GRADIENT} bodyPadding="12px 16px 16px">
          <p style={{ fontFamily:SF, fontSize:12.5, color:'rgba(20,20,19,0.6)', margin:'0 0 10px', lineHeight:1.55 }}>
            What's the thought that keeps coming back — the one that's getting loudest right now?
          </p>
          <textarea
            value={thought}
            onChange={e => setThought(e.target.value)}
            placeholder="e.g. I'm falling behind and I'll never catch up..."
            style={{ width:'100%', fontFamily:SF, fontSize:12.5, color:'#141413', background:'rgba(255,255,255,0.95)', border:'1px solid rgba(20,20,19,0.1)', borderRadius:12, padding:'11px 13px', outline:'none', resize:'none', minHeight:64, lineHeight:1.55, boxSizing:'border-box', display:'block' }}
          />
          <button
            onClick={() => thought.trim() && setStep(1)}
            style={{ width:'100%', marginTop:10, background: thought.trim() ? '#141413' : 'rgba(20,20,19,0.1)', color: thought.trim() ? 'white' : 'rgba(20,20,19,0.35)', border:'none', borderRadius:12, padding:'12px', fontFamily:SF, fontSize:13, fontWeight:700, cursor: thought.trim() ? 'pointer' : 'default', transition:'all 0.2s ease' }}>
            Reframe this thought →
          </button>
        </WidgetShell>
      );
      const rf = buildReframes(thought.trim());
      return (
        <WidgetShell title="Reframe" SF={SF} maxWidth="91%" gradient={FIGMA_MULTI_GRADIENT} bodyPadding="12px 16px 16px">
          <div style={{ background:'rgba(20,20,19,0.04)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:12, padding:'10px 13px', marginBottom:12 }}>
            <p style={{ fontFamily:SF, fontSize:10, color:'rgba(20,20,19,0.4)', margin:'0 0 4px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px' }}>The thought</p>
            <p style={{ fontFamily:SF, fontSize:12.5, color:'rgba(20,20,19,0.65)', margin:0, fontStyle:'italic', lineHeight:1.5 }}>"{thought.trim()}"</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:12 }}>
            {rf.map((r, i) => (
              <div key={i} style={{ background:'rgba(122,90,248,0.06)', border:'1px solid rgba(122,90,248,0.13)', borderRadius:12, padding:'11px 13px' }}>
                <p style={{ fontFamily:SF, fontSize:12.5, color:'#3d2e9c', margin:0, lineHeight:1.6 }}>{r}</p>
              </div>
            ))}
          </div>
          <button onClick={onComplete} style={{ width:'100%', background:'#141413', color:'white', border:'none', borderRadius:12, padding:'12px', fontFamily:SF, fontSize:13, fontWeight:700, cursor:'pointer' }}>
            That helps — thanks 💙
          </button>
        </WidgetShell>
      );
    }

    function TypeChatPage({ onBack, onBook, userName, initialTopic, moodContext, bookingMode, preService, peerChat }) {
      const SF = 'Sofia Sans,sans-serif';
      const R = UIUC_RESOURCES;
      const [input, setInput] = useState('');
      const [expandedRes, setExpandedRes] = useState(null);
      const isPeerChat = !!peerChat;

      const getPeerOpening = () => `${peerChat.name.split(' ')[0]} is here now. You can start simple — one honest sentence is enough.`;
      const getPeerChips = () => peerChat.quickReplies || [
        `Hey ${peerChat.name.split(' ')[0]}, I saw you're open to chat.`,
        "I'm not sure how to start, but I could use someone to talk to.",
        `I've been dealing with ${String(peerChat.tag || '').toLowerCase()} stuff lately.`,
        "Do you have space for a quick check-in?",
      ];
      const getPeerReply = (text, step) => {
        const lower = text.toLowerCase();
        if (/not sure|don't know|dont know|hard to explain/.test(lower)) return `That's okay. You don't need to have it organized for me. What's the part that's loudest right now?`;
        if (/anx|overthink|panic|spiral/.test(lower)) return `I get that. When my mind starts looping, the first thing that helps is naming one concrete worry instead of all of them at once. What's the one that's hitting hardest?`;
        if (/alone|lonely|isolat/.test(lower)) return `That feeling can get heavy fast. I'm here with you for a minute. Do you want to talk about what today felt like, or just have company while you vent?`;
        if (/stress|behind|deadline|school|class|exam/.test(lower)) return `That sounds like too much at once. We can shrink it. What's the next thing due, or the thing your brain keeps returning to?`;
        if (step === 0) return `Thanks for messaging me. You don't need to make it sound better than it is. I'm listening.`;
        if (step === 1) return `You're doing fine. Keep going at your own pace. Do you want support, perspective, or just space to vent?`;
        return `I'm with you. Let's stay with one piece at a time.`;
      };

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
        if (!ctx) return ["Give me a journal prompt","Do a grounding exercise","Help me reframe a thought","I've been anxious","I'm feeling overwhelmed","I just need to vent"];
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
        bookingMode ? getIntakeInitialMessages() : isPeerChat ? [{ from:'ai', text: getPeerOpening() }] : [{ from:'ai', text: getMoodOpening(moodContext) }]
      );
      const [typing, setTyping] = useState(false);
      const [chips, setChips] = useState(bookingMode ? [] : isPeerChat ? getPeerChips() : getMoodChips(moodContext));
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
            { from:'ai', text:`Thank you for sharing that — it takes something to name these things out loud 💜 How long has this been affecting your daily life?` },
            { type:'widget', _wt:'intake-duration-severity', id:'intake-duration-severity' },
          ]);
          setChips([]);
        } else if (field === 'severity') {
          setMessages(m => [...m,
            { from:'user', text:`${SCALE_EMOJI[value] || ''} ${value}` },
            { from:'ai', text:`I hear you — that gives me a clearer picture. Have you worked with a therapist or counselor before?` },
            { type:'widget', _wt:'intake-choice', id:'intake-therapyHistory', intakeField:'therapyHistory',
              label:'Therapy history',
              helper:'Choose the closest fit.',
              options:["Yes, I have","No, this would be my first time","Briefly, once or twice"] },
          ]);
          setChips([]);
        } else if (field === 'therapyHistory') {
          const hadTherapy = value !== "No, this would be my first time";
          if (hadTherapy) {
            setMessages(m => [...m,
              { from:'user', text: value },
              { from:'ai', text:`That's useful context 💜 Looking back on those sessions — what do you remember as being most helpful?` },
              { type:'widget', _wt:'intake-tags', id:'intake-pastHelpful', intakeField:'pastHelpful',
                label:'What helped most?',
                options:["Just being heard","Practical coping tools","Understanding my patterns","Processing specific events","Homework & exercises","Nothing really clicked"] },
            ]);
          } else {
            setMessages(m => [...m,
              { from:'user', text: value },
              { from:'ai', text:`That's completely fine — there's no wrong starting point 💙 What are you hoping therapy might give you?` },
              { type:'widget', _wt:'intake-tags', id:'intake-goals', intakeField:'goals',
                label:"What are you hoping for?",
                options:["Learn practical coping tools","Process feelings in depth","Work on specific goals","Understand myself better","Improve my relationships","Just consistent support","Not sure yet"] },
            ]);
          }
          setChips([]);
        } else if (field === 'pastHelpful') {
          setMessages(m => [...m,
            { from:'user', text: value.split(' · ').join(', ') },
            { from:'ai', text:`That's really helpful — I'll factor that into your match. What are you hoping therapy gives you this time around?` },
            { type:'widget', _wt:'intake-tags', id:'intake-goals', intakeField:'goals',
              label:"What are you hoping for?",
              options:["Learn practical coping tools","Process feelings in depth","Work on specific goals","Understand myself better","Improve my relationships","Just consistent support","Not sure yet"] },
          ]);
          setChips([]);
        } else if (field === 'goals') {
          setMessages(m => [...m,
            { from:'user', text: value.split(' · ').join(', ') },
            { from:'ai', text:`Almost done — just two quick preferences. Do you have a preference for your therapist's gender?` },
            { type:'widget', _wt:'intake-choice', id:'intake-genderPref', intakeField:'genderPref',
              label:'Therapist preference',
              helper:'Optional, but helpful for matching.',
              options:["No preference","Woman","Man","Non-binary"] },
          ]);
          setChips([]);
        } else if (field === 'genderPref') {
          setMessages(m => [...m,
            { from:'user', text: value },
            { from:'ai', text:`And last one — what kind of therapy style tends to feel most comfortable to you?` },
            { type:'widget', _wt:'intake-choice', id:'intake-approachPref', intakeField:'approachPref',
              label:'Therapy style',
              helper:'Pick the one that feels most natural.',
              options:["Structured & practical (CBT / tools)","Open & exploratory (just talk)","A mix of both","Not sure"] },
          ]);
          setChips([]);
        } else if (field === 'approachPref') {
          const matches = matchTherapists({ ...updated });
          setMessages(m => [...m,
            { from:'user', text: value },
            { from:'ai', text:`Based on everything you've shared, here are your top three matches 💜 Each one has been selected specifically for what you're going through — not just a general list.` },
            { type:'widget', _wt:'intake-match', id:'intake-match', matches },
          ]);
          setChips(["Tell me more about one of them","I have more questions","Thanks, I'll reach out directly"]);
        }
      };

      const completeDurationSeverity = (durationValue, severityValue, widgetId) => {
        setWidgetAnswers(prev => ({ ...prev, [widgetId]: `${durationValue} · ${severityValue}` }));
        const updated = { ...intakeData, duration:durationValue, severity:severityValue };
        setIntakeData(updated);
        setMessages(m => [...m,
          { from:'user', text: durationValue },
          { from:'user', text:`${SCALE_EMOJI[severityValue] || ''} ${severityValue}` },
          { from:'ai', text:`Got it. Have you worked with a therapist or counselor before?` },
          { type:'widget', _wt:'intake-choice', id:'intake-therapyHistory', intakeField:'therapyHistory',
            label:'Therapy history',
            helper:'Choose the closest fit.',
            options:["Yes, I have","No, this would be my first time","Briefly, once or twice"] },
        ]);
        setChips([]);
      };

      const AI_AVATAR = isPeerChat ? (
        <div style={{ width:26, height:26, borderRadius:13, background:peerChat.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginBottom:2, boxShadow:'0 4px 12px rgba(20,20,19,0.12)', position:'relative' }}>
          <span style={{ fontSize:11, fontWeight:800, color:'rgba(20,20,19,0.44)', fontFamily:SF }}>{peerChat.initial}</span>
          <div style={{ position:'absolute', right:-1, bottom:-1, width:8, height:8, borderRadius:4, background:peerChat.status === 'Online now' ? '#2ecc71' : '#c7cbd4', border:'1.5px solid white' }} />
        </div>
      ) : (
        <div style={{ width:26, height:26, borderRadius:13, background:'radial-gradient(circle at 35% 30%, #ffffff 0%, #d8c7ff 20%, #8f7cff 52%, #5bcdf6 100%)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginBottom:2, boxShadow:'0 4px 12px rgba(111,95,255,0.22)' }}>
          <div style={{ width:8, height:8, borderRadius:'50%', background:'rgba(255,255,255,0.95)', filter:'blur(0.2px)' }} />
        </div>
      );

      /* Phase 1 — listen, empathise, ask a follow-up (no resources yet) */
      const LISTEN = {
        crisis:      { text: `I'm really glad you said something — that wasn't easy to type, and it matters 💙 I'm right here with you. Can you tell me a little more about where you're at right now? Even just a few words — whatever feels safe.`, chips: ["I'm having really dark thoughts","I'm not in immediate danger","I just needed to tell someone","I honestly don't know how to explain it"] },
        anxiety:     { text: `That sounds genuinely exhausting — anxiety has a way of making everything feel louder and closer than it actually is. How long has it been showing up like this for you, ${userName}?`, widget:{ type:'anxiety-swipe' }, chips: ["It's been building for a while","Something specific happened","It just hit me out of nowhere","Honestly, I don't know"] },
        overwhelmed: { text: `Ugh — carrying that much at once is exhausting. It doesn't mean you're falling apart, ${userName}, it means there's genuinely a lot pressing on you right now. What's the thing that feels most heavy?`, widget:{ type:'tags', label:"What's weighing on you most?", options:["Exams & deadlines","Coursework load","Friendship issues","Romantic stress","Family pressure","Finances","Identity & belonging","Everything at once","Can't even pinpoint it"] }, chips: ["School and deadlines","Literally everything at once","My social life is a mess","I just can't sleep"] },
        lonely:      { text: `Loneliness in a place full of people is honestly one of the more disorienting feelings there is — you're surrounded, and still feel completely alone. How has it been showing up for you lately, ${userName}?`, widget:{ type:'tags', label:"How does it show up?", options:["Missing real connection","No one truly gets me","Drifted from friends","New here, know no one","Left out of things","Surrounded by people but alone","Just numb inside","Cultural or identity disconnect"] }, chips: ["I miss feeling close to people","No one really gets me","I've drifted from my friends","I just moved here and know no one"] },
        sleep:       { text: `When sleep goes, everything gets harder — your focus, your mood, how you feel about yourself. I'm glad you mentioned it. What's been getting in the way most, ${userName}?`, widget:{ type:'tags', label:"What gets in the way?", options:["Mind racing at night","Anxiety before bed","Doom-scrolling too late","Irregular schedule","Waking up in the night","Nightmares","Just can't wind down","Stress about finances or family"] }, chips: ["My mind won't shut off","I'm stressed about too many things","My sleep schedule is just broken","I feel anxious before bed"] },
        academic:    { text: `That kind of academic pressure has a way of quietly turning into something much heavier. Are you feeling behind on things, ${userName}, or is it more of a dread about what's coming up?`, widget:{ type:'tags', label:"What's the pressure about?", options:["Behind on coursework","Scared of failing","A specific exam","A difficult professor","Can't focus at all","Lost motivation","Imposter syndrome","Financial pressure too","Juggling too much"] }, chips: ["I'm so far behind","I'm scared of failing","I can't focus at all","I just don't care about anything anymore"] },
        grief:       { text: `I'm really sorry, ${userName}. Loss is one of those things that doesn't follow a script — it shows up when you don't expect it and looks different every time. How has it been landing for you lately?`, widget:{ type:'tags', label:"How has it been showing up?", options:["Waves of sadness","Hard to concentrate","Feeling numb or empty","Withdrawing from people","Guilt or regret","Physical exhaustion","Random moments of grief","Anger mixed in"] }, chips: ["It hits me at random moments","I feel numb most of the time","I've been withdrawing from people","I don't know how to process it"] },
        relationship:{ text: `Relationship stuff is hard in a particular way — it's personal, and it follows you into every other part of your day. What's been sitting heaviest in this for you, ${userName}?`, widget:{ type:'tags', label:"What's at the core?", options:["Conflict with someone close","A breakup or distance","Trust was broken","I feel unseen or unheard","Loneliness in the relationship","Family tension","Friendship falling apart","Not sure how to repair it"] }, chips: ["There's been a lot of conflict","Someone hurt me","I feel really disconnected","I don't know how to fix it"] },
        financial:   { text: `Financial stress is one of those things that creeps into absolutely everything — focus, sleep, how you feel walking into class. You don't have to manage it alone. What's the part that's weighing on you most, ${userName}?`, widget:{ type:'tags', label:"What's the biggest pressure?", options:["Tuition & fees","Rent or housing","Food insecurity","Running out of aid","Can't focus on school","Shame or embarrassment","Supporting family too","Not sure what help exists"] }, chips: ["I'm running low on funds","I'm not sure what help is available","It's affecting my ability to focus","I'm stressed about next semester"] },
        identity:    { text: `Figuring out who you are — while also being at a huge university with all its pressures — is genuinely a lot. You're not alone in feeling that way. What's been on your mind most, ${userName}?`, widget:{ type:'tags', label:"What's at the heart of it?", options:["Feeling like I don't belong","Cultural or racial identity","LGBTQ+ identity","First-gen college experience","Religious or values conflict","Pressure from family","Feeling unseen on campus","Imposter syndrome"] }, chips: ["I feel like I don't fit in here","My identity feels invisible","Family and campus feel worlds apart","I'm figuring out who I am"] },
        resources:   { text: `Of course — I know UIUC has a lot of options and it can be hard to know where to start. Before I point you somewhere, ${userName}, can you give me a word or two about what's going on? Even vague is fine.`, widget:{ type:'tags', label:"What's going on?", options:["Anxiety or stress","Feeling overwhelmed","Loneliness","Sleep issues","Academic pressure","Financial stress","A crisis","Identity & belonging","Not sure"] }, chips: ["I'm feeling anxious","I'm overwhelmed","I might need to talk to someone","It's a crisis"] },
        caps:        { text: `CAPS is a really solid option — I'm glad you're thinking about it 💜 What kind of support are you hoping for, ${userName}? That'll help me give you a clearer picture of what to expect.`, widget:{ type:'tags', label:"What are you hoping for?", options:["Someone to talk to","Ongoing therapy","A one-time check-in","Medication support","Not sure yet","Something urgent"] }, chips: ["I want to book an appointment","I'm not sure if I need therapy","I want to talk to someone first","It feels urgent"] },
        better:      { text: `That's genuinely good to hear — I mean it 💜 What shifted for you, even a little? I'm curious.`, chips: ["I talked to someone","Things just got a bit lighter","I needed to vent and it helped","I'm not sure, but thanks"] },
        draft:       { text: `Of course — happy to help you find the right words 💙 Quick question before I write anything: is this someone close to you, or more of an acquaintance you want to reconnect with? And do they know you've been going through something, or would this be news to them?`, chips: ["Close friend, they don't know yet","Close friend, they already know a bit","More of an acquaintance","Family member"] },
        grounding:   { text: `Let's do it. The 5-4-3-2-1 technique pulls your attention out of your head and into the room around you — it's short, and it actually works. Take one slow breath first, then follow the steps at your own pace.`, widget:{ type:'grounding' }, chips:[] },
        journal:     { text: `Journaling can untangle things you didn't realize were knotted. Even a few honest sentences can shift something. Here's a prompt — write as little or as much as feels right.`, widget:{ type:'journal-prompt' }, chips:[] },
        reframe:     { text: `Our thoughts aren't always facts — even when they feel completely convincing. Let's look at one differently. What's the thought that keeps coming back loudest?`, widget:{ type:'thought-reframe' }, chips:[] },
        checkin:     { text: `Of course — let's start there. I'm not going to overthink whatever you share, I just want to meet you where you actually are right now.`, widget:{ type:'mood-check' }, chips:[] },
        default:     { text: `I hear you, and I appreciate you trusting me with this 💙 Just so I understand a bit better — how intense does it usually get on a day-to-day basis?`, widget:{ type:'scale' }, chips: ["It affects my sleep","It's hard to focus on anything","I isolate myself","I just feel really numb"] },
      };

      /* Phase 2 — dig deeper, one specific follow-up before resources */
      const DEEPEN = {
        crisis:      { text: `I'm right here, ${userName} — you don't need to have the right words for this. I just want to understand where you're at. Are you somewhere safe right now?`, chips: ["Yes, I'm safe right now","I'm home but struggling","I'm not sure how I feel","I need help right now"] },
        anxiety:     { text: `When it hits — does the anxiety tend to stay in your head, like thoughts spiraling and looping? Or does it go physical too, like your chest gets tight or you feel like you can't sit still?`, widget:{ type:'tags', label:'Where does it show up?', options:["Racing, looping thoughts","Tight chest or shallow breath","Restless — can't sit still","Hard to focus on anything","Sudden dread for no reason","Trouble sleeping too","All of the above, honestly"] }, chips: ["Mostly in my head — thoughts spiral","Physical — chest, stomach, restless","Both at the same time","It's hard to put into words"] },
        overwhelmed: { text: `When everything piles up like this — do you tend to shut down and go quiet, or does it come out more as that restless "can't think straight, can't start anything" kind of stuck feeling?`, chips: ["I shut down and go numb","I get anxious and can't settle","Both, depending on the day","I honestly don't know anymore"] },
        lonely:      { text: `Is there someone specific you're wishing you felt closer to — or is it more of a general ache, like something meaningful is just missing from your days?`, chips: ["There is someone specific","More of a general feeling","I've kind of stopped trying","I'm not sure what I even need"] },
        sleep:       { text: `When you're lying there and it's not working — what tends to take over? A specific worry that won't leave, or more like your brain just refuses to settle even when nothing in particular is wrong?`, chips: ["A specific worry I can't shake","Replaying things from the day","Nothing specific — mind just races","More physical — body just can't relax"] },
        academic:    { text: `When you imagine things going badly — what's the piece that scares you most, ${userName}? The grade itself, or something that comes with it?`, chips: ["Failing a class or exam","Disappointing my family","Losing a scholarship or opportunity","I just can't see a way forward"] },
        grief:       { text: `Has it been landing more as a kind of constant heaviness — like a weight that doesn't fully lift? Or more like it comes in waves, when you're not expecting it?`, chips: ["More like a constant weight","It hits me in waves","Some days are fine, then it floods back","I've been trying not to feel it"] },
        relationship:{ text: `When you sit with it — is there still a part of you hoping things can shift? Or does it feel more like you're trying to find a way through or past it?`, chips: ["I still hope things can change","I think I need to let go","I'm somewhere in the middle","I just need to process it"] },
        financial:   { text: `Has the financial stress been getting into your daily focus and sleep — or is it more of a low hum in the background that's always kind of there?`, chips: ["It's affecting my focus a lot","More of a background stress","It wakes me up at night","All of the above, honestly"] },
        identity:    { text: `Has this been building slowly over time — or did something happen recently that kind of brought it all to the surface for you?`, chips: ["It's been building for a long time","Something specific happened recently","It comes and goes","I'm not sure when it started"] },
        resources:   { text: `Before I share what's out there — is there something specific going on, or are you more just getting familiar with your options?`, chips: ["Something specific is going on","I just want to know my options","It's for a friend actually","I think I might need therapy"] },
        caps:        { text: `What's pulling you toward CAPS, ${userName} — has something been going on, or is it more of a "just in case I ever need it" kind of feeling?`, chips: ["Something has been going on","I've been struggling for a while","More of a 'just in case'","I'd rather start with Let's Talk"] },
        better:      { text: `Really glad to hear that 💜 Do you feel like you have enough support around you to hold onto that — or does it still feel a bit fragile?`, chips: ["I think I do have support","It feels a bit fragile","Not sure — it could shift","I just needed to get it out"] },
        draft:       { text: `Got it — here's a draft you can use as-is or tweak however feels right:\n\n"Hey, I've been wanting to reach out. I've been dealing with some anxiety and overthinking lately, and honestly, talking to someone I trust would mean a lot. No pressure at all — just wanted you to know what's been going on. 💙"\n\nWant me to make it shorter, more casual, or add something specific?`, chips: ["Make it shorter","More casual / less heavy","Add that I'd love to meet up","Write a different version"] },
        default:     { text: `When you're right in the middle of it — does it feel more like a heavy weight you're carrying (numb, withdrawn, hard to care), or more like anxious restlessness that you can't shake?`, widget:{ type:'tags', label:'How does it tend to feel?', options:["Heavy, numb, withdrawn","Anxious and restless","Sad, like something is missing","Angry or frustrated","Empty — like nothing matters","It shifts all the time"] }, chips: ["Heavy and numb","Anxious and on edge","Sad and withdrawn","It shifts constantly"] },
      };

      /* ── Smart resource picker: uses intent + intensity + duration + collected tags ── */
      const pickResources = (intent, intensity, wAnswers) => {
        const isHigh    = ['Intense','Overwhelming'].includes(intensity);
        const isMid     = ['Moderate','Noticeable'].includes(intensity);
        const allVals   = Object.values(wAnswers || {}).join(' ').toLowerCase();
        const duration  = Object.values(wAnswers || {}).find(v =>
          ['Just today','A few days','About a week','2–3 weeks','Over a month','A long time'].includes(v));
        const isLong    = ['Over a month','A long time','2–3 weeks'].includes(duration);
        const isShort   = ['Just today','A few days'].includes(duration);
        const hasSleep  = /sleep|insomnia/.test(allVals);
        const hasLGBTQ  = /lgbtq|queer|trans/.test(allVals);
        const hasIntl   = /international|cultural|new (here|country)/.test(allVals);
        const hasFinance= /financ|money|rent|tuition|food|housing/.test(allVals);
        const hasSocial = /alone|lonely|friend|connection|disconnect/.test(allVals);
        const hasSomatic= /chest|breath|restless|physical/.test(allVals);

        switch (intent) {
          case 'crisis':
            return [R.crisis, R.text741, R.rosecrance, R.reach];
          case 'anxiety':
            if (isHigh || isLong) return [R.caps, R.letsTalk, R.breathing, hasSomatic ? R.mckinley : R.workshops, R.welltrack];
            if (isShort && !isMid) return [R.breathing, R.welltrack, R.letsTalk, R.caps];
            return [R.caps, R.letsTalk, R.breathing, R.welltrack];
          case 'overwhelmed': {
            const base = isHigh ? [R.caps, R.letsTalk, R.embeddedCounseling] : [R.caps, R.letsTalk];
            if (hasFinance) base.push(R.financialWellness); else base.push(R.odos);
            if (hasSleep)   base.push(R.mckinley); else base.push(R.welltrack);
            return base.slice(0, 5);
          }
          case 'lonely':
            return hasSocial ? [R.resilience, R.groupCounseling, R.talkCampus, R.caps]
                              : [R.resilience, R.talkCampus, R.groupCounseling, R.caps];
          case 'sleep':
            return [R.mckinley, R.caps, R.breathing, R.welltrack];
          case 'academic': {
            const aRes = [R.odos, R.workshops, R.caps];
            if (hasFinance) aRes.push(R.financialWellness); else aRes.push(R.letsTalk);
            return aRes;
          }
          case 'grief':
            return [R.griefSupport, R.groupCounseling, R.caps, R.welltrack];
          case 'relationship':
            return [R.caps, R.letsTalk, R.groupCounseling, R.resilience];
          case 'financial':
            return [R.financialWellness, R.odos, R.caps, R.letsTalk];
          case 'identity': {
            const iRes = [];
            if (hasLGBTQ) iRes.push(R.safeZone);
            iRes.push(R.communityAdvocacy);
            if (hasIntl) iRes.push(R.intlStudent);
            iRes.push(R.caps);
            return iRes.slice(0, 4);
          }
          case 'resources':
            return [R.caps, R.letsTalk, R.mckinley, R.resilience, R.welltrack, R.talkCampus];
          case 'caps':
            return [R.caps, R.letsTalk, R.embeddedCounseling, R.mckinley];
          case 'better':
            return [R.welltrack, R.talkCampus];
          default:
            return isHigh ? [R.caps, R.letsTalk, R.crisis, R.welltrack]
                          : [R.caps, R.letsTalk, R.resilience, R.welltrack];
        }
      };

      /* Phase 3 — gentle resource suggestion, personalized based on intensity + context */
      const buildSupport = (intensity) => {
        const isHigh = ['Intense','Overwhelming'].includes(intensity);
        const isLong = ['Over a month','A long time','2–3 weeks'].includes(
          Object.values(widgetAnswers).find(v =>
            ['Just today','A few days','About a week','2–3 weeks','Over a month','A long time'].includes(v)));
        return {
          crisis:      { text: `Thank you for trusting me with this, ${userName} — it means something 💙 Right now, there are real people ready to pick up — trained, non-judgmental, completely confidential. You don't need to be "in danger enough." Struggling is enough.`, resources: pickResources('crisis', intensity, widgetAnswers), chips:["How do I call 988?","Tell me about CAPS","I'm not sure I'm ready yet"] },
          anxiety:     { text: isHigh || isLong
            ? `What you're carrying sounds genuinely heavy, ${userName} — this has been going on a while and it deserves real support, not just coping tips. CAPS offers free therapy and urgent same-day appointments. The breathing exercise is also worth trying right now.`
            : `What you're describing is real — anxiety at this level is draining even when it doesn't look like much from the outside. CAPS has counselors who specialize in this, and there are a few self-help tools worth trying today too.`, resources: pickResources('anxiety', intensity, widgetAnswers), chips:["How do I book CAPS?","What is Let's Talk?","Show me the breathing exercise"] },
          overwhelmed: { text: isHigh
            ? `You've been holding too much for too long, ${userName}. When it gets this heavy, the best thing you can do is get some real support — not push through alone. CAPS and Let's Talk are both free, no insurance, no paperwork.`
            : `That "everything at once" weight is real, and carrying it alone makes it so much heavier. There are people at UIUC whose whole job is exactly this — and it's free to start.`, resources: pickResources('overwhelmed', intensity, widgetAnswers), chips:["What is Let's Talk?","I need an academic extension","How do I reach CAPS?"] },
          lonely:      { text: `Connection is a real need — not a luxury, not a weakness 💙 Resilience pairs you with a peer coach who's actually been through similar things. TalkCampus lets you reach someone any time of night. And CAPS group counseling can be surprisingly powerful for exactly this feeling.`, resources: pickResources('lonely', intensity, widgetAnswers), chips:["Tell me more about Resilience","What is TalkCampus?","I'd rather talk to a counselor"] },
          sleep:       { text: `Sleep and mental health are genuinely inseparable — when one suffers, so does the other. McKinley's clinical team can address the physical side. CAPS can work on whatever's underneath. And the breathing exercise is worth trying before bed tonight.`, resources: pickResources('sleep', intensity, widgetAnswers), chips:["How do I reach McKinley?","I think it's anxiety underneath","Show me the breathing exercise"] },
          academic:    { text: `You don't have to keep pushing through this on your own, ${userName} 💙 The Dean of Students can give you real breathing room with extensions and accommodations. CAPS workshops on test anxiety and perfectionism are free and low-commitment. And if finances are part of the pressure, there's help for that too.`, resources: pickResources('academic', intensity, widgetAnswers), chips:["I need an accommodation","Tell me about CAPS workshops","What is financial wellness counseling?"] },
          grief:       { text: `Grief doesn't have a schedule, and it doesn't need to make sense right now 🕊️ CAPS has counselors who specifically work with loss — individual sessions and group support. There's no timeline you need to follow. WellTrack also has self-paced grief modules if you want something quiet and on your own terms.`, resources: pickResources('grief', intensity, widgetAnswers), chips:["Tell me about grief support at CAPS","What is group counseling like?","Where do I start?"] },
          relationship:{ text: `Relationship pain follows you everywhere — into class, into sleep, into everything. It's worth getting support for, ${userName} 💙 Sometimes just talking it through with someone neutral helps you see things differently. CAPS counselors work with this every day.`, resources: pickResources('relationship', intensity, widgetAnswers), chips:["How do I book CAPS?","What is Let's Talk?","Tell me about group counseling"] },
          financial:   { text: `Financial stress is one of the most common reasons students quietly fall apart — and one of the least talked about 💙 There are emergency funds and aid options you might not know exist at UIUC. And the Dean of Students can help create some academic breathing room while things stabilize.`, resources: pickResources('financial', intensity, widgetAnswers), chips:["Tell me about emergency funds","I need an academic extension","I want to talk to someone about this"] },
          identity:    { text: `You're not alone in feeling this, and you belong here — even when it doesn't feel that way 💙 There are people at UIUC who genuinely understand what it's like to navigate identity in this environment. CAPS is LGBTQ+ affirming and culturally sensitive.`, resources: pickResources('identity', intensity, widgetAnswers), chips:["Tell me about Multicultural Affairs","What is SafeZone?","I'd like to talk to a counselor"] },
          resources:   { text: `Here's what UIUC has, ${userName} 💙 Everything here is free and confidential — no insurance, no paperwork required to get started. Let me know if you want more detail on any of them.`, resources: pickResources('resources', intensity, widgetAnswers), chips:["I need crisis support now","Tell me about Let's Talk","How do I book CAPS?"] },
          caps:        { text: `CAPS is free for all UIUC students — no insurance, no referral needed 💜 You can call or book online. Let's Talk is even lower commitment: a free 15-minute chat with a counselor embedded right in your college. McKinley handles the psychiatric side if that's more what you need.`, resources: pickResources('caps', intensity, widgetAnswers), chips:["What's the difference between CAPS and McKinley?","I need crisis support","Thanks, I feel better"] },
          better:      { text: `That's genuinely wonderful to hear 💜 Checking in with yourself like this matters more than most people realize. Come back any time — even just to talk. WellTrack is also a good way to keep an eye on how you're doing day to day.`, resources: pickResources('better', intensity, widgetAnswers), chips:["Show me UIUC resources","One more thing…","Take care, bye!"] },
          draft:       { text: `Here are a couple of versions — pick whichever feels most like you:\n\n**Short & simple:**\n"Hey, been meaning to reach out. I've been going through some anxiety stuff and I'd really love to talk if you're open to it. 💙"\n\n**A bit more open:**\n"Hey — I've been dealing with a lot of anxiety and overthinking lately, and I think talking to you would genuinely help. No pressure, just wanted to be honest about what's been going on."\n\nWant me to tweak the tone, length, or add anything specific?`, chips:["Make it even shorter","More casual — less intense","Add a specific ask (call/coffee)","Write something totally different"] },
          default:     { text: isHigh
            ? `I hear you, ${userName}, and what you've shared sounds genuinely heavy 💙 You don't have to carry this alone — there are people at UIUC trained for exactly this, free and confidential, no paperwork needed.`
            : `Thank you for sharing this with me, ${userName} 💙 What you're feeling is real, and there's support available whenever you're ready. You don't have to figure it out on your own.`, resources: pickResources('default', intensity, widgetAnswers), chips:["Show me all UIUC resources","I'd like to talk to someone","I just needed to vent, thanks"] },
        };
      };

      const detectIntent = (text) => {
        const t = text.toLowerCase();
        if (/crisis|suicid|hurt.{0,6}self|end (my|it all)|can't (go on|take it)|emergency|dark thought|not (want|safe|okay)/.test(t)) return 'crisis';
        if (/draft|write.{0,10}(message|text|note)|what.{0,10}(say|tell|text)|how.{0,10}reach out|first.{0,10}message|message.{0,10}to (him|her|them|my|a )|reach out to|help me (text|tell|say)|start.{0,10}conversation/.test(t)) return 'draft';
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
        if (/ground(ing)?|5.?4.?3.?2.?1|anchor|sensory|calm.{0,8}down/.test(t)) return 'grounding';
        if (/journal|writing.{0,8}prompt|give.{0,8}prompt|reflect|want to write|i.{0,6}write/.test(t)) return 'journal';
        if (/reframe|stuck.{0,8}thought|negative.{0,8}thought|thought.{0,8}(stuck|loop)|spiral.{0,8}thought|help me think|cbt/.test(t)) return 'reframe';
        if (/check.?in|how (am i|are you)|mood check|quick check|how do i feel/.test(t)) return 'checkin';
        if (/\b(better|good|great|thank|helped?|feel better|lighter)\b/.test(t)) return 'better';
        return 'default';
      };

      const answerWidget = (id, text) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: text }));
        sendMessage(text);
      };

      const answerMoodCheck = (id, moodLabel) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: moodLabel }));
        setMessages(m => [...m, { from:'user', text: moodLabel }]);
        setTyping(true);
        const MOOD_REPLIES = {
          Anxious:   `Hey ${userName} 💙 Anxiety is exhausting — especially when it just sits there without anything clear to attach it to. What's been making it loudest lately?`,
          Sad:       `Hey ${userName} 💜 Sadness doesn't always need a reason to show up — sometimes it just does. What's been weighing on you most?`,
          Angry:     `Hey ${userName} — anger usually means something felt unfair or out of control. Often both at once. What's been getting under your skin?`,
          Exhausted: `Running on empty is genuinely hard, and it bleeds into everything else. What's been draining you most lately, ${userName}?`,
          Meh:       `"Meh" is actually one of the harder ones — nothing's catastrophic, but nothing feels right either. What's underneath that flatness for you today, ${userName}?`,
          Okay:      `Okay is a completely valid place to start from 💙 What brought you to the chat today, ${userName}?`,
          Good:      `Really glad to hear that 💚 What's been going well? Naming it actually helps it stick.`,
          Happy:     `Love that for you, ${userName} ✨ What's been making things feel good lately?`,
        };
        const reply = MOOD_REPLIES[moodLabel] || `Thanks for sharing that, ${userName} 💙 What's been on your mind today?`;
        setTimeout(() => {
          setTyping(false);
          setMessages(m => [...m, { from:'ai', text: reply }]);
          const anxious = ['Anxious','Sad','Angry','Exhausted','Meh'];
          setChips(anxious.includes(moodLabel)
            ? ["It's been building for a while","Something specific happened","I just needed to say it","I'm not sure what I need"]
            : ["Things have been going well","Just checking in 💜","I wanted to share something","One thing still feels off"]);
        }, 900);
      };

      const completeGrounding = (id) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: 'complete' }));
        setMessages(m => [...m,
          { from:'user', text:'✓ Completed all 5 steps' },
          { from:'ai', text:`That took real presence — and that matters 💙 Even a minute of intentional attention can shift your nervous system. How are you feeling compared to when we started? Even a tiny difference counts.` },
        ]);
        setChips(["A bit calmer, actually","Still pretty anxious","Not much changed yet","That actually helped — what else can I try?"]);
      };

      const submitJournal = (id, text) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: 'complete' }));
        const preview = text.split(' ').slice(0, 8).join(' ');
        setMessages(m => [...m,
          { from:'user', text },
          { from:'ai', text:`Thank you for writing that — really 💙 There's something in what you shared. "${preview}${text.split(' ').length > 8 ? '...' : ''}" — what does sitting with that feel like right now?` },
        ]);
        setChips(["Still pretty heavy","A bit lighter, actually","I don't know — I just needed to say it","Can we keep talking?"]);
      };

      const completeReframe = (id) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: 'complete' }));
        setMessages(m => [...m,
          { from:'user', text:'That helps — thanks 💙' },
          { from:'ai', text:`Reframing doesn't erase the thought — but it creates a little space around it. And that space is where things start to shift 💙 Is there more you want to talk through, or would it help to see some support options?` },
        ]);
        setChips(["Yes, there's more on my mind","Can we do another one?","I'd like to see what support exists","That's what I needed, thanks"]);
      };

      const completeAnxietySwipe = (durationValue, symptomValue, widgetId) => {
        const updatedAnswers = { ...widgetAnswers, [widgetId]: `${durationValue} · ${symptomValue}`, _duration: durationValue, _symptoms: symptomValue };
        setWidgetAnswers(updatedAnswers);
        setTurn((prev) => Math.max(prev, 3));
        setLastIntent('anxiety');
        // Pass duration/symptoms into resource picker for smarter matching
        const intensity = Object.values(widgetAnswers).find(v =>
          ['Mild','Noticeable','Moderate','Intense','Overwhelming'].includes(v));
        const anxietySupport = buildSupport(intensity).anxiety;
        const smartResources = pickResources('anxiety', intensity, updatedAnswers);
        setMessages(m => [
          ...m,
          { from:'user', text: durationValue },
          { from:'user', text: symptomValue.split(' · ')[0] },
          { from:'ai', text: anxietySupport.text },
          ...smartResources.map((res, idx) => {
            const resKey = Object.entries(R).find(([,v]) => v === res)?.[0];
            return { type:'resource', res, resKey, priorityIndex: idx };
          }),
        ]);
        setChips(anxietySupport.chips);
      };

      const sendMessage = (textOverride) => {
        const text = (textOverride || input).trim();
        if (!text) return;

        if (isPeerChat) {
          const newTurn = turn + 1;
          setTurn(newTurn);
          setMessages(m => [...m, { from:'user', text }]);
          setInput('');
          setTyping(true);
          const nextReply = getPeerReply(text, turn);
          setTimeout(() => {
            setTyping(false);
            setMessages(m => [...m, { from:'ai', text: nextReply }]);
            setChips(newTurn < 2 ? [
              "That makes sense.",
              "I mostly need to vent.",
              "Can I tell you what happened today?",
              "I'm having a hard time slowing my brain down.",
            ] : [
              "I think I need perspective.",
              "Mostly I just want to be heard.",
              "Can we stay with one part of it?",
              "Thanks for making this easier to say.",
            ]);
          }, text.length < 24 ? 700 : 1100);
          return;
        }

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
        const isToolIntent = ['grounding','journal','reframe','checkin'].includes(intent);
        const useSupport = !isToolIntent && (isCrisis || wantsResources || newTurn >= 3);
        const useDeepen  = !useSupport && !isToolIntent && newTurn === 2;
        const threadIntent = isToolIntent ? intent : (useDeepen || useSupport) ? (lastIntent || intent) : intent;
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
            ...(resp.resources || []).map((res, idx) => {
              const resKey = Object.entries(R).find(([,v]) => v === res)?.[0];
              return { type:'resource', res, resKey, priorityIndex: idx };
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

      const ID = 'Sofia Sans,sans-serif';
      const activeWidget = [...messages].reverse().find(msg => msg.type === 'widget' && !widgetAnswers[msg.id]);
      const visibleChips = activeWidget ? [] : chips.slice(0, 6);
      return (
        <div
          style={{ position:'absolute', inset:0, zIndex:400, display:'flex', flexDirection:'column', overflow:'hidden', background:'linear-gradient(180deg, #fffdfa 0%, #ffffff 32%, #ffffff 100%)' }}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:82, left:'-10%', width:230, height:230, borderRadius:'50%', background:isPeerChat ? 'radial-gradient(circle, rgba(255,214,173,0.18) 0%, rgba(255,214,173,0) 72%)' : 'radial-gradient(circle, rgba(255,214,173,0.28) 0%, rgba(255,214,173,0) 72%)', filter:'blur(18px)' }} />
            <div style={{ position:'absolute', top:126, right:'-6%', width:210, height:210, borderRadius:'50%', background:isPeerChat ? 'radial-gradient(circle, rgba(203,234,255,0.18) 0%, rgba(203,234,255,0) 70%)' : 'radial-gradient(circle, rgba(203,234,255,0.26) 0%, rgba(203,234,255,0) 70%)', filter:'blur(20px)' }} />
            <div style={{ position:'absolute', top:210, left:'28%', width:180, height:180, borderRadius:'50%', background:isPeerChat ? 'radial-gradient(circle, rgba(239,191,255,0.10) 0%, rgba(239,191,255,0) 72%)' : 'radial-gradient(circle, rgba(239,191,255,0.18) 0%, rgba(239,191,255,0) 72%)', filter:'blur(24px)' }} />
          </div>

          {/* Header — solid white bg so orb disappears cleanly behind it when scrolled */}
          <div style={{ position:'relative', zIndex:15, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'52px 20px 12px', background:'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(255,255,255,0.86))', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)' }}>
            <div onClick={onBack} style={{ background:'white', borderRadius:99, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L1 7L7 13" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', padding:'9px 20px', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 0 0 0 rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:SF }}>{isPeerChat ? peerChat.name : bookingMode ? 'Find a Therapist' : 'AI Chat'}</span>
            </div>
            <div style={{ background:'white', borderRadius:99, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              {isPeerChat ? (
                <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:peerChat.status === 'Online now' ? '#2ecc71' : '#c7cbd4' }} />
                  <div style={{ width:4, height:4, borderRadius:'50%', background:'rgba(20,20,19,0.2)' }} />
                </div>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="4" r="1.4" fill="#141413"/>
                  <circle cx="9" cy="9" r="1.4" fill="#141413"/>
                  <circle cx="9" cy="14" r="1.4" fill="#141413"/>
                </svg>
              )}
            </div>
          </div>

          {/* Messages — orb is first child so it scrolls away naturally */}
          <div ref={messagesRef} className="hide-scrollbar" data-chat-scroll="1" style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4, paddingTop:0, paddingLeft:0, paddingRight:0, background:'transparent', scrollbarWidth:'none', msOverflowStyle:'none' }}>

            {isPeerChat ? (
              <div style={{ flexShrink:0, padding:'18px 20px 8px' }}>
                <div style={{ background:'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(248,249,253,0.96))', border:'1px solid rgba(20,20,19,0.05)', borderRadius:26, padding:'18px 18px 16px', boxShadow:'0 16px 34px rgba(20,20,19,0.06)' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:44, height:44, borderRadius:22, background:peerChat.color, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.42)', position:'relative', flexShrink:0 }}>
                      <span style={{ fontSize:18, fontWeight:800, color:'rgba(20,20,19,0.44)', fontFamily:SF }}>{peerChat.initial}</span>
                      <div style={{ position:'absolute', right:1, bottom:1, width:10, height:10, borderRadius:5, background:peerChat.status === 'Online now' ? '#2ecc71' : '#c7cbd4', border:'2px solid white' }} />
                    </div>
                    <div style={{ minWidth:0 }}>
                      <p style={{ margin:0, color:'#141413', fontSize:15, fontWeight:800, letterSpacing:'-0.24px', fontFamily:SF }}>{peerChat.name}</p>
                      <p style={{ margin:'3px 0 0', color:peerChat.status === 'Online now' ? '#22b66f' : 'rgba(20,20,19,0.42)', fontSize:12.5, fontWeight:700, fontFamily:SF }}>{peerChat.status}</p>
                    </div>
                  </div>
                  <p style={{ margin:'14px 0 0', color:'rgba(20,20,19,0.62)', fontSize:12.5, lineHeight:1.45, fontWeight:600, fontFamily:SF }}>{peerChat.subtitle}</p>
                </div>
              </div>
            ) : (
              <div style={{ flexShrink:0, position:'relative', height:176, overflow:'hidden', pointerEvents:'none', background:'transparent' }}>
                <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%) translateY(-24px)', width:318, height:310, opacity:0.82 }}>
                  <img alt="" src={imgAiPattern} style={{ width:'100%', height:'100%', display:'block' }} />
                </div>
                <div style={{ position:'absolute', top:0, left:'calc(50% - 68px)', width:136, height:136 }}>
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
                <div style={{ position:'absolute', bottom:0, left:0, right:0, height:84, background:'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.92) 58%, white 88%)' }} />
              </div>
            )}

            <div style={{ paddingLeft:20, paddingRight:20, display:'flex', flexDirection:'column', gap:4 }}>
            {messages.map((msg, i) => {
              if (msg.type === 'resource' && messages[i-1]?.type === 'resource') return null;
              const prevFrom = i > 0 ? messages[i-1].from : null;
              const nextMsg = messages[i+1];
              const isLastInGroup = !nextMsg || nextMsg.from !== msg.from || nextMsg.type === 'resource';
              const isFirstInGroup = prevFrom !== msg.from;
              const gap = msg._wt === 'anxiety-swipe'
                ? 6
                : (msg.type === 'resource' || (prevFrom && messages[i-1]?.type === 'resource'))
                  ? 3
                  : (isFirstInGroup ? 14 : 4);
              const railItems = msg.type === 'resource'
                ? (() => {
                    const items = [];
                    for (let j = i; j < messages.length; j += 1) {
                      if (messages[j]?.type !== 'resource') break;
                      items.push(messages[j]);
                    }
                    return items;
                  })()
                : [];
              return (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: msg.from==='user' ? 'flex-end' : 'flex-start', marginTop: gap, animation:'msgIn 0.28s ease-out both' }}>
                  {msg.from === 'ai' && (
                    <div style={{ display:'flex', alignItems:'flex-start', gap:10, maxWidth:'88%' }}>
                      {isFirstInGroup ? AI_AVATAR : <div style={{ width:26, flexShrink:0 }} />}
                      <div style={{ background:FIGMA_LIGHT_BUBBLE, borderRadius:'20px 20px 20px 4px', padding:'21px 24px', boxShadow:'0 12px 24px rgba(255,183,143,0.06), 0 8px 18px rgba(168,145,255,0.06), 0 3px 10px rgba(20,20,19,0.025)', border:'1px solid rgba(255,255,255,0.9)', maxWidth:359, minHeight:57, display:'flex', alignItems:'center', width:'fit-content' }}>
                        <p style={{ margin:0, fontSize:12, lineHeight:'15px', color:'#141413', fontFamily:SF, fontWeight:400 }}>{msg.text}</p>
                      </div>
                    </div>
                  )}
                  {msg.from === 'user' && (
                    <div style={{ display:'flex', alignItems:'flex-end', paddingRight:4 }}>
                      <div style={{ background:FIGMA_DARK_BUBBLE, borderRadius:'20px 20px 4px 20px', padding:'21px 27px', boxShadow:'0 18px 34px rgba(20,20,19,0.16)', border:'1px solid rgba(255,255,255,0.06)', maxWidth:367, overflow:'hidden', flexShrink:0, minHeight:57, display:'flex', alignItems:'center', width:'fit-content' }}>
                        <p style={{ margin:0, fontSize:12, lineHeight:'15px', color:'white', fontFamily:SF, fontWeight:400 }}>{msg.text}</p>
                      </div>
                    </div>
                  )}
            {msg.type === 'resource' && <ResourceRail resources={railItems} SF={SF} onBook={startIntakeInline} onExpand={setExpandedRes} />}
                  {msg.type === 'widget' && (
                    msg._wt === 'intake-tags'              ? <TagWidget     options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake(msg.intakeField, v)} SF={SF} /> :
                    msg._wt === 'intake-choice'            ? <ChoiceWidget  options={msg.options} label={msg.label} helper={msg.helper} answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake(msg.intakeField, v)} SF={SF} /> :
                    msg._wt === 'intake-duration-severity' ? <DurationSeverityDeck answered={widgetAnswers[msg.id]} onComplete={(durationValue, severityValue) => completeDurationSeverity(durationValue, severityValue, msg.id)} SF={SF} /> :
                    msg._wt === 'intake-duration'          ? <DurationWidget answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake('duration', v)} SF={SF} /> :
                    msg._wt === 'intake-severity'          ? <ScaleWidget    label="How intense does it feel on a typical day?" answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake('severity', v)} SF={SF} /> :
                    msg._wt === 'intake-match'    ? <TherapistMatchWidget matches={msg.matches} SF={SF} /> :
                    msg._wt === 'anxiety-swipe'   ? <AnxietySwipeDeck answered={widgetAnswers[msg.id]} onComplete={(durationValue, symptomValue) => completeAnxietySwipe(durationValue, symptomValue, msg.id)} SF={SF} /> :
                    msg._wt === 'tags'          ? <TagWidget    options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                    msg._wt === 'scale'         ? <ScaleWidget  label={msg.label}   answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                    msg._wt === 'mood-check'    ? <MoodCheckWidget    answered={widgetAnswers[msg.id]} onSelect={v => answerMoodCheck(msg.id, v)} SF={SF} /> :
                    msg._wt === 'grounding'     ? <GroundingWidget    answered={widgetAnswers[msg.id]} onComplete={() => completeGrounding(msg.id)} SF={SF} /> :
                    msg._wt === 'journal-prompt'? <JournalPromptWidget answered={widgetAnswers[msg.id]} onSubmit={t => submitJournal(msg.id, t)} SF={SF} /> :
                    msg._wt === 'thought-reframe'? <ThoughtReframeWidget answered={widgetAnswers[msg.id]} onComplete={() => completeReframe(msg.id)} SF={SF} /> :
                                                  <DurationWidget answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} />
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display:'flex', alignItems:'flex-start', gap:10, marginTop:14, alignSelf:'flex-start', maxWidth:'88%' }}>
                {AI_AVATAR}
                <div style={{ background:FIGMA_LIGHT_BUBBLE, borderRadius:'20px 20px 20px 4px', padding:'21px 24px', boxShadow:'0 12px 24px rgba(255,183,143,0.06), 0 8px 18px rgba(168,145,255,0.06), 0 3px 10px rgba(20,20,19,0.025)', border:'1px solid rgba(255,255,255,0.9)', minHeight:57, display:'flex', alignItems:'center', width:'fit-content' }}>
                  <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                    {[0, 0.2, 0.4].map(d => (
                      <div key={d} style={{ width:6, height:6, borderRadius:'50%', background:'rgba(58,51,84,0.42)', animation:`typingDot 1s ease-in-out ${d}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div style={{ height:8, flexShrink:0 }} />
            </div>{/* end padded messages wrapper */}
          </div>

          {/* Chips + input panel */}
          <div data-chat-input="1" style={{ position:'relative', zIndex:3, flexShrink:0, background:'linear-gradient(180deg, rgba(255,255,255,0.40), rgba(255,255,255,0.95) 22%, rgba(255,255,255,1) 56%)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)' }}>
            {visibleChips.length > 0 && (
              <div style={{ padding:'6px 18px 0', display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
                <span style={{ fontSize:10, fontWeight:800, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.55px', textTransform:'uppercase' }}>Suggested replies</span>
                <span style={{ fontSize:10, fontWeight:700, color:'rgba(111,94,255,0.72)', fontFamily:SF }}>Tap to answer faster</span>
              </div>
            )}
            <div className="hide-scrollbar" style={{ padding:'8px 16px 0', display:'flex', gap:8, overflowX:'auto', scrollbarWidth:'none', msOverflowStyle:'none' }}>
              {visibleChips.map(s => (
                <div key={s} onClick={() => sendMessage(s)} style={{ background:'rgba(255,255,255,0.92)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:99, padding:'8px 14px', cursor:'pointer', flexShrink:0, boxShadow:'0 1px 3px rgba(0,0,0,0.035)', display:'inline-flex', alignItems:'center', gap:7 }}>
                  <div style={{ width:6, height:6, borderRadius:'50%', background:'linear-gradient(135deg,#9b6ef3,#7b4fd4)' }} />
                  <span style={{ color:'rgba(20,20,19,0.68)', fontSize:11.5, fontFamily:SF, fontWeight:600, whiteSpace:'nowrap' }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'10px 16px 24px', display:'flex', alignItems:'flex-end', gap:8 }}>
              <div style={{ width:36, height:36, borderRadius:18, background:'rgba(255,255,255,0.96)', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 10px 18px rgba(3,7,18,0.05)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer' }}>
                <span style={{ fontSize:19, lineHeight:1, color:'rgba(20,20,19,0.72)', fontFamily:SF, marginTop:-2 }}>+</span>
              </div>
              <div style={{ flex:1, background:'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(252,252,255,0.96))', borderRadius:24, padding:'10px 12px 10px 14px', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 12px 28px rgba(3,7,18,0.07)', display:'flex', alignItems:'flex-end', gap:10, border:'1px solid rgba(255,255,255,0.8)' }}>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder={isPeerChat ? `Message ${peerChat.name.split(' ')[0]}...` : "Ask me anything..."}
                  rows={1}
                  className="hide-scrollbar"
                  style={{ display:'block', width:'100%', border:'none', outline:'none', background:'transparent', fontFamily:ID, fontSize:12.5, color:'#0d0d12', resize:'none', lineHeight:1.28, maxHeight:88, overflowY:'auto', paddingTop:2, scrollbarWidth:'none', msOverflowStyle:'none' }}
                />
                <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
                  <div style={{ width:32, height:32, borderRadius:16, background:'rgba(20,20,19,0.045)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="4.5" y="1" width="5" height="7" rx="2.5" fill="#141413"/>
                      <path d="M2 7a5 5 0 0 0 10 0" stroke="#141413" strokeWidth="1.4" strokeLinecap="round"/>
                      <line x1="7" y1="12" x2="7" y2="14" stroke="#141413" strokeWidth="1.4" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div onClick={() => sendMessage()} style={{ width:34, height:34, borderRadius:17, background:'#0d0d12', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 12px 24px rgba(13,13,18,0.22)' }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 11.5L11.5 1.5M11.5 1.5H4.5M11.5 1.5V8.5" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Resource detail sheet */}
          {expandedRes && (
            <ResourceDetailSheet
              res={expandedRes}
              SF={SF}
              onClose={() => setExpandedRes(null)}
              onBook={startIntakeInline}
            />
          )}

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
