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
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'register' && (
        <>
          <input
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />
        </>
      )}
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Register'}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}

export default AuthForm
