import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  CheckCircle2,
  Calendar,
  Clock,
  ShieldCheck,
  Volume2,
  VolumeX,
  CornerDownLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  badge?: string;
  dataCard?: {
    type: 'attendance' | 'timetable' | 'events' | 'fees';
    title: string;
    details: string[];
    statusBadge?: string;
  };
}

export const AiAssistantSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: "What's my attendance this month?",
      timestamp: '09:42 AM',
    },
    {
      id: 'm2',
      sender: 'ai',
      text: 'Good morning Rahul! Your current Term 1 attendance is 92.4% (present 48 out of 52 working days). You are safely above the CBSE 75% minimum threshold.',
      timestamp: '09:42 AM',
      badge: 'Verified ERP Data',
      dataCard: {
        type: 'attendance',
        title: 'Attendance Telemetry (Rahul Sharma - 10A)',
        details: [
          'Present: 48 Days • Absent: 4 Days (Medical Leave Approved)',
          'Last Campus RFID Tap: Today 07:58 AM (Gate 2)',
          'Subject with highest attendance: Physics (96%)',
        ],
        statusBadge: 'Good Standing (92.4%)',
      },
    },
    {
      id: 'm3',
      sender: 'user',
      text: 'What are the upcoming school events?',
      timestamp: '09:43 AM',
    },
    {
      id: 'm4',
      sender: 'ai',
      text: 'Here are the official upcoming events from the Delhi Model Public School academic calendar:',
      timestamp: '09:43 AM',
      badge: 'Official Circular Sync',
      dataCard: {
        type: 'events',
        title: 'Academic & Sports Calendar 2026-27',
        details: [
          '🏆 Annual Inter-House Sports Meet: Nov 14 (Campus Ground)',
          '🔬 National Science Exhibition: Nov 22 (Auditorium)',
          '👨‍👩‍👧 Term 1 Parent-Teacher Meeting (PTM): Dec 02 (09:00 AM - 01:00 PM)',
        ],
        statusBadge: '3 Upcoming',
      },
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    "Check attendance",
    "Show today's timetable",
    "Upcoming school events",
    "Ask about assignments",
    "Fee receipt status",
  ];

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || inputQuery).trim();
    if (!q) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // AI Response Simulation with realistic context awareness
    setTimeout(() => {
      let aiText = "I have fetched the latest records from the SchoolSaathi ERP database for your profile.";
      let card: ChatMessage['dataCard'] = undefined;

      const lower = q.toLowerCase();
      if (lower.includes('timetable') || lower.includes('schedule') || lower.includes('class')) {
        aiText = "Here is your Class 10-A timetable for today (Tuesday):";
        card = {
          type: 'timetable',
          title: "Today's Schedule - Class 10-A",
          details: [
            '08:30 AM - 09:15 AM: Mathematics (Mr. Rajesh Rao - Room 204)',
            '09:15 AM - 10:00 AM: Physics Lab (Mr. Amit Kumar - Lab 2)',
            '10:15 AM - 11:00 AM: English Literature (Mrs. Meera Sen)',
            '11:00 AM - 11:45 AM: Computer Science / AI Lab',
          ],
          statusBadge: '4 Periods Remaining',
        };
      } else if (lower.includes('assignment') || lower.includes('homework')) {
        aiText = "You have 2 pending assignments due this week:";
        card = {
          type: 'events',
          title: 'Active Homework & Projects',
          details: [
            '📐 Mathematics: Quadratic Equations Problem Set 4.2 (Due Tomorrow)',
            '⚡ Physics: Ray Optics Laboratory Record Submission (Due Friday)',
          ],
          statusBadge: '2 Pending',
        };
      } else if (lower.includes('fee') || lower.includes('payment') || lower.includes('receipt')) {
        aiText = "Your academic tuition fees for Term 1 (2026-27) are completely settled:";
        card = {
          type: 'fees',
          title: 'Fee Ledger: Receipt #SS-2026-8821',
          details: [
            'Term 1 Tuition: ₹42,500 (Paid on 10 July via UPI)',
            'Laboratory & Library Fee: ₹6,000 (Cleared)',
            'Next Term Due: 15 October 2026',
          ],
          statusBadge: 'Paid in Full',
        };
      } else if (lower.includes('attendance')) {
        aiText = "Your overall attendance record stands at 92.4% across 52 instructional working days.";
        card = {
          type: 'attendance',
          title: 'Attendance Report (Rahul Sharma)',
          details: [
            'Present: 48 Days • Absent: 4 Days',
            'Minimum CBSE Requirement: 75%',
            'Attendance Status: Eligible for all Board Exams',
          ],
          statusBadge: '92.4% (Good Standing)',
        };
      } else {
        aiText = `Here is the authorized school information regarding "${q}": All academic circulars and departmental notifications are up to date in the SchoolSaathi portal.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        badge: 'Verified ERP Data',
        dataCard: card,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <section id="ai-assistant" className="py-20 lg:py-28 bg-[#F5F8FC] border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#1557D6]" />
            <span>Interactive Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Meet Your School's AI Assistant.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Experience human-like conversation connected in real-time to verified school ERP databases. Try sending a question below.
          </p>
        </div>

        {/* AI Chat Interface Mockup */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl border border-[#E5EAF2] overflow-hidden">
          {/* Chat Mockup Header */}
          <div className="bg-[#0B1736] p-4 sm:p-5 flex items-center justify-between text-white border-b border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1557D6] to-[#00C2FF] flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0B1736] rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">SchoolSaathi AI</h4>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                    Live ERP Connected
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Student Persona: Rahul Sharma (10-A) • Delhi Model Public School
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                  speechEnabled ? 'bg-[#1557D6] text-white' : 'bg-slate-800 text-slate-300 hover:text-white'
                }`}
                title={speechEnabled ? 'Voice feedback on' : 'Voice feedback off'}
              >
                {speechEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit Encrypted</span>
              </div>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 sm:p-6 space-y-4 max-h-[440px] overflow-y-auto bg-slate-50/50">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'}`}
                >
                  {isAi && (
                    <div className="w-8 h-8 rounded-lg bg-[#1557D6] flex items-center justify-center text-white shrink-0 shadow-xs mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                        isAi
                          ? 'bg-white text-[#172033] border border-slate-200 rounded-tl-sm'
                          : 'bg-[#1557D6] text-white rounded-tr-sm font-medium'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Structured Data Card if present */}
                      {msg.dataCard && (
                        <div className="mt-3 p-3 bg-[#F5F8FC] rounded-xl border border-[#E5EAF2] text-xs space-y-2">
                          <div className="flex items-center justify-between font-bold text-[#0B1736]">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1557D6]" />
                              {msg.dataCard.title}
                            </span>
                            {msg.dataCard.statusBadge && (
                              <span className="text-[10px] bg-blue-100 text-[#1557D6] px-2 py-0.5 rounded-full font-bold">
                                {msg.dataCard.statusBadge}
                              </span>
                            )}
                          </div>
                          <ul className="space-y-1 text-[#667085]">
                            {msg.dataCard.details.map((d, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-[#1557D6] font-bold">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className={`flex items-center gap-2 text-[10px] text-slate-400 ${isAi ? 'justify-start pl-1' : 'justify-end pr-1'}`}>
                      <span>{msg.timestamp}</span>
                      {msg.badge && (
                        <>
                          <span>•</span>
                          <span className="text-[#1557D6] font-semibold">{msg.badge}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {!isAi && (
                    <div className="w-8 h-8 rounded-lg bg-[#0B1736] flex items-center justify-center text-white shrink-0 shadow-xs mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1557D6] flex items-center justify-center text-white shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 p-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#1557D6] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#1557D6] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#1557D6] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-slate-500 font-medium ml-1.5">SchoolSaathi is querying ERP...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Query Chips */}
          <div className="px-4 py-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#1557D6]" />
              Try:
            </span>
            {samplePrompts.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="text-xs px-3 py-1.5 rounded-full bg-[#EEF5FF] text-[#1557D6] hover:bg-[#1557D6] hover:text-white font-medium transition-colors shrink-0 cursor-pointer border border-[#1557D6]/20"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Field Bar */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setIsListening(!isListening)}
                className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
                title={isListening ? 'Listening...' : 'Click to Speak'}
              >
                {isListening ? <Mic className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#1557D6]" />}
              </button>

              <input
                id="ai-assistant-input-box"
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? 'Listening... Speak your school question...' : 'Ask SchoolSaathi AI (e.g., "What is tomorrow\'s exam syllabus?")...'}
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#1557D6] focus:bg-white text-slate-800 placeholder-slate-400"
              />

              <button
                id="ai-assistant-send-btn"
                type="submit"
                disabled={!inputQuery.trim()}
                className="p-2.5 px-4 bg-[#1557D6] hover:bg-[#0B45B5] active:bg-[#0B1736] disabled:opacity-40 text-white rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
