import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  activeSection?: string;
}

const NAV_ITEMS = ['Home', 'About', 'Projects','Certificates', 'Contact'];

const Navbar: React.FC<NavbarProps> = ({ activeSection = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (item: string) => {
    document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className={`flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'bg-[#060b14]/80 backdrop-blur-xl border border-white/[0.06] shadow-xl shadow-black/30'
              : 'bg-transparent'
          }`}>

            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              className="group flex items-center gap-2"
            >
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-[10px] font-bold text-white tracking-tight">
                VS
              </span>
              <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors hidden sm:block">
                Vishwa Sampath
              </span>
            </button>

            {/* Desktop pill nav */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] rounded-xl p-1">
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.toLowerCase();
                return (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-white'
                        : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {active && (
                      <span className="absolute inset-0 rounded-lg bg-blue-500/20 border border-blue-500/30" />
                    )}
                    <span className="relative">{item}</span>
                  </button>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href="vishwa_sampath_SE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl border border-blue-500/30 bg-blue-500/8 text-blue-300 hover:bg-blue-500/15 hover:border-blue-500/50 transition-all duration-200"
            >
              Resume ↗
            </a>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="mx-4 mt-2 bg-[#0c1220]/95 backdrop-blur-xl rounded-2xl border border-white/[0.06] p-3 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.toLowerCase();
              return (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {item}
                </button>
              );
            })}
            <div className="pt-1 border-t border-white/[0.04]">
              <a
                href="vishwa_sampath_SE.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-medium px-4 py-2.5 rounded-xl border border-blue-500/30 bg-blue-500/8 text-blue-300"
              >
                Download Resume ↗
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;