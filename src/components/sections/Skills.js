import React from "react";
import { motion } from "framer-motion";
import { TECH_SKILLS } from "../../data/portfolioData";
import { Cpu, Terminal, Layout, Wrench } from "lucide-react";

export default function Skills() {
  const getCategoryIcon = (category) => {
    if (category.toLowerCase().includes("ai") || category.toLowerCase().includes("machine")) return Cpu;
    if (category.toLowerCase().includes("data") || category.toLowerCase().includes("analytics")) return Terminal;
    if (category.toLowerCase().includes("full-stack") || category.toLowerCase().includes("web")) return Layout;
    return Wrench;
  };

  return (
    <section id="skills" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">05 /</span>
          <span className="bq-chapter__label">Capabilities & Technical Matrix</span>
          <h2 className="bq-chapter__title">
            Tools of the <em>trade</em>.
          </h2>
          <p className="bq-chapter__subtitle">
            A comprehensive overview of programming languages, machine learning frameworks, data ecosystems, and modern software architectures.
          </p>
        </div>

        <div className="bq-skills__grid">
          {TECH_SKILLS.map((cat, idx) => {
            const Icon = getCategoryIcon(cat.category);
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
                  <span className="bq-skills__cat-label">{cat.category}</span>
                </div>

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
