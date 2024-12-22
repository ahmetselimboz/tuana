import { createSlice } from "@reduxjs/toolkit";

const initialState = { appId: null, currentVisitor:0 };

const appsSlice = createSlice({
  name: "apps",
  initialState,
  reducers: {
    setAppsSetting(state, action) {
      state.appId = action.payload;
    },
    setCurrentVisitor(state, action) {
      state.currentVisitor = action.payload;
    },
  },
});

export const { setAppsSetting, setCurrentVisitor } = appsSlice.actions;
export default appsSlice.reducer;
