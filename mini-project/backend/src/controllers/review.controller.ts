import { Request, Response } from 'express'
import User from '../models/users/users.model'
import Review from '../models/review/review.model'
import Course from '../models/Course.model'
import TryoutSection from '../models/tryoutSection.model'
import { sendResponse } from '../utils/responseUtil'
import fs from 'fs/promises'
import { v2 as cloudinary } from 'cloudinary'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'

const applyReviewFilters = (req: Request) => {
  const { sortBy, searchUser, searchContent, rating } = req.query
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

  return { where: whereClause, order: orderClause, userWhere: userWhereClause }
}

export const getCourseById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params
  const filters = applyReviewFilters(req)

  try {
    const course = await Course.findByPk(courseId)

    if (!course) {
      return sendResponse(res, 404, 'Course not found')
    }

    const reviews = await Review.findAll({
      where: {
        referenceId: courseId,
        type: 'course',
        ...filters.where,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullname'],
          where: filters.userWhere,
        },
      ],
      order: filters.order.length > 0 ? filters.order : [['createdAt', 'DESC']],
    })

    return sendResponse(res, 200, 'Course retrieved successfully', {
      ...course.get(),
      reviews,
    })
  } catch (error) {
    console.error('Error fetching course by ID:', error)
    return sendResponse(res, 500, 'Error fetching course by ID', error)
  }
}

const getAllReviewsByType = async (
  req: Request,
  res: Response,
  type: 'course' | 'tryout-section' | null
) => {
  try {
    const filters = applyReviewFilters(req)
    const whereClause: any = type ? { type, ...filters.where } : filters.where
    const includeOptions: any[] = [
      {
        model:
          type === 'course'
            ? Course
            : type === 'tryout-section'
            ? TryoutSection
            : Sequelize.literal('NULL'),
        as:
          type === 'course'
            ? 'course'
            : type === 'tryout-section'
            ? 'tryoutSection'
            : undefined,
        attributes: ['id', 'code', 'title'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'fullname'],
        where: filters.userWhere,
      },
    ]

    const reviews = await Review.findAll({
      where: whereClause,
      order: filters.order,
      include: includeOptions.filter(
        (option) => option.model !== Sequelize.literal('NULL')
      ),
    })

    return sendResponse(
      res,
      200,
      `Reviews for ${type || 'all'} retrieved successfully`,
      reviews
    )
  } catch (error) {
    console.error(`Error fetching reviews for ${type || 'all'}:`, error)
    return sendResponse(
      res,
      500,
      `Error fetching reviews for ${type || 'all'}`,
      { error }
    )
  }
}

export const getAllCourseReviews = async (req: Request, res: Response) => {
  return getAllReviewsByType(req, res, 'course')
}

export const getAllTryoutSectionReviews = async (
  req: Request,
  res: Response
) => {
  return getAllReviewsByType(req, res, 'tryout-section')
}

export const getAllReviews = async (req: Request, res: Response) => {
  return getAllReviewsByType(req, res, null)
}

export const getTryoutSectionById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tryoutSectionId } = req.params
  const filters = applyReviewFilters(req)

  try {
    const tryoutSection = await TryoutSection.findByPk(tryoutSectionId)

    if (!tryoutSection) {
      return sendResponse(res, 404, 'Course not found')
    }

    const reviews = await Review.findAll({
      where: {
        referenceId: tryoutSectionId,
        type: 'tryout-section',
        ...filters.where,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'fullname'],
          where: filters.userWhere,
        },
      ],
      order: filters.order.length > 0 ? filters.order : [['createdAt', 'DESC']],
    })

    return sendResponse(res, 200, 'tryout section retrieved successfully', {
      ...tryoutSection.get(),
      reviews,
    })
  } catch (error) {
    console.error('Error fetching tryout section by ID:', error)
    return sendResponse(res, 500, 'Error fetching tryout section by ID', error)
  }
}

export const createReview = async (req: Request, res: Response) => {
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
          await fs.unlink(tempFilePath)
        }
        return sendResponse(
          res,
          500,
          'Error uploading image to Cloudinary',
          cloudinaryError
        )
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

export const getAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'code', 'title', 'description'],
    })
    return sendResponse(res, 200, 'Courses retrieved successfully', courses)
  } catch (err) {
    return sendResponse(res, 500, 'Error fetching courses', { error: err })
  }
}

export const getAllTryoutSections = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const sections = await TryoutSection.findAll({
      attributes: ['id', 'code', 'title', 'description'],
    })
    return sendResponse(
      res,
      200,
      'Tryout sections retrieved successfully',
      sections
    )
  } catch (err) {
    return sendResponse(res, 500, 'Error fetching tryout sections', {
      error: err,
    })
  }
}
