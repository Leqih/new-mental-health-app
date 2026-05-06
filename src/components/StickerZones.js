/* ── STICKER ZONES — shared between DayCard & CalStickerZone ── */
function DayFolderShell({ label = '?', accent = '#eef1f6', top = 13, icon = null }) {
  return (
    <div style={{ position:'relative', width:44, height:37, flexShrink:0 }}>
      <div style={{
        position:'absolute',
        left:3,
        top,
        width:38,
        height:24,
        borderRadius:11,
        background:'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,247,244,0.96) 100%)',
        border:'1px solid rgba(20,20,19,0.08)',
        boxShadow:'0 10px 20px rgba(20,20,19,0.08), 0 2px 4px rgba(20,20,19,0.04)'
      }} />
      <div style={{
        position:'absolute',
        left:8,
        top:top - 3,
        width:15,
        height:7,
        borderRadius:'7px 7px 3px 3px',
        background:'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(246,242,236,0.95) 100%)',
        border:'1px solid rgba(20,20,19,0.08)',
        borderBottom:'none',
        boxShadow:'0 2px 4px rgba(20,20,19,0.03)'
      }} />
      {icon}
      <div style={{
        position:'absolute',
        left:8,
        top:top + 11,
        width:28,
        height:10,
        borderRadius:5,
        background:accent,
        border:'1px solid rgba(20,20,19,0.06)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        boxShadow:'inset 0 1px 0 rgba(255,255,255,0.5)'
      }}>
        <p style={{
          margin:0,
          fontFamily:'Sofia Sans,sans-serif',
          fontWeight:600,
          fontSize:8,
          lineHeight:'8px',
          letterSpacing:'0.32px',
          textTransform:'uppercase',
          color:'rgba(20,20,19,0.82)'
        }}>{label}</p>
      </div>
    </div>
  );
}

function GoodStickerIcon() {
  return (
    <div style={{ position:'absolute', left:10, top:8, width:23, height:18 }}>
      <div style={{
        position:'absolute',
        left:2,
        top:5,
        width:18,
        height:11,
        borderRadius:8,
        background:'linear-gradient(180deg, #dcfb9e 0%, #98d955 100%)',
        boxShadow:'0 4px 8px rgba(115,173,51,0.25)'
      }} />
      <div style={{
        position:'absolute',
        left:0,
        top:7,
        width:9,
        height:9,
        borderRadius:'50%',
        background:'linear-gradient(180deg, #ecffba 0%, #8fd55a 100%)'
      }} />
      <div style={{
        position:'absolute',
        right:0,
        top:7,
        width:9,
        height:9,
        borderRadius:'50%',
        background:'linear-gradient(180deg, #ebffba 0%, #8fd55a 100%)'
      }} />
      <div style={{
        position:'absolute',
        left:6,
        top:1,
        width:11,
        height:11,
        borderRadius:'50%',
        background:'linear-gradient(180deg, #f5ffc9 0%, #a7e061 100%)'
      }} />
      <div style={{ position:'absolute', left:8, top:8, width:2.4, height:2.4, borderRadius:'50%', background:'#243021' }} />
      <div style={{ position:'absolute', left:13.6, top:8, width:2.4, height:2.4, borderRadius:'50%', background:'#243021' }} />
      <div style={{ position:'absolute', left:8.4, top:11.4, width:7.2, height:3.2, borderBottom:'2px solid #243021', borderRadius:'0 0 7px 7px' }} />
    </div>
  );
}

function SadStickerIcon() {
  return (
    <div style={{ position:'absolute', left:8, top:7, width:25, height:19 }}>
      <div style={{
        position:'absolute',
        left:2,
        top:6,
        width:20,
        height:11,
        borderRadius:8,
        background:'linear-gradient(180deg, #d9f3ff 0%, #8fd5ff 100%)',
        boxShadow:'0 4px 8px rgba(103,167,214,0.25)'
      }} />
      <div style={{
        position:'absolute',
        left:0,
        top:8,
        width:9,
        height:9,
        borderRadius:'50%',
        background:'linear-gradient(180deg, #eff9ff 0%, #8fd4ff 100%)'
      }} />
      <div style={{
        position:'absolute',
        right:0,
        top:8,
        width:9,
        height:9,
        borderRadius:'50%',
        background:'linear-gradient(180deg, #eff9ff 0%, #8fd4ff 100%)'
      }} />
      <div style={{
        position:'absolute',
        left:7,
        top:2,
        width:11,
        height:11,
        borderRadius:'50%',
        background:'linear-gradient(180deg, #f3fbff 0%, #a9deff 100%)'
      }} />
      <div style={{
        position:'absolute',
        left:3,
        top:5,
        width:8,
        height:6,
        borderRadius:5,
        background:'linear-gradient(180deg, rgba(255,172,198,0.95) 0%, rgba(243,104,165,0.9) 100%)',
        transform:'rotate(-16deg)'
      }} />
      <div style={{
        position:'absolute',
        right:2,
        top:4,
        width:7,
        height:5,
        borderRadius:5,
        background:'linear-gradient(180deg, rgba(255,181,212,0.95) 0%, rgba(245,118,172,0.92) 100%)',
        transform:'rotate(18deg)'
      }} />
      <div style={{ position:'absolute', left:10, top:9, width:2.4, height:2.4, borderRadius:'50%', background:'#273047' }} />
      <div style={{ position:'absolute', left:15.6, top:9, width:2.4, height:2.4, borderRadius:'50%', background:'#273047' }} />
      <div style={{ position:'absolute', left:10, top:13.2, width:8, height:2.8, borderTop:'2px solid #273047', borderRadius:'6px 6px 0 0' }} />
    </div>
  );
}

function stickerMoodSvg(kind = 'good') {
  const face = kind === 'sad'
    ? `
      <circle cx="42" cy="57" r="4.2" fill="#261f3c"/>
      <circle cx="60" cy="57" r="4.2" fill="#261f3c"/>
      <path d="M40 69 Q45 64 50 68 Q55 72 60 68 Q63 65 65 69" stroke="#261f3c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <ellipse cx="68" cy="67" rx="3.4" ry="6.2" fill="#87b7ff" opacity="0.9"/>
    `
    : `
      <circle cx="42" cy="57" r="4.1" fill="#1d2c1a"/>
      <circle cx="60" cy="57" r="4.1" fill="#1d2c1a"/>
      <path d="M40 67 Q51 75 62 67" stroke="#1d2c1a" stroke-width="2.8" fill="none" stroke-linecap="round"/>
    `;

  const fillA = kind === 'sad' ? '#ffd6ee' : '#f2ffe4';
  const fillB = kind === 'sad' ? '#f08abc' : '#8fd86a';
  return `
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="42%" cy="34%" r="70%">
          <stop offset="0%" stop-color="${fillA}"/>
          <stop offset="100%" stop-color="${fillB}"/>
        </radialGradient>
      </defs>
      <circle cx="35" cy="56" r="22" fill="url(#g)"/>
      <circle cx="52" cy="44" r="26" fill="url(#g)"/>
      <circle cx="68" cy="57" r="20" fill="url(#g)"/>
      <rect x="18" y="56" width="63" height="19" rx="10" fill="url(#g)"/>
      <ellipse cx="48" cy="34" rx="10" ry="5" fill="white" opacity="0.36"/>
      ${face}
    </svg>
  `;
}

function stickerMoodSrc(kind) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(stickerMoodSvg(kind))}`;
}

function StickerMoodFallback({ mood = 'good' }) {
  const src = stickerMoodSrc(mood);
  return (
    <>
      <img alt="" src={src}
        style={{ position:'absolute', left:1, top:7, width:26, height:26, display:'block', transform:'rotate(-11deg)', filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.08))' }} />
      <img alt="" src={src}
        style={{ position:'absolute', left:16, top:4, width:22, height:22, display:'block', transform:'rotate(8deg)', opacity:0.95 }} />
      <img alt="" src={src}
        style={{ position:'absolute', left:8, top:4, width:21, height:21, display:'block', transform:'rotate(-4deg)', opacity:0.92 }} />
    </>
  );
}

function StickerFolderBacking({ left = 0, top = 0, width = 42, height = 37 }) {
  return (
    <div style={{ position:'absolute', left, top, width, height }}>
      <div style={{
        position:'absolute',
        inset:0,
        borderRadius:12,
        background:'linear-gradient(180deg, rgba(255,255,255,0.94) 0%, rgba(255,248,241,0.92) 100%)',
        border:'1px solid rgba(20,20,19,0.08)',
        boxShadow:'0 4px 14px rgba(0,0,0,0.04)'
      }} />
      <img alt="" src={imgRectangle82} onError={e=>e.target.style.display='none'}
        style={{ position:'absolute', top:0, right:'-9.52%', bottom:'-21.62%', left:'-9.52%', display:'block', width:'119.04%', height:'121.62%' }} />
    </div>
  );
}

function WeekStripFolderBacking() {
  return (
    <img
      alt=""
      src={imgWeekStripRectangle82}
      onError={e => e.target.style.display = 'none'}
      style={{
        position:'absolute',
        top:0,
        right:'-9.52%',
        bottom:'-21.62%',
        left:'-9.52%',
        display:'block',
        width:'119.04%',
        height:'121.62%'
      }}
    />
  );
}

function WeekStripBadge({ label = '?' }) {
  return (
    <>
      <div style={{
        position:'absolute',
        left:2,
        top:21,
        width:42,
        height:16,
        borderRadius:5,
        background:'rgba(255,255,255,0.40)',
        border:'1px solid rgba(0,0,0,0.05)',
        backdropFilter:'blur(2px)',
        WebkitBackdropFilter:'blur(2px)'
      }} />
      <p style={{
        position:'absolute',
        left:23,
        top:24,
        transform:'translateX(-50%)',
        fontFamily:'Sofia Sans,sans-serif',
        fontWeight:500,
        fontSize:8,
        lineHeight:'normal',
        letterSpacing:'0.3px',
        textTransform:'uppercase',
        color:'black',
        whiteSpace:'nowrap',
        margin:0
      }}>{label}</p>
    </>
  );
}

function WeekStripStickerBase({ label = '?', children = null }) {
  return (
    <div style={{ position:'relative', width:44, height:37, flexShrink:0 }}>
      <WeekStripFolderBacking />
      {children}
      <WeekStripBadge label={label} />
    </div>
  );
}

function GoodStickerZone() {
  return (
    <WeekStripStickerBase label="GOOD">
      <div style={{ position:'absolute', left:8.7, top:5, width:26, height:22 }}>
        <img alt="" src={imgWeekStripVector1} onError={e=>e.target.style.display='none'}
          style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
        <div style={{ position:'absolute', top:'38.47%', right:'30.69%', bottom:'42.33%', left:'38.17%' }}>
          <div style={{ position:'absolute', top:0, right:0, bottom:'-11.63%', left:0 }}>
            <img alt="" src={imgWeekStripGroup6} onError={e=>e.target.style.display='none'}
              style={{ display:'block', width:'100%', height:'100%' }} />
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', left:15, top:3, width:28.81, height:25.406, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ transform:'rotate(8deg)', flexShrink:0 }}>
          <div style={{ position:'relative', width:22, height:20 }}>
            <img alt="" src={imgWeekStripVector1} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
            <div style={{ position:'absolute', top:'33.92%', right:'42.23%', bottom:'46.88%', left:'26.63%' }}>
              <div style={{ position:'absolute', top:0, right:0, bottom:'-11.63%', left:0 }}>
                <img alt="" src={imgWeekStripGroup6} onError={e=>e.target.style.display='none'}
                  style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position:'absolute', left:0, top:7, width:28.851, height:28.851, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ transform:'rotate(-13.21deg)', flexShrink:0 }}>
          <div style={{ position:'relative', width:24, height:24 }}>
            <img alt="" src={imgWeekStripVector} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
            <div style={{ position:'absolute', top:'35.54%', right:'56.79%', bottom:'55.75%', left:'36.24%' }}>
              <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%' }}>
                <img alt="" src={imgWeekStripVector24} onError={e=>e.target.style.display='none'}
                  style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
            <div style={{ position:'absolute', top:'35.54%', right:'36.24%', bottom:'55.75%', left:'56.79%' }}>
              <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%' }}>
                <img alt="" src={imgWeekStripVector25} onError={e=>e.target.style.display='none'}
                  style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
            <div style={{ position:'absolute', top:'46.34%', right:'43.9%', bottom:'45.47%', left:'44.25%' }}>
              <div style={{ position:'absolute', top:'-25.53%', right:'-13.01%', bottom:'-25.53%', left:'-13.01%' }}>
                <img alt="" src={imgWeekStripVector34} onError={e=>e.target.style.display='none'}
                  style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </WeekStripStickerBase>
  );
}

function SadStickerZone() {
  return (
    <WeekStripStickerBase label="SAD">
      <img alt="" src={imgWeekStripGroup8} onError={e=>e.target.style.display='none'}
        style={{ position:'absolute', left:8.7, top:5, width:26, height:22, display:'block' }} />
      <img alt="" src={imgWeekStripGroup7} onError={e=>e.target.style.display='none'}
        style={{ position:'absolute', left:15, top:3, width:22, height:20, display:'block', transform:'rotate(8deg)' }} />
      <div style={{ position:'absolute', left:0, top:7, width:28.851, height:28.851, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ transform:'rotate(-13.21deg)', flexShrink:0 }}>
          <img alt="" src={imgWeekStripGroup14} onError={e=>e.target.style.display='none'}
            style={{ display:'block', width:24, height:24 }} />
        </div>
      </div>
    </WeekStripStickerBase>
  );
}

function EmptyStickerZone() {
  return <WeekStripStickerBase label="?" />;
}

    /* ── HAPPY STICKER ZONE — same 3-char structure as GoodStickerZone ── */
    /* Uses imgHappyChar (yellow star body) + face overlay positions from buildIconHTML */
function HappyStickerZone() {
  return (
    <div style={{ position:'relative', width:44, height:37, flexShrink:0 }}>
      {/* Rectangle82 backing */}
      <StickerFolderBacking left={2} top={0} width={42} height={37} />

          {/* Third char (back): left:8.7, top:5, 26×22 */}
          <div style={{ position:'absolute', left:8.7, top:5, width:26, height:22 }}>
            <img alt="" src={imgHappyChar} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
            <div style={{ position:'absolute', top:'38.47%', right:'30.69%', bottom:'42.33%', left:'38.17%' }}>
              <div style={{ position:'absolute', top:0, right:0, bottom:'-11.63%', left:0 }}>
                <img alt="" src={imgWG6} onError={e=>e.target.style.display='none'}
                  style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
          </div>

          {/* Secondary char: left:15, top:3, rotate(8deg) */}
          <div style={{ position:'absolute', left:15, top:3, width:28.81, height:25.406, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ transform:'rotate(8deg)', flexShrink:0 }}>
              <div style={{ position:'relative', width:22, height:20 }}>
                <img alt="" src={imgHappyChar} onError={e=>e.target.style.display='none'}
                  style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                <div style={{ position:'absolute', top:'33.92%', right:'42.23%', bottom:'46.88%', left:'26.63%' }}>
                  <div style={{ position:'absolute', top:0, right:0, bottom:'-11.63%', left:0 }}>
                    <img alt="" src={imgWG6} onError={e=>e.target.style.display='none'}
                      style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main char (front): left:0, top:7, 24×24, rotate(-13.21deg) — full face */}
          <div style={{ position:'absolute', left:0, top:7, width:28.851, height:28.851, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ transform:'rotate(-13.21deg)', flexShrink:0 }}>
              <div style={{ position:'relative', width:24, height:24, flexShrink:0 }}>
                <img alt="" src={imgHappyChar} onError={e=>e.target.style.display='none'}
                  style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                {/* Left eye */}
                <div style={{ position:'absolute', top:'35.54%', right:'56.79%', bottom:'55.75%', left:'36.24%' }}>
                  <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%' }}>
                    <img alt="" src={imgHappyFaceL} onError={e=>e.target.style.display='none'}
                      style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
                {/* Right eye (mirrored) */}
                <div style={{ position:'absolute', top:'35.54%', right:'36.24%', bottom:'55.75%', left:'56.79%' }}>
                  <div style={{ position:'absolute', top:'-30%', right:'-28.63%', bottom:'-30%', left:'-37.51%', transform:'scaleX(-1)' }}>
                    <img alt="" src={imgHappyFaceR} onError={e=>e.target.style.display='none'}
                      style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
                {/* Mouth */}
                <div style={{ position:'absolute', top:'46.34%', right:'43.9%', bottom:'45.47%', left:'44.25%' }}>
                  <div style={{ position:'absolute', top:'-25.53%', right:'-13.01%', bottom:'-25.53%', left:'-13.01%' }}>
                    <img alt="" src={imgHappyFaceM} onError={e=>e.target.style.display='none'}
                      style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Frosted badge */}
          <div style={{ position:'absolute', left:2, top:21, width:42, height:16, backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(0,0,0,0.05)', borderRadius:5 }} />
          <p style={{ position:'absolute', left:23, top:24, transform:'translateX(-50%)', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:8, color:'black', textAlign:'center', letterSpacing:'0.3px', textTransform:'uppercase', whiteSpace:'nowrap', lineHeight:'normal', margin:0 }}>Happy</p>
        </div>
      );
    }

    /* ── EXHAUSTED STICKER ZONE (Figma 208:2811) ── */
    /* Coords normalized: subtract 15.5 from Figma y-values so folder bg starts at top:0 */
    function ExhaustedStickerZone() {
      return (
        <div style={{ position:'relative', width:42, height:37, flexShrink:0 }}>
          {/* Rectangle82 backing */}
          <div style={{ position:'absolute', left:0.16, top:0, width:42, height:37 }}>
            <img alt="" src={imgExR82} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, right:'-9.52%', bottom:'-21.62%', left:'-9.52%', display:'block', width:'119.04%', height:'121.62%' }} />
          </div>

          {/* Third char body + X-eyes: left:6, top:4.5, 29.276×29.48 */}
          <div style={{ position:'absolute', left:6, top:4.5, width:29.276, height:29.48 }}>
            <img alt="" src={imgExChar3} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
            {/* Left X-eye: at left:10.1, top:10.1, 3.033×2.71 */}
            <div style={{ position:'absolute', left:10.1, top:10.1, width:3.033, height:2.71 }}>
              <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                <img alt="" src={imgExEye1} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
            <div style={{ position:'absolute', left:10.1, top:10.1, width:3.033, height:2.71, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ transform:'scaleY(-1) rotate(180deg)', flexShrink:0, width:'100%', height:'100%' }}>
                <div style={{ position:'relative', width:'100%', height:'100%' }}>
                  <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                    <img alt="" src={imgExEye2} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Right X-eye: at left:16.25, top:10.1 */}
            <div style={{ position:'absolute', left:16.25, top:10.1, width:3.033, height:2.71 }}>
              <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                <img alt="" src={imgExEye1} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
            <div style={{ position:'absolute', left:16.25, top:10.1, width:3.033, height:2.71, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ transform:'scaleY(-1) rotate(180deg)', flexShrink:0, width:'100%', height:'100%' }}>
                <div style={{ position:'relative', width:'100%', height:'100%' }}>
                  <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                    <img alt="" src={imgExEye2} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Mouth: left:10.61, top:14.69, 4.08×1.231 */}
            <div style={{ position:'absolute', left:10.61, top:14.69, width:4.08, height:1.231 }}>
              <div style={{ position:'absolute', top:'-52.64%', right:'-15.87%', bottom:'-52.64%', left:'-15.88%' }}>
                <img alt="" src={imgExMth1} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
            <div style={{ position:'absolute', left:14.69, top:14.69, width:4.08, height:1.231, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div style={{ transform:'scaleY(-1) rotate(180deg)', flexShrink:0, width:'100%', height:'100%' }}>
                <div style={{ position:'relative', width:'100%', height:'100%' }}>
                  <div style={{ position:'absolute', top:'-52.64%', right:'-15.87%', bottom:'-52.64%', left:'-15.88%' }}>
                    <img alt="" src={imgExMth2} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main char (composed with X-eyes): left:-1.84, top:7, 28×28 */}
          <div style={{ position:'absolute', left:-1.84, top:7, width:28, height:28 }}>
            <img alt="" src={imgExMain} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, objectFit:'contain', display:'block', width:'100%', height:'100%' }} />
          </div>

          {/* Secondary face: left:14, top:5.5, 27×27 */}
          <div style={{ position:'absolute', left:14, top:5.5, width:27, height:27 }}>
            <img alt="" src={imgExFace2} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
          </div>
          {/* Small accent: left:31.97, top:9.45, 7.056×8.655 */}
          <div style={{ position:'absolute', left:31.97, top:9.45, width:7.056, height:8.655 }}>
            <img alt="" src={imgExAccent} onError={e=>e.target.style.display='none'}
              style={{ display:'block', width:'100%', height:'100%' }} />
          </div>

          {/* Frosted badge */}
          <div style={{ position:'absolute', left:0.16, top:21, width:42, height:16, backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(0,0,0,0.05)', borderRadius:5 }} />
          <p style={{ position:'absolute', left:21, top:25.5, transform:'translateX(-50%)', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:8, color:'black', textAlign:'center', letterSpacing:'0.3px', textTransform:'uppercase', whiteSpace:'nowrap', lineHeight:'normal', margin:0 }}>Tired</p>
        </div>
      );
    }

    /* ── ANXIOUS STICKER ZONE ── */
    function AnxiousStickerZone() {
      return (
        <div style={{ position:'relative', width:42, height:37, flexShrink:0 }}>
          {/* Rectangle82 folder backing */}
          <div style={{ position:'absolute', left:0, top:0, width:42, height:37 }}>
            <img alt="" src={imgW82} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, right:'-9.52%', bottom:'-21.62%', left:'-9.52%', display:'block', width:'119.04%', height:'121.62%' }} />
          </div>

          {/* Anxious blob: centered-left, slight tilt */}
          <div style={{ position:'absolute', left:4, top:4, width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ transform:'rotate(-8deg)', position:'relative', width:26, height:26 }}>
              {/* Body (face baked in) */}
              <img alt="" src={imgAnxiousChar} onError={e=>e.target.style.display='none'}
                style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%', objectFit:'contain' }} />
              {/* Face overlay for extra detail */}
              <div style={{ position:'absolute', left:0, top:0, width:'26.1%', height:'32.1%', pointerEvents:'none' }}>
                <img alt="" src={imgAnxiousFace} onError={e=>e.target.style.display='none'}
                  style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
          </div>

          {/* Second smaller blob: upper right, slight opposite tilt */}
          <div style={{ position:'absolute', left:22, top:3, width:20, height:20, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ transform:'rotate(10deg)', position:'relative', width:17, height:17 }}>
              <img alt="" src={imgAnxiousChar} onError={e=>e.target.style.display='none'}
                style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%', objectFit:'contain' }} />
            </div>
          </div>

          {/* Frosted badge */}
          <div style={{ position:'absolute', left:0, top:21, width:42, height:16, backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(0,0,0,0.05)', borderRadius:5 }} />
          <p style={{ position:'absolute', left:21, top:25.5, transform:'translateX(-50%)', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:8, color:'black', textAlign:'center', letterSpacing:'0.3px', textTransform:'uppercase', whiteSpace:'nowrap', lineHeight:'normal', margin:0 }}>Anxious</p>
        </div>
      );
    }

    /* ── BORING STICKER ZONE (Figma 208:2784) ── */
    /* Coords normalized: subtract 15.5 from Figma y-values */
    function BoringStickerZone() {
      return (
        <div style={{ position:'relative', width:42, height:37, flexShrink:0 }}>
          {/* Rectangle82 backing */}
          <div style={{ position:'absolute', left:0.44, top:0, width:42, height:37 }}>
            <img alt="" src={imgBorR82} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, right:'-9.52%', bottom:'-21.62%', left:'-9.52%', display:'block', width:'119.04%', height:'121.62%' }} />
          </div>

          {/* Third char (4-slice blob body + face): left:7.14, top:5, 28.357×28.258 */}
          <div style={{ position:'absolute', left:7.14, top:5, width:28.357, height:28.258 }}>
            {/* 4-slice body: V1 at 0-25% & 50-75%, V2 at 25-50% & 75-100% */}
            <img alt="" src={imgBorCh3V1} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, left:0, right:'75%', bottom:0, display:'block', width:'25%', height:'100%', maxWidth:'none' }} />
            <img alt="" src={imgBorCh3V2} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, left:'25%', right:'50%', bottom:0, display:'block', width:'25%', height:'100%', maxWidth:'none' }} />
            <img alt="" src={imgBorCh3V1} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, left:'50%', right:'25%', bottom:0, display:'block', width:'25%', height:'100%', maxWidth:'none' }} />
            <img alt="" src={imgBorCh3V2} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', top:0, left:'75%', right:0, bottom:0, display:'block', width:'25%', height:'100%', maxWidth:'none' }} />
            {/* Face overlay: inset[41.96%_37.52%_44.76%_40.07%] */}
            <div style={{ position:'absolute', top:'41.96%', right:'37.52%', bottom:'44.76%', left:'40.07%' }}>
              {/* Left eye: rotate(-16.3deg) */}
              <div style={{ position:'absolute', top:0, right:'54.25%', bottom:'56.37%', left:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ transform:'rotate(-16.3deg)', flexShrink:0, width:'100%', height:'100%', position:'relative' }}>
                  <div style={{ position:'absolute', inset:0, left:'-44.12%' }}>
                    <img alt="" src={imgBorEye1} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
              {/* Right eye: scaleX(-1) rotate(16.3deg) */}
              <div style={{ position:'absolute', top:0, right:0, bottom:'56.37%', left:'56.79%', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ transform:'scaleX(-1) rotate(16.3deg)', flexShrink:0, width:'100%', height:'100%', position:'relative' }}>
                  <div style={{ position:'absolute', inset:0, left:'-44.12%' }}>
                    <img alt="" src={imgBorEye2} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
              </div>
            </div>
            {/* Nose line: inset[50.35%_44.6%_48.25%_42.86%] */}
            <div style={{ position:'absolute', top:'50.35%', right:'44.6%', bottom:'48.25%', left:'42.86%' }}>
              <div style={{ position:'absolute', top:'-187.5%', right:'-20.84%', bottom:'-187.55%', left:'-20.84%' }}>
                <img alt="" src={imgBorLine1} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
            {/* Mouth: inset[48.6%_40.42%_44.76%_57.84%] */}
            <div style={{ position:'absolute', top:'48.6%', right:'40.42%', bottom:'44.76%', left:'57.84%' }}>
              <div style={{ position:'absolute', top:'-39.48%', right:'-150.04%', bottom:'-39.48%', left:'-150%' }}>
                <img alt="" src={imgBorMth} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
              </div>
            </div>
          </div>

          {/* Second char: rotate(6.8deg), left:13.44, top:3, 27.611×27.762 */}
          <div style={{ position:'absolute', left:13.44, top:3, width:27.611, height:27.762, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ transform:'rotate(6.8deg)', flexShrink:0 }}>
              <div style={{ position:'relative', width:24.827, height:25 }}>
                <img alt="" src={imgBorCh2} onError={e=>e.target.style.display='none'}
                  style={{ position:'absolute', inset:0, display:'block', width:'100%', height:'100%' }} />
                {/* Left eye: at left:8.56, top:8.56, 2.572×2.298 */}
                <div style={{ position:'absolute', left:8.56, top:8.56, width:2.572, height:2.298 }}>
                  <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                    <img alt="" src={imgBorCh2V27} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
                <div style={{ position:'absolute', left:8.56, top:8.56, width:2.572, height:2.298, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ transform:'scaleY(-1) rotate(180deg)', width:'100%', height:'100%', position:'relative' }}>
                    <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                      <img alt="" src={imgBorCh2V28} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                    </div>
                  </div>
                </div>
                {/* Right eye: at left:13.78, top:8.56 */}
                <div style={{ position:'absolute', left:13.78, top:8.56, width:2.572, height:2.298 }}>
                  <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                    <img alt="" src={imgBorCh2V27} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
                <div style={{ position:'absolute', left:13.78, top:8.56, width:2.572, height:2.298, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ transform:'scaleY(-1) rotate(180deg)', width:'100%', height:'100%', position:'relative' }}>
                    <div style={{ position:'absolute', top:'-29.85%', right:'-26.67%', bottom:'-29.85%', left:'-26.67%' }}>
                      <img alt="" src={imgBorCh2V28} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                    </div>
                  </div>
                </div>
                {/* Mouth: at left:9, top:12.46 */}
                <div style={{ position:'absolute', left:9, top:12.46, width:3.46, height:1.044 }}>
                  <div style={{ position:'absolute', top:'-52.64%', right:'-15.87%', bottom:'-52.64%', left:'-15.88%' }}>
                    <img alt="" src={imgBorCh2V29} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                  </div>
                </div>
                <div style={{ position:'absolute', left:12.46, top:12.46, width:3.46, height:1.044, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ transform:'scaleY(-1) rotate(180deg)', width:'100%', height:'100%', position:'relative' }}>
                    <div style={{ position:'absolute', top:'-52.64%', right:'-15.87%', bottom:'-52.64%', left:'-15.88%' }}>
                      <img alt="" src={imgBorCh2V30} onError={e=>e.target.style.display='none'} style={{ display:'block', width:'100%', height:'100%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main char: left:-1.56, top:7, 28×28 */}
          <div style={{ position:'absolute', left:-1.56, top:7, width:28, height:28 }}>
            <img alt="" src={imgBorMain} onError={e=>e.target.style.display='none'}
              style={{ position:'absolute', inset:0, objectFit:'contain', display:'block', width:'100%', height:'100%' }} />
          </div>

          {/* Frosted badge */}
          <div style={{ position:'absolute', left:0.44, top:21, width:42, height:16, backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(0,0,0,0.05)', borderRadius:5 }} />
          <p style={{ position:'absolute', left:21.94, top:25.5, transform:'translateX(-50%)', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:8, color:'black', textAlign:'center', letterSpacing:'0.3px', textTransform:'uppercase', whiteSpace:'nowrap', lineHeight:'normal', margin:0 }}>Boring</p>
        </div>
      );
    }

    /* ── CALENDAR STICKER ZONE — mini sticker folder for calendar cells ── */
    /* Scales the Figma sticker-folder designs down to fit inside the narrow calendar cell. */
    function CalStickerZone({ mood }) {
      const m = (mood || '').toLowerCase();
      const sc = 0.72; // scale factor: 44→32px, 37→27px

      const zones = {
        good:      { comp: <GoodStickerZone />,      w:32, h:27 },
        sad:       { comp: <SadStickerZone />,       w:30, h:27 },
        happy:     { comp: <HappyStickerZone />,     w:32, h:27 },
        exhausted: { comp: <ExhaustedStickerZone />, w:30, h:27 },
        boring:    { comp: <BoringStickerZone />,    w:30, h:27 },
        anxious:   { comp: <AnxiousStickerZone />,   w:30, h:27 },
      };
      const zone = zones[m];
      if (zone) {
        return (
          <div style={{ width:zone.w, height:zone.h, position:'relative', overflow:'hidden', flexShrink:0 }}>
            <div style={{ position:'absolute', top:0, left:0, transform:`scale(${sc})`, transformOrigin:'top left' }}>
              {zone.comp}
            </div>
          </div>
        );
      }

      /* Generic folder sticker for Happy / Anxious / Grateful / Angry / etc. */
      const badgeText = {
        happy:'HAPPY', grateful:'GRTFL', angry:'ANGRY', anxious:'ANXS'
      }[m] || (mood||'').slice(0,5).toUpperCase();
      const charSrc = moodCharSrc(mood);
      return (
        <div style={{ position:'relative', width:32, height:27, flexShrink:0 }}>
          <img alt="" src={imgW82} onError={e=>e.target.style.display='none'}
            style={{ position:'absolute', top:0, left:'-9.52%', width:'119.04%', height:'121.62%', display:'block' }} />
          <div style={{ position:'absolute', left:7, top:2, width:18, height:18, zIndex:1 }}>
            <img alt="" src={charSrc} onError={e=>e.target.style.display='none'}
              style={{ width:'100%', height:'100%', objectFit:'contain' }} />
          </div>
          <div style={{ position:'absolute', left:0, top:15, width:32, height:12, backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)', background:'rgba(255,255,255,0.4)', border:'1px solid rgba(0,0,0,0.05)', borderRadius:4 }} />
          <p style={{ position:'absolute', left:0, top:17, width:32, textAlign:'center', fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:6, color:'black', letterSpacing:'0.3px', textTransform:'uppercase', whiteSpace:'nowrap', lineHeight:'normal', margin:0 }}>{badgeText}</p>
        </div>
      );
    }
