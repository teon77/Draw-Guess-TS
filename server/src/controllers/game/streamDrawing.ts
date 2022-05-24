import Room from "../../models/Room";
import User, { UserGameType } from "../../models/User";
import { Server, Socket } from "socket.io";

const streamDrawing = (socket: Socket, io: Server) => {
  socket.on(
    "stream_drawing",
    async ({
      roomId,
      drawing,
    }: {
      roomId: string;
      drawing: string;
    }): Promise<void> => {
      try {
        const room = await Room.findOne({ roomId }).exec();

        if (!room) {
          io.in(roomId).emit("fail", {
            message: "Room not found!",
          });
          return;
        }

        if (room.users.length < 2) {
          io.in(roomId).emit("fail", {
            message: "Room must have at least 2 players!",
          });
          return;
        }

        socket.to(roomId).emit("stream_drawing", {
          drawing,
        });
      } catch (err) {}
    }
  );
};

export default streamDrawing;
