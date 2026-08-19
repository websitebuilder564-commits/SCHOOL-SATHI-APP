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
  Minimize2,
  Maximize2,
  HelpCircle,
  Bug,
  CheckCircle2,
  Sliders,
  Radio,
  Workflow,
  Cpu,
  Zap,
  Network
} from 'lucide-react';
import { n8nChatService } from '../../services/n8nChatService';

export interface N8nMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    action: string;
  };
  isTicket?: boolean;
  ticketId?: string;
}

interface N8nChatbotProps {
  onNavigatePortal?: (portal: 'student' | 'parent' | 'teacher' | 'principal') => void;
  onNavigateLogin?: () => void;
  onNavigateWebsite?: () => void;
  onNavigateSelection?: () => void;
}

export const N8nChatbot: React.FC<N8nChatbotProps> = ({
  onNavigatePortal,
  onNavigateLogin,
  onNavigateWebsite,
  onNavigateSelection,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [inputText, setInputText] = useState('');
  const [unreadCount, setUnreadCount] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  
  // n8n Config state
  const config = n8nChatService.getConfig();
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [bearerToken, setBearerToken] = useState(config.bearerToken || '');
  const [workflowName, setWorkflowName] = useState(config.workflowName || 'SchoolSaathi AI Agent Workflow');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mount animation trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 250);
    return () => clearTimeout(timer);
  }, []);

  // Welcome conversation
  const [messages, setMessages] = useState<N8nMessage[]>([
    {
      id: 'msg-welcome-1',
      sender: 'bot',
      text: 'Namaste! 🙏 Welcome to the **SchoolSaathi 24/7 WebChat Helpdesk** connected with **n8n AI Workflow**.\n\nI am here to solve any **doubts, technical issues, portal questions, or problems** you are experiencing on the site.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '❓ How do I log in to my portal?',
        '🐛 Having an issue / Error on site',
        '🚌 Where is live Bus GPS?',
        '💳 Fee receipt & payment help',
        '🤖 How to use AI Study Tutor?'
      ]
    }
  ]);

  // Auto scroll to bottom
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

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMessage: N8nMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Connect to n8n AI Chat Service
      const response = await n8nChatService.sendMessage(query);
      
      if (response.success && response.text) {
        const isTicket = response.text.includes('Ticket') || response.text.includes('TKT-');
        const match = response.text.match(/Ticket ID\*?:\s*`?([A-Z0-9-]+)`?/i);
        const ticketId = match ? match[1] : undefined;

        const newBotMessage: N8nMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: response.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: response.suggestions,
          actionLink: response.actionLink,
          isTicket,
          ticketId,
        };

        setMessages((prev) => [...prev, newBotMessage]);
        speakText(response.text);
      }
    } catch {
      // Fallback
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (action: string) => {
    if (action === 'student' && onNavigatePortal) onNavigatePortal('student');
    else if (action === 'parent' && onNavigatePortal) onNavigatePortal('parent');
    else if (action === 'teacher' && onNavigatePortal) onNavigatePortal('teacher');
    else if (action === 'principal' && onNavigatePortal) onNavigatePortal('principal');
    else if (action === 'login' && onNavigateLogin) onNavigateLogin();
    else if (action === 'website' && onNavigateWebsite) onNavigateWebsite();
    else if (action === 'selection' && onNavigateSelection) onNavigateSelection();
    setIsOpen(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.includes('Login Page') && onNavigateLogin) {
      onNavigateLogin();
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Student') && onNavigatePortal) {
      onNavigatePortal('student');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Parent') && onNavigatePortal) {
      onNavigatePortal('parent');
      setIsOpen(false);
      return;
    }
    if (suggestion.includes('Website') && onNavigateWebsite) {
      onNavigateWebsite();
      setIsOpen(false);
      return;
    }
    handleSendMessage(suggestion);
  };

  const handleResetChat = () => {
    n8nChatService.resetSession();
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'bot',
        text: 'Session reset. n8n AI workflow connection active. How can I assist you right now? 🎓',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          '🔐 Help with Login',
          '🐛 Report a Site Problem',
          '🚌 Bus GPS & Transport',
          '💳 Fee Receipts & Payment'
        ]
      }
    ]);
  };

  const handleSaveSettings = () => {
    n8nChatService.updateConfig({
      webhookUrl: webhookUrl.trim(),
      bearerToken: bearerToken.trim(),
      workflowName: workflowName.trim() || 'SchoolSaathi AI Agent Workflow',
    });
    setShowSettings(false);
    handleResetChat();
  };

  return (
    <>
      {/* 1. Global Floating Help Launcher with Smooth Entry Animation */}
      {!isOpen && (
        <aside 
          aria-label="SchoolSaathi Help & AI WebChat"
          className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-2.5 drop-shadow-2xl transition-all duration-500 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'
          }`}
        >
          {/* Pulsing Helper Tooltip Banner */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#061330]/95 hover:bg-[#0A1E4A] border border-[#143474] text-white shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer group hover:scale-[1.02]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00C2FF]" />
            </span>
            <div className="text-left">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent font-semibold tracking-wide">Hi! I am School Saathi AI</span>
                <Sparkles className="w-3.5 h-3.5 text-[#00C2FF] animate-pulse shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400">Ask doubts, site issues &amp; help</p>
            </div>
          </button>

          {/* Core Floating Orb Button */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            aria-label="Open 24/7 n8n WebChat Helpdesk & Issue Support"
            className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#EA4C89] via-[#FF5F56] to-[#FF8A00] text-white shadow-2xl shadow-[#FF5F56]/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/30"
          >
            <Network className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white rounded-full text-[10px] font-extrabold flex items-center justify-center border-2 border-[#061330] shadow">
                {unreadCount}
              </span>
            )}
          </button>
        </aside>
      )}

      {/* 2. Floating n8n WebChat Help Window with Smooth Slide/Scale Transition */}
      {isOpen && (
        <section
          aria-label="SchoolSaathi 24/7 n8n WebChat Assistant"
          className={`fixed z-[9999] flex flex-col bg-[#07132B] border border-[#143474] shadow-2xl rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ease-out transform origin-bottom-right ${
            isExpanded
              ? 'inset-3 sm:inset-8 max-w-5xl mx-auto'
              : 'bottom-4 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[430px] h-[630px] max-h-[88vh]'
          }`}
        >
          {/* Header */}
          <header className="px-4 py-3.5 bg-gradient-to-r from-[#061330] via-[#0A1E4A] to-[#061330] border-b border-[#143474] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#EA4C89] via-[#FF5F56] to-[#FF8A00] flex items-center justify-center text-white shadow-md shadow-[#FF5F56]/30">
                  <Workflow className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#061330] rounded-full" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    SchoolSaathi WebChat
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#FF5F56]/20 text-[#FF8A00] rounded border border-[#FF5F56]/30 font-medium">
                    n8n AI Workflow
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  n8n AI Agent Active • 24/7
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 text-slate-400">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                title="n8n Webhook Settings"
                className={`p-2 rounded-xl hover:bg-[#143474] transition-colors cursor-pointer ${
                  showSettings ? 'text-[#FF8A00] bg-[#0A1E4A]' : 'text-slate-400'
                }`}
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                title={isVoiceEnabled ? 'Mute AI Speech' : 'Enable AI Speech'}
                className={`p-2 rounded-xl hover:bg-[#143474] transition-colors cursor-pointer ${
                  isVoiceEnabled ? 'text-[#00C2FF] bg-[#0A1E4A]' : 'text-slate-400'
                }`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleResetChat}
                title="Reset Session"
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
                onClick={() => setIsOpen(false)}
                title="Close WebChat"
                className="p-2 rounded-xl hover:bg-rose-950/60 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* n8n Webhook Configuration Drawer */}
          {showSettings && (
            <div className="px-4 py-3.5 bg-[#061330] border-b border-[#143474] text-xs text-slate-300 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5 text-[#FF8A00]">
                  <Workflow className="w-3.5 h-3.5" />
                  n8n Webhook &amp; AI Agent Configuration
                </span>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block font-medium">n8n Webhook URL (POST):</label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-n8n.cloud/webhook/... or leave blank for local fallback"
                  className="w-full px-3 py-2 bg-[#07132B] border border-[#143474] rounded-xl text-white text-xs outline-none focus:border-[#FF5F56] placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block font-medium">Authorization Bearer Token (Optional):</label>
                <input
                  type="password"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  placeholder="Optional token for authenticated n8n webhooks"
                  className="w-full px-3 py-2 bg-[#07132B] border border-[#143474] rounded-xl text-white text-xs outline-none focus:border-[#FF5F56] placeholder:text-slate-600"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  n8n Ready
                </span>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#FF5F56] to-[#FF8A00] hover:brightness-110 text-white rounded-xl font-bold text-xs cursor-pointer shadow"
                >
                  Save &amp; Connect n8n
                </button>
              </div>
            </div>
          )}

          {/* Universal Quick Action Topic Pills */}
          <nav aria-label="Topic categories" className="px-3 py-2 bg-[#061330] border-b border-[#143474]/70 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto gap-2">
            <span className="shrink-0 font-medium text-slate-300 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-[#FF8A00]" />
              Quick Help:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleSendMessage('I have a problem with logging into the portal')}
                className="px-2 py-0.5 bg-[#0A1E4A] hover:bg-[#143474] text-[#00C2FF] rounded-lg border border-[#143474] transition-colors cursor-pointer font-medium"
              >
                Login Issues
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Where can I track my child live bus GPS?')}
                className="px-2 py-0.5 bg-[#0A2E2A] hover:bg-emerald-950 text-emerald-300 rounded-lg border border-emerald-800/40 transition-colors cursor-pointer font-medium"
              >
                Bus GPS
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('How do I download fee receipts or pay dues?')}
                className="px-2 py-0.5 bg-[#2E200A] hover:bg-amber-950 text-amber-300 rounded-lg border border-amber-800/40 transition-colors cursor-pointer font-medium"
              >
                Fee Receipt
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('I found a bug or error on the site. Please help.')}
                className="px-2 py-0.5 bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 rounded-lg border border-rose-800/50 transition-colors cursor-pointer font-medium flex items-center gap-1"
              >
                <Bug className="w-3 h-3 text-rose-400" />
                Report Bug
              </button>
            </div>
          </nav>

          {/* Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#07132B] to-[#040D1F]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FF5F56] to-[#FF8A00] text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-md shadow-[#FF5F56]/20">
                    <Workflow className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#0084FF] to-[#00A3FF] text-white rounded-tr-none'
                      : 'bg-[#0A1E4A] text-slate-200 border border-[#143474] rounded-tl-none'
                  }`}
                >
                  <div className="whitespace-pre-line font-normal space-y-1">
                    {msg.text}
                  </div>

                  {/* Generated Ticket Badge */}
                  {msg.isTicket && msg.ticketId && (
                    <div className="mt-2.5 p-2 bg-emerald-950/60 border border-emerald-700/60 rounded-xl flex items-center justify-between text-xs text-emerald-300">
                      <div className="flex items-center gap-1.5 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Ticket #{msg.ticketId} Created via n8n</span>
                      </div>
                      <span className="text-[10px] bg-emerald-900/80 px-2 py-0.5 rounded text-emerald-200">
                        Priority: High
                      </span>
                    </div>
                  )}

                  {/* Direct Action Link */}
                  {msg.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-[#143474]">
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.actionLink?.action || 'selection')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0084FF] hover:bg-[#0070DB] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Interactive Quick Suggestions */}
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
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FF5F56] to-[#FF8A00] text-white flex items-center justify-center shrink-0">
                  <Workflow className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-[#0A1E4A] border border-[#143474] px-4 py-2.5 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#FF5F56] rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-[#00C2FF] rounded-full animate-bounce" />
                  <span className="text-[11px] text-slate-400 ml-1.5">n8n AI Agent is processing your request...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <footer className="p-3 bg-[#061330] border-t border-[#143474] shrink-0">
            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask n8n AI any doubt, feature question, or site problem..."
                className="w-full pl-4 pr-12 py-3 bg-[#07132B] border border-[#143474] focus:border-[#FF5F56] focus:ring-2 focus:ring-[#FF5F56]/20 rounded-2xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="absolute right-2 p-2 bg-gradient-to-r from-[#FF5F56] to-[#FF8A00] hover:brightness-110 disabled:opacity-40 text-white rounded-xl transition-all cursor-pointer"
                title="Send to n8n AI Agent"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2 text-[10px] text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FF8A00]" />
                Powered by n8n Workflow Automation &amp; AI Agents
              </span>
              <span>24/7 Real-Time</span>
            </div>
          </footer>
        </section>
      )}
    </>
  );
};
