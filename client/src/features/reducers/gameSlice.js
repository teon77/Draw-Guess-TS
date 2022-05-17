import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameData: (state, action) => {
      state.gameData = action.payload;
    },
  },
});

export const { setGameData } = gameSlice.actions;

export default gameSlice.reducer;
