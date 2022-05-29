"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Room_1 = __importDefault(require("../../models/Room"));
const User_1 = __importDefault(require("../../models/User"));
const createRoom = (socket, io) => {
    socket.on("create_room", ({ username }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!username) {
                io.to(socket.id).emit("fail", {
                    message: "You must provide a username!",
                });
                return;
            }
            const room = new Room_1.default({
                roomId: (0, uuid_1.v4)(),
                word: "",
                hasStarted: false,
                users: [],
            });
            const user = new User_1.default({
                username,
                userId: socket.id,
                roomId: room.roomId,
                turns: 0,
                score: 0,
            });
            yield user.save();
            const gameUser = (({ username, userId, turns, score, }) => ({
                username,
                userId,
                turns,
                score,
            }))(user);
            room.users.push(gameUser);
            yield room.save();
            socket.join(room.roomId);
            io.to(socket.id).emit("created_success", {
                roomId: room.roomId,
                players: room.users,
            });
        }
        catch (err) {
            console.log("err", err);
            io.to(socket.id).emit("fail", {
                message: "Could`nt create room, Internal server error",
            });
        }
    }));
};
exports.default = createRoom;
