import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Bell,
  MessageSquare,
  Bot,
  Play,
} from 'lucide-react';
import { WEBSITE_IMAGES } from '../websiteAssets';

interface HeroSectionProps {
  onOpenPortal: () => void;
  onOpenLiveDemo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPortal,
  onOpenLiveDemo,
}) => {
  return (
    <section id="home" className="relative min-h-[720px] lg:min-h-[780px] flex items-center bg-[#0B1736] overflow-hidden">
      {/* Grand Campus Photographic Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEBSITE_IMAGES.heroCampus}
          alt="School Saathi Institutional Campus"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom"
          referrerPolicy="no-referrer"
        />
        {/* Deep Neoclassical Navy Overlay for pristine contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1736]/95 via-[#0B1736]/85 to-[#0B1736]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1736] via-transparent to-black/30" />
        
        {/* Subtle Decorative Geometric Circles */}
        <div className="absolute top-12 right-12 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute top-24 right-24 w-72 h-72 rounded-full border border-blue-400/20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Institutional Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#00C2FF] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>Smart School AI Platform</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Your School.{' '}
              <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-[#00C2FF]">
                One Conversation Away.
              </span>
            </h1>

            {/* Supporting Positioning Paragraph */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
              School Saathi brings students, parents, teachers, and school management together through one intelligent AI-powered school companion. Access attendance, academics, timetables, and notices through natural human conversation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={() => {
                  const target = document.getElementById('overview');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#1557D6] hover:bg-[#0B45B5] active:bg-[#07328A] text-white font-bold text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-2px]"
              >
                <span>Explore School Saathi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-live-demo-btn"
                onClick={onOpenLiveDemo}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-semibold text-base rounded-xl transition-all flex items-center gap-2.5 cursor-pointer hover:translate-y-[-2px]"
              >
                <div className="w-7 h-7 rounded-full bg-[#00C2FF] text-[#0B1736] flex items-center justify-center font-bold">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>See AI In Action</span>
              </button>

              <button
                id="hero-open-portal-btn"
                onClick={onOpenPortal}
                className="px-5 py-3.5 text-slate-200 hover:text-white font-semibold text-sm underline underline-offset-4 decoration-[#00C2FF] cursor-pointer"
              >
                Launch Role Portals →
              </button>
            </div>

            {/* Trust Indicator Strip */}
            <div className="pt-4 flex items-center gap-3 text-xs text-slate-300 font-medium border-t border-white/10">
              <div className="flex -space-x-2">
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0B1736] object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Student"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0B1736] object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Teacher"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-[#0B1736] object-cover"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                  alt="Parent"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p>
                Built for <strong className="text-white">Students, Parents, Teachers & Principals</strong> across India
              </p>
            </div>
          </div>

          {/* Right Column: Floating AI Conversation Highlights */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Card 1: AI Greeting & Query */}
            <div className="bg-[#0B1736]/90 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-2xl text-slate-200 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1557D6] to-[#00C2FF] flex items-center justify-center text-white shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">SchoolSaathi AI</span>
                    <span className="text-[10px] text-[#00C2FF] font-semibold">Active Now</span>
                  </div>
                  <p className="mt-1 text-slate-300">
                    "Good morning Rahul! Your attendance this month is <strong className="text-[#00C2FF]">92.4%</strong>. You have Mathematics & Physics lab today."
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Parent Update Notification */}
            <div className="bg-[#0F224D]/90 backdrop-blur-md border border-sky-400/20 p-4 rounded-2xl shadow-2xl text-slate-200 transform transition-transform hover:scale-[1.02] sm:ml-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Parent Guardian Alert</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">08:05 AM</span>
                  </div>
                  <p className="mt-1 text-slate-300">
                    "Aarav checked into School Campus via RFID Gate 1. Verified present."
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Notice & Timetable Prompt */}
            <div className="bg-[#0B1736]/90 backdrop-blur-md border border-white/15 p-4 rounded-2xl shadow-2xl text-slate-200 transform transition-transform hover:scale-[1.02]">
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-white">3 New CBSE Circulars</p>
                    <p className="text-[11px] text-slate-400">Term 1 Assessment Schedule</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 bg-white/10 rounded-full text-[10px] font-bold text-white">
                  Read Circular
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
