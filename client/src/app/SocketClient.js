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
