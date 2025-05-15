import { Server } from 'socket.io'
import http from 'http'
import app from '../../app'
import jwt from 'jsonwebtoken'
import chatHandler from './chatHandler'

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
})

io.use((socket, next) => {
  const token = socket.handshake.auth.token
  if (!token) return next(new Error('Unauthorized'))

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    socket.data.userId = (decoded as any).id
    next()
  } catch {
    next(new Error('Invalid token'))
  }
})

io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`)
  chatHandler(io, socket)
})

export { io, httpServer }
