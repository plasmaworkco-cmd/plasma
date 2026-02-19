import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import FeaturedWork from './components/FeaturedWork';
import Process from './components/Process';
import Technologies from './components/Technologies';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-deep-black min-h-screen text-primary-text selection:bg-emerald selection:text-deep-black antialiased pb-24 md:pb-0 font-body">
      <Navbar />
      
      <main>
        <Hero />
        <SocialProof />
        <Services />
        <WhyChooseUs />
        <FeaturedWork />
        <Process />
        <Technologies />
        <Testimonials />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;