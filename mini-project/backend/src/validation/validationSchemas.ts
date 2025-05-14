import Joi from 'joi'

export const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone_number: Joi.string().min(10).max(15).optional(),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
})

export const addToCartSchema = Joi.object({
  product_id: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
})

export const deleteFromCartSchema = Joi.object({
  id: Joi.string().required(),
})

export const checkoutSchema = Joi.object({
  cart_ids: Joi.array().items(Joi.number()).required(),
})

export const getTransactionDetailSchema = Joi.object({
  transaction_id: Joi.number().required(),
})

export const feedbackSchema = Joi.object({
  product_id: Joi.number().required(),
  comment: Joi.string().required(),
  rating: Joi.number().min(1).max(5).required(),
})

export const productIdSchema = Joi.object({
  product_id: Joi.number().required().messages({
    'any.required': 'Product ID is required',
    'number.base': 'Product ID must be a number',
  }),
})

export const reviewSchema = Joi.object({
  type: Joi.string().valid('course', 'app', 'tryout-section').required(),
  content: Joi.string().min(10).required(),
  rating: Joi.number().min(1).max(5).required(),
})
