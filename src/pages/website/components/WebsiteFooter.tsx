import React from 'react';
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  Globe,
  ShieldCheck,
  Heart,
  ChevronRight,
  ArrowUp,
} from 'lucide-react';

interface WebsiteFooterProps {
  onOpenPortal: (sector?: 'student' | 'parent' | 'teacher' | 'principal') => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({ onOpenPortal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1736] text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1557D6] flex items-center justify-center text-white font-bold shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-black tracking-tight text-white">
                  SCHOOL<span className="text-[#00C2FF]">SAATHI</span>
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  Smart School AI Assistant Platform
                </p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs">
              Empowering Indian educational institutions with human-like AI assistance, 11-language accessibility, real-time attendance telemetry, and CBSE-aligned academic workflows.
            </p>

            <div className="space-y-2 text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00C2FF] shrink-0" />
                <span>CBSE Affiliation Complex, Institutional Area, New Delhi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00C2FF] shrink-0" />
                <span>National Helpline: <strong>1800-120-4455</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00C2FF] shrink-0" />
                <span>support@schoolsaathi.edu.in</span>
              </div>
            </div>
          </div>

          {/* Quick Platform Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Product Overview
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About School Saathi
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Key Capabilities (10 Modules)
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="hover:text-white transition-colors">
                  Conversational AI Assistant
                </a>
              </li>
              <li>
                <a href="#voice-avatar" className="hover:text-white transition-colors">
                  Voice & Neural Audio
                </a>
              </li>
              <li>
                <a href="#multilingual" className="hover:text-white transition-colors">
                  11 Indian Languages
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-white transition-colors">
                  Mock ERP APIs & Flow
                </a>
              </li>
              <li>
                <a href="#security" className="hover:text-white transition-colors">
                  DPDP & Security Standards
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Role Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Role-Based Portals
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onOpenPortal('student')}
                  className="hover:text-[#00C2FF] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#1557D6]" />
                  <span>Student Portal (Pupil Hub)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('parent')}
                  className="hover:text-[#00C2FF] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#1557D6]" />
                  <span>Parent Portal (Guardian Access)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('teacher')}
                  className="hover:text-[#00C2FF] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#1557D6]" />
                  <span>Teacher Portal (Faculty Command)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPortal('principal')}
                  className="hover:text-[#00C2FF] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 text-[#1557D6]" />
                  <span>Principal Portal (Executive BI)</span>
                </button>
              </li>
            </ul>

            <div className="pt-3">
              <button
                onClick={() => onOpenPortal()}
                className="w-full py-2 px-3.5 bg-[#1557D6] hover:bg-[#0B45B5] text-white font-bold rounded-xl text-center transition-colors cursor-pointer"
              >
                Open Portal Selection Hub
              </button>
            </div>
          </div>

          {/* Compliance & Trust */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Compliance
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-300">
                <p className="font-bold text-white">CBSE Curriculum</p>
                <p className="text-slate-400">Aligned with NEP 2020 Guidelines</p>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-300">
                <p className="font-bold text-white">DPDP Act 2023</p>
                <p className="text-slate-400">Digital Data Privacy Compliant</p>
              </div>
              <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-slate-300">
                <p className="font-bold text-white">ISO 27001</p>
                <p className="text-slate-400">Information Security Management</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-xs">
          <p>© 2026-2027 SCHOOL SAATHI. All Rights Reserved. Built for Indian Schools & Universities.</p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 font-semibold"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
