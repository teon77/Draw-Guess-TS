import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enteredUserName: "",
  enteredRoomId: "",
  joinRoomOption: false,
};

export const roomSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state.enteredUserName = action.payload.enteredUserName;
      state.enteredRoomId = action.payload.enteredRoomId;
      state.joinRoomOption = action.payload.joinRoomOption;
    },
    setJoinRoomOption: (state, action) => {
      state.joinRoomOption = action.payload;
    },
  },
});

export const { setLoginData, setJoinRoomOption } = roomSlice.actions;

export default roomSlice.reducer;
