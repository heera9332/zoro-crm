import { Server as SocketIOServer } from "socket.io";
import { doAction } from "@/server/filters";

let io: SocketIOServer | null = null;

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

export const getSocket = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
