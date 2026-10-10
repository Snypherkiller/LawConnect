import "./Footer.css";

function Footer() {
  return (
    <footer className="law-footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              LC
            </div>

            <div>
              <h2>LawConnect</h2>
              <span>SRI LANKA</span>
            </div>
          </div>

          <p className="footer-description">
            Helping travellers understand everyday Sri Lankan laws,
            regulations and important legal requirements in simple language.
          </p>

          <div className="footer-links">
            <div>
              <h4>Explore</h4>

              <a href="#visa">
                Visa & Immigration
              </a>

              <a href="#driving">
                Driving & Rentals
              </a>

              <a href="#safety">
                Police & Safety
              </a>
            </div>

            <div>
              <h4>LawConnect</h4>

              <a href="#about">
                About
              </a>

              <a href="#sources">
                Sources
              </a>

              <a href="#emergency">
                Emergency
              </a>
            </div>

            <div>
              <h4>Legal</h4>

              <a href="#privacy">
                Privacy
              </a>

              <a href="#terms">
                Terms
              </a>

              <a href="#disclaimer">
                Disclaimer
              </a>
            </div>
          </div>
        </div>

        <div className="footer-warning">
          <div className="warning-icon">
            !
          </div>

          <p>
            <strong>Important:</strong> LawConnect provides general legal
            information only and does not replace professional legal advice
            or guidance from the relevant Sri Lankan authority.
          </p>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 LawConnect
          </span>

          <span>
            Built for travellers visiting Sri Lanka
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;