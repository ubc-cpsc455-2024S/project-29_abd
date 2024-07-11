import { configureStore } from "@reduxjs/toolkit";
import tripReducer from "./tripSlice";
import dayTimelineReducer from "./dayTimelineSlice";

export const store = configureStore({
  reducer: {
    trip: tripReducer,
    dayTimeline: dayTimelineReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
