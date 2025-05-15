import { createSlice } from '@reduxjs/toolkit'
import { fetchReviewType } from './reviewThunks'
import type { Course } from './types/Course'
import type { Tryout } from './types/Tryout'
import type { App } from './types/App'

type ReviewState = {
  data: {
    course: Course[]
    tryout: Tryout[]
    app: App[]
  }
  loading: boolean
  error: string | null
}

const initialState: ReviewState = {
  data: {
    course: [],
    tryout: [],
    app: [],
  },
  loading: false,
  error: null,
}

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewType.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchReviewType.fulfilled, (state, action) => {
        state.loading = false
        const { type, data } = action.payload
        if (type === 'course') state.data.course = data as Course[]
        else if (type === 'tryout-section') state.data.tryout = data as Tryout[]
        else if (type === 'app') state.data.app = data as App[]
      })
      .addCase(fetchReviewType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default reviewSlice.reducer
