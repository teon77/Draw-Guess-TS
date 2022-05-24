import { Schema, model } from "mongoose";
import { UserGameType } from "./User";

export interface IRoom {
  roomId: string;
  word: string;
  hasStarted: boolean;
  users: UserGameType[];
}

const RoomModel = model<IRoom>(
  "Room",
  new Schema<IRoom>(
    {
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
    },
    { versionKey: false }
  )
);

export default RoomModel;
