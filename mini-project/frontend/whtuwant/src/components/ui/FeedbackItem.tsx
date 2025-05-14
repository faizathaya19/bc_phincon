import React from 'react'
import { motion } from 'framer-motion'
import { FeedbackModel } from '../models/feedback.model' // Import tipe Feedback
import { StarRating } from './StarRating' // Import StarRating
import { cn } from '../../lib/utils'

// Interface untuk FeedbackItem Props
interface FeedbackItemProps {
  feedback: FeedbackModel
  className?: string
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, className }) => {
  // Safely access user data
  const userName = feedback.user?.firstname || 'Pengguna Anonim'
  const userInitial = userName[0]?.toUpperCase() || '?'

  // Format date safely
  const formattedDate = feedback.createdAt
    ? new Date(feedback.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Tanggal tidak diketahui'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700',
        className
      )}
    >
      <div className="flex items-start sm:items-center gap-3 mb-2 flex-col sm:flex-row">
        {/* User Avatar & Name */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex items-center justify-center font-semibold text-sm flex-shrink-0">
            {userInitial}
          </div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            {userName}
          </p>
        </div>
        {/* Rating & Date (align right on larger screens) */}
        <div className="flex items-center gap-3 sm:ml-auto w-full sm:w-auto justify-between">
          <StarRating rating={feedback.rating} interactive={false} size="sm" />
          <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
            {formattedDate}
          </span>
        </div>
      </div>
      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed pl-0 sm:pl-12">
        {' '}
        {/* Indent comment on larger screens */}
        {feedback.comment}
      </p>
    </motion.div>
  )
}

export { FeedbackItem }
