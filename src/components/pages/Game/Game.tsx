import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks/hooks";
import { setPlayer } from "../../../features/player/playerSlice"; 
import { RoomId } from "./RoomId";
import {TicTacToe} from './TicTacToe';
import { Score } from "./Score";

export const Game = () => {
  const dispatch = useAppDispatch();
  const room = useAppSelector((state) => state.room);
  const playerName = useAppSelector((state) => state.player.name);
  const playerRole = useAppSelector((state) => state.player.role);
 // const moveErros = useAppSelector((state) => state.game.responseInfo.moveErrors);

  useEffect(() => {
    switch (room.status) {
      case "Run":
        if (playerRole == "Creator") dispatch(setPlayer({ playerTurn: true }));
        break;
    }
  }, [room.status]);

  return (
    <div>
      <Grid container direction="column" gap={4}>
        <Grid item container direction="column" gap={2}>
          <Grid>
            <Grid container direction="row" justifyContent="space-evenly" alignItems="baseline">
              <Grid item >
                <Typography variant="body1">you: {playerName}</Typography>
              </Grid>
              <Grid item><Score/></Grid>
              <Grid item>
                <Typography variant="body1">enemy: {"TODO"}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="column" gap={6}>
          <Grid>
            {/* {moveErros.map((error) => (
              <>{error}</>
            ))} */}
            <TicTacToe />
          </Grid>
          <Grid><RoomId  roomId={room.id} /></Grid>
        </Grid>
      </Grid>
    </div>
  );
};
