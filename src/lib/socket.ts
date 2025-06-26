// src/socket.js
import { io } from "socket.io-client";

const API_ENDPOINT = process.env.APP_URL!;
const socket = io(API_ENDPOINT, { transports: ["polling"] });

export default socket;
