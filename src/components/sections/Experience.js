import React, { useState } from "react";
import { motion } from "framer-motion";
import { INTERNSHIPS, JOURNEY_STAGES } from "../../data/portfolioData";
import { Building2, Calendar, MapPin, CheckCircle, GitCommit, Sparkles } from "lucide-react";

export default function Experience() {
  const [activeView, setActiveView] = useState("timeline"); // "timeline" or "internships"

  return (
    <section id="experience" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">03 /</span>
          <span className="bq-chapter__label">Journey &amp; Industry Experience</span>
          <h2 className="bq-chapter__title">
            The path of <em>progression</em>.
          </h2>
          <p className="bq-chapter__subtitle">
            A chronological timeline of disciplined engineering: from foundational theory to applied machine learning and commercial production.
          </p>
        </div>

        {/* View Toggle */}
        <div className="bq-filter" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "timeline"}
            className={`bq-filter__btn ${activeView === "timeline" ? "active" : ""}`}
            onClick={() => setActiveView("timeline")}
            data-cursor="open"
            data-cursor-text="JOURNEY"
          >
            <GitCommit size={14} style={{ display: "inline", marginRight: 6 }} />
            Learning &amp; Growth Path
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "internships"}
            className={`bq-filter__btn ${activeView === "internships" ? "active" : ""}`}
            onClick={() => setActiveView("internships")}
            data-cursor="open"
            data-cursor-text="INTERNS"
          >
            <Building2 size={14} style={{ display: "inline", marginRight: 6 }} />
            Verified Industry Internships ({INTERNSHIPS.length})
          </button>
        </div>

        {/* View 1: Journey Progression Stages */}
        {activeView === "timeline" && (
          <div className="bq-journey__timeline">
            {JOURNEY_STAGES.map((stage, idx) => (
              <motion.div
                key={idx}
                className="bq-journey__step"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                data-cursor="open"
                data-cursor-text={`STAGE ${stage.step}`}
              >
                <div className="bq-journey__step-num">{stage.step}</div>
                <div className="bq-journey__step-body">
                  <h3 className="bq-journey__step-title">{stage.title}</h3>
                  <div className="bq-journey__step-focus">{stage.focus}</div>
                  <p className="bq-journey__step-detail">{stage.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View 2: Authentic Internships List */}
        {activeView === "internships" && (
          <div className="bq-exp__list">
            {INTERNSHIPS.map((exp, idx) => (
              <motion.div
                key={idx}
                className="bq-exp__item"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                data-cursor="open"
                data-cursor-text="ROLE"
              >
                <div className="bq-exp__meta">
                  <span className="bq-exp__period">
                    <Calendar size={13} style={{ display: "inline", marginRight: 6 }} />
                    {exp.period}
                  </span>
                  <span className="bq-exp__duration">{exp.duration}</span>
                  {exp.location && (
                    <span className="bq-exp__location">
                      <MapPin size={12} style={{ display: "inline", marginRight: 4 }} />
                      {exp.location}
                    </span>
                  )}
                  <span className="bq-exp__status-tag">{exp.status}</span>
                </div>

                <div className="bq-exp__body">
                  <div className="bq-exp__company-row">
                    <Building2 size={18} className="bq-exp__icon" />
                    <h3 className="bq-exp__company">{exp.company}</h3>
                  </div>
                  <div className="bq-exp__role">{exp.role}</div>
                  <p className="bq-exp__desc">{exp.description}</p>

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="bq-exp__bullets">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>
                          <CheckCircle size={14} className="bq-exp__bullet-icon" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
