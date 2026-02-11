import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Heart, Shield, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080f] border-t border-gray-800/50 mt-auto relative overflow-hidden">
      {/* Subtle top gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* Column 1: Brand & Description */}
          <div className="space-y-4">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="text-lg font-bold text-white tracking-tight flex items-center gap-2 w-fit hover:opacity-90 transition-opacity"
              aria-label="Go to Home"
            >
              <span className="w-2 h-2 rounded-full bg-namdapha-primary shadow-[0_0_10px_rgba(45,212,191,0.5)]"></span>
              CGPA Calculator
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              CGPA Calculator & Future Planner for IITM BS Students. 
              Plan your academic journey with precision using official grading logic.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-900 border border-gray-800">
                <Shield className="w-3 h-3 text-green-500" />
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gray-500">Client-side only • No backend</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={scrollToTop}
                  className="text-sm text-gray-400 hover:text-namdapha-primary transition-colors flex items-center gap-2 group w-fit"
                >
                  <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-namdapha-primary transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/calculator" 
                  onClick={scrollToTop}
                  className="text-sm text-gray-400 hover:text-namdapha-primary transition-colors flex items-center gap-2 group w-fit"
                >
                  <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-namdapha-primary transition-colors"></span>
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/GaganCods/CGPA-Calculator" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-namdapha-primary transition-colors flex items-center gap-2 group w-fit"
                >
                  <span className="w-1 h-1 bg-gray-700 rounded-full group-hover:bg-namdapha-primary transition-colors"></span>
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Challenge Info & Connect */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 uppercase tracking-wider mb-4">Challenge Context</h4>
             <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Built by <span className="text-gray-200 font-medium">Gagan Pratap</span> for the <span className="text-gray-200 font-medium">Namdapha Tech Challenge</span>.
              This tool strictly adheres to IITM BS Degree grading rules.
            </p>
            <div className="flex items-center gap-3">
                 <a 
                    href="https://www.linkedin.com/in/gagan-pratap/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-blue-400 transition-all duration-200 ease-out border border-gray-700/50 hover:border-gray-600 hover:scale-105" 
                    aria-label="LinkedIn profile"
                 >
                    <Linkedin className="w-4 h-4" />
                 </a>

                 <a 
                    href="https://www.instagram.com/iamgaganpratap/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-gray-400 hover:text-pink-400 transition-all duration-200 ease-out border border-gray-700/50 hover:border-gray-600 hover:scale-105" 
                    aria-label="Instagram profile"
                 >
                    <Instagram className="w-4 h-4" />
                 </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} CGPA Calculator. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-col md:flex-row">
            <p className="text-xs text-gray-500 flex items-center gap-1.5">
              Built with <Heart className="w-3 h-3 text-red-500/70 fill-red-500/10 animate-pulse" /> by <span className="text-gray-400 font-medium">Gagan Pratap</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;