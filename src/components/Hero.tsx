import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code2, Layers, Rocket, Briefcase } from 'lucide-react';

const ROLES = ['Full-Stack Developer', 'Software Engineer', 'MERN Specialist', 'Spring Boot Dev'];

const STATS = [
  { icon: Briefcase, value: 'Aztra · Intern',    label: 'Currently at' },
  { icon: Layers,    value: 'MERN + Spring',      label: 'Core Stack' },
  { icon: Rocket,    value: 'Cloud-ready',         label: 'Deployments' },
  { icon: Code2,     value: '7+ Projects',         label: 'Built & shipped' },
];

const SOCIAL_LINKS = [
  { icon: Github,   url: 'https://github.com/Ekdvs',                    label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/vishwa-sampath',      label: 'LinkedIn' },
  { icon: Mail,     url: 'mailto:ekdvsampath@gmail.com',                label: 'Email' },
];

// --- Particle canvas ---
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.4,
      a: Math.random() * 0.5 + 0.2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,${p.a})`;
        ctx.fill();
      });
      pts.forEach((a, i) =>
        pts.slice(i + 1).forEach((b) => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59,130,246,${0.12 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        })
      );
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

// --- Typewriter hook ---
const useTypewriter = (words: string[], typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    const timeout = setTimeout(() => {
      setText((prev) => {
        if (!isDeleting) return current.slice(0, prev.length + 1);
        return current.slice(0, prev.length - 1);
      });
      if (!isDeleting && text === current) setTimeout(() => setIsDeleting(true), pauseMs);
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }
    }, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, pauseMs]);

  return text;
};

// --- Main component ---
const Hero: React.FC = () => {
  const role = useTypewriter(ROLES);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#060b14]">
      <ParticleCanvas />

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(56,139,253,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(56,139,253,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }} />

      {/* Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-500 rounded-full opacity-[0.10] blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-cyan-400 rounded-full opacity-[0.10] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in">

        {/* Status badge — now shows internship */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-emerald-300 border border-emerald-500/25 bg-emerald-500/8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Software Engineer Intern @ Aztra · May 2026
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[#f0f6ff] mb-3 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            Vishwa Sampath
          </span>
        </h1>

        {/* Typewriter */}
        <p className="text-xl text-gray-400 mb-2 h-8">
          <span className="text-cyan-400 font-medium">{role}</span>
          <span className="text-blue-400 animate-[blink_0.9s_step-end_infinite]">|</span>
        </p>

        <p className="text-sm text-gray-600 mb-8 tracking-wide">
          MERN Stack · Spring Boot · Real-time Apps · Cloud Deployment
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mb-7">
          <a href="#projects" className="px-7 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30">
            View Projects
          </a>
          <a href="vishwa_sampath_SE.pdf" target="_blank" rel="noopener noreferrer"
            className="px-7 py-2.5 rounded-full border border-blue-500/40 text-blue-300 text-sm font-medium hover:bg-blue-500/10 transition-all duration-200 hover:-translate-y-0.5">
            Download CV
          </a>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-3 mb-8">
          {SOCIAL_LINKS.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-blue-500/20 bg-blue-500/7 text-gray-500 hover:text-blue-300 hover:border-blue-500/50 hover:-translate-y-0.5 transition-all duration-200">
              <s.icon size={17} />
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03]"
              style={{ animationDelay: `${i * 0.15}s` }}>
              <s.icon size={15} className="text-blue-500 shrink-0" />
              <div className="text-left">
                <div className="text-[13px] font-medium text-blue-100/80">{s.value}</div>
                <div className="text-[11px] text-gray-600">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] tracking-widest text-blue-900/60 animate-bounce">
        <span>SCROLL</span>
        <ChevronDown size={14} />
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .animate-fade-in { animation: fade-in 0.8s ease both; }
      `}</style>
    </section>
  );
};

export default Hero;