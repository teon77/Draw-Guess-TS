import React from "react";
import styles from "../core/Waiting.module.css";

const ExplainComponent = ({ players, handleStartGame }) => {
  return (
    <div className={styles.explain}>
      <h2>Welcome {players.map((player) => player.username).join(", ")} !</h2>
      <p>
        You will get to choose between 3 random words. One player will draw and
        the others will guess. The first to guess correctly will receive a
        point, have fun!
      </p>
      <button disabled={players.length < 2} onClick={handleStartGame}>
        Lets Go
      </button>
    </div>
  );
};

export default React.memo(ExplainComponent);
