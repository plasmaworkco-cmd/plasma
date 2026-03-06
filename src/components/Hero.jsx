import React from 'react';
import HeroFuturisticOverlay from './ui/hero-futuristic';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-primary transition-colors duration-300 overflow-hidden">
      <HeroFuturisticOverlay />
    </section>
  );
};

export default Hero;
