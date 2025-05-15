import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { JSX } from 'react'
import { isTokenExpired } from '../utils/isTokenExpired'
import type { RootState } from '../app/store'

interface PrivateRouteProps {
  children: JSX.Element
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.accessToken)

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
