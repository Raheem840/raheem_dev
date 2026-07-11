const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];
const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/Raheem840' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/rahim-stone' },
  { label: 'Email',    href: 'mailto:tambwerahimstone@gmail.com' },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 px-8 md:px-16 py-12">

      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Left — logo + tagline */}
        <div className="flex flex-col gap-3">
          <div className="font-mono text-lg font-bold">
            {'<'}<span className="text-[#e0ff4f]">Raheem</span>{'/>'}
          </div>
          <p className="font-mono text-[10px] text-gray-600 leading-relaxed max-w-[200px] tracking-wide">
            CS student. Building things that think in systems.
          </p>
          {/* Availability dot — consistent with About + Contact */}
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] animate-pulse" />
            <span className="font-mono text-[9px] text-gray-600 tracking-widest uppercase">
              Available for work
            </span>
          </div>
        </div>

        {/* Center — nav links */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[9px] tracking-widest text-gray-700 uppercase mb-1">
            Navigate
          </p>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-mono text-xs text-gray-500 hover:text-[#e0ff4f] transition-colors tracking-wide"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right — socials */}
        <div className="flex flex-col gap-2">
          <p className="font-mono text-[9px] tracking-widest text-gray-700 uppercase mb-1">
            Elsewhere
          </p>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="font-mono text-xs text-gray-500 hover:text-[#e0ff4f] transition-colors tracking-wide"
            >
              {s.label} ↗
            </a>
          ))}
        </div>

      </div>

      {/* Bottom bar — divider + copyright */}
      <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row justify-between gap-3 items-start md:items-center">
        <p className="font-mono text-[9px] text-gray-700 tracking-widest uppercase">
          © {new Date().getFullYear()} Raheem · Built with React + Tailwind
        </p>
        <p className="font-mono text-[9px] text-gray-700 tracking-widest uppercase">
          Designed with obsession · Kampala, Uganda
        </p>
      </div>

    </footer>
  );
}