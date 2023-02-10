import { useAppDispatch, useAppSelector } from "./hooks";
import {  HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { Dispatch } from "@reduxjs/toolkit";
import { setCredentials } from "../../features/auth/authSlice";
import { setPlayer } from "../../features/player/playerSlice";
import { setRoom } from "../../features/room/roomSlice";
import { setConnectionInfo } from "../../features/connection/connectionSlice";

export function useCreateConnection() {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);

 const result = async () => {
  try {
    let localConnection;
    if (token != undefined && token != null && token != "") {
      try {
        localConnection = new HubConnectionBuilder()
          .withUrl("https://localhost:7248/ticTacToeHubAuth", {
            accessTokenFactory: () => token,
          })
          .configureLogging(LogLevel.Information)
          .build();
      } catch (error) {
        console.log("sending refresh token");
        if (true) {
          // Если ошибка связана с истёкшим времени жизни токена
          const token = await sendRefreshToken(dispatch);
          //useCreateConnection();
        }
      }
    } else {
      localConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7248/ticTacToeHub")
        .configureLogging(LogLevel.Information)
        .build();
    }
    if (localConnection == undefined) {
      return null;
    }
    // on
    localConnection.on("setPlayer", (playerVm) => {
      dispatch(setPlayer(playerVm));
    });

    localConnection.on("setRoom", (roomVm) => {
      dispatch(setRoom(roomVm));
    });

    localConnection.on("setConnectionInfo", (isSuccessConnection, errors) => {
      dispatch(setConnectionInfo({ isSuccessConnection, errors }));
    });

    //   localConnection?.on("makeMove", (move) => {
    //     dispatch(makeMove(move));
    //   });

    await localConnection.start();

    dispatch(setConnectionInfo({ connection: localConnection }));
    return localConnection;
  } catch (e) {
    console.log(e);
    return null;
  }
};
return result;
}

async function fechRefrechToken() {
  return await fetch("https://localhost:7248/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    credentials: "include",
  });
}

async function sendRefreshToken(dispatch: Dispatch) {
  let response = await (await fechRefrechToken()).json();
  if (response.ok) {
    const { token, userId } = response.value;
    dispatch(setCredentials({ token: token }));
    return token;
  }
}
