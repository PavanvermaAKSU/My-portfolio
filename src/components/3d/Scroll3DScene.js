import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  PROJECTS,
  CERTIFICATIONS,
  METRICS,
  INTERNSHIPS,
  TECH_SKILLS,
  PERSONAL_INFO,
} from "../../data/portfolioData";
import soundFX from "../ui/SoundFX";
import { Compass, RotateCw, Sparkles, Layers, Award, Cpu, Mail } from "lucide-react";
import { getActiveChapter, getCameraState, getSceneChapter } from "./sceneConfig";

export default function Scroll3DScene({ onSelectProject, onSelectDetail, isExperienceActive = true, selectedProject = null }) {
  const mountRef = useRef(null);
  const [activeZone, setActiveZone] = useState("lounge");
  const [hoveredObjectInfo, setHoveredObjectInfo] = useState(null);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  // References for animation loop
  const cameraRef = useRef(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 0.4, 9.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const sceneState = useRef({
    scrollProgress: 0,
    entranceProgress: isExperienceActive ? 1 : 0,
    projectFocus: { point: null, startedAt: 0 },
    mouse: { x: 0, y: 0, tx: 0, ty: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    orbitOffset: { theta: 0, phi: 0 },
  });
  const experienceActiveRef = useRef(isExperienceActive);
  const selectedProjectRef = useRef(selectedProject);
  experienceActiveRef.current = isExperienceActive;
  selectedProjectRef.current = selectedProject;

  const flyToZone = useCallback((zoneKey) => {
    setActiveZone(zoneKey);
    const chapter = getSceneChapter(zoneKey);
    if (chapter) {
      targetCamPos.current.set(...chapter.position);
      targetLookAt.current.set(...chapter.target);
      soundFX.playClick();
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.042);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 75);
    camera.position.set(0, 0.4, 9.5);
    cameraRef.current = camera;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglUnavailable(true);
      return undefined;
    }
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 850 ? 1.5 : 2));
    renderer.shadowMap.enabled = width >= 850;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // --- 2. Realistic Studio Lighting ---
    const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x080808, 2.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5ea, 3.6);
    keyLight.position.set(-6, 7, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    scene.add(keyLight);

    const crimsonRimLight = new THREE.PointLight(0xe11d48, 8.0, 18);
    crimsonRimLight.position.set(4.5, 1.5, 2.5);
    scene.add(crimsonRimLight);

    const cyanRimLight = new THREE.PointLight(0x00f0ff, 4.5, 16);
    cyanRimLight.position.set(-5.0, -0.5, 3.5);
    scene.add(cyanRimLight);

    const goldAccentLight = new THREE.PointLight(0xf59e0b, 3.5, 12);
    goldAccentLight.position.set(0, 3.5, 1.0);
    scene.add(goldAccentLight);
    const ceilingLight = new THREE.RectAreaLight(0xffe6c7, 2.2, 4.5, 1.2);
    ceilingLight.position.set(0, 4.6, 0.5);
    ceilingLight.rotation.x = Math.PI / 2;
    scene.add(ceilingLight);

    // --- 3. Master Groups ---
    const masterStudio = new THREE.Group();
    scene.add(masterStudio);

    const interactiveCards = []; // for raycasting
    const profileSignalMeshes = [];
    const projectDisplayRecords = [];
    const heroWallElements = [];
    const disposableResources = { meshes: [], textures: [], materials: [], geometries: [] };

    const trackResource = (mesh, mat, geo, tex) => {
      if (mesh) disposableResources.meshes.push(mesh);
      if (mat) disposableResources.materials.push(mat);
      if (geo) disposableResources.geometries.push(geo);
      if (tex) disposableResources.textures.push(tex);
    };

    // Helper for box creation
    const createBox = (w, h, d, x, y, z, material, parent = masterStudio) => {
      const geo = new THREE.BoxGeometry(w, h, d, 2, 2, 2);
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      trackResource(mesh, material, geo);
      return mesh;
    };

    // --- 4. Materials Library ---
    const matLeatherCharcoal = new THREE.MeshStandardMaterial({
      color: 0x161413,
      roughness: 0.76,
      metalness: 0.12,
    });
    const matLeatherBlack = new THREE.MeshStandardMaterial({
      color: 0x0a0908,
      roughness: 0.88,
    });
    const matBrass = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.28,
      metalness: 0.9,
    });
    const matCrimsonLamp = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      roughness: 0.35,
      metalness: 0.2,
      emissive: 0xe11d48,
      emissiveIntensity: 0.85,
    });
    const matArchitecturalWall = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.96,
      metalness: 0.05,
    });
    const matReflectiveFloor = new THREE.MeshStandardMaterial({
      color: 0x090909,
      roughness: 0.8,
      metalness: 0.15,
    });
    const matCeiling = new THREE.MeshStandardMaterial({
      color: 0x25201d,
      roughness: 0.92,
      metalness: 0.02,
    });
    const matWarmWood = new THREE.MeshStandardMaterial({
      color: 0x3a281c,
      roughness: 0.42,
      metalness: 0.2,
    });

    // --- 5. Studio Architecture: Wall & Reflective Floor ---
    createBox(16, 10, 0.2, 0, 1.5, -2.4, matArchitecturalWall);
    createBox(16, 0.16, 8, 0, 5.25, 0.6, matCeiling);
    createBox(8.5, 0.08, 0.12, 0, 4.92, -1.9, matWarmWood);
    createBox(0.08, 0.3, 6.8, -6.8, 4.96, 0.3, matWarmWood);
    createBox(0.08, 0.3, 6.8, 6.8, 4.96, 0.3, matWarmWood);

    const floorGeo = new THREE.PlaneGeometry(32, 24);
    const floorMesh = new THREE.Mesh(floorGeo, matReflectiveFloor);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -2.15;
    masterStudio.add(floorMesh);
    trackResource(floorMesh, matReflectiveFloor, floorGeo);

    // Floor Grid lines for high-tech spatial studio feel
    const gridHelper = new THREE.GridHelper(28, 28, 0xe11d48, 0x222222);
    gridHelper.position.y = -2.14;
    gridHelper.material.opacity = 0.35;
    gridHelper.material.transparent = true;
    masterStudio.add(gridHelper);
    trackResource(gridHelper);

    // --- 6. 3D Designer Lounge Sofa (High-Fidelity Model) ---
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(0, -0.35, 0);
    masterStudio.add(sofaGroup);

    // Base Frame
    createBox(5.3, 0.65, 1.55, 0, -1.15, 0.1, matLeatherCharcoal, sofaGroup);
    // Backrest with sculpted angle
    const backrest = createBox(5.25, 1.45, 0.48, 0, -0.22, -0.45, matLeatherCharcoal, sofaGroup);
    backrest.rotation.x = -0.05;
    // Armrests
    createBox(0.48, 1.25, 1.65, -2.62, -0.52, 0.1, matLeatherCharcoal, sofaGroup);
    createBox(0.48, 1.25, 1.65, 2.62, -0.52, 0.1, matLeatherCharcoal, sofaGroup);

    // 3 Ergonomic Comfort Cushions with organic tilts
    [-1.6, 0, 1.6].forEach((xPos, idx) => {
      const cushion = createBox(
        1.48,
        0.26,
        1.38,
        xPos,
        -0.72,
        0.18,
        idx === 1 ? matLeatherBlack : matLeatherCharcoal,
        sofaGroup
      );
      cushion.rotation.z = idx === 1 ? -0.02 : 0.02;
    });

    // 4 Polished Brass Legs
    [-2.25, 2.25].forEach((x) => {
      [-0.52, 0.62].forEach((z) => {
        createBox(0.1, 0.75, 0.1, x, -1.82, z, matBrass, sofaGroup);
      });
    });

    // Coffee table and contact tablet establish the room's physical contact point.
    const coffeeTable = new THREE.Group();
    coffeeTable.position.set(0, 0, 1.7);
    masterStudio.add(coffeeTable);
    const coffeeTopGeometry = new THREE.CylinderGeometry(1.45, 1.45, 0.16, 48);
    const coffeeTop = new THREE.Mesh(coffeeTopGeometry, matWarmWood);
    coffeeTop.position.y = -1.2;
    coffeeTable.add(coffeeTop);
    trackResource(coffeeTop, matWarmWood, coffeeTopGeometry);
    const coffeeStemGeometry = new THREE.CylinderGeometry(0.16, 0.28, 1.05, 24);
    const coffeeStem = new THREE.Mesh(coffeeStemGeometry, matBrass);
    coffeeStem.position.y = -1.72;
    coffeeTable.add(coffeeStem);
    trackResource(coffeeStem, matBrass, coffeeStemGeometry);
    const coffeeBaseGeometry = new THREE.CylinderGeometry(0.78, 0.9, 0.12, 32);
    const coffeeBase = new THREE.Mesh(coffeeBaseGeometry, matBrass);
    coffeeBase.position.y = -2.25;
    coffeeTable.add(coffeeBase);
    trackResource(coffeeBase, matBrass, coffeeBaseGeometry);

    const contactTabletGeometry = new THREE.BoxGeometry(0.78, 0.06, 0.5, 2, 2, 2);
    const contactTabletMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      emissive: 0xff5c35,
      emissiveIntensity: 0.5,
      roughness: 0.24,
      metalness: 0.7,
    });
    const contactTablet = new THREE.Mesh(contactTabletGeometry, contactTabletMaterial);
    contactTablet.position.set(0, -1.08, 0.08);
    contactTablet.rotation.x = -0.18;
    coffeeTable.add(contactTablet);
    contactTablet.userData = {
      type: "information",
      data: { id: "contact", title: "Get in touch" },
      defaultPos: contactTablet.position.clone(),
      defaultRot: contactTablet.rotation.clone(),
    };
    interactiveCards.push(contactTablet);
    trackResource(contactTablet, contactTabletMaterial, contactTabletGeometry);

    // Designer side table and glowing lamp.
    const tableTopGeo = new THREE.CylinderGeometry(0.62, 0.62, 0.08, 32);
    const tableTop = new THREE.Mesh(tableTopGeo, matBrass);
    tableTop.position.set(3.4, -1.25, -0.1);
    sofaGroup.add(tableTop);
    trackResource(tableTop, matBrass, tableTopGeo);

    const tableStemGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.15, 16);
    const tableStem = new THREE.Mesh(tableStemGeo, matBrass);
    tableStem.position.set(3.4, -1.8, -0.1);
    sofaGroup.add(tableStem);
    trackResource(tableStem, matBrass, tableStemGeo);

    const lampSphereGeo = new THREE.SphereGeometry(0.2, 24, 24);
    const lampSphere = new THREE.Mesh(lampSphereGeo, matCrimsonLamp);
    lampSphere.position.set(3.4, -0.9, -0.1);
    sofaGroup.add(lampSphere);
    trackResource(lampSphere, matCrimsonLamp, lampSphereGeo);

    // Profile workspace: a quiet desk and monitor that anchor the opening chapter.
    const profileWorkspace = new THREE.Group();
    profileWorkspace.position.set(-3.5, 0.15, -0.35);
    masterStudio.add(profileWorkspace);

    const matDesk = new THREE.MeshStandardMaterial({
      color: 0x201b18,
      roughness: 0.62,
      metalness: 0.18,
    });
    const matScreenFrame = new THREE.MeshStandardMaterial({
      color: 0x080808,
      roughness: 0.35,
      metalness: 0.8,
    });
    const matScreenGlow = new THREE.MeshBasicMaterial({
      color: 0xff5c35,
      transparent: true,
      opacity: 0.24,
    });

    createBox(4.2, 0.16, 1.65, 0, -0.82, 0, matDesk, profileWorkspace);
    [-1.7, 1.7].forEach((x) => {
      createBox(0.14, 1.25, 0.14, x, -1.42, 0, matDesk, profileWorkspace);
    });

    const monitorFrame = createBox(2.75, 1.65, 0.16, 0, 0.32, -0.42, matScreenFrame, profileWorkspace);
    const monitorStand = createBox(0.14, 0.6, 0.14, 0, -0.58, -0.42, matScreenFrame, profileWorkspace);
    createBox(0.9, 0.08, 0.38, 0, -0.88, -0.42, matScreenFrame, profileWorkspace);
    monitorFrame.userData = { type: "profile", data: PERSONAL_INFO };
    monitorStand.userData = { type: "profile", data: PERSONAL_INFO };

    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 960;
    screenCanvas.height = 560;
    const screenContext = screenCanvas.getContext("2d");
    screenContext.fillStyle = "#0b0b0b";
    screenContext.fillRect(0, 0, screenCanvas.width, screenCanvas.height);
    screenContext.fillStyle = "#ff5c35";
    screenContext.fillRect(54, 54, 112, 8);
    screenContext.fillStyle = "#ffffff";
    screenContext.font = '700 48px "Inter Tight", sans-serif';
    screenContext.fillText("PAVAN", 54, 148);
    screenContext.fillText("KUMAR VERMA", 54, 204);
    screenContext.fillStyle = "rgba(255,255,255,0.58)";
    screenContext.font = '400 23px "JetBrains Mono", monospace';
    screenContext.fillText("AI ENGINEER / DATA / SYSTEMS", 54, 258);
    screenContext.fillStyle = "rgba(255,255,255,0.14)";
    screenContext.fillRect(54, 314, 850, 2);
    screenContext.fillStyle = "#ff5c35";
    screenContext.font = '600 18px "JetBrains Mono", monospace';
    screenContext.fillText("MODEL SIGNAL / LIVE WORKSPACE", 54, 360);
    screenContext.fillStyle = "rgba(255,255,255,0.55)";
    screenContext.fillText("FORECAST", 54, 424);
    screenContext.fillText("VISION", 286, 424);
    screenContext.fillText("PRODUCT", 518, 424);
    screenContext.fillStyle = "#ff5c35";
    [0.66, 0.82, 0.52, 0.9, 0.74, 0.96, 0.61].forEach((value, index) => {
      screenContext.fillRect(54 + index * 112, 468 - value * 52, 56, value * 52);
    });
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    const screenMaterial = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenGeometry = new THREE.PlaneGeometry(2.55, 1.48);
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.set(0, 0.32, -0.32);
    profileWorkspace.add(screenMesh);
    screenMesh.userData = { type: "profile", data: PERSONAL_INFO };
    interactiveCards.push(screenMesh);
    trackResource(screenMesh, screenMaterial, screenGeometry, screenTexture);

    const screenGlowGeometry = new THREE.PlaneGeometry(2.7, 1.62);
    const screenGlow = new THREE.Mesh(screenGlowGeometry, matScreenGlow);
    screenGlow.position.set(0, 0.32, -0.22);
    profileWorkspace.add(screenGlow);
    trackResource(screenGlow, matScreenGlow, screenGlowGeometry);

    const keyboardMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.48, metalness: 0.4 });
    createBox(1.55, 0.08, 0.48, -0.15, -0.66, 0.46, keyboardMaterial, profileWorkspace);
    const signalMaterial = new THREE.MeshStandardMaterial({
      color: 0xff5c35,
      emissive: 0xff5c35,
      emissiveIntensity: 0.8,
      roughness: 0.3,
    });
    [0.28, 0.46, 0.34, 0.58].forEach((height, index) => {
      const signal = createBox(0.11, height, 0.11, 1.05 + index * 0.22, -0.72 + height / 2, 0.42, signalMaterial, profileWorkspace);
      profileSignalMeshes.push({ mesh: signal, baseHeight: height, phase: index * 0.8 });
    });

    // --- 7. 3D Architectural Wall Typography ---
    const makeWallTextPlane = (text, widthPx, color, fontSize = 72) => {
      const canvas = document.createElement("canvas");
      canvas.width = widthPx;
      canvas.height = 180;
      const ctx = canvas.getContext("2d");
      ctx.font = `900 ${fontSize}px "Inter Tight", "Helvetica Neue", sans-serif`;
      ctx.fillStyle = color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, 90);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        depthWrite: false,
      });
      const planeGeo = new THREE.PlaneGeometry(widthPx / 135, 1.25);
      const plane = new THREE.Mesh(planeGeo, material);
      masterStudio.add(plane);
      trackResource(plane, material, planeGeo, texture);
      return plane;
    };

    const heroName = makeWallTextPlane("PAVAN KUMAR VERMA", 1500, "#ffffff", 84);
    heroName.position.set(0, 1.6, -2.25);
    heroWallElements.push(heroName);
    const heroDiscipline = makeWallTextPlane("DATA SCIENCE & ARTIFICIAL INTELLIGENCE", 1400, "rgba(255,255,255,0.65)", 56);
    heroDiscipline.position.set(0, 0.65, -2.24);
    heroWallElements.push(heroDiscipline);
    const heroSystems = makeWallTextPlane("PRODUCTION MACHINE LEARNING & FULL-STACK SYSTEMS", 1400, "#e11d48", 52);
    heroSystems.position.set(0, -0.3, -2.23);
    heroWallElements.push(heroSystems);

    // --- 8. THE 3D BEHIND-THE-SOFA INTERACTIVE GALLERIES (TEXTURED 3D PLANES) ---
    // Function to generate dynamic high-res card textures for 3D meshes
    const create3DCardTexture = ({
      category,
      title,
      tagline,
      chips = [],
      accentColor = "#e11d48",
      metric = "",
      type = "project",
    }) => {
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 420;
      const ctx = canvas.getContext("2d");

      // Card Background with dark glass gradient
      const grad = ctx.createLinearGradient(0, 0, 640, 420);
      grad.addColorStop(0, "#161618");
      grad.addColorStop(1, "#0a0a0c");
      ctx.fillStyle = grad;
      ctx.roundRect(10, 10, 620, 400, 24);
      ctx.fill();

      // Border with accent glow
      ctx.lineWidth = 4;
      ctx.strokeStyle = accentColor;
      ctx.roundRect(10, 10, 620, 400, 24);
      ctx.stroke();

      // Top Tag Badge
      ctx.fillStyle = accentColor;
      ctx.roundRect(36, 36, 200, 32, 8);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText(category.toUpperCase().slice(0, 20), 48, 58);

      // Metric Badge (if present)
      if (metric) {
        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.roundRect(400, 36, 200, 32, 8);
        ctx.fill();
        ctx.fillStyle = "#00f0ff";
        ctx.font = '700 15px "JetBrains Mono", monospace';
        ctx.fillText(metric.slice(0, 18), 415, 58);
      }

      // Title
      ctx.fillStyle = "#ffffff";
      ctx.font = '800 30px "Inter Tight", sans-serif';
      const words = title.split(" ");
      let line1 = "";
      let line2 = "";
      words.forEach((w) => {
        if ((line1 + w).length < 24) line1 += w + " ";
        else line2 += w + " ";
      });
      ctx.fillText(line1.trim(), 36, 120);
      if (line2) ctx.fillText(line2.trim(), 36, 160);

      // Tagline
      ctx.fillStyle = "rgba(255,255,255,0.65)";
      ctx.font = '400 18px "Inter Tight", sans-serif';
      ctx.fillText(tagline.slice(0, 52), 36, 210);
      if (tagline.length > 52) {
        ctx.fillText(tagline.slice(52, 105), 36, 235);
      }

      // Chips
      let chipX = 36;
      chips.slice(0, 4).forEach((chip) => {
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.roundRect(chipX, 280, chip.length * 12 + 24, 34, 6);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = '600 15px "JetBrains Mono", monospace';
        ctx.fillText(chip, chipX + 12, 302);
        chipX += chip.length * 12 + 34;
      });

      // Bottom CTA bar
      ctx.fillStyle = "#ffffff";
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText("▶ CLICK TO INSPECT 3D SPECS", 36, 375);

      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    // A. 3D Projects Showcase (Curved 3D spatial arc behind the sofa)
    const project3DGroup = new THREE.Group();
    project3DGroup.position.set(0, 0.75, -1.45);
    masterStudio.add(project3DGroup);

    PROJECTS.forEach((proj, idx) => {
      const column = idx % 3;
      const row = Math.floor(idx / 3);
      const x = (column - 1) * 3.05;
      const y = 1.15 - row * 2.15;
      const z = 0;

      const texture = create3DCardTexture({
        category: proj.category || "AI Project",
        title: proj.title,
        tagline: proj.tagline || proj.description,
        chips: proj.tech || [],
        accentColor: proj.accent || "#e11d48",
        metric: proj.metrics ? Object.values(proj.metrics)[0] : "",
        type: "project",
      });

      const cardGeo = new THREE.PlaneGeometry(2.6, 1.7);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.35,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
      });

      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set(x, y, z + 0.09);
      cardMesh.rotation.y = (column - 1) * -0.035;

      const frameMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.accent || "#ff5c35"),
        emissive: new THREE.Color(proj.accent || "#ff5c35"),
        emissiveIntensity: 0.18,
        roughness: 0.38,
        metalness: 0.72,
        transparent: true,
      });
      const frameDepth = z + 0.02;
      const frameMeshes = [
        createBox(2.9, 0.1, 0.12, x, y + 0.94, frameDepth, frameMaterial, project3DGroup),
        createBox(2.9, 0.1, 0.12, x, y - 0.94, frameDepth, frameMaterial, project3DGroup),
        createBox(0.1, 1.78, 0.12, x - 1.4, y, frameDepth, frameMaterial, project3DGroup),
        createBox(0.1, 1.78, 0.12, x + 1.4, y, frameDepth, frameMaterial, project3DGroup),
      ];

      const backlightGeometry = new THREE.PlaneGeometry(2.78, 1.88);
      const backlightMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(proj.accent || "#ff5c35"),
        transparent: true,
        opacity: 0.08,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const backlight = new THREE.Mesh(backlightGeometry, backlightMaterial);
      backlight.position.set(x, y, z - 0.01);
      project3DGroup.add(backlight);
      trackResource(backlight, backlightMaterial, backlightGeometry);
      const projectMembers = [cardMesh, ...frameMeshes, backlight].map((mesh) => ({
        mesh,
        desktopPosition: mesh.position.clone(),
        mobilePosition: new THREE.Vector3(mesh.position.x - x, mesh.position.y - y, mesh.position.z + 0.35),
      }));
      projectDisplayRecords.push({
        id: proj.id,
        index: idx,
        cardMesh,
        frameMeshes,
        members: projectMembers,
        backlightMaterial,
      });

      // Attach metadata for raycaster interaction
      cardMesh.userData = {
        type: "project",
        data: proj,
        defaultPos: cardMesh.position.clone(),
        defaultRot: cardMesh.rotation.clone(),
      };

      project3DGroup.add(cardMesh);
      interactiveCards.push(cardMesh);
      trackResource(cardMesh, cardMat, cardGeo, texture);
    });

    // B. 3D Certifications Frame Wing (Right 3D Space)
    const certs3DGroup = new THREE.Group();
    certs3DGroup.position.set(4.5, 0.2, 0.2);
    masterStudio.add(certs3DGroup);

    CERTIFICATIONS.forEach((cert, idx) => {
      const texture = create3DCardTexture({
        category: cert.tag || "Certification",
        title: cert.title,
        tagline: `Verified Cloud & AI Credential by ${cert.issuer}`,
        chips: ["Microsoft", "Verified", "Azure AI"],
        accentColor: "#38bdf8",
        metric: cert.date || "Verified",
        type: "cert",
      });

      const cardGeo = new THREE.PlaneGeometry(2.4, 1.55);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.1,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set((idx - 1) * 0.4, (idx - 1) * 1.6, -idx * 0.5);
      cardMesh.rotation.y = -0.35;

      cardMesh.userData = {
        type: "cert",
        data: cert,
        defaultPos: cardMesh.position.clone(),
        defaultRot: cardMesh.rotation.clone(),
      };

      certs3DGroup.add(cardMesh);
      interactiveCards.push(cardMesh);
      trackResource(cardMesh, cardMat, cardGeo, texture);
    });

    // C. 3D Key Achievements Metric Pods (Left 3D Space)
    const metrics3DGroup = new THREE.Group();
    metrics3DGroup.position.set(-4.5, 0.3, 0.2);
    masterStudio.add(metrics3DGroup);

    METRICS.forEach((m, idx) => {
      const texture = create3DCardTexture({
        category: "Achievement",
        title: `${m.value} ${m.label}`,
        tagline: m.detail,
        chips: ["Verified Record", "Impact", "High Precision"],
        accentColor: "#10b981",
        metric: m.value,
        type: "metric",
      });

      const cardGeo = new THREE.PlaneGeometry(2.3, 1.5);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.1,
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set((idx - 1.5) * 0.3, (1.5 - idx) * 1.4, -idx * 0.4);
      cardMesh.rotation.y = 0.38;

      cardMesh.userData = {
        type: "metric",
        data: m,
        defaultPos: cardMesh.position.clone(),
        defaultRot: cardMesh.rotation.clone(),
      };

      metrics3DGroup.add(cardMesh);
      interactiveCards.push(cardMesh);
      trackResource(cardMesh, cardMat, cardGeo, texture);
    });

    const conferenceRoom = new THREE.Group();
    conferenceRoom.position.set(4.3, -0.2, -1.1);
    masterStudio.add(conferenceRoom);

    const conferenceWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x171515,
      roughness: 0.9,
      metalness: 0.08,
    });
    const conferenceWoodMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a211b,
      roughness: 0.56,
      metalness: 0.16,
    });
    const conferenceMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x9a6b3f,
      roughness: 0.28,
      metalness: 0.84,
    });
    const windowMaterial = new THREE.MeshStandardMaterial({
      color: 0x172a35,
      emissive: 0x102b37,
      emissiveIntensity: 0.65,
      roughness: 0.24,
      metalness: 0.3,
    });

    createBox(7.5, 5.6, 0.16, 0, 1.0, -1.38, conferenceWallMaterial, conferenceRoom);
    createBox(4.6, 0.16, 1.65, 0, -1.25, -0.2, conferenceWoodMaterial, conferenceRoom);
    [-1.8, 1.8].forEach((x) => {
      createBox(0.12, 1.25, 0.12, x, -1.82, -0.2, conferenceMetalMaterial, conferenceRoom);
    });
    createBox(0.12, 1.25, 0.12, 0, -1.82, 0.45, conferenceMetalMaterial, conferenceRoom);
    createBox(0.12, 1.25, 0.12, 0, -1.82, -0.85, conferenceMetalMaterial, conferenceRoom);

    createBox(2.3, 1.75, 0.08, 3.05, 1.18, -1.28, windowMaterial, conferenceRoom);
    createBox(0.08, 1.9, 0.12, 1.88, 1.18, -1.2, conferenceMetalMaterial, conferenceRoom);
    createBox(0.08, 1.9, 0.12, 4.22, 1.18, -1.2, conferenceMetalMaterial, conferenceRoom);
    createBox(2.5, 0.08, 0.12, 3.05, 2.08, -1.2, conferenceMetalMaterial, conferenceRoom);
    createBox(2.5, 0.08, 0.12, 3.05, 0.28, -1.2, conferenceMetalMaterial, conferenceRoom);

    const roomFrames = [
      { id: "about", title: "About Pavan", category: "Profile", detail: "AI engineer building useful systems with data and care.", accent: "#ff5c35" },
      { id: "certifications", title: "Certifications", category: "Recognition", detail: `${CERTIFICATIONS.length}+ verified AI and data credentials.`, accent: "#38bdf8" },
      { id: "achievements", title: "Achievements", category: "Impact", detail: `${METRICS.length} measurable signals from projects and practice.`, accent: "#10b981" },
      { id: "education", title: "Education", category: "Foundation", detail: PERSONAL_INFO.education[0].degree, accent: "#f59e0b" },
      { id: "skills", title: "Capabilities", category: "Toolkit", detail: `${TECH_SKILLS.length} technical disciplines across AI and product work.`, accent: "#a855f7" },
      { id: "experience", title: "Experience", category: "Practice", detail: `${INTERNSHIPS.length} internships across data, AI, and software engineering.`, accent: "#06b6d4" },
    ];

    roomFrames.forEach((frame, index) => {
      const column = index % 3;
      const row = Math.floor(index / 3);
      const x = (column - 1) * 1.52;
      const y = 1.45 - row * 1.48;
      const texture = create3DCardTexture({
        category: frame.category,
        title: frame.title,
        tagline: frame.detail,
        chips: [frame.id.toUpperCase(), "OPEN"],
        accentColor: frame.accent,
        metric: `0${index + 1}`,
        type: "information",
      });
      const cardGeometry = new THREE.PlaneGeometry(1.28, 0.92);
      const cardMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.38,
        metalness: 0.18,
        side: THREE.DoubleSide,
      });
      const cardMesh = new THREE.Mesh(cardGeometry, cardMaterial);
      cardMesh.position.set(x, y, -1.25);
      cardMesh.userData = {
        type: "information",
        data: frame,
        defaultPos: cardMesh.position.clone(),
        defaultRot: cardMesh.rotation.clone(),
      };
      conferenceRoom.add(cardMesh);
      interactiveCards.push(cardMesh);
      trackResource(cardMesh, cardMaterial, cardGeometry, texture);

      const frameMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(frame.accent),
        emissive: new THREE.Color(frame.accent),
        emissiveIntensity: 0.15,
        roughness: 0.38,
        metalness: 0.72,
      });
      createBox(1.4, 0.06, 0.1, x, y + 0.51, -1.18, frameMaterial, conferenceRoom);
      createBox(1.4, 0.06, 0.1, x, y - 0.51, -1.18, frameMaterial, conferenceRoom);
      createBox(0.06, 0.96, 0.1, x - 0.67, y, -1.18, frameMaterial, conferenceRoom);
      createBox(0.06, 0.96, 0.1, x + 0.67, y, -1.18, frameMaterial, conferenceRoom);
    });

    // D. 3D Interactive Skills Constellation Nodes (Floating Polyhedra)
    const skillsGroup = new THREE.Group();
    skillsGroup.position.set(2.8, -0.6, 1.2);
    masterStudio.add(skillsGroup);

    const contactExit = new THREE.Group();
    contactExit.position.set(0, -0.65, -1.45);
    masterStudio.add(contactExit);
    const exitFrameMaterial = new THREE.MeshStandardMaterial({
      color: 0x2b201b,
      roughness: 0.5,
      metalness: 0.35,
    });
    const exitGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff5c35,
      transparent: true,
      opacity: 0.28,
    });
    createBox(2.6, 4.2, 0.18, 0, 1.0, 0, exitFrameMaterial, contactExit);
    createBox(0.16, 4.6, 0.22, -1.42, 1.0, 0, exitFrameMaterial, contactExit);
    createBox(0.16, 4.6, 0.22, 1.42, 1.0, 0, exitFrameMaterial, contactExit);
    createBox(2.9, 0.16, 0.22, 0, 3.28, 0, exitFrameMaterial, contactExit);
    const exitPanelGeometry = new THREE.PlaneGeometry(1.85, 2.85);
    const exitPanel = new THREE.Mesh(exitPanelGeometry, exitGlowMaterial);
    exitPanel.position.set(0, 1.15, -0.12);
    contactExit.add(exitPanel);
    exitPanel.userData = {
      type: "information",
      data: { id: "contact", title: "Get in touch" },
      defaultPos: exitPanel.position.clone(),
      defaultRot: exitPanel.rotation.clone(),
    };
    interactiveCards.push(exitPanel);
    trackResource(exitPanel, exitGlowMaterial, exitPanelGeometry);

    const contactSignalGeometry = new THREE.PlaneGeometry(1.35, 0.72);
    const contactSignalCanvas = document.createElement("canvas");
    contactSignalCanvas.width = 640;
    contactSignalCanvas.height = 320;
    const contactSignalContext = contactSignalCanvas.getContext("2d");
    contactSignalContext.fillStyle = "#0b0b0b";
    contactSignalContext.fillRect(0, 0, 640, 320);
    contactSignalContext.fillStyle = "#ff5c35";
    contactSignalContext.font = '700 34px "JetBrains Mono", monospace';
    contactSignalContext.fillText("OPEN CHANNEL", 54, 116);
    contactSignalContext.fillStyle = "rgba(255,255,255,0.62)";
    contactSignalContext.font = '400 20px "JetBrains Mono", monospace';
    contactSignalContext.fillText("EMAIL / SOCIAL / RESUME", 54, 168);
    const contactSignalTexture = new THREE.CanvasTexture(contactSignalCanvas);
    contactSignalTexture.colorSpace = THREE.SRGBColorSpace;
    const contactSignalMaterial = new THREE.MeshBasicMaterial({ map: contactSignalTexture });
    const contactSignal = new THREE.Mesh(contactSignalGeometry, contactSignalMaterial);
    contactSignal.position.set(0, -0.55, -0.15);
    contactExit.add(contactSignal);
    trackResource(contactSignal, contactSignalMaterial, contactSignalGeometry, contactSignalTexture);

    const polyGeos = [
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.45, 0),
      new THREE.DodecahedronGeometry(0.38, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
    ];

    const skillNames = ["PyTorch", "YOLOv8", "OpenCV", "React.js", "FastAPI", "Pandas", "Scikit-Learn", "Power BI"];
    const skillNodes = [];

    skillNames.forEach((name, idx) => {
      const angle = (idx / skillNames.length) * Math.PI * 2;
      const r = 1.6 + (idx % 2) * 0.4;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * 0.8 + (idx % 2 ? 0.3 : -0.3);
      const z = Math.sin(angle) * 0.9;

      const geo = polyGeos[idx % polyGeos.length];
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        emissive: idx % 2 === 0 ? 0xe11d48 : 0x00f0ff,
        emissiveIntensity: 0.55,
        wireframe: true,
        roughness: 0.2,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = {
        type: "skill",
        data: { name },
        rotSpeed: 0.015 + (idx % 3) * 0.008,
      };

      skillsGroup.add(mesh);
      skillNodes.push(mesh);
      interactiveCards.push(mesh);
      trackResource(mesh, mat, geo);
    });

    // --- 9. Atmospheric Floating Star/Dust Particles ---
    const particleCount = width < 600 ? 72 : width < 900 ? 130 : 220;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = -3 - Math.random() * 9;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.024,
      transparent: true,
      opacity: 0.5,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);
    trackResource(dustParticles, particleMat, particleGeo);

    // --- 10. Raycasting & Mouse Interaction ---
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-100, -100);
    let hoveredMesh = null;
    const publishCursor = (mode, text) => {
      window.dispatchEvent(new CustomEvent("bq:scene-cursor", { detail: { mode, text } }));
    };

    const onPointerMove = (e) => {
      width = window.innerWidth;
      height = window.innerHeight;
      mouseNorm.x = (e.clientX / width) * 2 - 1;
      mouseNorm.y = -(e.clientY / height) * 2 + 1;

      sceneState.current.mouse.tx = e.clientX / width - 0.5;
      sceneState.current.mouse.ty = e.clientY / height - 0.5;

      // Handle Orbit Dragging
      if (sceneState.current.isDragging) {
        publishCursor("open", "DRAG");
        const deltaX = e.clientX - sceneState.current.dragStart.x;
        const deltaY = e.clientY - sceneState.current.dragStart.y;
        sceneState.current.orbitOffset.theta += deltaX * 0.003;
        sceneState.current.orbitOffset.phi += deltaY * 0.002;
        sceneState.current.orbitOffset.phi = Math.max(-0.4, Math.min(0.5, sceneState.current.orbitOffset.phi));
        sceneState.current.dragStart.x = e.clientX;
        sceneState.current.dragStart.y = e.clientY;
      }
    };

    const onPointerDown = (e) => {
      // If clicking interactive HUD, ignore
      if (e.target.closest("button, a, input, textarea, .bq-hud-control")) return;
      sceneState.current.isDragging = true;
      setIsOrbiting(true);
      publishCursor("open", "DRAG");
      sceneState.current.dragStart.x = e.clientX;
      sceneState.current.dragStart.y = e.clientY;
    };

    const onPointerUp = (e) => {
      sceneState.current.isDragging = false;
      setIsOrbiting(false);
      publishCursor("default", "");

      // Raycast click trigger
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(interactiveCards, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && hit.userData.type === "project" && onSelectProject) {
          soundFX.playClick();
          const focusPoint = new THREE.Vector3();
          hit.getWorldPosition(focusPoint);
          sceneState.current.projectFocus = { point: focusPoint, startedAt: performance.now() };
          onSelectProject(hit.userData.data);
        } else if (hit.userData && onSelectDetail) {
          soundFX.playClick();
          const focusPoint = new THREE.Vector3();
          hit.getWorldPosition(focusPoint);
          sceneState.current.projectFocus = { point: focusPoint, startedAt: performance.now() };
          onSelectDetail(hit.userData);
        }
      }
    };

    const onTouchStart = (event) => onPointerDown(event.touches[0]);
    const onTouchMove = (event) => onPointerMove(event.touches[0]);
    const onTouchEnd = () => onPointerUp({ target: renderer.domElement });

    const onScroll = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = window.scrollY / maxScroll;
      sceneState.current.scrollProgress = progress;
      setActiveZone(getActiveChapter(progress).id);
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 850 ? 1.5 : 2));
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // --- 11. Main 3D Animation & Physics Loop ---
    let frameId;
    const startedAt = performance.now();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (document.hidden) return;
      const elapsedTime = reducedMotion ? 0 : (performance.now() - startedAt) / 1000;
      const st = sceneState.current;

      // Lerp mouse
      st.mouse.x += (st.mouse.tx - st.mouse.x) * 0.05;
      st.mouse.y += (st.mouse.ty - st.mouse.y) * 0.05;

      const progress = st.scrollProgress;
      const isMobile = width < 850;
      const smoothReveal = (start, end) => {
        const amount = THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1);
        return amount * amount * (3 - 2 * amount);
      };
      const projectReveal = smoothReveal(0.16, 0.28);
      const roomReveal = smoothReveal(0.34, 0.5);
      const heroReveal = 1 - smoothReveal(0.18, 0.34);
      const metricsReveal = smoothReveal(0.48, 0.66);
      const skillsReveal = smoothReveal(0.62, 0.82);
      const contactReveal = smoothReveal(0.82, 0.98);
      const selectedProjectId = selectedProjectRef.current?.id;
      projectDisplayRecords.forEach(({ id, cardMesh, backlightMaterial }) => {
        const isSelected = selectedProjectId === id;
        const record = projectDisplayRecords.find((project) => project.id === id);
        if (isMobile && record) {
          const projectProgress = THREE.MathUtils.clamp((progress - 0.18) / 0.24, 0, 1);
          const activeIndex = Math.min(PROJECTS.length - 1, Math.round(projectProgress * (PROJECTS.length - 1)));
          const isActiveMobileProject = record.index === activeIndex;
          record.members.forEach(({ mesh, mobilePosition }) => {
            mesh.position.copy(mobilePosition);
            mesh.scale.setScalar(isActiveMobileProject ? 1.12 : 0.01);
            if (mesh.material) {
              mesh.material.opacity = isActiveMobileProject ? 1 : 0.04;
            }
          });
          backlightMaterial.opacity = isActiveMobileProject ? 0.28 : 0.01;
        } else if (record) {
          record.members.forEach(({ mesh, desktopPosition }) => {
            mesh.position.copy(desktopPosition);
            mesh.scale.setScalar(1);
          });
          cardMesh.material.opacity = selectedProjectId && !isSelected ? 0.22 : 1;
          backlightMaterial.opacity = selectedProjectId ? (isSelected ? 0.32 : 0.025) : 0.08;
        }
      });
      if (experienceActiveRef.current) {
        st.entranceProgress += (1 - st.entranceProgress) * 0.045;
      } else {
        st.entranceProgress = 0;
      }

      const cameraState = getCameraState(progress, isMobile);
      const [sceneCamX, sceneCamY, sceneCamZ] = cameraState.position;
      const [sceneLookX, sceneLookY, sceneLookZ] = cameraState.target;
      const baseCamX = THREE.MathUtils.lerp(0, sceneCamX, st.entranceProgress);
      const baseCamY = THREE.MathUtils.lerp(1.8, sceneCamY, st.entranceProgress);
      const baseCamZ = THREE.MathUtils.lerp(18, sceneCamZ, st.entranceProgress);
      const lookX = THREE.MathUtils.lerp(0, sceneLookX, st.entranceProgress);
      const lookY = THREE.MathUtils.lerp(1.2, sceneLookY, st.entranceProgress);
      const lookZ = THREE.MathUtils.lerp(0, sceneLookZ, st.entranceProgress);

      // Add mouse parallax + user orbit offset
      const parallax = reducedMotion ? 0 : 1;
      const finalCamX = baseCamX + st.mouse.x * 0.8 * parallax + st.orbitOffset.theta * 3.5 * parallax;
      const finalCamY = baseCamY - st.mouse.y * 0.5 * parallax + st.orbitOffset.phi * 2.5 * parallax;
      const finalCamZ = baseCamZ;

      let focusStrength = 0;
      if (st.projectFocus.point) {
        const focusElapsed = (performance.now() - st.projectFocus.startedAt) / 1000;
        if (focusElapsed < 1.8) {
          focusStrength = Math.min(focusElapsed / 0.35, 1) * Math.min((1.8 - focusElapsed) / 0.45, 1);
        } else {
          st.projectFocus.point = null;
        }
      }

      const focusPoint = st.projectFocus.point;
      const desiredCamX = focusPoint ? THREE.MathUtils.lerp(finalCamX, focusPoint.x, focusStrength * 0.42) : finalCamX;
      const desiredCamY = focusPoint ? THREE.MathUtils.lerp(finalCamY, focusPoint.y + 0.45, focusStrength * 0.42) : finalCamY;
      const desiredCamZ = focusPoint ? THREE.MathUtils.lerp(finalCamZ, focusPoint.z + 4.6, focusStrength * 0.42) : finalCamZ;

      camera.position.x += (desiredCamX - camera.position.x) * 0.05;
      camera.position.y += (desiredCamY - camera.position.y) * 0.05;
      camera.position.z += (desiredCamZ - camera.position.z) * 0.05;

      const desiredLookX = focusPoint ? THREE.MathUtils.lerp(lookX, focusPoint.x, focusStrength * 0.52) : lookX;
      const desiredLookY = focusPoint ? THREE.MathUtils.lerp(lookY, focusPoint.y, focusStrength * 0.52) : lookY;
      const desiredLookZ = focusPoint ? THREE.MathUtils.lerp(lookZ, focusPoint.z, focusStrength * 0.52) : lookZ;

      currentLookAt.current.x += (desiredLookX - currentLookAt.current.x) * 0.05;
      currentLookAt.current.y += (desiredLookY - currentLookAt.current.y) * 0.05;
      currentLookAt.current.z += (desiredLookZ - currentLookAt.current.z) * 0.05;
      camera.lookAt(currentLookAt.current);

      // Sofa continuous 3D rotation & scale
      sofaGroup.rotation.y = reducedMotion ? progress * 0.35 : Math.sin(elapsedTime * 0.4) * 0.04 + progress * 0.35 + st.mouse.x * 0.1;
      sofaGroup.position.x = isMobile ? 0 : 0.8 - progress * 1.6;

      profileWorkspace.position.y = reducedMotion ? 0.15 : 0.15 + Math.sin(elapsedTime * 0.65) * 0.018;
      profileWorkspace.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.78 : 1, heroReveal));
      heroWallElements.forEach((element) => element.scale.setScalar(0.015));
      project3DGroup.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.72 : 1, projectReveal));
      project3DGroup.position.z = THREE.MathUtils.lerp(1.4, -1.45, projectReveal);
      conferenceRoom.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.76 : 1, roomReveal));
      conferenceRoom.position.z = THREE.MathUtils.lerp(1.8, -1.1, roomReveal);
      certs3DGroup.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.72 : 1, roomReveal));
      certs3DGroup.position.z = THREE.MathUtils.lerp(1.6, 0.2, roomReveal);
      metrics3DGroup.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.72 : 1, metricsReveal));
      metrics3DGroup.position.z = THREE.MathUtils.lerp(1.6, 0.2, metricsReveal);
      skillsGroup.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.78 : 1, skillsReveal));
      contactExit.scale.setScalar(THREE.MathUtils.lerp(0.015, isMobile ? 0.78 : 1, contactReveal));
      contactExit.position.z = THREE.MathUtils.lerp(1.8, -1.45, contactReveal);
      profileSignalMeshes.forEach(({ mesh, baseHeight, phase }) => {
        const height = reducedMotion ? baseHeight : baseHeight * (0.82 + Math.sin(elapsedTime * 1.8 + phase) * 0.18);
        mesh.scale.y = height / baseHeight;
        mesh.position.y = -0.72 + height / 2;
      });
      contactTablet.position.y = -1.08 + (reducedMotion ? 0 : Math.sin(elapsedTime * 1.2) * 0.025);
      contactTablet.material.emissiveIntensity = reducedMotion ? 0.45 : 0.45 + Math.sin(elapsedTime * 1.6) * 0.12;

      // Rotate Skills Polyhedra
      skillNodes.forEach((node) => {
        if (!reducedMotion) {
          node.rotation.x += node.userData.rotSpeed || 0.01;
          node.rotation.y += node.userData.rotSpeed * 1.2 || 0.015;
        }
      });

      // Pulse Dynamic Studio Lights
      crimsonRimLight.intensity = reducedMotion ? 7.5 : 7.5 + Math.sin(elapsedTime * 2.0) * 1.8;
      cyanRimLight.intensity = reducedMotion ? 4 : 4.0 + Math.cos(elapsedTime * 1.8) * 1.2;
      if (!reducedMotion) dustParticles.rotation.y = elapsedTime * 0.018;

      // 3D Raycaster detection & mesh lift physics
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(interactiveCards, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hoveredMesh !== hit) {
          if (hoveredMesh && hoveredMesh.userData.defaultPos) {
            hoveredMesh.position.copy(hoveredMesh.userData.defaultPos);
            hoveredMesh.rotation.copy(hoveredMesh.userData.defaultRot);
          }
          hoveredMesh = hit;
          setHoveredObjectInfo(hit.userData);
          publishCursor(hit.userData.type === "project" ? "view" : "open", hit.userData.type === "project" ? "VIEW" : "OPEN");
          soundFX.playHover();
        }

        // Lift & Tilt Hovered Mesh towards camera
        if (hit.userData.defaultPos) {
          hit.position.z = hit.userData.defaultPos.z + 0.35;
          hit.rotation.x = (st.mouse.y - 0.5) * 0.15;
          hit.rotation.y = hit.userData.defaultRot.y + (st.mouse.x - 0.5) * 0.15;
        }
      } else {
        if (hoveredMesh && hoveredMesh.userData.defaultPos) {
          hoveredMesh.position.copy(hoveredMesh.userData.defaultPos);
          hoveredMesh.rotation.copy(hoveredMesh.userData.defaultRot);
          hoveredMesh = null;
          setHoveredObjectInfo(null);
          publishCursor("default", "");
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      disposableResources.meshes.forEach((m) => {
        if (m.geometry) m.geometry.dispose();
      });
      disposableResources.materials.forEach((m) => m.dispose());
      disposableResources.textures.forEach((t) => t.dispose());
      disposableResources.geometries.forEach((g) => g.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectProject, onSelectDetail]);

  return (
    <div className={`bq-3d-master-container ${webglUnavailable ? "is-webgl-unavailable" : ""}`}>
      {/* Three.js Canvas Container */}
      <div className="scroll-3d-canvas-container" ref={mountRef} />

      {webglUnavailable && (
        <div className="bq-webgl-fallback" role="status">
          <span>Interactive 3D is unavailable in this browser.</span>
          <a href="#work">Continue to selected work ↘</a>
        </div>
      )}

      {/* Floating 3D Navigation HUD / Spatial Waypoints */}
      <div className="bq-3d-hud-bar" role="navigation" aria-label="3D Spatial Navigator">
        <div className="bq-3d-hud-title">
          <Compass size={14} className="text-rose-500" />
          <span>Navigate</span>
        </div>

        <div className="bq-3d-hud-actions">
          <button
            className={`bq-3d-hud-btn ${activeZone === "lounge" ? "is-active" : ""}`}
            onClick={() => flyToZone("lounge")}
            data-cursor="open"
            data-cursor-text="LOUNGE"
            title="3D Sofa Lounge"
          >
            <span>Home</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "projects" ? "is-active" : ""}`}
            onClick={() => flyToZone("projects")}
            data-cursor="open"
            data-cursor-text="PROJECTS"
            title="3D Behind-Sofa Projects Arc"
          >
            <Layers size={13} />
            <span>Work</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "certs" ? "is-active" : ""}`}
            onClick={() => flyToZone("certs")}
            data-cursor="open"
            data-cursor-text="CERTS"
            title="3D Certifications Wing"
          >
            <Award size={13} />
            <span>Recognition</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "achievements" ? "is-active" : ""}`}
            onClick={() => flyToZone("achievements")}
            data-cursor="open"
            data-cursor-text="METRICS"
            title="3D Achievements Pods"
          >
            <Sparkles size={13} />
            <span>Impact</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "skills" ? "is-active" : ""}`}
            onClick={() => flyToZone("skills")}
            data-cursor="open"
            data-cursor-text="SKILLS"
            title="3D Skills Constellation"
          >
            <Cpu size={13} />
            <span>Capabilities</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "contact" ? "is-active" : ""}`}
            onClick={() => flyToZone("contact")}
            data-cursor="open"
            data-cursor-text="CONTACT"
            title="3D Contact Terminal"
          >
            <Mail size={13} />
            <span>Contact</span>
          </button>
        </div>

        <div className="bq-3d-drag-hint">
          <RotateCw size={12} className={isOrbiting ? "animate-spin" : ""} />
          <span>Drag to explore</span>
        </div>
      </div>

      {/* 3D Raycast Tooltip Banner */}
      {hoveredObjectInfo && (
        <div className="bq-3d-raycast-banner">
          <span className="bq-raycast-tag">{hoveredObjectInfo.type?.toUpperCase()}</span>
          <span className="bq-raycast-title">
            {hoveredObjectInfo.data?.title || hoveredObjectInfo.data?.name || "Interactive 3D Element"}
          </span>
          <span className="bq-raycast-cta">Click to inspect</span>
        </div>
      )}
    </div>
  );
}
