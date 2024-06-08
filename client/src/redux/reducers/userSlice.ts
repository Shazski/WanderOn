import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, logout, register } from "../actions/userActions";
import { IUser } from "../../interface/IUserSlice";

const userSlice = createSlice({
 name: "user",
 initialState: {
  user: null as IUser | null,
  loading:false as boolean,
  error: null as string | null

 },
 reducers: {
  makeErrorDisable: (state) => {
   state.error = "";
  },
 },
 extraReducers(builder) {
   builder
   .addCase(register.pending, (state) => {
    state.loading = true;
   })
   .addCase(register.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.user = payload as IUser;
   })
   .addCase(register.rejected, (state, { payload }) => {
    state.loading = false;
    state.user = null;
    state.error = payload as string;
   })
   .addCase(login.pending, (state) => {
    state.loading = true;
   })
   .addCase(login.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.user = payload as IUser;
   })
   .addCase(login.rejected, (state, { payload }) => {
    state.loading = false;
    state.user = null;
    state.error = payload as string;
   })
   .addCase(getUser.pending, (state) => {
    state.loading = true;
   })
   .addCase(getUser.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.user = payload as IUser;
   })
   .addCase(getUser.rejected, (state, { payload }) => {
    state.loading = false;
    state.user = null;
    state.error = payload as string;
   })
   .addCase(logout.pending, (state) => {
    state.loading = true;
   })
   .addCase(logout.fulfilled, (state) => {
    state.loading = false;
    state.user = null;
   })
   .addCase(logout.rejected, (state, { payload }) => {
    state.loading = false;
    state.error = payload as string;
   });
 },
});

export const { makeErrorDisable } = userSlice.actions;
export default userSlice.reducer
