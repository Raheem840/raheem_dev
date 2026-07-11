import { useState } from 'react';

const SOCIALS = [
  { label: 'GitHub',   value: 'github.com/Raheem840',    href: 'https://github.com/Raheem840',        icon: '⌥' },
  { label: 'LinkedIn', value: 'linkedin.com/in/rahim-stone', href: 'https://linkedin.com/in/rahim-stone', icon: '⊞' },
  { label: 'Email',    value: 'tambwerahimstone@gmail.com',               href: 'mailto:tambwerahimstone@gmail.com',                  icon: '◎' },
  { label: 'Proton Mail',  value: '@proton.me',                 href: 'mailto:tambwerahimstone@proton.me',        icon: '◈' },
];

const INITIAL = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm]     = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');

    // Formspree handles the actual email delivery — free tier, no backend needed.
    // Replace YOUR_FORM_ID with the ID from formspree.io after you create a form there.
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      if (res.ok) { setStatus('sent'); setForm(INITIAL); }
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-black text-white px-8 md:px-16 py-24">

      {/* Section label */}
      <p className="font-mono text-xs tracking-[0.25em] uppercase text-[#e0ff4f] mb-3">
        04 — Contact
      </p>

      {/* Heading — yasio style: large, tight, one accent word */}
      <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none mb-4">
        Let's build<br />
        <span className="text-[#e0ff4f]">something.</span>
      </h2>
      <p className="text-gray-500 font-mono text-xs mb-16 max-w-md leading-relaxed">
        Open to internships, collaborations, and conversations about tech, security, or ideas worth exploring.
      </p>

      {/* Two column layout */}
      <div className="flex flex-col lg:flex-row gap-16 max-w-full">

        {/* Left — form */}
        <div className="flex-1 flex flex-col gap-4">

          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="bg-transparent border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-gray-700 outline-none focus:border-[#e0ff4f]/60 transition-colors"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="bg-transparent border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-gray-700 outline-none focus:border-[#e0ff4f]/60 transition-colors"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] tracking-widest text-gray-600 uppercase">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What's on your mind..."
              rows={5}
              className="bg-transparent border border-white/10 rounded px-4 py-3 font-mono text-sm text-white placeholder-gray-700 outline-none focus:border-[#e0ff4f]/60 transition-colors resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={status === 'sending' || status === 'sent'}
            className="self-start mt-2 font-mono text-xs uppercase tracking-widest px-8 py-3 rounded bg-[#e0ff4f] text-black hover:bg-[#4fffb0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === 'idle'    && 'Send Message →'}
            {status === 'sending' && 'Sending...'}
            {status === 'sent'    && 'Message Sent ✓'}
            {status === 'error'   && 'Failed — Try Again'}
          </button>

        </div>

        {/* Right — socials + availability */}
        <div className="flex-1 flex flex-col justify-between gap-12">

          {/* Social links */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-widest text-gray-600 uppercase mb-2">
              Find me at
            </p>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 border border-white/10 rounded px-5 py-4 hover:border-[#e0ff4f]/50 hover:bg-[#e0ff4f]/[0.03] transition-all"
              >
                <span className="text-gray-600 group-hover:text-[#e0ff4f] transition-colors font-mono text-sm w-5 text-center">
                  {s.icon}
                </span>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-gray-600 tracking-widest uppercase">
                    {s.label}
                  </span>
                  <span className="font-mono text-xs text-gray-400 group-hover:text-white transition-colors">
                    {s.value}
                  </span>
                </div>
                <span className="ml-auto text-gray-700 group-hover:text-[#e0ff4f] transition-colors font-mono text-xs">
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Availability badge — same pulse dot pattern from About/Skills */}
          <div className="border border-white/10 rounded px-5 py-4 flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-[#4fffb0] animate-pulse flex-shrink-0" />
            <div>
              <p className="font-mono text-[10px] tracking-widest text-gray-600 uppercase mb-1">
                Status
              </p>
              <p className="font-mono text-xs text-gray-300">
                Available for internships &amp; collaborations — Kampala, Uganda · Remote OK
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}