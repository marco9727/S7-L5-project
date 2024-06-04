import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "../reducers/mainReducers";

const store = configureStore({
  reducer: mainReducer,
});

export default store;
