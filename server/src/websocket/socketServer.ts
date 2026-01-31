import { Server } from "socket.io";
import { verifyJWTToken } from "../utils/jwt.js";
import registerChatHandlers from "./chat.socket.js";

export const initSocket = (server: any) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  io.use((socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token || socket.handshake.headers?.token;
      const decoded = verifyJWTToken(token);
      socket.data.userID = decoded.id;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    socket.send("connection succesful!");
    registerChatHandlers(io, socket);
  });
};
