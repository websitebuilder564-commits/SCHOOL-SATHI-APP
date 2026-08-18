import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { teacherService } from '../../services/teacherService';
import { attendanceService } from '../../services/attendanceService';
import { escalationService } from '../../services/escalationService';
import { analyticsService } from '../../services/analyticsService';
import { notificationService } from '../../services/notificationService';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AttendanceMarkerTable } from '../../components/attendance/AttendanceMarkerTable';
import { AttendanceAreaChart } from '../../components/analytics/AttendanceAreaChart';
import { ClassComparisonBarChart } from '../../components/analytics/ClassComparisonBarChart';
import { ChatInterface } from '../../components/chat/ChatInterface';
import { VoiceInteractionPanel } from '../../components/voice/VoiceInteractionPanel';
import { AIAvatar, AvatarMode } from '../../components/AIAvatar/AIAvatar';
import { ApiExplorer } from '../../components/gateway/ApiExplorer';
import { EscalationModal } from '../../components/support/EscalationModal';
import { EscalationTicketList } from '../../components/support/EscalationTicketList';
import { SecuritySandbox } from '../../components/security/SecuritySandbox';
import { 
  UserCheck, 
  Users, 
  CalendarCheck, 
  Calendar, 
  Sparkles, 
  LifeBuoy, 
  Clock, 
  Award, 
  FileText, 
  BarChart3,
  CheckCircle2,
  AlertCircle,
  Bell,
  BookOpen,
  Search
} from 'lucide-react';

interface TeacherPortalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TeacherPortal: React.FC<TeacherPortalProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { t, language, setLanguage, languageOptions } = useLanguage();

  const [selectedClass, setSelectedClass] = useState('8A');
  const [avatarMode, setAvatarMode] = useState<AvatarMode>('idle');
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);
  const [aiViewMode, setAiViewMode] = useState<'chat' | 'voice' | 'avatar' | 'api'>('chat');

  if (!user) return null;

  const assignedClasses = teacherService.getAssignedClasses(user);
  const studentsRes = teacherService.getStudentsForClass(user, selectedClass);
  const students = studentsRes.data || [];
  const teacherSchedule = teacherService.getTeacherSchedule(user);
  const tickets = escalationService.getRequestsForUser(user);
  const analyticsData = analyticsService.getInstitutionalAnalytics(user).data;

  return (
    <div className="space-y-6">
      {/* Tab: Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-amber-900 via-orange-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-700/60 inline-flex items-center gap-1.5 mb-3">
                <UserCheck className="w-3 h-3" />
                Faculty Portal • {user.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Class Teacher Dashboard
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 mt-2 leading-relaxed">
                Assigned Grades: <strong className="text-white">8A (Class Teacher), 8B, 9A</strong> • Department: Mathematics
              </p>

              {/* Quick Actions Row */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('attendance')}
                  className="bg-white text-amber-950 hover:bg-slate-100 font-semibold"
                  leftIcon={<CalendarCheck className="w-3.5 h-3.5 text-amber-600" />}
                >
                  {t('markAttendance')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('analytics')}
                  className="bg-amber-800/40 text-white hover:bg-amber-800/70 border-amber-700/60"
                  leftIcon={<BarChart3 className="w-3.5 h-3.5" />}
                >
                  Class Analytics
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('xyzai')}
                  className="bg-amber-800/40 text-white hover:bg-amber-800/70 border-amber-700/60"
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  {t('openXyzAi')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEscalationOpen(true)}
                  className="bg-amber-800/40 text-white hover:bg-amber-800/70 border-amber-700/60"
                  leftIcon={<LifeBuoy className="w-3.5 h-3.5" />}
                >
                  Inquiries ({tickets.length})
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Class 8A Strength"
              value="42 Students"
              subtitle="100% Verified enrollment"
              icon={<Users className="w-5 h-5 text-indigo-600" />}
            />
            <StatCard
              title="Today's Attendance Rate"
              value="92.4%"
              subtitle="Class 8A Session Complete"
              icon={<CalendarCheck className="w-5 h-5 text-emerald-600" />}
            />
            <StatCard
              title="Assigned Periods Today"
              value="5 Periods"
              subtitle="Next: Class 8A (Period 3)"
              icon={<Clock className="w-5 h-5 text-amber-600" />}
            />
            <StatCard
              title="Open Parent Queries"
              value={`${tickets.filter((t) => t.status === 'SUBMITTED' || t.status === 'ACCEPTED').length} Active`}
              subtitle="Escalation tickets assigned"
              icon={<LifeBuoy className="w-5 h-5 text-purple-600" />}
            />
          </div>

          {/* Teacher Schedule & Quick Attendance View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader
                  title="Today's Teaching Timetable"
                  subtitle="Scheduled lecture periods and room assignments"
                />
                <CardContent className="space-y-2.5">
                  {teacherSchedule.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50 hover:bg-amber-50/40 rounded-xl border border-slate-200/70 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{item.subject} • Class {item.class}</p>
                          <p className="text-[11px] text-slate-500">Room: <span className="text-amber-700 font-semibold">{item.room}</span></p>
                        </div>
                      </div>

                      <span className="text-xs font-mono font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader
                  title="Class Attendance Quick Marker"
                  subtitle={`Roster for Class ${selectedClass}`}
                  action={
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setActiveTab('attendance')}
                    >
                      Full Marking Sheet →
                    </Button>
                  }
                />
                <CardContent className="space-y-2">
                  <p className="text-xs text-slate-600 mb-3">
                    Daily attendance for Class {selectedClass} can be marked, verified, and saved with cryptographic audit logs.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Selected Class Section:</span>
                      <strong className="text-slate-900">Class {selectedClass}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Enrolled Students:</span>
                      <strong className="text-slate-900">{students.length} Students</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Attendance Policy:</span>
                      <span className="text-emerald-700 font-semibold">CBSE 75% Mandatory</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Attendance */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Class Selector Header */}
          <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider px-2">
              Select Class:
            </span>
            {assignedClasses.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedClass === cls
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Class {cls} {cls === '8A' ? '(Class Teacher)' : ''}
              </button>
            ))}
          </div>

          <AttendanceMarkerTable
            students={students}
            className={selectedClass}
            onAttendanceSaved={() => {}}
          />
        </div>
      )}

      {/* Tab: Classes Overview */}
      {activeTab === 'classes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Teaching Assignments & Curriculum</h3>
              <p className="text-xs text-slate-500">Department: Mathematics • Class Teacher: Class 8A</p>
            </div>
            <Badge variant="warning" size="md">
              {assignedClasses.length} Assigned Sections
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { cls: '8A', isClassTeacher: true, subject: 'Mathematics & Geometry', students: 42, room: 'Room 204', syllabus: 68, avgAtt: 92.4 },
              { cls: '8B', isClassTeacher: false, subject: 'Mathematics Core', students: 38, room: 'Room 206', syllabus: 62, avgAtt: 89.1 },
              { cls: '9A', isClassTeacher: false, subject: 'Advanced Algebra', students: 40, room: 'Room 302', syllabus: 55, avgAtt: 93.8 },
            ].map((c) => (
              <Card key={c.cls} className="border border-slate-200 hover:border-amber-400 transition-all">
                <CardHeader
                  title={`Class ${c.cls}`}
                  subtitle={c.subject}
                  action={
                    c.isClassTeacher ? (
                      <Badge variant="warning" size="sm">Class Teacher</Badge>
                    ) : (
                      <Badge variant="primary" size="sm">Subject Faculty</Badge>
                    )
                  }
                />
                <CardContent className="space-y-4">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Room Location:</span>
                      <strong className="text-slate-900">{c.room}</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Enrolled Students:</span>
                      <strong className="text-slate-900">{c.students} Students</strong>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Average Attendance:</span>
                      <strong className="text-emerald-600 font-bold">{c.avgAtt}%</strong>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1 font-semibold">
                      <span className="text-slate-600">Syllabus Completion</span>
                      <span className="text-amber-600">{c.syllabus}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full transition-all"
                        style={{ width: `${c.syllabus}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold"
                      onClick={() => {
                        setSelectedClass(c.cls);
                        setActiveTab('attendance');
                      }}
                    >
                      Mark Attendance
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => {
                        setSelectedClass(c.cls);
                        setActiveTab('students');
                      }}
                    >
                      Roster
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Today's Teaching Schedule Table */}
          <Card>
            <CardHeader
              title="Daily Lecture Timetable"
              subtitle="Scheduled teaching periods and laboratory sessions"
            />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Period</th>
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Class</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Room</th>
                      <th className="py-3 px-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teacherSchedule.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-amber-700">Period {idx + 1}</td>
                        <td className="py-3 px-4 font-mono text-slate-600">{item.time}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">Class {item.class}</td>
                        <td className="py-3 px-4 text-slate-800">{item.subject}</td>
                        <td className="py-3 px-4 text-slate-600">{item.room}</td>
                        <td className="py-3 px-4 text-right">
                          <Badge variant={idx < 2 ? 'success' : 'primary'} size="sm">
                            {idx < 2 ? 'Completed' : 'Upcoming'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Students Roster */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enrolled Student Directory</h3>
              <p className="text-xs text-slate-500">Student profiles, parent guardians, and attendance telemetry</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Class:
              </span>
              {assignedClasses.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedClass === cls
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Class {cls}
                </button>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader
              title={`Student Roster - Class ${selectedClass}`}
              subtitle={`Showing enrolled students and verified parent guardian contacts (${students.length} students)`}
            />
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 w-16">Roll #</th>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Admission #</th>
                      <th className="py-3 px-4">Parent / Guardian</th>
                      <th className="py-3 px-4 text-center">Attendance</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {students.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-800">{st.rollNo}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={st.avatar}
                              alt={st.name}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-bold text-slate-900">{st.name}</p>
                              <p className="text-[10px] text-slate-400">{st.parentEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">{st.admissionNo}</td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-slate-800">{st.parentName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{st.parentPhone}</p>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`font-bold ${
                              st.overallAttendance >= 90
                                ? 'text-emerald-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {st.overallAttendance}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedClass(st.class);
                              setActiveTab('attendance');
                            }}
                          >
                            Attendance
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab: Faculty Notifications */}
      {activeTab === 'notifications' && (
        <Card>
          <CardHeader
            title="Faculty Notices & Staff Bulletins"
            subtitle="Official institutional circulars, exam schedules, and department notices"
          />
          <CardContent className="divide-y divide-slate-100 p-0">
            {notificationService.getNotificationsForRole('teacher').map((n) => (
              <div key={n.id} className="p-5 hover:bg-slate-50 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 shrink-0">
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

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && analyticsData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <AttendanceAreaChart
                data={analyticsData.monthlyVariance}
                title="Class 8A Attendance Curve"
                subtitle="Weekly attendance rates over the 2026 academic semester"
              />
            </div>
            <div className="lg:col-span-5">
              <ClassComparisonBarChart
                data={analyticsData.classStats}
                title="Assigned Classes Comparison"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Support / Escalation */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <EscalationTicketList
            tickets={tickets}
            onOpenNewTicketModal={() => setIsEscalationOpen(true)}
          />
        </div>
      )}

      {/* Tab: XYZ AI Integration */}
      {activeTab === 'xyzai' && (
        <div className="space-y-6">
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
                    ? 'bg-amber-600 text-white shadow-xs'
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
                  onOpenEscalation={() => setIsEscalationOpen(true)}
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

      {/* Tab: Security Sandbox */}
      {activeTab === 'security' && <SecuritySandbox />}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <Card>
          <CardHeader
            title={t('settings')}
            subtitle="Configure faculty portal preferences and language"
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
                        ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-500'
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
        defaultType="MANAGEMENT"
      />
    </div>
  );
};
