import { IConnectionInfo } from './../../models/connectionInfo';
import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "player",
    initialState: {
      connection: null,
      isSuccessConnection: false,
      errors: []
    } as IConnectionInfo,
    reducers: {
      setConnection(state, action) {
        Object.keys(action.payload).forEach(
          (key) => action.payload[key] === null && delete action.payload[key]
        );
      },
    },
  });
  
  export default connectionSlice.reducer;
  export const {
    setConnection
    } = connectionSlice.actions;
  