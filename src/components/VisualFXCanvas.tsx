import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useVisualFX, COLOR_PALETTES } from "../context/VisualFXContext";

export const VisualFXCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode, theme, particleSpeed, particleDensity, mouseInteraction, clickRipple } = useVisualFX();

  // Track mouse coordinates
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number; px: number; py: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    px: 0,
    py: 0,
  });

  const scrollRef = useRef<{ y: number; velY: number }>({ y: 0, velY: 0 });
  const createShockwaveRef = useRef<((x: number, y: number) => void) | null>(null);

  // Store active mode and theme in refs for animation loop access
  const modeRef = useRef(mode);
  const themeRef = useRef(theme);
  const speedRef = useRef(particleSpeed);
  const densityRef = useRef(particleDensity);
  const mouseInteractionRef = useRef(mouseInteraction);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    speedRef.current = particleSpeed;
  }, [particleSpeed]);

  useEffect(() => {
    densityRef.current = particleDensity;
  }, [particleDensity]);

  useEffect(() => {
    mouseInteractionRef.current = mouseInteraction;
  }, [mouseInteraction]);

  // Handle Mouse movement & Scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const nx = (e.clientX / windowWidth) * 2 - 1;
      const ny = -(e.clientY / windowHeight) * 2 + 1;

      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
      mouseRef.current.px = e.clientX;
      mouseRef.current.py = e.clientY;
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentY = window.scrollY;
      scrollRef.current.velY = (currentY - lastScrollY) * 0.05;
      scrollRef.current.y = currentY;
      lastScrollY = currentY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Main Three.js Scene Setup & Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // 2. Lights Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x6366f1, 3, 35);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 2, 35);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // Create Circular Glow Canvas Texture for particles
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.2)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    // 3. PARTICLE SYSTEM
    const particleCount = densityRef.current === "low" ? 700 : densityRef.current === "medium" ? 1400 : 2200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = COLOR_PALETTES[themeRef.current];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 30;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Blend primary & secondary palette colors
      const mixRatio = Math.random();
      colors[i3] = THREE.MathUtils.lerp(palette.rgbPrimary[0], palette.rgbSecondary[0], mixRatio);
      colors[i3 + 1] = THREE.MathUtils.lerp(palette.rgbPrimary[1], palette.rgbSecondary[1], mixRatio);
      colors[i3 + 2] = THREE.MathUtils.lerp(palette.rgbPrimary[2], palette.rgbSecondary[2], mixRatio);
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. LINE NETWORK (Constellation Mesh)
    const maxConnections = particleCount * 2;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineMesh = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineMesh);

    // 5. MORPHING 3D HOLOGRAM POLYHEDRON (Floating Core)
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 2);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(palette.primary),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.set(6, 2, -5);
    scene.add(coreMesh);

    // Inner glowing core
    const innerCoreGeo = new THREE.TorusKnotGeometry(1.8, 0.4, 64, 16);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.secondary),
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreMesh.add(innerCoreMesh);

    // 6. AURORA 3D UNDULATING WAVE PLANE
    const auroraGeo = new THREE.PlaneGeometry(50, 40, 50, 40);
    const auroraMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.primary),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const auroraMesh = new THREE.Mesh(auroraGeo, auroraMat);
    auroraMesh.rotation.x = -Math.PI / 3;
    auroraMesh.position.set(0, -6, -2);
    auroraMesh.visible = false;
    scene.add(auroraMesh);

    // 7. PLASMA ORBS
    const plasmaGroup = new THREE.Group();
    const orbGeom = new THREE.SphereGeometry(0.8, 32, 32);
    const orbs: { mesh: THREE.Mesh; orbitSpeed: number; orbitRadius: number; phase: number }[] = [];

    for (let i = 0; i < 5; i++) {
      const orbMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(i % 2 === 0 ? palette.primary : palette.secondary),
        emissive: new THREE.Color(i % 2 === 0 ? palette.primary : palette.secondary),
        emissiveIntensity: 0.6,
        roughness: 0.1,
        metalness: 0.9,
        transparent: true,
        opacity: 0.7,
      });
      const orb = new THREE.Mesh(orbGeom, orbMat);
      const orbitRadius = 6 + i * 2.5;
      const phase = (i * Math.PI * 2) / 5;
      orb.position.set(Math.cos(phase) * orbitRadius, Math.sin(phase) * 3, Math.sin(phase) * orbitRadius - 5);
      plasmaGroup.add(orb);
      orbs.push({ mesh: orb, orbitSpeed: 0.3 + i * 0.1, orbitRadius, phase });
    }
    plasmaGroup.visible = false;
    scene.add(plasmaGroup);

    // 8. SHOCKWAVE SYSTEM
    const shockwaves: { mesh: THREE.Mesh; opacity: number; scale: number }[] = [];
    const shockGeo = new THREE.RingGeometry(0.1, 0.4, 32);

    const createShockwave = (worldX: number, worldY: number) => {
      const shockMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR_PALETTES[themeRef.current].secondary),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      shockMesh.position.set(worldX, worldY, 2);
      scene.add(shockMesh);
      shockwaves.push({ mesh: shockMesh, opacity: 0.9, scale: 1 });
    };

    createShockwaveRef.current = createShockwave;

    // 9. ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentMode = modeRef.current;
      const currentPalette = COLOR_PALETTES[themeRef.current];
      const speed = speedRef.current;

      // Smooth mouse interpolation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Update lights colors to active palette
      pointLight1.color.set(currentPalette.primary);
      pointLight2.color.set(currentPalette.secondary);
      coreMat.color.set(currentPalette.primary);
      innerCoreMat.color.set(currentPalette.secondary);
      auroraMat.color.set(currentPalette.primary);

      // Camera parallax subtly follows mouse
      camera.position.x = mouseRef.current.x * 1.2;
      camera.position.y = mouseRef.current.y * 1.2;
      camera.lookAt(0, 0, 0);

      // --- Mode Specific Visibility & Behavior ---
      auroraMesh.visible = currentMode === "aurora";
      plasmaGroup.visible = currentMode === "plasma";
      coreMesh.visible = currentMode === "nebula" || currentMode === "aurora";

      // 1. Core Polyhedron Animation
      if (coreMesh.visible) {
        coreMesh.rotation.x = elapsedTime * 0.15 * speed;
        coreMesh.rotation.y = elapsedTime * 0.2 * speed;
        innerCoreMesh.rotation.z = -elapsedTime * 0.3 * speed;
        coreMesh.position.y = 2 + Math.sin(elapsedTime * 1.5) * 0.4;
      }

      // 2. Aurora Wave Animation
      if (currentMode === "aurora") {
        const posAttr = auroraGeo.attributes.position;
        for (let i = 0; i < posAttr.count; i++) {
          const u = posAttr.getX(i);
          const v = posAttr.getY(i);
          const z =
            Math.sin(u * 0.2 + elapsedTime * 1.5 * speed) * 1.2 +
            Math.cos(v * 0.2 + elapsedTime * 1.2 * speed) * 1.2 +
            Math.sin((u + v) * 0.1 + mouseRef.current.x * 2) * 0.8;
          posAttr.setZ(i, z);
        }
        posAttr.needsUpdate = true;
      }

      // 3. Plasma Orbs Animation
      if (currentMode === "plasma") {
        plasmaGroup.rotation.y = elapsedTime * 0.2 * speed;
        orbs.forEach((orbObj) => {
          const angle = elapsedTime * orbObj.orbitSpeed * speed + orbObj.phase;
          orbObj.mesh.position.x = Math.cos(angle) * orbObj.orbitRadius;
          orbObj.mesh.position.z = Math.sin(angle) * orbObj.orbitRadius;
          orbObj.mesh.position.y = Math.sin(angle * 2 + elapsedTime) * 1.8;
        });
      }

      // 4. Particle Animation & Physics
      const posAttribute = particleGeo.attributes.position;
      const mouseWorldX = mouseRef.current.x * 15;
      const mouseWorldY = mouseRef.current.y * 10;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        if (currentMode === "hyperdrive") {
          // Hyperdrive Tunnel Zoom
          positions[i3 + 2] += (0.25 + Math.abs(scrollRef.current.velY) * 0.5) * speed;
          if (positions[i3 + 2] > 20) {
            positions[i3 + 2] = -30;
            positions[i3] = (Math.random() - 0.5) * 35;
            positions[i3 + 1] = (Math.random() - 0.5) * 35;
          }
        } else {
          // Nebula / Aurora / Plasma Drift
          positions[i3] += velocities[i3] * speed;
          positions[i3 + 1] += velocities[i3 + 1] * speed + scrollRef.current.velY * 0.02;
          positions[i3 + 2] += velocities[i3 + 2] * speed;

          // Boundary checks & soft bounce
          if (Math.abs(positions[i3]) > 20) velocities[i3] *= -1;
          if (Math.abs(positions[i3 + 1]) > 18) velocities[i3 + 1] *= -1;
          if (Math.abs(positions[i3 + 2]) > 18) velocities[i3 + 2] *= -1;

          // Mouse Gravitational / Repulsion Physics
          if (mouseInteractionRef.current) {
            const dx = positions[i3] - mouseWorldX;
            const dy = positions[i3 + 1] - mouseWorldY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 4.5) {
              const force = (4.5 - dist) / 4.5;
              positions[i3] += (dx / dist) * force * 0.25;
              positions[i3 + 1] += (dy / dist) * force * 0.25;
            }
          }
        }
      }

      posAttribute.needsUpdate = true;

      // 5. Constellation Line Network Updates (Nebula Mode)
      if (currentMode === "nebula") {
        let lineIdx = 0;
        const linePosArray = lineGeo.attributes.position.array as Float32Array;
        const lineColArray = lineGeo.attributes.color.array as Float32Array;

        const maxDist = 2.4;
        const step = densityRef.current === "high" ? 2 : 1;

        for (let i = 0; i < particleCount; i += step) {
          const i3 = i * 3;
          for (let j = i + 1; j < particleCount; j += step * 2) {
            const j3 = j * 3;
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < maxDist && lineIdx < maxConnections - 1) {
              const alpha = 1 - dist / maxDist;
              const lPosIdx = lineIdx * 6;

              linePosArray[lPosIdx] = positions[i3];
              linePosArray[lPosIdx + 1] = positions[i3 + 1];
              linePosArray[lPosIdx + 2] = positions[i3 + 2];

              linePosArray[lPosIdx + 3] = positions[j3];
              linePosArray[lPosIdx + 4] = positions[j3 + 1];
              linePosArray[lPosIdx + 5] = positions[j3 + 2];

              // Color glow
              lineColArray[lPosIdx] = currentPalette.rgbPrimary[0] * alpha;
              lineColArray[lPosIdx + 1] = currentPalette.rgbPrimary[1] * alpha;
              lineColArray[lPosIdx + 2] = currentPalette.rgbPrimary[2] * alpha;

              lineColArray[lPosIdx + 3] = currentPalette.rgbSecondary[0] * alpha;
              lineColArray[lPosIdx + 4] = currentPalette.rgbSecondary[1] * alpha;
              lineColArray[lPosIdx + 5] = currentPalette.rgbSecondary[2] * alpha;

              lineIdx++;
            }
          }
        }
        lineGeo.setDrawRange(0, lineIdx * 2);
        lineGeo.attributes.position.needsUpdate = true;
        lineGeo.attributes.color.needsUpdate = true;
        lineMesh.visible = true;
      } else {
        lineMesh.visible = false;
      }

      // 6. Shockwaves Animation
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 0.4;
        sw.opacity -= 0.025;
        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        (sw.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          (sw.mesh.material as THREE.Material).dispose();
          shockwaves.splice(i, 1);
        }
      }

      // Decay scroll velocity dampening
      scrollRef.current.velY *= 0.92;

      renderer.render(scene, camera);
    };

    animate();

    // 10. Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Clean up WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      auroraGeo.dispose();
      auroraMat.dispose();
      orbGeom.dispose();
      shockGeo.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Trigger shockwave when click Ripple updates
  useEffect(() => {
    if (clickRipple && createShockwaveRef.current) {
      const worldX = (clickRipple.x / window.innerWidth) * 20 - 10;
      const worldY = -(clickRipple.y / window.innerHeight) * 12 + 6;
      createShockwaveRef.current(worldX, worldY);
    }
  }, [clickRipple]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden transition-opacity duration-1000"
      style={{
        background: `radial-gradient(circle at 50% 30%, ${COLOR_PALETTES[theme].background} 0%, #030407 100%)`,
      }}
    />
  );
};
