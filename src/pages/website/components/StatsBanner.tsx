import React from 'react';
import {
  Globe2,
  CheckCircle,
  Users,
  MessageSquare,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      value: '11+',
      label: 'Regional Languages',
      desc: 'Multilingual Natural NLP',
      icon: <Globe2 className="w-6 h-6 text-[#1557D6]" />,
    },
    {
      value: '99.4%',
      label: 'Query Resolution',
      desc: 'Instant Zero-Wait AI Responses',
      icon: <CheckCircle className="w-6 h-6 text-[#20A66A]" />,
    },
    {
      value: '4 Portals',
      label: 'Role-Based Access',
      desc: 'Student, Parent, Teacher, Principal',
      icon: <Users className="w-6 h-6 text-[#1557D6]" />,
    },
    {
      value: '150k+',
      label: 'Queries Handled',
      desc: 'Attendance, Grades & Notices',
      icon: <MessageSquare className="w-6 h-6 text-[#1557D6]" />,
    },
  ];

  return (
    <div className="bg-[#F5F8FC] border-y border-[#E5EAF2] py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex items-center gap-4 ${
                idx !== 0 ? 'lg:border-l lg:border-slate-200 lg:pl-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#0B1736] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs font-bold text-[#172033] mt-0.5">{stat.label}</p>
                <p className="text-[11px] text-[#667085]">{stat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
