import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { logout } from '../features/auth/authSlice'
import { getProfile, deleteUser } from '../features/auth/authApi'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ProductList from './listProduct.page'

type LandingPageProps = {
  onProfileLoaded?: (profile: { firstname: string }) => void
}

export default function LandingPage({ onProfileLoaded }: LandingPageProps) {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [profile, setProfile] = useState<{
    firstname: string
    lastname: string
    email: string
    phone: string
  } | null>(null)

  const handleDeleteAccount = async () => {
    try {
      const response = await deleteUser()
      if (response.status === 200) {
        dispatch(logout())
        navigate('/')
      }
    } catch (error) {
      console.error('Error deleting account:', error)
      alert('Error deleting account. Please try again later.')
    }
  }

  const handleCheckProfile = async () => {
    try {
      const response = await getProfile()
      if (response.status === 200) {
        const { firstname, lastname, email, phone } = response.data.data
        const profileData = { firstname, lastname, email, phone }
        setProfile(profileData)
        onProfileLoaded?.({ firstname })
      }
    } catch (error) {
      console.error('Error checking profile:', error)
      alert('Error checking profile. Please try again later.')
    }
  }

  return (
    console.log('LandingPage auth:', auth),
    (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {auth.isAuthenticated ? (
          <div className="mt-4 flex flex-col gap-4 items-center">
            <ProductList />
            <p className="text-green-600">You are logged in</p>
            <button
              onClick={handleDeleteAccount}
              className="p-2 bg-red-600 text-white rounded"
            >
              Delete Account
            </button>
            <button
              onClick={handleCheckProfile}
              className="p-2 bg-blue-600 text-white rounded"
            >
              Check Profile
            </button>

            {profile && (
              <div className="mt-4 p-4 border rounded shadow">
                <p>
                  <strong>Firstname:</strong> {profile.firstname}
                </p>
                <p>
                  <strong>Lastname:</strong> {profile.lastname}
                </p>
                <p>
                  <strong>Email:</strong> {profile.email}
                </p>
                <p>
                  <strong>Phone:</strong> {profile.phone}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-4 flex gap-4">
            <a href="/login" className="text-blue-500 underline">
              Login
            </a>
            <a href="/register" className="text-blue-500 underline">
              Register
            </a>
          </div>
        )}
      </div>
    )
  )
}
