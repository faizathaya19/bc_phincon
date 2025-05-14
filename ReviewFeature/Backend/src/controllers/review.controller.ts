import { Request, Response } from 'express'
import {
  getAllByTypeService,
  getTypeByIdService,
  getAllReviewsByTypeService,
  getFilteredReviewById,
  applyReviewFilters,
  createReviewService,
} from '../services/review.service'
import {
  filterQuerySchema,
  reviewBodySchema,
  userIdParamSchema,
} from '../validation/validationSchemas'
import { sendResponse } from '../utils/responseUtil'

export const getById = async (req: Request, res: Response) => {
  try {
    const { typeParam, typeIdParam } = req.params
    const data = await getTypeByIdService(typeParam, typeIdParam)
    if (!data) return sendResponse(res, 404, `${typeParam} not found`)
    return sendResponse(res, 200, `${typeParam} retrieved successfully`, data)
  } catch (err: any) {
    return sendResponse(res, 400, err.message)
  }
}

export const getAllByType = async (req: Request, res: Response) => {
  try {
    const { typeParam } = req.params
    const data = await getAllByTypeService(typeParam)
    return sendResponse(res, 200, `${typeParam} retrieved successfully`, data)
  } catch (err: any) {
    return sendResponse(res, 500, `Error fetching ${req.params.typeParam}`, err)
  }
}

export const getAllReviewsByType = async (req: Request, res: Response) => {
  try {
    const { typeParam } = req.params
    const data = await getAllReviewsByTypeService(typeParam)
    return sendResponse(
      res,
      200,
      `reviews ${typeParam} retrieved successfully`,
      data
    )
  } catch (err) {
    return sendResponse(res, 500, `Error fetching ${req.params.typeParam}`, err)
  }
}

export const getFilteredReviewsById = async (req: Request, res: Response) => {
  try {
    const { error, value } = filterQuerySchema.validate(req.query)
    if (error) return sendResponse(res, 400, error.message)

    const filters = applyReviewFilters(value)
    const { typeParam, typeIdParam } = req.params
    const data = await getFilteredReviewById(typeParam, typeIdParam, filters)
    return sendResponse(
      res,
      200,
      `Filtered reviews retrieved successfully`,
      data
    )
  } catch (error) {
    return sendResponse(res, 500, 'Error filtering reviews', error)
  }
}

export const createReview = async (req: Request, res: Response) => {
  const { error: paramError } = userIdParamSchema.validate(req.params)
  const { error: bodyError } = reviewBodySchema.validate(req.body)
  if (paramError)
    return sendResponse(
      res,
      400,
      'Invalid user_id parameter',
      paramError.details
    )
  if (bodyError)
    return sendResponse(res, 400, 'Invalid review body', bodyError.details)

  try {
    const review = await createReviewService(
      req.params.user_id,
      req.body,
      req.file
    )
    return sendResponse(res, 201, 'Review berhasil dibuat', review)
  } catch (err) {
    return sendResponse(res, 500, 'Error membuat review', err)
  }
}
