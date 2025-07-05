import express from 'express';
import { createServer } from 'http';
import next from 'next'; 
import { initSocket } from './config/init-socket';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const expressApp = express();
  const httpServer = createServer(expressApp);

  // ✅ Initialize Socket.IO first
  initSocket(httpServer); 

  // ✅ Handle all Next.js routes
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
  });
});
