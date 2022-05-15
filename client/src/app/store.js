import { configureStore } from "@reduxjs/toolkit";
import SocketClient, { socketMiddleware } from "./socketMiddleware";
import roomReducer from "../features/roomApi/roomSlice";

const socket = new SocketClient();

export const store = configureStore({
  reducer: {
    room: roomReducer,
  },
  middleware: [socketMiddleware(socket)],
});
