import { createSlice } from "@reduxjs/toolkit";

const initialState = { appId: null };

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setAppsSetting(state, action) {
      state.appId = action.payload;
    },
  },
});

export const { setAppsSetting } = appsSlice.actions;
export default appsSlice.reducer;
