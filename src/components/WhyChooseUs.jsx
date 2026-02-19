import React from 'react';

const WhyChooseUs = () => {
  const features = [
    {
      title: "Speed",
      desc: "Our code is optimized for milliseconds, not seconds. We obsess over Core Web Vitals."
    },
    {
      title: "Precision",
      desc: "Pixel-perfect implementation of complex designs. No shortcuts, no 'close enough'."
    },
    {
      title: "Scalability",
      desc: "Architectures that grow with you. From 100 to 10 million users without a rewrite."
    }
  ];

  return (
    <section className="bg-deep-black py-20 md:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-royal-amethyst opacity-5 blur-[60px] md:blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-black text-primary-text mb-6 font-heading">
            THE PLASMA <span className="text-emerald">EDGE.</span>
          </h2>
          <p className="text-muted-text max-w-2xl mx-auto font-body">
            Why visionary founders choose us to build their digital infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald/20 to-transparent"></div>

           {features.map((feature, idx) => (
             <div key={idx} className="relative pt-8 group">
               {/* Dot on line */}
               <div className="hidden md:block absolute top-[43px] left-1/2 -translate-x-1/2 w-3 h-3 bg-deep-black border-2 border-emerald rounded-full z-10 group-hover:bg-emerald transition-colors duration-300 shadow-[0_0_10px_rgba(80,200,120,0.5)]"></div>
               
               <div className="text-center p-8 rounded-2xl bg-secondary-black/50 border border-transparent hover:border-mint/10 transition-all duration-300">
                 <h3 className="text-2xl font-bold text-mint mb-4 font-heading">{feature.title}</h3>
                 <p className="text-muted-text leading-relaxed">
                   {feature.desc}
                 </p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
