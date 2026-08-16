import React, { useEffect, useRef } from 'react';
import {
  Mail, Phone, MapPin, BookOpen, Github, Linkedin,
  Terminal, Award, Languages, Heart,
  Lightbulb, Users, RefreshCw, Clock, TrendingUp, MessageSquare,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Service } from '../types';
import ExperienceSection from './Experience';
import { experience } from '../data/experience';

interface AboutProps {
  services: Service[];
  profileImage: string;
}

/* ============================================================
   Shares the token system introduced in Hero:
   ink #0d0f0d · panel #13160f · line rgba(236,235,228,0.10)
   paper #ecebe4 (headings) · body #c9c8bd (copy) · muted #8f8d80 (meta)
   ember #f2a65a · signal #7fd1ae
   ============================================================ */

// ── data ─────────────────────────────────────────────────────────────────────

const CONTACT = [
  { icon: Mail, label: 'Email', value: 'ekdvsampath@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+94 71 897 4153' },
  { icon: MapPin, label: 'Location', value: 'Opanayaka, Sri Lanka' },
  { icon: BookOpen, label: 'University', value: 'University of Kelaniya' },
  { icon: Github, label: 'GitHub', value: 'Ekdvs' },
  { icon: Linkedin, label: 'LinkedIn', value: 'vishwa-sampath' },
];

const SKILL_GROUPS = [
  { label: 'Frontend', accent: 'ember' as const, tags: ['React.js', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { label: 'Backend', accent: 'signal' as const, tags: ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI', 'Socket.io', 'REST APIs', 'MVC'] },
  { label: 'Databases', accent: 'ember' as const, tags: ['MongoDB', 'MySQL', 'SQL Server', 'PostgreSQL'] },
  { label: 'Languages', accent: 'signal' as const, tags: ['JavaScript', 'TypeScript', 'Java', 'Python', 'PHP', 'C', 'C#'] },
  { label: 'DevOps & Tools', accent: 'ember' as const, tags: ['Git', 'Docker', 'AWS EC2', 'Vercel', 'Render', 'Postman', 'Figma', 'GCP'] },
  { label: 'Core Competencies', accent: 'signal' as const, tags: ['JWT Auth', 'OAuth', 'WebSockets', 'OOP', 'DSA', 'CI/CD', 'Cloud Deployment'] },
];

const EDUCATION = [
  {
    degree: 'B.Sc. Physical Sciences (Computer Science)',
    school: 'University of Kelaniya, Sri Lanka',
    meta: '2021 – 2025 · Computer Science, Pure Mathematics, Chemistry',
    badge: 'GPA 3.13',
  },
  {
    degree: 'Full Stack MERN Development Program',
    school: 'SKYREK (Pvt) Ltd., Sri Lanka',
    meta: '2025 · Successfully completed',
    badge: null,
  },
  {
    degree: 'Software Engineering & Full Stack',
    school: 'DP Education IT Campus & Coding School',
    meta: '2024 – Present',
    badge: null,
  },
];

const SOFT_SKILLS = [
  { icon: Lightbulb, label: 'Problem solving' },
  { icon: Users, label: 'Team collaboration' },
  { icon: RefreshCw, label: 'Adaptability' },
  { icon: Clock, label: 'Time management' },
  { icon: TrendingUp, label: 'Self-motivation' },
  { icon: MessageSquare, label: 'Communication' },
];

const LANGUAGES = [
  { name: 'Sinhala', level: 'Native' },
  { name: 'English', level: 'Professional working proficiency' },
];

// ── helpers ───────────────────────────────────────────────────────────────────

const ACCENT_HEX = { ember: '#f2a65a', signal: '#7fd1ae' } as const;

const Section: React.FC<{ icon: LucideIcon; label: string }> = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 font-mono text-[11px] text-[#0432ff] font-bold uppercase tracking-[0.14em] mb-4">
    <Icon size={13} />
    {label}
  </div>
);

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-[rgba(236,235,228,0.14)] to-transparent my-12" />
);

// ── decorative background: quiet node mesh in the Hero palette ───────────────
// Lower-key than a typical hero: two accent colors only, low opacity, and it
// sits behind solid panel cards so legibility never depends on the animation.

const AboutMeshBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let width = 0, height = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const PALETTE = ['242,166,90', '127,209,174'];

    type Node = { baseX: number; baseY: number; x: number; y: number; phase: number; color: string; r: number };
    let nodes: Node[] = [];

    const buildGrid = () => {
      nodes = [];
      const spacing = 110;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const jitterX = (Math.random() - 0.5) * 30;
          const jitterY = (Math.random() - 0.5) * 30;
          const baseX = i * spacing + jitterX - spacing;
          const baseY = j * spacing + jitterY - spacing;
          nodes.push({
            baseX, baseY, x: baseX, y: baseY,
            phase: Math.random() * Math.PI * 2,
            color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            r: Math.random() * 0.7 + 0.5,
          });
        }
      }
    };

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildGrid();
    };

    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.parentElement?.addEventListener('mousemove', onMove);
    canvas.parentElement?.addEventListener('mouseleave', onLeave);

    const linkDist = 105;

    const draw = () => {
      t += 0.01;
      ctx.clearRect(0, 0, width, height);
      const m = mouseRef.current;

      nodes.forEach((n) => {
        const driftX = Math.sin(t + n.phase) * 5;
        const driftY = Math.cos(t * 0.8 + n.phase) * 5;
        let x = n.baseX + driftX;
        let y = n.baseY + driftY;
        const dx = m.x - x, dy = m.y - y;
        const dist = Math.hypot(dx, dy);
        const radius = 150;
        if (dist < radius) {
          const pull = (1 - dist / radius) * 16;
          x += (dx / (dist || 1)) * pull;
          y += (dy / (dist || 1)) * pull;
        }
        n.x = x;
        n.y = y;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = 0.07 * (1 - d / linkDist);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.color},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const twinkle = 0.25 + Math.sin(t * 1.3 + n.phase) * 0.15;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.color},${twinkle})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMove);
      canvas.parentElement?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-[-8%] w-[40vw] h-[28vw] max-w-[480px] max-h-[340px] rounded-[50%] blur-[100px] opacity-[0.10] bg-[#f2a65a]" />
        <div className="absolute bottom-[-15%] right-[-6%] w-[36vw] h-[32vw] max-w-[440px] max-h-[400px] rounded-[50%] blur-[100px] opacity-[0.08] bg-[#7fd1ae]" />
      </div>
      <svg
        className="absolute top-8 right-[8%] w-[180px] h-[180px] opacity-[0.06] pointer-events-none animate-[meshOrbit_80s_linear_infinite] motion-reduce:hidden"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="#f2a65a" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="190" cy="100" r="4" fill="#f2a65a" />
      </svg>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <style>{`@keyframes meshOrbit { from{ transform: rotate(0deg);} to{ transform: rotate(360deg);} }`}</style>
    </>
  );
};

// ── component ─────────────────────────────────────────────────────────────────

const About: React.FC<AboutProps> = ({ services, profileImage }) => {
  return (
    <section id="about" className="relative py-20 sm:py-24 bg-[#0d0f0d] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .about-font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .about-font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
      `}</style>

      <AboutMeshBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="inline-block font-mono text-[11px] tracking-[0.14em] font-bold text-[#020bff] uppercase mb-3">
            Who I am
          </span>
          <h2 className="about-font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#ecebe4] tracking-tight">
            About <span className="text-[#2200ff]">me</span>
          </h2>
        </div>

        {/* Top: avatar + bio */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 mb-4">
          {/* Left: avatar / identity card */}
          <div className="flex flex-col items-center gap-4 md:w-64 shrink-0">
            <div className="relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl border border-[rgba(236,235,228,0.12)] overflow-hidden bg-[#13160f]">
                {profileImage ? (
                  <img src={profileImage} alt="Vishwa Sampath" className="w-full h-full object-cover" />
                ) : (
                  <div className="about-font-display w-full h-full flex items-center justify-center text-4xl font-semibold text-[#f2a65a]">
                    VS
                  </div>
                )}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#7fd1ae] border-2 border-[#0d0f0d]" />
            </div>

            <div className="text-center">
              <div className="about-font-display text-base font-semibold text-[#ecebe4]">Vishwa Sampath</div>
              <div className="font-mono text-xs text-[#8f8d80] mt-0.5">Full-Stack Developer</div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#7fd1ae]/25 bg-[#7fd1ae]/[0.08] font-mono text-[11px] text-[#7fd1ae] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7fd1ae] animate-pulse motion-reduce:animate-none" />
              Available for opportunities
            </div>

            {/* Contact grid */}
            <div className="grid grid-cols-2 gap-2 w-full">
              {CONTACT.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-2 p-2.5 rounded-lg border border-[rgba(236,235,228,0.08)] bg-[#13160f] hover:border-[#f2a65a]/25 transition-colors"
                >
                  <c.icon size={14} className="text-[#0529f4] mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-mono text-[9.5px] text-[#8f8d80] uppercase tracking-wide">{c.label}</div>
                    <div className="text-[11px] text-[#ecebe4] font-medium break-all leading-tight mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div className="flex flex-col justify-start gap-6 flex-1">
            <p className="text-[15px] text-[#c9c8bd] leading-relaxed">
              I'm a <span className="text-[#0008ff] font-medium">motivated Full-Stack Developer</span> and
              B.Sc. Computer Science graduate (GPA 3.13) from the University of Kelaniya. I build
              scalable, production-ready web applications using modern technologies with a strong focus
              on clean architecture and real-world deployment.
            </p>
            <p className="text-[15px] text-[#c9c8bd] leading-relaxed">
              I specialize in the <span className="text-[#0008ff] font-medium">MERN stack</span> and{' '}
              <span className="text-[#0008ff] font-medium">Spring Boot</span>, with hands-on experience in
              real-time systems via Socket.io, JWT / OAuth authentication, REST APIs, and cloud deployment
              on AWS EC2, Vercel, and Render using Docker. Currently interning as a Software Engineer at{' '}
              <span className="text-[#0008ff] font-medium">Aztra</span>.
            </p>

            {/* Languages */}
            <div>
              <Section icon={Languages} label="Languages" />
              <div className="flex gap-3">
                {LANGUAGES.map((l) => (
                  <div
                    key={l.name}
                    className="flex-1 text-center p-3.5 rounded-lg border border-[rgba(236,235,228,0.08)] bg-[#13160f]"
                  >
                    <div className="about-font-display text-sm font-medium text-[#ecebe4]">{l.name}</div>
                    <div className="text-[11px] text-[#8f8d80] mt-1">{l.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Experience */}
        <div className="mb-4">
          <ExperienceSection experience={experience} />
        </div>

        <Divider />

        {/* Skills + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-4">
          {/* Skills */}
          <div>
            <Section icon={Terminal} label="Technical Skills" />
            <div className="space-y-5">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-[#8f8d80] tracking-widest mb-2 uppercase font-medium">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: ACCENT_HEX[group.accent] }}
                    />
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] px-2.5 py-1 rounded-md border border-[rgba(236,235,228,0.10)] bg-[#13160f] text-[#ecebe4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education + Soft skills */}
          <div className="space-y-8">
            <div>
              <Section icon={Award} label="Education" />
              <div className="space-y-2.5">
                {EDUCATION.map((e) => (
                  <div
                    key={e.degree}
                    className="p-4 rounded-xl border border-[rgba(236,235,228,0.08)] bg-[#13160f] hover:border-[#f2a65a]/20 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-[#ecebe4]">{e.degree}</div>
                      {e.badge && (
                        <span className="shrink-0 font-mono text-[10px] px-2 py-0.5 rounded-full border border-[#7fd1ae]/30 bg-[#7fd1ae]/[0.08] text-[#ebeced] font-medium">
                          {e.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-[#0e8bf0] mt-1">{e.school}</div>
                    <div className="text-[11px] text-[#8f8d80] mt-0.5">{e.meta}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Section icon={Heart} label="Soft Skills" />
              <div className="grid grid-cols-2 gap-2">
                {SOFT_SKILLS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg border border-[rgba(236,235,228,0.07)] bg-[#13160f] text-xs text-[#c9c8bd] hover:border-[#f2a65a]/20 transition-colors"
                  >
                    <s.icon size={14} className="text-[#2196F3] shrink-0" />
                    {s.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Services */}
        {services.length > 0 && (
          <>
            <div className="text-center mb-8">
              <span className="font-mono text-[11px] tracking-[0.14em] font-bold  text-[#1a86ea] uppercase">
                What I offer
              </span>
              <h3 className="about-font-display text-xl sm:text-2xl font-semibold text-[#ecebe4] mt-2">
                Services
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-[rgba(236,235,228,0.08)] bg-[#0f1316] hover:border-[#f2a65a]/25 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f2a65a]/10 border border-[#2196F3]/50 flex items-center justify-center mb-4 group-hover:bg-[#f2a65a]/15 transition-colors">
                      <Icon size={20} className="text-blue-500" />
                    </div>
                    <h4 className="text-[#ecebe4] font-semibold text-sm mb-1.5">{service.title}</h4>
                    <p className="text-[#8f8d80] text-xs leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default About;