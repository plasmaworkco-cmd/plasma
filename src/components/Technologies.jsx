import React from 'react';

const Technologies = () => {
  const techs = [
    "React", "Next.js", "Node.js", "Python", "TypeScript", 
    "Tailwind", "AWS", "Docker", "Vercel", "Stripe", "GraphQL", "PostgreSQL",
    "MongoDB", "Redis", "Framer Motion", "Three.js"
  ];

  return (
    <section id="the-stack" className="bg-deep-black py-20 md:py-32 border-t border-mint/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-16">
        <div className="flex flex-col md:flex-row items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-emerald text-[10px] font-black uppercase tracking-[0.5em] mb-4 font-heading">
              Technical Arsenal
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-primary-text tracking-tighter uppercase italic font-heading">
              The <span className="text-mint">Stack.</span>
            </h3>
          </div>
          <div className="text-muted-text text-sm font-mono max-w-xs opacity-60 text-right md:text-left">
            // HIGH_PERFORMANCE_CONFIG <br/>
            // SCALABLE_INFRASTRUCTURE_ENABLED
          </div>
        </div>
      </div>
      
      {/* Infinite Marquee Container */}
      <div className="relative flex overflow-hidden group py-12">
        {/* Gradient Fades for depth */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-deep-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-deep-black to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-marquee whitespace-nowrap">
          {/* Double map to ensure seamless loop */}
          {[...techs, ...techs].map((tech, idx) => (
            <div key={idx} className="flex items-center gap-4 md:gap-6 mx-8 md:mx-12">
              {/* Electric Pulse Dot */}
              <div className="w-2 h-2 rounded-full bg-emerald shadow-[0_0_15px_#50C878] animate-pulse"></div>
              <span className="text-4xl md:text-7xl font-black text-primary-text/10 group-hover:text-primary-text transition-colors duration-700 tracking-tighter uppercase italic font-heading select-none">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tailwind CSS Animation keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}} />

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-mint/10 to-transparent"></div>
      </div>
    </section>
  );
};

export default Technologies;
