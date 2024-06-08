import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./reducers/userSlice";

const reducer = combineReducers({
  user: userSlice,
 });
export const store = configureStore({
  reducer: reducer
});

 

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>