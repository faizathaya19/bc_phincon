import config from './config/configData'
import { v2 as cloudinary } from 'cloudinary'
import { setupAssociations } from './models/associations'
import { httpServer } from './utils/socket'

const startServer = async () => {
  try {
    await config.database.authenticate()
    console.log('✅ Database connected')

    setupAssociations()
    cloudinary.config(config.cloudinary)
    httpServer.listen(config.port, () => {
      console.log(`🚀 Server listening on port ${config.port}`)
    })
  } catch (err) {
    console.error('❌ Unable to connect to the database:', err)
  }
}

startServer()
