import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
}

const ACCESS_TOKEN_KEY = 'accessToken'

const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY)

const initialState: AuthState = {
  accessToken: storedToken,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload
      if (action.payload) {
        localStorage.setItem(ACCESS_TOKEN_KEY, action.payload)
      } else {
        localStorage.removeItem(ACCESS_TOKEN_KEY)
      }
    },
    clearAccessToken(state) {
      state.accessToken = null
      localStorage.removeItem(ACCESS_TOKEN_KEY)
    },
  },
})

export const { setAccessToken, clearAccessToken } = authSlice.actions
export default authSlice.reducer
