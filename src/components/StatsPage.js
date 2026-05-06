    const { useState } = React;
    /* ── STATS PAGE ── */
    function StatsPage({ onBack, onNav, todayMood, count, allEntries = [] }) {
      const [tab, setTab]       = useState('week');
      const [selDay, setSelDay] = useState(2); // Wed selected by default

      const SF   = 'Sofia Sans,sans-serif';
      const CARD = { background:'white', borderRadius:22, padding:'18px 16px', boxShadow:'0 2px 16px rgba(0,0,0,0.05)', border:'1px solid rgba(20,20,19,0.06)', flexShrink:0 };
      const isPos = m => ['Good','Happy','Grateful','Excited'].includes(m);

      // ── Chart data ──
      const todayLabel = todayMood ? todayMood.mood.label : null;
      const FACE_BG = {
        Good:'#d6f0d6', Happy:'#fef4b8', Grateful:'#fde0b0', Excited:'#fef4b8',
        Sad:'#cce8ff', Angry:'#ffd6d6', Exhausted:'#ddd0f8',
        Boring:'#ccf4f0', Anxious:'#e8d4f8',
      };
      const FACE_RING = {
        Good:'#5cb85c', Happy:'#c8a000', Grateful:'#d87830', Excited:'#e8a000',
        Sad:'#3ab4dc', Angry:'#e04040', Exhausted:'#8050c8',
        Boring:'#30b8b0', Anxious:'#9070cc',
      };
      const faceImg = m => {
        switch((m||'').toLowerCase()) {
          case 'good':      return imgGoodChar;
          case 'happy':     return imgHappyChar;
          case 'grateful':  return imgGratefulChar;
          case 'excited':   return imgHappyChar;
          case 'angry':     return imgAngryChar;
          case 'exhausted': return imgExhaustedChar;
          case 'boring':    return imgBoringChar1;
          case 'sad':
          default:          return imgLogCloudChar;
        }
      };

      const Y_AXIS_W  = 34;               // left Y-axis width for mood icons
      const CHART_W   = 322;              // total card inner width
      const CW        = CHART_W - Y_AXIS_W; // actual SVG drawing width
      const CHART_H   = 165;
      const MOOD_Y  = { Good:46, Happy:25, Grateful:30, Excited:22, Boring:88, Sad:138, Anxious:108, Angry:148, Exhausted:118 };
      const weekMoods = ['Good','Sad', todayLabel||'Good', 'Anxious','Exhausted','Good','Boring'];
      const weekDays  = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
      // Dot colors matching aurora gradient position left→right
      const DOT_COLORS = ['rgb(240,140,175)','rgb(180,150,240)','rgb(100,200,195)','rgb(140,200,140)','rgb(200,210,110)','rgb(210,190,85)','rgb(220,175,80)'];
      const pts = weekDays.map((day, i) => {
        const mood = weekMoods[i];
        return { x: 12 + i * (CW - 24) / 6, y: MOOD_Y[mood] || 88, mood, day };
      });
      const buildPath = (ps) => {
        let d = `M ${ps[0].x} ${ps[0].y}`;
        for (let i = 1; i < ps.length; i++) {
          const cpx = (ps[i-1].x + ps[i].x) / 2;
          d += ` C ${cpx} ${ps[i-1].y} ${cpx} ${ps[i].y} ${ps[i].x} ${ps[i].y}`;
        }
        return d;
      };
      const strokePath = buildPath(pts);
      const areaPath   = strokePath + ` L ${pts[pts.length-1].x} ${CHART_H} L ${pts[0].x} ${CHART_H} Z`;
      const sel = pts[selDay] || pts[0];

      // Month grid
      const monthMoods2 = ['Good','Sad','Good','Anxious','Boring','Good','Exhausted','Happy'];
      const monthRows = Array.from({length:30}, (_,i) => ({ day:i+1, mood: i<8 ? monthMoods2[i%8] : null }));

      // Pattern insights
      const patternInsights = [
        { bg:'#f0ecff', iconBg:'rgba(160,130,255,0.22)', icon:'📈', title:'Emotion Pattern', desc:'More anxious on Thursdays.' },
        { bg:'#e5f5f8', iconBg:'rgba(100,200,220,0.22)', icon:'🌙', title:'Time Pattern',    desc:'Mood more stable in evenings.' },
        { bg:'#fff8dc', iconBg:'rgba(255,200,60,0.22)',  icon:'✨', title:'Improvement',     desc:'3 more good days than last week.' },
      ];

      return (
        <div style={{ position:'absolute', inset:0, background:'#faf7f5', zIndex:200, borderRadius:'inherit', overflow:'hidden' }}>
          <StatusBar />

          {/* Header */}
          <div style={{ position:'absolute', top:44, left:0, width:390, height:56, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 20px', boxSizing:'border-box' }}>
            <p style={{ fontFamily:SF, fontWeight:700, fontSize:18, color:'#141413', margin:0, letterSpacing:'-0.3px' }}>Your Stats</p>
          </div>

          {/* Scrollable body */}
          <div style={{ position:'absolute', top:100, left:0, right:0, bottom:0, overflowY:'auto', padding:'14px 18px 100px', display:'flex', flexDirection:'column', gap:14, boxSizing:'border-box' }}>

            {/* ── CARD 1: Mood Calendar ── */}
            {(() => {
              const CAL_MOODS = {
                1:'Good', 2:'Happy', 3:'Good', 4:'Sad', 5:'Boring',
                7:'Good', 8:'Anxious', 9:'Happy', 10:'Good', 11:'Exhausted', 12:'Good',
                14:'Sad', 15:'Good', 16:'Good', 17:'Happy', 18:'Boring',
                21:'Good', 22:'Sad',
                25: todayMood?.mood?.label || null,
              };
              // April 2026: Apr 1 = Wednesday → Mon-based offset = 2
              const FIRST_OFFSET = 2;
              const DAYS_IN_MONTH = 30;
              const TODAY = 25;
              const cells = Array.from({ length: Math.ceil((FIRST_OFFSET + DAYS_IN_MONTH) / 7) * 7 }, (_, i) => {
                const day = i - FIRST_OFFSET + 1;
                return (day >= 1 && day <= DAYS_IN_MONTH) ? day : null;
              });
              return (
                <div style={CARD}>
                  {/* Header */}
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                    <p style={{ fontFamily:SF, fontWeight:700, fontSize:15, color:'#141413', margin:0 }}>Mood Calendar</p>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <p style={{ fontFamily:SF, fontSize:11, color:'rgba(20,20,19,0.45)', margin:0 }}>April 2026</p>
                      <div style={{ display:'flex', gap:4 }}>
                        {['‹','›'].map((a,i) => (
                          <div key={i} style={{ width:24, height:24, borderRadius:12, background:'rgba(20,20,19,0.07)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                            <p style={{ fontFamily:SF, fontSize:13, color:'rgba(20,20,19,0.5)', margin:0, lineHeight:1 }}>{a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Weekday headers */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:8 }}>
                    {['M','T','W','T','F','S','S'].map((d,i) => (
                      <p key={i} style={{ fontFamily:SF, fontSize:10, fontWeight:600, color:'rgba(20,20,19,0.35)', textAlign:'center', margin:0 }}>{d}</p>
                    ))}
                  </div>
                  {/* Day cells — mini DayCard style */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:'5px 4px' }}>
                    {cells.map((day, i) => {
                      if (!day) return <div key={i} />;
                      const mood = CAL_MOODS[day];
                      const isToday = day === TODAY;
                      const ring = mood ? (FACE_RING[mood] || '#999') : 'rgba(20,20,19,0.15)';
                      const moodLabel = {'Good':'GOOD','Happy':'HAPPY','Grateful':'GRTFL','Excited':'EXCIT','Sad':'SAD','Boring':'BORING','Anxious':'ANXS','Exhausted':'TIRED','Angry':'ANGRY'}[mood];
                      return (
                        <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
                          {/* Card */}
                          <div style={{
                            width:'100%', aspectRatio:'1/1.3',
                            borderRadius:10,
                            background: mood ? 'rgba(255,255,255,0.92)' : 'rgba(20,20,19,0.04)',
                            border: isToday ? `1.5px solid ${ring}` : '1px solid rgba(20,20,19,0.07)',
                            boxShadow: mood ? '0 2px 6px rgba(0,0,0,0.07)' : 'none',
                            display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between',
                            padding:'3px 2px 3px',
                            boxSizing:'border-box',
                            cursor: mood ? 'pointer' : 'default',
                            overflow:'hidden',
                          }}>
                            {/* Day number */}
                            <p style={{ fontFamily:SF, fontSize:7, fontWeight: isToday ? 800 : 500, color: isToday ? ring : (mood ? '#141413' : 'rgba(20,20,19,0.3)'), margin:0, lineHeight:1, alignSelf:'flex-end', paddingRight:2 }}>{day}</p>
                            {/* Sticker folder — matches DayCard design */}
                            {mood ? <CalStickerZone mood={mood} /> : <div style={{ height:27 }} />}
                          </div>
                          {/* Mood label */}
                          {mood && (
                            <p style={{ fontFamily:SF, fontSize:6, fontWeight:700, color: isPos(mood) ? '#5aaa18' : '#cc3820', margin:0, letterSpacing:'0.1px', textAlign:'center', lineHeight:1 }}>
                              {moodLabel}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}

            {/* ── CARD 2: Weekly Overview ── */}
            <div style={CARD}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
                <p style={{ fontFamily:SF, fontWeight:700, fontSize:15, color:'#141413', margin:0, letterSpacing:'-0.2px' }}>Weekly Overview</p>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <p style={{ fontFamily:SF, fontSize:11, color:'rgba(20,20,19,0.45)', margin:0 }}>Apr 21 – 27</p>
                  <div style={{ display:'flex', gap:4 }}>
                    {['‹','›'].map((a,i) => (
                      <div key={i} style={{ width:24, height:24, borderRadius:12, background:'rgba(20,20,19,0.07)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer' }}>
                        <p style={{ fontFamily:SF, fontSize:13, color:'rgba(20,20,19,0.5)', margin:0, lineHeight:1 }}>{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <WeeklyBubblesChart pts={pts} />
            </div>

            {/* ── CARD 3: Activities vs Mood ── */}
            {(() => {
              const posM = ['good','happy','grateful','excited'];
              const isP = m => posM.includes((m||'').toLowerCase());
              const actMap = {};
              allEntries.forEach(e => (e.activities||[]).forEach(a => {
                if (!actMap[a]) actMap[a] = { pos:0, neg:0 };
                isP(e.mood) ? actMap[a].pos++ : actMap[a].neg++;
              }));
              const acts = Object.entries(actMap).sort((a,b) => (b[1].pos+b[1].neg)-(a[1].pos+a[1].neg));
              if (acts.length === 0) return null;
              const maxTotal = Math.max(...acts.map(([,v]) => v.pos+v.neg), 1);
              return (
                <div style={CARD}>
                  <p style={{ fontFamily:SF, fontWeight:700, fontSize:15, color:'#141413', margin:'0 0 14px', letterSpacing:'-0.2px' }}>What You Were Doing</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
                    {acts.map(([name, {pos,neg}]) => {
                      const total = pos + neg;
                      const posW = (pos / maxTotal) * 100;
                      const negW = (neg / maxTotal) * 100;
                      return (
                        <div key={name} style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <p style={{ fontFamily:SF, fontSize:12, color:'#141413', fontWeight:500, width:82, flexShrink:0, margin:0 }}>{name}</p>
                          <div style={{ flex:1, height:9, borderRadius:5, background:'rgba(20,20,19,0.07)', position:'relative' }}>
                            {pos > 0 && (
                              <div style={{ position:'absolute', left:0, top:0, height:'100%', width:`${posW}%`, background:'#aaf37a', borderRadius:5, transition:'width 0.4s' }} />
                            )}
                            {neg > 0 && (
                              <div style={{ position:'absolute', left: pos > 0 ? `calc(${posW}% + 3px)` : 0, top:0, height:'100%', width:`${negW}%`, background:'#74d8f3', borderRadius:5, transition:'all 0.4s' }} />
                            )}
                          </div>
                          <p style={{ fontFamily:SF, fontSize:11, color:'rgba(20,20,19,0.4)', fontWeight:500, width:18, textAlign:'right', flexShrink:0, margin:0 }}>{total}×</p>
                        </div>
                      );
                    })}
                  </div>
                  <div style={{ display:'flex', gap:14, marginTop:12 }}>
                    {[['#aaf37a','Good mood'],['#74d8f3','Low mood']].map(([c,l]) => (
                      <div key={l} style={{ display:'flex', alignItems:'center', gap:5 }}>
                        <div style={{ width:8, height:8, borderRadius:4, background:c, flexShrink:0 }} />
                        <p style={{ fontFamily:SF, fontSize:10, color:'rgba(20,20,19,0.45)', margin:0 }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* ── CARD 4: Company & Place ── */}
            {(() => {
              const posM = ['good','happy','grateful','excited'];
              const isP = m => posM.includes((m||'').toLowerCase());
              const compMap = {}, locMap = {};
              allEntries.forEach(e => {
                const pos = isP(e.mood);
                (e.companions||[]).forEach(c => { if(!compMap[c]) compMap[c]={pos:0,neg:0}; pos?compMap[c].pos++:compMap[c].neg++; });
                (e.location||[]).forEach(l => { if(!locMap[l]) locMap[l]={pos:0,neg:0}; pos?locMap[l].pos++:locMap[l].neg++; });
              });
              const comps = Object.entries(compMap).sort((a,b)=>(b[1].pos+b[1].neg)-(a[1].pos+a[1].neg));
              const locs  = Object.entries(locMap).sort((a,b)=>(b[1].pos+b[1].neg)-(a[1].pos+a[1].neg));
              if (comps.length === 0 && locs.length === 0) return null;
              const maxC = Math.max(...comps.map(([,v])=>v.pos+v.neg), 1);
              const maxL = Math.max(...locs.map(([,v])=>v.pos+v.neg), 1);
              const Section = ({ title, items, max }) => (
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:SF, fontWeight:600, fontSize:11, color:'#969696', letterSpacing:'0.6px', textTransform:'uppercase', margin:'0 0 10px' }}>{title}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                    {items.map(([name,{pos,neg}]) => {
                      const total = pos+neg;
                      return (
                        <div key={name} style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <p style={{ fontFamily:SF, fontSize:11, color:'#141413', fontWeight:500, width:68, flexShrink:0, margin:0, lineHeight:1.2 }}>{name}</p>
                          <div style={{ flex:1, height:8, borderRadius:4, background:'rgba(20,20,19,0.07)', position:'relative' }}>
                            {pos > 0 && (
                              <div style={{ position:'absolute', left:0, top:0, height:'100%', width:`${(pos/max)*100}%`, background:'#aaf37a', borderRadius:4, transition:'width 0.4s' }} />
                            )}
                            {neg > 0 && (
                              <div style={{ position:'absolute', left: pos > 0 ? `calc(${(pos/max)*100}% + 3px)` : 0, top:0, height:'100%', width:`${(neg/max)*100}%`, background:'#74d8f3', borderRadius:4, transition:'all 0.4s' }} />
                            )}
                          </div>
                          <p style={{ fontFamily:SF, fontSize:10, color:'rgba(20,20,19,0.4)', margin:0, flexShrink:0 }}>{total}×</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
              return (
                <div style={CARD}>
                  <p style={{ fontFamily:SF, fontWeight:700, fontSize:15, color:'#141413', margin:'0 0 14px', letterSpacing:'-0.2px' }}>Your Company & Place</p>
                  <div style={{ display:'flex', gap:18 }}>
                    {comps.length > 0 && <Section title="With" items={comps} max={maxC} />}
                    {locs.length > 0  && <Section title="Where" items={locs}  max={maxL} />}
                  </div>
                </div>
              );
            })()}


{/* ── CARD 4: Stats Summary ── */}
            <div style={CARD}>
              <p style={{ fontFamily:SF, fontWeight:700, fontSize:15, color:'#141413', margin:'0 0 14px', letterSpacing:'-0.2px' }}>Stats Summary</p>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
                {[
                  { mood:'good',  label:'Good Days',     value:7,     sub:'▲ 3 from last week',  subC:'#5aaa18', bg:'#f0fce8' },
                  { mood:'sad',   label:'Low Days',      value:2,     sub:'▼ 1 from last week',  subC:'#cc3820', bg:'#fff0ee' },
                  { emoji:'🔥',  label:'Day Streak',    value:3,     sub:'Keep it going!',       subC:'#e08020', bg:'#fff8ee' },
                  { mood:'happy', label:'Positive Days', value:'78%', sub:'▲ 12% last week',     subC:'#5aaa18', bg:'#eef2ff' },
                ].map((s, i) => (
                  <div key={i} style={{ background:s.bg, borderRadius:18, padding:'14px 14px 12px', display:'flex', flexDirection:'column', minHeight:140 }}>
                    {/* icon row */}
                    <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:8 }}>
                      <div style={{ width:54, height:54, position:'relative', overflow:'hidden', flexShrink:0 }}>
                        {s.mood
                          ? <div style={{ position:'relative', width:'100%', height:'100%' }} dangerouslySetInnerHTML={{ __html: buildIconHTML(s.mood) }} />
                          : <div style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'100%', height:'100%' }}><span style={{ fontSize:30, lineHeight:1 }}>{s.emoji}</span></div>
                        }
                      </div>
                    </div>
                    {/* value + label pushed to bottom */}
                    <div style={{ marginTop:'auto' }}>
                      <p style={{ fontFamily:SF, fontWeight:800, fontSize:32, color:'#141413', margin:'0 0 4px', lineHeight:1 }}>{s.value}</p>
                      <p style={{ fontFamily:SF, fontSize:12, color:'rgba(20,20,19,0.55)', margin:'0 0 3px', lineHeight:1.3 }}>{s.label}</p>
                      <p style={{ fontFamily:SF, fontSize:10, color:s.subC, fontWeight:600, margin:0, lineHeight:1.3 }}>{s.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CARD 5: Recommended for You ── */}
            <div style={{ ...CARD, padding:'18px 16px 14px' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                <p style={{ fontFamily:SF, fontWeight:700, fontSize:15, color:'#141413', margin:0, letterSpacing:'-0.2px' }}>Recommended for You</p>
                <p style={{ fontFamily:SF, fontSize:12, color:'rgba(20,20,19,0.45)', margin:0, cursor:'pointer' }}>See All ›</p>
              </div>
              <div className="hide-scrollbar" style={{ display:'flex', gap:9, overflowX:'auto', paddingBottom:2, msOverflowStyle:'none', scrollbarWidth:'none' }}>
                {[
                  { icon:'▶️', label:'10-min Calm Session', color:'#ede8ff' },
                  { icon:'🌿', label:'Breathing Exercise',  color:'#e0f5e8' },
                  { icon:'💬', label:'Talk to Someone',     color:'#ffe0ea' },
                  { icon:'📓', label:'Gratitude Journal',   color:'#fff6d8' },
                ].map((r, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:7, background:r.color, borderRadius:20, padding:'9px 14px', flexShrink:0, cursor:'pointer' }}>
                    <span style={{ fontSize:14 }}>{r.icon}</span>
                    <p style={{ fontFamily:SF, fontSize:12, fontWeight:500, color:'#141413', margin:0, whiteSpace:'nowrap' }}>{r.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <StatusBar />
        </div>
      );
    }
