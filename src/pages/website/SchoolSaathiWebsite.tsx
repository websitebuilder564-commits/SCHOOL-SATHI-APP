import React from 'react';
import { WebsiteHeader } from './components/WebsiteHeader';
import { HeroSection } from './components/HeroSection';
import { HeroFeatureStrip } from './components/HeroFeatureStrip';
import { ProjectOverviewSection } from './components/ProjectOverviewSection';
import { StatsBanner } from './components/StatsBanner';
import { ProblemStatementSection } from './components/ProblemStatementSection';
import { ObjectivesSection } from './components/ObjectivesSection';
import { KeyFeaturesSection } from './components/KeyFeaturesSection';
import { RolesSection } from './components/RolesSection';
import { AiAssistantSection } from './components/AiAssistantSection';
import { VoiceAvatarSection } from './components/VoiceAvatarSection';
import { MultilingualSection } from './components/MultilingualSection';
import { MockErpApisSection } from './components/MockErpApisSection';
import { EscalationSection } from './components/EscalationSection';
import { SecuritySection } from './components/SecuritySection';
import { CtaSection } from './components/CtaSection';
import { WebsiteFooter } from './components/WebsiteFooter';
import { UserRole } from '../../types';

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
    <div className="min-h-screen bg-white text-[#172033] antialiased selection:bg-[#1557D6] selection:text-white font-sans">
      {/* 1. Header & Navigation */}
      <WebsiteHeader
        onOpenPortal={onOpenPortal}
        onOpenLiveDemo={handleScrollToAi}
      />

      {/* 2. Hero Section */}
      <HeroSection
        onOpenPortal={() => onOpenPortal()}
        onOpenLiveDemo={handleScrollToAi}
      />

      {/* 3. Floating Hero Feature Strip (01-04) */}
      <HeroFeatureStrip />

      {/* 4. Project Overview Section with Editorial Collage */}
      <ProjectOverviewSection onOpenPortal={() => onOpenPortal()} />

      {/* 5. Numerical Metrics & Stats Strip */}
      <StatsBanner />

      {/* 6. Problem Statement Section (4 Cards) */}
      <ProblemStatementSection />

      {/* 7. Main Goal / Objectives (4 Numbered Objectives) */}
      <ObjectivesSection />

      {/* 8. Key Features Showcase Grid (10 Core Modules) */}
      <KeyFeaturesSection />

      {/* 9. User Roles & Permissions Section (Student, Parent, Teacher, Principal) */}
      <RolesSection onOpenPortal={onOpenPortal} />

      {/* 10. AI Assistant / Live Chat Simulator Section */}
      <AiAssistantSection />

      {/* 11. Voice & AI Avatar Section (Deep Navy) */}
      <VoiceAvatarSection onExperienceAi={handleScrollToAi} />

      {/* 12. Multilingual Support Section (11 Indian Languages) */}
      <MultilingualSection />

      {/* 13. Mock School ERP APIs & Data Flow Architecture */}
      <MockErpApisSection />

      {/* 14. Teacher & Management Escalation Section */}
      <EscalationSection />

      {/* 15. Privacy & Security by Design (4 Pillars) */}
      <SecuritySection />

      {/* 16. Institutional Call to Action Banner */}
      <CtaSection
        onOpenPortal={() => onOpenPortal()}
        onOpenLiveDemo={handleScrollToAi}
      />

      {/* 17. Complete Institutional Footer */}
      <WebsiteFooter onOpenPortal={onOpenPortal} />
    </div>
  );
};
