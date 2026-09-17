import React, { useEffect, useRef, useState } from "react";
import soundFX from "./SoundFX";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState("");
  const [cursorMode, setCursorMode] = useState("default"); // default, hover, view, open, sound
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let animFrame;
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onMouseDown = () => {
      setIsClicking(true);
      soundFX.playClick();
    };

    const onMouseUp = () => {
      setIsClicking(false);
    };

    // Smooth Spring/Lerp Loop for outer ring
    const render = () => {
      const lerp = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerp;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerp;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      animFrame = requestAnimationFrame(render);
    };
    animFrame = requestAnimationFrame(render);

    // Contextual Hover Detection
    const handleMouseOver = (e) => {
      const target = e.target;
      
      const customCursorEl = target.closest("[data-cursor]");
      if (customCursorEl) {
        const mode = customCursorEl.getAttribute("data-cursor");
        setCursorMode(mode);
        const text = customCursorEl.getAttribute("data-cursor-text") || (mode === "view" ? "VIEW" : mode === "open" ? "OPEN" : "");
        setCursorText(text);
        soundFX.playHover();
        return;
      }

      if (target.closest("[data-audio-toggle]")) {
        setCursorMode("sound");
        setCursorText("AUDIO");
        soundFX.playHover();
        return;
      }

      const interactive = target.closest("a, button, [role=button], input, textarea, select, label, .bq-clickable");
      if (interactive) {
        setCursorMode("hover");
        setCursorText("");
        soundFX.playHover();
        return;
      }

      setCursorMode("default");
      setCursorText("");
    };

    const handleMouseOut = (e) => {
      const related = e.relatedTarget;
      if (!related) {
        setCursorMode("default");
        setCursorText("");
      }
    };

    const handleSceneCursor = (event) => {
      const { mode = "default", text = "" } = event.detail || {};
      setCursorMode(mode);
      setCursorText(text);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("bq:scene-cursor", handleSceneCursor);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("bq:scene-cursor", handleSceneCursor);
    };
  }, []);

  return (
    <>
      {/* Center sharp dot */}
      {!isTouch && <div
        ref={dotRef}
        className={`bq-cursor-dot ${cursorMode !== "default" ? "is-active" : ""} ${isClicking ? "is-clicking" : ""}`}
      />}
      {/* Outer fluid trailing ring with contextual label */}
      {!isTouch && <div
        ref={ringRef}
        className={`bq-cursor-ring mode-${cursorMode} ${isClicking ? "is-clicking" : ""}`}
      >
        {cursorText && <span className="bq-cursor-text">{cursorText}</span>}
      </div>}
    </>
  );
}
