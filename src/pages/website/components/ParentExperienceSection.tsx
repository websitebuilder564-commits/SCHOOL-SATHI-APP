import React from 'react';
import {
  HeartHandshake,
  Bus,
  CheckCircle2,
  Bell,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  PhoneCall,
  Calendar
} from 'lucide-react';

interface ParentExperienceProps {
  onOpenPortal: (role?: 'parent') => void;
}

export const ParentExperienceSection: React.FC<ParentExperienceProps> = ({ onOpenPortal }) => {
  return (
    <section id="parents" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
              <span>PARENT CONNECT &amp; PEACE OF MIND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
              Complete Visibility into Your Child&apos;s Safety &amp; Education
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Never worry about school bus arrival, missed circulars, or surprise exam grades. Parents receive instant punch-in notifications, GPS telemetry for school transit, fee receipts, and direct appointment scheduling with subject teachers.
            </p>
          </div>

          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              type="button"
              onClick={() => onOpenPortal('parent')}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-105 text-white font-bold text-sm rounded-2xl shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Launch Parent Portal Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Visual Phone/Dashboard Mockup on Left + Feature Highlights on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left 6 Cols: Modern Parent Mobile App & Live Bus Telemetry Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md bg-[#0A162B] rounded-3xl p-5 shadow-2xl border border-slate-700 text-white space-y-4">
              
              {/* App Status Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
                    RS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Rohit Sharma (Parent)</div>
                    <div className="text-[10px] text-slate-400">Child: Aarav Sharma (Class 10-A)</div>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Campus Present
                </span>
              </div>

              {/* Live Bus GPS Transit Monitor Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950/80 to-[#071329] border border-blue-600/50 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Bus className="w-4 h-4 text-cyan-400" />
                    Live School Bus Telemetry (Route #04)
                  </span>
                  <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live GPS (38 km/h)
                  </span>
                </div>

                <div className="p-3 bg-black/40 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Next Destination:</span>
                    <span className="font-bold text-white">Sector 14 Residential Gate</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px]">Estimated Arrival:</span>
                    <span className="font-bold text-cyan-300 font-mono">03:42 PM (In 4 Mins)</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                    <span>Driver: Rajesh Kumar (+91 98765-XXXXX)</span>
                    <button type="button" className="text-amber-400 hover:text-white font-bold flex items-center gap-1">
                      <PhoneCall className="w-3 h-3" /> Call
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Summary Grid: Attendance, Term Fee & Homework */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#061022] border border-slate-800">
                  <div className="text-[10px] text-slate-400">Monthly Attendance</div>
                  <div className="text-base font-black text-emerald-400 mt-0.5">96.8%</div>
                  <div className="text-[10px] text-slate-400">0 Unexcused Absences</div>
                </div>

                <div className="p-3 rounded-2xl bg-[#061022] border border-slate-800">
                  <div className="text-[10px] text-slate-400">Quarterly Tuition Dues</div>
                  <div className="text-base font-black text-amber-400 mt-0.5">₹0 Due</div>
                  <div className="text-[10px] text-emerald-400 font-medium">Receipt #DPS-2026-904</div>
                </div>
              </div>

              {/* Direct Teacher Chat Capsule */}
              <div className="p-3 rounded-2xl bg-[#061022] border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="font-semibold text-white">Message Class Teacher</div>
                    <div className="text-[10px] text-slate-400">Dr. Priya Verma is available</div>
                  </div>
                </div>
                <button type="button" className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold text-[10px]">
                  Book PTM
                </button>
              </div>

            </div>
          </div>

          {/* Right 6 Cols: Core Parent Capabilities */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-amber-50/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2545]">Automated Biometric Gate Alerts</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Receive instant push alerts and SMS timestamping exactly when your child enters school gates, boards the bus, or departs for home.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-teal-50/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2545]">1-Click UPI &amp; NetBanking Fee Payments</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Download official tax-deductible fee receipts, view itemized tuition, transport, and lab fee structures, and setup automatic recurring reminders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-blue-50/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B2545]">Transparent Gradebooks &amp; PTM Scheduling</h3>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Track weekly class tests, midterm examinations, teacher remarks, and schedule 1-on-1 parent-teacher meetings without chaotic waiting lines.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
