import { Student, User, ScheduleItem } from '../types';
import { MOCK_STUDENTS, MOCK_SCHEDULE_8A } from '../data/mockData';
import { auditService } from './auditService';

export const teacherService = {
  getTeacherAssignedClasses: (teacher: User): string[] => {
    if (teacher.role !== 'teacher') return [];
    return ['8A', '8B', '9A'];
  },

  getAssignedClasses: (teacher: User): string[] => {
    return teacherService.getTeacherAssignedClasses(teacher);
  },

  getTeacherSchedule: (teacher: User): ScheduleItem[] => {
    return MOCK_SCHEDULE_8A.filter((s) => s.day === 'Monday');
  },

  getStudentsForClass: (teacher: User, className: string): { success: boolean; data?: Student[]; error?: string } => {
    const assigned = teacherService.getTeacherAssignedClasses(teacher);

    // Verify teacher is assigned to this class
    if (teacher.role === 'teacher' && !assigned.includes(className)) {
      auditService.logAction({
        userId: teacher.id,
        userName: teacher.name,
        userRole: 'teacher',
        action: 'UNASSIGNED_CLASS_ACCESS_ATTEMPT',
        resource: `Class ${className}`,
        status: 'FORBIDDEN',
        details: `Teacher ${teacher.name} attempted unauthorized access to unassigned class ${className}`
      });

      return {
        success: false,
        error: `403 Forbidden: You are not assigned to manage Class ${className}.`
      };
    }

    const classNum = className.replace(/[^0-9]/g, '');
    const section = className.replace(/[0-9]/g, '');

    const students = MOCK_STUDENTS.filter(
      (s) => s.class === classNum && s.section === section
    );

    return {
      success: true,
      data: students.length > 0 ? students : MOCK_STUDENTS.slice(0, 8),
    };
  }
};
