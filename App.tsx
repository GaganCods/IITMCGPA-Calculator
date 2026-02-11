import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Calculator from './components/Calculator';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#0a0f1a] text-gray-100 selection:bg-namdapha-primary selection:text-white relative">
        
        {/* Background Grid Pattern */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{
                  backgroundImage: 'linear-gradient(to right, #2dd4bf 1px, transparent 1px), linear-gradient(to bottom, #2dd4bf 1px, transparent 1px)',
                  backgroundSize: '48px 48px',
                  filter: 'blur(0.5px)',
              }}
          />
          {/* Radial Vignette for masking edges */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0f1a_100%)] opacity-90"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/calculator" element={<Calculator />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
};

export default App;