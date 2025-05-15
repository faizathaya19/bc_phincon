import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { fetchRooms, createRoom } from '../../services/chat.service'
import type { Room } from './types/chat'
import type { AppDispatch, RootState } from '../../app/store'

interface RoomsState {
  privateRooms: Room[]
  groupRooms: Room[]
  loading: boolean
  error: string | null
}

const initialState: RoomsState = {
  privateRooms: [],
  groupRooms: [],
  loading: false,
  error: null,
}

// Async thunk for fetching rooms
export const loadRooms = createAsyncThunk<
  { private: Room[]; group: Room[] },
  string | null
>('rooms/loadRooms', async (token) => {
  const data = await fetchRooms(token)
  return data
})

// Async thunk for creating a room
export const addRoom = createAsyncThunk<
  void,
  { token: string | null; userIds: string[]; type: 'private' | 'group' },
  { dispatch: AppDispatch; state: RootState }
>('rooms/addRoom', async ({ token, userIds, type }, { dispatch }) => {
  await createRoom(token, userIds, type)
  dispatch(loadRooms(token))
})

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRooms.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(
        loadRooms.fulfilled,
        (state, action: PayloadAction<{ private: Room[]; group: Room[] }>) => {
          state.privateRooms = action.payload.private
          state.groupRooms = action.payload.group
          state.loading = false
        }
      )
      .addCase(loadRooms.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load rooms'
      })
  },
})

export default roomsSlice.reducer
