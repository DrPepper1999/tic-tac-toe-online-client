import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import gameSlice from '../features/room/roomSlice';
import plyerSlice from '../features/player/playerSlice';
import { apiSlice } from './api/apiSlice';
import authReducer from '../features/auth/authSlice'
import connectionSlice from '../features/connection/connectionSlice';


const rootReducer = combineReducers({
  game: gameSlice,
  player: plyerSlice,
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  connection: connectionSlice
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
