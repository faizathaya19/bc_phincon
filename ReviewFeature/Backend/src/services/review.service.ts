import { Op } from 'sequelize'
import Course from '../models/Course.model'
import TryoutSection from '../models/tryoutSection.model'
import App from '../models/App.model'
import Review from '../models/review.model'
import User from '../models/users.model'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs/promises'

const typeModels = (type: string) => {
  if (type.includes('tryout')) return TryoutSection
  if (type.includes('course')) return Course
  if (type.includes('app')) return App
  throw new Error('Invalid type')
}

export const applyReviewFilters = ({
  sortBy,
  searchUser,
  searchContent,
  rating,
}: any) => {
  const whereClause: any = {}
  const orderClause: any[] = []
  const userWhereClause: any = {}

  if (searchContent) whereClause.content = { [Op.like]: `%${searchContent}%` }
  if (searchUser) userWhereClause.fullname = { [Op.like]: `%${searchUser}%` }
  if (rating) whereClause.rating = parseInt(rating, 10)

  if (sortBy) {
    const sortMap: Record<string, any> = {
      latest: ['createdAt', 'DESC'],
      oldest: ['createdAt', 'ASC'],
      highest_rating: ['rating', 'DESC'],
      lowest_rating: ['rating', 'ASC'],
    }
    if (sortMap[sortBy]) orderClause.push(sortMap[sortBy])
  }

  return { where: whereClause, order: orderClause, userWhere: userWhereClause }
}

export const getTypeByIdService = async (type: string, id: string) => {
  const typeModel: any = typeModels(type)
  const data = await typeModel.findOne({
    where: { id },
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
  return data
}

export const getAllByTypeService = async (type: string) => {
  const typeModel: any = typeModels(type)
  return await typeModel.findAll()
}

export const getAllReviewsByTypeService = async (type: string) => {
const typeModel: any = typeModels(type)
  return await typeModel.findAll({
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
}

export const getFilteredReviewById = async (
  type: string,
  id: string,
  filters: any
) => {
  const typeModel: any = typeModels(type)
  return await typeModel.findOne({
    where: { id },
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
}

export const createReviewService = async (
  user_id: string,
  body: any,
  file?: Express.Multer.File
) => {
  let imageUrl = ''
  let tempFilePath: string | undefined

  if (file) {
    tempFilePath = file.path
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `reviews/${body.referenceId}`,
      })
      imageUrl = result.secure_url
      await fs.unlink(tempFilePath)
    } catch (err) {
      if (tempFilePath) await fs.unlink(tempFilePath).catch(() => {})
      throw new Error('Image upload failed')
    }
  }

  return await Review.create({
    referenceId: body.referenceId,
    type: body.type,
    rating: body.rating,
    content: body.content,
    image: imageUrl,
    active: false,
    user_id,
  })
}
