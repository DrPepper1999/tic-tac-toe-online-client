import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { deleteEmptyField } from "../../app/objectService";
import { IPlayer } from "../../models/player";

const playerSlice = createSlice({
  name: "player",
  initialState: {
    id: "",
    name: "",
    role: null, // Creator, Joined
    profileImage: null,
    isPlayerTurn: false,
  } as IPlayer,
  reducers: {
    setPlayer(state, action) {
      deleteEmptyField(action);
      state = Object.assign(state, action.payload);
    },
  },
});

export default playerSlice.reducer;
export const { setPlayer } = playerSlice.actions;
