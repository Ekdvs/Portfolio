import React from 'react';
import type { Experience } from '../types';
import { Briefcase } from 'lucide-react';

interface ExperienceProps {
  experience: Experience[];
}

const ExperienceSection: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <div className="mb-10">
      {/* Section title */}
      <div className="flex items-center gap-2 text-[11px] text-blue-400/80 font-semibold uppercase tracking-widest mb-4">
        <Briefcase size={13} className="text-blue-500" />
        Experience
      </div>

      {/* Timeline */}
      <div className="space-y-5">
        {experience.map((exp) => (
          <div key={exp.id} className="relative pl-6 border-l border-blue-500/20">
            {/* Dot */}
            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#060b14]" />

            {/* Card */}
            <div className="p-4 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-blue-500/20 transition-colors">
              
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-sm font-semibold text-blue-100/90">
                    {exp.role}
                  </div>
                  <div className="text-xs text-cyan-500 mt-0.5">
                    {exp.company} · {exp.type}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-600">
                    {exp.startDate} – {exp.endDate ?? 'Present'}
                  </span>

                  {exp.current && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/25 bg-emerald-500/8 text-emerald-300 font-medium">
                      Current
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <ul className="space-y-1">
                {exp.description?.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-[12px] text-gray-500">
                    <span className="text-blue-600 mt-0.5">›</span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Optional meta */}
              {exp.location && (
                <div className="mt-2 text-[11px] text-gray-600">
                  📍 {exp.location} {exp.mode ? `· ${exp.mode}` : ''}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceSection;