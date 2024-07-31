import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchDayCards = createAsyncThunk(
  'dayTimeline/fetchDayCards',
  async (tripId) => {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/day-cards/trip/${tripId}`);
    const data = await response.json();
    return data;
  }
);

export const dayTimelineSlice = createSlice({
  name: 'dayTimeline',
  initialState: {
    dayCards: [],
    status: 'idle',
    error: null
  },
  reducers: {
    updateDayCard: (state, action) => {
      const index = state.dayCards.findIndex(day => day._id === action.payload._id);
      if (index !== -1) {
        state.dayCards[index] = action.payload;
      }
    },
    addDayCard: (state, action) => {
      state.dayCards.push(action.payload);
    },
    deleteDayCard: (state, action) => {
      state.dayCards = state.dayCards.filter(day => day._id !== action.payload);
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
        state.dayCards = action.payload;
      })
      .addCase(fetchDayCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { updateDayCard, addDayCard, deleteDayCard, reorderDayCards } = dayTimelineSlice.actions;

export default dayTimelineSlice.reducer;
