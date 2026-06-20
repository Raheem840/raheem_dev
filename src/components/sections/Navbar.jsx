import { useState, useEffect } from 'react';

// Data-driven, same pattern as your projects array will use later —
// add a link here and it shows up everywhere, no other code touches
const links = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    // This is the IntersectionObserver pattern from the design system file.
    // It watches each section element and fires whenever one crosses
    // the 40% visibility threshold — that section becomes "active".
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Cleanup: stop observing when Navbar unmounts, avoids memory leaks
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-10 bg-black/90 backdrop-blur-lg border-b border-white/10">
      <div className="font-mono text-sm text-white">
        {'<'}<span className="text-[#e0ff4f]">Raheem</span>{'/>'}
      </div>

      <div className="hidden md:flex gap-8">
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`font-mono text-xs tracking-wide transition-colors ${
              active === id ? 'text-[#e0ff4f]' : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <button className="font-mono text-xs uppercase tracking-wider border border-[#e0ff4f] text-[#e0ff4f] px-4 py-2 rounded hover:bg-[#e0ff4f] hover:text-black transition-colors">
        Hire Me
      </button>
    </nav>
  );
}