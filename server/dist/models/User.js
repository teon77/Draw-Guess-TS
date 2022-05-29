"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserModel = (0, mongoose_1.model)("User", new mongoose_1.Schema({
    username: { type: String, required: true },
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    turns: { type: Number, required: true },
    score: { type: Number, required: true },
}, {
    versionKey: false,
}));
exports.default = UserModel;
