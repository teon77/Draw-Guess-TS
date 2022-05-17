import { v4 as uuidv4 } from "uuid";
import Room from "../../models/Room";
import User, { UserGameType } from "../../models/User";
import { Server, Socket } from "socket.io";

const createRoom = (socket: Socket, io: Server) => {
  socket.on(
    "create_room",
    async ({ username }: { username: string }): Promise<void> => {
      try {
        if (!username) {
          io.to(socket.id).emit("fail", {
            message: "You must provide a username!",
          });
          return;
        }

        const room = new Room({
          roomId: uuidv4(),
          users: [],
        });

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

        socket.join(room.roomId);

        io.to(socket.id).emit("created_success", {
          roomId: room.roomId,
          players: room.users,
        });
      } catch (err) {
        io.to(socket.id).emit("fail", {
          message: "Could`nt create room, Internal server error",
        });
      }
    }
  );
};

export default createRoom;
