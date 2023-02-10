import { Box, Button, Container, Grid, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { CreateOrJoinGame } from "./CreateOrJoinGame";
import CustomizedSettingMenus from "./CustomizedSettingMenus";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/hooks";
import { useSearchParams, useNavigate } from "react-router-dom";
import { setRoom } from "../../../features/room/roomSlice";
import { setCredentials } from "../../../features/auth/authSlice";
import { GachiMan } from "./GachiMan";
import gachi1 from './images/pngGachi.png';
import gachi2 from './images/images.jpg';
import { useCreateRoom } from "../../../app/hooks/useCreateRoom";

export const CreateRoom = () => {
  const [selectedValue, setSelectedValue] = React.useState("create");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const gameQuery = searchParams.get("roomId") || "";

  const dispatch = useAppDispatch();

  const createRoomPromis = useCreateRoom();
  const createRoom = async () => await createRoomPromis();

  const room = useAppSelector((state) => state.room);
  const user = useAppSelector((state) => state.auth);
  const isSuccessConnection = useAppSelector(
    (state) => state.connectionInfo.isSuccessConnection
  );
  
  const isDisabled = () => {
    return !((user.name != "" && room.name != "") || room.id != "");
  };

  useEffect(() => {
    if (gameQuery != "") setSelectedValue("join");
  }, [gameQuery]);

  useEffect(() => {
    if (isSuccessConnection) navigate(`/lobby/${room.id}`);
  }, [isSuccessConnection]);

  return (
    <>
    <GachiMan width="272px" height="369px" src={gachi1} side='right' />
    <GachiMan width="186px" height="323px" src={gachi2} side='left' />
    <Container sx={{ height: "100%", marginTop:'30px' }}>
      <Box
        component="form"
        onSubmit={async (e) => {
          e.preventDefault();
          await createRoom();
        }}
      >
        <Container
          disableGutters 
          maxWidth='xs'
          sx={{
            'padding-left': '0px',
            backgroundColor: "white",
            padding: "24px 0px 20px 0px",
            borderRadius: "40px",
          }}
        >
          <Grid container direction="column" justifyContent="center" gap={4}>
            <Grid
              item
              container
              direction="column"
              justifyContent="center"
              gap={4}
            >
              <Grid item>
                <TextField
                  sx={{ width: "25ch" }}
                  label="Name"
                  variant="filled"
                  placeholder="name"
                  onChange={(e) =>
                    dispatch(setCredentials({ name: e.target.value }))
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: "25ch" }}
                  label={selectedValue == "create" ? "Room name" : "Room Id"}
                  variant="filled"
                  placeholder="room"
                  defaultValue={gameQuery}
                  onChange={(e) =>
                    selectedValue == "create"
                      ? dispatch(setRoom({ name: e.target.value }))
                      : dispatch(setRoom({ id: e.target.value }))
                  }
                />
              </Grid>
              <Grid item>
                <TextField
                  sx={{ width: "25ch" }}
                  label="Password"
                  variant="filled"
                  placeholder="password"
                  onChange={(e) =>
                    dispatch(setRoom({ password: e.target.value }))
                  }
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="center"
              gap={2}
              alignItems="center"
            >
              <Grid item>
                <CreateOrJoinGame
                  setSelectedValue={setSelectedValue}
                  selectedValue={selectedValue}
                />
              </Grid>
              <Grid item>
                <CustomizedSettingMenus />
              </Grid>
            </Grid>
            <Grid item>
              <Button type="submit" disabled={isDisabled()}>
                {selectedValue}
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Container>
    </>
  );
};
