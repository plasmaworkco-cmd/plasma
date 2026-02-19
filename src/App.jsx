import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
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
    <ThemeProvider>
      <div className="bg-primary min-h-screen text-text-primary selection:bg-emerald selection:text-text-primary antialiased pb-24 md:pb-0 font-body transition-colors duration-300">
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
    </ThemeProvider>
  );
}

export default App;