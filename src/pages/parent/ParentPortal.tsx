import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { parentService } from '../../services/parentService';
import { studentService } from '../../services/studentService';
import { attendanceService } from '../../services/attendanceService';
import { escalationService } from '../../services/escalationService';
import { notificationService } from '../../services/notificationService';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AttendanceStatsCard } from '../../components/attendance/AttendanceStatsCard';
import { AttendanceCalendar } from '../../components/attendance/AttendanceCalendar';
import { ChildSelector } from '../../components/layout/ChildSelector';
import { ChatInterface } from '../../components/chat/ChatInterface';
import { VoiceInteractionPanel } from '../../components/voice/VoiceInteractionPanel';
import { AIAvatar, AvatarMode } from '../../components/AIAvatar/AIAvatar';
import { ApiExplorer } from '../../components/gateway/ApiExplorer';
import { EscalationModal } from '../../components/support/EscalationModal';
import { EscalationTicketList } from '../../components/support/EscalationTicketList';
import { SecuritySandbox } from '../../components/security/SecuritySandbox';
import { 
  Users, 
  CalendarCheck, 
  Calendar, 
  Sparkles, 
  LifeBuoy, 
  Clock, 
  Award, 
  FileText,
  UserCheck,
  Building2,
  Bell,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ParentPortalProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ activeTab, setActiveTab }) => {
  const { user } = useAuth();
  const { t, language, setLanguage, languageOptions } = useLanguage();

  const [avatarMode, setAvatarMode] = useState<AvatarMode>('idle');
  const [isEscalationOpen, setIsEscalationOpen] = useState(false);
  const [escalationType, setEscalationType] = useState<'TEACHER' | 'MANAGEMENT'>('TEACHER');
  const [aiViewMode, setAiViewMode] = useState<'chat' | 'voice' | 'avatar' | 'api'>('chat');

  if (!user) return null;

  const rawChildren = parentService.getLinkedChildren(user);
  const children = rawChildren.length > 0 ? rawChildren : [
    studentService.getStudentById('STU001', user).data || {
      id: 'STU001',
      admissionNo: 'ADM-2022-801',
      name: 'Rahul Sharma',
      class: '8',
      section: 'A',
      rollNo: 14,
      gender: 'Male',
      dob: '2012-05-18',
      parentName: user.name || 'Anita Sharma',
      parentPhone: user.phone || '+91 98765 43211',
      parentEmail: user.email || 'parent@demo.com',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      bloodGroup: 'O+',
      address: 'Flat 402, Green Valley Apartments, Delhi Road, New Delhi',
      overallAttendance: 91.2,
      totalPresent: 114,
      totalAbsent: 11,
      totalLate: 2,
      workingDays: 125,
    },
    studentService.getStudentById('STU002', user).data || {
      id: 'STU002',
      admissionNo: 'ADM-2024-502',
      name: 'Priya Sharma',
      class: '5',
      section: 'B',
      rollNo: 8,
      gender: 'Female',
      dob: '2015-09-22',
      parentName: user.name || 'Anita Sharma',
      parentPhone: user.phone || '+91 98765 43211',
      parentEmail: user.email || 'parent@demo.com',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      bloodGroup: 'A+',
      address: 'Flat 402, Green Valley Apartments, Delhi Road, New Delhi',
      overallAttendance: 94.4,
      totalPresent: 118,
      totalAbsent: 7,
      totalLate: 1,
      workingDays: 125,
    }
  ];

  const [selectedChildId, setSelectedChildId] = useState<string>(
    children[0]?.id || 'STU001'
  );

  const currentChild = children.find((c) => c.id === selectedChildId) || children[0];

  const grades = studentService.getStudentGrades(currentChild.id);
  const schedule = studentService.getStudentSchedule(currentChild.class);
  const attendanceRecords = attendanceService.getRecordsForStudent(currentChild.id);
  const tickets = escalationService.getRequestsForUser(user);
  const notifications = notificationService.getNotificationsForRole('parent');

  const openSupportModal = (type: 'TEACHER' | 'MANAGEMENT') => {
    setEscalationType(type);
    setIsEscalationOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Linked Children Multi-Child Switcher Banner */}
      <ChildSelector
        childrenList={children}
        selectedChildId={currentChild.id}
        onSelectChild={(id) => setSelectedChildId(id)}
      />

      {/* Tab: Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/60 inline-flex items-center gap-1.5 mb-3">
                <Users className="w-3 h-3" />
                Parent Guardian Portal • {user.name}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Monitoring {currentChild.name}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 mt-2 leading-relaxed">
                Class {currentChild.class}{currentChild.section} • Roll #{currentChild.rollNo} • Admission #{currentChild.admissionNo}
              </p>

              {/* Quick Actions Row */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setActiveTab('attendance')}
                  className="bg-white text-emerald-950 hover:bg-slate-100 font-semibold"
                  leftIcon={<CalendarCheck className="w-3.5 h-3.5 text-emerald-600" />}
                >
                  {t('viewAttendance')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('schedule')}
                  className="bg-emerald-800/40 text-white hover:bg-emerald-800/70 border-emerald-700/60"
                  leftIcon={<Calendar className="w-3.5 h-3.5" />}
                >
                  {t('viewSchedule')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab('xyzai')}
                  className="bg-emerald-800/40 text-white hover:bg-emerald-800/70 border-emerald-700/60"
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                >
                  {t('openXyzAi')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openSupportModal('TEACHER')}
                  className="bg-emerald-800/40 text-white hover:bg-emerald-800/70 border-emerald-700/60"
                  leftIcon={<UserCheck className="w-3.5 h-3.5" />}
                >
                  {t('talkToTeacher')}
                </Button>
              </div>
            </div>
          </div>

          {/* Child's Attendance Statistics Card */}
          <AttendanceStatsCard
            overallPercentage={currentChild.overallAttendance}
            presentDays={currentChild.totalPresent}
            absentDays={currentChild.totalAbsent}
            workingDays={currentChild.workingDays}
            lateDays={currentChild.totalLate}
            studentName={`${currentChild.name} (Class ${currentChild.class}${currentChild.section})`}
          />

          {/* 2-Column Grid: Child Academic Progress & Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader
                  title={`${currentChild.name}'s Academic Progress`}
                  subtitle="Latest test performance & grades"
                  action={
                    <button
                      onClick={() => setActiveTab('academics')}
                      className="text-xs text-emerald-600 font-semibold hover:text-emerald-800"
                    >
                      Report Card →
                    </button>
                  }
                />
                <CardContent className="space-y-3">
                  {grades.map((g) => (
                    <div
                      key={g.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-slate-900">{g.subject}</p>
                          <Badge variant="success" size="sm">{g.grade}</Badge>
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

            <div className="lg:col-span-6">
              <Card className="h-full">
                <CardHeader
                  title="Direct Faculty Contact"
                  subtitle="Communicate directly with your child's mentors"
                />
                <CardContent className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                        AK
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Mr. Amit Kumar</h4>
                        <p className="text-[11px] text-slate-500">Class Teacher • Mathematics</p>
                        <p className="text-[10px] text-emerald-600 font-medium mt-0.5">Office Hours: 02:00 PM - 03:30 PM</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openSupportModal('TEACHER')}
                    >
                      Message
                    </Button>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                        AD
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">School Administration</h4>
                        <p className="text-[11px] text-slate-500">Fees, Transport & Health Desk</p>
                        <p className="text-[10px] text-purple-600 font-medium mt-0.5">Helpline: +91 11 2345 6789</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openSupportModal('MANAGEMENT')}
                    >
                      Inquire
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tab: My Children Overview */}
      {activeTab === 'children' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enrolled Children & Dependents</h3>
              <p className="text-xs text-slate-500">Overview of all students registered under your guardian profile</p>
            </div>
            <Badge variant="success" size="md">
              {children.length} Active {children.length === 1 ? 'Child' : 'Children'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {children.map((child) => {
              const isSelected = child.id === currentChild.id;
              const childGrades = studentService.getStudentGrades(child.id);
              return (
                <Card
                  key={child.id}
                  className={`transition-all border-2 ${
                    isSelected
                      ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <CardHeader
                    title={child.name}
                    subtitle={`Class ${child.class}${child.section} • Roll #${child.rollNo} • Adm #${child.admissionNo}`}
                    action={
                      <Button
                        variant={isSelected ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedChildId(child.id)}
                        className={isSelected ? 'bg-emerald-600 hover:bg-emerald-700' : ''}
                      >
                        {isSelected ? 'Active Student' : 'Select Child'}
                      </Button>
                    }
                  />
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                      <img
                        src={child.avatar}
                        alt={child.name}
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40"
                      />
                      <div className="space-y-1 text-xs">
                        <p className="text-slate-600">Blood Group: <strong className="text-slate-900">{child.bloodGroup}</strong></p>
                        <p className="text-slate-600">Date of Birth: <strong className="text-slate-900">{child.dob}</strong></p>
                        <p className="text-slate-600">Gender: <strong className="text-slate-900">{child.gender}</strong></p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200">
                        <span className="text-[10px] text-emerald-600 block">Attendance</span>
                        <strong className="text-sm font-bold">{child.overallAttendance}%</strong>
                      </div>
                      <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl border border-blue-200">
                        <span className="text-[10px] text-blue-600 block">Present</span>
                        <strong className="text-sm font-bold">{child.totalPresent} Days</strong>
                      </div>
                      <div className="p-2.5 bg-purple-50 text-purple-900 rounded-xl border border-purple-200">
                        <span className="text-[10px] text-purple-600 block">Subjects</span>
                        <strong className="text-sm font-bold">{childGrades.length} Courses</strong>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => {
                          setSelectedChildId(child.id);
                          setActiveTab('attendance');
                        }}
                      >
                        Attendance
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => {
                          setSelectedChildId(child.id);
                          setActiveTab('academics');
                        }}
                      >
                        Report Card
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs"
                        onClick={() => {
                          setSelectedChildId(child.id);
                          setActiveTab('schedule');
                        }}
                      >
                        Timetable
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Teachers Directory */}
      {activeTab === 'teachers' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div>
              <h3 className="text-base font-bold text-slate-900">Assigned Faculty & Mentors</h3>
              <p className="text-xs text-slate-500">Direct directory of instructors teaching {currentChild.name} (Class {currentChild.class}{currentChild.section})</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => openSupportModal('TEACHER')}
              leftIcon={<UserCheck className="w-3.5 h-3.5" />}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Contact Class Teacher
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Mr. Amit Kumar', role: 'Class Teacher & Mathematics', experience: '12 Years', phone: '+91 98765 43212', email: 'amit.kumar@schoolsaathi.edu', hours: '02:00 PM - 03:30 PM', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
              { name: 'Dr. Sunita Verma', role: 'Science (Physics & Chemistry)', experience: '9 Years', phone: '+91 98765 43220', email: 'sunita.verma@schoolsaathi.edu', hours: '01:30 PM - 03:00 PM', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' },
              { name: 'Mr. Rajesh Rao', role: 'English Literature & Grammar', experience: '8 Years', phone: '+91 98765 43221', email: 'rajesh.rao@schoolsaathi.edu', hours: '03:00 PM - 04:00 PM', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
              { name: 'Ms. Meera Nair', role: 'Social Studies & History', experience: '7 Years', phone: '+91 98765 43222', email: 'meera.nair@schoolsaathi.edu', hours: '12:30 PM - 01:30 PM', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
            ].map((teacher, idx) => (
              <Card key={idx} className="p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher.avatar}
                        alt={teacher.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{teacher.name}</h4>
                        <p className="text-xs text-emerald-700 font-semibold">{teacher.role}</p>
                        <p className="text-[10px] text-slate-400">Teaching Exp: {teacher.experience}</p>
                      </div>
                    </div>
                    <Badge variant="primary" size="sm">Available</Badge>
                  </div>

                  <div className="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600 border border-slate-200/60">
                    <p>Visiting Hours: <strong className="text-slate-800">{teacher.hours}</strong></p>
                    <p>Direct Helpline: <span className="font-mono text-slate-800">{teacher.phone}</span></p>
                    <p>Official Email: <span className="text-indigo-600">{teacher.email}</span></p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                    onClick={() => openSupportModal('TEACHER')}
                  >
                    Send Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => alert(`Appointment requested with ${teacher.name} for tomorrow during ${teacher.hours}.`)}
                  >
                    Book Slot
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Attendance */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <AttendanceStatsCard
            overallPercentage={currentChild.overallAttendance}
            presentDays={currentChild.totalPresent}
            absentDays={currentChild.totalAbsent}
            workingDays={currentChild.workingDays}
            lateDays={currentChild.totalLate}
            studentName={`${currentChild.name} (Class ${currentChild.class}${currentChild.section})`}
          />

          <AttendanceCalendar
            studentId={currentChild.id}
            records={attendanceRecords}
          />
        </div>
      )}

      {/* Tab: Academics */}
      {activeTab === 'academics' && (
        <Card>
          <CardHeader
            title={`${currentChild.name}'s Academic Transcript`}
            subtitle="Semester examination marks and teacher evaluations"
          />
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Teacher</th>
                    <th className="py-3 px-4 text-center">Mid-Term (50)</th>
                    <th className="py-3 px-4 text-center">Final (50)</th>
                    <th className="py-3 px-4 text-center">Total (100)</th>
                    <th className="py-3 px-4 text-center">Grade</th>
                    <th className="py-3 px-4">Evaluation Remark</th>
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
                        <Badge variant="success" size="sm">{g.grade}</Badge>
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
            title={`${currentChild.name}'s Daily Timetable`}
            subtitle={`Weekly timetable for Class ${currentChild.class}${currentChild.section}`}
          />
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Monday', 'Tuesday', 'Wednesday'].map((day) => {
                const daySchedule = schedule.filter((s) => s.day === day);
                return (
                  <div key={day} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3 pb-2 border-b border-slate-200">
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
            subtitle="Parent notices, PTA meetings, and campus bulletins"
          />
          <CardContent className="divide-y divide-slate-100 p-0">
            {notifications.map((n) => (
              <div key={n.id} className="p-5 hover:bg-slate-50 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
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
                    ? 'bg-emerald-600 text-white shadow-xs'
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
                  Academic counseling, behavioral notes, & classroom progress
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
                  Transportation, fee challans, health clinic, & principal office
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

      {/* Tab: Security */}
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
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500'
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
        studentId={currentChild.id}
        studentName={currentChild.name}
      />
    </div>
  );
};
