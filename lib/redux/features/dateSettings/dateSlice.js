import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// UTC ve timezone eklentilerini yükle
dayjs.extend(utc);
dayjs.extend(timezone);

const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const initialState = { firstDate: null, lastDate:  new Date(dayjs(new Date()).tz(browserTimezone).format()), dropdown: null };

console.log(dayjs(new Date()).tz(browserTimezone).format());
console.log(new Date(dayjs(new Date()).tz(browserTimezone).format()));
console.log(new Date());
const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setFirstDate(state, action) {
      // Dayjs ile tarih ayarlama
      state.firstDate = new Date(dayjs(action.payload).tz(browserTimezone).format()).toUTCString() != "Invalid Date" ? new Date(dayjs(action.payload).tz(browserTimezone).format()).toUTCString() : null;
    },
    setLastDate(state, action) {
      // Timezone'a göre lastDate ayarlama
      state.lastDate = new Date(dayjs(action.payload).tz(browserTimezone).format()).toUTCString()
    },
    setDropdown(state, action) {
      state.dropdown = action.payload;
    },
  },
});

export const { setFirstDate, setLastDate, setDropdown } = dateSlice.actions;
export default dateSlice.reducer;
