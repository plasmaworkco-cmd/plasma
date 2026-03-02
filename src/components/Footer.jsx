import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isVisible = useInView(footerRef, { once: true, amount: 0.1 });
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const bigTextRef = useRef(null);

  // Mouse tracking for the big text gradient reveal
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bigTextRef.current) {
        const rect = bigTextRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'The Stack', href: '#the-stack' },
    { label: 'Contact', href: '#contact' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  const socials = [
    { name: 'X', href: '#', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { name: 'LinkedIn', href: '#', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { name: 'GitHub', href: '#', path: 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z' },
    { name: 'Instagram', href: '#', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' }
  ];

  // Split text into individual characters for staggered reveal
  const AnimatedText = ({ text, className, baseDelay = 0 }) => {
    return (
      <span className={className}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-700 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(100%) rotateX(90deg)',
              transitionDelay: `${baseDelay + i * 40}ms`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    );
  };

  // Magnetic link hover effect
  const MagneticLink = ({ children, href, onHoverName }) => {
    const linkRef = useRef(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
      if (!linkRef.current) return;
      const rect = linkRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      setOffset({ x, y });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
      setHoveredLink(null);
    };

    return (
      <a
        ref={linkRef}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHoveredLink(onHoverName)}
        onMouseLeave={handleMouseLeave}
        className="inline-block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {children}
      </a>
    );
  };

  return (
    <footer
      ref={footerRef}
      className="bg-neutral-950 relative overflow-hidden"
    >
      {/* --- ADDED: CUSTOM CSS FOR BREATHING ANIMATION --- */}
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.1; transform: scale(1) translateX(-50%); }
          50% { opacity: 0.25; transform: scale(1.1) translateX(-50%); }
        }
        .animate-breathe {
          animation: breathe 8s ease-in-out infinite;
        }
      `}</style>

      {/* --- ADDED: THE GREEN GLOWING THING --- */}
      <div 
        className="absolute bottom-[-150px] left-1/2 w-[600px] h-[400px] bg-emerald-600 rounded-full blur-[180px] z-0 pointer-events-none animate-breathe"
      />

      {/* ====== GIANT TYPOGRAPHY SECTION ====== */}
      <div
        ref={bigTextRef}
        className="relative pt-24 md:pt-40 pb-20 md:pb-32 px-6 overflow-hidden z-10"
      >
        {/* Mouse-following gradient spotlight */}
        <div
          className="absolute pointer-events-none z-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] transition-all duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, rgba(80,200,120,0.4) 0%, transparent 70%)',
            left: `${mousePos.x - 300}px`,
            top: `${mousePos.y - 300}px`,
          }}
        />

        {/* Massive headline */}
        <div className="max-w-[95%] mx-auto relative z-10">
          <div className="overflow-hidden">
            <h2 className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase font-heading text-white" style={{ perspective: '800px' }}>
              <AnimatedText text="LET'S" baseDelay={100} />
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase font-heading" style={{ perspective: '800px' }}>
              <span className="bg-clip-text text-emerald" style={{ backgroundImage: `radial-gradient(circle 400px at ${mousePos.x}px ${mousePos.y}px, #50C878, #0B6E4F, #013220)` }}>
                <AnimatedText text="CREATE" baseDelay={350} />
              </span>
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 className="text-[12vw] md:text-[10vw] lg:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase font-heading text-white" style={{ perspective: '800px' }}>
              <AnimatedText text="TOGETHER." baseDelay={600} />
            </h2>
          </div>

          <div className="mt-12 md:mt-16 flex items-center gap-6">
            <div className="h-[2px] bg-gradient-to-r from-emerald-500 to-transparent transition-all duration-1500 ease-out" style={{ width: isVisible ? '120px' : '0px', transitionDelay: '1000ms' }} />
            <p className="text-neutral-500 text-sm md:text-base font-body max-w-md transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(20px)', transitionDelay: '1100ms' }}>
              Architecting high-performance digital engines for brands that refuse to blend in.
            </p>
          </div>
        </div>
      </div>

      {/* ====== DIVIDER ====== */}
      <div className="max-w-[95%] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" 
        />
      </div>

      {/* ====== LINKS GRID ====== */}
      <div className="max-w-[95%] mx-auto px-6 py-16 md:py-24 relative z-10">
  
  {/* --- 1. MOVED LOGO OUTSIDE THE GRID --- */}
  {/* This ensures it doesn't push the Navigation column down relative to others */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.8 }}
    className="mb-12 md:mb-16"
  >
    <h3 className="text-4xl font-black text-white tracking-tighter font-heading">
      PLASMA<span className="text-emerald-500">.</span>
    </h3>
  </motion.div>

  {/* --- 2. GRID CONTAINER --- */}
  <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

    {/* Navigation Column */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.9 }}
      className="md:col-span-4" 
    >
      <h4 className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.4em] mb-8 font-heading">
        Navigation
      </h4>
      <ul className="space-y-2">
        {navLinks.map((link) => (
          <li key={link.label} className="overflow-hidden">
            <MagneticLink href={link.href} onHoverName={link.label}>
              <span className={`text-2xl md:text-3xl font-black uppercase tracking-tight font-heading transition-colors duration-300 block py-1 ${hoveredLink === link.label ? 'text-emerald-400' : 'text-neutral-400'}`}>
                {link.label}
              </span>
            </MagneticLink>
          </li>
        ))}
      </ul>
    </motion.div>

    {/* Legal + Info */}
    {/* Removed 'justify-end' so it aligns to top */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 1.05 }}
      className="md:col-span-3 flex flex-col" 
    >
      <h4 className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.4em] mb-8 font-heading">
        Legal
      </h4>
      <ul className="space-y-4">
        {legalLinks.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-neutral-500 hover:text-white text-sm font-medium transition-colors duration-300 font-body group flex items-center gap-2">
              <span className="w-0 group-hover:w-3 h-[1px] bg-emerald-500 transition-all duration-300" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Status - Added mt-auto to push it down if you want it at bottom, or keep margin-top fixed */}
      <div className="mt-10 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-500 font-bold font-heading">
          Available for Projects
        </span>
      </div>
    </motion.div>

    {/* Contact + Socials */}
    {/* Removed 'justify-end' so it aligns to top */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 1.2 }}
      className="md:col-span-3 flex flex-col"
    >
      <h4 className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.4em] mb-8 font-heading">
        Get in Touch
      </h4>
      <a href="mailto:hello@plasma.studio" className="text-white text-lg font-semibold hover:text-emerald-400 transition-colors duration-300 font-body block mb-2">
        plasma.work.co@gmail.com
      </a>
      <p className="text-neutral-600 text-sm font-body mb-8">
        Nashik, Maharashtra, IN
      </p>

      <div className="flex gap-3">
        {socials.map((social) => (
          <a key={social.name} href={social.href} className="group w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 relative overflow-hidden">
            <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-950 relative z-10 transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d={social.path} />
            </svg>
          </a>
        ))}
      </div>
    </motion.div>

    {/* CTA column */}
    {/* Kept justify-between so the button stays at the bottom, but header stays at top */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 1.35 }}
      className="md:col-span-2 flex flex-col h-full justify-between"
    >
      <div>
        <h4 className="text-[10px] text-neutral-600 font-black uppercase tracking-[0.4em] mb-8 font-heading">
          Start
        </h4>
        <a href="#contact" className="group inline-flex items-center gap-3 text-white font-bold text-sm uppercase tracking-wider font-heading hover:text-emerald-400 transition-colors duration-300">
          <span>Start a Project</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>

      {/* Back to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="group mt-12 w-11 h-11 rounded-full border border-neutral-800 flex items-center justify-center transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500">
        <svg className="w-4 h-4 text-neutral-500 group-hover:text-neutral-950 transition-all duration-300 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </motion.div>

  </div>
</div>

      {/* ====== BOTTOM BAR ====== */}
      <div className="max-w-[95%] mx-auto relative z-10">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </div>

      <div className="max-w-[95%] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
        <p className="text-neutral-700 text-[11px] font-medium uppercase tracking-[0.2em] font-heading transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transitionDelay: '1500ms' }}>
          © {currentYear} PLASMA . ALL RIGHTS RESERVED.
        </p>

        <div className="flex items-center gap-3 transition-all duration-700" style={{ opacity: isVisible ? 1 : 0, transitionDelay: '1600ms' }}>
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
          <p className="text-neutral-700 text-[11px] font-medium uppercase tracking-[0.2em] font-heading">
            Deployed from Nashik // MH IN
          </p>
          <div className="w-1 h-1 rounded-full bg-neutral-700" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;