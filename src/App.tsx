import { Grid } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/common/Layout';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { Game } from './components/pages/Game/Game';
import { Lobby } from './components/pages/Lobby/Lobby';
import { Public } from './components/pages/Public/Public';
import { Login } from './features/auth/Login';
import RequireAuth from './features/auth/RequireAuth';
import { useAppSelector } from './app/hooks';

function App() {
  const connectionErrors = useAppSelector(state => state.connection.errors);
  return (
    <div className="App">
      <Grid container direction="column" gap={4}>
        <Grid item>
          <Header>TicTacToeOnline</Header>
        </Grid>
        {connectionErrors?.map(error => (
          <Grid item>{error}</Grid>
        ))}
        <Grid item>
          <Routes>
            <Route path="/" element={<Layout />} >
              {/* public routes */}
              <Route index element={<Public />} />
              <Route path="login" element={<Login />} />
              {/* <Route path="lobby" element={<Lobby joinRoom={joinRoom} createRoom={createRoom} createRoomByAnonymous={createRoomByAnonymous} />} /> */}

              {/* protected routes */}
              <Route element={<RequireAuth/>}>
                  <Route path="lobbyAuth" element={<Lobby />} />
              </Route>

              <Route path="tictactoe/:id" element={<Game />} />

            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
