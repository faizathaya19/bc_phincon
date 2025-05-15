interface User {
  id: string
  fullname: string
}

interface CreateRoomModalProps {
  isOpen: boolean
  onClose: () => void
  users: User[]
  selectedUserIds: string[]
  toggleUser: (id: string) => void
  onCreateRoom: () => Promise<void>
  modalType: 'private' | 'group'
}

export default function CreateRoomModal({
  isOpen,
  onClose,
  users,
  selectedUserIds,
  toggleUser,
  onCreateRoom,
  modalType,
}: CreateRoomModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h4 className="text-lg font-semibold mb-4">Pilih User</h4>
        <ul className="max-h-48 overflow-y-auto mb-4">
          {users.map((user) => (
            <li key={user.id} className="mb-2">
              <label className="flex items-center">
                <input
                  type={modalType === 'group' ? 'checkbox' : 'radio'}
                  checked={selectedUserIds.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                  className="mr-2"
                />
                {user.fullname}
              </label>
            </li>
          ))}
        </ul>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onCreateRoom}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
