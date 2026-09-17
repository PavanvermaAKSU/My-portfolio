import React, { useState } from "react";
import ProjectCard from "../ui/ProjectCard";
import { PROJECTS, PERSONAL_INFO } from "../../data/portfolioData";
import { playHoverTick, playClick } from "../ui/SoundFX";
import { ExternalLink, Terminal } from "lucide-react";

export default function Work({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filterOptions = [
    { key: "ALL", label: "ALL DEPLOYMENTS" },
    { key: "AI", label: "AI & COMPUTER VISION" },
    { key: "FULLSTACK", label: "FULL-STACK & LMS" },
    { key: "DATA", label: "DATA & ANALYTICS" },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === "ALL") return true;
    if (activeFilter === "AI") return p.category.includes("Computer Vision") || p.category.includes("Autonomous");
    if (activeFilter === "FULLSTACK") return p.category.includes("Full-Stack") || p.category.includes("LMS");
    if (activeFilter === "DATA") return p.category.includes("Data Science") || p.category.includes("Analytics");
    return true;
  });

  return (
    <section id="work" className="section-container work-section">
      <div className="section-shell">
        {/* Section Telemetry Tag */}
        <div className="section-kicker-bar">
          <span className="section-index">{"// 01"}</span>
          <span className="section-name">INDEX OF SELECTED SYSTEMS</span>
        </div>

        {/* Section Header */}
        <div className="work-header-row">
          <div>
            <h2 className="section-title">
              Engineered for impact.<br />
              <span className="gradient-highlight">Built for scale.</span>
            </h2>
            <p className="section-subtitle">
              Interactive portfolio of deployed machine learning models, distributed full-stack applications, and institutional data pipelines.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="filter-pill-group">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                className={`filter-pill ${activeFilter === opt.key ? "active" : ""}`}
                onClick={() => {
                  playClick();
                  setActiveFilter(opt.key);
                }}
                onMouseEnter={playHoverTick}
                data-cursor="FILTER"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid-container">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
            />
          ))}
        </div>

        {/* GitHub Explorer Banner */}
        <div className="work-all-banner">
          <div className="banner-left">
            <Terminal size={22} className="banner-icon" />
            <div>
              <h4 className="banner-heading">Explore All 10+ Repositories & Experimental Prototypes</h4>
              <p className="banner-sub">Open-source contributions, computer vision scripts, and full stack templates.</p>
            </div>
          </div>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="banner-cta-btn"
            onMouseEnter={playHoverTick}
            data-cursor="GITHUB"
          >
            <span>VIEW ON GITHUB</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
