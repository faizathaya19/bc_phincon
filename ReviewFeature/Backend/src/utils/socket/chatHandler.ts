import { Server, Socket } from 'socket.io'
import { sendMessage, getMessages } from '../../services/chat.service'

interface ChatPayload {
  roomId: string
  message: string
}

export default function chatHandler(io: Server, socket: Socket) {
  console.log(`Socket connected: ${socket.id}`)

  socket.on('joinRoom', (roomId: string) => {
    socket.join(roomId)
    console.log(`Socket ${socket.id} joined room ${roomId}`)
  })

  socket.on('leaveRoom', (roomId: string) => {
    socket.leave(roomId)
    console.log(`Socket ${socket.id} left room ${roomId}`)
  })

  socket.on('chatMessage', async (data: ChatPayload) => {
    const userId = socket.data.userId
    if (!userId || !data.roomId || !data.message) return

    try {
      const savedMessage = await sendMessage(data.roomId, userId, data.message)
      io.to(data.roomId).emit('newMessage', savedMessage)
    } catch (err) {
      console.error('Error sending message:', err)
      socket.emit('error', 'Failed to send message')
    }
  })

  socket.on('getMessages', async (roomId: string) => {
    try {
      const messages = await getMessages(roomId)
      socket.emit('messages', messages)
    } catch (err) {
      console.error('Failed to get messages:', err)
      socket.emit('error', 'Failed to load messages')
    }
  })

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`)
  })
}
