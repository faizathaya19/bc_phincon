import Joi from 'joi'

export const filterQuerySchema = Joi.object({
  sortBy: Joi.string().valid(
    'latest',
    'oldest',
    'highest_rating',
    'lowest_rating'
  ),
  searchUser: Joi.string().allow(''),
  searchContent: Joi.string().allow(''),
  rating: Joi.number().integer().min(1).max(5),
})

export const reviewBodySchema = Joi.object({
  type: Joi.string().valid('course', 'tryout-section', 'app').required(),
  referenceId: Joi.string().required(),
  content: Joi.string().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
})

export const userIdParamSchema = Joi.object({
  user_id: Joi.string().required(),
})

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
