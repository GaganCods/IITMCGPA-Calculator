import React, { useState, useEffect } from 'react';
import { DegreeProgram, SubjectType, Subject, ScoreComponents, CourseLevel } from '../types';
import { GRADING_SYSTEMS, ALL_COURSES } from '../constants';
import { Plus, X } from 'lucide-react';
import { calculateCourseScore, getGradeFromScore } from '../utils';

interface SubjectFormProps {
  program: DegreeProgram;
  type: SubjectType;
  selectedCourseId: string;
  onAdd: (subject: Subject) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ program, type, selectedCourseId, onAdd }) => {
  // State for Calculator
  const [components, setComponents] = useState<ScoreComponents>({});
  const [calculatedScore, setCalculatedScore] = useState<number | null>(null);

  // State for Subject details
  const [name, setName] = useState('');
  const [credits, setCredits] = useState<number>(4);
  const [grade, setGrade] = useState<string>('');
  
  const [error, setError] = useState<string | null>(null);

  // Reset calculator when course changes
  useEffect(() => {
    setComponents({});
    setCalculatedScore(null);
    setGrade('');
    setError(null);
    
    if (selectedCourseId) {
        const course = ALL_COURSES.find(c => c.id === selectedCourseId);
        if (course) {
            setName(course.name);
            setCredits(course.credits);
        }
    } else {
        setName('');
    }
  }, [selectedCourseId]);

  // Real-time calculation
  useEffect(() => {
    if (selectedCourseId) {
      const course = ALL_COURSES.find(c => c.id === selectedCourseId);
      if (course) {
        const score = calculateCourseScore(course.formula, components);
        setCalculatedScore(score);
        // Only auto-set grade if score is > 0 or components are filled, 
        // to avoid overwriting manual grade selection if they just opened the form.
        if (Object.keys(components).length > 0) {
            setGrade(getGradeFromScore(score));
        }
      }
    }
  }, [components, selectedCourseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedCourseId) {
      setError('Please select a course');
      return;
    }
    if (!name.trim()) {
      setError('Subject name is required');
      return;
    }
    if (!grade) {
      setError('Grade is required');
      return;
    }

    const newSubject: Subject = {
      id: crypto.randomUUID(),
      name: name.trim(),
      credits: credits,
      grade,
      type
    };

    onAdd(newSubject);
    
    // Reset inputs but not the course (controlled by parent, but parent resets on add)
    setComponents({});
    setCalculatedScore(null);
    setGrade('');
  };

  const handleComponentChange = (field: keyof ScoreComponents, value: string) => {
    const numValue = Math.min(Math.max(parseFloat(value) || 0, 0), 100);
    setComponents(prev => ({ ...prev, [field]: numValue }));
  };

  const grades = GRADING_SYSTEMS[program].grades;
  const selectedCourse = ALL_COURSES.find(c => c.id === selectedCourseId);

  if (!selectedCourse) {
    return (
      <div className="bg-gray-900/30 border-2 border-dashed border-gray-800 rounded-2xl p-8 mb-8 text-center animate-in fade-in zoom-in-95 duration-300">
         <p className="text-gray-500 text-sm">Select a course from the section above to enter details.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mb-8 transition-all relative overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
        {/* Glow effect on border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-namdapha-primary/50 to-transparent opacity-0 transition-opacity duration-300" />

      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
            <div className="w-1.5 h-6 bg-namdapha-primary rounded-full" />
            Enter Scores for {selectedCourse.name}
        </h4>
      </div>

      <form onSubmit={handleSubmit}>
          <div className="mb-8 p-5 bg-gray-800/40 rounded-xl border border-gray-700/50">
             
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                {selectedCourse.inputs.map((input) => (
                    <div className="col-span-1" key={input.key}>
                        <label className="block text-xs text-gray-500 mb-1">{input.label}</label>
                        <input 
                            type="number" 
                            min="0" 
                            max={input.max}
                            value={components[input.key] || ''} 
                            onChange={(e) => handleComponentChange(input.key, e.target.value)} 
                            className="w-full bg-gray-900 border border-gray-700 text-white p-2 rounded-lg text-sm focus:border-namdapha-primary focus:ring-1 focus:ring-namdapha-primary outline-none transition-all placeholder-gray-700" 
                            placeholder={`Max ${input.max}`}
                        />
                    </div>
                ))}
             </div>
             
             {calculatedScore !== null && (
                 <div className="mt-6 pt-4 border-t border-gray-700/50 flex justify-between items-center bg-gray-900/50 rounded-lg p-4 animate-in fade-in duration-300">
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Calculated Score</p>
                        <p className="text-xl font-bold text-white font-mono">{calculatedScore.toFixed(1)} <span className="text-sm font-normal text-gray-600">/ 100</span></p>
                    </div>
                    <div className="text-right">
                         <p className="text-xs text-gray-500 uppercase tracking-wide">Predicted Grade</p>
                         <p className="text-3xl font-bold text-namdapha-primary">{getGradeFromScore(calculatedScore)}</p>
                    </div>
                 </div>
             )}
          </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          <div className="md:col-span-5 relative group">
            <input
              type="text"
              id="subject-name"
              value={name}
              placeholder=" "
              className="peer w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 placeholder-transparent focus:bg-gray-800 focus:border-namdapha-primary focus:outline-none focus:ring-4 focus:ring-namdapha-primary/10 transition-all duration-200 cursor-not-allowed"
              readOnly
              disabled
            />
             <label
                htmlFor="subject-name"
                className="absolute left-4 top-2 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-namdapha-primary"
            >
                Subject Name
            </label>
          </div>
          
          <div className="md:col-span-2 relative">
             <div className="relative">
                <input
                    type="number"
                    value={credits}
                    className="w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-gray-400 text-center font-mono focus:bg-gray-800 focus:border-namdapha-primary focus:outline-none focus:ring-4 focus:ring-namdapha-primary/10 cursor-not-allowed"
                    readOnly
                    disabled
                />
                 <label className="absolute -top-2 left-2 px-1 bg-[#161d2d] text-xs text-gray-500 rounded">Credits</label>
            </div>
          </div>

          <div className="md:col-span-3 relative">
            <div className="relative">
                 <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white appearance-none cursor-pointer focus:bg-gray-800 focus:border-namdapha-primary focus:outline-none focus:ring-4 focus:ring-namdapha-primary/10"
                    >
                    <option value="" disabled className="bg-gray-900">Select Grade</option>
                    {grades.map(g => (
                        <option key={g.grade} value={g.grade} className="bg-gray-900">{g.grade} ({g.points}) - {g.description}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
                <label className="absolute -top-2 left-2 px-1 bg-[#161d2d] text-xs text-gray-500 rounded">Grade</label>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="group relative w-full inline-flex justify-center items-center px-4 py-3.5 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-namdapha-primary to-namdapha-accent hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></span>
              <span className="relative z-10 flex items-center gap-2">
                 <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                 Add
              </span>
            </button>
          </div>
        </div>
        {error && <p className="mt-3 text-sm text-red-400 font-medium flex items-center gap-2 animate-pulse"><X className="w-4 h-4"/> {error}</p>}
      </form>
    </div>
  );
};

export default SubjectForm;