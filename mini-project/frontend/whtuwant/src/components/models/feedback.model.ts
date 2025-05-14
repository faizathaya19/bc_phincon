import { UserModel } from './user.model'

export interface FeedbackModel {
  id: number
  user: UserModel
  rating: number
  comment: string
  createdAt: string
  updatedAt: string
}
