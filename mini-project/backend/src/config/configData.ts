import * as dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const config = {
  appName: 'My Backend App',
  appVersion: '1.0.0',
  environment: process.env.NODE_ENV ?? 'development',
  port: parseInt(process.env.PORT ?? '3000', 10),
  jwtSecretKey: process.env.JWT_SECRET ?? '',
  jwtRefreshSecretKey: process.env.JWT_REFRESH_SECRET ?? '',

  midtrans: {
    isProduction: process.env.NODE_ENV === 'production',
    serverKey: process.env.MIDTRANS_SERVER_KEY ?? '',
    clientKey: process.env.MIDTRANS_CLIENT_KEY ?? '',
    midtransDevUrl: 'https://api.sandbox.midtrans.com/v2',
  },

  database: new Sequelize('miniProject', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  }),

  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
    url: process.env.CLOUDINARY_URL,
  },
} as const

export default config
