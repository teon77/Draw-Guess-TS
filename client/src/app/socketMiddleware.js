import socketRoomController from "../features/controllers/roomController";
import socketGameController from "../features/controllers/gameController";

export const socketMiddleware = (socket) => {
  return (store) => (next) => (action) => {
    const { type, payload } = action;

    switch (type) {
      case "SOCKET_CONNECT":
        socket.connect();
        break;
      case "CREATE_ROOM":
        socket.emit("create_room", payload);
        break;
      case "JOIN_ROOM":
        socket.emit("join_room", payload);
        break;
      case "START_GAME":
        socket.emit("start_game", payload);
        break;

      default:
        break;
    }

    socketRoomController(socket, store);
    socketGameController(socket, store);

    return next(action);
  };
};
