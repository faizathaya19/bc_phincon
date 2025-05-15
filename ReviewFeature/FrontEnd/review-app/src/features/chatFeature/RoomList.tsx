import { useNavigate } from 'react-router-dom'

interface Room {
  id: string
  data?: {
    groupName?: string | null 
  }
}

interface RoomListProps {
  rooms: Room[]
  navigate: ReturnType<typeof useNavigate>
  isGroup?: boolean
}

export default function RoomList({ rooms, navigate, isGroup }: RoomListProps) {
  return (
    <ul className="list-disc pl-5">
      {rooms.map((room) => (
        <li key={room.id} className="mb-2">
          <button
            onClick={() => navigate(`/chat/${room.id}`)}
            className="text-blue-600 hover:underline"
          >
            {isGroup ? `Room: ${room.data?.groupName}` : `Room ID: ${room.id}`}
          </button>
        </li>
      ))}
    </ul>
  )
}
