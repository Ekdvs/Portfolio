import React, { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowUpRight, ArrowUp } from 'lucide-react'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()
  const footerRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = footerRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/Ekdvs' },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/vishwa-sampath',
    },
    { icon: Mail, label: 'Email', href: 'mailto:ekdvsampath@gmail.com' },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ]

  const reveal = (delay: string) =>
    `transition-all duration-700 ease-out ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
    } [transition-delay:${delay}]`

  return (
    <footer
      ref={footerRef}
      className="relative mt-24 overflow-hidden border-t border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950 backdrop-blur"
    >
      {/* Comet-sweep accent line */}
      <div className="absolute inset-x-0 top-0 h-px overflow-hidden bg-white/5">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[sweep_4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      </div>

      <div className={`mx-auto max-w-7xl px-6 py-14 ${reveal('0ms')}`}>
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className={reveal('80ms')}>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Vishwa{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Sampath
              </span>
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
                  className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:text-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.35)]"
                >
                  <span className="absolute inset-0 rounded-full bg-blue-400/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon size={18} className="relative z-10" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={reveal('160ms')}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-flex items-center gap-1 text-slate-400 transition-colors duration-300 hover:text-blue-400"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-blue-400 to-cyan-300 transition-transform duration-300 group-hover:scale-x-100" />
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={reveal('240ms')}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-300">
              Contact
            </h4>

            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:ekdvsampath@gmail.com"
                  className="transition-colors hover:text-blue-400"
                >
                  ekdvsampath@gmail.com
                </a>
              </li>

              <li>
                <a
                  href="tel:+94718974153"
                  className="transition-colors hover:text-blue-400"
                >
                  +94 71 897 4153
                </a>
              </li>

              <li className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Rathnapura, Sri Lanka
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center text-xs text-slate-500 sm:flex-row sm:justify-between">
          <p>
            © {year} Vishwa Sampath — Built with React, Vite & Tailwind CSS
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:text-blue-400 hover:shadow-[0_0_16px_rgba(96,165,250,0.3)]"
          >
            <ArrowUp
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(320%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer