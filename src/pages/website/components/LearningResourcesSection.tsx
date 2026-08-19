import React from 'react';
import {
  BookOpen,
  Sparkles,
  ArrowRight,
  Star,
  Layers,
  GraduationCap,
  PlayCircle,
  FileText
} from 'lucide-react';
import { WEBSITE_IMAGES } from '../websiteAssets';

interface LearningResourcesSectionProps {
  onExploreResource?: (subject: string) => void;
}

export const LearningResourcesSection: React.FC<LearningResourcesSectionProps> = ({ onExploreResource }) => {
  const subjects = [
    {
      title: 'Mathematics',
      category: 'STEM Core',
      desc: 'Calculus, Trigonometry, Vectors, Probability and Coordinate Geometry aligned with CBSE Class 9–12.',
      lessons: '48 Modules',
      rating: '4.9',
      image: WEBSITE_IMAGES.courses.mathematics,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Physics',
      category: 'Science & Lab',
      desc: 'Classical Mechanics, Wave Optics, Electromagnetism, Thermodynamics and digital lab simulation guides.',
      lessons: '52 Modules',
      rating: '4.9',
      image: WEBSITE_IMAGES.courses.physics,
      color: 'bg-teal-50 text-teal-600',
    },
    {
      title: 'Chemistry',
      category: 'Science & Lab',
      desc: 'Organic Reaction Mechanisms, Chemical Bonding, Coordination Compounds and Periodic Trends.',
      lessons: '44 Modules',
      rating: '4.8',
      image: WEBSITE_IMAGES.courses.chemistry,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      title: 'Computer Science',
      category: 'Technology',
      desc: 'Python programming, SQL databases, Object-Oriented Design, and Cyber Safety principles.',
      lessons: '60 Modules',
      rating: '5.0',
      image: WEBSITE_IMAGES.courses.computerScience,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'English & Literature',
      category: 'Humanities',
      desc: 'Grammar mastery, Shakespearean & contemporary prose analysis, report writing, and communication.',
      lessons: '38 Modules',
      rating: '4.8',
      image: WEBSITE_IMAGES.courses.english,
      color: 'bg-rose-50 text-rose-600',
    },
    {
      title: 'Artificial Intelligence',
      category: 'Emerging Tech',
      desc: 'Machine Learning basics, ethical AI usage, prompt engineering, and hands-on computer vision projects.',
      lessons: '40 Modules',
      rating: '4.9',
      image: WEBSITE_IMAGES.courses.artificialIntelligence,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <section id="resources" className="py-20 sm:py-28 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[#0F766E] text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>ACADEMIC EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2545] tracking-tight">
            Explore Learning Resources
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Curated, interactive digital textbooks, video explanations, animated simulations, and sample board exam question papers.
          </p>
        </div>

        {/* 6-Card Grid (Matching Reference Card Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Subject Thumbnail Image with Tag */}
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Pill Tag on Image */}
                  <span className="absolute top-3.5 right-3.5 px-3 py-1 bg-amber-500 text-slate-950 font-bold text-[11px] rounded-full shadow">
                    {item.category}
                  </span>

                  {/* Rating / Lessons Badge */}
                  <div className="absolute bottom-3 left-3.5 flex items-center gap-3 text-xs text-white font-medium">
                    <span className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/20">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      {item.rating}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-lg border border-white/20">
                      {item.lessons}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#0B2545] mb-2 group-hover:text-[#0F766E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Explore Button */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">CBSE / ICSE Aligned</span>
                <button
                  type="button"
                  onClick={() => onExploreResource && onExploreResource(item.title)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0F766E] hover:bg-[#0B2545] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer group-hover:scale-105"
                >
                  <span>Explore</span>
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
