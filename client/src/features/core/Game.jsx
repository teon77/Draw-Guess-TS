import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Game.module.css";
import Guessing from "./Guessing";
import Drawing from "./Drawing";
import PlayerGameCard from "../UI/PlayerGameCard";

const Game = () => {
  const dispatch = useDispatch();

  const players = useSelector((state) => state.room.players);
  const isDrawing = useSelector((state) => state.game.isDrawing);

  return (
    <div>
      <h1>Game</h1>
      <ul>
        {players.length > 1 &&
          players.map((player) => (
            <PlayerGameCard playerObj={player} key={player.userId} />
          ))}
      </ul>
      {isDrawing ? <Drawing /> : <Guessing />}
    </div>
  );
};

export default Game;
