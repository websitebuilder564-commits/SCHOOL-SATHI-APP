import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Sparkles, 
  Globe, 
  ArrowRight, 
  KeyRound, 
  CheckCircle2, 
  FileCheck2,
  School,
  BookOpen,
  Calendar,
  BarChart3,
  Bell,
  Smartphone,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../../components/brand/Logo';
import { Button } from '../../components/ui/Button';
import { TermsPolicyModal } from '../../components/legal/TermsPolicyModal';

interface PortalSelectionPageProps {
  onSelectPortal: (role: UserRole) => void;
  onOpenCredentialLogin: (sector: 'student' | 'parent' | 'teacher' | 'principal' | 'first-time') => void;
  onBackToWebsite?: () => void;
}

export const PortalSelectionPage: React.FC<PortalSelectionPageProps> = ({
  onSelectPortal,
  onOpenCredentialLogin,
  onBackToWebsite,
}) => {
  const { switchDemoRole } = useAuth();
  const { language, setLanguage, t, languageOptions } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [hoveredPortal, setHoveredPortal] = useState<UserRole | null>(null);

  const handleOpenLogin = (role: UserRole) => {
    onOpenCredentialLogin(role);
  };

  const portals: {
    id: UserRole;
    title: string;
    roleName: string;
    targetUser: string;
    badge: string;
    color: string;
    borderGlow: string;
    bgGradient: string;
    buttonColor: string;
    icon: React.ReactNode;
    description: string;
    features: string[];
    demoAccount: string;
  }[] = [
    {
      id: 'student',
      title: 'Student Portal',
      roleName: 'Student / Pupil',
      targetUser: 'For Enrolled Students (Classes 1–12)',
      badge: 'Pupil Workspace',
      color: 'text-[#00C2FF]',
      borderGlow: 'hover:border-[#0084FF] hover:shadow-[#0084FF]/20',
      bgGradient: 'from-[#0A1E4A] to-[#061330]',
      buttonColor: 'bg-[#0084FF] hover:bg-[#0070DB] text-white shadow-md shadow-[#0084FF]/30',
      icon: <GraduationCap className="w-8 h-8 text-[#00C2FF]" />,
      description: 'Access smart AI tutoring, class homework, daily timetable, exams & attendance telemetry.',
      features: [
        'Multi-Modal AI Tutor (Chat, Voice & Avatar)',
        'Subject Progress & CBSE Report Card',
        'Daily Class Timetable & Homework Tracker',
        'Attendance Tracking & Leave Submissions'
      ],
      demoAccount: 'Rahul Sharma • Class 8A (Roll #14)'
    },
    {
      id: 'parent',
      title: 'Parent Portal',
      roleName: 'Parent / Guardian',
      targetUser: 'For Mothers, Fathers & Legal Guardians',
      badge: 'Guardian Hub',
      color: 'text-emerald-400',
      borderGlow: 'hover:border-emerald-500 hover:shadow-emerald-500/20',
      bgGradient: 'from-[#0A2E2A] to-[#061330]',
      buttonColor: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/30',
      icon: <Users className="w-8 h-8 text-emerald-400]" />,
      description: 'Monitor your children’s daily academic growth, real-time bus & attendance alerts, and fees.',
      features: [
        'All Enrolled Children Overview & Switching',
        'Live In/Out & Daily Attendance Alerts',
        'Direct Teacher Directory & Consultation Booking',
        'Online Fee Payment Invoices & Receipts'
      ],
      demoAccount: 'Anita Sharma • Parent of Rahul & Priya'
    },
    {
      id: 'teacher',
      title: 'Teacher Portal',
      roleName: 'Faculty & Educator',
      targetUser: 'For Subject Teachers & Class In-Charges',
      badge: 'Faculty Workspace',
      color: 'text-amber-400',
      borderGlow: 'hover:border-amber-500 hover:shadow-amber-500/20',
      bgGradient: 'from-[#2E200A] to-[#061330]',
      buttonColor: 'bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-600/30',
      icon: <UserCheck className="w-8 h-8 text-amber-400" />,
      description: 'Take 1-click class attendance, update marks, manage syllabus completion & circulars.',
      features: [
        'Digital Class Roster & 1-Click Attendance',
        'Gradebook & CBSE Report Remarks Entry',
        'Syllabus & Daily Lecture Timetable',
        'Parent Broadcast Notices & Direct Helpdesk'
      ],
      demoAccount: 'Mr. Amit Kumar • Mathematics Faculty (8A)'
    },
    {
      id: 'principal',
      title: 'Principal Portal',
      roleName: 'Principal / Management',
      targetUser: 'For School Heads, Trustees & Administrators',
      badge: 'Executive Command',
      color: 'text-purple-400',
      borderGlow: 'hover:border-purple-500 hover:shadow-purple-500/20',
      bgGradient: 'from-[#240A3E] to-[#061330]',
      buttonColor: 'bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30',
      icon: <ShieldCheck className="w-8 h-8 text-purple-400" />,
      description: 'Institutional dashboard with school-wide attendance, CBSE compliance & immutable audit logs.',
      features: [
        '360° School Attendance & Turnout Analytics',
        'Institutional Role-Based Access & Security',
        'CBSE Compliance & Audit Ledger (Exportable)',
        'Faculty Workload & Grievance Resolution'
      ],
      demoAccount: 'Dr. Priya Sen • Principal (Delhi Model Public)'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07132B] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-[#0084FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[600px] h-[600px] bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <header className="p-4 sm:p-6 flex items-center justify-between z-10 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <Logo variant="horizontal" theme="dark" size="md" showTagline={true} />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onBackToWebsite && (
            <button
              onClick={onBackToWebsite}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>← School Saathi Website</span>
            </button>
          )}

          {/* First Time User OTP registration */}
          <button
            onClick={() => onOpenCredentialLogin('first-time')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-cyan-300 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
            <span>First-Time User? OTP Sign-In</span>
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] rounded-xl text-xs text-slate-200 transition-colors cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span className="font-semibold uppercase">{language}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 max-h-72 overflow-y-auto bg-[#0A1E4A] rounded-xl shadow-2xl border border-[#143474] py-1 z-50">
                <div className="px-3 py-1.5 border-b border-[#143474] text-[10px] font-bold text-slate-400 uppercase">
                  {t('language')} (11 Languages)
                </div>
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-[#143474] transition-colors ${
                      language === opt.code ? 'bg-[#0084FF]/20 font-bold text-[#00C2FF]' : 'text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{opt.flag}</span>
                      <span>{opt.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{opt.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Portal Selection Hero */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 z-10 max-w-7xl w-full mx-auto">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A1E4A] border border-[#143474] text-xs font-semibold text-[#00C2FF] shadow-xs">
            <School className="w-3.5 h-3.5" />
            <span>Delhi Model Public School • Multi-Role ERP</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Which Portal would you like to enter?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            Select your role to access your dedicated academic dashboard, AI Saathi companion, and institutional tools.
          </p>
        </div>

        {/* 4 Interactive Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          {portals.map((portal) => {
            const isHovered = hoveredPortal === portal.id;
            return (
              <div
                key={portal.id}
                onMouseEnter={() => setHoveredPortal(portal.id)}
                onMouseLeave={() => setHoveredPortal(null)}
                className={`bg-gradient-to-b ${portal.bgGradient} rounded-3xl border border-[#143474] p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-2xl ${portal.borderGlow} relative group`}
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-4">
                    <div className="p-3 bg-[#061330] rounded-2xl border border-[#143474] group-hover:scale-105 transition-transform">
                      {portal.icon}
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/10 ${portal.color} bg-white/5 uppercase tracking-wider`}>
                      {portal.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                    {portal.title}
                  </h3>
                  
                  <p className="text-[11px] font-semibold text-slate-400 mb-3">
                    {portal.targetUser}
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {portal.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 py-3 border-t border-white/10 my-3">
                    {portal.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${portal.color}`} />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Authentication Actions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="text-[10px] text-slate-400 flex items-center justify-between pb-1">
                    <span>Required Verification:</span>
                    <span className="font-medium text-slate-200">
                      {portal.id === 'student' || portal.id === 'parent' ? 'Name + Adm + Class + Mobile' : 'Official ID + Secret Code'}
                    </span>
                  </div>

                  {/* Open Role Authentication Form */}
                  <button
                    onClick={() => handleOpenLogin(portal.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${portal.buttonColor}`}
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Login to {portal.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* First-Time Mobile User Callout for Small Screens */}
        <div className="sm:hidden w-full mt-6 text-center">
          <button
            onClick={() => onOpenCredentialLogin('first-time')}
            className="w-full py-2.5 px-4 bg-[#0A1E4A] border border-[#143474] text-cyan-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-cyan-400" />
            <span>First-Time User? Register via Mobile OTP</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center text-[11px] text-slate-400 z-10 border-t border-[#143474] max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>SchoolSaathi AI • Multi-Role Institutional ERP Platform v2026.2</span>
        </div>
        <button
          type="button"
          onClick={() => setIsTermsModalOpen(true)}
          className="text-[#00C2FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Terms of Service & Privacy Policy</span>
        </button>
      </footer>

      {/* Terms and Privacy Modal */}
      <TermsPolicyModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};
