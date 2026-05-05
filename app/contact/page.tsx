"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ─── Fixed Background ─── */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/gym.png" 
          alt="Gym Background" 
          className="w-full h-full object-cover object-center opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-red-900/20" />
      </div>

      {/* ─── Content Layer ─── */}
      <div className="relative z-10 pt-26 md:pt-26 pb-20">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mb-16">
            <span className="text-red-600 font-black tracking-[0.4em] text-xs uppercase mb-4 block">
              Join the Ranks
            </span>
            <h1 className="font-['Teko'] text-7xl md:text-9xl uppercase leading-none">
              Contact <span className="text-transparent" style={{ WebkitTextStroke: "1px #ff1e1e" }}>HQ</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* ── Contact Form ── */}
            <div className="bg-zinc-900/50 backdrop-blur-xl p-8 md:p-12 border border-white/5">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Full Name</label>
                    <input type="text" placeholder="GUEST_NAME" className="w-full bg-black/40 border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Email Address</label>
                    <input type="email" placeholder="EMAIL@GLACIALABS.COM" className="w-full bg-black/40 border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Interest</label>
                  <select className="w-full bg-black/40 border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition-all appearance-none">
                    <option>Membership Inquiry</option>
                    <option>Personal Training</option>
                    <option>Corporate Partnership</option>
                    <option>General Intel</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-widest uppercase text-zinc-500 font-bold">Message</label>
                  <textarea rows={4} placeholder="TRANSMIT YOUR MESSAGE..." className="w-full bg-black/40 border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none transition-all"></textarea>
                </div>

                <button className="w-full bg-red-600 hover:bg-white hover:text-black text-black font-black py-5 tracking-[0.3em] uppercase text-xs transition-all duration-500">
                  Send Transmission
                </button>
              </form>
            </div>

            {/* ── HQ Details ── */}
            <div className="space-y-12 lg:pl-12">
              <div className="space-y-4">
                <h3 className="font-['Teko'] text-4xl uppercase text-red-600">Location</h3>
                <p className="font-['Montserrat'] text-zinc-400 leading-relaxed uppercase tracking-tighter">
                  Sector F Winterland, Bahria Lahore,<br />
                  Punjab, Pakistan
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-['Teko'] text-4xl uppercase text-red-600">Connect</h3>
                <p className="font-['Montserrat'] text-zinc-400 space-y-2">
                  <span className="block tracking-widest">TEL: +92 51 000 0000</span>
                  <span className="block tracking-widest">EMAIL: HQ@LAFORZA.PK</span>
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-['Teko'] text-4xl uppercase text-red-600">Hours</h3>
                <div className="grid grid-cols-2 gap-4 text-[10px] tracking-widest uppercase text-zinc-500 font-bold">
                  <div>Mon - Sat</div>
                  <div className="text-white text-right">05:00 - 23:00</div>
                  <div>Sunday</div>
                  <div className="text-white text-right">09:00 - 18:00</div>
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="pt-8 opacity-20 hidden md:block">
                <img src="/gym.png" className="w-full h-32 object-cover grayscale brightness-50" />
              </div>
            </div>

          </div>
        </div>
      </div>

      

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@300;400;700;900&display=swap');
      `}</style>
    </main>
  );
}