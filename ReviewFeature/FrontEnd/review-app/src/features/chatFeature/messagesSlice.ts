import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Message } from './types/chat'

interface MessagesState {
  messages: Message[]
}

const initialState: MessagesState = {
  messages: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>) {
      state.messages = action.payload
    },
    addMessage(state, action: PayloadAction<Message>) {
      state.messages.push(action.payload)
    },
    clearMessages(state) {
      state.messages = []
    },
  },
})

export const { setMessages, addMessage, clearMessages } = messagesSlice.actions
export default messagesSlice.reducer
