import React from 'react';
import {
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  Calendar,
  Bell,
  Sparkles,
  LifeBuoy,
  Settings,
  Users,
  UserCheck,
  BarChart3,
  ClipboardList,
  ShieldAlert,
  BookOpen,
  X,
  School,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { UserRole } from '../../types';
import { Logo } from '../brand/Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
  onSwitchPortal?: () => void;
  onVisitWebsite?: () => void;
  className?: string;
}

interface NavItemConfig {
  id: string;
  labelKey: string;
  fallbackLabel: string;
  icon: React.ReactNode;
  isAi?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen = false,
  setIsMobileOpen,
  onSwitchPortal,
  onVisitWebsite,
  className = '',
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  if (!user) return null;

  const roleNavItems: Record<UserRole, NavItemConfig[]> = {
    student: [
      { id: 'dashboard', labelKey: 'dashboard', fallbackLabel: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'attendance', labelKey: 'myAttendance', fallbackLabel: 'My Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
      { id: 'academics', labelKey: 'myAcademics', fallbackLabel: 'My Academics', icon: <GraduationCap className="w-4 h-4" /> },
      { id: 'schedule', labelKey: 'schedule', fallbackLabel: 'Class Schedule', icon: <Calendar className="w-4 h-4" /> },
      { id: 'notifications', labelKey: 'notifications', fallbackLabel: 'Notifications', icon: <Bell className="w-4 h-4" /> },
      { id: 'xyzai', labelKey: 'openXyzAi', fallbackLabel: 'SchoolSaathi AI', icon: <Sparkles className="w-4 h-4 text-[#00C2FF]" />, isAi: true },
      { id: 'support', labelKey: 'support', fallbackLabel: 'Support & Help', icon: <LifeBuoy className="w-4 h-4" /> },
      { id: 'security', labelKey: 'securityTesting', fallbackLabel: 'Security Sandbox', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
      { id: 'settings', labelKey: 'settings', fallbackLabel: 'Settings', icon: <Settings className="w-4 h-4" /> },
    ],
    parent: [
      { id: 'dashboard', labelKey: 'dashboard', fallbackLabel: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'children', labelKey: 'myChildren', fallbackLabel: 'My Children', icon: <Users className="w-4 h-4" /> },
      { id: 'attendance', labelKey: 'attendance', fallbackLabel: 'Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
      { id: 'academics', labelKey: 'academics', fallbackLabel: 'Academics', icon: <GraduationCap className="w-4 h-4" /> },
      { id: 'teachers', labelKey: 'teachers', fallbackLabel: 'Teachers', icon: <UserCheck className="w-4 h-4" /> },
      { id: 'notifications', labelKey: 'notifications', fallbackLabel: 'Notifications', icon: <Bell className="w-4 h-4" /> },
      { id: 'xyzai', labelKey: 'openXyzAi', fallbackLabel: 'SchoolSaathi AI', icon: <Sparkles className="w-4 h-4 text-[#00C2FF]" />, isAi: true },
      { id: 'support', labelKey: 'support', fallbackLabel: 'Support & Help', icon: <LifeBuoy className="w-4 h-4" /> },
      { id: 'security', labelKey: 'securityTesting', fallbackLabel: 'Security Sandbox', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
      { id: 'settings', labelKey: 'settings', fallbackLabel: 'Settings', icon: <Settings className="w-4 h-4" /> },
    ],
    teacher: [
      { id: 'dashboard', labelKey: 'dashboard', fallbackLabel: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'classes', labelKey: 'myClasses', fallbackLabel: 'My Classes', icon: <BookOpen className="w-4 h-4" /> },
      { id: 'attendance', labelKey: 'markAttendance', fallbackLabel: 'Mark Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
      { id: 'students', labelKey: 'students', fallbackLabel: 'Students Roster', icon: <Users className="w-4 h-4" /> },
      { id: 'analytics', labelKey: 'analytics', fallbackLabel: 'Class Analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'notifications', labelKey: 'notifications', fallbackLabel: 'Notifications', icon: <Bell className="w-4 h-4" /> },
      { id: 'xyzai', labelKey: 'openXyzAi', fallbackLabel: 'SchoolSaathi AI Gateway', icon: <Sparkles className="w-4 h-4 text-[#00C2FF]" />, isAi: true },
      { id: 'support', labelKey: 'support', fallbackLabel: 'Escalations & Inquiries', icon: <LifeBuoy className="w-4 h-4" /> },
      { id: 'security', labelKey: 'securityTesting', fallbackLabel: 'Security Sandbox', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
      { id: 'settings', labelKey: 'settings', fallbackLabel: 'Settings', icon: <Settings className="w-4 h-4" /> },
    ],
    principal: [
      { id: 'dashboard', labelKey: 'dashboard', fallbackLabel: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
      { id: 'analytics', labelKey: 'analytics', fallbackLabel: 'School Analytics', icon: <BarChart3 className="w-4 h-4" /> },
      { id: 'attendance', labelKey: 'attendance', fallbackLabel: 'School Attendance', icon: <CalendarCheck className="w-4 h-4" /> },
      { id: 'audit', labelKey: 'auditLogs', fallbackLabel: 'Audit Logs', icon: <ClipboardList className="w-4 h-4" /> },
      { id: 'xyzai', labelKey: 'openXyzAi', fallbackLabel: 'SchoolSaathi AI Gateway', icon: <Sparkles className="w-4 h-4 text-[#00C2FF]" />, isAi: true },
      { id: 'support', labelKey: 'support', fallbackLabel: 'Support Desk', icon: <LifeBuoy className="w-4 h-4" /> },
      { id: 'security', labelKey: 'securityTesting', fallbackLabel: 'Security Sandbox', icon: <ShieldAlert className="w-4 h-4 text-amber-400" /> },
      { id: 'settings', labelKey: 'settings', fallbackLabel: 'Settings', icon: <Settings className="w-4 h-4" /> },
    ],
  };

  const navItems = roleNavItems[user.role] || roleNavItems.student;

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0A1E4A] text-slate-200 border-r border-[#143474] select-none">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-[#143474] flex items-center justify-between">
        <Logo variant="horizontal" theme="dark" size="sm" showTagline={false} />
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-[#00C2FF]/90 flex items-center justify-between">
          <span>{user.role} workspace</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0084FF] animate-ping" />
        </div>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (setIsMobileOpen) setIsMobileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-[#0084FF] text-white shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-[#143474]/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#00C2FF]'}`}>
                  {item.icon}
                </span>
                <span>{t(item.labelKey, item.fallbackLabel)}</span>
              </div>
              {item.isAi && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded-md font-black uppercase tracking-wider ${
                    isActive ? 'bg-white/20 text-white' : 'bg-[#0084FF]/20 text-[#00C2FF] border border-[#0084FF]/40'
                  }`}
                >
                  AI
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* School Affiliation Footer Card */}
      <div className="p-3.5 m-3 bg-[#061330] border border-[#143474] rounded-2xl text-xs space-y-2">
        <div>
          <div className="flex items-center gap-2 text-slate-200 font-bold">
            <School className="w-4 h-4 text-[#0084FF] shrink-0" />
            <span className="truncate">Delhi Model Public School</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">Academic Year 2026-27 • Term 1</p>
        </div>

        {onSwitchPortal && (
          <button
            onClick={() => {
              if (setIsMobileOpen) setIsMobileOpen(false);
              onSwitchPortal();
            }}
            className="w-full py-1.5 px-2.5 bg-[#0A1E4A] hover:bg-[#143474] border border-[#143474] text-[#00C2FF] rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Change Portal / Role</span>
          </button>
        )}

        {onVisitWebsite && (
          <button
            onClick={() => {
              if (setIsMobileOpen) setIsMobileOpen(false);
              onVisitWebsite();
            }}
            className="w-full py-1.5 px-2.5 bg-[#1557D6]/30 hover:bg-[#1557D6]/50 border border-blue-500/30 text-white rounded-xl text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>🌐 School Saathi Website</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden lg:flex w-64 shrink-0 flex-col min-h-screen ${className}`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
