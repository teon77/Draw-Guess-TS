import Room from "../../models/Room";
import { Server, Socket } from "socket.io";

const submitGuess = (socket: Socket, io: Server) => {
  socket.on(
    "submit_guess",
    async ({ roomId, guess }: { roomId: string; guess: string }) => {
      try {
        const room = await Room.findOne({ roomId }).exec();

        if (!room) {
          io.in(roomId).emit("fail", {
            message: "Room not found!",
          });
          return;
        }

        // on successful guess
        if (room.word.toLowerCase() === guess.toLowerCase()) {
          const userTurn = room.users.reduce((prev, curr) =>
            prev.turns < curr.turns ? prev : curr
          );

          room.users.forEach((user) => {
            if (user.userId === socket.id) {
              user.score += 1;
            }
            if (user.userId === userTurn.userId) {
              user.turns += 1;
            }
          });

          await room.save();

          io.in(roomId).emit("correct_guess", {
            players: room.users,
            playerTurnId: userTurn.userId,
            playerTurnName: userTurn.username,
          });
        }
      } catch (err) {
        io.to(roomId).emit("fail", {
          message: "Could`nt submit Guess, Internal server error",
        });
      }
    }
  );
};

export default submitGuess;
