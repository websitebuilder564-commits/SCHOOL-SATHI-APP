import React from 'react';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Server,
  KeyRound,
  CheckCircle2,
  Cpu,
  BadgeCheck,
} from 'lucide-react';

export const SecuritySection: React.FC = () => {
  const pillars = [
    {
      icon: <Lock className="w-6 h-6 text-[#1557D6]" />,
      title: 'Role-Based Access Control (RBAC)',
      subtitle: 'Zero-Trust Isolation',
      desc: 'Students cannot see peers’ grades; parents only access their enrolled children; teachers manage only designated rosters.',
      badge: 'Strict Scope',
    },
    {
      icon: <FileCheck className="w-6 h-6 text-[#20A66A]" />,
      title: 'DPDP Act 2023 & Minor Privacy',
      subtitle: 'Student Data Sovereignty',
      desc: 'Full compliance with India’s Digital Personal Data Protection Act. Mandatory parental consent, zero advertising, and strict data minimization.',
      badge: 'DPDP Compliant',
    },
    {
      icon: <BadgeCheck className="w-6 h-6 text-[#1557D6]" />,
      title: 'Tamper-Evident Audit Trail',
      subtitle: 'Immutable Administrative Logs',
      desc: 'Every grade adjustment, attendance edit, and sensitive query is cryptographically time-stamped and preserved for board audits.',
      badge: 'Audit Ready',
    },
    {
      icon: <Server className="w-6 h-6 text-[#1557D6]" />,
      title: 'AES-256 & Sovereign Hosting',
      subtitle: 'Bank-Grade Cryptography',
      desc: 'All student telemetry is encrypted with AES-256 at rest and TLS 1.3 in transit, hosted securely in ISO 27001 certified data centers.',
      badge: '256-Bit SSL',
    },
  ];

  return (
    <section id="security" className="py-20 lg:py-28 bg-[#F5F8FC] border-b border-[#E5EAF2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EEF5FF] text-[#1557D6] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Institutional Trust & Privacy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1736] tracking-tight leading-tight">
            Privacy and Security by Design.
          </h2>

          <p className="text-base text-[#667085] leading-relaxed">
            Engineered from day one with the utmost respect for student confidentiality, parental consent, and regulatory education compliance.
          </p>
        </div>

        {/* 4 Security Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-7 border border-[#E5EAF2] hover:border-blue-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#EEF5FF] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#172033] mb-1">
                  {item.title}
                </h3>

                <p className="text-xs font-semibold text-[#1557D6] mb-3">
                  {item.subtitle}
                </p>

                <p className="text-xs text-[#667085] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#20A66A]">
                <CheckCircle2 className="w-4 h-4 text-[#20A66A]" />
                <span>Verified Security Control</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
