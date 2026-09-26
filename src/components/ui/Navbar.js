import React, { useState, useEffect } from "react";
import soundFX from "./SoundFX";
import { Volume2, VolumeX, Menu, X } from "lucide-react";

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

  const navigateToZone = (zoneId, domAnchor) => {
    setMenuOpen(false);
    soundFX.playClick();
    window.dispatchEvent(new CustomEvent("bq:nav-to-zone", { detail: { zone: zoneId } }));
    if (domAnchor) {
      const target = document.getElementById(domAnchor);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header
      className={`bq-nav ${visible ? "is-visible" : "is-hidden"}`}
      aria-label="Spatial Studio Navigation"
    >
      <button
        type="button"
        className="bq-nav__logo"
        onClick={() => navigateToZone("entrance", "hero")}
        data-cursor="open"
        data-cursor-text="HOME"
        aria-label="Pavan Kumar Verma Home"
      >
        <div className="bq-logo-mark">
          <svg viewBox="0 0 40 40" width="28" height="28" fill="none">
            <rect width="40" height="40" rx="8" fill="rgba(255,255,255,0.06)" />
            <path d="M12 28V12L24 20L12 28Z" fill="#ffffff" />
            <circle cx="28" cy="20" r="3.5" fill="#e11d48" />
          </svg>
          <span className="bq-logo-text">PAVAN KUMAR VERMA</span>
        </div>
      </button>

      <span className="bq-nav__studio-label">
        AI ENGINEER • DATA SCIENCE • FULL-STACK
      </span>

      {/* Desktop Minimal Direct Links */}
      <nav className="bq-nav__desktop-links" aria-label="Quick Jump Links">
        <button
          type="button"
          onClick={() => navigateToZone("entrance", "hero")}
          data-cursor="open"
          data-cursor-text="HOME"
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => navigateToZone("living", "about")}
          data-cursor="open"
          data-cursor-text="ABOUT"
        >
          About
        </button>
        <button
          type="button"
          onClick={() => navigateToZone("devroom", "skills")}
          data-cursor="open"
          data-cursor-text="SKILLS"
        >
          Skills
        </button>
        <button
          type="button"
          onClick={() => navigateToZone("ailab", "work")}
          data-cursor="open"
          data-cursor-text="AI LAB"
        >
          AI Lab
        </button>
        <button
          type="button"
          onClick={() => navigateToZone("gallery", "work")}
          data-cursor="open"
          data-cursor-text="PROJECTS"
        >
          Work
        </button>
        <button
          type="button"
          onClick={() => navigateToZone("library", "experience")}
          data-cursor="open"
          data-cursor-text="JOURNEY"
        >
          Journey
        </button>
        <button
          type="button"
          onClick={() => navigateToZone("contact", "contact")}
          data-cursor="open"
          data-cursor-text="CONTACT"
          className="bq-nav__contact-pill"
        >
          Contact
        </button>
      </nav>

      {/* Audio Mute/Unmute Toggle */}
      <button
        data-audio-toggle
        className={`bq-nav__sound-btn ${isPlayingSound ? "is-active" : ""}`}
        onClick={handleSoundToggle}
        aria-label="Toggle ambient sound"
        aria-pressed={isPlayingSound}
        data-cursor="open"
        data-cursor-text="AUDIO"
        title="Toggle Audio (Muted by default)"
      >
        {isPlayingSound ? <Volume2 size={15} /> : <VolumeX size={15} />}
        <span>{isPlayingSound ? "Sound on" : "Sound off"}</span>
      </button>

      {/* Mobile Menu Toggle */}
      <button
        type="button"
        className={`bq-nav__menu-toggle ${menuOpen ? "is-open" : ""}`}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        data-cursor="open"
        data-cursor-text="MENU"
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Drawer Overlay for Mobile & Expanded Navigation */}
      <div className={`bq-nav__menu ${menuOpen ? "is-open" : ""}`}>
        <div className="bq-nav__menu-index">PAVAN KUMAR VERMA / 2026</div>
        <button type="button" onClick={() => navigateToZone("entrance", "hero")}>
          Home <span>01</span>
        </button>
        <button type="button" onClick={() => navigateToZone("living", "about")}>
          About Me <span>02</span>
        </button>
        <button type="button" onClick={() => navigateToZone("devroom", "skills")}>
          Developer Skills <span>03</span>
        </button>
        <button type="button" onClick={() => navigateToZone("ailab", "work")}>
          AI &amp; Vision Lab <span>04</span>
        </button>
        <button type="button" onClick={() => navigateToZone("gallery", "work")}>
          Project Gallery <span>05</span>
        </button>
        <button type="button" onClick={() => navigateToZone("library", "experience")}>
          Journey &amp; Certs <span>06</span>
        </button>
        <button type="button" onClick={() => navigateToZone("contact", "contact")}>
          Contact Studio <span>07</span>
        </button>
      </div>
    </header>
  );
}
