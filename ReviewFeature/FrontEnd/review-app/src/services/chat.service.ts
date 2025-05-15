import axios from 'axios'
import type { Room } from '../features/chatFeature/types/chat'
import type { User } from '../features/chatFeature/types/user'

const API = 'http://localhost:3001/api'

const getAuthHeaders = (token: string | null) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const fetchRooms = async (
  token: string | null
): Promise<{
  private: Room[]
  group: Room[]
}> => {
  const res = await axios.get(`${API}/chat/rooms`, getAuthHeaders(token))
  return res.data.data
}

export const fetchUsers = async (token: string | null): Promise<User[]> => {
  const res = await axios.get(`${API}/auth/users`, getAuthHeaders(token))
  return res.data.data
}

export const createRoom = async (
  token: string | null,
  userIds: string[],
  type: 'private' | 'group'
) => {
  await axios.post(
    `${API}/chat/${type}`,
    {
      userIds,
      isGroup: type === 'group',
    },
    getAuthHeaders(token)
  )
}
