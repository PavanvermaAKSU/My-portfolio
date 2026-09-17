import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playHoverTick, playModeSwitch } from "../ui/SoundFX";

const COLOR_PALETTES = {
  cyan: { primary: 0x00f0ff, secondary: 0x3b82f6, core: 0x06b6d4, wire: 0x38bdf8 },
  emerald: { primary: 0x10b981, secondary: 0x06d6a0, core: 0x059669, wire: 0x34d399 },
  violet: { primary: 0xa855f7, secondary: 0xec4899, core: 0x7c3aed, wire: 0xc084fc },
  sunset: { primary: 0xf59e0b, secondary: 0xef4444, core: 0xd97706, wire: 0xfbbf24 },
};

export default function ThreeCanvas({ sceneMode = "core", onSceneChange }) {
  const containerRef = useRef(null);
  const [fps, setFps] = useState(60);
  const [wireframeOnly, setWireframeOnly] = useState(false);
  const [activeTheme, setActiveTheme] = useState("cyan"); // cyan, emerald, violet, sunset

  // Scene state refs to access in animation loop
  const modeRef = useRef(sceneMode);
  modeRef.current = sceneMode;

  const wireframeRef = useRef(wireframeOnly);
  wireframeRef.current = wireframeOnly;

  const themeRef = useRef(activeTheme);
  themeRef.current = activeTheme;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.035);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2.5, 20);
    pointLight2.position.set(-5, -4, 4);
    scene.add(pointLight2);

    // 3. MASTER OBJECT CONTAINERS FOR MODES
    const coreGroup = new THREE.Group();
    const nebulaGroup = new THREE.Group();
    const polyGroup = new THREE.Group();

    scene.add(coreGroup);
    scene.add(nebulaGroup);
    scene.add(polyGroup);

    // --- MODE 1: QUANTUM CORE OBJECTS ---
    // Torus Knot with holographic phong/physical feel
    const torusGeo = new THREE.TorusKnotGeometry(1.65, 0.48, 160, 32, 2, 3);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0x050814,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.35,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    coreGroup.add(torusMesh);

    // Outer Crystalline Icosahedron Cage
    const cageGeo = new THREE.IcosahedronGeometry(2.9, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    coreGroup.add(cageMesh);

    // Inner Glowing Nano-Core
    const innerGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerMesh);

    // Orbiting electron rings
    const ringCount = 3;
    const rings = [];
    for (let i = 0; i < ringCount; i++) {
      const ringGeo = new THREE.RingGeometry(2.4 + i * 0.45, 2.44 + i * 0.45, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.3 - i * 0.08,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / (2 + i);
      ringMesh.rotation.y = (Math.PI / 4) * i;
      coreGroup.add(ringMesh);
      rings.push(ringMesh);
    }

    // Floating orbital nodes
    const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const nodes = [];
    for (let i = 0; i < 12; i++) {
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.userData = {
        radius: 3.2 + (i % 3) * 0.3,
        angle: (i / 12) * Math.PI * 2,
        speed: 0.015 + (i % 4) * 0.005,
        yOffset: Math.sin(i) * 0.8,
      };
      coreGroup.add(node);
      nodes.push(node);
    }

    // --- MODE 2: CYBER NEBULA PARTICLES ---
    const particleCount = 2800;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleOriginals = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00f0ff);
    const c2 = new THREE.Color(0xa855f7);
    const c3 = new THREE.Color(0x10b981);

    for (let i = 0; i < particleCount; i++) {
      // Create spiral galaxy distribution
      const r = Math.pow(Math.random(), 0.5) * 7.5 + 0.2;
      const theta = Math.random() * Math.PI * 2;
      const spiral = theta * 1.5 + (Math.random() - 0.5) * 0.8;
      const x = Math.cos(spiral) * r;
      const y = (Math.random() - 0.5) * 2.8 * (1 - r / 10);
      const z = Math.sin(spiral) * r;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleOriginals[i * 3] = x;
      particleOriginals[i * 3 + 1] = y;
      particleOriginals[i * 3 + 2] = z;

      // Color mix
      const mixRatio = Math.random();
      const mixed = mixRatio < 0.5 ? c1.clone().lerp(c2, mixRatio * 2) : c2.clone().lerp(c3, (mixRatio - 0.5) * 2);
      particleColors[i * 3] = mixed.r;
      particleColors[i * 3 + 1] = mixed.g;
      particleColors[i * 3 + 2] = mixed.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Particle sprite texture generated procedurally
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 32;
    canvasTex.height = 32;
    const ctx = canvasTex.getContext("2d");
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.35, "rgba(0,240,255,0.7)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const particleTex = new THREE.CanvasTexture(canvasTex);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    nebulaGroup.add(particleSystem);

    // --- MODE 3: HOLOGRAPHIC POLYHEDRON ---
    const dodecaGeo = new THREE.DodecahedronGeometry(2.1, 0);
    const dodecaMat = new THREE.MeshPhysicalMaterial({
      color: 0x060b18,
      emissive: 0xa855f7,
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.95,
      clearcoat: 1.0,
      wireframe: false,
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    polyGroup.add(dodecaMesh);

    // Surrounding Octahedron Wireframe
    const octaGeo = new THREE.OctahedronGeometry(3.2, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    polyGroup.add(octaMesh);

    // Infinite Floor Hologram Grid
    const gridGeo = new THREE.PlaneGeometry(30, 30, 30, 30);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const floorGrid = new THREE.Mesh(gridGeo, gridMat);
    floorGrid.rotation.x = -Math.PI / 2;
    floorGrid.position.y = -3.5;
    scene.add(floorGrid);

    // Mouse Tracking with smooth Lerp
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scroll Tracking for 3D Parallax
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Window Resize Handler
    const onWindowResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onWindowResize);

    // FPS Meter tracking
    let frameCount = 0;
    let lastTime = performance.now();

    // 4. ANIMATION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // FPS update
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Update palette colors dynamically
      const currentPalette = COLOR_PALETTES[themeRef.current] || COLOR_PALETTES.cyan;
      pointLight1.color.setHex(currentPalette.primary);
      pointLight2.color.setHex(currentPalette.secondary);
      torusMat.emissive.setHex(currentPalette.core);
      cageMat.color.setHex(currentPalette.wire);
      dodecaMat.emissive.setHex(currentPalette.primary);
      octaMat.color.setHex(currentPalette.wire);
      floorGrid.material.color.setHex(currentPalette.primary);

      // Wireframe toggle
      const isWire = wireframeRef.current;
      torusMat.wireframe = isWire;
      dodecaMat.wireframe = isWire;

      // Scroll camera offset
      const scrollOffset = scrollY * 0.0018;
      camera.position.y = -scrollOffset * 0.8;
      camera.position.z = 8 + Math.sin(scrollOffset * 0.5) * 0.4;

      // Visibility based on scene mode
      const curMode = modeRef.current;
      coreGroup.visible = curMode === "core";
      nebulaGroup.visible = curMode === "nebula";
      polyGroup.visible = curMode === "poly";

      // 1. Quantum Core Animation
      if (curMode === "core") {
        torusMesh.rotation.x = time * 0.35 + mouse.y * 0.4;
        torusMesh.rotation.y = time * 0.5 + mouse.x * 0.6;
        torusMesh.rotation.z = Math.sin(time * 0.2) * 0.3;

        cageMesh.rotation.x = -time * 0.2;
        cageMesh.rotation.y = -time * 0.25;
        cageMesh.rotation.z = time * 0.15;

        innerMesh.rotation.y = time * 1.2;
        const innerScale = 1.0 + Math.sin(time * 3) * 0.08;
        innerMesh.scale.set(innerScale, innerScale, innerScale);

        rings.forEach((ring, idx) => {
          ring.rotation.z = time * (0.4 - idx * 0.15);
        });

        nodes.forEach((node) => {
          node.userData.angle += node.userData.speed;
          node.position.x = Math.cos(node.userData.angle) * node.userData.radius;
          node.position.z = Math.sin(node.userData.angle) * node.userData.radius;
          node.position.y = node.userData.yOffset + Math.sin(time * 2 + node.userData.angle) * 0.4;
        });

        coreGroup.rotation.x = mouse.y * 0.3;
        coreGroup.rotation.y = mouse.x * 0.4;
      }

      // 2. Nebula Animation with Mouse Interaction
      if (curMode === "nebula") {
        nebulaGroup.rotation.y = time * 0.08 + mouse.x * 0.25;
        nebulaGroup.rotation.x = Math.sin(time * 0.05) * 0.15 + mouse.y * 0.2;

        const positions = particleGeo.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          // Gentle orbital drift
          const ox = particleOriginals[ix];
          const oy = particleOriginals[iy];
          const oz = particleOriginals[iz];

          const wave = Math.sin(time * 1.5 + ox * 0.5 + oz * 0.5) * 0.15;
          positions[iy] = oy + wave;

          // Mouse repeller in 3D
          const dx = positions[ix] - mouse.x * 4;
          const dy = positions[iy] - mouse.y * 3;
          const distSq = dx * dx + dy * dy;
          if (distSq < 2.5) {
            const force = (2.5 - distSq) * 0.08;
            positions[ix] += dx * force;
            positions[iy] += dy * force;
          } else {
            positions[ix] += (ox - positions[ix]) * 0.03;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      // 3. Holographic Polyhedron Animation
      if (curMode === "poly") {
        dodecaMesh.rotation.x = time * 0.45 + mouse.y * 0.5;
        dodecaMesh.rotation.y = time * 0.6 + mouse.x * 0.7;

        octaMesh.rotation.x = -time * 0.3 + mouse.y * 0.3;
        octaMesh.rotation.y = time * 0.35 + mouse.x * 0.4;
        const octaScale = 1.0 + Math.sin(time * 2.5) * 0.06;
        octaMesh.scale.set(octaScale, octaScale, octaScale);

        polyGroup.rotation.y = mouse.x * 0.3;
        polyGroup.rotation.x = mouse.y * 0.2;
      }

      // Floor grid animation
      floorGrid.position.z = (time * 1.2) % 1;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onWindowResize);

      // Dispose Three.js objects
      torusGeo.dispose();
      torusMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        r.material.dispose();
      });
      nodeGeo.dispose();
      nodeMat.dispose();

      particleGeo.dispose();
      particleMat.dispose();
      particleTex.dispose();

      dodecaGeo.dispose();
      dodecaMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      gridGeo.dispose();
      gridMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleModeToggle = (newMode) => {
    playModeSwitch();
    if (onSceneChange) onSceneChange(newMode);
  };

  return (
    <div className="three-canvas-root" ref={containerRef}>
      {/* 3D Telemetry HUD Overlay */}
      <div className="webgl-hud">
        <div className="webgl-hud-badge">
          <span className="hud-pulse" />
          <span className="hud-label">WEBGL 3D ENGINE</span>
          <span className="hud-fps">{fps} FPS</span>
        </div>

        {/* Scene Selector Controls */}
        <div className="webgl-scene-controls">
          <button
            className={`scene-btn ${sceneMode === "core" ? "active" : ""}`}
            onClick={() => handleModeToggle("core")}
            onMouseEnter={playHoverTick}
            title="Quantum Core"
          >
            <span>🌀 Core</span>
          </button>
          <button
            className={`scene-btn ${sceneMode === "nebula" ? "active" : ""}`}
            onClick={() => handleModeToggle("nebula")}
            onMouseEnter={playHoverTick}
            title="Cyber Nebula"
          >
            <span>✨ Nebula</span>
          </button>
          <button
            className={`scene-btn ${sceneMode === "poly" ? "active" : ""}`}
            onClick={() => handleModeToggle("poly")}
            onMouseEnter={playHoverTick}
            title="Matrix Polyhedron"
          >
            <span>🌐 Lattice</span>
          </button>
        </div>

        {/* Interactive Tools: Wireframe & Palette */}
        <div className="webgl-tools">
          <button
            className={`tool-pill ${wireframeOnly ? "active" : ""}`}
            onClick={() => {
              playHoverTick();
              setWireframeOnly(!wireframeOnly);
            }}
            title="Toggle Wireframe Shading"
          >
            WIRE: {wireframeOnly ? "ON" : "OFF"}
          </button>

          <div className="palette-swatches">
            {["cyan", "emerald", "violet", "sunset"].map((colorKey) => (
              <button
                key={colorKey}
                className={`swatch swatch-${colorKey} ${activeTheme === colorKey ? "active" : ""}`}
                onClick={() => {
                  playHoverTick();
                  setActiveTheme(colorKey);
                }}
                title={`Theme: ${colorKey.toUpperCase()}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
