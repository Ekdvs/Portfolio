import React from 'react';
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';
import type { Service } from '../types';

interface AboutProps {
  services: Service[];
  profileImage: string;
}

const About: React.FC<AboutProps> = ({ services, profileImage }) => {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ekdvsampath@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 71 897 4153' },
    { icon: MapPin, label: 'Location', value: 'Sri Lanka' },
    { icon: BookOpen, label: 'Education', value: 'University of Kelaniya' },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
          {/* Left - Profile Image */}
          <div className="flex justify-center md:justify-end w-full md:w-1/2">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src={profileImage}
                alt="Vishwa Sampath"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Right - Text & Services */}
          <div className="w-full md:w-1/2 space-y-6">
            {/* About Text */}
            <div className="space-y-4">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate Full-Stack Developer building scalable, production-ready web apps.
                Currently pursuing B.Sc. in Physical Sciences with a focus on Computer Science.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I specialize in the MERN stack, Spring Boot, and real-time applications with Socket.io.
                Experienced with cloud deployment, REST APIs, JWT authentication, and modern DevOps.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex flex-col gap-1 bg-slate-800/50 p-4 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <div className="flex items-center gap-2 text-blue-400">
                    <info.icon size={20} />
                    <span className="text-gray-200 font-medium">{info.label}</span>
                  </div>
                  <p className="text-gray-300 text-sm break-all">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {services.map((service, i) => {
                const IconService = service.icon;
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md p-6 rounded-3xl border border-blue-500/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
                  >
                    <div className="text-blue-400 mb-4">
                      <IconService size={36} />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-400 text-sm">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
