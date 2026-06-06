import { useState } from "react";

const BRAND = "Quiz Unicornio";

const questions = [
  {
    id: 1,
    question: "¿Cuál es tu objetivo principal en este momento?",
    options: [
      { id: "a", text: "Perder peso y mejorar mi figura", emoji: "⚖️" },
      { id: "b", text: "Ganar músculo y fuerza", emoji: "💪" },
      { id: "c", text: "Mejorar mi salud general", emoji: "❤️" },
      { id: "d", text: "Aumentar mi energía y vitalidad", emoji: "⚡" },
    ],
  },
  {
    id: 2,
    question: "¿Cuál es tu nivel de actividad física actual?",
    options: [
      { id: "a", text: "Sedentario (poco o nada de ejercicio)", emoji: "🛋️" },
      { id: "b", text: "Ligero (1-2 días por semana)", emoji: "🚶" },
      { id: "c", text: "Moderado (3-4 días por semana)", emoji: "🏃" },
      { id: "d", text: "Activo (5+ días por semana)", emoji: "🏋️" },
    ],
  },
  {
    id: 3,
    question: "¿Cómo describirías tus hábitos alimenticios?",
    options: [
      { id: "a", text: "Como mucha comida procesada", emoji: "🍔" },
      { id: "b", text: "Intento comer sano pero me cuesta", emoji: "🥗" },
      { id: "c", text: "Tengo una dieta bastante equilibrada", emoji: "🍎" },
      { id: "d", text: "Sigo un plan nutricional estricto", emoji: "📋" },
    ],
  },
  {
    id: 4,
    question: "¿Cuántas horas duermes en promedio por noche?",
    options: [
      { id: "a", text: "Menos de 5 horas", emoji: "😴" },
      { id: "b", text: "Entre 5 y 6 horas", emoji: "🌙" },
      { id: "c", text: "Entre 7 y 8 horas", emoji: "✨" },
      { id: "d", text: "Más de 8 horas", emoji: "💤" },
    ],
  },
  {
    id: 5,
    question: "¿Qué tan estresado/a te sientes en tu día a día?",
    options: [
      { id: "a", text: "Muy estresado/a constantemente", emoji: "😰" },
      { id: "b", text: "Estresado/a con frecuencia", emoji: "😟" },
      { id: "c", text: "A veces me estreso", emoji: "😐" },
      { id: "d", text: "Casi nunca me estreso", emoji: "😊" },
    ],
  },
  {
    id: 6,
    question: "¿Cuánta agua bebes al día?",
    options: [
      { id: "a", text: "Menos de 1 litro", emoji: "🥤" },
      { id: "b", text: "Entre 1 y 1.5 litros", emoji: "💧" },
      { id: "c", text: "Entre 1.5 y 2 litros", emoji: "🌊" },
      { id: "d", text: "Más de 2 litros", emoji: "🏊" },
    ],
  },
];

const results = {
  beginner: {
    title: "¡Eres un Unicornio en Desarrollo! 🦄",
    subtitle: "Tu viaje hacia el bienestar está comenzando",
    description:
      "Tienes mucho potencial por descubrir. Con pequeños cambios en tu rutina diaria, puedes transformar completamente tu bienestar. ¡El primer paso ya lo has dado!",
    color: "#a78bfa",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
    tips: [
      "Empieza con caminatas de 20 minutos al día",
      "Añade una porción de verduras a cada comida",
      "Establece una hora fija para dormir",
    ],
  },
  intermediate: {
    title: "¡Eres un Unicornio en Crecimiento! 🌟",
    subtitle: "Vas por el buen camino",
    description:
      "Tienes buenas bases pero aún hay espacio para mejorar. Con consistencia y las estrategias adecuadas, puedes llevar tu bienestar al siguiente nivel.",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
    tips: [
      "Incrementa la intensidad de tus entrenamientos gradualmente",
      "Planifica tus comidas con anticipación",
      "Incorpora técnicas de manejo del estrés",
    ],
  },
  advanced: {
    title: "¡Eres un Unicornio Legendario! 🏆",
    subtitle: "Tu estilo de vida es inspirador",
    description:
      "Tienes hábitos excelentes y una mentalidad ganadora. Estás en la élite del bienestar. Sigue refinando tu rutina para alcanzar la perfección.",
    color: "#6d28d9",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #0ea5e9 100%)",
    tips: [
      "Optimiza tu recuperación con técnicas avanzadas",
      "Considera trabajar con un especialista en nutrición",
      "Explora modalidades de entrenamiento nuevas",
    ],
  },
};

function calculateResult(answers) {
  // TODO: Replace with actual scoring logic connected to backend API
  const scores = { a: 1, b: 2, c: 3, d: 4 };
  const total = Object.values(answers).reduce(
    (sum, val) => sum + (scores[val] || 1),
    0
  );
  const avg = total / Object.keys(answers).length;
  if (avg < 2) return results.beginner;
  if (avg < 3) return results.intermediate;
  return results.advanced;
}

export default function App() {
  const [step, setStep] = useState("welcome"); // welcome | quiz | result
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleStart = () => {
    setStep("quiz");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
  };

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setTimeout(() => {
      const newAnswers = { ...answers, [currentQuestion]: optionId };
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          setCurrentQuestion((prev) => prev + 1);
          setSelectedOption(null);
          setAnimating(false);
        }, 300);
      } else {
        setAnimating(true);
        setTimeout(() => {
          const r = calculateResult(newAnswers);
          setResult(r);
          setStep("result");
          setAnimating(false);
        }, 300);
      }
    }, 400);
  };

  const handleRestart = () => {
    setStep("welcome");
    setCurrentQuestion(0);
    setAnswers({});
    setSelectedOption(null);
    setResult(null);
    setEmail("");
    setEmailSubmitted(false);
    setEmailError("");
  };

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Por favor ingresa un correo válido.");
      return;
    }
    setEmailError("");
    // TODO: Connect to email marketing API (e.g., Mailchimp, HubSpot)
    setEmailSubmitted(true);
  };

  const styles = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(160deg, #f5f0ff 0%, #fce4f6 50%, #e0f2fe 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      padding: "16px",
    },
    card: {
      background: "#ffffff",
      borderRadius: "24px",
      boxShadow: "0 20px 60px rgba(139,92,246,0.15), 0 4px 20px rgba(0,0,0,0.08)",
      maxWidth: "620px",
      width: "100%",
      overflow: "hidden",
    },
    header: {
      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)",
      padding: "24px 32px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logoEmoji: {
      fontSize: "28px",
      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
    },
    logoText: {
      color: "#ffffff",
      fontWeight: "800",
      fontSize: "20px",
      letterSpacing: "-0.3px",
    },
    stepLabel: {
      color: "rgba(255,255,255,0.85)",
      fontSize: "13px",
      fontWeight: "600",
      background: "rgba(255,255,255,0.2)",
      padding: "4px 12px",
      borderRadius: "20px",
    },
    progressBar: {
      height: "4px",
      background: "rgba(255,255,255,0.3)",
      position: "relative",
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      background: "#ffffff",
      borderRadius: "4px",
      transition: "width 0.5s ease",
    },
    body: {
      padding: "36px 32px 40px",
    },
    welcomeEmoji: {
      fontSize: "72px",
      textAlign: "center",
      display: "block",
      marginBottom: "16px",
      filter: "drop-shadow(0 4px 8px rgba(139,92,246,0.3))",
    },
    welcomeTitle: {
      fontSize: "28px",
      fontWeight: "800",
      color: "#1e1b4b",
      textAlign: "center",
      margin: "0 0 12px 0",
      lineHeight: "1.2",
    },
    welcomeSubtitle: {
      fontSize: "16px",
      color: "#64748b",
      textAlign: "center",
      margin: "0 0 32px 0",
      lineHeight: "1.6",
    },
    featureList: {
      listStyle: "none",
      padding: "0",
      margin: "0 0 36px 0",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "14px 16px",
      background: "#faf5ff",
      borderRadius: "12px",
      border: "1px solid #e9d5ff",
    },
    featureItemEmoji: {
      fontSize: "22px",
      flexShrink: 0,
    },
    featureItemText: {
      fontSize: "14px",
      color: "#4c1d95",
      fontWeight: "500",
    },
    btn: {
      width: "100%",
      padding: "16px 24px",
      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "14px",
      fontSize: "17px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease",
      boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
      letterSpacing: "0.3px",
    },
    questionTitle: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#1e1b4b",
      margin: "0 0 28px 0",
      lineHeight: "1.4",
    },
    optionsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      opacity: animating ? 0 : 1,
      transform: animating ? "translateX(30px)" : "translateX(0)",
      transition: "opacity 0.3s ease, transform 0.3s ease",
    },
    option: (isSelected) => ({
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "16px 20px",
      border: isSelected ? "2px solid #7c3aed" : "2px solid #e5e7eb",
      borderRadius: "14px",
      background: isSelected
        ? "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)"
        : "#fafafa",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: isSelected
        ? "0 4px 16px rgba(124,58,237,0.2)"
        : "0 1px 4px rgba(0,0,0,0.05)",
      transform: isSelected ? "scale(1.02)" : "scale(1)",
    }),
    optionEmoji: {
      fontSize: "26px",
      flexShrink: 0,
    },
    optionText: (isSelected) => ({
      fontSize: "15px",
      fontWeight: isSelected ? "600" : "500",
      color: isSelected ? "#5b21b6" : "#374151",
      flex: 1,
    }),
    optionCheck: {
      width: "22px",
      height: "22px",
      borderRadius: "50%",
      background: "#7c3aed",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    },
    resultEmoji: {
      fontSize: "64px",
      textAlign: "center",
      display: "block",
      marginBottom: "12px",
    },
    resultBadge: (gradient) => ({
      background: gradient,
      borderRadius: "20px",
      padding: "24px",
      textAlign: "center",
      marginBottom: "28px",
    }),
    resultTitle: {
      color: "#ffffff",
      fontSize: "22px",
      fontWeight: "800",
      margin: "0 0 6px 0",
      textShadow: "0 1px 3px rgba(0,0,0,0.2)",
    },
    resultSubtitle: {
      color: "rgba(255,255,255,0.9)",
      fontSize: "14px",
      fontWeight: "500",
      margin: "0",
    },
    resultDescription: {
      fontSize: "15px",
      color: "#4b5563",
      lineHeight: "1.7",
      margin: "0 0 28px 0",
      padding: "0 4px",
    },
    tipsTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#1e1b4b",
      margin: "0 0 16px 0",
    },
    tipsList: {
      listStyle: "none",
      padding: "0",
      margin: "0 0 32px 0",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    tipItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      fontSize: "14px",
      color: "#374151",
      lineHeight: "1.5",
    },
    tipDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7c3aed, #ec4899)",
      flexShrink: 0,
      marginTop: "6px",
    },
    emailSection: {
      background: "#faf5ff",
      border: "1px solid #e9d5ff",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "24px",
    },
    emailTitle: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#1e1b4b",
      margin: "0 0 8px 0",
    },
    emailDesc: {
      fontSize: "13px",
      color: "#6b7280",
      margin: "0 0 16px 0",
      lineHeight: "1.5",
    },
    emailForm: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    emailInput: {
      flex: "1",
      minWidth: "180px",
      padding: "12px 16px",
      border: "2px solid #d8b4fe",
      borderRadius: "10px",
      fontSize: "14px",
      color: "#1e1b4b",
      outline: "none",
      background: "#ffffff",
      transition: "border-color 0.2s ease",
    },
    emailBtn: {
      padding: "12px 20px",
      background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "opacity 0.2s ease, transform 0.2s ease",
      whiteSpace: "nowrap",
    },
    emailError: {
      fontSize: "13px",
      color: "#dc2626",
      marginTop: "8px",
    },
    successMsg: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      fontSize: "14px",
      color: "#059669",
      fontWeight: "600",
    },
    restartBtn: {
      width: "100%",
      padding: "14px 24px",
      background: "transparent",
      color: "#7c3aed",
      border: "2px solid #7c3aed",
      borderRadius: "14px",
      fontSize: "15px",
      fontWeight: "700",
      cursor: "pointer",
      transition: "background 0.2s ease, color 0.2s ease",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
      color: "#9ca3af",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.app}>
      <div style={styles.card}>
        {/* HEADER */}
        <div style={styles.header}>
          <div style={styles.logo}>
            <span style={styles.logoEmoji}>🦄</span>
            <span style={styles.logoText}>{BRAND}</span>
          </div>
          {step === "quiz" && (
            <span style={styles.stepLabel}>
              {currentQuestion + 1} / {questions.length}
            </span>
          )}
        </div>

        {/* PROGRESS BAR */}
        {step === "quiz" && (
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>
        )}

        {/* BODY */}
        <div style={styles.body}>
          {/* WELCOME */}
          {step === "welcome" && (
            <div>
              <span style={styles.welcomeEmoji}>🦄</span>
              <h1 style={styles.welcomeTitle}>
                Descubre tu perfil de bienestar
              </h1>
              <p style={styles.welcomeSubtitle}>
                Responde {questions.length} preguntas rápidas y descubre qué
                tipo de unicornio eres en tu camino hacia el bienestar.
              </p>
              <ul style={styles.featureList}>
                <li style={styles.featureItem}>
                  <span style={styles.featureItemEmoji}>⏱️</span>
                  <span style={styles.featureItemText}>
                    Solo 2 minutos para completarlo
                  </span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureItemEmoji}>🎯</span>
                  <span style={styles.featureItemText}>
                    Resultados personalizados según tu estilo de vida
                  </span>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureItemEmoji}>💡</span>
                  <span style={styles.featureItemText}>
                    Consejos prácticos para mejorar tu bienestar
                  </span>
                </li>
              </ul>
              <button
                style={styles.btn}
                onClick={handleStart}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 8px 28px rgba(124,58,237,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 20px rgba(124,58,237,0.4)";
                }}
              >
                Comenzar Quiz 🚀
              </button>
            </div>
          )}

          {/* QUIZ */}
          {step === "quiz" && (
            <div>
              <p style={styles.questionTitle}>
                {questions[currentQuestion].question}
              </p>
              <div style={styles.optionsGrid}>
                {questions[currentQuestion].options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      style={{
                        ...styles.option(isSelected),
                        border: "none",
                        textAlign: "left",
                      }}
                      onClick={() => handleOptionSelect(opt.id)}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = "#a78bfa";
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, #fdf4ff 0%, #faf5ff 100%)";
                          e.currentTarget.style.transform = "scale(1.01)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.background = "#fafafa";
                          e.currentTarget.style.transform = "scale(1)";
                        }
                      }}
                    >
                      <span style={styles.optionEmoji}>{opt.emoji}</span>
                      <span style={styles.optionText(isSelected)}>
                        {opt.text}
                      </span>
                      {isSelected && (
                        <span style={styles.optionCheck}>
                          <svg
                            width="12"
                            height="10"
                            viewBox="0 0 12 10"
                            fill="none"
                          >
                            <path
                              d="M1 5L4.5 8.5L11 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* RESULT */}
          {step === "result" && result && (
            <div>
              <div style={styles.resultBadge(result.gradient)}>
                <span style={styles.resultEmoji}>🦄</span>
                <h2 style={styles.resultTitle}>{result.title}</h2>
                <p style={styles.resultSubtitle}>{result.subtitle}</p>
              </div>

              <p style={styles.resultDescription}>{result.description}</p>

              <p style={styles.tipsTitle}>✨ Tus próximos pasos:</p>
              <ul style={styles.tipsList}>
                {result.tips.map((tip, i) => (
                  <li key={i} style={styles.tipItem}>
                    <span style={styles.tipDot} />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

              {/* EMAIL CAPTURE */}
              <div style={styles.emailSection}>
                <p style={styles.emailTitle}>
                  🎁 Recibe tu plan personalizado
                </p>
                <p style={styles.emailDesc}>
                  Déjanos tu correo y te enviamos consejos exclusivos basados
                  en tu perfil de unicornio.
                </p>
                {!emailSubmitted ? (
                  <form onSubmit={handleEmailSubmit}>
                    <div style={styles.emailForm}>
                      <input
                        type="email"
                        placeholder="tu@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.emailInput}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#7c3aed";
                          e.target.style.boxShadow =
                            "0 0 0 3px rgba(124,58,237,0.1)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "#d8b4fe";
                          e.target.style.boxShadow = "none";
                        }}
                        aria-label="Correo electrónico"
                      />
                      <button
                        type="submit"
                        style={styles.emailBtn}
                        onMouseEnter={(e) => {
                          e.target.style.opacity = "0.9";
                          e.target.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.opacity = "1";
                          e.target.style.transform = "translateY(0)";
                        }}
                      >
                        Enviar ✨
                      </button>
                    </div>
                    {emailError && (
                      <p style={styles.emailError}>{emailError}</p>
                    )}
                  </form>
                ) : (
                  <div style={styles.successMsg}>
                    <span style={{ fontSize: "20px" }}>✅</span>
                    <span>
                      ¡Gracias! Revisa tu bandeja de entrada pronto.
                    </span>
                  </div>
                )}
              </div>

              <button
                style={styles.restartBtn}
                onClick={handleRestart}
                onMouseEnter={(e) => {
                  e.target.style.background = "#7c3aed";
                  e.target.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.color = "#7c3aed";
                }}
              >
                🔄 Repetir el Quiz
              </button>
            </div>
          )}
        </div>
      </div>

      <p style={styles.footer}>
        © {new Date().getFullYear()} {BRAND}. Todos los derechos reservados.
      </p>
    </div>
  );
}