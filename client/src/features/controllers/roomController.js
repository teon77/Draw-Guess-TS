import { setWaitingData } from "../reducers/roomSlice";

const socketRoomController = (socket, store) => {
  socket.on("created_success", ({ roomId, players }) => {
    store.dispatch(
      setWaitingData({
        roomId,
        message: "Waiting for another player to join ...",
        showError: false,
        players,
      })
    );
  });

  socket.on("joined_success", ({ roomId, players }) => {
    store.dispatch(
      setWaitingData({
        roomId,
        message: "",
        showError: false,
        players,
      })
    );
  });

  socket.on("fail", ({ message }) => {
    store.dispatch(
      setWaitingData({
        roomId: "",
        message,
        showError: true,
        players: [],
      })
    );
  });
};

export default socketRoomController;
