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

        // get random word from each array inside words object
        const wordOptions = {
          option1: words[1][Math.floor(Math.random() * words[1].length)],
          option2: words[2][Math.floor(Math.random() * words[2].length)],
          option3: words[3][Math.floor(Math.random() * words[3].length)],
        };

        // send the words to the client
        io.to(socket.id).emit("set_word_options", {
          wordOptions,
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
