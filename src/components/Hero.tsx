import React from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

const Hero: React.FC = () => {
  const socialLinks = [
    { icon: Github, url: 'https://github.com/Ekdvs', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/vishwa-sampath', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:ekdvsampath@gmail.com', label: 'Email' },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >
      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('image.png')] bg-cover bg-center opacity-10" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Typing Animation */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            <Typewriter
              words={["Hi, I'm Vishwa Sampath"]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            <Typewriter
              words={["Full-Stack Developer", "Software Engineer"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </p>

          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            <Typewriter
              words={[
                "Specializing in MERN Stack, Spring Boot, Real-time Applications & Cloud Deployment",
              ]}
              loop={1}
              cursor
              cursorStyle="_"
              typeSpeed={50}
            />
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
            >
              View Projects
            </a>
            <a
              href="\vishwa_sampath_SE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500/10 transition-all duration-300"
            >
              Download CV
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-8">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-blue-400" />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
