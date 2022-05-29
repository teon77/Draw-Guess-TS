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
const deleteRoom = (socket, io) => {
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // find user with userId equal to socket.id and delete it
            const user = yield User_1.default.findOneAndDelete({ userId: socket.id }).exec();
            if (user) {
                // find room with roomId equal to user.roomId and delete it if its empty
                const room = yield Room_1.default.findOne({ roomId: user.roomId }).exec();
                if (room) {
                    // remove user from room
                    room.users = room.users.filter((u) => u.userId !== socket.id);
                    yield room.save();
                    if (room.users.length === 0) {
                        yield Room_1.default.deleteOne({ roomId: user.roomId }).exec();
                    }
                }
            }
        }
        catch (err) {
            return;
        }
    }));
};
exports.default = deleteRoom;
