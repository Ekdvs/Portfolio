import React from 'react';
import type { Skill } from '../types';


interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  const stats = [
    { number: "5+", label: "Major Projects" },
    { number: "3", label: "Hackathons" },
    { number: "6+", label: "Certifications" },
    { number: "0", label: "Research Papers" }
  ];

  return (
    <section id="skills" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Technical Skills
        </h2>
        
        {/* Skills Progress Bars */}
        <div className="max-w-4xl mx-auto space-y-8">
          {skills.map((skill, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-blue-400">{skill.level}%</span>
              </div>
              <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-blue-500/20"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;