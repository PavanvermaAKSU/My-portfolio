import React from "react";
import { PERSONAL_INFO } from "../../data/portfolioData";

export default function Hero() {
  return (
    <section id="hero" className="bq-hero">
      <div className="bq-hero__topline">
        <div className="bq-hero__kicker">
          <span className="bq-kicker-dot" />
          Independent AI / data practice
        </div>
        <span className="bq-hero__index">01 — 06</span>
      </div>

      <div className="bq-hero__content">
        <p className="bq-hero__eyebrow">Pavan Kumar Verma / 2026</p>
        <h1 className="bq-hero__title">
          Data that moves<br />
          <em>people</em> forward.
        </h1>
        <p className="bq-hero__subtitle">
          I design intelligent products, predictive systems, and expressive digital experiences
          where engineering meets a clear human point of view.
        </p>
        <div className="bq-hero__meta">
          <span>AI / ML Engineer</span>
          <div className="bq-hero__meta-sep"></div>
          <span>Full-Stack Developer</span>
        </div>
        <div className="bq-hero__actions">
          <a href="#work" className="bq-hero__action bq-hero__action--solid">Explore selected work <span>↘</span></a>
          <a href="#contact" className="bq-hero__action">Start a conversation <span>↗</span></a>
        </div>
        <div className="bq-hero__links">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" data-cursor="open" data-cursor-text="GITHUB">GitHub ↗</a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" data-cursor="open" data-cursor-text="LINKEDIN">LinkedIn ↗</a>
          <a href={`mailto:${PERSONAL_INFO.email}`} data-cursor="open" data-cursor-text="EMAIL">Email ↗</a>
        </div>
      </div>

      <div className="bq-hero__bottomline">
        <div className="bq-scroll-hint">
          <div className="bq-scroll-hint__mouse">
            <div className="bq-scroll-hint__dot"></div>
          </div>
          <span className="bq-scroll-hint__label">Scroll</span>
        </div>
        <span className="bq-hero__location">Satna, India <span>·</span> Available for meaningful work</span>
      </div>
    </section>
  );
}
