import React from 'react';
import {
  Users,
  CheckSquare,
  BookOpen,
  TrendingUp,
  Calendar,
  Bell,
  ArrowRight,
  ClipboardList,
  Sparkles,
  BarChart3,
  Award,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface TeacherExperienceProps {
  onOpenPortal: (role?: 'teacher') => void;
}

export const TeacherExperienceSection: React.FC<TeacherExperienceProps> = ({ onOpenPortal }) => {
  return (
    <section id="teachers" className="py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>TEACHER EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
              Streamlined Tools Built to Reduce Teacher Workload
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Eliminate hours of manual paperwork. Teachers take biometric or one-tap attendance, distribute digital homework with automated grading rubrics, track class analytics, and communicate with parents securely.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              type="button"
              onClick={() => onOpenPortal('teacher')}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-700 hover:brightness-105 text-white font-bold text-sm rounded-2xl shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Launch Teacher Portal Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teacher Dashboard UI Card Mockup */}
        <div className="relative mx-auto max-w-5xl rounded-3xl bg-[#09152B] p-3 sm:p-5 shadow-2xl border border-slate-800">
          
          {/* Top Browser Window Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>

            <div className="flex items-center gap-2 px-4 py-1 rounded-xl bg-slate-900/90 text-slate-400 text-xs font-mono border border-slate-800">
              <span className="text-blue-400">https://</span>
              <span>schoolsaathi.in/portal/teacher/overview</span>
            </div>

            <div className="text-[11px] font-medium text-blue-400 flex items-center gap-1.5">
              <span>Class 10-A • Physics &amp; Chemistry</span>
            </div>
          </div>

          {/* Teacher Dashboard Body */}
          <div className="bg-[#0B1A35] rounded-2xl p-4 sm:p-6 text-white space-y-6">
            
            {/* Top Teacher Status Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900/50 border border-blue-600/30">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-base shadow">
                  PV
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    Dr. Priya Verma
                    <span className="text-xs font-normal px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      Senior Physics Faculty • Class Teacher 10-A
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">Department of Science • 4 Assigned Periods Today</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow">
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Mark Class Attendance</span>
                </button>
              </div>
            </div>

            {/* Main 3-Column Metrics & Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: My Classes Today */}
              <div className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1.5 text-blue-300">
                    <Clock className="w-4 h-4 text-blue-400" />
                    My Classes Today
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">Active</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-700/50 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Class 10-A • Physics</div>
                      <div className="text-[11px] text-slate-400">10:30 AM - 11:15 AM (Room 302)</div>
                    </div>
                    <span className="text-[10px] bg-blue-500 text-black font-bold px-2 py-0.5 rounded">Current</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-200">Class 11-B • Advanced Optics</div>
                      <div className="text-[11px] text-slate-400">01:30 PM - 02:15 PM (Physics Lab)</div>
                    </div>
                    <span className="text-[10px] text-slate-400">Upcoming</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Assignment Review & Grading */}
              <div className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    Pending Submissions
                  </span>
                  <span className="text-amber-400 text-[10px]">36/40 Submissions</span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="text-white">Optics Problem Set #2</span>
                      <span className="text-amber-400 font-mono text-[11px]">4 To Grade</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full w-[90%]" />
                    </div>
                  </div>

                  <button type="button" className="w-full py-1.5 bg-[#0C2448] hover:bg-blue-900/60 text-cyan-300 rounded-xl text-xs font-bold transition-all">
                    + Create New Assignment
                  </button>
                </div>
              </div>

              {/* Card 3: Class Performance Analytics */}
              <div className="p-4 rounded-2xl bg-[#071329] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                    Class 10-A Analytics
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px]">Avg: 88.5%</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Attendance Rate</span>
                    <span className="font-bold text-emerald-400">97.2%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>HW Completion Rate</span>
                    <span className="font-bold text-cyan-400">94.8%</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Students Requiring Help</span>
                    <span className="font-bold text-amber-400">3 Students</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
