import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readyToStart: false,
  playerTurnId: "",
  playerTurnName: "",
  isDrawing: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameData: (state, action) => {
      state.readyToStart = action.payload.readyToStart;
      state.playerTurnId = action.payload.playerTurnId;
      state.playerTurnName = action.payload.playerTurnName;
    },
    setIsDrawing: (state, action) => {
      state.isDrawing = action.payload;
    },
  },
});

export const { setGameData, setIsDrawing } = gameSlice.actions;

export default gameSlice.reducer;
