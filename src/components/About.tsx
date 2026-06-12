import React from 'react';
import {
  Mail, Phone, MapPin, BookOpen, Github, Linkedin,
  Terminal, Award, Languages, Heart, Briefcase,
  Lightbulb, Users, RefreshCw, Clock, TrendingUp, MessageSquare,
  
} from 'lucide-react';
import type { Service } from '../types';
import ExperienceSection from './Experience';
import { experience } from '../data/experience';


interface AboutProps {
  services: Service[];
  profileImage: string;
}

// ── data ─────────────────────────────────────────────────────────────────────

const CONTACT = [
  { icon: Mail,      label: 'Email',      value: 'ekdvsampath@gmail.com' },
  { icon: Phone,     label: 'Phone',      value: '+94 71 897 4153' },
  { icon: MapPin,    label: 'Location',   value: 'Opanayaka, Sri Lanka' },
  { icon: BookOpen,  label: 'University', value: 'University of Kelaniya' },
  { icon: Github,    label: 'GitHub',     value: 'Ekdvs' },
  { icon: Linkedin,  label: 'LinkedIn',   value: 'vishwa-sampath' },
];

const SKILL_GROUPS = [
  {
    label: 'Frontend',
    color: 'blue' as const,
    tags: ['React.js', 'Next.js', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    label: 'Backend',
    color: 'cyan' as const,
    tags: ['Node.js', 'Express.js', 'Spring Boot', 'FastAPI', 'Socket.io', 'REST APIs', 'MVC'],
  },
  {
    label: 'Databases',
    color: 'green' as const,
    tags: ['MongoDB', 'MySQL', 'SQL Server', 'PostgreSQL'],
  },
  {
    label: 'Languages',
    color: 'purple' as const,
    tags: ['JavaScript', 'TypeScript', 'Java', 'Python', 'PHP', 'C', 'C#'],
  },
  {
    label: 'DevOps & Tools',
    color: 'blue' as const,
    tags: ['Git', 'Docker', 'AWS EC2', 'Vercel', 'Render', 'Postman', 'Figma', 'GCP'],
  },
  {
    label: 'Core Competencies',
    color: 'cyan' as const,
    tags: ['JWT Auth', 'OAuth', 'WebSockets', 'OOP', 'DSA', 'CI/CD', 'Cloud Deployment'],
  },
];

const EDUCATION = [
  {
    degree: 'B.Sc. Physical Sciences (Computer Science)',
    school: 'University of Kelaniya, Sri Lanka',
    meta: '2021 – 2025 · Computer Science, Pure Mathematics, Chemistry',
    badge: 'GPA 3.13',
    badgeColor: 'green',
  },
  {
    degree: 'Full Stack MERN Development Program',
    school: 'SKYREK (Pvt) Ltd., Sri Lanka',
    meta: '2025 · Successfully completed',
    badge: null,
    badgeColor: null,
  },
  {
    degree: 'Software Engineering & Full Stack Training',
    school: 'DP Education IT Campus & Coding School',
    meta: '2023 – Present',
    badge: null,
    badgeColor: null,
  },
];





const SOFT_SKILLS = [
  { icon: Lightbulb,     label: 'Problem solving' },
  { icon: Users,         label: 'Team collaboration' },
  { icon: RefreshCw,     label: 'Adaptability' },
  { icon: Clock,         label: 'Time management' },
  { icon: TrendingUp,    label: 'Self-motivation' },
  { icon: MessageSquare, label: 'Communication' },
];

// ── helpers ───────────────────────────────────────────────────────────────────

const tagClass: Record<string, string> = {
  blue:   'border-blue-500/20 bg-blue-500/8 text-blue-300',
  cyan:   'border-cyan-500/20 bg-cyan-500/8 text-cyan-300',
  green:  'border-green-500/20 bg-green-500/8 text-green-300',
  purple: 'border-purple-500/20 bg-purple-500/8 text-purple-300',
};

const Section: React.FC<{ icon: React.ElementType; label: string }> = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-2 text-[11px] text-blue-400/80 font-semibold uppercase tracking-widest mb-4">
    <Icon size={13} className="text-blue-500" />
    {label}
  </div>
);

const Divider = () => <div className="h-px bg-gradient-to-r from-transparent via-blue-500/15 to-transparent my-10" />;

// ── component ─────────────────────────────────────────────────────────────────

const About: React.FC<AboutProps> = ({ services, profileImage }) => {
  return (
    <section id="about" className="py-24 bg-[#060b14] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-600 opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-64 h-64 bg-cyan-500 opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[11px] tracking-widest font-semibold text-blue-500 uppercase mb-3">
            Who I am
          </span>
          <h2 className="text-4xl sm:text-5xl font-semibold text-[#f0f6ff] tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">me</span>
          </h2>
        </div>

        {/* Top: avatar + bio */}
        <div className="flex flex-col md:flex-row gap-10 mb-10">

          {/* Left: avatar */}
          <div className="flex flex-col items-center gap-4 md:w-64 shrink-0">
            <div className="relative">
              <div className="w-44 h-44 rounded-2xl border border-blue-500/20 overflow-hidden bg-blue-500/5">
                {profileImage ? (
                  <img src={profileImage} alt="Vishwa Sampath" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-semibold text-blue-300">VS</div>
                )}
              </div>
              {/* Online dot */}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#060b14] shadow-lg shadow-emerald-500/40" />
            </div>

            <div className="text-center">
              <div className="text-sm font-semibold text-white/80">Vishwa Sampath</div>
              <div className="text-xs text-gray-600 mt-0.5">Full-Stack Developer</div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-[11px] text-emerald-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for opportunities
            </div>

            {/* Contact grid */}
            <div className="grid grid-cols-2 gap-1.5 w-full">
              {CONTACT.map((c) => (
                <div key={c.label} className="flex items-start gap-2 p-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/20 transition-colors">
                  <c.icon size={13} className="text-blue-500 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-[9px] text-gray-700 uppercase tracking-wide">{c.label}</div>
                    <div className="text-[10px] text-blue-200/70 font-medium break-all leading-tight mt-0.5">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: bio */}
          <div className="flex flex-col justify-start gap-5 flex-1">
            <p className="text-[0.92rem] text-gray-400 leading-relaxed">
              I'm a <span className="text-cyan-400 font-medium">motivated Full-Stack Developer</span> and
              B.Sc. Computer Science graduate (GPA 3.13) from the University of Kelaniya. I build
              scalable, production-ready web applications using modern technologies with a strong focus on
              clean architecture and real-world deployment.
            </p>
            <p className="text-[0.92rem] text-gray-400 leading-relaxed">
              I specialize in the <span className="text-cyan-400 font-medium">MERN stack</span> and{' '}
              <span className="text-cyan-400 font-medium">Spring Boot</span>, with hands-on experience in
              real-time systems via Socket.io, JWT / OAuth authentication, REST APIs, and cloud deployment
              on AWS EC2, Vercel, and Render using Docker. Currently interning as a Software Engineer at{' '}
              <span className="text-cyan-400 font-medium">Aztra</span>.
            </p>

            {/* Languages */}
            <div>
              <Section icon={Languages} label="Languages" />
              <div className="flex gap-3">
                {[
                  { name: 'Sinhala', level: 'Native' },
                  { name: 'English', level: 'Professional working proficiency' },
                ].map((l) => (
                  <div key={l.name} className="flex-1 text-center p-3 rounded-xl border border-white/[0.05] bg-white/[0.02]">
                    <div className="text-sm font-medium text-blue-100/80">{l.name}</div>
                    <div className="text-[11px] text-gray-600 mt-1">{l.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Experience */}
        <div className="mb-10">
          <Section icon={Briefcase} label="Experience" />
          <ExperienceSection experience={experience} />
        </div>

        <Divider />

        {/* Skills + Education */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">

          {/* Skills */}
          <div>
            <Section icon={Terminal} label="Technical Skills" />
            <div className="space-y-4">
              {SKILL_GROUPS.map((group) => (
                <div key={group.label}>
                  <div className="text-[10px] text-gray-700 tracking-widest mb-2 uppercase font-medium">{group.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.tags.map((tag) => (
                      <span key={tag} className={`text-[11px] px-2.5 py-1 rounded-lg border ${tagClass[group.color]}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education + Soft skills */}
          <div className="space-y-7">
            <div>
              <Section icon={Award} label="Education" />
              <div className="space-y-2.5">
                {EDUCATION.map((e) => (
                  <div key={e.degree} className="p-3.5 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/15 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-sm font-medium text-blue-100/80">{e.degree}</div>
                      {e.badge && (
                        <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full border border-green-500/30 bg-green-500/8 text-green-300 font-medium">
                          {e.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-cyan-500 mt-1">{e.school}</div>
                    <div className="text-[11px] text-gray-600 mt-0.5">{e.meta}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Section icon={Heart} label="Soft Skills" />
              <div className="grid grid-cols-2 gap-2">
                {SOFT_SKILLS.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] text-xs text-gray-500 hover:border-blue-500/15 transition-colors">
                    <s.icon size={13} className="text-blue-500 shrink-0" />
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
              <span className="text-[11px] tracking-widest font-semibold text-blue-500 uppercase">What I offer</span>
              <h3 className="text-2xl font-semibold text-[#f0f6ff] mt-2">Services</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <div key={i} className="p-5 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/20 hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4 group-hover:bg-blue-500/15 transition-colors">
                      <Icon size={20} className="text-blue-400" />
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1.5">{service.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
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