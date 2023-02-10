import { setPlayer } from "../../features/player/playerSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useCreateConnection } from "./useCreateConnection";
import { HubConnection } from "@microsoft/signalr";
import { Dispatch } from "@reduxjs/toolkit";
import { setConnectionInfo } from "../../features/connection/connectionSlice";
import { setCredentials } from "../../features/auth/authSlice";

export function useCreateRoom() {
 var connectionTask = useCreateConnection();
 const dispatch = useAppDispatch();

 const isAuth = useAppSelector(state => state.auth.isAuth);

 const playerName = useAppSelector((state) => state.player.name);

 const roomName = useAppSelector((state) => state.room.name);
 const password = useAppSelector((state) => state.room.password);
 const maxPlayers = useAppSelector((state) => state.room.gameSetting.maxPlayers);
 const mapSize = useAppSelector((state) => state.game.map.size);

 const result = async () => {

  const connection = await connectionTask();

  if (connection == null) {
    // add error
    return;
  }

  if (isAuth) {
    await invokeCreateRoomAuth(
      connection,
      dispatch,
      roomName,
      password,
      maxPlayers,
      mapSize
    );
  } else {
    await invokeCreateRoomGuest(
        connection,
        dispatch,
        playerName,
        roomName,
        password,
        maxPlayers,
        mapSize
      );
  }

  dispatch(setPlayer({role: 'Creator'}));
  return;
}
return result;
}

async function invokeCreateRoomAuth(
    connection: HubConnection,
    dispatch: Dispatch,
    name: string,
    password: string,
    maxPlayers: number,
    mapSize: number,
    teamCount: number = 2
  ) {
    await connection
      .invoke("CreateRoomAuth", {
        name,
        password,
        maxPlayers,
        mapSize,
        teamCount
      })
      .catch((e) => {
        dispatch(
          setConnectionInfo({
            isSuccessConnection: false,
            messages: ["Room creation faild"],
          })
        );
        console.log(e);
      });
  }
  
  async function invokeCreateRoomGuest(
    connection: HubConnection,
    dispatch: Dispatch,
    playerName: string,
    roomName: string,
    password: string,
    maxPlayers: number,
    mapSize: number
  ) {
    await connection
      .invoke(
        "CreateRoomGuest",
        { name: playerName },
        {
          name: roomName,
          password,
          maxPlayers,
          mapSize,
        }
      )
      .catch((e) => {
        dispatch(
          setConnectionInfo({
            isSuccessConnection: false,
            messages: ["Room creation faild"],
          })
        );
        console.log(e);
      });
  }
  
  