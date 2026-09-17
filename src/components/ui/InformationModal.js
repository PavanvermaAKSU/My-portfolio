import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  CERTIFICATIONS,
  INTERNSHIPS,
  METRICS,
  PERSONAL_INFO,
  TECH_SKILLS,
} from "../../data/portfolioData";

const contentById = {
  about: {
    eyebrow: "Profile",
    title: "About Pavan",
    description: PERSONAL_INFO.summary,
  },
  certifications: {
    eyebrow: "Recognition",
    title: "Certifications",
    items: CERTIFICATIONS.map((item) => `${item.title} — ${item.issuer}`),
  },
  achievements: {
    eyebrow: "Impact",
    title: "Achievements",
    items: METRICS.map((item) => `${item.value} ${item.label}: ${item.detail}`),
  },
  education: {
    eyebrow: "Foundation",
    title: "Education",
    items: PERSONAL_INFO.education.map((item) => `${item.degree} — ${item.institution} (${item.duration})`),
  },
  skills: {
    eyebrow: "Toolkit",
    title: "Capabilities",
    items: TECH_SKILLS.map((item) => `${item.category}: ${item.skills.join(", ")}`),
  },
  experience: {
    eyebrow: "Practice",
    title: "Experience",
    items: INTERNSHIPS.map((item) => `${item.role} at ${item.company} — ${item.period}`),
  },
  contact: {
    eyebrow: "Open channel",
    title: "Get in touch",
    description: "Have a meaningful AI, data, or product problem? Connect with Pavan and start a conversation.",
    items: [
      `Email: ${PERSONAL_INFO.email}`,
      "GitHub: PavanvermaAKSU",
      "LinkedIn: pavan-kumar-verma",
      "Location: Satna, India",
    ],
  },
};

export default function InformationModal({ frame, onClose }) {
  useEffect(() => {
    if (!frame) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame, onClose]);

  const content = frame ? contentById[frame.id] : null;
  if (!content) return null;

  return (
    <AnimatePresence>
      <div className="bq-information-backdrop" onClick={onClose}>
        <motion.div
          className="bq-information-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="information-modal-title"
          onClick={(event) => event.stopPropagation()}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
        >
          <div className="bq-information-modal__topline">
            <span>{content.eyebrow}</span>
            <button type="button" onClick={onClose} aria-label="Close information panel" data-cursor="open" data-cursor-text="CLOSE">
              <X size={17} />
            </button>
          </div>
          <h2 id="information-modal-title">{content.title}</h2>
          {content.description && <p>{content.description}</p>}
          {content.items && (
            <ul>
              {content.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
