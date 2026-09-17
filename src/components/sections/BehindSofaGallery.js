import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CERTIFICATIONS,
  METRICS,
  INTERNSHIPS,
  PROJECTS,
  SERVICES,
} from "../../data/portfolioData";
import {
  Award,
  Trophy,
  Briefcase,
  Layers,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function BehindSofaGallery({ onSelectProject }) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "Gallery All", icon: Sparkles },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Layers },
    { id: "services", label: "Services", icon: ShieldCheck },
  ];

  return (
    <section id="showcase" className="bq-chapter bq-behind-sofa-section">
      <div className="bq-chapter__shell">
        {/* Chapter Header */}
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">01 /</span>
          <span className="bq-chapter__label">The Behind-The-Sofa 3D Exhibition</span>
          <h2 className="bq-chapter__title">
            Profile <em>Exhibition</em>.
          </h2>
          <p className="bq-behind-sofa__kicker">
            Interactive credentials, achievements, industry experience, and production AI projects
            curated in spatial perspective.
          </p>
        </div>

        {/* Gallery Navigation Tabs */}
        <div className="bq-gallery-tabs" role="tablist">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                className={`bq-gallery-tab ${isActive ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                data-cursor="open"
                data-cursor-text={tab.label.toUpperCase()}
              >
                <Icon size={14} className="bq-gallery-tab__icon" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="bq-gallery-grid">
          <AnimatePresence mode="popLayout">
            {/* 1. CERTIFICATIONS */}
            {(activeTab === "all" || activeTab === "certifications") && (
              <motion.div
                key="certifications-group"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="bq-gallery-group"
              >
                <div className="bq-group-badge">
                  <Award size={16} /> Certifications & Verified Credentials
                </div>
                <div className="bq-cards-row">
                  {CERTIFICATIONS.map((cert, idx) => (
                    <div
                      key={idx}
                      className="bq-gallery-card bq-card-cert"
                      data-cursor="view"
                      data-cursor-text="VERIFIED"
                    >
                      <div className="bq-card-top">
                        <span className="bq-card-tag">{cert.tag || "AI Credential"}</span>
                        <div className="bq-cert-verified">
                          <CheckCircle2 size={13} className="text-emerald-400" />
                          <span>{cert.date || "Verified"}</span>
                        </div>
                      </div>
                      <h3 className="bq-card-title">{cert.title}</h3>
                      <div className="bq-card-issuer">Issuer: {cert.issuer}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. ACHIEVEMENTS & METRICS */}
            {(activeTab === "all" || activeTab === "achievements") && (
              <motion.div
                key="achievements-group"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="bq-gallery-group"
              >
                <div className="bq-group-badge">
                  <Trophy size={16} /> Key Achievements & Metrics
                </div>
                <div className="bq-cards-row bq-cards-grid-4">
                  {METRICS.map((metric, idx) => (
                    <div
                      key={idx}
                      className="bq-gallery-card bq-card-achievement"
                      data-cursor="view"
                      data-cursor-text="STATS"
                    >
                      <div className="bq-metric-val">{metric.value}</div>
                      <div className="bq-metric-label">{metric.label}</div>
                      <div className="bq-metric-detail">{metric.detail}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 3. EXPERIENCE / INTERNSHIPS */}
            {(activeTab === "all" || activeTab === "experience") && (
              <motion.div
                key="experience-group"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="bq-gallery-group"
              >
                <div className="bq-group-badge">
                  <Briefcase size={16} /> Industry Experience & Roles
                </div>
                <div className="bq-cards-row">
                  {INTERNSHIPS.map((exp, idx) => (
                    <div
                      key={idx}
                      className="bq-gallery-card bq-card-exp"
                      data-cursor="open"
                      data-cursor-text="ROLE"
                    >
                      <div className="bq-card-top">
                        <span className="bq-card-period">{exp.period || exp.duration}</span>
                        <span className="bq-card-pill">{exp.status || "Internship"}</span>
                      </div>
                      <h3 className="bq-card-title">{exp.role}</h3>
                      <div className="bq-card-company">{exp.company}</div>
                      <p className="bq-card-desc">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 4. FEATURED PROJECTS */}
            {(activeTab === "all" || activeTab === "projects") && (
              <motion.div
                key="projects-group"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="bq-gallery-group"
              >
                <div className="bq-group-badge">
                  <Layers size={16} /> Production AI & Full-Stack Projects
                </div>
                <div className="bq-cards-row">
                  {PROJECTS.map((proj, idx) => (
                    <div
                      key={proj.id || idx}
                      className="bq-gallery-card bq-card-project"
                      onClick={() => onSelectProject && onSelectProject(proj)}
                      data-cursor="view"
                      data-cursor-text="EXPLORE"
                    >
                      <div className="bq-card-top">
                        <span className="bq-card-number">{proj.number || `0${idx + 1}`}</span>
                        <span className="bq-card-tag">{proj.category}</span>
                      </div>
                      <h3 className="bq-card-title">{proj.title}</h3>
                      <p className="bq-card-tagline">{proj.tagline || proj.description}</p>
                      
                      <div className="bq-card-tech-chips">
                        {proj.tech?.slice(0, 4).map((t, i) => (
                          <span key={i} className="bq-tech-chip">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="bq-card-footer-cta">
                        <span>Deep Dive Specs</span>
                        <ArrowUpRight size={18} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 5. SERVICES */}
            {(activeTab === "all" || activeTab === "services") && (
              <motion.div
                key="services-group"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45 }}
                className="bq-gallery-group"
              >
                <div className="bq-group-badge">
                  <ShieldCheck size={16} /> Core Technical Services
                </div>
                <div className="bq-cards-row">
                  {SERVICES.map((srv, idx) => (
                    <div
                      key={idx}
                      className="bq-gallery-card bq-card-service"
                      data-cursor="open"
                      data-cursor-text="SERVICE"
                    >
                      <div className="bq-card-number">{srv.number}</div>
                      <h3 className="bq-card-title">{srv.title}</h3>
                      <p className="bq-card-desc">{srv.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
