import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, url: 'https://github.com/Ekdvs', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/vishwa-sampath', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:ekdvsampath@gmail.com', label: 'Email' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="py-8 border-t border-blue-500/20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              Vishwa Sampath
            </h3>
            <p className="text-gray-400 mb-4">
              Full-Stack Developer specializing in MERN Stack, Spring Boot, and modern web technologies.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="mailto:ekdvsampath@gmail.com" className="hover:text-blue-400 transition-colors">
                  ekdvsampath@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+94718974153" className="hover:text-blue-400 transition-colors">
                  +94 71 897 4153
                </a>
              </li>
              <li>Negombo, Western Province, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-blue-500/10 text-center text-gray-400">
          <p>
            © {currentYear} Vishwa Sampath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;