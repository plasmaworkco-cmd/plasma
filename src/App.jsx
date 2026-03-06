import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import ClickSpark from './components/ClickSpark';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectPage from './pages/ProjectPage';
import BlogPost from './pages/BlogPost';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/transitions/PageTransition';
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

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
          <CustomCursor />
          <div
            className={`bg-primary min-h-screen text-text-primary selection:bg-emerald selection:text-text-primary antialiased pb-24 md:pb-0 font-body transition-all duration-700 cursor-none ${
              loading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Navbar loading={loading} />
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
                <Route path="/work/:slug" element={<PageTransition><ProjectPage /></PageTransition>} />
                <Route path="/insights/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
              </Routes>
            </AnimatePresence>
            <Footer />
          </div>
        </ClickSpark>
    </ThemeProvider>
  );
}

export default App;