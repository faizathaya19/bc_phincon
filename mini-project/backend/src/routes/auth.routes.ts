import express from 'express'
import {
  register,
  login,
  profile,
  refreshTokenHandler,
  deleteUser,
} from '../controllers/auth.controller'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.post('/refresh-token', refreshTokenHandler)
router.post('/register',register)
router.post('/login', login)
router.get('/profile', authMiddleware, profile)
router.delete('/delete-user', authMiddleware, deleteUser)

export default router
