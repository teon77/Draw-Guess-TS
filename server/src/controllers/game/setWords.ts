import Room from "../../models/Room";
import words from "../../utils/words";
import { Server, Socket } from "socket.io";

const setWords = (socket: Socket, io: Server) => {
  socket.on(
    "set_word_options",
    async ({ roomId }: { roomId: string; words: string[] }) => {
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

        // get one random word from the each array in the words object
        const easy = words.easy[Math.floor(Math.random() * words.easy.length)];
        const medium =
          words.medium[Math.floor(Math.random() * words.medium.length)];
        const hard = words.hard[Math.floor(Math.random() * words.hard.length)];

        // send the words to the client
        io.in(roomId).emit("set_word_options", {
          easy,
          medium,
          hard,
        });
      } catch (err) {
        io.to(roomId).emit("fail", {
          message: "Could`nt fetch words, Internal server error",
        });
      }
    }
  );
};

export default setWords;
