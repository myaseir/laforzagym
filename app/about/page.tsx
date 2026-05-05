"use client";

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* ─── Fixed Background Image ─── */}
      <div className="fixed inset-0 z-0">
        {/* The Image */}
        <img 
          src="/gym.png" 
          alt="Gym Background" 
          className="w-full h-full object-cover object-center opacity-100"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>

      {/* ─── Content Layer ─── */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-48 md:pt-64 pb-20">
          <div className="max-w-4xl">
            <span className="inline-block text-red-600 font-bold tracking-[0.4em] text-xs md:text-sm uppercase mb-6">
              The Iron Standard
            </span>
            
            <h1 className="font-['Teko'] text-7xl md:text-[10rem] leading-[0.85] uppercase mb-12">
              Forge <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px #ff1e1e" }}>Your</span> <br />
              Legacy
            </h1>

            {/* Premium Description Card */}
            <div className="bg-zinc-900/60 backdrop-blur-xl border-l-4 border-red-600 p-8 md:p-12 max-w-xl shadow-2xl">
              <p className="font-['Montserrat'] text-lg md:text-xl text-zinc-300 font-light leading-relaxed">
                IronCore was established in Rawalpindi with a singular mission: to provide an elite haven 
                for those who treat training as a discipline, not a hobby.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-[1px] w-12 bg-red-600"></div>
                <span className="text-[10px] tracking-[0.3em] text-red-600 font-bold uppercase">Rawalpindi, PK</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tactical Info Section */}
        <section className="container mx-auto px-6 py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="font-['Teko'] text-5xl uppercase leading-none">
                Tactical <span className="text-red-600">Infrastructure</span>
              </h2>
              <p className="text-zinc-400 font-light leading-loose text-lg">
                Our facility spans elite lifting zones, tactical conditioning spaces, 
                and premium recovery suites. We stripped away the commercial fluff 
                to leave only the essentials for peak human performance.
              </p>
              <button className="border border-white/20 hover:border-red-600 hover:text-red-600 px-10 py-4 text-[10px] font-black tracking-widest uppercase transition-all duration-300">
                View Facility
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-900/40 backdrop-blur-md p-10 border border-white/5 text-center">
                <div className="text-red-600 font-['Teko'] text-5xl mb-1">24/7</div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase">Access</div>
              </div>
              <div className="bg-zinc-900/40 backdrop-blur-md p-10 border border-white/5 text-center">
                <div className="text-red-600 font-['Teko'] text-5xl mb-1">150+</div>
                <div className="text-[9px] tracking-[0.3em] text-zinc-500 uppercase">Machines</div>
              </div>
            </div>
          </div>
        </section>

      
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@400;600;700&family=Montserrat:wght@300;400;700;900&display=swap');
      `}</style>
    </main>
  );
}