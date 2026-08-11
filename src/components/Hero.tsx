import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, Code2, Layers, Rocket, Briefcase } from 'lucide-react';

const ROLES = [
  "Full-Stack Developer",
  "Software Engineer",
  "MERN Stack Developer",
  "Spring Boot Developer",
  "Cloud & DevOps Enthusiast",
  "Web Application Builder"
];

const STATS = [
  { icon: Briefcase, value: 'Aztra · Intern', label: 'Currently at' },
  { icon: Layers, value: 'MERN + Spring', label: 'Core Stack' },
  { icon: Rocket, value: 'Cloud-ready', label: 'Deployments' },
  { icon: Code2, value: '10+ Projects', label: 'Built & shipped' },
];

const SOCIAL_LINKS = [
  { icon: Github, url: 'https://github.com/Ekdvs', label: 'GitHub' },
  { icon: Linkedin, url: 'https://linkedin.com/in/vishwa-sampath', label: 'LinkedIn' },
  { icon: Mail, url: 'mailto:ekdvsampath@gmail.com', label: 'Email' },
];

const FULL_NAME = 'Vishwa Sampath';

// --- Modern reactive background: particle mesh + mouse parallax + aurora glow ---
const ReactiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let width = 0, height = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // palette of soft blues/cyans/violets for depth variety
    const PALETTE = ['96,165,250', '56,189,248', '129,140,248', '167,139,250'];

    type Particle = {
      x: number; y: number; vx: number; vy: number; r: number;
      layer: number; color: string; twinkleSeed: number; twinkleSpeed: number;
    };

    const makeParticles = (count: number, layer: number): Particle[] =>
      Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (0.12 + layer * 0.18),
        vy: (Math.random() - 0.5) * (0.12 + layer * 0.18),
        r: (Math.random() * 1.1 + 0.4) * (0.7 + layer * 0.6),
        layer,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        twinkleSeed: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.6 + Math.random() * 1.2,
      }));

    // two depth layers: distant dim/small, near bright/large
    const pts: Particle[] = [...makeParticles(46, 0), ...makeParticles(26, 1)];

    type Shard = { x: number; y: number; vx: number; vy: number; len: number; life: number; maxLife: number };
    let shards: Shard[] = [];
    const spawnShootingStar = () => {
      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -20 : width + 20;
      const startY = Math.random() * height * 0.5;
      const speed = 6 + Math.random() * 3;
      shards.push({
        x: startX,
        y: startY,
        vx: (fromLeft ? 1 : -1) * speed,
        vy: speed * 0.35,
        len: 70 + Math.random() * 40,
        life: 0,
        maxLife: 60,
      });
    };
    const shootingInterval = setInterval(() => {
      if (Math.random() < 0.6) spawnShootingStar();
    }, 3200);

    type Burst = { x: number; y: number; life: number };
    let bursts: Burst[] = [];
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      bursts.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, life: 0 });
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - rect.left - 200}px, ${e.clientY - rect.top - 200}px)`;
        glowRef.current.style.opacity = '1';
      }
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    canvas.parentElement?.addEventListener('mousemove', onMove);
    canvas.parentElement?.addEventListener('mouseleave', onLeave);
    canvas.parentElement?.addEventListener('click', onClick);

    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);
      const m = mouseRef.current;

      // connecting lines first, so particles glow on top
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          if (a.layer !== b.layer) continue; // only link same-depth particles
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const maxD = 90 + a.layer * 20;
          if (d < maxD) {
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, `rgba(${a.color},${0.16 * (1 - d / maxD)})`);
            grad.addColorStop(1, `rgba(${b.color},${0.16 * (1 - d / maxD)})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5 + a.layer * 0.3;
            ctx.stroke();
          }
        }
      }

      pts.forEach((p) => {
        // gentle mouse repulsion, stronger for near layer
        const dx = p.x - m.x, dy = p.y - m.y;
        const dist = Math.hypot(dx, dy);
        const radius = 110 + p.layer * 40;
        if (dist < radius) {
          const force = (radius - dist) / radius;
          p.x += (dx / (dist || 1)) * force * (1 + p.layer);
          p.y += (dy / (dist || 1)) * force * (1 + p.layer);
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const twinkle = 0.45 + Math.sin(t * p.twinkleSpeed + p.twinkleSeed) * 0.35;
        ctx.save();
        ctx.shadowBlur = 8 + p.layer * 6;
        ctx.shadowColor = `rgba(${p.color},0.9)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${twinkle})`;
        ctx.fill();
        ctx.restore();
      });

      // shooting stars
      shards = shards.filter((s) => s.life < s.maxLife);
      shards.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const alpha = 1 - s.life / s.maxLife;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * (s.len / 8), s.y - s.vy * (s.len / 8));
        grad.addColorStop(0, `rgba(224,242,254,${alpha})`);
        grad.addColorStop(1, 'rgba(224,242,254,0)');
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * (s.len / 8), s.y - s.vy * (s.len / 8));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // click ripple bursts
      bursts = bursts.filter((b) => b.life < 40);
      bursts.forEach((b) => {
        b.life++;
        const progress = b.life / 40;
        ctx.beginPath();
        ctx.arc(b.x, b.y, progress * 60, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(96,165,250,${0.5 * (1 - progress)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shootingInterval);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMove);
      canvas.parentElement?.removeEventListener('mouseleave', onLeave);
      canvas.parentElement?.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      {/* animated aurora mesh gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-30 blur-[110px] bg-gradient-to-br from-blue-600 via-cyan-500 to-transparent animate-[drift1_18s_ease-in-out_infinite]" />
        <div className="absolute -bottom-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full opacity-25 blur-[110px] bg-gradient-to-tr from-cyan-400 via-indigo-500 to-transparent animate-[drift2_22s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40vw] h-[40vw] rounded-full opacity-[0.12] blur-[130px] bg-blue-400 animate-[drift3_26s_ease-in-out_infinite]" />
      </div>

      {/* moving grid with slow pan */}
      <div
        className="absolute inset-0 pointer-events-none animate-[panGrid_40s_linear_infinite]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,139,253,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,139,253,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)',
        }}
      />

      {/* cursor-follow glow */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none opacity-0 transition-opacity duration-300 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      <style>{`
        @keyframes drift1 { 0%,100%{ transform: translate(0,0) scale(1);} 50%{ transform: translate(6%,8%) scale(1.1);} }
        @keyframes drift2 { 0%,100%{ transform: translate(0,0) scale(1);} 50%{ transform: translate(-6%,-6%) scale(1.08);} }
        @keyframes drift3 { 0%,100%{ transform: translate(-50%,0) scale(1);} 50%{ transform: translate(-50%,-10%) scale(1.15);} }
        @keyframes panGrid { from{ background-position: 0 0, 0 0;} to{ background-position: 48px 48px, 48px 48px;} }
      `}</style>
    </>
  );
};

// --- Main component ---
const Hero: React.FC = () => {
  // ── one-time name typewriter ──
  const [displayName, setDisplayName] = useState('');
  const [nameTyped, setNameTyped] = useState(false);

  // ── cycling role typewriter ──
  const [roleText, setRoleText] = useState('');
  const roleIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const deletingRef = useRef(false);

  /* type the name once on mount */
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayName(FULL_NAME.slice(0, i));
      if (i === FULL_NAME.length) {
        clearInterval(id);
        setNameTyped(true);
      }
    }, 60);
    return () => clearInterval(id);
  }, []);

  /* start cycling roles only after name is fully typed */
  useEffect(() => {
    if (!nameTyped) return;

    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = ROLES[roleIdxRef.current];
      const deleting = deletingRef.current;

      if (!deleting) {
        charIdxRef.current++;
        setRoleText(word.slice(0, charIdxRef.current));
        if (charIdxRef.current === word.length) {
          deletingRef.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
        timeout = setTimeout(tick, 80);
      } else {
        charIdxRef.current--;
        setRoleText(word.slice(0, charIdxRef.current));
        if (charIdxRef.current === 0) {
          deletingRef.current = false;
          roleIdxRef.current = (roleIdxRef.current + 1) % ROLES.length;
          timeout = setTimeout(tick, 300);
          return;
        }
        timeout = setTimeout(tick, 40);
      }
    };

    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, [nameTyped]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#060b14]"
    >
      <ReactiveBackground />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in">

        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-emerald-300 border border-emerald-500/25 bg-emerald-500/[0.08]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        {/* Name — typed once, never replays */}
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[#f0f6ff] mb-3 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            {displayName}
            {!nameTyped && (
              <span className="text-blue-400 animate-[blink_0.9s_step-end_infinite]">|</span>
            )}
          </span>
        </h1>

        {/* Role typewriter — starts only after name is done */}
        <p className="text-xl text-gray-400 mb-2 h-8">
          {nameTyped && (
            <>
              <span className="text-cyan-400 font-medium">{roleText}</span>
              <span className="text-blue-400 animate-[blink_0.9s_step-end_infinite]">|</span>
            </>
          )}
        </p>

        <p className="text-sm text-gray-600 mb-8 tracking-wide">
          Full-Stack Development · MERN Stack · Spring Boot · Real-time Applications · Cloud Deployment
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 justify-center mb-7">
          <a
            href="#projects"
            className="group relative px-7 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30 overflow-hidden"
          >
            <span className="relative z-10">View Projects</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-cyan-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
          <a
            href="vishwa_sampath_SE.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-2.5 rounded-full border border-blue-500/40 text-blue-300 text-sm font-medium hover:bg-blue-500/10 transition-all duration-200 hover:-translate-y-0.5"
          >
            Download CV
          </a>
        </div>

        {/* Social */}
        <div className="flex justify-center gap-3 mb-8">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-blue-500/20 bg-blue-500/[0.07] text-gray-500 hover:text-blue-300 hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/20 transition-all duration-200"
            >
              <s.icon size={17} />
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-2.5 justify-center">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] bg-white/[0.03] hover:border-blue-500/30 hover:bg-white/[0.05] transition-all duration-200"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
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
        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fade-in   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .animate-fade-in     { animation: fade-in 0.8s ease both; }
      `}</style>
    </section>
  );
};

export default Hero;