"use client";

import React from "react";

export default function Footer() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@300;400;700;900&display=swap');

        .gym-footer {
          /* Theme Variables */
          --f-bg: #050505;
          --f-accent: #ff1e1e;
          --f-text: #888888;
          --f-text-light: #ffffff;
          --f-border: rgba(255, 30, 30, 0.1);

          background-color: var(--f-bg);
          color: var(--f-text);
          font-family: 'Montserrat', sans-serif;
          padding: 6rem 2rem 2rem;
          border-top: 1px solid var(--f-border);
          position: relative;
        }

        .footer-container {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 4rem;
        }

        /* Brand Section */
        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          font-family: 'Teko', sans-serif;
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--f-text-light);
          text-decoration: none;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          line-height: 1;
        }

        .footer-logo span {
          color: var(--f-accent);
        }

        .footer-desc {
          font-size: 0.95rem;
          line-height: 1.8;
          font-weight: 300;
          max-width: 320px;
        }

        /* Column Headers */
        .footer-col h4 {
          font-family: 'Teko', sans-serif;
          font-size: 1.5rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--f-text-light);
          margin-bottom: 2rem;
          position: relative;
        }

        .footer-col h4::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 30px;
          height: 2px;
          background: var(--f-accent);
        }

        /* Links */
        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-col a {
          color: var(--f-text);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .footer-col a:hover {
          color: var(--f-accent);
          padding-left: 8px;
        }

        /* Newsletter Input */
        .newsletter-box {
          margin-top: 1.5rem;
          position: relative;
        }

        .newsletter-form {
          display: flex;
          gap: 0;
        }

        .newsletter-input {
          flex: 1;
          background: #111;
          border: 1px solid #222;
          padding: 1rem;
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 0.8rem;
          outline: none;
        }

        .newsletter-btn {
          background: var(--f-accent);
          border: none;
          color: #000;
          padding: 0 1.5rem;
          font-weight: 900;
          cursor: pointer;
          transition: background 0.3s ease;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 80% 100%, 0 100%);
        }

        .newsletter-btn:hover {
          background: #fff;
        }

        /* Footer Bottom */
        .footer-bottom {
          max-width: 1300px;
          margin: 6rem auto 0;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .footer-socials {
          display: flex;
          gap: 2rem;
        }

        .footer-socials a {
          color: var(--f-text);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-socials a:hover {
          color: var(--f-accent);
        }

        /* Glacia Labs Credit Style */
        .credit-link {
          color: var(--f-text-light);
          text-decoration: none;
          font-weight: 700;
          transition: color 0.3s ease;
          border-bottom: 1px solid transparent;
        }

        .credit-link:hover {
          color: var(--f-accent);
          border-bottom: 1px solid var(--f-accent);
        }

        /* Mobile Adjustments */
        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 650px) {
          .footer-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer-brand, .footer-col {
            align-items: center;
          }
          .footer-col h4::after {
            left: 50%;
            transform: translateX(-50%);
          }
          .footer-bottom {
            flex-direction: column;
            gap: 2rem;
          }
          .newsletter-form {
            max-width: 320px;
            margin: 0 auto;
          }
        }
      `}</style>

      <footer className="gym-footer">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              La<span>Forza</span>
            </a>
            <p className="footer-desc">
              The ultimate forge for strength, resilience, and tactical fitness. 
              Join the elite 1% who refuse to settle for mediocrity.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Facility</a></li>
              <li><a href="/services">Elite Programs</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Membership Plans</a></li>
              <li><a href="#">Personal Trainers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h4>Intel Brief</h4>
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              Get tactical training tips and exclusive membership offers delivered to your inbox.
            </p>
            <div className="newsletter-box">
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="newsletter-input" 
                />
                <button type="submit" className="newsletter-btn">JOIN</button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} La Forza Gym. Built for results.
          </div>
          
          <div className="builder-credit">
            Architecture & Design by <a href="https://glacialabs.com" target="_blank" rel="noopener noreferrer" className="credit-link">Glacia Labs</a>
          </div>

          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">Youtube</a>
            <a href="#">X</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </footer>
    </>
  );
}