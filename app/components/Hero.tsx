"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Scene Setup ───
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.04); // Deep dark fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ─── Lighting ───
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const redLight = new THREE.PointLight(0xff1e1e, 2.5, 30);
    redLight.position.set(2, -2, 4);
    scene.add(redLight);

    const whiteLight = new THREE.PointLight(0xffffff, 1.2, 30);
    whiteLight.position.set(-5, 5, 5);
    scene.add(whiteLight);

    // ─── Materials ───
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.4,
      metalness: 0.8,
    });

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xff1e1e, // Electric Gym Red
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // ─── Center: Hexagonal Dumbbell ───
    const dumbbellGroup = new THREE.Group();

    const createDumbbellStructure = (material: THREE.Material, scaleMult: number = 1) => {
      const group = new THREE.Group();

      const handleGeo = new THREE.CylinderGeometry(0.25 * scaleMult, 0.25 * scaleMult, 3.6 * scaleMult, 16);
      handleGeo.rotateZ(Math.PI / 2);
      group.add(new THREE.Mesh(handleGeo, material));

      const platesConfig = [
        { r: 1.4, h: 0.6, x: 2.1 },
        { r: 1.8, h: 0.8, x: 2.9 },
        { r: 1.4, h: 0.6, x: -2.1 },
        { r: 1.8, h: 0.8, x: -2.9 },
      ];

      platesConfig.forEach((config) => {
        const plateGeo = new THREE.CylinderGeometry(config.r * scaleMult, config.r * scaleMult, config.h * scaleMult, 6);
        plateGeo.rotateZ(Math.PI / 2);
        plateGeo.rotateX(Math.PI / 6); 
        const plate = new THREE.Mesh(plateGeo, material);
        plate.position.x = config.x * scaleMult;
        group.add(plate);
      });

      return group;
    };

    dumbbellGroup.add(createDumbbellStructure(solidMat, 1));
    dumbbellGroup.add(createDumbbellStructure(wireMat, 1.02));
    dumbbellGroup.scale.set(2.5, 2.5, 2.5);
    scene.add(dumbbellGroup);

    // ─── Orbiting Object 1: Kettlebell ───
    const kettlebellOrbit = new THREE.Group();
    const kettlebellMesh = new THREE.Group();
    
    const createKettlebellStructure = (material: THREE.Material, scaleMult: number = 1) => {
      const group = new THREE.Group();
      // Base sphere
      const baseGeo = new THREE.SphereGeometry(0.8 * scaleMult, 32, 32);
      const base = new THREE.Mesh(baseGeo, material);
      group.add(base);
      // Handle
      const handleGeo = new THREE.TorusGeometry(0.55 * scaleMult, 0.15 * scaleMult, 16, 32, Math.PI);
      const handle = new THREE.Mesh(handleGeo, material);
      handle.position.y = 0.5 * scaleMult;
      group.add(handle);
      return group;
    };

    kettlebellMesh.add(createKettlebellStructure(solidMat, 1));
    kettlebellMesh.add(createKettlebellStructure(wireMat, 1.03));
    
    // Scale and position the kettlebell relative to its orbit center
    kettlebellMesh.scale.set(1.8, 1.8, 1.8);
    kettlebellOrbit.add(kettlebellMesh);
    scene.add(kettlebellOrbit);

    // ─── Orbiting Object 2: Weight Plate ───
    const plateOrbit = new THREE.Group();
    const plateMesh = new THREE.Group();

    const createPlateStructure = (material: THREE.Material, scaleMult: number = 1) => {
      const group = new THREE.Group();
      // Outer thick ring
      const ringGeo = new THREE.TorusGeometry(1.2 * scaleMult, 0.3 * scaleMult, 16, 64);
      const ring = new THREE.Mesh(ringGeo, material);
      group.add(ring);
      // Inner solid plate with a small center hole
      const innerGeo = new THREE.CylinderGeometry(0.9 * scaleMult, 0.9 * scaleMult, 0.1 * scaleMult, 32);
      innerGeo.rotateX(Math.PI / 2);
      const inner = new THREE.Mesh(innerGeo, material);
      group.add(inner);
      return group;
    };

    plateMesh.add(createPlateStructure(solidMat, 1));
    plateMesh.add(createPlateStructure(wireMat, 1.02));

    plateMesh.scale.set(2.5, 2.5, 2.5);
    plateOrbit.add(plateMesh);
    scene.add(plateOrbit);

    // ─── Speed / Movement Grid (The Floor) ───
    const gridHelper = new THREE.GridHelper(100, 100, 0xff1e1e, 0x1a0505);
    gridHelper.position.y = -5;
    gridHelper.material.transparent = true;
    gridHelper.material.opacity = 0.5;
    scene.add(gridHelper);

    // ─── Heat Embers / Sparks ───
    const particleCount = 800;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(particleCount * 3);
    const pSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 40;     // x
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 40; // z
      pSpeeds[i] = Math.random() * 0.05 + 0.01;
    }

    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xff3333,
      size: 0.08,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ─── Event Listeners ───
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    // ─── Animation Loop ───
    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      
      const t = frame * 0.01;
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Center Dumbbell Animation
      dumbbellGroup.rotation.y = t * 0.4;
      dumbbellGroup.rotation.x = Math.sin(t * 0.5) * 0.3; // Gentle rocking
      const mainScale = 1 + Math.sin(t * 3) * 0.03;       // Breathing pulse
      dumbbellGroup.scale.set(mainScale, mainScale, mainScale);

      // 2. Kettlebell Orbit & Spin

      const orbitRadius1 = 8.5;
      const orbitSpeed1 = t * 0.8;
      kettlebellOrbit.position.x = Math.cos(orbitSpeed1) * orbitRadius1;
      kettlebellOrbit.position.z = Math.sin(orbitSpeed1) * orbitRadius1;
      kettlebellOrbit.position.y = Math.sin(t * 2) * 0.8; // Bobbing up and down
      
      kettlebellMesh.rotation.x = t; // Spin on its own axis
      kettlebellMesh.rotation.y = t * 1.5;

      // 3. Weight Plate Orbit & Spin
      const orbitRadius2 = 15.5;
      const orbitSpeed2 = t * 0.5 + Math.PI; // Offset by 180 degrees
      plateOrbit.position.x = Math.cos(orbitSpeed2) * orbitRadius2;
      plateOrbit.position.z = Math.sin(orbitSpeed2) * orbitRadius2;
      plateOrbit.position.y = Math.cos(t * 1.5) * 0.8;
      
      plateMesh.rotation.x = t * 1.2;
      plateMesh.rotation.z = t * 0.8;

      // 4. Floor Grid Motion
      gridHelper.position.z = (t * 15) % 1;

      // 5. Embers Logic
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += pSpeeds[i];
        positions[i * 3] += Math.sin(t + i) * 0.01;
        if (positions[i * 3 + 1] > 10) {
          positions[i * 3 + 1] = -10;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // 6. Camera Parallax & Scroll Integration
      const targetZ = 12 - scroll * 0.015;
      camera.position.z += (targetZ - camera.position.z) * 0.1;
      
      camera.position.x += (mx * 3 - camera.position.x) * 0.05;
      camera.position.y += (my * 3 - camera.position.y) * 0.05;
      
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="gym-hero">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@400;700;900&display=swap');

        .gym-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 800px;
          background-color: #050505;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: none;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 0%, #050505 85%);
          z-index: 2;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 2rem;
          max-width: 1000px;
        }

        .hero-badge {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          color: #ff1e1e;
          text-transform: uppercase;
          border: 1px solid #ff1e1e;
          padding: 0.5rem 1.5rem;
          margin-bottom: 2rem;
          background: rgba(255, 30, 30, 0.05);
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-title {
          font-family: 'Teko', sans-serif;
          font-size: clamp(5rem, 15vw, 12rem);
          font-weight: 700;
          line-height: 0.85;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0;
          text-shadow: 0 10px 30px rgba(0,0,0,0.8);
          opacity: 0;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .hero-title .highlight {
          color: #ff1e1e;
        }

        .hero-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 400;
          color: #a0a0a0;
          margin: 2rem auto 3rem;
          max-width: 600px;
          line-height: 1.6;
          opacity: 0;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
          opacity: 0;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }

        .btn {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 1.2rem 3rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
        }

        .btn-primary {
          background-color: #ff1e1e;
          color: #050505;
          border: none;
        }

        .btn-primary:hover {
          background-color: #ffffff;
          color: #ff1e1e;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(255, 30, 30, 0.3);
        }

        .btn-secondary {
          background-color: transparent;
          color: #ffffff;
          border: 2px solid #333333;
        }

        .btn-secondary:hover {
          border-color: #ffffff;
          background-color: rgba(255,255,255,0.05);
          transform: translateY(-3px);
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-down {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) 1s forwards;
          z-index: 10;
        }

        .scroll-text {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: #ffffff;
          text-transform: uppercase;
          opacity: 0.5;
        }

        .scroll-line {
          width: 2px;
          height: 60px;
          background: linear-gradient(to bottom, #ff1e1e, transparent);
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scaleY(0.3); transform-origin: top; opacity: 0.2; }
          50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }

        @media (max-width: 600px) {
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <canvas ref={canvasRef} className="hero-canvas" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-badge">No Excuses</div>
        
        <h1 className="hero-title">
          Forge Your<br />
          <span className="highlight">Legacy</span>
        </h1>
        
        <p className="hero-subtitle">
          Elite personal training, state-of-the-art equipment, and a community built 
          on raw strength and resilience. Push beyond your limits.
        </p>
        
        <div className="hero-actions">
          <a href="/services" className="btn btn-primary">Join The Elite</a>
          <a href="/about" className="btn btn-secondary">Explore Facility</a>
        </div>
      </div>

      
    </section>
  );
}