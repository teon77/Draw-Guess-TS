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
      case "STREAM_DRAWING":
        socket.emit("stream_drawing", payload);
        break;
      case "SUBMIT_GUESS":
        socket.emit("submit_guess", payload);
        break;
      case "SET_WORD_OPTIONS":
        socket.emit("set_word_options", payload);
        break;
      case "SET_CHOSEN_WORD":
        socket.emit("set_chosen_word", payload);
        break;
      default:
        break;
    }

    socketRoomController(socket, store);
    socketGameController(socket, store);

    return next(action);
  };
};
