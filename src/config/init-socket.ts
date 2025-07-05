import { Server as SocketIOServer } from "socket.io";
import { doAction } from "@/lib/server/filters";

export let io: SocketIOServer | null = null;

export function getSocket(): SocketIOServer | null {
  return io;
}

export const initSocket = async (httpServer) => {
  console.log("Initializing socket...");
  doAction("socketInitBefore", io);

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });

  doAction("socketInitAfter", io);

  if (io) {
    io.on("connection", (socket) => {
      console.log("a user connected > ", socket.id); 
      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }
};
