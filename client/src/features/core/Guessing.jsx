import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Guessing.module.css";

const Guessing = () => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const roomId = useSelector((state) => state.room.roomId);
  const drawing = useSelector((state) => state.game.drawing);

  const handleGuess = (e) => {
    e.preventDefault();
    const guess = inputRef.current.value;

    dispatch({
      type: "SUBMIT_GUESS",
      payload: { roomId, guess },
    });
  };

  return (
    <div>
      <div className={styles.guess_container}>
        <label>Guess Here!</label>
        <input type="text" ref={inputRef} />
        <button onClick={handleGuess}>Submit</button>
      </div>
      <div className={styles.image_container}>
        {drawing && (
          <img src={drawing} alt="drawing" width={250} height={250} />
        )}
      </div>
    </div>
  );
};

export default Guessing;
