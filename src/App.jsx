import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ClickSpark from './components/ClickSpark';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      <ClickSpark
        sparkColor="#50C878"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        {loading && <Loader onFinish={() => setLoading(false)} />}
        <div
          className={`bg-primary min-h-screen text-text-primary selection:bg-emerald selection:text-text-primary antialiased flex flex-col font-body transition-all duration-700 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {location.pathname === '/' && <Navbar loading={loading} />}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services/:serviceId" element={<ServiceDetail />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ClickSpark>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;