import { useState, useEffect, useRef } from 'react';

export default function About() {
  const [showAnime, setShowAnime] = useState(false);
  const timerRef = useRef(null);

  // Recursive cycle: wait 4s showing real, switch to anime for 6s, repeat.
  // Defined as a function (not inline in useEffect) so hover handlers
  // can also call it to restart the cycle after manual interaction.
  const startCycle = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShowAnime(true);
      timerRef.current = setTimeout(() => {
        setShowAnime(false);
        startCycle();
      }, 6000);
    }, 4000);
  };

  useEffect(() => {
    startCycle();
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleEnter = () => {
    clearTimeout(timerRef.current);
    setShowAnime(true);
  };
  const handleLeave = () => {
    setShowAnime(false);
    startCycle();
  };

  return (
    <section id="about" className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Image column */}
      <div
        className="relative w-full md:w-1/2 min-h-[420px] flex items-center justify-center bg-[#161616] overflow-hidden"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <span className="absolute top-5 left-5 w-5 h-5 border-t border-l border-[#e0ff4f]/60" />
        <span className="absolute top-5 right-5 w-5 h-5 border-t border-r border-[#e0ff4f]/60" />
        <span className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-[#e0ff4f]/60" />
        <span className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-[#e0ff4f]/60" />

        <div className="relative w-[75%] h-[340px]">
          <div className={`absolute inset-0 rounded flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#1a1a2e] to-[#0d0d1a] transition-all duration-700 ${showAnime ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
           <img src="/images/ME.jpeg" alt="Raheem Real" className="" /> 
          </div>
          <div className={`absolute inset-0 rounded flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0a0a1a] to-[#1a0a2e] transition-all duration-700 ${showAnime ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            <img src="/images/ME_ANIME.png" alt="Raheem Real" className="" />
          </div>
        </div>
      </div>

      {/* Text column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-20">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[#e0ff4f] mb-4">// about me</p>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-5">
          I build things that <span className="text-[#e0ff4f]">think</span> in systems.
        </h2>
        <p className="text-gray-400 leading-relaxed mb-7 max-w-md">
          CS student who can't leave a black box unopened — whether that's how a
          packet finds its way across a network, why an algorithm runs the way it
          does, or what's actually happening behind a login form. I build full-stack
          systems and AI automations to feed my nerdy nature (⌐⊙_⊙), with cybersecurity 
          and networking as the lens I see everything else through.
        </p>

        <div className="font-mono text-xs bg-[#161616] border border-white/10 rounded p-4 mb-6 leading-relaxed">
          <span className="text-[#b04fff]">class</span> <span className="text-[#4fffb0]">Raheem</span> {'{'}<br />
          &nbsp;&nbsp;<span className="text-gray-500">// CS · networks · security · math</span><br />
          &nbsp;&nbsp;<span className="text-[#b04fff]">constructor</span>() {'{'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-gray-300">this</span>.curious = <span className="text-[#e0ff4f]">true</span><br />
          &nbsp;&nbsp;{'}'}<br />
          {'}'}
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {['React', 'TypeScript', 'Three.js', 'Networking', 'Security'].map((tag) => (
            <span key={tag} className="font-mono text-[10px] tracking-wide border border-[#e0ff4f]/60 text-[#e0ff4f] px-2.5 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>

        <a href="/resume.pdf" className="self-start font-mono text-xs uppercase tracking-wider bg-[#e0ff4f] text-black px-7 py-3 rounded hover:bg-[#4fffb0] transition-colors">
          Download CV
        </a>
      </div>
    </section>
  );
}