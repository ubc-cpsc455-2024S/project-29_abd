import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDayCards = createAsyncThunk(
    'dayTimeline/fetchDayCards',
    async ({ tripId, token }, thunkAPI) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/trip/${tripId}`, {
                method: 'GET',
                headers: {
                    'x-auth-token': token,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error fetching day cards:', error);
                return thunkAPI.rejectWithValue(error);
            }

            const data = await response.json();

            const locations = data.reduce((acc, day) => {
                return [...acc, ...day.locations];
            }, []);

            return { dayCards: data, locations };
        } catch (error) {
            console.error('Error fetching day cards:', error);
            return thunkAPI.rejectWithValue(error.message || 'Failed to fetch day cards');
        }
    }
);

const dayTimelineSlice = createSlice({
    name: 'dayTimeline',
    initialState: {
        dayCards: [],
        locations: [],
        status: 'idle',
        error: null
    },
    reducers: {
        addDayCard: (state, action) => {
            state.dayCards.push(action.payload);
        },
        updateDayCard: (state, action) => {
            const index = state.dayCards.findIndex(dayCard => dayCard._id === action.payload._id);
            if (index !== -1) {
                state.dayCards[index] = action.payload;
            }
        },
        deleteDayCard: (state, action) => {
            state.dayCards = state.dayCards.filter(dayCard => dayCard._id !== action.payload);
        },
        reorderDayCards: (state, action) => {
            state.dayCards = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDayCards.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchDayCards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.dayCards = action.payload.dayCards;
                state.locations = action.payload.locations;
            })
            .addCase(fetchDayCards.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { addDayCard, updateDayCard, deleteDayCard, reorderDayCards } = dayTimelineSlice.actions;
export default dayTimelineSlice.reducer;
