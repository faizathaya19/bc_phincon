import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import config from './config/configData'
import authRoutes from './routes/auth.routes'
import productsRoutes from './routes/products.routes'
import ratingAndFeedbackRoutes from './routes/feedback.routes'
import cart from './routes/cart.routes'
import { setupAssociations } from './models/product/associations'
import reviewRoutes from './routes/review.routes'
import { v2 as cloudinary } from 'cloudinary'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/product', productsRoutes)
app.use('/api/feedback', ratingAndFeedbackRoutes)
app.use('/api/cart', cart)
app.use('/api', reviewRoutes)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong' })
})

const startServer = async () => {
  try {
    await config.database.authenticate()
    cloudinary.config(config.cloudinary)
    setupAssociations()
    // config.database.sync({ alter: true })
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
    })
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}

startServer()
