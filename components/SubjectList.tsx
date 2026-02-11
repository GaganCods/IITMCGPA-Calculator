import React from 'react';
import { Subject, DegreeProgram } from '../types';
import { Trash2, Layers } from 'lucide-react';
import { getGradePoints } from '../utils';

interface SubjectListProps {
  subjects: Subject[];
  program: DegreeProgram;
  onRemove: (id: string) => void;
  emptyMessage?: string;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, program, onRemove, emptyMessage = "No subjects added yet." }) => {
  if (subjects.length === 0) {
    return (
        <div className="relative overflow-hidden bg-gray-900/30 backdrop-blur-sm border-2 border-dashed border-gray-700/50 rounded-3xl p-12 text-center">
             <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.3),transparent_50%)] animate-pulse" />
             <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-800/50 border border-gray-700 rounded-2xl flex items-center justify-center">
                    <Layers className="w-8 h-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No subjects yet</h3>
                <p className="text-gray-400 text-sm max-w-xs mx-auto">{emptyMessage}</p>
             </div>
        </div>
    );
  }

  const totalCredits = subjects.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = subjects.reduce((sum, s) => sum + (getGradePoints(s.grade, program) * s.credits), 0);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gray-900/50 backdrop-blur-md border border-gray-700/50">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-namdapha-primary/10 border border-namdapha-primary/20 flex items-center justify-center">
                <Layers className="w-4 h-4 text-namdapha-primary" />
              </div>
              <h3 className="text-base font-semibold text-white">Added Subjects</h3>
          </div>
          <span className="text-xs font-mono text-gray-500 bg-gray-800 px-2 py-1 rounded">{subjects.length} items</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-800/30 border-b border-gray-700/50 text-left">
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Credits</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Grade</th>
              <th scope="col" className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Points</th>
              <th scope="col" className="relative px-6 py-4"><span className="sr-only">Delete</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/30">
            {subjects.map((subject) => {
              const points = getGradePoints(subject.grade, program);
              return (
                <tr key={subject.id} className="group hover:bg-gray-800/40 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${['S','A','B'].includes(subject.grade) ? 'bg-namdapha-accent' : 'bg-gray-600'}`}></div>
                          <span className="text-sm font-medium text-gray-200">{subject.name}</span>
                      </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm text-gray-400 font-mono bg-gray-800/50 px-2 py-0.5 rounded border border-gray-700/50">{subject.credits}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold border ${
                        ['S', 'A', 'B'].includes(subject.grade) ? 'bg-namdapha-accent/10 text-namdapha-accent border-namdapha-accent/30' : 
                        ['C', 'D'].includes(subject.grade) ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30' :
                        subject.grade === 'F' ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-gray-700/50 text-gray-300 border-gray-600'
                    }`}>
                        {subject.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="text-sm font-bold font-mono text-transparent bg-gradient-to-r from-namdapha-primary to-namdapha-accent bg-clip-text">
                        {points * subject.credits}
                      </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button 
                        onClick={() => onRemove(subject.id)} 
                        className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {subjects.length > 0 && (
             <tfoot className="bg-gray-800/50 border-t border-gray-700/50">
                <tr>
                    <td className="px-6 py-4 text-sm font-semibold text-white">Total</td>
                    <td className="px-6 py-4 text-sm font-bold text-center text-namdapha-primary font-mono">{totalCredits}</td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 text-sm font-bold text-center text-namdapha-primary font-mono">{totalPoints}</td>
                    <td className="px-6 py-4"></td>
                </tr>
             </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};

export default SubjectList;