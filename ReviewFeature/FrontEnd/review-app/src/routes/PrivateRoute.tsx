import { Navigate } from 'react-router-dom'
import { isTokenExpired } from '../utils/isTokenExpired'
import type { JSX } from 'react'
import { clearAccessToken } from '../features/loginFeature/utils/tokenStorage'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = localStorage.getItem('accessToken')

  if (!token || isTokenExpired(token)) {
    clearAccessToken()
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
