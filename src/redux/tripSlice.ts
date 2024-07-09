import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Trip {
  id: number;
  title: string;
  description: string;
  days: number;
}

interface TripState {
  trip: Trip | null;
  trips: Trip[];
}

const initialState: TripState = {
  trip: null,
  trips: [],
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    setTrip: (state, action: PayloadAction<Trip>) => {
      state.trip = action.payload;
    },
    addTrip: (state, action: PayloadAction<Trip>) => {
      state.trips.push(action.payload);
    },
    updateTrip: (state, action: PayloadAction<Trip>) => {
      const index = state.trips.findIndex(
        (trip) => trip.id === action.payload.id
      );
      if (index !== -1) {
        state.trips[index] = action.payload;
      }
    },
    deleteTrip: (state, action: PayloadAction<number>) => {
      state.trips = state.trips.filter((trip) => trip.id !== action.payload);
    },
  },
});

export const { setTrip, addTrip, updateTrip, deleteTrip } = tripSlice.actions;
export default tripSlice.reducer;
