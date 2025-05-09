// routes/cart.route.ts
import { Router } from 'express'
import {
  addToCart,
  getCart,
  checkout,
  deleteFromCart,
  getAllTransactions,
  getTransactionDetail,
} from '../controllers/cart.controller'
import authMiddleware from '../middleware/authMiddleware'

const router = Router()
router.post('/add', authMiddleware, addToCart)
router.get('/', authMiddleware, getCart)
router.post('/checkout', authMiddleware, checkout)
router.delete('/:id', authMiddleware, deleteFromCart)
router.get('/transactions', authMiddleware, getAllTransactions)
router.post('/transaction', authMiddleware, getTransactionDetail)

export default router
