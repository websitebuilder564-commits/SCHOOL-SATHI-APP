import { AnalyticsSummary, User } from '../types';
import { MOCK_ANALYTICS } from '../data/mockData';
import { auditService } from './auditService';

export const analyticsService = {
  getSchoolAnalytics: (requestingUser: User): { 
    success: boolean; 
    data?: AnalyticsSummary & {
      overallRate: number;
      monthlyVariance: { label: string; rate: number }[];
      classStats: { className: string; total: number; present: number; absent: number; rate: number }[];
    }; 
    error?: string 
  } => {
    if (requestingUser.role === 'student' || requestingUser.role === 'parent') {
      auditService.logAction({
        userId: requestingUser.id,
        userName: requestingUser.name,
        userRole: requestingUser.role,
        action: 'UNAUTHORIZED_ANALYTICS_QUERY',
        resource: 'School Analytics API',
        status: 'FORBIDDEN',
        details: `${requestingUser.role.toUpperCase()} ${requestingUser.name} attempted unauthorized access to institutional analytics.`
      });

      return {
        success: false,
        error: '403 Forbidden: Institutional analytics are restricted to faculty and administrative personnel.'
      };
    }

    auditService.logAction({
      userId: requestingUser.id,
      userName: requestingUser.name,
      userRole: requestingUser.role,
      action: 'QUERY_SCHOOL_ANALYTICS',
      resource: 'Institutional Analytics Engine',
      status: 'SUCCESS',
      details: `${requestingUser.name} retrieved school attendance metrics.`
    });

    const monthlyVariance = [
      { label: 'Week 1', rate: 93.5 },
      { label: 'Week 2', rate: 91.8 },
      { label: 'Week 3', rate: 89.2 },
      { label: 'Week 4', rate: 94.6 },
      { label: 'Today', rate: 92.4 },
    ];

    const classStats = [
      { className: 'Grade 5A', total: 40, present: 38, absent: 2, rate: 95.0 },
      { className: 'Grade 6B', total: 42, present: 39, absent: 3, rate: 92.8 },
      { className: 'Grade 7A', total: 38, present: 35, absent: 3, rate: 92.1 },
      { className: 'Grade 8A', total: 42, present: 39, absent: 3, rate: 92.8 },
      { className: 'Grade 8B', total: 40, present: 36, absent: 4, rate: 90.0 },
      { className: 'Grade 9A', total: 44, present: 40, absent: 4, rate: 90.9 },
      { className: 'Grade 10A', total: 45, present: 43, absent: 2, rate: 95.5 },
    ];

    return {
      success: true,
      data: {
        ...MOCK_ANALYTICS,
        overallRate: MOCK_ANALYTICS.overallAttendanceRate,
        monthlyVariance,
        classStats,
      },
    };
  },

  getInstitutionalAnalytics: (requestingUser: User) => {
    return analyticsService.getSchoolAnalytics(requestingUser);
  }
};
