import express from 'express'
import { handleTransfer } from '../controllers/midtransController'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.post('/transfer', authMiddleware, handleTransfer)

export default router
