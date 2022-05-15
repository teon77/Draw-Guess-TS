import Room from "../../models/Room";
import User from "../../models/User";
import { Server, Socket } from "socket.io";

const deleteRoom = (socket: Socket, io: Server) => {
  socket.on("disconnect", async () => {
    try {
      // find user with userId equal to socket.id and delete it
      const user = await User.findOneAndDelete({ userId: socket.id });
      if (user) {
        // find room with roomId equal to user.roomId and delete it if its empty
        const room = await Room.findOne({ roomId: user.roomId });
        if (room) {
          // remove user from room
          room.users = room.users.filter((u) => u.userId !== socket.id);
          await room.save();
          if (room.users.length === 0) {
            await Room.deleteOne({ roomId: user.roomId });
          }
        }
      }
    } catch (err) {
      return;
    }
  });
};

export default deleteRoom;
