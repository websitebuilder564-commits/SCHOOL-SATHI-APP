import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Sparkles, Mic, Volume2, Maximize2, Minimize2, Radio, CheckCircle, AlertCircle } from 'lucide-react';

export type AvatarMode = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

interface AIAvatarProps {
  mode?: AvatarMode;
  onModeChange?: (mode: AvatarMode) => void;
  className?: string;
}

export const AIAvatar: React.FC<AIAvatarProps> = ({
  mode = 'idle',
  onModeChange,
  className = '',
}) => {
  const [currentMode, setCurrentMode] = useState<AvatarMode>(mode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fps] = useState(60);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  const handleStateToggle = (newMode: AvatarMode) => {
    setCurrentMode(newMode);
    if (onModeChange) onModeChange(newMode);
  };

  const getModeDetails = (m: AvatarMode) => {
    switch (m) {
      case 'listening':
        return { label: 'Listening to Voice Input...', color: 'text-indigo-400', glow: 'shadow-indigo-500/50', border: 'border-indigo-500' };
      case 'processing':
        return { label: 'Processing API Gateway Request...', color: 'text-amber-400', glow: 'shadow-amber-500/50', border: 'border-amber-500' };
      case 'speaking':
        return { label: 'Synthesizing Audio Speech...', color: 'text-emerald-400', glow: 'shadow-emerald-500/50', border: 'border-emerald-500' };
      case 'error':
        return { label: 'Integration Link Error', color: 'text-rose-400', glow: 'shadow-rose-500/50', border: 'border-rose-500' };
      default:
        return { label: 'Avatar Ready (Idle Standby)', color: 'text-slate-400', glow: 'shadow-indigo-500/20', border: 'border-slate-700' };
    }
  };

  const details = getModeDetails(currentMode);

  return (
    <Card
      className={`bg-slate-950 text-white overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 flex flex-col justify-between shadow-2xl' : ''
      } ${className}`}
    >
      {/* Top Avatar Bar */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              XYZ AI Digital Avatar
            </h4>
            <span className="text-[10px] text-slate-400">Provider-Independent Canvas</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
            {fps} FPS
          </span>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title={isFullscreen ? 'Minimize' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Avatar Stage */}
      <div className="relative p-6 flex flex-col items-center justify-center min-h-[260px] bg-radial from-slate-900 to-slate-950">
        {/* Glow rings around avatar head */}
        <div
          className={`relative w-36 h-36 rounded-full flex items-center justify-center transition-all duration-500 ${
            currentMode === 'speaking'
              ? 'ring-8 ring-emerald-500/30 scale-105'
              : currentMode === 'listening'
              ? 'ring-8 ring-indigo-500/30 animate-pulse'
              : 'ring-4 ring-slate-800'
          }`}
        >
          {/* Stylized Modern Vector Avatar Character */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-indigo-900 via-slate-800 to-violet-900 p-1 flex items-center justify-center shadow-inner overflow-hidden">
            <div className="relative w-full h-full rounded-full bg-slate-900 flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex items-center gap-6 mb-3">
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                    currentMode === 'listening'
                      ? 'h-4 bg-indigo-400'
                      : currentMode === 'speaking'
                      ? 'h-3 bg-emerald-400'
                      : 'bg-white'
                  }`}
                />
                <div
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                    currentMode === 'listening'
                      ? 'h-4 bg-indigo-400'
                      : currentMode === 'speaking'
                      ? 'h-3 bg-emerald-400'
                      : 'bg-white'
                  }`}
                />
              </div>

              {/* Dynamic Lip-sync / Smile mouth */}
              <div
                className={`transition-all duration-150 rounded-full ${
                  currentMode === 'speaking'
                    ? 'w-6 h-4 bg-emerald-400/80 animate-bounce'
                    : currentMode === 'listening'
                    ? 'w-5 h-2 bg-indigo-400/80'
                    : currentMode === 'processing'
                    ? 'w-4 h-1 bg-amber-400 animate-pulse'
                    : 'w-4 h-1 bg-slate-400'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Status caption */}
        <div className="mt-5 text-center">
          <div className={`text-xs font-semibold tracking-wide ${details.color}`}>
            {details.label}
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Lip-sync & video container ready for external AI stream
          </p>
        </div>
      </div>

      {/* Avatar Simulation State Controls */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 flex items-center justify-center gap-1.5 flex-wrap">
        <span className="text-[10px] uppercase font-bold text-slate-500 mr-2">Avatar States:</span>
        {(['idle', 'listening', 'processing', 'speaking', 'error'] as AvatarMode[]).map((m) => (
          <button
            key={m}
            onClick={() => handleStateToggle(m)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
              currentMode === m
                ? 'bg-indigo-600 text-white shadow-2xs'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </Card>
  );
};
