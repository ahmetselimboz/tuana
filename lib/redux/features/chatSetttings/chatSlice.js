import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChatFullscreen: false,
  selectedChat: "65c40fec35d43d01a2a6d1e5",
  messages: [
    { sender: "bot", text: "Hi, I'm Tuan-AI. How can I help you today?" },
  ],
};

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
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [
        { sender: "bot", text: "Hi, I'm Tuan-AI. How can I help you today?" },
      ];
    },
    resetMessages(state) {
      state.messages = []; // Mesajları sıfırla
    },
  },
});

export const { setChatFullscreen, setSelectedChat, setMessages, addMessage, clearMessages, resetMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
