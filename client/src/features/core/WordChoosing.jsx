import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./WordChoosing.module.css";

const WordChoosing = () => {
  const roomId = useSelector((state) => state.room.roomId);
  const wordOptions = useSelector((state) => state.game.wordOptions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "SET_WORD_OPTIONS",
      payload: { roomId },
    });
  }, [dispatch, roomId]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_CHOSEN_WORD",
      payload: { roomId, chosenWord: e.target.textContent },
    });
  };

  return (
    <div className={styles.words_page}>
      <div className={styles.explain}>
        <h1>Choose a word to draw</h1>
        <p>
          Remember, an "Easy" word will give you 1 point, <br />
          a "Medium" word will give you 3 points, <br />
          and a "Hard" word will give you 5 points. <br />
          Click on a word to choose it.
        </p>
      </div>
      <div className={styles.word_choosing}>
        <div>
          <label>Easy</label>
          <br />
          <button onClick={handleClick}>{wordOptions.option1}</button>
        </div>
        <div>
          <label>Medium</label>
          <br />
          <button onClick={handleClick}>{wordOptions.option2}</button>
        </div>
        <div>
          <label>Hard</label>
          <br />
          <button onClick={handleClick}>{wordOptions.option3}</button>
        </div>
      </div>
    </div>
  );
};

export default WordChoosing;
