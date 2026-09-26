/**
 * Spatial Camera Waypoints & Chapter Definitions for Pavan's 3D Digital House
 * Defines 7 architectural zones:
 * 1. entrance  — Grand Foyer / Opening Statement
 * 2. living    — Living Room / Identity & About Lounge
 * 3. devroom   — Developer Workstation & Core Tech Stack
 * 4. ailab     — AI & Vision Lab (YOLOv8 + LLM/RAG Nodes)
 * 5. gallery   — Project Exhibition Gallery (6 Key Projects)
 * 6. library   — Library, Certifications & Career Journey
 * 7. contact   — Panoramic Horizon Window & Contact Studio
 */

const CHAPTERS = [
  {
    id: "entrance",
    name: "Entrance",
    label: "01 / Entrance Foyer",
    range: [0, 0.14],
    position: [0, 1.2, 11.5],
    target: [0, 0.2, 0],
    mobileZOffset: 2.4,
  },
  {
    id: "living",
    name: "About",
    label: "02 / Living Lounge",
    range: [0.14, 0.28],
    position: [0, 0.6, 7.8],
    target: [0, 0.1, 0.2],
    mobileZOffset: 2.2,
  },
  {
    id: "devroom",
    name: "Workbench",
    label: "03 / Dev Studio",
    range: [0.28, 0.44],
    position: [-5.2, 0.5, 3.8],
    target: [-5.2, 0.1, -1.8],
    mobileZOffset: 2.0,
  },
  {
    id: "ailab",
    name: "AI Lab",
    label: "04 / AI & Vision Lab",
    range: [0.44, 0.60],
    position: [5.2, 0.5, 3.8],
    target: [5.2, 0.1, -1.8],
    mobileZOffset: 2.0,
  },
  {
    id: "gallery",
    name: "Gallery",
    label: "05 / Project Gallery",
    range: [0.60, 0.78],
    position: [0, 0.5, 5.2],
    target: [0, 0.2, -1.8],
    mobileZOffset: 2.2,
  },
  {
    id: "library",
    name: "Journey",
    label: "06 / Library & Journey",
    range: [0.78, 0.90],
    position: [4.4, 0.45, 4.6],
    target: [4.4, 0.2, -1.2],
    mobileZOffset: 2.0,
  },
  {
    id: "contact",
    name: "Contact",
    label: "07 / Horizon Studio",
    range: [0.90, 1.0],
    position: [-3.8, 0.35, 4.2],
    target: [-3.8, 0.05, -1.6],
    mobileZOffset: 2.0,
  },
];

const clamp01 = (value) => Math.max(0, Math.min(1, value));

// Smooth Hermite smoothstep interpolation for cinematic transitions without abrupt velocity changes
const smoothstep = (min, max, value) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

const lerp = (start, end, amount) => start + (end - start) * amount;

const lerpVector = (start, end, amount) => [
  lerp(start[0], end[0], amount),
  lerp(start[1], end[1], amount),
  lerp(start[2], end[2], amount),
];

export const getSceneChapters = () => CHAPTERS;

export const getSceneChapter = (chapterId) =>
  CHAPTERS.find((chapter) => chapter.id === chapterId);

export const getActiveChapter = (progress) => {
  const normalizedProgress = clamp01(progress);
  return (
    CHAPTERS.find(
      ({ range }) =>
        normalizedProgress >= range[0] && normalizedProgress < range[1]
    ) || CHAPTERS[CHAPTERS.length - 1]
  );
};

export const getCameraState = (progress, isMobile = false) => {
  const normalizedProgress = clamp01(progress);
  const currentIndex = CHAPTERS.findIndex(
    ({ range }) => normalizedProgress >= range[0] && normalizedProgress < range[1]
  );
  const safeIndex = currentIndex === -1 ? CHAPTERS.length - 1 : currentIndex;
  const current = CHAPTERS[safeIndex];
  const next = CHAPTERS[Math.min(safeIndex + 1, CHAPTERS.length - 1)];

  const span = Math.max(current.range[1] - current.range[0], 0.001);
  const rawProgress = clamp01((normalizedProgress - current.range[0]) / span);
  const chapterProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);

  const position = lerpVector(current.position, next.position, chapterProgress);
  const target = lerpVector(current.target, next.target, chapterProgress);

  if (isMobile) {
    position[2] += current.mobileZOffset;
  }

  return { position, target, chapter: current.id };
};
