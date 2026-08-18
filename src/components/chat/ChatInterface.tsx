import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { xyzAiService, ChatMessage } from '../../services/xyzAiService';
import { 
  Send, 
  Mic, 
  Volume2, 
  Trash2, 
  Sparkles, 
  UserCheck, 
  Building2, 
  RotateCcw,
  CheckCheck,
  Bot
} from 'lucide-react';

interface ChatInterfaceProps {
  onOpenEscalation?: (type: 'TEACHER' | 'MANAGEMENT') => void;
  onAvatarModeChange?: (mode: 'idle' | 'listening' | 'processing' | 'speaking' | 'error') => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onOpenEscalation,
  onAvatarModeChange,
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const role = user?.role || 'student';
    const name = user?.name || 'Student';
    
    let welcomeContent = `Welcome to SchoolSaathi AI! How may I assist you today?`;
    let initialSuggested: { label: string; actionId: string }[] = [];

    if (role === 'student') {
      welcomeContent = `👋 **Hello ${name}!** I am your **SchoolSaathi AI Companion**.\n\n🔒 **Privacy Guard Active**: I am securely authenticated to your personal academic records (Class 8-A, Roll #14).\n\n• You can ask about **your attendance**, **mid-term grades**, **class timetable**, or **homework**.\n• You can ask **academic study & technical questions** (formulas, physics laws, Python coding, science concepts).\n\n*Note: Under SchoolSaathi RBAC & DPDP Act, private records of other pupils and faculty payroll are restricted.*`;
      initialSuggested = [
        { label: 'What is my attendance percentage?', actionId: 'check_attendance' },
        { label: 'Show my report card marks', actionId: 'view_grades' },
        { label: 'What is today\'s homework?', actionId: 'view_homework' },
        { label: 'Explain Newton\'s laws of motion', actionId: 'explain_science' }
      ];
    } else if (role === 'parent') {
      welcomeContent = `👨‍👩‍👧 **Namaste ${name}!** Authenticated Parent Portal assistant active.\n\nYou can query verified attendance, homework, and fee receipts for your linked children: **Rahul Sharma (Class 8A)** and **Priya Sharma (Class 5B)**.`;
      initialSuggested = [
        { label: 'Check Rahul\'s attendance', actionId: 'check_attendance' },
        { label: 'Check Priya\'s performance', actionId: 'view_grades' },
        { label: 'Message Class Teacher', actionId: 'talk_to_teacher' }
      ];
    } else if (role === 'teacher') {
      welcomeContent = `👨‍🏫 **Welcome ${name}!** Faculty AI Assistant connected to Class 8-A roster and lesson planning modules.`;
      initialSuggested = [
        { label: 'View Class 8-A Attendance', actionId: 'check_attendance' },
        { label: 'Generate a Physics Quiz', actionId: 'quiz_gen' },
        { label: 'Draft a Student Circular', actionId: 'circular_draft' }
      ];
    } else if (role === 'principal') {
      welcomeContent = `🏛️ **Welcome Dr. Priya Sen!** Executive Administration AI connected to institutional analytics and board compliance.`;
      initialSuggested = [
        { label: 'Institutional Attendance Report', actionId: 'school_att' },
        { label: 'Review Escalation Queue', actionId: 'escalations' },
        { label: 'Board Compliance Status', actionId: 'compliance' }
      ];
    }

    return [
      {
        id: 'MSG-INIT',
        sender: 'assistant',
        content: welcomeContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
        suggestedActions: initialSuggested
      }
    ];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || !user || isLoading) return;

    const userMsg: ChatMessage = {
      id: `USR-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    if (onAvatarModeChange) onAvatarModeChange('processing');

    try {
      const assistantMsg = await xyzAiService.sendMessage(text, user);
      setMessages((prev) => [...prev, assistantMsg]);
      if (onAvatarModeChange) {
        onAvatarModeChange('speaking');
        setTimeout(() => onAvatarModeChange('idle'), 2500);
      }
    } catch {
      const errorMsg: ChatMessage = {
        id: `ERR-${Date.now()}`,
        sender: 'assistant',
        content: 'Unable to reach external XYZ AI Gateway endpoint. Please verify connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'error',
      };
      setMessages((prev) => [...prev, errorMsg]);
      if (onAvatarModeChange) onAvatarModeChange('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `MSG-${Date.now()}`,
        sender: 'assistant',
        content: 'Conversation history cleared. Ready for your query.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered',
      }
    ]);
  };

  const handleMicToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      if (onAvatarModeChange) onAvatarModeChange('listening');
      // Simulate voice capture
      setTimeout(() => {
        setInputMessage('What is my attendance percentage for this term?');
        setIsVoiceActive(false);
        if (onAvatarModeChange) onAvatarModeChange('idle');
      }, 2000);
    }
  };

  return (
    <Card className="flex flex-col h-[560px] max-h-[75vh]">
      <CardHeader
        title={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900">XYZ AI School Assistant</span>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Integration Gateway Connected
              </div>
            </div>
          </div>
        }
        action={
          <div className="flex items-center gap-1">
            <button
              onClick={handleClearChat}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title="Clear Conversation"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        }
      />

      {/* Message Stream */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                  isUser
                    ? 'bg-slate-800 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {isUser ? user?.name?.charAt(0) || 'U' : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[80%] space-y-1.5 ${isUser ? 'text-right' : 'text-left'}`}>
                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 shadow-2xs rounded-tl-xs'
                  }`}
                >
                  <p>{msg.content}</p>

                  {/* Audio Playback simulation button */}
                  {!isUser && (
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (onAvatarModeChange) {
                            onAvatarModeChange('speaking');
                            setTimeout(() => onAvatarModeChange('idle'), 2000);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-[10px] text-indigo-600 hover:text-indigo-800 font-semibold"
                      >
                        <Volume2 className="w-3 h-3" />
                        Play Audio Voice
                      </button>
                    </div>
                  )}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action) => (
                      <button
                        key={action.actionId}
                        onClick={() => {
                          if (action.actionId === 'talk_to_teacher' && onOpenEscalation) {
                            onOpenEscalation('TEACHER');
                          } else {
                            handleSendMessage(action.label);
                          }
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-medium rounded-full shadow-2xs transition-colors"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-1 text-[10px] text-slate-400 px-1">
                  <span>{msg.timestamp}</span>
                  {isUser && <CheckCheck className="w-3 h-3 text-indigo-500" />}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-indigo-600 bg-indigo-50/80 p-2.5 rounded-xl max-w-fit">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span>XYZ AI Gateway query in progress...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Human Escalation Quick Banner */}
      <div className="px-4 py-2 bg-slate-100/90 border-t border-slate-200 flex items-center justify-between text-xs">
        <span className="text-slate-600 text-[11px]">Need official human assistance?</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onOpenEscalation && onOpenEscalation('TEACHER')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-medium"
          >
            <UserCheck className="w-3 h-3 text-indigo-600" />
            {t('talkToTeacher')}
          </button>
          <button
            onClick={() => onOpenEscalation && onOpenEscalation('MANAGEMENT')}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-lg text-[11px] font-medium"
          >
            <Building2 className="w-3 h-3 text-purple-600" />
            {t('contactManagement')}
          </button>
        </div>
      </div>

      {/* Message Input Box */}
      <CardFooter className="p-3 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 w-full"
        >
          <button
            type="button"
            onClick={handleMicToggle}
            className={`p-2.5 rounded-xl transition-all ${
              isVoiceActive
                ? 'bg-rose-600 text-white animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
            }`}
            title="Speech to Text Input"
          >
            <Mic className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={
              isVoiceActive
                ? 'Listening to microphone...'
                : 'Type your message or ask about attendance, academics...'
            }
            className="flex-1 px-3.5 py-2 text-xs bg-slate-100 border border-transparent focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 rounded-xl outline-none"
          />

          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={!inputMessage.trim() || isLoading}
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Send
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
