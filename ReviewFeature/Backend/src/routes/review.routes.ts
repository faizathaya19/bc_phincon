import express from 'express'
import {
  createReview,
  getCourseById,
  getTryoutSectionById,
  getAppById,
  getAllCourses,
  getAllTryoutSections,
  getAllApps,
  getAllCourseReviews,
  getAllTryoutSectionReviews,
  getAllAppReviews,
  getFilterByType,
} from '../controllers/review.controller'
import { upload } from '../utils/multer'
import { asyncHandler } from '../utils/asyncHandler'

const router = express.Router()

router.post('/reviews/:user_id', upload.single('image'), createReview)

router.get('/course/:typeIdParam', asyncHandler(getCourseById))
router.get('/tryout-section/:typeIdParam', asyncHandler(getTryoutSectionById))
router.get('/app/:typeIdParam', asyncHandler(getAppById))

router.get('/reviews/course', asyncHandler(getAllCourseReviews))
router.get('/reviews/tryout-section', asyncHandler(getAllTryoutSectionReviews))
router.get('/reviews/app', asyncHandler(getAllAppReviews))

router.get('/courses', asyncHandler(getAllCourses))
router.get('/tryout-sections', asyncHandler(getAllTryoutSections))
router.get('/apps', asyncHandler(getAllApps))

router.get('/f/:typeParam/:typeIdParam', asyncHandler(getFilterByType))

export default router
