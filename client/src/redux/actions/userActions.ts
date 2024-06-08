import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../interface/IUserSlice";
import { commonRequest } from "../../config/axios";
import { config } from "../../config/constants";

export const register = createAsyncThunk(
 "user/register",
 async (userCredentials: IUser, { rejectWithValue }) => {
  return commonRequest(
   "post",
   "/register",
   config,
   rejectWithValue,
   userCredentials
  );
 }
);
export const login = createAsyncThunk(
 "user/login",
 async (loginCredentials: IUser, { rejectWithValue }) => {
  return commonRequest(
   "post",
   "/login",
   config,
   rejectWithValue,
   loginCredentials
  );
 }
);
export const getUser = createAsyncThunk(
 "user/getUser",
 async (_, { rejectWithValue }) => {
  return commonRequest("get", "/", config, rejectWithValue);
 }
);
export const logout = createAsyncThunk(
 "user/logout",
 async (_, { rejectWithValue }) => {
  return commonRequest("get", "/logout", config, rejectWithValue);
 }
);