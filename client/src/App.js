import React from "react";
import Home from "./features/components/Home";
import WaitingRoom from "./features/components/WaitingRoom";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/waiting-room" element={<WaitingRoom />} />
    </Routes>
  );
}

export default App;
