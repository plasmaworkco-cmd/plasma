import React, { useState, useEffect, useRef } from 'react';

const Loader = ({ onFinish }) => {
  const [letterIndex, setLetterIndex] = useState(-1);
  const [dotVisible, setDotVisible] = useState(false);
  const [flyToNav, setFlyToNav] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const [navTarget, setNavTarget] = useState(null);
  const logoRef = useRef(null);

  const letters = ['P', 'L', 'A', 'S', 'M', 'A'];

  useEffect(() => {
    const timers = [];

    letters.forEach((_, i) => {
      timers.push(
        setTimeout(() => setLetterIndex(i), 300 + i * 150)
      );
    });

    timers.push(
      setTimeout(() => setDotVisible(true), 300 + letters.length * 150 + 200)
    );

    timers.push(
      setTimeout(() => {
        // Pick the correct target based on screen size
        const isMobile = window.innerWidth < 768;
        const navLogo = document.querySelector(
          isMobile ? '[data-navbar-logo-mobile]' : '[data-navbar-logo]'
        );

        if (navLogo && logoRef.current) {
          const navRect = navLogo.getBoundingClientRect();
          const loaderRect = logoRef.current.getBoundingClientRect();
          setNavTarget({
            x: navRect.left + navRect.width / 2 - (loaderRect.left + loaderRect.width / 2),
            y: navRect.top + navRect.height / 2 - (loaderRect.top + loaderRect.height / 2),
            scale: navRect.height / loaderRect.height,
          });
        }
        setFlyToNav(true);
      }, 300 + letters.length * 150 + 900)
    );

    timers.push(
      setTimeout(() => setExiting(true), 300 + letters.length * 150 + 1200)
    );

    timers.push(
      setTimeout(() => {
        onFinish?.();
      }, 300 + letters.length * 150 + 1500)
    );

    timers.push(
      setTimeout(() => setDone(true), 300 + letters.length * 150 + 2100)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        exiting ? 'pointer-events-none' : ''
      }`}
    >
      <div
        className="absolute inset-0 bg-secondary"
        style={{
          transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
          opacity: exiting ? 0 : 1,
        }}
      />

      <div
        className={`absolute w-64 h-64 rounded-full bg-emerald/10 blur-3xl transition-opacity duration-1000 ${
          dotVisible && !flyToNav ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        ref={logoRef}
        className="relative flex items-center select-none z-10"
        style={{
          transition: flyToNav
            ? 'transform 800ms cubic-bezier(0.16,1,0.3,1), opacity 400ms ease 600ms'
            : 'none',
          transform:
            flyToNav && navTarget
              ? `translate(${navTarget.x}px, ${navTarget.y}px) scale(${navTarget.scale})`
              : 'translate(0px, 0px) scale(1)',
          opacity: flyToNav ? 0 : 1,
        }}
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            className="text-5xl sm:text-7xl font-black tracking-tighter text-text-primary font-heading transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: i <= letterIndex ? 1 : 0,
              transform: i <= letterIndex ? 'translateY(0px)' : 'translateY(20px)',
              filter: i <= letterIndex ? 'blur(0px)' : 'blur(8px)',
              transitionDelay: `${i * 30}ms`,
            }}
          >
            {letter}
          </span>
        ))}
        <span
          className="text-5xl sm:text-7xl font-black tracking-tighter text-emerald font-heading transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: dotVisible ? 1 : 0,
            transform: dotVisible ? 'scale(1)' : 'scale(0)',
          }}
        >
          .
        </span>
      </div>

      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-text-secondary/10 rounded-full overflow-hidden transition-opacity duration-500 ${
          flyToNav ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div
          className="h-full bg-emerald rounded-full transition-all ease-linear"
          style={{
            width: flyToNav
              ? '100%'
              : dotVisible
              ? '90%'
              : letterIndex >= 0
              ? `${((letterIndex + 1) / letters.length) * 70}%`
              : '0%',
            transitionDuration: letterIndex < 0 ? '0ms' : '300ms',
          }}
        />
      </div>
    </div>
  );
};

export default Loader;