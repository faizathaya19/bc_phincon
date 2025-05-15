import { createAsyncThunk } from '@reduxjs/toolkit'
import { fetchType } from '../../services/review.service'

export const fetchReviewType = createAsyncThunk(
  'review/fetchType',
  async (type: 'course' | 'tryout-section' | 'app', { rejectWithValue }) => {
    try {
      const data = await fetchType(type)
      return { type, data }
    } catch (err) {
      console.error(`Failed to fetch reviews: ${err}`)
      return rejectWithValue('Failed to fetch data')
    }
  }
)
