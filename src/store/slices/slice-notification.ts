// store/notification-slice.ts
import { StateCreator } from "zustand"; 
import { axios } from "@/lib/axios";
import { NotificationSlice } from "../types";

interface NotificationQuery {
  limit?: number;
  page?: number;
  q?: string;
}



export const createNotificationSlice: StateCreator<
  NotificationSlice,
  [],
  [],
  NotificationSlice
> = (set) => ({
  notifications: [],
  loadingNotifications: false,
  notificationsPagination: null,

  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),

  updateNotification: (id, data) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, ...data } : n
      ),
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  loadNotifications: async ({ limit = 12, page = 1, q = "" } = {}) => {
    set({ loadingNotifications: true });
    try {
      const res = await axios.get(
        `/api/notifications?limit=${limit}&page=${page}&where[title][contains]=${encodeURIComponent(
          q
        )}`
      );
      const data = res.data;
      set({
        notifications: data.docs,
        notificationsPagination: {
          totalDocs: data.totalDocs,
          limit: data.limit,
          totalPages: data.totalPages,
          page: data.page,
          pagingCounter: data.pagingCounter,
          hasPrevPage: data.hasPrevPage,
          hasNextPage: data.hasNextPage,
          prevPage: data.prevPage,
          nextPage: data.nextPage,
        },
      });
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      set({ loadingNotifications: false });
    }
  },
});
