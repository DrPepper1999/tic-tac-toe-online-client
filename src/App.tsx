import { Grid } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Layout } from './components/common/Layout';
import { Header } from './components/Header/Header';
import { NotFound } from './components/NotFound';
import { Game } from './components/pages/Game/Game';
import { CreateRoom } from './components/pages/CreateRoom/CreateRoom'; 
import { Public } from './components/pages/Public/Public';
import  Login  from './features/auth/Login/Login';
import RequireAuth from './features/auth/RequireAuth';
import { useAppSelector } from './app/hooks/hooks';
import { Lobby } from './components/pages/Lobby/Lobby';

function App() {
  const connectionErrors = useAppSelector(state => state.connectionInfo.errors);
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
              <Route path='roomCreater' element={<CreateRoom />} />
              <Route path='lobby/:id' element={<Lobby />} />
              {/* <Route path="lobby" element={<Lobby joinRoom={joinRoom} createRoom={createRoom} createRoomByAnonymous={createRoomByAnonymous} />} /> */}

              {/* protected routes */}
              <Route element={<RequireAuth/>}>
                  <Route path="lobbyAuth:id" element={<CreateRoom />} />
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
