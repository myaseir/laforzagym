"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@400;600;700;900&display=swap');

        /* ─── Variables ─── */
        :root {
          --nav-bg: #050505;
          --nav-bg-glass: rgba(5, 5, 5, 0.85);
          --nav-accent: #ff1e1e;
          --nav-text: #ffffff;
          --nav-text-muted: #a0a0a0;
          --nav-border: rgba(255, 30, 30, 0.15);
        }

        /* ─── Navbar Container ─── */
        .gym-navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gym-navbar.scrolled {
          padding: 1rem 0;
          background: var(--nav-bg-glass);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--nav-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* ─── Logo ─── */
        .nav-logo {
          font-family: 'Teko', sans-serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--nav-text);
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
          position: relative;
          z-index: 1001;
        }

        .nav-logo span {
          color: var(--nav-accent);
        }

        /* ─── Desktop Links ─── */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 3rem;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
        }

        .nav-links a {
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--nav-text-muted);
          text-decoration: none;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s;
        }

        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--nav-accent);
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-links a:hover,
        .nav-links a.active {
          color: var(--nav-text);
        }

        .nav-links a:hover::after,
        .nav-links a.active::after {
          width: 100%;
        }

        /* ─── Desktop CTA Button ─── */
        .nav-cta {
          font-family: 'Montserrat', sans-serif;
          font-weight: 900;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--nav-bg);
          background-color: var(--nav-accent);
          padding: 0.8rem 2rem;
          text-decoration: none;
          transition: all 0.3s ease;
          clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
        }

        .nav-cta:hover {
          background-color: var(--nav-text);
          color: var(--nav-accent);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 30, 30, 0.3);
        }

        /* ─── Mobile Hamburger ─── */
        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          width: 35px;
          height: 24px;
          position: relative;
          z-index: 1001;
        }

        .hamburger span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: var(--nav-text);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .hamburger span:nth-child(1) { top: 0; }
        .hamburger span:nth-child(2) { top: 50%; transform: translateY(-50%); width: 70%; right: 0; left: auto; }
        .hamburger span:nth-child(3) { bottom: 0; }

        .hamburger:hover span:nth-child(2) { width: 100%; }

        .hamburger.active span:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
          background: var(--nav-accent);
        }
        .hamburger.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }
        .hamburger.active span:nth-child(3) {
          bottom: 50%;
          transform: translateY(50%) rotate(-45deg);
          background: var(--nav-accent);
        }

        /* ─── Mobile Overlay Menu ─── */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #0a0a0a;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
        }

        .mobile-menu.active {
          opacity: 1;
          visibility: visible;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }

        /* Diagonal background accent */
        .mobile-menu::before {
          content: '';
          position: absolute;
          bottom: -20%;
          right: -20%;
          width: 50vw;
          height: 100vh;
          background: var(--nav-accent);
          opacity: 0.05;
          transform: rotate(-45deg);
          pointer-events: none;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          list-style: none;
          padding: 0;
          margin: 0 0 3rem 0;
        }

        .mobile-nav-links li {
          transform: translateY(30px);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-menu.active .mobile-nav-links li {
          transform: translateY(0);
          opacity: 1;
        }

        /* Staggered entry animation */
        .mobile-menu.active .mobile-nav-links li:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu.active .mobile-nav-links li:nth-child(2) { transition-delay: 0.2s; }
        .mobile-menu.active .mobile-nav-links li:nth-child(3) { transition-delay: 0.3s; }
        .mobile-menu.active .mobile-nav-links li:nth-child(4) { transition-delay: 0.4s; }

        .mobile-nav-links a {
          font-family: 'Teko', sans-serif;
          font-size: 3.5rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--nav-text);
          text-decoration: none;
          transition: color 0.3s;
          line-height: 1;
        }

        .mobile-nav-links a:hover {
          color: var(--nav-accent);
        }

        .mobile-cta {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
        }

        .mobile-menu.active .mobile-cta {
          opacity: 1;
          transform: translateY(0);
        }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .nav-desktop {
            display: none;
          }
          .hamburger {
            display: block;
          }
          .nav-container {
            padding: 0 1.5rem;
          }
        }
      `}</style>

      {/* ─── Navbar Header ─── */}
      <nav className={`gym-navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          
          <a href="/" className="nav-logo" onClick={() => setIsOpen(false)}>
            La<span>Forza</span>
          </a>

          {/* Desktop Navigation */}
          <div className="nav-desktop">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
            <a href="/join" className="nav-cta">
              Join Elite
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ─── Mobile Menu Overlay ─── */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        <ul className="mobile-nav-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-cta">
          <a 
            href="/join" 
            className="nav-cta" 
            style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}
            onClick={() => setIsOpen(false)}
          >
            Start Free Trial
          </a>
        </div>
      </div>
    </>
  );
}