import { useState, useEffect } from "react";

const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3BmIZZOeo8Ij7LJDXZiU1DK3MY3/";
const IMGS = {
  male:    CDN + "hf_20260606_004551_dc36cb81-5f25-4270-ac6a-fe2a212f6514.png",
  female:  CDN + "hf_20260606_004552_1c1872e6-1725-423a-87a0-bd205054f8cf.png",
  hands:   CDN + "hf_20260606_004554_dd75725d-12f2-422a-98df-3e54b72d4661.png",
  brain:   CDN + "hf_20260606_004555_5fe444d4-7c51-458b-ba5a-a4e1dadbb419.png",
  expert:  CDN + "hf_20260606_004556_dd941623-e333-42e3-b9d5-c4108ee9e907.png",
  result:  CDN + "hf_20260606_004557_682ec9d0-191d-41ea-9836-5d92771a7c73.png",
  emo: [
    CDN + "hf_20260606_003640_e38b2dd5-5902-4844-89d6-56e0a7303dfb.png",
    CDN + "hf_20260606_003641_5019111b-a4ec-42b0-a3fc-7017a99a7b92.png",
    CDN + "hf_20260606_003642_7f8d69fe-306b-4a8c-9c94-bea3c0a0c72b.png",
    CDN + "hf_20260606_003644_e873362e-ee20-4261-85a5-f3191b0f4a77.png",
    CDN + "hf_20260606_003645_8a8944a9-7df1-4712-8c18-4d915ca72249.png",
  ],
};

const G    = "#3E9B4F";
const BG   = "#EEF0F4";
const LOGO = { fontFamily: "'Pacifico', cursive", color: "#2D6A4F", letterSpacing: 0.5 };

const ICONS = {
  "Often":"⚡","Sometimes":"🤔","Rarely":"😌","Never":"🌟",
  "Yes":"✅","No":"❌","Moderately":"🤝",
  "Easily distracted":"🌀","Occasionally lose focus":"😵‍💫","Rarely lose focus":"🎯","Very focused":"💎",
  "Almost always":"⭐","Depends":"🔄","Not at all":"🚫","I'm not sure":"❓",
  "A few weeks ago":"📅","Less than a year ago":"📆","More than a year ago":"🗓️","Never in my life":"💭",
  "Low energy":"🪫","Worry":"💭","Emotional exhaustion":"😮‍💨","Overthinking":"🌀","Irritability":"😤","I'm totally fine":"👍",
  "Picking up my phone":"📱","Making coffee":"☕","Brushing teeth & Taking Shower":"🚿","Other":"➕",
  "0–2 hours":"📉","3–5 hours":"📊","6–8 hours":"📈","More than 8 hours":"🏆",
  "Being late / running out of time":"⏰","Self-doubt":"💭","Social media":"📱",
  "Sugar cravings or junk food":"🍬","Losing sleep":"😴","Nail-biting":"💅","Binge-watching":"📺",
  "Waking up tired":"😪","Waking up during the night":"🌙","Reduced sleep quality":"🛌",
  "Difficulty falling asleep":"💤","Waking up earlier than intended":"⏰","I sleep well":"😴",
  "Family or relationship":"❤️","External circumstances":"🌍","My appearance":"🪞",
  "Sleep issues":"🌙","Job-related stress":"💼",
  "My state of calm":"🧘","My focus levels":"🎯","My willpower":"💪",
  "My energy levels":"⚡","My inner strength":"🦁",
  "Stop doubting myself":"💪","Build emotional resilience":"🛡️",
  "Set and achieve goals":"🎯","Stop overthinking":"🧠",
  "Improve my ability to trust others":"🤝","Improve my daily routine":"📋",
  "Nothing at all":"📚","Not that much":"🤔","A lot":"🎓",
  "5 min / day":"⏱️","10 min / day":"⏰","15 min / day":"🕒","20 min / day":"🕔",
  "18–24":"🧑","25–34":"🧑","35–44":"👩","45–54":"🧔","55–64":"👴","65+":"👵",
};

const SCREENS = [
  { id:"gender",     type:"gender" },
  { id:"age",        type:"age",    q:"What's your age?", sub:"We only use your age to personalize your plan", opts:["18–24","25–34","35–44","45–54","55–64","65+"] },
  { id:"disclaimer", type:"disclaimer" },
  { id:"q1",  type:"single", n:1,  q:"How often do you feel tired or lack energy, even after rest?",                             opts:["Often","Sometimes","Rarely"] },
  { id:"q2",  type:"single", n:2,  q:"Do you often leave things to the last minute?",                                            opts:["Often","Sometimes","Never"] },
  { id:"q3",  type:"single", n:3,  q:"How easily distracted are you?",                                                           opts:["Easily distracted","Occasionally lose focus","Rarely lose focus","Very focused"] },
  { id:"q4",  type:"single", n:4,  q:"How often do you feel worried or overwhelmed?",                                            opts:["Often","Sometimes","Rarely"] },
  { id:"q5",  type:"single", n:5,  q:"How often do you experience mood swings?",                                                 opts:["Often","Sometimes","Rarely"] },
  { id:"q6",  type:"single", n:6,  q:"Have you felt in harmony with yourself and your circle in recent months?",                 opts:["Yes","Moderately","No"] },
  { id:"q7",  type:"scale",  n:7,  q:"It's difficult for me to express emotions",                sub:"Do you agree with the following statement?" },
  { id:"q8",  type:"scale",  n:8,  q:"I often feel overwhelmed by the amount of tasks I have to do", sub:"Do you agree with the following statement?" },
  { id:"q9",  type:"scale",  n:9,  q:"I often find it challenging to make a decision",            sub:"Do you agree with the following statement?" },
  { id:"q10", type:"scale",  n:10, q:"I often struggle to pursue my ambitions due to fear of messing up and failing", sub:"Do you agree with the following statement?" },
  { id:"q11", type:"single", n:11, q:"Have you ever struggled with accepting compliments because you didn't believe they are true?", opts:["Almost always","Depends","Not at all","I'm not sure"] },
  { id:"q12", type:"single", n:12, q:"I tend to feel insecure while talking to others",                                          opts:["Yes","No","I'm not sure"] },
  { id:"q13", type:"single", n:13, q:"I tend to overthink my partner's behavior",                                                opts:["Yes","No","I'm not sure"] },
  { id:"q14", type:"single", n:14, q:"Do you often prioritize others' needs and sacrifice your own ones?",                       opts:["Often","Sometimes","Never"] },
  { id:"q15", type:"single", n:15, q:"When was the last time you felt driven and motivated?",                                    opts:["A few weeks ago","Less than a year ago","More than a year ago","Never in my life"] },
  { id:"q16", type:"multi",  n:16, q:"Are there aspects of your well-being you'd like to address?",                             opts:["Low energy","Worry","Emotional exhaustion","Overthinking","Irritability","I'm totally fine"] },
  { id:"q17", type:"single", n:17, q:"What do you usually do first thing in the morning?",                                       opts:["Picking up my phone","Making coffee","Brushing teeth & Taking Shower","Other"] },
  { id:"q18", type:"single", n:18, q:"How much time do you dedicate to physical activity each week?",                            opts:["0–2 hours","3–5 hours","6–8 hours","More than 8 hours"] },
  { id:"q19", type:"multi",  n:19, q:"Do you have any habits that you'd like to quit?",                                          opts:["Being late / running out of time","Self-doubt","Social media","Sugar cravings or junk food","Losing sleep","Nail-biting","Binge-watching"] },
  { id:"q20", type:"multi",  n:20, q:"Is there anything you want to improve about your sleep?",                                  opts:["Waking up tired","Waking up during the night","Reduced sleep quality","Difficulty falling asleep","Waking up earlier than intended","I sleep well"] },
  { id:"q21", type:"multi",  n:21, q:"Have any of the following caused you to struggle more than before?",                       opts:["Family or relationship","External circumstances","My appearance","Sleep issues","Job-related stress","Other"] },
  { id:"q22", type:"multi",  n:22, q:"In order to live a happier life, what do you think you need to improve?",                 opts:["My state of calm","My focus levels","My willpower","My energy levels","My inner strength","Other"] },
  { id:"q23", type:"multi",  n:23, q:"Which of the following would you like to start working on with your plan?",               opts:["Stop doubting myself","Build emotional resilience","Set and achieve goals","Stop overthinking","Improve my ability to trust others","Improve my daily routine"] },
  { id:"uni",    type:"university" },
  { id:"q24", type:"single", n:24, q:"How much do you know about Behavioral Techniques?",        opts:["Nothing at all","Not that much","A lot"] },
  { id:"q25", type:"single", n:25, q:"Did you hear about us from a specialist?",                  opts:["Yes","No"] },
  { id:"expert", type:"expert" },
  { id:"social", type:"social" },
  { id:"q26", type:"single", n:26, q:"Set your daily goal",                                       opts:["5 min / day","10 min / day","15 min / day","20 min / day"] },
  { id:"email",   type:"email" },
  { id:"loading", type:"loading" },
  { id:"result",  type:"result" },
];

const TOTAL_Q = 26;

const REVIEWS = [
  "Thanks!","Very easy to follow","Love how easy this was","So far, so good","Eye opening",
  "It was useful","Already surprised","I'm feeling hopeful","Great experience!","Exactly what I needed",
];
const AV_COLORS = ["#E879F9","#38BDF8","#34D399","#FB923C","#F87171","#818CF8","#FBBF24","#4ADE80","#F472B6","#67E8F9"];
const AV_INITIALS = ["M","T","L","A","S","E","R","I","G","J"];

function calcResult(answers) {
  const mainDifficulty = (answers.q16 || [])[0] || "Worry";
  const trigger = (answers.q21 || [])[0] || "External circumstances";
  const energyMap = { "Often":"Low","Sometimes":"Medium","Rarely":"High" };
  const energyLevel = energyMap[answers.q1] || "Low";
  const challengeMap = { "A few weeks ago":"Few weeks","Less than a year ago":"Few months","More than a year ago":"Over a year","Never in my life":"Unknown" };
  const challengePeriod = challengeMap[answers.q15] || "Few months";
  const negOpts = ["Often","No","Easily distracted","Almost always","Never in my life","A few weeks ago"];
  let score = 0;
  Object.values(answers).forEach(v => { if (typeof v === "string" && negOpts.includes(v)) score++; });
  const level = score >= 5 ? "High" : score >= 3 ? "Medium" : "Normal";
  return { mainDifficulty, trigger, energyLevel, challengePeriod, level };
}

export default function App() {
  const [idx, setIdx]       = useState(0);
  const [answers, setAnswers] = useState({});
  const [gender, setGender]  = useState(null);
  const [email, setEmail]    = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loadPct, setLoadPct]  = useState(0);

  const screen = SCREENS[idx];
  const next   = () => setIdx(i => Math.min(i + 1, SCREENS.length - 1));
  const back   = () => setIdx(i => Math.max(i - 1, 0));

  const pick = (key, val) => { setAnswers(a => ({ ...a, [key]: val })); setTimeout(next, 320); };
  const toggleM = (key, val) => setAnswers(a => { const c = a[key] || []; return { ...a, [key]: c.includes(val) ? c.filter(v => v !== val) : [...c, val] }; });

  useEffect(() => {
    if (screen.type !== "loading") return;
    setLoadPct(0);
    const t = setInterval(() => setLoadPct(p => { if (p >= 100) { clearInterval(t); setTimeout(next, 400); return 100; } return p + 1.4; }), 45);
    return () => clearInterval(t);
  }, [screen.type]);

  const showBack = idx > 0 && !["loading","result"].includes(screen.type);
  const pct      = screen.n ? Math.round((screen.n / TOTAL_Q) * 100) : null;

  return (
    <div style={{ minHeight:"100vh", background:BG, display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif" }}>

      {/* ── HEADER (all except gender & result) ── */}
      {!["gender","result"].includes(screen.type) && (
        <div style={{ width:"100%", maxWidth:480, padding:"14px 20px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ width:36 }}>
            {showBack && <button onClick={back} style={{ background:"none",border:"none",cursor:"pointer",padding:0,fontSize:22,color:"#374151",lineHeight:1 }}>←</button>}
          </div>
          <span style={{ ...LOGO, fontSize:22 }}>Quiz Unicornio</span>
          <div style={{ width:36, textAlign:"right" }}>
            {screen.n && <span style={{ fontSize:12,color:"#9CA3AF",fontWeight:600 }}>{screen.n} / {TOTAL_Q}</span>}
          </div>
        </div>
      )}

      {/* ── PROGRESS BAR ── */}
      {pct !== null && (
        <div style={{ width:"100%", maxWidth:480, padding:"10px 0 0" }}>
          <div style={{ height:3, background:"#D1D5DB" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:G, transition:"width 0.4s ease" }} />
          </div>
        </div>
      )}

      {/* ── PAGE BODY ── */}
      <div style={{ width:"100%", maxWidth:480, padding:"0 16px 48px", flex:1 }}>

        {/* ══ GENDER / WELCOME ══ */}
        {screen.type === "gender" && (
          <div>
            <div style={{ textAlign:"center", padding:"20px 0 6px" }}>
              <span style={{ ...LOGO, fontSize:28 }}>Quiz Unicornio</span>
            </div>
            <div style={{ display:"flex", justifyContent:"center", margin:"10px 0 16px" }}>
              <span style={{ background:"#F0FFF4", border:"1px solid #BBF7D0", color:"#166534", fontSize:13, fontWeight:600, padding:"4px 14px", borderRadius:20 }}>
                🌿 3-minute quiz
              </span>
            </div>
            <h1 style={{ textAlign:"center", fontSize:26, fontWeight:800, color:"#111827", margin:"0 0 8px", lineHeight:1.25 }}>A personalized well-being<br />management plan</h1>
            <p style={{ textAlign:"center", fontSize:14, color:"#6B7280", margin:"0 0 22px" }}>Improve your well-being with our personalized plan</p>

            {/* Gender cards with photos */}
            <div style={{ display:"flex", gap:12, marginBottom:16 }}>
              {[{ g:"Male", img:IMGS.male },{ g:"Female", img:IMGS.female }].map(({ g, img }) => (
                <button key={g} onClick={() => { setGender(g); next(); }} style={{ flex:1, background:"#fff", border:"none", borderRadius:20, overflow:"hidden", cursor:"pointer", boxShadow:"0 3px 16px rgba(0,0,0,0.12)", padding:0, textAlign:"left", transition:"transform 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                  <img src={img} alt={g} style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", display:"block" }} />
                  <div style={{ padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid #F3F4F6" }}>
                    <span style={{ fontSize:16, fontWeight:700, color:"#111827" }}>{g}</span>
                    <span style={{ fontSize:18, color:"#9CA3AF", fontWeight:300 }}>›</span>
                  </div>
                </button>
              ))}
            </div>

            <p style={{ textAlign:"center", fontSize:11, color:"#9CA3AF", lineHeight:1.5 }}>
              By clicking "Male" or "Female" you agree with the{" "}
              {["Terms of Use and Service","Privacy Policy","Subscription Policy","Cookie Policy"].map((t,i,a) => (
                <span key={t}><span style={{ color:"#374151", fontWeight:600 }}>{t}</span>{i < a.length-1 ? (i === a.length-2 ? " and " : ", ") : ""}</span>
              ))}
            </p>
          </div>
        )}

        {/* ══ AGE ══ */}
        {screen.type === "age" && (
          <div style={{ paddingTop:16 }}>
            <h2 style={QH}>{screen.q}</h2>
            <p style={QSub}>{screen.sub}</p>
            <div style={LIST}>
              {screen.opts.map(opt => <Opt key={opt} label={opt} icon={ICONS[opt]||"📅"} sel={answers.age===opt} onPick={() => pick("age",opt)} />)}
            </div>
          </div>
        )}

        {/* ══ DISCLAIMER ══ */}
        {screen.type === "disclaimer" && (
          <div style={{ paddingTop:12 }}>
            <img src={IMGS.hands} alt="Hands" style={{ width:"100%", borderRadius:20, display:"block", marginBottom:22 }} />
            <h2 style={{ fontSize:22, fontWeight:800, color:"#111827", textAlign:"center", margin:"0 0 14px", lineHeight:1.3 }}>We're glad you are here</h2>
            <p style={{ fontSize:14, color:"#374151", lineHeight:1.75, textAlign:"center", margin:"0 0 12px" }}>
              This journey is intended to help you better understand your patterns and structure your experiences.
              We recommend to treat this quiz as a moment of <strong>honest reflection</strong>.
            </p>
            <p style={{ fontSize:12, color:"#9CA3AF", textAlign:"center", lineHeight:1.6, margin:"0 0 28px" }}>
              Quiz Unicornio is not intended to replace professional diagnosis, treatment, or therapy. Everyone's experience is unique, and results may vary. If you're experiencing medical or mental health concerns, please reach out to a licensed healthcare professional.
            </p>
            <Btn onClick={next}>Continue</Btn>
          </div>
        )}

        {/* ══ SINGLE SELECT ══ */}
        {screen.type === "single" && (
          <div style={{ paddingTop:16 }}>
            <h2 style={QH}>{screen.q}</h2>
            {screen.sub && <p style={QSub}>{screen.sub}</p>}
            <div style={LIST}>
              {screen.opts.map(opt => <Opt key={opt} label={opt} icon={ICONS[opt]||"•"} sel={answers[screen.id]===opt} onPick={() => pick(screen.id,opt)} />)}
            </div>
          </div>
        )}

        {/* ══ ICON SCALE ══ */}
        {screen.type === "scale" && (
          <div style={{ paddingTop:16 }}>
            <h2 style={{ ...QH, marginBottom:6 }}>{screen.q}</h2>
            {screen.sub && <p style={{ ...QSub, marginBottom:0 }}>{screen.sub}</p>}
            <div style={{ display:"flex", gap:8, marginTop:32, justifyContent:"center" }}>
              {IMGS.emo.map((url,i) => {
                const sel = answers[screen.id] === i;
                return (
                  <button key={i} onClick={() => pick(screen.id,i)} style={{ flex:1, background:"#fff", border:`2.5px solid ${sel ? G : "transparent"}`, borderRadius:16, padding:"10px 4px 8px", cursor:"pointer", boxShadow:`0 2px 8px rgba(0,0,0,${sel?0.12:0.07})`, transition:"all 0.18s", display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                    <img src={url} alt="" style={{ width:"100%", maxWidth:58, borderRadius:10, aspectRatio:"1/1", objectFit:"cover" }} />
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:10 }}>
              <span style={{ fontSize:11, color:"#9CA3AF" }}>Strongly disagree</span>
              <span style={{ fontSize:11, color:"#9CA3AF" }}>Strongly agree</span>
            </div>
          </div>
        )}

        {/* ══ MULTI SELECT ══ */}
        {screen.type === "multi" && (
          <div style={{ paddingTop:16 }}>
            <h2 style={QH}>{screen.q}</h2>
            <p style={QSub}>Choose all that apply</p>
            <div style={LIST}>
              {screen.opts.map(opt => {
                const sel = (answers[screen.id]||[]).includes(opt);
                return (
                  <button key={opt} onClick={() => toggleM(screen.id,opt)} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"#fff", border:`2px solid ${sel?G:"transparent"}`, borderRadius:14, cursor:"pointer", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"all 0.18s", textAlign:"left", width:"100%" }}>
                    <span style={{ fontSize:22, width:32, textAlign:"center", flexShrink:0 }}>{ICONS[opt]||"•"}</span>
                    <span style={{ flex:1, fontSize:15, color:"#1F2937", fontWeight:500 }}>{opt}</span>
                    <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${sel?G:"#D1D5DB"}`, background:sel?G:"transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.18s" }}>
                      {sel && <Check />}
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop:20 }}>
              <Btn onClick={next} disabled={(answers[screen.id]||[]).length===0}>Continue</Btn>
            </div>
          </div>
        )}

        {/* ══ UNIVERSITY ══ */}
        {screen.type === "university" && (
          <div style={{ paddingTop:12 }}>
            <div style={{ background:"#fff", borderRadius:20, padding:"36px 24px", marginBottom:24, textAlign:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
              {[["HARVARD","UNIVERSITY"],["UNIVERSITY OF","OXFORD"],["UNIVERSITY OF","CAMBRIDGE"]].map(([top,bot],i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 28 : 0 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#6B7280", margin:"0 0 2px", letterSpacing:2, textTransform:"uppercase" }}>{top}</p>
                  <p style={{ fontSize:26, fontWeight:800, color:"#111827", margin:0, letterSpacing:2, textTransform:"uppercase" }}>{bot}</p>
                </div>
              ))}
            </div>
            <h2 style={{ fontSize:20, fontWeight:800, color:"#111827", textAlign:"center", margin:"0 0 10px", lineHeight:1.35 }}>Quiz Unicornio was developed using evidence-based psychological practices</h2>
            <p style={{ fontSize:14, color:"#9CA3AF", textAlign:"center", margin:"0 0 28px" }}>Your journey is based on decades of research</p>
            <Btn onClick={next}>Continue</Btn>
          </div>
        )}

        {/* ══ EXPERT ══ */}
        {screen.type === "expert" && (
          <div style={{ paddingTop:12 }}>
            <div style={{ position:"relative", borderRadius:20, overflow:"hidden", marginBottom:20 }}>
              <img src={IMGS.brain} alt="Brain" style={{ width:"100%", display:"block" }} />
              {/* Expert chip */}
              <div style={{ position:"absolute", bottom:14, left:14, right:14, background:"rgba(255,255,255,0.95)", borderRadius:14, padding:"12px 14px", display:"flex", alignItems:"center", gap:12, backdropFilter:"blur(8px)" }}>
                <img src={IMGS.expert} alt="Expert" style={{ width:46, height:46, borderRadius:"50%", objectFit:"cover", flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:11, color:G, fontWeight:700, marginBottom:3 }}>✔ Reviewed by an expert</div>
                  <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:"0 0 1px" }}>María García</p>
                  <p style={{ fontSize:11, color:"#9CA3AF", margin:0 }}>Licensed Mental Health Counselor</p>
                </div>
              </div>
            </div>
            <h2 style={{ fontSize:20, fontWeight:800, color:"#111827", textAlign:"center", margin:"0 0 12px", lineHeight:1.35 }}>Our plans are designed in collaboration with licensed therapists</h2>
            <p style={{ fontSize:14, color:"#6B7280", textAlign:"center", margin:"0 0 28px", lineHeight:1.65, fontStyle:"italic" }}>
              "Quiz Unicornio incorporates the CBT model to deliver personalized content and resources for enhanced emotional well-being"
            </p>
            <Btn onClick={next}>Continue</Btn>
          </div>
        )}

        {/* ══ SOCIAL PROOF ══ */}
        {screen.type === "social" && (
          <div style={{ paddingTop:8 }}>
            {/* Bubbles grid */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28, overflow:"hidden" }}>
              {[0,1].map(row => (
                <div key={row} style={{ display:"flex", gap:8 }}>
                  {REVIEWS.slice(row*5, row*5+5).map((txt,i) => {
                    const ci = row*5+i;
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8, background:"#fff", borderRadius:100, padding:"7px 14px 7px 7px", boxShadow:"0 1px 6px rgba(0,0,0,0.08)", whiteSpace:"nowrap", flexShrink:0 }}>
                        <div style={{ width:30, height:30, borderRadius:"50%", background:AV_COLORS[ci%AV_COLORS.length], display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:"#fff", fontWeight:800, flexShrink:0 }}>
                          {AV_INITIALS[ci%AV_INITIALS.length]}
                        </div>
                        <span style={{ fontSize:13, fontWeight:500, color:"#374151" }}>{txt}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <h2 style={{ fontSize:24, fontWeight:800, color:"#111827", textAlign:"center", margin:"0 0 8px" }}>
              Join over <span style={{ color:G }}>2,500,000</span> people
            </h2>
            <p style={{ fontSize:14, color:"#6B7280", textAlign:"center", margin:"0 0 28px", lineHeight:1.6 }}>
              Become a part of a growing worldwide community and achieve your goals with us!
            </p>
            <Btn onClick={next}>Continue</Btn>
          </div>
        )}

        {/* ══ EMAIL ══ */}
        {screen.type === "email" && (
          <div style={{ paddingTop:32, textAlign:"center" }}>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#111827", margin:"0 0 10px" }}>Enter your email</h2>
            <p style={{ fontSize:14, color:"#6B7280", margin:"0 0 28px", lineHeight:1.65 }}>
              We'll send your personalized well-being plan and keep you updated on your progress.
            </p>
            <input type="email" placeholder="your@email.com" value={email}
              onChange={e => { setEmail(e.target.value); setEmailErr(""); }}
              style={{ width:"100%", boxSizing:"border-box", padding:"15px 16px", fontSize:16, border:`1.5px solid ${emailErr?"#EF4444":"#D1D5DB"}`, borderRadius:14, outline:"none", marginBottom:emailErr?0:16, background:"#fff", fontFamily:"inherit" }}
            />
            {emailErr && <p style={{ color:"#EF4444", fontSize:13, margin:"8px 0 16px", textAlign:"left" }}>{emailErr}</p>}
            <Btn onClick={() => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr("Please enter a valid email"); return; }
              next();
            }}>Get my plan →</Btn>
            <p style={{ fontSize:12, color:"#9CA3AF", marginTop:14 }}>No spam. Unsubscribe at any time.</p>
          </div>
        )}

        {/* ══ LOADING ══ */}
        {screen.type === "loading" && (
          <div style={{ paddingTop:80, textAlign:"center" }}>
            <div style={{ fontSize:64, marginBottom:20 }}>🧬</div>
            <h2 style={{ fontSize:22, fontWeight:800, color:"#111827", margin:"0 0 10px" }}>Building your plan…</h2>
            <p style={{ fontSize:14, color:"#6B7280", margin:"0 0 36px", lineHeight:1.6 }}>Analyzing your answers to create your personalized well-being plan</p>
            <div style={{ background:"#D1D5DB", borderRadius:8, height:8, overflow:"hidden", marginBottom:12 }}>
              <div style={{ height:"100%", width:`${loadPct}%`, background:G, borderRadius:8, transition:"width 0.1s linear" }} />
            </div>
            <p style={{ fontSize:13, color:"#9CA3AF" }}>{Math.round(loadPct)}%</p>
          </div>
        )}

        {/* ══ RESULT ══ */}
        {screen.type === "result" && (() => {
          const r = calcResult(answers);
          const lvlPct  = { Normal:20, Medium:58, High:84 }[r.level] ?? 58;
          const lvlColor = { Normal:G, Medium:"#F59E0B", High:"#EF4444" }[r.level] ?? "#F59E0B";
          return (
            <div>
              {/* Logo */}
              <div style={{ textAlign:"center", padding:"18px 0 4px" }}>
                <span style={{ ...LOGO, fontSize:26 }}>Quiz Unicornio</span>
              </div>

              {/* Profile card */}
              <div style={{ position:"relative", borderRadius:20, overflow:"hidden", margin:"16px 0 16px" }}>
                <img src={IMGS.result} alt="Profile" style={{ width:"100%", display:"block", maxHeight:340, objectFit:"cover" }} />

                {/* Top badges */}
                <div style={{ position:"absolute", top:14, left:14, display:"flex", gap:6, alignItems:"center" }}>
                  <span style={{ background:"rgba(255,255,255,0.9)", fontSize:12, color:"#4B5563", padding:"4px 10px", borderRadius:20, fontWeight:500 }}>Negative effects level</span>
                  <span style={{ background:lvlColor, color:"#fff", fontSize:12, fontWeight:700, padding:"4px 10px", borderRadius:20 }}>{r.level}</span>
                </div>

                {/* Title overlay */}
                <div style={{ position:"absolute", top:"28%", left:0, right:0, textAlign:"center", padding:"0 24px" }}>
                  <h2 style={{ color:"#fff", fontSize:22, fontWeight:800, margin:0, textShadow:"0 2px 10px rgba(0,0,0,0.55)", lineHeight:1.3 }}>
                    Summary of your<br />Well-being Profile
                  </h2>
                </div>

                {/* Level bar at bottom */}
                <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(0,0,0,0.72) 0%,transparent 100%)", padding:"28px 16px 16px" }}>
                  <div style={{ position:"relative" }}>
                    {/* bar */}
                    <div style={{ background:"linear-gradient(to right,#22C55E 0%,#22C55E 28%,#F59E0B 52%,#EF4444 100%)", borderRadius:8, height:8 }}>
                      <div style={{ position:"absolute", left:`${lvlPct}%`, top:"50%", transform:"translate(-50%,-50%)", width:18, height:18, borderRadius:"50%", background:"#fff", border:`3px solid ${lvlColor}`, boxShadow:"0 2px 8px rgba(0,0,0,0.35)" }} />
                      {/* "Your level" label */}
                      <div style={{ position:"absolute", left:`${lvlPct}%`, top:"calc(50% - 32px)", transform:"translateX(-50%)", background:"rgba(255,255,255,0.92)", borderRadius:6, padding:"3px 8px", fontSize:11, fontWeight:700, color:"#111", whiteSpace:"nowrap" }}>Your level</div>
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", marginTop:16 }}>
                      {["Low","Normal","Medium","High"].map(l => <span key={l} style={{ fontSize:11, color:"rgba(255,255,255,0.75)" }}>{l}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:14, padding:"14px 16px", display:"flex", gap:12, alignItems:"flex-start", marginBottom:16 }}>
                <span style={{ fontSize:20, flexShrink:0 }}>⚠️</span>
                <p style={{ fontSize:13, color:"#7F1D1D", margin:0, lineHeight:1.55 }}>
                  This means you may experience increased feelings of worry, a sense of pressure, drain your energy, and disrupt your sleep patterns.
                </p>
              </div>

              {/* Stats grid */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                {[
                  { label:"Main difficulty",    icon:"⭐", val:r.mainDifficulty },
                  { label:"Challenging period", icon:"📅", val:r.challengePeriod },
                  { label:"Trigger",            icon:"⚡", val:r.trigger },
                  { label:"Energy level",       icon:"💧", val:r.energyLevel },
                ].map((item,i) => (
                  <div key={i} style={{ background:"#fff", borderRadius:14, padding:"14px", boxShadow:"0 1px 6px rgba(0,0,0,0.07)" }}>
                    <p style={{ fontSize:11, color:lvlColor, fontWeight:600, margin:"0 0 5px", textTransform:"uppercase", letterSpacing:0.4 }}>{item.icon} {item.label}</p>
                    <p style={{ fontSize:14, fontWeight:700, color:"#111827", margin:0 }}>{item.val}</p>
                  </div>
                ))}
              </div>

              <Btn onClick={() => {}}>Get my personalized plan →</Btn>
              <p style={{ textAlign:"center", fontSize:12, color:"#9CA3AF", marginTop:14 }}>
                © {new Date().getFullYear()} Quiz Unicornio. All rights reserved.
              </p>
            </div>
          );
        })()}

      </div>
    </div>
  );
}

/* ── Shared components ── */

function Opt({ label, icon, sel, onPick }) {
  return (
    <button onClick={onPick} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"#fff", border:`2px solid ${sel?G:"transparent"}`, borderRadius:14, cursor:"pointer", width:"100%", textAlign:"left", boxShadow:"0 1px 6px rgba(0,0,0,0.06)", transition:"all 0.18s" }}>
      <span style={{ fontSize:22, width:32, textAlign:"center", flexShrink:0 }}>{icon}</span>
      <span style={{ flex:1, fontSize:15, color:"#1F2937", fontWeight:500 }}>{label}</span>
      <div style={{ width:22, height:22, borderRadius:"50%", border:`2px solid ${sel?G:"#D1D5DB"}`, background:sel?G:"transparent", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.18s" }}>
        {sel && <Check />}
      </div>
    </button>
  );
}

function Check() {
  return <svg width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function Btn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width:"100%", padding:"16px", fontSize:16, fontWeight:700, color:"#fff", background:disabled?"#A7F3D0":G, border:"none", borderRadius:14, cursor:disabled?"not-allowed":"pointer", transition:"background 0.2s", boxShadow:disabled?"none":`0 4px 16px ${G}55` }}>
      {children}
    </button>
  );
}

const QH   = { fontSize:20, fontWeight:800, color:"#111827", margin:"0 0 6px", lineHeight:1.35, textAlign:"center" };
const QSub = { fontSize:13, color:"#9CA3AF", margin:"0", lineHeight:1.5, textAlign:"center" };
const LIST = { display:"flex", flexDirection:"column", gap:10, marginTop:20 };
