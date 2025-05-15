import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { fetchUsers } from '../../services/chat.service'
import type { User } from './types/user'

interface UsersState {
  list: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
}

export const loadUsers = createAsyncThunk<User[], string | null>(
  'users/loadUsers',
  async (token) => {
    const users = await fetchUsers(token)
    return users
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.list = action.payload
        state.loading = false
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load users'
      })
  },
})

export default usersSlice.reducer
