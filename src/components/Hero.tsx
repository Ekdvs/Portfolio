import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { Github, Linkedin, Mail, ChevronDown, Code2, Layers, Rocket, Briefcase } from 'lucide-react';



const ROLES = [
  'Full-Stack Developer',
  'Software Engineer',
  'MERN Stack Developer',
  'Spring Boot Developer',
  'Cloud & DevOps Enthusiast',
  'Web Application Builder',
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

const PALETTE = [
  new THREE.Color('#60a5fa'),
  new THREE.Color('#38bdf8'),
  new THREE.Color('#818cf8'),
  new THREE.Color('#a78bfa'),
];

/* ============ Radial-gradient sprite texture, built once on canvas ============ */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d')!;
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }, []);
}

/* ============ Drifting aurora glow blobs (additive sprites) ============ */
const AURA_CONFIGS = [
  { color: '#2563eb', pos: [-3.4, 1.4, -5] as [number, number, number], scale: 7.5, speed: 0.16 },
  { color: '#22d3ee', pos: [3.4, -1.3, -5.2] as [number, number, number], scale: 6.8, speed: 0.13 },
  { color: '#818cf8', pos: [0, 0.6, -5.6] as [number, number, number], scale: 5.4, speed: 0.1 },
];

const AuroraGlow: React.FC = () => {
  const tex = useGlowTexture();
  const refs = useRef<(THREE.Sprite | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    AURA_CONFIGS.forEach((c, i) => {
      const s = refs.current[i];
      if (!s) return;
      s.position.x = c.pos[0] + Math.sin(t * c.speed) * 0.8;
      s.position.y = c.pos[1] + Math.cos(t * c.speed * 0.8) * 0.6;
    });
  });

  return (
    <>
      {AURA_CONFIGS.map((c, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)} position={c.pos} scale={[c.scale, c.scale, 1]}>
          <spriteMaterial
            map={tex}
            color={c.color}
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ))}
    </>
  );
};

/* ============ Particle network — two depth layers, mouse repulsion, live connecting lines ============ */
const PARTICLE_COUNT = 70;
const LAYER_SPLIT = 46;

const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const ParticleNetwork: React.FC = () => {
  const { camera, size } = useThree();
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseWorld = useRef(new THREE.Vector3(9999, 9999, 0));
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));

  // Static particle definitions never change after mount, so useMemo is fine here.
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const layer = i < LAYER_SPLIT ? 0 : 1;
        const r1 = pseudoRandom(i * 4 + 1);
        const r2 = pseudoRandom(i * 4 + 2);
        const r3 = pseudoRandom(i * 4 + 3);
        const r4 = pseudoRandom(i * 4 + 4);
        return {
          x: (r1 - 0.5) * 10,
          y: (r2 - 0.5) * 7,
          vx: (r3 - 0.5) * (0.006 + layer * 0.01),
          vy: (r4 - 0.5) * (0.006 + layer * 0.01),
          layer,
          color: PALETTE[Math.floor(r1 * PALETTE.length)],
          seed: r2 * Math.PI * 2,
          speed: 0.6 + r3 * 1.2,
        };
      }),
    []
  );

  // These typed arrays are mutated every frame inside useFrame, so they must
  // live in a ref (mutable persistent storage), not a memoized hook value.
  const positionsRef = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));
  const colorsRef = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3));

  const maxLines = (PARTICLE_COUNT * (PARTICLE_COUNT - 1)) / 2;
  const linePositionsRef = useRef<Float32Array>(new Float32Array(maxLines * 2 * 3));
  const lineColorsRef = useRef<Float32Array>(new Float32Array(maxLines * 2 * 3));

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const ndc = new THREE.Vector2((e.clientX / size.width) * 2 - 1, -(e.clientY / size.height) * 2 + 1);
      raycaster.current.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      const ok = raycaster.current.ray.intersectPlane(plane.current, hit);
      if (ok) mouseWorld.current.copy(hit);
    };
    const onLeave = () => mouseWorld.current.set(9999, 9999, 0);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [camera, size]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const m = mouseWorld.current;
    const positions = positionsRef.current;
    const colors = colorsRef.current;
    const linePositions = linePositionsRef.current;
    const lineColors = lineColorsRef.current;

    particles.forEach((p, i) => {
      const dx = p.x - m.x;
      const dy = p.y - m.y;
      const dist = Math.hypot(dx, dy);
      const radius = 1.6 + p.layer * 0.6;
      if (dist < radius) {
        const force = (radius - dist) / radius;
        p.x += (dx / (dist || 1)) * force * 0.05 * (1 + p.layer);
        p.y += (dy / (dist || 1)) * force * 0.05 * (1 + p.layer);
      }
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -5.5) p.x = 5.5;
      if (p.x > 5.5) p.x = -5.5;
      if (p.y < -3.8) p.y = 3.8;
      if (p.y > 3.8) p.y = -3.8;

      const z = p.layer === 0 ? -2.6 : -0.9;
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = z;

      const twinkle = 0.5 + Math.sin(t * p.speed + p.seed) * 0.4;
      colors[i * 3] = p.color.r * twinkle;
      colors[i * 3 + 1] = p.color.g * twinkle;
      colors[i * 3 + 2] = p.color.b * twinkle;
    });

    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
    }

    let lineCount = 0;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        if (a.layer !== b.layer) continue;
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const maxD = 1.4 + a.layer * 0.3;
        if (d < maxD && lineCount < maxLines) {
          const idx = lineCount * 6;
          const az = a.layer === 0 ? -2.6 : -0.9;
          const bz = b.layer === 0 ? -2.6 : -0.9;
          linePositions[idx] = a.x;
          linePositions[idx + 1] = a.y;
          linePositions[idx + 2] = az;
          linePositions[idx + 3] = b.x;
          linePositions[idx + 4] = b.y;
          linePositions[idx + 5] = bz;
          const alpha = 1 - d / maxD;
          lineColors[idx] = a.color.r * alpha;
          lineColors[idx + 1] = a.color.g * alpha;
          lineColors[idx + 2] = a.color.b * alpha;
          lineColors[idx + 3] = b.color.r * alpha;
          lineColors[idx + 4] = b.color.g * alpha;
          lineColors[idx + 5] = b.color.b * alpha;
          lineCount++;
        }
      }
    }
    if (linesRef.current) {
      const geo = linesRef.current.geometry;
      (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geo.attributes.color as THREE.BufferAttribute).needsUpdate = true;
      geo.setDrawRange(0, lineCount * 2);
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positionsRef.current, 3]} />
          <bufferAttribute attach="attributes-color" args={[colorsRef.current, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.055}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositionsRef.current, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColorsRef.current, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </>
  );
};

/* ============ Shooting stars — spawned periodically, fade out as line trails ============ */
const ShootingStars: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const shards = useRef<{ mesh: THREE.Line; vx: number; vy: number; life: number; maxLife: number }[]>([]);

  const spawn = () => {
    if (!groupRef.current) return;
    const fromLeft = Math.random() > 0.5;
    const startX = fromLeft ? -6 : 6;
    const startY = (Math.random() - 0.5) * 3 + 1.4;
    const speed = 0.09 + Math.random() * 0.05;
    const vx = fromLeft ? speed : -speed;
    const vy = -speed * 0.35;

    const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(-vx * 9, -vy * 9, 0)]);
    const mat = new THREE.LineBasicMaterial({
      color: '#e0f2fe',
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Line(geo, mat);
    mesh.position.set(startX, startY, -1.4);
    groupRef.current.add(mesh);
    shards.current.push({ mesh, vx, vy, life: 0, maxLife: 55 });
  };

  useFrame(() => {
    if (Math.random() < 0.004) spawn();
    shards.current = shards.current.filter((s) => {
      s.life++;
      s.mesh.position.x += s.vx;
      s.mesh.position.y += s.vy;
      const mat = s.mesh.material as THREE.LineBasicMaterial;
      mat.opacity = Math.max(0, 1 - s.life / s.maxLife);
      if (s.life >= s.maxLife) {
        groupRef.current?.remove(s.mesh);
        s.mesh.geometry.dispose();
        mat.dispose();
        return false;
      }
      return true;
    });
  });

  return <group ref={groupRef} />;
};

/* ============ Click ripple bursts — expanding rings at the clicked point ============ */
const ClickBursts: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const bursts = useRef<{ mesh: THREE.Mesh; life: number }[]>([]);

  useFrame(() => {
    bursts.current = bursts.current.filter((b) => {
      b.life++;
      const progress = b.life / 40;
      b.mesh.scale.setScalar(1 + progress * 3);
      const mat = b.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.6 * (1 - progress));
      if (b.life >= 40) {
        groupRef.current?.remove(b.mesh);
        b.mesh.geometry.dispose();
        mat.dispose();
        return false;
      }
      return true;
    });
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const geo = new THREE.RingGeometry(0.12, 0.15, 32);
    const mat = new THREE.MeshBasicMaterial({
      color: '#60a5fa',
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(e.point);
    groupRef.current?.add(mesh);
    bursts.current.push({ mesh, life: 0 });
  };

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]} onClick={handleClick} visible={false}>
        <planeGeometry args={[24, 16]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
};

const Scene: React.FC = () => (
  <>
    <ambientLight intensity={0.3} />
    <AuroraGlow />
    <ParticleNetwork />
    <ShootingStars />
    <ClickBursts />
  </>
);

const ThreeBackground: React.FC = () => (
  <div className="absolute inset-0">
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <Scene />
    </Canvas>
  </div>
);

/* ============ Cursor-follow CSS glow + moving grid (kept lightweight, layered above canvas) ============ */
const AmbientOverlay: React.FC = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - rect.left - 200}px, ${e.clientY - rect.top - 200}px)`;
        glowRef.current.style.opacity = '1';
      }
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 animate-[panGrid_40s_linear_infinite]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(56,139,253,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(56,139,253,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)',
        }}
      />
      <div
        ref={glowRef}
        className="absolute w-100 h-100 rounded-full opacity-0 transition-opacity duration-300 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)' }}
      />
      <style>{`@keyframes panGrid { from{ background-position: 0 0, 0 0;} to{ background-position: 48px 48px, 48px 48px;} }`}</style>
    </div>
  );
};

/* ============ Main Hero ============ */
const Hero: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [nameTyped, setNameTyped] = useState(false);
  const [roleText, setRoleText] = useState('');
  const roleIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const deletingRef = useRef(false);

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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-[#060b14]">
      <ThreeBackground />
      <AmbientOverlay />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-wide text-emerald-300 border border-emerald-500/25 bg-emerald-500/8">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Available for opportunities
        </div>

        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[#f0f6ff] mb-3 leading-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
            {displayName}
            {!nameTyped && <span className="text-blue-400 animate-[blink_0.9s_step-end_infinite]">|</span>}
          </span>
        </h1>

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

        <div className="flex flex-wrap gap-2.5 justify-center">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/[0.07] bg-white/3 hover:border-blue-500/30 hover:bg-white/5 transition-all duration-200"
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

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[10px] tracking-widest text-blue-900/60 animate-bounce">
        <span>SCROLL</span>
        <ChevronDown size={14} />
      </div>

      <style>{`
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fade-in { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .animate-fade-in   { animation: fade-in 0.8s ease both; }
      `}</style>
    </section>
  );
};

export default Hero;