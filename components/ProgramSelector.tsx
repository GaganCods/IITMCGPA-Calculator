import React from 'react';
import { DegreeProgram } from '../types';
import { Database, Cpu, CheckCircle } from 'lucide-react';

interface ProgramSelectorProps {
  selectedProgram: DegreeProgram;
  onProgramChange: (program: DegreeProgram) => void;
}

const ProgramSelector: React.FC<ProgramSelectorProps> = ({ selectedProgram, onProgramChange }) => {
  return (
    <div className="relative overflow-hidden bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-8">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-namdapha-primary/5 rounded-full blur-3xl" />
      
      <h2 className="relative z-10 text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1 h-4 bg-namdapha-primary rounded-full"></span>
        Select Degree Program
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        {/* Data Science Button */}
        <button
          onClick={() => onProgramChange(DegreeProgram.DATA_SCIENCE)}
          className={`relative group flex items-center p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
            selectedProgram === DegreeProgram.DATA_SCIENCE
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-namdapha-primary/50 shadow-[0_0_20px_rgba(45,212,191,0.15)]'
              : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/60 hover:border-namdapha-primary/30'
          }`}
        >
          {selectedProgram === DegreeProgram.DATA_SCIENCE && (
             <div className="absolute inset-0 bg-gradient-to-r from-namdapha-primary/5 to-transparent pointer-events-none" />
          )}

          <div className={`p-3 rounded-lg mr-4 transition-colors ${
              selectedProgram === DegreeProgram.DATA_SCIENCE 
              ? 'bg-namdapha-primary/20 text-namdapha-primary' 
              : 'bg-gray-700/30 text-gray-500 group-hover:text-gray-300'
          }`}>
            <Database className="w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <h3 className={`font-bold transition-colors ${selectedProgram === DegreeProgram.DATA_SCIENCE ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
              Data Science
            </h3>
            <p className="text-xs text-gray-500">BS in Data Science & Applications</p>
          </div>
          {selectedProgram === DegreeProgram.DATA_SCIENCE && (
            <div className="text-namdapha-primary">
              <CheckCircle className="w-5 h-5 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
            </div>
          )}
        </button>

        {/* Electronic Systems Button */}
        <button
          onClick={() => onProgramChange(DegreeProgram.ELECTRONIC_SYSTEMS)}
          className={`relative group flex items-center p-4 rounded-xl border transition-all duration-300 overflow-hidden ${
            selectedProgram === DegreeProgram.ELECTRONIC_SYSTEMS
              ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-namdapha-primary/50 shadow-[0_0_20px_rgba(45,212,191,0.15)]'
              : 'bg-gray-800/30 border-gray-700/50 hover:bg-gray-800/60 hover:border-namdapha-primary/30'
          }`}
        >
          {selectedProgram === DegreeProgram.ELECTRONIC_SYSTEMS && (
             <div className="absolute inset-0 bg-gradient-to-r from-namdapha-primary/5 to-transparent pointer-events-none" />
          )}

          <div className={`p-3 rounded-lg mr-4 transition-colors ${
              selectedProgram === DegreeProgram.ELECTRONIC_SYSTEMS
              ? 'bg-namdapha-primary/20 text-namdapha-primary' 
              : 'bg-gray-700/30 text-gray-500 group-hover:text-gray-300'
          }`}>
            <Cpu className="w-6 h-6" />
          </div>
          <div className="text-left flex-1">
            <h3 className={`font-bold transition-colors ${selectedProgram === DegreeProgram.ELECTRONIC_SYSTEMS ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
              Electronic Systems
            </h3>
            <p className="text-xs text-gray-500">BS in Electronic Systems</p>
          </div>
          {selectedProgram === DegreeProgram.ELECTRONIC_SYSTEMS && (
            <div className="text-namdapha-primary">
              <CheckCircle className="w-5 h-5 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProgramSelector;