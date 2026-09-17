import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { playHoverTick, playClick } from "./SoundFX";
import { ChevronRight, Cpu } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

export default function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [flarePos, setFlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rY = ((x - centerX) / centerX) * 8;
    const rX = -((y - centerY) / centerY) * 8;

    setRotX(rX);
    setRotY(rY);
    setFlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotX(0);
    setRotY(0);
    setFlarePos({ x: 50, y: 50 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`project-card tone-${project.tone}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={playHoverTick}
      onClick={() => {
        playClick();
        onSelect(project);
      }}
      data-cursor="EXPAND"
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1, 1, 1)`,
        transition: rotX === 0 ? "transform 0.5s ease-out" : "none",
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Dynamic Cursor Spotlight Flare */}
      <div
        className="card-spotlight"
        style={{
          background: `radial-gradient(400px circle at ${flarePos.x}% ${flarePos.y}%, rgba(255,255,255,0.08), transparent 80%)`,
        }}
      />

      {/* Top Telemetry Header */}
      <div className="card-top-bar">
        <div className="card-index-box">
          <span className="card-idx-num">{project.number}</span>
          <span className="card-category">{project.category}</span>
        </div>
        <div className="card-status-pill">
          <span className="pill-dot" style={{ backgroundColor: project.accent }} />
          <span>PRODUCTION READY</span>
        </div>
      </div>

      {/* Hero Visual Mockup Box */}
      <div className="card-visual-frame">
        <div className="visual-grid-bg" />
        <div className="visual-code-watermark">
          <span>ARCH // {project.tone.toUpperCase()}</span>
        </div>
        <div className="visual-accent-glow" style={{ background: `radial-gradient(circle, ${project.accent}33 0%, transparent 70%)` }} />
        <div className="visual-center-emblem">
          <Cpu size={32} style={{ color: project.accent }} />
        </div>
      </div>

      {/* Content */}
      <div className="card-body">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-tagline">{project.tagline}</p>

        {/* Metrics Pill Grid */}
        <div className="card-metrics-grid">
          {Object.entries(project.metrics).map(([k, v]) => (
            <div key={k} className="metric-chip">
              <span className="chip-value">{v}</span>
            </div>
          ))}
        </div>

        {/* Tech Badges */}
        <div className="card-tech-wrap">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="card-footer-actions">
        <button
          className="dossier-btn"
          onClick={(e) => {
            e.stopPropagation();
            playClick();
            onSelect(project);
          }}
        >
          <span>SYSTEM DOSSIER</span>
          <ChevronRight size={14} />
        </button>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card-github-link"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={playHoverTick}
            title="View Source on GitHub"
            aria-label="GitHub Repository"
          >
            <FaGithub size={16} />
          </a>
        )}
      </div>
    </motion.div>
  );
}
