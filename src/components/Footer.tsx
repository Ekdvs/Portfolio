import React from 'react'
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/Ekdvs',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/vishwa-sampath',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:ekdvsampath@gmail.com',
    },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Vishwa <span className="text-blue-400">Sampath</span>
            </h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Full-Stack Developer focused on building modern, scalable web
              applications using MERN, Spring Boot, and clean UI principles.
            </p>

            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-slate-400 transition hover:text-blue-400"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={14}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:ekdvsampath@gmail.com"
                  className="transition hover:text-blue-400"
                >
                  ekdvsampath@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+94718974153"
                  className="transition hover:text-blue-400"
                >
                  +94 71 897 4153
                </a>
              </li>
              <li>Rathnapura, Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          © {year} Vishwa Sampath — Built with React, Vite & Tailwind CSS
        </div>
      </div>
    </footer>
  )
}

export default Footer
