import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Logo } from '../brand/Logo';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  Eye, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Download,
  AlertCircle
} from 'lucide-react';

interface TermsPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
}

export const TermsPolicyModal: React.FC<TermsPolicyModalProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="xl"
      className="p-0 overflow-hidden"
    >
      <div className="flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-[#0A1E4A] text-white p-6 border-b border-[#143474]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Logo variant="icon" size="md" />
              <div>
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>SchoolSaathi AI Legal & Compliance</span>
                  <Badge variant="primary" size="sm" className="bg-[#0084FF] text-white font-bold">
                    v2026.2
                  </Badge>
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  Institutional Terms of Service & Student Data Protection Policy
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#061330] p-1 rounded-xl border border-[#143474]">
              <button
                onClick={() => setActiveTab('terms')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'terms'
                    ? 'bg-[#0084FF] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Terms of Service
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'privacy'
                    ? 'bg-[#0084FF] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Data Privacy Policy
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 text-xs space-y-5 leading-relaxed bg-slate-50/50">
          {activeTab === 'terms' ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0084FF] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0A1E4A] text-xs">
                    Institutional ERP & Educational Usage Agreement
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    By accessing or registering on the SchoolSaathi AI platform, school administrators, faculty members, parents, and students agree to adhere to strict educational integrity, access isolation, and authorized school network policies.
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center text-[10px] font-black">1</span>
                  Role-Based Authentication & Access Isolation (RBAC)
                </h5>
                <p className="text-slate-600 pl-7 text-[11px]">
                  All user accounts are provisioned with specific authorization boundaries. Students are strictly restricted to their personal academic roster; Parents are granted read-only telemetry for legally linked children; Faculty may mark attendance and view assigned classroom rosters only; and Institutional Administration oversees macro-analytics and security audits. Any attempt to query cross-class records or bypass authorization is logged with immutable security metadata.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center text-[10px] font-black">2</span>
                  SchoolSaathi AI Multi-Modal Assistant Governance
                </h5>
                <p className="text-slate-600 pl-7 text-[11px]">
                  The SchoolSaathi AI Assistant provides interactive chat, voice dialogue, and avatar animations. The AI model operates within strict safety guardrails compliant with child safety regulations. AI responses are generated strictly from school-authorized curricula, institutional schedules, and student verified attendance data. The AI will never provide unauthorized administrative secrets or student PII.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center text-[10px] font-black">3</span>
                  Attendance Verification & Official Records
                </h5>
                <p className="text-slate-600 pl-7 text-[11px]">
                  Attendance entries marked by verified class teachers constitute official institutional attendance records recognized for board examination compliance (CBSE / State Boards). Discrepancies may be raised via the Inbound Support & Escalation Desk within 7 working days.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0084FF]/10 text-[#0084FF] flex items-center justify-center text-[10px] font-black">4</span>
                  Device & Session Security
                </h5>
                <p className="text-slate-600 pl-7 text-[11px]">
                  Users are responsible for safeguarding login credentials (including OTP tokens and passwords). Shared device access in public labs must terminate with a verified session logout.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-emerald-950 text-xs">
                    Student Data Privacy & DPDP Act 2023 Compliance
                  </h4>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    SchoolSaathi AI is engineered from the ground up to protect minor students' personal data, academic progress, and institutional communications.
                  </p>
                </div>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Zero Third-Party Advertising & No Data Selling
                </h5>
                <p className="text-slate-600 pl-6 text-[11px]">
                  SchoolSaathi AI never sells, rents, licenses, or monetizes student or parent information. No third-party behavioral trackers or commercial advertisement networks exist within any portal view.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Data Minimization & Multi-Tenant Encryption
                </h5>
                <p className="text-slate-600 pl-6 text-[11px]">
                  All sensitive records (Admission numbers, contact telephone numbers, report cards, and parent correspondences) are stored with 256-bit AES encryption at rest and TLS 1.3 in transit.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Voice & Microphone Interaction Privacy
                </h5>
                <p className="text-slate-600 pl-6 text-[11px]">
                  When using voice input with SchoolSaathi AI, audio streams are processed in transient memory solely for immediate speech-to-text resolution and contextual student query handling. Audio recordings are never retained or harvested for general AI model retraining.
                </p>
              </div>

              <div className="space-y-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h5 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Parental Rights & Record Correction
                </h5>
                <p className="text-slate-600 pl-6 text-[11px]">
                  Parents and guardians hold statutory rights to review student attendance archives, request data correction through the school administrative office, and receive real-time notifications regarding student absences.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Sparkles className="w-3.5 h-3.5 text-[#0084FF]" />
            <span>Compliant with CBSE, FERPA & National Education Policy 2020</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
            {onAccept && (
              <Button
                variant="primary"
                size="sm"
                className="bg-[#0084FF] hover:bg-[#0070DB] text-white font-bold"
                onClick={() => {
                  onAccept();
                  onClose();
                }}
              >
                Accept & Proceed
              </Button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
