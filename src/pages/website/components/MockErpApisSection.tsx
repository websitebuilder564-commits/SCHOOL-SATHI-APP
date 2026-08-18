import React, { useState } from 'react';
import {
  Server,
  Database,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Code,
  CheckCircle2,
  Lock,
  Layers,
  Terminal,
} from 'lucide-react';

export const MockErpApisSection: React.FC = () => {
  const [selectedApi, setSelectedApi] = useState('attendance');

  const apis = [
    {
      id: 'student',
      name: 'Student API',
      endpoint: '/api/v1/students/{id}/profile',
      desc: 'Retrieves biographical details, roll number, section, and guardian contact.',
      payload: {
        studentId: 'STU-2026-8821',
        name: 'Rahul Sharma',
        class: '10-A',
        admissionNo: 'ADM-2022-4412',
        rollNo: 24,
        dob: '2010-04-14',
        bloodGroup: 'B+',
        status: 'Active',
      },
    },
    {
      id: 'attendance',
      name: 'Attendance API',
      endpoint: '/api/v1/attendance/{studentId}/telemetry',
      desc: 'Real-time telemetry, RFID gate scans, working days, and absentee records.',
      payload: {
        academicTerm: 'Term 1 2026-27',
        totalWorkingDays: 52,
        presentDays: 48,
        absentDays: 4,
        percentage: 92.4,
        rfidGate1Tap: '2026-08-18T07:58:12+05:30',
        cbseCompliance: 'PASSED_HONORS',
      },
    },
    {
      id: 'academic',
      name: 'Academic API',
      endpoint: '/api/v1/academics/gradebook/{studentId}',
      desc: 'Exam marks, internal assessments, CBSE grades, and GPA calculations.',
      payload: {
        examTerm: 'Mid-Term 1',
        overallGpa: 9.4,
        subjects: [
          { code: 'MATH-10', name: 'Mathematics', score: 95, max: 100, grade: 'A1' },
          { code: 'SCI-10', name: 'Science / Physics', score: 92, max: 100, grade: 'A1' },
          { code: 'ENG-10', name: 'English Literature', score: 88, max: 100, grade: 'A2' },
          { code: 'CS-10', name: 'Computer Applications', score: 98, max: 100, grade: 'A1' },
        ],
      },
    },
    {
      id: 'timetable',
      name: 'Timetable API',
      endpoint: '/api/v1/timetable/class/{classId}/daily',
      desc: 'Subject schedules, assigned faculty, classroom numbers, and lab periods.',
      payload: {
        classId: '10-A',
        dayOfWeek: 'Tuesday',
        schedule: [
          { period: 1, time: '08:30-09:15', subject: 'Mathematics', room: '204', faculty: 'R. Rao' },
          { period: 2, time: '09:15-10:00', subject: 'Physics Lab', room: 'Lab-2', faculty: 'A. Kumar' },
          { period: 3, time: '10:15-11:00', subject: 'English', room: '204', faculty: 'M. Sen' },
          { period: 4, time: '11:00-11:45', subject: 'AI & Robotics', room: 'AI-Studio', faculty: 'S. Verma' },
        ],
      },
    },
    {
      id: 'notices',
      name: 'Notice API',
      endpoint: '/api/v1/notices/broadcast/active',
      desc: 'Official CBSE circulars, school holiday schedules, and emergency alerts.',
      payload: {
        totalActive: 3,
        circulars: [
          { id: 'CIR-89', title: 'CBSE Term 1 Datesheet', publishedDate: '2026-08-15', priority: 'HIGH' },
          { id: 'CIR-90', title: 'Annual Inter-House Sports Meet', publishedDate: '2026-08-12', priority: 'NORMAL' },
        ],
      },
    },
    {
      id: 'teacher',
      name: 'Teacher API',
      endpoint: '/api/v1/faculty/{facultyId}/roster',
      desc: 'Faculty lecture schedules, assigned sections, and pending grading submissions.',
      payload: {
        facultyId: 'FAC-774',
        name: 'Amit Kumar',
        department: 'Physics & Applied Sciences',
        assignedClasses: ['10-A', '10-B', '11-A'],
        pendingGradingCount: 14,
      },
    },
    {
      id: 'management',
      name: 'Management API',
      endpoint: '/api/v1/management/analytics/summary',
      desc: 'Institutional analytics, fee collection ratios, and school attendance curves.',
      payload: {
        totalEnrolledStudents: 12450,
        todayStudentAttendanceRate: '94.8%',
        totalFacultyPresent: 452,
        termFeeCollectionRate: '91.2%',
        auditLogStatus: 'HEALTHY_SYNCED',
      },
    },
  ];

  const currentApi = apis.find((a) => a.id === selectedApi) || apis[1];

  return (
    <section id="technology" className="py-20 lg:py-28 bg-[#0B1736] text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#00C2FF] text-xs font-bold uppercase tracking-wider border border-white/15">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Data Flow</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Connected to the School's Information Layer.
          </h2>

          <p className="text-base text-slate-300 leading-relaxed">
            School Saathi connects conversational AI to authoritative School ERP schemas through a zero-trust permission barrier.
          </p>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md mb-12">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#00C2FF] mb-6">
            End-to-End Secure Conversational Flow
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Step 1 */}
            <div className="bg-[#1557D6]/30 border border-blue-400/30 p-4 rounded-2xl text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#1557D6] flex items-center justify-center text-white mx-auto font-bold">
                01
              </div>
              <h4 className="text-sm font-bold text-white">User Query</h4>
              <p className="text-[11px] text-slate-300">Voice or Text in any of 11 Indian languages</p>
            </div>

            <div className="hidden md:flex justify-center text-blue-400">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-[#1557D6]/40 to-[#00C2FF]/30 border border-cyan-400/30 p-4 rounded-2xl text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#00C2FF] text-[#0B1736] flex items-center justify-center mx-auto font-bold">
                02
              </div>
              <h4 className="text-sm font-bold text-white">SchoolSaathi AI</h4>
              <p className="text-[11px] text-slate-300">Semantic Intent & Parameter Extraction</p>
            </div>

            <div className="hidden md:flex justify-center text-blue-400">
              <ArrowRight className="w-5 h-5 animate-pulse" />
            </div>

            {/* Step 3 */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-2xl text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Role Permission Guard</h4>
              <p className="text-[11px] text-slate-300">Validates Student/Parent/Staff RBAC Tokens</p>
            </div>
          </div>
        </div>

        {/* Interactive Mock ERP API Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* API Selection Column */}
          <div className="lg:col-span-5 space-y-2">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Mock ERP API:
              </span>
              <span className="text-[10px] bg-white/10 text-[#00C2FF] font-bold px-2 py-0.5 rounded">
                Prototype / Mock Data
              </span>
            </div>

            {apis.map((api) => (
              <button
                key={api.id}
                onClick={() => setSelectedApi(api.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedApi === api.id
                    ? 'bg-[#1557D6] border-blue-400 text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Server className="w-3.5 h-3.5 text-[#00C2FF]" />
                    <span className="text-xs font-bold">{api.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-mono mt-0.5">{api.endpoint}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            ))}
          </div>

          {/* JSON Payload Inspector Column */}
          <div className="lg:col-span-7 bg-[#061026] border border-slate-700 rounded-3xl p-6 shadow-2xl font-mono text-xs overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200 font-bold">{currentApi.name}</span>
                <span className="text-slate-500">• 200 OK</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                JSON Response
              </span>
            </div>

            <p className="text-[11px] text-slate-400 font-sans mb-4">
              {currentApi.desc}
            </p>

            <pre className="bg-[#030814] p-4 rounded-xl text-emerald-400 overflow-x-auto max-h-72 text-[11px] leading-relaxed border border-slate-800">
              {JSON.stringify(currentApi.payload, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};
