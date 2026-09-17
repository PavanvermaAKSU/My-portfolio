import React, { useEffect, useState } from "react";

export default function ExperienceIntro({ onEnter }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const duration = 1800;
    let frameId;

    const updateProgress = () => {
      const next = Math.min(((Date.now() - startedAt) / duration) * 100, 100);
      setProgress(next);
      if (next < 100) frameId = requestAnimationFrame(updateProgress);
    };

    frameId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="experience-intro" role="dialog" aria-modal="true" aria-label="Enter portfolio experience">
      <div className="experience-intro__mark" aria-hidden="true">
        <span>P</span>
      </div>
      <div className="experience-intro__topline">
        <span>AI / DATA / FULL-STACK</span>
        <span>PV — 2026</span>
      </div>
      <div className="experience-intro__progress">
        <span>Loading experience</span>
        <span>{Math.round(progress).toString().padStart(2, "0")}</span>
      </div>
      <button
        type="button"
        className="experience-intro__enter"
        onClick={onEnter}
        data-cursor="open"
        data-cursor-text="ENTER"
      >
        <span>{progress < 100 ? "Preparing scene" : "Enter portfolio"}</span>
        <span aria-hidden="true">↘</span>
      </button>
      <p className="experience-intro__note">A spatial portfolio by Pavan Kumar Verma</p>
    </div>
  );
}
