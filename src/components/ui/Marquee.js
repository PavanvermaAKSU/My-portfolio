import React from "react";

export default function Marquee({
  items = [
    "NEURAL ARCHITECTURES",
    "DEEP LEARNING",
    "WEBGL 3D SYSTEMS",
    "FASTAPI BACKENDS",
    "COMPUTER VISION",
    "PREDICTIVE PIPELINES",
    "KINETIC DESIGN",
    "RESEARCH & EXPERIMENTATION",
  ],
  reverse = false,
}) {
  const content = [...items, ...items, ...items];

  return (
    <div className={`marquee-container ${reverse ? "reverse" : ""}`} aria-hidden="true">
      <div className="marquee-track">
        {content.map((item, idx) => (
          <div key={idx} className="marquee-item">
            <span className="marquee-text">{item}</span>
            <span className="marquee-dot">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
