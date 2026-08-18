import { AttendanceRecord, Student } from '../types';
import { generateMockAttendanceRecords, MOCK_STUDENTS } from '../data/mockData';
import { auditService } from './auditService';

const ATTENDANCE_STORAGE_KEY = 'schoolsaathi_attendance_records';

let inMemoryAttendance: AttendanceRecord[] = (() => {
  try {
    const saved = localStorage.getItem(ATTENDANCE_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Ignore
  }
  return generateMockAttendanceRecords();
})();

export const attendanceService = {
  getAllRecords: (): AttendanceRecord[] => {
    return inMemoryAttendance;
  },

  getRecordsForStudent: (studentId: string): AttendanceRecord[] => {
    return inMemoryAttendance.filter((r) => r.studentId === studentId);
  },

  getRecordsForClassAndDate: (className: string, date: string): AttendanceRecord[] => {
    return inMemoryAttendance.filter(
      (r) => r.class.toLowerCase() === className.toLowerCase() && r.date === date
    );
  },

  saveClassAttendance: async (params: {
    className: string;
    date: string;
    records: { studentId: string; status: 'present' | 'absent' | 'late' | 'excused'; remarks?: string }[];
    teacherId: string;
    teacherName: string;
  }): Promise<{ success: boolean; updatedCount: number; message: string }> => {
    // Artificial latency
    await new Promise((res) => setTimeout(res, 400));

    let updatedCount = 0;
    const now = new Date().toISOString();

    params.records.forEach((rec) => {
      const student = MOCK_STUDENTS.find((s) => s.id === rec.studentId);
      const studentName = student ? student.name : rec.studentId;

      const existingIndex = inMemoryAttendance.findIndex(
        (r) => r.studentId === rec.studentId && r.date === params.date
      );

      const recordData: AttendanceRecord = {
        id: `ATT-${params.date}-${rec.studentId}`,
        studentId: rec.studentId,
        studentName,
        class: params.className,
        date: params.date,
        status: rec.status,
        markedBy: `${params.teacherId} (${params.teacherName})`,
        markedAt: now,
        remarks: rec.remarks,
      };

      if (existingIndex >= 0) {
        inMemoryAttendance[existingIndex] = recordData;
      } else {
        inMemoryAttendance.push(recordData);
      }
      updatedCount++;
    });

    try {
      localStorage.setItem(ATTENDANCE_STORAGE_KEY, JSON.stringify(inMemoryAttendance));
    } catch {
      // Ignore
    }

    auditService.logAction({
      userId: params.teacherId,
      userName: params.teacherName,
      userRole: 'teacher',
      action: 'SAVE_ATTENDANCE_BATCH',
      resource: `Class ${params.className} / Date ${params.date}`,
      status: 'SUCCESS',
      details: `Saved attendance for ${updatedCount} students in class ${params.className}`,
    });

    return {
      success: true,
      updatedCount,
      message: `Successfully recorded attendance for ${updatedCount} students.`,
    };
  },

  calculateStudentStats: (student: Student): {
    overallPercentage: number;
    present: number;
    absent: number;
    late: number;
    workingDays: number;
  } => {
    const studentRecords = inMemoryAttendance.filter((r) => r.studentId === student.id);
    
    if (studentRecords.length === 0) {
      return {
        overallPercentage: student.overallAttendance,
        present: student.totalPresent,
        absent: student.totalAbsent,
        late: student.totalLate,
        workingDays: student.workingDays,
      };
    }

    const present = studentRecords.filter((r) => r.status === 'present').length;
    const absent = studentRecords.filter((r) => r.status === 'absent').length;
    const late = studentRecords.filter((r) => r.status === 'late').length;
    const total = studentRecords.length;

    const rate = total > 0 ? Number((((present + late * 0.5) / total) * 100).toFixed(1)) : student.overallAttendance;

    return {
      overallPercentage: rate,
      present: student.totalPresent + present,
      absent: student.totalAbsent + absent,
      late: student.totalLate + late,
      workingDays: student.workingDays + total,
    };
  },
};
