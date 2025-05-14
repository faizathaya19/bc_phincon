export interface Tryout {
  id: string
  code: string
  title: string
  description: string
  order: number
  data: TryoutData
  tag: string
  active: number
  createdAt: string
  updatedAt: string
  reviews?: TryoutReview[]
}

interface TryoutData {
  level: string
  duration: string
}

export interface TryoutReview {
  id: string
  user_id: string
  referenceId: string
  type: string
  rating: number
  content: string
  image: string
  data: TryoutData
  active: number
  createdAt: string
  updatedAt: string
  user: ReviewUser
}

interface ReviewUser {
  id: string
  fullname: string
}
