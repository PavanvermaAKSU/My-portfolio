import React, { useEffect, useState } from "react";

const SPATIAL_CHAPTERS = [
  { range: [0, 0.14], index: "01", label: "Grand Entrance Foyer", title: "Pavan Kumar Verma — AI Engineer" },
  { range: [0.14, 0.28], index: "02", label: "Living Lounge", title: "About Me — Identity & Story" },
  { range: [0.28, 0.44], index: "03", label: "Dev Workbench", title: "Python, FastAPI & Full-Stack" },
  { range: [0.44, 0.60], index: "04", label: "AI & Vision Lab", title: "YOLO, ML Models & Intelligence" },
  { range: [0.60, 0.78], index: "05", label: "Project Gallery", title: "6 Featured AI & Web Systems" },
  { range: [0.78, 0.90], index: "06", label: "Library & Journey", title: "Certifications & Career Timeline" },
  { range: [0.90, 1.01], index: "07", label: "Contact Studio", title: "Let's Build Something Intelligent" },
];

const getChapter = (progress) =>
  SPATIAL_CHAPTERS.find(({ range }) => progress >= range[0] && progress < range[1]) ||
  SPATIAL_CHAPTERS[SPATIAL_CHAPTERS.length - 1];

export default function WorldStatus() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setProgress(window.scrollY / max);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const chapter = getChapter(progress);

  return (
    <div className="world-status" aria-live="polite" aria-label="Current spatial zone">
      <div className="world-status__index">{chapter.index} / 07</div>
      <div>
        <span className="world-status__label">{chapter.label}</span>
        <strong>{chapter.title}</strong>
      </div>
      <span className="world-status__progress">{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
    </div>
  );
}
