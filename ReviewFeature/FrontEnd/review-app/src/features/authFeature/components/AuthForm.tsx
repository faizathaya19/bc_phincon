import React, { useState } from 'react'
import type { LoginInput, RegisterInput } from '../types/auth'

type FormProps =
  | {
      type: 'login'
      onSubmit: (form: LoginInput) => void
    }
  | {
      type: 'register'
      onSubmit: (form: RegisterInput) => void
    }

type CommonProps = {
  loading: boolean
  error: string | null
}

type Props = FormProps & CommonProps

const AuthForm = (props: Props) => {
  const { type, onSubmit, loading, error } = props

  const [form, setForm] = useState<Partial<LoginInput & RegisterInput>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev: Partial<LoginInput & RegisterInput>) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === 'login') {
      const loginData: LoginInput = {
        email: form.email ?? '',
        password: form.password ?? '',
      }
      onSubmit(loginData)
    } else {
      const registerData: RegisterInput = {
        fullname: form.fullname ?? '',
        username: form.username ?? '',
        phone_number: form.phone_number ?? '',
        email: form.email ?? '',
        password: form.password ?? '',
      }
      onSubmit(registerData)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h2 className="block text-gray-700 text-xl font-bold mb-6 text-center">
        {type === 'login' ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'register' && (
          <>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fullname"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="fullname"
                placeholder="Full Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-7
                00 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone_number"
              >
                Phone Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone_number"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
          </button>
        </div>

        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
    </div>
  )
}

export default AuthForm
