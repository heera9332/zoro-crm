"use client";
// hooks/use-notification-socket.ts
import { useEffect } from "react";
import socket from "@/lib/socket"; // your socket.io-client instance
import { useNotifications } from "@/hooks/use-notifications";
import { toast } from "sonner";

export function useNotificationSocket(currentUserId?: string) {
  const { addNotification } = useNotifications();

  useEffect(() => {
    if (!socket) return;

    // Optionally, join your user room
    if (currentUserId) {
      socket.emit("join", currentUserId);
    }

    const handleNewNotification = (notification: any) => {
      console.log(notification)
      addNotification(notification);
      toast(notification.title);
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
