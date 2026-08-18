import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { studentService } from '../../services/studentService';
import { attendanceService } from '../../services/attendanceService';
import { escalationService } from '../../services/escalationService';
import { notificationService } from '../../services/notificationService';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AttendanceStatsCard } from '../../components/attendance/AttendanceStatsCard';
import { AttendanceCalendar } from '../../components/attendance/AttendanceCalendar';
import { ChatInterface } from '../../components/chat/ChatInterface';
import { VoiceInteractionPanel } from '../../components/voice/VoiceInteractionPanel';
import { AIAvatar, AvatarMode } from '../../components/AIAvatar/AIAvatar';
import { ApiExplorer } from '../../components/gateway/ApiExplorer';
import { EscalationModal } from '../../components/support/EscalationModal';
import { EscalationTicketList } from '../../components/support/EscalationTicketList';
import { SecuritySandbox } from '../../components/security/SecuritySandbox';
import { 
  CalendarCheck, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  LifeBuoy, 
  Clock, 
  Award, 
  FileText,
  UserCheck,
  Building2,
  Bell,
  Globe,
  ShieldAlert
} from 'lucide-react';

interface StudentPortalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { t, language, setLanguage, languageOptions } = useLanguage();

  const [avatarMode, setAvatarMode] = useState<AvatarMode>('idle');
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);
  const [escalationType, setEscalationType] = useState<'TEACHER' | 'MANAGEMENT'>('TEACHER');
  const [aiViewMode, setAiViewMode] = useState<'chat' | 'voice' | 'avatar' | 'api'>('chat');

  if (!user) return null;

  const studentId = user.studentId || 'STU001';
  const studentRes = studentService.getStudentById(studentId, user);
  const student = studentRes.data || studentService.getAllStudents()[0] || {
    id: 'STU001',
    admissionNo: 'ADM-2022-801',
    name: user.name || 'Rahul Sharma',
    class: '8',
    section: 'A',
    rollNo: 14,
    gender: 'Male',
    dob: '2012-05-18',
    parentName: 'Anita Sharma',
    parentPhone: '+91 98765 43211',
    parentEmail: 'parent@demo.com',
    avatar: user.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'O+',
    address: 'Flat 402, Green Valley Apartments, Delhi Road, New Delhi',
    overallAttendance: 91.2,
    totalPresent: 114,
    totalAbsent: 11,
    totalLate: 2,
    workingDays: 125,
  };

  const grades = studentService.getStudentGrades(student.id);
  const schedule = studentService.getStudentSchedule(student.class);
  const attendanceRecords = attendanceService.getRecordsForStudent(student.id);
  const tickets = escalationService.getRequestsForUser(user);
  const notifications = notificationService.getNotificationsForRole('student');

  const openSupportModal = (type: 'TEACHER' | 'MANAGEMENT') => {
    setEscalationType(type);
    setIsEscalationOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Tab: Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-700/60 inline-flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3 h-3" />
                Student Portal • Session 2026-27
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {student.name}!
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 mt-2 leading-relaxed">
                Class {student.class}{student.section} • Roll #{student.rollNo} • Admission #{student.admissionNo}
              </p>

              {/* Quick Actions Row */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('attendance')}
                  className="bg-white text-indigo-950 hover:bg-slate-100 font-semibold"
                  leftIcon={<CalendarCheck className="w-3.5 h-3.5 text-indigo-600" />}
                >
                  {t('viewAttendance')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('schedule')}
                  className="bg-indigo-800/40 text-white hover:bg-indigo-800/70 border-indigo-700/60"
                  leftIcon={<Calendar className="w-3.5 h-3.5" />}
                >
                  {t('viewSchedule')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('xyzai')}
                  className="bg-indigo-800/40 text-white hover:bg-indigo-800/70 border-indigo-700/60"
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  {t('openXyzAi')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openSupportModal('TEACHER')}
                  className="bg-indigo-800/40 text-white hover:bg-indigo-800/70 border-indigo-700/60"
                  leftIcon={<LifeBuoy className="w-3.5 h-3.5" />}
                >
                  {t('contactSchool')}
                </Button>
              </div>
            </div>
          </div>

          {/* Section 6 Attendance Card (91.2%, 114 Present, 11 Absent, 125 Working Days) */}
          <AttendanceStatsCard
            overallPercentage={student.overallAttendance}
            presentDays={student.totalPresent}
            absentDays={student.totalAbsent}
            workingDays={student.workingDays}
            lateDays={student.totalLate}
            studentName={student.name}
          />

          {/* 2-Column Grid: Today's Schedule & Academic Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Today's Schedule */}
            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader
                  title={t('todaySchedule')}
                  subtitle="Monday timetable for Class 8A"
                  action={
                    <button
                      onClick={() => setActiveTab('schedule')}
                      className="text-xs text-indigo-600 font-semibold hover:text-indigo-800"
                    >
                      Full Week →
                    </button>
                  }
                />
                <CardContent className="space-y-2.5">
                  {schedule.slice(0, 5).map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 hover:bg-indigo-50/40 rounded-xl border border-slate-200/70 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.subject}</p>
                          <p className="text-[11px] text-slate-500">
                            {item.teacherName} • <span className="text-indigo-600 font-medium">{item.room}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-mono font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Academic Performance Summary */}
            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader
                  title={t('academicSummary')}
                  subtitle="Mid-Term scores and subject grades"
                  action={
                    <button
                      onClick={() => setActiveTab('academics')}
                      className="text-xs text-indigo-600 font-semibold hover:text-indigo-800"
                    >
                      View Report Card →
                    </button>
                  }
                />
                <CardContent className="space-y-3">
                  {grades.slice(0, 4).map((g) => (
                    <div
                      key={g.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{g.subject}</p>
                          <Badge variant="primary" size="sm">{g.grade}</Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">{g.teacher}</p>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-extrabold text-slate-900">
                          {g.totalScore}<span className="text-xs font-normal text-slate-400">/{g.maxScore}</span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-semibold">
                          {g.attendancePct}% Attended
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent School Notifications */}
          <Card>
            <CardHeader
              title={t('notifications')}
              subtitle="Latest campus circulars and academic notices"
              action={
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="text-xs text-indigo-600 font-semibold hover:text-indigo-800"
                >
                  All Notifications →
                </button>
              }
            />
            <CardContent className="divide-y divide-slate-100 p-0">
              {notifications.slice(0, 3).map((n) => (
                <div key={n.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 shrink-0 mt-0.5">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{n.date}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Attendance */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <AttendanceStatsCard
            overallPercentage={student.overallAttendance}
            presentDays={student.totalPresent}
            absentDays={student.totalAbsent}
            workingDays={student.workingDays}
            lateDays={student.totalLate}
            studentName={student.name}
          />

          <AttendanceCalendar
            studentId={student.id}
            records={attendanceRecords}
          />
        </div>
      )}

      {/* Tab: Academics */}
      {activeTab === 'academics' && (
        <Card>
          <CardHeader
            title="Academic Performance & Grade Transcript"
            subtitle="Curriculum results, semester scores, and faculty feedback"
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Instructor</th>
                    <th className="py-3 px-4 text-center">Mid-Term (50)</th>
                    <th className="py-3 px-4 text-center">Final (50)</th>
                    <th className="py-3 px-4 text-center">Total (100)</th>
                    <th className="py-3 px-4 text-center">Grade</th>
                    <th className="py-3 px-4">Faculty Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {grades.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="py-3 px-4 font-bold text-slate-900">{g.subject}</td>
                      <td className="py-3 px-4 text-slate-600">{g.teacher}</td>
                      <td className="py-3 px-4 text-center font-mono">{g.midtermScore}</td>
                      <td className="py-3 px-4 text-center font-mono">{g.finalScore}</td>
                      <td className="py-3 px-4 text-center font-bold text-slate-900">{g.totalScore}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge variant="primary" size="sm">{g.grade}</Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500 text-[11px]">{g.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab: Schedule */}
      {activeTab === 'schedule' && (
        <Card>
          <CardHeader
            title="Class Timetable & Schedule"
            subtitle="Weekly schedule for Class 8 Section A"
          />
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Monday', 'Tuesday', 'Wednesday'].map((day) => {
                const daySchedule = schedule.filter((s) => s.day === day);
                return (
                  <div key={day} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3 pb-2 border-b border-slate-200">
                      {day}
                    </h4>
                    <div className="space-y-2">
                      {daySchedule.map((item) => (
                        <div key={item.id} className="p-2.5 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                          <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                          <p className="text-xs font-bold text-slate-900 mt-0.5">{item.subject}</p>
                          <p className="text-[11px] text-slate-500">{item.teacherName} • {item.room}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab: Notifications */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader
            title={t('notifications')}
            subtitle="Official notifications, circulars, and attendance alerts"
          />
          <CardContent className="divide-y divide-slate-100 p-0">
            {notifications.map((n) => (
              <div key={n.id} className="p-5 hover:bg-slate-50 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <Bell className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900">{n.title}</h4>
                    <span className="text-[10px] text-slate-400 font-mono">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tab: XYZ AI Integration */}
      {activeTab === 'xyzai' && (
        <div className="space-y-6">
          {/* Sub Navigation for AI Views */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 flex-wrap">
            {[
              { id: 'chat', label: t('aiChat'), icon: <Sparkles className="w-3.5 h-3.5" /> },
              { id: 'voice', label: t('aiVoice'), icon: <Clock className="w-3.5 h-3.5" /> },
              { id: 'avatar', label: t('aiAvatar'), icon: <Award className="w-3.5 h-3.5" /> },
              { id: 'api', label: t('apiExplorer'), icon: <FileText className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setAiViewMode(tab.id as typeof aiViewMode)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  aiViewMode === tab.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {aiViewMode === 'chat' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <ChatInterface
                  onOpenEscalation={openSupportModal}
                  onAvatarModeChange={setAvatarMode}
                />
              </div>
              <div className="lg:col-span-4">
                <AIAvatar mode={avatarMode} onModeChange={setAvatarMode} />
              </div>
            </div>
          )}

          {aiViewMode === 'voice' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <VoiceInteractionPanel onAvatarModeChange={setAvatarMode} />
              </div>
              <div className="lg:col-span-4">
                <AIAvatar mode={avatarMode} onModeChange={setAvatarMode} />
              </div>
            </div>
          )}

          {aiViewMode === 'avatar' && (
            <AIAvatar mode={avatarMode} onModeChange={setAvatarMode} />
          )}

          {aiViewMode === 'api' && <ApiExplorer />}
        </div>
      )}

      {/* Tab: Support */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="p-5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{t('talkToTeacher')}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Academic mentoring, doubt clarification, & leave queries
                </p>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => openSupportModal('TEACHER')}
                leftIcon={<UserCheck className="w-3.5 h-3.5" />}
              >
                Open Ticket
              </Button>
            </Card>

            <Card className="p-5 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">{t('contactManagement')}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Administrative, school bus, fee, & institutional inquiries
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openSupportModal('MANAGEMENT')}
                leftIcon={<Building2 className="w-3.5 h-3.5 text-purple-600" />}
              >
                Open Ticket
              </Button>
            </Card>
          </div>

          <EscalationTicketList
            tickets={tickets}
            onOpenNewTicketModal={() => openSupportModal('TEACHER')}
          />
        </div>
      )}

      {/* Tab: Security Sandbox */}
      {activeTab === 'security' && <SecuritySandbox />}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader
            title={t('settings')}
            subtitle="Configure portal preferences, language, and security"
          />
          <CardContent className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t('language')} (Multi-Lingual Localization)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => setLanguage(opt.code)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2 text-xs font-semibold transition-all ${
                      language === opt.code
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-1 ring-indigo-500'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-base">{opt.flag}</span>
                    <div>
                      <div>{opt.nativeName}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{opt.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escalation Modal */}
      <EscalationModal
        isOpen={isEscalationOpen}
        onClose={() => setIsEscalationOpen(false)}
        defaultType={escalationType}
        studentId={student.id}
        studentName={student.name}
      />
    </div>
  );
};
