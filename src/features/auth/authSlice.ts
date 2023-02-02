import { createSlice, Slice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IUser {
    id: string | null,
    email: string | null,
    name: string | null,
    token: string | null
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {id: null, email: null, name:null, token: null} as IUser,
    reducers: {
        setCredentials: (state, action: PayloadAction<IUser>) => {
            const { id, email, name , token} = action.payload;
            state.id = id;
            state.email = email;
            state.name = name;
            state.token = token;
        },
        logOut: (state, action) => {
            state.id = null;
            state.email = null;
            state.name = null;
            state.token = null;
        }
    },
})

export const {setCredentials, logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state:any) => state.auth.user;
export const selectCurrentToken = (state:any) => state.auth.token;