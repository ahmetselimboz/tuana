import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";

const userTimeZone = "Europe/Istanbul";

const initialState = {
  firstDate: null,
  lastDate: new Date(),
  dropdown: null,
  timezone: userTimeZone
};

const dateSettingsSlice = createSlice({
  name: "dateSettings",
  initialState,
  reducers: {
    setFirstDate: (state, action) => {
      state.firstDate = action.payload;
    },
    setLastDate: (state, action) => {
      state.lastDate = action.payload;
    },
    setDropdown: (state, action) => {
      state.dropdown = action.payload;
    },
  },
});

export const { setFirstDate, setLastDate, setDropdown } =
  dateSettingsSlice.actions;
export default dateSettingsSlice.reducer;
