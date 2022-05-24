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

        // TODO: just send of the users id at the start of the game
        // determine which user should start the game
        const userTurn = room.users.reduce((prev, curr) =>
          prev.turns < curr.turns ? prev : curr
        );

        const updatedUsers = room.users.map((user) =>
          user.userId === userTurn.userId
            ? { ...user, turns: user.turns++ }
            : user
        );
        // switch to room.save

        await Room.updateOne(
          { roomId },
          { users: updatedUsers, hasStarted: true }
        ).exec();

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
