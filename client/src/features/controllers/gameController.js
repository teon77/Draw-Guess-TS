import {
  setGameData,
  setIsDrawing,
  setDrawing,
  setWordOptions,
  setChosenWord,
} from "../reducers/gameSlice";

import { setWaitingData } from "../reducers/roomSlice";

const socketGameController = (socket, store) => {
  socket.on("start_game", ({ playerTurnId, playerTurnName, readyToStart }) => {
    store.dispatch(
      setGameData({
        readyToStart,
        playerTurnId,
        playerTurnName,
      })
    );
    store.dispatch(setIsDrawing(socket.id === playerTurnId));
  });

  socket.on("stream_drawing", ({ drawing }) => {
    store.dispatch(setDrawing(drawing));
  });

  socket.on("set_word_options", ({ wordOptions }) => {
    store.dispatch(setWordOptions(wordOptions));
  });

  socket.on("set_chosen_word", ({ chosenWord }) => {
    store.dispatch(setChosenWord(chosenWord));
  });

  socket.on("correct_guess", ({ players, playerTurnId, playerTurnName }) => {
    store.dispatch(
      setWaitingData({
        players,
      })
    );
    store.dispatch(setDrawing(""));
    store.dispatch(
      setGameData({
        playerTurnId,
        playerTurnName,
      })
    );
    store.dispatch(setIsDrawing(socket.id === playerTurnId));
  });
};

export default socketGameController;
