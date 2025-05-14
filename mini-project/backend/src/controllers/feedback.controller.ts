import { Request, Response } from 'express'
import Feedback from '../models/feedback/feedback.model'
import User from '../models/users/users.model'
import { sendResponse } from '../utils/responseUtil'
import { feedbackSchema } from '../validation/validationSchemas'

const createFeedback = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = feedbackSchema.validate(req.body)
  if (error) {
    return sendResponse(res, 400, 'Invalid feedback format')
  }

  const { product_id, comment, rating } = value
  const userId = req.user_data.id

  try {
    const feedback = await Feedback.create({
      product_id,
      user_id: userId,
      comment,
      rating,
      content_type: 'app',
    })

    const feedbackWithUser = await Feedback.findOne({
      where: { id: feedback.id },
      include: [{ model: User, as: 'user', attributes: ['fullname'] }],
    })

    return sendResponse(
      res,
      201,
      'Feedback created successfully',
      feedbackWithUser
    )
  } catch (error) {
    console.error(error)
    return sendResponse(res, 500, 'Failed to create feedback')
  }
}

const getFeedbackByProductId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { productId } = req.params
  const parsedProductId = Number(productId)

  if (isNaN(parsedProductId)) {
    return sendResponse(res, 400, 'Invalid product ID')
  }

  try {
    const feedbacks = await Feedback.findAll({
      where: { product_id: parsedProductId },
      include: [{ model: User, as: 'user', attributes: ['firstname'] }],
    })

    if (feedbacks.length === 0) {
      return sendResponse(res, 404, 'No feedback found for this product')
    }

    return sendResponse(res, 200, 'Feedback retrieved successfully', feedbacks)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return sendResponse(res, 500, 'Failed to fetch feedback')
  }
}

const getAllFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    const feedbacks = await Feedback.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    })

    return sendResponse(
      res,
      200,
      'All feedback retrieved successfully',
      feedbacks
    )
  } catch (error) {
    console.error(error)
    return sendResponse(res, 500, 'Failed to fetch all feedback')
  }
}

const deleteFeedback = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const userId = req.user_data.id

  try {
    const feedback = await Feedback.findByPk(id)

    if (!feedback) {
      return sendResponse(res, 404, 'Feedback not found')
    }

    // Optional: Only allow deleting own feedback unless admin
    if (feedback.user_id !== userId) {
      return sendResponse(res, 403, 'Unauthorized to delete this feedback')
    }

    await feedback.destroy()

    return sendResponse(res, 200, 'Feedback deleted successfully')
  } catch (error) {
    console.error(error)
    return sendResponse(res, 500, 'Failed to delete feedback')
  }
}

const updateFeedback = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  const { comment, rating } = req.body
  const userId = req.user_data.id

  try {
    const feedback = await Feedback.findByPk(id)

    if (!feedback) {
      return sendResponse(res, 404, 'Feedback not found')
    }

    // Optional: Only allow updating own feedback
    if (feedback.user_id !== userId) {
      return sendResponse(res, 403, 'Unauthorized to update this feedback')
    }

    feedback.comment = comment || feedback.comment
    feedback.rating = rating || feedback.rating

    await feedback.save()

    return sendResponse(res, 200, 'Feedback updated successfully', feedback)
  } catch (error) {
    console.error(error)
    return sendResponse(res, 500, 'Failed to update feedback')
  }
}

export {
  createFeedback,
  getFeedbackByProductId,
  getAllFeedback,
  updateFeedback,
  deleteFeedback,
}
