"use client"
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Page() {
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("test", (data) => {
      console.log(data);
    });

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  }, []);
  return (
    <div>
      <h2>Heading</h2>
    </div>
  );
}
