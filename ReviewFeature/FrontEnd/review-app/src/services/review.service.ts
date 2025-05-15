import axios from 'axios'
import type { App } from '../features/reviewFeature/types/App'
import type { Course } from '../features/reviewFeature/types/Course'
import type { Tryout } from '../features/reviewFeature/types/Tryout'
import type { TypeReview } from '../features/reviewFeature/types/TypeReview'

const baseUrl = 'http://localhost:3001/api'

type TypeModels = Course | Tryout | App

export const fetchType = async (
  type: TypeReview
): Promise<Course[] | Tryout[] | App[]> => {
  const res = await axios.get(`${baseUrl}/${type}s`)
  return res.data.data
}

export const getDetail = async (
  id: string,
  type: TypeReview
): Promise<TypeModels> => {
  const res = await axios.get(`${baseUrl}/d/${type}/${id}`)
  return res.data.data
}

export const createReview = async (
  userId: string,
  formData: FormData
): Promise<TypeModels> => {
  const res = await axios.post(
    `http://localhost:3001/api/reviews/${userId}`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
  return res.data.data
}

export const getDetailfilter = async (
  id: string,
  type: string,
  query?: {
    sortBy?: string
    rating?: string
    searchContent?: string
    searchUser?: string
  }
): Promise<TypeModels> => {
  const queryString = new URLSearchParams(query || {}).toString()
  const url = `${baseUrl}/f/${type}/${id}${
    queryString ? `?${queryString}` : ''
  }`
  const res = await axios.get(url)
  return res.data.data
}
