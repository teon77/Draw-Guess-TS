import { Schema, model } from "mongoose";
import { UserGameType } from "./User";

export interface IRoom {
  roomId: string;
  users: UserGameType[];
}

const RoomModel = model<IRoom>(
  "Room",
  new Schema<IRoom>(
    {
      roomId: { type: String, required: true },
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
