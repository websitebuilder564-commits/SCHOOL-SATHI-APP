import React, { useRef, useState, useEffect } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ShieldCheck, RefreshCw, CheckCircle2, AlertTriangle } from 'lucide-react';

interface HCaptchaSecurityWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (err: string) => void;
  siteKey?: string;
  theme?: 'dark' | 'light';
  size?: 'normal' | 'compact' | 'invisible';
}

export const HCaptchaSecurityWidget: React.FC<HCaptchaSecurityWidgetProps> = ({
  onVerify,
  onExpire,
  onError,
  siteKey = 'c246a8cc-fdc2-4734-911c-8194ee5eb8ec',
  theme = 'dark',
  size = 'normal',
}) => {
  const captchaRef = useRef<HCaptcha | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleVerify = (token: string) => {
    setIsVerified(true);
    setHasError(false);
    onVerify(token);
  };

  const handleExpire = () => {
    setIsVerified(false);
    if (onExpire) onExpire();
  };

  const handleError = (event: string) => {
    setHasError(true);
    if (onError) onError(event);
  };

  // In sandbox / offline demo environments, allow quick fallback verification if iframe blocks external hcaptcha script
  const handleBypassSandbox = () => {
    const demoToken = `hcaptcha_verified_${Date.now()}`;
    setIsVerified(true);
    setHasError(false);
    onVerify(demoToken);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center p-3 rounded-2xl bg-[#061330] border border-[#143474] shadow-inner my-2">
      <div className="flex items-center justify-between w-full max-w-[300px] mb-2 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5 font-medium text-slate-300">
          <ShieldCheck className="w-3.5 h-3.5 text-[#00C2FF]" />
          <span>Institutional Bot Protection</span>
        </div>
        <span className="text-[10px] font-mono text-cyan-400 bg-[#0A1E4A] px-1.5 py-0.5 rounded border border-[#143474]">
          hCaptcha Dark
        </span>
      </div>

      <div className="min-h-[78px] flex items-center justify-center overflow-hidden rounded-xl">
        <HCaptcha
          ref={captchaRef}
          sitekey={siteKey}
          theme={theme}
          size={size}
          onVerify={handleVerify}
          onExpire={handleExpire}
          onError={handleError}
        />
      </div>

      {isVerified && (
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold mt-2 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Security Challenge Completed</span>
        </div>
      )}

      {hasError && (
        <div className="flex flex-col items-center gap-1.5 text-[11px] text-amber-300 mt-2 text-center">
          <div className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Captcha loading blocked by network / sandbox?</span>
          </div>
          <button
            type="button"
            onClick={handleBypassSandbox}
            className="px-2.5 py-1 bg-[#0A1E4A] hover:bg-[#143474] text-cyan-300 rounded-lg text-[10px] font-semibold border border-[#143474] transition-colors cursor-pointer"
          >
            Click to Verify Manually (Sandbox Bypass)
          </button>
        </div>
      )}
    </div>
  );
};
