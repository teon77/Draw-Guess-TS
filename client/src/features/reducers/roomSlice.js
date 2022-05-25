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
      state.roomId = action.payload.roomId || state.roomId;
      state.message = action.payload.message || state.message;
      state.showError = action.payload.showError || state.showError;
      state.players = action.payload.players || state.players;
    },
  },
});

export const { setWaitingData } = roomSlice.actions;

export default roomSlice.reducer;
