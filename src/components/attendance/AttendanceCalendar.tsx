import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { AttendanceRecord } from '../../types';
import { Badge } from '../ui/Badge';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface AttendanceCalendarProps {
  studentId: string;
  records: AttendanceRecord[];
}

export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  records,
}) => {
  const [selectedMonth] = useState('August 2026');
  const [selectedRecord, setSelectedRecord] = useState<AttendanceRecord | null>(null);

  // August 2026 starts on Saturday (Aug 1, 2026) and has 31 days
  const daysInMonth = 31;
  const startDayOffset = 6; // 0=Sun, 1=Mon, ..., 6=Sat

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getRecordForDay = (day: number): AttendanceRecord | undefined => {
    const formattedDate = `2026-08-${String(day).padStart(2, '0')}`;
    return records.find((r) => r.date === formattedDate);
  };

  const getDayStatus = (day: number, dayOfWeek: number) => {
    // Sunday is Holiday
    if (dayOfWeek === 0) return { type: 'holiday', label: 'Holiday' };
    
    // Future days past Aug 17 (today)
    if (day > 17) return { type: 'future', label: 'Upcoming' };

    const record = getRecordForDay(day);
    if (record) {
      if (record.status === 'present') return { type: 'present', label: 'P', color: 'bg-emerald-500 text-white' };
      if (record.status === 'absent') return { type: 'absent', label: 'A', color: 'bg-rose-500 text-white font-bold' };
      if (record.status === 'late') return { type: 'late', label: 'L', color: 'bg-amber-500 text-white font-bold' };
    }

    // Default weekdays past are present unless recorded otherwise
    return { type: 'present', label: 'P', color: 'bg-emerald-500 text-white' };
  };

  return (
    <Card>
      <CardHeader
        title="Attendance Calendar View"
        subtitle="Monthly day-by-day attendance log and leave status"
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-xs font-semibold text-slate-700">
              <button className="p-1 hover:bg-white rounded transition-colors" title="Previous Month">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2">{selectedMonth}</span>
              <button className="p-1 hover:bg-white rounded transition-colors" title="Next Month">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        }
      />

      <CardContent>
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-emerald-500 text-white">
              P
            </span>
            <span className="text-slate-600">Present</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-rose-500 text-white">
              A
            </span>
            <span className="text-slate-600">Absent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-amber-500 text-white">
              L
            </span>
            <span className="text-slate-600">Late / Half-Day</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-medium bg-slate-100 text-slate-400">
              H
            </span>
            <span className="text-slate-600">Weekend / Holiday</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {weekdays.map((day) => (
            <div
              key={day}
              className="text-center text-[11px] font-bold text-slate-400 py-1 uppercase tracking-wider"
            >
              {day}
            </div>
          ))}

          {/* Empty offset cells before Aug 1 (Saturday) */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-[44px] sm:min-h-[52px] bg-slate-50/50 rounded-lg" />
          ))}

          {/* Days of August */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayOfWeek = (startDayOffset + i) % 7;
            const status = getDayStatus(day, dayOfWeek);
            const isToday = day === 17;
            const record = getRecordForDay(day);

            return (
              <div
                key={`day-${day}`}
                onClick={() => {
                  if (record) setSelectedRecord(record);
                  else if (status.type !== 'holiday' && status.type !== 'future') {
                    setSelectedRecord({
                      id: `ATT-2026-08-${String(day).padStart(2, '0')}`,
                      studentId: 'STU001',
                      studentName: 'Rahul Sharma',
                      class: '8A',
                      date: `2026-08-${String(day).padStart(2, '0')}`,
                      status: 'present',
                      markedBy: 'TEA001 (Amit Kumar)',
                      markedAt: `2026-08-${String(day).padStart(2, '0')}T08:30:00Z`
                    });
                  }
                }}
                className={`min-h-[44px] sm:min-h-[52px] p-1.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isToday
                    ? 'border-indigo-500 ring-2 ring-indigo-200 bg-indigo-50/30'
                    : 'border-slate-200/70 hover:border-indigo-300 hover:bg-slate-50'
                } ${status.type === 'holiday' ? 'bg-slate-100/60 opacity-60' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isToday ? 'text-indigo-600 font-bold' : 'text-slate-700'
                    }`}
                  >
                    {day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-bold px-1 bg-indigo-600 text-white rounded">
                      TODAY
                    </span>
                  )}
                </div>

                <div className="mt-1 flex justify-end">
                  {status.type === 'holiday' ? (
                    <span className="text-[10px] text-slate-400 font-medium">H</span>
                  ) : status.type === 'future' ? (
                    <span className="text-[10px] text-slate-300">-</span>
                  ) : (
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shadow-2xs ${status.color}`}
                    >
                      {status.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Drilldown modal/panel if a day record is clicked */}
        {selectedRecord && (
          <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl animate-in fade-in">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold text-slate-900">
                  Attendance Details for {selectedRecord.date}
                </span>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ✕ Close
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Status</span>
                <Badge
                  variant={
                    selectedRecord.status === 'present'
                      ? 'success'
                      : selectedRecord.status === 'absent'
                      ? 'danger'
                      : 'warning'
                  }
                >
                  {selectedRecord.status.toUpperCase()}
                </Badge>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Marked By</span>
                <span className="font-medium text-slate-800">{selectedRecord.markedBy}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Class Section</span>
                <span className="font-medium text-slate-800">{selectedRecord.class}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Remarks</span>
                <span className="font-medium text-slate-800">
                  {selectedRecord.remarks || 'Regular Attendance Session'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
