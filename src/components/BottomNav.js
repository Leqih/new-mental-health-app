    function BottomNav({ activePage, onNav }) {
      const iconFilter = () => 'brightness(0)';
      const StatIcon = ({ active }) => (
        <div style={{ position:'relative', width:24, height:24, flexShrink:0 }}>
          <div style={{ position:'absolute', background:'#141413', bottom:'16.67%', left:'75%', right:'8.33%', borderRadius:1, top:'29.17%' }} />
          <div style={{ position:'absolute', background:'#141413', top:'54.17%', right:'41.67%', bottom:'16.67%', left:'41.67%', borderRadius:1 }} />
          <div style={{ position:'absolute', background:'#141413', bottom:'16.67%', left:'8.33%', right:'75%', borderRadius:1, top:'37.5%' }} />
        </div>
      );
      const items = [
        { id:'home',    label:'Home',    icon: (a) => <div style={{ width:19, height:20, position:'relative', flexShrink:0 }}><img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%', filter:iconFilter(a) }} src={imgAiFrame32} onError={e=>{e.target.style.display='none';e.target.parentNode.innerHTML='<svg width="19" height="20" viewBox="0 0 24 24" fill="none" stroke="'+(a?'white':'#141413')+'" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>';}} /></div> },
        { id:'stats',   label:'Stat',    icon: (a) => <StatIcon active={a} /> },
        { id:'peers',   label:'Support', icon: (a) => <div style={{ width:24, height:24, position:'relative' }}><img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%', filter:iconFilter(a) }} src={imgAiHandCoin} onError={e=>{e.target.style.display='none';e.target.parentNode.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+(a?'white':'#141413')+'" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="3"/><path d="M3 21v-1a6 6 0 0112 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M20 21v-.8a5 5 0 00-4-4.9"/></svg>';}} /></div> },
        { id:'profile', label:null,      icon: (a) => <div style={{ width:25, height:25, position:'relative' }}><img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%', filter:iconFilter(a) }} src={imgAiShield2} onError={e=>{e.target.style.display='none';e.target.parentNode.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+(a?'white':'#141413')+'" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';}} /></div> },
      ];
      return (
        <div style={{ position:'absolute', background:'rgba(255,255,255,0.5)', backdropFilter:'blur(16px)', border:'1px solid white', display:'flex', alignItems:'center', justifyContent:'space-between', left:51, padding:6, borderRadius:999, filter:'drop-shadow(0px 4px 12px rgba(0,0,0,0.04)) drop-shadow(0px 24px 24px rgba(0,0,0,0.08))', top:764, width:294, zIndex:300, boxSizing:'border-box' }}>
          {items.map(item => {
            const isActive = activePage === item.id;
            const hasLabel = !!item.label;
            const w = isActive && hasLabel ? 115 : (hasLabel ? 45 : 46);
            return (
              <div key={item.id} onClick={() => onNav(item.id)}
                style={{
                  background: 'white',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  height:46, borderRadius:999,
                  width:w, flexShrink:0, cursor:'pointer', overflow:'hidden',
                  boxShadow: isActive ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
                  transition:'width 0.38s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease',
                  boxSizing:'border-box',
                  paddingLeft: isActive && hasLabel ? 11 : 0,
                  paddingRight: isActive && hasLabel ? 18 : 0,
                }}>
                <div style={{ display:'flex', gap: isActive && hasLabel ? 10 : 0, alignItems:'center', flexShrink:0 }}>
                  {item.icon(isActive)}
                  {hasLabel && (
                    <p style={{
                      fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:14,
                      color: '#141413',
                      margin:0, letterSpacing:'0.3px', textTransform:'uppercase',
                      whiteSpace:'nowrap', flexShrink:0,
                      maxWidth: isActive ? 60 : 0, opacity: isActive ? 1 : 0,
                      overflow:'hidden',
                      transition:'max-width 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
                    }}>{item.label}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

