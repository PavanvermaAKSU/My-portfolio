import React, { useState, useEffect } from "react";
import Scroll3DScene from "./components/3d/Scroll3DScene";
import Navbar from "./components/ui/Navbar";
import ScrollProgress from "./components/ui/ScrollProgress";
import CustomCursor from "./components/ui/CustomCursor";
import Hero from "./components/sections/Hero";
import BehindSofaGallery from "./components/sections/BehindSofaGallery";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import Footer from "./components/ui/Footer";
import ProjectModal from "./components/ui/ProjectModal";
import ExperienceIntro from "./components/ui/ExperienceIntro";
import InformationModal from "./components/ui/InformationModal";
import WorldStatus from "./components/ui/WorldStatus";
import "./App.css";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedInformation, setSelectedInformation] = useState(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const handleInformationSelect = (detail) => {
    const frame = detail.data;
    setSelectedInformation(frame);
    if (frame?.id === "contact") {
      setContactOpen(true);
      window.setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  // Restore the portfolio title when the tab becomes active again.
  useEffect(() => {
    const originalTitle = "PAVAN KUMAR VERMA — AI & FULL-STACK ENGINEER";
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "👀 Come back...";
      } else {
        document.title = originalTitle;
      }
    };

    document.title = originalTitle;
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return (
    <div className={`portfolio-app ${hasEntered ? "is-world-first" : ""} ${contactOpen ? "is-contact-open" : ""}`}>
      {!hasEntered && <ExperienceIntro onEnter={() => setHasEntered(true)} />}

      {/* Portfolio cursor */}
      <CustomCursor />

      {/* Top Scroll Progress Line */}
      <ScrollProgress />

      {hasEntered && <WorldStatus />}

      {/* 3D Sofa & Studio WebGL Scene */}
      <Scroll3DScene
        isExperienceActive={hasEntered}
        selectedProject={selectedProject}
        onSelectDetail={handleInformationSelect}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Chapters */}
      <main className={`portfolio-main ${hasEntered ? "is-entered" : ""}`}>
        <Hero />
        
        {/* The Behind-The-Sofa 3D Interactive Exhibition */}
        <BehindSofaGallery onSelectProject={(p) => setSelectedProject(p)} />

        {/* Chapters */}
        <About />
        <Experience />
        <Projects onSelectProject={(p) => setSelectedProject(p)} />
        <Skills />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <InformationModal
        frame={selectedInformation}
        onClose={() => setSelectedInformation(null)}
      />
    </div>
  );
}

export default App;
