import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    readEmail: [],
    totalEmail: 0
  },
  reducers: {
    readEmail(state, action) {
      if (state.readEmail.indexOf(action.payload) < 0) {
        state.readEmail.push(action.payload);
      }
    },
    setTotalEmail(state, action) {
      state.totalEmail = action.payload;
    }
  }
})

export const emailActions = emailSlice.actions;

export default emailSlice;