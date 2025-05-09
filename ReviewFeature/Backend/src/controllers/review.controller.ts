import { Request, Response } from 'express'
import User from '../models/users.model'
import Review from '../models/review.model'
import Course from '../models/Course.model'
import TryoutSection from '../models/tryoutSection.model'
import { sendResponse } from '../utils/responseUtil'
import fs from 'fs/promises'
import { v2 as cloudinary } from 'cloudinary'
import { Op } from 'sequelize'
import {
  filterQuerySchema,
  reviewBodySchema,
  userIdParamSchema,
} from '../validation/validationSchemas'

const applyReviewFilters = (req: Request, res: Response) => {
  const { error, value } = filterQuerySchema.validate(req.query)
  if (error) {
    throw sendResponse(res, 400, error.message)
  }

  const { sortBy, searchUser, searchContent, rating } = value
  const whereClause: any = {}
  const orderClause: any[] = []
  const userWhereClause: any = {}

  if (searchContent) {
    whereClause.content = { [Op.like]: `%${searchContent}%` }
  }

  if (searchUser) {
    userWhereClause.fullname = { [Op.like]: `%${searchUser}%` }
  }

  if (rating) {
    whereClause.rating = parseInt(rating as string, 10)
  }

  if (sortBy) {
    switch (sortBy) {
      case 'latest':
        orderClause.push(['createdAt', 'DESC'])
        break
      case 'oldest':
        orderClause.push(['createdAt', 'ASC'])
        break
      case 'highest_rating':
        orderClause.push(['rating', 'DESC'])
        break
      case 'lowest_rating':
        orderClause.push(['rating', 'ASC'])
        break
      default:
        break
    }
  }

  return {
    where: whereClause,
    order: orderClause,
    userWhere: userWhereClause,
  }
}

const typeModels = (res: Response, typeParam: string) => {
  if (typeParam === 'tryout-sections' || typeParam === 'tryout-section') {
    return TryoutSection
  } else if (typeParam === 'courses' || typeParam === 'course') {
    return Course
  } else {
    throw new Error('Invalid type')
  }
}

const getTypeById =
  (type: 'course' | 'tryout-section' | 'app') =>
  async (req: Request, res: Response): Promise<void> => {
    const { typeIdParam } = req.params
    let typeModel: any = Course

    try {
      typeModel = typeModels(res, type)

      const data = await typeModel.findOne({
        where: {
          id: typeIdParam,
        },
        include: [
          {
            model: Review,
            as: 'reviews',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'fullname'],
              },
            ],
          },
        ],
      })

      if (!data || data.length === 0) {
        return sendResponse(res, 404, `${type} not found`)
      }

      return sendResponse(res, 200, `${type} retrieved successfully`, data)
    } catch (err: any) {
      return sendResponse(res, 400, err.message)
    }
  }

const getAllByType =
  (type: 'courses' | 'tryout-sections' | 'apps') =>
  async (req: Request, res: Response): Promise<void> => {
    let typeModel: any = Course

    try {
      typeModel = typeModels(res, type)

      const data = await typeModel.findAll()
      return sendResponse(res, 200, `${type} retrieved successfully`, data)
    } catch (err) {
      return sendResponse(res, 500, `Error fetching ${type}`, {
        error: err,
      })
    }
  }

const getAllReviewsByType =
  (type: 'course' | 'tryout-section' | 'app') =>
  async (req: Request, res: Response): Promise<void> => {
    let typeModel: any = Course

    try {
      typeModel = typeModels(res, type)

      const data = await typeModel.findAll({
        include: [
          {
            model: Review,
            as: 'reviews',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'fullname'],
              },
            ],
          },
        ],
      })

      if (!data) {
        return sendResponse(res, 404, `reviews ${type} not found`)
      }
      return sendResponse(
        res,
        200,
        `reviews ${type} retrieved successfully`,
        data
      )
    } catch (err) {
      return sendResponse(res, 500, `Error fetching ${type}`, {
        error: err,
      })
    }
  }

export const getFilterByType = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { typeParam, typeIdParam } = req.params
  const filters = applyReviewFilters(req, res)
  let typeModel: any = Course

  try {
    typeModel = typeModels(res, typeParam)

    const data = await typeModel.findAll({
      where: {
        id: typeIdParam,
      },
      include: [
        {
          model: Review,
          as: 'reviews',
          where: filters.where,
          separate: true,
          order: filters.order,
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'fullname'],
              where: filters.userWhere,
            },
          ],
        },
      ],
    })

    return sendResponse(
      res,
      200,
      `filtering ${typeParam} retrieved successfully`,
      data
    )
  } catch (error) {
    return sendResponse(res, 500, `Error filtering ${typeParam}`, error)
  }
}

export const createReview = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error: paramError } = userIdParamSchema.validate(req.params)
  const { error: bodyError } = reviewBodySchema.validate(req.body)
  if (paramError) {
    return sendResponse(
      res,
      400,
      'Invalid user_id parameter',
      paramError.details
    )
  }

  if (bodyError) {
    return sendResponse(res, 400, 'Invalid review body', bodyError.details)
  }
  let tempFilePath: string | undefined

  try {
    const { user_id } = req.params
    const { type, referenceId, content, rating } = req.body
    const image = req.file

    let imageUrl = ''
    if (image) {
      tempFilePath = image.path
      try {
        const uploadResult = await cloudinary.uploader.upload(image.path, {
          public_id: `reviews/${referenceId}`,
        })
        imageUrl = uploadResult.secure_url
        await fs.unlink(tempFilePath)
      } catch (cloudinaryError) {
        if (tempFilePath) {
          try {
            await fs.unlink(tempFilePath)
          } catch (unlinkError) {
            console.error('Failed to delete temp file:', unlinkError)
          }
        }
        console.error('Cloudinary upload error:', cloudinaryError)
        return sendResponse(res, 500, 'Image upload failed')
      }
    } else {
      console.log(
        'Tidak ada file gambar yang diterima (req.file adalah undefined).'
      )
    }

    const review = await Review.create({
      referenceId,
      type,
      rating,
      content,
      image: imageUrl,
      active: false,
      user_id: user_id,
    })

    console.log('Review berhasil dibuat:', review)
    return sendResponse(res, 201, 'Review berhasil dibuat', review)
  } catch (error) {
    console.error('Error membuat review:', error)
    if (tempFilePath) {
      try {
        await fs.unlink(tempFilePath)
        console.log('File sementara dihapus karena error lain:', tempFilePath)
      } catch (unlinkError) {
        console.error('Error menghapus file sementara:', unlinkError)
      }
    }
    return sendResponse(res, 500, 'Error membuat review', error)
  }
}

export const getCourseById = getTypeById('course')
export const getTryoutSectionById = getTypeById('tryout-section')
export const getAppById = getTypeById('app')
export const getAllCourses = getAllByType('courses')
export const getAllTryoutSections = getAllByType('tryout-sections')
export const getAllApps = getAllByType('apps')
export const getAllCourseReviews = getAllReviewsByType('course')
export const getAllTryoutSectionReviews = getAllReviewsByType('tryout-section')
export const getAllAppReviews = getAllReviewsByType('app')
