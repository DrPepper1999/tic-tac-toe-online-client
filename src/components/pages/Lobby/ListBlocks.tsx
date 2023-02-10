import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ListBlock from "./ListBlock";
import React, { useEffect, useState } from "react";
import { ITeam } from "../../../models/team";
import { useTeamsMutation } from "../../../features/team/teamApiSlice";
import { useAppSelector } from "../../../app/hooks/hooks";
import { IPlayer } from "../../../models/player";
import { usePlayersMutation } from "../../../features/player/playerApiSlice";

export const ListBlocks = () => {
  const room = useAppSelector((state) => state.room);
  const [getTeams, { isLoading: isLoadingTeams }] = useTeamsMutation();
  const [getPlayers, { isLoading: isLoadingPlayers }] = usePlayersMutation();
  const [teams, setTeams] = useState<ITeam[]>([]);
  const [players, setPlayers] = useState<Map<string, IPlayer[]>>();

  useEffect(() => {
    const fetchData = async () => {
      //debugger;
      let fetchTeams: ITeam[] = await getTeams(room.id).unwrap();
      // while(fetchTeams.length == 0)
      // {
      //   await setTimeout(async () => {
      //     fetchTeams = await getTeams(room.id).unwrap();
      //   }, 300);
      // }
      if (fetchTeams.length == 0)
      {
        await setTimeout(async () => {
          debugger;
          fetchTeams = await getTeams(room.id).unwrap();
          setTeams(fetchTeams);
        }, 10000);
      }
      console.log(fetchTeams.length == 0);
      setTeams(fetchTeams);
      let localPlayers: Map<string, IPlayer[]> = new Map();
      fetchTeams.forEach((team) => {
        const invoke = async () => {
          const players: IPlayer[] = await getPlayers(team.playerIds).unwrap();
          localPlayers.set(team.mark, players);
        };
        invoke();
      });
      setPlayers(localPlayers);
    };
    fetchData();
  }, []);

  // const handleCheckedRight = () => {
  //   setRight(right.concat(leftChecked));
  //   setLeft(not(left, leftChecked));
  // };

  // const handleCheckedLeft = () => {
  //   setLeft(left.concat(rightChecked));
  //   setRight(not(right, rightChecked));
  // };

  return (
    <>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        {teams.map((team, index) => (
          <>
            <Grid item>
              <ListBlock
                title={team.mark}
                items={players?.get(team.mark) ?? []}
              />
            </Grid>
            {/* {
              index < teams.length - 1
              ?
              <Grid item>
                <Grid container direction="column" alignItems="center">
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedRight}
                    //disabled={leftChecked.length === 0}
                    aria-label="move selected right"
                  >
                    &gt;
                  </Button>
                  <Button
                    sx={{ my: 0.5 }}
                    variant="outlined"
                    size="small"
                    onClick={handleCheckedLeft}
                    //disabled={rightChecked.length === 0}
                    aria-label="move selected left"
                  >
                    &lt;
                  </Button>
                </Grid>
              </Grid>
              : null
            } */}
          </>
        ))}
      </Grid>
    </>
  );
};
