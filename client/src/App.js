import React from "react";
import Home from "./features/core/Home";
import Waiting from "./features/core/Waiting";
import Game from "./features/core/Game";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/waiting-room" element={<Waiting />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
}

export default App;
