import { setGameData, setIsDrawing } from "../reducers/gameSlice";

const socketGameController = (socket, store) => {
  socket.on("start_game", ({ playerTurnId, playerTurnName, readyToStart }) => {
    store.dispatch(
      setGameData({
        readyToStart,
        playerTurnId,
        playerTurnName,
      })
    );
    setIsDrawing(socket.id === playerTurnId);
  });
};

export default socketGameController;
