import Room from "../../models/Room";
import { Server, Socket } from "socket.io";

const startGame = (socket: Socket, io: Server) => {
  socket.on(
    "start_game",
    async ({ roomId }: { roomId: string }): Promise<void> => {
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

        // get random user from the users array and update the turns
        const userTurn =
          room.users[Math.floor(Math.random() * room.users.length)];
        room.users.forEach((user) => {
          if (user.userId === userTurn.userId) {
            user.turns += 1;
          }
        });

        await room.save();

        io.in(roomId).emit("start_game", {
          readyToStart: true,
          playerTurnId: userTurn.userId,
          playerTurnName: userTurn.username,
        });
      } catch (err) {
        io.to(socket.id).emit("fail", {
          message: "Could`nt start game, Internal server error",
        });
      }
    }
  );
};

export default startGame;
