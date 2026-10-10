import "./EmergencyBanner.css";

function EmergencyBanner() {
  const emergencyContacts = [
    {
      label: "Police Emergency",
      number: "119",
      href: "tel:119",
      className: "police",
    },
    {
      label: "Ambulance",
      number: "1990",
      href: "tel:1990",
      className: "ambulance",
    },
    {
      label: "Tourism Help",
      number: "1912",
      href: "tel:1912",
      className: "tourism",
    },
  ];

  const situations = [
    "Road accidents",
    "Theft & robbery",
    "Lost passport",
    "Tourist complaints",
  ];

  return (
    <section className="emergency-section" id="emergency">
      <div className="emergency-background-grid" />

      <div className="emergency-orb emergency-orb-one" />
      <div className="emergency-orb emergency-orb-two" />
      <div className="emergency-orb emergency-orb-three" />

      <div className="emergency-container">
        <div className="emergency-card">
          <div className="emergency-card-line" />

          <div className="emergency-left">
            <div className="emergency-label">
              <span className="emergency-label-dot" />
              Emergency Support
            </div>

            <h2>
              Need urgent help
              <span> while travelling?</span>
            </h2>

            <p className="emergency-description">
              Get quick access to important Sri Lankan emergency contacts and
              simple guidance for situations that may happen during your trip.
            </p>

            <div className="emergency-situation-list">
              {situations.map((item, index) => (
                <div
                  className="emergency-situation"
                  key={item}
                  style={{
                    animationDelay: `${index * 0.12}s`,
                  }}
                >
                  <span className="situation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="situation-text">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="emergency-right">
            <div className="emergency-panel">
              <div className="emergency-panel-header">
                <div>
                  <span className="panel-label">
                    Immediate Contacts
                  </span>

                  <h3>
                    Call the right service
                  </h3>
                </div>

                <div className="live-status">
                  <span />
                  Available
                </div>
              </div>

              <div className="emergency-contact-grid">
                {emergencyContacts.map((contact, index) => (
                  <a
                    key={contact.number}
                    href={contact.href}
                    className={`emergency-contact-card ${contact.className}`}
                    style={{
                      animationDelay: `${0.2 + index * 0.12}s`,
                    }}
                  >
                    <div className="contact-accent" />

                    <div className="contact-main">
                      <span className="contact-label">
                        {contact.label}
                      </span>

                      <strong className="contact-number">
                        {contact.number}
                      </strong>
                    </div>

                    <div className="contact-call">
                      CALL
                    </div>
                  </a>
                ))}
              </div>

              <button className="emergency-main-button">
                <span className="button-glow" />
                <span className="button-shine" />

                <span className="button-text">
                  Open Emergency Help
                </span>

                <span className="button-arrow">
                  →
                </span>
              </button>

              <p className="emergency-note">
                If you are in immediate danger, contact the relevant emergency
                service before using LawConnect guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmergencyBanner;