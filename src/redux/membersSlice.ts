import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
  selectedMember: null,
};
const membersSlice = createSlice({
  name: "",
  initialState,
  reducers: {},
});
export const {} = membersSlice.actions;
export default membersSlice.reducer;
