import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Phone,
  MapPin,
  Globe,
  Menu,
  X,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
} from 'lucide-react';
import { Logo } from '../../../components/brand/Logo';

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
      if (window.scrollY > 30) {
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
    { label: 'Features', href: '#features' },
    { label: 'AI Assistant', href: '#ai-assistant' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Roles', href: '#roles' },
    { label: 'Technology', href: '#technology' },
    { label: 'Security', href: '#security' },
  ];

  return (
    <>
      {/* Top Institutional Utility Strip */}
      <div id="website-top-strip" className="bg-[#0B1736] text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>National Toll-Free: <strong>1800-120-4455</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>CBSE Affiliation No. 2730048 • New Delhi, India</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-[#00C2FF]" />
              <span>11 Indian Languages Supported</span>
            </div>
            <div className="h-3 w-px bg-slate-700" />
            <button
              onClick={() => onOpenPortal()}
              className="text-[#00C2FF] hover:text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>ERP Portal Login</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Bar */}
      <header
        id="website-main-nav"
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-slate-200'
            : 'bg-white py-4 sm:py-5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1557D6] to-[#0B1736] flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-[#0B1736]">
                  SCHOOL<span className="text-[#1557D6]">SAATHI</span>
                </span>
                <span className="bg-[#EEF5FF] text-[#1557D6] text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-[#1557D6]/20 uppercase">
                  AI ERP
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-500 leading-none tracking-wide">
                Smart School AI Assistant
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 hover:text-[#1557D6] transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#1557D6] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="header-view-demo-btn"
              onClick={onOpenLiveDemo}
              className="px-4 py-2 text-sm font-semibold text-[#1557D6] hover:bg-[#EEF5FF] rounded-xl border border-[#1557D6]/30 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#1557D6]" />
              <span>Try AI Demo</span>
            </button>
            <button
              id="header-get-started-btn"
              onClick={() => onOpenPortal()}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#1557D6] hover:bg-[#0B45B5] active:bg-[#0B1736] rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center gap-2 cursor-pointer hover:translate-y-[-1px]"
            >
              <span>Launch Portals</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#1557D6] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3 mb-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-semibold text-slate-800 hover:text-[#1557D6] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLiveDemo();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#1557D6] bg-[#EEF5FF] border border-[#1557D6]/20 rounded-xl"
              >
                Try AI Demo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPortal();
                }}
                className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-[#1557D6] hover:bg-[#0B45B5] rounded-xl shadow-md"
              >
                Launch School ERP Portals
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
