import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Game.module.css";
import Guessing from "./Guessing";
import Drawing from "./Drawing";
import PlayerGameCard from "../UI/PlayerGameCard";
import WordChoosing from "./WordChoosing";

const Game = () => {
  const { players, roomId } = useSelector((state) => state.room);
  const { chosenWord, isDrawing, playerTurnName } = useSelector(
    (state) => state.game
  );

  return (
    <div className={styles.game_page}>
      <div className={styles.players_list_container}>
        <ul className={styles.players_list}>
          {players.length > 1 &&
            players.map((player) => (
              <PlayerGameCard playerObj={player} key={player.userId} />
            ))}
        </ul>
      </div>
      <div className={styles.information}>
        <span>Current Drawer: {playerTurnName}</span>
        {isDrawing && <span>Drawing: {chosenWord}</span>}
      </div>

      {isDrawing ? (
        <div className={styles.drawing_container}>
          {chosenWord ? <Drawing roomId={roomId} /> : <WordChoosing roomId />}
        </div>
      ) : (
        <Guessing roomId={roomId} />
      )}
    </div>
  );
};

export default Game;
