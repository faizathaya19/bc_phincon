import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'
import type { LoginInput, RegisterInput } from '../types/auth'
import { useAuth } from '../hooks/useAuth'

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { login, register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (data: LoginInput) => {
    const result = await login(data)
    if (result) {
      navigate('/')
    }
  }

  const handleRegister = async (data: RegisterInput) => {
    const result = await register(data)
    if (result) {
      navigate('/')
    }
  }

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${isLogin ? '0%' : '-100%'})` }}
        >
          {/* Login Form */}
          <div className="w-full flex-shrink-0 p-8">
            <AuthForm
              type="login"
              onSubmit={handleLogin}
              loading={loading}
              error={error}
            />
          </div>

          {/* Register Form */}
          <div className="w-full flex-shrink-0 p-8">
            <AuthForm
              type="register"
              onSubmit={handleRegister}
              loading={loading}
              error={error}
            />
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={toggleAuthMode}
          >
            {isLogin
              ? 'Belum punya akun? Daftar di sini'
              : 'Sudah punya akun? Login di sini'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
