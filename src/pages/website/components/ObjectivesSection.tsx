import React from 'react';
import { Target, Sparkles, ArrowRight } from 'lucide-react';

export const ObjectivesSection: React.FC = () => {
  const objectives = [
    {
      num: '01',
      title: 'Simplify Access',
      subtitle: 'Natural Language Discovery',
      description: 'Make all school information—from attendance and homework to CBSE circulars—instantly available through natural conversational questions.',
    },
    {
      num: '02',
      title: 'Connect Stakeholders',
      subtitle: 'Unified Ecosystem',
      description: 'Create a shared intelligent communication layer that seamlessly links students, parents, faculty, and administrative leadership.',
    },
    {
      num: '03',
      title: 'Improve Accessibility',
      subtitle: 'Voice & Multilingual AI',
      description: 'Break technical and linguistic barriers with intuitive voice interaction and deep support across 11 Indian regional languages.',
    },
    {
      num: '04',
      title: 'Strengthen School Operations',
      subtitle: 'Audited Automation',
      description: 'Deliver actionable school-wide analytics, reduce administrative query workload, and provide transparent human escalation paths.',
    },
  ];

  return (
    <section id="objectives" className="py-20 lg:py-28 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5" />
            <span>Our Objective</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Make school interaction as simple as having a conversation.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Four guiding architectural pillars engineered to transform institutional learning and campus administration.
          </p>
        </div>

        {/* 4 Numbered Objectives Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {objectives.map((obj) => (
            <div
              key={obj.num}
              className="relative p-7 rounded-2xl bg-[#F5F8FC] border border-[#E5EAF2] hover:bg-white hover:shadow-xl hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Top Accent Line */}
              <div className="w-10 h-1 bg-[#1557D6] rounded-full mb-6 group-hover:w-16 transition-all duration-300" />

              <div>
                <span className="text-4xl font-black text-[#1557D6]/30 group-hover:text-[#1557D6] transition-colors font-mono">
                  {obj.num}
                </span>

                <h3 className="text-xl font-bold text-[#172033] mt-2 group-hover:text-[#1557D6] transition-colors">
                  {obj.title}
                </h3>

                <p className="text-xs font-semibold text-[#1557D6] mb-3">
                  {obj.subtitle}
                </p>

                <p className="text-xs text-[#667085] leading-relaxed">
                  {obj.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-[#1557D6]">
                <span>Phase Verified</span>
                <Sparkles className="w-3.5 h-3.5 text-[#1557D6]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
