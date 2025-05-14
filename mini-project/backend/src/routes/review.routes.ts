import express from 'express'
import {
  getAllCourseReviews,
  getAllTryoutSectionReviews,
  getCourseById,
  getTryoutSectionById,
  createReview,
  getAllCourses,
  getAllTryoutSections,
  getAllReviews,
} from '../controllers/review.controller'
import { upload } from '../utils/multer'

const router = express.Router()

router.get('/reviews', getAllReviews)

router.get('/reviews/courses', getAllCourseReviews)
router.get('/reviews/tryout-sections', getAllTryoutSectionReviews)
router.get('/course/:courseId', getCourseById)
router.get('/tryout-section/:tryoutSectionId', getTryoutSectionById)
router.post('/reviews/:user_id', upload.single('image'), createReview)

router.get('/courses', getAllCourses)
router.get('/tryout-sections', getAllTryoutSections)

export default router
