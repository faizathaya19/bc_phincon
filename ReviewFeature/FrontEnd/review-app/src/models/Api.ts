import axios from 'axios'
import type { App } from '../types/App'
import type { Course } from '../types/Course'
import type { Tryout } from '../types/Tryout'

const baseUrl = 'http://localhost:3001/api'

type Type = 'course' | 'tryout-section' | 'app'
type TypeModels = Course | Tryout | App

export const fetchType = async (
  type: Type
): Promise<Course[] | Tryout[] | App[]> => {
  const res = await axios.get(`${baseUrl}/${type}s`)
  return res.data.data
}

export const getDetail = async (
  id: string,
  type: Type
): Promise<TypeModels> => {
  const res = await axios.get(`${baseUrl}/${type}/${id}`)
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
  const res = await await axios.get(url)
  return res.data.data
}
