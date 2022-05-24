import Room from "../../models/Room";
import { Server, Socket } from "socket.io";

const setChosenWord = (socket: Socket, io: Server) => {
  socket.on(
    "set_chosen_word",
    async ({
      roomId,
      chosenWord,
    }: {
      roomId: string;
      chosenWord: string;
    }): Promise<void> => {
      try {
        const room = await Room.findOne({ roomId }).exec();

        if (!room) {
          io.in(roomId).emit("fail", {
            message: "Room not found!",
          });
          return;
        }
        room.word = chosenWord;
        await room.save();

        io.to(socket.id).emit("set_chosen_word", {
          chosenWord,
        });
      } catch (err) {
        io.to(roomId).emit("fail", {
          message: "Could`nt fetch words, Internal server error",
        });
      }
    }
  );
};

export default setChosenWord;
