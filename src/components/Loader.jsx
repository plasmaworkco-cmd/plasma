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

  // Total intro duration
  const introDuration = 300 + letters.length * 150 + 200; // ~1400ms when dot appears

  useEffect(() => {
    const timers = [];

    // Stagger letters in
    letters.forEach((_, i) => {
      timers.push(setTimeout(() => setLetterIndex(i), 300 + i * 150));
    });

    // Show dot
    timers.push(setTimeout(() => setDotVisible(true), introDuration));

    // --- PHASE: Fly to navbar ---
    // Measure + start fly after a short pause (dot has been visible ~500ms)
    const flyStart = introDuration + 500;

    timers.push(
      setTimeout(() => {
        const isMobile = window.innerWidth < 768;
        const navLogo = document.querySelector(
          isMobile ? '[data-navbar-logo-mobile]' : '[data-navbar-logo]'
        );

        if (navLogo && logoRef.current) {
          // Force a layout read so rect values are fresh
          navLogo.getBoundingClientRect(); // prime
          requestAnimationFrame(() => {
            const navRect = navLogo.getBoundingClientRect();
            const loaderRect = logoRef.current.getBoundingClientRect();

            setNavTarget({
              x: navRect.left + navRect.width / 2 - (loaderRect.left + loaderRect.width / 2),
              y: navRect.top + navRect.height / 2 - (loaderRect.top + loaderRect.height / 2),
              scale: navRect.height / loaderRect.height,
            });

            // Trigger fly animation on next frame so transform is applied after state update
            requestAnimationFrame(() => {
              setFlyToNav(true);
            });
          });
        } else {
          setFlyToNav(true);
        }
      }, flyStart)
    );

    // Fade out background overlay — starts slightly after fly begins
    timers.push(setTimeout(() => setExiting(true), flyStart + 100));

    // Tell parent it can show content (logo is now in navbar position)
    // This fires as the fly animation is ~80% done (fly is 700ms)
    timers.push(
      setTimeout(() => {
        onFinish?.();
      }, flyStart + 560)
    );

    // Fully remove loader from DOM after everything is done
    timers.push(setTimeout(() => setDone(true), flyStart + 900));

    return () => timers.forEach(clearTimeout);
  }, []);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center ${
        exiting ? 'pointer-events-none' : ''
      }`}
    >
      {/* Background overlay */}
      <div
        className="absolute inset-0 bg-mint"
        style={{
          transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1)',
          opacity: exiting ? 0 : 1,
        }}
      />

      {/* Ambient glow */}
      <div
        className={`absolute w-64 h-64 rounded-full bg-emerald/10 blur-3xl transition-opacity duration-700 ${
          dotVisible && !flyToNav ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Logo — this is the element that flies into the navbar */}
      <div
        ref={logoRef}
        className="relative flex items-center select-none z-10"
        style={{
          // Only apply transition when flying, not on initial render
          transition: flyToNav
            ? 'transform 700ms cubic-bezier(0.16,1,0.3,1), opacity 350ms ease 400ms'
            : 'none',
          transform:
            flyToNav && navTarget
              ? `translate(${navTarget.x}px, ${navTarget.y}px) scale(${navTarget.scale})`
              : 'translate(0px, 0px) scale(1)',
          // Fade out loader logo as it reaches navbar (navbar logo fades in simultaneously via `loading` prop)
          opacity: flyToNav ? 0 : 1,
          // Ensure sub-pixel rendering stays sharp during scale transform
          willChange: flyToNav ? 'transform, opacity' : 'auto',
        }}
      >
        {letters.map((letter, i) => (
          <span
            key={i}
            className="text-5xl sm:text-7xl font-black tracking-tighter text-evergreen font-heading transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
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

      {/* Progress bar */}
      <div
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-text-secondary/10 rounded-full overflow-hidden transition-opacity duration-400 ${
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