import React, { useState, FormEvent } from 'react'
import { Button } from '../ui/button'
import { StarRating } from '../ui/StarRating'
import { Send } from 'lucide-react'
import {
  createFeedback,
  FeedbackPayload,
} from '../../api/services/feedback.service'
import { FeedbackModel } from '../models/feedback.model'

interface FeedbackFormProps {
  productId: string
  setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackModel[]>>
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  productId,
  setFeedbacks,
}) => {
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackError, setFeedbackError] = useState('')

  const handleSubmitFeedback = async (e: FormEvent) => {
    e.preventDefault()
    if (!rating) return setFeedbackError('Pilih rating terlebih dahulu.')
    if (!comment.trim()) return setFeedbackError('Komentar tidak boleh kosong.')

    setIsSubmitting(true)
    setFeedbackError('')

    const payload: FeedbackPayload = {
      product_id: parseInt(productId),
      comment,
      rating,
    }

    try {
      const res = await createFeedback(payload)
      const feedback: FeedbackModel = res.data.data
      setFeedbacks((prev) => [feedback, ...prev])
      setComment('')
      setRating(0)
    } catch (err) {
      console.error(err)
      setFeedbackError('Gagal mengirim komentar.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmitFeedback} className="space-y-4">
      <StarRating
        rating={rating}
        onRate={setRating}
        interactive={true}
        size="lg"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border rounded-md p-2"
        placeholder="Tulis komentar Anda..."
      />
      {feedbackError && <p className="text-red-500 text-sm">{feedbackError}</p>}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}
        <Send className="w-4 h-4 ml-2" />
      </Button>
    </form>
  )
}
