import AuthForm from '../components/AuthForm'
import { register } from '../features/auth/authApi'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'

export default function RegisterPage() {
  const dispatch = useDispatch()

  const handleRegister = async (email: string, password: string, phone?: string, firstname?: string, lastname?: string) => {
    const { data } = await register(email, password, phone, firstname, lastname)
    dispatch(
      setCredentials({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    )
    window.location.href = '/'
  }

  return <AuthForm type="register" onSubmit={handleRegister} />
}

