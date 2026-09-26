import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  PERSONAL_INFO,
  PROJECTS,
  TECH_SKILLS_FLAT,
  CERTIFICATIONS,
  METRICS,
  JOURNEY_STAGES,
} from "../../data/portfolioData";
import soundFX from "../ui/SoundFX";
import {
  Compass,
  RotateCw,
  Sparkles,
  Layers,
  Award,
  Cpu,
  Mail,
  Home,
  User,
  ExternalLink,
} from "lucide-react";
import {
  getActiveChapter,
  getCameraState,
  getSceneChapter,
} from "./sceneConfig";

export default function Scroll3DScene({
  onSelectProject,
  onSelectDetail,
  isExperienceActive = true,
  selectedProject = null,
}) {
  const mountRef = useRef(null);
  const [activeZone, setActiveZone] = useState("entrance");
  const [hoveredObjectInfo, setHoveredObjectInfo] = useState(null);
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  // References for animation loop
  const cameraRef = useRef(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 1.2, 11.5));
  const targetLookAt = useRef(new THREE.Vector3(0, 0.2, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.2, 0));
  const sceneState = useRef({
    scrollProgress: 0,
    targetProgress: 0,
    entranceProgress: isExperienceActive ? 1 : 0,
    projectFocus: { point: null, startedAt: 0 },
    mouse: { x: 0, y: 0, tx: 0, ty: 0 },
    isDragging: false,
    dragStart: { x: 0, y: 0 },
    orbitOffset: { theta: 0, phi: 0 },
    isAutonomousFlight: false,
    flightTargetPos: null,
    flightTargetLook: null,
  });

  const experienceActiveRef = useRef(isExperienceActive);
  const selectedProjectRef = useRef(selectedProject);
  experienceActiveRef.current = isExperienceActive;
  selectedProjectRef.current = selectedProject;

  const flyToZone = useCallback((zoneKey) => {
    setActiveZone(zoneKey);
    const chapter = getSceneChapter(zoneKey);
    if (chapter) {
      sceneState.current.isAutonomousFlight = true;
      sceneState.current.flightTargetPos = new THREE.Vector3(...chapter.position);
      sceneState.current.flightTargetLook = new THREE.Vector3(...chapter.target);
      sceneState.current.orbitOffset = { theta: 0, phi: 0 };
      soundFX.playClick();

      // Also scroll document smoothly so scrollProgress stays synchronized
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const targetScrollY = ((chapter.range[0] + chapter.range[1]) / 2) * maxScroll;
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  }, []);

  // Listen to external navigation events from top Navbar
  useEffect(() => {
    const handleNavEvent = (e) => {
      if (e.detail?.zone) {
        flyToZone(e.detail.zone);
      }
    };
    window.addEventListener("bq:nav-to-zone", handleNavEvent);
    return () => window.removeEventListener("bq:nav-to-zone", handleNavEvent);
  }, [flyToZone]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- 1. Scene & Camera Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060608, 0.038);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 85);
    camera.position.set(0, 1.2, 11.5);
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

    // --- 2. Studio Lighting Architecture ---
    const hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x0a0a0f, 2.6);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.8);
    keyLight.position.set(-8, 9, 8);
    keyLight.castShadow = width >= 850;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.bias = -0.0001;
    }
    scene.add(keyLight);

    const cyanRimLight = new THREE.PointLight(0x00f0ff, 4.5, 20);
    cyanRimLight.position.set(-6, 2.5, 4);
    scene.add(cyanRimLight);

    const amberRimLight = new THREE.PointLight(0xf59e0b, 5.0, 22);
    amberRimLight.position.set(6, 3, 2);
    scene.add(amberRimLight);

    const roseAccentLight = new THREE.PointLight(0xe11d48, 6.0, 18);
    roseAccentLight.position.set(0, 2, -2.5);
    scene.add(roseAccentLight);

    // --- 3. Resource Tracking & Helper ---
    const interactiveObjects = [];
    const dynamicAnimators = [];
    const disposableResources = { meshes: [], textures: [], materials: [], geometries: [] };

    const trackResource = (mesh, mat, geo, tex) => {
      if (mesh) disposableResources.meshes.push(mesh);
      if (mat) disposableResources.materials.push(mat);
      if (geo) disposableResources.geometries.push(geo);
      if (tex) disposableResources.textures.push(tex);
    };

    const createBox = (w, h, d, x, y, z, material, parent = scene) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      trackResource(mesh, material, geo);
      return mesh;
    };

    // --- 4. Material Palette ---
    const matObsidianWall = new THREE.MeshStandardMaterial({
      color: 0x0c0b0f,
      roughness: 0.94,
      metalness: 0.06,
    });
    const matConcreteFloor = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      roughness: 0.72,
      metalness: 0.22,
    });
    const matWalnutWood = new THREE.MeshStandardMaterial({
      color: 0x2b1c14,
      roughness: 0.45,
      metalness: 0.15,
    });
    const matBrushedBrass = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      roughness: 0.26,
      metalness: 0.88,
    });
    const matCharcoalLeather = new THREE.MeshStandardMaterial({
      color: 0x141316,
      roughness: 0.78,
      metalness: 0.08,
    });
    const matDarkGlass = new THREE.MeshPhysicalMaterial({
      color: 0x111827,
      transmission: 0.85,
      opacity: 0.9,
      transparent: true,
      roughness: 0.12,
      ior: 1.5,
      thickness: 0.4,
    });
    const matScreenObsidian = new THREE.MeshStandardMaterial({
      color: 0x050507,
      roughness: 0.3,
      metalness: 0.8,
    });

    // Master Studio World Group
    const digitalStudio = new THREE.Group();
    scene.add(digitalStudio);

    // --- 5. Architectural Structure (Floor, Ceiling, Columns, Walls) ---
    const floorGeo = new THREE.PlaneGeometry(36, 32);
    const floorMesh = new THREE.Mesh(floorGeo, matConcreteFloor);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -1.8;
    floorMesh.receiveShadow = true;
    digitalStudio.add(floorMesh);
    trackResource(floorMesh, matConcreteFloor, floorGeo);

    // Architectural floor grid — fine detail layer
    const floorGrid = new THREE.GridHelper(34, 68, 0x1a1a22, 0x1a1a22);
    floorGrid.position.y = -1.795;
    floorGrid.material.opacity = 0.55;
    floorGrid.material.transparent = true;
    digitalStudio.add(floorGrid);
    trackResource(floorGrid);

    // Accent floor grid — coarse rose neon overlay
    const floorGridAccent = new THREE.GridHelper(34, 17, 0xe11d48, 0x1e0a12);
    floorGridAccent.position.y = -1.79;
    floorGridAccent.material.opacity = 0.22;
    floorGridAccent.material.transparent = true;
    digitalStudio.add(floorGridAccent);
    trackResource(floorGridAccent);

    // Main back gallery wall
    createBox(28, 8.5, 0.25, 0, 2.4, -4.5, matObsidianWall, digitalStudio);
    // Left boundary studio wall
    createBox(0.25, 8.5, 24, -14, 2.4, 3.5, matObsidianWall, digitalStudio);
    // Right boundary studio wall
    createBox(0.25, 8.5, 24, 14, 2.4, 3.5, matObsidianWall, digitalStudio);
    // Warm timber ceiling louvers
    for (let i = -10; i <= 10; i += 2.2) {
      createBox(27.8, 0.12, 0.18, 0, 6.0, i, matWalnutWood, digitalStudio);
    }

    // Subtle ceiling ambient light strips (emissive planes)
    const ceilingStripMat = new THREE.MeshBasicMaterial({
      color: 0xfff0e0,
      transparent: true,
      opacity: 0.18,
    });
    [-8, 0, 8].forEach((x) => {
      const stripGeo = new THREE.PlaneGeometry(0.25, 16);
      const strip = new THREE.Mesh(stripGeo, ceilingStripMat);
      strip.position.set(x, 5.85, 0);
      strip.rotation.x = -Math.PI / 2;
      digitalStudio.add(strip);
      trackResource(strip, ceilingStripMat, stripGeo);
    });

    // Helper to generate dynamic canvas texture
    const makeTextCanvasTexture = (drawFn, w = 1024, h = 512) => {
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      drawFn(ctx, w, h);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      return { texture, canvas };
    };

    // --- 6. ZONE 1: GRAND ENTRANCE FOYER ---
    const entranceGroup = new THREE.Group();
    entranceGroup.position.set(0, 0, 8.5);
    digitalStudio.add(entranceGroup);

    // Architectural Entrance Portal
    createBox(0.35, 5.2, 0.35, -4.8, 0.8, 0, matBrushedBrass, entranceGroup);
    createBox(0.35, 5.2, 0.35, 4.8, 0.8, 0, matBrushedBrass, entranceGroup);
    createBox(10.0, 0.35, 0.35, 0, 3.4, 0, matBrushedBrass, entranceGroup);

    // Entrance portal glow point light
    const portalGlow = new THREE.PointLight(0xe11d48, 3.5, 12);
    portalGlow.position.set(0, 3.4, 1.0);
    entranceGroup.add(portalGlow);

    // Cyan floor glow under portal
    const portalFloorGlow = new THREE.PointLight(0x00f0ff, 2.2, 8);
    portalFloorGlow.position.set(0, -1.0, 0);
    entranceGroup.add(portalFloorGlow);

    // Floating Illuminated Entrance Typography
    const { texture: entranceTex } = makeTextCanvasTexture((ctx, w, h) => {
      ctx.fillStyle = "rgba(10, 10, 14, 0)";
      ctx.fillRect(0, 0, w, h);
      ctx.textAlign = "center";

      ctx.fillStyle = "#e11d48";
      ctx.font = '700 24px "JetBrains Mono", monospace';
      ctx.fillText("PAVAN KUMAR VERMA // 2026", w / 2, 70);

      ctx.fillStyle = "#ffffff";
      ctx.font = '900 68px "Inter Tight", sans-serif';
      ctx.fillText("I BUILD INTELLIGENT SYSTEMS", w / 2, 175);

      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.font = '400 26px "Inter Tight", sans-serif';
      ctx.fillText("AI Engineer • Data Science Enthusiast • Full-Stack Developer", w / 2, 245);

      ctx.fillStyle = "#00f0ff";
      ctx.font = '600 22px "JetBrains Mono", monospace';
      ctx.fillText("▼ EXPLORE DIGITAL STUDIO / SCROLL TO MOVE", w / 2, 360);
    }, 1200, 480);

    const entrancePlaneMat = new THREE.MeshBasicMaterial({
      map: entranceTex,
      transparent: true,
      depthWrite: false,
    });
    const entrancePlaneGeo = new THREE.PlaneGeometry(8.5, 3.4);
    const entrancePlane = new THREE.Mesh(entrancePlaneGeo, entrancePlaneMat);
    entrancePlane.position.set(0, 1.2, 0.1);
    entranceGroup.add(entrancePlane);
    trackResource(entrancePlane, entrancePlaneMat, entrancePlaneGeo, entranceTex);

    // --- 7. ZONE 2: LIVING ROOM & ABOUT LOUNGE ---
    const livingGroup = new THREE.Group();
    livingGroup.position.set(0, 0, 3.8);
    digitalStudio.add(livingGroup);

    // Real 3D sofa replaced by Sketchfab model embed in the room
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(0, -0.8, 0.6);
    livingGroup.add(sofaGroup);

    const sofaPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 2.7),
      new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.96,
        side: THREE.DoubleSide,
      })
    );
    sofaPlate.position.set(0, 0.2, -0.15);
    sofaPlate.rotation.y = Math.PI;
    sofaGroup.add(sofaPlate);

    const sofaOverlay = document.createElement("iframe");
    sofaOverlay.title = "Sofa";
    sofaOverlay.setAttribute("frameborder", "0");
    sofaOverlay.setAttribute("allowfullscreen", "true");
    sofaOverlay.setAttribute("mozallowfullscreen", "true");
    sofaOverlay.setAttribute("webkitallowfullscreen", "true");
    sofaOverlay.setAttribute(
      "allow",
      "autoplay; fullscreen; xr-spatial-tracking"
    );
    sofaOverlay.src = "https://sketchfab.com/models/f426165b35b74577926b1ab44f3382ab/embed";
    sofaOverlay.style.width = "100%";
    sofaOverlay.style.height = "100%";
    sofaOverlay.style.border = "0";
    sofaOverlay.style.background = "transparent";

    const sofaTexture = new THREE.CanvasTexture(document.createElement("canvas"));
    sofaTexture.image.width = 1024;
    sofaTexture.image.height = 768;
    sofaTexture.needsUpdate = true;
    sofaPlate.material.map = sofaTexture;
    sofaPlate.material.needsUpdate = true;

    const sofaImageLoader = new Image();
    sofaImageLoader.crossOrigin = "anonymous";
    sofaImageLoader.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 768;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#0b0f10";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(sofaImageLoader, 0, 0, canvas.width, canvas.height);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      sofaPlate.material.map = texture;
      sofaPlate.material.needsUpdate = true;
    };
    sofaImageLoader.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='1024' height='768'>
        <defs>
          <linearGradient id='bg' x1='0' x2='1' y1='0' y2='1'>
            <stop offset='0%' stop-color='#10181a'/>
            <stop offset='100%' stop-color='#0b0f10'/>
          </linearGradient>
        </defs>
        <rect width='1024' height='768' fill='url(#bg)'/>
        <rect x='120' y='220' width='780' height='270' rx='30' fill='#d5c1a1' opacity='0.92'/>
        <rect x='185' y='120' width='650' height='170' rx='25' fill='#c6af8a' opacity='0.9'/>
        <rect x='160' y='450' width='120' height='120' rx='16' fill='#b79763'/>
        <rect x='740' y='450' width='120' height='120' rx='16' fill='#b79763'/>
        <rect x='290' y='480' width='140' height='110' rx='18' fill='#d9c9a3'/>
        <rect x='590' y='480' width='140' height='110' rx='18' fill='#d9c9a3'/>
        <circle cx='164' cy='185' r='18' fill='#e9dcc2'/>
        <circle cx='860' cy='185' r='18' fill='#e9dcc2'/>
        <rect x='450' y='70' width='120' height='170' rx='14' fill='#b99968' opacity='0.95'/>
      </svg>
    `);

    // Round Walnut Coffee Table
    const tableTopGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.12, 36);
    const tableTopMesh = new THREE.Mesh(tableTopGeo, matWalnutWood);
    tableTopMesh.position.set(0, -1.15, 2.4);
    livingGroup.add(tableTopMesh);
    trackResource(tableTopMesh, matWalnutWood, tableTopGeo);
    const tableLegGeo = new THREE.CylinderGeometry(0.12, 0.18, 0.65, 16);
    const tableLegMesh = new THREE.Mesh(tableLegGeo, matBrushedBrass);
    tableLegMesh.position.set(0, -1.48, 2.4);
    livingGroup.add(tableLegMesh);
    trackResource(tableLegMesh, matBrushedBrass, tableLegGeo);

    // Interactive Identity Plaque / About Tablet on the table
    const { texture: identityTex } = makeTextCanvasTexture((ctx, w, h) => {
      ctx.fillStyle = "#0c0c10";
      ctx.roundRect(16, 16, w - 32, h - 32, 24);
      ctx.fill();
      ctx.strokeStyle = "#e11d48";
      ctx.lineWidth = 6;
      ctx.roundRect(16, 16, w - 32, h - 32, 24);
      ctx.stroke();

      ctx.fillStyle = "#e11d48";
      ctx.font = '700 24px "JetBrains Mono", monospace';
      ctx.fillText("IDENTITY // PROFILE", 48, 72);

      ctx.fillStyle = "#ffffff";
      ctx.font = '900 42px "Inter Tight", sans-serif';
      ctx.fillText("Pavan Kumar Verma", 48, 135);

      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = '400 24px "Inter Tight", sans-serif';
      ctx.fillText("B.Tech CSE — Artificial Intelligence & Data Science", 48, 185);
      ctx.fillText("AKS University, Satna • Class of 2027", 48, 225);

      ctx.fillStyle = "#00f0ff";
      ctx.font = '700 22px "JetBrains Mono", monospace';
      ctx.fillText("PRIMARY STRENGTH: PYTHON", 48, 285);

      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = '400 20px "JetBrains Mono", monospace';
      ctx.fillText("Focused on practical AI, real-world ML & full-stack systems.", 48, 335);

      ctx.fillStyle = "#ffffff";
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText("▶ CLICK TO INSPECT BIO & STORY", 48, 410);
    }, 840, 480);

    const identityPlaqueGeo = new THREE.PlaneGeometry(1.6, 0.95);
    const identityPlaqueMat = new THREE.MeshStandardMaterial({
      map: identityTex,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide,
    });
    const identityPlaque = new THREE.Mesh(identityPlaqueGeo, identityPlaqueMat);
    identityPlaque.position.set(0, -1.06, 2.38);
    identityPlaque.rotation.x = -Math.PI / 2 + 0.15;
    identityPlaque.userData = {
      type: "identity",
      data: {
        id: "about",
        title: "Pavan Kumar Verma",
        category: "About Me",
        description: PERSONAL_INFO.summary,
        education: PERSONAL_INFO.education,
        interests: PERSONAL_INFO.interests,
      },
      defaultPos: identityPlaque.position.clone(),
      defaultRot: identityPlaque.rotation.clone(),
    };
    livingGroup.add(identityPlaque);
    interactiveObjects.push(identityPlaque);
    trackResource(identityPlaque, identityPlaqueMat, identityPlaqueGeo, identityTex);

    // Designer Floor Lamp
    const lampStemGeo = new THREE.CylinderGeometry(0.04, 0.04, 3.4, 16);
    const lampStem = new THREE.Mesh(lampStemGeo, matBrushedBrass);
    lampStem.position.set(3.4, 0.1, 0.8);
    livingGroup.add(lampStem);
    trackResource(lampStem, matBrushedBrass, lampStemGeo);

    const lampShadeGeo = new THREE.ConeGeometry(0.45, 0.65, 24, 1, true);
    const lampShadeMat = new THREE.MeshStandardMaterial({
      color: 0xe11d48,
      emissive: 0xe11d48,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    const lampShade = new THREE.Mesh(lampShadeGeo, lampShadeMat);
    lampShade.position.set(3.4, 1.7, 0.8);
    livingGroup.add(lampShade);
    trackResource(lampShade, lampShadeMat, lampShadeGeo);

    // --- 8. ZONE 3: DEVELOPER WORKBENCH (LEFT WING) ---
    const devGroup = new THREE.Group();
    devGroup.position.set(-5.4, 0, -0.6);
    digitalStudio.add(devGroup);

    // Solid Wood Developer Desk
    createBox(4.4, 0.16, 2.0, 0, -0.85, 0, matWalnutWood, devGroup);
    [-1.8, 1.8].forEach((x) => {
      createBox(0.12, 1.0, 0.12, x, -1.35, -0.75, matBrushedBrass, devGroup);
      createBox(0.12, 1.0, 0.12, x, -1.35, 0.75, matBrushedBrass, devGroup);
    });

    // Monitor 1: Code Editor (Live Python Syntax)
    const { texture: codeEditorTex } = makeTextCanvasTexture((ctx, w, h) => {
      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#1e1e24";
      ctx.fillRect(0, 0, w, 42);

      // Window controls
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(24, 21, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(44, 21, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(64, 21, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = '500 16px "JetBrains Mono", monospace';
      ctx.fillText("engine_core.py — Pavan's AI Workspace", 96, 27);

      const codeLines = [
        { t: "import torch", c: "#e11d48" },
        { t: "from fastapi import FastAPI, BackgroundTasks", c: "#e11d48" },
        { t: "from ultralytics import YOLO", c: "#e11d48" },
        { t: "", c: "" },
        { t: "class IntelligentSystemArchitect:", c: "#00f0ff" },
        { t: "    def __init__(self, engineer='Pavan Kumar Verma'):", c: "#ffffff" },
        { t: "        self.primary_weapon = 'Python'", c: "#10b981" },
        { t: "        self.graduation_year = 2027", c: "#f59e0b" },
        { t: "        self.stack = ['FastAPI', 'React', 'Docker', 'YOLO']", c: "#a855f7" },
        { t: "", c: "" },
        { t: "    async def deploy_production_intelligence(self):", c: "#00f0ff" },
        { t: "        await self.execute_sales_forecast()", c: "#ffffff" },
        { t: "        await self.run_mask_detection_yolo()", c: "#ffffff" },
        { t: "        return {'status': 'Delivering Real-World Impact'}", c: "#10b981" },
      ];

      codeLines.forEach((line, idx) => {
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.font = '400 16px "JetBrains Mono", monospace';
        ctx.fillText((idx + 1).toString().padStart(2, "0"), 24, 75 + idx * 28);
        ctx.fillStyle = line.c || "#ffffff";
        ctx.fillText(line.t, 64, 75 + idx * 28);
      });
    }, 720, 520);

    const codeMonFrame = createBox(2.4, 1.5, 0.12, -0.95, 0.25, -0.4, matScreenObsidian, devGroup);
    createBox(0.12, 0.5, 0.12, -0.95, -0.5, -0.4, matScreenObsidian, devGroup);
    createBox(0.7, 0.05, 0.35, -0.95, -0.74, -0.4, matScreenObsidian, devGroup);

    const codeMonPlaneGeo = new THREE.PlaneGeometry(2.25, 1.35);
    const codeMonPlaneMat = new THREE.MeshBasicMaterial({ map: codeEditorTex });
    const codeMonPlane = new THREE.Mesh(codeMonPlaneGeo, codeMonPlaneMat);
    codeMonPlane.position.set(-0.95, 0.25, -0.32);
    devGroup.add(codeMonPlane);
    codeMonPlane.userData = {
      type: "skill-workbench",
      data: {
        title: "Developer Environment",
        category: "Workbench",
        description: "Python, FastAPI, React, Docker, and full-stack software development workflows.",
      },
    };
    interactiveObjects.push(codeMonPlane);
    trackResource(codeMonPlane, codeMonPlaneMat, codeMonPlaneGeo, codeEditorTex);

    // Monitor 2: Live AI & Model Terminal
    const { texture: terminalTex } = makeTextCanvasTexture((ctx, w, h) => {
      ctx.fillStyle = "#05080c";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(0, 240, 255, 0.12)";
      ctx.fillRect(0, 0, w, 38);

      ctx.fillStyle = "#00f0ff";
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText("bash: ai-cluster — pavan@aks-satna:~", 24, 25);

      const logs = [
        "[INFO] Initializing PyTorch CUDA acceleration... Ready",
        "[INFO] Loading YOLOv8 custom weights: weights/best_mask.pt",
        "[STATUS] Classes detected: with_mask | without_mask | incorrect",
        "[API] FastAPI server running at http://0.0.0.0:8000",
        "[DOCKER] Container 'samarveer-backend' healthy [port 8080]",
        "[DATA] Sales Forecast inference latency: 42ms",
        "[METRICS] Precision: 0.94 | Recall: 0.91 | mAP50: 0.952",
        "pavan@cluster:~$ _",
      ];
      logs.forEach((log, i) => {
        ctx.fillStyle = i === logs.length - 1 ? "#10b981" : "rgba(255, 255, 255, 0.75)";
        ctx.font = '400 15px "JetBrains Mono", monospace';
        ctx.fillText(log, 24, 75 + i * 32);
      });
    }, 640, 420);

    createBox(1.9, 1.3, 0.12, 1.25, 0.2, -0.3, matScreenObsidian, devGroup);
    createBox(0.1, 0.5, 0.1, 1.25, -0.5, -0.3, matScreenObsidian, devGroup);
    createBox(0.6, 0.05, 0.3, 1.25, -0.74, -0.3, matScreenObsidian, devGroup);

    const termMonPlaneGeo = new THREE.PlaneGeometry(1.78, 1.18);
    const termMonPlaneMat = new THREE.MeshBasicMaterial({ map: terminalTex });
    const termMonPlane = new THREE.Mesh(termMonPlaneGeo, termMonPlaneMat);
    termMonPlane.position.set(1.25, 0.2, -0.22);
    devGroup.add(termMonPlane);
    interactiveObjects.push(termMonPlane);
    termMonPlane.userData = {
      type: "skill-workbench",
      data: {
        title: "AI Terminal & Diagnostics",
        category: "Workbench",
        description: "Real-time edge model inference, container pipelines, and predictive analytics.",
      },
    };
    trackResource(termMonPlane, termMonPlaneMat, termMonPlaneGeo, terminalTex);

    // Mechanical Keyboard & Desk Accessories
    createBox(1.4, 0.06, 0.42, 0, -0.75, 0.3, matObsidianWall, devGroup);
    createBox(0.24, 0.04, 0.32, 1.0, -0.75, 0.3, matObsidianWall, devGroup);

    // 3D Interactive Skill Polyhedra Floating Around Desk
    const skillNodesGroup = new THREE.Group();
    skillNodesGroup.position.set(0, 1.2, 0.2);
    devGroup.add(skillNodesGroup);

    const polyGeos = [
      new THREE.IcosahedronGeometry(0.26, 0),
      new THREE.OctahedronGeometry(0.28, 0),
      new THREE.DodecahedronGeometry(0.25, 0),
      new THREE.TetrahedronGeometry(0.3, 0),
    ];

    const coreSkills = ["Python", "FastAPI", "React", "Docker", "MySQL", "Git"];
    const activeSkillMeshes = [];

    coreSkills.forEach((skillName, i) => {
      const angle = (i / coreSkills.length) * Math.PI * 2;
      const radius = 1.9;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * 0.45;
      const z = Math.sin(angle) * 0.7;

      const geo = polyGeos[i % polyGeos.length];
      const mat = new THREE.MeshPhysicalMaterial({
        color: 0x14141c,
        emissive: i % 2 === 0 ? 0x00f0ff : 0xe11d48,
        emissiveIntensity: 0.65,
        wireframe: true,
        roughness: 0.2,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, z);
      mesh.userData = {
        type: "skill",
        data: {
          title: skillName,
          category: "Core Skill",
          name: skillName,
          description: `Primary skill in Pavan's development toolkit.`,
        },
        rotSpeedX: 0.012 + i * 0.004,
        rotSpeedY: 0.015 + i * 0.003,
        defaultPos: mesh.position.clone(),
        defaultRot: mesh.rotation.clone(),
      };
      skillNodesGroup.add(mesh);
      interactiveObjects.push(mesh);
      activeSkillMeshes.push(mesh);
      trackResource(mesh, mat, geo);
    });

    dynamicAnimators.push((time) => {
      activeSkillMeshes.forEach((mesh) => {
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;
      });
    });

    // --- 9. ZONE 4: AI & COMPUTER VISION LAB (RIGHT WING) ---
    const aiLabGroup = new THREE.Group();
    aiLabGroup.position.set(5.4, 0, -0.6);
    digitalStudio.add(aiLabGroup);

    // AI Lab Console Bench
    createBox(4.4, 0.16, 2.0, 0, -0.85, 0, matObsidianWall, aiLabGroup);
    [-1.8, 1.8].forEach((x) => {
      createBox(0.12, 1.0, 0.12, x, -1.35, -0.75, matBrushedBrass, aiLabGroup);
      createBox(0.12, 1.0, 0.12, x, -1.35, 0.75, matBrushedBrass, aiLabGroup);
    });

    // Large YOLO Computer Vision Scanner Display
    const { texture: yoloScreenTex } = makeTextCanvasTexture((ctx, w, h) => {
      ctx.fillStyle = "#06090e";
      ctx.fillRect(0, 0, w, h);

      // Vision Header
      ctx.fillStyle = "#10b981";
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillText("YOLOv8 REAL-TIME DETECTION SCANNER // LIVE STREAM", 32, 40);

      // Video frame simulation background
      ctx.strokeStyle = "rgba(16, 185, 129, 0.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(32, 60, w - 64, h - 100);

      // Bounding Box 1: with_mask (Green)
      ctx.strokeStyle = "#10b981";
      ctx.lineWidth = 4;
      ctx.strokeRect(80, 110, 180, 220);
      ctx.fillStyle = "#10b981";
      ctx.fillRect(80, 80, 180, 30);
      ctx.fillStyle = "#000000";
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText("with_mask: 0.98", 90, 102);

      // Bounding Box 2: incorrect_mask (Amber)
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 4;
      ctx.strokeRect(320, 130, 170, 210);
      ctx.fillStyle = "#f59e0b";
      ctx.fillRect(320, 100, 190, 30);
      ctx.fillStyle = "#000000";
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText("incorrect_mask: 0.91", 328, 122);

      // Bounding Box 3: without_mask (Rose)
      ctx.strokeStyle = "#e11d48";
      ctx.lineWidth = 4;
      ctx.strokeRect(550, 120, 180, 230);
      ctx.fillStyle = "#e11d48";
      ctx.fillRect(550, 90, 190, 30);
      ctx.fillStyle = "#000000";
      ctx.font = '700 16px "JetBrains Mono", monospace';
      ctx.fillText("without_mask: 0.95", 558, 112);

      // Status Bar
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      ctx.font = '500 15px "JetBrains Mono", monospace';
      ctx.fillText("LATENCY: 14.8ms | FPS: 60.0 | DEVICE: CUDA0 | RESOLUTION: 1920x1080", 40, h - 18);
    }, 800, 480);

    createBox(3.2, 2.0, 0.14, 0, 0.45, -0.4, matScreenObsidian, aiLabGroup);
    createBox(0.18, 0.6, 0.18, 0, -0.45, -0.4, matScreenObsidian, aiLabGroup);
    createBox(1.1, 0.06, 0.4, 0, -0.74, -0.4, matScreenObsidian, aiLabGroup);

    const yoloScreenGeo = new THREE.PlaneGeometry(3.05, 1.85);
    const yoloScreenMat = new THREE.MeshBasicMaterial({ map: yoloScreenTex });
    const yoloScreenMesh = new THREE.Mesh(yoloScreenGeo, yoloScreenMat);
    yoloScreenMesh.position.set(0, 0.45, -0.32);
    aiLabGroup.add(yoloScreenMesh);
    yoloScreenMesh.userData = {
      type: "project",
      data: PROJECTS.find((p) => p.id === "face-mask-detection") || PROJECTS[1],
      defaultPos: yoloScreenMesh.position.clone(),
      defaultRot: yoloScreenMesh.rotation.clone(),
    };
    interactiveObjects.push(yoloScreenMesh);
    trackResource(yoloScreenMesh, yoloScreenMat, yoloScreenGeo, yoloScreenTex);

    // Floating Neural Network Nodes Hologram
    const neuralGroup = new THREE.Group();
    neuralGroup.position.set(0, 1.8, 0.4);
    aiLabGroup.add(neuralGroup);

    const neuralSpheres = [];
    for (let i = 0; i < 9; i++) {
      const sGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const sMat = new THREE.MeshStandardMaterial({
        color: 0x00f0ff,
        emissive: 0x00f0ff,
        emissiveIntensity: 0.9,
        roughness: 0.2,
      });
      const sMesh = new THREE.Mesh(sGeo, sMat);
      const layer = Math.floor(i / 3);
      const row = (i % 3) - 1;
      sMesh.position.set((layer - 1) * 0.9, row * 0.55, (Math.random() - 0.5) * 0.3);
      neuralGroup.add(sMesh);
      neuralSpheres.push(sMesh);
      trackResource(sMesh, sMat, sGeo);
    }

    dynamicAnimators.push((time) => {
      neuralSpheres.forEach((s, idx) => {
        s.position.y += Math.sin(time * 2 + idx) * 0.002;
      });
    });

    // --- 10. ZONE 5: PROJECT EXHIBITION GALLERY (THE 6 CORE PROJECTS) ---
    const galleryGroup = new THREE.Group();
    galleryGroup.position.set(0, 0.4, -2.4);
    digitalStudio.add(galleryGroup);

    // Create 6 Dedicated Project Frames (2 rows of 3)
    const projectMeshes = [];

    const createProjectCardTexture = (proj) => {
      return makeTextCanvasTexture((ctx, w, h) => {
        // Gradient background
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, "#15151c");
        grad.addColorStop(1, "#09090c");
        ctx.fillStyle = grad;
        ctx.roundRect(14, 14, w - 28, h - 28, 24);
        ctx.fill();

        // Border glow
        ctx.lineWidth = 6;
        ctx.strokeStyle = proj.accent || "#e11d48";
        ctx.roundRect(14, 14, w - 28, h - 28, 24);
        ctx.stroke();

        // Category Tag
        ctx.fillStyle = proj.accent || "#e11d48";
        ctx.roundRect(42, 42, 240, 36, 8);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.font = '700 17px "JetBrains Mono", monospace';
        ctx.fillText(proj.category.toUpperCase().slice(0, 24), 54, 66);

        // Project Number
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.font = '800 32px "Inter Tight", sans-serif';
        ctx.fillText(`0${proj.number || 1}`, w - 90, 70);

        // Title
        ctx.fillStyle = "#ffffff";
        ctx.font = '800 36px "Inter Tight", sans-serif';
        const titleWords = proj.title.split(" ");
        let line1 = "";
        let line2 = "";
        titleWords.forEach((word) => {
          if ((line1 + word).length < 20) line1 += word + " ";
          else line2 += word + " ";
        });
        ctx.fillText(line1.trim(), 42, 140);
        if (line2) ctx.fillText(line2.trim(), 42, 185);

        // Tagline
        ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
        ctx.font = '400 20px "Inter Tight", sans-serif';
        ctx.fillText((proj.tagline || proj.description).slice(0, 48), 42, 235);
        if ((proj.tagline || proj.description).length > 48) {
          ctx.fillText((proj.tagline || proj.description).slice(48, 98), 42, 262);
        }

        // Tech Chips
        let chipX = 42;
        (proj.tech || []).slice(0, 4).forEach((t) => {
          ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
          ctx.roundRect(chipX, 305, t.length * 13 + 26, 36, 6);
          ctx.fill();
          ctx.fillStyle = "#00f0ff";
          ctx.font = '600 16px "JetBrains Mono", monospace';
          ctx.fillText(t, chipX + 13, 329);
          chipX += t.length * 13 + 38;
        });

        // Bottom CTA
        ctx.fillStyle = "#ffffff";
        ctx.font = '700 18px "JetBrains Mono", monospace';
        ctx.fillText("▶ CLICK TO INSPECT PROJECT SPECS", 42, 400);
      }, 760, 460);
    };

    PROJECTS.forEach((proj, idx) => {
      const col = idx % 3; // 0, 1, 2
      const row = Math.floor(idx / 3); // 0, 1
      const x = (col - 1) * 3.4;
      const y = 1.05 - row * 2.2;
      const z = 0;

      const { texture } = createProjectCardTexture(proj);

      const cardGeo = new THREE.PlaneGeometry(3.0, 1.85);
      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });

      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardMesh.position.set(x, y, z + 0.08);
      cardMesh.rotation.y = (col - 1) * -0.04;

      // Architectural Frame Trims
      const frameMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(proj.accent || "#e11d48"),
        emissive: new THREE.Color(proj.accent || "#e11d48"),
        emissiveIntensity: 0.25,
        roughness: 0.35,
        metalness: 0.8,
      });
      createBox(3.2, 0.08, 0.12, x, y + 0.98, z + 0.04, frameMat, galleryGroup);
      createBox(3.2, 0.08, 0.12, x, y - 0.98, z + 0.04, frameMat, galleryGroup);
      createBox(0.08, 1.95, 0.12, x - 1.55, y, z + 0.04, frameMat, galleryGroup);
      createBox(0.08, 1.95, 0.12, x + 1.55, y, z + 0.04, frameMat, galleryGroup);

      // Backlight glow
      const bgGeo = new THREE.PlaneGeometry(3.1, 1.95);
      const bgMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(proj.accent || "#e11d48"),
        transparent: true,
        opacity: 0.08,
        depthWrite: false,
      });
      const bgMesh = new THREE.Mesh(bgGeo, bgMat);
      bgMesh.position.set(x, y, z - 0.02);
      galleryGroup.add(bgMesh);
      trackResource(bgMesh, bgMat, bgGeo);

      cardMesh.userData = {
        type: "project",
        data: proj,
        defaultPos: cardMesh.position.clone(),
        defaultRot: cardMesh.rotation.clone(),
      };

      galleryGroup.add(cardMesh);
      interactiveObjects.push(cardMesh);
      projectMeshes.push({ cardMesh, proj });
      trackResource(cardMesh, cardMat, cardGeo, texture);
    });

    // --- 11. ZONE 6: LIBRARY, CERTIFICATIONS & JOURNEY CORRIDOR ---
    const libraryGroup = new THREE.Group();
    libraryGroup.position.set(4.8, 0, 1.6);
    digitalStudio.add(libraryGroup);

    // Architectural Bookshelf
    createBox(4.2, 4.4, 0.45, 0, 0.5, -2.4, matWalnutWood, libraryGroup);
    [-0.8, 0.4, 1.6].forEach((shelfY) => {
      createBox(4.0, 0.08, 0.42, 0, shelfY, -2.4, matWalnutWood, libraryGroup);
    });

    // Framed Verified Certifications on the Wall
    CERTIFICATIONS.forEach((cert, idx) => {
      const { texture: certTex } = makeTextCanvasTexture((ctx, w, h) => {
        ctx.fillStyle = "#0c0d12";
        ctx.roundRect(12, 12, w - 24, h - 24, 18);
        ctx.fill();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#38bdf8";
        ctx.roundRect(12, 12, w - 24, h - 24, 18);
        ctx.stroke();

        ctx.fillStyle = "#38bdf8";
        ctx.font = '700 18px "JetBrains Mono", monospace';
        ctx.fillText(`VERIFIED CREDENTIAL // ${cert.issuer.toUpperCase()}`, 36, 52);

        ctx.fillStyle = "#ffffff";
        ctx.font = '700 24px "Inter Tight", sans-serif';
        const words = cert.title.split(" ");
        let l1 = "";
        let l2 = "";
        words.forEach((w) => {
          if ((l1 + w).length < 24) l1 += w + " ";
          else l2 += w + " ";
        });
        ctx.fillText(l1.trim(), 36, 110);
        if (l2) ctx.fillText(l2.trim(), 36, 145);

        ctx.fillStyle = "#10b981";
        ctx.font = '600 16px "JetBrains Mono", monospace';
        ctx.fillText("✓ VERIFIED CREDENTIAL • MICROSOFT / INDUSTRY", 36, 205);
      }, 640, 260);

      const certGeo = new THREE.PlaneGeometry(1.6, 0.72);
      const certMat = new THREE.MeshStandardMaterial({ map: certTex, roughness: 0.3 });
      const certMesh = new THREE.Mesh(certGeo, certMat);
      certMesh.position.set(0, 1.8 - idx * 0.95, -2.15);
      certMesh.userData = {
        type: "certification",
        data: {
          title: cert.title,
          category: "Verified Credential",
          issuer: cert.issuer,
          date: cert.date,
        },
        defaultPos: certMesh.position.clone(),
        defaultRot: certMesh.rotation.clone(),
      };
      libraryGroup.add(certMesh);
      interactiveObjects.push(certMesh);
      trackResource(certMesh, certMat, certGeo, certTex);
    });

    // --- 12. ZONE 7: PANORAMIC CONTACT STUDIO & HORIZON WINDOW ---
    const contactGroup = new THREE.Group();
    contactGroup.position.set(-4.2, 0, 1.4);
    digitalStudio.add(contactGroup);

    // Floor-to-ceiling Window Frame looking at horizon
    const windowFrameMat = new THREE.MeshStandardMaterial({
      color: 0x1a1921,
      roughness: 0.4,
      metalness: 0.7,
    });
    createBox(5.6, 5.0, 0.1, 0, 1.0, -2.5, matDarkGlass, contactGroup);
    createBox(5.7, 0.12, 0.2, 0, 3.5, -2.48, windowFrameMat, contactGroup);
    createBox(5.7, 0.12, 0.2, 0, -1.5, -2.48, windowFrameMat, contactGroup);
    createBox(0.12, 5.0, 0.2, -2.8, 1.0, -2.48, windowFrameMat, contactGroup);
    createBox(0.12, 5.0, 0.2, 2.8, 1.0, -2.48, windowFrameMat, contactGroup);
    createBox(0.12, 5.0, 0.2, 0, 1.0, -2.48, windowFrameMat, contactGroup);

    // Deep Horizon Background (Sky & Stars Plane beyond the glass)
    const { texture: horizonTex } = makeTextCanvasTexture((ctx, w, h) => {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#05070d");
      grad.addColorStop(0.65, "#0d1424");
      grad.addColorStop(1, "#1e0b1c");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Star field dots
      ctx.fillStyle = "#ffffff";
      for (let i = 0; i < 180; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * (h * 0.75);
        const sr = Math.random() * 1.8 + 0.4;
        ctx.beginPath();
        ctx.arc(sx, sy, sr, 0, Math.PI * 2);
        ctx.fill();
      }
    }, 1024, 768);

    const horizonGeo = new THREE.PlaneGeometry(9.0, 6.5);
    const horizonMat = new THREE.MeshBasicMaterial({ map: horizonTex });
    const horizonMesh = new THREE.Mesh(horizonGeo, horizonMat);
    horizonMesh.position.set(0, 1.0, -3.8);
    contactGroup.add(horizonMesh);
    trackResource(horizonMesh, horizonMat, horizonGeo, horizonTex);

    // Contact Table & Interactive Console
    createBox(3.4, 0.14, 1.6, 0, -0.9, -0.6, matWalnutWood, contactGroup);
    [-1.4, 1.4].forEach((x) => {
      createBox(0.1, 0.9, 0.1, x, -1.35, -0.6, matBrushedBrass, contactGroup);
    });

    const { texture: contactConsoleTex } = makeTextCanvasTexture((ctx, w, h) => {
      ctx.fillStyle = "#0c0d12";
      ctx.roundRect(14, 14, w - 28, h - 28, 24);
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = "#e11d48";
      ctx.roundRect(14, 14, w - 28, h - 28, 24);
      ctx.stroke();

      ctx.fillStyle = "#e11d48";
      ctx.font = '700 22px "JetBrains Mono", monospace';
      ctx.fillText("OPEN DIRECT CHANNEL // REACH OUT", 42, 64);

      ctx.fillStyle = "#ffffff";
      ctx.font = '900 38px "Inter Tight", sans-serif';
      ctx.fillText("LET'S BUILD SOMETHING INTELLIGENT.", 42, 130);

      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.font = '400 22px "Inter Tight", sans-serif';
      ctx.fillText("Email: vermapavan9078@gmail.com", 42, 185);
      ctx.fillText("Location: Satna, Madhya Pradesh, India", 42, 222);

      ctx.fillStyle = "#00f0ff";
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillText("GITHUB: github.com/PavanvermaAKSU", 42, 280);
      ctx.fillText("LINKEDIN: linkedin.com/in/pavan-kumar-verma-19a42127", 42, 315);

      ctx.fillStyle = "#ffffff";
      ctx.font = '700 18px "JetBrains Mono", monospace';
      ctx.fillText("▶ CLICK TO OPEN CONTACT CONSOLE", 42, 385);
    }, 840, 440);

    const contactTabletGeo = new THREE.PlaneGeometry(1.8, 0.98);
    const contactTabletMat = new THREE.MeshStandardMaterial({
      map: contactConsoleTex,
      roughness: 0.35,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });
    const contactTablet = new THREE.Mesh(contactTabletGeo, contactTabletMat);
    contactTablet.position.set(0, -0.78, -0.55);
    contactTablet.rotation.x = -Math.PI / 2 + 0.25;
    contactTablet.userData = {
      type: "contact",
      data: {
        id: "contact",
        title: "Contact Pavan Kumar Verma",
        category: "Direct Inquiries",
        email: PERSONAL_INFO.email,
        github: PERSONAL_INFO.github,
        linkedin: PERSONAL_INFO.linkedin,
      },
      defaultPos: contactTablet.position.clone(),
      defaultRot: contactTablet.rotation.clone(),
    };
    contactGroup.add(contactTablet);
    interactiveObjects.push(contactTablet);
    trackResource(contactTablet, contactTabletMat, contactTabletGeo, contactConsoleTex);

    // --- 13. Atmospheric Floating Dust & Star Particles ---
    const particleCount = width < 600 ? 90 : 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 28;
      particlePositions[i + 1] = (Math.random() - 0.5) * 12 + 1;
      particlePositions[i + 2] = (Math.random() - 0.5) * 22;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.026,
      transparent: true,
      opacity: 0.45,
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    digitalStudio.add(dustParticles);
    trackResource(dustParticles, particleMat, particleGeo);

    // --- 14. Raycasting & Mouse Tracking ---
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

      if (sceneState.current.isDragging) {
        publishCursor("open", "DRAG");
        const deltaX = e.clientX - sceneState.current.dragStart.x;
        const deltaY = e.clientY - sceneState.current.dragStart.y;
        sceneState.current.orbitOffset.theta += deltaX * 0.0025;
        sceneState.current.orbitOffset.phi += deltaY * 0.0018;
        sceneState.current.orbitOffset.phi = Math.max(
          -0.35,
          Math.min(0.45, sceneState.current.orbitOffset.phi)
        );
        sceneState.current.dragStart.x = e.clientX;
        sceneState.current.dragStart.y = e.clientY;
      }
    };

    const onPointerDown = (e) => {
      if (e.target.closest("button, a, input, textarea, .bq-3d-hud-bar, .bq-modal")) return;
      sceneState.current.isDragging = true;
      setIsOrbiting(true);
      sceneState.current.dragStart.x = e.clientX;
      sceneState.current.dragStart.y = e.clientY;
    };

    const onPointerUp = (e) => {
      sceneState.current.isDragging = false;
      setIsOrbiting(false);
      publishCursor("default", "");

      // Raycast click
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, false);
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

    const onTouchStart = (e) => onPointerDown(e.touches[0]);
    const onTouchMove = (e) => onPointerMove(e.touches[0]);
    const onTouchEnd = () => onPointerUp({ target: renderer.domElement });

    const onScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = window.scrollY / maxScroll;
      sceneState.current.scrollProgress = progress;
      const activeCh = getActiveChapter(progress);
      setActiveZone(activeCh.id);
      sceneState.current.isAutonomousFlight = false;
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

    // --- 15. Main Animation & Physics Loop ---
    let frameId;
    const startedAt = performance.now();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (document.hidden) return;

      const elapsedTime = reducedMotion ? 0 : (performance.now() - startedAt) / 1000;
      const st = sceneState.current;

      // Smooth mouse spring
      st.mouse.x += (st.mouse.tx - st.mouse.x) * 0.055;
      st.mouse.y += (st.mouse.ty - st.mouse.y) * 0.055;

      const progress = st.scrollProgress;
      const isMobile = width < 850;

      if (experienceActiveRef.current) {
        st.entranceProgress += (1 - st.entranceProgress) * 0.045;
      } else {
        st.entranceProgress = 0;
      }

      // Determine Camera Waypoint
      let sceneCamX, sceneCamY, sceneCamZ;
      let sceneLookX, sceneLookY, sceneLookZ;

      if (st.isAutonomousFlight && st.flightTargetPos && st.flightTargetLook) {
        sceneCamX = st.flightTargetPos.x;
        sceneCamY = st.flightTargetPos.y;
        sceneCamZ = st.flightTargetPos.z;
        sceneLookX = st.flightTargetLook.x;
        sceneLookY = st.flightTargetLook.y;
        sceneLookZ = st.flightTargetLook.z;
      } else {
        const cameraState = getCameraState(progress, isMobile);
        [sceneCamX, sceneCamY, sceneCamZ] = cameraState.position;
        [sceneLookX, sceneLookY, sceneLookZ] = cameraState.target;
      }

      const baseCamX = THREE.MathUtils.lerp(0, sceneCamX, st.entranceProgress);
      const baseCamY = THREE.MathUtils.lerp(1.8, sceneCamY, st.entranceProgress);
      const baseCamZ = THREE.MathUtils.lerp(16, sceneCamZ, st.entranceProgress);
      const lookX = THREE.MathUtils.lerp(0, sceneLookX, st.entranceProgress);
      const lookY = THREE.MathUtils.lerp(0.8, sceneLookY, st.entranceProgress);
      const lookZ = THREE.MathUtils.lerp(0, sceneLookZ, st.entranceProgress);

      // Mouse Parallax & Drag Orbit Offset
      const parallax = reducedMotion ? 0 : 1;
      const finalCamX = baseCamX + st.mouse.x * 0.75 * parallax + st.orbitOffset.theta * 3.2 * parallax;
      const finalCamY = baseCamY - st.mouse.y * 0.45 * parallax + st.orbitOffset.phi * 2.2 * parallax;
      const finalCamZ = baseCamZ;

      // Project Focus Fly-to Zoom
      let focusStrength = 0;
      if (st.projectFocus.point) {
        const focusElapsed = (performance.now() - st.projectFocus.startedAt) / 1000;
        if (focusElapsed < 2.0) {
          focusStrength = Math.min(focusElapsed / 0.4, 1) * Math.min((2.0 - focusElapsed) / 0.5, 1);
        } else {
          st.projectFocus.point = null;
        }
      }

      const focusPoint = st.projectFocus.point;
      const desiredCamX = focusPoint
        ? THREE.MathUtils.lerp(finalCamX, focusPoint.x, focusStrength * 0.45)
        : finalCamX;
      const desiredCamY = focusPoint
        ? THREE.MathUtils.lerp(finalCamY, focusPoint.y + 0.35, focusStrength * 0.45)
        : finalCamY;
      const desiredCamZ = focusPoint
        ? THREE.MathUtils.lerp(finalCamZ, focusPoint.z + 4.2, focusStrength * 0.45)
        : finalCamZ;

      camera.position.x += (desiredCamX - camera.position.x) * 0.055;
      camera.position.y += (desiredCamY - camera.position.y) * 0.055;
      camera.position.z += (desiredCamZ - camera.position.z) * 0.055;

      const desiredLookX = focusPoint
        ? THREE.MathUtils.lerp(lookX, focusPoint.x, focusStrength * 0.55)
        : lookX;
      const desiredLookY = focusPoint
        ? THREE.MathUtils.lerp(lookY, focusPoint.y, focusStrength * 0.55)
        : lookY;
      const desiredLookZ = focusPoint
        ? THREE.MathUtils.lerp(lookZ, focusPoint.z, focusStrength * 0.55)
        : lookZ;

      currentLookAt.current.x += (desiredLookX - currentLookAt.current.x) * 0.055;
      currentLookAt.current.y += (desiredLookY - currentLookAt.current.y) * 0.055;
      currentLookAt.current.z += (desiredLookZ - currentLookAt.current.z) * 0.055;
      camera.lookAt(currentLookAt.current);

      // Execute dynamic animators
      dynamicAnimators.forEach((anim) => anim(elapsedTime));

      // Light pulses
      cyanRimLight.intensity = 4.0 + Math.sin(elapsedTime * 1.8) * 0.8;
      amberRimLight.intensity = 4.5 + Math.cos(elapsedTime * 1.6) * 0.7;
      // Portal entrance glow breathing
      portalGlow.intensity = 3.0 + Math.sin(elapsedTime * 2.2) * 1.2;
      portalFloorGlow.intensity = 1.8 + Math.cos(elapsedTime * 1.4 + 0.5) * 0.6;
      if (!reducedMotion) dustParticles.rotation.y = elapsedTime * 0.012;

      // Raycaster inspection
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObjects(interactiveObjects, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hoveredMesh !== hit) {
          if (hoveredMesh && hoveredMesh.userData.defaultPos) {
            hoveredMesh.position.copy(hoveredMesh.userData.defaultPos);
            hoveredMesh.rotation.copy(hoveredMesh.userData.defaultRot);
          }
          hoveredMesh = hit;
          setHoveredObjectInfo(hit.userData);

          const isProj = hit.userData.type === "project";
          const isSkill = hit.userData.type === "skill";
          const label = isProj ? "VIEW PROJECT" : isSkill ? "INSPECT" : "OPEN";
          publishCursor(isProj ? "view" : "open", label);
          soundFX.playHover();
        }

        // Lift & Tilt Hovered Mesh toward camera
        if (hit.userData.defaultPos) {
          hit.position.z = hit.userData.defaultPos.z + 0.28;
          hit.rotation.x = hit.userData.defaultRot.x + (st.mouse.y - 0.5) * 0.08;
          hit.rotation.y = hit.userData.defaultRot.y + (st.mouse.x - 0.5) * 0.08;
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
    <div
      className={`bq-3d-master-container ${
        webglUnavailable ? "is-webgl-unavailable" : ""
      }`}
    >
      {/* Three.js Canvas Container */}
      <div className="scroll-3d-canvas-container" ref={mountRef} />

      {webglUnavailable && (
        <div className="bq-webgl-fallback" role="status">
          <span>Interactive 3D is unavailable in this browser.</span>
          <a href="#work">Continue to selected work ↘</a>
        </div>
      )}

      {/* Floating 3D Navigation HUD / Spatial Waypoints */}
      <div
        className="bq-3d-hud-bar"
        role="navigation"
        aria-label="3D Spatial Studio Navigator"
      >
        <div className="bq-3d-hud-title">
          <Compass size={14} className="text-rose-500" />
          <span>STUDIO</span>
        </div>

        <div className="bq-3d-hud-actions">
          <button
            className={`bq-3d-hud-btn ${activeZone === "entrance" ? "is-active" : ""}`}
            onClick={() => flyToZone("entrance")}
            data-cursor="open"
            data-cursor-text="FOYER"
            title="Entrance Foyer"
          >
            <Home size={13} />
            <span>Foyer</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "living" ? "is-active" : ""}`}
            onClick={() => flyToZone("living")}
            data-cursor="open"
            data-cursor-text="ABOUT"
            title="Living Lounge / Identity"
          >
            <User size={13} />
            <span>About</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "devroom" ? "is-active" : ""}`}
            onClick={() => flyToZone("devroom")}
            data-cursor="open"
            data-cursor-text="WORKBENCH"
            title="Developer Studio Desk"
          >
            <Cpu size={13} />
            <span>Workbench</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "ailab" ? "is-active" : ""}`}
            onClick={() => flyToZone("ailab")}
            data-cursor="open"
            data-cursor-text="AI LAB"
            title="AI & Vision Lab (YOLOv8)"
          >
            <Sparkles size={13} />
            <span>AI Lab</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "gallery" ? "is-active" : ""}`}
            onClick={() => flyToZone("gallery")}
            data-cursor="open"
            data-cursor-text="PROJECTS"
            title="Project Exhibition Gallery"
          >
            <Layers size={13} />
            <span>Projects</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "library" ? "is-active" : ""}`}
            onClick={() => flyToZone("library")}
            data-cursor="open"
            data-cursor-text="JOURNEY"
            title="Library & Certifications"
          >
            <Award size={13} />
            <span>Journey</span>
          </button>

          <button
            className={`bq-3d-hud-btn ${activeZone === "contact" ? "is-active" : ""}`}
            onClick={() => flyToZone("contact")}
            data-cursor="open"
            data-cursor-text="CONTACT"
            title="Horizon Contact Studio"
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
            {hoveredObjectInfo.data?.title ||
              hoveredObjectInfo.data?.name ||
              "Interactive 3D Element"}
          </span>
          <span className="bq-raycast-cta">
            {hoveredObjectInfo.type === "project" ? "Click to view project ↗" : "Click to inspect ↗"}
          </span>
        </div>
      )}
    </div>
  );
}
