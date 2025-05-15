import express from 'express'
import {
  register,
  login,
  profile,
  refreshTokenHandler,
  deleteUser,
  getAllUsers,
} from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/users', authMiddleware, getAllUsers)
router.post('/refresh-token', refreshTokenHandler)
router.post('/register', register)
router.post('/login', login)
router.get('/profile', authMiddleware, profile)
router.delete('/delete-user', authMiddleware, deleteUser)

export default router
