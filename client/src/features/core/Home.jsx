import React, { useRef } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { setLoginData, setJoinRoomOption } from "../reducers/loginSlice";
import { useSelector, useDispatch } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const joinRoomOption = useSelector((state) => state.login.joinRoomOption);
  const nameInputRef = useRef();
  const roomInputRef = useRef("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const enteredUserName = nameInputRef.current.value;
    const enteredRoomId = roomInputRef.current.value;

    dispatch(setLoginData({ enteredUserName, enteredRoomId, joinRoomOption }));
    navigate("/waiting-room");
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
        {!joinRoomOption ? (
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
          checked={joinRoomOption}
          onChange={() => dispatch(setJoinRoomOption(!joinRoomOption))}
        />
      </form>
    </div>
  );
};

export default Home;
