import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  ExternalLink,
  ChevronDown,
  Minimize2,
  Maximize2,
  School,
  GraduationCap,
  Users,
  ShieldCheck,
  Zap,
  HelpCircle,
  Paperclip
} from 'lucide-react';

interface BotpressMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    action: string;
  };
}

interface BotpressChatbotProps {
  botId?: string;
  clientId?: string;
  onNavigatePortal?: (portal: 'student' | 'parent' | 'teacher' | 'principal') => void;
}

export const BotpressChatbot: React.FC<BotpressChatbotProps> = ({
  botId = import.meta.env.VITE_BOTPRESS_BOT_ID || 'school-saathi-bot',
  clientId = import.meta.env.VITE_BOTPRESS_CLIENT_ID || '',
  onNavigatePortal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scriptInjectedRef = useRef(false);

  // Initial welcome conversation
  const [messages, setMessages] = useState<BotpressMessage[]>([
    {
      id: 'msg-welcome-1',
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to Delhi Model Public School — SchoolSaathi AI Assistant powered by Botpress.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '🏫 Admission Process & Fees 2026-27',
        '🎒 CBSE Curriculum & Books',
        '🚌 Bus Transport Routes & GPS',
        '🔐 Login to Portals (Student/Parent/Teacher)'
      ]
    }
  ]);

  // Attempt to load official Botpress Cloud Webchat script if Client ID is configured
  useEffect(() => {
    if (clientId && !scriptInjectedRef.current) {
      scriptInjectedRef.current = true;
      const script = document.createElement('script');
      script.src = 'https://cdn.botpress.cloud/webchat/v2/inject.js';
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        if (window.botpressWebChat) {
          // @ts-ignore
          window.botpressWebChat.init({
            botId: botId,
            clientId: clientId,
            hostUrl: 'https://cdn.botpress.cloud/webchat/v2',
            messagingUrl: 'https://messaging.botpress.cloud',
            botName: 'SchoolSaathi Botpress AI',
            botAvatar: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=150',
            themeName: 'prism',
            themeColor: '#0084FF',
            hideWidget: true,
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [clientId, botId]);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle Text-to-Speech
  const speakText = (text: string) => {
    if (!isVoiceEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = 'en-IN';
    window.speechSynthesis.speak(utterance);
  };

  // Bot Knowledge Base Engine for instant, highly helpful responses
  const generateBotpressResponse = (userQuery: string): { text: string; suggestions?: string[]; actionLink?: { label: string; action: string } } => {
    const q = userQuery.toLowerCase();

    if (q.includes('admission') || q.includes('apply') || q.includes('enroll') || q.includes('eligibility')) {
      return {
        text: `📋 **Admissions for Academic Session 2026-27 are now OPEN!**\n\n- **Classes Available**: Pre-Nursery to Class 11 (Science, Commerce & Humanities)\n- **Eligibility**: Minimum age 3+ years for Nursery as of March 31, 2026.\n- **Registration Fee**: ₹500 (Online)\n- **Entrance Assessment**: Basic aptitude test for Classes 6th and above.\n\nWould you like to register or speak with an admissions officer?`,
        suggestions: ['Fee Structure Details', 'Download Prospectus PDF', 'Book Campus Visit'],
        actionLink: { label: 'Go to Admissions Portal', action: 'parent' }
      };
    }

    if (q.includes('fee') || q.includes('tuition') || q.includes('cost') || q.includes('payment')) {
      return {
        text: `💳 **Fee Structure (Term-Wise):**\n\n- **Primary (Class 1-5)**: ₹14,500 / quarter\n- **Middle (Class 6-8)**: ₹18,000 / quarter\n- **Secondary (Class 9-10)**: ₹21,500 / quarter\n- **Senior Secondary (Class 11-12)**: ₹26,000 / quarter\n\n*Quarterly dues are payable via UPI, Net Banking, or Parent Portal before the 10th of every quarter.*`,
        suggestions: ['Parent Portal Fee Login', 'Scholarship Programs', 'Transport Charges']
      };
    }

    if (q.includes('bus') || q.includes('transport') || q.includes('route') || q.includes('gps')) {
      return {
        text: `🚌 **Safe Transport & Live GPS Telemetry:**\n\n- 32 GPS-enabled AC school buses covering 18 designated routes in NCR.\n- Speed governors (<40 km/h), CCTV cameras, and female attendants in every bus.\n- Parents receive real-time location alerts and 10-min proximity SMS warnings.`,
        suggestions: ['Track My Bus (Parent Login)', 'View NCR Bus Routes', 'Transport Fee Details'],
        actionLink: { label: 'Open Parent Bus GPS', action: 'parent' }
      };
    }

    if (q.includes('curriculum') || q.includes('cbse') || q.includes('syllabus') || q.includes('subject')) {
      return {
        text: `📚 **CBSE Affiliated Academic Framework:**\n\n- Affiliation Number: **CBSE-AFF/2026/89124**\n- NCERT curriculum with NEP 2020 experiential learning modules.\n- Integrated AI & Coding labs, Robotics tinkering, Atal Tinkering Lab (ATL).\n- 100% board pass record with 42% students securing >90% aggregate.`,
        suggestions: ['Class 10 Syllabus', 'Class 12 Stream Options', 'Sample Papers']
      };
    }

    if (q.includes('login') || q.includes('portal') || q.includes('student') || q.includes('parent') || q.includes('teacher') || q.includes('principal')) {
      return {
        text: `🔐 **SchoolSaathi Portals Quick Access:**\n\nChoose your institutional role to enter the secure portal:\n\n1. **Student Portal**: AI tutor, class timetable, homework & CBSE results.\n2. **Parent Portal**: Attendance logs, fee payment, report cards & GPS bus tracker.\n3. **Teacher Portal**: Marksheet uploads, live attendance & digital circulars.\n4. **Principal / Admin**: Institutional analytics, CBSE compliance & audit logs.`,
        suggestions: ['Enter Student Portal', 'Enter Parent Portal', 'Enter Teacher Portal', 'Enter Principal Portal']
      };
    }

    if (q.includes('timing') || q.includes('hours') || q.includes('time') || q.includes('holiday')) {
      return {
        text: `⏰ **School Timings & Working Hours:**\n\n- **Summer Timings**: 7:30 AM – 1:45 PM (Monday to Friday)\n- **Winter Timings**: 8:00 AM – 2:15 PM\n- **Office & Visitor Hours**: 8:30 AM – 3:30 PM (Working Saturdays 9:00 AM – 1:00 PM)\n- **Emergency Helpline**: +91 (011) 2891-4400`,
        suggestions: ['Upcoming School Holidays', 'Principal Meeting Timings', 'Contact School Office']
      };
    }

    if (q.includes('contact') || q.includes('phone') || q.includes('email') || q.includes('address') || q.includes('location')) {
      return {
        text: `📍 **Delhi Model Public School:**\n\n- **Address**: Sector 14, Institutional Area, Rohini, New Delhi - 110085\n- **Phone**: +91 (011) 2891-4400 / +91 98765 43210\n- **Email**: info@delhimodelpublicschool.edu.in\n- **Principal Email**: principal@dmps.edu.in`,
        suggestions: ['Book Campus Visit', 'Admission Helpline', 'Google Maps Location']
      };
    }

    // Default intelligent Botpress response
    return {
      text: `🤖 I'm your SchoolSaathi Botpress AI Assistant! I can help you with:\n\n- **Admissions & Fee Schedule** (2026-27 session)\n- **Curriculum, Syllabus & Exams** (CBSE board guidelines)\n- **Real-time Bus Tracking & Routes**\n- **Direct Portal Access** for Students, Parents, Teachers & Principal\n\nWhat would you like to explore?`,
      suggestions: [
        '🏫 Admission Guidelines',
        '💳 Fee Structure',
        '🔐 Login to Student/Parent Portal',
        '📞 School Contact Info'
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: BotpressMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate Botpress AI processing latency
    setTimeout(() => {
      const botReply = generateBotpressResponse(query);
      const newBotMessage: BotpressMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: botReply.suggestions,
        actionLink: botReply.actionLink,
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
      speakText(botReply.text);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes('Student Portal') && onNavigatePortal) {
      onNavigatePortal('student');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Parent Portal') && onNavigatePortal) {
      onNavigatePortal('parent');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Teacher Portal') && onNavigatePortal) {
      onNavigatePortal('teacher');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Principal Portal') && onNavigatePortal) {
      onNavigatePortal('principal');
      setIsOpen(false);
      return;
    }
    handleSendMessage(suggestion);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'bot',
        text: 'Chat history cleared. How can Botpress AI assist you with SchoolSaathi today? 🎓',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          '🏫 Admissions & Eligibility',
          '💳 Fee Structure',
          '🚌 Bus Routes & GPS',
          '🔐 Sign in to Portal'
        ]
      }
    ]);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[#061330]/95 backdrop-blur-md text-white px-3.5 py-2 rounded-2xl border border-[#143474] shadow-xl text-xs animate-bounce shadow-[#0084FF]/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
            <span className="font-semibold text-slate-200">Botpress AI Online</span>
            <span className="text-slate-400">• Ask anything</span>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            aria-label="Open Botpress AI Chatbot"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#0060DF] via-[#0084FF] to-[#00C2FF] text-white shadow-2xl shadow-[#0084FF]/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/20"
          >
            <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-[#061330]">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Floating Chat Modal Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-[#07132B] border border-[#143474] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-xl ${
            isExpanded
              ? 'inset-4 sm:inset-10 max-w-5xl mx-auto'
              : 'bottom-6 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[410px] h-[600px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-[#061330] via-[#0A1E4A] to-[#061330] border-b border-[#143474] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0084FF] to-[#00C2FF] flex items-center justify-center text-white shadow-md shadow-[#0084FF]/30">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#061330] rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    SchoolSaathi AI
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#0084FF]/20 text-[#00C2FF] rounded border border-[#0084FF]/30 font-medium">
                    Botpress
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live Intelligent Campus Helpdesk
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                title={isVoiceEnabled ? 'Mute AI Voice' : 'Enable AI Voice'}
                className={`p-2 rounded-xl hover:bg-[#143474] transition-colors cursor-pointer ${
                  isVoiceEnabled ? 'text-[#00C2FF] bg-[#0A1E4A]' : 'text-slate-400'
                }`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Conversation"
                className="p-2 rounded-xl hover:bg-[#143474] hover:text-white transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Minimize Window' : 'Expand Window'}
                className="p-2 rounded-xl hover:bg-[#143474] hover:text-white transition-colors cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsIsOpenFalse()}
                title="Close Chat"
                className="p-2 rounded-xl hover:bg-rose-950/60 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Portal Switcher Bar */}
          <div className="px-3 py-2 bg-[#061330] border-b border-[#143474]/70 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto gap-2">
            <span className="shrink-0 font-medium text-slate-300">Quick Portals:</span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => onNavigatePortal && onNavigatePortal('student')}
                className="px-2 py-0.5 bg-[#0A1E4A] hover:bg-[#143474] text-[#00C2FF] rounded-lg border border-[#143474] transition-colors cursor-pointer font-medium"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal && onNavigatePortal('parent')}
                className="px-2 py-0.5 bg-[#0A2E2A] hover:bg-emerald-950 text-emerald-300 rounded-lg border border-emerald-800/40 transition-colors cursor-pointer font-medium"
              >
                Parent
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal && onNavigatePortal('teacher')}
                className="px-2 py-0.5 bg-[#2E200A] hover:bg-amber-950 text-amber-300 rounded-lg border border-amber-800/40 transition-colors cursor-pointer font-medium"
              >
                Teacher
              </button>
              <button
                type="button"
                onClick={() => onNavigatePortal && onNavigatePortal('principal')}
                className="px-2 py-0.5 bg-[#250A2E] hover:bg-purple-950 text-purple-300 rounded-lg border border-purple-800/40 transition-colors cursor-pointer font-medium"
              >
                Principal
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#07132B] to-[#040D1F]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-[#0084FF] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-md shadow-[#0084FF]/20">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-[#0084FF] text-white rounded-tr-none'
                      : 'bg-[#0A1E4A] text-slate-200 border border-[#143474] rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal space-y-1">
                    {msg.text}
                  </div>

                  {msg.actionLink && onNavigatePortal && (
                    <div className="mt-2 pt-2 border-t border-[#143474]">
                      <button
                        type="button"
                        onClick={() => {
                          onNavigatePortal(msg.actionLink?.action as any);
                          setIsOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0084FF] hover:bg-[#0070DB] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#143474]/80 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSuggestionClick(sugg)}
                          className="px-2.5 py-1 bg-[#061330] hover:bg-[#143474] text-[#00C2FF] hover:text-white rounded-xl text-[11px] font-medium border border-[#143474] transition-all cursor-pointer text-left"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[10px] mt-1.5 flex items-center justify-end gap-1 ${
                      msg.sender === 'user' ? 'text-blue-200' : 'text-slate-500'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-xl bg-[#0084FF] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-[#0A1E4A] border border-[#143474] px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce" />
                  <span className="text-[11px] text-slate-400 ml-1.5">Botpress AI is thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-[#061330] border-t border-[#143474] shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Botpress AI about admissions, syllabus, fees, GPS..."
                className="w-full pl-4 pr-12 py-3 bg-[#07132B] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-2xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="absolute right-2 p-2 bg-[#0084FF] hover:bg-[#0070DB] disabled:opacity-40 disabled:hover:bg-[#0084FF] text-white rounded-xl transition-all cursor-pointer"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#00C2FF]" />
                Powered by Botpress Conversational Engine
              </span>
              <span>CBSE Compliant AI</span>
            </div>
          </div>
        </div>
      )}
    </>
  );

  function setIsIsOpenFalse() {
    setIsOpen(false);
  }
};
