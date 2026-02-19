import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-deep-black flex items-center justify-center overflow-hidden">
      
      {/* ATMOSPHERIC BACKGROUND */}
      {/* Deep Royal Amethyst glow for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[900px] md:h-[600px] bg-royal-amethyst opacity-10 blur-[100px] md:blur-[180px] rounded-full pointer-events-none"></div>
      
      {/* Secondary Soft Emerald Glow */}
      <div className="absolute top-[30%] left-[60%] w-[200px] h-[200px] md:w-[500px] md:h-[500px] bg-emerald/10 blur-[100px] md:blur-[200px] rounded-full pointer-events-none"></div>
      
      {/* Central "Energy" Pillar with Breathing Animation */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-emerald to-transparent opacity-30 animate-pulse pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        
        {/* TOP BADGE */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-mint/10 bg-secondary-black/40 backdrop-blur-lg mb-12">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald"></span>
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary-text font-heading">
            Premium Web Development
          </span>
        </div>

        {/* HEADLINE: More Business Impact */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-primary-text leading-[1.05] tracking-tight font-heading">
          WE BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald via-mint to-emerald drop-shadow-[0_0_40px_rgba(80,200,120,0.45)]">
            DIGITAL EXPERIENCES.
          </span>
        </h1>

        {/* SUBHEADLINE: Conversion-Focused */}
        <p className="mt-8 max-w-2xl mx-auto text-muted-text text-lg md:text-xl leading-relaxed font-body">
          We design and develop high-performing websites, SaaS platforms, and digital products that help businesses grow, scale, and stand out online.
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-14 flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <button className="group relative w-full sm:w-auto px-10 py-4 bg-emerald text-deep-black font-bold text-lg rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(80,200,120,0.4)] active:scale-95 overflow-hidden font-heading tracking-wide shadow-lg">
              <span className="relative z-10">Start Your Project</span>
              {/* White-hot glow effect on hover */}
              <div className="absolute inset-0 bg-mint translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>

            <button className="w-full sm:w-auto px-10 py-4 border border-white/10 text-primary-text font-bold text-lg rounded-lg hover:border-emerald hover:text-emerald transition-colors font-heading tracking-wide">
              View Our Work
            </button>
          </div>
          
          {/* Trust Micro-Line */}
          <p className="mt-2 text-sm text-muted-text font-body opacity-80">
            Trusted by startups & growing businesses worldwide
          </p>
        </div>
      </div>

      {/* SUBTLE DECORATIVE ELEMENTS */}
      <div className="absolute bottom-10 left-10 flex flex-col gap-1 opacity-20 pointer-events-none">
        <div className="h-[2px] w-12 bg-emerald"></div>
        <div className="h-[2px] w-8 bg-mint"></div>
      </div>
    </section>
  );
};

export default Hero;
