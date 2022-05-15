import io from "socket.io-client";
const port = process.env.PORT || 5000;
const serverEndpoint = `http://localhost:${port}/`;

export default class SocketClient {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io(serverEndpoint);
  }

  disconnect() {
    this.socket.disconnect();
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }
}

export const socketMiddleware = (socket) => {
  return (store) => (next) => (action) => {
    const { type, payload } = action;
    // make switch case for each action type
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

    return next(action);
  };
};
