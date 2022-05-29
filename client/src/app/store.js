import { configureStore } from "@reduxjs/toolkit";
import { socketMiddleware } from "./socketMiddleware";
import roomReducer from "../features/reducers/roomSlice";
import loginReducer from "../features/reducers/loginSlice";
import gameReducer from "../features/reducers/gameSlice";

import io from "socket.io-client";

// const port = process.env.PORT || 5000;
// const serverEndpoint = `http://localhost:${port}/`;

const socket = io();

export const store = configureStore({
  reducer: {
    room: roomReducer,
    login: loginReducer,
    game: gameReducer,
  },
  middleware: [socketMiddleware(socket)],
});
