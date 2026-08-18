import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  Search, 
  Globe, 
  LogOut, 
  ChevronDown, 
  Sparkles, 
  GraduationCap, 
  Users, 
  UserCheck, 
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Menu
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { notificationService } from '../../services/notificationService';
import { UserRole } from '../../types';
import { Badge } from '../ui/Badge';
import { Logo } from '../brand/Logo';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onOpenSupportModal?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  onToggleMobileSidebar?: () => void;
  onSwitchPortal?: () => void;
  onVisitWebsite?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  setActiveTab,
  onToggleMobileSidebar,
  onSwitchPortal,
  onVisitWebsite,
}) => {
  const { user, logout, switchDemoRole } = useAuth();
  const { language, setLanguage, t, languageOptions } = useLanguage();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const langRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const notifications = user ? notificationService.getNotificationsForRole(user.role) : [];
  const unreadCount = user ? notificationService.getUnreadCount(user.role) : 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setIsRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const roleDetails: Record<UserRole, { label: string; icon: React.ReactNode; color: string; badgeVariant: 'primary' | 'success' | 'warning' | 'purple' }> = {
    student: { label: t('studentRole'), icon: <GraduationCap className="w-3.5 h-3.5" />, color: 'bg-[#0084FF]', badgeVariant: 'primary' },
    parent: { label: t('parentRole'), icon: <Users className="w-3.5 h-3.5" />, color: 'bg-emerald-600', badgeVariant: 'success' },
    teacher: { label: t('teacherRole'), icon: <UserCheck className="w-3.5 h-3.5" />, color: 'bg-amber-600', badgeVariant: 'warning' },
    principal: { label: t('principalRole'), icon: <ShieldCheck className="w-3.5 h-3.5" />, color: 'bg-purple-600', badgeVariant: 'purple' },
  };

  const currentRoleInfo = user ? roleDetails[user.role] : roleDetails.student;

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 lg:px-8 py-2.5 transition-all shadow-xs">
      <div className="flex items-center justify-between gap-3 max-w-[1600px] mx-auto">
        {/* Left side: Mobile menu toggle + Logo preview / Search bar */}
        <div className="flex items-center gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <div className="lg:hidden">
            <Logo variant="horizontal" size="sm" showTagline={false} />
          </div>

          <div className="flex-1 max-w-md hidden lg:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={t('searchPlaceholder')}
                className="w-72 xl:w-96 pl-10 pr-4 py-2 text-xs bg-slate-100 hover:bg-slate-100 focus:bg-white text-slate-900 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-[#0084FF] focus:ring-2 focus:ring-[#0084FF]/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2 lg:gap-3 ml-auto">
          {/* Quick Demo Role Switcher */}
          <div className="relative" ref={roleRef}>
            <button
              onClick={() => setIsRoleSwitcherOpen(!isRoleSwitcherOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 transition-colors border border-slate-200/60"
              title="Switch demo account role"
            >
              <span className={`w-2 h-2 rounded-full ${currentRoleInfo.color} animate-pulse`} />
              <span className="hidden md:inline text-slate-500 font-normal">Role:</span>
              <span>{currentRoleInfo.label}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {isRoleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Demo Account
                  </p>
                  {onSwitchPortal && (
                    <button
                      onClick={() => {
                        onSwitchPortal();
                        setIsRoleSwitcherOpen(false);
                      }}
                      className="text-[10px] text-[#0084FF] font-bold hover:underline"
                    >
                      All Portals →
                    </button>
                  )}
                </div>
                {(['student', 'parent', 'teacher', 'principal'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      switchDemoRole(r);
                      setIsRoleSwitcherOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left hover:bg-slate-50 transition-colors ${
                      user?.role === r ? 'bg-blue-50/70 font-semibold text-[#0084FF]' : 'text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-1.5 rounded-lg text-white ${roleDetails[r].color}`}>
                        {roleDetails[r].icon}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{roleDetails[r].label}</p>
                        <p className="text-[10px] text-slate-400 font-normal">
                          {r === 'student' && 'Rahul Sharma (8A)'}
                          {r === 'parent' && 'Anita Sharma'}
                          {r === 'teacher' && 'Amit Kumar (Faculty)'}
                          {r === 'principal' && 'Dr. Priya Sen'}
                        </p>
                      </div>
                    </div>
                    {user?.role === r && <CheckCircle2 className="w-4 h-4 text-[#0084FF]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* AI Assistant Quick Launcher */}
          <button
            onClick={() => setActiveTab && setActiveTab('xyzai')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-[#0084FF] text-white hover:from-sky-600 hover:to-[#0070DB] rounded-xl text-xs font-bold shadow-xs transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
            <span className="hidden sm:inline">SchoolSaathi AI</span>
            <span className="px-1.5 py-0.2 text-[9px] bg-white/25 rounded-full font-black">ACTIVE</span>
          </button>

          {/* Language Selector */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-1 text-xs"
              title="Change Language"
            >
              <Globe className="w-4 h-4 text-[#0084FF]" />
              <span className="font-bold uppercase text-[11px]">{language}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-48 max-h-72 overflow-y-auto bg-white rounded-2xl shadow-xl border border-slate-200 py-1 z-50">
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                  {t('language')} (11 Languages)
                </div>
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-1.5 text-xs text-left hover:bg-slate-50 transition-colors ${
                      language === opt.code ? 'bg-blue-50 font-bold text-[#0084FF]' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{opt.flag}</span>
                      <span>{opt.nativeName}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">{opt.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between p-3.5 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{t('notifications')}</h4>
                    {unreadCount > 0 && <Badge variant="primary" size="sm">{unreadCount} new</Badge>}
                  </div>
                  {user && (
                    <button
                      onClick={() => notificationService.markAllAsRead(user.role)}
                      className="text-[11px] text-[#0084FF] hover:underline font-semibold"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No notifications available.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          notificationService.markAsRead(n.id);
                        }}
                        className={`p-3 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                          !n.isRead ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 shrink-0">
                            {n.priority === 'high' ? (
                              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0084FF]" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-[11px] leading-tight">{n.title}</p>
                            <p className="text-slate-600 text-[11px] mt-1 leading-snug">{n.message}</p>
                            <p className="text-[10px] text-slate-400 mt-1.5">{n.date}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0084FF]/20"
              />
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">{user?.name || 'Demo User'}</p>
                <p className="text-[10px] text-slate-500 capitalize">{user?.role || 'Guest'}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3.5 py-2.5 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                  <div className="mt-2">
                    <Badge variant={currentRoleInfo.badgeVariant} size="sm">
                      {currentRoleInfo.label}
                    </Badge>
                  </div>
                </div>

                <div className="py-1">
                  {onVisitWebsite && (
                    <button
                      onClick={() => {
                        onVisitWebsite();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-[#1557D6] hover:bg-blue-50 font-bold flex items-center justify-between"
                    >
                      <span>🌐 School Saathi Website</span>
                      <span className="text-[10px] bg-blue-100 px-1.5 py-0.5 rounded">Home</span>
                    </button>
                  )}
                  {onSwitchPortal && (
                    <button
                      onClick={() => {
                        onSwitchPortal();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50 font-semibold flex items-center justify-between"
                    >
                      <span>Switch Portal</span>
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">All 4</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab('settings');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    {t('settings')}
                  </button>
                  <button
                    onClick={() => {
                      if (setActiveTab) setActiveTab('support');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    {t('support')}
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    {t('logout')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
