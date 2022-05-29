"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomModel = (0, mongoose_1.model)("Room", new mongoose_1.Schema({
    roomId: { type: String, required: true },
    word: { type: String, required: false, default: "" },
    hasStarted: { type: Boolean, required: true, default: false },
    users: [
        {
            username: String,
            userId: String,
            turns: Number,
            score: Number,
        },
    ],
}, { versionKey: false }));
exports.default = RoomModel;
