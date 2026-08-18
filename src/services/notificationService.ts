import { NotificationItem, UserRole } from '../types';
import { MOCK_NOTIFICATIONS } from '../data/mockData';

const NOTIF_STORAGE_KEY = 'schoolsaathi_notifications';

let inMemoryNotifications: NotificationItem[] = (() => {
  try {
    const saved = localStorage.getItem(NOTIF_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // Ignore
  }
  return [...MOCK_NOTIFICATIONS];
})();

export const notificationService = {
  getNotificationsForRole: (role: UserRole): NotificationItem[] => {
    return inMemoryNotifications.filter((n) => n.targetRoles.includes(role));
  },

  markAsRead: (notificationId: string): void => {
    const item = inMemoryNotifications.find((n) => n.id === notificationId);
    if (item) {
      item.isRead = true;
      try {
        localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(inMemoryNotifications));
      } catch {
        // Ignore
      }
    }
  },

  markAllAsRead: (role: UserRole): void => {
    inMemoryNotifications.forEach((n) => {
      if (n.targetRoles.includes(role)) {
        n.isRead = true;
      }
    });
    try {
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(inMemoryNotifications));
    } catch {
      // Ignore
    }
  },

  getUnreadCount: (role: UserRole): number => {
    return inMemoryNotifications.filter((n) => n.targetRoles.includes(role) && !n.isRead).length;
  }
};
