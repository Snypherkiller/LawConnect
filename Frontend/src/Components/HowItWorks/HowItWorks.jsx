import "./HowItWorks.css";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Ask your question",
      description:
        "Describe your legal concern naturally, just like you would explain it to another person.",
      tag: "Simple Input",
    },
    {
      number: "02",
      title: "LawConnect finds the rule",
      description:
        "Your question is matched with verified Sri Lankan legal information and official sources.",
      tag: "Verified Sources",
    },
    {
      number: "03",
      title: "Understand the answer",
      description:
        "Receive a clear explanation, practical next steps and the source behind the information.",
      tag: "Clear Guidance",
    },
  ];

  return (
    <section className="how-section" id="how-it-works">
      <div className="how-grid-background" />

      <div className="how-glow how-glow-one" />
      <div className="how-glow how-glow-two" />

      <div className="how-container">
        <div className="how-header">
          <div className="how-eyebrow">
            HOW LAWCONNECT WORKS
          </div>

          <h2>
            From question to
            <span> clarity.</span>
          </h2>

          <p>
            LawConnect turns complicated legal information into simple,
            practical guidance for travellers visiting Sri Lanka.
          </p>
        </div>

        <div className="how-steps">
          {steps.map((step, index) => (
            <div
              className="how-step-card"
              key={step.number}
              style={{
                animationDelay: `${index * 0.16}s`,
              }}
            >
              <div className="how-step-top">
                <span className="how-step-number">
                  {step.number}
                </span>

                <span className="how-step-tag">
                  {step.tag}
                </span>
              </div>

              <div className="how-step-content">
                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>
              </div>

              <div className="how-step-progress">
                <span />
              </div>

              <div className="how-step-watermark">
                {step.number}
              </div>
            </div>
          ))}
        </div>

        <div className="how-flow">
          <div className="how-flow-line" />

          <div className="how-flow-item">
            <span className="flow-number">
              01
            </span>

            <div>
              <strong>
                Your Question
              </strong>

              <span>
                Everyday legal situation
              </span>
            </div>
          </div>

          <div className="how-flow-arrow">
            →
          </div>

          <div className="how-flow-item">
            <span className="flow-number">
              02
            </span>

            <div>
              <strong>
                Verified Information
              </strong>

              <span>
                Official Sri Lankan sources
              </span>
            </div>
          </div>

          <div className="how-flow-arrow">
            →
          </div>

          <div className="how-flow-item">
            <span className="flow-number">
              03
            </span>

            <div>
              <strong>
                Clear Guidance
              </strong>

              <span>
                Simple answer and next steps
              </span>
            </div>
          </div>
        </div>

        <div className="how-note">
          <span className="how-note-dot" />

          <p>
            Important legal answers are designed to show their source and
            verification information instead of relying on an unsupported AI
            response.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;