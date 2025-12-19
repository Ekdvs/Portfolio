import React, { useState } from 'react';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section id="projects" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = project.image.length;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  return (
    <article className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
      {/* Carousel */}
      <div className="relative h-[250px] ">
        <img
          src={project.image[currentIndex]}
          alt={`${project.title} screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {/* Navigation Buttons */}
        {totalImages > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-blue-400 text-sm mb-3">{project.tech}</p>

        <p className="text-gray-300 mb-4">{project.description}</p>

        {/* Links */}
        <div className="flex gap-4">
        {project.liveLink && project.liveLink !== '#' && (
            <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
            <ExternalLink size={16} />
            Live Demo
            </a>
        )}

        {project.githubLink &&
            (Array.isArray(project.githubLink)
            ? project.githubLink.map((link, idx) => (
                <a
                    key={idx}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                    <Github size={16} />
                    {idx === 0 ? 'Frontend' : 'Backend'}
                </a>
                ))
            : (
                <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                <Github size={16} />
                Code
                </a>
            )
            )
        }
        </div>


        {/* Dots Indicator */}
        {totalImages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {project.image.map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-blue-400' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default Projects;
