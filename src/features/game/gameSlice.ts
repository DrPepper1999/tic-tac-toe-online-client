import { Mark } from "./../../models/player";
import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../models/room/room";
import playerSlice from "../player/playerSlice";
import { deleteEmptyField } from "../../app/objectService";
import { IGame } from "../../models/room/game";

const gameSlice = createSlice({
  name: "game",
  initialState: {
        id: "",
        playerTurnId: "",
        map: {
          id: "",
          fields: [] as Mark[][],
          size: 3,
          isAllCellFilled: false,
          createdDateTime: null,
          updateDateTime: null,
        },
        teamIds: [] as string[],
        createdDateTime: null,
        updateDateTime: null,
  } as IGame,
  reducers: {
    setGame(state, action) {
      deleteEmptyField(action);
      let map = chunkArray(
        action.payload?.map?.fields,
        action.payload.map?.size
      );
      if (map !== undefined) action.payload.map.fields = map;
      state = Object.assign(state, action.payload);
    },
    // makeMove(state, action) {
    //   // x y value
    //   if (state.game.map.fields[action.payload.x][action.payload.y] == "Empty") {
    //     state.game.map.fields[action.payload.x][action.payload.y] = getMarkUser(
    //       state.user.playerTurn,
    //       state.user.mark
    //     );
    //     playerSlice.
    //     state.user.playerTurn = !state.user.playerTurn;
    //   }
    // },
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

export default gameSlice.reducer;
export const { setGame } = gameSlice.actions;

function chunkArray(str: string, cnt: number) {
  if (str != undefined) {
    const arr = str.split(" ");
    return arr.reduce(
      (prev: any, cur, i, a) =>
        !(i % cnt) ? prev.concat([a.slice(i, i + cnt)]) : prev,
      []
    );
  }
}

// function trySetPlayerTurn(playerTurn, userId, state) {
//   if (
//     playerTurn !== undefined &&
//     playerTurn == userId
//   ) {
//     state.user.playerTurn = true;
//   }
// }
