const CHAPTERS = [
  {
    id: "lounge",
    range: [0, 0.18],
    position: [0, 0.75, 10.8],
    target: [0, 0.25, -0.25],
    mobileZOffset: 2,
  },
  {
    id: "projects",
    range: [0.18, 0.42],
    position: [0, 0.6, 7.8],
    target: [0, 0.4, -1.2],
    mobileZOffset: 2,
  },
  {
    id: "certs",
    range: [0.42, 0.54],
    position: [4.2, 0.8, 6.5],
    target: [4.3, 0.45, -1.2],
    mobileZOffset: 2,
  },
  {
    id: "achievements",
    range: [0.54, 0.65],
    position: [4.8, 0.45, 5.8],
    target: [4.3, 0.45, -1.2],
    mobileZOffset: 2,
  },
  {
    id: "skills",
    range: [0.65, 0.85],
    position: [-3.2, -0.4, 7],
    target: [1.8, -0.4, 0],
    mobileZOffset: 2,
  },
  {
    id: "contact",
    range: [0.85, 1],
    position: [0, -0.7, 8.2],
    target: [0, -0.8, 0],
    mobileZOffset: 2,
  },
];

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const lerp = (start, end, amount) => start + (end - start) * amount;

const lerpVector = (start, end, amount) => [
  lerp(start[0], end[0], amount),
  lerp(start[1], end[1], amount),
  lerp(start[2], end[2], amount),
];

export const getSceneChapters = () => CHAPTERS;

export const getSceneChapter = (chapterId) => CHAPTERS.find((chapter) => chapter.id === chapterId);

export const getActiveChapter = (progress) => {
  const normalizedProgress = clamp01(progress);
  return CHAPTERS.find(({ range }) => normalizedProgress >= range[0] && normalizedProgress < range[1]) || CHAPTERS[CHAPTERS.length - 1];
};

export const getCameraState = (progress, isMobile = false) => {
  const normalizedProgress = clamp01(progress);
  const currentIndex = CHAPTERS.findIndex(({ range }) => normalizedProgress >= range[0] && normalizedProgress < range[1]);
  const safeIndex = currentIndex === -1 ? CHAPTERS.length - 1 : currentIndex;
  const current = CHAPTERS[safeIndex];
  const next = CHAPTERS[Math.min(safeIndex + 1, CHAPTERS.length - 1)];
  const span = Math.max(current.range[1] - current.range[0], 0.001);
  const chapterProgress = clamp01((normalizedProgress - current.range[0]) / span);
  const position = lerpVector(current.position, next.position, chapterProgress);
  const target = lerpVector(current.target, next.target, chapterProgress);

  if (isMobile) position[2] += current.mobileZOffset;

  return { position, target, chapter: current.id };
};
