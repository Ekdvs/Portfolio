import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [project]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };

    document.addEventListener('keydown', handleEsc);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = prevOverflow || '';
    };
  }, [onClose, project, index]);

  if (!project) return null;

  const total = project.image.length;

  const prev = () => setIndex((i) => (i === 0 ? total - 1 : i - 1));
  const next = () => setIndex((i) => (i === total - 1 ? 0 : i + 1));

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  const getOffset = (i: number) => {
    let diff = i - index;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div className="min-h-full flex items-center justify-center p-4 py-10">
        <div
          className="relative w-full max-w-4xl rounded-3xl border border-white/[0.08] bg-[#0a0f1c] shadow-2xl shadow-blue-500/10 animate-in zoom-in-95 duration-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full border border-white/[0.08] bg-black/50 backdrop-blur-sm text-gray-400 hover:text-white hover:border-blue-500/30 hover:bg-black/70 transition-all"
          >
            <X size={16} />
          </button>

          {/* Slider */}
          <div
            className="relative w-full h-[280px] sm:h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-950/30 to-[#0a0f1c]"
            style={{ perspective: '1200px' }}
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl pointer-events-none" />

            {project.image.map((src, i) => {
              const offset = getOffset(i);
              const abs = Math.abs(offset);

              if (abs > 2) return null;

              const isActive = offset === 0;

              return (
                <div
                  key={i}
                  onClick={() => !isActive && setIndex(i)}
                  className={`absolute transition-all duration-500 ease-out rounded-2xl overflow-hidden border ${
                    isActive
                      ? 'border-blue-500/40 shadow-2xl shadow-blue-500/30 cursor-default'
                      : 'border-white/10 cursor-pointer'
                  }`}
                  style={{
                    width: 'min(70vw, 480px)',
                    height: 'min(60vw, 280px)',
                    transform: `
                      translateX(${offset * 220}px)
                      translateZ(${isActive ? 0 : -200 * abs}px)
                      rotateY(${offset * -35}deg)
                      scale(${isActive ? 1 : 0.75})
                    `,
                    opacity: isActive ? 1 : abs === 1 ? 0.55 : 0.2,
                    zIndex: 10 - abs,
                  }}
                >
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              );
            })}

            {/* Arrows */}
            {total > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 sm:left-6 z-20 p-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-gray-300 hover:text-white hover:border-blue-500/40 hover:bg-black/60 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={next}
                  className="absolute right-3 sm:right-6 z-20 p-2.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-gray-300 hover:text-white hover:border-blue-500/40 hover:bg-black/60 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Dots */}
            {total > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {project.image.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-6 bg-blue-400' : 'w-1.5 bg-white/25 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-semibold text-[#f0f6ff] mb-1">
              {project.title}
            </h3>

            <p className="text-sm text-cyan-400 mb-4">{project.tech}</p>

            <p className="text-[14px] text-gray-400 leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.liveLink && project.liveLink !== '#' && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/25 bg-blue-500/10 text-blue-300 text-sm font-medium hover:bg-blue-500/15 hover:border-blue-500/40 transition-colors"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}

              {project.githubLink &&
                (Array.isArray(project.githubLink) ? (
                  project.githubLink.map((link, idx) => (
                    <a
                      key={idx}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                    >
                      <Github size={14} />
                      {idx === 0 ? 'Frontend' : 'Backend'}
                    </a>
                  ))
                ) : (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 text-sm font-medium hover:bg-white/[0.06] hover:border-white/20 transition-colors"
                  >
                    <Github size={14} />
                    Code
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;