import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/configData'
import User from '../models/users/users.model'
import { generateAccessToken, generateRefreshToken } from '../utils/token'

import { sendResponse } from '../utils/responseUtil'
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../validation/validationSchemas'

export const register = async (req: Request, res: Response): Promise<void> => {
  const { error } = registerSchema.validate(req.body)
  if (error) {
    return sendResponse(res, 400, error.details[0].message)
  }

  const { fullname, username, email, password, phone_number } = req.body

  try {
    const userExists = await User.findOne({ where: { email } })
    if (userExists) {
      return sendResponse(res, 400, 'User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      id: crypto.randomUUID(),
      fullname,
      username,
      email,
      phoneNumber: phone_number,
      password: hashedPassword,
      active: false,
    })

    const accessToken = generateAccessToken(newUser.id.toString())
    const refreshToken = generateRefreshToken(newUser.id.toString())

    return sendResponse(res, 201, 'User registered successfully', {
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error('Register error:', error)
    return sendResponse(res, 500, 'Server error')
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const { error } = loginSchema.validate(req.body)
  if (error) {
    return sendResponse(res, 400, error.details[0].message)
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return sendResponse(res, 400, 'Invalid credentials')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return sendResponse(res, 400, 'Invalid credentials')
    }

    const accessToken = generateAccessToken(user.id.toString())
    const refreshToken = generateRefreshToken(user.id.toString())

    return sendResponse(res, 200, 'Login successful', {
      accessToken,
      refreshToken,
    })
  } catch (error) {
    console.error('Login error:', error)
    return sendResponse(res, 500, 'Server error')
  }
}
export const refreshTokenHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { error } = refreshTokenSchema.validate(req.headers)
  if (error) {
    return sendResponse(res, 400, 'Invalid refresh token format')
  }

  const authHeader = req.headers['authorization']
  const refreshToken = authHeader?.split(' ')[1]

  if (!refreshToken) {
    return sendResponse(res, 401, 'Refresh token missing')
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      config.jwtRefreshSecretKey ?? ''
    ) as { id: string }

    const newAccessToken = generateAccessToken(decoded.id)

    return sendResponse(res, 200, 'Access token refreshed', {
      accessToken: newAccessToken,
    })
  } catch (error) {
    console.error('Refresh token error:', error)
    return sendResponse(res, 403, 'Invalid or expired refresh token')
  }
}

export const profile = async (Req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByPk(Req.user_data.id, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    })

    if (!user) {
      return sendResponse(res, 401, 'User not authenticated')
    }

    return sendResponse(res, 200, 'User profile retrieved successfully', user)
  } catch (error) {
    console.error('Profile error:', error)
    return sendResponse(res, 500, 'Internal Server Error')
  }
}

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByPk(req.user_data.id)

    if (!user) {
      return sendResponse(res, 404, 'User not found')
    }

    await user.destroy()
    return sendResponse(res, 200, 'User deleted successfully')
  } catch (error) {
    console.error('Delete user error:', error)
    return sendResponse(res, 500, 'Server error')
  }
}
