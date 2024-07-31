import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice.ts";
import dayTimelineReducer from "./dayTimelineSlice.ts";

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    dayTimeline: dayTimelineReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
