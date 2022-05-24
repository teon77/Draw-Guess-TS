import React from "react";

const PlayerGameCard = ({ playerObj }) => {
  return (
    <React.Fragment>
      <li>
        <span>Name: {playerObj.username}</span>
        <span>Score: {playerObj.score}</span>
        <span>Turns: {playerObj.turns}</span>
      </li>
    </React.Fragment>
  );
};
export default PlayerGameCard;
