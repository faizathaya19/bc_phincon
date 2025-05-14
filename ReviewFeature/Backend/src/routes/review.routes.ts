import express from 'express'
import {
  createReview,
  getAllByType,
  getFilteredReviewsById,
  getAllReviewsByType,
  getById,
} from '../controllers/review.controller'
import { upload } from '../utils/multer'
import { asyncHandler } from '../utils/asyncHandler'

const router = express.Router()

router.post(
  '/reviews/:user_id',
  upload.single('image'),
  asyncHandler(createReview)
)
router.get('/reviews/:typeParam', asyncHandler(getAllReviewsByType))
router.get('/f/:typeParam/:typeIdParam', asyncHandler(getFilteredReviewsById))
router.get('/d/:typeParam/:typeIdParam', asyncHandler(getById))
router.get('/:typeParam', asyncHandler(getAllByType))

export default router
