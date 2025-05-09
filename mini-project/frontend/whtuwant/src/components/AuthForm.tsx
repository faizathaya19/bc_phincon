import { useState } from 'react'
import Header from './ui/Header'

interface AuthFormProps {
  type: 'login' | 'register'
  onSubmit: (
    email: string,
    password: string,
    phone?: string,
    firstname?: string,
    lastname?: string
  ) => void
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === 'login') {
      onSubmit(email, password)
    } else {
      onSubmit(email, password, phone, firstname, lastname)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md mx-auto mt-10"
      >
        <h2 className="text-2xl font-bold text-center">
          {type === 'login' ? 'Login' : 'Register'}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border rounded p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {type === 'register' && (
          <>
            <input
              type="text"
              placeholder="Firstname"
              className="border rounded p-2"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Lastname"
              className="border rounded p-2"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Phone"
              className="border rounded p-2"
              value={phone ?? ''}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
        >
          {type === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}
