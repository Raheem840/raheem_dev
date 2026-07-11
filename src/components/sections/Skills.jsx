import SkillGraph from '../ui/SkillGraph';
const skillGroups = [
  {
    comment: '// languages',
    skills: ['HTML / CSS', 'JavaScript', 'Python'],
  },
  {
    comment: '// frontend — learning as I build',
    skills: ['React', 'Tailwind CSS'],
  },
  {
    comment: '// backend & databases',
    skills: ['Node.js', 'PostgreSQL (ORM)', 'REST APIs'],
  },
  {
    comment: '// networking & systems',
    skills: ['TCP/IP', 'Subnetting / VLSM', 'Cisco Packet Tracer', 'Linux CLI'],
  },
  {
    comment: '// tools',
    skills: ['Git / GitHub', 'n8n', 'Figma'],
  },
];

const learning = ['Three.js / R3F', 'GSAP', 'TypeScript', 'Docker'];

export default function Skills() {
  // ...skillGroups and learning arrays stay exactly as they are...

  return (
  <section id="skills" className="min-h-screen bg-black text-white px-8 md:px-16 py-24">

    <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#e0ff4f] mb-3">
      02 — Stack
    </p>
    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Skills</h2>
    <p className="text-gray-500 font-mono text-xs mb-14 max-w-md leading-relaxed">
      Continuously expanding. Built through projects, not just tutorials.
    </p>

    {/* Two column layout — code block left, graph right */}
    <div className="flex flex-col lg:flex-row gap-8 min-h-[520px]">

      {/* Left — code block */}
      <div className="flex flex-col gap-6 lg:w-1/2">
        <div className="font-mono text-xs md:text-sm bg-[#0f0f0f] border border-white/10 rounded-lg p-6 md:p-10 leading-relaxed">
          <div className="mb-4">
            <span className="text-[#b04fff]">class </span>
            <span className="text-[#4fffb0]">Raheem </span>
            <span className="text-gray-400">{'{'}</span>
          </div>
          <div className="ml-4 md:ml-8">
            <div className="mb-6">
              <span className="text-[#b04fff]">skills</span>
              <span className="text-gray-400">() {'{'}</span>
            </div>
            <div className="ml-4 md:ml-8 mb-6">
              <div className="text-gray-500 mb-3">return {'['}</div>
              {skillGroups.map((group) => (
                <div key={group.comment} className="mb-5 ml-4 md:ml-8">
                  <div className="text-gray-600 mb-2">{group.comment}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <span key={skill}>
                        <span className="text-[#e0ff4f] hover:text-white transition-colors cursor-default">
                          '{skill}'
                        </span>
                        <span className="text-gray-600">
                          {i < group.skills.length - 1 ? ',' : ''}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-gray-500 mt-3">{'}'}</div>
            </div>
            <div className="text-gray-400">{'}'}</div>
          </div>
          <div className="mt-4 text-gray-400">{'}'}</div>
        </div>

        {/* Learning block */}
        <div className="font-mono text-xs bg-[#0f0f0f] border border-white/10 rounded-lg p-6 leading-relaxed">
          <p className="text-gray-600 mb-4">// currently learning — being built into this portfolio</p>
          <div className="flex flex-wrap gap-2">
            {learning.map((item) => (
              <span key={item} className="border border-[#4fffb0]/40 text-[#4fffb0] px-3 py-1 rounded text-[10px] tracking-wide">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Obsidian-style skill graph */}
      <div className="lg:w-1/2 min-h-[400px] lg:min-h-full overflow-hidden relative">
        <p className="absolute top-4 left-4 font-mono text-[9px] text-gray-700 tracking-widest z-10">
          SKILL GRAPH
        </p>
        <SkillGraph />
      </div>
    </div>

    {/* Status badge */}
    <div className="mt-8 flex items-center gap-3">
      <span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] animate-pulse inline-block" />
      <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
        Always learning · currently deep in React + Three.js + Networking
      </span>
    </div>

  </section>
  );
}