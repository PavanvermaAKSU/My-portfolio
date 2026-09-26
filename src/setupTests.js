// jest-dom adds custom jest matchers for asserting on DOM nodes.
import '@testing-library/jest-dom';

// Polyfill window.matchMedia for JSDOM
window.matchMedia = window.matchMedia || function (query) {
  return {
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  };
};

// Polyfill IntersectionObserver for framer-motion in JSDOM
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Polyfill ResizeObserver in JSDOM
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() { return null; }
  unobserve() { return null; }
  disconnect() { return null; }
};

// Prevent canvas APIs from crashing the test environment during intro animation setup
HTMLCanvasElement.prototype.getContext = function getContext() {
  return {
    clearRect: () => {},
    beginPath: () => {},
    arc: () => {},
    fill: () => {},
    fillRect: () => {},
    fillStyle: "",
    globalAlpha: 1,
    canvas: this,
  };
};
