import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: "",
  message: "",
  showError: false,
  players: [],
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setWaitingData: (state, action) => {
      state.roomId = action.payload.roomId;
      state.message = action.payload.message;
      state.showError = action.payload.showError;
      state.players = action.payload.players;
    },
  },
});

export const { setWaitingData } = roomSlice.actions;

export default roomSlice.reducer;
