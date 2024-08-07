import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice.js";
import dayTimelineReducer from "./dayTimelineSlice";
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    dayTimeline: dayTimelineReducer, 
    auth: authReducer,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
