import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/configData'
import { sendResponse } from '../utils/responseUtil'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return sendResponse(res, 401, 'Authorization header is missing')
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return sendResponse(res, 401, 'Token is missing')
    }

    if (!config.jwtSecretKey) {
      throw new Error('JWT Secret Key is not configured')
    }

    const decoded = jwt.verify(token, config.jwtSecretKey)
    req.user_data = decoded

    return next()
  } catch (err) {
    console.error('Error verifying token:', err)
    return sendResponse(res, 403, 'Invalid or expired token', {
      error: err,
    })
  }
}

export default authMiddleware
