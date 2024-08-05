// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
// import tripReducer from "./tripSlice";
import tripReducer from "./tripSlice"
import dayTimelineReducer from "./dayTimelineSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    dayTimeline: dayTimelineReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
