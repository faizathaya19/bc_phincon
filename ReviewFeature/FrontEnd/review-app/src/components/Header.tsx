import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../features/loginFeature/hooks/useAuth'

export default function Header() {
  const [isAdmin] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
    logout()
  }

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/tabs">Tabs Page</Link>
        <Link to="/listChat"> Chat</Link>
        <button
          onClick={handleLogout}
          className="text-white underline hover:opacity-80"
        >
          Logout
        </button>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </nav>
    </header>
  )
}
