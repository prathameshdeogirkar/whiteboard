import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);

    console.log(
      `${socket.id} joined ${roomId}`
    );
  });

  socket.on(
    "drawing",
    ({
      roomId,
      canvasData,
    }: {
      roomId: string;
      canvasData: any;
    }) => {
      socket.to(roomId).emit(
        "drawing",
        canvasData
      );
    }
  );

  // ✅ PUT CURSOR CODE HERE
  socket.on(
    "cursor-move",
    ({
      roomId,
      cursor,
    }: {
      roomId: string;
      cursor: {
        x: number;
        y: number;
        userId: string;
      };
    }) => {
      socket.to(roomId).emit(
        "cursor-move",
        cursor
      );
    }
  );

  socket.on("disconnect", () => {
    console.log(
      "User Disconnected:",
      socket.id
    );
  });
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});