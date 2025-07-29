"use client";
// hooks/use-notification-socket.ts
import { useEffect } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { toast } from "sonner";
import { getSocket } from "@/lib/socket";

export function useNotificationSocket(currentUserId?: string) {
  const { addNotification, loadNotifications } = useNotifications();
  const socket = getSocket();

  useEffect(() => {

    if (!currentUserId || !socket) return;

    if (!socket) {
      console.warn("Socket not available yet");
      return;
    }

    console.log("🔗 Setting up notification listeners for user:", currentUserId);

    if (currentUserId) {
      socket.emit("join", currentUserId);
    }

    const handleNewNotification = (notification: any) => {
      console.log("🔔 New Notification Received:", notification);
      toast(notification.title);
      loadNotifications()
    };

    socket.on("notification:new", handleNewNotification);

    return () => {
      socket.off("notification:new", handleNewNotification);
      if (currentUserId) {
        socket.emit("leave", currentUserId);
      }
    };
  }, [addNotification, currentUserId]);

}
