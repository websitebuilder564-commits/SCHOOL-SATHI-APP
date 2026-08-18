import React from 'react';
import {
  Users2,
  AlertCircle,
  ArrowRight,
  ShieldAlert,
  Headphones,
  CheckCircle2,
  Clock,
  HeartHandshake,
} from 'lucide-react';

export const EscalationSection: React.FC = () => {
  const escalationTypes = [
    {
      category: 'Sensitive Wellbeing & Emotional Health',
      action: 'Directly routed to the Certified School Counsellor with priority notification.',
      tag: 'Counselor Team',
    },
    {
      category: 'Disputed Grades & Assessment Remarks',
      action: 'Escalated to Subject Head of Department (HOD) with attached exam answer sheets.',
      tag: 'Academic HOD',
    },
    {
      category: 'Fee Concession & Financial Aid',
      action: 'Forwarded to Accounts Administrator with parent submitted income declarations.',
      tag: 'Bursar & Accounts',
    },
    {
      category: 'Medical Leaves & Emergency Absences',
      action: 'Notified to Class Teacher and Campus Infirmary for medical certificate verification.',
      tag: 'Class Teacher',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Human-in-the-Loop Safeguard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            When AI Shouldn't Answer Alone.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            School Saathi recognizes sensitive emotional, medical, or complex administrative inquiries and gracefully routes them to authorized human faculty with audit transparency.
          </p>
        </div>

        {/* Escalation Triage Pipeline Visual */}
        <div className="bg-[#F5F8FC] border border-[#E5EAF2] rounded-3xl p-6 sm:p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs text-center space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1557D6]">Phase 1</span>
              <h4 className="text-sm font-bold text-[#172033]">User Inquiry</h4>
              <p className="text-[11px] text-[#667085]">Student or Parent expresses concern via text/voice</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-xs text-center space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1557D6]">Phase 2</span>
              <h4 className="text-sm font-bold text-[#172033]">Intent & Sentiment NLP</h4>
              <p className="text-[11px] text-[#667085]">Classifier tags high-stakes or sensitive keywords</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs text-center space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#1557D6]">Phase 3</span>
              <h4 className="text-sm font-bold text-[#172033]">Triage Routing</h4>
              <p className="text-[11px] text-[#667085]">Automated ticket dispatch to authorized staff dashboard</p>
            </div>

            <div className="bg-[#1557D6] text-white p-4 rounded-2xl shadow-md text-center space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-200">Phase 4</span>
              <h4 className="text-sm font-bold text-white">Human Resolution</h4>
              <p className="text-[11px] text-blue-100">Teacher or Principal connects directly with guardian</p>
            </div>
          </div>
        </div>

        {/* 4 Escalation Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {escalationTypes.map((item) => (
            <div
              key={item.category}
              className="p-6 rounded-2xl border border-[#E5EAF2] bg-white hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EEF5FF] text-[#1557D6] flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-[#172033]">{item.category}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#1557D6]">
                    {item.tag}
                  </span>
                </div>
                <p className="text-xs text-[#667085] leading-relaxed">{item.action}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
