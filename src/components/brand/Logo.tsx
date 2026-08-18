import React from 'react';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'icon';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const LogoMark: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 420"
      width={size}
      height={size * (420 / 500)}
      className={`shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sBlueGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C2FF" />
          <stop offset="50%" stopColor="#0084FF" />
          <stop offset="100%" stopColor="#0052CC" />
        </linearGradient>
        <linearGradient id="capNavyGradComp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#143474" />
          <stop offset="100%" stopColor="#091838" />
        </linearGradient>
        <filter id="logoShadowComp" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#003b8e" floodOpacity="0.18" />
        </filter>
      </defs>

      <g transform="translate(0, 10)">
        {/* Cap Top Diamond */}
        <g filter="url(#logoShadowComp)">
          <polygon points="250,45 385,102 250,158 115,102" fill="url(#capNavyGradComp)" />
          <path d="M 175,124 Q 250,156 325,124 L 325,142 Q 250,175 175,142 Z" fill="#0A1C40" />
          <circle cx="250" cy="101" r="8" fill="#0084FF" />
          <path d="M 250,101 Q 315,112 348,142 L 350,188" fill="none" stroke="#0084FF" strokeWidth="5" strokeLinecap="round" />
          <polygon points="345,188 355,188 358,212 342,212" fill="#0084FF" />
        </g>

        {/* 'S' Swoosh - Top Arch */}
        <path
          d="M 240,128 C 325,128 368,165 358,218 C 345,268 275,272 240,272"
          fill="none"
          stroke="url(#sBlueGradComp)"
          strokeWidth="48"
          strokeLinecap="round"
        />

        {/* 'S' Swoosh - Bottom Arch */}
        <path
          d="M 260,272 C 215,272 165,290 178,348 C 192,410 305,410 342,352"
          fill="none"
          stroke="url(#sBlueGradComp)"
          strokeWidth="48"
          strokeLinecap="round"
        />

        {/* AI Bot Head Bubble */}
        <g filter="url(#logoShadowComp)">
          <rect x="174" y="222" width="18" height="38" rx="9" fill="#0084FF" />
          <rect x="308" y="222" width="18" height="38" rx="9" fill="#0084FF" />

          {/* Speech Bubble Head */}
          <path
            d="M 250,182 
               C 288,182 316,208 316,240 
               C 316,272 288,298 250,298 
               C 236,298 224,295 216,288 
               L 198,304 
               L 204,280 
               C 192,269 184,256 184,240 
               C 184,208 212,182 250,182 Z"
            fill="#FFFFFF"
            stroke="#0084FF"
            strokeWidth="14"
            strokeLinejoin="round"
          />

          {/* Bot Eyes */}
          <circle cx="230" cy="235" r="8" fill="#0A1E4A" />
          <circle cx="270" cy="235" r="8" fill="#0A1E4A" />

          {/* Smile */}
          <path d="M 240,252 Q 250,262 260,252" fill="none" stroke="#0A1E4A" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const iconSizeMap = {
    sm: 32,
    md: 42,
    lg: 56,
    xl: 72,
  };

  const textScaleMap = {
    sm: { title: 'text-base', badge: 'text-[10px] px-1.5 py-0.5 rounded-md', sub: 'text-[9px]' },
    md: { title: 'text-xl', badge: 'text-xs px-2 py-0.5 rounded-lg', sub: 'text-[11px]' },
    lg: { title: 'text-2xl sm:text-3xl', badge: 'text-sm px-2.5 py-1 rounded-xl', sub: 'text-xs' },
    xl: { title: 'text-3xl sm:text-4xl', badge: 'text-base px-3 py-1.5 rounded-2xl', sub: 'text-sm' },
  };

  const currentScale = textScaleMap[size];
  const isDark = theme === 'dark';

  if (variant === 'icon') {
    return <LogoMark size={iconSizeMap[size]} className={className} />;
  }

  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <div className="flex items-center gap-2.5">
        <LogoMark size={iconSizeMap[size]} />
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight ${currentScale.title} ${isDark ? 'text-white' : 'text-[#0A1E4A]'}`}>
            School<span className="text-[#0084FF]">Saathi</span>
          </span>
          <span className={`font-black bg-[#0084FF] text-white shadow-xs tracking-wider uppercase ${currentScale.badge}`}>
            AI
          </span>
        </div>
      </div>

      {(variant === 'full' || (variant === 'horizontal' && showTagline && (size === 'lg' || size === 'xl'))) && (
        <div className="flex items-center gap-2 mt-1.5 w-full">
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent via-[#0084FF]/60 to-[#0084FF]" />
          <span className={`font-semibold tracking-wide whitespace-nowrap ${currentScale.sub} ${isDark ? 'text-blue-200' : 'text-slate-600'}`}>
            Your AI-Powered School Companion
          </span>
          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent via-[#0084FF]/60 to-[#0084FF]" />
        </div>
      )}
    </div>
  );
};
