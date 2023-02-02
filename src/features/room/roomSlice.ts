import { Mark } from './../../models/player';
import { createSlice } from "@reduxjs/toolkit";
import { IRoom } from "../../models/room/room";
import playerSlice from '../player/playerSlice';


const roomSlice = createSlice({
  name: "game",
  initialState: {
    id: "",
    password: "",
    status: null,
    playersForStart: 2,
    gameResult: null,
    game: {
      id: "",
      playerTurnId: "",
      map: {
        id: "",
        fields: [] as Array<Array<string>>,
        size: 3,
        isAllCellFilled: false,
        createdDateTime: null,
        updateDateTime: null
      },
      playerIds: [] as Array<string>,
      createdDateTime: null,
      updateDateTime: null
    },
    score: {my:0, enemy:0},
    createdDateTime: null,
    updateDateTime: null
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
    setRoom(state, action) {deleteEmptyField(action);
      let map = chunkArray(
        action.payload?.game?.map?.fields,
        action.payload.game?.map?.size
      );
      if (map !== undefined) action.payload.game.map.fields = map;
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


function getMarkUser(playerTurn: string, mark:Mark) {
  if (playerTurn) {
    return mark;
  } else if (mark == "Cross") {
    return "Circle";
  } else {
    return "Cross";
  }
}

export default roomSlice.reducer;
export const {
  setRoom,
} = roomSlice.actions;

function chunkArray(str: string, cnt:number) {
  if (str != undefined) {
    const arr = str.split(" ");
    return arr.reduce(
      (prev:any, cur, i, a) =>
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

function deleteEmptyField(action: any) {
  Object.keys(action.payload).forEach(
    (key) => action.payload[key] === null && delete action.payload[key]
  );
}
