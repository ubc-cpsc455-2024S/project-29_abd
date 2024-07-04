import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DayCard {
  id: number;
  title: string;
  details: string;
  country: string;
  city: string[];
  locations: string[];
  notes: string;
}

interface DayTimelineState {
  dayCards: DayCard[];
}

const initialState: DayTimelineState = {
  dayCards: [
    {
      id: 1,
      title: "Day 1",
      details: "Spain - Go to the Tomatina Festival.",
      country: "Spain",
      city: ["Buñol"],
      locations: ["Tomatina Festival Site"],
      notes: "Be prepared for a lot of tomatoes!",
    },
    {
      id: 2,
      title: "Day 2",
      details: "Paris - Find Love.",
      country: "France",
      city: ["Paris"],
      locations: ["Eiffel Tower", "Louvre Museum"],
      notes: "Visit the Louvre early to avoid crowds.",
    },
    {
      id: 3,
      title: "Day 3",
      details:
        "London - Find the best tea and take a picture with the King's Guard.",
      country: "UK",
      city: ["London"],
      locations: ["Buckingham Palace", "Tea Houses"],
      notes: "The guards do not move!",
    },
  ],
};

const dayTimelineSlice = createSlice({
  name: "dayTimeline",
  initialState,
  reducers: {
    updateDayCard: (state, action: PayloadAction<DayCard>) => {
      const index = state.dayCards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.dayCards[index] = action.payload;
      }
    },
    deleteDayCard: (state, action: PayloadAction<number>) => {
      state.dayCards = state.dayCards.filter(
        (card) => card.id !== action.payload
      );
    },
    addDayCard: (state, action: PayloadAction<DayCard>) => {
      state.dayCards.push(action.payload);
    },
    reorderDayCards: (state, action: PayloadAction<DayCard[]>) => {
      state.dayCards = action.payload;
    },
  },
});

export const { updateDayCard, deleteDayCard, addDayCard, reorderDayCards } =
  dayTimelineSlice.actions;

export default dayTimelineSlice.reducer;
