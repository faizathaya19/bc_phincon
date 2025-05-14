import jwt from 'jsonwebtoken'
import config from '../config/configData'

export function generateAccessToken(userId: string) {
  return jwt.sign({ id: userId }, config.jwtSecretKey, {
    expiresIn: '1d',
  })
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ id: userId }, config.jwtRefreshSecretKey, {
    expiresIn: '7d',
  })
}
