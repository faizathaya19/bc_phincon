import { Router } from 'express'
import {
  getAllFeedback,
  getFeedbackByProductId,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from '../controllers/feedback.controller'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()

router.get('/', getAllFeedback)
router.get('/product/:productId', getFeedbackByProductId)
router.post('/', authMiddleware, createFeedback)

router.put('/:id', authMiddleware, updateFeedback)
router.delete('/:id', authMiddleware, deleteFeedback)

export default router
