import React from "react";

const PlayerGameCard = ({ playerObj }) => {
  return (
    <React.Fragment>
      <li>
        <span>Name: {playerObj.username}</span> <br />
        <span>Score: {playerObj.score}</span> <br />
        <span>Turns: {playerObj.turns}</span>
      </li>
    </React.Fragment>
  );
};
export default PlayerGameCard;
