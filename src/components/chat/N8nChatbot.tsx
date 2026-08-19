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
  AlertCircle,
  AlertTriangle,
  Sliders,
  Radio,
  Workflow,
  Cpu,
  Zap,
  Network,
  Activity,
  Check,
  Copy,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  GraduationCap,
  Bus,
  CreditCard,
  KeyRound,
  Info,
  Clock,
  ArrowRight,
  Headphones
} from 'lucide-react';
import { n8nChatService, N8nConnectionStatus } from '../../services/n8nChatService';
import { supabase } from '../../lib/supabase';
import { authService } from '../../services/authService';

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
  liked?: boolean | null;
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
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // n8n Config & Connection Diagnostics State
  const config = n8nChatService.getConfig();
  const [webhookUrl, setWebhookUrl] = useState(config.webhookUrl || '');
  const [bearerToken, setBearerToken] = useState(config.bearerToken || '');
  const [workflowName, setWorkflowName] = useState(config.workflowName || 'SchoolSaathi AI Agent Workflow');
  const [connectionStatus, setConnectionStatus] = useState<N8nConnectionStatus | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mount animation trigger & run initial connection probe
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 200);

    // Probe n8n connection
    n8nChatService.testConnection().then((status) => {
      setConnectionStatus(status);
    });

    return () => clearTimeout(timer);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Welcome conversation
  const [messages, setMessages] = useState<N8nMessage[]>([
    {
      id: 'msg-welcome-1',
      sender: 'bot',
      text: 'Hello & Welcome! 👋 I am the **SchoolSaathi AI Assistant**, integrated with **n8n Automation & Smart Knowledge Workflows**.\n\nI can help you navigate student/parent portals, check fee receipts, track live school buses, answer syllabus queries, or raise technical support tickets.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        '🔐 How do I log in to my portal?',
        '🚌 Where is live Bus GPS?',
        '💳 Fee receipt & dues payment',
        '🤖 How to use AI Study Tutor?',
        '🐞 Report a technical site issue'
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

  const handleTestConnection = async () => {
    setIsTestingConnection(true);
    n8nChatService.updateConfig({
      webhookUrl: webhookUrl.trim(),
      bearerToken: bearerToken.trim(),
      workflowName: workflowName.trim() || 'SchoolSaathi AI Agent Workflow',
    });

    const result = await n8nChatService.testConnection();
    setConnectionStatus(result);
    setIsTestingConnection(false);
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
      // 1. Retrieve active Supabase session if authenticated
      let supabaseSession: { access_token?: string; user?: { id?: string; email?: string } } | undefined;
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          supabaseSession = data.session;
        } else {
          const localUser = authService.getCurrentUser();
          if (localUser) {
            supabaseSession = {
              user: {
                id: localUser.id,
                email: localUser.email,
              }
            };
          }
        }
      } catch {
        // Fallback to guest
      }

      // 2. Connect to n8n AI Chat Service
      const response = await n8nChatService.sendMessage(query, { session: supabaseSession });
      
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
      } else {
        const errorMessage: N8nMessage = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: "Sorry, I couldn't reach School Saathi right now. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch {
      const errorMessage: N8nMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: "Sorry, I couldn't reach School Saathi right now. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
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

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLikeMessage = (id: string, liked: boolean) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, liked: msg.liked === liked ? null : liked } : msg))
    );
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
        text: 'Session refreshed! Connected to **SchoolSaathi AI & n8n Workflows**. How can I help you today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          '🔐 Help with Portal Login',
          '🚌 Bus GPS & Driver Telemetry',
          '💳 Fee Receipts & Payment Plans',
          '🐞 Report Site Bug / Error'
        ]
      }
    ]);
  };

  const handleSaveSettings = async () => {
    n8nChatService.updateConfig({
      webhookUrl: webhookUrl.trim(),
      bearerToken: bearerToken.trim(),
      workflowName: workflowName.trim() || 'SchoolSaathi AI Agent Workflow',
    });
    const result = await n8nChatService.testConnection();
    setConnectionStatus(result);
    setShowSettings(false);
    handleResetChat();
  };

  // Helper to render markdown-like formatting cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, idx) => {
      // Heading level
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-xs font-bold text-white mt-2 mb-1 flex items-center gap-1.5 text-cyan-300">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="text-sm font-bold text-white mt-2.5 mb-1.5 text-cyan-200">
            {line.replace('## ', '')}
          </h3>
        );
      }
      if (line.startsWith('# ')) {
        return (
          <h2 key={idx} className="text-sm font-extrabold text-white mt-3 mb-1.5 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-blue-300">
            {line.replace('# ', '')}
          </h2>
        );
      }

      // Bullet points
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().substring(2);
        return (
          <div key={idx} className="flex items-start gap-2 py-0.5 text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
            <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(itemText) }} />
          </div>
        );
      }

      // Numbered lists
      const numberMatch = line.match(/^(\d+)\.\s(.*)/);
      if (numberMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 py-0.5 text-slate-200">
            <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 rounded px-1 shrink-0 mt-0.5">
              {numberMatch[1]}
            </span>
            <span dangerouslySetInnerHTML={{ __html: formatBoldAndCode(numberMatch[2]) }} />
          </div>
        );
      }

      // Empty line spacing
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }

      // Normal text
      return (
        <p key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: formatBoldAndCode(line) }} />
      );
    });
  };

  const formatBoldAndCode = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#0D1E42] border border-[#1E3A8A] font-mono text-[11px] text-cyan-300">$1</code>');
  };

  return (
    <>
      {/* 1. Global Floating Help Launcher - Premium Glass Capsule */}
      {!isOpen && (
        <aside 
          aria-label="SchoolSaathi Help & AI WebChat"
          className={`fixed bottom-5 right-5 z-[9999] flex items-center gap-3 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out transform ${
            isMounted ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-90 pointer-events-none'
          }`}
        >
          {/* Interactive Popover Teaser Pill */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            className="hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0A1326]/90 hover:bg-[#0E1B38] border border-slate-700/80 hover:border-cyan-500/50 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 cursor-pointer group hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Live pulsing glowing beacon */}
            <div className="relative flex items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 ${
                connectionStatus?.connected ? 'bg-emerald-400' : 'bg-cyan-400'
              }`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                connectionStatus?.connected ? 'bg-emerald-400' : 'bg-cyan-400'
              }`} />
            </div>

            <div className="text-left pr-1">
              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                <span className="tracking-wide">Need help? Ask School Saathi AI</span>
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300 shrink-0" />
              </div>
              <p className="text-[10px] text-slate-400 flex items-center gap-1.5 font-normal">
                <span>Portals, fees, transport &amp; doubt solver</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="text-cyan-400 font-medium">24/7 Live</span>
              </p>
            </div>

            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:bg-cyan-500 group-hover:text-black transition-all">
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Primary Floating Glowing Avatar Orb */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setUnreadCount(0);
            }}
            aria-label="Open 24/7 SchoolSaathi AI Assistant"
            className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white shadow-[0_0_35px_rgba(59,130,246,0.5)] hover:shadow-[0_0_45px_rgba(6,182,212,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/30"
          >
            {/* Outer subtle glow ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-30 blur-sm group-hover:opacity-75 transition-opacity" />
            
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
            </div>

            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-[10px] font-black flex items-center justify-center border-2 border-[#0B1120] shadow-lg animate-bounce">
                {unreadCount}
              </span>
            )}
          </button>
        </aside>
      )}

      {/* 2. Floating High-End Enterprise Chat Window */}
      {isOpen && (
        <section
          aria-label="SchoolSaathi AI Assistant"
          className={`fixed z-[9999] flex flex-col bg-[#080E1E]/95 border border-slate-700/70 shadow-[0_30px_90px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden backdrop-blur-2xl transition-all duration-300 ease-out transform origin-bottom-right ${
            isExpanded
              ? 'inset-3 sm:inset-6 max-w-5xl mx-auto'
              : 'bottom-4 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-1.5rem)] sm:w-[440px] h-[650px] max-h-[90vh]'
          }`}
        >
          {/* Top Premium Glass Header */}
          <header className="px-4 py-3.5 bg-gradient-to-r from-[#0B152B] via-[#0E1F42] to-[#0B152B] border-b border-slate-800/80 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-white/20">
                  <Bot className="w-5 h-5" />
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 border-2 border-[#080E1E] rounded-full ${
                  connectionStatus?.connected ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-cyan-400'
                }`} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    School Saathi AI
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-500/10 text-cyan-300 rounded-full border border-blue-400/30 font-medium">
                    v2.5 Enterprise
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    connectionStatus?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'
                  }`} />
                  {connectionStatus?.connected ? (
                    <span className="text-emerald-400 font-medium">n8n Connected ({connectionStatus.latencyMs}ms)</span>
                  ) : (
                    <span className="text-slate-300">24/7 Smart Campus Copilot</span>
                  )}
                </div>
              </div>
            </div>

            {/* Header Control Pill Toolbar */}
            <div className="flex items-center gap-1 bg-[#060B17]/60 p-1 rounded-2xl border border-slate-800/80 text-slate-400">
              <button
                type="button"
                onClick={() => setShowSettings(!showSettings)}
                title="n8n Webhook & Connection Diagnostics"
                className={`p-1.5 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer ${
                  showSettings ? 'text-cyan-400 bg-slate-800' : ''
                }`}
              >
                <Sliders className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                title={isVoiceEnabled ? 'Mute AI Voice' : 'Enable Voice Reading'}
                className={`p-1.5 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer ${
                  isVoiceEnabled ? 'text-cyan-400 bg-slate-800' : ''
                }`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Chat Session"
                className="p-1.5 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore View' : 'Expand View'}
                className="p-1.5 rounded-xl hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 rounded-xl hover:bg-rose-950/70 hover:text-rose-400 transition-all cursor-pointer text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* n8n Webhook Configuration & Diagnostics Drawer */}
          {showSettings && (
            <div className="px-4 py-3 bg-[#070F22] border-b border-slate-800 text-xs text-slate-300 space-y-3 animate-in fade-in max-h-[320px] overflow-y-auto">
              <div className="flex items-center justify-between font-bold text-white">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Workflow className="w-4 h-4" />
                  n8n AI Workflow Integration &amp; Diagnostic
                </span>
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Real-time Connection Status Card */}
              <div className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                connectionStatus?.connected 
                  ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300'
                  : connectionStatus?.isConfigured
                  ? 'bg-rose-950/40 border-rose-700/60 text-rose-300'
                  : 'bg-blue-950/40 border-blue-700/60 text-blue-200'
              }`}>
                {connectionStatus?.connected ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : connectionStatus?.isConfigured ? (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-0.5 flex-1 text-xs">
                  <div className="font-bold flex items-center justify-between">
                    <span>{connectionStatus?.statusText || 'Probing connection...'}</span>
                    {connectionStatus?.latencyMs !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-black/40 font-mono text-cyan-300">
                        {connectionStatus.latencyMs}ms
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    {connectionStatus?.details || 'Configure your custom webhook or run in high-performance local AI mode.'}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block font-medium">n8n Webhook URL (POST):</label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://your-n8n.cloud/webhook/schoolsaathi-chat"
                  className="w-full px-3 py-2 bg-[#050B18] border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-cyan-500 placeholder:text-slate-600 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 block font-medium">Authorization Bearer Token (Optional):</label>
                <input
                  type="password"
                  value={bearerToken}
                  onChange={(e) => setBearerToken(e.target.value)}
                  placeholder="Optional authorization token for protected webhooks"
                  className="w-full px-3 py-2 bg-[#050B18] border border-slate-800 rounded-xl text-white text-xs outline-none focus:border-cyan-500 placeholder:text-slate-600"
                />
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-slate-800 text-[10px] space-y-1.5 font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-cyan-300 font-sans font-bold">n8n Respond Node JSON:</span>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('{\n  "success": true,\n  "message": "{{$json.output}}"\n}');
                      setCopiedId('n8n-template');
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="text-amber-400 hover:text-white flex items-center gap-1 font-sans cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedId === 'n8n-template' ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <div className="text-slate-300">
                  &#123;&quot;success&quot;: true, &quot;message&quot;: &quot;{`{{$json.output}}`}&quot;&#125;
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 gap-2">
                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTestingConnection}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Activity className={`w-3.5 h-3.5 ${isTestingConnection ? 'animate-spin' : ''}`} />
                  {isTestingConnection ? 'Testing...' : '⚡ Test Connection'}
                </button>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white rounded-xl font-bold text-xs cursor-pointer shadow-lg shadow-blue-500/20"
                >
                  Save Configuration
                </button>
              </div>
            </div>
          )}

          {/* Quick Topic Action Chips Bar */}
          <nav aria-label="Quick topic categories" className="px-3 py-2 bg-[#060C1B] border-b border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto gap-2 scrollbar-none">
            <span className="shrink-0 font-medium text-slate-400 flex items-center gap-1 text-[11px] pl-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Ask AI:
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleSendMessage('What is my attendance percentage and summary?')}
                className="px-2.5 py-1 bg-[#07241F] hover:bg-emerald-900/40 text-emerald-300 rounded-xl border border-emerald-800/40 hover:border-emerald-500/40 transition-all cursor-pointer font-medium flex items-center gap-1"
              >
                <Activity className="w-3 h-3 text-emerald-400" />
                My Attendance
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Show my latest exam marks and grades')}
                className="px-2.5 py-1 bg-[#241A06] hover:bg-amber-900/40 text-amber-300 rounded-xl border border-amber-800/40 hover:border-amber-500/40 transition-all cursor-pointer font-medium flex items-center gap-1"
              >
                <CreditCard className="w-3 h-3 text-amber-400" />
                Grades &amp; Marks
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('What are the latest school notices and announcements?')}
                className="px-2.5 py-1 bg-[#0C172E] hover:bg-blue-900/40 text-cyan-300 rounded-xl border border-blue-800/40 hover:border-cyan-500/40 transition-all cursor-pointer font-medium flex items-center gap-1"
              >
                <Info className="w-3 h-3 text-cyan-400" />
                School Notices
              </button>
              <button
                type="button"
                onClick={() => handleSendMessage('Show my student profile and class details')}
                className="px-2.5 py-1 bg-[#1A1230] hover:bg-purple-900/40 text-purple-300 rounded-xl border border-purple-800/40 hover:border-purple-500/40 transition-all cursor-pointer font-medium flex items-center gap-1"
              >
                <KeyRound className="w-3 h-3 text-purple-400" />
                My Profile
              </button>
            </div>
          </nav>

          {/* Main Messages Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#080E1E] via-[#060B17] to-[#040812]">
            {/* Header Hero Introduction inside chat */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#0C1730]/90 to-[#081022]/90 border border-slate-800/80 shadow-md text-slate-300 text-xs">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs">SchoolSaathi AI Support Assistant</h4>
                  <p className="text-[10px] text-slate-400">Powered by n8n Workflow Automation &amp; Real-Time Diagnostics</p>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pl-9">
                Feel free to ask any question regarding admissions, exam results, timetable, teacher appointments, fee structures, or campus directions.
              </p>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 shadow-md shadow-blue-500/20 border border-white/20">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[86%] sm:max-w-[82%] rounded-3xl p-4 text-xs sm:text-[13px] leading-relaxed shadow-lg transition-all ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-tr-sm shadow-blue-600/20'
                      : 'bg-[#0B152B]/90 text-slate-200 border border-slate-800/90 rounded-tl-sm backdrop-blur-md shadow-black/40'
                  }`}
                >
                  {/* Message content */}
                  <div className="space-y-1">
                    {msg.sender === 'bot' ? (
                      renderFormattedText(msg.text)
                    ) : (
                      <p className="whitespace-pre-line font-medium text-white">{msg.text}</p>
                    )}
                  </div>

                  {/* Generated IT Support Ticket Receipt */}
                  {msg.isTicket && msg.ticketId && (
                    <div className="mt-3 p-3 bg-emerald-950/60 border border-emerald-600/50 rounded-2xl text-xs text-emerald-300 shadow-inner">
                      <div className="flex items-center justify-between font-bold pb-2 border-b border-emerald-800/60">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Support Ticket Created</span>
                        </div>
                        <span className="text-[10px] bg-emerald-900 px-2 py-0.5 rounded-full text-emerald-200 uppercase tracking-wider font-mono">
                          High Priority
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="font-mono text-xs text-white">
                          ID: <span className="font-bold text-emerald-400">{msg.ticketId}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.ticketId || '', `tkt-${msg.id}`)}
                          className="px-2 py-1 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 text-[10px] font-medium flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {copiedId === `tkt-${msg.id}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              Copy Ticket ID
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Direct Action Link Navigation Button */}
                  {msg.actionLink && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60">
                      <button
                        type="button"
                        onClick={() => handleActionClick(msg.actionLink?.action || 'selection')}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:brightness-110 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                      >
                        <span>{msg.actionLink.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Interactive Quick Suggestions */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSuggestionClick(sugg)}
                          className="px-3 py-1 bg-[#060D1E] hover:bg-blue-900/40 text-cyan-300 hover:text-white rounded-xl text-[11px] font-medium border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer text-left shadow-sm"
                        >
                          {sugg}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Bottom Message Metadata & Actions */}
                  <div className="mt-2 pt-1 flex items-center justify-between text-[10px] text-slate-500">
                    <span className={msg.sender === 'user' ? 'text-blue-200/80' : 'text-slate-400'}>
                      {msg.timestamp}
                    </span>

                    {msg.sender === 'bot' && (
                      <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          type="button"
                          onClick={() => handleCopyText(msg.text, msg.id)}
                          title="Copy text"
                          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleLikeMessage(msg.id, true)}
                          title="Helpful response"
                          className={`p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer ${
                            msg.liked === true ? 'text-emerald-400' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleLikeMessage(msg.id, false)}
                          title="Not helpful"
                          className={`p-1 rounded hover:bg-slate-800 transition-colors cursor-pointer ${
                            msg.liked === false ? 'text-rose-400' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2.5 text-slate-400 text-xs">
                <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="w-4 h-4 animate-bounce" />
                </div>
                <div className="bg-[#0B152B] border border-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  </div>
                  <span className="text-[11px] text-slate-300 ml-1 font-medium">SchoolSaathi AI is generating answer...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Dock Input Bar */}
          <footer className="p-3.5 bg-[#060C1B] border-t border-slate-800 shrink-0">
            <div className="relative flex items-center rounded-2xl bg-[#081226] border border-slate-700/80 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 shadow-inner transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about logins, bus GPS, fees, or exam syllabus..."
                className="w-full pl-4 pr-12 py-3 bg-transparent text-white outline-none text-xs placeholder:text-slate-500"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isTyping}
                className="absolute right-1.5 p-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/20"
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between mt-2.5 text-[10px] text-slate-500 px-1 font-medium">
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                n8n AI Automated Helpdesk
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Real-Time Campus Telemetry Active
              </span>
            </div>
          </footer>
        </section>
      )}
    </>
  );
};
