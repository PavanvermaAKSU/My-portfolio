import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Terminal,
  Layers,
  GitBranch,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import soundFX from "./SoundFX";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        soundFX.playClick();
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const handleCloseClick = () => {
    soundFX.playClick();
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="bq-modal-backdrop" onClick={handleCloseClick}>
        <motion.div
          className="bq-modal bq-modal--spotlight"
          style={{ "--project-accent": project.accent || "#00f0ff" }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          {/* Top Bar with 'Back to Studio' and Close button */}
          <div className="bq-modal__top-bar">
            <button
              type="button"
              className="bq-modal__back-btn"
              onClick={handleCloseClick}
              data-cursor="open"
              data-cursor-text="RETURN"
              aria-label="Back to 3D Studio"
            >
              <ArrowLeft size={16} />
              <span>Back to Studio</span>
            </button>

            <div className="bq-modal__signal">
              <span className="bq-modal__signal-dot" />
              <span>SPATIAL INSPECTION MODE</span>
            </div>

            <button
              type="button"
              className="bq-modal__close-btn"
              onClick={handleCloseClick}
              data-cursor="open"
              data-cursor-text="CLOSE"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Hero Header */}
          <div className="bq-modal__header">
            <div className="bq-modal__cat-row">
              <span className="bq-modal__num">PROJECT {project.number || "01"}</span>
              <span className="bq-modal__cat">{project.category || "AI & Engineering"}</span>
            </div>
            <h2 id="project-modal-title" className="bq-modal__title">
              {project.title}
            </h2>
            {project.roomLabel && (
              <div className="bq-modal__room-tag">
                <Layers size={13} />
                <span>3D Representation: {project.roomLabel}</span>
              </div>
            )}
          </div>

          {/* Tagline & Core Description */}
          {project.tagline && (
            <div className="bq-modal__tagline">{project.tagline}</div>
          )}
          <p className="bq-modal__desc">{project.description}</p>

          {/* Special Visual Block for YOLO Classes if present */}
          {project.classes && (
            <div className="bq-modal__section">
              <span className="bq-modal__section-label">
                <Terminal size={14} /> Computer Vision Target Classes
              </span>
              <div className="bq-modal__classes-row">
                {project.classes.map((clsName, i) => (
                  <div key={i} className="bq-modal__class-badge">
                    <span
                      className="bq-class-dot"
                      style={{
                        background:
                          clsName === "with_mask"
                            ? "#10b981"
                            : clsName === "without_mask"
                            ? "#e11d48"
                            : "#f59e0b",
                      }}
                    />
                    <code>{clsName}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Pipeline Flow for Jansetu AI / Civic Intelligence */}
          {project.pipeline && (
            <div className="bq-modal__section">
              <span className="bq-modal__section-label">
                <GitBranch size={14} /> End-to-End Civic Intelligence Pipeline
              </span>
              <div className="bq-modal__pipeline-flow">
                {project.pipeline.map((step, idx) => (
                  <div key={idx} className="bq-modal__pipe-node">
                    <span className="bq-pipe-idx">{idx + 1}</span>
                    <span className="bq-pipe-label">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance & Technical Metrics */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="bq-modal__section">
              <span className="bq-modal__section-label">
                <Sparkles size={14} /> Performance &amp; Operational Metrics
              </span>
              <div className="bq-modal__metrics-grid">
                {Object.entries(project.metrics).map(([key, val], idx) => (
                  <div key={idx} className="bq-modal__metric-card">
                    <span className="bq-modal__metric-k">
                      {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                    </span>
                    <span className="bq-modal__metric-v">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Features */}
          {project.features && project.features.length > 0 && (
            <div className="bq-modal__section">
              <span className="bq-modal__section-label">
                Architecture &amp; Key Deliverables
              </span>
              <ul className="bq-modal__features-list">
                {project.features.map((feat, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} className="bq-modal__check-icon" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Badges */}
          <div className="bq-modal__section">
            <span className="bq-modal__section-label">Engineered With</span>
            <div className="bq-modal__tech-chips">
              {project.tech?.map((t, i) => (
                <span key={i} className="bq-modal__tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="bq-modal__footer">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="bq-modal__btn-primary"
                data-cursor="open"
                data-cursor-text="CODE"
              >
                <FaGithub size={18} />
                <span>View GitHub Source</span>
              </a>
            )}
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noreferrer"
                className="bq-modal__btn-secondary"
                data-cursor="open"
                data-cursor-text="LIVE"
              >
                <ExternalLink size={18} />
                <span>Live Interactive Demo</span>
              </a>
            )}
            <button
              type="button"
              className="bq-modal__btn-return"
              onClick={handleCloseClick}
              data-cursor="open"
              data-cursor-text="STUDIO"
            >
              Back to Studio World
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
