import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MessageSquare,
  Clock,
  BookOpen,
  Calendar,
  Bell,
  Cpu,
  Zap,
  Globe,
  Lock
} from 'lucide-react';

export const AiAssistantSection: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('What is tomorrow’s timetable?');
  const [activeResponse, setActiveResponse] = useState<{
    query: string;
    answer: string;
    details: string[];
  }>({
    query: 'What is tomorrow’s timetable?',
    answer: 'Here is your confirmed schedule for tomorrow (Thursday, Class 10-A):',
    details: [
      '08:30 AM - 09:15 AM: Mathematics (Room 204 • Mr. Alok Verma)',
      '09:15 AM - 10:00 AM: English Literature (Room 204 • Mrs. Shweta Roy)',
      '10:00 AM - 10:30 AM: Morning Assembly & Recess',
      '10:30 AM - 11:15 AM: Physics Practical (Physics Lab • Dr. Priya Verma)',
      '11:15 AM - 12:00 PM: Chemistry (Room 204 • Dr. R.K. Mishra)',
      '12:00 PM - 12:45 PM: Computer Science Python (Lab 2)'
    ]
  });

  const promptExamples = [
    {
      label: 'What is tomorrow’s timetable?',
      answer: 'Here is your confirmed schedule for tomorrow (Thursday, Class 10-A):',
      details: [
        '08:30 AM - 09:15 AM: Mathematics (Room 204 • Mr. Alok Verma)',
        '09:15 AM - 10:00 AM: English Literature (Room 204 • Mrs. Shweta Roy)',
        '10:00 AM - 10:30 AM: Morning Assembly & Recess',
        '10:30 AM - 11:15 AM: Physics Practical (Physics Lab • Dr. Priya Verma)',
        '11:15 AM - 12:00 PM: Chemistry (Room 204 • Dr. R.K. Mishra)',
        '12:00 PM - 12:45 PM: Computer Science Python (Lab 2)'
      ]
    },
    {
      label: 'Show my upcoming assignments.',
      answer: 'You have 2 pending assignments and 1 submitted review:',
      details: [
        '1. Physics Lab Report #3 (Due Tomorrow, 11:59 PM) - Status: Pending Submission',
        '2. English Literature Essay (Due in 3 Days) - Status: In Progress',
        '3. Calculus Problem Set #2 - Status: Graded (9.5/10 - Excellent work!)'
      ]
    },
    {
      label: 'When is the next exam?',
      answer: 'Here are your upcoming Term-1 Examination dates:',
      details: [
        'Mid-Term Science Exam: Next Monday, 09:00 AM (Room 302)',
        'Mathematics Paper 1: Next Wednesday, 09:00 AM (Room 302)',
        'Social Studies: Next Friday, 09:00 AM (Auditorium Hall)',
        'Admit cards are digitally verified and available for download in your portal.'
      ]
    },
    {
      label: 'What are today’s school notices?',
      answer: 'Active official school circulars released by the Principal’s Office:',
      details: [
        'Circular #DPS-912: Annual Science & Robotics Exhibition registration closing this Friday.',
        'Circular #DPS-913: Special bus route adjustments for Route 4 due to metro construction.',
        'Circular #DPS-914: Winter uniform transition effective from the 1st of next month.'
      ]
    }
  ];

  const handleSelectPrompt = (item: typeof promptExamples[0]) => {
    setSelectedPrompt(item.label);
    setActiveResponse({
      query: item.label,
      answer: item.answer,
      details: item.details
    });
  };

  const handleTriggerFloatingAi = () => {
    const launcher = document.querySelector('aside button[aria-label="Open 24/7 SchoolSaathi AI Assistant"]') as HTMLButtonElement | null;
    if (launcher) {
      launcher.click();
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <section id="ai-assistant" className="py-20 sm:py-28 bg-[#071124] text-white relative overflow-hidden">
      {/* Glowing Mesh Gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>INTELLIGENT CAMPUS COPILOT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Meet Your Smart School Assistant
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Get instant answers about school information, schedules, assignments, notices and more. Powered by n8n automated AI workflows with CBSE/ICSE curriculum alignment.
          </p>
        </div>

        {/* Interactive Chatbot Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          
          {/* Left 5 Cols: Clickable Question Prompts */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select an Example Question to Test:
            </h3>

            <div className="space-y-3">
              {promptExamples.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPrompt(item)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm font-semibold group ${
                    selectedPrompt === item.label
                      ? 'bg-gradient-to-r from-blue-900/70 to-indigo-900/70 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-[#0B1A35]/80 hover:bg-[#0E2142] border-slate-800 text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <MessageSquare className={`w-4 h-4 ${selectedPrompt === item.label ? 'text-cyan-400' : 'text-slate-500'}`} />
                    {item.label}
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform ${selectedPrompt === item.label ? 'translate-x-1 text-cyan-400' : 'text-slate-600'}`} />
                </button>
              ))}
            </div>

            <div className="pt-3">
              <button
                type="button"
                onClick={handleTriggerFloatingAi}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold text-sm rounded-2xl shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-102 active:scale-98"
              >
                <Bot className="w-5 h-5" />
                <span>Try AI Assistant Live</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Chatbot Screen Window */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#09152B] p-5 shadow-2xl border border-slate-700/80 space-y-4">
              
              {/* Chat Window Top Bar */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 text-slate-950 font-bold flex items-center justify-center shadow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">SchoolSaathi AI Assistant</h4>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active • Integrated with n8n Automation Engine
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  Model: Smart Education AI
                </span>
              </div>

              {/* Chat Stream Body */}
              <div className="space-y-3.5 min-h-[260px] flex flex-col justify-end">
                {/* User Message Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 text-xs sm:text-sm font-medium shadow">
                    {activeResponse.query}
                  </div>
                </div>

                {/* AI Assistant Message Bubble */}
                <div className="flex justify-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>

                  <div className="max-w-[90%] rounded-2xl rounded-tl-sm bg-[#0C1B38] border border-slate-800 text-slate-200 p-4 text-xs sm:text-[13px] space-y-2 shadow-inner">
                    <p className="font-semibold text-white">{activeResponse.answer}</p>

                    <div className="space-y-1.5 pt-1 text-slate-300 text-xs">
                      {activeResponse.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between border-t border-slate-800">
                      <span>Verified against School ERP database</span>
                      <span className="text-cyan-400 font-mono">Latency: 28ms</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock Input Bar */}
              <div className="p-2.5 rounded-2xl bg-[#060D1E] border border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Ask anything about school schedules, fees, bus routes, or syllabus...</span>
                <button
                  type="button"
                  onClick={handleTriggerFloatingAi}
                  className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
