
import { createSlice } from "@reduxjs/toolkit";

const initialState = { firstDate: null, lastDate: new Date().toISOString(), dropdown: "Today", range:false };

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setFirstDate(state, action) {
      state.firstDate = action.payload;
    },
    setLastDate(state, action) {
      state.lastDate = action.payload;
    },
    setDropdown(state, action) {
      state.dropdown = action.payload;
    },
    setRange(state, action) {
      state.range = action.payload;
    },
  },
});

export const { setFirstDate, setLastDate, setDropdown, setRange } = dateSlice.actions;
export default dateSlice.reducer;