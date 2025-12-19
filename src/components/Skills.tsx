import React from 'react'
import type { Skill } from '../types'

interface SkillsProps {
  skills: Skill[]
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const stats = [
    { number: '5+', label: 'Major Projects' },
    { number: '3', label: 'Hackathons' },
    { number: '6+', label: 'Certifications' },
    { number: '0', label: 'Research Papers' },
  ]

  return (
    <section
      id="skills"
      className="relative py-24 bg-gradient-to-b from-slate-900/80 to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-white">
          Technical <span className="text-blue-400">Skills</span>
        </h2>

        {/* Skills */}
        <div className="mx-auto max-w-4xl space-y-10">
          {skills.map((skill) => (
            <div key={skill.name} className="group">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">
                  {skill.name}
                </span>
                <span className="text-sm font-semibold text-blue-400">
                  {skill.level}%
                </span>
              </div>

              <div className="relative h-3 overflow-hidden rounded-full bg-slate-800">
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 blur-xl transition group-hover:opacity-100 bg-blue-500/20" />

                {/* Progress */}
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-cyan-300"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {/* Gradient ring */}
              <div className="absolute inset-0 rounded-2xl opacity-0 ring-1 ring-blue-400/30 transition group-hover:opacity-100" />

              <div className="relative text-4xl font-bold text-blue-400">
                {stat.number}
              </div>
              <p className="relative mt-2 text-sm text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
