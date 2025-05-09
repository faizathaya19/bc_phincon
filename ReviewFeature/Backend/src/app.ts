
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import reviewRoutes from './routes/review.routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', reviewRoutes)

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong' })
})

export default app
