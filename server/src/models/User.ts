import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  userId: string;
  roomId: string;
  turns: number;
  score: number;
}

const UserModel = model<IUser>(
  "User",
  new Schema<IUser>(
    {
      username: { type: String, required: true },
      userId: { type: String, required: true },
      roomId: { type: String, required: true },
      turns: { type: Number, required: true },
      score: { type: Number, required: true },
    },
    {
      versionKey: false,
    }
  )
);

export type UserGameType = Omit<IUser, "roomId" | "_id">;

export default UserModel;
