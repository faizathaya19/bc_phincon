import { getAccessToken } from '../features/loginFeature/utils/tokenStorage'

const API_URL = 'http://localhost:3001/api/chat'

export const fetchUserChatRooms = async () => {
  const token = getAccessToken()
  const res = await fetch(`${API_URL}/rooms`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data.data
}
