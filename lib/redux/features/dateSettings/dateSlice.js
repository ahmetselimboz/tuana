import {convertToUTC} from "@/app/components/convertToUTC";
import { createSlice } from "@reduxjs/toolkit";

const initialState = { firstDate: null, lastDate: convertToUTC(new Date()), dropdown: null };

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
  },
});

export const { setFirstDate, setLastDate, setDropdown } = dateSlice.actions;
export default dateSlice.reducer;
