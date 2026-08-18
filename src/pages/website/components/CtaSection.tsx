import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  GraduationCap,
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
    <section className="py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1557D6] via-[#0B45B5] to-[#0B1736] p-8 sm:p-12 lg:p-16 text-white overflow-hidden shadow-2xl">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 rounded-full bg-sky-400/15 blur-2xl pointer-events-none" />
          <div className="absolute top-1/2 right-12 w-64 h-64 border border-white/10 rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-[#00C2FF] text-xs font-bold uppercase tracking-wider border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transform Your Educational Institution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Your School. One Conversation Away.
            </h2>

            <p className="text-base sm:text-lg text-blue-100 font-normal leading-relaxed">
              Join thousands of students, parents, and educators experiencing effortless attendance tracking, academic telemetry, and AI-assisted campus communication.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                id="cta-launch-portals-btn"
                onClick={onOpenPortal}
                className="px-8 py-4 bg-white text-[#1557D6] hover:bg-blue-50 font-extrabold text-base rounded-2xl shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-2px]"
              >
                <span>Launch Role Portals</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                id="cta-interactive-demo-btn"
                onClick={onOpenLiveDemo}
                className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold text-base rounded-2xl transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-2px]"
              >
                <Sparkles className="w-4 h-4 text-[#00C2FF]" />
                <span>Try Interactive AI Demo</span>
              </button>
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-xs text-blue-200">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Instant Evaluation (No credit card or setup needed)</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#00C2FF]" />
                <span>Pre-configured with 4 Demo Roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
