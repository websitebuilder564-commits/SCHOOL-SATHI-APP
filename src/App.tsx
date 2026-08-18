import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LoginPage, LoginSector } from './pages/login/LoginPage';
import { PortalSelectionPage } from './pages/portal-selection/PortalSelectionPage';
import { SchoolSaathiWebsite } from './pages/website/SchoolSaathiWebsite';
import { StudentPortal } from './pages/student/StudentPortal';
import { ParentPortal } from './pages/parent/ParentPortal';
import { TeacherPortal } from './pages/teacher/TeacherPortal';
import { ManagementPortal } from './pages/management/ManagementPortal';
import { SplashScreen } from './components/splash/SplashScreen';
import { UserRole } from './types';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading, logout, switchDemoRole } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);
  
  // App view state: 'selection' (Portal Choice Hub), 'login' (Credentials Form), 'portal' (Active Role Dashboard), 'website' (Institutional Landing Page)
  const [viewMode, setViewMode] = useState<'selection' | 'login' | 'portal' | 'website'>('selection');
  const [selectedLoginSector, setSelectedLoginSector] = useState<LoginSector>('student');

  // If user completes login via LoginPage form, transition to portal view
  useEffect(() => {
    if (isAuthenticated && user && viewMode === 'login') {
      setViewMode('portal');
      setActiveTab('dashboard');
    }
  }, [isAuthenticated, user, viewMode]);

  // 1. Splash Screen Phase
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // 2. Global Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07132B] flex flex-col items-center justify-center text-white space-y-4">
        <div className="w-10 h-10 border-4 border-[#0084FF] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-semibold text-slate-300">Loading SchoolSaathi AI Platform...</p>
      </div>
    );
  }

  // 3. School Saathi Institutional Website Landing Page
  if (viewMode === 'website') {
    return (
      <SchoolSaathiWebsite
        onOpenPortal={(sector) => {
          if (sector) {
            switchDemoRole(sector as UserRole);
            setViewMode('portal');
            setActiveTab('dashboard');
          } else {
            setViewMode('selection');
          }
        }}
        onOpenLiveDemo={() => {
          const el = document.getElementById('ai-assistant');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    );
  }

  // 4. Portal Selection Screen (Choose Student, Parent, Teacher, Principal)
  if (viewMode === 'selection') {
    return (
      <PortalSelectionPage
        onSelectPortal={(role: UserRole) => {
          setViewMode('portal');
          setActiveTab('dashboard');
        }}
        onOpenCredentialLogin={(sector: LoginSector) => {
          setSelectedLoginSector(sector);
          setViewMode('login');
        }}
        onBackToWebsite={() => setViewMode('website')}
      />
    );
  }

  // 5. Specific Credential Login Page
  if (viewMode === 'login' || !isAuthenticated || !user) {
    return (
      <LoginPage
        initialSector={selectedLoginSector}
        onBackToSelection={() => setViewMode('selection')}
      />
    );
  }

  // 6. Active Role-Isolated Portal Views
  const renderPortalView = () => {
    switch (user.role) {
      case 'student':
        return <StudentPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'parent':
        return <ParentPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'teacher':
        return <TeacherPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'principal':
        return <ManagementPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
      default:
        return <StudentPortal activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Top Universal App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        onSwitchPortal={() => setViewMode('selection')}
        onVisitWebsite={() => setViewMode('website')}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Role-Isolated Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
          onSwitchPortal={() => setViewMode('selection')}
          onVisitWebsite={() => setViewMode('website')}
        />

        {/* Content View Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full overflow-x-hidden">
          {renderPortalView()}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
}
