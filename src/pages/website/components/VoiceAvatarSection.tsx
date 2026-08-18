import React, { useState } from 'react';
import {
  Mic,
  Volume2,
  Sparkles,
  Zap,
  Radio,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  Headphones,
} from 'lucide-react';

interface VoiceAvatarSectionProps {
  onExperienceAi: () => void;
}

export const VoiceAvatarSection: React.FC<VoiceAvatarSectionProps> = ({
  onExperienceAi,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeVoicePrompt, setActiveVoicePrompt] = useState(
    '“Namaste! Rahul has 92.4% attendance and no pending fees for Term 1.”'
  );

  const voiceDemos = [
    {
      title: 'Attendance Inquiry',
      prompt: '“Aarav arrived safely at School Campus at 07:58 AM through Gate 1.”',
      lang: 'English / Hinglish',
    },
    {
      title: 'Hindi Speech (हिन्दी)',
      prompt: '“नमस्ते! कल विद्यालय में विज्ञान प्रदर्शनी सुबह 9 बजे से शुरू होगी।”',
      lang: 'Hindi Voice',
    },
    {
      title: 'Exam Schedule Alert',
      prompt: '“Physics Term 1 practical examinations will take place this Thursday in Lab 2.”',
      lang: 'Bilingual',
    },
  ];

  return (
    <section id="voice-avatar" className="py-20 lg:py-28 bg-[#0B1736] text-white overflow-hidden relative">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#00C2FF]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Abstract Voice Avatar & Waveform Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Outer Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-400/20 animate-spin [animation-duration:20s]" />
              <div className="absolute inset-4 rounded-full border border-[#00C2FF]/30 border-dashed animate-spin [animation-duration:15s] [animation-direction:reverse]" />
              <div className="absolute inset-10 rounded-full border border-white/10" />

              {/* Central Glowing AI Avatar Sphere */}
              <div className="relative w-44 h-44 rounded-full bg-gradient-to-tr from-[#1557D6] via-[#0084FF] to-[#00C2FF] flex flex-col items-center justify-center p-4 shadow-2xl shadow-cyan-500/30">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                  <Mic className="w-8 h-8 text-white animate-pulse" />
                </div>
                <span className="text-xs font-black tracking-wider uppercase text-white">
                  Saathi Voice
                </span>
                <span className="text-[10px] text-blue-100 font-medium">
                  {isPlayingAudio ? 'Speaking...' : 'Ready to Listen'}
                </span>
              </div>
            </div>

            {/* Dynamic Animated Audio Waveform Bar */}
            <div className="w-full max-w-sm mt-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 h-10">
                {[12, 28, 44, 18, 52, 34, 48, 22, 60, 38, 24, 50, 30, 46, 16, 32, 54, 20].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isPlayingAudio ? `${h}px` : '8px' }}
                    className="w-1 bg-gradient-to-t from-[#1557D6] to-[#00C2FF] rounded-full transition-all duration-200"
                  />
                ))}
              </div>

              <p className="text-xs text-slate-300 italic min-h-[36px] flex items-center justify-center">
                {activeVoicePrompt}
              </p>

              {/* Toggle Audio Playback Simulation */}
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1557D6] hover:bg-[#0B45B5] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-500/25 cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlayingAudio ? 'Pause Voice Simulation' : 'Play Voice Response Sample'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Voice Engine Positioning & Features */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#00C2FF] text-xs font-bold uppercase tracking-wider border border-white/15">
              <Headphones className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>Voice-First Accessibility</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Talk to Your School.{' '}
              <span className="text-[#00C2FF]">Naturally.</span>
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              School Saathi supports conversational voice interaction so students, parents, and teachers can simply speak their questions instead of navigating complex menus or typing on small mobile keyboards.
            </p>

            {/* Key Capabilities Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {[
                { title: 'Hands-Free Voice Query', desc: 'Ask about attendance, homework, and fee dues on the go.' },
                { title: 'Neural Speech Synthesis', desc: 'Warm, natural-sounding voice replies in regional accents.' },
                { title: 'Multilingual Voice Recognition', desc: 'Speaks and comprehends Hindi, English, and regional dialects.' },
                { title: 'Accessible for Non-Tech Parents', desc: 'No computer literacy required—just press and speak.' },
              ].map((item) => (
                <div key={item.title} className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#00C2FF] shrink-0" />
                    <span>{item.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 pl-6 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Voice Prompt Switcher */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                Select a Voice Sample to Preview:
              </p>
              <div className="flex flex-wrap gap-2">
                {voiceDemos.map((demo) => (
                  <button
                    key={demo.title}
                    onClick={() => {
                      setActiveVoicePrompt(demo.prompt);
                      setIsPlayingAudio(true);
                    }}
                    className={`text-xs px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                      activeVoicePrompt === demo.prompt
                        ? 'bg-[#1557D6] border-[#00C2FF] text-white font-bold'
                        : 'bg-white/5 border-white/15 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <span>{demo.title}</span>
                    <span className="ml-1.5 text-[10px] opacity-70">({demo.lang})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onExperienceAi}
                className="px-6 py-3 bg-[#1557D6] hover:bg-[#0B45B5] text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Experience the AI Assistant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
