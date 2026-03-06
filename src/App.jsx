import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ClickSpark from './components/ClickSpark'
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectPage from './pages/ProjectPage';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <Router>
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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/work/:slug" element={<ProjectPage />} />
            </Routes>
            <Footer />
          </div>
        </ClickSpark>
      </Router>
    </ThemeProvider>
  );
}

export default App;