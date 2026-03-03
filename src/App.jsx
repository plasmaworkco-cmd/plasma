import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ClickSpark from './components/ClickSpark'
import Loader from './components/Loader';
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
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <ClickSpark
        sparkColor="#50C878"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {loading && <Loader onFinish={() => setLoading(false)} />}
        <div
          className={`bg-primary min-h-screen text-text-primary selection:bg-emerald selection:text-text-primary antialiased pb-24 md:pb-0 font-body transition-all duration-700 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Navbar loading={loading} />
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
      </ClickSpark>
    </ThemeProvider>
  );
}

export default App;