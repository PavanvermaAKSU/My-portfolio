import React from "react";
import { ArrowUp } from "lucide-react";
import { PERSONAL_INFO } from "../../data/portfolioData";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bq-footer">
      <div className="bq-footer__shell">
        <div className="bq-footer__top">
          <div className="bq-footer__brand">
            <span className="bq-footer__logo-text">{PERSONAL_INFO.name.toUpperCase()}</span>
            <p className="bq-footer__tagline">
              Data Science &amp; Artificial Intelligence Engineer · Full-Stack Systems
            </p>
          </div>

          <button
            className="bq-footer__back-to-top"
            onClick={scrollToTop}
            data-cursor="open"
            data-cursor-text="TOP"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>

        <div className="bq-footer__bottom">
          <div className="bq-footer__copy">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>
          <div className="bq-footer__bunq-credit">
            <span>Built with React, Three.js, and curiosity.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
