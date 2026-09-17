import React, { useState, useEffect } from "react";
import { playHoverTick, playClick } from "./SoundFX";
import { Search, X, Compass, Terminal, Box, Volume2, Download, ExternalLink } from "lucide-react";

export default function CommandPalette({
  isOpen,
  onClose,
  onSceneChange,
  isMuted,
  onToggleSound,
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      category: "Navigation",
      id: "nav-hero",
      title: "Jump to Overview / Hero",
      shortcut: "G H",
      icon: <Compass size={16} />,
      perform: () => {
        document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      category: "Navigation",
      id: "nav-about",
      title: "Jump to Profile & Engineering Philosophy",
      shortcut: "G A",
      icon: <Compass size={16} />,
      perform: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      category: "Navigation",
      id: "nav-work",
      title: "Jump to Selected Work & Systems",
      shortcut: "G W",
      icon: <Compass size={16} />,
      perform: () => {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      category: "Navigation",
      id: "nav-lab",
      title: "Jump to 3D WebGL Interaction Lab",
      shortcut: "G L",
      icon: <Box size={16} />,
      perform: () => {
        document.getElementById("lab3d")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      category: "Navigation",
      id: "nav-skills",
      title: "Jump to AI / ML & Tech Matrix",
      shortcut: "G S",
      icon: <Terminal size={16} />,
      perform: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      category: "Navigation",
      id: "nav-contact",
      title: "Jump to Contact Transmission Terminal",
      shortcut: "G C",
      icon: <Compass size={16} />,
      perform: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      category: "WebGL 3D Engine",
      id: "scene-core",
      title: "Switch 3D Scene to: Quantum Core",
      shortcut: "3D 1",
      icon: <Box size={16} />,
      perform: () => {
        if (onSceneChange) onSceneChange("core");
      },
    },
    {
      category: "WebGL 3D Engine",
      id: "scene-nebula",
      title: "Switch 3D Scene to: Cyber Nebula",
      shortcut: "3D 2",
      icon: <Box size={16} />,
      perform: () => {
        if (onSceneChange) onSceneChange("nebula");
      },
    },
    {
      category: "WebGL 3D Engine",
      id: "scene-poly",
      title: "Switch 3D Scene to: Matrix Polyhedron",
      shortcut: "3D 3",
      icon: <Box size={16} />,
      perform: () => {
        if (onSceneChange) onSceneChange("poly");
      },
    },
    {
      category: "System Audio",
      id: "toggle-audio",
      title: isMuted ? "Unmute Procedural Web Audio FX" : "Mute Sound Effects",
      shortcut: "M",
      icon: <Volume2 size={16} />,
      perform: () => {
        if (onToggleSound) onToggleSound();
      },
    },
    {
      category: "External & Assets",
      id: "download-resume",
      title: "Download Technical Resume (PDF)",
      shortcut: "RES",
      icon: <Download size={16} />,
      perform: () => {
        const link = document.createElement("a");
        link.href = "/Profile.pdf";
        link.download = "Pavan_Kumar_Verma_Resume.pdf";
        link.click();
      },
    },
    {
      category: "External & Assets",
      id: "open-github",
      title: "Explore GitHub Repositories",
      shortcut: "GIT",
      icon: <ExternalLink size={16} />,
      perform: () => {
        window.open("https://github.com/PavanvermaAKSU", "_blank");
      },
    },
  ];

  const filtered = actions.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open
        }
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        playHoverTick();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        playHoverTick();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        playClick();
        filtered[selectedIndex].perform();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-backdrop" onClick={onClose}>
      <div
        className="command-palette-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="command-search-header">
          <Search className="command-search-icon" size={18} />
          <input
            type="text"
            className="command-search-input"
            placeholder="Type a command, jump to section, or switch 3D scene..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <button className="command-close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="command-list">
          {filtered.length === 0 ? (
            <div className="command-empty">No matching directives found.</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`command-item ${idx === selectedIndex ? "selected" : ""}`}
                onMouseEnter={() => {
                  playHoverTick();
                  setSelectedIndex(idx);
                }}
                onClick={() => {
                  playClick();
                  item.perform();
                  onClose();
                }}
              >
                <div className="command-item-left">
                  <span className="command-item-icon">{item.icon}</span>
                  <div className="command-item-text">
                    <span className="command-item-title">{item.title}</span>
                    <span className="command-item-cat">{item.category}</span>
                  </div>
                </div>
                <span className="command-item-shortcut">{item.shortcut}</span>
              </div>
            ))
          )}
        </div>

        <div className="command-footer">
          <div className="command-tips">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="command-status">HUD STATUS: ONLINE</span>
        </div>
      </div>
    </div>
  );
}
