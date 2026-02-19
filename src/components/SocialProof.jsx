import React from 'react';

const SocialProof = () => {
  return (
    <section className="bg-deep-black py-10 border-b border-mint/5">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-[10px] uppercase tracking-[0.3em] text-emerald font-bold mb-8 font-heading opacity-80 text-center md:text-left">
          Trusted by industry leaders
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 items-center opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {['FORBES', 'TECHCRUNCH', 'STRIPE', 'VERCEL', 'AWS'].map((brand) => (
            <span key={brand} className="text-primary-text font-bold text-2xl font-heading hover:text-emerald transition-colors duration-300 cursor-default">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
