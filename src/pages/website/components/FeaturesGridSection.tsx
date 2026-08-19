import React from 'react';
import {
  GraduationCap,
  Users,
  HeartHandshake,
  Building,
  CheckSquare,
  BookOpen,
  FileSpreadsheet,
  Bell,
  Calendar,
  Bot,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const FeaturesGridSection: React.FC = () => {
  const features = [
    {
      title: 'Student Dashboard',
      desc: 'Interactive hub with daily classes, personalized homework submissions, syllabus trackers, and report cards.',
      icon: GraduationCap,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      linkText: 'Explore Student View',
      href: '#students',
    },
    {
      title: 'Teacher Dashboard',
      desc: 'Central command for attendance marking, lesson planner, homework distribution, and grading analytics.',
      icon: Users,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      linkText: 'Explore Teacher View',
      href: '#teachers',
    },
    {
      title: 'Parent Dashboard',
      desc: 'Direct mobile-first portal with live bus GPS tracking, fee receipts, teacher messages, and attendance.',
      icon: HeartHandshake,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      linkText: 'Explore Parent View',
      href: '#parents',
    },
    {
      title: 'School Administration',
      desc: 'Executive analytics for principals and trustees, fee reconciliation, staff payroll, and compliance logs.',
      icon: Building,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      linkText: 'Explore Admin View',
      href: '#admin',
    },
    {
      title: 'Attendance Management',
      desc: 'RFID and biometric integrations with instant SMS and WhatsApp notifications sent to parents upon punch-in.',
      icon: CheckSquare,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      linkText: 'Learn About Attendance',
      href: '#features',
    },
    {
      title: 'Assignment Management',
      desc: 'Rich PDF and image submissions with plagiarism checks, grading rubrics, and automated deadline reminders.',
      icon: BookOpen,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      linkText: 'View Assignment Tool',
      href: '#features',
    },
    {
      title: 'Exam & Results Engine',
      desc: 'Grade generation adhering to CBSE/ICSE grading guidelines with single-click PDF report card downloads.',
      icon: FileSpreadsheet,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      linkText: 'See Exam Engine',
      href: '#features',
    },
    {
      title: 'Notices & Announcements',
      desc: 'Targeted broadcast circulars by class, section, or school-wide with read receipts and delivery tracking.',
      icon: Bell,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      linkText: 'Explore Circulars',
      href: '#features',
    },
    {
      title: 'Smart Timetable Scheduler',
      desc: 'Automated conflict-free teacher substitute allocation, room availability, and recurring bell schedules.',
      icon: Calendar,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      linkText: 'View Timetable System',
      href: '#features',
    },
    {
      title: 'AI School Assistant',
      desc: 'Multilingual generative AI tutor and institutional helper resolving syllabus doubts in 11 Indian languages.',
      icon: Bot,
      color: 'bg-violet-50 text-violet-600 border-violet-200',
      linkText: 'Try AI Assistant',
      href: '#ai-assistant',
    },
    {
      title: 'Events & Annual Calendar',
      desc: 'Unified school calendar for sports days, parent-teacher conferences, science exhibitions, and holidays.',
      icon: CalendarCheck,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      linkText: 'View Events Calendar',
      href: '#events',
    },
    {
      title: 'Secure Communication',
      desc: 'Role-based private channels eliminating informal chat groups while maintaining strict audit trails.',
      icon: ShieldCheck,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      linkText: 'Review Security Features',
      href: '#security',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>COMPREHENSIVE ECOSYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
            Everything Your School Needs
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From daily classroom operations to executive institutional oversight, School Saathi unifies every administrative and academic workflow in one cohesive interface.
          </p>
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:border-teal-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon Header */}
                  <div className={`w-14 h-14 rounded-2xl ${item.color} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-[#0B2545] mb-2 group-hover:text-[#0F766E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Link */}
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F766E] group-hover:text-[#0B2545] pt-3 border-t border-slate-100 group-hover:translate-x-1 transition-all"
                >
                  <span>{item.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
