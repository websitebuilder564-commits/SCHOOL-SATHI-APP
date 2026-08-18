import { Student, User } from '../types';
import { MOCK_STUDENTS } from '../data/mockData';
import { auditService } from './auditService';
import { attendanceService } from './attendanceService';

export const parentService = {
  getLinkedChildren: (requestingParent: User): Student[] => {
    if (requestingParent.role !== 'parent') {
      return [];
    }

    const linkedIds = requestingParent.linkedStudentIds || [];
    const children = MOCK_STUDENTS.filter((s) => linkedIds.includes(s.id)).map((s) => {
      const stats = attendanceService.calculateStudentStats(s);
      return {
        ...s,
        overallAttendance: stats.overallPercentage,
        totalPresent: stats.present,
        totalAbsent: stats.absent,
        totalLate: stats.late,
        workingDays: stats.workingDays,
      };
    });

    return children;
  },

  getChildDetails: (requestingParent: User, studentId: string): { success: boolean; data?: Student; error?: string } => {
    const linkedIds = requestingParent.linkedStudentIds || [];
    
    // Strict parent verification: parent can ONLY access their own linked children
    if (!linkedIds.includes(studentId)) {
      auditService.logAction({
        userId: requestingParent.id,
        userName: requestingParent.name,
        userRole: 'parent',
        action: 'PARENT_CHILD_ACCESS_VIOLATION',
        resource: `Student ID: ${studentId}`,
        status: 'FORBIDDEN',
        details: `Parent ${requestingParent.name} attempted unauthorized access to unlinked child ${studentId}`
      });

      return {
        success: false,
        error: '403 Forbidden: You are not authorized to access this student\'s records.'
      };
    }

    const student = MOCK_STUDENTS.find((s) => s.id === studentId);
    if (!student) {
      return { success: false, error: 'Child record not found.' };
    }

    const stats = attendanceService.calculateStudentStats(student);
    return {
      success: true,
      data: {
        ...student,
        overallAttendance: stats.overallPercentage,
        totalPresent: stats.present,
        totalAbsent: stats.absent,
        totalLate: stats.late,
        workingDays: stats.workingDays,
      }
    };
  }
};
