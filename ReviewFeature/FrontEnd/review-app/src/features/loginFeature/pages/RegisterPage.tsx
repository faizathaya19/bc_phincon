import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import AuthForm from '../components/AuthForm'
import type { RegisterInput } from '../types/auth'

const RegisterPage: React.FC = () => {
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleRegister = async (data: RegisterInput) => {
    const result = await register(data)
    if (result) {
      navigate('/')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <AuthForm
        type="register"
        onSubmit={handleRegister}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default RegisterPage
