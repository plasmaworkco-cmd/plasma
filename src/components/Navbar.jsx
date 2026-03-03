import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ loading }) => {
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

  const logoStyle = {
    opacity: loading ? 0 : 1,
    transition: loading ? 'none' : 'opacity 350ms ease 0ms',
  };

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
          className="w-full relative"
          style={{
            willChange: 'max-width, border-radius',
            maxWidth: scrolled ? '60rem' : '90rem',
            margin: '0 auto',
            borderRadius: scrolled ? '9999px' : '0px',
            boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.04)' : 'none',
            border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent',
            padding: scrolled ? '12px 24px' : '16px 24px',
            transition:
              'max-width 500ms cubic-bezier(0.16,1,0.3,1), border-radius 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms cubic-bezier(0.16,1,0.3,1), border-color 500ms cubic-bezier(0.16,1,0.3,1), padding 500ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Transparent at top, white frosted when scrolled into pill */}
          <div
            className="absolute inset-0 backdrop-blur-xl transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              borderRadius: 'inherit',
              backgroundColor: 'rgba(255, 255, 255, 0.80)',
              opacity: scrolled ? 1 : 0,
              pointerEvents: 'none',
            }}
          />

          <div className="relative z-10 w-full grid grid-cols-3 items-center">
            <div className="justify-self-start flex items-center gap-8">
              {['Solutions', 'The Stack', 'Work'].map((item) => (
                <a
                  key={item}
                  href={`#${item.replace(' ', '-').toLowerCase()}`}
                  className="text-sm font-medium text-text-secondary hover:text-emerald transition-all relative group font-body tracking-wide"
                >
                  {item}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-emerald/80 transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </a>
              ))}
            </div>

            <div className="justify-self-center flex items-center gap-1 group cursor-pointer">
              <span
                data-navbar-logo
                className="text-2xl font-black tracking-tighter text-text-primary font-heading"
                style={logoStyle}
              >
                PLASMA<span className="text-emerald group-hover:text-emerald/70 transition-colors duration-500">.</span>
              </span>
            </div>

            <div className="justify-self-end flex items-center gap-4">
              <ThemeToggle />
              <button className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-emerald text-secondary font-bold text-sm transition-all hover:shadow-[0_4px_20px_rgba(80,200,120,0.3)] hover:scale-105 active:scale-95 font-heading tracking-wide cursor-pointer border border-transparent">
                <span className="relative z-10">Start a Project</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Top Header --- */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full z-40 px-4 py-4 grid grid-cols-3 items-center transition-[background-color,backdrop-filter,border-color] duration-300 ${
          scrolled ? 'border-b border-black/5 shadow-sm' : 'bg-transparent'
        }`}
        style={scrolled ? { backgroundColor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)' } : {}}
      >
        <div />
        <span
          data-navbar-logo-mobile
          className="justify-self-center text-xl font-black tracking-tighter text-text-primary font-heading"
          style={logoStyle}
        >
          PLASMA<span className="text-emerald">.</span>
        </span>
        <div className="justify-self-end">
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Bottom Nav */}
      <nav
        className="md:hidden fixed bottom-6 left-4 right-4 z-50 backdrop-blur-xl border border-white/30 rounded-2xl p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] flex justify-between items-center ring-1 ring-black/5"
        style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}
      >
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