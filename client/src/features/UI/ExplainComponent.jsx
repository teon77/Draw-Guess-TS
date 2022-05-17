import React from "react";
import styles from "../core/Waiting.module.css";

const ExplainComponent = ({ players, handleStartGame }) => {
  return (
    <div className={styles.explain}>
      <h2>Welcome {players.map((player) => player.username).join(", ")} !</h2>
      <p>
        You will get to choose between 3 random words. <br />
        One player will draw and the other will guess. an "Easy" word will give
        you 1 point, <br />
        a "Medium" word will give you 3 points, <br />
        and a "Hard" word will give you 5 points. <br />
        Each game lasts 10 minutes, try to score as many points as you can!{" "}
        <br /> when you are ready, click the button below.
      </p>
      <button disabled={players.length < 2} onClick={handleStartGame}>
        Lets Go
      </button>
    </div>
  );
};

export default React.memo(ExplainComponent);
