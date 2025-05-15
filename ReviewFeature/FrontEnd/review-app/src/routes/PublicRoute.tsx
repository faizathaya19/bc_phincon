import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { JSX } from 'react'
import type { RootState } from '../app/store'

interface PublicRouteProps {
  children: JSX.Element
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = useSelector((state: RootState) => state.auth.accessToken)
  return token ? <Navigate to="/" replace /> : children
}

export default PublicRoute
