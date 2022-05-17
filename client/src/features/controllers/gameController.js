import { setGameData } from "../reducers/gameSlice";

const socketGameController = (socket, store) => {
  socket.on("game_data", ({ gameData }) => {});
};

export default socketGameController;
