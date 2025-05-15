import express from 'express'
import {
  createPrivateRoom,
  createGroupRoom,
  sendMessage,
  getMessages,
  getUserChatRooms,
} from '../controllers/chat.controller'
import authMiddleware from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/private', authMiddleware, createPrivateRoom)
router.post('/group', authMiddleware, createGroupRoom)
router.post('/send', authMiddleware, sendMessage)
router.get('/rooms', authMiddleware, getUserChatRooms)
router.get('/:roomId', authMiddleware, getMessages)

export default router
