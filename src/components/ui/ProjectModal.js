import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
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

  return (
    <AnimatePresence>
      <div className="bq-modal-backdrop" onClick={onClose}>
        <motion.div
          className="bq-modal bq-modal--spotlight"
          style={{ "--project-accent": project.accent || "#ff5c35" }}
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Modal Header */}
          <div className="bq-modal__header">
            <div>
              <div className="bq-modal__cat-row">
                <span className="bq-modal__num">{project.number || "PROJ"}</span>
                <span className="bq-modal__cat">{project.category || "AI & Engineering"}</span>
              </div>
              <h2 className="bq-modal__title">{project.title}</h2>
              <div className="bq-modal__signal">
                <span />
                <span>Project signal locked</span>
              </div>
            </div>
            <button
              className="bq-modal__close-btn"
              onClick={onClose}
              data-cursor="open"
              data-cursor-text="CLOSE"
              aria-label="Close project modal"
            >
              <X size={18} />
              <span>Close</span>
            </button>
          </div>

          {/* Tagline & Description */}
          {project.tagline && <div className="bq-modal__tagline">{project.tagline}</div>}
          <p className="bq-modal__desc">{project.description}</p>

          {/* Performance Metrics */}
          {project.metrics && Object.keys(project.metrics).length > 0 && (
            <div className="bq-modal__section">
              <span className="bq-modal__section-label">
                <Sparkles size={14} /> Performance & Technical Metrics
              </span>
              <div className="bq-modal__metrics-grid">
                {Object.entries(project.metrics).map(([key, val], idx) => (
                  <div key={idx} className="bq-modal__metric-card">
                    <span className="bq-modal__metric-k">{key.replace(/([A-Z])/g, " $1").toUpperCase()}</span>
                    <span className="bq-modal__metric-v">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="bq-modal__section">
              <span className="bq-modal__section-label">Architecture & Deliverables</span>
              <ul className="bq-modal__features-list">
                {project.features.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} className="bq-modal__check-icon" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
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

          {/* Footer Actions */}
          <div className="bq-modal__footer">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="bq-modal__btn-primary"
                data-cursor="open"
                data-cursor-text="GITHUB"
              >
                <FaGithub size={18} />
                <span>View GitHub Repository</span>
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
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
