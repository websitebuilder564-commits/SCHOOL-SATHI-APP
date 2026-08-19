import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Phone,
  Mail,
  HelpCircle,
  Globe,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  LogIn,
  Layers,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram
} from 'lucide-react';

interface WebsiteHeaderProps {
  onOpenPortal: (targetSector?: 'student' | 'parent' | 'teacher' | 'principal') => void;
  onOpenLiveDemo: () => void;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  onOpenPortal,
  onOpenLiveDemo,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Students', href: '#students' },
    { label: 'Teachers', href: '#teachers' },
    { label: 'Parents', href: '#parents' },
    { label: 'Features', href: '#features' },
    { label: 'Resources', href: '#resources' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* 1. Slim Top Utility Information Bar (Reference Style) */}
      <div id="website-top-strip" className="bg-[#0B1E36] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Contact Info & Support Email */}
          <div className="flex items-center gap-6">
            <a
              href="tel:18001204455"
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Support: <strong>1800-120-4455</strong></span>
            </a>
            
            <a
              href="mailto:support@schoolsaathi.in"
              className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors text-slate-300"
            >
              <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>contact@schoolsaathi.in</span>
            </a>

            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Smart School Platform • 24/7 Live</span>
            </div>
          </div>

          {/* Right: Portal Help, Language, & Social Media Icons */}
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={onOpenLiveDemo}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>AI Helpdesk</span>
            </button>

            <div className="h-3 w-px bg-slate-700" />

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#social" className="hover:text-blue-400 transition-colors" title="Facebook" aria-label="Facebook">
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a href="#social" className="hover:text-sky-400 transition-colors" title="Twitter / X" aria-label="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
              <a href="#social" className="hover:text-blue-500 transition-colors" title="LinkedIn" aria-label="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a href="#social" className="hover:text-red-500 transition-colors" title="YouTube" aria-label="YouTube">
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a href="#social" className="hover:text-pink-400 transition-colors" title="Instagram" aria-label="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Sticky Navigation Bar */}
      <header
        id="website-main-nav"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* School Saathi Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F766E] to-[#0B2545] flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#0B2545]">
                  School <span className="text-[#F59E0B]">Saathi</span>
                </span>
                <span className="px-1.5 py-0.2 bg-teal-50 text-[#0F766E] text-[10px] font-bold rounded border border-teal-200">
                  Smart AI
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide">
                Your Smart Companion for Better Schools
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#0F766E] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#F59E0B] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenPortal()}
              className="px-4 py-2 text-xs font-bold text-[#0B2545] hover:text-[#0F766E] bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>Login</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenPortal()}
              className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#F59E0B] via-[#EA580C] to-[#D97706] hover:brightness-105 shadow-md shadow-amber-500/25 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => onOpenPortal()}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#0F766E] rounded-lg shadow-sm"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col space-y-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-semibold text-slate-800 hover:text-[#0F766E] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 text-xs font-bold text-[#0B2545] bg-slate-100 rounded-xl text-center"
              >
                Portal Login
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#F59E0B] to-[#EA580C] rounded-xl text-center shadow"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
