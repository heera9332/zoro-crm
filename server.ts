// server.ts
import dotenv from "dotenv";
dotenv.config();

import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { parse } from "url";
// import { createClient } from "redis";
import * as Next from "next";

// Setup
const PORT = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const nextApp = Next.default({ dev });
const handle = nextApp.getRequestHandler();

// socket map and getter
export const USER_SOCKET_MAP = new Map<string, string>();
export let io: SocketIOServer | null = null;

export function getSocket(): SocketIOServer | null {
  return io;
}

nextApp.prepare().then(async () => {
  const httpServer = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {

    socket.on("join", (userId) => {
      socket.join(userId);
      console.log(`✅ Socket ${socket.id} joined room: ${userId}`);
    });

    socket.on("leave", (userId) => {
      socket.leave(userId);
      console.log(`❌ Socket ${socket.id} left room: ${userId}`);
    });
  });

  // 🔁 Redis Subscriber
  // const redisSubscriber = createClient({ url: process.env.REDIS_URL });
  
  // await redisSubscriber.subscribe("notifications", (msg) => {
  //   console.log("notifications > ", msg)
  //   const { userId, notification } = JSON.parse(msg);
  //   console.log(`📨 Notification for ${userId}`, notification);
  //   io?.to(userId).emit("notification:new", notification);
  // });

  // Optional test event
  let count = 1;
  setInterval(() => {
    io?.emit("test", { data: `test ${count++}` });
  }, 1000);

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
