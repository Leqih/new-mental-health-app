    /* ── VECTOR face icon (star/blob with layered eyes — Figma node 56:57) ── */
    function VectorFace({ style }) {
      return (
        <div style={{ position:'relative', width:18, height:18, flexShrink:0, ...style }}
          dangerouslySetInnerHTML={{ __html: window.buildIconHTML('Happy') }} />
      );
    }

    /* ── MOOD GRID CELL: good/happy face (green flower — Figma node 60:195) ── */
    function GoodFaceCell({ style }) {
      return (
        <div style={{ position:'relative', width:18.809, height:18.481, flexShrink:0, ...style }}
          dangerouslySetInnerHTML={{ __html: window.buildIconHTML('Good') }} />
      );
    }

    /* ── MOOD GRID CELL: sad face (pink gem — Figma node 60:211) ── */
    function SadFaceCell({ style }) {
      return (
        <div style={{ position:'relative', width:18, height:18, flexShrink:0, ...style }}
          dangerouslySetInnerHTML={{ __html: window.buildIconHTML('Sad') }} />
      );
    }
