import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { 
  GraduationCap, 
  Users, 
  UserCheck, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Lock, 
  Phone, 
  Sparkles, 
  Globe, 
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  FileCheck2,
  Hash,
  User as UserIcon,
  HelpCircle,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/brand/Logo';
import { TermsPolicyModal } from '../../components/legal/TermsPolicyModal';

export type LoginSector = 'student' | 'parent' | 'teacher' | 'principal' | 'first-time';

interface LoginPageProps {
  initialSector?: LoginSector;
  onBackToSelection?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  initialSector = 'student',
  onBackToSelection,
}) => {
  const { 
    loginStudent, 
    loginParent, 
    loginTeacher, 
    loginPrincipal, 
    loginFirstTime, 
    requestOtp, 
    switchDemoRole,
    isLoading 
  } = useAuth();
  const { language, setLanguage, t, languageOptions } = useLanguage();

  // Active sector tab
  const [activeSector, setActiveSector] = useState<LoginSector>(initialSector);

  // Student sector fields
  const [studentName, setStudentName] = useState('Rahul Sharma');
  const [studentAdmissionNo, setStudentAdmissionNo] = useState('ADM-2022-801');
  const [studentRollNo, setStudentRollNo] = useState('14');

  // Parent sector fields
  const [parentChildName, setParentChildName] = useState('Rahul Sharma');
  const [parentChildAdmissionNo, setParentChildAdmissionNo] = useState('ADM-2022-801');
  const [parentChildRollNo, setParentChildRollNo] = useState('14');

  // Teacher sector fields
  const [teacherPhone, setTeacherPhone] = useState('9876543212');
  const [teacherPassword, setTeacherPassword] = useState('teacher123');
  const [showTeacherPassword, setShowTeacherPassword] = useState(false);

  // Principal sector fields
  const [principalPhone, setPrincipalPhone] = useState('9876543213');
  const [principalPassword, setPrincipalPassword] = useState('principal123');
  const [showPrincipalPassword, setShowPrincipalPassword] = useState(false);

  // First-Time Registration / OTP fields
  const [ftRole, setFtRole] = useState<UserRole>('student');
  const [ftName, setFtName] = useState('Rahul Sharma');
  const [ftMobile, setFtMobile] = useState('9876543210');
  const [ftOtp, setFtOtp] = useState('123456');
  const [ftAgreed, setFtAgreed] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Global error message & modals
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // 1. Handle Student Login
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await loginStudent({
      studentName,
      admissionNo: studentAdmissionNo,
      rollNo: studentRollNo,
    });
    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
    }
  };

  // 2. Handle Parent Login
  const handleParentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await loginParent({
      studentName: parentChildName,
      admissionNo: parentChildAdmissionNo,
      rollNo: parentChildRollNo,
    });
    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
    }
  };

  // 3. Handle Teacher Login
  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await loginTeacher({
      phone: teacherPhone,
      password: teacherPassword,
    });
    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
    }
  };

  // 4. Handle Principal Login
  const handlePrincipalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await loginPrincipal({
      phone: principalPhone,
      password: principalPassword,
    });
    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
    }
  };

  // 5. Handle First-Time / OTP Request
  const handleSendOtp = async () => {
    if (!ftMobile || ftMobile.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number before requesting OTP.');
      return;
    }
    setIsSendingOtp(true);
    setErrorMessage(null);
    try {
      const res = await requestOtp(ftMobile);
      if (res.success) {
        setOtpSentMessage(res.message);
        setFtOtp(res.demoOtp);
      } else {
        setErrorMessage(res.message);
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 6. Handle First-Time Verification Submit
  const handleFirstTimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!ftAgreed) {
      setErrorMessage('You must agree to the Terms & Conditions and Policies to complete registration.');
      return;
    }

    const res = await loginFirstTime({
      mobile: ftMobile,
      otp: ftOtp,
      role: ftRole,
      name: ftName,
      agreedToTerms: ftAgreed,
    });

    if (!res.success && res.error) {
      setErrorMessage(res.error.message);
    }
  };

  const sectors: {
    id: LoginSector;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    badgeColor: string;
  }[] = [
    {
      id: 'student',
      title: 'Student Login',
      subtitle: 'Name, Admission & Roll No',
      icon: <GraduationCap className="w-4 h-4" />,
      badgeColor: 'bg-[#0084FF] text-white',
    },
    {
      id: 'parent',
      title: 'Parent Login',
      subtitle: 'Child Records & Telemetry',
      icon: <Users className="w-4 h-4" />,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'teacher',
      title: 'Teacher Login',
      subtitle: 'Phone & Password',
      icon: <UserCheck className="w-4 h-4" />,
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      id: 'principal',
      title: 'Principal / Admin',
      subtitle: 'Executive Authority',
      icon: <ShieldCheck className="w-4 h-4" />,
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'first-time',
      title: 'First-Time User',
      subtitle: 'Mobile OTP & Policy Agreement',
      icon: <Smartphone className="w-4 h-4" />,
      badgeColor: 'bg-cyan-500 text-white',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07132B] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0084FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00C2FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="p-4 sm:p-6 flex items-center justify-between z-10 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-3">
          <Logo variant="horizontal" theme="dark" size="md" showTagline={true} />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {onBackToSelection && (
            <button
              onClick={onBackToSelection}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-slate-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              <span>← All Portals</span>
            </button>
          )}

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

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10">
        <div className="w-full max-w-5xl space-y-6">
          {/* Sector Navigation Selector */}
          <div className="bg-[#0A1E4A]/90 p-2 rounded-2xl border border-[#143474] shadow-xl backdrop-blur-md">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
              {sectors.map((sec) => {
                const isActive = activeSector === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSector(sec.id);
                      setErrorMessage(null);
                      setOtpSentMessage(null);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0084FF] text-white shadow-md ring-1 ring-white/30'
                        : 'hover:bg-[#143474]/60 text-slate-300'
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-[#061330] text-[#00C2FF]'
                      }`}
                    >
                      {sec.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{sec.title}</p>
                      <p className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                        {sec.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1-Click Instant Demo Testing Bar */}
          <div className="bg-[#061330]/90 p-3 sm:p-4 rounded-2xl border border-[#0084FF]/30 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0084FF]"></span>
              </span>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Quick Demo Access</span>
                  <span className="text-[10px] text-[#00C2FF] font-normal font-mono bg-[#0A1E4A] px-1.5 py-0.5 rounded border border-[#143474]">1-Click</span>
                </p>
                <p className="text-[10px] text-slate-400">Instant login to evaluate portals without typing</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => switchDemoRole('student')}
                className="px-3 py-1.5 bg-[#0084FF]/20 hover:bg-[#0084FF]/40 border border-[#0084FF]/40 text-[#00C2FF] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>
              <button
                type="button"
                onClick={() => switchDemoRole('parent')}
                className="px-3 py-1.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Parent</span>
              </button>
              <button
                type="button"
                onClick={() => switchDemoRole('teacher')}
                className="px-3 py-1.5 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-700/50 text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => switchDemoRole('principal')}
                className="px-3 py-1.5 bg-purple-950/60 hover:bg-purple-900/80 border border-purple-700/50 text-purple-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Principal</span>
              </button>
            </div>
          </div>

          {/* Sector Login Card */}
          <div className="bg-[#0A1E4A]/95 border border-[#143474] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-950/70 border border-rose-800/80 rounded-2xl text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* SECTOR 1: STUDENT LOGIN */}
            {activeSector === 'student' && (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#0084FF]/20 text-[#00C2FF] rounded-2xl border border-[#0084FF]/30">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Student Portal Access</h3>
                      <p className="text-xs text-slate-400">Enter your official student credentials</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00C2FF] bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Sector: Student
                  </span>
                </div>

                {/* 1. Student Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Student Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* 2. Student Admission Number & 3. Student Roll Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Student Admission Number
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={studentAdmissionNo}
                        onChange={(e) => setStudentAdmissionNo(e.target.value)}
                        placeholder="e.g. ADM-2022-801"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Student Roll Number
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        required
                        value={studentRollNo}
                        onChange={(e) => setStudentRollNo(e.target.value)}
                        placeholder="e.g. 14"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Quick prefill demo accounts */}
                <div className="pt-2">
                  <p className="text-[11px] text-slate-400 mb-2">Verified Student Demo Presets:</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setStudentName('Rahul Sharma');
                        setStudentAdmissionNo('ADM-2022-801');
                        setStudentRollNo('14');
                      }}
                      className="px-2.5 py-1 bg-[#061330] hover:bg-[#143474] text-[#00C2FF] rounded-lg text-[10px] font-mono border border-[#143474] transition-colors cursor-pointer"
                    >
                      Rahul Sharma (8A • #14 • ADM-2022-801)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStudentName('Priya Sharma');
                        setStudentAdmissionNo('ADM-2024-502');
                        setStudentRollNo('8');
                      }}
                      className="px-2.5 py-1 bg-[#061330] hover:bg-[#143474] text-[#00C2FF] rounded-lg text-[10px] font-mono border border-[#143474] transition-colors cursor-pointer"
                    >
                      Priya Sharma (5B • #8 • ADM-2024-502)
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-[#0084FF] hover:bg-[#0070DB] text-white font-bold shadow-lg shadow-[#0084FF]/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Student...' : 'Access Student Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 2: PARENT LOGIN */}
            {activeSector === 'parent' && (
              <form onSubmit={handleParentSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Parent & Guardian Portal</h3>
                      <p className="text-xs text-slate-400">Enter your ward's student record details</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Sector: Parent
                  </span>
                </div>

                {/* 1. Student Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Child / Student Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={parentChildName}
                      onChange={(e) => setParentChildName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* 2. Admission Number & 3. Roll Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Student Admission Number
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={parentChildAdmissionNo}
                        onChange={(e) => setParentChildAdmissionNo(e.target.value)}
                        placeholder="e.g. ADM-2022-801"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Student Roll Number
                    </label>
                    <div className="relative">
                      <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="number"
                        required
                        value={parentChildRollNo}
                        onChange={(e) => setParentChildRollNo(e.target.value)}
                        placeholder="e.g. 14"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Allows linked parent account to access daily attendance telemetry & academic reports.</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Connecting Parent Portal...' : 'Access Parent Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 3: TEACHER LOGIN */}
            {activeSector === 'teacher' && (
              <form onSubmit={handleTeacherSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Faculty & Teacher Portal</h3>
                      <p className="text-xs text-slate-400">Classroom attendance & grade management</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Sector: Teacher
                  </span>
                </div>

                {/* 1. Registered Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Registered Faculty Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={teacherPhone}
                      onChange={(e) => setTeacherPhone(e.target.value)}
                      placeholder="e.g. 9876543212"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* 2. Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Account Password</label>
                    <span className="text-[10px] text-slate-400 font-mono">Demo: teacher123</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showTeacherPassword ? 'text' : 'password'}
                      required
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                      placeholder="Enter teacher password"
                      className="w-full pl-10 pr-10 py-2.5 bg-[#061330] border border-[#143474] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showTeacherPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400">
                  Default Faculty: <strong>Amit Kumar (Class Teacher 8A)</strong> • Mobile: <span className="font-mono text-amber-400">9876543212</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg shadow-amber-600/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Faculty Credentials...' : 'Access Faculty Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 4: PRINCIPAL / ADMIN LOGIN */}
            {activeSector === 'principal' && (
              <form onSubmit={handlePrincipalSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Institutional Administration</h3>
                      <p className="text-xs text-slate-400">Executive principal desk & macro audit trail</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Sector: Principal / Admin
                  </span>
                </div>

                {/* 1. Registered Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Registered Administrative Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={principalPhone}
                      onChange={(e) => setPrincipalPhone(e.target.value)}
                      placeholder="e.g. 9876543213"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* 2. Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Executive Password</label>
                    <span className="text-[10px] text-slate-400 font-mono">Demo: principal123</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPrincipalPassword ? 'text' : 'password'}
                      required
                      value={principalPassword}
                      onChange={(e) => setPrincipalPassword(e.target.value)}
                      placeholder="Enter administrator password"
                      className="w-full pl-10 pr-10 py-2.5 bg-[#061330] border border-[#143474] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPrincipalPassword(!showPrincipalPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPrincipalPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400">
                  Principal Account: <strong>Dr. Priya Sen</strong> • Mobile: <span className="font-mono text-purple-400">9876543213</span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-600/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Executive Rights...' : 'Access Executive Console'}
                </Button>
              </form>
            )}

            {/* SECTOR 5: FIRST-TIME REGISTRATION / OTP VERIFICATION */}
            {activeSector === 'first-time' && (
              <form onSubmit={handleFirstTimeSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">First-Time User Registration</h3>
                      <p className="text-xs text-slate-400">Mobile OTP Verification & Policy Consent</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    First-Time OTP
                  </span>
                </div>

                {otpSentMessage && (
                  <div className="p-3 bg-cyan-950/80 border border-cyan-800 rounded-2xl text-cyan-200 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{otpSentMessage}</span>
                  </div>
                )}

                {/* Role selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Select Your Institution Role
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['student', 'parent', 'teacher', 'principal'] as UserRole[]).map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setFtRole(r)}
                        className={`p-2.5 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer ${
                          ftRole === r
                            ? 'bg-[#0084FF] border-[#0084FF] text-white'
                            : 'bg-[#061330] border-[#143474] text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {r === 'principal' ? 'Principal/Admin' : r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Full Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={ftName}
                      onChange={(e) => setFtName(e.target.value)}
                      placeholder="Enter full name"
                      className="w-full px-3.5 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] rounded-xl text-white outline-none text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Registered Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="tel"
                        required
                        value={ftMobile}
                        onChange={(e) => setFtMobile(e.target.value)}
                        placeholder="10-digit mobile"
                        className="w-full px-3.5 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] rounded-xl text-white outline-none text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="px-3 py-2 bg-[#0084FF]/20 hover:bg-[#0084FF]/40 border border-[#0084FF]/40 text-[#00C2FF] rounded-xl text-xs font-bold shrink-0 transition-colors cursor-pointer"
                      >
                        {isSendingOtp ? 'Sending...' : 'Get OTP'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* OTP Verification Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Enter 6-Digit Verification OTP
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Demo OTP: 123456</span>
                  </div>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={ftOtp}
                    onChange={(e) => setFtOtp(e.target.value)}
                    placeholder="Enter 6-digit code (123456)"
                    className="w-full px-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-xl text-white outline-none transition-all text-sm font-mono tracking-widest text-center"
                  />
                </div>

                {/* MANDATORY Terms & Policies Checkbox */}
                <div className="pt-2 p-3.5 bg-[#061330] border border-[#143474] rounded-2xl space-y-2">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={ftAgreed}
                      onChange={(e) => setFtAgreed(e.target.checked)}
                      className="w-4 h-4 rounded mt-0.5 bg-[#07132B] border-[#143474] text-[#0084FF] focus:ring-[#0084FF] shrink-0"
                    />
                    <span className="text-xs text-slate-300 leading-relaxed">
                      I have read, understood, and agree to the{' '}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsTermsModalOpen(true);
                        }}
                        className="text-[#00C2FF] font-bold underline hover:text-cyan-300 inline-flex items-center gap-0.5"
                      >
                        Terms & Conditions and Student Data Privacy Policies
                        <ExternalLink className="w-3 h-3 inline" />
                      </button>
                      {' '}governing institutional ERP access and SchoolSaathi AI multi-modal data processing.
                    </span>
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-[#0084FF] hover:from-cyan-600 hover:to-[#0070DB] text-white font-bold shadow-lg shadow-[#0084FF]/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying OTP & Registering...' : 'Verify OTP & Enter Portal'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center text-[11px] text-slate-400 z-10 border-t border-[#143474] max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>SchoolSaathi AI • Your AI-Powered School Companion</span>
        </div>
        <button
          type="button"
          onClick={() => setIsTermsModalOpen(true)}
          className="text-[#00C2FF] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>View Terms of Service & Privacy Policy</span>
        </button>
      </footer>

      {/* Terms and Privacy Modal */}
      <TermsPolicyModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => setFtAgreed(true)}
      />
    </div>
  );
};
