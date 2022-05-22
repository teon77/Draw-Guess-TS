import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Waiting.module.css";
import ExplainComponent from "../UI/ExplainComponent";
import ErrorComponent from "../UI/ErrorComponent";

const Waiting = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCopied, setIsCopied] = useState(false);

  const { enteredUserName, enteredRoomId, joinRoomOption } = useSelector(
    (state) => state.login
  );

  const { roomId, message, showError, players } = useSelector(
    (state) => state.room
  );

  const readyToStart = useSelector((state) => state.game.readyToStart);

  const copyToClipboard = useCallback(async (text) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    }
  }, []);

  const handleStartGame = useCallback(() => {
    dispatch({ type: "START_GAME", payload: { roomId } });
  }, [dispatch, roomId]);

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (joinRoomOption && enteredRoomId && enteredUserName && !readyToStart) {
      dispatch({ type: "SOCKET_CONNECT" });
      dispatch({
        type: "JOIN_ROOM",
        payload: {
          username: enteredUserName,
          roomId: enteredRoomId,
        },
      });
    } else if (enteredUserName && !readyToStart) {
      dispatch({ type: "SOCKET_CONNECT" });
      dispatch({ type: "CREATE_ROOM", payload: { username: enteredUserName } });
    } else if (readyToStart) {
      navigate("/game");
    }
  }, [
    dispatch,
    enteredRoomId,
    enteredUserName,
    joinRoomOption,
    readyToStart,
    navigate,
  ]);

  return (
    <div className={styles.waiting_room}>
      <div className={styles.information}>
        {roomId && (
          <div className={styles.information_bar}>
            <div>
              Room ID: {roomId}{" "}
              <button
                className="copy_button"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(roomId);
                }}
              >
                {isCopied ? <>&#10003;</> : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>

      {!showError && roomId && (
        <ExplainComponent players={players} handleStartGame={handleStartGame} />
      )}
      {showError && (
        <ErrorComponent message={message} navigateToHome={navigateToHome} />
      )}
    </div>
  );
};

export default Waiting;
