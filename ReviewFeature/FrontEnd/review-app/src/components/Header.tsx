import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const [isAdmin] = useState(false)
  return (
    <header className="flex justify-between items-center px-4 py-3 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">My App</h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/tabs">Tabs Page</Link>
        {isAdmin && <Link to="/admin">Admin</Link>}
      </nav>
    </header>
  )
}
