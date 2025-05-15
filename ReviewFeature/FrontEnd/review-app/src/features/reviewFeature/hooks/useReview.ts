import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewType } from '../reviewThunks'
import type { RootState, AppDispatch } from '../../../app/store'

export const useReview = (type: 'course' | 'tryout-section' | 'app') => {
  const dispatch = useDispatch<AppDispatch>()

  const data = useSelector(
    (state: RootState) =>
      state.review.data[type === 'tryout-section' ? 'tryout' : type]
  )
  const loading = useSelector((state: RootState) => state.review.loading)
  const error = useSelector((state: RootState) => state.review.error)

  useEffect(() => {
    dispatch(fetchReviewType(type))
  }, [type, dispatch])

  return { data, loading, error }
}
