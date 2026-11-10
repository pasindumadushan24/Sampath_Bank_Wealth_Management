'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

function CounterStat({ value, suffix, label }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1800, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * numeric));
      if (p < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-[#C8961E]">
        {count}{suffix}
      </div>
      <div className="text-gray-300 text-sm mt-1">{label}</div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0d1a3a] via-[#1B2B5B] to-[#2a3f7a]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C8961E] opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#C8961E] opacity-5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white opacity-5"></div>
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="text-[#C8961E] text-sm">✦</span>
            <span className="text-white text-sm font-medium">Sri Lanka's Premier Wealth Management</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Wealth.{' '}
            <span className="text-[#C8961E]">Our Expertise.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
            Sampath Bank Wealth Management — crafting personalised investment strategies 
            to grow, protect, and transfer your wealth across generations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#C8961E] hover:bg-[#a07818] text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#C8961E]/30 hover:-translate-y-0.5"
            >
              Explore Products
              <span className="ml-2">→</span>
            </Link>
            <Link
              href="/appointments"
              className="inline-flex items-center justify-center bg-transparent hover:bg-white/10 text-white font-bold py-4 px-8 rounded-xl text-lg border-2 border-white/40 hover:border-white transition-all duration-300"
            >
              Book Appointment
              <span className="ml-2">📅</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
            <CounterStat value="25" suffix="+ Years" label="Of Excellence" />
            <CounterStat value="100" suffix="Bn+" label="LKR AUM" />
            <CounterStat value="50000" suffix="+" label="Happy Clients" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
      </div>
    </section>
  );
}
