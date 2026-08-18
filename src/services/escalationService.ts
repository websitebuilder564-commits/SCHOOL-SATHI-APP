import { EscalationRequest, User } from '../types';
import { MOCK_ESCALATIONS } from '../data/mockData';
import { auditService } from './auditService';

const ESCALATION_STORAGE_KEY = 'schoolsaathi_escalation_requests';

let inMemoryEscalations: EscalationRequest[] = (() => {
  try {
    const saved = localStorage.getItem(ESCALATION_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Ignore
  }
  return [...MOCK_ESCALATIONS];
})();

export const escalationService = {
  getRequestsForUser: (user: User): EscalationRequest[] => {
    if (user.role === 'principal') {
      return inMemoryEscalations;
    }
    if (user.role === 'teacher') {
      return inMemoryEscalations.filter((r) => r.type === 'TEACHER');
    }
    return inMemoryEscalations.filter((r) => r.userId === user.id);
  },

  getAllRequestsForManagement: (user: User): EscalationRequest[] => {
    return inMemoryEscalations;
  },

  createRequest: async (params: {
    user: User;
    type: 'TEACHER' | 'MANAGEMENT';
    studentId?: string;
    studentName?: string;
    subject: string;
    details: string;
    priority?: 'NORMAL' | 'HIGH' | 'URGENT';
  }): Promise<{ success: boolean; request?: EscalationRequest; requestId?: string; status?: string; message: string }> => {
    // Artificial latency
    await new Promise((res) => setTimeout(res, 400));

    const requestId = `REQ-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const newRequest: EscalationRequest = {
      id: requestId,
      userId: params.user.id,
      userName: params.user.name,
      userRole: params.user.role,
      studentId: params.studentId,
      studentName: params.studentName,
      type: params.type,
      subject: params.subject,
      details: params.details,
      priority: params.priority || 'NORMAL',
      status: 'SUBMITTED',
      createdAt: now,
      updatedAt: now,
      assignedTo: params.type === 'TEACHER' ? 'Amit Kumar (Class Teacher)' : 'Administration & Student Welfare Office',
    };

    inMemoryEscalations.unshift(newRequest);

    try {
      localStorage.setItem(ESCALATION_STORAGE_KEY, JSON.stringify(inMemoryEscalations));
    } catch {
      // Ignore
    }

    auditService.logAction({
      userId: params.user.id,
      userName: params.user.name,
      userRole: params.user.role,
      action: `CREATE_ESCALATION_${params.type}`,
      resource: `Support System / Ticket ${requestId}`,
      status: 'SUCCESS',
      details: `Created escalation ticket ${requestId} (${params.type}): ${params.subject}`
    });

    return {
      success: true,
      request: newRequest,
      requestId,
      status: 'SUBMITTED',
      message: 'Support request submitted successfully.',
    };
  },

  updateRequestStatus: (
    requestId: string,
    newStatus: 'PENDING' | 'SUBMITTED' | 'ACCEPTED' | 'COMPLETED' | 'CANCELLED' | 'FAILED',
    adminUser: User,
    resolutionNotes?: string
  ): { success: boolean; message: string } => {
    const item = inMemoryEscalations.find((r) => r.id === requestId);
    if (!item) {
      return { success: false, message: 'Ticket not found.' };
    }

    item.status = newStatus;
    item.updatedAt = new Date().toISOString();
    if (resolutionNotes) {
      item.resolutionNotes = resolutionNotes;
    }

    try {
      localStorage.setItem(ESCALATION_STORAGE_KEY, JSON.stringify(inMemoryEscalations));
    } catch {
      // Ignore
    }

    auditService.logAction({
      userId: adminUser.id,
      userName: adminUser.name,
      userRole: adminUser.role,
      action: 'UPDATE_ESCALATION_STATUS',
      resource: `Ticket ${requestId}`,
      status: 'SUCCESS',
      details: `${adminUser.name} updated ticket ${requestId} to status ${newStatus}`
    });

    return { success: true, message: `Ticket ${requestId} updated to ${newStatus}.` };
  }
};
