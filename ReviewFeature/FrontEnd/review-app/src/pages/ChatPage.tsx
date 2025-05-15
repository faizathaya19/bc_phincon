// src/pages/ChatPage.tsx
import {
  useEffect,
  useState,
  useRef,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import { getAccessToken } from '../features/loginFeature/utils/tokenStorage'

const SERVER_URL = 'http://localhost:3001'

interface Message {
  id: string
  roomId: string
  userId: string
  message: string
  createdAt: string
}

export default function ChatPage() {
  const { roomId } = useParams()
  const token = getAccessToken()
  const socketRef = useRef<ReturnType<typeof io> | null>(null)

  const [messages, setMessages] = useState<Message[]>([])
  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    if (!token || !roomId) return

    const socket = io(SERVER_URL, {
      auth: { token },
    })

    socket.on('connect', () => {
      console.log('Connected to socket')
      socket.emit('joinRoom', roomId)
      socket.emit('getMessages', roomId)
    })

    socket.on('newMessage', (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on('messages', (msgs: Message[]) => {
      setMessages(msgs)
    })

    socketRef.current = socket

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [token, roomId])

  const handleSendMessage = () => {
    const msg = messageInput.trim()
    if (msg && socketRef.current && roomId) {
      socketRef.current.emit('chatMessage', {
        roomId,
        message: msg,
      })
      setMessageInput('')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Room Chat: {roomId}</h2>

      <div
        style={{
          border: '1px solid #ccc',
          height: 300,
          overflowY: 'auto',
          marginBottom: 8,
          padding: 8,
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.userId}</b>: {msg.message}
          </div>
        ))}
      </div>

      <input
        value={messageInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessageInput(e.target.value)
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
          e.key === 'Enter' && handleSendMessage()
        }
        placeholder="Tulis pesan..."
        style={{ width: '80%' }}
      />
      <button onClick={handleSendMessage} style={{ marginLeft: 8 }}>
        Kirim
      </button>
    </div>
  )
}
