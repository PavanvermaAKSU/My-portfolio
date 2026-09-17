import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHoverTick, playClick, playModeSwitch } from "../ui/SoundFX";

export default function Lab3D() {
  const mountRef = useRef(null);
  const [selectedShape, setSelectedShape] = useState("knot");
  const [isWireframe, setIsWireframe] = useState(false);
  const [rotSpeed, setRotSpeed] = useState(1);
  const [glowColor, setGlowColor] = useState("#00f0ff");
  const [isDragging, setIsDragging] = useState(false);

  // References to keep in animate loop without re-running effect
  const shapeRef = useRef(selectedShape);
  shapeRef.current = selectedShape;

  const wireframeRef = useRef(isWireframe);
  wireframeRef.current = isWireframe;

  const speedRef = useRef(rotSpeed);
  speedRef.current = rotSpeed;

  const colorRef = useRef(glowColor);
  colorRef.current = glowColor;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight || 450;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x00f0ff, 3, 10);
    rimLight.position.set(-3, -2, 2);
    scene.add(rimLight);

    // Geometry dictionary
    const geometries = {
      knot: new THREE.TorusKnotGeometry(1.3, 0.42, 128, 32),
      icosa: new THREE.IcosahedronGeometry(1.8, 1),
      torus: new THREE.TorusGeometry(1.5, 0.5, 32, 100),
      octa: new THREE.OctahedronGeometry(1.9, 0),
    };

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      emissive: new THREE.Color(colorRef.current),
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const mesh = new THREE.Mesh(geometries.knot, material);
    scene.add(mesh);

    // Wireframe halo cage
    const haloGeo = new THREE.SphereGeometry(2.3, 24, 24);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    scene.add(haloMesh);

    // Mouse Drag Rotation
    let isMouseDown = false;
    let prevMousePos = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isMouseDown = true;
      setIsDragging(true);
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isMouseDown) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isMouseDown = false;
      setIsDragging(false);
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Resize
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 450;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId;
    const clock = new THREE.Clock();
    let currentShape = "knot";

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Check for shape change
      if (shapeRef.current !== currentShape) {
        currentShape = shapeRef.current;
        if (geometries[currentShape]) {
          mesh.geometry = geometries[currentShape];
        }
      }

      // Update material properties
      material.wireframe = wireframeRef.current;
      material.emissive.set(colorRef.current);
      rimLight.color.set(colorRef.current);
      haloMat.color.set(colorRef.current);

      // Auto rotation + drag inertia
      const speed = speedRef.current;
      targetRotation.y += delta * 0.5 * speed;
      targetRotation.x += delta * 0.2 * speed;

      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.08;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.08;

      mesh.rotation.x = currentRotation.x;
      mesh.rotation.y = currentRotation.y;

      haloMesh.rotation.x = -currentRotation.x * 0.5;
      haloMesh.rotation.y = -currentRotation.y * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", onResize);

      Object.values(geometries).forEach((g) => g.dispose());
      material.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="lab-3d-wrapper">
      <div className="lab-header">
        <div>
          <span className="lab-kicker">{"// 3D INTERACTION LAB"}</span>
          <h3 className="lab-title">Procedural WebGL Playground</h3>
          <p className="lab-subtitle">Drag to inspect geometry, toggle holographic shaders, and modulate physics params.</p>
        </div>
        <div className="lab-status">
          <span className={`drag-indicator ${isDragging ? "dragging" : ""}`}>
            {isDragging ? "ORBITING MESH" : "CLICK & DRAG TO ROTATE"}
          </span>
        </div>
      </div>

      <div className="lab-grid">
        {/* 3D Viewport */}
        <div className="lab-viewport-container" ref={mountRef}>
          <div className="viewport-overlay-watermark">WebGL 2.0 / PBR SHADING</div>
        </div>

        {/* Interactive Modulation Deck */}
        <div className="lab-controls-deck">
          <div className="control-group">
            <label className="control-label">SELECT GEOMETRIC MESH</label>
            <div className="shape-button-group">
              {[
                { key: "knot", label: "Torus Knot" },
                { key: "icosa", label: "Icosahedron" },
                { key: "torus", label: "Orbital Ring" },
                { key: "octa", label: "Octahedron" },
              ].map((s) => (
                <button
                  key={s.key}
                  className={`shape-btn ${selectedShape === s.key ? "active" : ""}`}
                  onClick={() => {
                    playModeSwitch();
                    setSelectedShape(s.key);
                  }}
                  onMouseEnter={playHoverTick}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <label className="control-label">EMISSIVE CHROMATIC SPECTRA</label>
            <div className="color-palette-group">
              {[
                { hex: "#00f0ff", name: "Cyan Core" },
                { hex: "#10b981", name: "Emerald Cyber" },
                { hex: "#a855f7", name: "Violet Plasma" },
                { hex: "#f59e0b", name: "Solar Amber" },
                { hex: "#ec4899", name: "Neon Rose" },
              ].map((c) => (
                <button
                  key={c.hex}
                  className={`color-btn ${glowColor === c.hex ? "active" : ""}`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => {
                    playClick();
                    setGlowColor(c.hex);
                  }}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="control-group">
            <div className="slider-header">
              <label className="control-label">ANGULAR MOMENTUM</label>
              <span className="slider-val">{rotSpeed}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={rotSpeed}
              onChange={(e) => setRotSpeed(parseFloat(e.target.value))}
              className="lab-slider"
            />
          </div>

          <div className="control-group-toggle">
            <button
              className={`action-pill ${isWireframe ? "active" : ""}`}
              onClick={() => {
                playClick();
                setIsWireframe(!isWireframe);
              }}
              onMouseEnter={playHoverTick}
            >
              <span>{isWireframe ? "SHADING: WIREFRAME" : "SHADING: PHYSICAL SOLID"}</span>
            </button>
          </div>

          <div className="lab-telemetry-box">
            <div className="tele-row">
              <span>RENDER PASS:</span>
              <span className="tele-val">DEFERRED PBR</span>
            </div>
            <div className="tele-row">
              <span>VERTICES:</span>
              <span className="tele-val">~12,480 TRIANGLES</span>
            </div>
            <div className="tele-row">
              <span>PIPELINE:</span>
              <span className="tele-val">HARDWARE ACCELERATED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
