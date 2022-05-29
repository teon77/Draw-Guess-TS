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
const Room_1 = __importDefault(require("../../models/Room"));
const User_1 = __importDefault(require("../../models/User"));
const joinRoom = (socket, io) => {
    socket.on("join_room", ({ roomId, username, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!roomId || !username) {
                io.to(socket.id).emit("fail", {
                    message: "You must provide a roomId and username!",
                });
                return;
            }
            const room = yield Room_1.default.findOne({ roomId }).exec();
            if (!room) {
                io.to(socket.id).emit("fail", {
                    message: "Room doesn't exist!",
                });
                return;
            }
            if (room.users.some((u) => u.userId === socket.id)) {
                io.to(socket.id).emit("fail", {
                    message: "You are already in this room!",
                });
                return;
            }
            if (room.users.length >= 8) {
                io.to(socket.id).emit("fail", {
                    message: "Room is full!",
                });
                return;
            }
            if (room.hasStarted) {
                io.to(socket.id).emit("fail", {
                    message: "The game has already started!",
                });
                return;
            }
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
            io.to(room.roomId).emit("joined_success", {
                roomId: room.roomId,
                players: room.users,
            });
        }
        catch (err) {
            io.to(socket.id).emit("fail", {
                message: "Could`nt join room, Internal server error",
            });
        }
    }));
};
exports.default = joinRoom;
