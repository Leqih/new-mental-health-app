    const { useEffect: useEffectSP, useRef, useState } = React;

    /* ══════════════════════════════════════════
       BOOKING PAGE — multi-step appointment flow
       ══════════════════════════════════════════ */
    function BookingPage({ onClose, preService, userName }) {
      const SF = 'Sofia Sans,sans-serif';
      const ID = 'Inter Display,sans-serif';
      const [step, setStep]       = useState(preService ? 1 : 0);
      const [service, setService] = useState(preService || null);
      const [concern, setConcern] = useState('');
      const [urgency, setUrgency] = useState(null);
      const [timeSlot, setTimeSlot] = useState(null);
      const [format, setFormat]   = useState(null);
      const [done, setDone]       = useState(false);

      const SERVICES = [
        { key:'caps',           icon:'🏛️', title:'CAPS Counseling',       sub:'Individual therapy · ongoing support',   color:'#3b82f6', phone:'(217) 333-3704', url:'counselingcenter.illinois.edu' },
        { key:'letsTalk',       icon:'💬', title:"Let's Talk",             sub:'Free 15-min consult · schedule online',  color:'#7c3aed', phone:'(217) 333-3704', url:'counselingcenter.illinois.edu/lets-talk' },
        { key:'mckinley',       icon:'🏥', title:'McKinley Mental Health', sub:'Psychiatry & medication management',     color:'#059669', phone:'(217) 333-2700', url:'mckinley.illinois.edu/mental-health' },
        { key:'groupCounseling',icon:'👥', title:'Group Counseling',       sub:'Therapeutic group sessions at CAPS',     color:'#0ea5e9', phone:'(217) 333-3704', url:'counselingcenter.illinois.edu' },
      ];
      const URGENCY = [
        { v:'flexible',  label:'I can wait a few weeks',   icon:'😌' },
        { v:'week',      label:'Within the next week',     icon:'🙏' },
        { v:'soon',      label:'As soon as possible',      icon:'😟' },
        { v:'urgent',    label:'It feels urgent right now',icon:'😰' },
      ];
      const TIMES   = ['Morning','Afternoon','Evening','Flexible'];
      const FORMATS = ['In-person','Video call','No preference'];
      const TOTAL   = 3; // steps 0–2 before confirm

      const sel = SERVICES.find(s => s.key === service);
      const canNext = step === 0 ? !!service
                    : step === 1 ? !!urgency
                    : step === 2 ? (!!timeSlot && !!format)
                    : false;

      const next = () => { if (canNext) setStep(s => s + 1); };
      const back = () => { if (step > 0) setStep(s => s - 1); else onClose(); };

      const progressW = ((step + 1) / (TOTAL + 1)) * 100;

      if (done) return (
        <div style={{ position:'absolute', inset:0, zIndex:600, background:'white', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 28px', gap:20 }}>
          <div style={{ width:72, height:72, borderRadius:36, background:'linear-gradient(135deg,#4ade80,#22c55e)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 28px rgba(74,222,128,0.35)' }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ textAlign:'center' }}>
            <p style={{ margin:'0 0 8px', fontSize:22, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.4px' }}>Request Saved</p>
            <p style={{ margin:0, fontSize:13, color:'rgba(20,20,19,0.52)', fontFamily:SF, lineHeight:1.5 }}>Your preferences are saved. Call or go online to confirm your appointment — the details below will help.</p>
          </div>
          {sel && (
            <div style={{ width:'100%', background:'rgba(20,20,19,0.03)', borderRadius:16, border:'1px solid rgba(20,20,19,0.07)', padding:'14px 16px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:9, marginBottom:10 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:`${sel.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <span style={{ fontSize:16 }}>{sel.icon}</span>
                </div>
                <div>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF }}>{sel.title}</p>
                  <p style={{ margin:0, fontSize:10.5, color:'rgba(20,20,19,0.44)', fontFamily:SF }}>{sel.sub}</p>
                </div>
              </div>
              {[
                ['Urgency', URGENCY.find(u=>u.v===urgency)?.label],
                ['Time', timeSlot],
                ['Format', format],
                concern && ['Note', concern.slice(0,60) + (concern.length > 60 ? '…' : '')],
              ].filter(Boolean).map(([label, val]) => (
                <div key={label} style={{ display:'flex', gap:8, marginBottom:5 }}>
                  <span style={{ fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, width:52, flexShrink:0 }}>{label}</span>
                  <span style={{ fontSize:10.5, color:'rgba(20,20,19,0.65)', fontFamily:SF, lineHeight:1.4 }}>{val}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:10 }}>
            <a href={`tel:${sel?.phone?.replace(/[^0-9]/g,'')}`} style={{ textDecoration:'none' }}>
              <div style={{ background:sel?.color || '#3b82f6', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:`0 4px 16px ${sel?.color || '#3b82f6'}44` }}>
                <div>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:'white', fontFamily:SF }}>Call to Confirm</p>
                  <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,0.7)', fontFamily:SF }}>{sel?.phone}</p>
                </div>
                <div style={{ width:34, height:34, borderRadius:17, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                </div>
              </div>
            </a>
            <div style={{ background:'rgba(20,20,19,0.05)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', border:'1px solid rgba(20,20,19,0.08)' }} onClick={() => window.open(`https://${sel?.url}`, '_blank')}>
              <div>
                <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF }}>Book Online</p>
                <p style={{ margin:0, fontSize:11, color:'rgba(20,20,19,0.44)', fontFamily:SF }}>{sel?.url}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.5)" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
          </div>
          <div onClick={onClose} style={{ padding:'10px 24px', borderRadius:99, border:'1px solid rgba(20,20,19,0.10)', cursor:'pointer' }}>
            <span style={{ fontSize:13, fontWeight:600, color:'rgba(20,20,19,0.55)', fontFamily:SF }}>Back to chat</span>
          </div>
        </div>
      );

      return (
        <div style={{ position:'absolute', inset:0, zIndex:600, background:'white', display:'flex', flexDirection:'column' }}>
          {/* Header */}
          <div style={{ flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'52px 20px 14px' }}>
            <div onClick={back} style={{ width:34, height:34, borderRadius:99, background:'rgba(20,20,19,0.05)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none"><path d="M7 1L1 7L7 13" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontSize:14, fontWeight:700, color:'#141413', fontFamily:SF }}>Book Appointment</span>
            <div onClick={onClose} style={{ width:34, height:34, borderRadius:99, background:'rgba(20,20,19,0.05)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="#141413" strokeWidth="1.7" strokeLinecap="round"/></svg>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ flexShrink:0, padding:'0 20px 20px' }}>
            <div style={{ height:3, borderRadius:99, background:'rgba(20,20,19,0.07)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${progressW}%`, background:'linear-gradient(90deg,#9b6ef3,#7c5cfc)', borderRadius:99, transition:'width 0.4s ease' }} />
            </div>
            <p style={{ margin:'7px 0 0', fontSize:10.5, color:'rgba(20,20,19,0.38)', fontFamily:SF }}>
              {step === 0 ? 'Choose a service' : step === 1 ? 'Describe your concern' : step === 2 ? 'Your preferences' : 'Review & confirm'}
            </p>
          </div>

          {/* Body */}
          <div style={{ flex:1, overflowY:'auto', padding:'0 20px' }}>

            {/* ── Step 0: Service selection ── */}
            {step === 0 && (
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                <p style={{ margin:'0 0 6px', fontSize:18, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px' }}>Which service?</p>
                {SERVICES.map(s => (
                  <div key={s.key} onClick={() => setService(s.key)}
                    style={{ padding:'14px 16px', borderRadius:16, border:`2px solid ${service===s.key ? s.color : 'rgba(20,20,19,0.08)'}`, background: service===s.key ? `${s.color}0e` : 'white', cursor:'pointer', transition:'all 0.18s', display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:12, background:`${s.color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <span style={{ fontSize:18 }}>{s.icon}</span>
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ margin:'0 0 2px', fontSize:13.5, fontWeight:700, color:'#141413', fontFamily:SF }}>{s.title}</p>
                      <p style={{ margin:0, fontSize:11, color:'rgba(20,20,19,0.44)', fontFamily:SF }}>{s.sub}</p>
                    </div>
                    {service === s.key && (
                      <div style={{ width:20, height:20, borderRadius:10, background:s.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── Step 1: Concern + urgency ── */}
            {step === 1 && (
              <div style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <p style={{ margin:'0 0 2px', fontSize:18, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px' }}>What's been going on?</p>
                <div>
                  <textarea value={concern} onChange={e => setConcern(e.target.value)} placeholder="Briefly describe what you've been experiencing... (optional)" rows={4}
                    style={{ width:'100%', border:'1.5px solid rgba(20,20,19,0.10)', borderRadius:14, padding:'12px 14px', fontSize:13, fontFamily:SF, color:'#141413', background:'rgba(20,20,19,0.02)', resize:'none', outline:'none', lineHeight:1.5, boxSizing:'border-box' }} />
                  <p style={{ margin:'5px 0 0', fontSize:10, color:'rgba(20,20,19,0.32)', fontFamily:SF }}>This won't be sent anywhere — it's just to help you remember what to say when you call.</p>
                </div>
                <div>
                  <p style={{ margin:'0 0 10px', fontSize:13, fontWeight:700, color:'rgba(20,20,19,0.55)', fontFamily:SF, letterSpacing:'0.2px', textTransform:'uppercase', fontSize:10.5 }}>How urgent is this?</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {URGENCY.map(u => (
                      <div key={u.v} onClick={() => setUrgency(u.v)}
                        style={{ padding:'11px 14px', borderRadius:14, border:`1.5px solid ${urgency===u.v ? '#9b6ef3' : 'rgba(20,20,19,0.08)'}`, background: urgency===u.v ? 'rgba(155,110,243,0.07)' : 'white', cursor:'pointer', transition:'all 0.15s', display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:18 }}>{u.icon}</span>
                        <span style={{ fontSize:13, fontWeight: urgency===u.v ? 700 : 500, color: urgency===u.v ? '#7c5cfc' : '#141413', fontFamily:SF }}>{u.label}</span>
                        {urgency === u.v && (
                          <div style={{ marginLeft:'auto', width:18, height:18, borderRadius:9, background:'#9b6ef3', display:'flex', alignItems:'center', justifyContent:'center' }}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Preferences ── */}
            {step === 2 && (
              <div style={{ display:'flex', flexDirection:'column', gap:22 }}>
                <p style={{ margin:'0 0 2px', fontSize:18, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px' }}>Your preferences</p>
                <div>
                  <p style={{ margin:'0 0 10px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>Preferred time of day</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {TIMES.map(t => (
                      <div key={t} onClick={() => setTimeSlot(t)}
                        style={{ padding:'9px 16px', borderRadius:99, border:`1.5px solid ${timeSlot===t ? '#9b6ef3' : 'rgba(20,20,19,0.10)'}`, background: timeSlot===t ? 'rgba(155,110,243,0.09)' : 'white', cursor:'pointer', transition:'all 0.15s' }}>
                        <span style={{ fontSize:12.5, fontWeight:600, color: timeSlot===t ? '#7c5cfc' : 'rgba(20,20,19,0.6)', fontFamily:SF }}>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ margin:'0 0 10px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>Appointment format</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {FORMATS.map(f => (
                      <div key={f} onClick={() => setFormat(f)}
                        style={{ padding:'12px 16px', borderRadius:14, border:`1.5px solid ${format===f ? '#9b6ef3' : 'rgba(20,20,19,0.08)'}`, background: format===f ? 'rgba(155,110,243,0.07)' : 'white', cursor:'pointer', transition:'all 0.15s', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <span style={{ fontSize:13, fontWeight: format===f ? 700 : 500, color: format===f ? '#7c5cfc' : '#141413', fontFamily:SF }}>{f}</span>
                        {format === f && (
                          <div style={{ width:18, height:18, borderRadius:9, background:'#9b6ef3', display:'flex', alignItems:'center', justifyContent:'center' }}>
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><path d="M1.5 4.5l2 2L7.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 3: Review ── */}
            {step === 3 && (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <p style={{ margin:'0 0 2px', fontSize:18, fontWeight:800, color:'#141413', fontFamily:SF, letterSpacing:'-0.3px' }}>Review your request</p>
                <p style={{ margin:0, fontSize:12.5, color:'rgba(20,20,19,0.50)', fontFamily:SF, lineHeight:1.5 }}>Nothing gets submitted automatically — you'll confirm by calling or booking online.</p>
                {sel && (
                  <div style={{ borderRadius:16, border:'1.5px solid rgba(20,20,19,0.08)', overflow:'hidden' }}>
                    <div style={{ padding:'12px 16px', background:`${sel.color}0d`, borderBottom:'1px solid rgba(20,20,19,0.06)', display:'flex', alignItems:'center', gap:10 }}>
                      <span style={{ fontSize:20 }}>{sel.icon}</span>
                      <div>
                        <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF }}>{sel.title}</p>
                        <p style={{ margin:0, fontSize:10.5, color:'rgba(20,20,19,0.44)', fontFamily:SF }}>{sel.sub}</p>
                      </div>
                    </div>
                    <div style={{ padding:'12px 16px', display:'flex', flexDirection:'column', gap:8 }}>
                      {[
                        ['Urgency', URGENCY.find(u=>u.v===urgency)?.label],
                        ['Time', timeSlot],
                        ['Format', format],
                        concern && ['Your note', concern],
                      ].filter(Boolean).map(([label, val]) => (
                        <div key={label} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                          <span style={{ fontSize:11, fontWeight:700, color:'rgba(20,20,19,0.35)', fontFamily:SF, width:58, flexShrink:0, paddingTop:1 }}>{label}</span>
                          <span style={{ fontSize:12, color:'rgba(20,20,19,0.7)', fontFamily:SF, lineHeight:1.45, flex:1 }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  <a href={`tel:${sel?.phone?.replace(/[^0-9]/g,'')}`} style={{ textDecoration:'none' }}>
                    <div style={{ background: sel?.color || '#3b82f6', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:`0 4px 16px ${sel?.color || '#3b82f6'}33` }}>
                      <div>
                        <p style={{ margin:0, fontSize:13.5, fontWeight:700, color:'white', fontFamily:SF }}>Call to Book</p>
                        <p style={{ margin:0, fontSize:11, color:'rgba(255,255,255,0.68)', fontFamily:SF }}>{sel?.phone} · M–F 8am–5pm</p>
                      </div>
                      <div style={{ width:36, height:36, borderRadius:18, background:'rgba(255,255,255,0.18)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                      </div>
                    </div>
                  </a>
                  <div onClick={() => window.open(`https://${sel?.url}`, '_blank')} style={{ background:'rgba(20,20,19,0.04)', borderRadius:14, padding:'14px 18px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', border:'1.5px solid rgba(20,20,19,0.08)' }}>
                    <div>
                      <p style={{ margin:0, fontSize:13.5, fontWeight:700, color:'#141413', fontFamily:SF }}>Book Online</p>
                      <p style={{ margin:0, fontSize:11, color:'rgba(20,20,19,0.42)', fontFamily:SF }}>{sel?.url}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(20,20,19,0.4)" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                </div>
              </div>
            )}

            <div style={{ height: 120 }} />
          </div>

          {/* Bottom CTA */}
          {step < 3 ? (
            <div style={{ flexShrink:0, padding:'12px 20px 40px', background:'white', borderTop:'1px solid rgba(20,20,19,0.06)' }}>
              <div onClick={next} style={{ background: canNext ? 'linear-gradient(135deg,#9b6ef3,#7c5cfc)' : 'rgba(20,20,19,0.07)', borderRadius:14, padding:'15px', display:'flex', alignItems:'center', justifyContent:'center', cursor: canNext ? 'pointer' : 'default', transition:'all 0.2s', boxShadow: canNext ? '0 4px 16px rgba(124,92,252,0.30)' : 'none' }}>
                <span style={{ fontSize:14, fontWeight:700, color: canNext ? 'white' : 'rgba(20,20,19,0.3)', fontFamily:SF }}>
                  {step === 0 ? 'Choose Service' : step === 1 ? 'Next' : 'Review Request'}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ flexShrink:0, padding:'12px 20px 40px', background:'white', borderTop:'1px solid rgba(20,20,19,0.06)' }}>
              <div onClick={() => setDone(true)} style={{ background:'linear-gradient(135deg,#4ade80,#22c55e)', borderRadius:14, padding:'15px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 4px 16px rgba(74,222,128,0.30)' }}>
                <span style={{ fontSize:14, fontWeight:700, color:'white', fontFamily:SF }}>Save Request</span>
              </div>
            </div>
          )}

          <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
      );
    }

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
        setBookingService(null);
        setIsChatBookingMode(false);
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
          {typeChat && <TypeChatPage onBack={closeTypeChat} userName={userName} initialTopic={chatMoodCtx ? null : chatTopic} moodContext={chatMoodCtx} onBook={openBooking} bookingMode={isChatBookingMode} preService={bookingService} />}
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

              {/* ── Book Appointment button ── */}
              <div style={{ position:'absolute', top:597, left:0, right:0, display:'flex', justifyContent:'center', gap:10, zIndex:4 }}>
                <div onClick={() => openBooking(null)} style={{ background:'linear-gradient(135deg,#9b6ef3,#7c5cfc)', display:'inline-flex', alignItems:'center', gap:6, padding:'9px 16px', borderRadius:99, boxShadow:'0 4px 14px rgba(124,92,252,0.32)', cursor:'pointer' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span style={{ color:'white', fontSize:12, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', whiteSpace:'nowrap' }}>Book Appointment</span>
                </div>
              </div>

              {/* ── Start Chat button ── */}
              <div style={{ position:'absolute', top:644, left:0, right:0, display:'flex', justifyContent:'center', zIndex:4 }}>
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
              {/* Background — matches AI Chat white aesthetic */}
              <div style={{ position:'absolute', inset:0, background:'#ffffff' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 5%, rgba(220,210,255,0.50) 0%, transparent 65%)' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 40% at 85% 88%, rgba(255,235,220,0.30) 0%, transparent 65%)' }} />
              {/* Edge frosted glass — same as AI Chat */}
              <div style={{ position:'absolute', top:100, left:0, width:80, height:'calc(100% - 100px)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', WebkitMaskImage:'linear-gradient(to right, black 0%, transparent 100%)', maskImage:'linear-gradient(to right, black 0%, transparent 100%)', zIndex:10, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, left:0, width:80, height:'calc(100% - 100px)', background:'linear-gradient(to right, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 100%)', zIndex:11, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, right:0, width:80, height:'calc(100% - 100px)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', WebkitMaskImage:'linear-gradient(to left, black 0%, transparent 100%)', maskImage:'linear-gradient(to left, black 0%, transparent 100%)', zIndex:10, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, right:0, width:80, height:'calc(100% - 100px)', background:'linear-gradient(to left, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 100%)', zIndex:11, pointerEvents:'none' }} />

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
                <div style={{ width:80, height:80, borderRadius:40, background:'rgba(255,255,255,0.72)', border:'1.5px solid rgba(255,255,255,0.5)', boxShadow:'0 24px 80px 0 rgba(124,92,252,0.38), 0 8px 28px 0 rgba(255,255,255,0.10), 0 2px 60px 0 #ccebff', overflow:'hidden', position:'relative' }}>
                  <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.28)' }} />
                  <div style={{ position:'absolute', top:'28%', left:'10%', width:'80%', height:'65%', overflow:'visible' }}>
                    <img alt="" src={imgAiMaskGroup} style={{ position:'absolute', top:'-30%', left:'-22%', width:'144%', height:'160%', display:'block', maxWidth:'none' }} />
                  </div>
                  <div style={{ position:'absolute', top:'5%', left:'8%', width:'45%', height:'40%', filter:'blur(3px)', background:'radial-gradient(circle at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 45%, transparent 100%)' }} />
                  <div style={{ position:'absolute', inset:0, borderRadius:40, background:'linear-gradient(145deg, rgba(255,255,255,0.22) 6%, rgba(255,255,255,0) 46%)' }} />
                </div>
              </div>

              {/* Section title */}
              <div style={{ position:'absolute', top:208, left:28, right:28, zIndex:2 }}>
                <p style={{ color:'rgba(20,20,19,0.4)', fontSize:11, fontWeight:700, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'1px', textTransform:'uppercase' }}>Community</p>
                <p style={{ color:'#141413', fontSize:22, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', margin:0, lineHeight:1.25 }}>Connect with peers<br/>who truly get it</p>
              </div>

              {/* Peer cards */}
              <div style={{ position:'absolute', top:300, left:22, right:22, display:'flex', flexDirection:'column', gap:9, zIndex:2 }}>
                {PEERS.map(({ name, tag, status, color, initial }) => {
                  const isOnline = status === 'Online now';
                  return (
                    <div key={name} style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', borderRadius:18, padding:'11px 14px', display:'flex', alignItems:'center', gap:12, border:'1px solid rgba(20,20,19,0.06)', boxShadow:'0 1px 8px rgba(20,20,19,0.05)' }}>
                      {/* Avatar with online dot */}
                      <div style={{ position:'relative', flexShrink:0 }}>
                        <div style={{ width:42, height:42, borderRadius:21, background:color, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <span style={{ fontSize:16, fontWeight:700, color:'rgba(20,20,19,0.65)', fontFamily:'Sofia Sans,sans-serif' }}>{initial}</span>
                        </div>
                        {isOnline && <div style={{ position:'absolute', bottom:1, right:1, width:10, height:10, borderRadius:5, background:'#22c55e', border:'2px solid white' }} />}
                      </div>
                      {/* Info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:7, marginBottom:2 }}>
                          <span style={{ fontSize:13, fontWeight:700, color:'#141413', fontFamily:'Sofia Sans,sans-serif' }}>{name}</span>
                          <span style={{ background:'rgba(124,92,252,0.10)', padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:700, color:'#7C5CFC', fontFamily:'Sofia Sans,sans-serif' }}>{tag}</span>
                        </div>
                        <span style={{ fontSize:11.5, color: isOnline ? '#22c55e' : 'rgba(20,20,19,0.38)', fontFamily:'Sofia Sans,sans-serif', fontWeight: isOnline ? 600 : 400 }}>{status}</span>
                      </div>
                      {/* Chat button */}
                      <div style={{ width:32, height:32, borderRadius:16, background:'rgba(124,92,252,0.08)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 1H2C1.45 1 1 1.45 1 2V9C1 9.55 1.45 10 2 10H4L6.5 13L9 10H12C12.55 10 13 9.55 13 9V2C13 1.45 12.55 1 12 1Z" stroke="#7C5CFC" strokeWidth="1.3" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA — dark button with arrow inline SVG */}
              <div style={{ position:'absolute', bottom:115, left:28, right:28, zIndex:2 }}>
                <div style={{ background:'#141413', borderRadius:18, padding:'16px 22px', display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer', boxShadow:'0 8px 28px rgba(20,20,19,0.16)' }}>
                  <div>
                    <p style={{ color:'white', fontWeight:700, fontSize:15, margin:'0 0 2px', fontFamily:'Sofia Sans,sans-serif' }}>Find a Match</p>
                    <p style={{ color:'rgba(255,255,255,0.50)', fontSize:12, margin:0, fontFamily:'Sofia Sans,sans-serif' }}>3 peers available now</p>
                  </div>
                  <div style={{ width:36, height:36, borderRadius:18, background:'rgba(255,255,255,0.10)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* ══ SECTION 2 — RESOURCE CENTER ══ */}
            <div style={{ position:'relative', width:390, height:844, overflow:'hidden' }}>
              {/* Background — white with subtle warm/cool blooms */}
              <div style={{ position:'absolute', inset:0, background:'#ffffff' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 50% at 50% 5%, rgba(255,235,220,0.55) 0%, transparent 65%)' }} />
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 40% at 15% 88%, rgba(220,210,255,0.28) 0%, transparent 65%)' }} />
              {/* Edge frosted glass */}
              <div style={{ position:'absolute', top:100, left:0, width:80, height:'calc(100% - 100px)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', WebkitMaskImage:'linear-gradient(to right, black 0%, transparent 100%)', maskImage:'linear-gradient(to right, black 0%, transparent 100%)', zIndex:10, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, left:0, width:80, height:'calc(100% - 100px)', background:'linear-gradient(to right, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 100%)', zIndex:11, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, right:0, width:80, height:'calc(100% - 100px)', backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)', WebkitMaskImage:'linear-gradient(to left, black 0%, transparent 100%)', maskImage:'linear-gradient(to left, black 0%, transparent 100%)', zIndex:10, pointerEvents:'none' }} />
              <div style={{ position:'absolute', top:100, right:0, width:80, height:'calc(100% - 100px)', background:'linear-gradient(to left, rgba(255,255,255,0.80) 0%, rgba(255,255,255,0) 100%)', zIndex:11, pointerEvents:'none' }} />

              {/* Header — consistent pill style */}
              <div style={{ position:'absolute', top:52, left:0, right:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px', zIndex:15 }}>
                <div onClick={onBack} style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', borderRadius:99, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', boxShadow:'0 2px 4px rgba(3,7,18,0.04)', flexShrink:0 }}>
                  <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L1 7L7 13" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ background:'rgba(255,255,255,0.88)', border:'1px solid rgba(20,20,19,0.07)', padding:'9px 20px', borderRadius:22, boxShadow:'0 2px 4px rgba(3,7,18,0.04)' }}>
                  <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:'Sofia Sans,sans-serif' }}>Resources</span>
                </div>
                <div style={{ width:34 }} />
              </div>

              {/* Section title */}
              <div style={{ position:'absolute', top:120, left:28, right:28, zIndex:2 }}>
                <p style={{ color:'rgba(20,20,19,0.4)', fontSize:11, fontWeight:700, margin:'0 0 4px', fontFamily:'Sofia Sans,sans-serif', letterSpacing:'1px', textTransform:'uppercase' }}>Support Tools</p>
                <p style={{ color:'#141413', fontSize:22, fontWeight:700, fontFamily:'Sofia Sans,sans-serif', margin:0, lineHeight:1.25 }}>Resources whenever<br/>you need them</p>
              </div>

              {/* Resource grid — white cards with accent bar */}
              <div style={{ position:'absolute', top:210, left:22, right:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, zIndex:2 }}>
                {RESOURCES.map(({ icon, title, sub, accent }) => (
                  <div key={title} style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(14px)', WebkitBackdropFilter:'blur(14px)', borderRadius:18, padding:'14px 14px', cursor:'pointer', border:'1px solid rgba(20,20,19,0.06)', boxShadow:'0 1px 8px rgba(20,20,19,0.05)', minHeight:90 }}>
                    <div style={{ fontSize:22, marginBottom:7 }}>{icon}</div>
                    <p style={{ fontSize:13, fontWeight:700, color:'#141413', margin:'0 0 3px', fontFamily:'Sofia Sans,sans-serif', lineHeight:1.2 }}>{title}</p>
                    <p style={{ fontSize:10.5, color:'rgba(20,20,19,0.42)', margin:0, fontFamily:'Sofia Sans,sans-serif', lineHeight:1.35 }}>{sub}</p>
                    <div style={{ marginTop:9, display:'inline-block', background:accent, height:2.5, width:24, borderRadius:99 }} />
                  </div>
                ))}
              </div>
            </div>

          </div>{/* end sliding container */}

          {/* Chat history sidebar */}
          <ChatSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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

