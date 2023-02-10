import { Mark } from "./../../models/player";
import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../models/room/room";
import playerSlice from "../player/playerSlice";
import { deleteEmptyField } from "../../app/objectService";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    id: "",
    name: "",
    password: "",
    status: null,
    playerIds: [] as string[],
    teamIds: [] as string[],
    gameSetting: {
      mapSize: 3,
      maxPlayers: 2,
      teamCount: 2,
    },
    gameResult: null,
    score: { my: 0, enemy: 0 },
    createdDateTime: null,
    updateDateTime: null,
  } as IRoom,
  reducers: {
    // setConnectionInfo(state, action) {
    //   deleteEmptyField(action);
    //   if (action.payload.errors == null)
    //     action.payload.errors = [];

    //   state.connectionInfo = Object.assign(
    //     state.connectionInfo,
    //     action.payload
    //   );
    // },
    // setMoveException(state, action) {
    //   state.responseInfo.moveErrors = action.payload;
    // },
    setRoom(state, action) {
      deleteEmptyField(action);
      state = Object.assign(state, action.payload);
    },
  },
});

function getMarkUser(playerTurn: string, mark: Mark) {
  if (playerTurn) {
    return mark;
  } else if (mark == "Cross") {
    return "Circle";
  } else {
    return "Cross";
  }
}

export default roomSlice.reducer;
export const { setRoom } = roomSlice.actions;

// function trySetPlayerTurn(playerTurn, userId, state) {
//   if (
//     playerTurn !== undefined &&
//     playerTurn == userId
//   ) {
//     state.user.playerTurn = true;
//   }
// }
