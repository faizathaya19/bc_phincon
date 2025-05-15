import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadRooms, addRoom } from '../roomsSlice'
import { loadUsers } from '../usersSlice'
import type { RootState, AppDispatch } from '../../../app/store'
import { useNavigate } from 'react-router-dom'
import RoomList from '../RoomList'
import CreateRoomModal from '../components/CreateRoomModal'

export default function ChatRoomListPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const token = localStorage.getItem('accessToken')

  const { privateRooms, groupRooms } = useSelector(
    (state: RootState) => state.rooms
  )
  const { list: users } = useSelector((state: RootState) => state.users)

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'private' | 'group' | null>(null)

  useEffect(() => {
    dispatch(loadRooms(token))
    dispatch(loadUsers(token))
  }, [dispatch, token])

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

  const handleCreateRoom = async () => {
    if (selectedUserIds.length === 0 || !modalType) return
    await dispatch(
      addRoom({ token, userIds: selectedUserIds, type: modalType })
    )
    setIsModalOpen(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">💬 Daftar Chat</h2>
      <div className="mb-4 space-x-2">
        <button
          onClick={() => openModal('private')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          + Private Chat
        </button>
        <button
          onClick={() => openModal('group')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          + Group Chat
        </button>
      </div>

      <h3 className="text-lg font-semibold mt-4 mb-2">🧍 Private</h3>
      <RoomList rooms={privateRooms} navigate={navigate} />

      <h3 className="text-lg font-semibold mt-4 mb-2">👥 Group</h3>
      <RoomList rooms={groupRooms} navigate={navigate} isGroup={true} />

      {isModalOpen && modalType && (
        <CreateRoomModal
          isOpen={isModalOpen}
          onClose={closeModal}
          users={users}
          selectedUserIds={selectedUserIds}
          toggleUser={toggleUser}
          onCreateRoom={handleCreateRoom}
          modalType={modalType}
        />
      )}
    </div>
  )
}
