import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* --- Desktop Floating Island Navbar --- */}
      <nav className={`hidden md:flex fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${scrolled ? 'pt-4' : 'pt-8'}`}>
        <div 
          className={`mx-auto max-w-5xl flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${scrolled 
              ? 'bg-secondary/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-mint/10 py-3 px-6 w-[90%] lg:w-[60rem]' 
              : 'bg-transparent py-4 px-6 w-full max-w-7xl'
            }`}
        >
          
          {/* Identity */}
          <div className="flex items-center gap-1 group cursor-pointer">
            <span className="text-2xl font-black tracking-tighter text-text-primary font-heading">
              PLASMA<span className="text-emerald group-hover:text-mint transition-colors duration-500">.</span>
            </span>
          </div>

          {/* The Proof (Center Navigation) */}
          <div className="flex items-center gap-8">
             {['Solutions', 'The Stack', 'Work'].map((item) => (
               <a key={item} href={`#${item.replace(' ', '-').toLowerCase()}`} 
                  className="text-sm font-medium text-text-secondary hover:text-emerald transition-all relative group font-body tracking-wide">
                {item}
                <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-emerald transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </div>

          {/* The Commitment (CTA) */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button className="relative group overflow-hidden px-6 py-2.5 rounded-full bg-emerald text-primary font-bold text-sm transition-all hover:shadow-[0_0_20px_rgba(80,200,120,0.4)] hover:scale-105 active:scale-95 font-heading tracking-wide cursor-pointer">
              <span className="relative z-10">Start a Project</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile View --- */}
      
      {/* Mobile Top Branding */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 px-6 py-5 bg-primary/80 backdrop-blur-lg flex justify-center items-center border-b border-white/5">
          <span className="text-xl font-black tracking-tighter text-text-primary font-heading">
             PLASMA<span className="text-emerald">.</span>
          </span>
          <div className="absolute right-6">
            <ThemeToggle />
          </div>
       </div>

      {/* Mobile Bottom Navigation Bar (Thumb-friendly) */}
      <nav className="md:hidden fixed bottom-6 left-4 right-4 z-50 bg-secondary/90 backdrop-blur-2xl border border-mint/10 rounded-2xl p-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex justify-between items-center">
        
        {/* Mobile Menu Links */}
         <div className="flex gap-6 pl-4">
            {['Work', 'Stack'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-text-secondary hover:text-text-primary transition-colors font-body">
               {item}
             </a>
           ))}
        </div>

        {/* Mobile CTA */}
        <button className="px-5 py-3 rounded-xl bg-emerald text-primary font-extrabold text-[10px] sm:text-xs font-heading tracking-widest uppercase shadow-lg shadow-emerald/20 active:scale-95 transition-transform cursor-pointer">
          Start Project
        </button>
      </nav>
    </>
  );
};

export default Navbar;
