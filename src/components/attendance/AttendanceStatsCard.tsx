import React from 'react';
import { Card } from '../ui/Card';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle2, XCircle, Calendar, Clock } from 'lucide-react';

interface AttendanceStatsCardProps {
  overallPercentage: number;
  presentDays: number;
  absentDays: number;
  workingDays: number;
  lateDays?: number;
  studentName?: string;
  className?: string;
}

export const AttendanceStatsCard: React.FC<AttendanceStatsCardProps> = ({
  overallPercentage,
  presentDays,
  absentDays,
  workingDays,
  lateDays = 0,
  studentName,
  className = '',
}) => {
  const { t } = useLanguage();

  const getStatusColor = (pct: number) => {
    if (pct >= 90) return { text: 'text-emerald-600', bg: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'Excellent Standing' };
    if (pct >= 75) return { text: 'text-blue-600', bg: 'bg-blue-500', pill: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Satisfactory' };
    return { text: 'text-rose-600', bg: 'bg-rose-500', pill: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Low Attendance Alert' };
  };

  const status = getStatusColor(overallPercentage);

  return (
    <Card className={`p-6 bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/30 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {t('overallAttendance')}
          </span>
          {studentName && (
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">{studentName}</h3>
          )}
          <div className="mt-2 flex items-center gap-3">
            <span className={`text-4xl font-extrabold tracking-tight ${status.text}`}>
              {overallPercentage}%
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${status.pill}`}>
              {status.label}
            </span>
          </div>
        </div>

        {/* Circular gauge or visual progress bar */}
        <div className="w-full md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-medium text-slate-600">
            <span>Progress towards 100%</span>
            <span className="font-bold">{presentDays}/{workingDays} Days</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${status.bg}`}
              style={{ width: `${Math.min(100, Math.max(0, overallPercentage))}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Minimum required by CBSE / State Board: 75.0%
          </p>
        </div>
      </div>

      {/* Metric Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-5">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('presentDays')}</span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">{presentDays}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Full Sessions Attended</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-rose-600 text-xs font-semibold">
            <XCircle className="w-4 h-4" />
            <span>{t('absentDays')}</span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">{absentDays}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Recorded Leaves</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-amber-600 text-xs font-semibold">
            <Clock className="w-4 h-4" />
            <span>Late Arrivals</span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">{lateDays}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Grace applied</div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center gap-2 text-indigo-600 text-xs font-semibold">
            <Calendar className="w-4 h-4" />
            <span>{t('workingDays')}</span>
          </div>
          <div className="text-xl font-bold text-slate-900 mt-1">{workingDays}</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Academic Session Days</div>
        </div>
      </div>
    </Card>
  );
};
