import path from "path";
import express, { Express, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { config } from "./config/config";
import helmet from "helmet";
import cors from "cors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import createRoom from "./controllers/room/createRoom";
import joinRoom from "./controllers/room/joinRoom";
import deleteRoom from "./controllers/room/deleteRoom";

import startGame from "./controllers/game/startGame";
import streamDrawing from "./controllers/game/streamDrawing";
import setWords from "./controllers/game/setWords";
import setChosenWord from "./controllers/game/setChosenWord";
import submitGuess from "./controllers/game/submitGuess";

const app: Express = express();

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("MongoDB connected");
    StartServer();
  })
  .catch((err) => {
    console.log(err);
  });

const StartServer = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(express.static(path.join(__dirname, "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: "GET,PATCH,POST,DELETE",
    },
  });

  io.on("connection", (socket: Socket) => {
    createRoom(socket, io);
    joinRoom(socket, io);
    deleteRoom(socket, io);
    startGame(socket, io);
    streamDrawing(socket, io);
    setWords(socket, io);
    setChosenWord(socket, io);
    submitGuess(socket, io);
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({ message: "Not found" });
  });

  httpServer.listen(config.server.port, () => {
    console.log(`Server started on port ${config.server.port}`);
  });
};
