import React, { useState, useEffect, useRef } from 'react';
import {
  Building2,
  Users,
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { WEBSITE_IMAGES } from '../websiteAssets';

export const StatisticsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: '500+',
      number: 500,
      suffix: '+',
      label: 'Partner Schools',
      desc: 'CBSE, ICSE & State Board affiliated campuses across 18 Indian states.',
      icon: Building2,
      iconBg: 'bg-amber-400 text-slate-900',
    },
    {
      value: '25K+',
      number: 25,
      suffix: 'K+',
      label: 'Active Students',
      desc: 'Daily active learners accessing study materials, homework, and live timetables.',
      icon: GraduationCap,
      iconBg: 'bg-cyan-400 text-slate-900',
    },
    {
      value: '2K+',
      number: 2,
      suffix: 'K+',
      label: 'Certified Teachers',
      desc: 'Empowering educators with automated attendance, exam grading, and lesson aids.',
      icon: Users,
      iconBg: 'bg-emerald-400 text-slate-900',
    },
    {
      value: '99%',
      number: 99,
      suffix: '%',
      label: 'Parent Satisfaction',
      desc: 'Rated 4.9/5 by school PTAs for safety alerts and live bus tracking.',
      icon: Award,
      iconBg: 'bg-rose-400 text-slate-900',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 bg-[#0A1E3F] text-white overflow-hidden"
    >
      {/* Background Photography with Teal/Navy Overlay (Reference Style) */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEBSITE_IMAGES.statsBackground}
          alt="Students in modern school building"
          className="w-full h-full object-cover object-center opacity-25 scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07132B]/95 via-[#0F395A]/90 to-[#07132B]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>MEASURABLE IMPACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Empowering India&apos;s School Ecosystem at Scale
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real metrics from hundreds of classrooms transitioning to intelligent digital management.
          </p>
        </div>

        {/* 4 Large Animated Stat Blocks (Matching Reference Card Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-3xl p-7 text-center backdrop-blur-md shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center group"
              >
                {/* Custom Icon Pod */}
                <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} flex items-center justify-center font-bold shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>

                {/* Animated Display Value */}
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight mb-2">
                  {stat.value}
                </div>

                {/* Label */}
                <div className="text-base font-bold text-amber-300 mb-2">
                  {stat.label}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
