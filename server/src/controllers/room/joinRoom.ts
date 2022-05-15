import Room from "../../models/Room";
import User, { UserGameType } from "../../models/User";
import { Server, Socket } from "socket.io";

const joinRoom = (socket: Socket, io: Server) => {
  socket.on(
    "join_room",
    async ({
      roomId,
      username,
    }: {
      roomId: string;
      username: string;
    }): Promise<void> => {
      try {
        if (!roomId || !username) {
          io.to(socket.id).emit("fail", {
            message: "You must provide a roomId and username!",
          });
          return;
        }

        const room = await Room.findOne({ roomId });

        if (!room) {
          io.to(socket.id).emit("fail", {
            message: "Room doesn't exist!",
          });
          return;
        }

        if (room.users.some((u) => u.userId === socket.id)) {
          io.to(socket.id).emit("fail", {
            message: "You are already in this room!",
          });
          return;
        }

        const user = new User({
          username,
          userId: socket.id,
          roomId: room.roomId,
          turns: 0,
          score: 0,
        });

        await user.save();
        const gameUser: UserGameType = (({
          username,
          userId,
          turns,
          score,
        }) => ({
          username,
          userId,
          turns,
          score,
        }))(user);

        room.users.push(gameUser);
        await room.save();

        io.to(room.roomId).emit("joined_success", {
          roomId: room.roomId,
          players: room.users,
        });
      } catch (err) {
        io.to(socket.id).emit("fail", {
          message: "Could`nt join room, Internal server error",
        });
      }
    }
  );
};

export default joinRoom;
