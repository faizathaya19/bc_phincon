import { useState } from 'react'
import type { LoginInput, RegisterInput } from '../types/auth'
import * as authService from '../services/auth.service'
import { useProfile } from '../contexts/ProfileContext'
import { setAccessToken } from '../utils/tokenStorage'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { profile, setProfile } = useProfile()

  const login = async (data: LoginInput) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.login(data)
      localStorage.setItem('accessToken', response.accessToken)
      setAccessToken(response.accessToken)
      const user = await authService.fetchUserProfile(response.accessToken)
      setProfile(user)
      return response
    } catch (err) {
      console.error('Login error:', err)
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterInput) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authService.register(data)
      localStorage.setItem('accessToken', response.accessToken)
      setAccessToken(response.accessToken)
      const user = await authService.fetchUserProfile(response.accessToken)
      setProfile(user)
      return response
    } catch (err) {
      console.error('Register error:', err)
      setError('Register failed')
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setAccessToken('')
    setProfile(null)
    localStorage.removeItem('accessToken')
  }

  return {
    profile,
    login,
    register,
    logout,
    loading,
    error,
  }
}
