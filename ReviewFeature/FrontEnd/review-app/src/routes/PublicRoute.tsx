import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'

interface PublicRouteProps {
  children: JSX.Element
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem('accessToken')
  return token ? <Navigate to="/" replace /> : children
}

export default PublicRoute
