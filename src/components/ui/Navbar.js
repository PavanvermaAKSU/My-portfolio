import React, { useState, useEffect } from "react";
import soundFX from "./SoundFX";

export default function Navbar() {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = React.useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 100);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSoundToggle = () => {
    const playing = soundFX.toggle();
    setIsPlayingSound(playing);
  };

  return (
    <header
      className={`bq-nav ${visible ? "is-visible" : "is-hidden"}`}
      aria-label="Primary Navigation"
    >
      <a href="#hero" className="bq-nav__logo" aria-label="Home">
        <div className="bq-logo-mark">
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
            <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.06)" />
            <path d="M12 28V12L24 20L12 28Z" fill="#ffffff" />
            <circle cx="28" cy="20" r="3.5" fill="#e11d48" />
          </svg>
          <span className="bq-logo-text">PAVAN KUMAR VERMA</span>
        </div>
      </a>

      <span className="bq-nav__studio-label">AI ENGINEER · DATA · SYSTEMS</span>

      <button
        type="button"
        className={`bq-nav__menu-toggle ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        data-cursor="open"
        data-cursor-text="MENU"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`bq-nav__menu ${menuOpen ? "is-open" : ""}`}>
        <div className="bq-nav__menu-index">PAVAN KUMAR VERMA / 2026</div>
        <a href="#work" onClick={() => setMenuOpen(false)}>Work <span>01</span></a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About <span>02</span></a>
        <a href="#skills" onClick={() => setMenuOpen(false)}>Capabilities <span>03</span></a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <span>04</span></a>
        <button
          data-audio-toggle
          className="bq-nav__sound-btn"
          onClick={handleSoundToggle}
          aria-label="Toggle sound"
          aria-pressed={isPlayingSound}
        >
          {isPlayingSound ? "Sound on" : "Sound off"}
        </button>
      </div>
    </header>
  );
}
