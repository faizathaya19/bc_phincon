import axios from 'axios'
import { store } from '../../store'
import { FeedbackModel } from '../../components/models/feedback.model'

export interface FeedbackPayload {
  product_id: number
  comment: string
  rating: number
}

export const createFeedback = async (payload: FeedbackPayload) => {
  const token = (store.getState().auth as { accessToken: string | null })
    .accessToken
  return axios.post('http://localhost:3001/api/feedback', payload, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const getFeedbackByProductId = async (
  productId: string
): Promise<FeedbackModel[]> => {
  const token = (store.getState().auth as { accessToken: string | null })
    .accessToken
  const response = await axios.get(
    `http://localhost:3001/api/feedback/product/${productId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data.data
}

export const getAllFeedback = async () => {
  return axios.get('/feedback')
}

export const updateFeedback = async (
  id: number,
  data: Partial<FeedbackPayload>
) => {
  return axios.put(`/feedback/${id}`, data)
}

export const deleteFeedback = async (id: number) => {
  return axios.delete(`/feedback/${id}`)
}
