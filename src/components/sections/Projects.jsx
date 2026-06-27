import { useState } from 'react';
import { projects } from '../../data/projects';
import ProjectDetail from '../sections/ProjectDetail';

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);

  const openProject = (index) => setActiveIndex(index);
  const closeProject = () => setActiveIndex(null);
  const nextProject = () => setActiveIndex((prev) => (prev + 1) % projects.length);
  const prevProject = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

  return (
    <section id="projects" className="min-h-screen bg-black text-white px-8 md:px-16 py-24">
      
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#e0ff4f] mb-3">
        02 — Selected Work
      </p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">Projects</h2>

      {/* Card grid — CSS slide-in now, GSAP ScrollTrigger upgrades this in Phase 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={project.id}
            onClick={() => openProject(index)}
            className="group cursor-pointer border border-white/10 rounded-lg overflow-hidden bg-[#0f0f0f] hover:border-[#e0ff4f]/60 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Thumbnail */}
            <div className="relative h-44 bg-[#161616] flex items-center justify-center overflow-hidden">
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              )}
              {/* Diagonal stripe overlay — from design system */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #e0ff4f 10px, #e0ff4f 11px)' }}
              />
              <span className="absolute font-bold text-6xl text-white/10 tracking-tight z-10">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Card body */}
            <div className="p-5">
              <p className="font-mono text-[10px] text-gray-600 mb-2">{project.year}</p>
              <h3 className="font-semibold text-sm mb-2 group-hover:text-[#e0ff4f] transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[9px] border border-white/10 text-gray-500 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic "add project" slot — always last */}
        <div className="border border-dashed border-white/10 rounded-lg flex items-center justify-center min-h-[240px] cursor-default">
          <p className="font-mono text-[10px] text-gray-700 text-center tracking-widest">
            <span className="block text-xl mb-2">+</span>
            NEXT PROJECT<br />SLOTS IN HERE
          </p>
        </div>
      </div>

      {/* Detail overlay */}
      {activeIndex !== null && (
        <ProjectDetail
          project={projects[activeIndex]}
          current={activeIndex}
          total={projects.length}
          onClose={closeProject}
          onNext={nextProject}
          onPrev={prevProject}
        />
      )}
    </section>
  );
}