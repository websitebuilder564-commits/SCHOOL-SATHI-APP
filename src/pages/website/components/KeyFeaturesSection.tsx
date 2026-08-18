import React, { useState } from 'react';
import {
  Sparkles,
  CalendarCheck,
  GraduationCap,
  BellRing,
  ShieldCheck,
  Search,
  BarChart3,
  BookOpen,
  Send,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const KeyFeaturesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'students' | 'parents' | 'teachers' | 'management'>('all');

  const features = [
    {
      id: 'ai-assistant',
      title: 'AI School Assistant',
      desc: 'Conversational assistant answering student and parent questions in plain language with zero wait times.',
      icon: <Sparkles className="w-5 h-5 text-[#1557D6]" />,
      categories: ['students', 'parents', 'teachers', 'management'],
      badge: 'Core Engine',
    },
    {
      id: 'attendance',
      title: 'Attendance Tracking',
      desc: 'Real-time telemetry tracking daily attendance, RFID gate taps, subject-wise statistics, and automated absentee alerts.',
      icon: <CalendarCheck className="w-5 h-5 text-[#1557D6]" />,
      categories: ['students', 'parents', 'teachers'],
      badge: 'Automated',
    },
    {
      id: 'academics',
      title: 'Academic Information',
      desc: 'Instant access to exam report cards, CBSE term marks, grade analytics, syllabus progress, and study aids.',
      icon: <GraduationCap className="w-5 h-5 text-[#1557D6]" />,
      categories: ['students', 'parents'],
      badge: 'CBSE / ICSE',
    },
    {
      id: 'smart-info',
      title: 'Smart School Information',
      desc: 'Query upcoming holidays, school fee schedules, cafeteria menus, examination dates, and bus routes.',
      icon: <Search className="w-5 h-5 text-[#1557D6]" />,
      categories: ['students', 'parents'],
      badge: 'Real-Time',
    },
    {
      id: 'role-access',
      title: 'Role-Based Access Control',
      desc: 'Strict isolation ensuring students only view their records, parents view their child, and faculty access authorized classes.',
      icon: <ShieldCheck className="w-5 h-5 text-[#1557D6]" />,
      categories: ['management', 'teachers'],
      badge: 'ISO Compliant',
    },
    {
      id: 'ai-search',
      title: 'Semantic School Search',
      desc: 'Discover circulars and policies by meaning rather than exact keywords (e.g., "when is winter break?").',
      icon: <Search className="w-5 h-5 text-[#1557D6]" />,
      categories: ['students', 'parents', 'teachers'],
      badge: 'Semantic NLP',
    },
    {
      id: 'notifications',
      title: 'Intelligent Notifications',
      desc: 'Multi-channel broadcast alerts for urgent school closures, fee dues, exam timetable releases, and parent meetings.',
      icon: <BellRing className="w-5 h-5 text-[#1557D6]" />,
      categories: ['parents', 'teachers', 'students'],
      badge: 'Multi-Channel',
    },
    {
      id: 'analytics',
      title: 'Executive Analytics',
      desc: 'Institutional dashboards for principals tracking school-wide attendance curves, fee collections, and faculty loads.',
      icon: <BarChart3 className="w-5 h-5 text-[#1557D6]" />,
      categories: ['management'],
      badge: 'Live BI',
    },
    {
      id: 'teacher-support',
      title: 'Teacher Support Suite',
      desc: '1-click classroom attendance, digital assignment submissions, student behavioral logs, and grading assistance.',
      icon: <BookOpen className="w-5 h-5 text-[#1557D6]" />,
      categories: ['teachers'],
      badge: 'Productivity',
    },
    {
      id: 'escalation',
      title: 'Secure Escalation Workflows',
      desc: 'Automated routing when AI detects sensitive, emotional, or administrative queries requiring human faculty review.',
      icon: <Send className="w-5 h-5 text-[#1557D6]" />,
      categories: ['teachers', 'management', 'parents'],
      badge: 'Human-in-the-Loop',
    },
  ];

  const filtered = features.filter((f) =>
    activeCategory === 'all' ? true : f.categories.includes(activeCategory)
  );

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#F5F8FC] border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Everything Your School Needs, Connected by AI.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Ten specialized modules integrated into one conversational core to automate school workflows and enrich learning.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Capabilities' },
              { id: 'students', label: 'For Students' },
              { id: 'parents', label: 'For Parents' },
              { id: 'teachers', label: 'For Teachers' },
              { id: 'management', label: 'For Principal & Admin' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#1557D6] text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5EAF2] hover:border-blue-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#EEF5FF] group-hover:bg-[#1557D6] text-[#1557D6] group-hover:text-white flex items-center justify-center transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-[#EEF5FF] group-hover:text-[#1557D6] transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#172033] group-hover:text-[#1557D6] transition-colors mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#667085] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#1557D6]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#1557D6]" />
                <span>Fully Operational</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
