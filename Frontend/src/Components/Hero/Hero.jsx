
import { useState, useRef, useEffect } from "react";
import "./Hero.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

export default function Hero() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const busyRef = useRef(false);
  const chatRef = useRef(null);

  const suggestions = [
    "Can I drive in Sri Lanka with my foreign licence?",
    "What should I do if my passport is lost?",
    "Can tourists fly drones in Sri Lanka?",
  ];

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const askLawConnect = async (text) => {
    const finalQuestion = text.trim();

    if (!finalQuestion || busyRef.current) return;

    busyRef.current = true;

    const updatedMessages = [
      ...messages,
      { role: "user", content: finalQuestion },
    ].slice(-30);

    setMessages(updatedMessages);
    setQuestion("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to get AI response.");
      }

      if (!data.reply) {
        throw new Error("Empty response from Gemini AI.");
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.reply },
      ].slice(-30));
    } catch (err) {
      setError(err.message || "Connection failed.");
    } finally {
      setLoading(false);
      busyRef.current = false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    askLawConnect(question);
  };

  const useSuggestion = (text) => {
    askLawConnect(text);
  };

  const lastQuestion =
    [...messages].reverse().find((message) => message.role === "user")
      ?.content || "";

  const lastAnswer =
    [...messages].reverse().find((message) => message.role === "assistant")
      ?.content || "";

  return (
    <section className="hero-section" id="home">
      <div className="hero-grid-background" />

      <div className="hero-glow hero-glow-one" />
      <div className="hero-glow hero-glow-two" />
      <div className="hero-glow hero-glow-three" />

      <div className="hero-orbit hero-orbit-one" />
      <div className="hero-orbit hero-orbit-two" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            LEGAL GUIDANCE FOR TRAVELLERS
          </div>

          <h1>
            Understand the rules.
            <span> Travel with confidence.</span>
          </h1>

          <p className="hero-description">
            LawConnect helps travellers understand everyday Sri Lankan legal
            and regulatory information in clear, simple language.
          </p>

          <form className="hero-search" onSubmit={handleSubmit}>
            <div className="hero-search-top">
              <span className="hero-search-label">
                ASK LAWCONNECT
              </span>

              <span className="hero-search-status">
                {loading ? "Thinking..." : "Ready"}
              </span>
            </div>

            <div className="hero-search-row">
              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Ask a legal question about travelling in Sri Lanka..."
                aria-label="Ask LawConnect a legal question"
                disabled={loading}
              />

              <button type="submit" disabled={loading}>
                {loading ? "Wait..." : "Ask"}
                <span>→</span>
              </button>
            </div>
          </form>

          <div className="hero-suggestions">
            <span className="hero-suggestions-label">
              Try asking
            </span>

            <div className="hero-suggestion-list">
              {suggestions.map((suggestion, index) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={loading}
                  style={{
                    "--suggestion-delay": `${0.7 + index * 0.12}s`,
                  }}
                  onClick={() => useSuggestion(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="hero-actions">
            <a href="#topics" className="hero-primary-button">
              Explore legal topics
              <span>→</span>
            </a>

            <a
              href="#how-it-works"
              className="hero-secondary-button"
            >
              How LawConnect works
            </a>
          </div>

          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <strong>01</strong>
              <span>Clear explanations</span>
            </div>

            <div className="hero-trust-divider" />

            <div className="hero-trust-item">
              <strong>02</strong>
              <span>Source-based guidance</span>
            </div>

            <div className="hero-trust-divider" />

            <div className="hero-trust-item">
              <strong>03</strong>
              <span>Traveller focused</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-visual-glow" />

          <div className="hero-assistant-card">
            <div className="hero-card-top">
              <div>
                <span>LAWCONNECT</span>
                <strong>Legal Assistant</strong>
              </div>

              <div className="hero-card-live">
                <span />
                {loading ? "Thinking" : "Ready"}
              </div>
            </div>

            <div className="hero-question-preview">
              <span className="hero-preview-label">
                {lastQuestion ? "Your question" : "Example question"}
              </span>

              <p>
                {lastQuestion ||
                  "Can I legally drive a rental vehicle in Sri Lanka using my foreign driving licence?"}
              </p>
            </div>

            <div className="hero-processing">
              <div className="hero-processing-header">
                <span>
                  {loading
                    ? "Generating your answer..."
                    : lastAnswer
                    ? "Answer generated"
                    : "Finding relevant guidance"}
                </span>

                <strong>{loading ? "..." : "03"}</strong>
              </div>

              <div className="hero-processing-line">
                <span />
              </div>
            </div>

            <div className="hero-answer-preview">
              <div className="hero-answer-label">
                {lastAnswer ? "LAWCONNECT AI RESPONSE" : "SIMPLE EXPLANATION"}
              </div>

              <p
                ref={chatRef}
                style={
                  lastAnswer
                    ? {
                        maxHeight: "260px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "anywhere",
                        overscrollBehavior: "contain",
                      }
                    : undefined
                }
              >
                {loading
                  ? "LawConnect AI is preparing your answer..."
                  : error
                  ? error
                  : lastAnswer ||
                    "LawConnect explains the relevant legal requirements and what you need to do before driving."}
              </p>

              {!lastAnswer && !loading && !error && (
                <div className="hero-answer-points">
                  <div>
                    <span>01</span>
                    Check licence requirements
                  </div>

                  <div>
                    <span>02</span>
                    Check rental requirements
                  </div>

                  <div>
                    <span>03</span>
                    Review the official source
                  </div>
                </div>
              )}
            </div>

            <div className="hero-source-preview">
              <span>Source information</span>
              <strong>
                {lastAnswer
                  ? "Verify with official sources"
                  : "General legal information"}
              </strong>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-card-one">
            <span>Visa</span>
            <strong>Entry &amp; Stay</strong>
          </div>

          <div className="hero-floating-card hero-floating-card-two">
            <span>Safety</span>
            <strong>Emergency Help</strong>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>SCROLL</span>

        <div className="hero-scroll-line">
          <span />
        </div>
      </div>
    </section>
  );
}
