// hooks/use-notifications.ts
import { useAppStore } from "@/store/appStore";
import { Notification } from "@/payload-types";

export function useNotifications() {
  const notifications = useAppStore((s) => s.notifications);
  const loadingNotifications = useAppStore((s) => s.loadingNotifications);
  const notificationsPagination = useAppStore((s) => s.notificationsPagination);

  const addNotification = useAppStore((s) => s.addNotification);
  const updateNotification = useAppStore((s) => s.updateNotification);
  const removeNotification = useAppStore((s) => s.removeNotification);
  const loadNotifications = useAppStore((s) => s.loadNotifications);

  return {
    notifications,
    loadingNotifications,
    notificationsPagination,
    addNotification,
    updateNotification,
    removeNotification,
    loadNotifications,
  };
}
