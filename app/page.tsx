"use client";

import React from "react";
import Navbar from "./components/Navbar"; // Adjust paths based on your folder structure
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Elite Members", value: "1.2k+" },
  { label: "Expert Coaches", value: "24" },
  { label: "Modern Equipment", value: "150+" },
  { label: "Success Stories", value: "98%" },
];

const PROGRAMS = [
  {
    title: "Strength & Iron",
    desc: "The foundation of power. Heavy lifting protocols designed for maximum hypertrophy and raw strength.",
    icon: "🏋️‍♂️",
  },
  {
    title: "Tactical Cardio",
    desc: "High-intensity metabolic conditioning that shreds fat while preserving every ounce of muscle.",
    icon: "🔥",
  },
  {
    title: "Elite Coaching",
    desc: "One-on-one programming with professional athletes to bypass plateaus and hit PRs faster.",
    icon: "🎯",
  },
];

export default function MainPage() {
  return (
    <main style={{ backgroundColor: "#050505", color: "#ffffff" }}>
      <Navbar />
      
      {/* ── Hero Section ── */}
      <Hero />

      {/* ── Stats Bar ── */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / Philosophy ── */}
      <section className="section about-section" id="about">
        <div className="container">
          <div className="grid-2">
            <div className="reveal">
              <span className="badge">Our Philosophy</span>
              <h2 className="title">WE DON'T DO <br/><span className="text-red">MEDIOCRE</span></h2>
              <p className="description">
                La Forza isn't just a gym; it's a forge. We provide the tools, the atmosphere, 
                and the elite-level expertise. You provide the grit. Our facility is designed 
                to eliminate distractions and focus on one thing: **Results.**
              </p>
              <div className="accent-line"></div>
            </div>
            <div className="visual-box reveal delay-1">
               {/* This represents a placeholder for a high-quality gym image */}
               <div className="image-placeholder">
                  <div className="inner-glow"></div>
                  <span className="floating-text">EST. 2018</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services / Programs ── */}
      <section className="section services-section" id="services">
        <div className="container text-center">
          <span className="badge">Dominate Your Goals</span>
          <h2 className="title">ELITE <span className="text-red">PROGRAMS</span></h2>
          
          <div className="services-grid">
            {PROGRAMS.map((prog, i) => (
              <div key={prog.title} className={`service-card reveal delay-${i}`}>
                <div className="card-icon">{prog.icon}</div>
                <h3>{prog.title}</h3>
                <p>{prog.desc}</p>
                <div className="card-footer">
                   <a href="/join" className="card-link">View Program</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ── */}
      <section className="cta-section">
        <div className="cta-box reveal">
          <h2>READY TO JOIN THE <span className="text-red">1%?</span></h2>
          <p>Your first session is on us. Experience the atmosphere that creates champions.</p>
          <a href="/contact" className="btn-main">Get Started Now</a>
        </div>
      </section>

      

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@300;400;700;900&display=swap');

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .text-center { text-align: center; }
        .text-red { color: #ff1e1e; }

        .section {
          padding: 10rem 0;
          position: relative;
        }

        .badge {
          display: inline-block;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #ff1e1e;
          margin-bottom: 1rem;
        }

        .title {
          font-family: 'Teko', sans-serif;
          font-size: clamp(3rem, 6vw, 5rem);
          line-height: 0.9;
          margin-bottom: 2rem;
          text-transform: uppercase;
        }

        /* Stats Bar */
        .stats-bar {
          background: #0a0a0a;
          padding: 4rem 0;
          border-top: 1px solid rgba(255, 30, 30, 0.1);
          border-bottom: 1px solid rgba(255, 30, 30, 0.1);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          text-align: center;
        }

        .stat-value {
          display: block;
          font-family: 'Teko', sans-serif;
          font-size: 4rem;
          color: #ffffff;
          line-height: 1;
        }

        .stat-label {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #666;
        }

        /* Grid Layout */
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }

        .description {
          font-family: 'Montserrat', sans-serif;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #aaa;
          margin-bottom: 2rem;
        }

        .accent-line {
          width: 60px;
          height: 4px;
          background: #ff1e1e;
        }

        /* Visual Box Placeholder */
        .image-placeholder {
          width: 100%;
          height: 500px;
          background: #111;
          position: relative;
          clip-path: polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .inner-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at bottom right, rgba(255, 30, 30, 0.1) 0%, transparent 70%);
        }

        .floating-text {
          position: absolute;
          bottom: 2rem;
          left: 2rem;
          font-family: 'Teko', sans-serif;
          font-size: 4rem;
          color: rgba(255,255,255,0.05);
        }

        /* Services Cards */
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 5rem;
        }

        .service-card {
          background: #0a0a0a;
          padding: 4rem 3rem;
          text-align: left;
          border: 1px solid rgba(255,255,255,0.03);
          transition: all 0.4s ease;
          position: relative;
        }

        .service-card:hover {
          background: #111;
          border-color: #ff1e1e;
          transform: translateY(-10px);
        }

        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .service-card h3 {
          font-family: 'Teko', sans-serif;
          font-size: 2rem;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .service-card p {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.95rem;
          color: #888;
          line-height: 1.6;
        }

        .card-footer {
          margin-top: 3rem;
        }

        .card-link {
          color: #ff1e1e;
          text-decoration: none;
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        /* CTA Section */
        .cta-section {
          padding: 10rem 2rem;
          background: linear-gradient(rgba(5,5,5,0.8), rgba(5,5,5,0.8)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop');
          background-size: cover;
          background-attachment: fixed;
          text-align: center;
        }

        .cta-box h2 {
          font-family: 'Teko', sans-serif;
          font-size: 5rem;
          margin-bottom: 1rem;
        }

        .cta-box p {
          font-family: 'Montserrat', sans-serif;
          margin-bottom: 3rem;
          color: #ccc;
        }

        .btn-main {
          display: inline-block;
          padding: 1.2rem 4rem;
          background: #ff1e1e;
          color: #000;
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          text-transform: uppercase;
          text-decoration: none;
          letter-spacing: 0.2em;
          clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
          transition: all 0.3s ease;
        }

        .btn-main:hover {
          background: #fff;
          transform: scale(1.05);
        }

        /* Simple Reveal Logic */
        .reveal { opacity: 1; transform: none; } /* Add your observer logic or Framer Motion here */

        @media (max-width: 900px) {
          .grid-2 { grid-template-columns: 1fr; gap: 4rem; }
          .image-placeholder { height: 350px; }
          .cta-box h2 { font-size: 3.5rem; }
        }
      `}</style>
    </main>
  );
}