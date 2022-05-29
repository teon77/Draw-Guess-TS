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
const submitGuess = (socket, io) => {
    socket.on("submit_guess", ({ roomId, guess }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield Room_1.default.findOne({ roomId }).exec();
            if (!room) {
                io.in(roomId).emit("fail", {
                    message: "Room not found!",
                });
                return;
            }
            // on successful guess
            if (room.word.toLowerCase() === guess.toLowerCase()) {
                const userTurn = room.users.reduce((prev, curr) => prev.turns < curr.turns ? prev : curr);
                room.users.forEach((user) => {
                    if (user.userId === socket.id) {
                        user.score += 1;
                    }
                    if (user.userId === userTurn.userId) {
                        user.turns += 1;
                    }
                });
                yield room.save();
                io.in(roomId).emit("correct_guess", {
                    players: room.users,
                    playerTurnId: userTurn.userId,
                    playerTurnName: userTurn.username,
                });
            }
        }
        catch (err) {
            io.to(roomId).emit("fail", {
                message: "Could`nt submit Guess, Internal server error",
            });
        }
    }));
};
exports.default = submitGuess;
