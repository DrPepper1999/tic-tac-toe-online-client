import { createSlice, Slice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { deleteEmptyField } from "../../app/objectService";

interface IUser {
  id: string | null;
  email: string | null;
  name: string | null;
  token: string | null;
  isAuth: boolean;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: null,
    email: null,
    name: null,
    token: null,
    isAuth: true
  } as IUser,
  reducers: {
    setCredentials: (state, action) => {
      deleteEmptyField(action);
      state = Object.assign(state, action.payload);
    },
    logOut: (state, action) => {
      state.id = null;
      state.email = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
