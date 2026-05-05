"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ─── Data ────────────────────────────────────────────────────────────────────
const BRIDAL_PACKAGES = [
  {
    title: "The Ethereal Bride",
    desc: "A completely bespoke experience. Includes an in-depth consultation, trial styling, and flawless day-of execution with veil and accessory placement.",
    price: "From $350",
    icon: "🕊️"
  },
  {
    title: "The Bridal Party",
    desc: "Cohesive, elegant styling for your bridesmaids and mothers. We ensure your entire party looks radiant and photo-ready.",
    price: "From $120 / person",
    icon: "💐"
  },
  {
    title: "Pre-Wedding Rituals",
    desc: "Prepare your canvas. A series of restorative Silk Therapy hair masks, deep scalp massages, and glossing treatments in the weeks leading up to your day.",
    price: "Custom",
    icon: "✨"
  }
];

const BRIDAL_PROCESS = [
  { step: "01", title: "The Consultation", desc: "We sit down with a glass of champagne to discuss your vision, dress, venue, and aesthetic." },
  { step: "02", title: "The Trial", desc: "A collaborative session where we bring your vision to life, ensuring every curl and pin is exactly as you dreamed." },
  { step: "03", title: "The Wedding Day", desc: "Our team arrives to provide a serene, luxurious styling experience, staying until you walk down the aisle." }
];

// ─── Three.js Bridal Background (Pearls & Rose Gold Rings) ───────────────────
function ThreeBridalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    // Light pink fog to blend into the CSS background
    scene.fog = new THREE.FogExp2(0xfaf0f1, 0.03);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ── Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0f5, 1);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xe8b4b8, 2, 20);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    // ── Objects Array ──
    const objects: THREE.Mesh[] = [];

    // ── 1. Floating Pearls ──
    const pearlGeo = new THREE.SphereGeometry(0.15, 32, 32);
    // CHANGED: MeshPhysicalMaterial supports clearcoat for that realistic pearl shine
    const pearlMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    for (let i = 0; i < 40; i++) {
      const pearl = new THREE.Mesh(pearlGeo, pearlMat);
      const scale = Math.random() * 1.5 + 0.5;
      pearl.scale.setScalar(scale);
      pearl.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      );
      pearl.userData = {
        speedY: Math.random() * 0.01 + 0.005,
        speedX: (Math.random() - 0.5) * 0.005,
        baseY: pearl.position.y,
        offset: Math.random() * Math.PI * 2,
        isPearl: true
      };
      objects.push(pearl);
      scene.add(pearl);
    }

    // ── 2. Delicate Rose Gold Rings ──
    const ringGeo = new THREE.TorusGeometry(0.4, 0.01, 16, 50);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xd19ba3, // Rose gold/soft pink
      roughness: 0.2,
      metalness: 0.8,
    });

    for (let i = 0; i < 15; i++) {
      const ring = new THREE.Mesh(ringGeo, ringMat);
      const scale = Math.random() * 2 + 1;
      ring.scale.setScalar(scale);
      ring.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 2
      );
      ring.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      ring.userData = {
        speedY: Math.random() * 0.008 + 0.002,
        rotX: (Math.random() - 0.5) * 0.01,
        rotY: (Math.random() - 0.5) * 0.01,
        baseY: ring.position.y,
        offset: Math.random() * Math.PI * 2,
        isPearl: false
      };
      objects.push(ring);
      scene.add(ring);
    }

    // ── Event Listeners ──
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);
    
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation Loop ──
    let frame = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.01;
      const scroll = scrollRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      objects.forEach((obj) => {
        // Float upwards slowly
        obj.position.y += obj.userData.speedY;
        
        // Gentle wave motion
        obj.position.x += Math.sin(t + obj.userData.offset) * 0.005;

        // Reset position if it floats too high
        if (obj.position.y > 10) {
          obj.position.y = -10;
          obj.position.x = (Math.random() - 0.5) * 20;
        }

        // Rotate rings
        if (!obj.userData.isPearl) {
          obj.rotation.x += obj.userData.rotX;
          obj.rotation.y += obj.userData.rotY;
        }

        // Soft Mouse Repulsion
        const dx = obj.position.x - mx * 5;
        const dy = obj.position.y - my * 5;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) {
          obj.position.x += (dx / dist) * 0.01;
          obj.position.y += (dy / dist) * 0.01;
        }
      });

      // Camera parallax & scroll
      camera.position.y = -scroll * 5;
      camera.position.x = mx * 0.5;
      camera.lookAt(mx * 0.2, -scroll * 5, 0);

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
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

// ─── Animated Text Hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BridalPage() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorLarge, setCursorLarge] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@200;300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          /* Light Pink / Bridal Theme Variables */
          --bg-light: #faf0f1;           /* Very soft blush background */
          --bg-white: #ffffff;
          --primary: #d19ba3;            /* Soft pink accent */
          --primary-dark: #8f656b;       /* Dusty rose for headings */
          --text-main: #5c4a4d;          /* Deep muted rose-brown */
          --text-light: #8a787a;
          --glass-bg: rgba(255, 255, 255, 0.6);
          --glass-border: rgba(209, 155, 163, 0.2);
        }

        html { scroll-behavior: smooth; }

        body {
          background: linear-gradient(180deg, var(--bg-light) 0%, var(--bg-white) 100%);
          color: var(--text-main);
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        /* Custom cursor */
        .cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease, width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cursor-dot {
          width: 8px; height: 8px;
          background: var(--primary-dark);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }
        .cursor-ring {
          width: 45px; height: 45px;
          border: 1px solid var(--primary-dark);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.5s, height 0.5s, opacity 0.4s, transform 0.1s, background 0.4s;
        }
        .cursor-ring.large {
          width: 80px; height: 80px;
          opacity: 0.3;
          background: rgba(209, 155, 163, 0.15);
          border-color: transparent;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--bg-light); }
        ::-webkit-scrollbar-thumb { background: var(--primary); border-radius: 4px; }

        /* Reveal animations */
        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .reveal.revealed { opacity: 1; transform: translateY(0); }
        .reveal-delay-1 { transition-delay: 0.15s; }
        .reveal-delay-2 { transition-delay: 0.3s; }
        .reveal-delay-3 { transition-delay: 0.45s; }

        /* Glassmorphism utility */
        .glass-panel {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
        }

        /* Hero */
        .hero {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem 1.5rem;
        }
        
        .hero-badge {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--primary-dark);
          margin-bottom: 2rem;
          padding: 0.5rem 1.5rem;
          border: 1px solid var(--glass-border);
          border-radius: 30px;
          background: rgba(255,255,255,0.4);
          animation: fadeInDown 1.5s ease forwards;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3.5rem, 10vw, 8rem);
          font-weight: 400;
          line-height: 1.05;
          color: var(--primary-dark);
          animation: heroReveal 1.6s cubic-bezier(0.16,1,0.3,1) 0.3s both;
        }
        .hero-title em {
          font-style: italic;
          color: var(--primary);
        }

        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(50px); filter: blur(5px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }

        .hero-subtitle {
          max-width: 550px;
          margin: 2rem auto 0;
          font-size: clamp(1rem, 2vw, 1.15rem);
          font-weight: 300;
          color: var(--text-main);
          letter-spacing: 0.05em;
          line-height: 1.9;
          animation: heroReveal 1.6s cubic-bezier(0.16,1,0.3,1) 0.5s both;
        }

        .hero-btn {
          margin-top: 3.5rem;
          padding: 1.2rem 3.5rem;
          background: var(--primary-dark);
          color: var(--bg-white);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.25em;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          text-decoration: none;
          text-transform: uppercase;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s, background 0.4s;
          box-shadow: 0 10px 30px rgba(143, 101, 107, 0.2);
          animation: heroReveal 1.6s cubic-bezier(0.16,1,0.3,1) 0.7s both;
        }
        .hero-btn:hover {
          transform: translateY(-4px);
          background: #7a555a;
          box-shadow: 0 15px 40px rgba(143, 101, 107, 0.3);
        }

        /* Section Global */
        section {
          position: relative;
          z-index: 1;
          padding: 8rem 2rem;
        }

        .section-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .section-label {
          font-size: 0.65rem;
          font-weight: 500;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 1rem;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 400;
          color: var(--primary-dark);
          line-height: 1.2;
        }
        .section-title em { font-style: italic; color: var(--primary); }

        /* Packages Grid */
        .packages-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 3rem;
        }

        .package-card {
          padding: 4rem 3rem;
          text-align: center;
          transition: transform 0.5s ease, box-shadow 0.5s ease;
          position: relative;
          overflow: hidden;
        }
        
        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(209, 155, 163, 0.15);
        }

        .package-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          display: block;
        }

        .package-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: var(--primary-dark);
          margin-bottom: 1.2rem;
        }

        .package-desc {
          font-size: 0.95rem;
          font-weight: 300;
          color: var(--text-light);
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }

        .package-price {
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: var(--primary-dark);
          border-top: 1px solid var(--glass-border);
          padding-top: 1.5rem;
        }

        /* Journey/Process Section */
        .journey-section {
          background: rgba(255,255,255,0.4);
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
        }
        .journey-grid {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        .journey-step {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 2rem;
          align-items: start;
        }
        .step-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          font-style: italic;
          color: var(--primary);
          line-height: 1;
        }
        .step-content h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: var(--primary-dark);
          margin-bottom: 0.8rem;
        }
        .step-content p {
          font-weight: 300;
          color: var(--text-light);
          line-height: 1.8;
        }

        /* Booking CTA */
        .cta-section {
          text-align: center;
          padding: 10rem 2rem;
        }
        .cta-inner {
          max-width: 700px;
          margin: 0 auto;
          padding: 5rem 3rem;
        }
        .cta-subtitle {
          font-size: 1.1rem;
          font-weight: 300;
          color: var(--text-main);
          margin: 2rem 0 3.5rem;
          line-height: 1.9;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .journey-step { grid-template-columns: 1fr; text-align: center; gap: 1rem; }
          .step-num { font-size: 2.5rem; }
          body { cursor: auto; }
          .cursor { display: none; }
        }
      `}</style>

      {/* Custom Cursor */}
      <div
        className="cursor cursor-dot"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div
        className={`cursor cursor-ring ${cursorLarge ? "large" : ""}`}
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {/* CHANGED: Correct Component Called Here */}
      <ThreeBridalBackground />

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-badge">Aasiya's Bridal</div>
        
        <h1 className="hero-title">
          RADIANCE FOR<br /><em>Your Perfect Day</em>
        </h1>

        <p className="hero-subtitle">
          Bespoke bridal artistry tailored to your unique elegance. We bring a 
          sense of calm, luxury, and flawless execution to your wedding morning.
        </p>

        <a href="#consultation" className="hero-btn"
          onMouseEnter={() => setCursorLarge(true)}
          onMouseLeave={() => setCursorLarge(false)}>
          Inquire Now
        </a>
      </section>

      {/* ── Packages ── */}
      <section id="packages">
        <div className="section-header reveal">
          <p className="section-label">Curated Offerings</p>
          <h2 className="section-title">
            Bridal <em>Collections</em>
          </h2>
        </div>

        <div className="packages-grid">
          {BRIDAL_PACKAGES.map((pkg, i) => (
            <div 
              key={pkg.title} 
              className={`package-card glass-panel reveal reveal-delay-${i + 1}`}
              onMouseEnter={() => setCursorLarge(true)}
              onMouseLeave={() => setCursorLarge(false)}
            >
              <span className="package-icon">{pkg.icon}</span>
              <h3 className="package-title">{pkg.title}</h3>
              <p className="package-desc">{pkg.desc}</p>
              <div className="package-price">{pkg.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Journey ── */}
      <section className="journey-section" id="journey">
        <div className="section-header reveal">
          <p className="section-label">The Experience</p>
          <h2 className="section-title">
            Your Bridal <em>Journey</em>
          </h2>
        </div>

        <div className="journey-grid">
          {BRIDAL_PROCESS.map((step, i) => (
            <div key={step.step} className={`journey-step reveal reveal-delay-${i + 1}`}>
              <div className="step-num">{step.step}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking CTA ── */}
      <section className="cta-section" id="consultation">
        <div className="cta-inner glass-panel reveal">
          <p className="section-label reveal reveal-delay-1">Let's Connect</p>
          <h2 className="section-title reveal reveal-delay-2">
            Secure Your <em>Date</em>
          </h2>
          <p className="cta-subtitle reveal reveal-delay-3">
            Our bridal calendar is highly exclusive to ensure every bride receives 
            our undivided attention. Reach out to check our availability and schedule 
            your complimentary consultation.
          </p>
          <div className="reveal reveal-delay-3">
            <a 
              href="mailto:bridal@aasiyaslounge.com" 
              className="hero-btn"
              style={{ display: "inline-block", marginTop: "0" }}
              onMouseEnter={() => setCursorLarge(true)}
              onMouseLeave={() => setCursorLarge(false)}
            >
              Request Availability
            </a>
          </div>
        </div>
      </section>
    </>
  );
}