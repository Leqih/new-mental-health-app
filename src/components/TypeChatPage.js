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

    function ResourceCard({ res, SF, onBook, priorityIndex = 0, horizontal = false }) {
      const canBook = onBook && res._key && BOOKABLE_KEYS.has(res._key);
      const hasCall = !!res.phone;
      const primaryLabel = canBook ? 'Start matching' : (hasCall ? 'Call now' : (RESOURCE_ACTION_COPY[res._key] || 'Explore'));
      const heroLabel = res._key === 'caps' ? 'Illinois Counseling Center' : res.title;
      const CARD_GRADIENTS = {
        caps:        'linear-gradient(155deg, #7864fc 0%, #a084ff 42%, #f5b8a0 100%)',
        letsTalk:    'linear-gradient(155deg, #5b8dff 0%, #90b4ff 48%, #d8edff 100%)',
        crisis988:   'linear-gradient(155deg, #ff6060 0%, #ff9880 52%, #ffd4b0 100%)',
        crisisText:  'linear-gradient(155deg, #ff7070 0%, #ffaa88 52%, #ffe0c8 100%)',
        breathe:     'linear-gradient(155deg, #22c77a 0%, #70e0b4 52%, #cdf5e4 100%)',
      };
      const cardGrad = CARD_GRADIENTS[res._key] || 'linear-gradient(155deg, #8c6eff 0%, #b8a0ff 50%, #f0d0ff 100%)';
      const handleAction = () => {
        if (canBook) { onBook(); return; }
        if (hasCall) window.location.href = `tel:${res.phone}`;
      };
      return (
        <div style={{ marginLeft:horizontal ? 0 : 36, width:horizontal ? 220 : undefined, minWidth:horizontal ? 220 : undefined, maxWidth:horizontal ? 220 : '86%', minHeight:horizontal ? 270 : undefined, background:cardGrad, borderRadius:22, display:'flex', flexDirection:'column', flexShrink:0, scrollSnapAlign:'start', position:'relative', overflow:'hidden', padding:'22px 20px 20px' }}>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 42%)', pointerEvents:'none' }} />
          <span style={{ position:'absolute', right:14, top:12, fontSize:20, opacity:0.5, lineHeight:1 }}>✦</span>
          <div style={{ width:50, height:50, borderRadius:15, background:'rgba(255,255,255,0.22)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14, flexShrink:0, backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)' }}>
            <span style={{ fontSize:23, lineHeight:1 }}>{res.icon}</span>
          </div>
          <p style={{ margin:'0 0 6px', fontSize:15, fontWeight:800, color:'white', fontFamily:SF, lineHeight:1.2, letterSpacing:'-0.25px' }}>{heroLabel}</p>
          <p style={{ margin:0, fontSize:11, fontWeight:400, color:'rgba(255,255,255,0.72)', fontFamily:SF, lineHeight:1.5, flex:1, display:'-webkit-box', WebkitLineClamp:3, WebkitBoxOrient:'vertical', overflow:'hidden' }}>{res.sub}</p>
          {(canBook || hasCall) && (
            <div onClick={handleAction} style={{ marginTop:16, display:'flex', alignItems:'center', gap:5, cursor:'pointer' }}>
              <span style={{ fontSize:12, fontWeight:700, color:'white', fontFamily:SF, textDecoration:'underline', textUnderlineOffset:3 }}>{primaryLabel}</span>
              <span style={{ fontSize:12, color:'rgba(255,255,255,0.70)', lineHeight:1 }}>↗</span>
            </div>
          )}
        </div>
      );
    }

    function ResourceRail({ resources, SF, onBook }) {
      return (
        <div style={{ marginLeft:36, width:'calc(100% - 36px)', display:'flex', flexDirection:'column', gap:8, animation:'msgIn 0.28s ease-out' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:10 }}>
            <span style={{ fontSize:10, fontWeight:800, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.55px', textTransform:'uppercase' }}>Suggested support</span>
            <span style={{ fontSize:10, fontWeight:700, color:'rgba(111,94,255,0.72)', fontFamily:SF }}>Swipe across</span>
          </div>
          <div style={{ display:'flex', gap:12, overflowX:'auto', paddingRight:18, paddingBottom:6, scrollSnapType:'x mandatory', scrollPaddingLeft:0, scrollbarWidth:'none', msOverflowStyle:'none' }}>
            {resources.map((item, idx) => (
              <ResourceCard key={`${item.res._key || item.res.title}-${idx}`} res={item.res} SF={SF} onBook={BOOKABLE_KEYS.has(item.res?._key) ? onBook : null} priorityIndex={item.priorityIndex || idx} horizontal />
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
          style={{ marginLeft:36, marginTop:page === 1 ? -16 : -14, width:'calc(100% - 36px)', maxWidth:342, overflow:'hidden', touchAction:'pan-y', animation:'msgIn 0.28s ease-out', userSelect:'none', transition:'margin-top 0.24s cubic-bezier(.22,.8,.24,1)' }}
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
            <div onClick={() => setRequestModal(null)} style={{ position:'fixed', inset:0, zIndex:9999, background:'rgba(13,16,26,0.16)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', display:'flex', alignItems:'center', justifyContent:'center', padding:'28px 18px', pointerEvents:'auto' }}>
              <div onClick={(e) => e.stopPropagation()} style={{ width:'min(314px, calc(100vw - 36px))', maxWidth:'100%', background:'linear-gradient(180deg, rgba(255,255,255,0.96), rgba(245,248,255,0.92))', borderRadius:28, border:'1px solid rgba(255,255,255,0.86)', boxShadow:'0 38px 90px rgba(24,31,70,0.26), 0 18px 44px rgba(255,167,135,0.18)', overflow:'hidden', position:'relative', transform:'translateY(-10px)' }}>
                <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle at 50% 24%, rgba(255,214,192,0.58), rgba(136,180,255,0.22) 48%, rgba(255,255,255,0) 82%)', pointerEvents:'none' }} />
                <div style={{ position:'absolute', inset:'auto 0 0 0', height:88, background:'linear-gradient(180deg, rgba(255,255,255,0), rgba(120,145,255,0.10) 55%, rgba(255,167,135,0.12))', pointerEvents:'none' }} />
                <div style={{ position:'relative', zIndex:1, padding:'20px 18px 18px', display:'flex', flexDirection:'column', gap:12 }}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:12 }}>
                    <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                      <span style={{ fontSize:10, fontWeight:800, color:'rgba(111,94,255,0.78)', fontFamily:SF, letterSpacing:'0.52px', textTransform:'uppercase' }}>Request sent</span>
                      <p style={{ margin:0, fontSize:18, fontWeight:800, color:'#141413', fontFamily:SF, lineHeight:1.06 }}>Session request received</p>
                      <p style={{ margin:0, fontSize:12.25, color:'rgba(58,51,84,0.74)', fontFamily:SF, lineHeight:1.34 }}>We saved the therapist details and next-step note in chat.</p>
                    </div>
                    <div style={{ width:36, height:36, borderRadius:'50%', background:'linear-gradient(180deg, #39d89a, #20c777)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 24px rgba(34,197,94,0.24)' }}>
                      <span style={{ fontSize:18, color:'white', lineHeight:1 }}>✓</span>
                    </div>
                  </div>
                  <div style={{ background:'linear-gradient(180deg, rgba(255,255,255,0.58), rgba(255,255,255,0.34))', border:'1px solid rgba(20,20,19,0.07)', borderRadius:22, padding:'14px 14px 12px', display:'flex', flexDirection:'column', gap:10, boxShadow:'inset 0 1px 0 rgba(255,255,255,0.42)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:42, height:42, borderRadius:'50%', background:'linear-gradient(180deg, rgba(52,79,171,0.84), rgba(32,48,109,0.96))', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 10px 22px rgba(10,14,33,0.14)' }}>
                        <span style={{ fontSize:17, fontWeight:800, color:'white', fontFamily:SF }}>{requestModal.therapist.initials}</span>
                      </div>
                      <div style={{ minWidth:0, display:'flex', flexDirection:'column', gap:2 }}>
                        <p style={{ margin:0, fontSize:14.5, fontWeight:800, color:'#141413', fontFamily:SF, lineHeight:1.12 }}>{requestModal.therapist.name}</p>
                        <p style={{ margin:0, fontSize:11.25, color:'rgba(58,51,84,0.74)', fontFamily:SF, lineHeight:1.28 }}>{requestModal.therapist.title}</p>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                      <div style={{ ...RAIL_WHITE_PILL_STYLE, padding:'7px 12px', minWidth:0 }}>
                        <span style={{ fontSize:10.25, fontWeight:700, color:'#3c3c3c', fontFamily:SF }}>{requestModal.when}</span>
                      </div>
                      <div style={{ ...RAIL_WHITE_PILL_STYLE, padding:'7px 12px', minWidth:0 }}>
                        <span style={{ fontSize:10.25, fontWeight:700, color:'#3c3c3c', fontFamily:SF }}>{requestModal.therapist.availability}</span>
                      </div>
                      <div style={{ ...RAIL_WHITE_PILL_STYLE, padding:'7px 12px', minWidth:0 }}>
                        <span style={{ fontSize:10.25, fontWeight:700, color:'#3c3c3c', fontFamily:SF }}>Wait {requestModal.therapist.wait}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ background:'rgba(20,20,19,0.045)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:18, padding:'13px 14px 12px', display:'flex', flexDirection:'column', gap:6 }}>
                    <span style={{ fontSize:10.5, fontWeight:800, color:'rgba(111,94,255,0.88)', fontFamily:SF, letterSpacing:'0.42px', textTransform:'uppercase' }}>Saved note</span>
                    <span style={{ fontSize:12.5, fontWeight:600, color:'#141413', fontFamily:SF, lineHeight:1.34 }}>Your request was saved in this chat. Come back anytime to review the therapist, availability, and next step without losing context.</span>
                  </div>
                  <div style={{ display:'flex', gap:10, paddingTop:2 }}>
                    <div onClick={() => setRequestModal(null)} style={{ flex:1, background:'#141413', borderRadius:18, padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 12px 22px rgba(20,20,19,0.12)' }}>
                      <span style={{ fontSize:13, fontWeight:700, color:'white', fontFamily:SF }}>Done</span>
                    </div>
                    <div onClick={() => setRequestModal(null)} style={{ flexShrink:0, background:'rgba(255,255,255,0.76)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:18, padding:'12px 14px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                      <span style={{ fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF }}>Keep browsing</span>
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

    function TypeChatPage({ onBack, userName, initialTopic, moodContext, bookingMode, preService, peerChat }) {
      const SF = 'Sofia Sans,sans-serif';
      const R = UIUC_RESOURCES;
      const [input, setInput] = useState('');
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
            { from:'ai', text:`Thank you for sharing that 💜 How long has this been affecting your daily life?` },
            { type:'widget', _wt:'intake-duration-severity', id:'intake-duration-severity' },
          ]);
          setChips([]);
        } else if (field === 'severity') {
          setMessages(m => [...m,
            { from:'user', text:`${SCALE_EMOJI[value] || ''} ${value}` },
            { from:'ai', text:`Got it. Have you worked with a therapist or counselor before?` },
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
            { type:'widget', _wt:'intake-choice', id:'intake-genderPref', intakeField:'genderPref',
              label:'Therapist preference',
              helper:'Optional, but helpful for matching.',
              options:["No preference","Woman","Man","Non-binary"] },
          ]);
          setChips([]);
        } else if (field === 'genderPref') {
          setMessages(m => [...m,
            { from:'user', text: value },
            { from:'ai', text:`And what kind of therapy style feels right for you?` },
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
            { from:'ai', text:`Based on everything you've shared, here are your top matches 💜 Each has been selected for how well they fit what you're looking for.` },
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
        crisis:      { text: `I'm really glad you said something, ${userName} — that took courage 💙 Can you tell me a little more about where you're at right now? Even just a few words.`, chips: ["I'm having really dark thoughts","I'm not in immediate danger","I just needed to tell someone","I honestly don't know how to explain it"] },
        anxiety:     { text: `Anxiety is relentless like that — it basically turns up the volume on everything 😮‍💨 How long has this been showing up for you, ${userName}?`, widget:{ type:'anxiety-swipe' }, chips: ["It's been building for a while","Something specific happened","It just hit me out of nowhere","Honestly, I don't know"] },
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

      const completeAnxietySwipe = (durationValue, symptomValue, widgetId) => {
        setWidgetAnswers(prev => ({ ...prev, [widgetId]: `${durationValue} · ${symptomValue}` }));
        setTurn((prev) => Math.max(prev, 3));
        setLastIntent('anxiety');
        const anxietySupport = buildSupport(null).anxiety;
        setMessages(m => [
          ...m,
          { from:'user', text: durationValue },
          { from:'user', text: symptomValue.split(' · ')[0] },
          { from:'ai', text: anxietySupport.text },
          ...anxietySupport.resources.map((res, idx) => {
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
      const visibleChips = activeWidget ? [] : chips.slice(0, 4);
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
            {msg.type === 'resource' && <ResourceRail resources={railItems} SF={SF} onBook={startIntakeInline} />}
                  {msg.type === 'widget' && (
                    msg._wt === 'intake-tags'              ? <TagWidget     options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake(msg.intakeField, v)} SF={SF} /> :
                    msg._wt === 'intake-choice'            ? <ChoiceWidget  options={msg.options} label={msg.label} helper={msg.helper} answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake(msg.intakeField, v)} SF={SF} /> :
                    msg._wt === 'intake-duration-severity' ? <DurationSeverityDeck answered={widgetAnswers[msg.id]} onComplete={(durationValue, severityValue) => completeDurationSeverity(durationValue, severityValue, msg.id)} SF={SF} /> :
                    msg._wt === 'intake-duration'          ? <DurationWidget answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake('duration', v)} SF={SF} /> :
                    msg._wt === 'intake-severity'          ? <ScaleWidget    label="How intense does it feel on a typical day?" answered={widgetAnswers[msg.id]} onAnswer={v => advanceIntake('severity', v)} SF={SF} /> :
                    msg._wt === 'intake-match'    ? <TherapistMatchWidget matches={msg.matches} SF={SF} /> :
                    msg._wt === 'anxiety-swipe'   ? <AnxietySwipeDeck answered={widgetAnswers[msg.id]} onComplete={(durationValue, symptomValue) => completeAnxietySwipe(durationValue, symptomValue, msg.id)} SF={SF} /> :
                    msg._wt === 'tags'  ? <TagWidget  options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                    msg._wt === 'scale' ? <ScaleWidget label={msg.label}   answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                                          <DurationWidget                  answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} />
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
