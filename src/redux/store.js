// import { configureStore } from "@reduxjs/toolkit";
// import tripReducer from "./tripSlice.js";
// import dayTimelineReducer from "./dayTimelineSlice";
// import authReducer from './authSlice';
//
// export const store = configureStore({
//   reducer: {
//     trip: tripReducer,
//     dayTimeline: dayTimelineReducer,
//     auth: authReducer,
//   },
// });
//
// export const RootState = store.getState;
// export const AppDispatch = store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import tripReducer from './tripSlice.js';
import dayTimelineReducer from './dayTimelineSlice';
import authReducer from './authSlice';

// Configure persist settings for auth slice (or any other slices you want to persist)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth slice
};

// Combine reducers with persistence capabilities
const rootReducer = {
  trip: tripReducer,
  dayTimeline: dayTimelineReducer,
  auth: persistReducer(persistConfig, authReducer), // Persist auth reducer
};

// Configure the store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializable check for redux-persist
      }),
});

// Create the persistor object to be used with PersistGate
const persistor = persistStore(store);

export { store, persistor };

// You can still export RootState and AppDispatch as before
export const RootState = store.getState;
export const AppDispatch = store.dispatch;

