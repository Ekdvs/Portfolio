import React, { useEffect, useRef, useState } from 'react'
import type { Skill } from '../types'

interface SkillsProps {
  skills: Skill[]
}

const categoryColor: Record<Skill['category'], string> = {
  frontend: 'bg-blue-400/15 text-blue-300 ring-blue-400/30',
  backend: 'bg-violet-400/15 text-violet-300 ring-violet-400/30',
  database: 'bg-emerald-400/15 text-emerald-300 ring-emerald-400/30',
  tools: 'bg-amber-400/15 text-amber-300 ring-amber-400/30',
}

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fires once when the element enters the viewport. */
function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null)
  const [isInView, setIsInView] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

/** Counts a numeric string like "5+" or "6+" up to its target. */
function useCountUp(value: string, isInView: boolean, duration = 1200) {
  const numericTarget = parseInt(value.match(/\d+/)?.[0] ?? '0', 10)
  const suffix = value.replace(/^\d+/, '')
  const [display, setDisplay] = useState(prefersReducedMotion ? numericTarget : 0)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return
    let start: number | null = null
    let frame: number

    const step = (timestamp: number) => {
      if (start === null) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * numericTarget))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isInView, numericTarget, duration])

  return `${display}${suffix}`
}

const SkillBar: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const delay = `${index * 90}ms`

  return (
    <div
      ref={ref}
      className="group transition-all duration-700 ease-out"
      style={{
        transitionDelay: delay,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(16px)',
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-300">{skill.name}</span>
          <span
            className={`hidden rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 sm:inline-block ${categoryColor[skill.category]}`}
          >
            {skill.category}
          </span>
        </div>
        <span className="text-sm font-semibold text-blue-400">{skill.level}%</span>
      </div>

      <div className="relative h-3 overflow-hidden rounded-full bg-slate-800">
        {/* Glow on hover */}
        <div className="absolute inset-0 bg-blue-500/20 opacity-0 blur-xl transition group-hover:opacity-100" />

        {/* Progress fill — animates from 0 to level only once in view */}
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out group-hover:from-blue-400 group-hover:to-cyan-300"
          style={{
            width: isInView ? `${skill.level}%` : '0%',
            transitionDelay: delay,
          }}
        >
          {/* Shimmer sweep */}
          <div className="absolute inset-0 animate-pulse bg-white/10" />
        </div>
      </div>
    </div>
  )
}

const StatCard: React.FC<{ number: string; label: string; index: number }> = ({
  number,
  label,
  index,
}) => {
  const { ref, isInView } = useInView<HTMLDivElement>()
  const animatedValue = useCountUp(number, isInView)
  const delay = `${index * 100}ms`

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur transition-all duration-700 ease-out hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-500/10"
      style={{
        transitionDelay: delay,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 ring-1 ring-blue-400/30 transition group-hover:opacity-100" />
      <div className="relative text-4xl font-bold text-blue-400">{animatedValue}</div>
      <p className="relative mt-2 text-sm text-slate-400">{label}</p>
    </div>
  )
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const { ref: headingRef, isInView: headingInView } = useInView<HTMLHeadingElement>()

  const stats = [
    { number: '10+', label: 'Major Projects' },
    { number: '3', label: 'Hackathons' },
    { number: '10+', label: 'Certifications' },
    { number: '0', label: 'Research Papers' },
  ]

  return (
    <section
      id="skills"
      className="relative py-24 bg-gradient-to-b from-slate-900/80 to-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <h2
          ref={headingRef}
          className="mb-16 text-center text-4xl font-bold tracking-tight text-white transition-all duration-700 ease-out"
          style={{
            opacity: headingInView ? 1 : 0,
            transform: headingInView ? 'translateY(0)' : 'translateY(-12px)',
          }}
        >
          Technical <span className="text-blue-400">Skills</span>
        </h2>

        {/* Skills */}
        <div className="mx-auto max-w-4xl space-y-10">
          {skills.map((skill, index) => (
            <SkillBar key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} number={stat.number} label={stat.label} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills