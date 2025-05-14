export type ReviewType = 'course' | 'tryout-section' | 'app'

export interface ResponseData<T> {
  code: number
  message: string
  data: T
}
export interface CourseTryoutSectionModel {
  id: string
  code: string
  title: string
  description: string
  order: number
  data?: JSON
  tag: string
  active: boolean
  reviews: ReviewModel[]
  createdAt: string
  updatedAt: string
}

export interface ReviewModel {
  id: string
  user_id: string
  referenceId: string
  type: ReviewType
  rating: number
  content: string
  image?: string | null
  data?: JSON
  active: boolean
  user: User
  createdAt: string
  updatedAt: string
}

interface User {
  fullname: string
}

export interface CreateReviewDTO {
  referenceId: string
  type: ReviewType
  rating: number
  content: string
  image?: string
}
