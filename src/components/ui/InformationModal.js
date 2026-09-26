import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft } from "lucide-react";
import {
  CERTIFICATIONS,
  INTERNSHIPS,
  METRICS,
  PERSONAL_INFO,
  TECH_SKILLS,
  JOURNEY_STAGES,
} from "../../data/portfolioData";
import soundFX from "./SoundFX";

const skillCategories = Array.isArray(TECH_SKILLS)
  ? TECH_SKILLS
  : Object.values(TECH_SKILLS);

const contentById = {
  about: {
    eyebrow: "IDENTITY // PROFILE",
    title: "About Pavan Kumar Verma",
    description: PERSONAL_INFO.summary,
    items: [
      `Degree: ${PERSONAL_INFO.degree}`,
      `Institution: ${PERSONAL_INFO.institution}`,
      `Graduation: ${PERSONAL_INFO.expectedGraduation}`,
      `Primary Programming Strength: ${PERSONAL_INFO.primaryStrength}`,
      `Location: ${PERSONAL_INFO.location}`,
    ],
  },
  certifications: {
    eyebrow: "VERIFIED CREDENTIALS",
    title: "Industry & Cloud Certifications",
    items: CERTIFICATIONS.map((item) => `${item.title} — ${item.issuer} (${item.date})`),
  },
  achievements: {
    eyebrow: "MEASURED IMPACT",
    title: "Key Highlights & Practice",
    items: METRICS.map((item) => `${item.value} ${item.label}: ${item.detail}`),
  },
  education: {
    eyebrow: "ACADEMIC FOUNDATION",
    title: "Academic Background",
    items: PERSONAL_INFO.education.map(
      (item) => `${item.degree} — ${item.institution} [${item.duration}]`
    ),
  },
  skills: {
    eyebrow: "TECHNICAL TOOLKIT",
    title: "Core Capabilities & Frameworks",
    items: skillCategories.map(
      (cat) => `${cat.title || cat.category}: ${cat.skills.join(", ")}`
    ),
  },
  experience: {
    eyebrow: "PRACTICE & INTERNSHIPS",
    title: "Industry Internships",
    items: INTERNSHIPS.map(
      (item) => `${item.role} at ${item.company} (${item.period}) — ${item.status}`
    ),
  },
  journey: {
    eyebrow: "LEARNING TIMELINE",
    title: "Engineering Journey & Milestones",
    items: JOURNEY_STAGES.map(
      (st) => `${st.step} — ${st.title}: ${st.focus}`
    ),
  },
  contact: {
    eyebrow: "DIRECT COMMUNICATION",
    title: "Let's Build Something Intelligent",
    description:
      "Have a meaningful AI problem, a data pipeline to engineer, or an industry engineering role? Connect with Pavan.",
    items: [
      `Email: ${PERSONAL_INFO.email}`,
      `GitHub: ${PERSONAL_INFO.github}`,
      `LinkedIn: ${PERSONAL_INFO.linkedin}`,
      `Location: ${PERSONAL_INFO.location}`,
    ],
  },
};

export default function InformationModal({ frame, onClose }) {
  useEffect(() => {
    if (!frame) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        soundFX.playClick();
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame, onClose]);

  const handleClose = () => {
    soundFX.playClick();
    onClose();
  };

  const frameId = frame?.id || frame?.type || "about";
  const content = contentById[frameId] || {
    eyebrow: "STUDIO INSPECTION",
    title: frame?.data?.title || frame?.title || "Studio Inspection",
    description: frame?.data?.description || frame?.description || "",
    items: frame?.data?.items || [],
  };

  if (!frame) return null;

  return (
    <AnimatePresence>
      <div className="bq-information-backdrop" onClick={handleClose}>
        <motion.div
          className="bq-information-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="information-modal-title"
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="bq-information-modal__topline">
            <span>{content.eyebrow}</span>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close information panel"
              data-cursor="open"
              data-cursor-text="CLOSE"
            >
              <X size={17} />
            </button>
          </div>
          <h2 id="information-modal-title">{content.title}</h2>
          {content.description && <p>{content.description}</p>}
          {content.items && content.items.length > 0 && (
            <ul className="bq-information-modal__list">
              {content.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          <div className="bq-information-modal__footer">
            <button
              type="button"
              className="bq-information-modal__back-btn"
              onClick={handleClose}
              data-cursor="open"
              data-cursor-text="RETURN"
            >
              <ArrowLeft size={14} />
              <span>Return to 3D World</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
