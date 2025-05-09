// server.ts
import app from './app'
import config from './config/configData'
import { v2 as cloudinary } from 'cloudinary'
import { setupAssociations } from './models/associations'

const startServer = async () => {
  try {
    await config.database.authenticate()
    setupAssociations()
    cloudinary.config(config.cloudinary)
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

startServer()
