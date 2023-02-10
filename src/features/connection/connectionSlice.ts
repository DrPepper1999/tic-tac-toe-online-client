import { IConnectionInfo } from './../../models/connectionInfo';
import { createSlice } from "@reduxjs/toolkit";
import { deleteEmptyField } from '../../app/objectService';

const connectionSlice = createSlice({
    name: "player",
    initialState: {
      connection: null,
      isSuccessConnection: false,
      errors: []
    } as IConnectionInfo,
    reducers: {
      setConnectionInfo(state, action) {
        deleteEmptyField(action);
        state = Object.assign(state, action.payload);
      },
    },
  });
  
  export default connectionSlice.reducer;
  export const {
    setConnectionInfo
    } = connectionSlice.actions;
  