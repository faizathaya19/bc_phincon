import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { UserProfile } from './types/user'

interface ProfileState {
  profile: UserProfile | null
}

const initialState: ProfileState = {
  profile: null,
}

const storedProfile = localStorage.getItem('userProfile')
if (storedProfile) {
  try {
    initialState.profile = JSON.parse(storedProfile)
  } catch {
    localStorage.removeItem('userProfile')
  }
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile | null>) {
      state.profile = action.payload
      if (action.payload) {
        localStorage.setItem('userProfile', JSON.stringify(action.payload))
      } else {
        localStorage.removeItem('userProfile')
      }
    },
  },
})

export const { setProfile } = profileSlice.actions
export default profileSlice.reducer
