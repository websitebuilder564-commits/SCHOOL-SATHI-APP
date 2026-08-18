import React from 'react';
import {
  MessageSquareCode,
  Users2,
  Briefcase,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';

interface HeroFeatureStripProps {
  onSelectFeature?: (id: string) => void;
}

export const HeroFeatureStrip: React.FC<HeroFeatureStripProps> = ({ onSelectFeature }) => {
  const features = [
    {
      step: '01',
      title: 'AI School Assistant',
      desc: 'Ask school-related questions naturally through text or conversational voice.',
      icon: <MessageSquareCode className="w-5 h-5 text-[#1557D6]" />,
      targetId: 'ai-assistant',
    },
    {
      step: '02',
      title: 'Student & Parent Access',
      desc: 'Get live attendance, grades, homework, and fee receipts instantly without friction.',
      icon: <Users2 className="w-5 h-5 text-[#1557D6]" />,
      targetId: 'roles',
    },
    {
      step: '03',
      title: 'Teacher & Management Tools',
      desc: 'Support classroom workflows, 1-click attendance, and school-wide analytics.',
      icon: <Briefcase className="w-5 h-5 text-[#1557D6]" />,
      targetId: 'roles',
    },
    {
      step: '04',
      title: 'Secure & Private',
      desc: 'Role-based access control (RBAC) and DPDP Act compliance keeps data protected.',
      icon: <ShieldCheck className="w-5 h-5 text-[#1557D6]" />,
      targetId: 'security',
    },
  ];

  return (
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-14">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-[#E5EAF2] p-6 sm:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {features.map((feat, index) => (
            <div
              key={feat.step}
              className={`flex flex-col justify-between group cursor-pointer ${
                index !== 0 ? 'pt-5 md:pt-0 md:pl-6 lg:pl-8' : ''
              }`}
              onClick={() => {
                const el = document.getElementById(feat.targetId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-black tracking-widest text-[#1557D6] uppercase">
                    {feat.step}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#EEF5FF] flex items-center justify-center group-hover:bg-[#1557D6] group-hover:text-white transition-colors duration-300">
                    {feat.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#172033] group-hover:text-[#1557D6] transition-colors leading-snug">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#667085] mt-1.5 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#1557D6] opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Learn more</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
