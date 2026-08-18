import { Student, SubjectGrade, ScheduleItem, User } from '../types';
import { MOCK_STUDENTS, MOCK_GRADES_STU001, MOCK_GRADES_STU002, MOCK_SCHEDULE_8A } from '../data/mockData';
import { auditService } from './auditService';
import { attendanceService } from './attendanceService';

export const studentService = {
  getStudentById: (studentId: string, requestingUser?: User | null): { success: boolean; data?: Student; error?: string } => {
    // Security check: if a student is requesting, they can only request their own ID!
    if (requestingUser && requestingUser.role === 'student' && requestingUser.studentId !== studentId) {
      auditService.logAction({
        userId: requestingUser.id,
        userName: requestingUser.name,
        userRole: requestingUser.role,
        action: 'UNAUTHORIZED_STUDENT_ACCESS',
        resource: `Student ID: ${studentId}`,
        status: 'FORBIDDEN',
        details: `Student ${requestingUser.name} attempted unauthorized access to student ${studentId}`
      });

      return {
        success: false,
        error: '403 Forbidden: You do not have permission to access another student\'s data.'
      };
    }

    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Student not found.' };
    }

    // Refresh dynamic attendance
    const stats = attendanceService.calculateStudentStats(student);
    const enrichedStudent: Student = {
      ...student,
      overallAttendance: stats.overallPercentage,
      totalPresent: stats.present,
      totalAbsent: stats.absent,
      totalLate: stats.late,
      workingDays: stats.workingDays,
    };

    return { success: true, data: enrichedStudent };
  },

  getStudentGrades: (studentId: string): SubjectGrade[] => {
    if (studentId === 'STU002') return MOCK_GRADES_STU002;
    return MOCK_GRADES_STU001;
  },

  getStudentSchedule: (_className: string): ScheduleItem[] => {
    return MOCK_SCHEDULE_8A;
  },

  getAllStudents: (): Student[] => {
    return MOCK_STUDENTS;
  }
};
