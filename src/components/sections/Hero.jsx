import { useState, useEffect } from 'react';

const roles = [
  'Full-Stack Developer',
  'Cybersecurity Enthusiast','Network Tinkerer','Math & Logic Nerd','CS Student','IT Support SPecialist'];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col md:flex-row items-center justify-between px-10 md:px-20 pt-32 bg-black text-white"
    >
      <div className="max-w-xl">
        <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#e0ff4f] mb-4">
          CS Student &amp; Developer
        </p>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-2">
          Raheem<br />
          <span className="text-[#e0ff4f]">Builds.</span>
        </h1>

        <p className="font-mono text-sm text-gray-400 mb-7 h-5">
          {roles[roleIndex]}
          <span className="inline-block w-[2px] h-3 bg-[#e0ff4f] ml-1 animate-pulse" />
        </p>

        <p className="text-gray-400 leading-relaxed mb-9 max-w-md">
  Computer Science student fascinated by how systems actually work —
  from the math under an algorithm to the packets moving across a
  network. I build full-stack systems and AI automations for mostly fun , and spend my
  downtime poking at networks and security  and generally any tech concepts just to understand them better.
        </p>

        <div className="flex gap-3">
          <a href="#projects" className="font-mono text-xs uppercase tracking-wider bg-[#e0ff4f] text-black px-7 py-3 rounded hover:bg-[#4fffb0] transition-colors">
            View Projects
          </a>
          <a href="#about" className="font-mono text-xs uppercase tracking-wider border border-white/20 text-gray-300 px-7 py-3 rounded hover:border-white/50 hover:text-white transition-colors">
            About Me
          </a>
        </div>
      </div>

      {/* Phase 4 replaces this div with the R3F <Canvas> */}
      <div className="hidden md:flex items-center justify-center w-[360px] h-[360px] relative">
        <div className="absolute inset-0 rounded-full bg-[#e0ff4f]/5 blur-3xl" />
        <p className="font-mono text-[10px] tracking-[0.2em] text-gray-600 text-center z-10">
          3D OBJECT<br />GOES HERE
        </p>
      </div>
    </section>
  );
}