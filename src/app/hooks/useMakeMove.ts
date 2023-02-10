import { HubConnection } from "@microsoft/signalr";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Mark } from "../../models/player";

export function useMakeMove(x: number, y: number) {
  const dispatch = useAppDispatch();
  const connection = useAppSelector((state) => state.connectionInfo.connection);
  const mapFields = useAppSelector((state) => state.game.map.fields);
  const team = useAppSelector((state) => state.team);
  const roomId = useAppSelector((state) => state.room.id);

  if (connection == null) {
    // error
    return;
  }

  return async () =>
    makeMove(
      x,
      y,
      dispatch,
      connection,
      team.isTeamTurn,
      team.id,
      team.mark,
      mapFields,
      roomId
    );
}

async function makeMove(
  x: number,
  y: number,
  dispatch: Dispatch,
  connection: HubConnection,
  isTeamTurn: boolean,
  playerId: string,
  mark: string,
  mapFields: Mark[][],
  roomId: string
) {
  if (isTeamTurn && mapFields[x][y] == "Empty") {
    await connection.invoke("MakeMove", { x, y, playerId, mark, roomId });
  }
}
