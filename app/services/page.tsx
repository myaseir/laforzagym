"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────
const ELITE_SERVICES = [
  {
    id: "01",
    title: "Hypertrophy Lab",
    desc: "Science-based muscle growth protocols. We use data-driven tracking and periodization to ensure you bypass every plateau.",
    features: ["Bi-weekly Body Scans", "Custom Nutrition", "Form Analysis"],
    price: "PKR 15,000/mo"
  },
  {
    id: "02",
    title: "Tactical Conditioning",
    desc: "Built for those who need to move as well as they lift. High-intensity sessions designed for speed, agility, and endurance.",
    features: ["VO2 Max Testing", "Functional Strength", "Agility Drills"],
    price: "PKR 12,500/mo"
  },
  {
    id: "03",
    title: "Olympic Forge",
    desc: "Master the Snatch and Clean & Jerk. Our certified coaches focus on explosive power and technical perfection.",
    features: ["Platform Priority", "Video Review", "Mobility Work"],
    price: "PKR 20,000/mo"
  },
  {
    id: "04",
    title: "The Recovery Suite",
    desc: "Recovery is where the growth happens. Access our cryotherapy, infrared saunas, and targeted compression gear.",
    features: ["Cryo Access", "Massage Therapy", "Stretch Zone"],
    price: "PKR 8,500/mo"
  }
];

// ─── Three.js Realistic Silhouette Bodybuilder ───────────────────────────────
function RealisticBodybuilder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.06);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 10);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // ── High-Contrast Lighting ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);

    const redKeyLight = new THREE.PointLight(0xff1e1e, 15, 30);
    redKeyLight.position.set(5, 5, 5);
    scene.add(redKeyLight);

    const blueFillLight = new THREE.PointLight(0x4444ff, 5, 20);
    blueFillLight.position.set(-5, 2, 2);
    scene.add(blueFillLight);

    // ── Anatomical Model Group ──
    const body = new THREE.Group();
    const skinMat = new THREE.MeshStandardMaterial({ 
        color: 0x080808, 
        metalness: 0.8, 
        roughness: 0.3 
    });

    const addPart = (geo: THREE.BufferGeometry, pos: [number, number, number], rot: [number, number, number] = [0,0,0]) => {
      const mesh = new THREE.Mesh(geo, skinMat);
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      body.add(mesh);
    };

    // 1. Torso & Abs (Tapered)
    addPart(new THREE.CylinderGeometry(1.2, 0.6, 2.5, 32), [0, 2.5, 0]);
    // 2. Lats (Back Width)
    addPart(new THREE.SphereGeometry(1, 32, 16), [0, 3.2, -0.2], [0, 0, 0]);
    // 3. Pectorals (Chest)
    addPart(new THREE.CapsuleGeometry(0.5, 0.7, 4, 16), [0.45, 3.5, 0.5], [0, 0, Math.PI/2]);
    addPart(new THREE.CapsuleGeometry(0.5, 0.7, 4, 16), [-0.45, 3.5, 0.5], [0, 0, Math.PI/2]);
    // 4. Shoulders (Cannonball Delts)
    addPart(new THREE.SphereGeometry(0.65, 32, 32), [1.4, 3.8, 0]);
    addPart(new THREE.SphereGeometry(0.65, 32, 32), [-1.4, 3.8, 0]);
    // 5. Biceps (Flexed Pose)
    addPart(new THREE.CapsuleGeometry(0.35, 0.8, 4, 16), [2.0, 4.2, 0.3], [0, 0, Math.PI/3]);
    addPart(new THREE.CapsuleGeometry(0.35, 0.8, 4, 16), [-2.0, 4.2, 0.3], [0, 0, -Math.PI/3]);
    // 6. Forearms
    addPart(new THREE.CapsuleGeometry(0.25, 0.8, 4, 16), [2.4, 5.0, 0.8], [0, 0, 0.2]);
    addPart(new THREE.CapsuleGeometry(0.25, 0.8, 4, 16), [-2.4, 5.0, 0.8], [0, 0, -0.2]);
    // 7. Head & Neck
    addPart(new THREE.CylinderGeometry(0.3, 0.4, 0.6, 16), [0, 4, 0]); // Neck
    addPart(new THREE.SphereGeometry(0.45, 32, 32), [0, 4.6, 0]); // Head
    // 8. Legs (Quads)
    addPart(new THREE.CapsuleGeometry(0.6, 1.5, 4, 16), [0.5, 1, 0], [0, 0, 0.1]);
    addPart(new THREE.CapsuleGeometry(0.6, 1.5, 4, 16), [-0.5, 1, 0], [0, 0, -0.1]);

    body.position.y = -3;
    scene.add(body);

    const onScroll = () => { scrollRef.current = window.scrollY; };
    window.addEventListener("scroll", onScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      const t = Date.now() * 0.001;
      const scroll = scrollRef.current;

      body.rotation.y = Math.sin(t * 0.3) * 0.2;
      const breathe = 1 + Math.sin(t * 1.5) * 0.015;
      body.scale.set(breathe, breathe, breathe);

      body.position.z = scroll * 0.005;
      camera.position.y = 2 - scroll * 0.003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "none" }} />;
}

// ─── Services Page ───────────────────────────────────────────────────────────
export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: "#050505", minHeight: "100vh", overflowX: 'hidden' }}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@300;400;700;900&display=swap');

        .page-content {
          position: relative;
          z-index: 1;
          padding: 160px 0 100px;
        }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-box {
          text-align: left;
          margin-bottom: 6rem;
          border-left: 4px solid #ff1e1e;
          padding-left: 2rem;
        }

        .badge {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.3em;
          color: #ff1e1e;
          text-transform: uppercase;
        }

        .title {
          font-family: 'Teko', sans-serif;
          font-size: clamp(4rem, 10vw, 7rem);
          line-height: 0.9;
          color: #fff;
          text-transform: uppercase;
          margin: 1rem 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }

        .service-card {
          background: rgba(15, 15, 15, 0.8);
          backdrop-filter: blur(10px);
          padding: 4rem 2.5rem;
          border: 1px solid rgba(255,255,255,0.05);
          position: relative;
          transition: all 0.4s ease;
          clip-path: polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%);
        }

        .service-card:hover {
          border-color: #ff1e1e;
          transform: translateY(-10px);
          background: rgba(20, 20, 20, 0.95);
        }

        .service-card h3 {
          font-family: 'Teko', sans-serif;
          font-size: 2.5rem;
          color: #fff;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .service-card p {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          color: #aaa;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 3rem 0;
        }

        .feature-list li {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #eee;
          margin-bottom: 0.8rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feature-list li::before {
          content: '✔';
          color: #ff1e1e;
          font-weight: bold;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid rgba(255,255,255,0.1);
          padding-top: 2rem;
        }

        .price {
          font-family: 'Teko', sans-serif;
          font-size: 1.8rem;
          color: #ff1e1e;
        }

        .btn-action {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          padding: 0.8rem 1.5rem;
          border: 1px solid #ff1e1e;
          transition: all 0.3s ease;
        }

        .service-card:hover .btn-action {
          background: #ff1e1e;
          color: #000;
        }

        @media (max-width: 768px) {
          .page-content { padding-top: 120px; }
          .service-card { padding: 3rem 2rem; }
        }
      `}</style>

      <Navbar />
      <RealisticBodybuilder />

      <div className="page-content">
        <div className="container">
          
          <div className="header-box">
            <span className="badge">Training Systems</span>
            <h1 className="title">ELITE <br/>COMMAND</h1>
          </div>

          <div className="services-grid">
            {ELITE_SERVICES.map((s) => (
              <div key={s.id} className="service-card">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                
                <ul className="feature-list">
                  {s.features.map(f => <li key={f}>{f}</li>)}
                </ul>

                <div className="price-row">
                  <span className="price">{s.price}</span>
                  <a href="/join" className="btn-action">Join Now</a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      
    </div>
  );
}