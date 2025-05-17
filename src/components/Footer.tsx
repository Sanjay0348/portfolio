import React from "react";
import { GitHub, LinkedIn, Email, Article } from "@mui/icons-material";
import "../assets/styles/Footer.scss";

function Footer({ mode = "dark" }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`footer ${mode === "dark" ? "footer-dark" : "footer-light"}`}
    >
      <div className="footer-container">
        <div className="footer-bottom">
          <div className="footer-social">
            <a
              href="https://github.com/Sanjay0348"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <GitHub className="footer-icon" />
            </a>
            <a
              href="https://www.linkedin.com/in/sanjay-venkat0348"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedIn className="footer-icon" />
            </a>
            <a
              href="mailto:sanjayvenkat0348@GMAIL.COM"
              target="_blank"
              rel="noreferrer"
              aria-label="Email"
            >
              <Email className="footer-icon" />
            </a>
            {/* <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Resume"
            >
              <Article className="footer-icon" />
            </a> */}
          </div>

          <p className="footer-copyright">
            &copy; {currentYear} A portfolio built with{" "}
            <span className="heart">♥️</span> by
            <a
              href="https://www.linkedin.com/in/sanjay-venkat0348"
              target="_blank"
              rel="noreferrer"
            >
              {" "}
              Sanjay
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
