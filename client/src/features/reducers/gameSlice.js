import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  readyToStart: false,
  playerTurnId: "",
  playerTurnName: "",
  isDrawing: false,
  drawing: "",
  chosenWord: "",
  wordOptions: {
    option1: "",
    option2: "",
    option3: "",
  },
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
    setDrawing: (state, action) => {
      state.drawing = action.payload;
    },
    setChosenWord: (state, action) => {
      state.chosenWord = action.payload;
    },
    setWordOptions: (state, action) => {
      state.wordOptions = action.payload;
    },
  },
});

export const {
  setGameData,
  setIsDrawing,
  setDrawing,
  setChosenWord,
  setWordOptions,
} = gameSlice.actions;

export default gameSlice.reducer;
