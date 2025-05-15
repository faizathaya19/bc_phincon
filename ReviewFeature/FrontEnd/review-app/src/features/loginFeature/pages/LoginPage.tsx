import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'
import type { LoginInput } from '../types/auth'

const LoginPage: React.FC = () => {
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (data: LoginInput) => {
    const result = await login(data)
    if (result) {
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <AuthForm
        type="login"
        onSubmit={handleLogin}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default LoginPage
