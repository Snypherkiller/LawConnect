import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Explore", href: "#topics" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Emergency", href: "#emergency" },
    { label: "Sources", href: "#sources" },
  ];

  return (
    <header className="site-header">
      <div className="navbar-glow navbar-glow-one" />
      <div className="navbar-glow navbar-glow-two" />

      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <div className="navbar-logo">
            LC
          </div>

          <div className="navbar-brand-text">
            <strong>LawConnect</strong>
            <span>Sri Lanka</span>
          </div>
        </a>

        <nav className="navbar-links">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="navbar-link"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <button className="language-button">
            <span>EN</span>
            <span className="language-arrow">⌄</span>
          </button>

          <a
            href="#emergency"
            className="navbar-sos-button"
          >
            SOS
          </a>

          <button
            type="button"
            className={`mobile-menu-button ${
              menuOpen ? "active" : ""
            }`}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >
        <div className="mobile-menu-inner">
          {navItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                "--mobile-delay": `${index * 0.05}s`,
              }}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-menu-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span>{item.label}</span>
            </a>
          ))}

          <div className="mobile-menu-footer">
            <span>
              Legal guidance for travellers in Sri Lanka
            </span>

            <a
              href="#emergency"
              onClick={() => setMenuOpen(false)}
            >
              Emergency Help
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}