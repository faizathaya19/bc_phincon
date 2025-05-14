import React from 'react'
import { FeedbackItem } from '../ui/FeedbackItem'
import { FeedbackModel } from '../models/feedback.model'

interface FeedbackListProps {
  feedbacks: FeedbackModel[]
}

export const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  return (
    <div className="mt-6 space-y-4">
      {feedbacks.map((fb) => (
        <FeedbackItem key={fb.id} feedback={fb} />
      ))}
    </div>
  )
}
