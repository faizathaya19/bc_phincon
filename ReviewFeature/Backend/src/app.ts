// src/app.ts
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import reviewRoutes from './routes/review.routes'
import authRoutes from './routes/auth.routes'
import chatRoutes from './routes/chat.routes' // Optional if you expose REST for chat

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', reviewRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes) // Optional REST for chat

// Error handling middleware
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong' })
})

export default app
