// src/api/services/review.service.ts
import axios from 'axios'
import {
  CourseTryoutSectionModel,
  ResponseData,
  ReviewModel,
  ReviewType,
} from '../../types/review'

const baseUrl = 'http://localhost:3001/api'

export const getAllReviewsByType = (type: string) =>
  axios.get(`${baseUrl}/reviews/${type}s`)

export const getTypeById = (
  type: ReviewType,
  id: string,
  queryParams?: {
    sortBy?: 'latest' | 'oldest' | 'highest_rating' | 'lowest_rating'
    rating?: number
    searchUser?: string
    searchContent?: string
  }
): Promise<ResponseData<{ data: CourseTryoutSectionModel }>> => {
  const params = new URLSearchParams()
  if (queryParams?.sortBy) {
    params.append('sortBy', queryParams.sortBy)
  }
  if (queryParams?.rating !== undefined) {
    params.append('rating', String(queryParams.rating))
  }
  if (queryParams?.searchUser) {
    params.append('searchUser', queryParams.searchUser)
  }
  if (queryParams?.searchContent) {
    params.append('searchContent', queryParams.searchContent)
  }

  const queryString = params.toString()
  return axios.get(
    `${baseUrl}/${type}/${id}` + (queryString ? `?${queryString}` : '')
  )
}

export const createReview = (
  user_id: string,
  formData: FormData
): Promise<ResponseData<{ data: ReviewModel }>> => {
  return axios.post(`${baseUrl}/reviews/${user_id}`, formData)
}

export const getAllType = (type: string) => axios.get(`${baseUrl}/${type}s`)
