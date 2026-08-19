import React from 'react';
import {
  GraduationCap,
  Users,
  HeartHandshake,
  Bot,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Calendar,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export const HeroFeatureStrip: React.FC = () => {
  const features = [
    {
      number: '01',
      title: 'Smart Student Support',
      desc: 'Everything students need for continuous learning, homework, and day-to-day academic tracking.',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      bullets: [
        'Learning resources & notes',
        'Digital assignments submission',
        'Daily attendance tracking',
        'Real-time academic updates',
      ],
      linkHref: '#students',
    },
    {
      number: '02',
      title: 'Teacher Tools',
      desc: 'Powerful administrative & pedagogical toolkit to save hours on grading, attendance, and lesson plans.',
      icon: ClipboardList,
      color: 'from-blue-600 to-indigo-600',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      bullets: [
        'Class & section management',
        'One-tap biometric attendance',
        'Assignment distribution & grading',
        'Student performance analytics',
      ],
      linkHref: '#teachers',
    },
    {
      number: '03',
      title: 'Parent Connect',
      desc: 'Transparent real-time window for parents into their child’s school life, safety, and progress.',
      icon: HeartHandshake,
      color: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200',
      bullets: [
        'Instant attendance SMS/push',
        'Official school notices & circulars',
        'Academic progress & report cards',
        'Direct teacher communication',
      ],
      linkHref: '#parents',
    },
    {
      number: '04',
      title: 'AI School Assistant',
      desc: '24/7 intelligent copilot answering doubts, explaining timetables, bus routes, and admissions.',
      icon: Bot,
      color: 'from-purple-600 to-indigo-600',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200',
      bullets: [
        'Instant answers to student doubts',
        'Institutional school FAQs',
        'Personalized academic guidance',
        'Smart schedule notifications',
      ],
      linkHref: '#ai-assistant',
    },
  ];

  return (
    <section className="relative z-20 -mt-12 sm:-mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.number}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.14)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Card Header with Circular Icon & Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${item.iconBg} border flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 font-mono group-hover:text-[#F59E0B] transition-colors">
                    {item.number}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-[#0B2545] mb-2 group-hover:text-[#0F766E] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {item.desc}
                </p>

                {/* Bullets List */}
                <ul className="space-y-2 border-t border-slate-100 pt-3 mb-5">
                  {item.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Explore Link */}
              <a
                href={item.linkHref}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] hover:text-[#0B2545] pt-2 group-hover:translate-x-1 transition-all"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};
