    function BottomNav({ activePage, onNav }) {
      const ACTIVE_ICON = '#141413';
      const INACTIVE_ICON = '#8F959E';
      const iconFilter = (active) => active ? 'brightness(0)' : 'grayscale(1) brightness(0) opacity(0.42)';
      const StatIcon = ({ active }) => (
        <div style={{ position:'relative', width:24, height:24, flexShrink:0 }}>
          <div style={{ position:'absolute', background:active ? ACTIVE_ICON : INACTIVE_ICON, bottom:'16.67%', left:'75%', right:'8.33%', borderRadius:1, top:'29.17%' }} />
          <div style={{ position:'absolute', background:active ? ACTIVE_ICON : INACTIVE_ICON, top:'54.17%', right:'41.67%', bottom:'16.67%', left:'41.67%', borderRadius:1 }} />
          <div style={{ position:'absolute', background:active ? ACTIVE_ICON : INACTIVE_ICON, bottom:'16.67%', left:'8.33%', right:'75%', borderRadius:1, top:'37.5%' }} />
        </div>
      );
  const HomeIcon = ({ active }) => (
    <div style={{ width:19, height:20, position:'relative', flexShrink:0 }}>
      <img
        alt=""
        src={imgAiFrame32}
        style={{
          position:'absolute',
          display:'block',
          inset:0,
          maxWidth:'none',
          width:'100%',
          height:'100%',
          filter: active ? 'brightness(0)' : 'grayscale(1) brightness(0) opacity(0.42)',
        }}
      />
    </div>
  );
      const items = [
        { id:'home',    label:'Home',    icon: (a) => <HomeIcon active={a} /> },
        { id:'stats',   label:'Stat',    icon: (a) => <StatIcon active={a} /> },
        { id:'peers',   label:'Support', icon: (a) => <div style={{ width:24, height:24, position:'relative' }}><img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%', filter:iconFilter(a) }} src={imgAiHandCoin} onError={e=>{e.target.style.display='none';e.target.parentNode.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="'+(a?ACTIVE_ICON:INACTIVE_ICON)+'" strokeWidth="1.8" strokeLinecap="round"><circle cx="9" cy="7" r="3"/><path d="M3 21v-1a6 6 0 0112 0v1"/><circle cx="17" cy="9" r="2.5"/><path d="M20 21v-.8a5 5 0 00-4-4.9"/></svg>';}} /></div> },
        { id:'messages', label:null, icon: (a) => (
          <div style={{ width:24, height:24, position:'relative', flexShrink:0 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke={a ? ACTIVE_ICON : INACTIVE_ICON} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="8" cy="10" r="1" fill={a ? ACTIVE_ICON : INACTIVE_ICON}/>
              <circle cx="12" cy="10" r="1" fill={a ? ACTIVE_ICON : INACTIVE_ICON}/>
              <circle cx="16" cy="10" r="1" fill={a ? ACTIVE_ICON : INACTIVE_ICON}/>
            </svg>
          </div>
        )},
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
                      fontFamily:'Sofia Sans,sans-serif', fontWeight:isActive ? 700 : 500, fontSize:14,
                      color: isActive ? ACTIVE_ICON : INACTIVE_ICON,
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
