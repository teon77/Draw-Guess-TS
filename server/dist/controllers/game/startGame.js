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
const startGame = (socket, io) => {
    socket.on("start_game", ({ roomId }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield Room_1.default.findOne({ roomId }).exec();
            if (!room) {
                io.in(roomId).emit("fail", {
                    message: "Room not found!",
                });
                return;
            }
            if (room.users.length < 2) {
                io.in(roomId).emit("fail", {
                    message: "Room must have at least 2 players!",
                });
                return;
            }
            // get random user from the users array and update the turns
            const userTurn = room.users[Math.floor(Math.random() * room.users.length)];
            room.users.forEach((user) => {
                if (user.userId === userTurn.userId) {
                    user.turns += 1;
                }
            });
            yield room.save();
            io.in(roomId).emit("start_game", {
                readyToStart: true,
                playerTurnId: userTurn.userId,
                playerTurnName: userTurn.username,
            });
        }
        catch (err) {
            io.to(socket.id).emit("fail", {
                message: "Could`nt start game, Internal server error",
            });
        }
    }));
};
exports.default = startGame;
