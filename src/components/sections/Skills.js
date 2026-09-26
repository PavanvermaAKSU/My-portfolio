import React from "react";
import { motion } from "framer-motion";
import { TECH_SKILLS } from "../../data/portfolioData";
import { Cpu, Terminal, Layout, Wrench } from "lucide-react";

export default function Skills() {
  const getCategoryIcon = (label = "") => {
    const text = label.toLowerCase();
    if (text.includes("ai") || text.includes("machine") || text.includes("vision")) return Cpu;
    if (text.includes("data") || text.includes("analytics") || text.includes("tools")) return Terminal;
    if (text.includes("full-stack") || text.includes("core") || text.includes("web")) return Layout;
    return Wrench;
  };

  const skillsList = Array.isArray(TECH_SKILLS)
    ? TECH_SKILLS
    : Object.values(TECH_SKILLS);

  return (
    <section id="skills" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">05 /</span>
          <span className="bq-chapter__label">Capabilities &amp; Technical Matrix</span>
          <h2 className="bq-chapter__title">
            Tools of the <em>trade</em>.
          </h2>
          <p className="bq-chapter__subtitle">
            A comprehensive overview of programming languages, machine learning frameworks, computer vision pipelines, and modern software architectures.
          </p>
        </div>

        <div className="bq-skills__grid">
          {skillsList.map((cat, idx) => {
            const categoryName = cat.title || cat.category || "Engineering";
            const Icon = getCategoryIcon(categoryName);
            return (
              <motion.div
                key={idx}
                className="bq-skills__cat"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                data-cursor="open"
                data-cursor-text="SKILLS"
              >
                <div className="bq-skills__cat-header">
                  <Icon size={18} className="bq-skills__cat-icon" />
                  <span className="bq-skills__cat-label">{categoryName}</span>
                </div>
                {cat.description && (
                  <p className="bq-skills__cat-desc">{cat.description}</p>
                )}

                <div className="bq-skills__tags">
                  {cat.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bq-skills__tag"
                      data-cursor="view"
                      data-cursor-text={skill.toUpperCase()}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
