import { useParams } from 'react-router-dom'
import {
  useState,
  type KeyboardEvent,
  type ChangeEvent,
  useEffect,
  useRef,
} from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../app/store'
import { useChatSocket } from '../useChatSocket'
import { useAuthToken, useProfile } from '../../authFeature/hooks'
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { id } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'

interface ChatMessageProps {
  msg: {
    id: string
    message: string
    userId: string
    createdAt: string | number | Date
  }
  isMe: boolean
  formatTime: (timestamp: string | number | Date) => string
}

function ChatMessage({ msg, isMe, formatTime }: ChatMessageProps) {
  return (
    <motion.div
      className={`flex mb-3 transition-all duration-300 ${
        isMe ? 'justify-end' : 'justify-start'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        className={`rounded-xl py-2 px-3 relative break-words w-fit shadow-md ${
          isMe
            ? 'bg-indigo-500 text-white rounded-br-xl'
            : 'bg-gray-200 dark:bg-gray-700 dark:text-white rounded-bl-xl'
        }`}
      >
        <span className="text-xs font-semibold">
          {isMe ? '' : `User ${msg.userId}`}
        </span>
        <div>{msg.message}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 flex justify-between items-center">
          <span className="text-gray-500 dark:text-gray-500">
            {formatTime(msg.createdAt)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

interface ChatInputProps {
  messageInput: string
  setMessageInput: (value: string) => void
  handleSend: () => void
}

function ChatInput({
  messageInput,
  setMessageInput,
  handleSend,
}: ChatInputProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700 flex items-center h-14 md:h-16 lg:h-18">
      {/* Atur tinggi input */}
      <input
        value={messageInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMessageInput(e.target.value)
        }
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
          e.key === 'Enter' && handleSend()
        }
        placeholder="Tulis pesan..."
        className="flex-grow rounded-full py-2 px-4 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
      />
      <button
        onClick={handleSend}
        className="ml-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-200"
      >
        <FiSend className="w-5 h-5" />
      </button>
    </div>
  )
}

export default function ChatPage() {
  const { roomId } = useParams()
  const { token } = useAuthToken()
  const { sendMessage } = useChatSocket(roomId, token)
  const { profile } = useProfile()
  const messages = useSelector((state: RootState) => state.messages.messages)
  const [messageInput, setMessageInput] = useState('')
  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  // Pastikan scroll ke bawah setiap kali ada pesan baru
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = () => {
    if (messageInput.trim()) {
      sendMessage(messageInput)
      setMessageInput('')
    }
  }

  const formatTime = (timestamp: string | number | Date) => {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: id,
      })
    } catch (error) {
      console.error('Error formatting timestamp:', error)
      return 'Waktu tidak valid'
    }
  }

  return (
    <div className="flex flex-col h-[70vh] bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow py-4 px-6 border-b border-gray-200 dark:border-gray-700 h-14 md:h-16 lg:h-18">
        {/* Atur tinggi header */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Ruang Chat: {roomId}
        </h2>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto p-4 flex flex-col justify-end"
        style={{ maxHeight: 'calc(70vh - 56px)' }}
      >
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            msg={msg}
            isMe={msg.userId === profile?.id}
            formatTime={formatTime}
          />
        ))}
      </div>

      <div className="sticky bottom-0">
        <ChatInput
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSend={handleSend}
        />
      </div>
    </div>
  )
}
