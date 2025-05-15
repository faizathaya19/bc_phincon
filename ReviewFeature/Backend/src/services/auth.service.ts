import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { Request, Response } from 'express'
import config from '../config/configData'
import User from '../models/Users.model'
import { generateAccessToken, generateRefreshToken } from '../utils/token'
import { sendResponse } from '../utils/responseUtil'
import { Op } from 'sequelize'

declare global {
  namespace Express {
    interface Request {
      user_data?: any
    }
  }
}

export {}

export const registerService = async (req: Request, res: Response) => {
  const { fullname, username, email, password, phone_number } = req.body

  try {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) return sendResponse(res, 400, 'User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      id: crypto.randomUUID(),
      fullname,
      username,
      email,
      phoneNumber: phone_number,
      password: hashedPassword,
      active: true,
    })

    const accessToken = generateAccessToken(newUser.id.toString())
    const refreshToken = generateRefreshToken(newUser.id.toString())

    return sendResponse(res, 201, 'User registered successfully', {
      accessToken,
      refreshToken,
    })
  } catch (err) {
    console.error('Register error:', err)
    return sendResponse(res, 500, 'Server error')
  }
}

export const loginService = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) return sendResponse(res, 400, 'Invalid credentials')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return sendResponse(res, 400, 'Invalid credentials')

    const accessToken = generateAccessToken(user.id.toString())
    const refreshToken = generateRefreshToken(user.id.toString())

    return sendResponse(res, 200, 'Login successful', {
      accessToken,
      refreshToken,
    })
  } catch (err) {
    console.error('Login error:', err)
    return sendResponse(res, 500, 'Server error')
  }
}

export const refreshTokenService = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization']
  const refreshToken = authHeader?.split(' ')[1]

  if (!refreshToken) return sendResponse(res, 401, 'Refresh token missing')

  try {
    const decoded = jwt.verify(
      refreshToken,
      config.jwtRefreshSecretKey ?? ''
    ) as { id: string }

    const newAccessToken = generateAccessToken(decoded.id)
    return sendResponse(res, 200, 'Access token refreshed', {
      accessToken: newAccessToken,
    })
  } catch (err) {
    console.error('Refresh token error:', err)
    return sendResponse(res, 403, 'Invalid or expired refresh token')
  }
}

export const profileService = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user_data.id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    })

    if (!user) return sendResponse(res, 401, 'User not authenticated')
    return sendResponse(res, 200, 'User profile retrieved successfully', user)
  } catch (err) {
    console.error('Profile error:', err)
    return sendResponse(res, 500, 'Internal Server Error')
  }
}

export const deleteUserService = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.user_data.id)
    if (!user) return sendResponse(res, 404, 'User not found')

    await user.destroy()
    return sendResponse(res, 200, 'User deleted successfully')
  } catch (err) {
    console.error('Delete user error:', err)
    return sendResponse(res, 500, 'Server error')
  }
}
export const getAllUsers = async (req: Request, res: Response) => {
  const userId = req.user_data.id

  try {
    const users = await User.findAll({
      attributes: ['id', 'fullname'],
      where: {
        active: true,
        id: { [Op.ne]: userId }, // exclude self
      },
    })

    return sendResponse(res, 200, 'Users fetched', users)
  } catch (err) {
    console.error('fetch user:', err)
    return sendResponse(res, 500, 'Failed to fetch users')
  }
}
