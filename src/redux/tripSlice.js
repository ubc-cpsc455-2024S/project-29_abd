// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//
// interface Trip {
//   id: number;
//   title: string;
//   description: string;
//   days: number;
// }
//
// interface TripState {
//   trip: Trip | null;
//   trips: Trip[];
// }
//
// const initialState: TripState = {
//   trip: null,
//   trips: [],
// };
//
// const tripSlice = createSlice({
//   name: "trip",
//   initialState,
//   reducers: {
//     setTrip: (state, action: PayloadAction<Trip>) => {
//       state.trip = action.payload;
//     },
//     addTrip: (state, action: PayloadAction<Trip>) => {
//       state.trips.push(action.payload);
//     },
//     updateTrip: (state, action: PayloadAction<Trip>) => {
//       const index = state.trips.findIndex(
//         (trip) => trip.id === action.payload.id
//       );
//       if (index !== -1) {
//         state.trips[index] = action.payload;
//       }
//     },
//     deleteTrip: (state, action: PayloadAction<number>) => {
//       state.trips = state.trips.filter((trip) => trip.id !== action.payload);
//     },
//   },
// });
//
// export const { setTrip, addTrip, updateTrip, deleteTrip } = tripSlice.actions;
// export default tripSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTrips = createAsyncThunk(
    'trips/fetchTrips',
    async (_, { getState }) => {
        const token = getState().auth.token; // Get token from state
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips`, {
            headers: {
                'x-auth-token': token,
            },
        });
        const data = await response.json();
        return data;
    }
);

const tripSlice = createSlice({
    name: 'trips',
    initialState: {
        trips: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        addTrip: (state, action) => {
            state.trips.push(action.payload);
        },
        updateTrip: (state, action) => {
            const index = state.trips.findIndex(trip => trip._id === action.payload._id);
            if (index !== -1) {
                state.trips[index] = action.payload;
            }
        },
        deleteTrip: (state, action) => {
            state.trips = state.trips.filter(trip => trip._id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrips.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTrips.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.trips = action.payload;
            })
            .addCase(fetchTrips.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { addTrip, updateTrip, deleteTrip } = tripSlice.actions;
export default tripSlice.reducer;


