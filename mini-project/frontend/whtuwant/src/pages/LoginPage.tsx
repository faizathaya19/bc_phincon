import AuthForm from '../components/AuthForm'
import { login } from '../features/auth/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await login(email, password)
      dispatch(
        setCredentials({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
      )
      console.log('Login success:', data)
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return <AuthForm type="login" onSubmit={handleLogin} />
}
