    const { useEffect, useState } = React;
    /* ── APP ── */
    function App() {
      const todayKey = new Date().toDateString();
      const load = (k, fb) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : fb; } catch { return fb; } };
      const DEFAULT_TODAY_ENTRIES = [
        { mood: 'Good', dayLabel: 'Today', time: '8:30 AM', activities: ['Fitness', 'Eating'], companions: ['By Myself'], location: ['Home'], bodyParts: [], note: 'Great morning run!' },
        { mood: 'Sad', dayLabel: 'Today', time: '2:15 PM', activities: ['Resting'], companions: ['By Myself'], location: ['Work'], bodyParts: ['Head'], note: 'Felt drained after back-to-back meetings.' },
      ];
      const DEFAULT_MOOD_ENTRIES = {
        MON: { mood: 'Good', dayLabel: 'Monday', time: '9:15 AM', activities: ['Fitness', 'Eating'], companions: ['By Myself'], location: ['Home'], bodyParts: [], note: 'Felt energized after my morning run!' },
        TUE: { mood: 'Sad', dayLabel: 'Tuesday', time: '11:42 PM', activities: ['Resting', 'Fitness'], companions: ['By Myself'], location: ['Home'], bodyParts: ['Chest', 'Head'], note: 'Long stressful day. Hard to focus.' },
      };
      const isNewDay = load('appDate', null) !== todayKey;

      const [page, setPage] = useState('home');
      const [checkinOpen, setCheckin] = useState(false);
      const [userName, setUserName] = useState(() => load('userName', 'Alex'));
      const [allMoodLogs, setAllMoodLogs] = useState(() => load('allMoodLogs', []));
      const [chatMoodContext, setChatMoodContext] = useState(null);
      const [bannerDismissed, setBannerDismissed] = useState(false);
      const [todayMood, setTodayMood] = useState(() => isNewDay ? null : load('todayMood', null));
      const [count, setCount] = useState(() => load('count', 7));
      const [todayMoods, setTodayMoods] = useState(() => isNewDay ? [] : load('todayMoods', ['good', 'sad']));
      const [viewEntry, setViewEntry] = useState(null);
      const [editEntry, setEditEntry] = useState(null);
      const [showTodaySheet, setShowTodaySheet] = useState(false);
      const [todayEntries, setTodayEntries] = useState(() => isNewDay ? [] : load('todayEntries', DEFAULT_TODAY_ENTRIES));
      const [moodEntries, setMoodEntries] = useState(() => {
        const saved = load('moodEntries', null);
        if (!saved) return DEFAULT_MOOD_ENTRIES;
        if (isNewDay) { const m = {...saved}; delete m.TODAY; return m; }
        return saved;
      });
      const greeting = getGreeting();

      useEffect(() => { localStorage.setItem('appDate', JSON.stringify(todayKey)); }, []);
      useEffect(() => { localStorage.setItem('userName', JSON.stringify(userName)); }, [userName]);
      useEffect(() => { localStorage.setItem('todayMood', JSON.stringify(todayMood)); }, [todayMood]);
      useEffect(() => { localStorage.setItem('count', JSON.stringify(count)); }, [count]);
      useEffect(() => { localStorage.setItem('todayMoods', JSON.stringify(todayMoods)); }, [todayMoods]);
      useEffect(() => { localStorage.setItem('todayEntries', JSON.stringify(todayEntries)); }, [todayEntries]);
      useEffect(() => { localStorage.setItem('moodEntries', JSON.stringify(moodEntries)); }, [moodEntries]);
      useEffect(() => { localStorage.setItem('allMoodLogs', JSON.stringify(allMoodLogs)); }, [allMoodLogs]);
      /* Clear mood context when leaving AI chat */
      useEffect(() => { if (page !== 'peers') setChatMoodContext(null); }, [page]);

      const handleSave = entry => {
        setTodayMood(entry);
        setCount(c => c + 1);
        setCheckin(false);
      };

      const MAX_MOODS_PER_DAY = 6;
      const handleLogMoodSave = (moodLabel, details) => {
        setTodayEntries(prev => {
          if (prev.length >= MAX_MOODS_PER_DAY) return prev;
          const now = new Date();
          const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
          const newEntry = { mood: moodLabel, dayLabel: 'Today', time, ...details };
          setMoodEntries(p => ({ ...p, TODAY: newEntry }));
          setTodayMood({ mood: { label: moodLabel } });
          setCount(c => c + 1);
          setTodayMoods(m => [...m, moodLabel.toLowerCase()]);
          return [...prev, newEntry];
        });
        /* Persist to all-time mood log for trend analysis */
        setAllMoodLogs(prev => [...prev, {
          emotion: moodLabel,
          contexts: [...(details.activities || []), ...(details.location || [])].filter(Boolean),
          note: details.note || '',
          timestamp: Date.now(),
        }]);
      };

      const handleChatWithMood = (moodCtx) => {
        setChatMoodContext(moodCtx);
        setPage('peers');
      };

      /* ── Mood trend → proactive banner ── */
      const NEGATIVE_MOODS = ['Anxious','Sad','Angry','Exhausted'];
      const computeMoodBanner = (logs) => {
        if (logs.length < 2) return null;
        const recent = logs.slice(-5);
        const negCount = recent.filter(l => NEGATIVE_MOODS.includes(l.emotion)).length;
        if (negCount >= 3) return { text: `You've logged some tough feelings lately, ${userName}. Aiden is here whenever you're ready.`, moodCtx: logs[logs.length - 1] };
        if (logs.length >= 2) {
          const last = logs[logs.length - 1], prev = logs[logs.length - 2];
          if (NEGATIVE_MOODS.includes(last.emotion) && !NEGATIVE_MOODS.includes(prev.emotion))
            return { text: `Today seems harder than usual. Want to talk to Aiden?`, moodCtx: last };
        }
        return null;
      };
      const moodBanner = !bannerDismissed ? computeMoodBanner(allMoodLogs) : null;

      /* Week strip mood states */


      return (
        <>
          <div className="phone-frame" style={{
            width: 390, height: 844,
            position: 'relative', overflow: 'hidden',
            borderRadius: 52, flexShrink: 0,
            boxShadow: '0 0 0 1px rgba(255,255,255,0.18), 0 0 0 11px #1a1a18, 0 0 0 12px rgba(255,255,255,0.08), 0 40px 90px rgba(0,0,0,0.55)',
          }}>
            {/* ── BACKGROUND ── */}
            <div style={{ position:'absolute', height:844, left:0, top:0, width:390 }}>
              <img alt="" style={{ position:'absolute', inset:0, maxWidth:'none', objectFit:'cover', pointerEvents:'none', width:'100%', height:'100%' }}
                src={imgVideoBg}
                onError={e=>{ e.target.style.display='none'; e.target.parentNode.style.background='linear-gradient(170deg,#f5c0aa 0%,#f0b5a5 10%,#e8bdb5 25%,#dbc4cf 40%,#c8c8e8 55%,#b8d0ea 65%,#bcd4e8 75%,#cce0ec 85%,#d8e8f0 100%)'; }}
              />
            </div>

            {/* ── MAIN CONTAINER ── */}
            <div style={{ position:'absolute', height:844, left:0, overflow:'hidden', top:0, width:390 }}>

              {/* ── BOTTOM SHEET: top:423 ── */}
              <div style={{ position:'absolute', background:'#faf7f5', height:430, left:0, borderRadius:20, top:423, width:390, overflow:'hidden' }}>
                <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'center', padding:22 }}>

                  {/* Today dark summary card — physics */}
                  <TodayPhysicsCard dateStr={new Date().toLocaleDateString('en-US',{month:'numeric',day:'numeric',year:'numeric'})} moods={todayMoods} onMoodClick={todayEntries.length > 0 ? (i) => setViewEntry(todayEntries[i]) : undefined} />

                  {/* Mood Log + Urgent Support */}
                  <div style={{ height:165, position:'relative', flexShrink:0, width:346 }}>
                    <MoodLogCard count={count} />
                    <UrgentCard />
                  </div>

                  {/* Pagination dots */}
                  <div style={{ display:'flex', gap:10, alignItems:'center', flexShrink:0 }}>
                    <div style={{ background:'#696969', height:5, borderRadius:20, width:47 }} />
                    <div style={{ background:'#696969', height:5, borderRadius:20, width:14 }} />
                    <div style={{ background:'#696969', height:5, borderRadius:20, width:8 }} />
                  </div>

                </div>
              </div>

              {/* ── HEADER: top:44 ── */}
              <div style={{ position:'absolute', display:'flex', height:56, alignItems:'center', justifyContent:'space-between', left:0, paddingLeft:26.156, paddingRight:26, paddingTop:14, top:44, width:390 }}>
                <div style={{ height:42, position:'relative', flexShrink:0, width:139 }}>
                  <div style={{ display:'flex', gap:10.156, alignItems:'center', height:'100%' }}>
                    {/* Avatar */}
                    <div style={{ background:'rgba(255,255,255,0.92)', border:'1px solid rgba(20,20,19,0.08)', borderRadius:21, boxShadow:'0 4px 24px rgba(0,0,0,0.04)', flexShrink:0, width:42, height:42, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:400, lineHeight:'normal', flexShrink:0, fontSize:20, color:'black', whiteSpace:'nowrap' }}>🧑</p>
                    </div>
                    {/* Greeting */}
                    <div style={{ height:38, flexShrink:0, width:87, display:'flex', flexDirection:'column', gap:2 }}>
                      <div style={{ display:'flex', height:12, alignItems:'flex-start', width:'100%' }}>
                        <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, lineHeight:'normal', flexShrink:0, color:'#696969', fontSize:10, letterSpacing:'0.4px', textTransform:'uppercase', whiteSpace:'nowrap' }}>{greeting}</p>
                      </div>
                      <div style={{ display:'flex', height:24, alignItems:'flex-start', width:'100%' }}>
                        <p style={{ fontFamily:'Sofia Sans,sans-serif', flex:'1 0 0', fontWeight:600, lineHeight:'24px', minWidth:1, color:'#141413', fontSize:20, letterSpacing:'-0.4px' }}>{userName}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Menu button */}
                <div style={{ flexShrink:0, width:38, height:38, display:'flex', alignItems:'center' }}>
                  <div style={{ background:'rgba(255,255,255,0.9)', border:'1px solid rgba(20,20,19,0.08)', flex:'1 0 0', height:38, minWidth:1, borderRadius:19, boxShadow:'0 4px 24px rgba(0,0,0,0.04)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1px 10px' }}>
                    <div style={{ height:12, position:'relative', flexShrink:0, width:18 }}>
                      <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgIcon}
                        onError={e=>{e.target.style.display='none';e.target.parentNode.innerHTML='<svg width="18" height="12" viewBox="0 0 18 12" fill="none"><circle cx="2" cy="2" r="2" fill="rgba(20,20,19,0.5)"/><circle cx="9" cy="2" r="2" fill="rgba(20,20,19,0.5)"/><circle cx="16" cy="2" r="2" fill="rgba(20,20,19,0.5)"/><circle cx="2" cy="10" r="2" fill="rgba(20,20,19,0.5)"/><circle cx="9" cy="10" r="2" fill="rgba(20,20,19,0.5)"/><circle cx="16" cy="10" r="2" fill="rgba(20,20,19,0.5)"/></svg>';}}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── PROACTIVE AI MODAL ── */}
              {moodBanner && (
                <div style={{ position:'absolute', inset:0, zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 24px' }}
                  onClick={() => setBannerDismissed(true)}>
                  {/* Scrim */}
                  <div style={{ position:'absolute', inset:0, background:'rgba(10,8,20,0.52)', backdropFilter:'blur(4px)', WebkitBackdropFilter:'blur(4px)' }} />
                  {/* Card */}
                  <div onClick={e => e.stopPropagation()}
                    style={{ position:'relative', width:'100%', background:'#ffffff', borderRadius:28, overflow:'hidden', boxShadow:'0 24px 80px rgba(0,0,0,0.28)' }}>
                    {/* Purple gradient header zone */}
                    <div style={{ background:'linear-gradient(160deg,#ede8ff 0%,#f5f0ff 100%)', padding:'32px 24px 24px', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
                      {/* Orb */}
                      <div style={{ width:80, height:80, borderRadius:40, background:'linear-gradient(145deg,#c4a8f8,#9b72e8)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 12px 40px rgba(124,92,252,0.45), 0 4px 16px rgba(124,92,252,0.20)' }}>
                        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" fill="rgba(255,255,255,0.96)"/>
                        </svg>
                      </div>
                      {/* Title */}
                      <div style={{ textAlign:'center' }}>
                        <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:22, fontWeight:700, color:'#141413', letterSpacing:'-0.4px', margin:'0 0 6px', lineHeight:1.2 }}>Aiden noticed 💜</p>
                        <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:14, fontWeight:400, color:'rgba(20,20,19,0.55)', lineHeight:1.5, margin:0 }}>{moodBanner.text}</p>
                      </div>
                    </div>
                    {/* Action zone */}
                    <div style={{ padding:'20px 20px 24px', display:'flex', flexDirection:'column', gap:10 }}>
                      <div onClick={() => handleChatWithMood(moodBanner.moodCtx)}
                        style={{ background:'linear-gradient(135deg,#9b72e8,#7C5CFC)', borderRadius:18, height:54, display:'flex', alignItems:'center', justifyContent:'center', gap:8, cursor:'pointer', boxShadow:'0 8px 24px rgba(124,92,252,0.38)' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="rgba(255,255,255,0.95)"/>
                        </svg>
                        <span style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:16, fontWeight:700, color:'white', letterSpacing:'-0.2px' }}>Talk to Aiden</span>
                      </div>
                      <div onClick={() => setBannerDismissed(true)}
                        style={{ height:44, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                        <span style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:14, fontWeight:500, color:'rgba(20,20,19,0.38)' }}>Maybe later</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── WEEK STRIP ── */}
              <div style={{ position:'absolute', display:'flex', alignItems:'center', justifyContent:'space-between', left:0, paddingLeft:22, paddingRight:22, paddingTop:12, paddingBottom:12, top:297, width:390 }}>
                <DayCard label="MON"   mood="good" onClick={() => setViewEntry(moodEntries['MON'])} />
                <DayCard label="TUE"   mood="sad"  onClick={() => setViewEntry(moodEntries['TUE'])} />
                <DayCard label="TODAY" mood={todayEntries.length > 0 ? todayEntries[todayEntries.length-1].mood.toLowerCase() : (moodEntries['TODAY'] ? moodEntries['TODAY'].mood.toLowerCase() : null)} onClick={() => todayEntries.length > 0 ? setShowTodaySheet(true) : setPage('logMood')} />
                <DayCard label="WED"   mood={null}  />
                <DayCard label="THUR"  mood={null}  />
              </div>

              {/* ── DAILY CHECK-IN: top:193 ── */}
              <div onClick={() => todayEntries.length < MAX_MOODS_PER_DAY && setPage('logMood')} style={{ position:'absolute', display:'flex', flexDirection:'column', gap:10, alignItems:'flex-start', left:22, top:193, width:347, cursor: todayEntries.length < MAX_MOODS_PER_DAY ? 'pointer' : 'default', opacity: todayEntries.length >= MAX_MOODS_PER_DAY ? 0.45 : 1 }}>
                <div style={{ height:12, position:'relative', flexShrink:0, width:95 }}>
                  <div style={{ position:'absolute', background:'#fcec6a', left:0, borderRadius:3.5, width:7, height:7, top:2.5 }} />
                  <p style={{ position:'absolute', fontFamily:'Sofia Sans,sans-serif', fontWeight:700, lineHeight:'normal', left:14, color:'#141413', fontSize:10, top:0, letterSpacing:'0.7px', textTransform:'uppercase', whiteSpace:'nowrap' }}>Daily check-in</p>
                </div>
                <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:500, lineHeight:'35.64px', minWidth:'100%', flexShrink:0, color:'#141413', fontSize:33, letterSpacing:'-0.66px', width:'min-content' }}>
                  {`${greeting}, ${userName}. How do you feel today?`}
                </p>
              </div>

              {/* Status bar on top */}
              <StatusBar />
            </div>

            {/* Inner highlight ring */}
            <div style={{ position:'absolute', inset:0, pointerEvents:'none', borderRadius:'inherit', boxShadow:'inset 0px 1px 0px 0px rgba(255,255,255,0.12)' }} />

            {/* Today moods list sheet */}
            {showTodaySheet && <TodayMoodsSheet entries={todayEntries} onClose={() => setShowTodaySheet(false)} onViewEntry={e => { setShowTodaySheet(false); setViewEntry(e); }} onLogMood={() => { setShowTodaySheet(false); setPage('logMood'); }} />}

            {/* Mood detail sheet */}
            {viewEntry && <MoodDetailSheet entry={viewEntry} onClose={() => setViewEntry(null)} onAddDetails={(e) => { setViewEntry(null); setEditEntry(e); setPage('logMood'); }} />}

            {/* Check-in modal */}
            {checkinOpen && <CheckinSheet onClose={() => setCheckin(false)} onSave={handleSave} />}

            {/* Log Mood page */}
            {page === 'logMood' && <LogMoodPage onBack={() => { setEditEntry(null); setPage('home'); }} onSave={handleLogMoodSave} initialData={editEntry} onChatWithMood={handleChatWithMood} />}

            {/* Stats page */}
            {page === 'stats' && <StatsPage onBack={() => setPage('home')} onNav={setPage} todayMood={todayMood} count={count} allEntries={[...Object.values(moodEntries), ...todayEntries].filter(Boolean)} />}

            {/* Profile page */}
            {page === 'profile' && <ProfilePage onBack={() => setPage('home')} userName={userName} setUserName={setUserName} />}

            {/* Support page */}
            {page === 'peers' && <SupportPage onBack={() => setPage('home')} userName={userName} moodContext={chatMoodContext} />}

            {/* Persistent bottom nav — rendered last so it sits above all page content */}
            {page !== 'logMood' && <BottomNav activePage={page} onNav={setPage} />}
          </div>
        </>
      );
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
  