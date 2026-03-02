import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* --- Desktop Floating Island Navbar --- */}
      <nav
        className={`hidden md:flex fixed left-1/2 z-50 -translate-x-1/2 transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'top-4' : 'top-8'
        }`}
        style={{ width: 'calc(100% - 3rem)', maxWidth: '90rem' }}
      >
        <div
          className="w-full flex items-center justify-between relative"
          style={{
            willChange: 'max-width, border-radius',
            maxWidth: scrolled ? '60rem' : '90rem',
            margin: '0 auto',
            borderRadius: scrolled ? '9999px' : '0px',
            boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.04)' : 'none',
            border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
            padding: scrolled ? '12px 24px' : '16px 24px',
            transition: 'max-width 500ms cubic-bezier(0.16,1,0.3,1), border-radius 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms cubic-bezier(0.16,1,0.3,1), border-color 500ms cubic-bezier(0.16,1,0.3,1), padding 500ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Desktop Backdrop */}
          <div
            className={`absolute inset-0 bg-secondary/80 backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ borderRadius: 'inherit' }}
          />
          
          <div className="relative z-10 w-full flex items-center justify-between">
            {/* Identity */}
            <div className="flex items-center gap-1 group cursor-pointer">
              <span className="text-2xl font-black tracking-tighter text-text-primary font-heading">
                PLASMA<span className="text-emerald group-hover:text-emerald/70 transition-colors duration-500">.</span>
              </span>
            </div>

            {/* Center Navigation */}
            <div className="flex items-center gap-8">
              {['Solutions', 'The Stack', 'Work'].map((item) => (
                <a
                  key={item}
                  href={`#${item.replace(' ', '-').toLowerCase()}`}
                  className="text-sm font-medium text-text-secondary hover:text-emerald transition-all relative group font-body tracking-wide"
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-emerald/80 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-emerald text-secondary font-bold text-sm transition-all hover:shadow-[0_4px_20px_rgba(80,200,120,0.3)] hover:scale-105 active:scale-95 font-heading tracking-wide cursor-pointer border border-transparent">
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile View --- */}
      
      {/* Mobile Top Header (Changes on scroll) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full z-40 px-6 py-4 flex justify-between items-center transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled ? 'bg-secondary/70 backdrop-blur-lg border-b border-black/5 shadow-sm' : 'bg-transparent'
        }`}
      >
        <span className="text-xl font-black tracking-tighter text-text-primary font-heading">
          PLASMA<span className="text-emerald">.</span>
        </span>
        <ThemeToggle />
      </div>

      {/* Mobile Bottom Nav (Fixed Translucency) */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-secondary/65 backdrop-blur-xl border border-white/30 rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex justify-between items-center ring-1 ring-black/5">
        <div className="flex gap-6 pl-4">
          {['Work', 'Stack'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors font-body"
            >
              {item}
            </a>
          ))}
        </div>
        <button className="px-5 py-3 rounded-xl bg-emerald text-secondary font-extrabold text-[10px] sm:text-xs font-heading tracking-widest uppercase shadow-lg shadow-emerald/20 active:scale-95 transition-transform cursor-pointer">
          Start Project
        </button>
      </nav>
    </>
  );
};

export default Navbar;