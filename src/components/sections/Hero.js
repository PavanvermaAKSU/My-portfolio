import React from "react";
import { PERSONAL_INFO } from "../../data/portfolioData";
import { ArrowDownRight, ArrowUpRight, Terminal } from "lucide-react";

export default function Hero() {
  const trigger3DNavigation = (zoneId, anchorId) => {
    window.dispatchEvent(new CustomEvent("bq:nav-to-zone", { detail: { zone: zoneId } }));
    const target = document.getElementById(anchorId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="bq-hero">
      <div className="bq-hero__topline">
        <div className="bq-hero__kicker">
          <span className="bq-kicker-dot" />
          {PERSONAL_INFO.openingStatements.heroKicker}
        </div>
        <span className="bq-hero__index">01 / 07 CHAPTERS</span>
      </div>

      <div className="bq-hero__content">
        <p className="bq-hero__eyebrow">
          {PERSONAL_INFO.name.toUpperCase()} // AKS UNIVERSITY 2027
        </p>
        <h1 className="bq-hero__title">
          I build intelligent<br />
          <em>systems</em>.
        </h1>
        <p className="bq-hero__subtitle">
          {PERSONAL_INFO.openingStatements.welcome} Engineering practical machine learning models,
          real-time computer vision with YOLO, and full-stack software platforms powered by Python.
        </p>

        <div className="bq-hero__meta">
          <span className="bq-hero__meta-item">
            <Terminal size={14} className="text-emerald-400" />
            <span>Primary Strength: <strong>Python</strong></span>
          </span>
          <div className="bq-hero__meta-sep" />
          <span className="bq-hero__meta-item">AI/ML &amp; Computer Vision</span>
          <div className="bq-hero__meta-sep" />
          <span className="bq-hero__meta-item">Full-Stack AI Developer</span>
        </div>

        <div className="bq-hero__actions">
          <button
            type="button"
            className="bq-hero__action bq-hero__action--solid"
            onClick={() => trigger3DNavigation("gallery", "work")}
            data-cursor="open"
            data-cursor-text="PROJECTS"
          >
            <span>Explore 6 core projects</span>
            <ArrowDownRight size={16} />
          </button>
          <button
            type="button"
            className="bq-hero__action"
            onClick={() => trigger3DNavigation("contact", "contact")}
            data-cursor="open"
            data-cursor-text="CONTACT"
          >
            <span>Start a conversation</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        <div className="bq-hero__links">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            data-cursor-text="GITHUB"
          >
            GitHub ↗
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            data-cursor="open"
            data-cursor-text="LINKEDIN"
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            data-cursor="open"
            data-cursor-text="EMAIL"
          >
            Email Direct ↗
          </a>
        </div>
      </div>

      <div className="bq-hero__bottomline">
        <div className="bq-scroll-hint">
          <div className="bq-scroll-hint__mouse">
            <div className="bq-scroll-hint__dot" />
          </div>
          <span className="bq-scroll-hint__label">Scroll to enter the 3D world</span>
        </div>
        <span className="bq-hero__location">
          {PERSONAL_INFO.location} <span>·</span> Available for meaningful AI roles
        </span>
      </div>
    </section>
  );
}
