import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock WebGL component for headless Jest environment
jest.mock("./components/3d/Scroll3DScene", () => () => <div data-testid="scroll-3d-scene" />);

test("renders portfolio with authentic resume information and navigation", () => {
  render(<App />);

  // Author identity
  const nameElements = screen.getAllByText(/Pavan Kumar Verma/i);
  expect(nameElements.length).toBeGreaterThan(0);

  // Internships from resume
  const xylofyElements = screen.getAllByText(/XYlofy AI/i);
  expect(xylofyElements.length).toBeGreaterThan(0);

  expect(screen.getAllByText(/CODTECH IT SOLUTION/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/MPOnline Limited/i).length).toBeGreaterThan(0);

  // Projects from resume
  const salesElements = screen.getAllByText(/Sales Forecast/i);
  expect(salesElements.length).toBeGreaterThan(0);

  const yoloElements = screen.getAllByText(/Face Mask Detection/i);
  expect(yoloElements.length).toBeGreaterThan(0);

  // Navigation items
  const expNav = screen.getAllByText(/Experience/i);
  expect(expNav.length).toBeGreaterThan(0);

  const projNav = screen.getAllByText(/Projects/i);
  expect(projNav.length).toBeGreaterThan(0);
});
