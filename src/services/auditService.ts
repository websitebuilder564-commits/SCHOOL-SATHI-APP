import { AuditLog, UserRole } from '../types';
import { MOCK_AUDIT_LOGS } from '../data/mockData';

let auditLogs: AuditLog[] = [...MOCK_AUDIT_LOGS];

export const auditService = {
  getLogs: (limit = 50): AuditLog[] => {
    return [...auditLogs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, limit);
  },

  logAction: (params: {
    userId: string;
    userName: string;
    userRole: UserRole;
    action: string;
    resource: string;
    status: 'SUCCESS' | 'FAILURE' | 'FORBIDDEN' | 'UNAUTHORIZED';
    details: string;
    ipAddress?: string;
  }): AuditLog => {
    const newLog: AuditLog = {
      id: `AUD-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 100)}`,
      requestId: `REQ-AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      userId: params.userId,
      userName: params.userName,
      userRole: params.userRole,
      action: params.action,
      resource: params.resource,
      ipAddress: params.ipAddress || '192.168.1.100',
      status: params.status,
      details: params.details,
    };

    auditLogs.unshift(newLog);
    return newLog;
  },

  clearLogs: (): void => {
    auditLogs = [];
  }
};
