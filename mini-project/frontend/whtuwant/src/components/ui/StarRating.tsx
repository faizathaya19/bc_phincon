import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils' 

// Interface untuk StarRating Props
interface StarRatingProps {
  rating: number
  onRate?: (rating: number) => void
  interactive?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string // Tambahkan className prop
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRate,
  interactive = true,
  size = 'md',
  className, // Terima className
}) => {
  const [hoverRating, setHoverRating] = useState(0)
  const displayRating = interactive ? hoverRating || rating : rating
  const MAX_RATING = 5

  const starSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1',
        interactive && 'cursor-pointer',
        className
      )}
    >
      {' '}
      {/* Gunakan className */}
      {[...Array(MAX_RATING)].map((_, i) => {
        const starValue = i + 1
        return (
          <motion.div
            key={starValue}
            whileHover={interactive ? { scale: 1.2, y: -2 } : {}}
            whileTap={interactive ? { scale: 0.95 } : {}}
            onClick={() => interactive && onRate?.(starValue)}
            onMouseEnter={() => interactive && setHoverRating(starValue)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            aria-label={`Berikan ${starValue} bintang`}
            className="transition-transform"
          >
            <Star
              className={cn(
                starSizeClasses[size],
                displayRating >= starValue
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600',
                'transition-colors duration-150'
              )}
              strokeWidth={displayRating >= starValue ? 1.5 : 1}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

export { StarRating } // Ekspor komponen
