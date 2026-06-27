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
  return (
    <section id="skills" className="min-h-screen bg-black text-white px-8 md:px-16 py-24">

      <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#e0ff4f] mb-3">
        03 — Stack
      </p>
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Skills</h2>
      <p className="text-gray-500 font-mono text-xs mb-14 max-w-md leading-relaxed">
        Continuously expanding. Built through projects, not just tutorials.
      </p>

      {/* Code block — yasio-inspired skills() method */}
      <div className="font-mono text-xs md:text-sm bg-[#0f0f0f] border border-white/10 rounded-lg p-6 md:p-10 leading-relaxed max-w-3xl">

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
                    <span key={skill} className="group relative">
                      <span className="text-[#e0ff4f] hover:text-white transition-colors cursor-default">
                        '{skill}'
                      </span>
                      {/* Comma after every item except last in last group */}
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
      {/* Currently learning */}
      <div className="mt-10 font-mono text-xs bg-[#0f0f0f] border border-white/10 rounded-lg p-6 max-w-3xl">
        <p className="text-gray-600 mb-4">// currently learning — being built into this portfolio</p>
        <div className="flex flex-wrap gap-2">
          {learning.map((item) => (
            <span key={item} className="border border-[#4fffb0]/40 text-[#4fffb0] px-3 py-1 rounded text-[10px] tracking-wide">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Status badge — same pattern as About */}
      <div className="mt-10 flex items-center gap-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4fffb0] animate-pulse inline-block" />
        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">
          Always learning · currently deep in React + Three.js + Networking
        </span>
      </div>

    </section>
  );
}