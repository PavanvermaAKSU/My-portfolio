import React from "react";
import { motion } from "framer-motion";
import { INTERNSHIPS } from "../../data/portfolioData";
import { Building2, Calendar, MapPin, CheckCircle } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">03 /</span>
          <span className="bq-chapter__label">Experience & Internships</span>
          <h2 className="bq-chapter__title">
            Where I've <em>delivered</em>.
          </h2>
          <p className="bq-chapter__subtitle">
            Hands-on technical roles across artificial intelligence, enterprise software engineering, and data analytics.
          </p>
        </div>

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
      </div>
    </section>
  );
}
