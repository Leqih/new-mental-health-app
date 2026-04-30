    /* ── VECTOR face icon (star/blob with layered eyes — Figma node 56:57) ── */
    function VectorFace({ style }) {
      return (
        <div style={{ position:'relative', width:18, height:18, flexShrink:0, ...style }}>
          <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgVectorBody} />
          <div style={{ position:'absolute', top:'35.54%', right:'56.79%', bottom:'55.75%', left:'36.24%' }}>
            <div style={{ position:'absolute', inset:'-30% -28.63% -30% -37.51%' }}>
              <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgVecEyeL} />
            </div>
          </div>
          <div style={{ position:'absolute', top:'35.54%', right:'36.24%', bottom:'55.75%', left:'56.79%' }}>
            <div style={{ transform:'scaleX(-1)', position:'relative', width:'100%', height:'100%' }}>
              <div style={{ position:'absolute', inset:'-30% -28.63% -30% -37.51%' }}>
                <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgVecEyeR} />
              </div>
            </div>
          </div>
          <div style={{ position:'absolute', top:'46.34%', right:'43.9%', bottom:'45.47%', left:'44.25%' }}>
            <div style={{ position:'absolute', inset:'-25.53% -13.01% -25.53% -13.01%' }}>
              <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgVecSmile} />
            </div>
          </div>
        </div>
      );
    }

    /* ── MOOD GRID CELL: good/happy face (green flower — Figma node 60:195) ── */
    function GoodFaceCell({ style }) {
      return (
        <div style={{ display:'inline-grid', gridTemplateColumns:'max-content', gridTemplateRows:'max-content', lineHeight:0, placeItems:'start', position:'relative', flexShrink:0, ...style }}>
          <div style={{ gridColumn:1, height:18.481, marginLeft:0, marginTop:0, position:'relative', gridRow:1, width:18.809 }}>
            <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgVector1} />
          </div>
          <div style={{ gridColumn:1, height:3.146, marginLeft:6.42, marginTop:7.05, position:'relative', gridRow:1, width:6.029 }}>
            <div style={{ position:'absolute', inset:'0 0 -15.63% 0' }}>
              <img alt="" style={{ display:'block', maxWidth:'none', width:'100%', height:'100%' }} src={imgGroup6} />
            </div>
          </div>
        </div>
      );
    }

    /* ── MOOD GRID CELL: sad face (pink gem — Figma node 60:211) ── */
    function SadFaceCell({ style }) {
      return (
        <div style={{ display:'inline-grid', gridTemplateColumns:'max-content', gridTemplateRows:'max-content', lineHeight:0, placeItems:'start', position:'relative', flexShrink:0, ...style }}>
          <div style={{ gridColumn:1, marginLeft:0, marginTop:0, position:'relative', gridRow:1, width:18, height:18 }}>
            <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgGroup14} />
          </div>
          <div style={{ gridColumn:1, height:5.77, marginLeft:11.98, marginTop:2.63, position:'relative', gridRow:1, width:4.704 }}>
            <img alt="" style={{ position:'absolute', display:'block', inset:0, maxWidth:'none', width:'100%', height:'100%' }} src={imgGroup12} />
          </div>
        </div>
      );
    }
