import React, { useState, useRef } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [joinRoom, setJoinRoom] = useState(false);
  const nameInputRef = useRef();
  const roomInputRef = useRef("");

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const enteredUserName = nameInputRef.current.value;
    const enteredRoomId = roomInputRef.current.value;
    navigate("/waiting-room", {
      state: { username: enteredUserName, roomId: enteredRoomId },
    });
  };

  return (
    <div className={styles.home_page}>
      <h1 className={styles.header}>Draw & Guess !</h1>
      <form onSubmit={formSubmitHandler} className={styles.login}>
        <input
          type="text"
          placeholder="Nickname..."
          ref={nameInputRef}
          required={true}
        />
        {!joinRoom ? (
          <button>Create Room</button>
        ) : (
          <>
            <input
              type="text"
              placeholder="Room Id..."
              required={true}
              ref={roomInputRef}
            />
            <button>Enter Room</button>
          </>
        )}
        <span>I already have room Id</span>
        <input
          placeholder="I already have room Id"
          type="checkbox"
          checked={joinRoom}
          onChange={() => setJoinRoom(!joinRoom)}
        />
      </form>
    </div>
  );
};

export default Home;
