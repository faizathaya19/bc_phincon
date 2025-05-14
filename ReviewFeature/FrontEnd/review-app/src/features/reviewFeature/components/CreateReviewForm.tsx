import React, { useState } from 'react'
import { StarIcon, PaperClipIcon, PhotoIcon } from '@heroicons/react/24/solid'
import { createReview } from '../services/review.service'

interface CreateReviewPageProps {
  userId: string
  referenceId: string
  type: 'course' | 'tryout-section' | 'app'
  onSuccess?: () => void
}

const CreateReviewPage: React.FC<CreateReviewPageProps> = ({
  userId,
  referenceId,
  type,
  onSuccess,
}) => {
  const [rating, setRating] = useState(1)
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    formData.append('type', type)
    formData.append('referenceId', referenceId)
    formData.append('rating', rating.toString())
    formData.append('content', content)
    if (image) formData.append('image', image)

    createReview(userId, formData)
      .then(() => {
        onSuccess?.()
        setRating(1)
        setContent('')
        setImage(null)
        setIsSubmitting(false)
      })
      .catch((error) => {
        console.error('Error submitting review:', error)
        setError('Failed to submit review. Please try again.')
      })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Tulis Ulasan Anda
      </h2>

      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Rating
          </label>
          <div id="rating" className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-7 h-7 cursor-pointer transition-colors ${
                  rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Komentar
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
            placeholder="Bagikan pengalamanmu..."
            className="w-full border border-gray-300 rounded-md p-4 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex items-center space-x-3">
            <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
              <PhotoIcon className="w-5 h-5 mr-2 text-gray-500" />
              Pilih Gambar
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
            {image && (
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <PaperClipIcon className="w-4 h-4" />
                {image.name}
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </button>
      </form>
    </div>
  )
}

export default CreateReviewPage
