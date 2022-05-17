import React from "react";
import styles from "../core/Waiting.module.css";

const ErrorComponent = ({ message, navigateToHome }) => {
  return (
    <div className={styles.message}>
      <span>{message}</span>
      <button className={styles.back_btn} onClick={navigateToHome}>
        Go Back
      </button>
    </div>
  );
};

export default React.memo(ErrorComponent);
