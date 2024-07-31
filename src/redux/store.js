import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import dayTimelineReducer from "./dayTimelineSlice";

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    dayTimeline: dayTimelineReducer, 
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;
