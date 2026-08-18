import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';
import { Student } from '../../types';
import { Button } from '../ui/Button';
import { attendanceService } from '../../services/attendanceService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { CheckCircle, AlertTriangle, Save, Users, Calendar, Check } from 'lucide-react';

interface AttendanceMarkerTableProps {
  students: Student[];
  className: string;
  onAttendanceSaved?: () => void;
}

export const AttendanceMarkerTable: React.FC<AttendanceMarkerTableProps> = ({
  students,
  className,
  onAttendanceSaved,
}) => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [date, setDate] = useState('2026-08-17');
  const [attendanceState, setAttendanceState] = useState<
    Record<string, { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string }>
  >(() => {
    const initial: Record<string, { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string }> = {};
    students.forEach((s) => {
      // Default: STU003 absent for demo authenticity, rest present
      initial[s.id] = {
        status: s.id === 'STU003' ? 'absent' : 'present',
        remarks: s.id === 'STU003' ? 'Sick leave request' : '',
      };
    });
    return initial;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        status,
      },
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setAttendanceState((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleMarkAllPresent = () => {
    setAttendanceState((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((id) => {
        updated[id] = { ...updated[id], status: 'present' };
      });
      return updated;
    });
  };

  const handleSaveAttendance = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveSuccessMsg(null);

    const records = Object.entries(attendanceState).map(([studentId, data]) => {
      const entry = data as { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string };
      return {
        studentId,
        status: entry.status,
        remarks: entry.remarks,
      };
    });

    try {
      const result = await attendanceService.saveClassAttendance({
        className,
        date,
        records,
        teacherId: user.teacherId || user.id,
        teacherName: user.name,
      });

      if (result.success) {
        setSaveSuccessMsg(`Attendance successfully saved and audited for ${result.updatedCount} students.`);
        if (onAttendanceSaved) onAttendanceSaved();
        setTimeout(() => setSaveSuccessMsg(null), 5000);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const stateEntries = Object.values(attendanceState) as { status: 'present' | 'absent' | 'late' | 'excused'; remarks: string }[];
  const presentCount = stateEntries.filter((s) => s.status === 'present').length;
  const absentCount = stateEntries.filter((s) => s.status === 'absent').length;
  const lateCount = stateEntries.filter((s) => s.status === 'late').length;

  return (
    <Card>
      <CardHeader
        title={`Class ${className} Attendance Sheet`}
        subtitle="Mark, verify, and commit daily classroom attendance records"
        action={
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-transparent outline-none font-semibold cursor-pointer"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleMarkAllPresent}
              leftIcon={<Check className="w-3.5 h-3.5" />}
            >
              {t('markAllPresent')}
            </Button>
          </div>
        }
      />

      <CardContent className="p-0">
        {/* Summary Counter Bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs flex-wrap gap-2">
          <div className="flex items-center gap-4">
            <span className="text-slate-500">
              Total Enrolled: <strong className="text-slate-800">{students.length}</strong>
            </span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Present: {presentCount}
            </span>
            <span className="text-rose-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Absent: {absentCount}
            </span>
            <span className="text-amber-700 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Late: {lateCount}
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            Assigned Teacher: <strong>{user?.name}</strong>
          </div>
        </div>

        {/* Student Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 text-slate-500 font-semibold border-b border-slate-200/80">
              <tr>
                <th className="py-3 px-4 w-16">Roll #</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4 text-center">Attendance Status</th>
                <th className="py-3 px-4">Remarks / Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((student) => {
                const currentStatus = attendanceState[student.id]?.status || 'present';
                const currentRemarks = attendanceState[student.id]?.remarks || '';

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-slate-700">{student.rollNo}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">{student.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{student.admissionNo}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status Pill Toggle Buttons */}
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1 bg-slate-100 p-1 rounded-xl max-w-fit mx-auto border border-slate-200/60">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'present')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'absent')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                          }`}
                        >
                          Absent
                        </button>
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, 'late')}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                            currentStatus === 'late'
                              ? 'bg-amber-600 text-white shadow-2xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                          }`}
                        >
                          Late
                        </button>
                      </div>
                    </td>

                    {/* Remarks Input */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={currentRemarks}
                        onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                        placeholder="Optional remarks (e.g. sick leave)"
                        className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-indigo-400 outline-none"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          {saveSuccessMsg ? (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>{saveSuccessMsg}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500">
              Every save commits an immutable cryptographic audit record to the institutional log.
            </span>
          )}
        </div>

        <Button
          variant="primary"
          onClick={handleSaveAttendance}
          isLoading={isSaving}
          leftIcon={<Save className="w-4 h-4" />}
        >
          {t('saveAttendance')}
        </Button>
      </CardFooter>
    </Card>
  );
};
