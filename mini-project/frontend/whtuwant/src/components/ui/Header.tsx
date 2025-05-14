import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

type HeaderProps = {
  name?: string
}

const Header: React.FC<HeaderProps> = ({ name }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">MyApp</div>
      <nav className="space-x-4">
        {isAuthenticated ? (
          <>
            <div className="text-xl font-bold text-blue-600">{name}</div>
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate('/cart')}
            >
              cart
            </button>
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate('/transaction-status')}
            >
              transaction
            </button>
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => navigate('/transaction-status')}
            >
              review app
            </button>
            <button
              className="text-red-500 hover:text-red-700 font-medium"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="text-gray-700 hover:text-blue-700"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="text-gray-700 hover:text-blue-700"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
          </>
        )}
      </nav>
    </header>
  )
}

export default Header
