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
  const { chosenWord, isDrawing } = useSelector((state) => state.game);

  return (
    <div className={styles.game_page}>
      <ul className={styles.players_list}>
        {players.length > 1 &&
          players.map((player) => (
            <PlayerGameCard playerObj={player} key={player.userId} />
          ))}
      </ul>

      {isDrawing ? (
        <div className={styles.drawing_container}>
          {chosenWord ? (
            <div>
              <span>Drawing: {chosenWord}</span>
              <Drawing roomId={roomId} />
            </div>
          ) : (
            <WordChoosing roomId />
          )}
        </div>
      ) : (
        <Guessing roomId={roomId} />
      )}
    </div>
  );
};

export default Game;
