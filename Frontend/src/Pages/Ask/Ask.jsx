
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./Ask.css";

const suggestions = [
  {
    number: "01",
    category: "DRIVING",
    question: "Can I drive in Sri Lanka with my foreign licence?",
  },
  {
    number: "02",
    category: "TRAVEL",
    question: "What should I do if I lose my passport?",
  },
  {
    number: "03",
    category: "SAFETY",
    question: "What should I do after a road accident?",
  },
  {
    number: "04",
    category: "REGULATIONS",
    question: "Are tourists allowed to fly drones?",
  },
];

const createWelcomeMessage = () => ({
  id: "welcome",
  role: "assistant",
  text: "Welcome to LawConnect. Describe your situation or choose a suggested question. I'll help you understand what information you need and what steps to consider.",
  demo: false,
});

function createDemoAnswer(question) {
  return {
    id: `answer-${Date.now()}`,
    role: "assistant",
    text: "Your question has been received. The legal information service has not been connected yet, so I cannot provide a verified answer to this specific situation.",
    question,
    demo: true,
    steps: [
      "Identify the relevant legal or regulatory topic.",
      "Check the applicable official Sri Lankan source.",
      "Confirm that the information is current and applies to your situation.",
      "Follow the authority's instructions or seek qualified legal advice when necessary.",
    ],
    source: {
      authority: "Not yet retrieved",
      status: "Demo mode — no legal source verified",
    },
  };
}

export default function Ask() {
  const [messages, setMessages] = useState([
    createWelcomeMessage(),
  ]);
  const [question, setQuestion] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showMobileSources, setShowMobileSources] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isThinking]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  function submitQuestion(value = question) {
    const cleanQuestion = value.trim();

    if (!cleanQuestion || isThinking) return;

    const userMessage = {
      id: `question-${Date.now()}`,
      role: "user",
      text: cleanQuestion,
    };

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setIsThinking(true);
    setSelectedSource(null);

    timerRef.current = setTimeout(() => {
      const answer = createDemoAnswer(cleanQuestion);

      setMessages((current) => [...current, answer]);
      setSelectedSource(answer.source);
      setIsThinking(false);
    }, 800);

    textareaRef.current?.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    submitQuestion();
  }

  function clearConversation() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setMessages([createWelcomeMessage()]);
    setQuestion("");
    setIsThinking(false);
    setSelectedSource(null);
    setShowMobileSources(false);
  }

  return (
    <div className="ask-page">
      <Navbar />

      <main className="ask-main">
        <div className="ask-grid-background" aria-hidden="true" />
        <div className="ask-orb ask-orb-one" aria-hidden="true" />
        <div className="ask-orb ask-orb-two" aria-hidden="true" />

        <div className="ask-container">
          <header className="ask-heading">
            <div className="ask-heading-copy">
              <span className="ask-eyebrow">
                YOUR EVERYDAY LEGAL ASSISTANT
              </span>

              <h1>
                Understand the rules.
                <span>Know your next step.</span>
              </h1>

              <p>
                Ask everyday legal and regulatory questions about travelling
                in Sri Lanka. Get clear explanations and source information
                when the legal service is connected.
              </p>
            </div>

            <div className="ask-ready-card">
              <span className="ask-ready-dot" />
              <div>
                <strong>Ask LawConnect</strong>
                <span>Traveller-focused guidance</span>
              </div>
            </div>
          </header>

          <div className="ask-workspace">
            <aside className="ask-sidebar">
              <section className="ask-side-card">
                <div className="ask-side-title">
                  <span>TRY A QUESTION</span>
                  <span>04</span>
                </div>

                <div className="ask-suggestions">
                  {suggestions.map((item) => (
                    <button
                      type="button"
                      key={item.number}
                      className="ask-suggestion"
                      onClick={() => {
                        setQuestion(item.question);
                        textareaRef.current?.focus();
                      }}
                    >
                      <span className="ask-suggestion-number">
                        {item.number}
                      </span>
                      <span className="ask-suggestion-content">
                        <small>{item.category}</small>
                        <span>{item.question}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="ask-side-card ask-topic-card">
                <div className="ask-side-title">
                  <span>EXPLORE TOPICS</span>
                </div>

                <Link to="/topics">Visa & Immigration</Link>
                <Link to="/topics">Driving & Rentals</Link>
                <Link to="/topics">Police & Safety</Link>
                <Link to="/topics">Scams & Complaints</Link>
                <Link to="/topics">Drones & Restrictions</Link>

                <p className="ask-coming-soon">
                  Topic pages are being built.
                </p>
              </section>

              <section className="ask-emergency-card">
                <span className="ask-emergency-label">
                  NEED URGENT HELP?
                </span>
                <h2>Safety comes first.</h2>
                <p>
                  For immediate danger, contact the relevant emergency
                  service instead of waiting for an online response.
                </p>
                <Link to="/emergency">
                  Emergency information <span>→</span>
                </Link>
              </section>
            </aside>

            <section className="ask-chat">
              <div className="ask-chat-header">
                <div className="ask-chat-brand">
                  <div className="ask-mini-logo">LC</div>
                  <div>
                    <strong>LawConnect Assistant</strong>
                    <span>Legal information workspace</span>
                  </div>
                </div>

                <div className="ask-chat-actions">
                  <button
                    type="button"
                    className="ask-source-toggle"
                    onClick={() => setShowMobileSources((value) => !value)}
                  >
                    Sources
                  </button>
                  <button
                    type="button"
                    className="ask-clear-button"
                    onClick={clearConversation}
                  >
                    New chat
                  </button>
                </div>
              </div>

              <div className="ask-messages" aria-live="polite">
                {messages.map((message) => (
                  <article
                    key={message.id}
                    className={`ask-message ask-message-${message.role}`}
                  >
                    <div className="ask-message-label">
                      <span>
                        {message.role === "user" ? "YOU" : "LAWCONNECT"}
                      </span>
                      <span>
                        {message.role === "user" ? "Your question" : "Assistant"}
                      </span>
                    </div>

                    <div className="ask-bubble">
                      <p>{message.text}</p>

                      {message.demo && (
                        <>
                          <div className="ask-demo-notice">
                            <strong>Demo response</strong>
                            <span>
                              No legal source has been checked for this
                              answer. Do not rely on it as legal advice.
                            </span>
                          </div>

                          <div className="ask-steps">
                            <h3>What the connected service should check</h3>

                            {message.steps.map((step, index) => (
                              <div className="ask-step" key={step}>
                                <span>
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                                <p>{step}</p>
                              </div>
                            ))}
                          </div>

                          <button
                            type="button"
                            className="ask-view-source"
                            onClick={() => {
                              setSelectedSource(message.source);
                              setShowMobileSources(true);
                            }}
                          >
                            View source status <span>→</span>
                          </button>
                        </>
                      )}
                    </div>
                  </article>
                ))}

                {isThinking && (
                  <div className="ask-thinking">
                    <span className="ask-thinking-dot" />
                    <span className="ask-thinking-dot" />
                    <span className="ask-thinking-dot" />
                    <p>Preparing a demo response…</p>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <div className="ask-composer-wrap">
                <form className="ask-composer" onSubmit={handleSubmit}>
                  <label htmlFor="ask-question">
                    YOUR QUESTION
                    <span>Be as specific as you can</span>
                  </label>

                  <textarea
                    id="ask-question"
                    ref={textareaRef}
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Describe your situation in simple words..."
                    rows={2}
                    maxLength={2000}
                    disabled={isThinking}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                      ) {
                        event.preventDefault();
                        submitQuestion();
                      }
                    }}
                  />

                  <div className="ask-composer-bottom">
                    <span>Enter to send · Shift + Enter for a new line</span>
                    <button
                      type="submit"
                      disabled={!question.trim() || isThinking}
                    >
                      <span>Send question</span>
                      <strong>→</strong>
                    </button>
                  </div>
                </form>

                <p className="ask-disclaimer">
                  General information only. Not a substitute for qualified
                  legal advice. Demo mode does not verify laws or sources.
                </p>
              </div>
            </section>

            <aside
              className={`ask-source-panel ${
                showMobileSources ? "ask-source-panel-open" : ""
              }`}
            >
              <div className="ask-source-panel-header">
                <span>SOURCE TRANSPARENCY</span>
                <h2>Source details</h2>
                <p>
                  A trustworthy answer should show where its information
                  comes from.
                </p>
              </div>

              {selectedSource ? (
                <div className="ask-source-details">
                  <span className="ask-source-status-label">
                    NOT VERIFIED
                  </span>

                  <div>
                    <small>AUTHORITY</small>
                    <strong>{selectedSource.authority}</strong>
                  </div>

                  <div>
                    <small>VERIFICATION STATUS</small>
                    <strong>{selectedSource.status}</strong>
                  </div>
                </div>
              ) : (
                <div className="ask-source-empty">
                  <span className="ask-source-index">00</span>
                  <strong>No source selected</strong>
                  <p>
                    Source details will appear here when a response includes
                    source information.
                  </p>
                </div>
              )}

              <div className="ask-source-principle">
                <span>OUR STANDARD</span>
                <p>
                  Legal guidance should identify the relevant authority,
                  link to its source, and state when the information was
                  checked.
                </p>
              </div>

              <Link to="/sources" className="ask-source-link">
                About our sources <span>→</span>
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
