import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWaitingRoomData } from "../roomApi/roomSlice";
import styles from "./Waiting.module.css";
import ExplainComponent from "./ExplainComponent";
// import { socketMiddleware } from "../../app/socketMiddleware";

const WaitingRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, roomId } = location.state;
  const [isCopied, setIsCopied] = useState(false);

  const waitingRoomData = {
    roomId: useSelector((state) => state.room.roomId),
    message: useSelector((state) => state.room.message),
    success: useSelector((state) => state.room.success),
    ready: useSelector((state) => state.room.ready),
    players: useSelector((state) => state.room.players),
  };

  const copyToClipboard = useCallback(async (text) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    }
  }, []);

  const handleStartGame = useCallback(() => {
    console.log("handleStartGame");
  }, []);

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    dispatch({ type: "SOCKET_CONNECT" });
    if (roomId) {
      dispatch({
        type: "JOIN_ROOM",
        payload: {
          username,
          roomId,
        },
      });
    } else if (username) {
      dispatch({ type: "CREATE_ROOM", payload: { username } });
    }
  }, []);

  return (
    <div className={styles.waiting_room}>
      <div className={styles.information}>
        <div className={styles.information_bar}>
          {waitingRoomData.success ? (
            <div>
              Room ID: {waitingRoomData.roomId}{" "}
              <button
                className="copy_button"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(waitingRoomData.roomId);
                }}
              >
                {isCopied ? <>&#10003;</> : "Copy"}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {waitingRoomData.ready ? (
        <ExplainComponent
          players={waitingRoomData.players}
          handleStartGame={handleStartGame}
        />
      ) : (
        <>
          {" "}
          {waitingRoomData.success ? (
            <div className="loader">Waiting for another player to join ...</div>
          ) : (
            <div className="loader">
              {waitingRoomData.message}{" "}
              <button className="copy_button" onClick={navigateToHome}>
                Go Back
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WaitingRoom;
