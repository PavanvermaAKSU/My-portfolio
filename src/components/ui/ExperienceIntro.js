import React, { useEffect, useState, useRef, useCallback } from "react";
import soundFX from "./SoundFX";

const TYPING_PHRASES = [
  "AI ENGINEER IN THE MAKING.",
  "BUILDING INTELLIGENT SYSTEMS.",
  "PYTHON. FASTAPI. YOLO. REACT.",
];

const METRICS = [
  { value: "6+", label: "AI / Web Projects" },
  { value: "5", label: "Internships" },
  { value: "3+", label: "Certifications" },
  { value: "2027", label: "Graduation" },
];

export default function ExperienceIntro({ onEnter }) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // Loading progress
  useEffect(() => {
    const startedAt = Date.now();
    const duration = 2400;
    let frameId;
    const update = () => {
      const elapsed = Date.now() - startedAt;
      const next = Math.min((elapsed / duration) * 100, 100);
      setProgress(next);
      if (next < 100) {
        frameId = requestAnimationFrame(update);
      } else {
        setIsReady(true);
      }
    };
    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const phrase = TYPING_PHRASES[phraseIdx];
    const speed = isDeleting ? 38 : 65;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIdx < phrase.length) {
          setTypedText(phrase.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        if (charIdx > 0) {
          setTypedText(phrase.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        } else {
          setIsDeleting(false);
          setPhraseIdx((p) => (p + 1) % TYPING_PHRASES.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  // Periodic glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 160);
    }, 4200);
    return () => clearInterval(glitchInterval);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== "function") return undefined;

    let ctx;
    try {
      ctx = canvas.getContext("2d");
    } catch {
      return undefined;
    }

    if (!ctx) return undefined;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.48 + 0.08,
      color: Math.random() > 0.7 ? "#00f0ff" : Math.random() > 0.5 ? "#e11d48" : "#ffffff",
    }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const handleEnterClick = useCallback(() => {
    soundFX.playClick();
    onEnter();
  }, [onEnter]);

  return (
    <div
      className="experience-intro"
      role="dialog"
      aria-modal="true"
      aria-label="Enter Pavan Kumar Verma 3D Studio"
    >
      <canvas ref={canvasRef} className="experience-intro__particles" aria-hidden="true" />
      <div className="experience-intro__backdrop-glow" />
      <div className="experience-intro__backdrop-glow experience-intro__backdrop-glow--blue" />
      <div className="experience-intro__scanlines" aria-hidden="true" />

      <div className="experience-intro__topline">
        <div className="experience-intro__badge">
          <span className="experience-intro__pulse-dot" />
          <span>AI / ML / FULL-STACK STUDIO</span>
        </div>
        <div className="experience-intro__topline-right">
          <span className="experience-intro__system-id">SYS:// PKV-STUDIO-2026</span>
          <span className="experience-intro__year">PKV — 2026</span>
        </div>
      </div>

      <div className="experience-intro__centerpiece">
        <p className={`experience-intro__kicker ${glitchActive ? "is-glitching" : ""}`}>
          {typedText}
          <span className="experience-intro__cursor" aria-hidden="true">|</span>
        </p>

        <h1 className="experience-intro__name" aria-label="Pavan Kumar Verma">
          {"PAVAN".split("").map((ch, i) => (
            <span key={i} className="experience-intro__name-char" style={{ animationDelay: `${i * 0.07}s` }}>
              {ch}
            </span>
          ))}
          <br />
          {"KUMAR VERMA".split("").map((ch, i) => (
            <span
              key={i}
              className="experience-intro__name-char"
              style={{ animationDelay: `${(i + 5) * 0.07}s` }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>

        <p className="experience-intro__tagline">
          &ldquo;I BUILD INTELLIGENT SYSTEMS.&rdquo;
        </p>
        <p className="experience-intro__welcome">Welcome to my interactive digital workspace.</p>

        <div className="experience-intro__metrics" role="list">
          {METRICS.map((m, i) => (
            <div key={i} className="experience-intro__metric" style={{ animationDelay: `${0.5 + i * 0.1}s` }} role="listitem">
              <span className="experience-intro__metric-val">{m.value}</span>
              <span className="experience-intro__metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="experience-intro__bottom">
        <div className="experience-intro__meter">
          <div className="experience-intro__bar-track">
            <div className="experience-intro__bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="experience-intro__status-row">
            <span className="experience-intro__status-text">
              {progress < 100 ? "INITIALIZING 3D ENVIRONMENT..." : "SPATIAL STUDIO READY ✓"}
            </span>
            <span className="experience-intro__counter">
              {Math.round(progress).toString().padStart(2, "0")}%
            </span>
          </div>
        </div>

        <button
          type="button"
          className={`experience-intro__enter-btn ${isReady ? "is-ready" : ""}`}
          onClick={handleEnterClick}
          data-cursor="open"
          data-cursor-text="ENTER"
          aria-label="Enter 3D Digital House"
        >
          <span>{progress < 100 ? "PREPARING STUDIO" : "ENTER DIGITAL HOUSE"}</span>
          <span className="experience-intro__arrow" aria-hidden="true">↘</span>
        </button>
      </div>

      <div className="experience-intro__hint">
        <span>INTERACTIVE 3D ENVIRONMENT &bull; MOUSE &amp; SCROLL DRIVEN &bull; DRAG TO ORBIT</span>
      </div>
    </div>
  );
}
