import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { IPlayer } from "../../models/player";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    id: "",
    name: "",
    role: null, // Creator, Joined
    isAuth: true,
    mark: "Empty", // Cross, Circle
    isPlayerTurn: false,
  } as IPlayer,
  reducers: {
    setPlayer(state, action) {
      Object.keys(action.payload).forEach(
        (key) => action.payload[key] === null && delete action.payload[key]
      );
    },
  },
});

export default playerSlice.reducer;
export const {
    setPlayer
  } = playerSlice.actions;
