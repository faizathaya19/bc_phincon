import { useEffect, useRef } from 'react'
import io from 'socket.io-client'
import { useDispatch } from 'react-redux'
import { setMessages, addMessage, clearMessages } from './messagesSlice'
import type { Message } from './types/chat'

const SERVER_URL = 'http://localhost:3001'

export const useChatSocket = (
  roomId: string | undefined,
  token: string | null
) => {
  const dispatch = useDispatch()
  const socketRef = useRef<ReturnType<typeof io> | null>(null)

  useEffect(() => {
    if (!roomId || !token) return

    dispatch(clearMessages())

    const socket = io(SERVER_URL, { auth: { token } })

    socket.on('connect', () => {
      socket.emit('joinRoom', roomId)
      socket.emit('getMessages', roomId)
    })

    socket.on('newMessage', (msg: Message) => {
      dispatch(addMessage(msg))
    })

    socket.on('messages', (msgs: Message[]) => {
      dispatch(setMessages(msgs))
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
      socketRef.current = null
      dispatch(clearMessages())
    }
  }, [roomId, token, dispatch])

  const sendMessage = (message: string) => {
    if (message.trim() && socketRef.current && roomId) {
      socketRef.current.emit('chatMessage', {
        roomId,
        message: message.trim(),
      })
    }
  }

  return { sendMessage }
}
