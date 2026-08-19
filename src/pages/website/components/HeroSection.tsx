import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Bell,
  Clock,
  BookOpen,
  Bus,
  Bot,
  GraduationCap,
  Calendar,
  Users,
  ShieldCheck,
  TrendingUp
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
    <section
      id="home"
      aria-label="School Saathi Hero"
      className="relative min-h-[640px] sm:min-h-[720px] lg:min-h-[780px] bg-[#071326] text-white flex items-center overflow-hidden"
    >
      {/* Background Image with Dark Editorial Gradient Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src={WEBSITE_IMAGES.heroCampus}
          alt="Happy students collaborating on modern school campus"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-subtle-zoom opacity-45"
          loading="eager"
        />
        {/* Layered rich gradient overlay matching reference design */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071326]/95 via-[#0A1D3D]/85 to-[#071326]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071326] via-transparent to-transparent" />
        {/* Ambient glow mesh */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Small Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-amber-300 text-xs font-semibold tracking-wide shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
              <span>WELCOME TO SCHOOL SAATHI</span>
            </div>

            {/* Main Punchy Display Heading */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-white">
              A Smarter School Experience Starts With{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B]">
                School Saathi
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Connect students, parents, teachers and school administration through one intelligent digital platform.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={onOpenPortal}
                className="w-full sm:w-auto px-7 py-4 bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:brightness-110 text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 group"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenLiveDemo}
                className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-semibold text-sm sm:text-base rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:scale-105 active:scale-95 group"
              >
                <Play className="w-4 h-4 text-cyan-300 fill-cyan-300 group-hover:scale-110 transition-transform" />
                <span>Explore School Saathi</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>CBSE &amp; ICSE Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Installation Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>256-Bit Encrypted Data</span>
              </div>
            </div>
          </div>

          {/* Floating UI Elements & Mockup Visual (Right 5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Central Campus Emblem Card */}
            <div className="relative w-full max-w-md bg-gradient-to-b from-[#0F274E]/90 to-[#0A1B38]/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white">Live School Campus Hub</h2>
                    <p className="text-[11px] text-slate-400">Delhi Public School • Session 2026</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync
                </span>
              </div>

              {/* Floating Card 1: Student Attendance Gauge */}
              <div className="p-3.5 rounded-2xl bg-[#061226]/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Overall Attendance</div>
                    <div className="text-[11px] text-slate-400">Aarav Sharma • Class 10-A</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-400 font-mono">98.4%</span>
                  <div className="text-[10px] text-slate-400">Regular</div>
                </div>
              </div>

              {/* Floating Card 2: Upcoming Class */}
              <div className="p-3.5 rounded-2xl bg-[#061226]/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Upcoming Class: Physics</div>
                    <div className="text-[11px] text-slate-400">Room 302 • Dr. Priya Verma</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-cyan-300 bg-blue-950/60 px-2 py-1 rounded-lg border border-blue-800">
                  10:30 AM
                </span>
              </div>

              {/* Floating Card 3: Assignment Reminder */}
              <div className="p-3.5 rounded-2xl bg-[#061226]/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Calculus Problem Set #4</div>
                    <div className="text-[11px] text-amber-300">Due Tomorrow, 5:00 PM</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-400 bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-800">
                  Pending
                </span>
              </div>

              {/* Floating Card 4: Parent Bus GPS Notification */}
              <div className="p-3.5 rounded-2xl bg-[#061226]/80 border border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                    <Bus className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">Bus #04 • Sector 14 Gate</div>
                    <div className="text-[11px] text-slate-400">Driver: Rajesh Kumar (ETA 4m)</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-indigo-300 bg-indigo-950/60 px-2 py-1 rounded-lg border border-indigo-800">
                  On Route
                </span>
              </div>

              {/* Floating Card 5: AI Assistant Notification */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-950/70 via-blue-950/70 to-indigo-950/70 border border-teal-600/50 flex items-center gap-2.5">
                <Bot className="w-5 h-5 text-teal-300 shrink-0 animate-bounce" />
                <p className="text-[11px] text-teal-200">
                  <strong className="text-white">AI Tutor Ready:</strong> &ldquo;Ask me any science doubt or generate sample mock tests instantly!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
