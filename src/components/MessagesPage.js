    /* ── MESSAGES PAGE — therapist chat after counseling booking ── */
    function MessagesPage({ onBack, onNav, onFindCounselor }) {
      const { useState } = React;

      /* Demo: one conversation thread with a therapist */
      const threads = [
        {
          id: 1,
          name: 'Dr. Sarah Chen',
          role: 'Licensed Therapist · CAPS',
          avatar: '👩‍⚕️',
          lastMsg: "See you at our next session! Feel free to message anytime.",
          time: 'Mon',
          unread: 0,
          online: true,
        },
      ];

      const [active, setActive] = useState(null);
      const [input, setInput] = useState('');
      const [messages, setMessages] = useState([
        { from: 'them', text: "Hi Alex! Welcome. I've reviewed your intake form. How have you been feeling this week?", time: '10:02 AM' },
        { from: 'me',   text: 'A bit anxious, mostly about school. But overall okay.', time: '10:05 AM' },
        { from: 'them', text: "That's completely understandable. Let's work through that together in our next session.", time: '10:07 AM' },
        { from: 'them', text: 'See you at our next session! Feel free to message anytime.', time: 'Mon' },
      ]);

      const sendMsg = () => {
        if (!input.trim()) return;
        setMessages(m => [...m, { from: 'me', text: input.trim(), time: 'Now' }]);
        setInput('');
      };

      /* ── THREAD LIST ── */
      if (!active) return (
        <div style={{ position:'absolute', inset:0, background:'#faf7f5', zIndex:200, display:'flex', flexDirection:'column' }}>
          {/* Header */}
          <div style={{ display:'flex', alignItems:'center', padding:'56px 22px 16px', gap:12 }}>
            <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:700, fontSize:26, color:'#141413', margin:0, flex:1, letterSpacing:'-0.5px' }}>Messages</p>
          </div>

          {/* Thread list */}
          <div style={{ flex:1, overflowY:'auto', padding:'0 22px', display:'flex', flexDirection:'column', gap:2 }}>
            {threads.map(t => (
              <div key={t.id} onClick={() => setActive(t)}
                style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 0', borderBottom:'1px solid rgba(20,20,19,0.07)', cursor:'pointer' }}>
                {/* Avatar */}
                <div style={{ position:'relative', flexShrink:0 }}>
                  <div style={{ width:52, height:52, borderRadius:26, background:'rgba(20,20,19,0.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>{t.avatar}</div>
                  {t.online && <div style={{ position:'absolute', bottom:2, right:2, width:10, height:10, borderRadius:5, background:'#34d399', border:'2px solid #faf7f5' }} />}
                </div>
                {/* Info */}
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:700, fontSize:15, color:'#141413', margin:0 }}>{t.name}</p>
                    <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:12, color:'rgba(20,20,19,0.4)', margin:0 }}>{t.time}</p>
                  </div>
                  <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:12, color:'rgba(20,20,19,0.5)', margin:'3px 0 0', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.role}</p>
                  <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:13, color:t.unread ? '#141413' : 'rgba(20,20,19,0.45)', fontWeight: t.unread ? 600 : 400, margin:'2px 0 0', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{t.lastMsg}</p>
                </div>
                {t.unread > 0 && (
                  <div style={{ width:18, height:18, borderRadius:9, background:'#141413', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:10, color:'white', margin:0, fontWeight:700 }}>{t.unread}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Empty state hint */}
            <div style={{ marginTop:32, padding:'24px', background:'rgba(20,20,19,0.04)', borderRadius:16, textAlign:'center' }}>
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:14, color:'rgba(20,20,19,0.5)', margin:0, lineHeight:1.6 }}>
                Book a counseling session to start chatting with a therapist.
              </p>
              <button onClick={() => onFindCounselor ? onFindCounselor() : onNav('peers')} style={{ marginTop:12, fontFamily:'Sofia Sans,sans-serif', fontWeight:600, fontSize:13, color:'white', background:'#141413', border:'none', borderRadius:999, padding:'10px 20px', cursor:'pointer' }}>
                Find a Counselor
              </button>
            </div>
          </div>

          {/* Nav spacer */}
          <div style={{ height:104 }} />
        </div>
      );

      /* ── CHAT VIEW ── */
      return (
        <div style={{ position:'absolute', inset:0, background:'#faf7f5', zIndex:200, display:'flex', flexDirection:'column' }}>
          {/* Chat header */}
          <div style={{ display:'flex', alignItems:'center', gap:12, padding:'56px 22px 14px', borderBottom:'1px solid rgba(20,20,19,0.07)' }}>
            <button onClick={() => setActive(null)} style={{ background:'none', border:'none', cursor:'pointer', padding:0, display:'flex', alignItems:'center', justifyContent:'center', width:32, height:32 }}>
              <svg width="9" height="16" viewBox="0 0 9 16" fill="none"><path d="M8 1L1 8L8 15" stroke="#141413" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ width:40, height:40, borderRadius:20, background:'rgba(20,20,19,0.06)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>{active.avatar}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontWeight:700, fontSize:15, color:'#141413', margin:0 }}>{active.name}</p>
              <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:11, color:'rgba(20,20,19,0.45)', margin:'2px 0 0' }}>{active.role}</p>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex:1, overflowY:'auto', padding:'16px 22px', display:'flex', flexDirection:'column', gap:10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display:'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth:'72%' }}>
                  <div style={{
                    background: m.from === 'me' ? '#141413' : 'white',
                    color: m.from === 'me' ? 'white' : '#141413',
                    borderRadius: m.from === 'me' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    padding:'10px 14px',
                    fontFamily:'Sofia Sans,sans-serif', fontSize:14, lineHeight:1.5,
                    boxShadow:'0 1px 4px rgba(0,0,0,0.07)',
                  }}>{m.text}</div>
                  <p style={{ fontFamily:'Sofia Sans,sans-serif', fontSize:10, color:'rgba(20,20,19,0.35)', margin:'4px 6px 0', textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding:'12px 22px 36px', borderTop:'1px solid rgba(20,20,19,0.07)', display:'flex', gap:10, alignItems:'flex-end' }}>
            <input
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMsg()}
              placeholder="Message…"
              style={{ flex:1, fontFamily:'Sofia Sans,sans-serif', fontSize:14, color:'#141413', background:'white', border:'1px solid rgba(20,20,19,0.12)', borderRadius:22, padding:'10px 16px', outline:'none' }}
            />
            <button onClick={sendMsg} style={{ width:40, height:40, borderRadius:20, background:'#141413', border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 2L2 7.5L7 8.5M14 2L9 14L7 8.5M14 2L7 8.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      );
    }
