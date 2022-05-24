import {
  setGameData,
  setIsDrawing,
  setDrawing,
  setWordOptions,
  setChosenWord,
} from "../reducers/gameSlice";

const socketGameController = (socket, store) => {
  socket.on("start_game", ({ playerTurnId, playerTurnName, readyToStart }) => {
    store.dispatch(
      setGameData({
        readyToStart,
        playerTurnId,
        playerTurnName,
      })
    );
    store.dispatch(setIsDrawing(socket.socket.id === playerTurnId));
  });

  socket.on("stream_drawing", ({ drawing }) => {
    store.dispatch(setDrawing(drawing));
  });

  socket.on("set_word_options", (wordOptions) => {
    store.dispatch(setWordOptions(wordOptions));
  });

  socket.on("set_chosen_word", (chosenWord) => {
    store.dispatch(setChosenWord(chosenWord));
  });
};

export default socketGameController;
