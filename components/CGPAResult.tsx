import React from 'react';
import { CGPAData } from '../types';
import { BookOpen, TrendingUp, Layers } from 'lucide-react';

interface CGPAResultProps {
  data: CGPAData;
  label: string;
  variant?: 'default' | 'sidebar';
}

const CGPAResult: React.FC<CGPAResultProps> = ({ data, label, variant = 'default' }) => {
  const percentage = Math.min((data.cgpa / 10) * 100, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  const isSidebar = variant === 'sidebar';

  return (
    <div className="relative overflow-hidden rounded-3xl group w-full animate-in fade-in zoom-in-95 duration-500">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-namdapha-primary/10 via-namdapha-accent/10 to-namdapha-primary/5 opacity-50" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(45,212,191,0.1)_0px,transparent_50%),radial-gradient(at_100%_100%,rgba(16,185,129,0.1)_0px,transparent_50%)]" />
      
      {/* Glass card */}
      <div className={`relative bg-gray-900/60 backdrop-blur-2xl border border-gray-700/50 p-6 ${isSidebar ? '' : 'md:p-8'}`}>
        {/* Header */}
        <div className={`flex flex-col ${isSidebar ? 'items-center text-center' : 'md:flex-row md:items-center justify-between text-left'} gap-6 mb-6`}>
          <div className={isSidebar ? 'w-full' : ''}>
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2 font-semibold">
              {label}
            </p>
            <div className={`flex items-baseline gap-3 ${isSidebar ? 'justify-center' : ''}`}>
              <span className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-namdapha-primary to-namdapha-accent bg-clip-text text-transparent font-mono tracking-tighter">
                {data.cgpa.toFixed(2)}
              </span>
              <span className="text-2xl text-gray-600 font-medium">/ 10.0</span>
            </div>
          </div>
          
          {/* Circular progress indicator */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
            <svg className="transform -rotate-90 w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-800"
              />
              <circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap={percentage > 0 ? "round" : "butt"}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-white">{Math.round(percentage)}%</span>
              <span className="text-xs text-gray-500">Achieved</span>
            </div>
          </div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 pt-6 border-t border-gray-800">
          <div className="text-center group/stat hover:bg-gray-800/30 p-2 rounded-xl transition-colors">
            <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover/stat:border-blue-500/40 transition-colors">
              <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
            </div>
            <p className="text-lg md:text-2xl font-bold text-white font-mono">{data.totalCredits}</p>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">Credits</p>
          </div>
          
          <div className="text-center group/stat hover:bg-gray-800/30 p-2 rounded-xl transition-colors">
            <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border border-emerald-500/20 flex items-center justify-center group-hover/stat:border-emerald-500/40 transition-colors">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
            </div>
            <p className="text-lg md:text-2xl font-bold text-white font-mono">{data.totalGradePoints.toFixed(0)}</p>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">Points</p>
          </div>
          
          <div className="text-center group/stat hover:bg-gray-800/30 p-2 rounded-xl transition-colors">
            <div className="w-8 h-8 md:w-10 md:h-10 mx-auto mb-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 flex items-center justify-center group-hover/stat:border-purple-500/40 transition-colors">
              <Layers className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
            </div>
            <p className="text-lg md:text-2xl font-bold text-white font-mono">{data.subjectCount}</p>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wide">Subjects</p>
          </div>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-namdapha-primary to-transparent opacity-50" />
    </div>
  );
};

export default CGPAResult;