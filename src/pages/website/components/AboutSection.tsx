import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Award,
  ArrowRight,
  GraduationCap,
  Users,
  Building,
  HeartHandshake
} from 'lucide-react';
import { WEBSITE_IMAGES } from '../websiteAssets';

interface AboutSectionProps {
  onOpenPortal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPortal }) => {
  const checklist = [
    { title: 'Secure school communication', desc: 'End-to-end encrypted messaging between teachers, parents, and admins.' },
    { title: 'Smart biometric & RFID attendance', desc: 'Instant automated alerts to parents upon campus entry & exit.' },
    { title: 'Digital assignment management', desc: 'Seamless homework distribution, submission, and rubric-based grading.' },
    { title: 'Holistic academic progress tracking', desc: 'Real-time gradebooks, analytics, and printable CBSE/ICSE report cards.' },
    { title: 'Smart instant push notifications', desc: 'Never miss fee deadlines, school circulars, or weather holidays.' },
    { title: '24/7 AI-powered assistance', desc: 'Personalized doubt-clearing and instant answers for all school stakeholders.' },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage with Overlapping Rounded Images (Matches Reference Design) */}
          <div className="lg:col-span-6 relative">
            {/* Background Decorative Pattern & Blobs */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-teal-100/60 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-amber-100/60 rounded-full blur-3xl -z-10" />

            <div className="relative grid grid-cols-12 gap-4">
              {/* Primary Large Image */}
              <div className="col-span-7 relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[360px] sm:h-[440px]">
                  <img
                    src={WEBSITE_IMAGES.aboutPrimary}
                    alt="Students collaborating in modern classroom"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Overlapping Badge: "Built for Better Schools" */}
                <div className="absolute -bottom-5 -right-5 sm:-right-8 bg-[#0B2545] text-white p-4 sm:p-5 rounded-3xl shadow-xl border-2 border-white flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-white shrink-0 shadow">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-amber-300">Built For</div>
                    <div className="text-sm sm:text-base font-extrabold text-white">Better Schools</div>
                  </div>
                </div>
              </div>

              {/* Right Side: Two Smaller Overlapping Images */}
              <div className="col-span-5 space-y-4 pt-6">
                {/* Secondary Image 1 */}
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[170px] sm:h-[200px]">
                  <img
                    src={WEBSITE_IMAGES.aboutSecondary1}
                    alt="Teacher assisting student with digital tablet"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Secondary Image 2 */}
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white h-[170px] sm:h-[200px]">
                  <img
                    src={WEBSITE_IMAGES.aboutSecondary2}
                    alt="High school science laboratory session"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Quality Service Milestone Card (Yellow/Amber Card in Reference) */}
            <div className="mt-8 sm:mt-10 p-5 rounded-3xl bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-white shadow-xl flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black">Trusted by 500+ Institutions</div>
                  <div className="text-xs font-medium text-amber-950">Empowering 25,000+ Students Daily across India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Text, Headings & Feature Checklist */}
          <div className="lg:col-span-6 space-y-6">
            {/* Small Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-bold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>ABOUT SCHOOL SAATHI</span>
            </div>

            {/* Main Section Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight leading-[1.18]">
              Connecting Every Part of the{' '}
              <span className="text-[#0F766E]">School Community</span>
            </h2>

            {/* Explanatory Body Copy */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              School Saathi brings students, teachers, parents, and school administrators together through a secure, cloud-native, and intelligent digital ecosystem. We replace disconnected spreadsheets and paper circulars with unified real-time dashboards.
            </p>

            {/* Two-Column Feature Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-teal-50/50 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-bold text-[#0B2545]">{item.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions & Contact Link */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <button
                type="button"
                onClick={onOpenPortal}
                className="px-7 py-3.5 bg-[#0F766E] hover:bg-[#0D655E] text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-700/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Discover More</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 text-left">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 text-[#D97706] flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-400 font-medium uppercase">Call Us Toll-Free</div>
                  <a href="tel:18001204455" className="text-sm font-bold text-[#0B2545] hover:text-[#0F766E]">
                    1800-120-4455
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
