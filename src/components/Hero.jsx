import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import GridScan from './GridScan';

/* ─── theme token sets ─────────────────────── */
const DARK = {
  gridLines:   '#0d2e1a',
  scan:        '#50C878',
  accentColor: '#50C878',
  vigBg:       'rgba(11,15,20,',
  h1Color:     'rgba(255,255,255,1)',
  subColor:    'rgba(255,255,255,0.92)',
  subShadow:   '0 1px 12px rgba(0,0,0,0.9)',
  trustColor:  'rgba(255,255,255,0.42)',
  outlineBdr:  'rgba(255,255,255,0.12)',
  outlineTxt:  'rgba(255,255,255,0.65)',
};

const LIGHT = {
  gridLines:   '#0d2e1a',
  scan:        '#50C878',
  accentColor: '#15803d',
  vigBg:       'rgba(249,250,251,',
  h1Color:     'rgba(17,24,39,1)',
  subColor:    '#111827',
  subShadow:   '0 0 8px rgba(249,250,251,1), 0 0 16px rgba(249,250,251,1), 0 0 24px rgba(249,250,251,0.9), -2px -2px 6px rgba(249,250,251,1), 2px 2px 6px rgba(249,250,251,1)',
  trustColor:  'rgba(75,85,99,0.55)',
  outlineBdr:  'rgba(17,24,39,0.15)',
  outlineTxt:  'rgba(55,65,81,0.8)',
};

function useDarkMode() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains('dark'))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

const Hero = ({ loading }) => {
  const wrapRef    = useRef(null);
  const tagRef     = useRef(null);
  const titleRef   = useRef(null);
  const lineRef    = useRef(null);
  const subRef     = useRef(null);
  const ctaWrapRef = useRef(null);
  const scrollRef  = useRef(null);
  const animatedRef = useRef(false);   // prevent double-fire

  const isDark = useDarkMode();
  const T = isDark ? DARK : LIGHT;

  /* ── trigger animation as soon as loading becomes false ── */
  useEffect(() => {
    if (loading) return;                // still loading — wait
    if (animatedRef.current) return;   // already ran
    animatedRef.current = true;

    const tag      = tagRef.current;
    const title    = titleRef.current;
    const divider  = lineRef.current;
    const sub      = subRef.current;
    const ctaWrap  = ctaWrapRef.current;
    const scrollEl = scrollRef.current;
    if (!tag || !title) return;

    const chars = Array.from(title.querySelectorAll('.ch'));
    const n = chars.length;

    /* ── 1. SCATTER — characters explode to random positions ── */
    gsap.set(chars, {
      x: (i) => (Math.random() - 0.5) * window.innerWidth * 1.1,
      y: (i) => (Math.random() - 0.5) * window.innerHeight * 0.9,
      rotation: () => (Math.random() - 0.5) * 360,
      scale: () => Math.random() * 0.6 + 0.2,
      opacity: 0,
    });
    gsap.set([tag, divider, sub, ctaWrap, scrollEl], { autoAlpha: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    /* ── 2. EMERGE — particles appear at scattered spots ── */
    tl.to(chars, {
      opacity: 1,
      duration: 0.4,
      stagger: { each: 0.025, from: 'random' },
    });

    /* ── 3. ORBIT — swirl in a loose ellipse around centre ── */
    tl.to(chars, {
      x: (i) => Math.cos((i / n) * Math.PI * 2) * (window.innerWidth * 0.28),
      y: (i) => Math.sin((i / n) * Math.PI * 2) * (window.innerHeight * 0.18),
      rotation: (i) => (i / n) * 360,
      scale: 0.85,
      duration: 0.9,
      stagger: { each: 0.018, from: 'start' },
      ease: 'sine.inOut',
    }, '-=0.1');

    /* ── 4. SPIN — revolve half-turn more so they really orbit ── */
    tl.to(chars, {
      x: (i) => Math.cos((i / n) * Math.PI * 2 + Math.PI) * (window.innerWidth * 0.18),
      y: (i) => Math.sin((i / n) * Math.PI * 2 + Math.PI) * (window.innerHeight * 0.12),
      rotation: (i) => (i / n) * 360 + 180,
      scale: 1,
      duration: 0.75,
      stagger: { each: 0.012, from: 'end' },
      ease: 'sine.inOut',
    });

    /* ── 5. CONVERGE — snap home to their real positions ── */
    tl.to(chars, {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: 1,
      duration: 0.9,
      stagger: { each: 0.022, from: 'random' },
      ease: 'expo.out',
    });

    /* ── 6. Rest of UI appears after text lands ── */
    tl.to(tag,      { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.3');
    tl.to(divider,  { autoAlpha: 1, scaleX: 1, duration: 0.5, ease: 'expo.out',
                      transformOrigin: '0% 50%' }, '-=0.3');
    tl.to(sub,      { autoAlpha: 1, y: 0, duration: 0.45 }, '-=0.25');
    tl.to(ctaWrap,  { autoAlpha: 1, y: 0, duration: 0.4  }, '-=0.2');
    tl.to(scrollEl, { autoAlpha: 1, duration: 0.35 },       '-=0.1');

    /* ── Magnetic primary button ── */
    const primaryBtn = ctaWrap?.querySelector('.btn-primary');
    if (primaryBtn) {
      const onMove  = (e) => {
        const r = primaryBtn.getBoundingClientRect();
        gsap.to(primaryBtn, {
          x: (e.clientX - r.left - r.width  / 2) * 0.2,
          y: (e.clientY - r.top  - r.height / 2) * 0.2,
          duration: 0.3, ease: 'power2.out',
        });
      };
      const onLeave = () =>
        gsap.to(primaryBtn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1,0.4)' });
      primaryBtn.addEventListener('mousemove',  onMove);
      primaryBtn.addEventListener('mouseleave', onLeave);
    }
  }, [loading]);   // re-run only when loading changes

  /* ── per-character split ── */
  const splitLine = (text, accent) =>
    text.split('').map((ch, i) => (
      <span
        key={i}
        className={`ch inline-block ${ch === ' ' ? 'w-[0.3em]' : ''}`}
        style={accent ? { color: T.accentColor } : { color: T.h1Color }}
      >
        {ch === ' ' ? '\u00A0' : ch}
      </span>
    ));

  return (
    <section
      ref={wrapRef}
      className="relative min-h-screen overflow-hidden bg-primary flex flex-col"
    >
      {/* ── GridScan background ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ opacity: isDark ? 0.65 : 0.8 }}
      >
        <GridScan
          sensitivity={0.45}
          lineThickness={1}
          linesColor={T.gridLines}
          gridScale={0.1}
          scanColor={T.scan}
          scanOpacity={isDark ? 0.3 : 0.25}
          scanGlow={0.5}
          scanSoftness={2.5}
          scanDuration={1.8}
          scanDelay={1}
          enablePost
          bloomIntensity={isDark ? 0.35 : 0.2}
          chromaticAberration={0.001}
          noiseIntensity={0.006}
        />
      </div>

      {/* ── Radial vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 50%,
              ${T.vigBg}0.0) 0%,
              ${T.vigBg}0.45) 55%,
              ${T.vigBg}0.88) 100%)
          `,
        }}
      />
      <div className="absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-t from-primary to-transparent pointer-events-none" />

      {/* ── Ambient emerald glow ── */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <div
          className="w-[440px] h-[280px] rounded-full blur-[90px]"
          style={{ backgroundColor: isDark ? 'rgba(80,200,120,0.07)' : 'rgba(1,107,46,0.06)' }}
        />
      </div>

      {/* ══════════════════════════════
          HERO CONTENT
          ══════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-6 pt-28 pb-36">

        {/* Badge */}
        <div
          ref={tagRef}
          className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-sm"
          style={{
            opacity: 0,
            border: `1px solid ${isDark ? 'rgba(80,200,120,0.25)' : 'rgba(1,107,46,0.22)'}`,
            backgroundColor: isDark ? 'rgba(80,200,120,0.08)' : 'rgba(1,107,46,0.06)',
          }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-80" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-[0.3em] font-heading"
            style={{ color: isDark ? '#50C878' : '#016b2e' }}
          >
            Premium Web Development
          </span>
        </div>

        {/* Headline — characters will be scattered then orbit then settle */}
        <h1
          ref={titleRef}
          className="font-heading font-black leading-[1.06] tracking-[-0.01em] select-none"
          style={{
            fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
            perspective: '800px',
            textShadow: isDark
              ? '0 2px 32px rgba(0,0,0,0.95)'
              : '0 2px 20px rgba(255,255,255,0.9)',
          }}
        >
          <span className="block">{splitLine('WE BUILD', false)}</span>
          <span className="block mt-1">{splitLine('DIGITAL EXPERIENCES', true)}</span>
        </h1>

        {/* Divider */}
        <div
          ref={lineRef}
          className="mt-7 mb-7 h-px w-52"
          style={{
            opacity: 0,
            scaleX: 0,
            background: isDark
              ? 'linear-gradient(90deg, transparent, #50C878, transparent)'
              : 'linear-gradient(90deg, transparent, #016b2e, transparent)',
          }}
        />

        {/* Subtitle */}
        <p
          ref={subRef}
          className="max-w-xl font-body leading-relaxed"
          style={{
            opacity: 0,
            fontSize: 'clamp(0.93rem, 1.7vw, 1.1rem)',
            color: T.subColor,
            textShadow: T.subShadow,
          }}
        >
          We design and develop high-performing websites, SaaS platforms, and digital
          products that help businesses grow, scale, and stand out online.
        </p>

        {/* CTAs */}
        <div ref={ctaWrapRef} className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          style={{ opacity: 0 }}>
          <button
            className="btn-primary group relative overflow-hidden px-9 py-3.5 font-bold text-sm rounded-xl font-heading tracking-wider transition-all duration-300 active:scale-95 hover:scale-[1.04]"
            style={{
              backgroundColor: '#50C878',
              color: '#000',
              boxShadow: '0 0 32px rgba(80,200,120,0.35)',
            }}
          >
            <span className="relative z-10">Start Your Project</span>
            <span className="absolute inset-0 bg-[#86efac] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>

          <button
            className="px-9 py-3.5 font-semibold text-sm rounded-xl font-heading tracking-wider transition-all duration-300 backdrop-blur-sm hover:scale-[1.02]"
            style={{
              border: `1px solid ${T.outlineBdr}`,
              color: T.outlineTxt,
              backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = isDark ? 'rgba(80,200,120,0.5)' : 'rgba(1,107,46,0.45)';
              e.currentTarget.style.color = isDark ? '#50C878' : '#016b2e';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = T.outlineBdr;
              e.currentTarget.style.color = T.outlineTxt;
            }}
          >
            View Our Work
          </button>
        </div>

        {/* Trust */}
        <p
          className="mt-4 text-[10px] uppercase tracking-[0.22em] font-body"
          style={{ color: T.trustColor }}
        >
          Trusted by startups &amp; growing businesses worldwide
        </p>
      </div>

      {/* Scroll cue */}
      <button ref={scrollRef} className="explore-btn" style={{ opacity: 0 }}>
        Scroll to explore
        <span className="explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none"
               xmlns="http://www.w3.org/2000/svg" className="arrow-svg">
            <path d="M11 5V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 12L11 17L16 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </span>
      </button>
    </section>
  );
};

export default Hero;
