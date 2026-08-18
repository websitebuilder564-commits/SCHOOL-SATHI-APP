import React from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  Check,
  ArrowRight,
  Shield,
  Sparkles,
} from 'lucide-react';

interface RolesSectionProps {
  onOpenPortal: (sector: 'student' | 'parent' | 'teacher' | 'principal') => void;
}

export const RolesSection: React.FC<RolesSectionProps> = ({ onOpenPortal }) => {
  const roles = [
    {
      id: 'student' as const,
      role: 'STUDENT',
      tagline: 'Pupil Workspace & AI Tutor',
      desc: 'Empowering learners with real-time academic telemetry, homework helpers, and exam schedules.',
      theme: 'from-blue-600 to-indigo-700',
      badgeBg: 'bg-blue-50 text-[#1557D6] border-blue-200',
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      capabilities: [
        'Live Attendance & RFID In/Out Logs',
        'Academic Marks & CBSE Report Cards',
        'Daily Class & Exam Timetable',
        'Assignments & Syllabus Tracker',
        'Official School Notices & Circulars',
        'SchoolSaathi AI Tutor Questions',
      ],
      demoUser: 'Rahul Sharma (Class 10-A)',
    },
    {
      id: 'parent' as const,
      role: 'PARENT',
      tagline: 'Guardian Hub & Transparency',
      desc: 'Keeping guardians fully informed with instant child progress alerts, fee payments, and faculty channels.',
      theme: 'from-sky-600 to-blue-700',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      icon: <Users className="w-6 h-6 text-white" />,
      capabilities: [
        'Real-time Child Campus In/Out Alerts',
        'Comprehensive Academic Progress Reports',
        'Fee Payment Status & Downloadable Receipts',
        'Upcoming School Events & Holidays',
        'Direct Teacher Communication Channels',
        'Multi-child Profile Switcher',
      ],
      demoUser: 'Anita Sharma (Guardian of Rahul)',
    },
    {
      id: 'teacher' as const,
      role: 'TEACHER',
      tagline: 'Faculty Command & Grading',
      desc: 'Streamlining lesson plans, 1-click digital attendance, gradebook entries, and student escalations.',
      theme: 'from-indigo-600 to-violet-800',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      capabilities: [
        '1-Click Classroom Attendance Marking',
        'Authorized Student Profiles & Analytics',
        'Homework & Assignment Distribution',
        'Digital Gradebook & Assessment Logs',
        'Curriculum Progress & Lecture Schedules',
        'Automated Student Issue Escalation',
      ],
      demoUser: 'Amit Kumar (Senior Physics Faculty)',
    },
    {
      id: 'principal' as const,
      role: 'PRINCIPAL / ADMIN',
      tagline: 'Executive Intelligence & Audit',
      desc: 'Institutional analytics, faculty performance indexes, board compliance, and immutable security audit logs.',
      theme: 'from-[#0B1736] to-slate-900',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: <Building2 className="w-6 h-6 text-white" />,
      capabilities: [
        'School-wide Real-Time Attendance BI',
        'Academic Performance & Pass Trends',
        'Department & Faculty Workload Reports',
        'CBSE / Board Compliance Tracking',
        'Audit-grade Activity & Access Logs',
        'Broadcast Emergency School Circulars',
      ],
      demoUser: 'Dr. Priya Sen (Principal & Director)',
    },
  ];

  return (
    <section id="roles" className="py-20 lg:py-28 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Role-Based Access Control</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Designed Around Every Member of the School.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Four specialized portals with airtight role isolation. Every stakeholder interacts with an interface specifically tuned to their daily objectives.
          </p>
        </div>

        {/* 4 Large Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {roles.map((item) => (
            <div
              key={item.role}
              className="rounded-2xl bg-[#F5F8FC] border border-[#E5EAF2] overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:border-blue-300 transition-all duration-300 group"
            >
              {/* Header Ribbon with Role Color */}
              <div className={`p-6 bg-gradient-to-r ${item.theme} text-white space-y-3`}>
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                    Authorized
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight">{item.role}</h3>
                  <p className="text-xs text-blue-100 font-medium">{item.tagline}</p>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-white">
                <p className="text-xs text-[#667085] leading-relaxed">
                  {item.desc}
                </p>

                {/* Capabilities List */}
                <div className="space-y-2.5">
                  <p className="text-[11px] font-bold text-[#172033] uppercase tracking-wider">
                    Role Capabilities:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {item.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#20A66A] shrink-0 mt-0.5" />
                        <span className="leading-tight">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Demo User Info */}
                <div className="pt-3 border-t border-slate-100 text-[11px] text-[#667085]">
                  <span className="font-semibold text-slate-900">Demo Persona: </span>
                  {item.demoUser}
                </div>

                {/* Direct 1-Click Launch Button */}
                <button
                  id={`launch-${item.id}-portal-btn`}
                  onClick={() => onOpenPortal(item.id)}
                  className="w-full py-2.5 px-4 bg-[#1557D6] hover:bg-[#0B45B5] active:bg-[#0B1736] text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:translate-y-[-1px]"
                >
                  <span>Launch {item.role} Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
