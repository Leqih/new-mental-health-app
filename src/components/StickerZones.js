    /* ── STICKER ZONES — shared between DayCard & CalStickerZone ── */

    /* Mood → folder palette (CSS-only, never expires) */
    const FOLDER_PALETTE = {
      good:      { bg:'rgba(210,244,164,0.94)', tab:'rgba(182,222,128,0.96)', emoji:'😊' },
      sad:       { bg:'rgba(192,220,248,0.94)', tab:'rgba(156,198,234,0.96)', emoji:'😢' },
      happy:     { bg:'rgba(255,244,162,0.94)', tab:'rgba(238,224,120,0.96)', emoji:'😄' },
      excited:   { bg:'rgba(255,244,162,0.94)', tab:'rgba(238,224,120,0.96)', emoji:'😄' },
      grateful:  { bg:'rgba(255,222,164,0.94)', tab:'rgba(240,198,128,0.96)', emoji:'🥹' },
      anxious:   { bg:'rgba(255,194,208,0.94)', tab:'rgba(238,162,182,0.96)', emoji:'😰' },
      exhausted: { bg:'rgba(216,208,248,0.94)', tab:'rgba(190,180,234,0.96)', emoji:'😴' },
      boring:    { bg:'rgba(172,238,230,0.94)', tab:'rgba(140,216,208,0.96)', emoji:'😑' },
      angry:     { bg:'rgba(255,198,182,0.94)', tab:'rgba(238,162,142,0.96)', emoji:'😠' },
      tired:     { bg:'rgba(216,208,248,0.94)', tab:'rgba(190,180,234,0.96)', emoji:'😴' },
    };

    /* Returns a data-URI for a mood SVG character */
    const getMoodSrc = (mood) => {
      if (!window.moodCharSVG) return null;
      return `data:image/svg+xml,${encodeURIComponent(window.moodCharSVG((mood||'').toLowerCase()))}`;
    };

    /* Three overlapping character cluster — mirrors original Figma sticker layout */
    function CharCluster({ mood }) {
      const src = getMoodSrc(mood);
      if (!src) return null;
      const img = (style) => (
        <img alt="" src={src} style={{ position:'absolute', objectFit:'contain', pointerEvents:'none', ...style }} />
      );
      return (
        <>
          {/* Back character — right, slightly larger, rotated CW */}
          {img({ left:13, top:2,  width:24, height:20, transform:'rotate(8deg)',   transformOrigin:'center center' })}
          {/* Third character — middle back */}
          {img({ left:7,  top:4,  width:22, height:18, transform:'rotate(5deg)',   transformOrigin:'center center', opacity:0.88 })}
          {/* Main character — front left, rotated CCW */}
          {img({ left:0,  top:6,  width:24, height:20, transform:'rotate(-13deg)', transformOrigin:'center center' })}
        </>
      );
    }

    /* Pure-CSS folder sticker with 3-character cluster */
    function CssFolderSticker({ mood, label }) {
      const m = (mood || '').toLowerCase();
      const pal = FOLDER_PALETTE[m] || { bg:'rgba(230,230,230,0.94)', tab:'rgba(200,200,200,0.96)' };
      const lbl = label || mood || '?';
      return (
        <div style={{ position:'relative', width:42, height:37, flexShrink:0 }}>
          {/* Folder tab */}
          <div style={{
            position:'absolute', top:-5, left:2, width:14, height:7,
            background:pal.tab, borderRadius:'3px 3px 0 0',
            border:'1px solid rgba(0,0,0,0.07)', borderBottom:'none',
          }} />
          {/* Folder body */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, bottom:0,
            background:pal.bg, borderRadius:'0 7px 7px 7px',
            border:'1px solid rgba(0,0,0,0.07)',
            boxShadow:'0 2px 5px rgba(0,0,0,0.05)',
          }} />
          {/* Three-character cluster */}
          <CharCluster mood={m} />
          {/* Frosted badge */}
          <div style={{
            position:'absolute', left:1, bottom:0, right:1, height:14,
            backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)',
            background:'rgba(255,255,255,0.50)',
            border:'1px solid rgba(0,0,0,0.05)', borderRadius:4,
          }} />
          <p style={{
            position:'absolute', left:0, bottom:2, width:'100%', textAlign:'center',
            fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:8,
            color:'rgba(20,20,19,0.75)', letterSpacing:'0.3px', textTransform:'uppercase',
            whiteSpace:'nowrap', lineHeight:'normal', margin:0,
          }}>{lbl}</p>
        </div>
      );
    }

    function GoodStickerZone()      { return <CssFolderSticker mood="good"      label="Good"    />; }
    function SadStickerZone()       { return <CssFolderSticker mood="sad"       label="Sad"     />; }
    function HappyStickerZone()     { return <CssFolderSticker mood="happy"     label="Happy"   />; }
    function ExhaustedStickerZone() { return <CssFolderSticker mood="exhausted" label="Tired"   />; }
    function BoringStickerZone()    { return <CssFolderSticker mood="boring"    label="Boring"  />; }
    function AnxiousStickerZone()   { return <CssFolderSticker mood="anxious"   label="Anxious" />; }
    function GratefulStickerZone()  { return <CssFolderSticker mood="grateful"  label="Grtfl"   />; }
    function AngryStickerZone()     { return <CssFolderSticker mood="angry"     label="Angry"   />; }
    function ExcitedStickerZone()   { return <CssFolderSticker mood="excited"   label="Excitd"  />; }

    /* Sticker zone for empty (TODAY/WED/THUR) */
    function EmptyStickerZone() {
      return (
        <div style={{ position:'relative', width:42, height:37, flexShrink:0 }}>
          {/* Folder tab */}
          <div style={{
            position:'absolute', top:-5, left:2, width:14, height:7,
            background:'rgba(200,200,200,0.6)', borderRadius:'3px 3px 0 0',
            border:'1px solid rgba(0,0,0,0.06)', borderBottom:'none',
          }} />
          {/* Folder body */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, bottom:0,
            background:'rgba(240,240,240,0.7)', borderRadius:'0 7px 7px 7px',
            border:'1px solid rgba(0,0,0,0.06)',
            boxShadow:'0 2px 4px rgba(0,0,0,0.03)',
          }} />
          {/* Frosted badge */}
          <div style={{
            position:'absolute', left:1, bottom:0, right:1, height:14,
            backdropFilter:'blur(2px)', WebkitBackdropFilter:'blur(2px)',
            background:'rgba(255,255,255,0.45)',
            border:'1px solid rgba(0,0,0,0.05)', borderRadius:4,
          }} />
          <p style={{
            position:'absolute', left:0, bottom:2, width:'100%', textAlign:'center',
            fontFamily:'Sofia Sans,sans-serif', fontWeight:500, fontSize:8,
            color:'rgba(20,20,19,0.40)', letterSpacing:'0.3px', textTransform:'uppercase',
            whiteSpace:'nowrap', lineHeight:'normal', margin:0,
          }}>?</p>
        </div>
      );
    }

    /* ── CALENDAR STICKER ZONE — mini sticker folder for calendar cells ── */
    function CalStickerZone({ mood }) {
      const m = (mood || '').toLowerCase();
      const sc = 0.72; // scale factor: 44→32px, 37→27px

      const ZoneMap = {
        good:      <GoodStickerZone />,
        sad:       <SadStickerZone />,
        happy:     <HappyStickerZone />,
        excited:   <ExcitedStickerZone />,
        exhausted: <ExhaustedStickerZone />,
        tired:     <ExhaustedStickerZone />,
        boring:    <BoringStickerZone />,
        anxious:   <AnxiousStickerZone />,
        grateful:  <GratefulStickerZone />,
        angry:     <AngryStickerZone />,
      };
      const zone = ZoneMap[m] || <CssFolderSticker mood={m} label={(mood||'').slice(0,5)} />;

      return (
        <div style={{ width:32, height:27, position:'relative', overflow:'hidden', flexShrink:0 }}>
          <div style={{ position:'absolute', top:0, left:0, transform:`scale(${sc})`, transformOrigin:'top left' }}>
            {zone}
          </div>
        </div>
      );
    }
