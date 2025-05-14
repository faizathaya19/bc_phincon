export interface App {
  id: string
  code: string
  title: string
  description: string
  order: number
  data: AppData
  tag: string
  active: number
  createdAt: string
  updatedAt: string
  reviews?: AppReview[]
}

interface AppData {
  level: string
  duration: string
}

export interface AppReview {
  id: string
  user_id: string
  referenceId: string
  type: string
  rating: number
  content: string
  image: string
  data: AppData
  active: number
  createdAt: string
  updatedAt: string
  user: ReviewUser
}

interface ReviewUser {
  id: string
  fullname: string
}
