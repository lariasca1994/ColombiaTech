import ChatWindow from './chat/ChatWindow';
import MessageList from './chat/MessageList';
import MessageInput from './chat/MessageInput';
import { sendMessage, receiveMessage } from '../features/chatSlice';
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;