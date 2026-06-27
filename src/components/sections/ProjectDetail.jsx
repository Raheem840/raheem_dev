import { useEffect } from 'react';

export default function ProjectDetail({ project, onClose, onNext, onPrev, current, total }) {
  // Close on Escape key — keyboard accessibility
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!project) return null;

  return (
    // Full-screen overlay — fixed covers everything, high z-index sits above nav
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col overflow-y-auto">
      
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 md:px-16 py-6 border-b border-white/10">
        <span className="font-mono text-xs text-[#e0ff4f] tracking-widest uppercase">
          Project {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button
          onClick={onClose}
          className="font-mono text-xs text-gray-400 hover:text-white transition-colors tracking-widest"
        >
          [ ESC ] CLOSE
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col md:flex-row gap-12 px-8 md:px-16 py-12">
        
        {/* Image */}
        <div className="w-full md:w-1/2 relative min-h-[400px] rounded overflow-hidden bg-[#0a0a0a] border border-white/10 flex items-center justify-center">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-contain"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : null}
          {/* Placeholder shown until real image is dropped in */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-[10px] text-gray-600 tracking-widest">
            <span className="text-4xl mb-3 text-gray-700">◈</span>
            {project.slug.toUpperCase()}
          </div>
          <div className="absolute inset-0 bg-[#e0ff4f]/5" />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <p className="font-mono text-[10px] text-gray-500 tracking-widest mb-3">{project.year}</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">{project.title}</h2>
          <p className="text-gray-400 leading-relaxed mb-8 max-w-md">{project.longDesc}</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.map((tag) => (
              <span key={tag} className="font-mono text-[10px] border border-white/20 text-gray-400 px-3 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="font-mono text-xs uppercase tracking-wider border border-[#e0ff4f] text-[#e0ff4f] px-6 py-3 rounded hover:bg-[#e0ff4f] hover:text-black transition-colors">
                GitHub ↗
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer"
                className="font-mono text-xs uppercase tracking-wider border border-white/20 text-gray-300 px-6 py-3 rounded hover:border-white/50 hover:text-white transition-colors">
                Live Site ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom nav — the "fun next button" from yasio */}
      <div className="flex items-center justify-between px-8 md:px-16 py-6 border-t border-white/10">
        <button
          onClick={onPrev}
          className="font-mono text-xs text-gray-500 hover:text-white transition-colors tracking-widest flex items-center gap-3"
        >
          ← PREV PROJECT
        </button>
        <button
          onClick={onNext}
          className="font-mono text-xs tracking-widest flex items-center gap-3 bg-[#e0ff4f] text-black px-8 py-3 rounded hover:bg-[#4fffb0] transition-colors"
        >
          NEXT PROJECT →
        </button>
      </div>
    </div>
  );
}