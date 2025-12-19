import React from 'react';
import { Mail, Phone, MapPin, BookOpen } from 'lucide-react';
import type { Service } from '../types';

interface AboutProps {
  services: Service[];
  profileImage: string; // URL of your profile image
}

const About: React.FC<AboutProps> = ({ services, profileImage }) => {
  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'ekdvsampath@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+94 71 897 4153' },
    { icon: MapPin, label: 'Location', value: 'Sri Lanka' },
    { icon: BookOpen, label: 'Education', value: 'University of Kelaniya' },
  ];

  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Profile Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg transform hover:scale-105 transition-transform duration-300">
              <img
                src={profileImage}
                alt="Vishwa Sampath"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - About Text & Services */}
          <div className="space-y-6">
            {/* About Text */}
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate Full-Stack Developer with expertise in building scalable, 
              production-ready web applications. Currently pursuing B.Sc. in Physical Sciences 
              with a focus on Computer Science at the University of Kelaniya.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              I specialize in the MERN stack, Spring Boot, and real-time applications using Socket.io. 
              I have hands-on experience with cloud deployment, REST APIs, JWT authentication, 
              and modern DevOps practices.
            </p>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <info.icon size={20} className="text-blue-400" />
                    <span className="text-sm">{info.label}</span>
                  </div>
                  <p className="text-white text-sm break-all">{info.value}</p>
                </div>
              ))}
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              {services.map((service, index) => {
                const IconServiceComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 rounded-2xl border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-blue-400 mb-4">
                      <IconServiceComponent size={32} />
                    </div>
                    <h3 className="font-semibold mb-2">{service.title}</h3>
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
