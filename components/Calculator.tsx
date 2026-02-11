import React, { useState, useEffect } from 'react';
import ProgramSelector from './ProgramSelector';
import CourseSelector from './CourseSelector';
import SubjectForm from './SubjectForm';
import SubjectList from './SubjectList';
import CGPAResult from './CGPAResult';
import FuturePlanner from './FuturePlanner';
import { DegreeProgram, Subject, SubjectType, CourseLevel } from '../types';
import { calculateCGPA, loadFromStorage, saveToStorage } from '../utils';
import { Layers, TrendingUp, CheckCircle, Clock, Target, Info, Calculator as CalculatorIcon } from 'lucide-react';

const Calculator: React.FC = () => {
  const [program, setProgram] = useState<DegreeProgram>(DegreeProgram.DATA_SCIENCE);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'predict' | 'future'>('current');
  const [isLoaded, setIsLoaded] = useState(false);

  // Global Selection State
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>(CourseLevel.FOUNDATION);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  // Load initial data
  useEffect(() => {
    const data = loadFromStorage();
    if (data) {
      setSubjects(data.subjects);
      setProgram(data.program);
    }
    setIsLoaded(true);
  }, []);

  // Save on changes
  useEffect(() => {
    if (isLoaded) {
      saveToStorage(subjects, program);
    }
  }, [subjects, program, isLoaded]);

  const handleAddSubject = (subject: Subject) => {
    setSubjects(prev => [...prev, subject]);
    setSelectedCourseId(''); // Reset course selection after add
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleProgramChange = (newProgram: DegreeProgram) => {
    if (subjects.length > 0) {
      if (window.confirm("Changing the program will require recalculating based on different grading rules. Proceed?")) {
        setProgram(newProgram);
        setSelectedCourseId('');
      }
    } else {
      setProgram(newProgram);
      setSelectedCourseId('');
    }
  };

  const completedSubjects = subjects.filter(s => s.type === SubjectType.COMPLETED);
  const ongoingSubjects = subjects.filter(s => s.type === SubjectType.ONGOING);
  
  // Calculate Current CGPA (Completed only)
  const currentCGPAData = calculateCGPA(completedSubjects, program);

  // Calculate Predicted CGPA (Completed + Ongoing)
  const predictedSubjects = [...completedSubjects, ...ongoingSubjects];
  const predictedCGPAData = calculateCGPA(predictedSubjects, program);

  if (!isLoaded) return <div className="flex h-screen items-center justify-center text-namdapha-primary font-mono text-sm">Initializing System...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 animate-in fade-in duration-500">
      
      {/* Page Header */}
      <div className="relative mb-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 bg-namdapha-primary/5 blur-[80px] rounded-full -z-10 pointer-events-none"></div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-900/80 border border-gray-800 text-namdapha-primary text-xs font-semibold tracking-wider uppercase mb-5 shadow-sm backdrop-blur-sm">
           <CalculatorIcon className="w-3.5 h-3.5" />
           Academic Performance
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          Grade Calculator
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Plan your academic performance with confidence.
        </p>
      </div>

      <ProgramSelector selectedProgram={program} onProgramChange={handleProgramChange} />

      {/* New Course Selector Section */}
      {(activeTab === 'current' || activeTab === 'predict') && (
        <CourseSelector 
          program={program}
          selectedLevel={selectedLevel}
          selectedCourseId={selectedCourseId}
          onLevelChange={setSelectedLevel}
          onCourseChange={setSelectedCourseId}
        />
      )}

      {/* Animated Tab Navigation */}
      <div className="relative bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-1.5 mb-8 flex flex-col sm:flex-row gap-1 sm:gap-0">
         <button
            onClick={() => setActiveTab('current')}
            className={`relative flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'current' ? 'bg-gray-800 text-white shadow-lg shadow-black/20 ring-1 ring-gray-700' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
            }`}
         >
            <CheckCircle className={`w-4 h-4 ${activeTab === 'current' ? 'text-namdapha-primary' : ''}`} />
            Current CGPA
         </button>
         
         <button
            onClick={() => setActiveTab('predict')}
            className={`relative flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'predict' ? 'bg-gray-800 text-white shadow-lg shadow-black/20 ring-1 ring-gray-700' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
            }`}
         >
            <Clock className={`w-4 h-4 ${activeTab === 'predict' ? 'text-blue-400' : ''}`} />
            Predict Semester
         </button>

         <button
            onClick={() => setActiveTab('future')}
            className={`relative flex-1 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                activeTab === 'future' ? 'bg-gray-800 text-white shadow-lg shadow-black/20 ring-1 ring-gray-700' : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/30'
            }`}
         >
            <Target className={`w-4 h-4 ${activeTab === 'future' ? 'text-purple-400' : ''}`} />
            Future Planning
         </button>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Result & Inputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'current' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
              <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-1">
                   <div className="p-5 border-b border-gray-800">
                      <h3 className="text-lg font-bold text-white mb-1">Completed Subjects</h3>
                      <p className="text-sm text-gray-500">Add your past grades to calculate your current standing.</p>
                   </div>
                  <div className="p-5">
                      <SubjectForm 
                        program={program} 
                        type={SubjectType.COMPLETED} 
                        selectedCourseId={selectedCourseId}
                        onAdd={handleAddSubject} 
                      />
                      <SubjectList 
                      subjects={completedSubjects} 
                      program={program} 
                      onRemove={handleRemoveSubject} 
                      emptyMessage="No completed subjects added yet."
                      />
                  </div>
              </div>
            </div>
          )}

          {activeTab === 'predict' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                   <div className="relative p-6 bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Layers className="w-16 h-16 text-white" />
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Current</p>
                      <p className="text-4xl font-bold text-white font-mono">{currentCGPAData.cgpa.toFixed(2)}</p>
                   </div>
                   <div className="relative p-6 bg-gradient-to-br from-namdapha-primary/10 to-namdapha-accent/10 rounded-2xl border border-namdapha-primary/20 overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <TrendingUp className="w-16 h-16 text-namdapha-primary" />
                      </div>
                      <p className="text-xs text-namdapha-primary uppercase tracking-widest font-bold mb-1">Predicted</p>
                      <p className="text-4xl font-bold text-namdapha-primary font-mono">{predictedCGPAData.cgpa.toFixed(2)}</p>
                   </div>
               </div>

               <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-1">
                  <div className="p-5 border-b border-gray-800">
                      <h3 className="text-lg font-bold text-white mb-1">Ongoing Subjects</h3>
                      <p className="text-sm text-gray-500">Predict your next semester by adding subjects with expected grades.</p>
                  </div>
                  <div className="p-5">
                      <SubjectForm 
                        program={program} 
                        type={SubjectType.ONGOING} 
                        selectedCourseId={selectedCourseId}
                        onAdd={handleAddSubject} 
                      />
                      <SubjectList 
                      subjects={ongoingSubjects} 
                      program={program} 
                      onRemove={handleRemoveSubject} 
                      emptyMessage="No ongoing subjects added."
                      />
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'future' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-6">
               <CGPAResult data={currentCGPAData} label="Baseline (Current)" />
               <FuturePlanner currentData={currentCGPAData} />
             </div>
          )}

        </div>

        {/* Right Column: Summary / Tips */}
        <div className="lg:col-span-1 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
          <div className="sticky top-24 space-y-6">
            
            {activeTab === 'current' && (
                <CGPAResult data={currentCGPAData} label="Current Performance" variant="sidebar" />
            )}

            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700/50 p-6 shadow-xl">
                <h3 className="font-bold text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-5 bg-gradient-to-b from-namdapha-primary to-namdapha-accent rounded-full"></div>
                    Academic Summary
                </h3>
                <dl className="space-y-4">
                    <div className="flex justify-between items-center">
                        <dt className="text-sm text-gray-400">Program</dt>
                        <dd className="text-sm font-medium text-white text-right px-2 py-1 bg-gray-800 rounded-md border border-gray-700">{program === DegreeProgram.DATA_SCIENCE ? 'Data Science' : 'Electronic Systems'}</dd>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                        <dt className="text-sm text-gray-400">Credits Earned</dt>
                        <dd className="text-sm font-mono font-bold text-white">{currentCGPAData.totalCredits}</dd>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                        <dt className="text-sm text-gray-400">Subjects Completed</dt>
                        <dd className="text-sm font-mono font-bold text-white">{completedSubjects.length}</dd>
                    </div>
                    <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                        <dt className="text-sm text-gray-400">Projected Credits</dt>
                        <dd className="text-sm font-mono font-bold text-namdapha-primary">{predictedCGPAData.totalCredits}</dd>
                    </div>
                </dl>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-l-4 border-blue-500 rounded-xl p-4">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.1)_25%,rgba(59,130,246,0.1)_50%,transparent_50%,transparent_75%,rgba(59,130,246,0.1)_75%)] bg-[length:20px_20px] opacity-20"></div>
                <div className="relative flex gap-3">
                    <div className="mt-0.5">
                        <Info className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-blue-400 mb-1">Grading Tip</h4>
                        <p className="text-xs text-gray-300 leading-relaxed">
                            'P' grades are pass/fail. They count towards credits but don't affect your CGPA.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;