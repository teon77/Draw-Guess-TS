import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";
import roomReducer from "../features/reducers/roomSlice";
import loginReducer from "../features/reducers/loginSlice";
import gameReducer from "../features/reducers/gameSlice";
import SocketClient from "./SocketClient";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    room: roomReducer,
    login: loginReducer,
    game: gameReducer,
  },
  middleware: [socketMiddleware(socket)],
});
