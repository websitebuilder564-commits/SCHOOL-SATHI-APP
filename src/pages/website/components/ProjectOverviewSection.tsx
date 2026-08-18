import React from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { WEBSITE_IMAGES } from '../websiteAssets';

interface ProjectOverviewSectionProps {
  onOpenPortal: () => void;
}

export const ProjectOverviewSection: React.FC<ProjectOverviewSectionProps> = ({
  onOpenPortal,
}) => {
  const benefits = [
    {
      title: 'Simple Natural-Language Interaction',
      description: 'Ask questions in English or your native language. The assistant understands everyday phrasing and provides instant, verified school data.',
    },
    {
      title: 'Role-Based Access to Relevant Information',
      description: 'Students, parents, teachers, and principals only see the data they are authorized to access, ensuring institutional privacy.',
    },
    {
      title: 'Faster Communication Between School Stakeholders',
      description: 'Zero wait time for administrative circulars, grade inquiries, fee statuses, attendance confirmations, and teacher escalations.',
    },
  ];

  return (
    <section id="overview" className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Image Collage with Geometric Accents */}
          <div className="lg:col-span-6 relative">
            {/* Subtle decorative concentric vector curves behind images */}
            <div className="absolute -top-12 -left-12 w-80 h-80 rounded-full border border-blue-200/60 pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-96 h-96 rounded-full border border-emerald-200/50 pointer-events-none" />
            <div className="absolute -bottom-8 right-0 w-64 h-64 rounded-full border border-sky-100 pointer-events-none" />

            <div className="grid grid-cols-12 gap-4 relative z-10">
              {/* Main Primary Portrait Image: Students on campus */}
              <div className="col-span-7 row-span-2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={WEBSITE_IMAGES.studentsCampus}
                    alt="Students on modern school campus"
                    className="w-full h-[360px] sm:h-[420px] object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-slate-100 text-xs">
                    <p className="font-bold text-[#172033]">Campus Collaboration</p>
                    <p className="text-[11px] text-[#667085]">Smart AI assistance for 12,000+ pupils</p>
                  </div>
                </div>
              </div>

              {/* Top-Right Secondary Image: Student using tablet in library */}
              <div className="col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={WEBSITE_IMAGES.studentTablet}
                    alt="Student studying with tablet"
                    className="w-full h-[170px] sm:h-[195px] object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* Bottom-Right Tertiary Image: Modern school architecture */}
              <div className="col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={WEBSITE_IMAGES.modernBuilding}
                    alt="School Building Architecture"
                    className="w-full h-[170px] sm:h-[195px] object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-6 left-12 z-20 bg-[#1557D6] text-white p-4 rounded-2xl shadow-xl shadow-blue-600/30 flex items-center gap-3 border border-blue-400/30">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0 font-bold">
                <Sparkles className="w-5 h-5 text-[#00C2FF]" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">100% CBSE & Board Ready</p>
                <p className="text-[11px] text-blue-100">National Curriculum Standards</p>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional Overview Narrative */}
          <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>Project Overview</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172033] tracking-tight leading-[1.15]">
              One intelligent platform for the entire school community.
            </h2>

            <p className="text-base text-[#667085] leading-relaxed">
              School Saathi is designed as a human-like AI school assistant that bridges school administration, educators, pupils, and parents into a unified, secure conversational ecosystem. No more navigating convoluted portals or waiting on phone lines.
            </p>

            {/* Check-list Benefits */}
            <div className="space-y-4 pt-2">
              {benefits.map((b) => (
                <div key={b.title} className="flex items-start gap-3.5">
                  <div className="mt-1 w-5 h-5 rounded-full bg-[#EEF5FF] text-[#1557D6] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#1557D6]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#172033]">{b.title}</h4>
                    <p className="text-xs text-[#667085] mt-0.5 leading-normal">{b.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-4">
              <button
                id="overview-explore-btn"
                onClick={() => {
                  const target = document.getElementById('features');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#1557D6] hover:bg-[#0B45B5] active:bg-[#0B1736] text-white text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-1px]"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPortal}
                className="px-5 py-3 text-sm font-bold text-[#1557D6] hover:bg-[#EEF5FF] rounded-xl border border-[#1557D6]/20 transition-colors cursor-pointer"
              >
                Test Portal Sandbox
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
