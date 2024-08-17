// tripSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const fetchTrips = createAsyncThunk(
//     'trips/fetchTrips',
//     async (_, { getState }) => {
//         const token = getState().auth.token;
//         const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips`, {
//             headers: {
//                 'x-auth-token': token,
//             },
//             credentials: 'include',
//         });
//         const data = await response.json();
//         return data;
//     }
// );

import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTrips = createAsyncThunk(
    'trips/fetchTrips',
    async (_, { getState, rejectWithValue }) => {
        const token = getState().auth.token;

        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips`, {
                method: 'GET',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json', // Explicitly set content type
                },
                credentials: 'include', // Ensure credentials are included
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Handle unauthorized access, e.g., by rejecting with an appropriate message
                    return rejectWithValue('Unauthorized. Please log in again.');
                }
                // Handle other response statuses as needed
                return rejectWithValue('Failed to fetch trips. Please try again later.');
            }

            const data = await response.json();
            return data;

        } catch (error) {
            // Handle network errors or other unexpected errors
            return rejectWithValue('Network error. Please check your connection.');
        }
    }
);


export const addTrip = createAsyncThunk(
    'trips/addTrip',
    async (tripData, { getState, rejectWithValue }) => {
        const token = getState().auth.token;
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token,
                },
                body: JSON.stringify(tripData),
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
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
        clearTrips: (state) => {
            state.trips = [];
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
            })
            .addCase(addTrip.fulfilled, (state, action) => {
                state.trips.push(action.payload);
            })
            .addCase(addTrip.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearTrips, updateTrip, deleteTrip } = tripSlice.actions;
export default tripSlice.reducer;
