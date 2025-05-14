import Joi from 'joi'

export const filterQuerySchema = Joi.object({
  sortBy: Joi.string().valid('latest', 'oldest', 'highest_rating', 'lowest_rating'),
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
