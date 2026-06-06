import { useState, useEffect } from "react";

const GREEN = "#00C389";
const GREEN_DARK = "#00A873";
const GREEN_LIGHT = "#E6FAF5";

const EMOTION_IMGS = [
  { label: "Strongly disagree", url: "https://d8j0ntlcm91z4.cloudfront.net/user_3BmIZZOeo8Ij7LJDXZiU1DK3MY3/hf_20260606_003640_e38b2dd5-5902-4844-89d6-56e0a7303dfb.png" },
  { label: "Disagree",          url: "https://d8j0ntlcm91z4.cloudfront.net/user_3BmIZZOeo8Ij7LJDXZiU1DK3MY3/hf_20260606_003641_5019111b-a4ec-42b0-a3fc-7017a99a7b92.png" },
  { label: "Neutral",           url: "https://d8j0ntlcm91z4.cloudfront.net/user_3BmIZZOeo8Ij7LJDXZiU1DK3MY3/hf_20260606_003642_7f8d69fe-306b-4a8c-9c94-bea3c0a0c72b.png" },
  { label: "Agree",             url: "https://d8j0ntlcm91z4.cloudfront.net/user_3BmIZZOeo8Ij7LJDXZiU1DK3MY3/hf_20260606_003644_e873362e-ee20-4261-85a5-f3191b0f4a77.png" },
  { label: "Strongly agree",    url: "https://d8j0ntlcm91z4.cloudfront.net/user_3BmIZZOeo8Ij7LJDXZiU1DK3MY3/hf_20260606_003645_8a8944a9-7df1-4712-8c18-4d915ca72249.png" },
];

const SCREENS = [
  { id: "gender",      type: "gender" },
  { id: "age",         type: "age",  question: "What's your age?", sub: "We only use your age to personalize your plan", options: ["18–24","25–34","35–44","45–54","55–64","65+"] },
  { id: "disclaimer",  type: "info", title: "We're glad you are here", body: "This journey is intended to help you better understand your patterns and structure your experiences.\n\nWe recommend treating this quiz as a moment of honest reflection.\n\nThis app is not intended to replace professional diagnosis, treatment, or therapy. Everyone's experience is unique, and results may vary.", btn: "Continue" },
  // Q1-Q6: single
  { id:"q1",  type:"single", n:1,  q:"How often do you feel tired or lack energy, even after rest?",                             opts:["Often","Sometimes","Rarely"] },
  { id:"q2",  type:"single", n:2,  q:"Do you often leave things to the last minute?",                                              opts:["Often","Sometimes","Never"] },
  { id:"q3",  type:"single", n:3,  q:"How easily distracted are you?",                                                             opts:["Easily distracted","Occasionally lose focus","Rarely lose focus","Very focused"] },
  { id:"q4",  type:"single", n:4,  q:"How often do you feel worried or overwhelmed?",                                             opts:["Often","Sometimes","Rarely"] },
  { id:"q5",  type:"single", n:5,  q:"How often do you experience mood swings?",                                                  opts:["Often","Sometimes","Rarely"] },
  { id:"q6",  type:"single", n:6,  q:"Have you felt in harmony with yourself and your circle in recent months?",                  opts:["Yes","Moderately","No"] },
  // Q7-Q10: icon scale
  { id:"q7",  type:"scale",  n:7,  q:"It's difficult for me to express emotions",               sub:"Do you agree with the following statement?" },
  { id:"q8",  type:"scale",  n:8,  q:"I often feel overwhelmed by the amount of tasks I have to do", sub:"Do you agree with the following statement?" },
  { id:"q9",  type:"scale",  n:9,  q:"I often find it challenging to make a decision",           sub:"Do you agree with the following statement?" },
  { id:"q10", type:"scale",  n:10, q:"I often struggle to pursue my ambitions due to fear of messing up and failing", sub:"Do you agree with the following statement?" },
  // Q11-Q15: single
  { id:"q11", type:"single", n:11, q:"Have you ever struggled with accepting compliments because you didn't believe they are true?", opts:["Almost always","Depends","Not at all","I'm not sure"] },
  { id:"q12", type:"single", n:12, q:"I tend to feel insecure while talking to others",                                           opts:["Yes","No","I'm not sure"] },
  { id:"q13", type:"single", n:13, q:"I tend to overthink my partner's behavior",                                                 opts:["Yes","No","I'm not sure"] },
  { id:"q14", type:"single", n:14, q:"Do you often prioritize others' needs and sacrifice your own ones?",                        opts:["Often","Sometimes","Never"] },
  { id:"q15", type:"single", n:15, q:"When was the last time you felt driven and motivated?",                                     opts:["A few weeks ago","Less than a year ago","More than a year ago","Never in my life"] },
  // Q16-Q23: multi-select
  { id:"q16", type:"multi",  n:16, q:"Are there aspects of your well-being you'd like to address?",                              opts:["Low energy","Worry","Emotional exhaustion","Overthinking","Irritability","I'm totally fine"] },
  { id:"q17", type:"single", n:17, q:"What do you usually do first thing in the morning?",                                        opts:["Picking up my phone","Making coffee","Brushing teeth & Taking Shower","Other"] },
  { id:"q18", type:"single", n:18, q:"How much time do you dedicate to physical activity each week?",                             opts:["0–2 hours","3–5 hours","6–8 hours","More than 8 hours"] },
  { id:"q19", type:"multi",  n:19, q:"Do you have any habits that you'd like to quit?",                                           opts:["Being late / running out of time","Self-doubt","Social media","Sugar cravings or junk food","Losing sleep","Nail-biting","Binge-watching"] },
  { id:"q20", type:"multi",  n:20, q:"Is there anything you want to improve about your sleep?",                                   opts:["Waking up tired","Waking up during the night","Reduced sleep quality","Difficulty falling asleep","Waking up earlier than intended","I sleep well"] },
  { id:"q21", type:"multi",  n:21, q:"Have any of the following caused you to struggle more than before?",                        opts:["Family or relationship","External circumstances","My appearance","Sleep issues","Job-related stress","Other"] },
  { id:"q22", type:"multi",  n:22, q:"In order to live a happier life, what do you think you need to improve?",                  opts:["My state of calm","My focus levels","My willpower","My energy levels","My inner strength","Other"] },
  { id:"q23", type:"multi",  n:23, q:"Which of the following would you like to start working on with your plan?",                opts:["Stop doubting myself","Build emotional resilience","Set and achieve goals","Stop overthinking","Improve my ability to trust others","Improve my daily routine"] },
  // Interstitial
  { id:"trust1", type:"info", icon:"🧠", title:"Developed using evidence-based practices", body:"Our approach is rooted in behavioral science and cognitive techniques designed to support lasting well-being.", btn:"Continue" },
  // Q24-Q25
  { id:"q24", type:"single", n:24, q:"How much do you know about Behavioral Techniques?",       opts:["Nothing at all","Not that much","A lot"] },
  { id:"q25", type:"single", n:25, q:"Did you hear about us from a specialist?",                 opts:["Yes","No"] },
  // Expert trust screen
  { id:"trust2", type:"trust", quotes:[
    { text:"Highly effective, research-backed tools that actually create change.", author:"Dr. M. Ramos, Clinical Psychologist" },
    { text:"Finally an app that takes mental well-being seriously.", author:"Ana K., Wellness Coach" },
  ], btn:"Continue" },
  // Q26
  { id:"q26", type:"single", n:26, q:"Set your daily goal",                                      opts:["5 min / day","10 min / day","15 min / day","20 min / day"] },
  // End
  { id:"email",   type:"email" },
  { id:"loading", type:"loading" },
  { id:"result",  type:"result" },
];

const TOTAL_Q = 26;

export default function App() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [loadPct, setLoadPct] = useState(0);

  const screen = SCREENS[idx];

  const next = () => setIdx(i => Math.min(i + 1, SCREENS.length - 1));
  const back = () => setIdx(i => Math.max(i - 1, 0));

  const answer = (key, val) => {
    setAnswers(a => ({ ...a, [key]: val }));
    setTimeout(next, 320);
  };

  const toggleMulti = (key, val) => {
    setAnswers(a => {
      const cur = a[key] || [];
      return { ...a, [key]: cur.includes(val) ? cur.filter(v => v !== val) : [...cur, val] };
    });
  };

  useEffect(() => {
    if (screen.type !== "loading") return;
    setLoadPct(0);
    const interval = setInterval(() => {
      setLoadPct(p => {
        if (p >= 100) { clearInterval(interval); setTimeout(next, 400); return 100; }
        return p + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [screen.type]);

  const progress = screen.n ? Math.round((screen.n / TOTAL_Q) * 100) : null;
  const showBack = idx > 0 && screen.type !== "loading" && screen.type !== "result";

  return (
    <div style={{ minHeight: "100vh", background: "#F9FAFB", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", fontFamily: "system-ui, -apple-system, sans-serif", padding: "0 0 40px" }}>

      {/* NAV */}
      {screen.type !== "result" && screen.type !== "loading" && (
        <div style={{ width: "100%", maxWidth: 480, padding: "14px 20px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {showBack ? (
            <button onClick={back} style={{ background: "none", border: "none", cursor: "pointer", padding: "6px 10px 6px 0", fontSize: 20, color: "#374151" }}>←</button>
          ) : <div style={{ width: 36 }} />}
          <span style={{ fontWeight: 700, fontSize: 15, color: "#111827", letterSpacing: "-0.3px" }}>Liven</span>
          <div style={{ width: 36 }} />
        </div>
      )}

      {/* PROGRESS BAR */}
      {progress !== null && (
        <div style={{ width: "100%", maxWidth: 480, padding: "12px 20px 0" }}>
          <div style={{ height: 4, background: "#E5E7EB", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: GREEN, borderRadius: 4, transition: "width 0.4s ease" }} />
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 12, color: "#9CA3AF", textAlign: "right" }}>{screen.n} / {TOTAL_Q}</p>
        </div>
      )}

      {/* CARD */}
      <div style={{ width: "100%", maxWidth: 480, padding: "0 16px", marginTop: progress !== null ? 8 : 24 }}>

        {/* ──────── GENDER ──────── */}
        {screen.type === "gender" && (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: GREEN, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 12px" }}>3-minute quiz</p>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: "0 0 10px", lineHeight: 1.25 }}>A personalized<br />well-being plan</h1>
            <p style={{ fontSize: 15, color: "#6B7280", margin: "0 0 36px", lineHeight: 1.6 }}>Improve your well-being with our<br />personalized plan</p>
            <div style={{ display: "flex", gap: 12 }}>
              {["Male","Female"].map(g => (
                <button key={g} onClick={() => { setGender(g); next(); }} style={{ flex: 1, padding: "18px 0", fontSize: 16, fontWeight: 700, color: gender === g ? "#fff" : "#111827", background: gender === g ? GREEN : "#fff", border: `2px solid ${gender === g ? GREEN : "#E5E7EB"}`, borderRadius: 14, cursor: "pointer", transition: "all 0.2s" }}>
                  {g === "Male" ? "👨 Male" : "👩 Female"}
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 16, lineHeight: 1.5 }}>By continuing you agree to our Terms of Use and Privacy Policy</p>
          </div>
        )}

        {/* ──────── AGE ──────── */}
        {screen.type === "age" && (
          <div style={{ paddingTop: 8 }}>
            <h2 style={qStyle}>{screen.question}</h2>
            <p style={subStyle}>{screen.sub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {screen.options.map(opt => (
                <OptionRow key={opt} label={opt} selected={answers.age === opt} onSelect={() => answer("age", opt)} />
              ))}
            </div>
          </div>
        )}

        {/* ──────── INFO / INTERSTITIAL ──────── */}
        {screen.type === "info" && (
          <div style={{ paddingTop: 16, textAlign: "center" }}>
            {screen.icon && <div style={{ fontSize: 56, marginBottom: 16 }}>{screen.icon}</div>}
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 16px", lineHeight: 1.3 }}>{screen.title}</h2>
            <p style={{ fontSize: 15, color: "#4B5563", lineHeight: 1.7, margin: "0 0 32px", whiteSpace: "pre-line" }}>{screen.body}</p>
            <GreenBtn onClick={next}>{screen.btn}</GreenBtn>
          </div>
        )}

        {/* ──────── TRUST / QUOTES ──────── */}
        {screen.type === "trust" && (
          <div style={{ paddingTop: 16 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 20px", textAlign: "center" }}>Reviewed by experts</h2>
            {screen.quotes.map((q, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "18px 20px", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>{"⭐⭐⭐⭐⭐"}</div>
                <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.6, margin: "0 0 8px" }}>"{q.text}"</p>
                <p style={{ fontSize: 12, color: "#9CA3AF", margin: 0 }}>{q.author}</p>
              </div>
            ))}
            <div style={{ marginTop: 20 }}><GreenBtn onClick={next}>{screen.btn}</GreenBtn></div>
          </div>
        )}

        {/* ──────── SINGLE ──────── */}
        {screen.type === "single" && (
          <div style={{ paddingTop: 8 }}>
            <h2 style={qStyle}>{screen.q}</h2>
            {screen.sub && <p style={subStyle}>{screen.sub}</p>}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 20 }}>
              {screen.opts.map(opt => (
                <OptionRow key={opt} label={opt} selected={answers[screen.id] === opt} onSelect={() => answer(screen.id, opt)} />
              ))}
            </div>
          </div>
        )}

        {/* ──────── ICON SCALE ──────── */}
        {screen.type === "scale" && (
          <div style={{ paddingTop: 8 }}>
            <h2 style={{ ...qStyle, textAlign: "center" }}>{screen.q}</h2>
            {screen.sub && <p style={{ ...subStyle, textAlign: "center" }}>{screen.sub}</p>}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 28 }}>
              {EMOTION_IMGS.map((em, i) => {
                const sel = answers[screen.id] === i;
                return (
                  <button key={i} onClick={() => answer(screen.id, i)} style={{ flex: 1, background: sel ? GREEN_LIGHT : "#fff", border: `2px solid ${sel ? GREEN : "#E5E7EB"}`, borderRadius: 12, padding: "10px 4px 8px", cursor: "pointer", transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <img src={em.url} alt={em.label} style={{ width: "100%", maxWidth: 52, borderRadius: 8, aspectRatio: "1/1", objectFit: "cover" }} />
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Strongly disagree</span>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Strongly agree</span>
            </div>
          </div>
        )}

        {/* ──────── MULTI-SELECT ──────── */}
        {screen.type === "multi" && (
          <div style={{ paddingTop: 8 }}>
            <h2 style={qStyle}>{screen.q}</h2>
            <p style={subStyle}>Select all that apply</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              {screen.opts.map(opt => {
                const sel = (answers[screen.id] || []).includes(opt);
                return (
                  <button key={opt} onClick={() => toggleMulti(screen.id, opt)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: sel ? GREEN_LIGHT : "#fff", border: `2px solid ${sel ? GREEN : "#E5E7EB"}`, borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${sel ? GREEN : "#D1D5DB"}`, background: sel ? GREEN : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
                      {sel && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span style={{ fontSize: 15, color: sel ? "#065F46" : "#374151", fontWeight: sel ? 600 : 400 }}>{opt}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 20 }}>
              <GreenBtn onClick={next} disabled={(answers[screen.id] || []).length === 0}>Continue</GreenBtn>
            </div>
          </div>
        )}

        {/* ──────── EMAIL ──────── */}
        {screen.type === "email" && (
          <div style={{ paddingTop: 24, textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>📬</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>Enter your email</h2>
            <p style={{ fontSize: 15, color: "#6B7280", margin: "0 0 28px", lineHeight: 1.6 }}>We'll send your personalized well-being plan and keep you updated on your progress.</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setEmailErr(""); }}
              style={{ width: "100%", boxSizing: "border-box", padding: "14px 16px", fontSize: 16, border: `2px solid ${emailErr ? "#EF4444" : "#E5E7EB"}`, borderRadius: 12, outline: "none", marginBottom: 8, fontFamily: "inherit" }}
            />
            {emailErr && <p style={{ color: "#EF4444", fontSize: 13, margin: "0 0 12px" }}>{emailErr}</p>}
            <GreenBtn onClick={() => {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailErr("Please enter a valid email"); return; }
              next();
            }}>Get my plan →</GreenBtn>
            <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 12 }}>No spam. Unsubscribe at any time.</p>
          </div>
        )}

        {/* ──────── LOADING ──────── */}
        {screen.type === "loading" && (
          <div style={{ paddingTop: 60, textAlign: "center" }}>
            <div style={{ fontSize: 52, marginBottom: 24 }}>🧬</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "0 0 10px" }}>We're building your plan</h2>
            <p style={{ fontSize: 15, color: "#6B7280", margin: "0 0 32px" }}>Analyzing your answers to create a personalized well-being plan…</p>
            <div style={{ background: "#E5E7EB", borderRadius: 8, height: 8, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ height: "100%", width: `${loadPct}%`, background: GREEN, borderRadius: 8, transition: "width 0.1s linear" }} />
            </div>
            <p style={{ fontSize: 13, color: "#9CA3AF" }}>{loadPct}%</p>
          </div>
        )}

        {/* ──────── RESULT ──────── */}
        {screen.type === "result" && (
          <div style={{ paddingTop: 16 }}>
            <div style={{ background: `linear-gradient(135deg, ${GREEN} 0%, #00A0D4 100%)`, borderRadius: 20, padding: "28px 24px", textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, margin: "0 0 8px", textShadow: "0 1px 3px rgba(0,0,0,0.15)" }}>Your personalized plan is ready</h2>
              <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, margin: 0 }}>A personalized well-being management plan</p>
            </div>

            <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "20px", marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 14px" }}>Your plan includes</p>
              {[
                "Daily guided well-being sessions",
                "Personalized techniques based on your profile",
                "Evidence-based behavioral strategies",
                "Progress tracking & milestone reminders",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: GREEN_LIGHT, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <span style={{ fontSize: 14, color: "#374151", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: GREEN_LIGHT, border: `1px solid ${GREEN}`, borderRadius: 14, padding: "16px 18px", marginBottom: 20 }}>
              <p style={{ fontSize: 14, color: "#065F46", lineHeight: 1.6, margin: 0 }}>
                <strong>Based on your answers</strong>, your plan focuses on reducing stress, building emotional resilience, and improving daily habits — {answers.q26 || "at your own pace"}.
              </p>
            </div>

            <GreenBtn onClick={() => window.scrollTo(0,0)}>Start my plan 🚀</GreenBtn>
            <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 16 }}>© {new Date().getFullYear()} Liven. All rights reserved.</p>
          </div>
        )}

      </div>
    </div>
  );
}

function OptionRow({ label, selected, onSelect }) {
  return (
    <button onClick={onSelect} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 16px", background: selected ? GREEN_LIGHT : "#fff", border: `2px solid ${selected ? GREEN : "#E5E7EB"}`, borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.2s", width: "100%" }}>
      <span style={{ fontSize: 15, color: selected ? "#065F46" : "#374151", fontWeight: selected ? 600 : 400 }}>{label}</span>
      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${selected ? GREEN : "#D1D5DB"}`, background: selected ? GREEN : "transparent", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
        {selected && <svg width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
    </button>
  );
}

function GreenBtn({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "16px", fontSize: 16, fontWeight: 700, color: "#fff", background: disabled ? "#A7F3D0" : GREEN, border: "none", borderRadius: 14, cursor: disabled ? "not-allowed" : "pointer", transition: "background 0.2s", boxShadow: disabled ? "none" : "0 4px 14px rgba(0,195,137,0.35)" }}>
      {children}
    </button>
  );
}

const qStyle = { fontSize: 20, fontWeight: 700, color: "#111827", margin: "0 0 6px", lineHeight: 1.35 };
const subStyle = { fontSize: 14, color: "#6B7280", margin: "0 0 4px", lineHeight: 1.5 };
