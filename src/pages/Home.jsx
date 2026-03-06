import React from 'react';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedWork from '../components/FeaturedWork';
import Process from '../components/Process';
import Technologies from '../components/Technologies';
import Testimonials from '../components/Testimonials';
import InsightsSection from '../components/blog/InsightsSection';
import FinalCTA from '../components/FinalCTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Services />
      <WhyChooseUs />
      <FeaturedWork />
      <InsightsSection />
      <Process />
      <Technologies />
      <Testimonials />
      <FinalCTA />
    </main>
  );
};

export default Home;
