import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Phone,
  Mail,
  GraduationCap,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface CtaSectionProps {
  onOpenPortal: () => void;
  onOpenLiveDemo: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({
  onOpenPortal,
  onOpenLiveDemo,
}) => {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#08152B] text-white relative overflow-hidden">
      {/* Background Decorative Mesh & Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#0F2A52] via-[#0B2040] to-[#08152B] rounded-3xl p-8 sm:p-14 border border-slate-700/80 shadow-2xl text-center space-y-8 backdrop-blur-xl">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#F59E0B]" />
            <span>TRANSFORM YOUR CAMPUS TODAY</span>
          </div>

          {/* Display Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.14]">
            Make Your School Smarter With{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
              School Saathi
            </span>
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed">
            Bring your entire school community together with one intelligent platform. Empower teachers, engage parents, and inspire students with seamless digital education.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenPortal}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:brightness-110 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="tel:18001204455"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <Phone className="w-4 h-4 text-cyan-300" />
              <span>Contact Us (1800-120-4455)</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-slate-700/60 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Instant 1-Click Deployment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free Data Migration Support</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Dedicated 24/7 Account Manager</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
