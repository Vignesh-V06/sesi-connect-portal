import React from "react";

const IconLink = ({ href = "#", ariaLabel = "icon", children }) => (
  <a
    href={href}
    aria-label={ariaLabel}
    className="footer-icon"
    style={{ transition: "transform 0.2s ease", display: "inline-block" }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "scale(1.25)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{ padding: "2rem 0", textAlign: "center", background: "#050816" }}
    >
      <div
        className="footer-inner"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}
      >
        <p className="copyright" style={{ color: "#ffffff", fontSize: "0.9rem", opacity: 0.8 }}>
          © 2025 Solar Energy Society of India · VIT Student Chapter
        </p>

        <div className="footer-icons" style={{ display: "flex", gap: "1.4rem" }}>
          <IconLink href="https://www.instagram.com/sesi.vit/" ariaLabel="Instagram">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.5a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </IconLink>

          <IconLink href="#" ariaLabel="LinkedIn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.9-2.2 4-2.2 4.3 0 5.1 2.8 5.1 6.5V24h-4v-8.2c0-2 0-4.6-3-4.6s-3.5 2.2-3.5 4.5V24h-4V8z" />
            </svg>
          </IconLink>

          <IconLink href="#" ariaLabel="WordPress">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
              <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 0022.8 5.88L12 0zm0 2.1l8.7 15.2A9.9 9.9 0 0112 21.9a9.9 9.9 0 01-8.7-4.6L12 2.1z" />
            </svg>
          </IconLink>

          <IconLink href="#" ariaLabel="Email">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffffff">
              <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm16 2H4v.01L12 13l8-6.99V6z" />
            </svg>
          </IconLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
