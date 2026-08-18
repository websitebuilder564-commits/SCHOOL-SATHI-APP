export type UserRole = 'student' | 'parent' | 'teacher' | 'principal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  studentId?: string; // If student
  parentId?: string;  // If parent
  teacherId?: string; // If teacher
  principalId?: string; // If principal
  assignedClass?: string; // For teachers/students e.g. "8A"
  linkedStudentIds?: string[]; // For parents e.g. ["STU001", "STU002"]
  designation?: string;
  department?: string;
  joinedDate?: string;
}

export interface Student {
  id: string;
  admissionNo: string;
  name: string;
  class: string;
  section: string;
  rollNo: number;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  avatar: string;
  bloodGroup: string;
  address: string;
  overallAttendance: number;
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  workingDays: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string; // YYYY-MM-DD
  status: 'present' | 'absent' | 'late' | 'excused';
  markedBy: string;
  markedAt: string;
  remarks?: string;
}

export interface SubjectGrade {
  id: string;
  studentId: string;
  subject: string;
  teacher: string;
  midtermScore: number;
  finalScore: number;
  totalScore: number;
  maxScore: number;
  grade: string;
  attendancePct: number;
  remarks: string;
}

export interface ScheduleItem {
  id: string;
  class: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  time: string;
  subject: string;
  teacherName: string;
  room: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'attendance' | 'academic' | 'announcement' | 'support' | 'system';
  targetRoles: UserRole[];
  date: string;
  isRead: boolean;
  actionUrl?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface EscalationRequest {
  id: string; // e.g. "REQ-10021"
  userId: string;
  userName: string;
  userRole: UserRole;
  studentId?: string;
  studentName?: string;
  type: 'TEACHER' | 'MANAGEMENT';
  subject: string;
  details: string;
  priority: 'NORMAL' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'SUBMITTED' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  resolutionNotes?: string;
}

export interface AuditLog {
  id: string;
  requestId: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'SUCCESS' | 'FAILURE' | 'FORBIDDEN' | 'UNAUTHORIZED';
  details: string;
}

export interface AnalyticsSummary {
  overallAttendanceRate: number;
  todayAttendanceRate: number;
  totalStudents: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  totalTeachers: number;
  teachersPresentToday: number;
  classBreakdown: {
    className: string;
    total: number;
    present: number;
    absent: number;
    rate: number;
  }[];
  weeklyTrend: {
    day: string;
    rate: number;
    present: number;
    absent: number;
  }[];
  monthlyTrend: {
    month: string;
    rate: number;
  }[];
  subjectAttendance: {
    subject: string;
    rate: number;
  }[];
}

export type SupportedLanguage = 
  | 'en' 
  | 'hi' 
  | 'ta' 
  | 'te' 
  | 'mr' 
  | 'bn' 
  | 'gu' 
  | 'pa' 
  | 'kn' 
  | 'ml' 
  | 'ur';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}
