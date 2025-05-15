import { Request, Response } from 'express'
import * as authService from '../services/auth.service'
import { sendResponse } from '../utils/responseUtil'
import {
  loginSchema,
  registerSchema,
  refreshTokenSchema,
} from '../validation/validationSchemas'

export const register = async (req: Request, res: Response) => {
  const { error } = registerSchema.validate(req.body)
  if (error) return sendResponse(res, 400, error.details[0].message)

  await authService.registerService(req, res)
}

export const login = async (req: Request, res: Response) => {
  const { error } = loginSchema.validate(req.body)
  if (error) return sendResponse(res, 400, error.details[0].message)

  await authService.loginService(req, res)
}

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const { error } = refreshTokenSchema.validate(req.headers)
  if (error) return sendResponse(res, 400, 'Invalid refresh token format')

  await authService.refreshTokenService(req, res)
}

export const profile = async (req: Request, res: Response) => {
  await authService.profileService(req, res)
}

export const deleteUser = async (req: Request, res: Response) => {
  await authService.deleteUserService(req, res)
}

export const getAllUsers = async (req: Request, res: Response) => {
  await authService.getAllUsers(req, res)
}
