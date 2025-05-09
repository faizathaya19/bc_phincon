import axios from 'axios'
import { store } from '../../store'
import { setCredentials, logout } from './authSlice'

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
})

api.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.auth.accessToken
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 403 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh-token')
    ) {
      originalRequest._retry = true
      try {
        const state = store.getState()
        const token = state.auth

        const { data } = await axios.post(
          'http://localhost:3001/api/auth/refresh-token',
          {},
          {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          }
        )

        console.log(data)

        store.dispatch(
          setCredentials({
            accessToken: data.data.accessToken,
            refreshToken: token.refreshToken,
          })
        )

        originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`
        return api(originalRequest)
      } catch (refreshError) {
        store.dispatch(logout())
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password })

export const register = (
  email: string,
  password: string,
  phone?: string,
  firstname?: string,
  lastname?: string
) =>
  api.post('/register', {
    email,
    password,
    phone,
    firstname,
    lastname,
  })

export const deleteUser = () => api.delete('/auth/delete-user')

export const getProfile = () => api.get('/auth/profile')

export default api
