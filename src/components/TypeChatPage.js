    const { useEffect, useRef, useState } = React;
    /* ── TYPE CHAT PAGE ── */
    const UIUC_RESOURCES = {
      caps:      { level:2, icon:'🏛️', title:'CAPS Counseling',    sub:'Free counseling for UIUC students',   tagline:'Professional counselors for anxiety, depression, stress & life transitions.',  tags:['Free','Confidential','Walk-ins OK'],           detail:'610 E. John St · M–F 8am–5pm',     phone:'(217) 333-3704', color:'#3b82f6' },
      letsTalk:  { level:2, icon:'💬', title:"Let's Talk",          sub:'Free 15-min drop-in, no appointment', tagline:'Drop in for a free 15-min chat — no appointment, no commitment, no paperwork.',  tags:['Free','No appointment','15 min'],              detail:'Multiple campus locations',         phone:'(217) 333-3704', color:'#7c3aed' },
      mckinley:  { level:3, icon:'🏥', title:'McKinley Health',     sub:'Mental health & physical care',       tagline:'UIUC student health combining mental and physical support under one roof.',         tags:['Free','Mental + physical','On-campus'],        detail:'1109 S. Lincoln Ave',               phone:'(217) 333-2700', color:'#059669' },
      crisis:    { level:1, icon:'🆘', title:'988 Crisis Line',     sub:'Immediate support, 24/7',             tagline:"Real people, any time. You don't need to be 'in danger' — struggling is enough.",  tags:['24/7','Free','Anonymous'],                    detail:'Call or text — always available',   phone:'988',            color:'#dc2626' },
      text741:   { level:1, icon:'📱', title:'Crisis Text Line',    sub:'Text HOME to 741741',                 tagline:'Prefer typing? Text a trained crisis counselor — free, confidential, any time.',   tags:['24/7','Free','Text-based'],                   detail:'24/7 · free · confidential',        phone:'741741',         color:'#2563eb' },
      resilience:{ level:3, icon:'🤝', title:'Resilience @ UIUC',  sub:'Peer wellness coaching',              tagline:'Student peer coaches who have been through similar experiences — casual & free.',   tags:['Free','Peer-led','Student coaches'],           detail:'Free, student-led sessions',        phone:'(217) 333-3704', color:'#d97706' },
      breathing: { level:4, icon:'🌬️', title:'Breathing Exercise', sub:'4-7-8 technique · 2 min',            tagline:'Inhale 4s, hold 7s, exhale 8s. Activates your body\'s calm response — try it now.', tags:['Do it now','2 minutes','Science-backed'],      detail:'Inhale 4s · Hold 7s · Exhale 8s',  phone:null,             color:'#0891b2' },
      odos:      { level:3, icon:'🎓', title:'Dean of Students',    sub:'Academic & personal advocacy',        tagline:'Extensions, incomplete grades & accommodations when stress hits your coursework.',   tags:['Extensions','Accommodations','Advocacy'],     detail:'Turner Student Services Bldg',      phone:'(217) 333-0050', color:'#be185d' },
    };

    function ResourceCard({ res, SF }) {
      const BADGE = { 1:['URGENT','#dc2626','rgba(254,226,226,0.95)'], 2:['START HERE','#7c3aed','rgba(237,233,254,0.95)'], 3:['RECOMMENDED','#059669','rgba(209,250,229,0.95)'], 4:['HELPFUL','#0891b2','rgba(224,242,254,0.95)'] };
      const [bLabel, bText, bBg] = BADGE[res.level] || BADGE[3];
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.96)', borderRadius:16, overflow:'hidden', boxShadow:'0 2px 14px rgba(20,20,19,0.09)', border:'1px solid rgba(20,20,19,0.06)', display:'flex' }}>
          <div style={{ width:3, background:res.color, flexShrink:0 }} />
          <div style={{ flex:1, padding:'11px 13px' }}>
            {/* Header: icon + title + priority badge */}
            <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:8 }}>
              <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                <div style={{ width:32, height:32, borderRadius:10, background:`${res.color}18`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontSize:16, lineHeight:1 }}>{res.icon}</span>
                </div>
                <div>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:'#141413', fontFamily:SF, letterSpacing:'-0.2px', lineHeight:1.3 }}>{res.title}</p>
                  <p style={{ margin:0, fontSize:10.5, color:'rgba(20,20,19,0.44)', fontFamily:SF, lineHeight:1.3 }}>{res.sub}</p>
                </div>
              </div>
              <div style={{ flexShrink:0, background:bBg, borderRadius:99, padding:'3px 8px', marginTop:1 }}>
                <span style={{ fontSize:9, fontWeight:800, color:bText, fontFamily:SF, letterSpacing:'0.5px' }}>{bLabel}</span>
              </div>
            </div>
            {/* Tagline */}
            {res.tagline && (
              <p style={{ margin:'7px 0 7px', fontSize:11.5, color:'rgba(20,20,19,0.56)', fontFamily:SF, lineHeight:1.45 }}>{res.tagline}</p>
            )}
            {/* Attribute chips */}
            {res.tags && (
              <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:8 }}>
                {res.tags.map(t => (
                  <div key={t} style={{ background:`${res.color}14`, border:`1px solid ${res.color}30`, borderRadius:99, padding:'3px 9px' }}>
                    <span style={{ fontSize:10.5, fontWeight:700, color:res.color, fontFamily:SF }}>{t}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Footer: location + call button */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:8 }}>
              <p style={{ margin:0, fontSize:10, color:'rgba(20,20,19,0.34)', fontFamily:SF, letterSpacing:'0.1px', lineHeight:1.4 }}>{res.detail}</p>
              {res.phone && (
                <div style={{ flexShrink:0, display:'flex', alignItems:'center', gap:4, background:res.color, borderRadius:99, padding:'5px 11px', cursor:'pointer', boxShadow:`0 2px 8px ${res.color}44` }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/></svg>
                  <span style={{ fontSize:11, fontWeight:700, color:'white', fontFamily:SF, whiteSpace:'nowrap' }}>{res.phone}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    /* ── INLINE WIDGETS ── */
    function DurationWidget({ onAnswer, answered, SF }) {
      const [sel, setSel] = useState(null);
      const opts = ['Just today','A few days','About a week','2–3 weeks','Over a month','A long time'];
      if (answered) return (
        <div style={{ marginLeft:36, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'5px 13px', border:'1px solid rgba(130,90,220,0.18)', animation:'msgIn 0.25s ease-out' }}>
          <span style={{ fontSize:12, color:'rgba(110,65,200,0.9)', fontFamily:SF, fontWeight:700 }}>✓ {answered}</span>
        </div>
      );
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.95)', borderRadius:14, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 1px 8px rgba(20,20,19,0.06)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'10px 12px' }}>
            <p style={{ margin:'0 0 9px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>How long?</p>
            <div style={{ display:'flex', gap:6, overflowX:'auto', paddingBottom:2 }}>
              {opts.map(o => (
                <div key={o} onClick={() => { setSel(o); setTimeout(() => onAnswer(o), 220); }}
                  style={{ flexShrink:0, padding:'7px 13px', borderRadius:99, border:`1.5px solid ${sel===o?'#9b6ef3':'rgba(20,20,19,0.12)'}`, background:sel===o?'#9b6ef3':'transparent', cursor:'pointer', transition:'all 0.16s' }}>
                  <span style={{ fontSize:12.5, fontWeight:600, color:sel===o?'white':'rgba(20,20,19,0.65)', fontFamily:SF, whiteSpace:'nowrap' }}>{o}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    function TagWidget({ options, label, onAnswer, answered, SF }) {
      const [picks, setPicks] = useState([]);
      const toggle = t => setPicks(p => p.includes(t) ? p.filter(x=>x!==t) : [...p,t]);
      if (answered) return (
        <div style={{ marginLeft:36, display:'flex', flexWrap:'wrap', gap:5, maxWidth:'86%', animation:'msgIn 0.25s ease-out' }}>
          {answered.split(' · ').map(t => (
            <div key={t} style={{ background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'4px 10px', border:'1px solid rgba(130,90,220,0.18)' }}>
              <span style={{ fontSize:11.5, color:'rgba(110,65,200,0.85)', fontFamily:SF, fontWeight:700 }}>✓ {t}</span>
            </div>
          ))}
        </div>
      );
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.95)', borderRadius:14, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 1px 8px rgba(20,20,19,0.06)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'10px 12px' }}>
            <p style={{ margin:'0 0 9px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>{label || 'Pick any that apply'}</p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:10 }}>
              {options.map(t => (
                <div key={t} onClick={() => toggle(t)}
                  style={{ padding:'6px 12px', borderRadius:99, border:`1.5px solid ${picks.includes(t)?'#9b6ef3':'rgba(20,20,19,0.11)'}`, background:picks.includes(t)?'rgba(155,110,243,0.1)':'transparent', cursor:'pointer', transition:'all 0.15s' }}>
                  <span style={{ fontSize:12.5, fontWeight:600, color:picks.includes(t)?'#7b4fd4':'rgba(20,20,19,0.62)', fontFamily:SF }}>{t}</span>
                </div>
              ))}
            </div>
            {picks.length > 0 && (
              <div onClick={() => onAnswer(picks.join(' · '))}
                style={{ display:'inline-flex', alignItems:'center', gap:5, background:'linear-gradient(135deg,#9b6ef3,#7b4fd4)', borderRadius:99, padding:'7px 16px', cursor:'pointer', boxShadow:'0 2px 8px rgba(120,70,220,0.28)' }}>
                <span style={{ fontSize:12.5, fontWeight:700, color:'white', fontFamily:SF }}>Done  →</span>
              </div>
            )}
          </div>
        </div>
      );
    }

    function ScaleWidget({ label, onAnswer, answered, SF }) {
      const [sel, setSel] = useState(null);
      const opts = [{v:1,e:'😌',l:'Mild'},{v:2,e:'😕',l:'Noticeable'},{v:3,e:'😟',l:'Moderate'},{v:4,e:'😣',l:'Intense'},{v:5,e:'😰',l:'Overwhelming'}];
      if (answered) {
        const f = opts.find(o => o.l === answered);
        return (
          <div style={{ marginLeft:36, display:'inline-flex', alignItems:'center', gap:6, background:'rgba(130,90,220,0.09)', borderRadius:99, padding:'5px 13px', border:'1px solid rgba(130,90,220,0.18)', animation:'msgIn 0.25s ease-out' }}>
            <span style={{ fontSize:12, color:'rgba(110,65,200,0.9)', fontFamily:SF, fontWeight:700 }}>✓ {f?.e} {answered}</span>
          </div>
        );
      }
      return (
        <div style={{ marginLeft:36, maxWidth:'86%', background:'rgba(255,255,255,0.95)', borderRadius:14, overflow:'hidden', border:'1px solid rgba(20,20,19,0.055)', boxShadow:'0 1px 8px rgba(20,20,19,0.06)', animation:'msgIn 0.28s ease-out' }}>
          <div style={{ borderLeft:'3px solid #9b6ef3', padding:'10px 12px' }}>
            <p style={{ margin:'0 0 9px', fontSize:10.5, fontWeight:700, color:'rgba(20,20,19,0.38)', fontFamily:SF, letterSpacing:'0.5px', textTransform:'uppercase' }}>{label || 'How intense does it feel?'}</p>
            <div style={{ display:'flex', gap:5 }}>
              {opts.map(o => (
                <div key={o.v} onClick={() => { setSel(o.v); setTimeout(() => onAnswer(o.l), 220); }}
                  style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'8px 2px', borderRadius:12, border:`1.5px solid ${sel===o.v?'#9b6ef3':'rgba(20,20,19,0.08)'}`, background:sel===o.v?'rgba(155,110,243,0.12)':'transparent', cursor:'pointer', transition:'all 0.15s' }}>
                  <span style={{ fontSize:22 }}>{o.e}</span>
                  <span style={{ fontSize:9, fontWeight:600, color:'rgba(20,20,19,0.42)', fontFamily:SF, textAlign:'center', lineHeight:1.2 }}>{o.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    function TypeChatPage({ onBack, userName, initialTopic }) {
      const SF = 'Sofia Sans,sans-serif';
      const R = UIUC_RESOURCES;
      const [input, setInput] = useState('');
      const [messages, setMessages] = useState([
        { from:'ai', text:`Hey ${userName} 💙 No pressure, no judgment — I'm just here to listen. What's going on for you today?` },
      ]);
      const [typing, setTyping] = useState(false);
      const [chips, setChips] = useState(["I've been anxious","I'm overwhelmed","I can't sleep","Something happened","I feel alone","I just need to vent"]);
      const [turn, setTurn] = useState(0);
      const [lastIntent, setLastIntent] = useState(null);
      const [widgetAnswers, setWidgetAnswers] = useState({});
      const widgetCount = useRef(0);
      const messagesRef = useRef(null);
      const didAutoSend = useRef(false);

      const AI_AVATAR = (
        <div style={{ width:26, height:26, borderRadius:13, background:'linear-gradient(145deg,#c4a8f8,#9b72e8)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginBottom:2, boxShadow:'0 2px 8px rgba(140,100,220,0.32)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35z" fill="rgba(255,255,255,0.9)" stroke="none"/>
          </svg>
        </div>
      );

      /* Phase 1 — listen, empathise, ask a follow-up (no resources yet) */
      const LISTEN = {
        crisis:      { text: "I'm really glad you said something — that took courage 💙 Can you tell me a little more about where you're at right now? Even just a few words.", chips: ["I'm having really dark thoughts","I'm not in immediate danger","I just needed to tell someone","I honestly don't know how to explain it"] },
        anxiety:     { text: "Anxiety is relentless like that — it basically turns up the volume on everything 😮‍💨 How long has this been showing up for you?", widget:{ type:'duration' }, chips: ["It's been building for a while","Something specific happened","It just hit me out of nowhere","Honestly, I don't know"] },
        overwhelmed: { text: "Ugh, that \"everything at once\" feeling is so real 😩 You're not falling apart — you're just carrying a lot. What's taking up the most headspace right now?", widget:{ type:'tags', label:"What's weighing on you most?", options:["Exams & deadlines","Coursework load","Friendship issues","Romantic stress","Family pressure","Finances","Everything at once","Can't even pinpoint it"] }, chips: ["School and deadlines","Literally everything at once","My social life is a mess","I just can't sleep"] },
        lonely:      { text: "Feeling lonely in a place full of people is honestly one of the hardest things 💙 How does it show up for you?", widget:{ type:'tags', label:"How does it show up?", options:["Missing real connection","No one truly gets me","Drifted from friends","New here, know no one","Left out of things","Surrounded by people but alone","Just numb inside"] }, chips: ["I miss feeling close to people","No one really gets me","I've drifted from my friends","I just moved here and know no one"] },
        sleep:       { text: "Sleep deprivation makes literally everything harder — your brain, your mood, your whole outlook 😴 What's been getting in the way?", widget:{ type:'tags', label:"What gets in the way?", options:["Mind racing at night","Anxiety before bed","Doom-scrolling too late","Irregular schedule","Waking up in the night","Nightmares","Just can't wind down"] }, chips: ["My mind won't shut off","I'm stressed about too many things","My sleep schedule is just broken","I feel anxious before bed"] },
        academic:    { text: "Academic pressure has this way of piling up fast and getting heavy 📚 Are you feeling behind, or is it more about dreading something specific ahead?", widget:{ type:'tags', label:"What's the pressure about?", options:["Behind on coursework","Scared of failing","A specific exam","A difficult professor","Can't focus at all","Lost motivation","Imposter syndrome","Juggling too much"] }, chips: ["I'm so far behind","I'm scared of failing","I can't focus at all","I just don't care about anything anymore"] },
        resources:   { text: "Of course — happy to share what UIUC has 💙 Before I do, can I ask what's going on? Even just a word or two helps me point you to the right place.", widget:{ type:'tags', label:"What's going on?", options:["Anxiety","Feeling overwhelmed","Loneliness","Sleep issues","Academic stress","A crisis","Not sure"] }, chips: ["I'm feeling anxious","I'm overwhelmed","I might need to talk to someone","It's a crisis"] },
        caps:        { text: "CAPS is really worth knowing about 💜 Before I share the details — what kind of support are you hoping to find?", widget:{ type:'tags', label:"What are you hoping for?", options:["Someone to talk to","Ongoing therapy","A one-time check-in","Medication support","Not sure yet","Something urgent"] }, chips: ["I want to book an appointment","I'm not sure if I need therapy","I want to talk to someone first","It feels urgent"] },
        better:      { text: "That genuinely makes me happy to hear 💜 What shifted for you — even just a little?", chips: ["I talked to someone","Things just got a bit lighter","I needed to vent and it helped","I'm not sure, but thanks"] },
        default:     { text: "I hear you — thank you for trusting me with that 💙 How intense does this get for you on a day-to-day basis?", widget:{ type:'scale' }, chips: ["It affects my sleep","It's hard to focus on anything","I isolate myself","I just feel really numb"] },
      };

      /* Phase 2 — dig deeper, one specific follow-up before resources */
      const DEEPEN = {
        crisis:      { text: "I hear you — and I'm not going anywhere 💙 You don't need perfect words. Right now in this moment — are you somewhere safe?", chips: ["Yes, I'm safe right now","I'm home but struggling","I'm not sure how I feel","I need help right now"] },
        anxiety:     { text: "I'm curious 🤔 — when it hits, does it tend to live more in your head (thoughts spiraling, imagining worst-case), or does it get physical too, like tightness in your chest or that restless can't-sit-still feeling?", widget:{ type:'tags', label:'Where does it show up?', options:["Racing, looping thoughts","Tight chest or shallow breath","Restless — can't sit still","Hard to focus on anything","Sudden dread for no reason","All of the above, honestly"] }, chips: ["Mostly in my head — thoughts spiral","Physical — chest, stomach, restless","Both at the same time","It's hard to put into words"] },
        overwhelmed: { text: "Makes sense 😔 When everything piles up — do you tend to shut down and go quiet, or does it come out more as anxious restlessness, where you can't stop thinking but also can't start anything?", chips: ["I shut down and go numb","I get anxious and can't settle","Both, depending on the day","I honestly don't know anymore"] },
        lonely:      { text: "I hear you 💙 Is there someone specific you wish you felt closer to, or is it more of a general ache — like something important is just... missing?", chips: ["There is someone specific","More of a general feeling","I've kind of stopped trying","I'm not sure what I even need"] },
        sleep:       { text: "When you're lying there and can't sleep — what tends to take over? 😔 A specific worry going in circles, or more like your brain just refuses to switch off?", chips: ["A specific worry I can't shake","Replaying things from the day","Nothing specific — mind just races","More physical — body just can't relax"] },
        academic:    { text: "That weight is real 📚 When you imagine things not going well — what's the part that scares you most?", chips: ["Failing a class or exam","Disappointing my family","Losing a scholarship or opportunity","I just can't see a way forward"] },
        resources:   { text: "Of course 💙 Before I share — is there something specific going on, or are you more just exploring what's out there?", chips: ["Something specific is going on","I just want to know my options","It's for a friend actually","I think I might need therapy"] },
        caps:        { text: "That's a good step to be thinking about 💜 What's drawing you toward CAPS — has something been happening, or is it more of a 'just in case' feeling?", chips: ["Something has been going on","I've been struggling for a while","More of a 'just in case'","I'd rather start with Let's Talk"] },
        better:      { text: "That genuinely makes me happy to hear 💜 Do you feel like you have enough support around you to keep feeling that way — or is it still a bit fragile?", chips: ["I think I do have support","It feels a bit fragile","Not sure — it could shift","I just needed to get it out"] },
        default:     { text: "I want to make sure I really understand 💙 When you're in the middle of it — does it feel more like a heavy weight (numb, sad, withdrawn), or more like anxious restlessness you can't shake?", widget:{ type:'tags', label:'How does it tend to feel?', options:["Heavy, numb, withdrawn","Anxious and restless","Sad, like something is missing","Angry or frustrated","Empty — like nothing matters","It shifts all the time"] }, chips: ["Heavy and numb","Anxious and on edge","Sad and withdrawn","It shifts constantly"] },
      };

      /* Phase 3 — gentle resource suggestion, woven naturally */
      const SUPPORT = {
        crisis:      { text: "Thank you for telling me that 💙 Right now, this very second, there are real people ready to talk — no wait, no judgment, completely confidential. Please reach out — you deserve that support.", resources:[R.crisis, R.text741, R.caps], chips:["How do I call 988?","Tell me about CAPS","I'm not sure I'm ready yet"] },
        anxiety:     { text: "What you're describing is real — and exhausting 😮‍💨 You deserve actual support, not just tips. CAPS is free and confidential, Let's Talk is a no-appointment drop-in if you want to ease in, and there's also a quick breathing technique that can help right now.", resources:[R.caps, R.letsTalk, R.breathing], chips:["How do I book CAPS?","What is Let's Talk exactly?","Try the breathing exercise with me"] },
        overwhelmed: { text: "That's a lot to be carrying alone 😔 CAPS has counselors who specialize in exactly what you're describing — and Let's Talk is a walk-in option if you just need to talk to a real person soon. You don't have to keep white-knuckling it.", resources:[R.caps, R.letsTalk, R.odos], chips:["What is Let's Talk?","I need an academic extension","How do I reach CAPS?"] },
        lonely:      { text: "Connection is a real need, not a luxury 💙 UIUC's Resilience program pairs you with a peer coach who's genuinely been through similar things — and it's free. Sometimes talking to someone who truly *gets it* makes all the difference.", resources:[R.resilience, R.caps, R.letsTalk], chips:["Tell me more about Resilience","I'd rather talk to a counselor","Where do I start?"] },
        sleep:       { text: "Sleep and mental health are so deeply connected 😴 McKinley can help with the physical side, and CAPS can work with you on what's underneath — whether it's anxiety, stress, or something else. You don't have to figure it out alone.", resources:[R.mckinley, R.caps, R.breathing], chips:["How do I reach McKinley?","I think it's anxiety","Show me the breathing exercise"] },
        academic:    { text: "That weight is valid — and you don't have to push through it alone 📚 The Dean of Students can help with extensions and accommodations, and CAPS is there for the emotional side of academic stress too.", resources:[R.odos, R.caps, R.letsTalk], chips:["I need an accommodation","I want to talk to someone","What is CAPS?"] },
        resources:   { text: "Here are the main options at UIUC 💙 All free, all confidential — no insurance needed, and you can reach out any time.", resources:[R.caps, R.letsTalk, R.mckinley, R.resilience], chips:["I need crisis support now","Tell me about Let's Talk","How do I book CAPS?"] },
        caps:        { text: "CAPS is free for all UIUC students — no insurance needed 💜 You can call to schedule or just show up for a same-day consult. Let's Talk is even easier: no appointment, just walk in for a free 15-minute chat.", resources:[R.caps, R.letsTalk], chips:["Where is the Let's Talk drop-in?","I need crisis support","Thanks, I feel better"] },
        better:      { text: "I'm really glad to hear that 💜 Checking in with yourself like this matters more than people realise. Come back any time — even just to talk.", resources:[], chips:["Show me UIUC resources","One more thing…","Take care, bye!"] },
        default:     { text: "I hear you 💙 You've been holding a lot. There are people at UIUC trained for exactly this — free, confidential, no insurance needed. You don't have to figure it out alone.", resources:[R.caps, R.letsTalk], chips:["Show me all UIUC resources","I'd like to talk to someone","I just needed to vent, thanks"] },
      };

      const detectIntent = (text) => {
        const t = text.toLowerCase();
        if (/crisis|suicid|hurt.{0,6}self|end (my|it all)|can't (go on|take it)|emergency|dark thought/.test(t)) return 'crisis';
        if (/anx(ious|iety)|panic|nervous|worried|fear|dread/.test(t)) return 'anxiety';
        if (/overwhelm|burnout|burnt.?out|too much|can't cope|breaking down|white.?knuckl/.test(t)) return 'overwhelmed';
        if (/lone(ly|liness)|alone|isolated|no.{0,5}friend|disconnect|no one gets/.test(t)) return 'lonely';
        if (/sleep|insomnia|can't sleep|up all night|racing mind/.test(t)) return 'sleep';
        if (/academi|grade|exam|fail|study|class|professor|assignment|deadline|extension/.test(t)) return 'academic';
        if (/resource|what.{0,10}(help|option|available)|uiuc|counseling|therapist|professional/.test(t)) return 'resources';
        if (/caps|counseling center|let.?s talk|mckinley/.test(t)) return 'caps';
        if (/\b(better|good|great|thank|helped?|feel better|lighter)\b/.test(t)) return 'better';
        return 'default';
      };

      const answerWidget = (id, text) => {
        setWidgetAnswers(prev => ({ ...prev, [id]: text }));
        sendMessage(text);
      };

      const sendMessage = (textOverride) => {
        const text = (textOverride || input).trim();
        if (!text) return;
        const newTurn = turn + 1;
        setTurn(newTurn);
        setMessages(m => [...m, { from:'user', text }]);
        setInput('');
        setTyping(true);
        const intent = detectIntent(text);
        const isCrisis = intent === 'crisis';
        const wantsResources = /resource|caps|counseling|help.{0,10}now|urgent|let.?s talk/.test(text.toLowerCase());
        const useSupport = isCrisis || wantsResources || newTurn >= 3;
        const useDeepen  = !useSupport && newTurn === 2;
        // For deepen/support, stay on the original thread from turn 1
        const threadIntent = (useDeepen || useSupport) ? (lastIntent || intent) : intent;
        setLastIntent(intent);
        const resp = useSupport ? (SUPPORT[threadIntent] || SUPPORT.default)
                   : useDeepen  ? (DEEPEN[threadIntent]  || DEEPEN.default)
                   : (LISTEN[intent] || LISTEN.default);
        const delay = text.length < 20 ? 900 : 1500;
        setTimeout(() => {
          setTyping(false);
          const widgetMsg = (!useSupport && resp.widget)
            ? [{ type:'widget', id:`w${widgetCount.current++}`, _wt: resp.widget.type, options: resp.widget.options, label: resp.widget.label }]
            : [];
          setMessages(m => [
            ...m,
            { from:'ai', text: resp.text },
            ...widgetMsg,
            ...(resp.resources || []).map(res => ({ type:'resource', res })),
          ]);
          setChips(resp.chips);
        }, delay);
      };

      useEffect(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      }, [messages, typing]);

      useEffect(() => {
        if (initialTopic && !didAutoSend.current) {
          didAutoSend.current = true;
          const t = setTimeout(() => sendMessage(initialTopic), 700);
          return () => clearTimeout(t);
        }
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      const ID = 'Inter Display,sans-serif';
      return (
        <div
          style={{ position:'absolute', inset:0, zIndex:400, display:'flex', flexDirection:'column', overflow:'hidden', background:'white' }}
          onMouseDown={e => e.stopPropagation()}
          onMouseUp={e => e.stopPropagation()}
          onTouchStart={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        >
          {/* Orb + pattern — non-scrolling overlay at top, overflow:hidden clips shadow */}
          <div style={{ position:'absolute', top:0, left:0, right:0, height:270, zIndex:3, pointerEvents:'none', overflow:'hidden' }}>
            <div style={{ position:'absolute', left:'50%', top:102, transform:'translateX(-50%)', width:343, height:335, opacity:0.45 }}>
              <img alt="" src={imgTcPattern} style={{ width:'100%', height:'100%', objectFit:'contain', display:'block' }} />
            </div>
            {/* Subtle ambient glow — contained within the overlay height */}
            <div style={{ position:'absolute', left:'50%', top:160, transform:'translateX(-50%)', width:280, height:140, borderRadius:'50%', background:'radial-gradient(ellipse at center, rgba(239,140,90,0.18) 0%, rgba(204,235,255,0.12) 50%, transparent 100%)', filter:'blur(24px)' }} />
            <div style={{ position:'absolute', left:'50%', top:102, transform:'translateX(-50%)', width:155, height:155 }}>
              <div style={{ position:'absolute', left:18.5, top:18.5, width:117.5, height:117.5, borderRadius:58.75, background:'rgba(255,255,255,0.72)', border:'2px solid rgba(255,255,255,0.5)', overflow:'hidden', boxShadow:'0 8px 32px 0 rgba(239,140,90,0.28), 0 2px 12px 0 rgba(204,235,255,0.4)' }}>
                <img alt="" src={imgTcOrbMask} style={{ position:'absolute', left:8, top:22, width:102, height:75, objectFit:'contain', display:'block' }} />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(145deg,rgba(255,255,255,0.22) 6%,transparent 46%)', borderRadius:58.75 }} />
              </div>
            </div>
            <div style={{ position:'absolute', bottom:0, left:0, right:0, height:60, background:'linear-gradient(to bottom,transparent,white)' }} />
          </div>

          {/* Header */}
          <div style={{ position:'relative', zIndex:15, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'52px 20px 12px' }}>
            <div onClick={onBack} style={{ background:'white', borderRadius:99, width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0, boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <img alt="" src={imgTcChevron} style={{ width:14, height:14, objectFit:'contain', display:'block' }} />
            </div>
            <div style={{ background:'rgba(255,255,255,0.88)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', padding:'9px 20px', borderRadius:22, border:'1px solid rgba(20,20,19,0.07)', boxShadow:'0 0 0 0 rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <span style={{ color:'#141413', fontSize:13, fontWeight:700, fontFamily:SF }}>AI Chat</span>
            </div>
            <div style={{ background:'white', borderRadius:99, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, overflow:'hidden', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 2px 4px rgba(3,7,18,0.04)' }}>
              <div style={{ width:18, height:18, position:'relative', overflow:'hidden' }}>
                <div style={{ position:'absolute', top:'16.67%', bottom:'16.67%', left:'45.83%', right:'45.83%' }}>
                  <div style={{ position:'absolute', top:'-6.25%', bottom:'-6.25%', left:'-50%', right:'-50%' }}>
                    <img alt="" src={imgAiIcon} style={{ display:'block', width:'100%', height:'100%', maxWidth:'none' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Messages — scrolls under the orb overlay */}
          <div ref={messagesRef} style={{ position:'relative', zIndex:2, flex:1, overflowY:'auto', display:'flex', flexDirection:'column', gap:4, paddingTop:168, paddingLeft:20, paddingRight:20 }}>

            <div style={{ alignSelf:'center', background:'rgba(0,0,0,0.04)', borderRadius:99, padding:'5px 14px', margin:'0 0 10px' }}>
              <span style={{ fontSize:10.5, color:'rgba(20,20,19,0.40)', fontFamily:SF, fontWeight:500, letterSpacing:'0.1px' }}>🔒 What you share stays between us · here to listen, not judge</span>
            </div>

            {messages.map((msg, i) => {
              const prevFrom = i > 0 ? messages[i-1].from : null;
              const nextMsg = messages[i+1];
              const isLastInGroup = !nextMsg || nextMsg.from !== msg.from || nextMsg.type === 'resource';
              const isFirstInGroup = prevFrom !== msg.from;
              const gap = (msg.type === 'resource' || (prevFrom && messages[i-1]?.type === 'resource')) ? 3 : (isFirstInGroup ? 14 : 4);
              return (
                <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: msg.from==='user' ? 'flex-end' : 'flex-start', marginTop: gap, animation:'msgIn 0.28s ease-out both' }}>
                  {msg.from === 'ai' && (
                    <div style={{ display:'flex', flexDirection:'column', gap:6, maxWidth:'88%' }}>
                      {isFirstInGroup && (
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <img alt="" src={imgTcLogo} style={{ width:21, height:21, display:'block', flexShrink:0 }} />
                          <span style={{ fontSize:14, fontWeight:500, color:'#0d0d12', fontFamily:ID, letterSpacing:-0.14, lineHeight:1.25 }}>Answer</span>
                        </div>
                      )}
                      <p style={{ margin:0, fontSize:12, lineHeight:1.4, color:'#37394a', fontFamily:SF, fontWeight:500 }}>{msg.text}</p>
                    </div>
                  )}
                  {msg.from === 'user' && (
                    <div style={{ display:'flex', alignItems:'flex-end', paddingRight:8 }}>
                      <div style={{ background:'white', borderRadius:16, padding:10, boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 1px 3px rgba(3,7,18,0.03)', maxWidth:257, marginRight:-8, overflow:'hidden', flexShrink:0 }}>
                        <p style={{ margin:0, fontSize:12, lineHeight:1.25, color:'#0d0d12', fontFamily:ID }}>{msg.text}</p>
                      </div>
                      <div style={{ width:12.5, height:9.652, flexShrink:0, marginRight:-8, marginBottom:6 }}>
                        <img alt="" src={imgTcTail} style={{ display:'block', width:'100%', height:'100%' }} />
                      </div>
                    </div>
                  )}
                  {msg.type === 'resource' && <ResourceCard res={msg.res} SF={SF} />}
                  {msg.type === 'widget' && (
                    msg._wt === 'tags'  ? <TagWidget  options={msg.options} label={msg.label} answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                    msg._wt === 'scale' ? <ScaleWidget label={msg.label}   answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} /> :
                                          <DurationWidget                  answered={widgetAnswers[msg.id]} onAnswer={t => answerWidget(msg.id, t)} SF={SF} />
                  )}
                </div>
              );
            })}

            {/* Typing indicator */}
            {typing && (
              <div style={{ display:'flex', flexDirection:'column', gap:6, marginTop:14, alignSelf:'flex-start', maxWidth:'88%' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <img alt="" src={imgTcLogo} style={{ width:21, height:21, display:'block', flexShrink:0 }} />
                  <span style={{ fontSize:14, fontWeight:500, color:'#0d0d12', fontFamily:ID, letterSpacing:-0.14 }}>Answer</span>
                </div>
                <div style={{ display:'flex', gap:4, alignItems:'center', paddingLeft:2 }}>
                  {[0, 0.2, 0.4].map(d => (
                    <div key={d} style={{ width:5, height:5, borderRadius:'50%', background:'rgba(55,57,74,0.4)', animation:`typingDot 1s ease-in-out ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div style={{ height:8, flexShrink:0 }} />
          </div>

          {/* Chips + input panel */}
          <div style={{ position:'relative', zIndex:3, flexShrink:0, background:'white' }}>
            <div style={{ padding:'10px 16px 0', display:'flex', gap:6, overflowX:'auto' }}>
              {chips.map(s => (
                <div key={s} onClick={() => sendMessage(s)} style={{ background:'white', border:'1px solid rgba(0,0,0,0.08)', borderRadius:99, padding:'6px 13px', cursor:'pointer', flexShrink:0, boxShadow:'0 1px 3px rgba(0,0,0,0.04)' }}>
                  <span style={{ color:'rgba(20,20,19,0.65)', fontSize:12, fontFamily:SF, fontWeight:600, whiteSpace:'nowrap' }}>{s}</span>
                </div>
              ))}
            </div>
            <div style={{ padding:'8px 18px 34px', display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ flex:1, background:'white', borderRadius:8, padding:'9px 12px', boxShadow:'0 0 0 1px rgba(3,7,18,0.04),0 1px 3px rgba(3,7,18,0.03)', display:'flex', alignItems:'center', border:'none' }}>
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask me anything..."
                  rows={1}
                  style={{ display:'block', width:'100%', border:'none', outline:'none', background:'transparent', fontFamily:ID, fontSize:12, color:'#0d0d12', resize:'none', lineHeight:1.2, maxHeight:88, overflowY:'auto' }}
                />
              </div>
              <div style={{ width:28, height:28, borderRadius:99, background:'#f6f8fa', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', boxShadow:'0 0 0 0.7px rgba(3,7,18,0.06),0 8px 16px rgba(3,7,18,0.08)' }}>
                <img alt="" src={imgTcMic} style={{ width:14, height:14, objectFit:'contain', display:'block' }} />
              </div>
              <div onClick={() => sendMessage()} style={{ width:28, height:28, borderRadius:24, background:'#0d0d12', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, cursor:'pointer', boxShadow:'0 0 0 0.7px rgba(3,7,18,0.06),0 8px 16px rgba(3,7,18,0.08)' }}>
                <img alt="" src={imgTcSend} style={{ width:14, height:14, objectFit:'contain', display:'block' }} />
              </div>
            </div>
          </div>

          <style>{`
            @keyframes typingDot {
              0%,60%,100%{transform:translateY(0);opacity:0.4}
              30%{transform:translateY(-3px);opacity:1}
            }
            @keyframes msgIn {
              from{opacity:0;transform:translateY(6px)}
              to{opacity:1;transform:translateY(0)}
            }
          `}</style>
        </div>
      );
    }

