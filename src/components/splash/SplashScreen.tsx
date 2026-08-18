import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { Sparkles, ShieldCheck, ArrowRight, BookOpen, Users, School } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
  minDurationMs?: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  minDurationMs = 2600,
}) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing SchoolSaathi AI Engine...');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText('Initializing SchoolSaathi AI Engine...');
      } else if (pct < 65) {
        setStatusText('Loading Role-Based Portals & Class Rosters...');
      } else if (pct < 90) {
        setStatusText('Securing Institutional RBAC & Audit Engine...');
      } else {
        setStatusText('Welcome to SchoolSaathi AI!');
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsClosing(true);
          setTimeout(onComplete, 400);
        }, 300);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-[#07132B] text-white p-6 transition-opacity duration-400 select-none ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Animated Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#0084FF]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00C2FF]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Top Bar */}
      <div className="w-full max-w-5xl flex items-center justify-between z-10">
        <div className="flex items-center gap-2 px-3 py-1 bg-[#0A1E4A] border border-[#143474] rounded-full text-xs font-semibold text-[#00C2FF]">
          <School className="w-3.5 h-3.5" />
          <span>Delhi Model Public School • Academic ERP</span>
        </div>

        <button
          onClick={handleSkip}
          className="text-xs font-bold text-slate-400 hover:text-white px-3 py-1.5 rounded-xl hover:bg-[#0A1E4A] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Skip Intro</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center Hero */}
      <div className="flex flex-col items-center justify-center text-center max-w-lg z-10 space-y-6">
        {/* Animated Logo Container with Glow Halo */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[#0084FF] to-[#00C2FF] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-500 animate-pulse" />
          <div className="relative bg-[#0A1E4A] p-6 rounded-3xl border border-[#143474] shadow-2xl">
            <Logo variant="icon" size="xl" />
          </div>
        </div>

        {/* Brand Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              School<span className="text-[#0084FF]">Saathi</span>
            </h1>
            <span className="text-sm px-2.5 py-1 bg-[#0084FF] text-white font-black rounded-xl tracking-wider shadow-md">
              AI
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
            <div className="h-[1px] w-8 bg-[#0084FF]" />
            <span>Your AI-Powered School Companion</span>
            <div className="h-[1px] w-8 bg-[#0084FF]" />
          </div>
        </div>

        {/* Feature Badges */}
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
          <span className="px-2.5 py-1 bg-[#0A1E4A] border border-[#143474] text-[#00C2FF] rounded-lg text-[10px] font-bold flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            Students
          </span>
          <span className="px-2.5 py-1 bg-[#0A1E4A] border border-[#143474] text-emerald-400 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Users className="w-3 h-3" />
            Parents
          </span>
          <span className="px-2.5 py-1 bg-[#0A1E4A] border border-[#143474] text-amber-400 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Teachers
          </span>
          <span className="px-2.5 py-1 bg-[#0A1E4A] border border-[#143474] text-purple-400 rounded-lg text-[10px] font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Principals
          </span>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-72 sm:w-80 space-y-2.5 pt-4">
          <div className="w-full bg-[#061330] h-2 rounded-full overflow-hidden p-0.5 border border-[#143474]">
            <div
              className="h-full bg-gradient-to-r from-[#00C2FF] via-[#0084FF] to-[#0052CC] rounded-full transition-all duration-100 ease-out shadow-xs shadow-[#0084FF]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400 font-medium animate-pulse">{statusText}</span>
            <span className="font-mono text-[#00C2FF] font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div className="w-full max-w-5xl flex items-center justify-between text-[11px] text-slate-500 z-10 border-t border-[#143474] pt-4">
        <span>SchoolSaathi AI Platform v2026.2</span>
        <span>CBSE & State Board Compliant ERP</span>
      </div>
    </div>
  );
};
