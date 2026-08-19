import React from 'react';
import {
  Star,
  Quote,
  GraduationCap,
  Users,
  HeartHandshake,
  Building,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      role: 'Class 10 Student',
      curriculum: 'CBSE Board Section',
      quote:
        'School Saathi makes it so much easier to keep track of assignments, attendance, and exam blueprints. The AI study tutor explains tricky physics numericals instantly whenever I get stuck at night.',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      role: 'Parent of Grade 8 Student',
      curriculum: 'DPS R.K. Puram PTA Member',
      quote:
        'The live bus GPS tracking and automated gate notifications give our family total peace of mind. Paying quarterly fees via UPI and downloading receipts in one click saved us multiple school visits.',
      icon: HeartHandshake,
      color: 'from-amber-500 to-orange-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      role: 'Senior Science Teacher',
      curriculum: '12+ Years Teaching Experience',
      quote:
        'Taking attendance used to take 10 minutes of every period. With School Saathi, it takes under 30 seconds. Assigning homework, grading with rubrics, and sending circulars is completely automated.',
      icon: Users,
      color: 'from-blue-600 to-indigo-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      role: 'School Principal & Trustee',
      curriculum: 'CBSE Affiliated Senior Secondary School',
      quote:
        'School Saathi unified our academic gradebooks, fee accounts, compliance reports, and parent communication into a single secure platform. Institutional efficiency increased by over 40%.',
      icon: Building,
      color: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>COMMUNITY VOICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
            Trusted by the Entire School Community
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Hear how students, parents, teachers, and school heads experience the transformation with School Saathi.
          </p>
        </div>

        {/* 4-Card Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Role Badge & Icon */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#0F766E] to-[#0B2545] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#0B2545] group-hover:text-[#0F766E] transition-colors">
                      {item.role}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {item.curriculum}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
