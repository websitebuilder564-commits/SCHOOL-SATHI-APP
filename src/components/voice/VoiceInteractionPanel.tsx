import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Mic, MicOff, Volume2, Sparkles, Radio, ArrowRight, CheckCircle2 } from 'lucide-react';

interface VoiceInteractionPanelProps {
  onAvatarModeChange?: (mode: 'idle' | 'listening' | 'processing' | 'speaking' | 'error') => void;
}

export const VoiceInteractionPanel: React.FC<VoiceInteractionPanelProps> = ({
  onAvatarModeChange,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [volume, setVolume] = useState(80);
  const [pipelineStep, setPipelineStep] = useState<number>(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording) {
      if (onAvatarModeChange) onAvatarModeChange('listening');
      setTranscript('Listening... Speak into your microphone.');
      setPipelineStep(1);

      timer = setTimeout(() => {
        setTranscript('"What was my attendance percentage in Mathematics and Science?"');
        setPipelineStep(2);
        if (onAvatarModeChange) onAvatarModeChange('processing');

        setTimeout(() => {
          setPipelineStep(3);
          setTimeout(() => {
            setPipelineStep(4);
            if (onAvatarModeChange) onAvatarModeChange('speaking');
            setTranscript(
              'Assistant Audio Output: "Your Mathematics attendance is 94.0% and Science attendance is 91.5%. Both are in good standing above the 75% threshold."'
            );
            setIsRecording(false);
            setTimeout(() => {
              if (onAvatarModeChange) onAvatarModeChange('idle');
              setPipelineStep(0);
            }, 3500);
          }, 1200);
        }, 1200);
      }, 2200);
    }

    return () => clearTimeout(timer);
  }, [isRecording, onAvatarModeChange]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTranscript('Initializing audio capture pipeline...');
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader
        title="Voice Interaction Gateway"
        subtitle="Low-latency two-way conversational voice interface"
        action={
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-500">Audio Level:</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 accent-indigo-600 cursor-pointer"
            />
            <Volume2 className="w-4 h-4 text-slate-400" />
          </div>
        }
      />

      <CardContent className="space-y-6">
        {/* Interactive Waveform / Mic Centerpiece */}
        <div className="p-8 bg-slate-950 rounded-2xl text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
          {/* Animated audio wave bars */}
          <div className="flex items-center justify-center gap-1.5 h-16 mb-4">
            {Array.from({ length: 24 }).map((_, i) => {
              const height = isRecording
                ? Math.sin((i + Date.now() / 100) * 0.5) * 20 + 30
                : 6;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isRecording ? 'bg-indigo-400 animate-pulse' : 'bg-slate-700'
                  }`}
                  style={{ height: `${height}px` }}
                />
              );
            })}
          </div>

          {/* Big Mic Button */}
          <button
            onClick={toggleRecording}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
              isRecording
                ? 'bg-rose-600 text-white ring-8 ring-rose-500/30 scale-110'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-500/20'
            }`}
          >
            {isRecording ? <MicOff className="w-7 h-7" /> : <Mic className="w-7 h-7" />}
          </button>

          <p className="text-xs text-slate-400 mt-4 font-medium">
            {isRecording ? 'Tap to stop recording' : 'Click to start voice session'}
          </p>
        </div>

        {/* Live Transcript Area */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-indigo-600" />
              Live Speech Transcript
            </span>
            <span className="text-[10px] text-slate-400 font-mono">XYZ-STT-v2</span>
          </div>
          <p className="text-xs text-slate-800 italic min-h-[38px] bg-white p-3 rounded-lg border border-slate-200/80">
            {transcript || 'No voice session active. Click the microphone above to speak.'}
          </p>
        </div>

        {/* Voice Pipeline Architecture diagram */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 mb-2">
            Voice Processing Architecture Flow
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px]">
            {[
              { step: 1, label: 'User Voice Input', sub: 'Microphone Stream' },
              { step: 2, label: 'External STT', sub: 'Speech to Text' },
              { step: 3, label: 'XYZ AI Engine', sub: 'External Model' },
              { step: 4, label: 'ERP APIs', sub: 'Secure RBAC Layer' },
              { step: 5, label: 'External TTS', sub: 'Voice Synthesis' },
            ].map((p) => {
              const isActive = pipelineStep === p.step;
              return (
                <div
                  key={p.step}
                  className={`p-2.5 rounded-xl border transition-all text-center ${
                    isActive
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-1 ring-indigo-500'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div className="text-[10px] text-slate-400 font-mono">0{p.step}</div>
                  <div className="font-semibold mt-0.5">{p.label}</div>
                  <div className="text-[9px] text-slate-400">{p.sub}</div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
