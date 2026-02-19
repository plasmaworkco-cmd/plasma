import React from 'react';

const Services = () => {
  const services = [
    {
      title: "SaaS Architecture",
      description: "We architect scalable cloud-native platforms. From complex logic to high-load backend engines using Node and Python.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
      )
    },
    {
      title: "E-commerce Ecosystems",
      description: "Conversion-optimized storefronts. We integrate advanced inventory, payments, and AI-driven personalized shopping experiences.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
        </svg>
      )
    },
    {
      title: "Corporate Platforms",
      description: "Digital headquarters for industry leaders. Stunning aesthetics fused with enterprise-grade security and performance.",
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
        </svg>
      )
    }
  ];

  return (
    <section id="solutions" className="bg-secondary-black py-20 md:py-32 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-evergreen opacity-20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-primary-text mb-6 tracking-tighter font-heading">
            THE SOLUTIONS <span className="text-emerald drop-shadow-[0_0_15px_rgba(80,200,120,0.3)]">MATRIX.</span>
          </h2>
          <p className="text-muted-text max-w-xl text-lg md:text-xl font-medium font-body">
            We don't offer generic packages. We build specialized engines for high-impact business outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative p-8 md:p-10 rounded-[2rem] bg-deep-black border border-mint/5 transition-all duration-700 hover:border-emerald/40 hover:-translate-y-3">
              
              {/* Icon Container with Pulsing Glow */}
              <div className="relative w-16 h-16 mb-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-emerald opacity-10 blur-xl group-hover:opacity-30 transition-opacity"></div>
                <div className="relative z-10 w-full h-full bg-secondary-black rounded-2xl border border-emerald/20 flex items-center justify-center text-emerald group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
              </div>

              <h3 className="text-2xl font-black text-primary-text mb-4 tracking-tight font-heading">
                {service.title}
              </h3>
              
              <p className="text-muted-text leading-relaxed mb-10 text-base group-hover:text-primary-text/80 transition-colors font-body">
                {service.description}
              </p>

              <a href="#" className="inline-flex items-center gap-3 text-emerald font-black text-xs uppercase tracking-[0.2em] group-hover:gap-6 transition-all font-heading">
                Analyze Solution <span className="text-lg">→</span>
              </a>

              {/* Decorative Corner Element */}
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-mint/10 group-hover:bg-emerald transition-colors"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
