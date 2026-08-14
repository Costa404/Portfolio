import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useVisualFX, COLOR_PALETTES } from "../context/VisualFXContext";

export const VisualFXCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { mode, theme, particleSpeed, mouseInteraction, clickRipple } = useVisualFX();

  // Mouse tracking (normalized -1 to +1)
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const scrollRef = useRef<{ y: number; velY: number }>({ y: 0, velY: 0 });
  const createShockwaveRef = useRef<((x: number, y: number) => void) | null>(null);

  const modeRef = useRef(mode);
  const themeRef = useRef(theme);
  const speedRef = useRef(particleSpeed);
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
    mouseInteractionRef.current = mouseInteraction;
  }, [mouseInteraction]);

  // Handle Mouse movement & Scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
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

  // Three.js Setup & Main Render Loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030406, 0.025);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    container.appendChild(renderer.domElement);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 40);
    pointLight.position.set(0, 10, 10);
    scene.add(pointLight);

    // Create Soft Glow Texture for Minimal Particles
    const createDotTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const dotTexture = createDotTexture();
    const palette = COLOR_PALETTES[themeRef.current];

    // ==========================================
    // EFFECT 1: TOPOLOGICAL SILK GRID MATRIX
    // ==========================================
    const gridCols = 45;
    const gridRows = 35;
    const gridCount = gridCols * gridRows;
    const silkGeo = new THREE.BufferGeometry();
    const silkPositions = new Float32Array(gridCount * 3);
    const silkColors = new Float32Array(gridCount * 3);

    let idx = 0;
    const gridSpacingX = 0.8;
    const gridSpacingY = 0.6;
    const offsetX = (gridCols * gridSpacingX) / 2;
    const offsetY = (gridRows * gridSpacingY) / 2;

    for (let r = 0; r < gridRows; r++) {
      for (let c = 0; c < gridCols; c++) {
        const i3 = idx * 3;
        silkPositions[i3] = c * gridSpacingX - offsetX;
        silkPositions[i3 + 1] = r * gridSpacingY - offsetY;
        silkPositions[i3 + 2] = 0;

        silkColors[i3] = palette.rgbPrimary[0];
        silkColors[i3 + 1] = palette.rgbPrimary[1];
        silkColors[i3 + 2] = palette.rgbPrimary[2];
        idx++;
      }
    }

    silkGeo.setAttribute("position", new THREE.BufferAttribute(silkPositions, 3));
    silkGeo.setAttribute("color", new THREE.BufferAttribute(silkColors, 3));

    const silkMat = new THREE.PointsMaterial({
      size: 0.22,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const silkPoints = new THREE.Points(silkGeo, silkMat);
    silkPoints.rotation.x = -Math.PI / 4;
    silkPoints.position.set(0, -2, -2);
    scene.add(silkPoints);

    // Hairline Wireframe Mesh linking Silk Grid
    const silkLinesGeo = new THREE.BufferGeometry();
    const maxGridLines = gridCount * 4;
    const silkLinePositions = new Float32Array(maxGridLines * 6);
    const silkLineColors = new Float32Array(maxGridLines * 6);
    silkLinesGeo.setAttribute("position", new THREE.BufferAttribute(silkLinePositions, 3));
    silkLinesGeo.setAttribute("color", new THREE.BufferAttribute(silkLineColors, 3));

    const silkLineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const silkLines = new THREE.LineSegments(silkLinesGeo, silkLineMat);
    silkPoints.add(silkLines);

    // ==========================================
    // EFFECT 2: KINETIC GEOMETRY (FLOATING WIREFRAMES)
    // ==========================================
    const kineticGroup = new THREE.Group();
    
    // Polyhedron 1: Sleek Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(3, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.primary),
      wireframe: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(7, 2, -4);
    kineticGroup.add(icoMesh);

    // Polyhedron 2: Minimal Octahedron
    const octaGeo = new THREE.OctahedronGeometry(2.2, 0);
    const octaMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.secondary),
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    octaMesh.position.set(-7, -3, -3);
    kineticGroup.add(octaMesh);

    // Polyhedron 3: Torus Ring Wireframe
    const ringGeo = new THREE.TorusGeometry(3.5, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(palette.primary),
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.position.set(0, 1, -6);
    kineticGroup.add(ringMesh);

    kineticGroup.visible = false;
    scene.add(kineticGroup);

    // ==========================================
    // EFFECT 3: MINIMAL DUST PARTICLES
    // ==========================================
    const dustCount = 450;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustVelocities = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      const i3 = i * 3;
      dustPositions[i3] = (Math.random() - 0.5) * 35;
      dustPositions[i3 + 1] = (Math.random() - 0.5) * 35;
      dustPositions[i3 + 2] = (Math.random() - 0.5) * 25;

      dustVelocities[i3] = (Math.random() - 0.5) * 0.008;
      dustVelocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
      dustVelocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      dustColors[i3] = palette.rgbPrimary[0];
      dustColors[i3 + 1] = palette.rgbPrimary[1];
      dustColors[i3 + 2] = palette.rgbPrimary[2];
    }

    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute("color", new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.25,
      map: dotTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustPoints = new THREE.Points(dustGeo, dustMat);
    dustPoints.visible = false;
    scene.add(dustPoints);

    // ==========================================
    // EFFECT 4: SHOCKWAVES
    // ==========================================
    const shockwaves: { mesh: THREE.Mesh; opacity: number; scale: number }[] = [];
    const shockGeo = new THREE.RingGeometry(0.1, 0.35, 32);

    const createShockwave = (worldX: number, worldY: number) => {
      const shockMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(COLOR_PALETTES[themeRef.current].primary),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      shockMesh.position.set(worldX, worldY, 2);
      scene.add(shockMesh);
      shockwaves.push({ mesh: shockMesh, opacity: 0.5, scale: 1 });
    };

    createShockwaveRef.current = createShockwave;

    // ==========================================
    // RENDER ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const currentMode = modeRef.current;
      const currentPalette = COLOR_PALETTES[themeRef.current];
      const speed = speedRef.current;

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Update palette colors
      icoMat.color.set(currentPalette.primary);
      octaMat.color.set(currentPalette.secondary);
      ringMat.color.set(currentPalette.primary);
      silkLineMat.color.set(currentPalette.primary);
      pointLight.color.set(currentPalette.primary);

      // Camera soft parallax
      camera.position.x = mouseRef.current.x * 0.8;
      camera.position.y = mouseRef.current.y * 0.8;
      camera.lookAt(0, 0, 0);

      // Visibility toggles
      silkPoints.visible = currentMode === "silk" || currentMode === "horizon";
      kineticGroup.visible = currentMode === "kinetic";
      dustPoints.visible = currentMode === "dust";

      // 1. SILK TOPOLOGICAL WAVE MATRIX ANIMATION
      if (silkPoints.visible) {
        const posAttr = silkGeo.attributes.position;
        const colAttr = silkGeo.attributes.color;
        const linePosArr = silkLinesGeo.attributes.position.array as Float32Array;
        const lineColArr = silkLinesGeo.attributes.color.array as Float32Array;

        const mouseWorldX = mouseRef.current.x * 12;
        const mouseWorldY = mouseRef.current.y * 8;

        let lineIdx = 0;

        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            const index = r * gridCols + c;

            const u = posAttr.getX(index);
            const v = posAttr.getY(index);

            // Natural organic topological wave formula
            let waveZ =
              Math.sin(u * 0.25 + elapsedTime * 1.2 * speed) * 0.7 +
              Math.cos(v * 0.3 + elapsedTime * 1.0 * speed) * 0.6 +
              Math.sin((u + v) * 0.15 + elapsedTime * 0.8) * 0.4;

            // Mouse proximity ripple height boost
            if (mouseInteractionRef.current) {
              const dx = u - mouseWorldX;
              const dy = v - mouseWorldY;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 4) {
                const mouseForce = (4 - dist) / 4;
                waveZ += Math.sin(dist * 2.5 - elapsedTime * 4) * mouseForce * 1.2;
              }
            }

            posAttr.setZ(index, waveZ);

            // Color gradient mapped to height
            const heightMix = (waveZ + 1.5) / 3;
            colAttr.setXYZ(
              index,
              THREE.MathUtils.lerp(currentPalette.rgbSecondary[0], currentPalette.rgbPrimary[0], heightMix),
              THREE.MathUtils.lerp(currentPalette.rgbSecondary[1], currentPalette.rgbPrimary[1], heightMix),
              THREE.MathUtils.lerp(currentPalette.rgbSecondary[2], currentPalette.rgbPrimary[2], heightMix)
            );

            // Build grid wireframe connections to right & top neighbors
            if (c < gridCols - 1 && lineIdx < maxGridLines - 1) {
              const rightIndex = index + 1;
              const lIdx = lineIdx * 6;

              linePosArr[lIdx] = posAttr.getX(index);
              linePosArr[lIdx + 1] = posAttr.getY(index);
              linePosArr[lIdx + 2] = waveZ;

              linePosArr[lIdx + 3] = posAttr.getX(rightIndex);
              linePosArr[lIdx + 4] = posAttr.getY(rightIndex);
              linePosArr[lIdx + 5] = posAttr.getZ(rightIndex);

              lineColArr[lIdx] = currentPalette.rgbPrimary[0] * 0.3;
              lineColArr[lIdx + 1] = currentPalette.rgbPrimary[1] * 0.3;
              lineColArr[lIdx + 2] = currentPalette.rgbPrimary[2] * 0.3;

              lineColArr[lIdx + 3] = currentPalette.rgbPrimary[0] * 0.3;
              lineColArr[lIdx + 4] = currentPalette.rgbPrimary[1] * 0.3;
              lineColArr[lIdx + 5] = currentPalette.rgbPrimary[2] * 0.3;
              lineIdx++;
            }

            if (r < gridRows - 1 && lineIdx < maxGridLines - 1) {
              const topIndex = index + gridCols;
              const lIdx = lineIdx * 6;

              linePosArr[lIdx] = posAttr.getX(index);
              linePosArr[lIdx + 1] = posAttr.getY(index);
              linePosArr[lIdx + 2] = waveZ;

              linePosArr[lIdx + 3] = posAttr.getX(topIndex);
              linePosArr[lIdx + 4] = posAttr.getY(topIndex);
              linePosArr[lIdx + 5] = posAttr.getZ(topIndex);

              lineColArr[lIdx] = currentPalette.rgbPrimary[0] * 0.3;
              lineColArr[lIdx + 1] = currentPalette.rgbPrimary[1] * 0.3;
              lineColArr[lIdx + 2] = currentPalette.rgbPrimary[2] * 0.3;

              lineColArr[lIdx + 3] = currentPalette.rgbPrimary[0] * 0.3;
              lineColArr[lIdx + 4] = currentPalette.rgbPrimary[1] * 0.3;
              lineColArr[lIdx + 5] = currentPalette.rgbPrimary[2] * 0.3;
              lineIdx++;
            }
          }
        }

        posAttr.needsUpdate = true;
        colAttr.needsUpdate = true;
        silkLinesGeo.setDrawRange(0, lineIdx * 2);
        silkLinesGeo.attributes.position.needsUpdate = true;
        silkLinesGeo.attributes.color.needsUpdate = true;
      }

      // 2. KINETIC GEOMETRY ANIMATION
      if (currentMode === "kinetic") {
        icoMesh.rotation.x = elapsedTime * 0.12 * speed;
        icoMesh.rotation.y = elapsedTime * 0.15 * speed;

        octaMesh.rotation.x = -elapsedTime * 0.18 * speed;
        octaMesh.rotation.z = elapsedTime * 0.1 * speed;

        ringMesh.rotation.z = elapsedTime * 0.08 * speed;

        kineticGroup.rotation.y = mouseRef.current.x * 0.2;
        kineticGroup.rotation.x = -mouseRef.current.y * 0.2;
      }

      // 3. MINIMAL DUST ANIMATION
      if (currentMode === "dust") {
        const dustPosAttr = dustGeo.attributes.position;
        for (let i = 0; i < dustCount; i++) {
          const i3 = i * 3;
          dustPositions[i3] += dustVelocities[i3] * speed;
          dustPositions[i3 + 1] += dustVelocities[i3 + 1] * speed + scrollRef.current.velY * 0.01;
          dustPositions[i3 + 2] += dustVelocities[i3 + 2] * speed;

          if (Math.abs(dustPositions[i3]) > 18) dustVelocities[i3] *= -1;
          if (Math.abs(dustPositions[i3 + 1]) > 18) dustVelocities[i3 + 1] *= -1;
          if (Math.abs(dustPositions[i3 + 2]) > 14) dustVelocities[i3 + 2] *= -1;
        }
        dustPosAttr.needsUpdate = true;
      }

      // 4. SHOCKWAVE ANIMATION
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 0.3;
        sw.opacity -= 0.02;
        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        (sw.mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          (sw.mesh.material as THREE.Material).dispose();
          shockwaves.splice(i, 1);
        }
      }

      scrollRef.current.velY *= 0.92;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      silkGeo.dispose();
      silkMat.dispose();
      silkLinesGeo.dispose();
      silkLineMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      dotTexture.dispose();
      shockGeo.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Trigger shockwave on click ripple
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
        background: `radial-gradient(circle at 50% 25%, ${COLOR_PALETTES[theme].background} 0%, #020304 100%)`,
      }}
    />
  );
};
