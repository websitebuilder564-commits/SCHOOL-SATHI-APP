import { 
  User, 
  Student, 
  AttendanceRecord, 
  SubjectGrade, 
  ScheduleItem, 
  NotificationItem, 
  EscalationRequest, 
  AuditLog, 
  AnalyticsSummary 
} from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'USR-STU001',
    name: 'Rahul Sharma',
    email: 'student@demo.com',
    role: 'student',
    studentId: 'STU001',
    assignedClass: '8A',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43210',
    joinedDate: '2022-06-15',
  },
  {
    id: 'USR-PAR001',
    name: 'Anita Sharma',
    email: 'parent@demo.com',
    role: 'parent',
    parentId: 'PAR001',
    linkedStudentIds: ['STU001', 'STU002'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43211',
    joinedDate: '2022-06-15',
  },
  {
    id: 'USR-TEA001',
    name: 'Amit Kumar',
    email: 'teacher@demo.com',
    role: 'teacher',
    teacherId: 'TEA001',
    assignedClass: '8A',
    designation: 'Senior Mathematics & Class Teacher',
    department: 'Science & Mathematics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43212',
    joinedDate: '2019-04-10',
  },
  {
    id: 'USR-PRI001',
    name: 'Dr. Priya Sen',
    email: 'principal@demo.com',
    role: 'principal',
    principalId: 'PRI001',
    designation: 'Principal & Head of Institution',
    department: 'Executive Administration',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+91 98765 43213',
    joinedDate: '2015-01-05',
  }
];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 'STU001',
    admissionNo: 'ADM-2022-801',
    name: 'Rahul Sharma',
    class: '8',
    section: 'A',
    rollNo: 14,
    gender: 'Male',
    dob: '2012-05-18',
    parentName: 'Anita Sharma',
    parentPhone: '+91 98765 43211',
    parentEmail: 'parent@demo.com',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'O+',
    address: 'Flat 402, Green Valley Apartments, Delhi Road, New Delhi',
    overallAttendance: 91.2,
    totalPresent: 114,
    totalAbsent: 11,
    totalLate: 2,
    workingDays: 125,
  },
  {
    id: 'STU002',
    admissionNo: 'ADM-2024-502',
    name: 'Priya Sharma',
    class: '5',
    section: 'B',
    rollNo: 8,
    gender: 'Female',
    dob: '2015-09-22',
    parentName: 'Anita Sharma',
    parentPhone: '+91 98765 43211',
    parentEmail: 'parent@demo.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'A+',
    address: 'Flat 402, Green Valley Apartments, Delhi Road, New Delhi',
    overallAttendance: 94.4,
    totalPresent: 118,
    totalAbsent: 7,
    totalLate: 1,
    workingDays: 125,
  },
  {
    id: 'STU003',
    admissionNo: 'ADM-2022-803',
    name: 'Amit Kumar',
    class: '8',
    section: 'A',
    rollNo: 1,
    gender: 'Male',
    dob: '2012-03-12',
    parentName: 'Suresh Kumar',
    parentPhone: '+91 98765 43214',
    parentEmail: 'suresh.k@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'B+',
    address: 'Sector 14, Block C, Rohini',
    overallAttendance: 88.0,
    totalPresent: 110,
    totalAbsent: 15,
    totalLate: 4,
    workingDays: 125,
  },
  {
    id: 'STU004',
    admissionNo: 'ADM-2022-804',
    name: 'Priya Das',
    class: '8',
    section: 'A',
    rollNo: 2,
    gender: 'Female',
    dob: '2012-08-05',
    parentName: 'Bikram Das',
    parentPhone: '+91 98765 43215',
    parentEmail: 'b.das@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'AB+',
    address: 'Pocket 2, Mayur Vihar Phase 1',
    overallAttendance: 96.0,
    totalPresent: 120,
    totalAbsent: 5,
    totalLate: 0,
    workingDays: 125,
  },
  {
    id: 'STU005',
    admissionNo: 'ADM-2022-805',
    name: 'Sneha Roy',
    class: '8',
    section: 'A',
    rollNo: 3,
    gender: 'Female',
    dob: '2012-11-19',
    parentName: 'Debabrata Roy',
    parentPhone: '+91 98765 43216',
    parentEmail: 'd.roy@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'O-',
    address: 'Civic Centre Road, New Delhi',
    overallAttendance: 92.8,
    totalPresent: 116,
    totalAbsent: 9,
    totalLate: 1,
    workingDays: 125,
  },
  {
    id: 'STU006',
    admissionNo: 'ADM-2022-806',
    name: 'Vikramaditya Singh',
    class: '8',
    section: 'A',
    rollNo: 4,
    gender: 'Male',
    dob: '2012-01-10',
    parentName: 'Rajendra Singh',
    parentPhone: '+91 98765 43217',
    parentEmail: 'r.singh@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'A-',
    address: 'Vasant Kunj Enclave, Block A',
    overallAttendance: 85.6,
    totalPresent: 107,
    totalAbsent: 18,
    totalLate: 3,
    workingDays: 125,
  },
  {
    id: 'STU007',
    admissionNo: 'ADM-2022-807',
    name: 'Ananya Verma',
    class: '8',
    section: 'A',
    rollNo: 5,
    gender: 'Female',
    dob: '2012-07-24',
    parentName: 'Manish Verma',
    parentPhone: '+91 98765 43218',
    parentEmail: 'm.verma@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'B-',
    address: 'Saket District Centre, New Delhi',
    overallAttendance: 97.6,
    totalPresent: 122,
    totalAbsent: 3,
    totalLate: 0,
    workingDays: 125,
  },
  {
    id: 'STU008',
    admissionNo: 'ADM-2022-808',
    name: 'Rohan Mehra',
    class: '8',
    section: 'A',
    rollNo: 6,
    gender: 'Male',
    dob: '2012-10-02',
    parentName: 'Kunal Mehra',
    parentPhone: '+91 98765 43219',
    parentEmail: 'k.mehra@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    bloodGroup: 'O+',
    address: 'Greater Kailash 1, New Delhi',
    overallAttendance: 89.6,
    totalPresent: 112,
    totalAbsent: 13,
    totalLate: 2,
    workingDays: 125,
  }
];

export const MOCK_SCHEDULE_8A: ScheduleItem[] = [
  { id: 'SCH001', class: '8A', day: 'Monday', time: '08:30 - 09:15', subject: 'Mathematics', teacherName: 'Amit Kumar', room: 'Room 204' },
  { id: 'SCH002', class: '8A', day: 'Monday', time: '09:15 - 10:00', subject: 'Science (Physics)', teacherName: 'Dr. Sunita Rao', room: 'Physics Lab' },
  { id: 'SCH003', class: '8A', day: 'Monday', time: '10:15 - 11:00', subject: 'English Language', teacherName: 'Reena George', room: 'Room 204' },
  { id: 'SCH004', class: '8A', day: 'Monday', time: '11:00 - 11:45', subject: 'Social Studies', teacherName: 'Harish Nair', room: 'Room 204' },
  { id: 'SCH005', class: '8A', day: 'Monday', time: '12:30 - 01:15', subject: 'Computer Science', teacherName: 'Pooja Bhatia', room: 'Computer Lab 2' },
  { id: 'SCH006', class: '8A', day: 'Monday', time: '01:15 - 02:00', subject: 'Physical Education', teacherName: 'Coach Rawat', room: 'Sports Complex' },

  { id: 'SCH007', class: '8A', day: 'Tuesday', time: '08:30 - 09:15', subject: 'English Literature', teacherName: 'Reena George', room: 'Room 204' },
  { id: 'SCH008', class: '8A', day: 'Tuesday', time: '09:15 - 10:00', subject: 'Mathematics', teacherName: 'Amit Kumar', room: 'Room 204' },
  { id: 'SCH009', class: '8A', day: 'Tuesday', time: '10:15 - 11:00', subject: 'Science (Chemistry)', teacherName: 'Dr. Sunita Rao', room: 'Chemistry Lab' },
  { id: 'SCH010', class: '8A', day: 'Tuesday', time: '11:00 - 11:45', subject: 'Hindi / Regional Lang', teacherName: 'R. K. Mishra', room: 'Room 204' },
  { id: 'SCH011', class: '8A', day: 'Tuesday', time: '12:30 - 01:15', subject: 'Art & Design', teacherName: 'Shalini Bose', room: 'Art Studio' },
  { id: 'SCH012', class: '8A', day: 'Tuesday', time: '01:15 - 02:00', subject: 'Library & Reading', teacherName: 'Librarian Varma', room: 'Central Library' },

  { id: 'SCH013', class: '8A', day: 'Wednesday', time: '08:30 - 09:15', subject: 'Science (Biology)', teacherName: 'Dr. Sunita Rao', room: 'Biology Lab' },
  { id: 'SCH014', class: '8A', day: 'Wednesday', time: '09:15 - 10:00', subject: 'Mathematics', teacherName: 'Amit Kumar', room: 'Room 204' },
  { id: 'SCH015', class: '8A', day: 'Wednesday', time: '10:15 - 11:00', subject: 'Social Studies', teacherName: 'Harish Nair', room: 'Room 204' },
  { id: 'SCH016', class: '8A', day: 'Wednesday', time: '11:00 - 11:45', subject: 'English Language', teacherName: 'Reena George', room: 'Room 204' },
  { id: 'SCH017', class: '8A', day: 'Wednesday', time: '12:30 - 01:15', subject: 'Robotics & STEM', teacherName: 'Pooja Bhatia', room: 'STEM Lab' },
  { id: 'SCH018', class: '8A', day: 'Wednesday', time: '01:15 - 02:00', subject: 'Music / Performing Arts', teacherName: 'Gaurav Sen', room: 'Music Hall' },
];

export const MOCK_GRADES_STU001: SubjectGrade[] = [
  { id: 'GRD001', studentId: 'STU001', subject: 'Mathematics', teacher: 'Amit Kumar', midtermScore: 48, finalScore: 46, totalScore: 94, maxScore: 100, grade: 'A1', attendancePct: 94.0, remarks: 'Exceptional analytical ability and consistent problem-solving skills.' },
  { id: 'GRD002', studentId: 'STU001', subject: 'Science (Physics & Chem)', teacher: 'Dr. Sunita Rao', midtermScore: 44, finalScore: 45, totalScore: 89, maxScore: 100, grade: 'A2', attendancePct: 91.5, remarks: 'Active lab participation and strong theoretical understanding.' },
  { id: 'GRD003', studentId: 'STU001', subject: 'English Core', teacher: 'Reena George', midtermScore: 46, finalScore: 46, totalScore: 92, maxScore: 100, grade: 'A1', attendancePct: 96.0, remarks: 'Fluent communication, eloquent essay writing, and good grammar.' },
  { id: 'GRD004', studentId: 'STU001', subject: 'Social Sciences', teacher: 'Harish Nair', midtermScore: 42, finalScore: 44, totalScore: 86, maxScore: 100, grade: 'A2', attendancePct: 88.0, remarks: 'Good grasp of historical timelines and geography maps.' },
  { id: 'GRD005', studentId: 'STU001', subject: 'Computer Science', teacher: 'Pooja Bhatia', midtermScore: 49, finalScore: 48, totalScore: 97, maxScore: 100, grade: 'A1', attendancePct: 95.0, remarks: 'Exemplary project work in Python algorithms and computational logic.' },
  { id: 'GRD006', studentId: 'STU001', subject: 'Hindi / Second Language', teacher: 'R. K. Mishra', midtermScore: 43, finalScore: 45, totalScore: 88, maxScore: 100, grade: 'A2', attendancePct: 87.5, remarks: 'Consistently improving in literature comprehension.' }
];

export const MOCK_GRADES_STU002: SubjectGrade[] = [
  { id: 'GRD007', studentId: 'STU002', subject: 'Mathematics (Junior)', teacher: 'Kavita Joshi', midtermScore: 49, finalScore: 48, totalScore: 97, maxScore: 100, grade: 'A1', attendancePct: 96.0, remarks: 'Brilliant with arithmetic and mental math calculations.' },
  { id: 'GRD008', studentId: 'STU002', subject: 'Environmental Studies', teacher: 'Meera Deshmukh', midtermScore: 47, finalScore: 48, totalScore: 95, maxScore: 100, grade: 'A1', attendancePct: 94.0, remarks: 'Very inquisitive in nature projects and experiments.' },
  { id: 'GRD009', studentId: 'STU002', subject: 'English', teacher: 'Sarah Jenkins', midtermScore: 45, finalScore: 47, totalScore: 92, maxScore: 100, grade: 'A1', attendancePct: 95.0, remarks: 'Excellent reading speed and vocabulary.' }
];

// Generate 30 days of realistic attendance history for Class 8A (up to 2026-08-17)
export const generateMockAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const baseStudents = MOCK_STUDENTS.filter(s => s.class === '8' && s.section === 'A');
  
  // Dates in August 2026
  const dates = [
    '2026-08-03', '2026-08-04', '2026-08-05', '2026-08-06', '2026-08-07',
    '2026-08-10', '2026-08-11', '2026-08-12', '2026-08-13', '2026-08-14',
    '2026-08-17' // Today
  ];

  dates.forEach((date) => {
    baseStudents.forEach((student, idx) => {
      let status: 'present' | 'absent' | 'late' = 'present';
      
      // Fixed deterministic patterns for demo consistency:
      // On 2026-08-12 (Wed), Rahul Sharma (STU001) was absent
      if (student.id === 'STU001' && date === '2026-08-12') {
        status = 'absent';
      }
      // On 2026-08-05 (Wed), Amit Kumar (STU003) was absent
      if (student.id === 'STU003' && (date === '2026-08-05' || date === '2026-08-14')) {
        status = 'absent';
      }
      // Vikramaditya (STU006) late on 2026-08-10
      if (student.id === 'STU006' && date === '2026-08-10') {
        status = 'late';
      }

      records.push({
        id: `ATT-${date}-${student.id}`,
        studentId: student.id,
        studentName: student.name,
        class: '8A',
        date,
        status,
        markedBy: 'TEA001 (Amit Kumar)',
        markedAt: `${date}T08:45:00.000Z`,
        remarks: status === 'absent' ? 'Medical leave requested' : undefined
      });
    });
  });

  return records;
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-001',
    title: 'Independence Day & Annual Fest Briefing',
    message: 'All students and staff are invited to the main auditorium for the upcoming cultural rehearsals and prize distribution announcement.',
    category: 'announcement',
    targetRoles: ['student', 'parent', 'teacher', 'principal'],
    date: '2026-08-16 09:30 AM',
    isRead: false,
    priority: 'high',
  },
  {
    id: 'NOTIF-002',
    title: 'Mid-Term Examination Schedule Released',
    message: 'The Mid-Term Semester exams for Grades 5 through 12 commence from September 1st, 2026. Please check your academic portal for detailed subject syllabi.',
    category: 'academic',
    targetRoles: ['student', 'parent', 'teacher'],
    date: '2026-08-15 04:00 PM',
    isRead: false,
    priority: 'high',
  },
  {
    id: 'NOTIF-003',
    title: 'Attendance Alert: August Review',
    message: 'Monthly attendance reports for August have been finalized. Parents are requested to review attendance records and submit leave regularization if applicable.',
    category: 'attendance',
    targetRoles: ['student', 'parent'],
    date: '2026-08-14 11:15 AM',
    isRead: true,
    priority: 'medium',
  },
  {
    id: 'NOTIF-004',
    title: 'XYZ AI Integration Gateway Active',
    message: 'The SchoolSaathi AI core gateway is primed for seamless integration with external AI speech, voice avatars, and automated parent communication pipelines.',
    category: 'system',
    targetRoles: ['teacher', 'principal'],
    date: '2026-08-17 08:00 AM',
    isRead: false,
    priority: 'medium',
  }
];

export const MOCK_ESCALATIONS: EscalationRequest[] = [
  {
    id: 'REQ-10021',
    userId: 'USR-PAR001',
    userName: 'Anita Sharma',
    userRole: 'parent',
    studentId: 'STU001',
    studentName: 'Rahul Sharma',
    type: 'TEACHER',
    subject: 'Query regarding Mathematics Olympiad coaching sessions',
    details: 'Would like to know if extra problem-solving mentoring will be conducted after 2:30 PM on Thursdays for Class 8A students.',
    priority: 'NORMAL',
    status: 'SUBMITTED',
    createdAt: '2026-08-16T14:20:00Z',
    updatedAt: '2026-08-16T14:20:00Z',
    assignedTo: 'Amit Kumar (Class Teacher 8A)',
  },
  {
    id: 'REQ-10019',
    userId: 'USR-PAR001',
    userName: 'Anita Sharma',
    userRole: 'parent',
    studentId: 'STU002',
    studentName: 'Priya Sharma',
    type: 'MANAGEMENT',
    subject: 'School Bus Route #14 Timings Inquiry',
    details: 'Requesting confirmation of morning pickup stop timing adjustment near Gate 3 during road maintenance work.',
    priority: 'NORMAL',
    status: 'ACCEPTED',
    createdAt: '2026-08-12T10:15:00Z',
    updatedAt: '2026-08-13T09:00:00Z',
    assignedTo: 'Transport & Safety Office',
    resolutionNotes: 'Route adjustment approved. Bus will arrive 7 minutes earlier at 07:23 AM.'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'AUD-901',
    requestId: 'REQ-AUD-8812',
    timestamp: '2026-08-17T08:45:12Z',
    userId: 'USR-TEA001',
    userName: 'Amit Kumar',
    userRole: 'teacher',
    action: 'SAVE_ATTENDANCE_RECORD',
    resource: 'Class 8A / Date: 2026-08-17',
    ipAddress: '192.168.1.104',
    status: 'SUCCESS',
    details: 'Marked 8 students: 7 Present, 1 Absent for class 8A morning session.'
  },
  {
    id: 'AUD-902',
    requestId: 'REQ-AUD-8813',
    timestamp: '2026-08-17T09:12:30Z',
    userId: 'USR-PAR001',
    userName: 'Anita Sharma',
    userRole: 'parent',
    action: 'VIEW_STUDENT_ATTENDANCE',
    resource: 'Student STU001 (Rahul Sharma)',
    ipAddress: '103.21.144.9',
    status: 'SUCCESS',
    details: 'Authorized access to verified child STU001 attendance dashboard (91.2% rate).'
  },
  {
    id: 'AUD-903',
    requestId: 'REQ-AUD-8814',
    timestamp: '2026-08-17T09:35:04Z',
    userId: 'USR-PRI001',
    userName: 'Dr. Priya Sen',
    userRole: 'principal',
    action: 'ACCESS_SCHOOL_ANALYTICS',
    resource: 'School-Wide Attendance Metrics',
    ipAddress: '192.168.1.2',
    status: 'SUCCESS',
    details: 'Retrieved aggregate institutional attendance (89.7% rate across 1,250 students).'
  },
  {
    id: 'AUD-904',
    requestId: 'REQ-AUD-8815',
    timestamp: '2026-08-17T10:02:19Z',
    userId: 'USR-PAR001',
    userName: 'Anita Sharma',
    userRole: 'parent',
    action: 'CREATE_SUPPORT_ESCALATION',
    resource: 'Support System (Teacher Escalation)',
    ipAddress: '103.21.144.9',
    status: 'SUCCESS',
    details: 'Created ticket REQ-10021 assigned to Teacher Amit Kumar.'
  }
];

export const MOCK_ANALYTICS: AnalyticsSummary = {
  overallAttendanceRate: 91.4,
  todayAttendanceRate: 89.7,
  totalStudents: 1250,
  presentToday: 1121,
  absentToday: 126,
  lateToday: 3,
  totalTeachers: 78,
  teachersPresentToday: 76,
  classBreakdown: [
    { className: 'Grade 5A', total: 35, present: 33, absent: 2, rate: 94.2 },
    { className: 'Grade 5B', total: 36, present: 34, absent: 2, rate: 94.4 },
    { className: 'Grade 6A', total: 38, present: 35, absent: 3, rate: 92.1 },
    { className: 'Grade 6B', total: 37, present: 33, absent: 4, rate: 89.2 },
    { className: 'Grade 7A', total: 40, present: 36, absent: 4, rate: 90.0 },
    { className: 'Grade 7B', total: 39, present: 34, absent: 5, rate: 87.1 },
    { className: 'Grade 8A', total: 36, present: 33, absent: 3, rate: 91.6 },
    { className: 'Grade 8B', total: 38, present: 34, absent: 4, rate: 89.4 },
    { className: 'Grade 9A', total: 42, present: 37, absent: 5, rate: 88.0 },
    { className: 'Grade 9B', total: 40, present: 36, absent: 4, rate: 90.0 },
    { className: 'Grade 10A', total: 44, present: 41, absent: 3, rate: 93.1 },
    { className: 'Grade 10B', total: 42, present: 38, absent: 4, rate: 90.4 },
  ],
  weeklyTrend: [
    { day: 'Mon', rate: 92.4, present: 1155, absent: 95 },
    { day: 'Tue', rate: 91.8, present: 1147, absent: 103 },
    { day: 'Wed', rate: 88.5, present: 1106, absent: 144 },
    { day: 'Thu', rate: 90.2, present: 1127, absent: 123 },
    { day: 'Fri', rate: 87.9, present: 1098, absent: 152 },
  ],
  monthlyTrend: [
    { month: 'Apr', rate: 93.5 },
    { month: 'May', rate: 92.1 },
    { month: 'Jun', rate: 90.8 },
    { month: 'Jul', rate: 91.7 },
    { month: 'Aug', rate: 89.7 }
  ],
  subjectAttendance: [
    { subject: 'Mathematics', rate: 93.2 },
    { subject: 'Science', rate: 92.0 },
    { subject: 'English', rate: 94.8 },
    { subject: 'Social Studies', rate: 89.5 },
    { subject: 'Computer Science', rate: 95.6 },
    { subject: 'Physical Education', rate: 96.2 }
  ]
};
