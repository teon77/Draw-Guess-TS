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
const setChosenWord = (socket, io) => {
    socket.on("set_chosen_word", ({ roomId, chosenWord, }) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const room = yield Room_1.default.findOne({ roomId }).exec();
            if (!room) {
                io.in(roomId).emit("fail", {
                    message: "Room not found!",
                });
                return;
            }
            room.word = chosenWord;
            yield room.save();
            io.to(socket.id).emit("set_chosen_word", {
                chosenWord,
            });
        }
        catch (err) {
            io.to(roomId).emit("fail", {
                message: "Could`nt fetch words, Internal server error",
            });
        }
    }));
};
exports.default = setChosenWord;
