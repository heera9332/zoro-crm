// lib/socket.ts
import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth";

let socket: Socket | null = null;

export function initSocket() {
  const user = useAuthStore.getState().user;

  if (!user?.id) {
    console.warn("🔌 Socket not initialized: missing user ID");
    return null;
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
      query: { userId: user.id || "global"},
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });
  }

  return socket;
}

export function getSocket() {
  if (!socket) {
    socket = initSocket();
  }
  return socket;
}
