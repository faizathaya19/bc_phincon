import express from 'express'
import {
  createPrivateRoom,
  createGroupRoom,
  getMessages,
  getUserChatRooms,
} from '../controllers/chat.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/private', authMiddleware, createPrivateRoom)
router.post('/group', authMiddleware, createGroupRoom)
router.get('/rooms', authMiddleware, getUserChatRooms)
router.get('/:roomId', authMiddleware, getMessages)

export default router
