import { createSlice } from "@reduxjs/toolkit";
// import io from "./socketConnection";

const initialState = {
  roomId: "",
  message: "",
  success: false,
  ready: false,
  players: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setWaitingRoomData: (state, action) => {
      state.roomId = action.payload.roomId;
      state.message = action.payload.message;
      state.players.push(action.payload.username);
    },
  },
});

export const { setWaitingRoomData, createRoom, joinRoom } = roomSlice.actions;

export default roomSlice.reducer;
