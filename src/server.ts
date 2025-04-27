import express from "express";
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

export const USER_SOCKET_MAP = new Map();
export let io: SocketIOServer | null = null;
export function getSocket(): SocketIOServer | null {
  return io;
}

app.prepare().then(async () => {
  // await connectToImap();
  const expressApp = express();
  const httpServer = createServer(expressApp);

  io = new SocketIOServer(httpServer, {
    cors: {
      origin: "*",
    },
  });
 
  expressApp.all("*", (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  // Periodically emit a test event
  let count = 1;
  setInterval(() => {
    if (io) {
      io.emit("test", { data: `test ${count++}` });
    }
  }, 1000);

  httpServer.listen(port, () => {
    console.log(
      `> Server listening at http://localhost:${port} as ${dev ? "development" : process.env.NODE_ENV}`
    );
  });
});
