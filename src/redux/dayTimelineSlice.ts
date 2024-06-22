import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DayCard {
    id: number;
    title: string;
    details: string;
}

interface DayTimelineState {
    dayCards: DayCard[];
}

const initialState: DayTimelineState = {
    dayCards: [
        { id: 1, title: "Day 1", details: "Spain - Go to the Tomatina Festival." },
        { id: 2, title: "Day 2", details: "Paris - Find Love." },
        { id: 3, title: "Day 3", details: "London - Find the best tea and take a picture with the King's Guard." },
    ],
};

const dayTimelineSlice = createSlice({
    name: 'dayTimeline',
    initialState,
    reducers: {
        updateDayCard: (state, action: PayloadAction<DayCard>) => {
            const index = state.dayCards.findIndex(card => card.id === action.payload.id);
            if (index !== -1) {
                state.dayCards[index] = action.payload;
            }
        },
        deleteDayCard: (state, action: PayloadAction<number>) => {
            state.dayCards = state.dayCards.filter(card => card.id !== action.payload);
        },
        addDayCard: (state, action: PayloadAction<DayCard>) => {
            state.dayCards.push(action.payload);
        },
        reorderDayCards: (state, action: PayloadAction<DayCard[]>) => {
            state.dayCards = action.payload;
        },
    },
});

export const { updateDayCard, deleteDayCard, addDayCard, reorderDayCards } = dayTimelineSlice.actions;

export default dayTimelineSlice.reducer;