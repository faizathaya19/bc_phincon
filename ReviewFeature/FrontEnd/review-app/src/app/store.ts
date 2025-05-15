import { configureStore } from '@reduxjs/toolkit'
import profileReducer from '../features/authFeature/profileSlice'
import authReducer from '../features/authFeature/authSlice'
import reviewReducer from '../features/reviewFeature/reviewSlice'
import roomsReducer from '../features/chatFeature/roomsSlice'
import usersReducer from '../features/chatFeature/usersSlice'
import messagesReducer from '../features/chatFeature/messagesSlice'

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    auth: authReducer,
    review: reviewReducer,
    rooms: roomsReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
