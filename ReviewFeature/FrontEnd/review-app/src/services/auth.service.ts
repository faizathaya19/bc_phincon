import axios from 'axios'
import type {
  LoginInput,
  RegisterInput,
  AuthResponse,
} from '../features/authFeature/types/auth'
import type { UserProfile } from '../features/authFeature/types/user'

const API_URL = 'http://localhost:3001/api/auth'

export const login = async (data: LoginInput): Promise<AuthResponse> => {
  const res = await axios.post(`${API_URL}/login`, data)
  return res.data.data
}

export const register = async (data: RegisterInput): Promise<AuthResponse> => {
  const res = await axios.post(`${API_URL}/register`, data)
  return res.data.data
}

export const fetchUserProfile = async (
  accessToken: string
): Promise<UserProfile> => {
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return response.data.data
}
