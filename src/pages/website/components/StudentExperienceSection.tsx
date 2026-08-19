import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Clock,
  CheckCircle2,
  Calendar,
  BookOpen,
  TrendingUp,
  Bot,
  Bell,
  ArrowRight,
  FileText,
  Award,
  Layers
} from 'lucide-react';

interface StudentExperienceProps {
  onOpenPortal: (role?: 'student') => void;
}

export const StudentExperienceSection: React.FC<StudentExperienceProps> = ({ onOpenPortal }) => {
  return (
    <section id="students" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
              <span>STUDENT EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
              An Empowering Digital Workspace for Every Student
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Designed specifically for Gen-Z learners. Students track schedules, submit homework directly from their phones or laptops, get AI study guidance, and prepare for board exams with structured materials.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              type="button"
              onClick={() => onOpenPortal('student')}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:brightness-105 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Launch Student Portal Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Laptop / Browser Mockup Container */}
        <div className="relative mx-auto max-w-5xl rounded-3xl bg-[#09152B] p-3 sm:p-5 shadow-2xl border border-slate-800">
          
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1 rounded-xl bg-slate-900/90 text-slate-400 text-xs font-mono border border-slate-800">
              <span className="text-emerald-400">https://</span>
              <span>schoolsaathi.in/portal/student/dashboard</span>
            </div>

            <div className="text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Connected
            </div>
          </div>

          {/* Student Dashboard Body Inside Mockup */}
          <div className="bg-[#0B1A35] rounded-2xl p-4 sm:p-6 text-white space-y-6">
            
            {/* Top Student Profile Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-blue-900/40 border border-emerald-600/30">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-base shadow">
                  AS
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Aarav Sharma
                    <span className="text-xs font-normal px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Roll #18 • Class 10-A
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Delhi Public School, R.K. Puram • CBSE Curriculum</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">TERM 1 GPA</div>
                  <div className="text-sm font-bold text-amber-400 font-mono">9.4 / 10</div>
                </div>
                <div className="bg-slate-900/70 px-3 py-1.5 rounded-xl border border-slate-700">
                  <div className="text-[10px] text-slate-400">OVERALL ATTENDANCE</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">96.8%</div>
                </div>
              </div>
            </div>

            {/* Main Grid: Today's Classes, Assignments, Exams & AI Tutor */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              
              {/* Left 7 Cols: Today's Classes & Pending Assignments */}
              <div className="md:col-span-7 space-y-4">
                
                {/* Today's Schedule Card */}
                <div className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      Today&apos;s Schedule (Wednesday)
                    </span>
                    <span className="text-slate-400 font-mono">Period 3 of 6</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-800/50 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-white">09:00 AM • Mathematics</div>
                        <div className="text-[11px] text-slate-400">Quadratic Equations • Room 204</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 text-[10px] font-bold">Completed</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-teal-950/70 border border-teal-500/60 flex items-center justify-between text-xs ring-1 ring-teal-500/30">
                      <div>
                        <div className="font-bold text-teal-200 flex items-center gap-1.5">
                          <span>10:30 AM • Physics</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                        </div>
                        <div className="text-[11px] text-slate-300">Electromagnetic Induction • Dr. Priya Verma</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-teal-500 text-slate-950 text-[10px] font-black uppercase">Live Now</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between text-xs opacity-75">
                      <div>
                        <div className="font-bold text-slate-300">11:45 AM • Computer Science</div>
                        <div className="text-[11px] text-slate-500">Python Data Structures • Lab 2</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px]">Upcoming</span>
                    </div>
                  </div>
                </div>

                {/* Active Assignments */}
                <div className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      Active Homework &amp; Assignments
                    </span>
                    <span className="text-amber-400 text-[11px]">2 Pending</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Physics Lab Report #3</div>
                        <div className="text-[11px] text-amber-300">Due Tomorrow • 11:59 PM</div>
                      </div>
                      <button type="button" className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-[10px]">
                        Submit PDF
                      </button>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">English Literature Essay</div>
                        <div className="text-[11px] text-slate-400">Due in 3 days • Shakesperean Sonnets</div>
                      </div>
                      <button type="button" className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-lg text-[10px]">
                        In Progress
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right 5 Cols: Upcoming Exams, Circulars & AI Tutor */}
              <div className="md:col-span-5 space-y-4">
                
                {/* Upcoming Exam Countdown Card */}
                <div className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span className="flex items-center gap-1.5 text-rose-400">
                      <Calendar className="w-4 h-4 text-rose-400" />
                      Next Examination
                    </span>
                    <span className="text-rose-400 font-mono text-[10px]">5 Days Left</span>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/40">
                    <div className="text-xs font-bold text-white">Mid-Term Science Exam</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Chapters 1 to 6 (Full Syllabus)</div>
                    <div className="mt-2 text-[10px] text-rose-300 flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      <span>Download Sample Question Paper &amp; Blueprints</span>
                    </div>
                  </div>
                </div>

                {/* AI Assistant Quick Launcher Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/80 via-purple-950/70 to-[#071329] border border-indigo-500/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">AI Study Tutor Active</h4>
                      <p className="text-[10px] text-indigo-300">Instant doubt solver &amp; formula lookup</p>
                    </div>
                  </div>

                  <div className="p-2.5 bg-black/40 rounded-xl border border-indigo-800/40 text-[11px] text-slate-300">
                    &ldquo;Ask me: &apos;Explain Newton&apos;s 2nd Law with numerical examples&apos;&rdquo;
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('ai-assistant');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow"
                  >
                    Open AI Tutor Dialog
                  </button>
                </div>

                {/* Recent School Notice */}
                <div className="p-3.5 rounded-2xl bg-[#071329] border border-slate-800 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-amber-400">
                    <Bell className="w-3.5 h-3.5" />
                    <span>Recent School Circular</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Annual Science Exhibition registration closes this Friday. Submit projects in Room 102.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
