import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  ShieldCheck
} from 'lucide-react';

interface WebsiteFooterProps {
  onOpenPortal: (role?: 'student' | 'parent' | 'teacher' | 'principal') => void;
}

export const WebsiteFooter: React.FC<WebsiteFooterProps> = ({ onOpenPortal }) => {
  return (
    <footer className="bg-[#060E1D] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Brand Col (2 cols wide on desktop) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#0B2545] flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                School <span className="text-[#F59E0B]">Saathi</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your Smart Companion for a Better School Experience. Connecting students, parents, teachers and school administration through one intelligent digital platform.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>National Support: 1800-120-4455</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>contact@schoolsaathi.in</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>New Delhi • Bengaluru • Mumbai, India</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <a href="#social" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-400 hover:border-blue-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-sky-400 hover:border-sky-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-blue-500 hover:border-blue-500 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-red-500 hover:border-red-500 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#social" className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-pink-400 hover:border-pink-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: School Saathi */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">School Saathi</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-white transition-colors">About Platform</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Core Features</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Digital Resources</a></li>
              <li><a href="#events" className="hover:text-white transition-colors">Events Calendar</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Partner With Us</a></li>
            </ul>
          </div>

          {/* Col 3: For Students */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">For Students</h4>
            <ul className="space-y-2 text-xs">
              <li><button type="button" onClick={() => onOpenPortal('student')} className="hover:text-white transition-colors text-left cursor-pointer">Student Dashboard</button></li>
              <li><a href="#resources" className="hover:text-white transition-colors">Learning Resources</a></li>
              <li><a href="#students" className="hover:text-white transition-colors">Assignments Hub</a></li>
              <li><a href="#ai-assistant" className="hover:text-white transition-colors">AI Study Tutor</a></li>
              <li><button type="button" onClick={() => onOpenPortal('student')} className="hover:text-white transition-colors text-left cursor-pointer">Exam Hall Tickets</button></li>
            </ul>
          </div>

          {/* Col 4: For Parents */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">For Parents</h4>
            <ul className="space-y-2 text-xs">
              <li><button type="button" onClick={() => onOpenPortal('parent')} className="hover:text-white transition-colors text-left cursor-pointer">Parent Portal</button></li>
              <li><a href="#parents" className="hover:text-white transition-colors">Attendance Punch-in</a></li>
              <li><a href="#parents" className="hover:text-white transition-colors">Live Bus GPS Tracking</a></li>
              <li><a href="#parents" className="hover:text-white transition-colors">Online Fee Receipts</a></li>
              <li><a href="#parents" className="hover:text-white transition-colors">Teacher Direct Connect</a></li>
            </ul>
          </div>

          {/* Col 5: For Teachers & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">For Teachers &amp; Support</h4>
            <ul className="space-y-2 text-xs">
              <li><button type="button" onClick={() => onOpenPortal('teacher')} className="hover:text-white transition-colors text-left cursor-pointer">Teacher Portal</button></li>
              <li><button type="button" onClick={() => onOpenPortal('principal')} className="hover:text-white transition-colors text-left cursor-pointer">Principal Console</button></li>
              <li><a href="#features" className="hover:text-white transition-colors">Attendance Register</a></li>
              <li><a href="#ai-assistant" className="hover:text-white transition-colors">Help Center &amp; FAQs</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Privacy &amp; Security</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 School Saathi. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#compliance" className="hover:text-slate-300 transition-colors">CBSE Data Protection Compliant</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
