import React from 'react';

const FeaturedWork = () => {
  const projects = [
    { 
      name: "Bridlelink", 
      category: "Bespoke SaaS", 
      desc: "Revolutionizing supply chain connectivity.",
      image: "/bridgelik.png",
      link: "https://bridgelink.in",
      accent: "#50C878" 
    },
    { 
      name: "Indic", 
      category: "Cultural E-commerce", 
      desc: "Bringing traditional heritage to a modern storefront.",
      link: "https://indic.in",
      accent: "#D1F2EB" 
    },
    { 
      name: "Mann Match Yourself", 
      category: "Ethnic Fashion", 
      desc: "High-performance digital store for premium wear.",
      link: "#", 
      accent: "#013220" 
    }
  ];

  return (
    <section id="work" className="bg-[#0B0F14] py-0 border-t border-[#D1F2EB]/5 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 min-h-auto lg:min-h-[650px]">
        {projects.map((project, idx) => (
          <div key={idx} className="group relative border-r border-[#D1F2EB]/5 overflow-hidden min-h-[400px] md:min-h-[500px] cursor-pointer">
            
            {/* Background Layer with Depth */}
            <div className={`absolute inset-0 transition-transform duration-1000 group-hover:scale-110 bg-[#121A22]`}>
               {project.image ? (
                 <>
                   <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700" />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/80 to-transparent opacity-90"></div>
                 </>
               ) : (
                 <div className="absolute inset-0 opacity-10" 
                      style={{backgroundImage: 'radial-gradient(circle at 1px 1px, #50C878 1px, transparent 0)', backgroundSize: '32px 32px'}}>
                 </div>
               )}
            </div>

            {/* The "Power Surge" Glow (Thor-theme inspired) */}
            <div className="absolute -inset-20 bg-[#50C878] opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity duration-700 rounded-full"></div>

            {/* Link wrapper */}
            <a href={project.link} className="absolute inset-0 z-10 block" target="_blank" rel="noopener noreferrer">
              <span className="sr-only">View {project.name}</span>
            </a>

            {/* Content Container */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col justify-end z-20 pointer-events-none">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <span className="w-6 h-[1px] bg-[#50C878]"></span>
                <span className="text-[#50C878] text-[9px] md:text-xs font-black uppercase tracking-[0.2em] font-heading">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl md:text-4xl font-black text-[#E6EDF3] mb-3 tracking-tighter font-heading relative">
                {project.name}<span className="text-[#50C878]">.</span>
              </h3>
              
              <p className="text-[#9AA4AF] text-xs max-w-xs mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 font-body">
                {project.desc}
              </p>

              {/* Interactive Line */}
              <div className="w-full h-[1px] bg-[#D1F2EB]/10 relative">
                <div className="absolute top-0 left-0 h-full bg-[#50C878] w-0 group-hover:w-full transition-all duration-700"></div>
              </div>
            </div>

            {/* Top Right "Visit" indicator */}
            <div className="absolute top-8 right-8 text-[#50C878] opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0 z-20 pointer-events-none">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
            </div>
          </div>
        ))}
      </div>
      
      {/* Portfolio CTA */}
      <div className="bg-[#0B0F14] py-24 text-center border-t border-[#D1F2EB]/5">
        <p className="text-[#9AA4AF] mb-6 text-sm uppercase tracking-widest font-bold font-heading">Ready to see more?</p>
        <a href="#" className="inline-flex items-center gap-4 text-2xl font-black text-[#E6EDF3] group transition-all font-heading hover:text-[#50C878]">
          View All Case Studies
          <span className="text-[#50C878] group-hover:translate-x-3 transition-transform duration-300">→</span>
        </a>
      </div>
    </section>
  );
};

export default FeaturedWork;
