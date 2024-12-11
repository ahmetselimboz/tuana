import { createSlice } from "@reduxjs/toolkit";

const initialState = { isChatFullscreen: false, selectedChat:null };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatFullscreen(state, action) {
      state.isChatFullscreen = action.payload;
    },
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },

  },
});

export const { setChatFullscreen, setSelectedChat } = chatSlice.actions;
export default chatSlice.reducer;
