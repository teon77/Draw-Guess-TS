"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const createRoom_1 = __importDefault(require("./controllers/room/createRoom"));
const joinRoom_1 = __importDefault(require("./controllers/room/joinRoom"));
const deleteRoom_1 = __importDefault(require("./controllers/room/deleteRoom"));
const startGame_1 = __importDefault(require("./controllers/game/startGame"));
const streamDrawing_1 = __importDefault(require("./controllers/game/streamDrawing"));
const setWords_1 = __importDefault(require("./controllers/game/setWords"));
const setChosenWord_1 = __importDefault(require("./controllers/game/setChosenWord"));
const submitGuess_1 = __importDefault(require("./controllers/game/submitGuess"));
const app = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log("MongoDB connected");
    StartServer();
})
    .catch((err) => {
    console.log(err);
});
const StartServer = () => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)());
    app.use(express_1.default.static(path_1.default.join(__dirname, "build")));
    app.get("/*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "build", "index.html"));
    });
    const httpServer = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
            methods: "GET,PATCH,POST,DELETE",
        },
    });
    io.on("connection", (socket) => {
        (0, createRoom_1.default)(socket, io);
        (0, joinRoom_1.default)(socket, io);
        (0, deleteRoom_1.default)(socket, io);
        (0, startGame_1.default)(socket, io);
        (0, streamDrawing_1.default)(socket, io);
        (0, setWords_1.default)(socket, io);
        (0, setChosenWord_1.default)(socket, io);
        (0, submitGuess_1.default)(socket, io);
    });
    app.use((req, res, next) => {
        return res.status(404).json({ message: "Not found" });
    });
    httpServer.listen(config_1.config.server.port, () => {
        console.log(`Server started on port ${config_1.config.server.port}`);
    });
};
