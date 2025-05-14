export interface Course {
  id: string
  code: string
  title: string
  description: string
  order: number
  data: CourseData
  tag: string
  active: number
  createdAt: string
  updatedAt: string
  reviews?: CourseReview[]
}

 interface CourseData {
  level: string
  duration: string
}

 export interface CourseReview {
  id: string
  user_id: string
  referenceId: string
  type: string
  rating: number
  content: string
  image: string
  data: CourseData
  active: number
  createdAt: string
  updatedAt: string
  user: ReviewUser
}

 interface ReviewUser {
  id: string
  fullname: string
}
