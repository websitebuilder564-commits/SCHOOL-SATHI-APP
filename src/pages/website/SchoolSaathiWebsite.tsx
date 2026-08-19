import React from 'react';
import { WebsiteHeader } from './components/WebsiteHeader';
import { HeroSection } from './components/HeroSection';
import { HeroFeatureStrip } from './components/HeroFeatureStrip';
import { AboutSection } from './components/AboutSection';
import { StatisticsSection } from './components/StatisticsSection';
import { FeaturesGridSection } from './components/FeaturesGridSection';
import { StudentExperienceSection } from './components/StudentExperienceSection';
import { TeacherExperienceSection } from './components/TeacherExperienceSection';
import { ParentExperienceSection } from './components/ParentExperienceSection';
import { AiAssistantSection } from './components/AiAssistantSection';
import { LearningResourcesSection } from './components/LearningResourcesSection';
import { UpcomingEventsSection } from './components/UpcomingEventsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { CtaSection } from './components/CtaSection';
import { WebsiteFooter } from './components/WebsiteFooter';

interface SchoolSaathiWebsiteProps {
  onOpenPortal: (sector?: 'student' | 'parent' | 'teacher' | 'principal') => void;
  onOpenLiveDemo: () => void;
}

export const SchoolSaathiWebsite: React.FC<SchoolSaathiWebsiteProps> = ({
  onOpenPortal,
  onOpenLiveDemo,
}) => {
  const handleScrollToAi = () => {
    const el = document.getElementById('ai-assistant');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0B2545] antialiased selection:bg-[#0F766E] selection:text-white font-sans">
      {/* 1. Header with Slim Top Bar & Sticky Navbar */}
      <WebsiteHeader
        onOpenPortal={onOpenPortal}
        onOpenLiveDemo={handleScrollToAi}
      />

      {/* 2. Full-Width Impact Hero Section */}
      <HeroSection
        onOpenPortal={() => onOpenPortal()}
        onOpenLiveDemo={handleScrollToAi}
      />

      {/* 3. Four Overlapping Modern Feature Cards (01 to 04) */}
      <HeroFeatureStrip />

      {/* 4. Visually Rich Two-Column About Section with Student Photo Collage */}
      <AboutSection onOpenPortal={() => onOpenPortal()} />

      {/* 5. Full-Width Image-Backed Statistics Section (500+ Schools, 25K+ Students, 2K+ Teachers, 99% Satisfaction) */}
      <StatisticsSection />

      {/* 6. Comprehensive Platform Features Grid (12 Cards) */}
      <FeaturesGridSection />

      {/* 7. Student Experience Interactive Dashboard Mockup */}
      <StudentExperienceSection onOpenPortal={onOpenPortal} />

      {/* 8. Teacher Experience Dashboard Mockup */}
      <TeacherExperienceSection onOpenPortal={onOpenPortal} />

      {/* 9. Parent Experience & Live Bus GPS Telemetry */}
      <ParentExperienceSection onOpenPortal={onOpenPortal} />

      {/* 10. AI School Assistant Interactive Simulation */}
      <AiAssistantSection />

      {/* 11. Explore Learning Resources (Math, Physics, Chemistry, CS, English, AI) */}
      <LearningResourcesSection onExploreResource={() => onOpenPortal('student')} />

      {/* 12. Upcoming Campus Events & Academic Calendar */}
      <UpcomingEventsSection />

      {/* 13. Testimonials from Students, Parents, Teachers & Principals */}
      <TestimonialsSection />

      {/* 14. Large Premium Call-To-Action Banner */}
      <CtaSection
        onOpenPortal={() => onOpenPortal()}
        onOpenLiveDemo={handleScrollToAi}
      />

      {/* 15. Multi-Column Institutional Footer */}
      <WebsiteFooter onOpenPortal={onOpenPortal} />
    </div>
  );
};
