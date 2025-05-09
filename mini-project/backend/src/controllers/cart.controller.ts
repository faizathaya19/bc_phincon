import { Request, Response } from 'express'
import Cart from '../models/transactionAndCart/cart.model'
import Product from '../models/product/product.model'
import Transaction from '../models/transactionAndCart/transactions.model'
import TransactionItem from '../models/transactionAndCart/transactionItem.model'
import {
  addToCartSchema,
  deleteFromCartSchema,
  checkoutSchema,
  getTransactionDetailSchema,
} from '../validation/validationSchemas'
import { sendResponse } from '../utils/responseUtil'

export const addToCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user_data.id

  if (!userId) {
    return sendResponse(res, 400, 'login first')
  }

  const { error } = addToCartSchema.validate(req.body)
  if (error) {
    return sendResponse(res, 400, 'Validation error', error.details[0].message)
  }

  const { product_id, quantity } = req.body

  try {
    const existing = await Cart.findOne({
      where: { user_id: userId, product_id },
    })

    if (existing) {
      existing.quantity += quantity
      await existing.save()
    } else {
      await Cart.create({ user_id: userId, product_id, quantity })
    }

    return sendResponse(res, 200, 'Added to cart', {
      user_id: userId,
      product_id,
      quantity,
    })
  } catch (error) {
    console.error('Login error:', error)
    return sendResponse(res, 500, 'Server error')
  }
}

export const getCart = async (req: Request, res: Response): Promise<void> =>  {
  const userId = req.user_data.id

  if (!userId) {
    return sendResponse(res, 400, 'login first')
  }

  try {
    const cart = await Cart.findAll({
      where: { user_id: userId },
      include: [{ model: Product }],
    })

    return sendResponse(res, 200, 'Get cart success', cart)
  } catch (error) {
    console.error('Login error:', error)
    return sendResponse(res, 500, 'Server error')
  }
}

export const deleteFromCart = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user_data.id
  const { id } = req.params

  if (!userId) {
    return sendResponse(res, 400, 'login first')
  }

  // Validasi params menggunakan Joi
  const { error } = deleteFromCartSchema.validate(req.params)
  if (error) {
    return sendResponse(res, 400, 'Validation error', error.details[0].message)
  }

  try {
    const cartItem = await Cart.findOne({
      where: { id, user_id: userId },
    })

    if (!cartItem) {
      return sendResponse(res, 404, 'Cart item not found')
    }

    await cartItem.destroy()
    return sendResponse(res, 200, 'Item removed from cart')
  } catch (err) {
    return sendResponse(res, 500, 'Failed to delete cart item', { error: err })
  }
}

export const checkout = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user_data.id

  if (!userId) {
    return sendResponse(res, 400, 'Login first')
  }

  const { error } = checkoutSchema.validate(req.body)
  if (error) {
    return sendResponse(res, 400, 'Validation error', error.details[0].message)
  }

  const { cart_ids } = req.body

  try {
    const cartItems = await Cart.findAll({
      where: {
        id: cart_ids,
        user_id: userId,
      },
      include: [Product],
    })

    if (cartItems.length === 0) {
      return sendResponse(res, 400, 'Selected cart items not found')
    }

    let total_price = 0
    const items: {
      product_id: number
      quantity: number
      price: number
    }[] = []

    for (const item of cartItems) {
      const product = item.Product
      if (!product) continue

      const price = Number(product.price) * item.quantity
      total_price += price

      items.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
      })
    }

    const transaction = await Transaction.create({
      user_id: userId,
      total_price,
      status: 'pending',
    })

    await Promise.all(
      items.map((item) =>
        TransactionItem.create({
          ...item,
          transaction_id: transaction.id,
        })
      )
    )

    await Cart.destroy({
      where: {
        id: cart_ids,
        user_id: userId,
      },
    })

    return sendResponse(res, 201, 'Checkout success', transaction)
  } catch (err) {
    return sendResponse(res, 500, 'Checkout failed', { error: err })
  }
}

export const getAllTransactions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user_data.id

  if (!userId) {
    return sendResponse(res, 400, 'Login first')
  }

  try {
    const transactions = await Transaction.findAll({
      where: { user_id: userId },
      order: [['createdAt', 'DESC']],
    })

    return sendResponse(
      res,
      200,
      'Transactions fetched successfully',
      transactions
    )
  } catch (err) {
    return sendResponse(res, 500, 'Failed to fetch transactions', {
      error: err,
    })
  }
}

export const getTransactionDetail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user_data.id
  const { transaction_id } = req.body

  if (!userId) {
    return sendResponse(res, 400, 'Login first')
  }

  const { error } = getTransactionDetailSchema.validate(req.body)
  if (error) {
    return sendResponse(res, 400, 'Validation error', error.details[0].message)
  }

  try {
    const transaction = await Transaction.findOne({
      where: { id: transaction_id, user_id: userId },
      include: [
        {
          model: TransactionItem,
          as: 'items',
          include: [Product],
        },
      ],
    })

    if (!transaction) {
      return sendResponse(res, 404, 'Transaction not found')
    }

    return sendResponse(
      res,
      200,
      'Transaction detail fetched successfully',
      transaction
    )
  } catch (err) {
    return sendResponse(res, 500, 'Failed to fetch transaction detail', {
      error: err,
    })
  }
}
