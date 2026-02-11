import React, { useState } from 'react';
import { CGPAData } from '../types';
import { Target, ArrowRight } from 'lucide-react';

interface FuturePlannerProps {
  currentData: CGPAData;
}

const FuturePlanner: React.FC<FuturePlannerProps> = ({ currentData }) => {
  const [targetCGPA, setTargetCGPA] = useState<string>('9.0');
  const [futureCredits, setFutureCredits] = useState<string>('20');

  const calculateRequiredGPA = () => {
    const target = parseFloat(targetCGPA);
    const credits = parseInt(futureCredits);
    
    if (isNaN(target) || isNaN(credits) || credits <= 0) return 0;
    
    // Formula: (Target * (CurrentCredits + FutureCredits) - CurrentPoints) / FutureCredits
    const totalRequiredPoints = target * (currentData.totalCredits + credits);
    const pointsNeeded = totalRequiredPoints - currentData.totalGradePoints;
    const requiredGPA = pointsNeeded / credits;
    
    return requiredGPA;
  };

  const requiredGPA = calculateRequiredGPA();
  const isImpossible = requiredGPA > 10;
  const isAchieved = requiredGPA <= 0;

  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 mt-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-namdapha-accent/5 rounded-full blur-2xl -mt-10 -mr-10"></div>

      <div className="flex items-center space-x-3 mb-6 relative z-10">
        <div className="p-2 bg-namdapha-accent/10 rounded-lg border border-namdapha-accent/20">
            <Target className="w-5 h-5 text-namdapha-accent" />
        </div>
        <h2 className="text-lg font-bold text-white">Future Goal Planner</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        <div className="space-y-6">
            <div className="relative group">
                <input 
                    type="number" 
                    step="0.01" 
                    max="10" 
                    value={targetCGPA}
                    onChange={(e) => setTargetCGPA(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-transparent focus:bg-gray-800 focus:border-namdapha-accent focus:outline-none focus:ring-4 focus:ring-namdapha-accent/10 transition-all"
                    placeholder=" "
                />
                 <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-namdapha-accent">
                    Target CGPA
                </label>
            </div>
            <div className="relative group">
                <input 
                    type="number" 
                    value={futureCredits}
                    onChange={(e) => setFutureCredits(e.target.value)}
                    className="peer w-full px-4 pt-6 pb-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-transparent focus:bg-gray-800 focus:border-namdapha-accent focus:outline-none focus:ring-4 focus:ring-namdapha-accent/10 transition-all"
                    placeholder=" "
                />
                 <label className="absolute left-4 top-2 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:text-xs peer-focus:text-namdapha-accent">
                    Future Credits
                </label>
                <p className="text-xs text-gray-500 mt-2 ml-1">Approx. 4-5 subjects = 16-20 credits</p>
            </div>
        </div>

        <div className={`rounded-xl p-8 flex flex-col justify-center items-center text-center border transition-all duration-300 ${
            isImpossible ? 'bg-red-500/5 border-red-500/20' : 
            isAchieved ? 'bg-namdapha-accent/5 border-namdapha-accent/20' : 
            'bg-gray-800/30 border-gray-700'
        }`}>
            {isImpossible ? (
                 <>
                    <h3 className="text-red-400 font-bold text-lg mb-2">Unobtainable</h3>
<p className="text-red-300/70 text-sm">
  You would need a GPA &gt; 10 to reach this.
</p>

                 </>
            ) : isAchieved ? (
                <>
                    <h3 className="text-namdapha-accent font-bold text-lg mb-2">Already Achieved!</h3>
                    <p className="text-namdapha-accent/70 text-sm">Your current CGPA is already higher than the target.</p>
                </>
            ) : (
                <>
                    <p className="text-gray-400 font-medium text-xs uppercase tracking-widest mb-3">Required Average GPA</p>
                    <div className="flex items-center justify-center mb-3">
                        <span className="text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">{requiredGPA.toFixed(2)}</span>
                    </div>
                    <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                        Average <strong className="text-white">{requiredGPA.toFixed(2)}</strong> in your next <strong className="text-white">{futureCredits}</strong> credits to hit <strong className="text-namdapha-accent">{targetCGPA}</strong>.
                    </p>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default FuturePlanner;
