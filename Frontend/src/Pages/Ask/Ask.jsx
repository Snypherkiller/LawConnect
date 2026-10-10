
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";

import "./Ask.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const welcomeMessage = {
  role: "assistant",
  content:
    "Hello! I'm LawConnect AI. I can help you understand general legal and regulatory information about travelling in Sri Lanka. What would you like to know?",
};

const suggestedQuestions = [
  "Can I drive in Sri Lanka with my foreign licence?",
  "How can I extend my tourist visa?",
  "What should I do if my passport is lost?",
  "How do I report a tourist scam?",
];

function Ask() {
  const location = useLocation();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    welcomeMessage,
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const sendingRef = useRef(false);
  const messagesRef = useRef([welcomeMessage]);
  const initialHandledRef = useRef(false);

  // Scroll ONLY the chat messages container.
  // This prevents the entire website from scrolling.
  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const question = String(text || "").trim();

    if (!question || sendingRef.current) {
      return;
    }

    sendingRef.current = true;

    const userMessage = {
      role: "user",
      content: question,
    };

    const updatedMessages = [
      ...messagesRef.current,
      userMessage,
    ];

    messagesRef.current = updatedMessages;

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages.slice(-30),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          "Unable to generate a response."
        );
      }

      const assistantMessage = {
        role: "assistant",
        content:
          data.reply ||
          "Sorry, I couldn't generate an answer.",
      };

      const nextMessages = [
        ...messagesRef.current,
        assistantMessage,
      ];

      messagesRef.current = nextMessages;

      setMessages(nextMessages);
    } catch (err) {
      setError(
        err.message ||
        "Unable to connect to LawConnect AI."
      );
    } finally {
      sendingRef.current = false;
      setLoading(false);

      // Prevent focus from scrolling the entire page.
      textareaRef.current?.focus({
        preventScroll: true,
      });
    }
  }, []);

  // Automatically send the question received
  // from the Landing page Hero section.
  useEffect(() => {
    const initialQuestion =
      location.state?.initialQuestion;

    if (
      !initialQuestion ||
      initialHandledRef.current
    ) {
      return;
    }

    initialHandledRef.current = true;

    navigate(location.pathname, {
      replace: true,
      state: null,
    });

    sendMessage(initialQuestion);
  }, [
    location.state,
    location.pathname,
    navigate,
    sendMessage,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    if (sendingRef.current) {
      return;
    }

    messagesRef.current = [welcomeMessage];

    setMessages([welcomeMessage]);
    setInput("");
    setError("");

    textareaRef.current?.focus({
      preventScroll: true,
    });
  };

  return (
    <div className="ask-page">
      <Navbar />

      <main className="ai-main">
        <div className="ai-background-glow ai-glow-one" />
        <div className="ai-background-glow ai-glow-two" />

        <div className="ai-container">
          <div className="ai-heading">
            <span className="ai-eyebrow">
              YOUR LEGAL AI ASSISTANT
            </span>

            <h1>
              Ask anything.
              <span> Understand your rights.</span>
            </h1>

            <p>
              Get clear, conversational guidance about
              common legal and regulatory questions while
              visiting Sri Lanka.
            </p>
          </div>

          <div className="ai-workspace">
            <aside className="ai-sidebar">
              <div className="ai-sidebar-heading">
                <h2>Explore questions</h2>
                <p>Not sure where to begin?</p>
              </div>

              <div className="ai-suggestions">
                {suggestedQuestions.map(
                  (question, index) => (
                    <button
                      key={question}
                      type="button"
                      className="ai-suggestion"
                      onClick={() =>
                        sendMessage(question)
                      }
                      disabled={loading}
                    >
                      <span className="ai-suggestion-number">
                        {String(index + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <span>{question}</span>
                    </button>
                  )
                )}
              </div>

              <div className="ai-sidebar-notice">
                <strong>
                  Important information
                </strong>

                <p>
                  LawConnect provides general legal
                  information, not professional legal
                  advice. Verify important requirements
                  with official authorities.
                </p>
              </div>
            </aside>

            <section className="ai-chat">
              <div className="ai-chat-header">
                <div className="ai-brand">
                  <div className="ai-brand-avatar">
                    LC
                  </div>

                  <div>
                    <strong>
                      LawConnect AI
                    </strong>

                    <span>
                      Legal information assistant
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="ai-clear-button"
                  onClick={clearChat}
                  disabled={loading}
                >
                  New chat
                </button>
              </div>

              <div
                className="ai-messages"
                ref={chatContainerRef}
                role="log"
                aria-label="Chat messages"
                aria-live="polite"
              >
                {messages.map(
                  (message, index) => (
                    <div
                      key={index}
                      className={`ai-message ${
                        message.role === "user"
                          ? "ai-message-user"
                          : "ai-message-assistant"
                      }`}
                    >
                      {message.role ===
                        "assistant" && (
                        <div className="ai-message-avatar">
                          LC
                        </div>
                      )}

                      <div className="ai-message-body">
                        <span className="ai-message-author">
                          {message.role ===
                          "assistant"
                            ? "LawConnect AI"
                            : "You"}
                        </span>

                        <div className="ai-message-bubble">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )
                )}

                {loading && (
                  <div className="ai-message ai-message-assistant">
                    <div className="ai-message-avatar">
                      LC
                    </div>

                    <div className="ai-message-body">
                      <span className="ai-message-author">
                        LawConnect AI
                      </span>

                      <div className="ai-typing">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form
                className="ai-chat-bottom"
                onSubmit={handleSubmit}
              >
                {error && (
                  <div
                    className="ai-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <div className="ai-input-box">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(event) =>
                      setInput(
                        event.target.value
                      )
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask your legal question..."
                    rows={2}
                    maxLength={4000}
                    disabled={loading}
                    aria-label="Your message"
                  />

                  <button
                    type="submit"
                    className="ai-send-button"
                    disabled={
                      !input.trim() || loading
                    }
                  >
                    {loading
                      ? "Thinking..."
                      : "Send"}
                  </button>
                </div>

                <p className="ai-input-disclaimer">
                  AI responses may contain mistakes.
                  Verify legal information with official
                  Sri Lankan sources.
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Ask;
