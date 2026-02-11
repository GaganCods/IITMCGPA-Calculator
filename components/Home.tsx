import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator as CalculatorIcon, 
  TrendingUp, 
  Target, 
  ShieldCheck, 
  Cpu, 
  Database, 
  ChevronRight, 
  Smartphone,
  Award,
  Zap,
  Layout,
  CheckCircle2
} from 'lucide-react';

const Home: React.FC = () => {
  const scrollToHowItWorks = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('how-it-works');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-namdapha-primary/10 rounded-full blur-[100px] opacity-50 mix-blend-screen animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-namdapha-accent/10 rounded-full blur-[100px] opacity-30 mix-blend-screen"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 mb-6 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="flex h-2 w-2 rounded-full bg-namdapha-primary mr-2 animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-300 tracking-wide uppercase">Namdapha Tech Challenge • IITM BS</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.15]">
                <span className="block text-gray-400 text-2xl sm:text-3xl lg:text-4xl mb-2 font-medium">IITM BS Degree</span>
                CGPA Calculator & <br/>
                <span className="bg-gradient-to-r from-namdapha-primary via-namdapha-accent to-emerald-400 bg-clip-text text-transparent">Future Planner</span>
              </h1>

              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Calculate your current CGPA, predict ongoing semester results, and simulate future grades. 
                <span className="text-gray-300 font-medium"> Instant, private, and precise.</span>
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link 
                  to="/calculator"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] hover:bg-gray-50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Calculation <ChevronRight className="w-5 h-5" />
                </Link>
                <a 
                  href="#how-it-works"
                  onClick={scrollToHowItWorks}
                  className="w-full sm:w-auto px-8 py-4 bg-gray-800/40 text-gray-300 border border-gray-700/50 rounded-xl font-medium text-lg hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-300 text-center"
                >
                  How It Works
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-namdapha-primary" />
                    <span>Client-side only</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-namdapha-primary" />
                    <span>No backend</span>
                </div>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-namdapha-primary" />
                    <span>Accurate IITM grading</span>
                </div>
                <div className="flex items-center gap-2">
                    <Layout className="w-4 h-4 text-namdapha-primary" />
                    <span>Fully responsive</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="hidden lg:block relative group">
                {/* Abstract decorative elements behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-namdapha-primary/20 to-purple-500/20 rounded-full blur-[80px] -z-10"></div>
                
                {/* Main Card */}
                <div className="relative transform transition-all duration-700 hover:-translate-y-2">
                    <div className="bg-[#0f1623] border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
                        {/* Mockup Header */}
                        <div className="h-10 bg-[#161e2e] border-b border-gray-700/50 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        </div>
                        {/* Mockup Body */}
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="w-32 h-4 bg-gray-800 rounded animate-pulse mb-2"></div>
                                    <div className="w-24 h-3 bg-gray-800/50 rounded"></div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-namdapha-primary/10 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-namdapha-primary" />
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-namdapha-accent"></div>
                                        <div className="w-20 h-3 bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="w-8 h-6 bg-namdapha-primary/20 rounded text-xs flex items-center justify-center text-namdapha-primary font-bold">9.0</div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-namdapha-accent"></div>
                                        <div className="w-24 h-3 bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="w-8 h-6 bg-namdapha-primary/20 rounded text-xs flex items-center justify-center text-namdapha-primary font-bold">8.5</div>
                                </div>
                                 <div className="flex justify-between items-center p-3 bg-gray-800/30 rounded-lg border border-gray-800 opacity-60">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                        <div className="w-16 h-3 bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="w-8 h-6 bg-gray-700 rounded"></div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-800">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Predicted CGPA</div>
                                        <div className="text-3xl font-bold text-white">9.14</div>
                                    </div>
                                    <div className="w-24 h-8 bg-namdapha-primary rounded-lg opacity-80"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating Element */}
                    <div className="absolute -right-8 top-20 bg-gray-800/90 backdrop-blur-md p-4 rounded-xl border border-gray-700 shadow-xl animate-pulse">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Target className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Target Reached</div>
                                <div className="text-sm font-bold text-white">Goal: 9.0+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* SUPPORTED PROGRAMS */}
      <section className="py-20 bg-gray-900/30 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-10">Built for IITM BS Degree Programs</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:border-namdapha-primary/30 transition-colors">
                    <div className="p-3 bg-gray-700/50 rounded-xl"><Database className="w-6 h-6 text-namdapha-primary" /></div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-lg">BS in Data Science</h3>
                        <p className="text-sm text-gray-400">& Applications</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-gray-800/40 border border-gray-700/50 hover:border-namdapha-accent/30 transition-colors">
                    <div className="p-3 bg-gray-700/50 rounded-xl"><Cpu className="w-6 h-6 text-namdapha-accent" /></div>
                    <div className="text-left">
                        <h3 className="font-bold text-white text-lg">BS in Electronic Systems</h3>
                        <p className="text-sm text-gray-400">ES Degree</p>
                    </div>
                </div>
            </div>
            <p className="text-gray-500 max-w-2xl mx-auto">
                This calculator strictly follows official grading structures and credit-based CGPA formulas for both programs.
            </p>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Plan Your CGPA</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-namdapha-primary/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CalculatorIcon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Current CGPA</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Calculate your CGPA from completed subjects using accurate credit-weighted formulas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-namdapha-primary/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-namdapha-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5 text-namdapha-primary" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Prediction</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Add ongoing courses and expected grades to see your updated CGPA instantly.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-namdapha-primary/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Future Planner</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Simulate future semesters and experiment with grades before results arrive.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gray-900 border border-gray-800 hover:border-namdapha-primary/30 transition-all duration-300 group">
              <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Smartphone className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fully Responsive</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Works smoothly on mobile, tablet, and desktop with a clean dashboard layout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-gray-900/30 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-6">How Your CGPA Is Calculated</h2>
                    <p className="text-gray-400 mb-8 text-lg">
                        Your CGPA is computed using the standard credit-weighted formula:
                    </p>
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 font-mono text-center text-namdapha-primary text-lg mb-8">
                        CGPA = Total (Credits × Grade Points) ÷ Total Credits
                    </div>
                    <ul className="space-y-4 mb-8">
                        {[
                            "Enter completed subjects",
                            "Add ongoing courses",
                            "Add hypothetical future courses",
                            "Assign expected grades",
                            "Instantly see the CGPA change"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                <div className="w-6 h-6 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-bold text-namdapha-primary">
                                    {i + 1}
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                    <p className="text-sm font-medium text-gray-500 italic">
                        No hidden assumptions. No estimates. Only transparent calculations.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-namdapha-primary to-blue-600 opacity-20 blur-2xl rounded-full"></div>
                    <div className="relative bg-[#0a0f1a] border border-gray-800 rounded-2xl p-2 shadow-2xl">
                         {/* Abstract UI representation */}
                         <div className="bg-gray-900 rounded-xl p-6 space-y-4">
                            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                                <div className="w-32 h-4 bg-gray-800 rounded"></div>
                                <div className="w-16 h-8 bg-namdapha-primary/20 rounded text-namdapha-primary flex items-center justify-center font-bold text-xs">9.2 CGPA</div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                                    <div className="w-24 h-3 bg-gray-700 rounded"></div>
                                    <div className="w-8 h-3 bg-green-500/20 rounded"></div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                                    <div className="w-28 h-3 bg-gray-700 rounded"></div>
                                    <div className="w-8 h-3 bg-green-500/20 rounded"></div>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-namdapha-primary/30">
                                    <div className="w-20 h-3 bg-gray-700 rounded"></div>
                                    <div className="w-16 h-3 bg-namdapha-primary/20 rounded"></div>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* PRIVACY & RESPONSIVE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl border border-gray-700/50">
                    <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <ShieldCheck className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">100% Client-Side & Privacy-First</h3>
                    <ul className="space-y-3 text-gray-400 mb-6">
                        <li className="flex items-start gap-2"><span className="text-green-400 mt-1">•</span> No backend services</li>
                        <li className="flex items-start gap-2"><span className="text-green-400 mt-1">•</span> No APIs or databases</li>
                        <li className="flex items-start gap-2"><span className="text-green-400 mt-1">•</span> No login required</li>
                    </ul>
                    <p className="text-gray-300">
                        All calculations run locally in your browser. Perfect for quick planning without storing any data.
                    </p>
                </div>

                <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                        <Smartphone className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Designed for Every Screen</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                        Whether you’re checking on your phone, planning on a tablet, or analyzing on desktop — the interface adapts seamlessly with readable inputs and a sticky results panel for convenience.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* CHALLENGE ALIGNMENT */}
      <section className="py-16 bg-namdapha-primary/5 border-y border-namdapha-primary/10">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-namdapha-primary/10 rounded-full mb-6">
                <Award className="w-6 h-6 text-namdapha-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Built for the Namdapha Tech Challenge</h2>
            <p className="text-gray-400">
                Created to meet strict technical guidelines, focus on accuracy, and deliver a smooth student experience with clean UI and high-quality TypeScript architecture.
            </p>
        </div>
      </section>

      {/* FINAL CTA - Floating Card Design */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0f1a]">
        <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900/80 backdrop-blur-xl border border-gray-800 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-8 md:p-16 text-center isolate">
                
                {/* Subtle Grid Texture */}
                <div className="absolute inset-0 -z-10 opacity-[0.04] pointer-events-none select-none"
                    style={{
                        backgroundImage: `linear-gradient(#2dd4bf 1px, transparent 1px), linear-gradient(to right, #2dd4bf 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
                    }}
                ></div>

                {/* Subtle glow effect behind content */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_closest-side,rgba(45,212,191,0.08),transparent)] -z-10 pointer-events-none"></div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-6">
                    Start Planning Your CGPA Today.
                </h2>
                
                <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed">
                   Experience the simplest way to track your academic progress instantly.
                </p>
                
                <Link 
                  to="/calculator"
                  className="inline-block px-10 py-4 text-base font-bold text-gray-900 bg-namdapha-primary rounded-full shadow-[0_0_15px_rgba(45,212,191,0.2)] hover:shadow-[0_0_25px_rgba(45,212,191,0.4)] hover:bg-white hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-namdapha-primary"
                >
                  Start Calculation
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;