import React from 'react';
import {
  FileQuestion,
  Clock,
  HelpCircle,
  Headphones,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const ProblemStatementSection: React.FC = () => {
  const problems = [
    {
      icon: <FileQuestion className="w-6 h-6 text-rose-500" />,
      title: 'Fragmented Information',
      problem: 'Students and parents often need to search through multiple disconnected portals, PDF circulars, WhatsApp groups, and paper notices.',
      solution: 'School Saathi consolidates all school data into one single conversational search bar.',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-500" />,
      title: 'Communication Gaps',
      problem: 'Important questions regarding fee deadlines, bus schedules, or exam timetables often require days of waiting for staff replies.',
      solution: 'Instant 24/7 AI answers with verified institutional ERP data synchronization.',
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-indigo-500" />,
      title: 'Limited Accessibility',
      problem: 'Complex ERP menus, desktop logins, and English-only forms create barriers for non-tech-savvy parents and multilingual families.',
      solution: 'Voice input and native conversational fluency across 11 Indian languages.',
    },
    {
      icon: <Headphones className="w-6 h-6 text-sky-500" />,
      title: 'Delayed Support & Burden',
      problem: 'Faculty and administrators waste hundreds of hours answering repetitive routine questions instead of focusing on teaching.',
      solution: 'Automates 90%+ routine FAQs and routes complex questions straight to authorized staff.',
    },
  ];

  return (
    <section id="problem-statement" className="py-20 lg:py-28 bg-[#EEF5FF]/60 border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1557D6] text-xs font-bold uppercase tracking-wider border border-[#1557D6]/20 shadow-xs">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>The Challenge We Solve</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            School Information Shouldn't Feel Complicated.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Traditional school management software is built for database administrators, not for everyday students and busy parents. School Saathi replaces complexity with conversation.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((item, idx) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E5EAF2] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                  {item.icon}
                </div>

                <h3 className="text-lg font-bold text-[#172033] mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs text-[#667085] leading-relaxed mb-4">
                  {item.problem}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="flex items-start gap-2 text-xs font-medium text-[#1557D6] bg-[#EEF5FF] p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#1557D6] shrink-0 mt-0.5" />
                  <span className="leading-snug">{item.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
