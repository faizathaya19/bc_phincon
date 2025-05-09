import express from 'express'
import { product, products } from '../controllers/product.controller'

const router = express.Router()

router.get('/all', products)
router.post('/', product)

export default router
