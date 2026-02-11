import React from 'react';
import { DegreeProgram, CourseLevel } from '../types';
import { ALL_COURSES } from '../constants';
import { BookOpen, ChevronDown } from 'lucide-react';

interface CourseSelectorProps {
  program: DegreeProgram;
  selectedLevel: CourseLevel;
  selectedCourseId: string;
  onLevelChange: (level: CourseLevel) => void;
  onCourseChange: (courseId: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ 
  program, 
  selectedLevel, 
  selectedCourseId, 
  onLevelChange, 
  onCourseChange 
}) => {
  const filteredCourses = ALL_COURSES.filter(c => c.level === selectedLevel && c.programs.includes(program));

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-5 bg-namdapha-primary rounded-full"></div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Select Course to Add</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
           <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Course Level</label>
           <div className="relative group">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BookOpen className="h-4 w-4 text-gray-500 group-focus-within:text-namdapha-primary transition-colors" />
             </div>
             <select 
               value={selectedLevel}
               onChange={(e) => {
                 onLevelChange(e.target.value as CourseLevel);
                 onCourseChange(''); // Reset course when level changes
               }}
               className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-namdapha-primary/50 focus:border-namdapha-primary block pl-10 pr-10 py-3.5 appearance-none transition-all cursor-pointer hover:bg-gray-800"
             >
                {Object.values(CourseLevel).map((level) => (
                    <option key={level} value={level}>{level}</option>
                ))}
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <ChevronDown className="w-4 h-4" />
             </div>
           </div>
        </div>

        <div>
           <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Select Subject</label>
           <div className="relative group">
             <select 
               value={selectedCourseId}
               onChange={(e) => onCourseChange(e.target.value)}
               className="w-full bg-gray-800/50 border border-gray-700 text-white text-sm rounded-xl focus:ring-2 focus:ring-namdapha-primary/50 focus:border-namdapha-primary block px-4 py-3.5 appearance-none transition-all cursor-pointer hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
               disabled={filteredCourses.length === 0}
             >
                <option value="">-- Choose Subject --</option>
                {filteredCourses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
             </select>
             <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                <ChevronDown className="w-4 h-4" />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSelector;