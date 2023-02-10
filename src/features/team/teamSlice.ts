import { Mark } from "./../../models/player";
import { createSlice } from "@reduxjs/toolkit";
import { deleteEmptyField } from "../../app/objectService";
import { IGame } from "../../models/room/game";
import { ITeam } from "../../models/team";

const teamSlice = createSlice({
  name: "team",
  initialState: {
        id: "",
        playerIds: [] as string[],
        mark: 'Empty',
        score: 0,
        isTeamTurn: false,
        createdDateTime: null,
        updateDateTime: null,
  } as ITeam,
  reducers: {
    setTeam(state, action) {
      deleteEmptyField(action);
      state = Object.assign(state, action.payload);
    },
  },
});


export default teamSlice.reducer;
export const { setTeam } = teamSlice.actions;

