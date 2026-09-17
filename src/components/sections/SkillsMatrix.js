import React from "react";
import { motion } from "framer-motion";
import { playHoverTick } from "../ui/SoundFX";
import { SKILL_CATEGORIES } from "../../data/portfolioData";
import { Cpu, Database, Code, Flame } from "lucide-react";

export default function SkillsMatrix() {
  const categoryIcons = [
    <Cpu size={20} className="cat-icon" key="cpu" />,
    <Database size={20} className="cat-icon" key="db" />,
    <Code size={20} className="cat-icon" key="code" />,
  ];

  return (
    <section id="skills" className="section-container skills-section">
      <div className="section-shell">
        {/* Section Telemetry Tag */}
        <div className="section-kicker-bar">
          <span className="section-index">{"// 04"}</span>
          <span className="section-name">TECHNICAL ARSENAL &amp; CAPABILITIES</span>
        </div>

        <div className="skills-heading-row">
          <div>
            <h2 className="section-title">
              Computational toolkit.<br />
              <span className="gradient-highlight">Full-stack depth.</span>
            </h2>
            <p className="section-subtitle">
              Mastering the modern spectrum from low-level mathematical modeling to reactive browser interfaces.
            </p>
          </div>

          <div className="skills-badge-box">
            <Flame size={16} className="flame-icon" />
            <span>CONTINUOUS EXPERIMENTATION</span>
          </div>
        </div>

        {/* 3 Columns Matrix */}
        <div className="skills-category-grid">
          {SKILL_CATEGORIES.map((category, catIdx) => (
            <motion.div
              key={category.title}
              className="skill-card-block"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: catIdx * 0.15 }}
            >
              <div className="skill-card-head">
                {categoryIcons[catIdx % categoryIcons.length]}
                <h3 className="skill-cat-title">{category.title}</h3>
              </div>

              <div className="skills-meter-list">
                {category.skills.map((s, idx) => (
                  <div
                    key={s.name}
                    className="skill-meter-item"
                    onMouseEnter={playHoverTick}
                  >
                    <div className="meter-info-row">
                      <span className="skill-meter-name">{s.name}</span>
                      <span className="skill-meter-percent">{s.level}%</span>
                    </div>

                    <div className="meter-track">
                      <motion.div
                        className="meter-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + idx * 0.08, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Architecture Badges */}
        <div className="architecture-tags-row">
          {[
            "Deep Neural Networks",
            "Computer Vision & OpenCV",
            "FastAPI REST Architecture",
            "React State & Hooks",
            "MySQL Normalization",
            "Three.js Shaders",
            "Pandas & NumPy Vectorization",
            "Transfer Learning & YOLO",
            "Power BI Visual Intelligence",
          ].map((tag, idx) => (
            <div key={idx} className="arch-chip">
              <span className="chip-bullet">✦</span>
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
