import React, { useEffect, useState } from "react";

const chapters = [
  { range: [0, 0.18], index: "00", label: "Main room", title: "Pavan's digital workspace" },
  { range: [0.18, 0.42], index: "01", label: "Project room", title: "Selected systems and experiments" },
  { range: [0.42, 0.65], index: "02", label: "Gallery wall", title: "Recognition and milestones" },
  { range: [0.65, 0.85], index: "03", label: "Capability room", title: "Tools for turning signals into products" },
  { range: [0.85, 1.01], index: "04", label: "Exit terminal", title: "Open a channel with Pavan" },
];

const getChapter = (progress) => chapters.find(({ range }) => progress >= range[0] && progress < range[1]) || chapters[0];

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
    <div className="world-status" aria-live="polite">
      <div className="world-status__index">{chapter.index} / 04</div>
      <div>
        <span className="world-status__label">{chapter.label}</span>
        <strong>{chapter.title}</strong>
      </div>
      <span className="world-status__progress">{String(Math.round(progress * 100)).padStart(2, "0")}%</span>
    </div>
  );
}
