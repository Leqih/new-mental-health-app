    const { useState } = React;
    /* ── PROFILE PAGE ── */
    function ProfilePage({ onBack, userName, setUserName }) {
      const [editing, setEditing] = useState(false);
      const [draft, setDraft] = useState(userName);
      const SF = 'Sofia Sans,sans-serif';
      return (
        <div style={{ position:'absolute', inset:0, zIndex:200, background:'#faf7f5', display:'flex', flexDirection:'column', overflowY:'auto' }}>
          <StatusBar />
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'64px 22px 20px' }}>
            <button onClick={onBack} style={{ background:'rgba(20,20,19,0.07)', border:'none', borderRadius:20, width:40, height:40, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none"><path d="M9 1L1 8l8 7" stroke="#141413" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <p style={{ fontFamily:SF, fontWeight:700, fontSize:20, color:'#141413', margin:0, letterSpacing:'-0.3px' }}>Profile</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:14, padding:'10px 22px 28px' }}>
            <div style={{ width:88, height:88, borderRadius:44, background:'rgba(20,20,19,0.08)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:44 }}>🧑</div>
            {editing ? (
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <input value={draft} onChange={e => setDraft(e.target.value)}
                  style={{ fontFamily:SF, fontSize:22, fontWeight:600, color:'#141413', border:'none', borderBottom:'2px solid #141413', background:'transparent', outline:'none', textAlign:'center', width:160 }}
                  autoFocus onKeyDown={e => { if(e.key==='Enter') { setUserName(draft); setEditing(false); } }} />
                <button onClick={() => { setUserName(draft); setEditing(false); }}
                  style={{ background:'#141413', color:'white', border:'none', borderRadius:12, padding:'6px 14px', fontFamily:SF, fontSize:13, cursor:'pointer' }}>Save</button>
              </div>
            ) : (
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <p style={{ fontFamily:SF, fontWeight:700, fontSize:24, color:'#141413', margin:0 }}>{userName}</p>
                <button onClick={() => { setDraft(userName); setEditing(true); }}
                  style={{ background:'rgba(20,20,19,0.07)', border:'none', borderRadius:10, padding:'5px 10px', fontFamily:SF, fontSize:12, color:'rgba(20,20,19,0.55)', cursor:'pointer' }}>Edit</button>
              </div>
            )}
            <p style={{ fontFamily:SF, fontSize:13, color:'rgba(20,20,19,0.45)', margin:0 }}>Mental wellness journey</p>
          </div>
          <div style={{ display:'flex', gap:12, padding:'0 22px 24px' }}>
            {[['7','Mood Logs'],['3','Day Streak'],['78%','Positive']].map(([v,l]) => (
              <div key={l} style={{ flex:1, background:'white', borderRadius:16, padding:'16px 12px', display:'flex', flexDirection:'column', gap:4, alignItems:'center', boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
                <p style={{ fontFamily:SF, fontWeight:800, fontSize:22, color:'#141413', margin:0 }}>{v}</p>
                <p style={{ fontFamily:SF, fontSize:11, color:'rgba(20,20,19,0.45)', margin:0, textAlign:'center' }}>{l}</p>
              </div>
            ))}
          </div>
          <div style={{ padding:'0 22px', display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { icon:'🔔', label:'Reminders', sub:'Daily check-in at 9:00 AM' },
              { icon:'🎨', label:'Appearance', sub:'Light mode' },
              { icon:'🔒', label:'Privacy', sub:'Data stored locally on device' },
              { icon:'💬', label:'Feedback', sub:'Help us improve MindCare' },
            ].map(({ icon, label, sub }) => (
              <div key={label} style={{ background:'white', borderRadius:16, padding:'14px 16px', display:'flex', alignItems:'center', gap:14, cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize:20 }}>{icon}</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontFamily:SF, fontWeight:600, fontSize:14, color:'#141413', margin:0 }}>{label}</p>
                  <p style={{ fontFamily:SF, fontSize:12, color:'rgba(20,20,19,0.45)', margin:'2px 0 0' }}>{sub}</p>
                </div>
                <p style={{ fontFamily:SF, fontSize:16, color:'rgba(20,20,19,0.3)', margin:0 }}>›</p>
              </div>
            ))}
          </div>
          <div style={{ padding:'20px 22px 40px' }}>
            <button onClick={() => { if(window.confirm('Reset all mood data?')) { localStorage.clear(); window.location.reload(); } }}
              style={{ width:'100%', background:'transparent', border:'1px solid rgba(220,50,30,0.25)', borderRadius:16, padding:'14px', fontFamily:SF, fontSize:14, color:'rgba(220,50,30,0.7)', cursor:'pointer', fontWeight:500 }}>
              Reset All Data
            </button>
          </div>
        </div>
      );
    }

