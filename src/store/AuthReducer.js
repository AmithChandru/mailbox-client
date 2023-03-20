import { configureStore, createSlice } from "@reduxjs/toolkit";
import emailSlice from "./EmailReducer";

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    isAuthenticated: false
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    }
  }
})

const store = configureStore({
  reducer: { auth: authSlice.reducer, email: emailSlice.reducer }
})

export const authActions = authSlice.actions;

export default store;