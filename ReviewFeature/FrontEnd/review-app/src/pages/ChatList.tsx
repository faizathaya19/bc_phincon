// src/pages/ChatRoomListPage.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface Room {
  id: string
  data: {
    groupName: string | null
  }
}

interface User {
  id: string
  fullname: string
}

export default function ChatRoomListPage() {
  const [privateRooms, setPrivateRooms] = useState<Room[]>([])
  const [groupRooms, setGroupRooms] = useState<Room[]>([])
  const [allUsers, setAllUsers] = useState<User[]>([])
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'private' | 'group' | null>(null)

  const token = localStorage.getItem('accessToken')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRooms()
    fetchAllUsers()
  }, [])

  const fetchRooms = async () => {
    const res = await axios.get('http://localhost:3001/api/chat/rooms', {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPrivateRooms(res.data.data.private)
    setGroupRooms(res.data.data.group)
  }

  const fetchAllUsers = async () => {
    const res = await axios.get('http://localhost:3001/api/auth/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
    setAllUsers(res.data.data)
  }

  const openModal = (type: 'private' | 'group') => {
    setSelectedUserIds([])
    setModalType(type)
    setIsModalOpen(true)
  }

  const toggleUser = (id: string) => {
    if (modalType === 'private') {
      setSelectedUserIds([id])
    } else {
      setSelectedUserIds((prev) =>
        prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
      )
    }
  }

  const createRoom = async () => {
    if (selectedUserIds.length < 1) return alert('Pilih user terlebih dahulu')

    await axios.post(
      `http://localhost:3001/api/chat/${modalType}`,
      {
        userIds: selectedUserIds,
        isGroup: modalType === 'group',
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    setIsModalOpen(false)
    fetchRooms()
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Daftar Chat</h2>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => openModal('private')}>+ Private Chat</button>
        <button onClick={() => openModal('group')} style={{ marginLeft: 10 }}>
          + Group Chat
        </button>
      </div>

      <h3>🧍 Private</h3>
      <ul>
        {privateRooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => navigate(`/chat/${room.id}`)}>
              Room ID: {room.id}
            </button>
          </li>
        ))}
      </ul>

      <h3>👥 Group</h3>
      <ul>
        {groupRooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => navigate(`/chat/${room.id}`)}>
              Room ID: {room.data.groupName}
            </button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div
          style={{
            background: '#fff',
            padding: 20,
            border: '1px solid #ccc',
            position: 'absolute',
            top: '20%',
            left: '30%',
            zIndex: 999,
          }}
        >
          <h4>Pilih User</h4>
          <ul style={{ maxHeight: 200, overflow: 'auto' }}>
            {allUsers.map((user) => (
              <li key={user.id}>
                <label>
                  <input
                    type={modalType === 'group' ? 'checkbox' : 'radio'}
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => toggleUser(user.id)}
                  />
                  {user.fullname}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={createRoom}>Create</button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}
