import React, { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "../../data/portfolioData";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState("All");

  const filterOptions = ["All", "Machine Learning", "Computer Vision", "Full-Stack", "Data Science"];

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "All") return true;
    if (filter === "Machine Learning") return p.category?.toLowerCase().includes("machine learning") || p.tech?.includes("Machine Learning");
    if (filter === "Computer Vision") return p.category?.toLowerCase().includes("computer vision") || p.tech?.includes("YOLO");
    if (filter === "Full-Stack") return p.category?.toLowerCase().includes("full-stack") || p.tech?.includes("React.js");
    if (filter === "Data Science") return p.category?.toLowerCase().includes("data") || p.tech?.includes("Data Analysis");
    return true;
  });

  return (
    <section id="work" className="bq-chapter">
      <div className="bq-chapter__shell">
        <div className="bq-chapter__header">
          <span className="bq-chapter__num">04 /</span>
          <span className="bq-chapter__label">Selected Work</span>
          <h2 className="bq-chapter__title">
            Things I've <em>built</em>.
          </h2>
          <p className="bq-chapter__subtitle">
            Engineered models, algorithms, and applications designed for performance, precision, and utility.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="bq-filter" role="tablist">
          {filterOptions.map((opt, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={filter === opt}
              className={`bq-filter__btn ${filter === opt ? "active" : ""}`}
              onClick={() => setFilter(opt)}
              data-cursor="open"
              data-cursor-text={opt.toUpperCase()}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="bq-projects__list">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              className="bq-project-chapter"
              onClick={() => onSelectProject && onSelectProject(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="view"
              data-cursor-text="OPEN"
            >
              <div className="bq-project-chapter__num">
                {project.number || (idx + 1).toString().padStart(2, "0")}
              </div>

              <div className="bq-project-chapter__main">
                <div className="bq-project-chapter__top-meta">
                  <span className="bq-project-chapter__cat">{project.category}</span>
                  {project.metrics && (
                    <span className="bq-project-chapter__highlight-badge">
                      <Sparkles size={12} />
                      {Object.values(project.metrics)[0]}
                    </span>
                  )}
                </div>

                <h3 className="bq-project-chapter__title">{project.title}</h3>
                <p className="bq-project-chapter__tagline">{project.tagline || project.description}</p>

                <div className="bq-project-chapter__tags">
                  {project.tech?.map((tag, i) => (
                    <span key={i} className="bq-project-chapter__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bq-project-chapter__actions">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="bq-project-chapter__gh-link"
                    onClick={(e) => e.stopPropagation()}
                    data-cursor="open"
                    data-cursor-text="CODE"
                    title="View GitHub Repository"
                  >
                    <FaGithub size={20} />
                  </a>
                )}
                <div className="bq-project-chapter__arrow">
                  <ArrowUpRight size={28} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
