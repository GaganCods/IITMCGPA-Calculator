import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Menu, X, ChevronRight, Home, Calculator } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Mobile Menu Interactions (Scroll Lock, Esc Key, Focus Trap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!isMobileMenuOpen) return;
        
        if (e.key === 'Escape') {
            setIsMobileMenuOpen(false);
        }

        if (e.key === 'Tab' && menuRef.current) {
            const focusableElements = menuRef.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select'
            );
            
            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    };

    if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
    } else {
        document.body.style.overflow = 'unset';
    }

    return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 ease-in-out px-4 pointer-events-none ${
          isScrolled ? 'pt-2' : 'pt-4 md:pt-6'
        }`}
      >
        <div 
          className={`relative w-full md:w-auto md:min-w-[700px] max-w-5xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
            isScrolled 
              ? 'bg-[#0a0f1a]/90 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-gray-700/50 backdrop-blur-xl' 
              : 'bg-[#0a0f1a]/70 border-gray-700/30 backdrop-blur-md shadow-lg'
          } border rounded-full px-4 py-2 md:px-6 md:py-3`}
        >
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo Section */}
            <Link 
              to="/" 
              onClick={handleHomeClick}
              className="flex items-center gap-3 group focus:outline-none rounded-xl"
              aria-label="CGPA Calculator Home"
            >
              <div className={`p-2 rounded-full border transition-all duration-300 ${
                isScrolled 
                  ? 'bg-namdapha-primary/10 border-namdapha-primary/20' 
                  : 'bg-gradient-to-br from-namdapha-primary/20 to-namdapha-accent/20 border-namdapha-primary/30'
              }`}>
                <GraduationCap className="w-5 h-5 md:w-6 md:h-6 text-namdapha-primary group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-bold text-gray-100 leading-tight group-hover:text-white transition-colors">
                  CGPA Calculator
                </span>
                <span className="text-[10px] text-namdapha-primary font-medium tracking-widest uppercase hidden sm:block">
                  IITM BS Degree
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                to="/" 
                onClick={handleHomeClick}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                  location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Home
                </span>
                {location.pathname === '/' && (
                  <span className="absolute inset-0 bg-gray-800 rounded-full -z-0 animate-in fade-in zoom-in-95 duration-200"></span>
                )}
              </Link>

              <Link 
                to="/calculator" 
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                  location.pathname === '/calculator' ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  CGPA Calculator
                </span>
                {location.pathname === '/calculator' && (
                  <span className="absolute inset-0 bg-gray-800 rounded-full -z-0 animate-in fade-in zoom-in-95 duration-200"></span>
                )}
              </Link>

              <div className="w-px h-4 bg-gray-700 mx-2"></div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-800/50 border border-gray-700/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-namdapha-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-namdapha-accent"></span>
                </span>
                <span className="text-xs font-medium text-gray-300 whitespace-nowrap">
                  IIT Madras BS
                </span>
              </div>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-namdapha-primary/50"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          ref={menuRef}
          id="mobile-menu"
          className={`absolute top-full left-0 right-0 px-4 mt-2 transition-all duration-300 origin-top transform pointer-events-auto ${
            isMobileMenuOpen 
              ? 'opacity-100 scale-100 translate-y-0 visible' 
              : 'opacity-0 scale-95 -translate-y-4 invisible'
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-5xl mx-auto bg-[#0a0f1a]/95 backdrop-blur-xl border border-gray-800 rounded-3xl p-4 shadow-2xl overflow-hidden">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={handleHomeClick}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                  location.pathname === '/' 
                    ? 'bg-gray-800 text-white shadow-inner' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${location.pathname === '/' ? 'bg-namdapha-primary/20 text-namdapha-primary' : 'bg-gray-800 text-gray-500'}`}>
                    <Home className="w-5 h-5" />
                  </div>
                  <span className="font-medium">Home</span>
                </div>
                {location.pathname === '/' && <ChevronRight className="w-4 h-4 text-namdapha-primary" />}
              </Link>

              <Link
                to="/calculator"
                onClick={closeMenu}
                className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                  location.pathname === '/calculator' 
                    ? 'bg-gray-800 text-white shadow-inner' 
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-lg ${location.pathname === '/calculator' ? 'bg-namdapha-primary/20 text-namdapha-primary' : 'bg-gray-800 text-gray-500'}`}>
                    <Calculator className="w-5 h-5" />
                  </div>
                  <span className="font-medium">CGPA Calculator</span>
                </div>
                {location.pathname === '/calculator' && <ChevronRight className="w-4 h-4 text-namdapha-primary" />}
              </Link>
              
              <div className="mt-2 pt-4 border-t border-gray-800/50 px-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Academic Program</p>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-900 border border-gray-800">
                  <span className="w-2 h-2 rounded-full bg-namdapha-accent shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                  <span className="text-sm text-gray-300 font-medium">IIT Madras BS Degree</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;