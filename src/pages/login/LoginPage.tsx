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
  Smartphone,
  School,
  BookOpen
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/brand/Logo';
import { TermsPolicyModal } from '../../components/legal/TermsPolicyModal';
import { HCaptchaSecurityWidget } from '../../components/security/HCaptchaSecurityWidget';

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
    isLoading 
  } = useAuth();
  const { language, setLanguage, t, languageOptions } = useLanguage();

  // Active sector tab
  const [activeSector, setActiveSector] = useState<LoginSector>(initialSector);

  // Student sector fields (Name + Admission No + Class + Registered Mobile)
  const [studentName, setStudentName] = useState('Rahul Sharma');
  const [studentAdmissionNo, setStudentAdmissionNo] = useState('ADM-2022-801');
  const [studentClass, setStudentClass] = useState('Class 8-A');
  const [studentMobile, setStudentMobile] = useState('9876543210');

  // Parent sector fields (Child Name + Child Admission No + Child Class + Registered Parent Mobile)
  const [parentChildName, setParentChildName] = useState('Rahul Sharma');
  const [parentChildAdmissionNo, setParentChildAdmissionNo] = useState('ADM-2022-801');
  const [parentChildClass, setParentChildClass] = useState('Class 8-A');
  const [parentMobile, setParentMobile] = useState('9876543211');

  // Teacher sector fields (School Official ID + Secret Code: cbse 2026)
  const [teacherOfficialId, setTeacherOfficialId] = useState('teacher@dmps.edu.in');
  const [teacherSecretCode, setTeacherSecretCode] = useState('cbse 2026');
  const [showTeacherSecret, setShowTeacherSecret] = useState(false);

  // Principal sector fields (School Official ID + Secret Code: cbse 2026)
  const [principalOfficialId, setPrincipalOfficialId] = useState('principal@dmps.edu.in');
  const [principalSecretCode, setPrincipalSecretCode] = useState('cbse 2026');
  const [showPrincipalSecret, setShowPrincipalSecret] = useState(false);

  // First-Time Registration / OTP fields
  const [ftRole, setFtRole] = useState<UserRole>('student');
  const [ftName, setFtName] = useState('Rahul Sharma');
  const [ftMobile, setFtMobile] = useState('9876543210');
  const [ftOtp, setFtOtp] = useState('123456');
  const [ftAgreed, setFtAgreed] = useState(false);
  const [otpSentMessage, setOtpSentMessage] = useState<string | null>(null);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // Global error message, captcha & modals
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  // 1. Handle Student Login
  const handleStudentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    const res = await loginStudent({
      studentName,
      admissionNo: studentAdmissionNo,
      studentClass,
      mobile: studentMobile,
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
      studentClass: parentChildClass,
      mobile: parentMobile,
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
      officialId: teacherOfficialId,
      secretCode: teacherSecretCode,
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
      officialId: principalOfficialId,
      secretCode: principalSecretCode,
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
      studentAdmissionNo: studentAdmissionNo,
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
      subtitle: 'Name, Admission, Class & Mobile',
      icon: <GraduationCap className="w-4 h-4" />,
      badgeColor: 'bg-[#0084FF] text-white',
    },
    {
      id: 'parent',
      title: 'Parent Login',
      subtitle: 'Ward Details & Mobile',
      icon: <Users className="w-4 h-4" />,
      badgeColor: 'bg-emerald-600 text-white',
    },
    {
      id: 'teacher',
      title: 'Teacher Login',
      subtitle: 'Official ID & Secret Code',
      icon: <UserCheck className="w-4 h-4" />,
      badgeColor: 'bg-amber-600 text-white',
    },
    {
      id: 'principal',
      title: 'Principal / Admin',
      subtitle: 'Official ID & Secret Code',
      icon: <ShieldCheck className="w-4 h-4" />,
      badgeColor: 'bg-purple-600 text-white',
    },
    {
      id: 'first-time',
      title: 'First-Time User',
      subtitle: 'Mobile OTP Verification',
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
              <span>← Choose Another Portal</span>
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
          {/* Sector Navigation Tabs */}
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

          {/* Quick-Fill Helper Bar */}
          <div className="bg-[#061330]/90 p-3 sm:p-4 rounded-2xl border border-[#143474] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#00C2FF]" />
              <div>
                <p className="text-xs font-bold text-white">Pre-Configured Demo Credentials</p>
                <p className="text-[10px] text-slate-400">Click below to automatically fill official credentials into the form:</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveSector('student');
                  setStudentName('Rahul Sharma');
                  setStudentAdmissionNo('ADM-2022-801');
                  setStudentClass('Class 8-A');
                  setStudentMobile('9876543210');
                  setErrorMessage(null);
                }}
                className="px-2.5 py-1 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-[#00C2FF] rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                Fill Student (Rahul Sharma)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSector('parent');
                  setParentChildName('Rahul Sharma');
                  setParentChildAdmissionNo('ADM-2022-801');
                  setParentChildClass('Class 8-A');
                  setParentMobile('9876543211');
                  setErrorMessage(null);
                }}
                className="px-2.5 py-1 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-emerald-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                Fill Parent (Anita Sharma)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSector('teacher');
                  setTeacherOfficialId('teacher@dmps.edu.in');
                  setTeacherSecretCode('cbse 2026');
                  setErrorMessage(null);
                }}
                className="px-2.5 py-1 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-amber-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                Fill Teacher (cbse 2026)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveSector('principal');
                  setPrincipalOfficialId('principal@dmps.edu.in');
                  setPrincipalSecretCode('cbse 2026');
                  setErrorMessage(null);
                }}
                className="px-2.5 py-1 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-purple-300 rounded-lg text-[11px] font-medium transition-colors cursor-pointer"
              >
                Fill Principal (cbse 2026)
              </button>
            </div>
          </div>

          {/* Sector Login Card */}
          <div className="bg-[#0A1E4A]/95 border border-[#143474] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md max-w-2xl mx-auto">
            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-950/70 border border-rose-800/80 rounded-2xl text-rose-200 text-xs flex items-start gap-2.5 animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* SECTOR 1: STUDENT LOGIN (Name, Admission No, Class, Registered Mobile) */}
            {activeSector === 'student' && (
              <form onSubmit={handleStudentSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#0084FF]/20 text-[#00C2FF] rounded-2xl border border-[#0084FF]/30">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Student Portal Sign In</h3>
                      <p className="text-xs text-slate-400">Required: Name, Admission Number, Class & Mobile</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#00C2FF] bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Role: Student
                  </span>
                </div>

                {/* 1. Student Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Student Full Name <span className="text-rose-400">*</span>
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

                {/* 2. Admission Number & 3. Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Admission Number <span className="text-rose-400">*</span>
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
                      Enrolled Class <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={studentClass}
                        onChange={(e) => setStudentClass(e.target.value)}
                        placeholder="e.g. Class 8-A"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Registered Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Registered Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={studentMobile}
                      onChange={(e) => setStudentMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2FF] shrink-0" />
                  <span>Personal student records (marks, attendance, AI tutoring) are protected by RBAC.</span>
                </div>

                {/* Institutional hCaptcha Security Challenge */}
                <HCaptchaSecurityWidget
                  siteKey="c246a8cc-fdc2-4734-911c-8194ee5eb8ec"
                  theme="dark"
                  onVerify={(token) => setCaptchaToken(token)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-[#0084FF] hover:bg-[#0070DB] text-white font-bold shadow-lg shadow-[#0084FF]/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Student Details...' : 'Authenticate & Enter Student Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 2: PARENT LOGIN (Child Name, Child Adm No, Child Class, Registered Mobile) */}
            {activeSector === 'parent' && (
              <form onSubmit={handleParentSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Parent / Guardian Portal Sign In</h3>
                      <p className="text-xs text-slate-400">Required: Ward's Name, Admission No, Class & Parent Mobile</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Role: Parent
                  </span>
                </div>

                {/* 1. Ward Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Ward / Student Full Name <span className="text-rose-400">*</span>
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

                {/* 2. Admission Number & 3. Class */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Ward's Admission Number <span className="text-rose-400">*</span>
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
                      Ward's Enrolled Class <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={parentChildClass}
                        onChange={(e) => setParentChildClass(e.target.value)}
                        placeholder="e.g. Class 8-A"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Registered Parent Mobile */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Parent Registered Mobile Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      required
                      value={parentMobile}
                      onChange={(e) => setParentMobile(e.target.value)}
                      placeholder="e.g. 9876543211"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Enables live daily bus GPS, classroom notifications, and verified report card downloads.</span>
                </div>

                {/* Institutional hCaptcha Security Challenge */}
                <HCaptchaSecurityWidget
                  siteKey="c246a8cc-fdc2-4734-911c-8194ee5eb8ec"
                  theme="dark"
                  onVerify={(token) => setCaptchaToken(token)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Ward Details...' : 'Authenticate & Enter Parent Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 3: TEACHER LOGIN (Official ID + Secret Code: cbse 2026) */}
            {activeSector === 'teacher' && (
              <form onSubmit={handleTeacherSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Faculty & Teacher Sign In</h3>
                      <p className="text-xs text-slate-400">Required: Official School ID & Secret Authorization Code</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Role: Teacher
                  </span>
                </div>

                {/* 1. School Official ID / Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    School Official ID / Email <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={teacherOfficialId}
                      onChange={(e) => setTeacherOfficialId(e.target.value)}
                      placeholder="e.g. teacher@dmps.edu.in or TCH-8801"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* 2. School Official Secret Code */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Official Secret Code <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-amber-400/90 font-mono bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                      Secret Code: cbse 2026
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showTeacherSecret ? 'text' : 'password'}
                      required
                      value={teacherSecretCode}
                      onChange={(e) => setTeacherSecretCode(e.target.value)}
                      placeholder="Enter secret code (cbse 2026)"
                      className="w-full pl-10 pr-10 py-2.5 bg-[#061330] border border-[#143474] focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeacherSecret(!showTeacherSecret)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showTeacherSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Authorized Faculty access: grants attendance marking, exam grade uploads, and student circulars.</span>
                </div>

                {/* Institutional hCaptcha Security Challenge */}
                <HCaptchaSecurityWidget
                  siteKey="c246a8cc-fdc2-4734-911c-8194ee5eb8ec"
                  theme="dark"
                  onVerify={(token) => setCaptchaToken(token)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-lg shadow-amber-600/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Faculty Clearance...' : 'Authorize & Enter Faculty Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 4: PRINCIPAL LOGIN (Official ID + Secret Code: cbse 2026) */}
            {activeSector === 'principal' && (
              <form onSubmit={handlePrincipalSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-purple-500/20 text-purple-400 rounded-2xl border border-purple-500/30">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Principal & Executive Sign In</h3>
                      <p className="text-xs text-slate-400">Required: School Official ID & Administration Secret Code</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    Role: Principal / Admin
                  </span>
                </div>

                {/* 1. Official Admin ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    School Official ID / Email <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={principalOfficialId}
                      onChange={(e) => setPrincipalOfficialId(e.target.value)}
                      placeholder="e.g. principal@dmps.edu.in or ADM-001"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* 2. School Official Secret Code */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Official Secret Code <span className="text-rose-400">*</span>
                    </label>
                    <span className="text-[10px] text-purple-400/90 font-mono bg-purple-950/40 px-2 py-0.5 rounded border border-purple-800/40">
                      Secret Code: cbse 2026
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPrincipalSecret ? 'text' : 'password'}
                      required
                      value={principalSecretCode}
                      onChange={(e) => setPrincipalSecretCode(e.target.value)}
                      placeholder="Enter secret code (cbse 2026)"
                      className="w-full pl-10 pr-10 py-2.5 bg-[#061330] border border-[#143474] focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPrincipalSecret(!showPrincipalSecret)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPrincipalSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#061330] border border-[#143474] rounded-xl text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Executive Principal clearance: Institutional macro metrics, CBSE compliance, staff roster, and audit logs.</span>
                </div>

                {/* Institutional hCaptcha Security Challenge */}
                <HCaptchaSecurityWidget
                  siteKey="c246a8cc-fdc2-4734-911c-8194ee5eb8ec"
                  theme="dark"
                  onVerify={(token) => setCaptchaToken(token)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-600/25 cursor-pointer"
                  isLoading={isLoading}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying Executive Clearance...' : 'Authorize & Enter Management Portal'}
                </Button>
              </form>
            )}

            {/* SECTOR 5: FIRST-TIME REGISTRATION VIA OTP */}
            {activeSector === 'first-time' && (
              <form onSubmit={handleFirstTimeSubmit} className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#143474] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-cyan-500/20 text-cyan-400 rounded-2xl border border-cyan-500/30">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">First-Time User Registration</h3>
                      <p className="text-xs text-slate-400">Verify your registered mobile number via SMS OTP</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-[#061330] px-2.5 py-1 rounded-full border border-[#143474]">
                    OTP Verification
                  </span>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Select Your Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFtRole('student')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                        ftRole === 'student'
                          ? 'bg-[#0084FF]/20 border-[#0084FF] text-[#00C2FF]'
                          : 'bg-[#061330] border-[#143474] text-slate-400'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFtRole('parent')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                        ftRole === 'parent'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-[#061330] border-[#143474] text-slate-400'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Parent</span>
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={ftName}
                      onChange={(e) => setFtName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl text-white outline-none transition-all text-xs placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Mobile & OTP Trigger */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    10-Digit Registered Mobile
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        value={ftMobile}
                        onChange={(e) => setFtMobile(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono placeholder:text-slate-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="px-3.5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-xs font-bold shrink-0 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {isSendingOtp ? 'Sending...' : 'Get OTP'}
                    </button>
                  </div>
                </div>

                {otpSentMessage && (
                  <div className="p-2.5 bg-cyan-950/60 border border-cyan-800/80 rounded-xl text-cyan-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-cyan-400" />
                    <span>{otpSentMessage}</span>
                  </div>
                )}

                {/* OTP Input */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    6-Digit Verification OTP (Demo: 123456)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={ftOtp}
                      onChange={(e) => setFtOtp(e.target.value)}
                      placeholder="123456"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#061330] border border-[#143474] focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 rounded-xl text-white outline-none transition-all text-xs font-mono tracking-widest text-center placeholder:text-slate-500"
                    />
                  </div>
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="terms-check"
                    checked={ftAgreed}
                    onChange={(e) => setFtAgreed(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-[#143474] bg-[#061330] text-[#0084FF] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="terms-check" className="text-xs text-slate-300 select-none">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => setIsTermsModalOpen(true)}
                      className="text-[#00C2FF] underline hover:text-white"
                    >
                      Terms of Service & Privacy Policy
                    </button>{' '}
                    under DPDP Act & CBSE guidelines.
                  </label>
                </div>

                {/* Institutional hCaptcha Security Challenge */}
                <HCaptchaSecurityWidget
                  siteKey="c246a8cc-fdc2-4734-911c-8194ee5eb8ec"
                  theme="dark"
                  onVerify={(token) => setCaptchaToken(token)}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold shadow-lg shadow-cyan-600/25 cursor-pointer"
                  isLoading={isLoading}
                  disabled={!ftAgreed}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isLoading ? 'Verifying OTP...' : 'Complete Verification & Enter Portal'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 sm:p-6 text-center text-[11px] text-slate-400 z-10 border-t border-[#143474] max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>SchoolSaathi AI • Institutional ERP Gateway</span>
        </div>
        <button
          type="button"
          onClick={() => setIsTermsModalOpen(true)}
          className="text-slate-400 hover:text-white transition-colors underline cursor-pointer"
        >
          Terms of Service, DPDP Privacy & School Data Compliance
        </button>
      </footer>

      {/* Legal & Policy Modal */}
      <TermsPolicyModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
};
